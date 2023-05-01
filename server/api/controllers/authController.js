const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Models
const SignUpDetails = require("../models/SignUpDetails");
const AllDetails = require("../models/AllDetails");

//Functions
const { loginValidator } = require("../middlewares/signupValidator");
const { createPasscode } = require("../utility/jwtPasscode");
const { sendMail, sendMail2 } = require("../utility/sendMail");

const sendVerifyMail = async (name, email, user_id) => {
  const userToken = createPasscode("50m", { user_id: user_id });
  console.log("🔑Email Verification Token: ", userToken);

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
          const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            }
          );
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

//Logout Route -> GET Method  --> /auth/logout
exports.logoutController = (req, res) => {
  res.send("Logout Page!");
};

//Forgot Password Route -> POST Method  --> /auth/forgotpassword
exports.forgotPasswordController = async (req, res) => {
  /*Input Form Data: -->
    {
        "email" : "connectrahul25@gmail.com",
    }
  */

  let email = req.body.email;
  console.log("📑 Forgot Password Form Data: \n", email);

  let allErrors = [];

  //Handling False Values: Null, Undefined, Empty String, 0, -1, False, NaN
  if (!email) email = "";
  if (email === "") {
    allErrors.push({ emailError: "Email is Required!" });
  } else if (!validator.isEmail(email)) {
    allErrors.push({ emailError: "Invalid Email!" });
  } else {
    //Checking if Email is present in Database. -> SignUpDetails Model
    const user = await SignUpDetails.findOne({ email });

    if (user) {
      //Sending Reset Password Mail-------------------->

      //Creating Token
      const userToken = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      console.log("🔑Forgot Password Token: ", userToken);

      let subject = "FOF - Reset Password! ";
      let HTML_STRING = `<p> Hello ${
        user.username
      } !,<br>This is your reset password mail!, Click here to reset your password: <br> <a href=${
        process.env.FORGOT_PASS_URL + userToken
      }>VERIFY</a></p>`;

      const confirmation = await sendMail2(email, subject, HTML_STRING);
      console.log("📧 Mail Sent: ", confirmation);
      if (!confirmation) {
        allErrors.push({ emailError: "Error Sending Reset Password Mail!" });
      }
    } else {
      allErrors.push({ emailError: "Email is not Registered!" });
    }
  }

  //Sending Response
  if (allErrors.length > 0) {
    return res.status(400).send({ allErrors });
  } else {
    return res
      .status(200)
      .send({ message: "Reset Password Mail Sent Successfully!" });
  }
};

//Reset Password Route -> POST Method  --> /auth/resetpassword
exports.resetPasswordController = async (req, res) => {
  /*Input Form Data: -->
    {
        "password" : "pass123",
        "confirmPassword" : "pass123"
    }
  */

  console.log("📑 Reset Password Form Data: \n", req.body);
  const { password, confirmPassword } = req.body;

  //Validating Password!
  let allErrors = [];
  if (!password) allErrors.push({ passwordError: "Password is Required!" });
  if (!confirmPassword)
    allErrors.push({ confirmPasswordError: "Confirm Password is Required!" });
  else if (password !== confirmPassword)
    allErrors.push({
      confirmPasswordError: "Password and Confirm Password should be same!",
    });
  else if (password.length < 3)
    allErrors.push({
      passwordError: "Password should be atleast 3 characters long!",
    });
  else if (password.length > 100)
    allErrors.push({
      passwordError: "Password should be atmost 100 characters long!",
    });
  else {
    //Getting Token from URL
    const token = req.params.token;
    console.log("🔑 Reset Password Token: ", token);

    //Verifying Token
    let decodedToken;
    try {
      //Decoding Token
      decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      console.log("🔑 Decoded Reset Password Token: ", decodedToken);
    } catch (err) {
      console.log("Error Decoding Reset Password Token!", err);
      allErrors.push({ tokenError: "Error Decoding Reset Password Token!" });
    }

    //Checking if Token is Expired or Not
    if (decodedToken) {
      if (decodedToken.expiredAt < Date.now()) {
        allErrors.push({ tokenError: "Reset Password Token Expired!" });
      } else {
        //Creating Hashed Password
        const hashPassword = await bcrypt.hash(password, 12);

        console.log(
          "🔴 Values: ",
          decodedToken.email,
          decodedToken.username,
          hashPassword
        );

        //FindOneAndUpdate -> SignUpDetails Model
        try {
          const updatedUser = await SignUpDetails.findOneAndUpdate(
            { email: decodedToken.email },
            { password: hashPassword },
            { new: true } // return the updated user
          );
          console.log("User password updated successfully!", updatedUser);
        } catch (err) {
          console.log("Error Updating User Password!", err);
          allErrors.push({ passwordError: "Error Updating User Password!" });
        }
      }
    }
  }

  //Sending Response
  if (allErrors.length > 0) {
    return res.status(400).send({ allErrors: allErrors });
  } else {
    return res.status(200).send({ message: "Password Updated Successfully!" });
  }
};
