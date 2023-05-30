import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFOFContext } from "../context/context";

const Logout = () => {

    const { setIsLoggedIn } = useFOFContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        const url = "http://localhost:4000/auth/logout";

        //Using Axios 
        axios.get(url, { withCredentials: true })
            .then((response) => {
                const redirect = response.data.redirect;
                setIsLoggedIn(false);
                navigate(redirect);
            })
            .catch((error) => {
                console.log("😢Logout Error! \n", error.message);
            });
    }

    useEffect(() => {
        handleLogout();
    });
}

export default Logout;