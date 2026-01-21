import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { API_URL } from "../Config";
import Swal from "sweetalert2";

const CheckoutForm = ({
  amount,
  email,
  planId,
  userId,
  onSuccess,
  currencyName,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // await elements.submit();
      // Create payment intent
      const res = await axios.post(
        `${API_URL}/api/payment/create-payment-intent`,
        {
          amount: amount,
          email: email,
          planId: planId,
          userId: userId,
          currencyName: currencyName,
        }
      );

      //   console.log('Payment intent response:', res.data);

      const clientSecret = res.data.clientSecret;

      if (!clientSecret) {
        throw new Error("No client secret received from server");
      }

      // Confirm payment with Stripe
      // const { error, paymentIntent } = await stripe.confirmPayment({
      //   elements,
      //   clientSecret,
      //   confirmParams: {
      //     return_url: `${window.location.origin}/payment-success`,
      //     receipt_email: email,
      //   },
      //   redirect: 'if_required',
      // });
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: email,
            },
          },
        }
      );

      // if (error) {
      //   throw new Error(error.message);
      // }

      if (error) {
        setLoading(false); //  STOP showing "Processing..."
        setError(error.message); //  Show card error message
        return;
      }

      //   console.log('Payment successful:', paymentIntent);

      // Update payment status on backend
      await axios.post(`${API_URL}/api/payment/update-payment-intent`, {
        payment_intent_id: paymentIntent.id,
        payment_status: paymentIntent.status,
        email: email,
        amount: amount,
        paymentIntent,
      });
      //   console.log('res :', response);
      // Show success message
      Swal.fire({
        title: "Payment Successful!",
        text: "Your payment has been processed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Payment error:", error);

      Swal.fire({
        title: "Payment Failed",
        text:
          error.message || "Payment could not be processed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      //   setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full ">
      {/* <PaymentElement /> */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#000",
              "::placeholder": { color: "#888" },
            },
            invalid: { color: "#e5424d" },
          },
        }}
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
