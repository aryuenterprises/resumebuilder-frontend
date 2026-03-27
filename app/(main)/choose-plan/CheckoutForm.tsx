// import React, { useState } from "react";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ amount, email, planId, userId, onSuccess }) => {
//   const [loading, setLoading] = useState(false);



//   const handlePayment = async () => {
//   try {
//     setLoading(true);

//     const { data: order } = await axios.post(
//       `${API_URL}/api/payment-razor/create-order`,
//       { amount, email, planId, userId }
//     );

//     const options = {
//       key: RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Your Company Name",
//       description: "Plan Subscription Payment",
//       order_id: order.id,


//       handler: async function (response) {
//         await axios.post(`${API_URL}/api/payment-razor/verify-payment`, {
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//         });

//         Swal.fire("Payment Successful!", "Subscription activated", "success");
//         if (onSuccess) onSuccess();
//       },

//       prefill: { email },

//       theme: { color: "#2563eb" },

//       modal: {
//         ondismiss: async function () {
//           setLoading(false);


//           await axios.post(`${API_URL}/api/payment-razor/payment-failed`, {
//             orderId: order.id,
//             reason: "User closed payment popup",
//           });

//           Swal.fire("Payment Cancelled", "You closed the payment window.", "info");
//         },
//       },
//     };

//     const rzp = new window.Razorpay(options);


//     rzp.on("payment.failed", async function (response) {
//       setLoading(false);

//       await axios.post(`${API_URL}/api/payment-razor/payment-failed`, {
//         orderId: response.error.metadata.order_id,
//         paymentId: response.error.metadata.payment_id,
//         reason: response.error.description,
//       });

//       Swal.fire("Payment Failed", response.error.description, "error");
//     });

//     rzp.open();
//     setLoading(false);
//   } catch (error) {
//     console.error(error);
//     Swal.fire("Error", "Unable to start payment", "error");
//     setLoading(false);
//   }
// };


//   return (
//     <div className="w-full">
//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
//       >
//         {loading ? "Processing..." : `Pay ₹${amount}`}
//       </button>
//     </div>
//   );
// };

// export default CheckoutForm;