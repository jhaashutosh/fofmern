import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/verifyEmail.module.css';

const VerifyEmail = () => {

    const [emailMessage, setEmailMessage] = useState("");

    const navigate = useNavigate();
    const { userId } = useParams();
    console.log("User Id: ", userId);

    function sendMail() {

        setEmailMessage("📤 Sending mail...");

        const url = `http://localhost:4000/auth/sendVerificationMail/${userId}`;

        axios.get(url)
            .then(res => {
                console.log("Email Verification Response: ", res.data);
                setEmailMessage(res.data.message);
            })
            .catch(err => {
                console.log("Email Verification Error!", err.message);
            });
    }


    return (

        <div className={style.verify_email_page}>


            <div className={style.maindiv}>

                <h1>Thank's for signing up with FOF</h1>

                <div>
                    <img className={style.email_image} src="https://i.ibb.co/1KnJLzD/email.gif" alt="" />
                </div>

                <p>We're happy you are here. Let's get your email address verified: </p>

                <br />

                <div>
                    <button onClick={sendMail} className={style.button}>Click to verify Email!</button>
                </div>

                {/* <input type="text" name="id_value" id="id_value"/> */}

                <div>
                    <p className={style.message_box}> {emailMessage} </p>
                </div>

            </div>

        </div>
    )
}

export default VerifyEmail