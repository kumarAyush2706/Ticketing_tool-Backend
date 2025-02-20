const transporter = require("./Email.config.js")

const sendToken = async(email,Token)=>{
    try{
        const response = await transporter.sendMail({
            
            from: '"CodeByAyush 👻" <ayush.techisors.3@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Thank you! for your request  ", // Subject line
            text: "your token is ", // plain text body
            html: `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Issue Acknowledgment</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #007bff;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 20px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
        .token {
            font-size: 18px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
            
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Thank You for Reaching Out!
        </div>
        <div class="content">
            <p>Dear ,</p>
            <p>Thank you for contacting us. We have received your request and are actively working on resolving your issue.</p>
            <p>Your Token ID: <span class="token">${Token}</span></p>
            <p>We will update you as soon as possible. If you have any further queries, feel free to reply to this email.</p>
            <p>Best Regards,</p>
            <p>Your Support Team</p>
        </div>
        <div class="footer">
            &copy; 2025 Togile | All Rights Reserved
        </div>
    </div>
</body>
</html>`, // html body
          });
          console.log("Email send successfully",response)
          }catch(error){
            console.log(error)
          }
}

module.exports = sendToken;