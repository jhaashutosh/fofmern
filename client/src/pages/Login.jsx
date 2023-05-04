import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/login_signup.module.css";

const Login = () => {
  return (
    <div className={style.login_signup_page}>

      <div className={style.main}>

          <div id="login" className={style.login_signup}>

              <h1 className={style.heading}>Login</h1>

              <form className={style.html_form}>

                  <div className={style.inputfield}>
                      <i className="fas fa-envelope"></i>
                      <input className={style.inputarea} type="email" placeholder="Enter your email" id="email" name="email" autoComplete='true'/> 
                  </div>

                  {/* Email Errors! */}
                  <p className={style.error_message}></p>
                  
                  <div className={style.inputfield}>
                      <i className="fas fa-key"></i>
                      <input className={style.inputarea} type="password" placeholder="Enter your password" id="password" name="password" autoComplete='true'/>  
                  </div>

                  {/* Password Errors! */}
                  <p className={style.error_message}> </p>
                  
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
