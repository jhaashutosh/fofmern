import { Routes, Route } from "react-router-dom";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error404 from "./pages/Error404";
import AllDetails from "./pages/AllDetails";
import Logout from "./pages/Logout";
import VerifyEmail from "./pages/VerifyEmail";
import SearchFriends from "./pages/SearchFriends";
import ForgotPassword from "./pages/ForgotPassword";
import SetNewPassword from "./pages/SetNewPassword";
import CheckValidEmailURL from "./pages/CheckValidEmailURL";
import EditAllDetails from "./pages/EditAllDetails";

import { useFOFContext } from "./context/context";
import { useEffect } from "react";

function App() {

    //Current Path -> Changing.
    const location = useLocation();

    //Context
    const { currentPath, setCurrentPath, isLoggedIn, setIsLoggedIn } = useFOFContext();
    const [websiteData, setWebsiteData] = useState({});
    // const [isLoading, setIsLoading] = useState(true);

    //Check If User is Logged In or Not
    function checkIfUserIsLoggedIn() {
        const url = "http://localhost:4000/auth/checkIfUserIsLoggedIn";

        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log("Response in checkIfUserIsLoggedIn: ", res.data);
                if (res.data.isLoggedIn) {
                    setIsLoggedIn(res.data.isLoggedIn);
                    // setIsLoading(false);
                }
            })
            .catch(err => console.log("Error in checkIfUserIsLoggedIn: ", err));
    }

    //Increase Visitor
    function increaseVisitor() {
        const url = "http://localhost:4000/auth/websiteDetails";
        axios.get(url)
            .then(res => {
                console.log("Response in increaseVisitor: ", res.data);
                setWebsiteData(res.data.websiteDetails);
            })
            .catch(err => console.log("Error in increaseVisitor: ", err));
    }

    //Check If User is Logged In or Not!
    useEffect(() => {
        checkIfUserIsLoggedIn();
        increaseVisitor();
    }, []);


    //Set Current Path and Print it!
    useEffect(() => {
        setCurrentPath(location.pathname);
        console.log("Current Path: ", location.pathname);
    }, [location.pathname]);

    // if (Loading) {

    return (
        <div className="App">

            {/*-- Temporary Navbar -- */}
            {/* <nav style={{ backgroundColor: "yellow" }}>
                    <NavLink style={{ marginRight: "20px" }} to="/"> Home </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/login"> Login </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/signup"> Signup </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/allDetails"> AllDetails </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/editAllDetails"> EditAllDetails </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/searchFriends"> SearchFriends </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/sendVerificationMail/enterUserId"> VerifyEmail </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/checkValidEmailURL/randomtokenxyz123"> CheckValidEmailURL </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/forgotPassword"> Forgot Password </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/setNewPassword/randomToken9xyz31aex"> SetNewPassword </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/404"> 404 </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/logout"> Logout </NavLink>
                </nav> */}

            {/*-- Navbar -- */}
            {isLoggedIn && <Navbar />}

            {/*------- All Routes -------- */}
            <Routes>

                {/* Protected Routes -> isLoggedIn => true */}
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/allDetails" element={<AllDetails />} />
                <Route path="/editAllDetails" element={isLoggedIn ? <EditAllDetails /> : <Navigate to='/login' />} />
                <Route path="/searchFriends" element={isLoggedIn ? <SearchFriends /> : <Navigate to='/login' />} />

                {/* Normal Routes -> isLoggedIn => false */}
                <Route path="*" element={<Error404 />} />
                <Route path="/signup" element={isLoggedIn ? <Navigate to='/' /> : <Signup />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to='/' /> : <Login />} />
                <Route path="/forgotPassword" element={isLoggedIn ? <Navigate to='/' /> : <ForgotPassword />} />
                <Route path="/checkValidEmailURL/:token" element={isLoggedIn ? <Navigate to='/' /> : <CheckValidEmailURL />} />
                <Route path="/setNewPassword/:token" element={isLoggedIn ? <Navigate to='/' /> : <SetNewPassword />} />
                <Route path="/sendVerificationMail/:userId" element={isLoggedIn ? <Navigate to='/' /> : <VerifyEmail />} />
                <Route path="/logout" element={<Logout />} />

            </Routes>

            <Footer websiteData={websiteData} />

        </div>
    );

    // }

    // else {
    //     return (
    //         <div className="App">
    //             <h1>Loading...</h1>
    //         </div>
    //     );
    // }

}

export default App;
