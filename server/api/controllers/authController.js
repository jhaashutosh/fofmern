const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  let { email, password } = req.body;
  email = email.toLowerCase().trim();

  //All Errors!
  let allErrors = [];

  //Flow of Login: 
  //0. Convert Email to Lowercase and Trim 
  //1. Check if Email is present in Database
  //2. If Email is present, check if Password is correct or Not
  //3. If Password is correct, check if Email is verified or Not
  //4. If Email is verified, then Login Successful  If Email is not verified, then send to Email Verification Page
  //5. If Login is Successful, then redirect Create JWT Token and redirect to /home page

  //Finding User in Database
  const user = await SignUpDetails.findOne({ email });

  if(user){
    //Checking Correct Password
    const auth = await bcrypt.compare(req.body.password, user.password);

    if(auth){
      //Checking IF Email is Verified or Not
      if(user.isverified){

        //Create JWT Token
        try{
          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
          console.log("JWT Token created Successfully!: ",token);

          //Creating Cookie
          // res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3 * (60 * 60 * 24) * 1000 });
          // console.log("JWT Cookie created Successfully in Browser!");

          return res.send({message: "JWT Cookie created Successfully in Browser!", jwtToken: token});
        }

        catch(err){
          console.log("Error Creating JWT! Token (Login)");
          console.log(err);
          allErrors.push({jwtError: "Error Creating JWT! Token (Login)"});
        }


        //Checking if the User is Registered or not
        if(user.isregistered){
          allErrors.push({loginError: "User is Registered!"});
          // res.status(200).send({redirect: '/'});
        }

        else{
          allErrors.push({registerError: "User is not Registered!"});
          // res.status(200).send({redirect: '/register'});
        }
        
      }
      
      else{
        allErrors.push({emailError: "Email is not Verified!"});
        //Redirect to Email Verification Page => /verify
        // res.status(200).send({redirect: '/verify'});
      }
    }

    else{
      //Incorrect Password
      allErrors.push({passwordError: "Incorrect Password!"});
    }
  }

  else{
    //Incorrect Email
    allErrors.push({emailError: "Incorrect Email!"});
  }

  return res.status(400).send({allErrors});
};
