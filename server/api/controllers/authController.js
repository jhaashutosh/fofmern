const nodemailer = require("nodemailer");

//Models
const SignUpDetails = require("../models/SignUpDetails");

//Functions
const {loginValidator} = require("../functions/signupValidator");

const sendVerifyMail = async (name, email, user_id) => {
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
      subject: "Verification mail from FOF",
      html: `<p> Hello ${name},<br>This mail is for verification, click here to verify: <br> <a href=${
        process.env.VERIFY_URL + user_id
      }>VERIFY</a></p>`,
    };

    mailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("📩Email has been sent");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyMail = async (req, res) => {
  try {
    const updatedVerify = await SignUpDetails.updateOne(
      { _id: req.query.id },
      {
        $set: {
          isverified: 1,
        },
      }
    );

    console.log(updatedVerify);
    res.send("updated verification field");
  } catch (err) {
    console.log(err);
  }
};

//Signup Route -> POST Method  --> /auth/signup
exports.signupController = (req, res) => {

  /*Input Form Data: -->
    {
        username:  "rk_25",
        email:     "rahul25@gmail.com",
        password:  "test123",
        confirmPassword: "test123"
    } 
    */

  // console.log("📑 Sign Up Form Data: \n", req.body);
  const { username, email, password} = req.body;

  //Saving Data to Database SignUpDetails Model
  const signup_details = new SignUpDetails({ username, email, password });

  signup_details
    .save()
    .then((data) => {

      //Sending Verification Mail: 
      // sendVerifyMail(data.username, data.email, data._id);

      console.log("✅ SignUp Details Saved to Database Successfully! \n", data);
      res.status(200).json({
        message: "✅ SignUp Details Saved to Database Successfully!!",
      });
    })
    .catch((err) => {
      console.log("😥 Error in Saving Sign Up Form Data to Database: \n", err);
      res.status(500).json({ message: "😥 Error in Saving Sign Up Form Data to Database!" });
    });
};


//Login Route -> POST Method  --> /auth/login
exports.loginController = async (req, res) => {
  /*Input Form Data: -->
    {
        email:"",
        password:"",
    }
    */

  console.log("📑 Login Form Data: \n", req.body);
  const { email, password } = req.body;

  //Checking if Email Exists in Database
  try {
    let user = await SignUpDetails.findOne({ email });
    if (!user) {
      console.log("😥 Email Not Found in Database!");
      return res
        .status(400)
        .json({ message: "😥 Email Not Found in Database!" });
    }

    //Checking if Password is Correct
    if (password === user.password) {
      console.log("✅ Login Successful!");
      res.status(200).json({ message: "✅ Login Successful!" });
    } else {
      console.log("😥 Incorrect Password!");
      res.status(400).json({ message: "😥 Incorrect Password!" });
    }
  } catch (err) {
    console.log("😥 Error in Login: \n", err);
    res.status(500).json({ message: "😥 Error in Login!" });
  }
};
