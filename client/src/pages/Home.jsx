import { React, useState, useEffect } from 'react';
import axios from 'axios';
import style from '../styles/home.module.css';

import FriendCard from '../components/FriendCard';
// import Loading from '../components/Loading';

import { useFOFContext } from "../context/context";

// const initialClassmates = {
//     LKG: [], UKG: [], I: [], II: [], III: [], IV: [], V: [], VI: [], VII: [], VIII: [], IX: [], X: [], XI: [], XII: [],
// }

const Home = () => {

    const { isHomePageLoaded, setIsHomePageLoaded, userInfo, setUserInfo, classmates, setClassmates } = useFOFContext();

    //Fetch all the classmates of One class
    async function searchFriends(searchInfo) {

        const url = 'http://localhost:4000/user/searchFriends';
        try {
            const result = await axios.post(url, searchInfo, { withCredentials: true });
            return result.data.friends;
        }
        catch (err) {
            console.log("Error! Fetching (SearchFriends Page): \n", err);
            return [];
        }
    }


    //Fetch all the classmates of Every class from LKG to XII
    async function fetchAllClasses(schoolDetails) {

        Object.keys(schoolDetails).forEach(async (key) => {
            const value = schoolDetails[key];
            // console.log(`Key: ${key}, Value: ${value}`);

            const data = await searchFriends({ className: key, hashString: value });
            // console.log("Data of Class: ", data);

            if (data.length != 0) {
                setClassmates((prev) => {
                    return { ...prev, [key]: data }
                });
            }
        });

        //Home Page is loaded Completely
        setIsHomePageLoaded(true);
    }


    async function fetchHomePage() {
        const url = 'http://localhost:4000/user/userInformation';

        await axios.get(url, { withCredentials: true })
            .then(res => {
                console.log("Response (Home Page)", res.data);
                if (res.data.userInfo) {
                    //Fetch the user information
                    setUserInfo(res.data.userInfo);
                    //Fetch all the classmates of Every class from LKG to XII
                    fetchAllClasses(res.data.userInfo.schoolDetails);
                }
            })
            .catch(err => {
                console.log("Error! Fetching Home Page!\n", err.message);
            });
    }

    useEffect(() => {
        if (!isHomePageLoaded) {
            fetchHomePage();
        }
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