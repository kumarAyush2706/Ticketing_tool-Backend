const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "ayush.techisors.3@gmail.com",
    pass: "qzzu ebqo czuo jcsw",
  },
});

module.exports = transporter;
