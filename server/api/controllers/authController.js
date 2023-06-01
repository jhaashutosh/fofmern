const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Models
const SignUpDetails = require("../models/SignUpDetails");
const AllDetails = require("../models/AllDetails");
const WebsiteDetails = require("../models/WebsiteDetails");

//Functions
const { sendMail } = require("../utility/sendMail");

const { createJWT } = require("../utility/createJWT");


//SendVerificationMail Route -> GET Method  --> /auth/sendVerificationMail/:id
exports.sendVerificationMailController = async (req, res) => {

	const userId = req.params.id;
	console.log("🔑 User ID: (SendVerificationMail) ", userId);

	//Checking if User is Present in Database
	const user = await SignUpDetails.findById(userId);

	if (!user) {
		return res.status(200).json({ message: "⚠ Error! Incorrect user ID!" });
	}
	else {
		if (user.isverified) res.status(200).json({ message: "✅ Email already Verified! (Go to Login Page)" });

		else {

			//Creating Token
			const userToken = createJWT({ user_id: user._id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
			console.log("🔑Email Verification Token: ", userToken);

			//Sending Verification Mail
			const userName = user.username;
			const fullURL = process.env.VERIFY_URL + userToken;

			const subject = "Verification mail from FOF";

			const HTMLString = `

				<div style="max-width: 430px; border-top: 4px solid #16d71c; border-left: 1px solid #ccc; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; background-color: white; padding: 30px 20px; border-radius: 5px; text-align: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">

					<h1 style="font-size: 20px; text-decoration: underline; font-weight: bolder; font-family: Arial, Helvetica, sans-serif; color: #42AD39;">FOF - Find Old Friend</h1>
					
					<h3>Verify your email address</h3>

					<p style="font-size: 15px; color: #666; margin-bottom: 40px; font-weight: 400;"> 👋Hello <strong style="color:black">${userName}</strong>, Please confirm that you want to use this as your FOF account email address. Once it's done you will be able to start search your friends.</p>

					<a style="text-decoration: none; background-color: #42AD39; font-weight: 600; color: white; border-radius: 5px; padding: 12px 80px; font-size: 14px;" href="${fullURL}">Verify Email</a>

					<br><br>

				</div>
			`

			const confirmation = await sendMail(user.email, subject, HTMLString);

			if (confirmation === false) {
				return res.status(200).json({ message: "⚠ Error! Mail server not working!" });
			}
			else {
				return res.status(200).json({ message: "🥳📩 Mail Sent Successfully!" });
			}
		}
	}
};

//VerifyMail Route -> GET Method  --> /auth/checkValidEmailURL/:token
exports.checkValidEmailURL = async (req, res) => {
	const userToken = req.params.id;
	try {
		const userData = await jwt.verify(userToken, process.env.JWT_SECRET);
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
exports.signupController = async (req, res) => {

	console.log("📑 Sign Up Form Data (After Validation): \n", req.data);
	const { username, email, password } = req.data;
	const numberOfTries = 1;

	//Saving Data to Database SignUpDetails Model
	const signup_details = new SignUpDetails({ username, email, password, numberOfTries });

	//Increasing Total Users Count
	try {
		const updatedWebsiteDetails = await WebsiteDetails.updateOne({}, { $inc: { totalUsers: 1 } });
		console.log("🙋‍♂️Total Users Count Updated Successfully! \n", updatedWebsiteDetails);
	}
	catch (err) { console.log("😥 Error in Updating Total Users Count! \n", err) }

	signup_details
		.save()
		.then(async (data) => {
			console.log("✅ SignUp Details Saved to Database Successfully! \n", data);
			res.status(200).json({ message: "✅ SignUp Details Saved to Database Successfully!" });
		})

		.catch((err) => {
			console.log("😥 Error in Saving Sign Up Form Data to Database: \n", err);
			res.status(200).json({ message: "😥 Error in Saving Sign Up Form Data to Database!" });
		});
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
				const token = createJWT({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
				console.log("🔑 JWT Token Created! (Login):", token);

				//Creating Cookie
				res.cookie("jwtToken", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3 * (60 * 60 * 24) * 1000 });
				console.log("JWT Cookie created Successfully in Browser!");


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

	//Validating Email!
	if (email === "") {
		errorMessage = "😐 Email is required!";
	}
	else if (!validator.isEmail(email)) {
		errorMessage = "❌📧 Invalid Email ID!";
	}
	else {
		//Checking if Email is present in Database. -> SignUpDetails Model
		const user = await SignUpDetails.findOne({ email });

		if (user) {
			//Sending Reset Password Mail-------------------->
			const userToken = createJWT({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
			console.log("🔑Forgot Password Token: ", userToken);

			const subject = "FOF (Find Old Friend) - Reset Password! ";
			const forgotPasswordURL = process.env.FORGOT_PASS_URL + userToken;

			const HTMLString = `
				<div style=" max-width:400px; background-color: white;  padding: 30px 20px; border-top: 4px solid #00B3E3; border-left: 1px solid #ccc; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; border-radius: 5px; box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2); text-align: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
					
					<h1 style="font-size: 20px; text-decoration: underline; font-weight: bolder; font-family: Arial, Helvetica, sans-serif; color: #0084e3;">FOF - Find Old Friend</h1>
					<h3>Password Reset</h3>
			
					<p style="font-size: 15px; color: #666; margin-bottom: 40px; font-weight: 500;"> If you have lost your password or wish to reset it, use the link below to get started.</p>
			
					<a style="text-decoration: none; background-color: #0090e3; font-weight: 600; color: white; border-radius: 5px; padding: 12px 80px; font-size: 14px;" href=${forgotPasswordURL}>Reset Your Password</a>
			
					<br><br>
			
					<p style="font-size: 12px; color: #666;">Note: If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password. </p>
			
				</div>
			`

			const confirmation = await sendMail(email, subject, HTMLString);

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
		console.log("Error Decoding JWT Token! => User is not Logged In!");
	}

	//Sending Response
	if (decodedToken) return res.status(200).send({ isLoggedIn: true });
	else return res.status(200).send({ isLoggedIn: false });

}


//Increase Visitor Route -> GET Method  --> /auth/websiteDetails
exports.websiteDetailsController = async (req, res) => {

	//If Visitor Count is not present in Database -> Create it!
	const totalDetails = await WebsiteDetails.find();

	if (totalDetails.length === 0) {
		//Saving Data to Database WebsiteDetails Model
		const website_details = new WebsiteDetails({ totalVisitors: 1 });

		website_details
			.save()
			.then((data) => {
				console.log("✅ Website Details Created! \n", data);
			})
			.catch((err) => {
				console.log("😥 Error in Saving Website Details! \n", err);
			});
	}

	else {

		//Updating Visitor Count
		const updatedWebsiteDetails = await WebsiteDetails.updateOne(
			{},
			{ $inc: { totalVisitors: 1 } }
		);
	}

	//Fetching Updated Visitor Count
	const updatedWebsiteDetails = await WebsiteDetails.find();
	console.log("📑 Website Details: \n", updatedWebsiteDetails[0]);

	//Sending Response
	return res.status(200).send({ websiteDetails: updatedWebsiteDetails[0] });
}