import React from "react";
import logo from "./assets/CLERKENWELL-removebg-preview.png";
import carrot from "./assets/carrot.png";
import Logo from "./Logo";

const ConfirmAttendance = ({ isFree, handlePayment, userData }) => {
  function formatDate(dateString) {
    const dateParts = dateString.split(" ");
    const day = dateParts[1].replace(":", "");
    const time = dateParts[2];

    // Convert month number to month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[5]; // June

    return `${dateParts[0]} ${day} ${month} @ ${time}`;
  }

  return (
    <div className="confirm_attendance">
      <Logo />

      <div className="confirm_attendance_content">
        <div className="confirm_attendance_info">
          <p>
            Your application to be a trialist at VEGETABLES has been successful.
          </p>
          <p>
            Your product showcase will take place on: <br />
            <span>
              {formatDate(userData.selectedSlot)} at Clerkenwell Bio Botanics,
              EC1R
            </span>{" "}
            <br />
            Full address emailed prior to your visit. <br />
            Your showcase will last roughly 90 minutes. <br />
            Drinks are included. <br />
          </p>
          <div className="mobile-line"></div>
          {!isFree && (
            <p>
              To confirm your booking, please{" "}
              <span role="button" onClick={handlePayment}>
                click here.
              </span>
            </p>
          )}
          <p>
            Due to demand, your code will only be valid for a short period of
            time.
          </p>
        </div>
        <div>
          <img src={carrot} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmAttendance;
