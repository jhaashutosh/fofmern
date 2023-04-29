const nodemailer = require("nodemailer");

exports.sendMail = (email, subject, HTML_STRING) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: subject,
      html: HTML_STRING,
    };

    mailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("📩Email has been sent");
        return true;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
