import { React, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/setNewPassword.module.css';
import PasswordResetSuccessful from './PasswordResetSuccessful';

const SetNewPassword = () => {

    const { token } = useParams();
    // console.log("JWT TOKEN: ", token);

    const navigate = useNavigate();

    const [validURL, setValidURL] = useState(false);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
    const [userName, setUserName] = useState("");

    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const [passwordError, setPasswordError] = useState('');


    function resetPassword(e) {
        e.preventDefault();

        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        setPasswordError('');

        if (password === '') setPasswordError("😑 Please Enter Password!");

        else if (confirmPassword === '') setPasswordError("😑 Please Enter Confirm Password!");

        else if (password.length <= 3) setPasswordError("😐 Password must be 3 Character Long!");

        else if (password !== confirmPassword) setPasswordError("🙄 Confirm Password do not match!")


        else {

            setPasswordError("");

            const url = `http://localhost:4000/auth/setNewPassword/${token}`;

            axios.post(url, { password, confirmPassword })
                .then(res => {
                    console.log("Response from Server (SetNewPassword): ", res.data);

                    if (res.data.passwordUpdated) {
                        setPasswordResetSuccess(true);
                    }
                    else {
                        const arr = res.data.allErrors;
                        for (let i = 0; i < arr.length; i++) {
                            for (let key in arr[i]) {
                                if (key == 'passwordError') setPasswordError(arr[i][key]);
                                else setPasswordError(arr[i][key]);
                            }
                        }
                    }

                })
                .catch(err => {
                    console.log("Error Resetting Password! ", err.message);
                });
        }

    }

    //Function to Check if The url is Valid or Not
    function checkValidURL() {

        const url = `http://localhost:4000/auth/checkResetPasswordToken/${token}`;
        axios.get(url)
            .then(res => {
                console.log("Server Response (Set New Password): ", res.data);
                if (res.data.validToken) {
                    setUserName(res.data.userName);
                    setValidURL(true);
                }
                else {
                    alert(res.data.message);
                }

            })
            .catch(err => {
                console.log("Error Validating URL (Reset Password)", err.message);
            });
    }

    useEffect(() => {
        checkValidURL();
    }, [])

    if (passwordResetSuccess) {
        return (
            <PasswordResetSuccessful userName={userName} />
        )
    }

    if (validURL) {

        return (
            <div className={style.set_new_password_page}>
                <div className={style.maindiv}>

                    <div className={style.imagediv}>
                        <img className={style.image_} src="https://i.ibb.co/371PLk0/resetpassword.jpg" alt="" />
                    </div>

                    <h1>Reset Password?</h1>

                    <p>Please Enter your New Password!</p>
                    <br />

                    <form className={style.html_form} onSubmit={resetPassword}>
                        <input type="password" className={style.input_password} ref={passwordRef} placeholder="New Password" />
                        <i id="togglepass1" className="bi-eye-slash"></i>

                        <br /> <br />

                        <input type="password" className={style.input_password} ref={confirmPasswordRef} placeholder="Confirm New Password" />
                        <i id="togglepass2" className="bi-eye-slash"></i>

                        <p className={style.incorrect_pass}> {passwordError} </p>

                        <input type="submit" value="Change Password" className={style.button1} />
                    </form>

                </div>
            </div>
        )
    }

}

export default SetNewPassword