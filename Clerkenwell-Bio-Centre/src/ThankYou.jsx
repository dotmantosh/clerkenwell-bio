import React from "react";
import logo from "./assets/CLERKENWELL-removebg-preview.png";

function ThankYou() {
  return (
    <div className="thank-you">
      <div>
        <img src={logo} className="logo " alt="Vite logo" height="250px" />
      </div>

      <div className="thank-you-wrapper">
        <p className="mb-4">Thank you for confirming your spot.</p>
        <p className="mb-4">
          You will receive further instructions to your email address
          imminently.
        </p>
        <p className="mb-4">
          In the meantime, if you wish to contact us, please email:
        </p>
        <p className="fw-bold">angela@clerkenwell-bio-botanics.co.uk</p>
      </div>

      <div className="show-on-mobile">
        <img src={logo} className="logo " alt="Vite logo" height="250px" />
      </div>
    </div>
  );
}

export default ThankYou;
