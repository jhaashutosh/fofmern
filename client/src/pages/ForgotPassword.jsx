import {React, useRef, useState} from 'react';
import axios from 'axios';
import style from '../styles/forgotPassword.module.css';

const ForgotPassword = () => {

    const emailRef = useRef("");
    const [emailMessage, setEmailMessage] = useState('');

    function sendMail(e){
        e.preventDefault();

        const email = emailRef.current.value;

        setEmailMessage("📤Sending Mail...");
        
        const url = 'http://localhost:4000/auth/forgotPassword';
        axios.post(url,{email})
            .then(res=>{
                console.log("Response Server: Forgot Password: ",res.data);
                if(res.data.message){
                    setEmailMessage(res.data.message);
                }
            })
            .catch(err=>{
                console.log("Error! Forgot Password \n",err.message);
            })
    }

    return (
        <div className={style.forgot_password_page}>

            <div className={style.maindiv}>
                <div id="imagediv">
                    <img className={style.image_} src="https://i.ibb.co/S0fQn3L/forgot.png" alt=""/>
                </div>

                <h1>Forgot password?</h1>

                <p>No worries! just enter your email and we'll send you a reset password link.</p>
                <br/>

                <form className={style.html_form} onSubmit={sendMail}>
                    <input className={style.input_email} type="email" ref={emailRef} name="email" placeholder="Enter your email"/>

                    <p className={style.message_box}> {emailMessage} </p>

                    <input  type="submit" value="Send Email" className={style.button}/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;