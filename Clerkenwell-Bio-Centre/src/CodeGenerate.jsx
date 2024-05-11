import { useState } from "react";
import { Dropdown } from "react-bootstrap";

function CodeGenerate() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [selectedTrialOption, setSelectedTrialOption] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDateTime, setExpiryDateTime] = useState("");

  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateFutureDateTime = (dateTimeString) => {
    const inputDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();
    return inputDateTime >= currentDateTime;
  };

  const generateRandomCode = () => {
    if (selectedTrialOption == "") {
      setError("Please select slot");
      return;
    } else if (price == "") {
      setError("Please select price");
      return;
    } else if (expiryDateTime == "") {
      setError("Please enter expiry date");
      return;
    } else if (!validateFutureDateTime(expiryDateTime)) {
      setError("selected date cannot be less than current date and time");
      return;
    } else if (email == "") {
      setError("Please enter email");
      return;
    } else if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    } else if (code == "") {
      setError("Please enter code");
      return;
    } else {
      handleSubmit();
    }
  };

  const handleTrialOptionChange = (option) => {
    setSelectedTrialOption(option);
  };

  const handlePriceOptionChange = (option) => {
    setPrice(option);
  };

  const handleExpiryDateTimeChange = (e) => {
    setExpiryDateTime(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    setError("");
    const data = {
      selectedTrialOption,
      email,
      code,
      price,
      expiryDateTime,
    };
    // Endpoint to which the POST request will be sent
    const url = `${import.meta.env.VITE_BACKEND_URL_LIVE}/register-user`; // Replace with your actual endpoint

    // Options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON as the content type
      },
      body: JSON.stringify(data), // Convert data to JSON string
    };
    // console.log(url);
    // Make the POST request
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        console.log("Response:", data); // Handle the response data
        // You can perform further actions here, such as showing a success message
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        // You can show an error message to the user or retry the request, etc.
      });
  };

  return (
    <form action="">
      <div className="app-background text-white questionnaire-container flex-column align-items-center">
        <div className="question-container">
          <Dropdown>
            <Dropdown.Toggle className="w-100">
              {selectedTrialOption ? selectedTrialOption : "Select Slot"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {[
                "Saturday 8th: 8pm",
                "Sunday 9th: 4pm",
                "Sunday 9th: 8pm",
                "Tuesday 11th: 8pm",
                "Wednesday 12th: 8pm",
                "Thursday 13th: 4pm",
                "Thursday 13th: 8pm",
                "Friday 14th: 8pm",
                "Saturday 15th: 4pm",
                "Saturday 15th: 8pm",
                "Sunday 16th: 4pm",
                "Sunday 16th: 8pm",
                "Tuesday 18th: 8pm",
                "Wednesday 19th: 8pm",
                "Thursday 20th: 8pm",
                "Friday 21st: 1 show 8pm",
                "Saturday 22nd: 4pm",
                "Saturday 22nd: 8pm",
                "Sunday 23rd: 4pm",
                "Sunday 23rd: 8pm",
              ].map((option, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleTrialOptionChange(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-3">
            <Dropdown.Toggle className="w-100">
              {price ? price : "Select Price"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {["free", "£10", "£40"].map((option, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handlePriceOptionChange(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* Input for expiry date and time */}
          <input
            type="datetime-local"
            value={expiryDateTime}
            onChange={handleExpiryDateTimeChange}
            className="mt-3 text-black date-time-input"
          />

          <input
            type="email"
            required
            value={email}
            placeholder="Enter Receiver Email"
            onChange={handleEmailChange}
            className="mt-3 text-black email-input form-control"
          />

          <div className="wave-group mt-5">
            <input
              required
              type="text"
              value={code}
              onChange={handleCodeChange}
              className="input text-black"
            />
            <span className="bar text-black"></span>
            <label className="label">
              <span className="label-char" style={{ "--index": 0 }}>
                C
              </span>
              <span className="label-char" style={{ "--index": 1 }}>
                o
              </span>
              <span className="label-char" style={{ "--index": 2 }}>
                d
              </span>
              <span className="label-char" style={{ "--index": 3 }}>
                e
              </span>
            </label>
          </div>

          {error && <p className="text-danger mt-4">{error}</p>}

          <button
            className="animated-button text-black mt-4 ps-0"
            type="button"
            onClick={generateRandomCode}>
            <span>Generate Code</span>
            <span></span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CodeGenerate;
