
//Verification Mail 
const userName = 'rk_25';
const baseURL = 'http://localhost:3000/checkValidEmailURL/';
const token = 'xxxtokenxxx';
const fullURL = baseURL + token;

const verificationMail = `

    <div style="max-width: 430px; border-top: 4px solid #16d71c; border-left: 1px solid #ccc; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; background-color: white; padding: 30px 20px; border-radius: 5px; text-align: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">

        <h1 style="font-size: 20px; text-decoration: underline; font-weight: bolder; font-family: Arial, Helvetica, sans-serif; color: #42AD39;">FOF - Find Old Friend</h1>
        
        <h3>Verify your email address</h3>

        <p style="font-size: 15px; color: #666; margin-bottom: 40px; font-weight: 400;"> 👋Hello <strong style="color:black">${userName}</strong>, Please confirm that you want to use this as your FOF account email address. Once it's done you will be able to start search your friends.</p>

        <a style="text-decoration: none; background-color: #42AD39; font-weight: 600; color: white; border-radius: 5px; padding: 12px 80px; font-size: 14px;" href="${fullURL}">Verify Email</a>

        <br><br>

    </div>
`

//Forgot Password Mail
const forgotPasswordURL = 'http://localhost:3000/setNewPassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Nzc4NmRjNTBlNjAwODMzYjc2YTMwOCIsImVtYWlsIjoiY29ubmVjdHJhaHVsMjVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJyYWh1bDI1IiwiaWF0IjoxNjg1NTU1NjgyLCJleHAiOjE2ODgxNDc2ODJ9.kxgaVC4CBJiC5n0DjSzFMErphDIIcO1Il-y2T4VxaMw';

const forgotPasswordMail = `

    <div style=" max-width:400px; background-color: white;  padding: 30px 20px; border-top: 4px solid #00B3E3; border-left: 1px solid #ccc; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; border-radius: 5px; box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2); text-align: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                        
        <h1 style="font-size: 20px; text-decoration: underline; font-weight: bolder; font-family: Arial, Helvetica, sans-serif; color: #0084e3;">FOF - Find Old Friend</h1>
        <h3>Password Reset</h3>

        <p style="font-size: 15px; color: #666; margin-bottom: 40px; font-weight: 500;"> If you have lost your password or wish to reset it, use the link below to get started.</p>

        <a style="text-decoration: none; background-color: #0090e3; font-weight: 600; color: white; border-radius: 5px; padding: 12px 80px; font-size: 14px;" href=${forgotPasswordURL}>Reset Your Password</a>

        <br><br>

        <p style="font-size: 12px; color: #666;">Note: If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password. </p>

    </div>
`

console.log(verificationMail);
console.log(forgotPasswordMail);