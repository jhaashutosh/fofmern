//Models
const SignUpDetails = require("../models/SignUpDetails");
const validator = require("validator");

//Login Validator Function
exports.signupValidator = async (req, res, next) => {
  /*Input Form Data: -->
    {
        username:  "rk_25",
        email:     "rahul25@gmail.com",
        password:  "test123",
        confirmPassword: "test123"
    } 
    */

  console.log("📑 Signup Form Details: \n", req.body);
  let { username, email, password, confirmPassword } = req.body;

  //Handling all False Value: undefined / null / 0 / -0 / NaN / "" / Converting to String: "undefined" / "null" / "0" / "-0" / "NaN" / ""
  if (!username) username = "";
  if (!email) email = "";
  if (!password) password = "";
  if (!confirmPassword) confirmPassword = "";

  //Trimming Input Values:
  username = username.trim();
  email = email.trim().toLowerCase();

  let allErrors = [];

  //Username Validation =========================================>
  if (username === "") {
    allErrors.push({ usernameError: "Username is required!" });
  } else if (username.length <= 3) {
    allErrors.push({
      usernameError: "Username must be greater than 3 characters!",
    });
  } else if (username.length > 30) {
    allErrors.push({
      usernameError: "Username should not exceeds 30 characters!",
    });
  }
  //Contain only lowercase, numbers, underscore
  else if (!/^[a-z0-9_]+$/.test(username)) {
    allErrors.push({
      usernameError: "Only lowercase letters, numbers and underscore allowed!",
    });
  }
  //First character must be a letter
  else if (!/^[a-z]/.test(username)) {
    allErrors.push({ usernameError: "First character must be a letter!" });
  }

  //Checking if Username already exists in Database
  else {
    try {
      let user = await SignUpDetails.findOne({ username });
      if (user) allErrors.push({ usernameError: "Username already exists!" });
    } catch (err) {
      console.log("Error in Checking Username in Database: \n", err);
    }
  }

  //Email Validation =============================================>
  if (email === "") {
    allErrors.push({ emailError: "Email is required!" });
  } else if (!validator.isEmail(email)) {
    allErrors.push({ emailError: "Invalid Email!" });
  }
  //Checking if EmailID already exists in Database
  else {
    try {
      let mail = await SignUpDetails.findOne({ email });
      if (mail) allErrors.push({ emailError: "Email already exists!" });
    } catch (err) {
      console.log("Error in Checking Email in Database: \n", err);
    }
  }

  //Password Validation ==========================================>
  if (password === "") {
    allErrors.push({ passwordError: "Password is required!" });
  } else if (password.length <= 3) {
    allErrors.push({
      passwordError: "Password must be greater than 3 characters!",
    });
  } else if (password.length > 100) {
    allErrors.push({
      passwordError: "Password should not exceeds 100 characters!",
    });
  }

  //Confirm Password Validation ==================================>
  if (confirmPassword === "") {
    allErrors.push({ confirmPasswordError: "Confirm Password is required!" });
  } else if (confirmPassword !== password) {
    allErrors.push({
      confirmPasswordError: "Password and Confirm Password must be same!",
    });
  }

  //If any error found, then return error message
  if (allErrors.length > 0) {
    console.log("😥 Error in Signup Form Validation: \n", allErrors);
    res.status(400).json({
      message: "Error in Signup Form Validation",
      allErrors: allErrors,
    });
  }
  //If no error found, then call next() function
  else {
    req.data = { username, email, password };
    next();
  }
};
