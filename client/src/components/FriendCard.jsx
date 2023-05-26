import React from 'react';
import style from './friendCard.module.css';

const FriendCard = ({friend}) => {

    return (
        <div className={style.profile_card}>
            <div className={style.imagediv}>
                <img className={style.profile_img} src={friend.imageURL} alt=""/>
            </div>

            <p className={style.name}>  {friend.fullname}  </p> 
            <p className={style.user_name}> {friend.username} </p>

            
            <p className={style.instagram}> <i className="fa-brands fa-instagram"></i> {friend.instagram} </p>

            <div className={style.button_div}>
                <button className={`${style.button} ${style.add_friend}`} id="add_friend"> Add Friend</button>
                <button className={`${style.button} ${style.view_profile}`} id="view_profile"> View Profile</button>
            </div>
        </div>
    )
}

export default FriendCard;