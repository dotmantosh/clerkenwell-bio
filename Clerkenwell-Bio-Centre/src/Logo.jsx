import React from "react";
import logo from "./assets/CLERKENWELL-removebg-preview.png";

const Logo = () => {
  return (
    <div className="confirm_attendance_logo_wrapper">
      <div className="logo-line line1"></div>
      <div>
        <img src={logo} className="logo " alt="Vite logo" height="250px" />
      </div>
      <div className="logo-line line2"></div>
    </div>
  );
};

export default Logo;
