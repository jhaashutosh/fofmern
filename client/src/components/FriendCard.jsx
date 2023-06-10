import React from 'react';
import style from './friendCard.module.css';

const FriendCard = ({ friend }) => {

    let instagram = friend.instagram;
    if(instagram.length > 15) instagram = instagram.slice(0,15) + "...";

    let fullName = friend.fullName;
    if(fullName.length > 13) fullName = fullName.slice(0,13) + "...";
    
    return (
        <div class={style.friend_card}>
            <img class={style.card_img} src={friend.profileImg} alt="" />
            <p class={style.card_fullname}>{fullName}</p>
            <a class={style.card_insta} target="_blank" href={`https://www.instagram.com/${friend.instagram}/`}> <i class="fa-brands fa-instagram"></i> {instagram} </a>
            <a class={style.card_view_profile} href="#">View Profile</a>
        </div>
    )
}

export default FriendCard;