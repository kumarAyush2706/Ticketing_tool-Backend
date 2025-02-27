const Query = require("../../modal/dbmodal");
const imap = require("imap-simple");
const { simpleParser } = require("mailparser");
const fs = require("fs");

const config = {
  imap: {
    user: "ayush.techisors.3@gmail.com",
    password: "qzzu ebqo czuo jcsw", // Use an App Password instead of regular password
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    connTimeout: 60000,
    authTimeout: 60000,
    socketTimeout: 60000,
    keepalive: { interval: 10000, idleInterval: 300000, forceNoop: true },
  },
};

// Function to extract only user's reply
const extractUserReply = (emailBody) => {
  const replySeparator = /On\s.*wrote:/g;
  const parts = emailBody.split(replySeparator);
  return parts[0]?.trim() || emailBody;
};

exports.userReplyFetch = async (req, res) => {
  try {
    console.log("Connecting to IMAP...");

    const connection = await imap.connect(config);
    console.log("IMAP Connection Successful");

    // Handle unexpected disconnections
    connection.on("error", (err) => {
      console.error("IMAP Connection Error:", err);
    });

    connection.on("end", () => {
      console.log("IMAP Connection Ended Unexpectedly");
    });

    await connection.openBox("INBOX");
    console.log("INBOX Opened Successfully");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: [""], markSeen: true };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`Fetched ${messages.length} emails from Gmail`);

    let storedEmails = [];

    for (const item of messages) {
      try {
        const all = item.parts.find((part) => part.which === "");
        if (!all) {
          console.warn("No body found for an email, skipping...");
          continue;
        }

        const parsedEmail = await simpleParser(all.body);
        const senderEmail = parsedEmail.from.value[0].address;
        const senderName = parsedEmail.from.value[0]?.name || "Unknown User";

        const userReply = extractUserReply(parsedEmail.text);

        const emailData = {
          fromEmail: senderEmail,
          subject: parsedEmail.subject,
          messageId: parsedEmail.messageId,
          inReplyTo: parsedEmail.inReplyTo || null,
          messageBody: userReply,
        };

        console.log("New User Reply Received:", emailData);

        if (emailData.inReplyTo) {
          console.log("This email is a reply to:", emailData.inReplyTo);

          const query = await Query.findOne({ messageId: emailData.inReplyTo });

          if (query) {
            query.replies.push({
              senderEmail: senderEmail,
              message: userReply,
              createdAt: new Date(),
            });
            await query.save();
            emailData.status = "Reply saved to existing query";
            emailData.queryId = query._id;
          } else {
            emailData.status = "No matching query found for reply";
          }
        } else {
          console.log("Saving new query...");

          const newQuery = new Query({
            name: senderName,
            email: senderEmail,
            description: parsedEmail.subject,
            messageId: parsedEmail.messageId,
            replies: [
              {
                senderEmail: senderEmail,
                message: userReply,
                createdAt: new Date(),
              },
            ],
          });

          await newQuery.save();
          emailData.status = "New query saved";
          emailData.queryId = newQuery._id;
        }

        storedEmails.push(emailData);
      } catch (emailError) {
        console.error("Error processing an email:", emailError);
      }
    }

    connection.end();
    console.log("IMAP Connection Closed");

    return res.status(200).json({ success: true, emails: storedEmails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching emails", error });
  }
};
