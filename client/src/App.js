import { BrowserRouter, Routes, Route } from "react-router-dom";
import TempNavbar from "./components/TempNavbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error404 from "./pages/Error404";
import AllDetails from "./pages/AllDetails";
import Logout from "./pages/Logout";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*-- Temporary Navbar -- */}
        <TempNavbar />

        {/*------- All Routes -------- */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allDetails" element={<AllDetails />} />
          <Route path="/sendVerificationMail/:userId" element={<VerifyEmail />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
