import { React, useState, useEffect } from 'react';
import axios from 'axios';
import style from '../styles/home.module.css';

import FriendCard from '../components/FriendCard';
// import Loading from '../components/Loading';


const initialClassmates = {
    LKG: [], UKG: [], I: [], II: [], III: [], IV: [], V: [], VI: [], VII: [], VIII: [], IX: [], X: [], XI: [], XII: [],
};

const Home = () => {

    const [isHomePageLoaded, setIsHomePageLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [classmates, setClassmates] = useState(initialClassmates);

    async function fetchHomePage() {
        const url = 'http://localhost:4000/user/home';

        await axios.get(url, { withCredentials: true })
            .then(res => {
                console.log("Response (Home Page)", res.data);
                if (res.data.userInfo) {
                    setUserInfo(res.data.userInfo);
                    setClassmates(res.data.allClassesFriends);
                    setIsHomePageLoaded(true);
                }
            })
            .catch(err => {
                console.log("Error! Fetching Home Page!\n", err.message);
            });
    }

    useEffect(() => {
        fetchHomePage();
    }, []);

    if (isHomePageLoaded) {

        return (



            <>

                <div class={style.main_container}>

                <div class={style.profile_container}>

                    <div class={style.bgimg_div}>
                        <img class={style.bg_img} src={userInfo.backgroundImg} alt=""/>
                    </div>

                    <div class={style.info_div}>
                        <img class={style.profile_img} src={userInfo.profileImg} alt=""/>
                        <h1 class={style.full_name}> {userInfo.fullName} </h1>
                        <p class={style.user_name}> <i class="fa-regular fa-at"></i> {userInfo.username} </p>
                        <a class={style.user_insta} target="_blank" href={`https://www.instagram.com/${userInfo.instagram}/`}> <i class="fa-brands fa-instagram"></i> {userInfo.instagram} </a>
                        <p class={style.user_bio}> <i class="fa-regular fa-user"></i> {userInfo.bio} </p>
                    </div>

                </div>

                {
                    Object.keys(classmates).map((key, index) => {

                        return(
                            <div class={style.class_container}>
                                <div>
                                    <h1 class={style.class_heading}>Class - {key}</h1>
                                </div>

                                <div className={style.friends_container}>

                                    {classmates[key].map((friend) => (
                                        <FriendCard key={friend._id} friend={friend} />
                                    ))}

                                </div>
                            </div>
                        )
                    })
                }


            </div>


                {/*-----------Classmates and Classes------------*/}
                {/* {
                    Object.keys(classmates).map((key, index) => {

                        // console.log("Key: index: ",key,index);
                        // console.log("Value::: ",classmates[key]);

                        return (
                            <div key={key}>
                                <div>
                                    <h1 className={style.heading}> {key.toUpperCase()} </h1>
                                </div>

                                <div className={style.container_div}>

                                    {classmates[key].map((friend) => (
                                        <FriendCard key={friend._id} friend={friend} />
                                    ))}

                                </div>
                            </div>
                        )
                    })
                } */}
            </>
        )
    }

    else {
        return (
            // <Loading />
            <h1>Loading Home Page...</h1>
        )
    }
}

export default Home;