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

    let allErrors = {
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    }

    //Username Validation =========================================>
    if (username === "") {
        allErrors.usernameError = "Username is required!";
    }
    else if (username.length <= 3) {
        allErrors.usernameError = "Username must be greater than 3 characters!";
    }
    else if (username.length > 30) {
        allErrors.usernameError = "Username should not exceeds 30 characters!";
    }
    //Contain only lowercase, numbers, underscore
    else if (!/^[a-z0-9_]+$/.test(username)) {
        allErrors.usernameError = "Username can only contain lowercase, numbers, underscore!";
    }
    //First character must be a letter
    else if (!/^[a-z]/.test(username)) {
        allErrors.usernameError = "Username must start with a letter!";
    }

    //Checking if Username already exists in Database
    else {
        try {
            let user = await SignUpDetails.findOne({ username });
            if (user) allErrors.usernameError = "Username already exists!";
        } catch (err) {
            console.log("Error in Checking Username in Database: \n", err);
        }
    }

    //Email Validation =============================================>
    if (email === "") {
        allErrors.emailError = "Email is required!";
    } else if (!validator.isEmail(email)) {
        allErrors.emailError = "Email is invalid!";
    }
    //Checking if EmailID already exists in Database
    else {
        try {
            let mail = await SignUpDetails.findOne({ email });
            if (mail) allErrors.emailError = "Email already exists!";
        } catch (err) {
            console.log("Error in Checking Email in Database: \n", err);
        }
    }

    //Password Validation ==========================================>
    if (password === "") {
        allErrors.passwordError = "Password is required!";
    } else if (password.length <= 3) {
        allErrors.passwordError = "Password must be greater than 3 characters!";
    } else if (password.length > 100) {
        allErrors.passwordError = "Password should not exceeds 100 characters!";
    }

    //Confirm Password Validation ==================================>
    if (confirmPassword === "") {
        allErrors.confirmPasswordError = "Confirm Password is required!";
    } else if (confirmPassword !== password) {
        allErrors.confirmPasswordError = "Confirm Password must be same as Password!";
    }

    //If any error found, then return error message
    if (allErrors.usernameError || allErrors.emailError || allErrors.passwordError || allErrors.confirmPasswordError) {
        console.log("😥 Error in Signup Form Validation: \n", allErrors);
        res.status(200).json({ validationError: "Error in Signup Form Validation", allErrors: allErrors });
    }
    //If no error found, then call next() function
    else {
        req.data = { username, email, password };
        next();
    }
};
