import React, { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { conditionsData, theatreDates } from "./constants";
import ThankYouQuestionnaire from "./ThankyouQuesionnaire";

const RenderQuestion = ({
  currentQuestion,
  userName,
  setUserName,
  error,
  selectedConditions,
  handleChangeCondition,
  email,
  setEmail,
  number,
  setNumber,
  handleOtherConditionChange,
  handleTrialOptionChange,
  handlePreferNotToProvideEmail,
  handlePreferNotToProvideNumber,
  preferNotToProvideEmail,
  preferNotToProvideNumber,
  selectedTrialOptions,
}) => {
  const navigate = useNavigate();
  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9, // Adjust the zIndex to ensure it overlays other elements
    }),
  };

  const handleBack = () => {
    navigate("/");
  };

  switch (currentQuestion) {
    case 1:
      return (
        <Form.Group>
          <p className="text-black ft">What's your name?</p>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            className="question_input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form.Group>
      );
    case 2:
      return (
        <Form.Group>
          <p className="text-black ft">
            Do you have any of the following? Please click on{" "}
            <span className="fw-bold">ALL</span> that apply.
          </p>
          {/* <Select
            isMulti
            name="Condition"
            options={conditionsData}
            classNamePrefix="select"
            styles={customStyles}
            value={selectedConditions}
            onChange={handleChangeCondition}
          /> */}
          {conditionsData.map((condition, index) => (
            <div
              key={index}
              className="question-checkbox"
              htmlFor={condition.value}
              onClick={() => {
                handleChangeCondition(condition);
              }}>
              {/* <input
                type="checkbox"
                name={condition.value}
                id={condition.value}
                /> */}

              <p className="mb-0">{condition.label}</p>
              <div className="question-checkbox-check">
                {selectedConditions.includes(condition) && (
                  <div className="question-checkbox-checked"></div>
                )}
              </div>
            </div>
          ))}
          {selectedConditions.some(
            (condition) => condition.value === "Other"
          ) && (
            <Form.Control
              type="text"
              placeholder="Specify other condition"
              className="mt-3 question_input"
              value={
                selectedConditions.find((c) => c.value === "Other")?.label || ""
              }
              onChange={handleOtherConditionChange}
            />
          )}
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form.Group>
      );
    case 3:
      return (
        <Form.Group>
          <p className="text-black ft">
            Please choose <span className="fw-bold">ALL</span> trials you would
            be able to attend.
          </p>
          {/* <Select
            isMulti
            name="TrialOption"
            options={theatreDates}
            classNamePrefix="select"
            styles={customStyles}
            value={selectedTrialOptions}
            onChange={handleTrialOptionChange}
          /> */}
          {theatreDates.map((option, index) => (
            <div
              key={index}
              className="question-checkbox"
              htmlFor={option.value}
              onClick={() => {
                handleTrialOptionChange(option);
              }}>
              {/* <input
                type="checkbox"
                name={option.value}
                id={option.value}
                
              /> */}
              <p className="mb-0">{option.label}</p>
              <div className="question-checkbox-check">
                {selectedTrialOptions.includes(option) && (
                  <div className="question-checkbox-checked"></div>
                )}
              </div>
            </div>
          ))}
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form.Group>
      );
    case 4:
      return (
        <FormGroup>
          <p className="text-black ft">What is your email address?</p>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="question_input"
            value={email}
            disabled={preferNotToProvideEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className="question-checkbox question-checkbox-single"
            onClick={handlePreferNotToProvideEmail}>
            {/* <input
                type="checkbox"
                name={condition.value}
                id={condition.value}
                /> */}

            <p className="mb-0">Prefer not to provide.</p>
            <div className="question-checkbox-check">
              {preferNotToProvideEmail && (
                <div className="question-checkbox-checked"></div>
              )}
            </div>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
        </FormGroup>
      );
    case 5:
      return (
        <FormGroup>
          <p className="text-black ft">What is your number? </p>
          <Form.Control
            type="text"
            placeholder="Enter number"
            className="question_input"
            value={number}
            disabled={preferNotToProvideNumber}
            onChange={(e) => {
              const inputValue = e.target.value;

              // Remove non-numeric characters
              const sanitizedValue = inputValue.replace(/[^0-9]/g, "");

              setNumber(sanitizedValue);
            }}
          />
          <div
            className="question-checkbox question-checkbox-single"
            onClick={handlePreferNotToProvideNumber}>
            {/* <input
                type="checkbox"
                name={condition.value}
                id={condition.value}
                /> */}

            <p className="mb-0">Prefer not to provide.</p>
            <div className="question-checkbox-check">
              {preferNotToProvideNumber && (
                <div className="question-checkbox-checked"></div>
              )}
            </div>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
        </FormGroup>
      );
    default:
      return (
        <ThankYouQuestionnaire />
        // <div>
        //   {/* <p className="text-black ft">
        //     Thank you for submitting your application!
        //   </p> */}
        //   <p className="text-black ft">
        //     Thank you for your submission. Our doctors will now assess your
        //     application. <br /> Expect an email in the next 3 days.
        //   </p>
        //   {/* <button
        //     className="animated-button mt-4 mb-5 mt-3"
        //     onClick={handleBack}>
        //     <span>Go Back</span>
        //     <span></span>
        //   </button> */}
        // </div>
      );
  }
};

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedTrialOptions, setSelectedTrialOptions] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [preferNotToProvideEmail, setPreferNotToProvideEmail] = useState(false);
  const [preferNotToProvideNumber, setPreferNotToProvideNumber] =
    useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Data to be sent in the request body

    const conditionsValues = selectedConditions.map(
      (condition) => condition.value
    );
    const trialOptionsValues = selectedTrialOptions.map(
      (option) => option.value
    );
    const data = {
      userName,
      conditionsValues,
      trialOptionsValues,
      email: preferNotToProvideEmail ? "Prefer not to provide email" : email,
      number: preferNotToProvideNumber
        ? "Prefer not to provide number"
        : number,
    };

    // Endpoint to which the POST request will be sent
    const url = `${import.meta.env.VITE_BACKEND_URL_LIVE}/send-email`; // Replace with your actual endpoint

    // Options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON as the content type
      },
      body: JSON.stringify(data), // Convert data to JSON string
    };

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

  const handleNextQuestion = () => {
    switch (currentQuestion) {
      case 1:
        if (!userName.trim()) {
          setError("Please enter your name");
          return;
        }
        break;
      case 2:
        if (selectedConditions.length === 0) {
          setError("Please select at least one condition");
          return;
        }
        break;
      case 3:
        if (selectedTrialOptions.length === 0) {
          setError("Please select at least one trial option");
          return;
        }
        break;
      case 4:
        if (!preferNotToProvideEmail && !email.trim()) {
          setError("Please enter your email address");
          return;
        }
        if (!preferNotToProvideEmail && !isValidEmail(email.trim())) {
          setError("Please enter a valid email address");
          return;
        }

        break;
      case 5:
        if (!preferNotToProvideNumber && !number.trim()) {
          setError("Please enter your phone number");
          return;
        }
        if (preferNotToProvideEmail && preferNotToProvideNumber) {
          setError(
            "We require either a phone or email address in order to contact you regarding your trial."
          );
          return;
        }

        handleSubmit();
        break;
      default:
        break;
    }
    setCurrentQuestion((prev) => prev + 1);
    setError("");
  };

  const handlePreferNotToProvideEmail = () => {
    preferNotToProvideEmail
      ? setPreferNotToProvideEmail(!preferNotToProvideEmail)
      : setPreferNotToProvideEmail(!preferNotToProvideEmail);
  };

  const handlePreferNotToProvideNumber = () => {
    preferNotToProvideNumber
      ? setPreferNotToProvideNumber(!preferNotToProvideNumber)
      : setPreferNotToProvideNumber(!preferNotToProvideNumber);
  };
  const handleChangeCondition = (selectedOptions) => {
    const optionExists = selectedConditions.some(
      (option) => option.value === selectedOptions.value
    );

    if (optionExists) {
      // If the option already exists, remove it
      setSelectedConditions((prevSelectedConditions) =>
        prevSelectedConditions.filter(
          (option) => option.value !== selectedOptions.value
        )
      );
    } else {
      // If the option doesn't exist, add it
      setSelectedConditions((prevSelectedConditions) => [
        ...prevSelectedConditions,
        selectedOptions,
      ]);
    }
  };

  const handleTrialOptionChange = (selectedOptions) => {
    const optionExists = selectedTrialOptions.some(
      (option) => option.value === selectedOptions.value
    );

    if (optionExists) {
      // If the option already exists, remove it
      setSelectedTrialOptions((prevSelectedConditions) =>
        prevSelectedConditions.filter(
          (option) => option.value !== selectedOptions.value
        )
      );
    } else {
      // If the option doesn't exist, add it
      setSelectedTrialOptions((prevSelectedConditions) => [
        ...prevSelectedConditions,
        selectedOptions,
      ]);
    }
  };

  const handleOtherConditionChange = (e) => {
    const otherConditionOption = { value: "Other", label: e.target.value };
    setSelectedConditions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (option) => option.value !== "Other"
      );
      return [...filteredOptions, otherConditionOption];
    });
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const goHome = () => {
    navigate("/");
  };

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="app-background questionnaire-container">
      <div className="question-container">
        <RenderQuestion
          currentQuestion={currentQuestion}
          userName={userName}
          setUserName={setUserName}
          error={error}
          selectedConditions={selectedConditions}
          handleChangeCondition={handleChangeCondition}
          email={email}
          setEmail={setEmail}
          number={number}
          setNumber={setNumber}
          preferNotToProvideEmail={preferNotToProvideEmail}
          preferNotToProvideNumber={preferNotToProvideNumber}
          handlePreferNotToProvideEmail={handlePreferNotToProvideEmail}
          handlePreferNotToProvideNumber={handlePreferNotToProvideNumber}
          handleOtherConditionChange={handleOtherConditionChange}
          handleTrialOptionChange={handleTrialOptionChange}
          selectedTrialOptions={selectedTrialOptions}
        />
        {currentQuestion > 1 && currentQuestion <= 5 ? (
          currentQuestion > 1 && (
            <button
              className="animated-button mt-4 mb-5 mt-3 ps-0"
              onClick={handleBack}>
              <span className="text-black">Back</span>
              <span></span>
            </button>
          )
        ) : (
          <></>
          // <button
          //   className="animated-button mt-4 mb-5 mt-3 ps-0"
          //   onClick={goHome}>
          //   <span className="text-black">Back</span>
          //   <span></span>
          // </button>
        )}
        {currentQuestion !== 6 && (
          <button
            className="animated-button mt-4 mb-5 mt-3 ps-0"
            onClick={handleNextQuestion}>
            <span className="text-black">Submit</span>
            <span></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
