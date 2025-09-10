import nodemailer from "nodemailer";

export const sendEmail = async ({from, to, subject, text, html}) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,     
        pass: process.env.EMAIL_PASS,        
      },
    });

    let mailOptions = {
      from: from, 
      to: to,               
      subject: subject,        
      text: text, 
      html: html, 
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

