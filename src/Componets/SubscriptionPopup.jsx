// // import { useState, useEffect } from "react";
// // import { FaCheckCircle, FaTimes } from "react-icons/fa";
// // import { API_URL } from "../Config";
// // import axios from "axios";

// // const SubscriptionPopup = ({ show, onClose }) => {
// //   if (!show) return null;

// //   const [plandetails, setPlandetails] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchPlan = async () => {
// //     try {
// //       const response = await axios.get(
// //         `${API_URL}/api/plan-subscription/get-all-plan-subscription`
// //       );

// //       // ✅ Safely handle missing data
// //       const plans = response?.data?.data || response?.data || [];
// //       setPlandetails(plans);
// //     } catch (error) {
// //       console.error("Error fetching plans:", error);
// //       setPlandetails([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPlan();
// //   }, []);

// //   return (
// //     <>
// //       {/* Background Overlay */}
// //       <div className="fixed inset-0 bg-[#f8f9fb] opacity-90 z-40"></div>

// //       {/* Popup Box */}
// //       <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
// //         <div className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-lg">
// //           {/* Close Button */}
// //           <button
// //             onClick={onClose}
// //             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
// //           >
// //             <FaTimes size={20} />
// //           </button>

// //           {/* Header */}
// //           <div className="text-center py-8 px-6 border-b border-gray-100">
// //             <h2 className="text-2xl font-bold text-gray-800">
// //               Choose Your Subscription Plan
// //             </h2>
// //             <p className="text-gray-600 mt-2 text-base">
// //               Pick a plan that suits your needs.
// //             </p>
// //           </div>

// //           {/* Plans Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
// //             {loading ? (
// //               <p className="text-center text-gray-500 col-span-4">
// //                 Loading plans...
// //               </p>
// //             ) : plandetails.length > 0 ? (
// //               plandetails.map((plan) => (
// //                 <div
// //                   key={plan._id}
// //                   className="border rounded-xl p-6 text-center bg-white hover:shadow-md transition"
// //                 >
// //                   <h3 className="text-xl font-semibold mb-2 text-gray-800">
// //                     {plan.name}
// //                   </h3>
// //                   <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
// //                   <p className="text-2xl font-bold text-gray-900 mb-6">
// //                     ₹{plan.price}
// //                   </p>

// //                   <ul className="space-y-2 mb-6 text-sm text-gray-700">
// //                     <li className="flex justify-center items-center gap-2">
// //                       <FaCheckCircle className="text-green-500" />{" "}
// //                       {plan.price > 0
// //                         ? "Access to premium templates"
// //                         : "Basic templates"}
// //                     </li>
// //                     <li className="flex justify-center items-center gap-2">
// //                       <FaCheckCircle className="text-green-500" /> Unlimited downloads
// //                     </li>
// //                     <li className="flex justify-center items-center gap-2">
// //                       <FaCheckCircle className="text-green-500" />{" "}
// //                       {plan.price === 0
// //                         ? "Free support"
// //                         : "Priority customer support"}
// //                     </li>
// //                   </ul>

// //                   <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
// //                     Choose {plan.name}
// //                   </button>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-center text-gray-500 col-span-4">
// //                 No plans found.
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default SubscriptionPopup;





// import { useState, useEffect, useContext } from "react";
// import { FaCheckCircle, FaTimes } from "react-icons/fa";
// import { API_URL } from "../Config";
// import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { CreateContext } from "../App";

// // const stripePromise = loadStripe("pk_test_51SP2ZsGi0Hbe41Jr6nVbpcTKTP1tlN7jV70e8j3CvH5R5qDncT4MIdjqBJ22pnOmZVmuqhbxhRy1qhr4r5nIkV4C00Cm3eiNBl");

// const SubscriptionPopup = ({ show, onClose }) => {

//     // console.log("UseContextplan", UseContext);

//     const UseContext = useContext(CreateContext);
//     const Allplans = UseContext?.allplandetails;

//     if (!show) return null;

//     const [plans, setPlans] = useState([]);
//     const[currencyicon,setCurrencyicon]=useState("")
//     // console.log("currencyicon",currencyicon)
//     const [loading, setLoading] = useState(true);
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [userEmail, setUserEmail] = useState("");
//     const [userId, setUserId] = useState("");
//     const [showPayment, setShowPayment] = useState(false);

//   const getCurrencySymbol = (value, fallback) => {
//   if (!value || value.length === 0) return fallback;
//   return value;
// };

// const symbol = getCurrencySymbol(UseContext?.currencysymbol, currencyicon || "£");

//     const [userall, setUserall] = useState("");
//     // console.log("userall", userall)

//     // Store stripe promise (not key)
//     const [stripePromise, setStripePromise] = useState(null);

//     // const [currency, setcurrency] = useState([]);

//     const [currencyName, setCurrencyName] = useState([]);

//     useEffect(() => {
//         fetchStripe();
//     }, []);

//     const fetchStripe = async () => {
//         try {
//             const response = await axios.get(`${API_URL}/api/setting/get-setting`);

//             // setcurrency(response.data[0]?.currenyType)

//             setCurrencyName(response.data[0]?.currencyName)

//             const publishKey = response.data[0]?.PublishableKey;

//             if (publishKey) {
//                 // IMPORTANT:
//                 // loadStripe must be called here
//                 const stripe = loadStripe(publishKey);

//                 setStripePromise(stripe);
//             }
//         } catch (error) {
//             console.log("Stripe key fetch error:", error);
//         }
//     };

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("Resumnit_user"));
//         setUserall(user);
//         setUserEmail(user?.email || "");
//         setUserId(user?.id || user?._id);
//     }, []);

//     const navigate = useNavigate();

//     const handlePlanSelect = async (plan) => {
//         if (!userId) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Please login first",
//                 text: "You need to log in to continue.",
//                 confirmButtonText: "OK",
//             }).then(() => {
//                 navigate("/loging");
//             });

//             return; // stop execution
//         }

//         if (plan.price === 0) {
//             setShowPayment(false);

//             try {
//                 const res = await axios.post(`${API_URL}/api/payment/free-plan`,
//                     {
//                         // params: { userId: userId, planId: plan._id },
//                         userId: userId,
//                         planId: plan._id,
//                     });
//                 onClose();

//                 Swal.fire({
//                     icon: "success",
//                     title: "Free Plan Activated!",
//                     text: res.data?.message || "You have successfully activated the free plan.",
//                 }).then(() => {
//                     window.location.reload();
//                 });

//             } catch (error) {
//                 console.error("Error activating free plan:", error);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: error.response?.data?.message || "Something went wrong while activating the free plan.",
//                 });
//             }

//             return;
//         }

//         //  User is logged in — continue to payment
//         setSelectedPlan(plan);
//         setShowPayment(false); // or whatever triggers your Stripe form
//     };

//     const fetchPlans = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/api/plan-subscription/get-all-plan-subscription`, {
//                 params: { type: "active" }
//             });
//             const plans = res?.data?.planSubscriptionDetails
//                 || res?.data?.planSubscriptionDetails
//                 || "";
//             setPlans(plans);

//             setCurrencyicon(res?.data?.setting?.[0]?.currenyType)

//         } catch (err) {
//             console.error("Error fetching plans:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPlans();
//     }, []);

//     return (
//         <>
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 "></div>

//             {/* Popup Box */}
//             <div className="fixed inset-0 flex justify-center items-center z-50 p-4 ">
//                 <div className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-lg h-[600px] overflow-y-auto">
//                     <button
//                         onClick={onClose}
//                         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//                     >
//                         <FaTimes size={20} />
//                     </button>

//                     {/* Header */}
//                     <div className="text-center py-8 px-6 font-nunito border-b border-gray-100">
//                         <h2 className="text-2xl font-bold text-gray-800">Choose Your Subscription Plan</h2>
//                         <p className="text-gray-600 mt-2 text-base">
//                             Pick the plan that best fits your needs.
//                         </p>
//                     </div>

//                     {/* Main Section */}
//                     <div className="p-8">
//                         {selectedPlan ? (
//                             //  Stripe Payment Form
//                             <div className="max-w-md mx-auto text-center">
//                                 <h3 className="text-xl font-nunito font-semibold text-gray-800 mb-4">
//                                     {selectedPlan.name} — {UseContext?.currencysymbol}{selectedPlan.price}
//                                 </h3>

//                                 <Elements
//                                     stripe={stripePromise}
//                                     options={{
//                                         mode: "payment",
//                                         // amount: selectedPlan.price,
//                                         amount: Math.round(parseFloat(selectedPlan.price) * 100),
//                                         currency: currencyName,

//                                         // currency: "inr",
//                                     }}
//                                 >
//                                     <CheckoutForm
//                                         amount={selectedPlan.price}
//                                         planId={selectedPlan._id}
//                                         email={userEmail}
//                                         userId={userId}
//                                         currencyName={currencyName}
//                                         onSuccess={() => {
//                                             setSelectedPlan(null);
//                                             onClose();
//                                         }}
//                                     />
//                                 </Elements>

//                                 <button
//                                     onClick={() => setSelectedPlan(null)}
//                                     //   onClick={() => handlePlanSelect(plan)}

//                                     className="mt-4 text-sm font-nunito text-gray-500 underline hover:text-gray-700"
//                                 >
//                                     ← Back to Plans
//                                 </button>
//                             </div>
//                         ) : (
//                             //  Plans Grid
//                             // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             //     {loading ? (
//                             //         <p className="text-center text-gray-500 col-span-3">Loading...</p>
//                             //     ) : plans.length > 0 ? (
//                             //         plans.map((plan) => (
//                             //             <div
//                             //                 key={plan._id}
//                             //                 className="border rounded-xl p-6 text-center bg-white hover:shadow-md transition"
//                             //             >
//                             //                 <h3 className="text-xl font-semibold mb-2 text-gray-800">{plan.name}</h3>
//                             //                 <p className="text-gray-600 mb-4">{plan.description}</p>
//                             //                 <p className="text-2xl font-bold text-gray-900 mb-6">₹{plan.price}</p>

//                             //                 <ul className="space-y-2 mb-6 text-sm text-gray-700">
//                             //                     <li className="flex justify-center items-center gap-2">
//                             //                         <FaCheckCircle className="text-green-500" /> Unlimited templates
//                             //                     </li>
//                             //                     <li className="flex justify-center items-center gap-2">
//                             //                         <FaCheckCircle className="text-green-500" /> Download in PDF
//                             //                     </li>
//                             //                     <li className="flex justify-center items-center gap-2">
//                             //                         <FaCheckCircle className="text-green-500" /> Premium Support
//                             //                     </li>
//                             //                 </ul>

//                             //                 <button
//                             //                     onClick={() => handlePlanSelect(plan)}

//                             //                     // onClick={() => setSelectedPlan(plan)}
//                             //                     className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//                             //                 >
//                             //                     Choose {plan.name}
//                             //                 </button>
//                             //             </div>
//                             //         ))
//                             //     ) : (
//                             //         <p className="text-center text-gray-500 col-span-3">No plans available.</p>
//                             //     )}
//                             // </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {loading ? (
//                                     <p className="text-center font-nunito text-gray-500 col-span-3">Loading...</p>
//                                 ) : plans.length > 0 ? (
//                                     plans.map((plan) => {

//                                         const isActive = Allplans?.includes(plan.name?.trim());
//                                         //  Clean or safely render HTML description
//                                         const cleanDescription = plan.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//                                         //  Features: use API features if available or fallback sample
//                                         const features = plan.features?.length
//                                             ? plan.features
//                                             : ["Unlimited templates", "Download in PDF", "Premium Support"];

//                                         return (
//                                             // <div
//                                             //     key={plan._id}
//                                             //     className={`flex flex-col justify-between border rounded-2xl p-6 text-center bg-white hover:shadow-lg transition-all duration-300 ${plan.price === 0 ? "border-green-400 bg-green-50" : ""
//                                             //         }`}
//                                             // >
//                                             //     {/* Top Section */}
//                                             //     <div>
//                                             //         <h3 className="text-2xl font-semibold mb-3 text-gray-800">
//                                             //             {plan.name}
//                                             //         </h3>

//                                             //         {/* Description */}
//                                             //         <div
//                                             //             className="text-gray-600 mb-5 min-h-[80px] leading-relaxed text-sm"
//                                             //             dangerouslySetInnerHTML={{ __html: plan.description }}
//                                             //         />

//                                             //     </div>

//                                             //     <div>
//                                             //         {/* Price */}
//                                             //         {/* <p className="text-3xl font-bold text-indigo-700 mb-6">
//                                             //             ₹{plan.price}
//                                             //         </p> */}

//                                             //         {/* {plan.price > 0 && (
//                                             //             <p className="text-3xl font-bold text-indigo-700 mb-6">
//                                             //                 ${plan.price}
//                                             //             </p>
//                                             //         )} */}

//                                             //         <p className="text-3xl font-bold text-indigo-700 mb-6">
//                                             //             {plan.price > 0 ? `€${plan.price}` : `€0`}
//                                             //         </p>

//                                             //         {/* Feature List */}
//                                             //         <ul className="space-y-3 mb-8 text-sm text-gray-700 text-left mx-auto w-fit">
//                                             //             {features.map((feature, index) => (
//                                             //                 <li key={index} className="flex items-center gap-2">
//                                             //                     <FaCheckCircle className="text-green-500 text-lg" />
//                                             //                     <span>{feature}</span>
//                                             //                 </li>
//                                             //             ))}
//                                             //         </ul>

//                                             //         {/* Button */}
//                                             //         <button
//                                             //             onClick={() => handlePlanSelect(plan)}
//                                             //             className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-200 ${plan.price === 0
//                                             //                 ? "bg-green-500 hover:bg-green-600 text-white"
//                                             //                 : "bg-indigo-600 hover:bg-indigo-700 text-white"
//                                             //                 }`}
//                                             //         >
//                                             //             {plan.price === 0 ? "Activate Free Plan" : (plan.name)}
//                                             //         </button>
//                                             //     </div>
//                                             // </div>

//                                             <div
//                                                 key={plan._id}
//                                                 className={`
//                                                             relative flex flex-col justify-between mb-6 rounded-2xl p-7
//                                                             transition-all duration-300
//                                                             border
//                                                             ${isActive
//                                                         ? "border-blue-600 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 scale-[1.05]"
//                                                         : "border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.03] bg-white"}
//                                                         `}
//                                             >

//                                                 {/* Top Badge */}
//                                                 {isActive && (
//                                                     <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                                                         <span className="bg-blue-600 text-white text-xs font-nunito font-semibold px-4 py-1 rounded-full shadow-md tracking-wide">
//                                                             Current Plan
//                                                         </span>
//                                                     </div>
//                                                 )}

//                                                 {/* Title */}
//                                                 <div>
//                                                     <div className="mb-4">
//                                                         <h3 className="text-[22px] font-nunito font-bold text-gray-900 leading-tight text-center">
//                                                             {plan.name}
//                                                         </h3>
//                                                     </div>

//                                                     {/* Description */}
//                                                     <div
//                                                         className="text-gray-600 text-sm font-nunito leading-relaxed mb-6 min-h-[90px] text-center"
//                                                         dangerouslySetInnerHTML={{ __html: plan.description }}
//                                                     />
//                                                 </div>

//                                                 {/* Price */}
//                                                 <div>
//                                                     <div className="text-center font-nunito mb-6">
//                                                         <span className="text-4xl font-extrabold text-gray-900">
//                                                             {plan.price > 0 ? `${symbol}${plan.price}` : `${symbol}0`}
//                                                         </span>
//                                                         {/* {plan.price > 0 && (
//                                                                 <span className="text-gray-500 text-sm ml-1">/ one-time</span>
//                                                             )} */}
//                                                     </div>

//                                                     {/* Feature List */}
//                                                     {/* <ul className="space-y-3 mb-8 text-sm text-gray-700">
//                                                     {(plan.features || [
//                                                         "Unlimited templates",
//                                                         "Download in PDF",
//                                                         "Premium Support"
//                                                     ]).map((feature, index) => (
//                                                         <li
//                                                             key={index}
//                                                             className="flex items-center gap-3"
//                                                         >
//                                                             <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
//                                                             <span className="text-gray-800">{feature}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul> */}

//                                                     <ul className="space-y-3 mb-8 text-sm font-nunito text-center text-gray-700">
//                                                         <li className="flex items-center justify-center gap-3">
//                                                             <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
//                                                             <span className="text-gray-800 ">{plan?.plan}</span>
//                                                         </li>
//                                                     </ul>
//                                                 </div>

//                                                 {/* Button */}
//                                                 <button
//                                                     onClick={() => handlePlanSelect(plan)}
//                                                     className={`
//                                                                 w-full py-3.5 rounded-xl font-semibold text-white font-nunito text-sm tracking-wide
//                                                                 transition-all duration-200
//                                                                 ${plan.price === 0
//                                                             ? "bg-green-600 hover:bg-green-700"
//                                                             : "bg-indigo-600 hover:bg-indigo-700"}
//                                                             `}
//                                                 >
//                                                     {plan.price === 0 ? "Activate Free Plan" : plan.name}
//                                                 </button>
//                                             </div>
//                                         );
//                                     })
//                                 ) : (
//                                     <p className="text-center font-nunito text-gray-500 col-span-3">No plans available.</p>
//                                 )}
//                             </div>

//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SubscriptionPopup;














import { useState, useEffect, useContext } from "react";
import { FaArrowLeft, FaCheckCircle, FaTimes } from "react-icons/fa";
import { API_URL } from "../Config";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../App";

// const stripePromise = loadStripe("pk_test_51SP2ZsGi0Hbe41Jr6nVbpcTKTP1tlN7jV70e8j3CvH5R5qDncT4MIdjqBJ22pnOmZVmuqhbxhRy1qhr4r5nIkV4C00Cm3eiNBl");

const SubscriptionPopup = ({ show, onClose }) => {
  // console.log("UseContextplan", UseContext);

  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;

  if (!show) return null;

  const [plans, setPlans] = useState([]);
  const [currencyicon, setCurrencyicon] = useState("");
  // console.log("currencyicon",currencyicon)
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const getCurrencySymbol = (value, fallback) => {
    if (!value || value.length === 0) return fallback;
    return value;
  };

  const symbol = getCurrencySymbol(
    UseContext?.currencysymbol,
    currencyicon || "₹"
  );

  const [userall, setUserall] = useState("");
  // console.log("userall", userall)

  // Store stripe promise (not key)
  const [stripePromise, setStripePromise] = useState(null);

  // const [currency, setcurrency] = useState([]);

  const [currencyName, setCurrencyName] = useState([]);

  useEffect(() => {
    fetchStripe();
  }, []);

  const fetchStripe = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/setting/get-setting`);

      // setcurrency(response.data[0]?.currenyType)

      setCurrencyName(response.data[0]?.currencyName);

      const publishKey = response.data[0]?.PublishableKey;

      if (publishKey) {
        // IMPORTANT:
        // loadStripe must be called here
        const stripe = loadStripe(publishKey);

        setStripePromise(stripe);
      }
    } catch (error) {
      console.log("Stripe key fetch error:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Resumnit_user"));
    setUserall(user);
    setUserEmail(user?.email || "");
    setUserId(user?.id || user?._id);
  }, []);

  const navigate = useNavigate();

  const handlePlanSelect = async (plan) => {
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to log in to continue.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/loging");
      });

      return; // stop execution
    }

    if (plan.price === 0) {
      setShowPayment(false);

      try {
        const res = await axios.post(`${API_URL}/api/payment/free-plan`, {
          // params: { userId: userId, planId: plan._id },
          userId: userId,
          planId: plan._id,
        });
        onClose();

        Swal.fire({
          icon: "success",
          title: "Free Plan Activated!",
          text:
            res.data?.message ||
            "You have successfully activated the free plan.",
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error activating free plan:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Something went wrong while activating the free plan.",
        });
      }

      return;
    }

    //  User is logged in — continue to payment
    setSelectedPlan(plan);
    setShowPayment(false); // or whatever triggers your Stripe form
  };

  const fetchPlans = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/plan-subscription/get-all-plan-subscription`,
        {
          params: { type: "active" },
        }
      );
      const plans =
        res?.data?.planSubscriptionDetails ||
        res?.data?.planSubscriptionDetails ||
        "";
      setPlans(plans);

      setCurrencyicon(res?.data?.setting?.[0]?.currenyType);
    } catch (err) {
      console.error("Error fetching plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
//     <>
//       {/* Premium Overlay */}
//       <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" />

//       {/* Modal */}
//       <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
//         <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col max-h-[90vh]">
//           {/* Sticky Header */}
//           <div className="sticky top-0 z-20 bg-white border-b px-8 py-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Choose Your Subscription Plan
//               </h2>
//               <p className="text-gray-500 mt-1">
//                 Upgrade your resume experience with ARYU SmartCV
//               </p>
//             </div>

//             <button
//               onClick={onClose}
//               className="p-2 rounded-xl hover:bg-gray-100 transition"
//             >
//               <FaTimes size={22} />
//             </button>
//           </div>

          

//           {/* Content */}
//           <div className="flex-1  px-8 py-10">
//             {selectedPlan ? (
//               <div className="max-w-xl mx-auto">

// <div className="text-center flex justify-end my-6">
//                   <button
//                     onClick={() => setSelectedPlan(null)}
//                     className=" text-gray-500 hover:text-gray-800 underline transition"
//                   >
//                     ← Back to Plans
//                   </button>
//                 </div>

//                 {/* Apple-style Card */}
//                 <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
//                   {/* Header */}
//                   <div className="px-8 py-6 border-b bg-gradient-to-br from-gray-50 to-white">
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {selectedPlan.name}
//                     </h3>
//                     <p className="text-gray-500 mt-1">
//                       Secure checkout powered by Stripe
//                     </p>
//                   </div>

                  

//                   {/* Price */}
//                   <div className="px-8 py-6 text-center">
//                     <div className="flex justify-center items-end gap-2">
//                       <span className="text-5xl font-extrabold text-gray-900">
//                         {symbol}
//                         {selectedPlan.price}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Stripe Form */}
//                   <div className="px-8 pb-8">
//                     <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
//                       <Elements
//                         stripe={stripePromise}
//                         options={{
//                           mode: "payment",
//                           amount: Math.round(
//                             parseFloat(selectedPlan.price) * 100
//                           ),
//                           currency: currencyName,
//                         }}
//                       >
//                         <CheckoutForm
//                           amount={selectedPlan.price}
//                           planId={selectedPlan._id}
//                           email={userEmail}
//                           userId={userId}
//                           currencyName={currencyName}
//                           onSuccess={() => {
//                             setSelectedPlan(null);
//                             onClose();
//                           }}
//                         />
//                       </Elements>
//                     </div>
//                   </div>

//                   {/* Trust Row */}
//                   <div className="px-8 py-5 border-t bg-white flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
//                     <div className="flex items-center gap-2">
//                       🔒 <span>256-bit SSL Encryption</span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       💳 <span>Secure Stripe Payments</span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       ⚡ <span>Instant Activation</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back Button */}
                
//               </div>
//             ) : (
//               <div className=" py-6">
//                 <Swiper
//                   modules={[Navigation, Pagination]}
//                   navigation
//                   pagination={{ clickable: true }}
//                   spaceBetween={32}
//                   slidesPerView={1}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 3 },
//                   }}
//                   className="pb-14 !overflow-y-visible"
//                 >
//                   {plans.map((plan, index) => {
//                     const isActive = Allplans?.includes(plan.name?.trim());
//                     const isPopular = index === 1;

//                     return (
//                       <SwiperSlide key={plan._id}>
//                         <div
//                           className={`relative rounded-3xl border bg-white p-8 h-full transition-all duration-300 flex flex-col justify-between
//               ${
//                 isPopular
//                   ? "border-red-500  ring-1 ring-red-200"
//                   : "border-gray-200 hover:shadow-xl hover:-translate-y-1"
//               }
//             `}
//                         >
//                           {/* Popular */}
//                           {isPopular && (
//     <div className="flex justify-center mb-5">
//       <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-xs px-5 py-1.5 rounded-full shadow-md">
//         ⭐ Most Popular
//       </span>
//     </div>
//   )}

//                           {/* Active */}
//                           {isActive && (
//                             <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
//                               Current Plan
//                             </span>
//                           )}

//                           {/* Header */}
//                           <div className="">
//                             <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                               {plan.name}
//                             </h3>

//                             <div
//                               className="text-gray-500 text-sm leading-relaxed mb-6 min-h-[72px]"
//                               dangerouslySetInnerHTML={{
//                                 __html: plan.description,
//                               }}
//                             />

//                             <div className="flex justify-center items-end gap-2 mb-8">
//                               <span className="text-4xl font-semibold text-gray-900">
//                                 {symbol}
//                                 {plan.price}
//                               </span>
//                               <span className="text-gray-500 mb-2">/month</span>
//                             </div>
//                           </div>

//                           {/* Features */}
//                           <ul className="space-y-4 mb-10 text-sm text-gray-700">
//                             <li className="flex items-center gap-3 justify-center">
//                               <FaCheckCircle className="text-green-500 text-lg" />
//                               <span>{plan?.plan}</span>
//                             </li>
//                           </ul>

//                           {/* CTA */}
//                           {plan.price!==0 &&
//                           <button
//                             onClick={() => handlePlanSelect(plan)}
//                             className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300
//                 ${
//                   isPopular
//                     ? "bg-gradient-to-r from-[#c40116] to-[#be0117] hover:shadow-xl hover:scale-[1.02]"
//                     : "bg-gray-900 hover:bg-black"
//                 }
//               `}
//                           >
//                             {/* {plan.price === 0 ? "Activate Free" : "Upgrade Now"} */}

//                             Upgrade Now
//                           </button>
//                   }
//                         </div>
//                       </SwiperSlide>
//                     );
//                   })}
//                 </Swiper>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>

<>
    {/* Premium Overlay */}
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" />

    {/* Modal */}
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl overflow-y-auto flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white border-b px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              Choose Your Subscription Plan
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 truncate">
              Upgrade your resume experience with ARYU SmartCV
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 transition flex-shrink-0 ml-2 sm:ml-4"
          >
            <FaTimes className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 overflow-y-auto">
          {selectedPlan ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-right mb-4 sm:mb-6">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-500 hover:text-gray-800 underline transition text-sm sm:text-base flex items-center gap-1 sm:gap-2"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Back to Plans
                </button>
              </div>

              {/* Apple-style Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-md border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
                    Secure checkout powered by Stripe
                  </p>
                </div>

                {/* Price */}
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-center">
                  <div className="flex justify-center items-end gap-1 sm:gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
                      {symbol}
                      {selectedPlan.price}
                    </span>
                  </div>
                </div>

                {/* Stripe Form */}
                <div className="px-3 sm:px-4 md:px-8 pb-6 sm:pb-8">
                  <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-inner">
                    <Elements
                      stripe={stripePromise}
                      options={{
                        mode: "payment",
                        amount: Math.round(
                          parseFloat(selectedPlan.price) * 100
                        ),
                        currency: currencyName,
                      }}
                    >
                      <CheckoutForm
                        amount={selectedPlan.price}
                        planId={selectedPlan._id}
                        email={userEmail}
                        userId={userId}
                        currencyName={currencyName}
                        onSuccess={() => {
                          setSelectedPlan(null);
                          onClose();
                        }}
                      />
                    </Elements>
                  </div>
                </div>

                {/* Trust Row */}
                <div className="px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-5 border-t bg-white flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1 sm:gap-2">
                    🔒 <span className="truncate">256-bit SSL</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    💳 <span className="truncate">Stripe Payments</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    ⚡ <span className="truncate">Instant Activation</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div >
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  480: { slidesPerView: 1.2, spaceBetween: 20 },
                  640: { slidesPerView: 2, spaceBetween: 24 },
                  1024: { slidesPerView: 3, spaceBetween: 32 },
                }}
                className="!pb-12 sm:!pb-14"
              >
                {plans.map((plan, index) => {
                  const isActive = Allplans?.includes(plan.name?.trim());
                  const isPopular = index === 1;

                  return (
                    <SwiperSlide key={plan._id}>
                      <div
                        className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl border bg-white p-4 sm:p-6 md:p-8 h-full transition-all duration-300 flex flex-col justify-between
                          ${
                            isPopular
                              ? "border-red-500 ring-1 sm:ring-2 ring-red-200"
                              : "border-gray-200 hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1"
                          }
                        `}
                      >
                        {/* Popular Badge */}
                        {isPopular && (
                          <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
                            <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md whitespace-nowrap">
                              ⭐ Most Popular
                            </span>
                          </div>
                        )}

                        {/* Active Badge */}
                        {isActive && (
                          <span className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-green-100 text-green-700 text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            Current Plan
                          </span>
                        )}

                        {/* Header */}
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                            {plan.name}
                          </h3>

                          <div
                            className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 min-h-[60px] sm:min-h-[72px]"
                            dangerouslySetInnerHTML={{
                              __html: plan.description,
                            }}
                          />

                          <div className="flex justify-center items-end gap-1 sm:gap-2 mb-6 sm:mb-8">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                              {symbol}
                              {plan.price}
                            </span>
                            <span className="text-gray-500 text-sm sm:text-base mb-0.5 sm:mb-1 md:mb-2">/month</span>
                          </div>
                        </div>

                        {/* Features */}
                        <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm text-gray-700">
                          <li className="flex items-center gap-2 sm:gap-3 justify-center">
                            <FaCheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-center">{plan?.plan}</span>
                          </li>
                        </ul>

                        {/* CTA Button */}
                        {plan.price !== 0 && (
                          <button
                            onClick={() => handlePlanSelect(plan)}
                            className={`w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-300 text-sm sm:text-base
                              ${
                                isPopular
                                  ? "bg-gradient-to-r from-[#c40116] to-[#be0117] hover:shadow-lg sm:hover:shadow-xl hover:scale-[1.02]"
                                  : "bg-gray-900 hover:bg-black"
                              }
                            `}
                          >
                            Upgrade Now
                          </button>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev !hidden sm:!flex !w-10 !h-10 !bg-white !rounded-full !shadow-lg !text-gray-700 hover:!shadow-xl hover:!scale-105 transition-all"></div>
                <div className="swiper-button-next !hidden sm:!flex !w-10 !h-10 !bg-white !rounded-full !shadow-lg !text-gray-700 hover:!shadow-xl hover:!scale-105 transition-all"></div>
              </Swiper>

              
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-gray-50">
          <div className="text-center text-gray-600 text-xs sm:text-sm">
            <p className="mb-2">Need help? Contact support@aryusmartcv.com</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default SubscriptionPopup;
