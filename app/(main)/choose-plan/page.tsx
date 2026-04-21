// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FiStar, FiHeart, FiX, FiCheckCircle } from "react-icons/fi";
// // import { IoSparkles, IoCheckmarkCircle } from "react-icons/io5";
// // import { FaCrown, FaGem } from "react-icons/fa";
// // import { useRouter } from "next/navigation";
// // import { FaChessQueen } from "react-icons/fa";
// // import { FaChessKing } from "react-icons/fa";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import { API_URL } from "@/app/config/api";
// // import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
// // import { getLocalStorage } from "@/app/utils";
// // import { User } from "@/app/types/user.types";
// // import { HiOutlineBadgeCheck } from "react-icons/hi";
// // import { toast } from "react-toastify";

// // // Types
// // interface PlanFeature {
// //   name: string;
// //   included: boolean;
// //   highlight?: boolean;
// // }

// // interface Plan {
// //   id: string;
// //   name: string;
// //   price: number;
// //   interval: "month" | "year" | "one-time" | "3 months" | "Lifetime";
// //   description: string;
// //   features: PlanFeature[];
// //   popular?: boolean;
// //   color: string;
// //   icon: React.ReactNode;
// //   badge?: string;
// //   savings?: string;
// // }

// // // Checkout Modal Component
// // interface CheckoutModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   plan: Plan | null;
// //   userId: string;
// //   userEmail: string;
// //   onSuccess: () => void;
// // }

// // interface usersCurrentPlan {
// //   amount: number;
// //   plan: string;
// // }

// // const CheckoutModal: React.FC<CheckoutModalProps> = ({
// //   isOpen,
// //   onClose,
// //   plan,
// //   userId,
// //   userEmail,
// //   onSuccess,
// // }) => {
// //   const [loading, setLoading] = useState(false);

// //   if (!isOpen || !plan) return null;

// //   const handlePayment = async () => {
// //     try {
// //       setLoading(true);

// //       const { data: order } = await axios.post(
// //         `${API_URL}/api/payment-razor/create-order`,
// //         {
// //           amount: plan.price,
// //           email: userEmail,
// //           planId: plan.id,
// //           userId: userId,
// //         },
// //       );

// //       const options = {
// //         key: RAZORPAY_KEY_ID,
// //         amount: order.amount,
// //         currency: order.currency,
// //         name: "Resume Builder",
// //         description: `${plan.name} Plan Subscription`,
// //         order_id: order.id,

// //         handler: async function (response: any) {
// //           try {
// //             await axios.post(`${API_URL}/api/payment-razor/verify-payment`, {
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_signature: response.razorpay_signature,
// //               planId: plan.id,
// //               userId: userId,
// //             });

// //             Swal.fire({
// //               icon: "success",
// //               title: "Payment Successful!",
// //               text: `${plan.name} plan has been activated`,
// //               timer: 2000,
// //               showConfirmButton: false,
// //             });

// //             onSuccess();
// //             onClose();
// //           } catch (error) {
// //             console.error("Verification error:", error);
// //             Swal.fire("Error", "Payment verification failed", "error");
// //           }
// //         },

// //         prefill: {
// //           email: userEmail,
// //           name: "",
// //         },

// //         theme: {
// //           color: "#2563eb",
// //         },

// //         modal: {
// //           ondismiss: async function () {
// //             setLoading(false);
// //             try {
// //               await axios.post(`${API_URL}/api/payment-razor/payment-failed`, {
// //                 orderId: order.id,
// //                 reason: "User closed payment popup",
// //               });
// //             } catch (error) {
// //               console.error("Failed to log payment cancellation:", error);
// //             }
// //             Swal.fire(
// //               "Payment Cancelled",
// //               "You closed the payment window.",
// //               "info",
// //             );
// //           },
// //         },
// //       };

// //       const rzp = new (window as any).Razorpay(options);

// //       rzp.on("payment.failed", async function (response: any) {
// //         setLoading(false);
// //         try {
// //           await axios.post(`${API_URL}/api/payment-razor/payment-failed`, {
// //             orderId: response.error.metadata.order_id,
// //             paymentId: response.error.metadata.payment_id,
// //             reason: response.error.description,
// //           });
// //         } catch (error) {
// //           console.error("Failed to log payment failure:", error);
// //         }
// //         Swal.fire("Payment Failed", response.error.description, "error");
// //       });

// //       rzp.open();
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Payment initiation error:", error);
// //       Swal.fire("Error", "Unable to start payment. Please try again.", "error");
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
// //           onClick={onClose}
// //         >
// //           <motion.div
// //             initial={{ scale: 0.9, opacity: 0 }}
// //             animate={{ scale: 1, opacity: 1 }}
// //             exit={{ scale: 0.9, opacity: 0 }}
// //             className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             {/* Modal Header */}
// //             <div className={`bg-linear-to-r ${plan.color} p-6 text-white`}>
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <h3 className="text-2xl font-bold mb-2">{plan.name} Plan</h3>
// //                   <p className="text-white/80 text-sm">{plan.description}</p>
// //                 </div>
// //                 <button
// //                   onClick={onClose}
// //                   className="p-1 hover:bg-white/20 rounded-lg transition"
// //                 >
// //                   <FiX className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Modal Content */}
// //             <div className="p-6">
// //               <div className="mb-6">
// //                 <div className="flex items-baseline gap-2 mb-4">
// //                   <span className="text-3xl font-bold font-sans">
// //                     ₹{plan.price}
// //                   </span>
// //                   <span className="text-gray-500">/{plan.interval}</span>
// //                 </div>

// //                 <div className="space-y-3">
// //                   {plan.features.map((feature, idx) => (
// //                     <div key={idx} className="flex items-start gap-2">
// //                       {feature.included ? (
// //                         <IoCheckmarkCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
// //                       ) : (
// //                         <FiX className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
// //                       )}
// //                       <span
// //                         className={`text-sm ${
// //                           feature.highlight
// //                             ? "text-gray-900 font-semibold"
// //                             : feature.included
// //                               ? "text-gray-700"
// //                               : "text-gray-400"
// //                         }`}
// //                       >
// //                         {feature.name}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <button
// //                 onClick={handlePayment}
// //                 disabled={loading}
// //                 className={`
// //                   w-full py-3 rounded-lg font-semibold text-white
// //                   transition-all duration-300 relative overflow-hidden
// //                   ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"}
// //                   bg-linear-to-r ${plan.color}
// //                 `}
// //               >
// //                 {loading
// //                   ? "Processing..."
// //                   : plan.price === 0
// //                     ? "Activate Free Plan"
// //                     : `Pay ₹${plan.price}`}
// //               </button>

// //               <p className="text-xs text-gray-500 text-center mt-4">
// //                 Secure payment powered by Razorpay
// //               </p>
// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // };

// // const plans: Plan[] = [
// //   {
// //     id: "690b55de1ad575c1823e2ace",
// //     name: "Free",
// //     price: 0,
// //     interval: "one-time",
// //     description: "Perfect for getting started with basic resume",
// //     color: "from-slate-500 to-slate-700",
// //     icon: <FiHeart className="w-5 h-5 sm:w-6 sm:h-6" />,
// //     features: [
// //       { name: "1 Resume Template", included: true },
// //       { name: "Basic ATS Optimization", included: true },
// //       { name: "PDF Download", included: true },
// //       { name: "AI-Powered Suggestions", included: false },
// //       { name: "Multiple Templates", included: false },
// //       { name: "Photo Upload", included: false },
// //     ],
// //   },
// //   {
// //     id: "690d83a79a17458ddd4ff601",
// //     name: "Pro",
// //     price: 1,
// //     interval: "month",
// //     description: "Ideal for professionals looking to stand out",
// //     color: "from-[#C40116] to-[#5E000B]",
// //     icon: <FaChessQueen className="w-5 h-5 sm:w-6 sm:h-6" />,
// //     features: [
// //       { name: "3 Resume Templates", included: true, highlight: true },
// //       { name: "Basic ATS Optimization", included: true, highlight: true },
// //       { name: "AI Content Suggestions", included: true, highlight: true },
// //       { name: "Photo Upload", included: true },
// //       { name: "Cover Letter Builder", included: false },
// //       { name: "Interview Prep Kit", included: false },
// //     ],
// //   },
// //   {
// //     id: "690b564a1ad575c1823e2ae3",
// //     name: "Pro Plus",
// //     price: 2,
// //     interval: "month",
// //     description: "Complete career toolkit for serious job seekers",
// //     color: "from-amber-500 to-orange-500",
// //     icon: <FaChessKing className="w-5 h-5 sm:w-6 sm:h-6" />,
// //     badge: "Best Value",
// //     features: [
// //       { name: "5 Resume Templates", included: true, highlight: true },
// //       { name: "Advanced ATS Optimization", included: true, highlight: true },
// //       { name: "Advanced AI Suggestions", included: true, highlight: true },
// //       { name: "Photo Upload", included: true },
// //       { name: "Cover Letter Builder", included: true },
// //       { name: "Interview Prep Kit", included: false },
// //     ],
// //   },
// //   {
// //     id: "6930560199d75df8ae697cab",
// //     name: "Premium",
// //     price: 3,
// //     interval: "Lifetime",
// //     description: "Complete career toolkit for serious job seekers",
// //     color: "from-purple-500 to-indigo-500",
// //     icon: <FaGem className="w-5 h-5 sm:w-6 sm:h-6" />,
// //     badge: "Ultimate Value",
// //     features: [
// //       { name: "All Templates", included: true, highlight: true },
// //       { name: "Premium ATS Optimization", included: true, highlight: true },
// //       { name: "Unlimited AI Suggestions", included: true, highlight: true },
// //       { name: "Photo Upload", included: true },
// //       { name: "Cover Letter Builder", included: true },
// //       { name: "Interview Prep Kit", included: true, highlight: true },
// //     ],
// //   },
// // ];

// // // Comparison features for the table
// // const comparisonFeatures = [
// //   {
// //     name: "Resume Templates",
// //     free: "1 Basic",
// //     pro: "3 Templates",
// //     proPlus: "5 Professional",
// //     premium: "All Premium",
// //   },
// //   {
// //     name: "ATS Optimization",
// //     free: "Basic Check",
// //     pro: "Basic",
// //     proPlus: "Advanced",
// //     premium: "Premium + High Match",
// //   },
// //   {
// //     name: "AI Resume Writing",
// //     free: "Limited",
// //     pro: "Basic",
// //     proPlus: "Smart",
// //     premium: "Unlimited",
// //   },
// //   {
// //     name: "Profile Photo",
// //     free: "❌",
// //     pro: "✅",
// //     proPlus: "✅",
// //     premium: "✅",
// //   },
// //   {
// //     name: "Cover Letter Builder",
// //     free: "❌",
// //     pro: "❌",
// //     proPlus: "✅",
// //     premium: "✅",
// //   },
// //   {
// //     name: "Interview Kit",
// //     free: "❌",
// //     pro: "❌",
// //     proPlus: "❌",
// //     premium: "✅",
// //   },
// //   {
// //     name: "Best For",
// //     free: "Trial",
// //     pro: "Beginners",
// //     proPlus: "Job Seekers",
// //     premium: "Career Growth",
// //   },
// // ];

// // // Main Component
// // export default function ChoosePlanPage() {
// //   const router = useRouter();
// //   const userDetails = getLocalStorage<User>("user_details");
// //   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
// //   const [showCheckout, setShowCheckout] = useState(false);
// //   const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [userId, setUserId] = useState<string>("");
// //   const [userEmail, setUserEmail] = useState<string>("");
// //   const [plan, setPlans] = useState();
// //   console.log("plan from api",plan)
// //   const [usersCurrentPlan, setusersCurrentPlan] =
// //     useState<usersCurrentPlan | null>(null);

// //   useEffect(() => {
// //     const userDetails = getLocalStorage<User>("user_details");
// //     setUserEmail(userDetails?.email || "");
// //     setUserId(userDetails?.id || "");

// //     const fetchUserData = async () => {
// //       try {
// //         const response = await axios.get(`${API_URL}/api/users/dashboard`, {
// //           params: {
// //             userId: userDetails?.id,
// //           },
// //         });

// //         setusersCurrentPlan(response?.data?.payments?.[0]);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //   if(userDetails)
// //     fetchUserData();
// //   }, []);

// //   const handleSelectPlan = async (plan: Plan) => {

// //      if (!userDetails) {
// //       router.push('/login');
// //     return;
// //   }
// //     // Handle free plan activation
// //     if (plan.price === 0) {
// //       setLoading(true);

// //       try {
// //         const response = await axios.post(
// //           `${API_URL}/api/payment-razor/free-plan`,
// //           {
// //             userId: userId,
// //             planId: plan.id,
// //           },
// //         );


// //         Swal.fire({
// //           icon: "success",
// //           title: "Free Plan Activated!",
// //           text: "You can now start using the free plan.",
// //           timer: 2000,
// //           showConfirmButton: false,
// //         });
// //       } catch (error: any) {
// //         console.error("Error activating free plan:", error);
// //       Swal.fire({
// //   title: "Not Applicable",
// //   text: error?.response?.data?.message || "Failed to activate free plan",
// //   icon: "error",
// //   confirmButtonText: "Close" // Change this to your preferred text
// // });
// //       } finally {
// //         setLoading(false);
// //       }
// //     } else {
// //       // Open checkout for paid plans
// //       setSelectedPlan(plan);
// //       setShowCheckout(true);
// //     }
// //   };

// //   const handlePaymentSuccess = () => {
// //     router.push("/choose-template");
// //   };

// //   useEffect(() => {
// //     const fetchPlans = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${API_URL}/api/plan-subscription/get-all-plan-subscription`,
// //           {
// //             params: { type: "active" },
// //           },
// //         );
// //         const plans = res?.data?.planSubscriptionDetails || "";
// //         setPlans(plans);
// //       } catch (err) {
// //         console.error("Error fetching plans:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPlans();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
// //       {/* Hero Section */}
// //       <div className="relative overflow-hidden bg-linear-to-r from-[#5E000B] to-[#C40116]">
// //         <div className="absolute inset-0 overflow-hidden">
// //           <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
// //           <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/5 rounded-full blur-3xl"></div>
// //         </div>

// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="text-center"
// //           >
// //             <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
// //               <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-yellow-600 to-amber-500 text-white rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
// //                 <IoSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
// //                 <span>Launch Offer Get Premium at a Lower Price</span>
// //               </div>
// //             </div>

// //             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4">
// //               Upgrade Your Resume.
// //               <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-200 mt-2">
// //                 Get More Interview Calls.
// //               </span>
// //             </h1>

// //             <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
// //               Get better resumes, smarter AI suggestions, and tools that
// //               increase your chances of getting shortlisted.
// //             </p>
// //           </motion.div>
// //         </div>

// //         {/* Curved Bottom */}
// //         <div className="absolute bottom-0 left-0 right-0">
// //           <svg
// //             viewBox="0 0 1440 100"
// //             fill="none"
// //             xmlns="http://www.w3.org/2000/svg"
// //             preserveAspectRatio="none"
// //             className="w-full h-8 sm:h-12 md:h-16 lg:h-20"
// //           >
// //             <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
// //           </svg>
// //         </div>
// //       </div>

// //       <div className=" mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
// //         {/* Plans Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ">
// //           {plans.map((plan, index) => {
// //             const isHovered = hoveredPlan === plan.id;

// //             const isSamePlan =
// //               plan.name.toLowerCase() === usersCurrentPlan?.plan.toLowerCase();

// //             return (
// //               <motion.div
// //                 key={plan.id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: index * 0.1 }}
// //                 onMouseEnter={() => setHoveredPlan(plan.id)}
// //                 onMouseLeave={() => setHoveredPlan(null)}
// //                 className={`
// //           relative group cursor-pointer rounded-xl sm:rounded-2xl transition-all duration-500
// //         `}
// //               >
// //                 {/* Plan Card */}
// //                 <div
// //                   className={`
// //             relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden
// //             transition-all duration-500
// //             ${isHovered ? "scale-105 shadow-2xl" : "shadow-lg"}
           
// //           `}
// //                 >
// //                   {/* Card Header with Gradient */}
// //                   <div
// //                     className={`bg-linear-to-r ${plan.color} p-4 sm:p-5 md:p-6 text-white relative overflow-hidden`}
// //                   >
// //                     <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
// //                     <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-black/10 rounded-full -ml-8 -mb-8"></div>

// //                     <div className="relative">
// //                       <div className="flex items-center justify-between mb-3 sm:mb-4">
// //                         <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
// //                           {plan.icon}
// //                         </div>
// //                         {plan.badge && !plan.popular && !isSamePlan && (
// //                           <span className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
// //                             {plan.badge}
// //                           </span>
// //                         )}
// //                         {isSamePlan && (
// //                           <span className="px-2 py-1 bg-green-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
// //                             <FiCheckCircle className="w-3 h-3" />
// //                             Active
// //                           </span>
// //                         )}
// //                       </div>

// //                       <h3 className="text-xl sm:text-2xl font-bold mb-1">
// //                         {plan.name}
// //                         {isSamePlan && (
// //                           <span className="text-xs font-normal ml-2 text-white/80">
// //                             (Your current plan)
// //                           </span>
// //                         )}
// //                       </h3>
// //                       <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
// //                         {plan.description}
// //                       </p>

// //                       <div className="flex items-baseline gap-1">
// //                         <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans">
// //                           ₹{plan.price}
// //                         </span>
// //                         <span className="text-white/80 text-xs sm:text-sm">
// //                           /{plan.interval}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Features List */}
// //                   <div className="p-4 sm:p-5 md:p-6">
// //                     <ul className="space-y-2 sm:space-y-3">
// //                       {plan.features.map((feature, idx) => (
// //                         <li key={idx} className="flex items-start gap-2">
// //                           {feature.included ? (
// //                             <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
// //                           ) : (
// //                             <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 shrink-0 mt-0.5" />
// //                           )}
// //                           <span
// //                             className={`text-xs sm:text-sm ${
// //                               feature.highlight
// //                                 ? "text-gray-900 font-semibold"
// //                                 : feature.included
// //                                   ? "text-gray-700"
// //                                   : "text-gray-400"
// //                             }`}
// //                           >
// //                             {feature.name}
// //                           </span>
// //                         </li>
// //                       ))}
// //                     </ul>

// //                     {/* Select/Manage Button */}
// //                     {isSamePlan ? (
// //                       <div className="relative mt-4 sm:mt-5 md:mt-6">
// //                         <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-green-500 rounded-lg sm:rounded-xl blur opacity-20"></div>
// //                         <button
// //                           disabled={true}
// //                           className={`
// //                     w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
// //                     bg-emerald-50 text-emerald-700 cursor-default border border-emerald-200
// //                     flex items-center justify-center gap-2
// //                   `}
// //                         >
// //                           <FiCheckCircle className="w-4 h-4" />
// //                           <span>Current Plan</span>
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           handleSelectPlan(plan);
// //                         }}
// //                         disabled={loading}
// //                         className={`
// //                   w-full mt-4 sm:mt-5 md:mt-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
// //                   transition-all duration-300 relative overflow-hidden group/btn cursor-pointer
// //                   ${
// //                     plan.id === "free"
// //                       ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                       : `bg-linear-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
// //                   }
// //                   ${loading ? "opacity-50 cursor-not-allowed" : ""}
// //                 `}
// //                       >
// //                         <span className="relative z-10">
// //                           {plan.price === 0
// //                             ? "Switch to Free"
// //                             : `Upgrade to ${plan.name}`}
// //                         </span>
// //                         <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
// //                       </button>
// //                     )}
// //                   </div>

                  
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>

// //         {/* Feature Comparison Table */}
// //         <div className="mt-12 sm:mt-16 lg:mt-20">
// //           <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
// //             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
// //               Compare All Features
// //             </h2>
// //             <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
// //               See exactly what you get with each plan and choose the one that
// //               fits your needs
// //             </p>
// //           </div>

// //           <div className="overflow-x-auto bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
// //             <div className="min-w-160">
// //               <table className="w-full">
// //                 <thead>
// //                   <tr className="border-b border-gray-200">
// //                     <th className="p-4 sm:p-6 text-left text-xs sm:text-sm font-semibold text-gray-900">
// //                       Features
// //                     </th>
// //                     {plans.map((plan) => (
// //                       <th key={plan.id} className="p-4 sm:p-6 text-center">
// //                         <div
// //                           className={`text-base sm:text-lg font-bold bg-linear-to-r ${plan.color} bg-clip-text text-transparent`}
// //                         >
// //                           {plan.name}
// //                         </div>
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {comparisonFeatures.map((feature, idx) => (
// //                     <tr
// //                       key={idx}
// //                       className="border-b border-gray-100 last:border-0"
// //                     >
// //                       <td className="p-4 sm:p-6 text-xs sm:text-sm text-gray-700 font-medium">
// //                         {feature.name}
// //                       </td>
// //                       <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600">
// //                         {feature.free}
// //                       </td>
// //                       <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
// //                         {feature.pro}
// //                       </td>
// //                       <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
// //                         {feature.proPlus}
// //                       </td>
// //                       <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
// //                         {feature.premium}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>

// //         {/* FAQ Section */}
// //         <div className="mt-12 sm:mt-16 lg:mt-20">
// //           <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
// //             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
// //               Frequently Asked Questions
// //             </h2>
// //             <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
// //               Everything you need to know about our plans and billing
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
// //             {[
// //               {
// //                 q: "Can I switch plans later?",
// //                 a: "Yes. You can upgrade from ₹49 to ₹199 or lifetime anytime. Your access updates instantly.",
// //               },
// //               {
// //                 q: "What payment methods do you accept?",
// //                 a: "We accept UPI, debit cards, credit cards, and all major Indian payment methods.",
// //               },
// //               {
// //                 q: "Is there a free plan?",
// //                 a: "Yes. You can create and download a basic resume for free.",
// //               },
// //               {
// //                 q: "What do I get in the ₹49 plan?",
// //                 a: "You get templates, ATS optimization, AI suggestions, and photo upload to improve your resume.",
// //               },
// //               {
// //                 q: "What's included in the free plan?",
// //                 a: "The free plan includes 1 template, basic ATS optimization, and PDF downloads forever.",
// //               },
// //               {
// //                 q: "What's included in the ₹199 plan?",
// //                 a: "You unlock advanced ATS optimization, better templates, AI improvements, and cover letter builder.",
// //               },
// //             ].map((faq, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: idx * 0.1 }}
// //                 className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
// //               >
// //                 <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
// //                   {faq.q}
// //                 </h3>
// //                 <p className="text-xs sm:text-sm text-gray-600">{faq.a}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Trust Badges */}
// //         <div className="mt-12 sm:mt-16 lg:mt-20 text-center px-4">
// //           <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
// //             Trusted by professionals at
// //           </p>
// //           <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-50">
// //             <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
// //               Google
// //             </span>
// //             <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
// //               Microsoft
// //             </span>
// //             <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
// //               Amazon
// //             </span>
// //             <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
// //               Meta
// //             </span>
// //             <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
// //               Apple
// //             </span>
// //             <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
// //               Netflix
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Checkout Modal */}
// //       <CheckoutModal
// //         isOpen={showCheckout}
// //         onClose={() => {
// //           setShowCheckout(false);
// //           setSelectedPlan(null);
// //         }}
// //         plan={selectedPlan}
// //         userId={userId}
// //         userEmail={userEmail}
// //         onSuccess={handlePaymentSuccess}
// //       />
// //     </div>
// //   );
// // }





















// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiStar, FiHeart, FiX, FiCheckCircle, FiArrowRight, FiZap, FiShield, FiAward, FiTrendingUp, FiUsers, FiBriefcase, FiClock, FiDollarSign } from "react-icons/fi";
// import { IoSparkles, IoCheckmarkCircle, IoDiamondOutline, IoRocket, IoFlash } from "react-icons/io5";
// import { FaCrown, FaGem, FaChessQueen, FaChessKing } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
// import { getLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { HiOutlineBadgeCheck } from "react-icons/hi";
// import { Toaster, toast } from "react-hot-toast";

// interface PlanFeature {
//   name: string;
//   included: boolean;
//   highlight?: boolean;
// }

// interface Plan {
//   id: string;
//   name: string;
//   price: number;
//   interval: "month" | "year" | "one-time" | "3 months" | "Lifetime";
//   description: string;
//   features: PlanFeature[];
//   popular?: boolean;
//   color: string;
//   icon: React.ReactNode;
//   badge?: string;
// }

// interface CheckoutModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   plan: Plan | null;
//   userId: string;
//   userEmail: string;
//   onSuccess: () => void;
// }

// interface usersCurrentPlan {
//   amount: number;
//   plan: string;
// }

// const CheckoutModal: React.FC<CheckoutModalProps> = ({
//   isOpen,
//   onClose,
//   plan,
//   userId,
//   userEmail,
//   onSuccess,
// }) => {
//   const [loading, setLoading] = useState(false);

//   if (!isOpen || !plan) return null;

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       const { data: order } = await axios.post(
//         `${API_URL}/api/payment-razor/create-order`,
//         {
//           amount: plan.price,
//           email: userEmail,
//           planId: plan.id,
//           userId: userId,
//         },
//       );

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Resume Builder",
//         description: `${plan.name} Plan Subscription`,
//         order_id: order.id,
//         handler: async function (response: any) {
//           try {
//             await axios.post(`${API_URL}/api/payment-razor/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               planId: plan.id,
//               userId: userId,
//             });

//             toast.success(`${plan.name} plan activated!`, { duration: 3000 });
//             onSuccess();
//             onClose();
//           } catch (error) {
//             toast.error("Payment verification failed");
//           }
//         },
//         prefill: { email: userEmail, name: "" },
//         theme: { color: "#4f46e5" },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//       setLoading(false);
//     } catch (error) {
//       toast.error("Unable to start payment");
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 30 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 30 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative`}>
//               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//               <div className="relative">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-2">{plan.name} Plan</h3>
//                     <p className="text-white/80 text-sm">{plan.description}</p>
//                   </div>
//                   <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-xl transition">
//                     <FiX className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="mb-6">
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-4xl font-bold">₹{plan.price}</span>
//                   <span className="text-gray-500">/{plan.interval}</span>
//                 </div>
//                 <div className="space-y-3">
//                   {plan.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-start gap-2">
//                       {feature.included ? (
//                         <IoCheckmarkCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
//                       ) : (
//                         <FiX className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
//                       )}
//                       <span className={`text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"}`}>
//                         {feature.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${plan.color} ${loading ? "opacity-60" : "hover:shadow-xl hover:scale-105"}`}
//               >
//                 {loading ? "Processing..." : plan.price === 0 ? "Activate Free Plan" : `Pay ₹${plan.price}`}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// const plans: Plan[] = [
//   {
//     id: "free",
//     name: "Free",
//     price: 0,
//     interval: "Lifetime",
//     description: "Perfect for getting started",
//     color: "from-slate-500 to-slate-600",
//     icon: <FiHeart className="w-5 h-5" />,
//     features: [
//       { name: "1 Resume Template", included: true },
//       { name: "Basic ATS Optimization", included: true },
//       { name: "PDF Download", included: true },
//       { name: "AI-Powered Suggestions", included: false },
//       { name: "Multiple Templates", included: false },
//       { name: "Photo Upload", included: false },
//     ],
//   },
//   {
//     id: "pro",
//     name: "Pro",
//     price: 1,
//     interval: "month",
//     description: "Ideal for professionals",
//     color: "from-indigo-600 to-indigo-500",
//     icon: <FaChessQueen className="w-5 h-5" />,
//     popular: true,
//     features: [
//       { name: "3 Resume Templates", included: true, highlight: true },
//       { name: "ATS Optimization", included: true, highlight: true },
//       { name: "AI Content Suggestions", included: true, highlight: true },
//       { name: "Photo Upload", included: true },
//       { name: "Cover Letter Builder", included: false },
//       { name: "Interview Prep Kit", included: false },
//     ],
//   },
//   {
//     id: "proplus",
//     name: "Pro Plus",
//     price: 2,
//     interval: "month",
//     description: "Complete career toolkit",
//     color: "from-amber-500 to-orange-500",
//     icon: <FaChessKing className="w-5 h-5" />,
//     badge: "Best Value",
//     features: [
//       { name: "5 Resume Templates", included: true, highlight: true },
//       { name: "Advanced ATS Optimization", included: true, highlight: true },
//       { name: "Advanced AI Suggestions", included: true, highlight: true },
//       { name: "Photo Upload", included: true },
//       { name: "Cover Letter Builder", included: true },
//       { name: "Interview Prep Kit", included: false },
//     ],
//   },
//   {
//     id: "premium",
//     name: "Premium",
//     price: 3,
//     interval: "Lifetime",
//     description: "Ultimate career solution",
//     color: "from-purple-500 to-indigo-600",
//     icon: <FaGem className="w-5 h-5" />,
//     badge: "Ultimate Value",
//     features: [
//       { name: "All Templates", included: true, highlight: true },
//       { name: "Premium ATS Optimization", included: true, highlight: true },
//       { name: "Unlimited AI Suggestions", included: true, highlight: true },
//       { name: "Photo Upload", included: true },
//       { name: "Cover Letter Builder", included: true },
//       { name: "Interview Prep Kit", included: true, highlight: true },
//     ],
//   },
// ];

// export default function ChoosePlanPage() {
//   const router = useRouter();
//   const userDetails = getLocalStorage<User>("user_details");
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState<string>("");
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [usersCurrentPlan, setusersCurrentPlan] = useState<usersCurrentPlan | null>(null);

//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");
//     setUserEmail(userDetails?.email || "");
//     setUserId(userDetails?.id || "");
//     if (userDetails) fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/users/dashboard`, {
//         params: { userId: userDetails?.id },
//       });
//       setusersCurrentPlan(response?.data?.payments?.[0]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSelectPlan = async (plan: Plan) => {
//     if (!userDetails) {
//       router.push('/login');
//       return;
//     }
//     if (plan.price === 0) {
//       setLoading(true);
//       try {
//         await axios.post(`${API_URL}/api/payment-razor/free-plan`, {
//           userId: userId,
//           planId: plan.id,
//         });
//         toast.success("Free Plan Activated!");
//       } catch (error: any) {
//         toast.error(error?.response?.data?.message || "Failed to activate free plan");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setSelectedPlan(plan);
//       setShowCheckout(true);
//     }
//   };

//   const handlePaymentSuccess = () => {
//     router.push("/choose-template");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/30">
//       <Toaster position="top-right" />
      
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>
//       </div>

//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <motion.div 
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-6"
//             >
//               <IoRocket className="w-4 h-4" />
//               <span>LIMITED TIME OFFER</span>
//             </motion.div>
//             <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
//               Choose Your
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
//                 Perfect Plan
//               </span>
//             </h1>
//             <p className="text-xl text-white/90 max-w-2xl mx-auto">
//               Get the tools you need to create professional resumes and land your dream job
//             </p>
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16">
//             <path d="M0 120L1440 0V120H0Z" fill="white" />
//           </svg>
//         </div>
//       </div>

//       {/* Premium Plans Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {plans.map((plan, index) => {
//             const isHovered = hoveredPlan === plan.id;
//             const isSamePlan = plan.name.toLowerCase() === usersCurrentPlan?.plan?.toLowerCase();

//             return (
//               <motion.div
//                 key={plan.id}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 onMouseEnter={() => setHoveredPlan(plan.id)}
//                 onMouseLeave={() => setHoveredPlan(null)}
//                 className="relative"
//               >
//                 {/* Animated border glow */}
//                 <motion.div
//                   className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 blur-xl"
//                   animate={{ opacity: isHovered ? 0.5 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
                
//                 <motion.div
//                   animate={{ y: isHovered ? -8 : 0 }}
//                   transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
//                   className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
//                 >
//                   {/* Popular Badge */}
//                   {plan.popular && (
//                     <motion.div 
//                       initial={{ x: 100 }}
//                       animate={{ x: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="absolute top-4 right-4 z-10"
//                     >
//                       <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
//                         <IoFlash className="w-3 h-3" /> MOST POPULAR
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Card Header with animated gradient */}
//                   <motion.div 
//                     className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <motion.div 
//                       className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
//                       animate={{ scale: isHovered ? 1.2 : 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                     <div className="relative">
//                       <motion.div 
//                         className="inline-flex p-3 bg-white/20 rounded-xl backdrop-blur-sm mb-4"
//                         animate={{ rotate: isHovered ? 10 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         {plan.icon}
//                       </motion.div>
//                       <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
//                       <p className="text-white/80 text-sm mb-3">{plan.description}</p>
//                       <div className="flex items-baseline gap-1">
//                         <motion.span 
//                           className="text-4xl font-bold"
//                           animate={{ scale: isHovered ? 1.05 : 1 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           ₹{plan.price}
//                         </motion.span>
//                         <span className="text-white/80 text-sm">/{plan.interval}</span>
//                       </div>
//                       {plan.badge && !isSamePlan && (
//                         <motion.span 
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className="absolute top-0 right-0 px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
//                         >
//                           {plan.badge}
//                         </motion.span>
//                       )}
//                       {isSamePlan && (
//                         <span className="absolute top-0 right-0 px-2 py-1 bg-emerald-500/80 text-white text-xs font-semibold rounded-full flex items-center gap-1">
//                           <FiCheckCircle className="w-3 h-3" /> Active
//                         </span>
//                       )}
//                     </div>
//                   </motion.div>

//                   {/* Features List with staggered animations */}
//                   <div className="p-6">
//                     <ul className="space-y-3 mb-6">
//                       {plan.features.map((feature, idx) => (
//                         <motion.li 
//                           key={idx}
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.05 + idx * 0.02 }}
//                           whileHover={{ x: 3 }}
//                           className="flex items-start gap-2 group"
//                         >
//                           <motion.div 
//                             className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included ? 'bg-emerald-100' : 'bg-gray-100'}`}
//                             whileHover={{ scale: 1.1 }}
//                           >
//                             {feature.included ? (
//                               <IoCheckmarkCircle className="w-3 h-3 text-emerald-500" />
//                             ) : (
//                               <FiX className="w-3 h-3 text-gray-400" />
//                             )}
//                           </motion.div>
//                           <span className={`text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"} group-hover:text-gray-900 transition-colors`}>
//                             {feature.name}
//                           </span>
//                         </motion.li>
//                       ))}
//                     </ul>

//                     {/* Button with micro-interactions */}
//                     {isSamePlan ? (
//                       <motion.button 
//                         whileHover={{ scale: 1.02 }}
//                         className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-default border border-emerald-200"
//                       >
//                         <FiCheckCircle className="w-4 h-4" /> Current Plan
//                       </motion.button>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleSelectPlan(plan)}
//                         disabled={loading}
//                         className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${plan.price === 0 ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : `bg-gradient-to-r ${plan.color} text-white shadow-lg`}`}
//                       >
//                         <span className="relative z-10">
//                           {plan.price === 0 ? "Switch to Free" : `Upgrade to ${plan.name}`}
//                         </span>
//                         <motion.div 
//                           className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
//                           initial={false}
//                         />
//                       </motion.button>
//                     )}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Stats Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//           className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
//         >
//           {[
//             { icon: FiUsers, value: "10,000+", label: "Active Users", color: "indigo" },
//             { icon: FiBriefcase, value: "50,000+", label: "Resumes Created", color: "purple" },
//             { icon: FiTrendingUp, value: "85%", label: "Interview Success", color: "emerald" },
//           ].map((stat, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <motion.div 
//                 className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}
//                 whileHover={{ rotate: 5, scale: 1.1 }}
//               >
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
//               </motion.div>
//               <motion.p 
//                 className="text-2xl font-bold text-gray-900"
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.7 + idx * 0.1 }}
//               >
//                 {stat.value}
//               </motion.p>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       <CheckoutModal
//         isOpen={showCheckout}
//         onClose={() => {
//           setShowCheckout(false);
//           setSelectedPlan(null);
//         }}
//         plan={selectedPlan}
//         userId={userId}
//         userEmail={userEmail}
//         onSuccess={handlePaymentSuccess}
//       />
//     </div>
//   );
// }

















"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiStar, FiHeart, FiX, FiCheckCircle, FiArrowRight, FiZap, 
  FiShield, FiAward, FiTrendingUp, FiUsers, FiBriefcase, 
} from "react-icons/fi";
import { 
  IoSparkles, IoCheckmarkCircle, IoDiamondOutline, 
  IoRocket, IoFlash, IoShieldCheckmark 
} from "react-icons/io5";
import { FaCrown, FaGem, FaChessQueen, FaChessKing } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
import { getLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Toaster, toast } from "react-hot-toast";

// Types
interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year" | "one-time" | "3 months" | "Lifetime";
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  icon: React.ReactNode;
  badge?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  userId: string;
  userEmail: string;
  onSuccess: () => void;
}

interface usersCurrentPlan {
  amount: number;
  plan: string;
}

// Checkout Modal Component
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  userId,
  userEmail,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !plan) return null;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const { data: order } = await axios.post(
        `${API_URL}/api/payment-razor/create-order`,
        {
          amount: plan.price,
          email: userEmail,
          planId: plan.id,
          userId: userId,
        },
      );

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Resume Builder",
        description: `${plan.name} Plan Subscription`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            await axios.post(`${API_URL}/api/payment-razor/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id,
              userId: userId,
            });

            toast.success(`${plan.name} plan activated successfully!`, {
              duration: 4000,
              icon: '🎉',
              style: {
                background: '#10b981',
                color: '#fff',
                borderRadius: '12px',
              },
            });
            onSuccess();
            onClose();
          } catch (error) {
            toast.error("Payment verification failed", {
              duration: 3000,
              style: {
                background: '#ef4444',
                color: '#fff',
                borderRadius: '12px',
              },
            });
          }
        },
        prefill: { email: userEmail, name: "" },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast("Payment cancelled", {
              icon: '⚠️',
              duration: 3000,
              style: {
                background: '#f59e0b',
                color: '#fff',
                borderRadius: '12px',
              },
            });
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Unable to start payment. Please try again.", {
        duration: 3000,
        style: {
          background: '#ef4444',
          color: '#fff',
          borderRadius: '12px',
        },
      });
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>
              <div className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name} Plan</h3>
                    <p className="text-white/80 text-sm">{plan.description}</p>
                  </div>
                  <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-xl transition-all duration-200">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.included ? (
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <IoCheckmarkCircle className="w-3 h-3 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <FiX className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${plan.color} ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : plan.price === 0 ? (
                  "Activate Free Plan"
                ) : (
                  `Pay ₹${plan.price}`
                )}
              </motion.button>
              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                <IoShieldCheckmark className="w-3 h-3" /> Secure payment powered by Razorpay
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Plans Data
const plans: Plan[] = [
  {
    id: "690b55de1ad575c1823e2ace",
    name: "Free",
    price: 0,
    interval: "Lifetime",
    description: "Perfect for getting started",
    color: "from-slate-500 to-slate-600",
    icon: <FiHeart className="w-5 h-5" />,
    features: [
      { name: "1 Resume Template", included: true },
      { name: "Basic ATS Optimization", included: true },
      { name: "PDF Download", included: true },
      { name: "AI-Powered Suggestions", included: false },
      { name: "Multiple Templates", included: false },
      { name: "Photo Upload", included: false },
    ],
  },
  {
    id: "690d83a79a17458ddd4ff601",
    name: "Pro",
    price: 1,
    interval: "month",
    description: "Ideal for professionals",
    color: "from-indigo-600 to-indigo-500",
    icon: <FaChessQueen className="w-5 h-5" />,
    popular: true,
    features: [
      { name: "3 Resume Templates", included: true, highlight: true },
      { name: "ATS Optimization", included: true, highlight: true },
      { name: "AI Content Suggestions", included: true, highlight: true },
      { name: "Photo Upload", included: true },
      { name: "Cover Letter Builder", included: false },
      { name: "Interview Prep Kit", included: false },
    ],
  },
  {
    id: "690b564a1ad575c1823e2ae3",
    name: "Pro Plus",
    price: 2,
    interval: "month",
    description: "Complete career toolkit",
    color: "from-amber-500 to-orange-500",
    icon: <FaChessKing className="w-5 h-5" />,
    badge: "Best Value",
    features: [
      { name: "5 Resume Templates", included: true, highlight: true },
      { name: "Advanced ATS Optimization", included: true, highlight: true },
      { name: "Advanced AI Suggestions", included: true, highlight: true },
      { name: "Photo Upload", included: true },
      { name: "Cover Letter Builder", included: true },
      { name: "Interview Prep Kit", included: false },
    ],
  },
  {
    id: "6930560199d75df8ae697cab",
    name: "Premium",
    price: 3,
    interval: "Lifetime",
    description: "Ultimate career solution",
    color: "from-purple-500 to-indigo-600",
    icon: <FaGem className="w-5 h-5" />,
    badge: "Ultimate Value",
    features: [
      { name: "All Templates", included: true, highlight: true },
      { name: "Premium ATS Optimization", included: true, highlight: true },
      { name: "Unlimited AI Suggestions", included: true, highlight: true },
      { name: "Photo Upload", included: true },
      { name: "Cover Letter Builder", included: true },
      { name: "Interview Prep Kit", included: true, highlight: true },
    ],
  },
];

// Comparison Features
const comparisonFeatures = [
  { name: "Resume Templates", free: "1 Basic", pro: "3 Templates", proPlus: "5 Professional", premium: "All Premium" },
  { name: "ATS Optimization", free: "Basic Check", pro: "Basic", proPlus: "Advanced", premium: "Premium + High Match" },
  { name: "AI Resume Writing", free: "Limited", pro: "Basic", proPlus: "Smart", premium: "Unlimited" },
  { name: "Profile Photo", free: "❌", pro: "✅", proPlus: "✅", premium: "✅" },
  { name: "Cover Letter Builder", free: "❌", pro: "❌", proPlus: "✅", premium: "✅" },
  { name: "Interview Kit", free: "❌", pro: "❌", proPlus: "❌", premium: "✅" },
  { name: "Best For", free: "Trial", pro: "Beginners", proPlus: "Job Seekers", premium: "Career Growth" },
];

// FAQ Data
const faqs = [
  { q: "Can I switch plans later?", a: "Yes. You can upgrade or downgrade anytime. Your access updates instantly." },
  { q: "What payment methods do you accept?", a: "We accept UPI, debit cards, credit cards, and all major payment methods." },
  { q: "Is there a free plan?", a: "Yes. You can create and download a basic resume for free forever." },
  { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime from your dashboard." },
  { q: "Is my payment secure?", a: "Yes, all payments are processed securely via Razorpay." },
  { q: "Do you offer refunds?", a: "Please contact support for refund inquiries." },
];

// Main Component
export default function ChoosePlanPage() {
  const router = useRouter();
  const userDetails = getLocalStorage<User>("user_details");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [usersCurrentPlan, setUsersCurrentPlan] = useState<usersCurrentPlan | null>(null);

  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");
    setUserEmail(userDetails?.email || "");
    setUserId(userDetails?.id || "");
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: { userId: userDetails?.id },
        });
        setUsersCurrentPlan(response?.data?.payments?.[0]);
      } catch (err) {
        console.error(err);
      }
    };

    if (userDetails) fetchUserData();
  }, []);

  const handleSelectPlan = async (plan: Plan) => {
    if (!userDetails) {
      router.push('/login');
      return;
    }
    
    if (plan.price === 0) {
      setLoading(true);
      try {
        await axios.post(`${API_URL}/api/payment-razor/free-plan`, {
          userId: userId,
          planId: plan.id,
        });
        toast.success("Free Plan Activated!", {
          duration: 3000,
          icon: '🎉',
          style: { background: '#10b981', color: '#fff', borderRadius: '12px' },
        });
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to activate free plan", {
          duration: 3000,
          style: { background: '#ef4444', color: '#fff', borderRadius: '12px' },
        });
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedPlan(plan);
      setShowCheckout(true);
    }
  };

  console.log("selectedPlan",selectedPlan)

  const handlePaymentSuccess = () => {
    router.push("/choose-template");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/30">
      <Toaster position="top-right" />
      
      

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-6 border border-white/30"
            >
              <IoRocket className="w-4 h-4" />
              <span>LIMITED TIME OFFER</span>
              <IoSparkles className="w-4 h-4" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
              Choose Your
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get the tools you need to create professional resumes and land your dream job
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 120L1440 0V120H0Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Plans Grid Section */}
      <div className=" mx-auto px-4 sm:px-6  md:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.id;
            const isSamePlan = plan.name.toLowerCase() === usersCurrentPlan?.plan?.toLowerCase();

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative"
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 blur-xl"
                  animate={{ opacity: isHovered ? 0.5 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  animate={{ y: isHovered ? -8 : 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div 
                      initial={{ x: 100 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 right-4 z-10"
                    >
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <IoFlash className="w-3 h-3" /> MOST POPULAR
                      </div>
                    </motion.div>
                  )}

                  {/* Card Header */}
                  <motion.div 
                    className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                      animate={{ scale: isHovered ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative">
                      <motion.div 
                        className="inline-flex p-3 bg-white/20 rounded-xl backdrop-blur-sm mb-4"
                        animate={{ rotate: isHovered ? 10 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {plan.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{plan.description}</p>
                      <div className="flex items-baseline gap-1">
                        <motion.span 
                          className="text-4xl font-bold"
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          ₹{plan.price}
                        </motion.span>
                        <span className="text-white/80 text-sm">/{plan.interval}</span>
                      </div>
                      {plan.badge && !isSamePlan && (
                        <motion.span 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-0 right-0 px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
                        >
                          {plan.badge}
                        </motion.span>
                      )}
                      {isSamePlan && (
                        <span className="absolute top-0 right-0 px-2 py-1 bg-emerald-500/80 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <FiCheckCircle className="w-3 h-3" /> Active
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Features List */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + idx * 0.02 }}
                          whileHover={{ x: 3 }}
                          className="flex items-start gap-2 group"
                        >
                          <motion.div 
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included ? 'bg-emerald-100' : 'bg-gray-100'}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {feature.included ? (
                              <IoCheckmarkCircle className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <FiX className="w-3 h-3 text-gray-400" />
                            )}
                          </motion.div>
                          <span className={`text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"} group-hover:text-gray-900 transition-colors`}>
                            {feature.name}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    {isSamePlan ? (
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-default border border-emerald-200"
                      >
                        <FiCheckCircle className="w-4 h-4" /> Current Plan
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectPlan(plan)}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${plan.price === 0 ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : `bg-gradient-to-r ${plan.color} text-white shadow-lg`}`}
                      >
                        <span className="relative z-10">
                          {plan.price === 0 ? "Switch to Free" : `Upgrade to ${plan.name}`}
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                          initial={false}
                        />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { icon: FiUsers, value: "10,000+", label: "Active Users", color: "indigo", bg: "bg-indigo-100", text: "text-indigo-600" },
            { icon: FiBriefcase, value: "50,000+", label: "Resumes Created", color: "purple", bg: "bg-purple-100", text: "text-purple-600" },
            { icon: FiTrendingUp, value: "85%", label: "Interview Success", color: "emerald", bg: "bg-emerald-100", text: "text-emerald-600" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <motion.div 
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <stat.icon className={`w-6 h-6 ${stat.text}`} />
              </motion.div>
              <motion.p 
                className="text-2xl font-bold text-gray-900"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Compare All Features</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">See exactly what you get with each plan</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Features</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="p-5 text-center">
                      <div className={`inline-block text-sm font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <motion.tr 
                    key={idx} 
                    className="border-b border-gray-100 hover:bg-indigo-50/30 transition-all duration-200"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="p-5 text-sm font-medium text-gray-900">{feature.name}</td>
                    <td className="p-5 text-center text-sm text-gray-600">{feature.free}</td>
                    <td className="p-5 text-center text-sm text-gray-600 font-medium">{feature.pro}</td>
                    <td className="p-5 text-center text-sm text-gray-600 font-medium">{feature.proPlus}</td>
                    <td className="p-5 text-center text-sm text-gray-600 font-medium">{feature.premium}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to know about our plans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FiAward className="w-5 h-5 text-indigo-500" /> {faq.q}
                </h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 text-center"
        >
          <p className="text-xs text-gray-400 mb-6">Trusted by professionals from leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">Google</span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">Microsoft</span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">Amazon</span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">Meta</span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">Apple</span>
            <span className="text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">Netflix</span>
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => {
          setShowCheckout(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        userId={userId}
        userEmail={userEmail}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}















