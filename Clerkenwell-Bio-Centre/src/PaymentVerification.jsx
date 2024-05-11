import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchPaymentDetails = async (sessionId, userId) => {
    const backendUrl = `${
      import.meta.env.VITE_BACKEND_URL_LIVE
    }/verify-payment`;
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, userId }),
      });

      const data = await response.json();
      console.log(data);

      // const paymentData = response.data;
      // Now you have paymentData, you can display a success message or perform any other actions
      console.log("Payment successful:", data.paymentData);
      navigate(`/tickets/${userId}?payment_status=true`);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      // Handle error
      navigate(`/tickets/${userId}?payment_status=false`);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    const userId = searchParams.get("userId");
    console.log(sessionId);
    console.log(userId);

    if (sessionId) {
      fetchPaymentDetails(sessionId, userId);
    } else {
      // Redirect to error page or handle the situation where session ID is missing
      navigate(`/tickets/${userId}?payment_status=false`);
    }
  }, [location.search]);
  return <div>Verifying Payment: Please wait ...</div>;
};

export default PaymentVerification;
