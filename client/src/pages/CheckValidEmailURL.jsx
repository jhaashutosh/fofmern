import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';

import EmailVerificationSuccessful from './EmailVerificationSuccessful';

const CheckValidEmailURL = () => {

    const [emailVerification, setEmailVerification] = useState(false);
    const [email, setEmail] = useState('');

    const {token} = useParams();

    function verifyEmailToken(){

        const url = `http://localhost:4000/auth/checkValidEmailURL/${token}`;

        axios.get(url)
            .then(res=>{
                console.log("Email Verification Token (Response): ",res.data);
                if(res.data.emailVerified){
                    setEmail(res.data.email);
                    setEmailVerification(true);
                }
                else{
                    alert(res.data.message);
                }
            })
            .catch(err=>{
                console.log("Error! Email Verification Token! \n",err);
            })
    }

    useEffect(()=>{
        verifyEmailToken();
    },[])


    if(emailVerification){

        return (
            <EmailVerificationSuccessful email={email}/>
        )
    }
}

export default CheckValidEmailURL