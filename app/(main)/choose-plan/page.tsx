// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiStar,
//   FiHeart,
//   FiX,
//   FiCheckCircle,
//   FiArrowRight,
//   FiZap,
//   FiShield,
//   FiAward,
//   FiTrendingUp,
//   FiUsers,
//   FiBriefcase,
//   FiAlertCircle,
//   FiThumbsUp,
// } from "react-icons/fi";
// import {
//   IoSparkles,
//   IoCheckmarkCircle,
//   IoDiamondOutline,
//   IoRocket,
//   IoFlash,
//   IoShieldCheckmark,
// } from "react-icons/io5";
// import { FaCrown, FaGem, FaChessQueen, FaChessKing } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
// import { getLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { HiOutlineBadgeCheck } from "react-icons/hi";
// import Faq from "@/app/components/sections/FAQ";
// import api from "@/app/utils/api";

// // Types
// interface PlanFeature {
//   name: string;
//   included: boolean;
//   highlight?: boolean;
// }

// interface Plan {
//   id: string;
//   name: string;
//   duration_days: string;
//   description: string;
//   features: PlanFeature[];
//   popular?: boolean;
//   color: string;
//   icon: React.ReactNode;
//   badge?: string;
//   regularPrice: string;
//   discountPrice: string;
// }

// interface CheckoutModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   plan: Plan | null;
//   userId: string;
//   userEmail: string;
//   onSuccess: () => void;
// }

// interface ApiPlan {
//   id: string;
//   name: string;
//   price: string;
//   plan: string;
//   title: string;
//   description: string;
//   discount_price: string;
//   order: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   slug: string;
//   duration_days: string;
// }

// // Checkout Modal Component
// const CheckoutModal: React.FC<CheckoutModalProps> = ({
//   isOpen,
//   onClose,
//   plan,
//   userId,
//   userEmail,
//   onSuccess,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState<
//     "processing" | "success" | "error" | "cancelled"
//   >("processing");
//   const [paymentMessage, setPaymentMessage] = useState("");

//   if (!isOpen || !plan) return null;

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       setShowPaymentModal(true);
//       setPaymentStatus("processing");
//       setPaymentMessage("Initializing payment...");

//       const res = await api.post("/payment/create-order/", {
//         subscription_id: plan.id,
//       });

//       const options = {
//         key: res.data.key,
//         amount: res.data.amount,
//         currency: res.data.currency,
//         name: "Resume Builder",
//         description: `${plan.name} Plan Subscription`,
//         order_id: res.data.order_id,
//         handler: async function (response: any) {
//           try {
//             setPaymentMessage("Verifying payment...");
//             await api.post("/payment/verify-payment/", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             setPaymentStatus("success");
//             setPaymentMessage(`${plan.name} plan activated successfully!`);

//             setTimeout(() => {
//               setShowPaymentModal(false);
//               setLoading(false);
//               onSuccess();
//               onClose();
//             }, 2000);
//           } catch (error) {
//             setPaymentStatus("error");
//             setPaymentMessage("Payment verification failed. Please try again.");
//             setTimeout(() => {
//               setShowPaymentModal(false);
//               setLoading(false);
//             }, 2000);
//           }
//         },
//         prefill: { email: userEmail, name: "" },
//         theme: { color: "#4f46e5" },
//         modal: {
//           ondismiss: function () {
//             setPaymentStatus("cancelled");
//             setPaymentMessage("Payment cancelled");
//             setTimeout(() => {
//               setShowPaymentModal(false);
//               setLoading(false);
//             }, 1500);
//           },
//         },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//       setLoading(false);
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       setPaymentStatus("error");
//       setPaymentMessage("Unable to start payment. Please try again.");
//       setTimeout(() => {
//         setShowPaymentModal(false);
//         setLoading(false);
//       }, 2000);
//     }
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl"
//             onClick={onClose}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 30 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 30 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div
//                 className={`bg-gradient-to-r ${plan.color} p-5 sm:p-6 text-white relative overflow-hidden`}
//               >
//                 <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 animate-pulse"></div>
//                 <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-black/10 rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16"></div>
//                 <div className="relative">
//                   <div className="flex justify-between items-start gap-2">
//                     <div className="flex-1">
//                       <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
//                         {plan.name} Plan
//                       </h3>
//                       <p className="text-white/80 text-xs sm:text-sm min-h-[40px]">
//                         {plan.description}
//                       </p>
//                     </div>
//                     <button
//                       onClick={onClose}
//                       className="p-1.5 sm:p-2 hover:bg-white/20 rounded-xl transition-all duration-200 flex-shrink-0"
//                     >
//                       <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-5 sm:p-6">
//                 <div className="mb-5 sm:mb-6">
//                   <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
//                     <span className="text-3xl sm:text-4xl font-bold text-gray-900">
//                       ₹{plan.discountPrice}
//                     </span>
//                     <span className="text-gray-500 text-xs sm:text-sm">
//                       /{plan.duration_days} 
//                     </span>
//                   </div>
//                   <div className="space-y-2 sm:space-y-3">
//                     {plan.features.map((feature, idx) => (
//                       <div key={idx} className="flex items-start gap-2">
//                         {feature.included ? (
//                           <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//                             <IoCheckmarkCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
//                           </div>
//                         ) : (
//                           <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//                             <FiX className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
//                           </div>
//                         )}
//                         <span
//                           className={`text-xs sm:text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"}`}
//                         >
//                           {feature.name}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handlePayment}
//                   disabled={loading}
//                   className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold cursor-pointer text-white transition-all duration-300 bg-gradient-to-r ${plan.color} text-sm sm:text-base ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"}`}
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       <span className="text-xs sm:text-sm">Processing...</span>
//                     </div>
//                   ) : (
//                     `Pay ₹${plan.discountPrice}`
//                   )}
//                 </motion.button>
//                 <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4 flex items-center justify-center gap-1">
//                   <IoShieldCheckmark className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{" "}
//                   Secure payment powered by Razorpay
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Payment Status Modal */}
//       <AnimatePresence>
//         {showPaymentModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl max-w-sm w-full overflow-hidden"
//             >
//               {paymentStatus === "processing" && (
//                 <div className="p-6 text-center">
//                   <div className="w-16 h-16 mx-auto mb-4">
//                     <div className="w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     Processing Payment
//                   </h3>
//                   <p className="text-sm text-gray-600">{paymentMessage}</p>
//                 </div>
//               )}

//               {paymentStatus === "success" && (
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
//                   <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
//                     <FiThumbsUp className="w-8 h-8 text-indigo-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     Payment Successful!
//                   </h3>
//                   <p className="text-white/90 text-sm">{paymentMessage}</p>
//                 </div>
//               )}

//               {paymentStatus === "error" && (
//                 <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-center">
//                   <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
//                     <FiAlertCircle className="w-8 h-8 text-red-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     Payment Failed
//                   </h3>
//                   <p className="text-white/90 text-sm">{paymentMessage}</p>
//                 </div>
//               )}

//               {paymentStatus === "cancelled" && (
//                 <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
//                   <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
//                     <FiAlertCircle className="w-8 h-8 text-amber-500" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     Payment Cancelled
//                   </h3>
//                   <p className="text-white/90 text-sm">{paymentMessage}</p>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // Comparison Features
// const comparisonFeatures = [
//   {
//     name: "Resume Templates",
//     free: "1 Template",
//     pro: "3 Templates",
//     premium: "All Templates",
//   },
//   {
//     name: "ATS Optimization",
//     free: "Basic",
//     pro: "Basic",
//     premium: "Advanced",
//   },
//   {
//     name: "Photo Upload",
//     free: "✗",
//     pro: "✓",
//     premium: "✓",
//   },
//   {
//     name: "AI Suggestions",
//     free: "✓",
//     pro: "✓",
//     premium: "✓",
//   },
//   {
//     name: "Cover Letter",
//     free: "✗",
//     pro: "✗",
//     premium: "✓",
//   },
// ];

// // Main Component
// export default function ChoosePlanPage() {
//   const router = useRouter();
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState<string>("");
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [usersCurrentPlan, setUsersCurrentPlan] = useState<string | null>(null);
//   const [isSubscriptionExpired, setIsSubscriptionExpired] = useState<boolean>(false);
//   const [planDetails, setPlanDetails] = useState<Plan[]>([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Custom Modal States
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [modalConfig, setModalConfig] = useState({
//     title: "",
//     message: "",
//     subMessage: "",
//     type: "error" as "error" | "info" | "success"
//   });

//   const showModal = (type: "error" | "info" | "success", config: any) => {
//     setModalConfig({ ...config, type });
//     setShowErrorModal(true);
//   };

//   // Helper function to check if user can select free plan
//   const canUserSelectFreePlan = (currentPlan: string | null, isExpired: boolean, isAuthenticated: boolean): { 
//     allowed: boolean; 
//     reason?: string; 
//     friendlyMessage?: string;
//     title?: string;
//   } => {
//     // If user is not authenticated, they can select free plan (will be redirected to login)
//     if (!isAuthenticated) {
//       return { 
//         allowed: false, 
//         title: "🔐 Login Required",
//         friendlyMessage: "Please login to subscribe to any plan",
//         reason: "User not authenticated"
//       };
//     }

//     // User has NO plan - free plan is automatically activated on registration
//     if (!currentPlan) {
//       return { 
//         allowed: false, 
//         title: "✨ Free Plan Already Active!",
//         friendlyMessage: "You already have access to the Free plan. It was automatically activated when you created your account.",
//         reason: "Free plan is automatically activated on registration. You already have access to it."
//       };
//     }

//     const planLower = currentPlan.toLowerCase();

//     // User already on free plan
//     if (planLower === 'free') {
//       return { 
//         allowed: false, 
//         title: "🌟 You're Already on the Free Plan!",
//         friendlyMessage: "You're currently enjoying the Free plan. Check out our Pro and Premium plans for more features!",
//         reason: "You are already on the Free plan."
//       };
//     }

//     // User has expired subscription
//     if (isExpired) {
//       return { 
//         allowed: false, 
//         title: "⏰ Your Subscription Has Expired",
//         friendlyMessage: "Your Pro/Premium subscription has expired. To continue using our services, please renew your subscription or upgrade to a new plan.",
//         reason: "Your subscription has expired. Please subscribe to Pro or Premium to continue using our services."
//       };
//     }

//     // User has active pro/premium plan
//     const activePlans = ['pro', 'premium', 'pro plus'];
//     if (activePlans.includes(planLower)) {
//       const planDisplay = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);
//       return { 
//         allowed: false, 
//         title: `🚀 You're on the ${planDisplay} Plan!`,
//         friendlyMessage: `You're currently enjoying all the premium features of the ${planDisplay} plan. The Free plan is designed for new users getting started. Stick with ${planDisplay} for the best experience!`,
//         reason: `You are currently on the ${currentPlan} plan. Downgrading to Free is not allowed.`
//       };
//     }

//     return { 
//       allowed: false, 
//       title: "ℹ️ Free Plan Not Available",
//       friendlyMessage: "The Free plan is only available for new users. You already have an active subscription. Explore our Pro and Premium plans for more features!",
//       reason: "Free plan is not available for your current subscription status."
//     };
//   };

//   // Helper function to get sub-message based on subscription status
//   const getSubMessage = (currentPlan: string | null, isExpired: boolean): string => {
//     if (!currentPlan) {
//       return "💡 Tip: You can upgrade to Pro or Premium anytime to unlock more features like additional templates, advanced ATS optimization, and cover letter generation.";
//     }
    
//     const planLower = currentPlan.toLowerCase();
    
//     if (planLower === 'free') {
//       return "💡 Tip: Upgrade to Pro or Premium to unlock unlimited templates, advanced ATS optimization, and cover letter generation features.";
//     }
    
//     if (isExpired) {
//       return "💡 Tip: Renew your subscription to continue enjoying premium features. Choose from our Pro or Premium plans that best suit your needs.";
//     }
    
//     if (['pro', 'premium', 'pro plus'].includes(planLower)) {
//       const planDisplay = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);
//       return `💡 Tip: You're getting the best experience with ${planDisplay}. Continue enjoying premium features like unlimited templates, advanced ATS optimization, and cover letter generation.`;
//     }
    
//     return "💡 Tip: Check out our Pro and Premium plans for more features and better career opportunities.";
//   };

//   // Fetch user data and subscription status
//   useEffect(() => {
//     const fetchUserData = async () => {
//       // Check if user is logged in
//       const userDetails = getLocalStorage<User>("user_details");
//       const accessToken = getLocalStorage<string>("access_token");
      
//       if (!userDetails?.id || !accessToken) {
//         // User is not logged in
//         setIsAuthenticated(false);
//         setUsersCurrentPlan(null);
//         setIsSubscriptionExpired(false);
//         return;
//       }
      
//       setIsAuthenticated(true);
//       setUserId(userDetails.id);
//       setUserEmail(userDetails.email || "");
      
//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data;
        
//         if (subscription) {
//           // Set current plan and expiration status
//           // setUsersCurrentPlan(subscription.current_plan || null);
//           // setIsSubscriptionExpired(subscription.is_expired || false);


//            setUsersCurrentPlan("premium");
//           setIsSubscriptionExpired(false);

          
//           console.log("Subscription status:", {
//             current_plan: subscription.current_plan,
//             is_expired: subscription.is_expired,
//             plan_details: subscription.plan_details
//           });
//         } else {
//           setUsersCurrentPlan(null);
//           setIsSubscriptionExpired(false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//         setUsersCurrentPlan(null);
//         setIsSubscriptionExpired(false);
        
//         // Only clear tokens if it's an authentication error
//         if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//           localStorage.removeItem("user_details");
//           setIsAuthenticated(false);
//         }
//       }
//     };
    
//     fetchUserData();
//   }, []);

//   const transformAPIPlanToPlan = (apiPlan: ApiPlan): Plan => {
//     const parseFeaturesFromHTML = (htmlString: string): PlanFeature[] => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(htmlString, "text/html");

//       // Get both ul and ol elements
//       const lists = doc.querySelectorAll("ul, ol");

//       const features: PlanFeature[] = [];

//       lists.forEach((list) => {
//         const listItems = list.querySelectorAll("li");
//         const isOrdered = list.tagName.toLowerCase() === "ol";

//         listItems.forEach((item, index) => {
//           const text = item.textContent?.trim() || "";
//           const isBullet = !isOrdered;
//           const included = isBullet;
//           const isHighlight = text.toLowerCase().includes("premium");

//           features.push({
//             name: text,
//             included: included,
//             highlight: isHighlight,
//             ...(isOrdered && { order: index + 1 }),
//           });
//         });
//       });

//       return features;
//     };

//     const getPlanColor = (planName: string): string => {
//       switch (planName?.toLowerCase()) {
//         case "free":
//           return "from-slate-500 to-slate-600";
//         case "pro":
//           return "from-indigo-600 to-indigo-500";
//         case "premium":
//           return "from-purple-500 to-indigo-600";
//         default:
//           return "from-gray-500 to-gray-600";
//       }
//     };

//     const getPlanIcon = (planName: string): React.ReactNode => {
//       switch (planName?.toLowerCase()) {
//         case "free":
//           return <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />;
//         case "pro":
//           return <FaChessQueen className="w-4 h-4 sm:w-5 sm:h-5" />;
//         case "premium":
//           return <FaGem className="w-4 h-4 sm:w-5 sm:h-5" />;
//         default:
//           return <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />;
//       }
//     };

//     const getPlanBadge = (planName: string): string | undefined => {
//       switch (planName?.toLowerCase()) {
//         case "pro plus":
//           return "Best Value";
//         case "premium":
//           return "Ultimate Value";
//         default:
//           return undefined;
//       }
//     };

//     const isPopular = (planName: string): boolean => {
//       return planName?.toLowerCase() === "pro";
//     };

//     const features = parseFeaturesFromHTML(apiPlan.description);
//     const planColor = getPlanColor(apiPlan.name);
//     const planIcon = getPlanIcon(apiPlan.name);
//     const planBadge = getPlanBadge(apiPlan.name);

//     return {
//       id: apiPlan.id,
//       name: apiPlan.name,
//       regularPrice: apiPlan.price,
//       discountPrice: apiPlan.discount_price,
//       duration_days: apiPlan.duration_days,
//       description: apiPlan.slug,
//       color: planColor,
//       icon: planIcon,
//       popular: isPopular(apiPlan.name),
//       ...(planBadge && { badge: planBadge }),
//       features: features,
//     };
//   };

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/pricing-plans/`);
//         const apiPlans = res.data.plans || [];
//         const transformedPlans = apiPlans.map(transformAPIPlanToPlan);
//         setPlanDetails(transformedPlans);
//       } catch (err) {
//         console.error("Error fetching plans:", err);
//       }
//     };
//     fetchPlans();
//   }, []);

//   const handleSelectPlan = async (plan: Plan) => {
//     const userDetails = getLocalStorage<User>("user_details");

//     // Check if user is logged in - redirect to login page
//     if (!userDetails?.id) {
//       // Save the current path to redirect back after login
//       // const currentPath = window.location.pathname;
//       // localStorage.setItem("redirectAfterLogin", currentPath);
      
//       // Redirect to login page with return URL
//       // router.push(`/login?returnUrl=${encodeURIComponent(currentPath)}`);

//             router.push(`/login`);

//       return;
//     }

//     // Check if the selected plan is free
//     if (plan.regularPrice === "0" || plan.name.toLowerCase() === "free") {
//       // Fetch latest subscription status
//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data;
        
//         const currentPlan = subscription?.current_plan || null;
//         const isExpired = subscription?.is_expired || false;
        
//         // Check if user can select free plan
//         const { allowed, reason, friendlyMessage, title } = canUserSelectFreePlan(currentPlan, isExpired, true);
        
//         if (!allowed) {
//           // Show friendly message based on subscription status
//           showModal("info", {
//             title: title || "Free Plan Unavailable",
//             message: friendlyMessage || reason || "Free plan is not available for your account.",
//             subMessage: getSubMessage(currentPlan, isExpired)
//           });
//           return;
//         }
        
//         // This will never execute but kept for safety
//         showModal("info", {
//           title: "✅ Free Plan Available",
//           message: "Your free plan is active and ready to use!",
//           subMessage: "You can start using the free plan features immediately."
//         });
//         return;
//       } catch (err) {
//         console.error("Error fetching subscription status:", err);
//         showModal("error", {
//           title: "⚠️ Something Went Wrong",
//           message: "We couldn't verify your subscription status.",
//           subMessage: "Please try again later. If the problem persists, contact our support team."
//         });
//         return;
//       }
//     }

//     // For paid plans (pro/premium)
//     setSelectedPlan(plan);
//     setShowCheckout(true);
//   };

//   const handlePaymentSuccess = () => {
//     router.push("/choose-template");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/30">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-28">
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
//               className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] sm:text-sm font-semibold mb-4 sm:mb-6 border border-white/30"
//             >
//               <IoRocket className="w-3 h-3 sm:w-4 sm:h-4" />
//               <span>LIMITED TIME OFFER</span>
//               <IoSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
//             </motion.div>

//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 px-2">
//               Choose Your
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-1 sm:mt-2">
//                 Perfect Plan
//               </span>
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-3">
//               Get the tools you need to create professional resumes and land
//               your dream job
//             </p>

//             {/* Show subscription status for authenticated users */}
//             {isAuthenticated && usersCurrentPlan && (
//               <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
//                 <FiCheckCircle className="w-4 h-4 text-emerald-300" />
//                 <span className="text-sm text-white/90">
//                   Current Plan: <span className="font-semibold text-white capitalize">{usersCurrentPlan}</span>
//                   {isSubscriptionExpired && (
//                     <span className="ml-2 text-yellow-300 text-xs font-medium bg-yellow-500/20 px-2 py-0.5 rounded-full">
//                       Expired
//                     </span>
//                   )}
//                 </span>
//               </div>
//             )}

            
//           </motion.div>
//         </div>
//       </div>

//       {/* Plans Grid Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 lg:py-20">
//         {planDetails.length === 0 ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
//             {[...planDetails].reverse().map((plan, index) => {
//               const isHovered = hoveredPlan === plan.id;
//               const isSamePlan = isAuthenticated && plan.name.toLowerCase() === usersCurrentPlan?.toLowerCase();
//               const isFreePlan = plan.regularPrice === "0" || plan.name.toLowerCase() === "free";
//               const { allowed: canSelectFree } = canUserSelectFreePlan(usersCurrentPlan, isSubscriptionExpired, isAuthenticated);
//               const isFreePlanDisabled = isFreePlan && !canSelectFree;
//               const isFreePlanActive = isAuthenticated && isFreePlan && usersCurrentPlan?.toLowerCase() === 'free';

//               return (
//                 <motion.div
//                   key={plan.id}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.5 }}
//                   onMouseEnter={() => setHoveredPlan(plan.id)}
//                   onMouseLeave={() => setHoveredPlan(null)}
//                   className="relative h-full"
//                 >
//                   <motion.div
//                     className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl opacity-0 blur-xl"
//                     animate={{ opacity: isHovered ? 0.2 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   />

//                   <motion.div
//                     animate={{ y: isHovered ? -4 : 0 }}
//                     transition={{
//                       duration: 0.3,
//                       type: "spring",
//                       stiffness: 300,
//                     }}
//                     className="relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
//                   >
//                     {/* Card Header */}
//                     <motion.div
//                       className={`bg-gradient-to-r ${plan.color} p-4 sm:p-5 md:p-6 text-white relative overflow-hidden`}
//                       whileHover={{ scale: 1.01 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <motion.div
//                         className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"
//                         animate={{ scale: isHovered ? 1.2 : 1 }}
//                         transition={{ duration: 0.3 }}
//                       />
//                       <div className="relative">
//                         <motion.div
//                           className="inline-flex p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm mb-2 sm:mb-3 md:mb-4 shrink-0"
//                           animate={{ rotate: isHovered ? 5 : 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           {plan.icon}
//                         </motion.div>
//                         <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1">
//                           {plan.name}
//                         </h3>
//                         <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 min-h-[40px] sm:min-h-[48px]">
//                           {plan.description}
//                         </p>
//                         <div className="flex items-baseline gap-1">
//                           {plan.name !== "free" && plan.regularPrice !== "0" && (
//                             <p className="line-through text-white/70">
//                               ₹{plan.regularPrice}
//                             </p>
//                           )}

//                           <motion.span
//                             className="text-2xl sm:text-3xl md:text-4xl font-bold"
//                             animate={{ scale: isHovered ? 1.03 : 1 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             {plan.name !== "free" && plan.regularPrice !== "0" ? (
//                               <span>₹{plan.discountPrice}</span>
//                             ) : (
//                               "₹0"
//                             )}
//                           </motion.span>
//                           <span className="text-white/80 text-[10px] sm:text-xs">
//                             / {plan.duration_days}
//                           </span>
//                         </div>
//                         {plan.badge && !isSamePlan && (
//                           <motion.span
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="absolute top-0 right-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded-full text-[8px] sm:text-xs backdrop-blur-sm"
//                           >
//                             {plan.badge}
//                           </motion.span>
//                         )}
//                         {isSamePlan && (
//                           <span className="absolute top-0 right-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-500/80 text-white text-[8px] sm:text-xs font-semibold rounded-full flex items-center gap-0.5 sm:gap-1">
//                             <FiCheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />{" "}
//                             Active
//                           </span>
//                         )}
                        
//                         {isFreePlanActive && (
//                           <span className="absolute bottom-0 right-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-500/80 text-white text-[8px] sm:text-xs font-semibold rounded-full flex items-center gap-0.5 sm:gap-1">
//                             <FiCheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />{" "}
//                             Active
//                           </span>
//                         )}
//                       </div>
//                     </motion.div>

//                     {/* Features List */}
//                     <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
//                       <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 flex-grow">
//                         {plan.features.map((feature, idx) => (
//                           <motion.li
//                             key={idx}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.05 + idx * 0.02 }}
//                             whileHover={{ x: 2 }}
//                             className="flex items-start gap-1.5 sm:gap-2 group"
//                           >
//                             <motion.div
//                               className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included ? "bg-emerald-100" : "bg-gray-100"}`}
//                               whileHover={{ scale: 1.1 }}
//                             >
//                               {feature.included ? (
//                                 <IoCheckmarkCircle className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-500 shrink-0" />
//                               ) : (
//                                 <FiX className="w-2 h-2 sm:w-2.5 sm:h-3 text-gray-400" />
//                               )}
//                             </motion.div>
//                             <span
//                               className={`text-[11px] sm:text-xs md:text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-600"} group-hover:text-gray-900 transition-colors`}
//                             >
//                               {feature.name}
//                             </span>
//                           </motion.li>
//                         ))}
//                       </ul>

//                       {/* Action Button */}
//                       {isSamePlan || isFreePlanActive ? (
//                         <motion.button
//                           whileHover={{ scale: 1.01 }}
//                           className="w-full py-2 sm:py-2.5 md:py-3 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 cursor-default border border-emerald-200"
//                         >
//                           <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
//                           Current Plan
//                         </motion.button>
//                       ) : isFreePlanDisabled && isAuthenticated ? (
//                         // Show "Not Available" only for authenticated users
//                         <motion.button
//                           whileHover={{ scale: 1.01 }}
//                           className="w-full py-2 sm:py-2.5 md:py-3 bg-gray-100 text-gray-500 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 cursor-not-allowed border border-gray-200"
//                         >
//                           <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
//                           {isSubscriptionExpired 
//                             ? "Expired - Renew Now" 
//                             : usersCurrentPlan && ['pro', 'premium', 'pro plus'].includes(usersCurrentPlan.toLowerCase())
//                             ? `Already on ${usersCurrentPlan}`
//                             : "Not Available"}
//                         </motion.button>
//                       ) : isFreePlanDisabled && !isAuthenticated ? (
//                         // Show "Login to Subscribe" for non-authenticated users on free plan
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={() => handleSelectPlan(plan)}
//                           disabled={loading}
//                           className="w-full py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm transition-all duration-300 relative overflow-hidden cursor-pointer group shadow-md hover:shadow-lg"
//                         >
//                           <span className="relative z-10 flex items-center justify-center gap-2">
//                             <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                             Login to Subscribe
//                           </span>
//                           <motion.div
//                             className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
//                             initial={false}
//                           />
//                         </motion.button>
//                       ) : (
//                         // Regular plan button for authenticated users
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={() => handleSelectPlan(plan)}
//                           disabled={loading}
//                           className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm transition-all duration-300 relative overflow-hidden cursor-pointer group ${
//                             !isAuthenticated 
//                               ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg" 
//                               : isFreePlan
//                                 ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
//                                 : `bg-gradient-to-r ${plan.color} text-white shadow-md`
//                           }`}
//                         >
//                           <span className="relative z-10 flex items-center justify-center gap-2">
//                             {!isAuthenticated ? (
//                               <>
//                                 <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                 Login to Subscribe
//                               </>
//                             ) : isFreePlan ? (
//                               "Free Plan Active"
//                             ) : (
//                               `Upgrade to ${plan.name}`
//                             )}
//                           </span>
//                           <motion.div
//                             className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
//                             initial={false}
//                           />
//                         </motion.button>
//                       )}
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}

//         {/* Comparison Table */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.5 }}
//           className="mt-12 sm:mt-16 lg:mt-20"
//         >
//           <div className="text-center mb-6 sm:mb-8 md:mb-10">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
//               Compare All Features
//             </h2>
//             <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-3">
//               See exactly what you get with each plan
//             </p>
//           </div>

//           <div className="relative shadow-lg rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[500px] sm:min-w-[600px]">
//                 <thead>
//                   <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//                     <th className="p-3 sm:p-4 md:p-5 text-left text-xs sm:text-sm font-semibold text-gray-900 sticky left-0 bg-gradient-to-r from-gray-50 to-white z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
//                       <div className="flex items-center gap-2">
//                         <span>Features</span>
//                       </div>
//                     </th>
//                     {planDetails.map((plan) => (
//                       <th
//                         key={plan.id}
//                         className="p-3 sm:p-4 md:p-5 text-center whitespace-nowrap"
//                       >
//                         <div
//                           className={`inline-block text-xs sm:text-sm font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
//                         >
//                           {plan.name}
//                         </div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {comparisonFeatures.map((feature, idx) => (
//                     <motion.tr
//                       key={idx}
//                       className="border-b border-gray-100 hover:bg-indigo-50/30 transition-all duration-200 group"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: idx * 0.05 }}
//                     >
//                       <td className="p-3 sm:p-4 md:p-5 text-xs sm:text-sm font-medium text-gray-900 sticky left-0 bg-white group-hover:bg-indigo-50/30 transition-colors duration-200 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
//                         <div className="flex items-center gap-2">
//                           <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
//                           {feature.name}
//                         </div>
//                       </td>
//                       <td className="p-3 sm:p-4 md:p-5 text-center text-[10px] sm:text-xs md:text-sm text-gray-600">
//                         <span
//                           className={`${feature.free === "✓" ? "text-emerald-600 font-semibold" : feature.free === "✗" ? "text-red-500" : ""}`}
//                         >
//                           {feature.free}
//                         </span>
//                       </td>
//                       <td className="p-3 sm:p-4 md:p-5 text-center text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
//                         <span
//                           className={`${feature.pro === "✓" ? "text-emerald-600 font-semibold" : feature.pro === "✗" ? "text-red-500" : ""}`}
//                         >
//                           {feature.pro}
//                         </span>
//                       </td>
//                       <td className="p-3 sm:p-4 md:p-5 text-center text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
//                         <span
//                           className={`${feature.premium === "✓" ? "text-emerald-600 font-semibold" : feature.premium === "✗" ? "text-red-500" : ""}`}
//                         >
//                           {feature.premium}
//                         </span>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </motion.div>

//         <Faq />
//       </div>

//       {/* Checkout Modal */}
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

//       {/* Error/Info Modal with User-Friendly Messages */}
//       <AnimatePresence>
//         {showErrorModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
//             >
//               <div className={`bg-gradient-to-r ${
//                 modalConfig.type === "info" 
//                   ? "from-blue-600 to-indigo-600" 
//                   : modalConfig.type === "success"
//                   ? "from-emerald-600 to-teal-600"
//                   : "from-red-600 to-red-500"
//               } p-6 text-center relative overflow-hidden`}>
//                 {/* Decorative background circles */}
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>
                
//                 <div className="relative">
//                   <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
//                     {modalConfig.type === "info" ? (
//                       <FiThumbsUp className="w-10 h-10 text-blue-600" />
//                     ) : modalConfig.type === "success" ? (
//                       <FiCheckCircle className="w-10 h-10 text-emerald-600" />
//                     ) : (
//                       <FiAlertCircle className="w-10 h-10 text-red-600" />
//                     )}
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {modalConfig.title}
//                   </h3>
//                   <p className="text-white/90 text-sm leading-relaxed">
//                     {modalConfig.message}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className={`${
//                   modalConfig.type === "info" 
//                     ? "bg-blue-50 border-blue-500" 
//                     : modalConfig.type === "success"
//                     ? "bg-emerald-50 border-emerald-500"
//                     : "bg-red-50 border-red-500"
//                 } rounded-xl p-4 mb-6 border-l-4`}>
//                   <div className="flex items-start gap-3">
//                     <span className="text-xl">💡</span>
//                     <p className={`${
//                       modalConfig.type === "info" 
//                         ? "text-blue-700" 
//                         : modalConfig.type === "success"
//                         ? "text-emerald-700"
//                         : "text-red-700"
//                     } text-sm leading-relaxed`}>
//                       {modalConfig.subMessage}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   {modalConfig.type === "info" ? (
//                     <button
//                       onClick={() => {
//                         setShowErrorModal(false);
//                         // If user is on Pro/Premium, redirect to choose template
//                         if (usersCurrentPlan && ['pro', 'premium', 'pro plus'].includes(usersCurrentPlan.toLowerCase())) {
//                           router.push("/choose-template");
//                         }
//                       }}
//                       className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       {usersCurrentPlan && ['pro', 'premium', 'pro plus'].includes(usersCurrentPlan.toLowerCase()) 
//                         ? "Continue to Dashboard" 
//                         : "Got It"}
//                     </button>
//                   ) : modalConfig.type === "error" ? (
//                     <button
//                       onClick={() => setShowErrorModal(false)}
//                       className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       Try Again
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => setShowErrorModal(false)}
//                       className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       Continue
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



























"use client";

import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiHeart,
  FiX,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiShield,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiAlertCircle,
  FiThumbsUp,
} from "react-icons/fi";
import {
  IoSparkles,
  IoCheckmarkCircle,
  IoDiamondOutline,
  IoRocket,
  IoFlash,
  IoShieldCheckmark,
} from "react-icons/io5";
import { FaCrown, FaGem, FaChessQueen, FaChessKing } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { RAZORPAY_KEY_ID } from "@/app/config/razorpay";
import { getLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import Faq from "@/app/components/sections/FAQ";
import api from "@/app/utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  duration_days: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  icon: React.ReactNode;
  badge?: string;
  regularPrice: string;
  discountPrice: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  userId: string;
  userEmail: string;
  onSuccess: () => void;
}

interface ApiPlan {
  id: string;
  name: string;
  price: string;
  plan: string;
  title: string;
  description: string;
  discount_price: string;
  order: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  duration_days: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Comparison Features (Memoized)
const COMPARISON_FEATURES = [
  {
    name: "Resume Templates",
    free: "1 Template",
    pro: "3 Templates",
    premium: "All Templates",
  },
  {
    name: "ATS Optimization",
    free: "Basic",
    pro: "Basic",
    premium: "Advanced",
  },
  {
    name: "Photo Upload",
    free: "✗",
    pro: "✓",
    premium: "✓",
  },
  {
    name: "AI Suggestions",
    free: "✓",
    pro: "✓",
    premium: "✓",
  },
  {
    name: "Cover Letter",
    free: "✗",
    pro: "✗",
    premium: "✓",
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

const getPlanColor = (planName: string): string => {
  switch (planName?.toLowerCase()) {
    case "free":
      return "from-slate-500 to-slate-600";
    case "pro":
      return "from-indigo-600 to-indigo-500";
    case "premium":
      return "from-purple-500 to-indigo-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const getPlanIcon = (planName: string): React.ReactNode => {
  switch (planName?.toLowerCase()) {
    case "free":
      return <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />;
    case "pro":
      return <FaChessQueen className="w-4 h-4 sm:w-5 sm:h-5" />;
    case "premium":
      return <FaGem className="w-4 h-4 sm:w-5 sm:h-5" />;
    default:
      return <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />;
  }
};

const getPlanBadge = (planName: string): string | undefined => {
  switch (planName?.toLowerCase()) {
    case "pro plus":
      return "Best Value";
    case "premium":
      return "Ultimate Value";
    default:
      return undefined;
  }
};

const isPopular = (planName: string): boolean => {
  return planName?.toLowerCase() === "pro";
};

// ─── OPTIMIZED: Checkout Modal (Memoized) ───────────────────────────────────

const CheckoutModal = React.memo<CheckoutModalProps>(({
  isOpen,
  onClose,
  plan,
  userId,
  userEmail,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "success" | "error" | "cancelled"
  >("processing");
  const [paymentMessage, setPaymentMessage] = useState("");

  if (!isOpen || !plan) return null;

  const handlePayment = async () => {
    try {
      setLoading(true);
      setShowPaymentModal(true);
      setPaymentStatus("processing");
      setPaymentMessage("Initializing payment...");

      const res = await api.post("/payment/create-order/", {
        subscription_id: plan.id,
      });

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Resume Builder",
        description: `${plan.name} Plan Subscription`,
        order_id: res.data.order_id,
        handler: async function (response: any) {
          try {
            setPaymentMessage("Verifying payment...");
            await api.post("/payment/verify-payment/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setPaymentStatus("success");
            setPaymentMessage(`${plan.name} plan activated successfully!`);

            setTimeout(() => {
              setShowPaymentModal(false);
              setLoading(false);
              onSuccess();
              onClose();
            }, 2000);
          } catch (error) {
            setPaymentStatus("error");
            setPaymentMessage("Payment verification failed. Please try again.");
            setTimeout(() => {
              setShowPaymentModal(false);
              setLoading(false);
            }, 2000);
          }
        },
        prefill: { email: userEmail, name: "" },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: function () {
            setPaymentStatus("cancelled");
            setPaymentMessage("Payment cancelled");
            setTimeout(() => {
              setShowPaymentModal(false);
              setLoading(false);
            }, 1500);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      setPaymentStatus("error");
      setPaymentMessage("Unable to start payment. Please try again.");
      setTimeout(() => {
        setShowPaymentModal(false);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`bg-gradient-to-r ${plan.color} p-5 sm:p-6 text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-black/10 rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16"></div>
                <div className="relative">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                        {plan.name} Plan
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-1.5 sm:p-2 hover:bg-white/20 rounded-xl transition-all duration-200 flex-shrink-0"
                    >
                      <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-5 sm:mb-6">
                  <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      ₹{plan.discountPrice}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">
                      /{plan.duration_days} 
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <IoCheckmarkCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <FiX className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                          </div>
                        )}
                        <span
                          className={`text-xs sm:text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-700"}`}
                        >
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
                  className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold cursor-pointer text-white transition-all duration-300 bg-gradient-to-r ${plan.color} text-sm sm:text-base ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"}`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm">Processing...</span>
                    </div>
                  ) : (
                    `Pay ₹${plan.discountPrice}`
                  )}
                </motion.button>
                <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4 flex items-center justify-center gap-1">
                  <IoShieldCheckmark className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{" "}
                  Secure payment powered by Razorpay
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Status Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl max-w-sm w-full overflow-hidden"
            >
              {paymentStatus === "processing" && (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <div className="w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Processing Payment
                  </h3>
                  <p className="text-sm text-gray-600">{paymentMessage}</p>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                    <FiThumbsUp className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-white/90 text-sm">{paymentMessage}</p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                    <FiAlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Payment Failed
                  </h3>
                  <p className="text-white/90 text-sm">{paymentMessage}</p>
                </div>
              )}

              {paymentStatus === "cancelled" && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                    <FiAlertCircle className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Payment Cancelled
                  </h3>
                  <p className="text-white/90 text-sm">{paymentMessage}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
CheckoutModal.displayName = "CheckoutModal";

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ChoosePlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [usersCurrentPlan, setUsersCurrentPlan] = useState<string | null>(null);
  const [isSubscriptionExpired, setIsSubscriptionExpired] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Custom Modal States
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    subMessage: "",
    type: "error" as "error" | "info" | "success"
  });

  // ─── OPTIMIZATION: Fetch Plans with React Query ────────────────────────────

  const { data: plansData, isLoading: plansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/pricing-plans/`);
      return res.data.plans || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // ─── OPTIMIZATION: Fetch User Data with React Query ──────────────────────

  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ['user-dashboard'],
    queryFn: async () => {
      const res = await api.get("/dashboard");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!getLocalStorage<User>("user_details")?.id && !!getLocalStorage<string>("access_token"),
  });

  // ─── Process User Data ──────────────────────────────────────────────────────

  useEffect(() => {
    // Check authentication
    const userDetails = getLocalStorage<User>("user_details");
    const accessToken = getLocalStorage<string>("access_token");
    
    if (userDetails?.id && accessToken) {
      setIsAuthenticated(true);
      setUserId(userDetails.id);
      setUserEmail(userDetails.email || "");
    } else {
      setIsAuthenticated(false);
      setUsersCurrentPlan(null);
      setIsSubscriptionExpired(false);
    }
  }, []);

  useEffect(() => {
    if (userData?.subscription) {
      setUsersCurrentPlan(userData.subscription.current_plan || null);
      setIsSubscriptionExpired(userData.subscription.is_expired || false);
    }
  }, [userData]);

  // ─── Transform API Plans ────────────────────────────────────────────────────

  const transformAPIPlanToPlan = useCallback((apiPlan: ApiPlan): Plan => {
    const parseFeaturesFromHTML = (htmlString: string): PlanFeature[] => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const lists = doc.querySelectorAll("ul, ol");
      const features: PlanFeature[] = [];

      lists.forEach((list) => {
        const listItems = list.querySelectorAll("li");
        const isOrdered = list.tagName.toLowerCase() === "ol";

        listItems.forEach((item) => {
          const text = item.textContent?.trim() || "";
          const isBullet = !isOrdered;
          const included = isBullet;
          const isHighlight = text.toLowerCase().includes("premium");

          features.push({
            name: text,
            included: included,
            highlight: isHighlight,
          });
        });
      });

      return features;
    };

    const features = parseFeaturesFromHTML(apiPlan.description);
    const planColor = getPlanColor(apiPlan.name);
    const planIcon = getPlanIcon(apiPlan.name);
    const planBadge = getPlanBadge(apiPlan.name);

    return {
      id: apiPlan.id,
      name: apiPlan.name,
      regularPrice: apiPlan.price,
      discountPrice: apiPlan.discount_price,
      duration_days: apiPlan.duration_days,
      description: apiPlan.slug,
      color: planColor,
      icon: planIcon,
      popular: isPopular(apiPlan.name),
      ...(planBadge && { badge: planBadge }),
      features: features,
    };
  }, []);

  // ─── Memoized Plan Details ──────────────────────────────────────────────────

  const planDetails = useMemo(() => {
    if (!plansData) return [];
    return plansData.map(transformAPIPlanToPlan);
  }, [plansData, transformAPIPlanToPlan]);

  // ─── Helper Functions ──────────────────────────────────────────────────────

  const canUserSelectFreePlan = useCallback((currentPlan: string | null, isExpired: boolean, isAuth: boolean): {
    allowed: boolean;
    reason?: string;
    friendlyMessage?: string;
    title?: string;
  } => {
    if (!isAuth) {
      return {
        allowed: false,
        title: "🔐 Login Required",
        friendlyMessage: "Please login to subscribe to any plan",
        reason: "User not authenticated"
      };
    }

    if (!currentPlan) {
      return {
        allowed: false,
        title: "✨ Free Plan Already Active!",
        friendlyMessage: "You already have access to the Free plan. It was automatically activated when you created your account.",
        reason: "Free plan is automatically activated on registration. You already have access to it."
      };
    }

    const planLower = currentPlan.toLowerCase();

    if (planLower === 'free') {
      return {
        allowed: false,
        title: "🌟 You're Already on the Free Plan!",
        friendlyMessage: "You're currently enjoying the Free plan. Check out our Pro and Premium plans for more features!",
        reason: "You are already on the Free plan."
      };
    }

    if (isExpired) {
      return {
        allowed: false,
        title: "⏰ Your Subscription Has Expired",
        friendlyMessage: "Your Pro/Premium subscription has expired. To continue using our services, please renew your subscription or upgrade to a new plan.",
        reason: "Your subscription has expired. Please subscribe to Pro or Premium to continue using our services."
      };
    }

    const activePlans = ['pro', 'premium', 'pro plus'];
    if (activePlans.includes(planLower)) {
      const planDisplay = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);
      return {
        allowed: false,
        title: `🚀 You're on the ${planDisplay} Plan!`,
        friendlyMessage: `You're currently enjoying all the premium features of the ${planDisplay} plan. The Free plan is designed for new users getting started. Stick with ${planDisplay} for the best experience!`,
        reason: `You are currently on the ${currentPlan} plan. Downgrading to Free is not allowed.`
      };
    }

    return {
      allowed: false,
      title: "ℹ️ Free Plan Not Available",
      friendlyMessage: "The Free plan is only available for new users. You already have an active subscription. Explore our Pro and Premium plans for more features!",
      reason: "Free plan is not available for your current subscription status."
    };
  }, []);

  const getSubMessage = useCallback((currentPlan: string | null, isExpired: boolean): string => {
    if (!currentPlan) {
      return "💡 Tip: You can upgrade to Pro or Premium anytime to unlock more features like additional templates, advanced ATS optimization, and cover letter generation.";
    }

    const planLower = currentPlan.toLowerCase();

    if (planLower === 'free') {
      return "💡 Tip: Upgrade to Pro or Premium to unlock unlimited templates, advanced ATS optimization, and cover letter generation features.";
    }

    if (isExpired) {
      return "💡 Tip: Renew your subscription to continue enjoying premium features. Choose from our Pro or Premium plans that best suit your needs.";
    }

    if (['pro', 'premium', 'pro plus'].includes(planLower)) {
      const planDisplay = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);
      return `💡 Tip: You're getting the best experience with ${planDisplay}. Continue enjoying premium features like unlimited templates, advanced ATS optimization, and cover letter generation.`;
    }

    return "💡 Tip: Check out our Pro and Premium plans for more features and better career opportunities.";
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const showModal = useCallback((type: "error" | "info" | "success", config: any) => {
    setModalConfig({ ...config, type });
    setShowErrorModal(true);
  }, []);

  const handleSelectPlan = useCallback(async (plan: Plan) => {
    const userDetails = getLocalStorage<User>("user_details");

    if (!userDetails?.id) {
      router.push(`/login`);
      return;
    }

    if (plan.regularPrice === "0" || plan.name.toLowerCase() === "free") {
      try {
        const res = await api.get("/dashboard");
        const { subscription } = res?.data;

        const currentPlan = subscription?.current_plan || null;
        const isExpired = subscription?.is_expired || false;

        const { allowed, reason, friendlyMessage, title } = canUserSelectFreePlan(currentPlan, isExpired, true);

        if (!allowed) {
          showModal("info", {
            title: title || "Free Plan Unavailable",
            message: friendlyMessage || reason || "Free plan is not available for your account.",
            subMessage: getSubMessage(currentPlan, isExpired)
          });
          return;
        }

        showModal("info", {
          title: "✅ Free Plan Available",
          message: "Your free plan is active and ready to use!",
          subMessage: "You can start using the free plan features immediately."
        });
        return;
      } catch (err) {
        console.error("Error fetching subscription status:", err);
        showModal("error", {
          title: "⚠️ Something Went Wrong",
          message: "We couldn't verify your subscription status.",
          subMessage: "Please try again later. If the problem persists, contact our support team."
        });
        return;
      }
    }

    setSelectedPlan(plan);
    setShowCheckout(true);
  }, [router, canUserSelectFreePlan, getSubMessage, showModal]);

  const handlePaymentSuccess = useCallback(() => {
    router.push("/choose-template");
  }, [router]);

  // ─── Memoized Comparison Features ─────────────────────────────────────────

  const comparisonFeatures = useMemo(() => COMPARISON_FEATURES, []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-28">
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] sm:text-sm font-semibold mb-4 sm:mb-6 border border-white/30"
            >
              <IoRocket className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>LIMITED TIME OFFER</span>
              <IoSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 px-2">
              Choose Your
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-1 sm:mt-2">
                Perfect Plan
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-3">
              Get the tools you need to create professional resumes and land
              your dream job
            </p>

            {isAuthenticated && usersCurrentPlan && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-300" />
                <span className="text-sm text-white/90">
                  Current Plan: <span className="font-semibold text-white capitalize">{usersCurrentPlan}</span>
                  {isSubscriptionExpired && (
                    <span className="ml-2 text-yellow-300 text-xs font-medium bg-yellow-500/20 px-2 py-0.5 rounded-full">
                      Expired
                    </span>
                  )}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Plans Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 lg:py-20">
        {plansLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
            {[...planDetails].reverse().map((plan, index) => {
              const isHovered = hoveredPlan === plan.id;
              const isSamePlan = isAuthenticated && plan.name.toLowerCase() === usersCurrentPlan?.toLowerCase();
              const isFreePlan = plan.regularPrice === "0" || plan.name.toLowerCase() === "free";
              const { allowed: canSelectFree } = canUserSelectFreePlan(usersCurrentPlan, isSubscriptionExpired, isAuthenticated);
              const isFreePlanDisabled = isFreePlan && !canSelectFree;
              const isFreePlanActive = isAuthenticated && isFreePlan && usersCurrentPlan?.toLowerCase() === 'free';

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className="relative h-full"
                >
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl opacity-0 blur-xl"
                    animate={{ opacity: isHovered ? 0.2 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Card Header */}
                    <motion.div
                      className={`bg-gradient-to-r ${plan.color} p-4 sm:p-5 md:p-6 text-white relative overflow-hidden`}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"
                        animate={{ scale: isHovered ? 1.2 : 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative">
                        <motion.div
                          className="inline-flex p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm mb-2 sm:mb-3 md:mb-4 shrink-0"
                          animate={{ rotate: isHovered ? 5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {plan.icon}
                        </motion.div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 min-h-[40px] sm:min-h-[48px]">
                          {plan.description}
                        </p>
                        <div className="flex items-baseline gap-1">
                          {plan.name !== "free" && plan.regularPrice !== "0" && (
                            <p className="line-through text-white/70">
                              ₹{plan.regularPrice}
                            </p>
                          )}

                          <motion.span
                            className="text-2xl sm:text-3xl md:text-4xl font-bold"
                            animate={{ scale: isHovered ? 1.03 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {plan.name !== "free" && plan.regularPrice !== "0" ? (
                              <span>₹{plan.discountPrice}</span>
                            ) : (
                              "₹0"
                            )}
                          </motion.span>
                          <span className="text-white/80 text-[10px] sm:text-xs">
                            / {plan.duration_days}
                          </span>
                        </div>
                        {plan.badge && !isSamePlan && (
                          <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute top-0 right-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded-full text-[8px] sm:text-xs backdrop-blur-sm"
                          >
                            {plan.badge}
                          </motion.span>
                        )}
                        {isSamePlan && (
                          <span className="absolute top-0 right-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-500/80 text-white text-[8px] sm:text-xs font-semibold rounded-full flex items-center gap-0.5 sm:gap-1">
                            <FiCheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />{" "}
                            Active
                          </span>
                        )}
                        
                        {isFreePlanActive && (
                          <span className="absolute bottom-0 right-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-500/80 text-white text-[8px] sm:text-xs font-semibold rounded-full flex items-center gap-0.5 sm:gap-1">
                            <FiCheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />{" "}
                            Active
                          </span>
                        )}
                      </div>
                    </motion.div>

                    {/* Features List */}
                    <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 flex-grow">
                       {plan.features.map((feature: PlanFeature, idx: number) => (
  <motion.li
    key={idx}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 + idx * 0.02 }}
    whileHover={{ x: 2 }}
    className="flex items-start gap-1.5 sm:gap-2 group"
  >
    <motion.div
      className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included ? "bg-emerald-100" : "bg-gray-100"}`}
      whileHover={{ scale: 1.1 }}
    >
      {feature.included ? (
        <IoCheckmarkCircle className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-500 shrink-0" />
      ) : (
        <FiX className="w-2 h-2 sm:w-2.5 sm:h-3 text-gray-400" />
      )}
    </motion.div>
    <span
      className={`text-[11px] sm:text-xs md:text-sm ${feature.highlight ? "text-gray-900 font-semibold" : "text-gray-600"} group-hover:text-gray-900 transition-colors`}
    >
      {feature.name}
    </span>
  </motion.li>
))}
                      </ul>

                      {/* Action Button */}
                      {isSamePlan || isFreePlanActive ? (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          className="w-full py-2 sm:py-2.5 md:py-3 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 cursor-default border border-emerald-200"
                        >
                          <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
                          Current Plan
                        </motion.button>
                      ) : isFreePlanDisabled && isAuthenticated ? (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          className="w-full py-2 sm:py-2.5 md:py-3 bg-gray-100 text-gray-500 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 cursor-not-allowed border border-gray-200"
                        >
                          <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
                          {isSubscriptionExpired 
                            ? "Expired - Renew Now" 
                            : usersCurrentPlan && ['pro', 'premium', 'pro plus'].includes(usersCurrentPlan.toLowerCase())
                            ? `Already on ${usersCurrentPlan}`
                            : "Not Available"}
                        </motion.button>
                      ) : isFreePlanDisabled && !isAuthenticated ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectPlan(plan)}
                          className="w-full py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm transition-all duration-300 relative overflow-hidden cursor-pointer group shadow-md hover:shadow-lg"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            Login to Subscribe
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                            initial={false}
                          />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectPlan(plan)}
                          className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs md:text-sm transition-all duration-300 relative overflow-hidden cursor-pointer group ${
                            !isAuthenticated 
                              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg" 
                              : isFreePlan
                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                                : `bg-gradient-to-r ${plan.color} text-white shadow-md`
                          }`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {!isAuthenticated ? (
                              <>
                                <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                Login to Subscribe
                              </>
                            ) : isFreePlan ? (
                              "Free Plan Active"
                            ) : (
                              `Upgrade to ${plan.name}`
                            )}
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
        )}

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Compare All Features
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-3">
              See exactly what you get with each plan
            </p>
          </div>

          <div className="relative shadow-lg rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] sm:min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <th className="p-3 sm:p-4 md:p-5 text-left text-xs sm:text-sm font-semibold text-gray-900 sticky left-0 bg-gradient-to-r from-gray-50 to-white z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <div className="flex items-center gap-2">
                        <span>Features</span>
                      </div>
                    </th>
                   {planDetails.map((plan: Plan) => (
  <th
    key={plan.id}
    className="p-3 sm:p-4 md:p-5 text-center whitespace-nowrap"
  >
    <div
      className={`inline-block text-xs sm:text-sm font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
    >
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
                      className="border-b border-gray-100 hover:bg-indigo-50/30 transition-all duration-200 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="p-3 sm:p-4 md:p-5 text-xs sm:text-sm font-medium text-gray-900 sticky left-0 bg-white group-hover:bg-indigo-50/30 transition-colors duration-200 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                          {feature.name}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 md:p-5 text-center text-[10px] sm:text-xs md:text-sm text-gray-600">
                        <span
                          className={`${feature.free === "✓" ? "text-emerald-600 font-semibold" : feature.free === "✗" ? "text-red-500" : ""}`}
                        >
                          {feature.free}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 md:p-5 text-center text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
                        <span
                          className={`${feature.pro === "✓" ? "text-emerald-600 font-semibold" : feature.pro === "✗" ? "text-red-500" : ""}`}
                        >
                          {feature.pro}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 md:p-5 text-center text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
                        <span
                          className={`${feature.premium === "✓" ? "text-emerald-600 font-semibold" : feature.premium === "✗" ? "text-red-500" : ""}`}
                        >
                          {feature.premium}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <Faq />
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

      {/* Error/Info Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className={`bg-gradient-to-r ${
                modalConfig.type === "info" 
                  ? "from-blue-600 to-indigo-600" 
                  : modalConfig.type === "success"
                  ? "from-emerald-600 to-teal-600"
                  : "from-red-600 to-red-500"
              } p-6 text-center relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    {modalConfig.type === "info" ? (
                      <FiThumbsUp className="w-10 h-10 text-blue-600" />
                    ) : modalConfig.type === "success" ? (
                      <FiCheckCircle className="w-10 h-10 text-emerald-600" />
                    ) : (
                      <FiAlertCircle className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {modalConfig.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {modalConfig.message}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className={`${
                  modalConfig.type === "info" 
                    ? "bg-blue-50 border-blue-500" 
                    : modalConfig.type === "success"
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-red-50 border-red-500"
                } rounded-xl p-4 mb-6 border-l-4`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <p className={`${
                      modalConfig.type === "info" 
                        ? "text-blue-700" 
                        : modalConfig.type === "success"
                        ? "text-emerald-700"
                        : "text-red-700"
                    } text-sm leading-relaxed`}>
                      {modalConfig.subMessage}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {modalConfig.type === "info" ? (
                    <button
                      onClick={() => {
                        setShowErrorModal(false);
                        if (usersCurrentPlan && ['pro', 'premium', 'pro plus'].includes(usersCurrentPlan.toLowerCase())) {
                          router.push("/choose-template");
                        }
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      {usersCurrentPlan && ['pro', 'premium', 'pro plus'].includes(usersCurrentPlan.toLowerCase()) 
                        ? "Continue to Dashboard" 
                        : "Got It"}
                    </button>
                  ) : modalConfig.type === "error" ? (
                    <button
                      onClick={() => setShowErrorModal(false)}
                      className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Try Again
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowErrorModal(false)}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}