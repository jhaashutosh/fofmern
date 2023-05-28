const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Models
const SignUpDetails = require("../models/SignUpDetails");
const AllDetails = require("../models/AllDetails");

//Functions
const { createPasscode } = require("../utility/jwtPasscode");
const { sendMail } = require("../utility/sendMail");

//What is the use of this Function resendVerifyMail? --------------------->
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


//Send Verification Mail -> GET Method  --> /auth/sendVerificationMail/:id
const sendVerifyMail = async (name, email, user_id) => {
	const userToken = createPasscode("50m", { user_id: user_id, email: email });
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
	let HTML_STRING = `<p> Hello ${name},<br>This mail is for verification, click here to verify: <br> <a href=${process.env.VERIFY_URL + userToken}>VERIFY</a></p>`;

	return (confirmation = sendMail(email, subject, HTML_STRING));
};

//VerifyMail Route -> GET Method  --> /auth/checkValidEmailURL/:token
exports.checkValidEmailURL = async (req, res) => {
	const userToken = req.params.id;
	try {
		const userData = jwt.verify(userToken, process.env.JWT_SECRET).payload[0];
		const userId = userData.user_id;

		console.log("ValidEmailURL Token: ", userData);

		const updatedVerify = await SignUpDetails.updateOne(
			{ _id: userId },
			{ $set: { isverified: true } }
		);

		return res.status(200).json({ message: 'Email Verified Successfully! ', emailVerified: true, email: userData.email });

	} catch (err) {
		console.log("⚠ Error! verifying Email \n", err);
		return res.status(200).json({ message: "😢 Error! Verifying Email! \n🕒URL Timeout or ❌Invalid URL", emailVerified: false });
	}
};

//Signup Route -> POST Method  --> /auth/signup
exports.signupController = (req, res) => {

	console.log("📑 Sign Up Form Data (After Validation): \n", req.data);
	const { username, email, password } = req.data;
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
			// sendVerifyMail(data.username, data.email, data._id);

			console.log("✅ SignUp Details Saved to Database Successfully! \n", data);
			res.status(200).json({ message: "✅ SignUp Details Saved to Database Successfully!" });
		})

		.catch((err) => {
			console.log("😥 Error in Saving Sign Up Form Data to Database: \n", err);
			res.status(500).json({ message: "😥 Error in Saving Sign Up Form Data to Database!" });
		});
};

//SendVerificationMail Route -> GET Method  --> /auth/sendVerificationMail/:id
exports.sendVerificationMailController = async (req, res) => {
	const id = req.params.id;
	console.log("🔑 User ID: ", id);

	let user;
	try {
		user = await SignUpDetails.findById(id);
	} catch (err) {
		return res.status(200).json({ message: "⚠ Error! Incorrect user ID!" });
	}

	if (user.isverified) {
		return res.status(200).json({ message: "✅ Email already Verified! (Go to Login Page)" });
	}
	else {
		//Sending Verification Mail
		const confirmation = await sendVerifyMail(user.username, user.email, user._id);
		if (confirmation === false) {
			return res.status(200).json({ message: "⚠ Error! Mail server not working!" });
		}
		else {
			return res.status(200).json({ message: "🥳📩 Mail Sent Successfully!" });
		}
	}
};

//Login Route -> POST Method  --> /auth/login
exports.loginController = async (req, res) => {

	//Email and Password from Login Form
	console.log("📑 Login Form Data (After Validation): \n", req.data);
	const { email, password } = req.data;

	//Finding User in Database
	const user = await SignUpDetails.findOne({ email });

	if (user) {

		//Checking Correct Password
		const auth = await bcrypt.compare(password, user.password);

		if (auth) {

			//Checking IF Email is Verified or Not
			if (user.isverified) {

				//Create JWT Token
				let token;

				try {
					token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
					console.log("JWT Token created Successfully!: ", token);

					//Creating Cookie
					res.cookie("jwtToken", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3 * (60 * 60 * 24) * 1000 });
					// console.log("JWT Cookie created Successfully in Browser!");

				} catch (err) {
					console.log("Error Creating JWT! Token (Login) \n", err);
					return res.status(500).send({ loginMessage: "Error Creating JWT! Token (Login)" });
				}

				//Checking if the User is Registered or not
				if (user.isregistered) {
					return res.status(200).send({ loginMessage: "Login Successful!", redirect: '/' });
				}
				else {
					return res.status(200).send({ loginMessage: "User is not Registered!", redirect: '/allDetails' });
				}
			}

			else {
				return res.status(200).send({ loginMessage: "Email is not Verified!", redirect: `/sendVerificationMail/${user._id}` });
			}
		}

		else {
			//Incorrect Password
			return res.status(200).send({ incorrectDetails: "Incorrect Email or Password!" });
		}
	}

	else {
		//Incorrect Email
		return res.status(200).send({ incorrectDetails: "Incorrect Email or Password!" });
	}

};

//Logout Route -> GET Method  --> /auth/logout
exports.logoutController = (req, res) => {
	//Fetching JWT Token from Cookie
	const token = req.cookies;
	console.log("🍪 JWT Token from Cookie: ", token);

	if (req.cookies && req.cookies.jwtToken) {
		res.clearCookie('jwtToken');
	}

	res.send({ logoutMessage: "Logout Successful!", redirect: '/login' });
};

//Forgot Password Route -> POST Method  --> /auth/forgotPassword
exports.forgotPasswordController = async (req, res) => {
	/*Input Form Data: -->
	  {
		  "email" : "connectrahul25@gmail.com",
	  }
	*/

	let email = req.body.email;
	console.log("📑 Forgot Password Form Data: \n", email);

	let errorMessage;

	//Handling False Values: Null, Undefined, Empty String, 0, -1, False, NaN
	if (!email) email = "";
	if (email === "") {
		errorMessage = "😐 Email is required!";
	} else if (!validator.isEmail(email)) {
		errorMessage = "❌📧 Invalid Email ID!";
	} else {
		//Checking if Email is present in Database. -> SignUpDetails Model
		const user = await SignUpDetails.findOne({ email });

		if (user) {
			//Sending Reset Password Mail-------------------->

			//Creating Token
			const userToken = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
			console.log("🔑Forgot Password Token: ", userToken);

			let subject = "FOF - Reset Password! ";
			let HTML_STRING = `<p> Hello ${user.username} !,<br>This is your reset password mail!, Click here to reset your password: <br> <a href=${process.env.FORGOT_PASS_URL + userToken}>VERIFY</a></p>`;

			const confirmation = await sendMail(email, subject, HTML_STRING);
			console.log("📧 Mail Sent: ", confirmation);
			if (!confirmation) {
				errorMessage = "😢📤 Error! Mail server not working! (Mail not Sent)";
			}

		} else {
			errorMessage = "❌ Email is not Registered!";
		}
	}

	//Sending Response
	if (errorMessage) {
		return res.status(200).send({ message: errorMessage, mailSent: false });
	} else {
		return res.status(200).send({ message: "📩🥳 Reset Password Mail Sent Successfully!", mailSent: true });
	}
};

//Check Reset Password Token Route -> GET Method  --> /auth/checkResetPasswordToken/:token
exports.checkResetPasswordTokenController = async (req, res) => {

	const token = req.params.token;
	console.log("🔑 Reset Password Token: ", token);

	let errorMessage;
	let userName;

	//Checking if Token is Valid or Not
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("🔑 Decoded Password Token: ", decoded);
		userName = decoded.username;
		const user = await SignUpDetails.findById(decoded.id);
		if (!user) errorMessage = "❌ User not Found!";
	} catch (err) {
		console.log("🔑 Error Decoding Token: ", err);
		errorMessage = "❌ Invalid Token! or 🕒Token Expired!";
	}

	//Sending Response
	if (errorMessage) {
		return res.status(200).send({ message: errorMessage, validToken: false });
	} else {
		return res.status(200).send({ message: "🔑🥳 Token is Valid!", validToken: true, userName: userName });
	}
};

//Set New Password Route -> POST Method  --> /auth/setNewPassword/:token
exports.setNewPasswordController = async (req, res) => {
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
		allErrors.push({ confirmPasswordError: "Password and Confirm Password should be same!" });

	else if (password.length < 3)
		allErrors.push({ passwordError: "Password should be atleast 3 characters long!" });

	else if (password.length > 100)
		allErrors.push({ passwordError: "Password should be atmost 100 characters long!" });

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

				console.log("🔴 Values: ", decodedToken.email, decodedToken.username, hashPassword);

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
		return res.status(200).send({ allErrors: allErrors, passwordUpdated: false });
	} else {
		return res.status(200).send({ message: "Password Updated Successfully!", passwordUpdated: true });
	}
};

//Check If User is Logged In or Not -> GET Method  --> /auth/checkIfUserIsLoggedIn
exports.checkIfUserIsLoggedInController = async (req, res) => {

	let token;

	//Fetching JWT Token from Cookie
	if (req.cookies && req.cookies.jwtToken) {
		token = req.cookies.jwtToken;
	}
	console.log("🍪 JWT Token from Cookie: (checkIfUserIsLoggedIn)", token);

	//Decoding JWT Token
	let decodedToken;
	try {
		decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
		console.log("🔑 Decoded JWT Token: ", decodedToken);
	}
	catch (err) {
		console.log("Error Decoding JWT Token!", err);
	}

	//Sending Response
	if (decodedToken) return res.status(200).send({ isLoggedIn: true });
	else return res.status(200).send({ isLoggedIn: false });

}