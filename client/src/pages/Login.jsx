import { useRef, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import style from "../styles/login_signup.module.css";

const Login = () => {

    const navigate = useNavigate();
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState(""); 

    const loginRequest = async (values) => {

        const url = "http://localhost:4000/auth/login";

        //Using Axios 
        axios.post(url, values, {withCredentials: true})
        .then((response) => {
            console.log("📑Login Response! \n", response.data);
            const {incorrectDetails, redirect} = response.data;

            if(incorrectDetails){
                setPasswordError(incorrectDetails);
            }
            else if(redirect){
                navigate(redirect);
            }
        })
        .catch((error) => {
            console.log("😢Login Error! \n", error);
            //If User Doesn't Exist -> Show Error Message!
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const values = {email, password};
        console.log("Login Form Values: \n", values);

        setEmailError("");
        setPasswordError("");

        //Email Validation
        if(email.trim() === "") setEmailError("Email is required!");
        if(password.trim() === "") setPasswordError("Password is required!");
        else{
            //Login Request to Server -> Checking if User Exists! (Email & Password is Correct or Not!)
            loginRequest(values);
        }

        

    }

    return (
        
        <div className={style.login_signup_page}>

            <div className={style.main}>

                <div id="login" className={style.login_signup}>

                    <h1 className={style.heading}>Login</h1>

                    <form className={style.html_form} onSubmit={handleSubmit}>

                        <div className={style.inputfield}>
                            <i className="fas fa-envelope"></i>
                            <input ref={emailRef} className={style.inputarea} type="email" placeholder="Enter your email" id="email" name="email" autoComplete='true'/> 
                        </div>

                        {/* Email Errors! */}
                        <p className={style.error_message}> {emailError} </p>
                        
                        <div className={style.inputfield}>
                            <i className="fas fa-key"></i>
                            <input ref={passwordRef} className={style.inputarea} type="password" placeholder="Enter your password" id="password" name="password" autoComplete='true'/>  
                        </div>

                        {/* Password Errors! */}
                        <p className={style.error_message}> {passwordError} </p>
                        
                        <Link to='/forgotpassword'>Forgot Password?</Link> <br/>

                        <input type="submit" className={style.submit} value="Login"/> <br/>
                    </form>

                    <label>Don't have an Account?</label>
                    <Link to="/signup" className={style.flipbutton}>Sign Up</Link>

                </div>


                <div id="imagediv">
                    <div className={style.imagediv}>
                        <img src="https://i.ibb.co/yghFXm4/img.jpg" alt=""/>
                        <p className={style.quote}>Every New Friend is a new Adventure</p>
                    </div>
                </div>
                
            </div>

        </div>
    );
};

export default Login;
