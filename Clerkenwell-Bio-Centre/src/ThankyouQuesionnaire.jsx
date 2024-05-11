import React from "react";
import logo from "./assets/CLERKENWELL-removebg-preview.png";
import Logo from "./Logo";

function ThankYouQuestionnaire() {
  return (
    <div className="thank-you">
      {/* <div>
        <img src={logo} className="logo " alt="Vite logo" height="250px" />
      </div> */}

      <div className="thank-you-wrapper thank-you-question-wrapper">
        <p className="mb-4">Thank you for your submission.</p>
        <p className="mb-4">
          Our doctors will now assess your application and email you imminently
          with their decision.
        </p>
        <p className="mb-4">
          If you have any immediate enquires, please email:
        </p>
        <p className="fw-bold">angela@clerkenwell-bio-botanics.co.uk</p>
      </div>

      <div className="show-on-mobile">
        <img src={logo} className="logo " alt="Vite logo" height="250px" />
      </div>
    </div>
  );
}

export default ThankYouQuestionnaire;
