const nodemailer = require("nodemailer");

exports.sendMail = async (email, subject, HTMLString) => {
  //Create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    //Send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: email,
      subject: subject,
      html: HTMLString,
    });

    console.log("Email Send Successfully!");
    return true;
  } catch (err) {
    console.log("Error! sending mail \n", err);
    return false;
  }
};
