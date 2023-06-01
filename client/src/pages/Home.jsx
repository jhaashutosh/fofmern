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
                <div className={style.home_page}>

                    <div className={style.main}>
                        <div className={style.background}>
                            <div className={style.profile}>
                                <div className={style.imagediv}>
                                    <img src={userInfo.imageURL} alt="" />
                                </div>
                                <h1 className={style.heading1}> {userInfo.fullName} ({userInfo.username})</h1>
                                <h5 className={style.heading5}>There is one Rule! that there is no rule!</h5>
                            </div>
                        </div>
                    </div>
                </div>



                {/*-----------Classmates and Classes------------*/}
                {
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
                }
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