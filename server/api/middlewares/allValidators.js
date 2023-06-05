const validator = require("validator");
const SignUpDetails = require("../models/SignUpDetails");

//Signup Validator: ----------------------------->
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

//Login Validator: ----------------------------->
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
        req.data = { email, password };
        next();
    }
};

//AllDetails Validator: ----------------------------->
exports.allDetailsValidator = async (req, res, next) => {
    /*Input Form Data: -->
      {
          fullName: "",
          profileImg: "",
          backgroundImg: "",
          bio: "",
          instagram: "",
          bio: "",
          gender: "",
          state: "",
          city: "",
          schoolDetails = {LKG: "", UKG: "", I: "", II: "", III: "", IV: "", V: "", VI: "", VII: "", VIII: "", IX: "", X: "", XI: "", XII: ""}
      }
      */

    console.log("📑 AllDetails Form Data: \n", req.body);
    let { fullName, profileImg, backgroundImg, instagram, bio, gender, state, city, schoolDetails } = req.body;

    //Handling all False Value: undefined / null / 0 / -0 / NaN / "" / Converting to String: "undefined" / "null" / "0" / "-0" / "NaN" / ""
    if (!fullName) fullName = "";
    if (!profileImg) profileImg = "https://i.ibb.co/Dk6tD8k/user.png";
    if (!backgroundImg) backgroundImg = "https://i.ibb.co/2FC82LH/message.jpg";
    if (!instagram) instagram = "";
    if (!bio) bio = "";
    if (!gender) gender = "other";
    if (!state) state = "select";
    if (!city) city = "";
    if (!schoolDetails) schoolDetails = {};

    if (!schoolDetails.LKG) schoolDetails.LKG = "###";
    if (!schoolDetails.UKG) schoolDetails.UKG = "###";
    if (!schoolDetails.I) schoolDetails.I = "###";
    if (!schoolDetails.II) schoolDetails.II = "###";
    if (!schoolDetails.III) schoolDetails.III = "###";
    if (!schoolDetails.IV) schoolDetails.IV = "###";
    if (!schoolDetails.V) schoolDetails.V = "###";
    if (!schoolDetails.VI) schoolDetails.VI = "###";
    if (!schoolDetails.VII) schoolDetails.VII = "###";
    if (!schoolDetails.VIII) schoolDetails.VIII = "###";
    if (!schoolDetails.IX) schoolDetails.IX = "###";
    if (!schoolDetails.X) schoolDetails.X = "###";
    if (!schoolDetails.XI) schoolDetails.XI = "###";
    if (!schoolDetails.XII) schoolDetails.XII = "###";

    //------------------------------------------------------------------------------------//

    //Trimming Values----------------------------------------------------------------------
    fullName = fullName.trim();
    instagram = instagram.trim();
    bio = bio.trim();
    gender = gender.trim();
    state = state.trim();
    city = city.trim();
    //-----------------------------------------------------------------------------------//

    let allErrors = [];

    //Error Handling: -------------------------------------------------------------------->
    const allStates = ["select", "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"];

    const allGenders = ["male", "female", "other"];

    if (!allStates.includes(state))
        allErrors.push({ stateError: "Invalid State" });
    if (!allGenders.includes(gender))
        allErrors.push({ genderError: "Invalid Gender" });

    //School Details Validation ---------------------------------------------------------->
    for (let key in schoolDetails) {
        let arr = schoolDetails[key].split("#");

        if (arr.length != 4) {
            allErrors.push({ schoolDetailsError: "Class " + key + ": Wrong Format" });
        } else {
            //Trimming the Spaces
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].trim();
            }

            //Converting to Number
            const year1 = arr[0];
            const year2 = arr[1];

            //🔴🏃‍♂️Check if  year1 is of 4 digits and all digits are numbers -> Handle First in Frontend then Uncomment this!

            // if (year1 !== "" && (year1.length != 4 || isNaN(year1))) {
            // allErrors.push({
            // 		schoolDetailsError: "Class " + key + ": Invalid Year 1",
            // 	});
            // }

            // if (year1 !== "" && (year2.length != 4 || isNaN(year2))) {
            // 	allErrors.push({
            // 		schoolDetailsError: "Class " + key + ": Invalid Year 2",
            // 	});
            // }	

            //Concatenating After Trimming
            schoolDetails[key] = arr.join("#");
        }
    }
    //------------------------------------------------------------------------------------//

    //If any error found, then return error message
    if (allErrors.length > 0) {
        console.log("😥 Error in AllDetails Form Validation: \n", allErrors);
        res.status(200).json({ message: "Error in AllDetails Form Validation", allErrors: allErrors });
    }
    //If no error found, then call next() function
    else {
        req.data = { fullName, profileImg, backgroundImg, instagram, bio, gender, state, city, schoolDetails };
        next();
    }
};



