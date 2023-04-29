const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const SignUpDetails = require("../models/SignUpDetails");
const AllDetails = require("../models/AllDetails");

//Functions
const { loginValidator } = require("../middlewares/signupValidator");
const { createPasscode } = require("../utility/jwtPasscode");
const { sendMail } = require("../utility/sendMail");

const sendVerifyMail = async (name, email, user_id) => {
  const userToken = createPasscode("50m", { user_id: user_id });

  const userDetails = await SignUpDetails.findById(user_id);
  if (!userDetails) {
    return res.status(404).json({ error: "User not found" });
  }

  const updatedNumberOfTries = userDetails.numberOfTries + 1;

  const updatedVerify = await SignUpDetails.updateOne(
    { _id: user_id },
    { $set: { numberOfTries: updatedNumberOfTries } }
  );

  let subject = "Verification mail from FOF";
  let HTML_STRING = `<p> Hello ${name},<br>This mail is for verification, click here to verify: <br> <a href=${
    process.env.VERIFY_URL + userToken
  }>VERIFY</a></p>`;

  return (confirmation = sendMail(email, subject, HTML_STRING));
};

exports.resendVerifyMail = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await SignUpDetails.findOne({ email });
    if (!user || user == undefined) {
      res.status(400).json({
        message: "user not found",
      });
    }
    const confirmation = await sendVerifyMail(
      user.username,
      user.email,
      user._id
    );
    if (confirmation === false) {
      res.status(500).json({
        error: "mail server not working",
      });
    }
    res.status(200).json({
      message: "✅Mail has been sent!",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.verifyMail = async (req, res) => {
  const userToken = req.params.id;
  try {
    const userId = jwt.verify(userToken, process.env.JWT_SECRET).payload[0]
      .user_id;

    const updatedVerify = await SignUpDetails.updateOne(
      { _id: userId },
      { $set: { isverified: true } }
    );

    return res
      .status(200)
      .json({ message: "User verification status updated successfully" });

    console.log(updatedVerify);
    res.send("📩 Email Verified Successfully! (Go to Login Page)");
  } catch (err) {
    console.log("⚠ Error! verifying Email \n", err);
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
  const { username, email, password } = req.body;
  const numberOfTries = 1;

  //Saving Data to Database SignUpDetails Model
  const signup_details = new SignUpDetails({
    username,
    email,
    password,
    numberOfTries,
  });

  signup_details
    .save()
    .then((data) => {
      // Sending Verification Mail:
      sendVerifyMail(data.username, data.email, data._id);

      console.log("✅ SignUp Details Saved to Database Successfully! \n", data);
      res.status(200).json({
        message: "✅ SignUp Details Saved to Database Successfully!!",
      });
    })

    .catch((err) => {
      console.log("😥 Error in Saving Sign Up Form Data to Database: \n", err);
      res
        .status(500)
        .json({ message: "😥 Error in Saving Sign Up Form Data to Database!" });
    });
};

//Login Route -> POST Method  --> /auth/login
exports.loginController = async (req, res) => {
  //Email and Password from Login Form
  console.log("📑 Login Form Data: \n", req.data);
  const { email, password } = req.data;

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

  if (user) {
    //Checking Correct Password
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      //Checking IF Email is Verified or Not
      if (user.isverified) {
        //Create JWT Token
        try {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("JWT Token created Successfully!: ", token);

          //Creating Cookie
          // res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3 * (60 * 60 * 24) * 1000 });
          // console.log("JWT Cookie created Successfully in Browser!");

          return res.send({
            message: "JWT Cookie created Successfully in Browser!",
            jwtToken: token,
          });
        } catch (err) {
          console.log("Error Creating JWT! Token (Login)");
          console.log(err);
          allErrors.push({ jwtError: "Error Creating JWT! Token (Login)" });
        }

        //Checking if the User is Registered or not
        if (user.isregistered) {
          allErrors.push({ loginError: "User is Registered!" });
          // res.status(200).send({redirect: '/'});
        } else {
          allErrors.push({ registerError: "User is not Registered!" });
          // res.status(200).send({redirect: '/register'});
        }
      } else {
        allErrors.push({ emailError: "Email is not Verified!" });
        //Redirect to Email Verification Page => /verify
        // res.status(200).send({redirect: '/verify'});
      }
    } else {
      //Incorrect Password
      allErrors.push({ passwordError: "Incorrect Email or Password!" });
    }
  } else {
    //Incorrect Email
    allErrors.push({ emailError: "Incorrect Email or Password!" });
  }

  return res.status(400).send({ allErrors });
};

exports.allDetailsController = async (req, res) => {
  console.log("📑 All Details Page Data (After Validation): \n", res.data);

  //Fetch From Database or JWT Token
  //Temporary -> Dummy Username
  let username = "rk_25";

  const {
    fullName,
    imageURL,
    instagram,
    bio,
    gender,
    state,
    city,
    schoolDetails,
  } = req.data;

  //Saving All Details to Database
  const all_details = new AllDetails({
    username,
    fullName,
    imageURL,
    instagram,
    bio,
    gender,
    state,
    city,
    schoolDetails,
  });

  all_details
    .save()
    .then((data) => {
      console.log("✅ All Details Saved to Database Successfully! \n", data);
      res
        .status(200)
        .json({ message: "✅ All Details Saved to Database Successfully!!" });
    })

    .catch((err) => {
      console.log("😥 Error in Saving All Details to Database: \n", err);
      res
        .status(500)
        .json({ message: "😥 Error in Saving All Details to Database!" });
    });
};
