import React from 'react'
import style from '../styles/error404.module.css'

const Error404 = () => {
  
  return (
    <div className={style.maindiv}>
        <div className={style.box}>
            <h1 className={style.error404}> Error! 404 </h1>
            <p className={style.message}>PAGE NOT FOUND!</p>
        </div>
    </div>
  )
  
}

export default Error404;