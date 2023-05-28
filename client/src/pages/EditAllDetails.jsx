import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/allDetails.module.css';

const initialValues = {
    imageURL: '',
    instagram: '',
    fullName: '',
    gender: '',
    state: '',
    city: '',

    LKG_y1: '', LKG_y2: '', LKG_school: '', LKG_placeID: '',
    UKG_y1: '', UKG_y2: '', UKG_school: '', UKG_placeID: '',
    I_y1: '', I_y2: '', I_school: '', I_placeID: '',
    II_y1: '', II_y2: '', II_school: '', II_placeID: '',
    III_y1: '', III_y2: '', III_school: '', III_placeID: '',
    IV_y1: '', IV_y2: '', IV_school: '', IV_placeID: '',
    V_y1: '', V_y2: '', V_school: '', V_placeID: '',
    VI_y1: '', VI_y2: '', VI_school: '', VI_placeID: '',
    VII_y1: '', VII_y2: '', VII_school: '', VII_placeID: '',
    VIII_y1: '', VIII_y2: '', VIII_school: '', VIII_placeID: '',
    IX_y1: '', IX_y2: '', IX_school: '', IX_placeID: '',
    X_y1: '', X_y2: '', X_school: '', X_placeID: '',
    XI_y1: '', XI_y2: '', XI_school: '', XI_placeID: '',
    XII_y1: '', XII_y2: '', XII_school: '', XII_placeID: '',
};

const EditAllDetails = () => {

    //Form Values
    const [form, setForm] = useState(initialValues);
    //Profile Picture
    const [image, setImage] = useState('https://i.ibb.co/Zd5rxk7/dp.jpg');

    const navigate = useNavigate();

    function updateImage(e) {
        const img = e.target.value;
        if (img.trim() === '') setImage('https://i.ibb.co/Zd5rxk7/dp.jpg');
        else setImage(img);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }


    function setInitialValues(data) {

        console.log("Data: ", data);

        //Updating Profile Image
        setImage(data.imageURL);

        const LKG = data.schoolDetails.LKG.split('#');
        const UKG = data.schoolDetails.UKG.split('#');
        const I = data.schoolDetails.I.split('#');
        const II = data.schoolDetails.II.split('#');
        const III = data.schoolDetails.III.split('#');
        const IV = data.schoolDetails.IV.split('#');
        const V = data.schoolDetails.V.split('#');
        const VI = data.schoolDetails.IV.split('#');
        const VII = data.schoolDetails.VII.split('#');
        const VIII = data.schoolDetails.VIII.split('#');
        const IX = data.schoolDetails.IX.split('#');
        const X = data.schoolDetails.X.split('#');
        const XI = data.schoolDetails.XI.split('#');
        const XII = data.schoolDetails.XII.split('#');

        setForm({
            ...form,
            imageURL: data.imageURL,
            instagram: data.instagram,
            fullName: data.fullName,
            gender: data.gender,
            state: data.state,
            city: data.city,

            LKG_y1: LKG[0], LKG_y2: LKG[1], LKG_school: LKG[2], LKG_placeID: LKG[3],
            UKG_y1: UKG[0], UKG_y2: UKG[1], UKG_school: UKG[2], UKG_placeID: UKG[3],
            I_y1: I[0], I_y2: I[1], I_school: I[2], I_placeID: I[3],
            II_y1: II[0], II_y2: II[1], II_school: II[2], II_placeID: II[3],
            III_y1: III[0], III_y2: III[1], III_school: III[2], III_placeID: III[3],
            IV_y1: IV[0], IV_y2: IV[1], IV_school: IV[2], IV_placeID: IV[3],
            V_y1: V[0], V_y2: V[1], V_school: V[2], V_placeID: V[3],
            VI_y1: VI[0], VI_y2: VI[1], VI_school: VI[2], VI_placeID: VI[3],
            VII_y1: VII[0], VII_y2: VII[1], VII_school: VII[2], VII_placeID: VII[3],
            VIII_y1: VIII[0], VIII_y2: VIII[1], VIII_school: VIII[2], VIII_placeID: VIII[3],
            IX_y1: IX[0], IX_y2: IX[1], IX_school: IX[2], IX_placeID: IX[3],
            X_y1: X[0], X_y2: X[1], X_school: X[2], X_placeID: X[3],
            XI_y1: XI[0], XI_y2: XI[1], XI_school: XI[2], XI_placeID: XI[3],
            XII_y1: XII[0], XII_y2: XII[1], XII_school: XII[2], XII_placeID: XII[3],

        });
    }


    function handleSubmit(e) {

        e.preventDefault();

        const allValues = {
            imageURL: form.imageURL.trim(),
            instagram: form.instagram.trim(),
            fullName: form.fullName.trim(),
            gender: form.gender,
            state: form.state,
            city: form.city,

            schoolDetails: {
                UKG: form.UKG_y1 + '#' + form.UKG_y2 + '#' + form.UKG_school.trim() + '#' + form.UKG_placeID.trim(),
                LKG: form.LKG_y1 + '#' + form.LKG_y2 + '#' + form.LKG_school.trim() + '#' + form.LKG_placeID.trim(),
                I: form.I_y1 + '#' + form.I_y2 + '#' + form.I_school.trim() + '#' + form.I_placeID.trim(),
                II: form.II_y1 + '#' + form.II_y2 + '#' + form.II_school.trim() + '#' + form.II_placeID.trim(),
                III: form.III_y1 + '#' + form.III_y2 + '#' + form.III_school.trim() + '#' + form.III_placeID.trim(),
                IV: form.IV_y1 + '#' + form.IV_y2 + '#' + form.IV_school.trim() + '#' + form.IV_placeID.trim(),
                V: form.V_y1 + '#' + form.V_y2 + '#' + form.V_school.trim() + '#' + form.V_placeID.trim(),
                VI: form.VI_y1 + '#' + form.VI_y2 + '#' + form.VI_school.trim() + '#' + form.VI_placeID.trim(),
                VII: form.VII_y1 + '#' + form.VII_y2 + '#' + form.VII_school.trim() + '#' + form.VII_placeID.trim(),
                VIII: form.VIII_y1 + '#' + form.VIII_y2 + '#' + form.VIII_school.trim() + '#' + form.VIII_placeID.trim(),
                IX: form.IX_y1 + '#' + form.IX_y2 + '#' + form.IX_school.trim() + '#' + form.IX_placeID.trim(),
                X: form.X_y1 + '#' + form.X_y2 + '#' + form.X_school.trim() + '#' + form.X_placeID.trim(),
                XI: form.XI_y1 + '#' + form.XI_y2 + '#' + form.XI_school.trim() + '#' + form.XI_placeID.trim(),
                XII: form.XII_y1 + '#' + form.XII_y2 + '#' + form.XII_school.trim() + '#' + form.XII_placeID.trim(),
            }
        }

        console.log("All Values: \n", allValues);

        // Registering Details----To Server
        saveDetails(allValues);
    }


    function saveDetails(data) {

        const url = 'http://localhost:4000/user/updateAllDetails';
        axios.put(url, data, { withCredentials: true })
            .then(res => {
                console.log("Response Saving (EditAllDetails): ", res.data);
                if(res.data.isUpdated) {
                    alert(res.data.message);
                    navigate('/');
                }
                else if (res.data.errorMessage) {
                    alert(res.data.errorMessage);
                }
            })
            .catch(err => {
                console.log("Error! Saving EDITING Details\n", err);
            });
    }

    function fetchData() {
        const url = 'http://localhost:4000/user/fetchAllDetails';
        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log("Response EditAllDetails (Fetch): ", res.data);
                if (res.data.userData) {
                    setInitialValues(res.data.userData);
                }
                else if (res.data.errorMessage) {
                    alert(res.data.errorMessage);
                }
            })
            .catch(err => {
                console.log("Error! Fetching Details\n", err);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (

        <div className={style.register_page}>

            <div className={style.maindiv}>

                <div className={style.heading}>
                    <h1>EDIT DETAILS</h1>
                </div>

                <form onSubmit={handleSubmit} className={style.html_form}>

                    <fieldset className={style.html_fieldset}>

                        <legend>Profile Picture: </legend>

                        <div className={style.profilepic_div}>
                            <img className={style.profilepic} src={image} alt="" />
                        </div>


                        <table className={style.html_table}>

                            <tbody>

                                <tr>
                                    <td> <label className={style.labeltext}>Paste DP URL: </label> </td>
                                    <td> <input className={style.inputfield} type="text" name='imageURL' value={form.imageURL} onChange={(e) => { handleChange(e); updateImage(e) }} /> </td>
                                </tr>

                                <tr>
                                    <td> <label className={style.labeltext} htmlFor="">Instagram Username: </label> </td>
                                    <td> <input className={style.inputfield} type="text" name="instagram" value={form.instagram} onChange={handleChange} /> </td>
                                </tr>

                            </tbody>

                        </table>

                    </fieldset>

                    <fieldset>

                        <legend>Personal Details: </legend>

                        <table>

                            <tbody>

                                <tr>
                                    <td><label className={style.labeltext} htmlFor="">Full Name* :</label></td>
                                    <td><input className={style.inputfield} type="text" name="fullName" value={form.fullName} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td><label className={style.labeltext} htmlFor="">Gender : </label></td>

                                    <td>
                                        <input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} />
                                        <label htmlFor="male">Male</label>

                                        <input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} />
                                        <label htmlFor="female">Female</label>

                                        <input type="radio" name="gender" value="other" checked={form.gender === 'other'} onChange={handleChange} />
                                        <label htmlFor="other">Other</label>
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className={style.labeltext} htmlFor="state">State : </label></td>

                                    <td>

                                        <select className={style.inputfield} name="state" value={form.state} onChange={handleChange} >
                                            <option value="select" >Select...</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Orissa">Orissa</option>
                                            <option value="Pondicherry">Pondicherry</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttaranchal">Uttaranchal</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>
                                    </td>

                                </tr>


                                <tr>
                                    <td><label className={style.labeltext} htmlFor="">City: </label></td>
                                    <td><input className={style.inputfield} type="text" name="city" value={form.city} onChange={handleChange} /></td>
                                </tr>

                            </tbody>
                        </table>

                    </fieldset>


                    <fieldset>
                        <legend>School Details: </legend>

                        <table>

                            <tbody>

                                <tr>
                                    <th>Class</th>
                                    <th>Year 1</th>
                                    <th>Year 2</th>
                                    <th>School Name (Google Map)</th>
                                    <th>Place ID (Google Map)</th>
                                </tr>

                                <tr>
                                    <td><label htmlFor="LKG"> <strong> LKG  </strong> </label></td>

                                    <td><input type="number" name="LKG_y1" value={form.LKG_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="LKG_y2" value={form.LKG_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="LKG_school" value={form.LKG_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='LKG_placeID' value={form.LKG_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="UKG"> <strong> UKG  </strong> </label></td>

                                    <td><input type="number" name="UKG_y1" value={form.UKG_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="UKG_y2" value={form.UKG_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="UKG_school" value={form.UKG_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='UKG_placeID' value={form.UKG_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="I"> <strong> I  </strong> </label></td>

                                    <td><input type="number" name="I_y1" value={form.I_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="I_y2" value={form.I_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="I_school" value={form.I_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='I_placeID' value={form.I_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="II"> <strong> II  </strong> </label></td>

                                    <td><input type="number" name="II_y1" value={form.II_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="II_y2" value={form.II_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="II_school" value={form.II_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='II_placeID' value={form.II_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="III"> <strong> III  </strong> </label></td>

                                    <td><input type="number" name="III_y1" value={form.III_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="III_y2" value={form.III_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="III_school" value={form.III_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='III_placeID' value={form.III_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>


                                <tr>
                                    <td><label htmlFor="IV"> <strong> IV  </strong> </label></td>

                                    <td><input type="number" name="IV_y1" value={form.IV_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="IV_y2" value={form.IV_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="IV_school" value={form.IV_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='IV_placeID' value={form.IV_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="V"> <strong> V  </strong> </label></td>

                                    <td><input type="number" name="V_y1" value={form.V_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="V_y2" value={form.V_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="V_school" value={form.V_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='V_placeID' value={form.V_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="VI"> <strong> VI  </strong> </label></td>

                                    <td><input type="number" name="VI_y1" value={form.VI_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="VI_y2" value={form.VI_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="VI_school" value={form.VI_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='VI_placeID' value={form.VI_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="VII"> <strong> VII  </strong> </label></td>

                                    <td><input type="number" name="VII_y1" value={form.VII_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="VII_y2" value={form.VII_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="VII_school" value={form.VII_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='VII_placeID' value={form.VII_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="VIII"> <strong> VIII  </strong> </label></td>

                                    <td><input type="number" name="VIII_y1" value={form.VIII_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="VIII_y2" value={form.VIII_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="VIII_school" value={form.VIII_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='VIII_placeID' value={form.VIII_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="IX"> <strong> IX  </strong> </label></td>

                                    <td><input type="number" name="IX_y1" value={form.IX_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="IX_y2" value={form.IX_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="IX_school" value={form.IX_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='IX_placeID' value={form.IX_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>


                                <tr>
                                    <td><label htmlFor="X"> <strong> X  </strong> </label></td>

                                    <td><input type="number" name="X_y1" value={form.X_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="X_y2" value={form.X_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="X_school" value={form.X_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='X_placeID' value={form.X_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="XI"> <strong> XI  </strong> </label></td>

                                    <td><input type="number" name="XI_y1" value={form.XI_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="XI_y2" value={form.XI_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="XI_school" value={form.XI_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='XI_placeID' value={form.XI_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>


                                <tr>
                                    <td><label htmlFor="XII"> <strong> XII  </strong> </label></td>

                                    <td><input type="number" name="XII_y1" value={form.XII_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="XII_y2" value={form.XII_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="XII_school" value={form.XII_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='XII_placeID' value={form.XII_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                            </tbody>

                        </table>

                    </fieldset>

                    <div id="buttondiv">
                        <input className={style.register_button} type="submit" defaultValue="SAVE" />
                    </div>

                </form>

            </div>

        </div>
    );



}

export default EditAllDetails;