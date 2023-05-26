import axios from 'axios';
import { React, useState } from 'react'
import style from '../styles/allDetails.module.css';

import FriendCard from '../components/FriendCard';

const SearchFriends = () => {

    const [friendList, setFriendList] = useState([]);

    const [form, setForm] = useState({
        class: '',
        y1: '',
        y2: '',
        schoolname: '',
        placeId: '',
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log("Form: ",form);

        const url = 'http://localhost:4000/user/searchFriends';

        const searchInfo = {
            className : form.class,
            hashString : form.y1 +'#'+ form.y2 +'#'+ form.schoolname.trim() +'#'+ form.placeId.trim(),
        }

        axios.post(url, searchInfo, { withCredentials: true })
            .then(res => {
                console.log("Response: (SearchFriends Page): ", res.data);
                //Setting the friendList to the response data
                setFriendList(res.data.friends);
            })
            .catch(err => {
                console.log("Error!!! Fetching (SearchFriends Page): \n", err);
            });
    }



    return (

        <>
            <div className={style.register_page}>

                <div className={style.maindiv}>

                    <div className={style.heading}>
                        <h1>SEARCH YOUR FRIEND</h1>
                    </div>

                    <form onSubmit={handleSubmit} className={style.html_form}>

                        <fieldset>

                            <legend>School Details: </legend>

                            <table>

                                <tbody>

                                    <tr>
                                        <td><label className={style.labeltext} htmlFor="class">Class* : </label></td>

                                        <td>
                                            <select required name='class' onChange={handleChange} defaultValue={'select'}>
                                                <option value="" >Select...</option>
                                                <option value="LKG">LKG</option>
                                                <option value="UKG">UKG</option>
                                                <option value="I">I</option>
                                                <option value="II">II</option>
                                                <option value="III">III</option>
                                                <option value="IV">IV</option>
                                                <option value="V">V</option>
                                                <option value="VI">VI</option>
                                                <option value="VII">VII</option>
                                                <option value="VIII">VIII</option>
                                                <option value="IX">IX</option>
                                                <option value="X">X</option>
                                                <option value="XI">XI</option>
                                                <option value="XII">XII</option>
                                            </select>
                                        </td>

                                    </tr>

                                    <tr>
                                        <td><label className={style.labeltext}> Year1* (YYYY) :</label></td>
                                        <td><input required type="number" name="y1" value={form.y1} onChange={handleChange} /></td>
                                    </tr>

                                    <tr>
                                        <td><label className={style.labeltext}> Year2* (YYYY) :</label></td>
                                        <td><input required type="number" name="y2" value={form.y2} onChange={handleChange} /></td>
                                    </tr>

                                    <tr>
                                        <td><label className={style.labeltext}> School Name (Google Map)* :</label></td>
                                        <td><input required className={style.inputfield} type="text" name="schoolname" value={form.schoolname} onChange={handleChange} /> </td>
                                    </tr>

                                    <tr>
                                        <td><label className={style.labeltext} htmlFor="">Place ID (Google Map)*: </label></td>
                                        <td><input required className={style.inputfield} type="text" name="placeId" value={form.placeId} onChange={handleChange} /></td>
                                    </tr>

                                </tbody>
                            </table>

                        </fieldset>


                        <div id="buttondiv">
                            <input className={style.register_button} type="submit" value="SEARCH" />
                        </div>

                    </form>

                </div>



            </div>

            <div className={style.heading1}>
                <h1>Search Friends Results: ({friendList.length})</h1>
            </div>

            <div className={style.container_div}>

                {friendList.map((friend) => (
                    <FriendCard key={friend._id} friend={friend} />
                ))}

            </div>

        </>

    )
}

export default SearchFriends