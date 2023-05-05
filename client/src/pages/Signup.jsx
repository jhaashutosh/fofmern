import React from 'react'
import axios from 'axios'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/login_signup.module.css'

const Signup = () => {

    const navigate = useNavigate();

    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");


    function signupRequest(values) {
        const url = 'http://localhost:4000/auth/signup';

        axios.post(url, values, { withCredentials: true })
            .then((res) => {
                console.log("Server Response: (Signup): ", res.data);
                if (res.data.validationError) {
                    const { usernameError, emailError, passwordError, confirmPasswordError } = res.data.allErrors;
                    setUsernameError(usernameError);
                    setEmailError(emailError);
                    setPasswordError(passwordError);
                    setConfirmPasswordError(confirmPasswordError);
                }
                else {
                    navigate('/login');
                    //Or Navigate to Verify Email Page!
                }
            })
            .catch((err) => { console.log("Error Signup!\n", err) });
    }


    function handleSubmit(e) {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        const values = { username, email, password, confirmPassword };

        console.log("Values: ", values);

        //Setting to Default Values
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let isUserNameError = true;
        let isEmailError = true;
        let isPasswordError = true;
        let isConfirmPasswordError = true;

        //Username Validation =========================================>
        if (username === "") {
            setUsernameError('Username is required!');
        }
        else if (username.length <= 3) {
            setUsernameError("Username must be greater than 3 characters!");
        }
        else if (username.length > 30) {
            setUsernameError("Username should not exceeds 30 characters!");
        }
        //Contain only lowercase, numbers, underscore
        else if (!/^[a-z0-9_]+$/.test(username)) {
            setUsernameError("Username can only contain lowercase, numbers, underscore!");
        }
        //First character must be a letter
        else if (!/^[a-z]/.test(username)) {
            setUsernameError("Username must start with a letter!");
        }
        else {
            isUserNameError = false;
        }

        //Email Validation =========================================>
        if (email.trim() === '') {
            setEmailError('Enter email !');
        }
        else {
            isEmailError = false;
        }

        //Password Validation ==========================================>
        if (password === "") {
            setPasswordError('Enter password !');
        }
        else if (password.length <= 3) {
            setPasswordError('Password must be greater than 3 characters!');
        }
        else if (password.length > 100) {
            setPasswordError('Password should not exceeds 100 characters!');
        }
        else {
            isPasswordError = false;
        }

        //Confirm Password Validation ==========================================>
        if (confirmPassword === "") {
            setConfirmPasswordError('Enter confirm password !');
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Password does not match !');
        }
        else {
            isConfirmPasswordError = false;
        }

        //If there is no error then send request to server
        if (!isUserNameError && !isEmailError && !isPasswordError && !isConfirmPasswordError) {
            signupRequest(values);
        }
    }

    return (
        <div className={style.login_signup_page}>
            <div className={style.main}>
                <div className={style.loginimagediv}>
                    <div className={style.imagediv} id="backimage">
                        <img className={style.imagediv} src="https://i.ibb.co/6XrkCRn/img2.jpg" alt="" />
                    </div>
                </div>

                <div className={style.login_signup} >
                    <h1 className={style.heading}>Sign Up</h1>

                    <form className={style.html_form} onSubmit={handleSubmit}>

                        <div className={style.inputfield}>
                            <i className="fas fa-user-edit"></i>
                            <input ref={usernameRef} className={style.inputarea} type="text" placeholder="Enter username" id="username" name="username" autoComplete='true' />
                        </div>
                        {/* User Name Error! */}
                        <p className={style.error_message}>{usernameError}</p>


                        <div className={style.inputfield}>
                            <i className="fas fa-envelope"></i>
                            <input ref={emailRef} className={style.inputarea} type="text" placeholder="Enter your email" id="email" name="email" autoComplete='true' />
                        </div>
                        {/* Email Error! */}
                        <p className={style.error_message}>{emailError}</p>


                        <div className={style.inputfield}>
                            <i className="fas fa-key"></i>
                            <input ref={passwordRef} className={style.inputarea} type="password" placeholder="Enter your password" id="pass1" name="pass1" autoComplete='true' />
                        </div>
                        {/* Password Error! */}
                        <p className={style.error_message}>{passwordError}</p>


                        <div className={style.inputfield}>
                            <i className="fas fa-key"></i>
                            <input ref={confirmPasswordRef} className={style.inputarea} type="password" placeholder="Confirm password" id="pass2" name="pass2" autoComplete='true' />
                        </div>
                        {/* Confirm Password Error! */}
                        <p className={style.error_message}>{confirmPasswordError}</p>

                        <input type="submit" className={style.submit} value="Sign Up" /> <br />

                    </form>

                    <label >Already have an Account?</label>
                    <Link to="/login" className={style.flipbutton}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;