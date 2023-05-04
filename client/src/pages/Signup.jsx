import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/login_signup.module.css'

const Signup = () => {

  return(
    <div className={style.login_signup_page}>
        <div className={style.main}>
            <div className={style.loginimagediv}>
                <div className={style.imagediv} id="backimage">
                    <img className={style.imagediv}  src="https://i.ibb.co/6XrkCRn/img2.jpg" alt=""/>
                </div>
            </div>

            <div className={style.login_signup} > 
                <h1 className={style.heading}>Sign Up</h1>

                <form className={style.html_form}>

                    <div className={style.inputfield}>
                        <i className="fas fa-user-edit"></i>
                        <input className={style.inputarea} type="text" placeholder="Enter username"  id="username" name="username" autoComplete='true'/> 
                    </div>
                    {/* User Name Error! */}
                    <p className={style.error_message}></p>
                    

                    <div className={style.inputfield}>
                        <i className="fas fa-envelope"></i>
                        <input className={style.inputarea} type="text" placeholder="Enter your email"  id="email" name="email" autoComplete='true'/> 
                    </div>
                    {/* Email Error! */}
                    <p className={style.error_message}></p>

                    
                    <div className={style.inputfield}>
                        <i className="fas fa-key"></i>
                        <input className={style.inputarea} type="password" placeholder="Enter your password"  id="pass1" name="pass1" autoComplete='true'/> 
                    </div>
                    {/* Password Error! */}
                    <p className={style.error_message}></p>    


                    <div className={style.inputfield}>
                        <i className="fas fa-key"></i>
                        <input className={style.inputarea} type="password" placeholder="Confirm password"  id="pass2" name="pass2" autoComplete='true'/> 
                    </div>
                    {/* Confirm Password Error! */}
                    <p className={style.error_message}></p>

                    <input type="submit" className={style.submit} value="Sign Up"/> <br/>
                    
                </form>

                <label >Already have an Account?</label>
                <Link to="/login" className={style.flipbutton}>Login</Link>
            </div>
        </div>
    </div>
)
}

export default Signup;