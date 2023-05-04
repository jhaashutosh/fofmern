import React from "react";
import { NavLink } from "react-router-dom";

const TempNavbar = () => {
  return (
    <div>
      <nav style={{ backgroundColor: "yellow" }}>
        <NavLink style={{ marginRight: "20px" }} to="/">
          Home
        </NavLink>
        <NavLink style={{ marginRight: "20px" }} to="/login">
          Login
        </NavLink>
        <NavLink style={{ marginRight: "20px" }} to="/signup">
          Signup
        </NavLink>
        <NavLink style={{ marginRight: "20px" }} to="/404">
          404
        </NavLink>
      </nav>
    </div>
  );
};

export default TempNavbar;
