import {React, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/verifyEmail.module.css';

const VerifyEmail = () => {

    const[emailMessage, setEmailMessage] = useState("");

    const navigate = useNavigate();
    const {user_id} = useParams();
    console.log("user_id", user_id);


    function checkVerifyEmail() {
        // console.log('Verify Email');
        console.log("USEEFFECT");

        const url = `http://localhost:4000/verify/${user_id}`;

        axios.get(url)
            .then(res => {
                console.log("Email Verification Response: ",res.data);

                if(res.data.status==='success'){
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log("Email Verification Error!",err.message);
            });

    }

    useEffect(() => {
        //Check if the Email is Verified if Verified Redirect to Login Page
        // checkVerifyEmail();

    }, []);

    function sendMail(){
        setEmailMessage("📤 Sending mail...");
        console.log("Verify Email");
        
        const url = `http://localhost:4000/verify/${user_id}`;

        axios.post(url)
            .then(res => {
                console.log("Email Verification Response: ",res.data);
                setEmailMessage(res.data.message);
            })
            .catch(err => {
                console.log("Email Verification Error!",err.message);
            });

    }



    return (

        <div className={style.verify_email_page}>

        
            <div className={style.maindiv}>

                <h1>Thank's for signing up with FOF</h1>

                <div>
                    <img className={style.email_image} src="https://i.ibb.co/1KnJLzD/email.gif" alt=""/>
                </div>

                <p>We're happy you are here. Let's get your email address verified: </p>

                <br/>

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