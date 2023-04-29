const validator = require("validator");

exports.loginValidator = async (req, res, next) => {
  /*Input Form Data: -->
    {
        email:"",
        password:"",
    }
    */

  console.log("📑 Login Form Data: \n", req.body);
  let { email, password } = req.body;

  //Handling all False Value: undefined / null / 0 / -0 / NaN / "" / Converting to String: "undefined" / "null" / "0" / "-0" / "NaN" / ""
  if (!email) email = "";
  if (!password) password = "";

  email = email.toLowerCase().trim();

  //All Errors!
  let allErrors = [];

  //Email Validation =============================================>
  if (email === "") {
    allErrors.push({ emailError: "Email is required!" });
  } else if (!validator.isEmail(email)) {
    allErrors.push({ emailError: "Invalid Email!" });
  }

  //Password Validation ==========================================>
  if (password === "") {
    allErrors.push({ passwordError: "Password is required!" });
  }

  //If any error found, then return error message
  if (allErrors.length > 0) {
    console.log("😥 Error in Login Form Validation: \n", allErrors);
    res.status(400).json({
      message: "Error in Login Form Validation",
      allErrors: allErrors,
    });
  }
  //If no error found, then call next() function
  else {
    res.data = { email, password };
    next();
  }
};
