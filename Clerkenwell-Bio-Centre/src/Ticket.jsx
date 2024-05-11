import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  ListGroupItem,
} from "react-bootstrap";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmAttendance from "./ConfirmAttendance";
import ThankYou from "./ThankYou";

const Ticket = () => {
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [booked, setBooked] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [userData, setUserData] = useState(null);
  const [isConfirmingCode, setIsConfirmingCode] = useState(false);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get("payment_status");

  if (!id) {
    navigate("/");
  }
  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleCodeConfirmation = async () => {
    try {
      // Validate code length
      if (isConfirmingCode) {
        return;
      }
      if (code.length < 6) {
        alert("Please enter a valid code.");
        return;
      }
      const url = `${import.meta.env.VITE_BACKEND_URL_LIVE}/validate-code`;
      console.log(`${import.meta.env.VITE_BACKEND_URL_LIVE}`);
      // Make the POST request to the backend API
      setIsConfirmingCode(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id, // Assuming userId is defined elsewhere in your code
          code: code,
        }),
      });
      console.log("response: ", response);
      // Check if request was successful
      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);
        // Check if userData exists and expiryDateTime is valid
        if (data.userData && data.userData.expiryDateTime) {
          const expiryDateTime = new Date(data.userData.expiryDateTime);
          const currentDateTime = new Date();

          // Check if expiryDateTime is after currentDateTime
          if (expiryDateTime > currentDateTime) {
            data.userData.id = id;
            setUserData(data.userData);
            // Handle valid expiration
            setIsCodeValid(true);
            setShowDate(true);
            setIsConfirmed(true);
            if (data.userData.price === "free") {
              setIsFree(true);
            }
          } else {
            alert("The code has expired.");
            // Handle code expiration
          }
        } else {
          // Handle missing expiryDateTime
          alert("Expiration data not found.");
        }
      } else {
        // Handle error response
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsConfirmingCode(false);
    }
  };

  const handlePayment = async () => {
    const backendUrl = `${
      import.meta.env.VITE_BACKEND_URL_LIVE
    }/create-checkout-session`;

    let priceId;

    // Determine priceId based on userData.price
    if (userData.price.toString() === "£10") {
      priceId = `${import.meta.env.VITE_TICKET_10}`;
    } else if (userData.price.toString() === "£40") {
      priceId = `${import.meta.env.VITE_TICKET_40}`;
    }

    const items = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    // console.log(items);
    try {
      if (isLoadingStripe) {
        return;
      }
      setIsLoadingStripe(true);
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, userData }),
      });

      const data = await response.json();
      const sessionId = data.sessionId;

      // Use Stripe.js to redirect to checkout page
      const stripe = await loadStripe(
        `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_LIVE}`
      );
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        // Handle error
      }
    } catch (error) {
      console.error("Error making payment:", error);
      // Handle error
    } finally {
      setIsLoadingStripe(false);
    }
  };

  const handleConfirmBooking = () => {
    setBooked(true);
  };

  const getDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    console.log(`${import.meta.env.VITE_BACKEND_URL_LIVE}`);
    if (paymentStatus === "true") {
      setIsCodeValid(true);
      setIsConfirmed(true);
      setBooked(true);
    }
  }, []);
  return (
    <div className="app-background">
      <Container className="">
        {!isCodeValid && (
          <Row className="d-flex justify-content-center align-items-center enter-code-row">
            <Col md={{ span: 6 }}>
              {/* <h2 className="text-center text-black mb-4">Enter Code</h2> */}
              <Form>
                <Form.Group controlId="formCode">
                  <Form.Control
                    type="text"
                    placeholder="Welcome to VEGETABLES: Please enter your unique code"
                    value={code}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                </Form.Group>
                <button
                  className="animated-button text-black mt-4"
                  type="button"
                  disabled={isConfirmingCode}
                  onClick={handleCodeConfirmation}>
                  <span>{isConfirmingCode ? "Loading ..." : "Confirm"}</span>
                  <span></span>
                </button>
              </Form>
            </Col>
          </Row>
        )}
        {isCodeValid && isConfirmed && !booked ? (
          <ConfirmAttendance
            isFree={isFree}
            userData={userData}
            handlePayment={handlePayment}
          />
        ) : (
          <ThankYou />
        )}
        {/* {isConfirmed && (
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Alert variant="success">
                {!booked ? (
                  <div>
                    <h3 className="text-center mb-4">
                      Vegetables Showcase @ Clerkenwell Bio Centre
                    </h3>
                    <p>
                      Congratulations, your application for Vegetables has been
                      successful. You are booked to come to our showcase on:
                    </p>
                    <b>
                      <p className="mb-4">
                        {showDate && `Date: ${userData?.selectedSlot}`}
                      </p>
                    </b>
                    <p className="pb-3">
                      To confirm your attendance to this trial, please follow
                      the steps:
                    </p>
                    {isFree ? (
                      <>
                        <button
                          onClick={handleConfirmBooking}
                          className="btn btn-success">
                          Confirm Booking
                        </button>
                      </>
                    ) : (
                      <>
                        <p>The amount you owe : {`${userData?.price}`}</p>
                        <Button variant="success" onClick={handlePayment}>
                          Confirm Booking
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <h5>
                      CONGRATULATIONS, YOUR ATTENDANCE HAS BEEN CONFIRMED. WE
                      LOOK FORWARD TO YOUR VISIT TO OUR RESEARCH CENTRE.
                    </h5>
                  </>
                )}
              </Alert>
            </Col>
          </Row>
        )} */}
      </Container>
    </div>
  );
};

export default Ticket;
