import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

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

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {/*-- Temporary Navbar -- */}
                <nav style={{ backgroundColor: "yellow" }}>
                    <NavLink style={{ marginRight: "20px" }} to="/"> Home </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/login"> Login </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/signup"> Signup </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/allDetails"> AllDetails </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/searchFriends"> SearchFriends </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/sendVerificationMail/enterUserId"> VerifyEmail </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/checkValidEmailURL/randomtokenxyz123"> Check Valid Email URL </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/forgotPassword"> Forgot Password </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/setNewPassword/randomToken9xyz31aex"> Set New Password </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/404"> 404 </NavLink>
                    <NavLink style={{ marginRight: "20px" }} to="/logout"> Logout </NavLink>
                </nav>

                {/*------- All Routes -------- */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/allDetails" element={<AllDetails />} />
                    <Route path="/searchFriends" element={<SearchFriends />} />
                    <Route path="/sendVerificationMail/:userId" element={<VerifyEmail />} />
                    <Route path="/checkValidEmailURL/:token" element={<CheckValidEmailURL />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/setNewPassword/:token" element={<SetNewPassword />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
