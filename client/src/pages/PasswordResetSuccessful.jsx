import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/passwordResetSuccessful.module.css';

const PasswordResetSuccessful = () => {
    return (
        <div className={style.password_reset_successful_page}>

            <div className={style.maindiv}>

                <div className={style.imagediv}>
                    <img className={style.image} src="https://i.ibb.co/qNKHd6F/resetpassword.webp" alt="" />
                </div>

                <h1>Password Changed! 🥳</h1>

                <p>Your Password has been changed successfully.</p>

                <div className={style.buttondiv}>
                    {/* <a className={style.button} href="/login">Login to your Account</a> */}
                    <Link to="/login" className={style.button}>Login to your Account</Link>
                </div>

            </div>
        </div>
    )
}

export default PasswordResetSuccessful;