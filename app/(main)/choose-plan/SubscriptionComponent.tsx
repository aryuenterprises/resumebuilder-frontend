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

// const Subscription_Component = ({ show, onClose }) => {
//     const UseContext = useContext(CreateContext);
//     const Allplans = UseContext?.allplandetails;
//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [userEmail, setUserEmail] = useState("");
//     const [userId, setUserId] = useState("");
//     const [showPayment, setShowPayment] = useState(false);
//     const [userall, setUserall] = useState("");
//     const [stripePromise, setStripePromise] = useState(null);
//     const [currencyName, setCurrencyName] = useState([]);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchStripe();
//     }, []);

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("Resumnit_user") || "{}");
//         setUserall(user);
//         setUserEmail(user?.email || "");
//         setUserId(user?.id || user?._id || "");
//     }, []);

//     useEffect(() => {
//         fetchPlans();
//     }, []);

//     const fetchStripe = async () => {
//         try {
//             const response = await axios.get(`${API_URL}/api/setting/get-setting`);
            
//             // Handle different response structures
//             const settings = response.data?.data || response.data;
            
//             if (Array.isArray(settings) && settings.length > 0) {
//                 setCurrencyName(settings[0]?.currencyName || "usd");
                
//                 const publishKey = settings[0]?.PublishableKey;
//                 if (publishKey) {
//                     const stripe = loadStripe(publishKey);
//                     setStripePromise(stripe);
//                 }
//             }
//         } catch (error) {
//             console.log("Stripe key fetch error:", error);
//             // Fallback to a default currency if API fails
//             setCurrencyName("usd");
//         }
//     };

//     const handlePlanSelect = async (plan) => {
//         if (!userId) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Please login first",
//                 text: "You need to log in to continue.",
//                 confirmButtonText: "OK",
//             }).then(() => {
//                 navigate("/login");
//             });
//             return;
//         }

//         setIsProcessing(true);

//         if (plan.price === 0) {
//             try {
//                 const res = await axios.post(`${API_URL}/api/payment/free-plan`, {
//                     userId: userId,
//                     planId: plan._id,
//                 });

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
//             } finally {
//                 setIsProcessing(false);
//             }
//             return;
//         }

//         // User is logged in — continue to payment
//         setSelectedPlan(plan);
//         setShowPayment(true);
//         setIsProcessing(false);
//     };

//     const fetchPlans = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/api/plan-subscription/get-all-plan-subscription`, {
//                 params: { type: "active" }
//             });
            
//             // Handle different response structures
//             const plansData = res?.data?.data?.planSubscriptionDetails 
//                 || res?.data?.planSubscriptionDetails 
//                 || res?.data?.plans
//                 || [];
                
//             setPlans(plansData);
//         } catch (err) {
//             console.error("Error fetching plans:", err);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Failed to load plans. Please try again.",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleBackToPlans = () => {
//         setSelectedPlan(null);
//         setShowPayment(false);
//     };

//     // Check if a plan is active for the user
//     const isPlanActive = (planName) => {
//         if (!Allplans || !planName) return false;
        
//         // Handle different possible structures of Allplans
//         if (Array.isArray(Allplans)) {
//             return Allplans.some(p => 
//                 p?.name?.toLowerCase() === planName.toLowerCase() ||
//                 p?.planId?.name?.toLowerCase() === planName.toLowerCase()
//             );
//         } else if (Allplans?.latestPlan) {
//             return Allplans.latestPlan.planId?.name?.toLowerCase() === planName.toLowerCase();
//         }
        
//         return false;
//     };

//     if (!show) return null;

//     return (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
//                 >
//                     <FaTimes className="w-5 h-5 text-gray-500" />
//                 </button>

//                 {/* Header */}
//                 <div className="text-center py-8 px-6 font-nunito border-b border-gray-100">
//                     <h2 className="text-2xl font-bold text-gray-800">Choose Your Upgrade Plan</h2>
//                     <p className="text-gray-600 mt-2 text-base">
//                         Pick the plan that best fits your needs.
//                     </p>
//                 </div>

//                 {/* Main Section */}
//                 <div className="p-8 w-full">
//                     {selectedPlan && showPayment ? (
//                         // Stripe Payment Form
//                         <div className="w-full max-w-md mx-auto text-center">
//                             <h3 className="text-xl font-semibold font-nunito text-gray-800 mb-4">
//                                 {selectedPlan.name} — {UseContext?.currencysymbol || '$'}{selectedPlan.price}
//                             </h3>

//                             {stripePromise ? (
//                                 <Elements
//                                     stripe={stripePromise}
//                                     options={{
//                                         mode: "payment",
//                                         amount: Math.round(parseFloat(selectedPlan.price) * 100),
//                                         currency: currencyName?.toLowerCase() || "usd",
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
//                                             setShowPayment(false);
//                                             if (onClose) onClose();
//                                             Swal.fire({
//                                                 icon: "success",
//                                                 title: "Payment Successful!",
//                                                 text: "Your plan has been activated successfully.",
//                                             }).then(() => {
//                                                 window.location.reload();
//                                             });
//                                         }}
//                                     />
//                                 </Elements>
//                             ) : (
//                                 <div className="text-center py-8">
//                                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
//                                     <p className="mt-4 text-gray-600">Loading payment system...</p>
//                                 </div>
//                             )}

//                             <button
//                                 onClick={handleBackToPlans}
//                                 className="mt-4 text-sm text-gray-500 underline font-nunito hover:text-gray-700"
//                             >
//                                 ← Back to Plans
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {loading ? (
//                                 <div className="col-span-3 text-center py-12">
//                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//                                     <p className="mt-4 text-gray-600">Loading plans...</p>
//                                 </div>
//                             ) : plans.length > 0 ? (
//                                 plans.map((plan) => {
//                                     const isActive = isPlanActive(plan.name);

//                                     return (
//                                         <div
//                                             key={plan._id}
//                                             className={`
//                                                 relative flex flex-col justify-between mb-6 font-nunito rounded-2xl p-7 
//                                                 transition-all duration-300 border
//                                                 ${isActive
//                                                     ? "border-blue-600 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 scale-[1.02]"
//                                                     : "border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.02] bg-white"}
//                                             `}
//                                         >
//                                             {/* Top Badge */}
//                                             {isActive && (
//                                                 <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                                                     <span className="bg-blue-600 text-white font-nunito text-xs font-semibold px-4 py-1 rounded-full shadow-md tracking-wide">
//                                                         Current Plan
//                                                     </span>
//                                                 </div>
//                                             )}

//                                             {/* Title */}
//                                             <div>
//                                                 <div className="mb-4">
//                                                     <h3 className="text-[22px] font-nunito font-bold text-gray-900 leading-tight text-center">
//                                                         {plan.name}
//                                                     </h3>
//                                                 </div>

//                                                 {/* Description */}
//                                                 {plan.description && (
//                                                     <div
//                                                         className="text-gray-600 font-nunito text-sm leading-relaxed mb-6 min-h-[90px] text-center"
//                                                         dangerouslySetInnerHTML={{ __html: plan.description }}
//                                                     />
//                                                 )}
//                                             </div>

//                                             {/* Price */}
//                                             <div>
//                                                 <div className="text-center mb-7">
//                                                     <span className="text-4xl font-extrabold font-nunito text-gray-900">
//                                                         {UseContext?.currencysymbol || '$'}{plan.price || 0}
//                                                     </span>
//                                                 </div>

//                                                 {/* Features List */}
//                                                 <ul className="space-y-3 mb-8 text-sm font-nunito text-gray-700">
//                                                     {(plan.features && plan.features.length > 0 ? plan.features : [
//                                                         "Create professional resumes",
//                                                         "Download in PDF format",
//                                                         "Email support"
//                                                     ]).map((feature, index) => (
//                                                         <li key={index} className="flex items-center gap-3">
//                                                             <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
//                                                             <span className="text-gray-800">{feature}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>

//                                             {/* Button */}
//                                             <button
//                                                 onClick={() => handlePlanSelect(plan)}
//                                                 disabled={isProcessing || isActive}
//                                                 className={`
//                                                     w-full py-3.5 rounded-xl font-semibold text-white text-sm font-nunito tracking-wide
//                                                     transition-all duration-200
//                                                     ${isActive 
//                                                         ? "bg-gray-400 cursor-not-allowed"
//                                                         : plan.price === 0
//                                                             ? "bg-green-600 hover:bg-green-700"
//                                                             : "bg-indigo-600 hover:bg-indigo-700"
//                                                     }
//                                                     ${isProcessing ? "opacity-50 cursor-wait" : ""}
//                                                 `}
//                                             >
//                                                 {isProcessing 
//                                                     ? "Processing..." 
//                                                     : isActive 
//                                                         ? "Current Plan" 
//                                                         : plan.price === 0 
//                                                             ? "Activate Free Plan" 
//                                                             : "Select Plan"
//                                                 }
//                                             </button>
//                                         </div>
//                                     );
//                                 })
//                             ) : (
//                                 <div className="col-span-3 text-center py-12">
//                                     <p className="text-gray-500">No plans available at the moment.</p>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Subscription_Component;