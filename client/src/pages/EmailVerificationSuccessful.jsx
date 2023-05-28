import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/emailVerificationSuccessful.module.css';

const EmailVerificationSuccessful = ({ email }) => {
    return (
        <div className={style.email_verification_succesful_page}>
            <div className={style.maindiv}>

                <h1>Account Activated</h1>

                <div id="imagediv">
                    <img className={style.image} src="https://i.ibb.co/xskpCz9/email-success.webp" alt="" />
                </div>

                <strong>👋 Hello!  {email} </strong>

                <p>Thank you, your email has been verified. Your account in now active. Please use the <b>link below</b> 👇 to login to your account. </p>

                <div className={style.buttondiv}>
                    <Link to="/login" className={style.button}>Login to your Account</Link>
                </div>

            </div>
        </div>
    )
}

export default EmailVerificationSuccessful;