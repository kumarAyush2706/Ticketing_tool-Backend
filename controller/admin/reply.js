const Query = require("../../modal/dbmodal");
const transporter = require("../../middleware/Email.config");
// Save a reply
exports.getQueryById = async (req, res) => {
  try {
    if (!req.params.queryId) {
      return res
        .status(400)
        .json({ success: false, message: "Query ID is missing" });
    }

    const query = await Query.findById(req.params.queryId);

    if (!query) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found in DB" });
    }

    res.json({ success: true, userEmail: query.email, replies: query.replies });
  } catch (error) {
    console.error("Error fetching query:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// reply ans mail
// exports.addReply = async (req, res) => {
//   try {
//     const { queryId, adminName, message,} = req.body;
//     console.log("Received reply data:", req.body); // Debugging

//     const query = await Query.findById(queryId);
//     if (!query)
//       return res
//         .status(404)
//         .json({ success: false, message: "Query not found" });

//     // Create reply object
//     const newReply = { adminName, message, createdAt: new Date() };

//     // Store in MongoDB
//     query.replies.push(newReply);
//     await query.save();

//     // Send reply via email
//     const mailOptions = {
//       from: "ayush.techisors.3@gmail.com",
//       to: query.email,
//       subject: `Your Query - ${query.description}`,
//       html: `
//         <p>${message}</p>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) console.error("Error sending email:", error);
//       else console.log("Email sent:", info.response);
//     });

//     res.json({ success: true, reply: newReply });
//   } catch (error) {
//     console.error("Error sending reply:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

exports.addReply = async (req, res) => {
  try {
    const { queryId, adminName, message } = req.body;
    console.log(req.body);

    // Fetch the original query from MongoDB
    const query = await Query.findById(queryId);
    if (!query) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found" });
    }

    // Create reply object
    const newReply = { adminName, message, createdAt: new Date() };

    // Store reply in MongoDB
    query.replies.push(newReply);
    await query.save();

    // Generate a unique message ID based on the original query ID
    const messageId = `<query-${queryId}@abc.com>`; // Custom message ID
    const originalMessageId = query.messageId || messageId; // Use original if exists

    // Send reply via email
    const mailOptions = {
      from: "ayush.techisors.3@gmail.com",
      to: query.email, // User's email
      subject: `Re: Your Query - ${query.description}`, // Re: makes it look like a reply
      html: `
        <p><strong>${adminName}</strong> has replied to your query:</p>
        <blockquote>${message}</blockquote>
        <p>Best Regards,<br>Your Support Team</p>
      `,
      headers: {
        "In-Reply-To": originalMessageId,
        // References: originalMessageId,
      },
      messageId: messageId, // Assign message ID
    };

    // Store the first messageId in the DB if not already set
    if (!query.messageId) {
      query.messageId = messageId;
      await query.save();
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Error sending email:", error);
      else console.log("Email sent:", info.response);
    });

    res.json({ success: true, reply: newReply });
  } catch (error) {
    console.error("Error sending reply:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
