// // import React from 'react'
// // import Resume1 from '../Templates/Resume1';
// // import Resume2 from '../Templates/Resume2';
// // import Resume3 from '../Templates/Resume3';
// // import Resume4 from '../Templates/Resume4';
// // import Resume5 from '../Templates/Resume5';
// // import Resume6 from '../Templates/Resume6';
// // import Resume7 from '../Templates/Resume7';
// // import Resume8 from '../Templates/Resume8';
// // import { useLocation } from 'react-router-dom';

// // function Pdf_download() {

// //     const location = useLocation();
// //     // const templateId = location.state?.templateId.id;

// //         const templateId = 5;

// //   const contactId = location.state?.contactid;

// //   console.log("contactId from navigate:", contactId);

// //       const resumeComponents = [
// //         { id: 1, name: "Modern Resume", component: <Resume1 /> },
// //         { id: 2, name: "Classic Resume", component: <Resume2 /> },
// //         { id: 3, name: "Minimal Resume", component: <Resume3 /> },
// //         // { id: 4, name: "Professional Resume", component: <Resume4 /> },
// //         { id: 5, name: "Creative Resume", component: <Resume5 /> },
// //         { id: 6, name: "Creative Resume", component: <Resume6 /> },

// //         // { id: 7, name: "Creative Resume", component: <Resume7 /> },

// //         { id: 8, name: "Creative Resume", component: <Resume8 /> },

// //     ];

// //       const selectedResume = resumeComponents.find(
// //         (resume) => resume.id === templateId
// //     );

// //   return (
// //     <div>
// //       {selectedResume ? (
// //                             selectedResume.component
// //                         ) : (
// //                             <p className="text-center text-gray-500 mt-20">
// //                                 No matching resume template found
// //                             </p>
// //                         )}

// //     </div>
// //   )
// // }

// // export default Pdf_download

// import React, { useRef } from "react";
// import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// import Resume1 from "../Templates/Resume1";
// import Resume2 from "../Templates/Resume2";
// import Resume3 from "../Templates/Resume3";
// import Resume4 from "../Templates/Resume4";
// import Resume5 from "../Templates/Resume5";
// import Resume6 from "../Templates/Resume6";
// import Resume7 from "../Templates/Resume7";
// import Resume8 from "../Templates/Resume8";
// import Header from "../Pages/Header";

// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51SP2ZsGi0Hbe41Jr6nVbpcTKTP1tlN7jV70e8j3CvH5R5qDncT4MIdjqBJ22pnOmZVmuqhbxhRy1qhr4r5nIkV4C00Cm3eiNBl");

// function Pdf_download() {
//     const location = useLocation();
//     const contactId = location.state?.contactid;

//     console.log("Contact ID from navigate:", contactId);

//     const templateId = 5;
//     const resumeComponents = [
//         { id: 1, name: "Modern Resume", component: <Resume1 /> },
//         { id: 2, name: "Classic Resume", component: <Resume2 /> },
//         { id: 3, name: "Minimal Resume", component: <Resume3 /> },
//         { id: 4, name: "Professional Resume", component: <Resume4 /> },
//         { id: 5, name: "Creative Resume", component: <Resume5 /> },
//         { id: 6, name: "Clean Resume", component: <Resume6 /> },
//         { id: 7, name: "Elegant Resume", component: <Resume7 /> },
//         { id: 8, name: "Stylish Resume", component: <Resume8 /> },
//     ];

//     const selectedResume = resumeComponents.find(
//         (resume) => resume.id === templateId
//     );

//     const pdfRef = useRef();

//     const handleDownloadPDF = async () => {
//         const input = pdfRef.current;
//         if (!input) return;

//         // Capture screenshot of resume
//         const canvas = await html2canvas(input, {
//             scale: 1.5, // lower = smaller file size
//             useCORS: true,
//             scrollY: 0,
//             backgroundColor: "#ffffff",
//         });

//         const imgData = canvas.toDataURL("image/jpeg", 0.7); // JPEG with 70% quality

//         // A4 size in mm
//         const pdf = new jsPDF("p", "mm", "a4");

//         const pageWidth = 210;
//         const pageHeight = 297;

//         const imgWidth = pageWidth;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         let heightLeft = imgHeight;
//         let position = 0;

//         pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
//         heightLeft -= pageHeight;

//         while (heightLeft > 0) {
//             position = heightLeft - imgHeight;
//             pdf.addPage();
//             pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
//             heightLeft -= pageHeight;
//         }

//         pdf.save(`resume_${contactId || "preview"}.pdf`);
//     };

//    const handlePayment = async () => {
//     const stripe = await stripePromise;

//     // ✅ Redirect to Stripe Checkout using your Price ID
//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [
//         {
//           price: "price_1Pxxxxxx",
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       successUrl: `${window.location.origin}/pdf-download`, // after success
//       cancelUrl: `${window.location.origin}/payment-cancelled`,
//     });

//     if (error) {
//       console.error("Stripe checkout error:", error);
//       alert(error.message);
//     }
//   };

//     return (
//         <div>
//             <Header />
//             <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-700">
//                     Download Your Resume (A4 PDF, small size)
//                 </h2>

//                 <button
//                     onClick={handleDownloadPDF}
//                     className="mt-6 mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//                 >
//                     Download PDF
//                 </button>

//                 <button
//                     className="mt-6 mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//                     onClick={handlePayment}
//                 >
//                     paymnet
//                 </button>

//                 <div
//                     ref={pdfRef}
//                     style={{
//                         width: "210mm",
//                         minHeight: "297mm",
//                         background: "#fff",
//                         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                         padding: "",
//                         overflow: "hidden",
//                     }}
//                 >
//                     {selectedResume ? (
//                         selectedResume.component
//                     ) : (
//                         <p className="text-center text-gray-500 mt-20">
//                             No matching resume template found
//                         </p>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Pdf_download;

import React, { useRef, useState, useEffect, useContext, use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import html2pdf from "html2pdf.js";

import Header from "../Pages/Header";
import Resume1 from "../Templates/Resume1";
import Resume2 from "../Templates/Resume2";
import Resume3 from "../Templates/Resume3";
import Resume4 from "../Templates/Resume4";
import Resume5 from "../Templates/Resume5";
import Resume6 from "../Templates/Resume6";
import Resume7 from "../Templates/Resume7";
import Resume8 from "../Templates/Resume8";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../Config";
import { CreateContext } from "../App";
import { CloudCog } from "lucide-react";

const stripePromise = loadStripe(
  "pk_test_51SKvcM9X6IJD3U9xOKtgo96chwQR377IVmXB5lmjhbWIMftEWchNxmsEgdnUWKWf76AIKAUUT9ssdqtAaBo4PGnb00OPqvJAub"
);

const CheckoutForm = ({ amount, email }) => {
  const stripe = useStripe();
  const elements = useElements();

  //   const handlePayment = async (e) => {
  //     e.preventDefault();

  //     if (!stripe || !elements) return;

  //     const clientSecret = stripePromise;

  //     const { error } = await stripe.confirmPayment({
  //       elements,
  //       clientSecret,
  //       confirmParams: {
  //         return_url: `${window.location.origin}/success`,
  //       },
  //     });

  //     if (error) {
  //       console.error("Payment error:", error);
  //       alert(`Payment failed: ${error.message}`);
  //     } else {
  //       console.log(" Payment successful!");
  //     }
  //   };

  const [paymentDetails, setPaymentDetails] = useState({
    status: "",
    message: "",
    paymentId: "",
  });


  //  const handlePayment = async (e) => {
  //     e.preventDefault();

  //     setTimeout(() => {
  //       const fakePaymentId = "demo_pi_" + Math.random().toString(36).substring(2, 10);
  //       setPaymentDetails({
  //         status: "succeeded",
  //         message: "Payment simulated successfully!",
  //         paymentId: fakePaymentId,
  //       });
  //       alert(" Demo Payment Successful!");
  //     }, 1000);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe not loaded");
      return;
    }

    // setIsLoading(true);

    try {
      await elements.submit();
      // Create payment intent
      const res = await axios.post(
        `${API_URL}/api/payment/create-payment-intent`,
        {
          amount: amount,
          email: email,
        }
      );

      //   console.log('Payment intent response:', res.data);

      const clientSecret = res.data.clientSecret;

      if (!clientSecret) {
        throw new Error("No client secret received from server");
      }

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: email,
        },
        redirect: "if_required",
      });

      if (error) {
        throw new Error(error.message);
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
      });
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
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md">
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white font-nunito px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        Pay ₹{amount}
      </button>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <p className="text-sm font-nunito text-yellow-800">
          <strong>Demo Mode:</strong> Use test card 4242 4242 4242 4242
        </p>
      </div>
    </form>
  );
};

// ------------------ MAIN PAGE ------------------
function Pdf_download() {
  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;


  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [userId, setUserId] = useState("");


  const UserEmail = userLoggedIn?.email;

  // console.log("Useridd", userLoggedIn);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    setUserId(userdata?.id || userdata?._id || "");
    setUserLoggedIn(userdata);
  }, []);

  const location = useLocation();
  // const contactId = location.state?.contactid;
  const contactId =
    location.state?.contactId || location.state?.contactid || null;

  // console.log("contactId", contactId)

  const pdfRef = useRef();
  const [showPayment, setShowPayment] = useState(false);

  // console.log("showPayment", showPayment)

  const [templateId, setTemplateId] = useState([]);

  const [alldetails, setAlldetails] = useState({});


  const fetchContact = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-all-contacts/${contactId}`
      );

      if (response.data?.data?.length > 0) {
        const data = response.data.data[0];

        // Extract all the pieces from the API structure
        const formattedData = {
          contact: data.contact || {},
          educations: data.educations || [],
          experiences: data.experiences || [],
          skills: data.skills || [],
          finalize: data.finalize?.[0] || {},
          planSubscription: data.planSubscriptions?.[0] || {},
          summary: data.summary || [],
          resume: data.hasResume || [],
        };

        // Set everything into one state
        setAlldetails(formattedData);

        // Optionally set specific things separately if needed
        setTemplateId(data.contact?.templateId || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [contactId]);

  // const resumeComponents = [
  //   { id: "1", component: <Resume1 /> },
  //   { id: "2", component: <Resume2 /> },
  //   { id: "3", component: <Resume3 /> },
  //   { id: "4", component: <Resume4 /> },
  //   { id: "5", component: <Resume5 /> },
  //   { id: "6", component: <Resume6 /> },
  //   { id: "7", component: <Resume7 /> },
  //   { id: "8", component: <Resume8 /> },
  // ];

  const resumeComponents = [
    { id: "1", component: Resume1 },
    { id: "2", component: Resume2 },
    { id: "3", component: Resume3 },
    { id: "4", component: Resume4 },
    { id: "5", component: Resume5 },
    { id: "6", component: Resume6 },
    { id: "7", component: Resume7 },
    { id: "8", component: Resume8 },
  ];

  const matchedResume = resumeComponents.find((item) => item.id === templateId);

  // const selectedResume = resumeComponents.find((r) => r.id === templateId);

  //   const handleDownloadPDF = async () => {
  //     const input = pdfRef.current;
  //     if (!input) return;

  //     const canvas = await html2canvas(input, {
  //       scale: 1.5,
  //       useCORS: true,
  //       scrollY: 0,
  //       backgroundColor: "#fff",
  //     });

  //     const imgData = canvas.toDataURL("image/jpeg", 0.7);
  //     const pdf = new jsPDF("p", "mm", "a4");

  //     const pageWidth = 210;
  //     const pageHeight = 297;
  //     const imgWidth = pageWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //     heightLeft -= pageHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save(`resume_${contactId || "preview"}.pdf`);
  //   };

  // const handleDownloadPDF = async () => {
  //   const input = pdfRef.current;
  //   if (!input) return;

  //   const canvas = await html2canvas(input, {
  //     scale: 1.5,
  //     useCORS: true,
  //     scrollY: 0,
  //     backgroundColor: "#fff",
  //   });

  //   const imgData = canvas.toDataURL("image/jpeg", 0.7);
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pageWidth = 210;
  //   const pageHeight = 297;
  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;

  //   // ✅ Small internal content padding between pages
  //   const contentGap = 8; // adjust between 5–12 for best results

  //   // First page
  //   pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //   heightLeft -= (pageHeight - contentGap);

  //   // Next pages
  //   while (heightLeft > 0) {
  //     position = heightLeft - imgHeight + contentGap; // adds small overlap buffer
  //     pdf.addPage();
  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //     heightLeft -= (pageHeight - contentGap);
  //   }

  //   pdf.save(`resume_${contactId || "preview"}.pdf`);
  // };

  // const handleDownloadPDF = async () => {
  //   const input = pdfRef.current;
  //   if (!input) return;

  //   const canvas = await html2canvas(input, {
  //     scale: 2, // higher scale = better clarity
  //     useCORS: true,
  //     scrollY: 0,
  //     backgroundColor: "#fff",
  //   });

  //   const imgData = canvas.toDataURL("image/jpeg", 0.8);
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pageWidth = 210; // A4 width in mm
  //   const pageHeight = 297; // A4 height in mm
  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;
  //   const contentGap = 10; // small internal padding between pages

  //   // ✅ If content fits on one page
  //   if (imgHeight <= pageHeight) {
  //     pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, "", "FAST");
  //   }
  //   // ✅ If content exceeds one page
  //   else {
  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //     heightLeft -= (pageHeight - contentGap);

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight + contentGap;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //       heightLeft -= (pageHeight - contentGap);
  //     }
  //   }

  //   pdf.save(`resume_${contactId || "preview"}.pdf`);
  // };

  // const { allplandetails, setAllplandetails } = useContext(CreateContext);

  // const [allplandetails, setAllplandetails] = useState([]);
  // console.log("allplandetails", allplandetails);

  // const fetchPlans = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/api/users/dashboard`, {
  //       params: {
  //         userId: userId,

  //       }
  //     });

  //     console.log("res", res)

  //     const plans = res?.data?.
  //       payments?.[0].plan;
  //     setAllplandetails(plans);
  //   } catch (err) {
  //     console.error("Error fetching plans:", err);
  //   }

  // };

  // useEffect(() => {

  //   fetchPlans();
  // }, [userId]);

  //   const handleDownloadPDF = async () => {
  //   const input = pdfRef.current;
  //   if (!input) return;

  //   const canvas = await html2canvas(input, {
  //     scale: 2, // better clarity
  //     useCORS: true,
  //     scrollY: 0,
  //     backgroundColor: "#fff",
  //   });

  //   const imgData = canvas.toDataURL("image/jpeg", 0.8);
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pageWidth = 210; // A4 width in mm
  //   const pageHeight = 297; // A4 height in mm

  //   // Make image full width, scale height proportionally
  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, "", "FAST");
  //   pdf.save(`resume_${contactId || "preview"}.pdf`);

  // };

  // const handleDownloadPDF = async () => {
  //   const input = pdfRef.current;
  //   if (!input) return;

  //   const canvas = await html2canvas(input, {
  //     scale: 2,
  //     useCORS: true,
  //     scrollY: 0,
  //     backgroundColor: "#fff",
  //   });

  //   const imgData = canvas.toDataURL("image/jpeg", 1.0);
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pageWidth = 210; // A4 width in mm
  //   const pageHeight = 297; // A4 height in mm

  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;

  //   // Add pages while heightLeft > 0
  //   while (heightLeft > 0) {
  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, "", "FAST");
  //     heightLeft -= pageHeight;
  //     if (heightLeft > 0) {
  //       pdf.addPage();
  //       position = -pageHeight + Math.max(heightLeft, 0); // adjust position for next page
  //     }
  //   }

  //   pdf.save(`resume_${contactId || "preview"}.pdf`);
  // };

  // const handleDownloadPDF = async () => {
  //   const input = pdfRef.current;
  //   if (!input) return;

  //   try {
  //     // 5️ Show success message

  //     // 1️⃣ Generate canvas from HTML
  //     const canvas = await html2canvas(input, {
  //       scale: 2,
  //       useCORS: true,
  //       scrollY: 0,
  //       backgroundColor: "#fff",
  //     });

  //     const imgData = canvas.toDataURL("image/jpeg", 1.0);

  //     // 2️⃣ Create PDF with jsPDF
  //     const pdf = new jsPDF("p", "mm", "a4");

  //     const pageWidth = 210; // A4 width in mm
  //     const pageHeight = 297; // A4 height in mm

  //     // Full width, height scaled proportionally
  //     const imgWidth = pageWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, "", "FAST");

  //     // 3️ Save PDF
  //     pdf.save(`${userLoggedIn.firstName || "preview"}.pdf`);

  //     // 4️ Send API request with userId as parameter
  //     const pdfBlob = pdf.output("blob");
  //     const formData = new FormData();
  //     formData.append(
  //       "resume",
  //       pdfBlob,
  //       `${userLoggedIn.firstName || "preview"}.pdf`
  //     );
  //     formData.append("userId", userId);
  //     formData.append("contactId", alldetails.contact._id);
  //     formData.append("message", "success");

  //     const response = await axios.post(
  //       `${API_URL}/api/users/download-resume`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     // pdf.save(`${userLoggedIn.firstName || "preview"}.pdf`);

  //     Swal.fire({
  //       icon: "success",
  //       title: "PDF Downloaded",
  //       text: "Resume downloaded successfully!",
  //       timer: 2000,
  //       confirmButtonText: "OK",
  //     }).then(() => {
  //       window.location.reload();
  //     });
  //   } catch (err) {
  //     console.error("Error downloading PDF:", err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: err.response?.data?.message,
  //     }).then(() => {
  //       navigate("/choose-template");
  //     });
  //   }
  // };

  // const handleDownloadPDF = async () => {
  //   const element = pdfRef.current;
  //   if (!element) return;

  //   const opt = {
  //     margin: [5,5],
  //     filename: `${userLoggedIn.firstName || "preview"}.pdf`,
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: { scale: 2, useCORS: true },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };

  //   try {
  //     const worker = html2pdf().set(opt).from(element).toPdf();

  //     const pdf = await worker.get("pdf");
  //     pdf.save(`${userLoggedIn.firstName || "preview"}.pdf`);

  //     // Convert to blob
  //     const pdfBlob = pdf.output("blob");

  //     // Upload blob to backend
  //     const formData = new FormData();
  //     formData.append(
  //       "resume",
  //       pdfBlob,
  //       `${userLoggedIn.firstName || "preview"}.pdf`
  //     );
  //     formData.append("userId", userId);
  //     formData.append("contactId", alldetails.contact._id);
  //     formData.append("message", "success");

  //     await axios.post(`${API_URL}/api/users/download-resume`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     Swal.fire({
  //       icon: "success",
  //       title: "PDF Downloaded",
  //       text: "Resume downloaded successfully!",
  //       timer: 2000,
  //       confirmButtonText: "OK",
  //     }).then(() => window.location.reload());
  //   } catch (err) {
  //     console.error("PDF Error:", err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: err.message,
  //     }).then(() => navigate("/choose-template"));
  //   }
  // };

  const handleDownloadPDF = async () => {
  const element = pdfRef.current;
  if (!element) return;

  //  1. Hide Edit Buttons Before PDF Snapshot
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach(btn => (btn.style.display = "none"));

  const opt = {
    margin: [5, 5],
    filename: `${userLoggedIn.firstName || "preview"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  try {
    const worker = html2pdf().set(opt).from(element).toPdf();

    const pdf = await worker.get("pdf");
    pdf.save(`${userLoggedIn.firstName || "preview"}.pdf`);

    // Convert to blob
    const pdfBlob = pdf.output("blob");

    // Upload blob to backend
    const formData = new FormData();
    formData.append(
      "resume",
      pdfBlob,
      `${userLoggedIn.firstName || "preview"}.pdf`
    );
    formData.append("userId", userId);
    formData.append("contactId", alldetails.contact._id);
    formData.append("message", "success");

    await axios.post(`${API_URL}/api/users/download-resume`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire({
      icon: "success",
      title: "PDF Downloaded",
      text: "Resume downloaded successfully!",
      timer: 2000,
      confirmButtonText: "OK",
    }).then(() => window.location.reload());
  } catch (err) {
    console.error("PDF Error:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    }).then(() => navigate("/choose-template"));
  } finally {
    //  2. Show Edit Buttons Back After PDF Download
    editButtons.forEach(btn => (btn.style.display = "flex"));
  }
};

  const navigate = useNavigate();

  const handleEdit = (templateId, editid) => {
    // console.log("templateIddd",templateId)
    navigate("/resume-details", {
      state: { templateId: { id: templateId }, editid: editid },
    });
  };

  // const hasPlan =
  //   Allplans && Allplans.length > 0 && alldetails?.contact?.templateId;

  const [hasPlan, setHasPlan] = useState(false);
  console.log("has plan",hasPlan)

  useEffect(() => {
    if (
      !Allplans ||
      Allplans === "FREE" ||
      (Array.isArray(Allplans) && Allplans.length === 0)
    ) {
      setHasPlan(false);
    } else {
      setHasPlan(true);
    }
  }, [Allplans]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
        <h2 className="text-xl font-semibold font-nunito mb-4 text-gray-700">
          Download Your Resume
        </h2>

        <button
          onClick={handleDownloadPDF}
          className="mt-2 mb-6 bg-red-600 text-white px-6 py-2 font-nunito rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Download PDF
        </button>

        {/* Payment Button */}
        {/* Payment Button + Modal */}
        {/* {!showPayment ? (
          <button
            className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            onClick={() => setShowPayment(true)}
          >
            Pay ₹500
          </button>
        ) : (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                <button
                  onClick={() => setShowPayment(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>

                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Secure Payment — ₹500
                </h3>

                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: "payment",
                    amount: 5000,
                    currency: "inr",
                  }}
                >
                  <CheckoutForm amount={5000} email={UserEmail} />
                </Elements>
              </div>
            </div>
          </>
        )} */}

        <div
    ref={pdfRef}
    style={{
      width: "210mm",
      background: "#fff",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      overflow: "visible",
    }}
  >
    {matchedResume ? (
      <div>
        {/* Render resume */}
        {React.createElement(matchedResume.component, {
          alldata: alldetails,
        })}

        {/* Edit button inside resume container */}
        {hasPlan && (
          <button
            onClick={() => handleEdit(alldetails?.contact?.templateId)}
            style={{
              position: "absolute",
              top: "24%",
              right: "18%",
              zIndex: 10,
            }}
            disabled={alldetails?.hasResume === "true"}
            className="edit-btn px-3 py-1 bg-blue-500 hover:bg-blue-600 font-nunito text-white rounded flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 11l6 6m-6 0h6m0 0V11"
              />
            </svg>
            Edit
          </button>
        )}
      </div>
    ) : (
      <p className="text-center text-gray-500 mt-10">
        {templateId
          ? "No matching resume template found."
          : "Loading resume..."}
      </p>
    )}
  </div>

  {/* Second Edit button (outside pdfRef) */}
  {hasPlan && alldetails?.contact?.templateId && (
    <button
      onClick={() =>
        handleEdit(
          alldetails?.contact?.templateId,
          alldetails?.contact?._id
        )
      }
      style={{
        position: "absolute",
        top: "24%",
        right: "18%",
        zIndex: 10,
      }}
      className="edit-btn px-3 py-1 font-nunito bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536M9 11l6 6m-6 0h6m0 0V11"
        />
      </svg>
      Edit
    </button>
  )}

      </div>
    </div>
  );
}

export default Pdf_download;
