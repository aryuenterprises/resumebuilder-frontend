// "use client";

// import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { API_URL } from "../../config/api";
// import {
//   FiMail,
//   FiArrowLeft,
//   FiShield,
//   FiSend,
//   FiLock,
//   FiX,
//   FiThumbsUp,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

// interface ApiError {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
// }

// const ForgetPassword = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   // Custom Modal States
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [showWarningModal, setShowWarningModal] = useState(false);
//   const [modalConfig, setModalConfig] = useState({
//     title: "",
//     message: "",
//     subMessage: "",
//     email: "",
//   });

//   const showModal = (type: "success" | "error" | "warning", config: any) => {
//     setModalConfig(config);
//     if (type === "success") setShowSuccessModal(true);
//     else if (type === "error") setShowErrorModal(true);
//     else if (type === "warning") setShowWarningModal(true);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!email || email.trim() === "") {
//       showModal("warning", {
//         title: "Email Required",
//         message: "Please enter your registered email address.",
//         subMessage: "We need your email to send the verification code.",
//         email: "",
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       showModal("warning", {
//         title: "Invalid Email",
//         message: "Please enter a valid email address.",
//         subMessage: "Example: yourname@example.com",
//         email: "",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = { email };

//       const response = await axios.post(
//         `${API_URL}/api/users/forgot-password`,
//         formData,
//       );

//       setLoading(false);

//       showModal("success", {
//         title: "OTP Sent Successfully!",
//         message: "We've sent a verification code to your email.",
//         subMessage:
//           "Please check your inbox and enter the code to reset your password.",
//         email: email,
//       });
//     } catch (err: unknown) {
//       console.error("Error sending message:", err);
//       setLoading(false);

//       const error = err as ApiError;
//       const errorMessage =
//         error.response?.data?.message ||
//         "Something went wrong. Please try again later.";

//       showModal("error", {
//         title: "Failed to Send OTP",
//         message: errorMessage,
//         subMessage: "Please check your email address and try again.",
//         email: "",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
//       <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md px-2 sm:px-0"
//         >
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             {/* Header gradient accent */}
//             <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//             <div className="p-5 sm:p-6 md:p-8">
//               {/* Icon */}
//               <div className="text-center mb-5 sm:mb-6">
//                 <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
//                   <FiLock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
//                 </div>
//                 <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Reset Password
//                 </h2>
//                 <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2 px-2">
//                   Enter your email address and we'll send you a verification
//                   code
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Email Field */}
//                 <div className="mb-5 sm:mb-6">
//                   <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative group">
//                     <div
//                       className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//                         focusedField === "email"
//                           ? "text-indigo-600"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       <FiMail className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onFocus={() => setFocusedField("email")}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="Enter your registered email"
//                       className={`w-full pl-10 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
//                         focusedField === "email"
//                           ? "border-indigo-500 ring-2 ring-indigo-100"
//                           : "border-gray-200 hover:border-indigo-300"
//                       }`}
//                     />
//                   </div>
//                   <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-1.5 sm:mt-2">
//                     We'll send a verification code to this email
//                   </p>
//                 </div>

//                 {/* Send Reset Link Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending OTP...
//                     </>
//                   ) : (
//                     <>
//                       <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                       Send Verification Code
//                     </>
//                   )}
//                 </button>
//               </form>

//               {/* Back to Login */}
//               <div className="text-center mt-4 sm:mt-5">
//                 <button
//                   type="button"
//                   onClick={() => router.back()}
//                   className="text-indigo-600 hover:text-indigo-700 font-semibold text-[11px] sm:text-xs inline-flex items-center gap-1 group cursor-pointer"
//                 >
//                   <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:-translate-x-1 transition-transform" />
//                   Back to Login
//                 </button>
//               </div>

//               {/* Terms */}
//               <div className="mt-4 sm:mt-5 md:mt-6 text-center">
//                 <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400">
//                   Need help?{" "}
//                   <Link
//                     href="/contact-us"
//                     className="text-indigo-600 hover:underline cursor-pointer"
//                   >
//                     Contact Support
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ========== SUCCESS MODAL - INDIGO PURPLE THEME ========== */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//             onClick={() => setShowSuccessModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
//                 {/* Close Button */}
//                 <button
//                   onClick={() => setShowSuccessModal(false)}
//                   className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>

//                 {/* Gradient Header */}
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-8 pb-6 text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//                     className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
//                   >
//                     <FiSend className="w-10 h-10 text-indigo-600" />
//                   </motion.div>
//                   <h3 className="text-2xl font-bold text-white">
//                     {modalConfig.title}
//                   </h3>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-gray-800 text-center font-medium mb-4"
//                   >
//                     {modalConfig.message}
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="bg-indigo-50 rounded-xl p-4 mb-6 border-l-4 border-indigo-500"
//                   >
//                     <div className="flex gap-3">
//                       <div className="flex-shrink-0">
//                         <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <FiMail className="w-4 h-4 text-indigo-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-indigo-900 font-semibold text-sm mb-1">
//                           Verification Code Sent
//                         </p>
//                         <p className="text-indigo-700 text-sm">
//                           We've sent a verification code to{" "}
//                           <span className="font-medium">
//                             {modalConfig.email}
//                           </span>
//                         </p>
//                         <p className="text-indigo-600 text-xs mt-2">
//                           {modalConfig.subMessage}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>

                
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="flex gap-3"
//                   >
//                     <button
//                       onClick={() => {
//                         setShowSuccessModal(false);
//                         router.push(
//                           `/change-password?email=${encodeURIComponent(modalConfig.email)}`,
//                         );
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Continue →
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ========== ERROR MODAL - RED THEME ========== */}
//       <AnimatePresence>
//         {showErrorModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//             onClick={() => setShowErrorModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
//                 {/* Close Button */}
//                 <button
//                   onClick={() => setShowErrorModal(false)}
//                   className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>

//                 {/* Red Gradient Header */}
//                 <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 pt-8 pb-6 text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//                     className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
//                   >
//                     <FiAlertCircle className="w-10 h-10 text-red-600" />
//                   </motion.div>
//                   <h3 className="text-2xl font-bold text-white">
//                     {modalConfig.title}
//                   </h3>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="bg-red-50 rounded-xl p-4 mb-6 border-l-4 border-red-500"
//                   >
//                     <div className="flex gap-3">
//                       <div className="flex-shrink-0">
//                         <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                           <FiAlertCircle className="w-4 h-4 text-red-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-red-900 font-semibold text-sm mb-1">
//                           Error Occurred
//                         </p>
//                         <p className="text-red-700 text-sm">
//                           {modalConfig.message}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="bg-amber-50 rounded-xl p-3 mb-6"
//                   >
//                     <p className="text-amber-800 text-xs text-center">
//                       💡 {modalConfig.subMessage}
//                     </p>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="flex gap-3"
//                   >
//                     <button
//                       onClick={() => {
//                         setShowErrorModal(false);
//                         // Focus on email field
//                         const emailInput = document.querySelector(
//                           'input[type="email"]',
//                         );
//                         if (emailInput) {
//                           (emailInput as HTMLInputElement).focus();
//                         }
//                       }}
//                       className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
//                     >
//                       Try Again
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowErrorModal(false);
//                         router.push("/login");
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Back to Login
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ========== WARNING MODAL - YELLOW/ORANGE THEME ========== */}
//       <AnimatePresence>
//         {showWarningModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//             onClick={() => setShowWarningModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-yellow-100">
//                 {/* Close Button */}
//                 <button
//                   onClick={() => setShowWarningModal(false)}
//                   className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>

//                 {/* Yellow/Orange Gradient Header */}
//                 <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 pt-8 pb-6 text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//                     className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
//                   >
//                     <FiAlertCircle className="w-10 h-10 text-amber-500" />
//                   </motion.div>
//                   <h3 className="text-2xl font-bold text-white">
//                     {modalConfig.title}
//                   </h3>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="bg-amber-50 rounded-xl p-4 mb-6 border-l-4 border-amber-500"
//                   >
//                     <div className="flex gap-3">
//                       <div className="flex-shrink-0">
//                         <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
//                           <FiAlertCircle className="w-4 h-4 text-amber-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-amber-900 font-semibold text-sm mb-1">
//                           Attention Required
//                         </p>
//                         <p className="text-amber-700 text-sm">
//                           {modalConfig.message}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="bg-gray-50 rounded-xl p-3 mb-6"
//                   >
//                     <p className="text-gray-600 text-xs text-center">
//                       💡 {modalConfig.subMessage}
//                     </p>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="flex gap-3"
//                   >
//                     <button
//                       onClick={() => {
//                         setShowWarningModal(false);
//                         // Focus on email field
//                         const emailInput = document.querySelector(
//                           'input[type="email"]',
//                         );
//                         if (emailInput) {
//                           (emailInput as HTMLInputElement).focus();
//                         }
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Try Again
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowWarningModal(false);
//                         router.push("/login");
//                       }}
//                       className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
//                     >
//                       Back to Login
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ForgetPassword;












"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "../../config/api";
import {
  FiMail,
  FiArrowLeft,
  FiShield,
  FiSend,
  FiLock,
  FiX,
  FiThumbsUp,
  FiAlertCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Custom Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    subMessage: "",
    email: "",
  });

  const showModal = (type: "success" | "error" | "warning", config: any) => {
    setModalConfig(config);
    if (type === "success") setShowSuccessModal(true);
    else if (type === "error") setShowErrorModal(true);
    else if (type === "warning") setShowWarningModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      showModal("warning", {
        title: "Email Required",
        message: "Please enter your registered email address.",
        subMessage: "We need your email to send the verification code.",
        email: "",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showModal("warning", {
        title: "Invalid Email",
        message: "Please enter a valid email address.",
        subMessage: "Example: yourname@example.com",
        email: "",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = { email };

      






      const response = await axios.post(
        `${API_URL}/auth/forgot-password/`,
        formData,
      );

      setLoading(false);

      showModal("success", {
        title: "OTP Sent Successfully!",
        message: "We've sent a verification code to your email.",
        subMessage:
          "Please check your inbox and enter the code to reset your password.",
        email: email,
      });
    } catch (err: unknown) {
      console.error("Error sending message:", err);
      setLoading(false);

      const error = err as ApiError;
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again later.";

      showModal("error", {
        title: "Failed to Send OTP",
        message: errorMessage,
        subMessage: "Please check your email address and try again.",
        email: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-2 sm:px-0"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

            <div className="p-5 sm:p-6 md:p-8">
              {/* Icon */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                  <FiLock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  Reset Password
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2 px-2">
                  Enter your email address and we'll send you a verification
                  code
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className="mb-5 sm:mb-6">
                  <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                        focusedField === "email"
                          ? "text-indigo-600"
                          : "text-gray-400"
                      }`}
                    >
                      <FiMail className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your registered email"
                      className={`w-full pl-10 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
                        focusedField === "email"
                          ? "border-indigo-500 ring-2 ring-indigo-100"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    />
                  </div>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-1.5 sm:mt-2">
                    We'll send a verification code to this email
                  </p>
                </div>

                {/* Send Reset Link Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Send Verification Code
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="text-center mt-4 sm:mt-5">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-[11px] sm:text-xs inline-flex items-center gap-1 group cursor-pointer"
                >
                  <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </button>
              </div>

              {/* Terms */}
              <div className="mt-4 sm:mt-5 md:mt-6 text-center">
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400">
                  Need help?{" "}
                  <Link
                    href="/contact-us"
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========== SUCCESS MODAL - INDIGO PURPLE THEME ========== */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
                {/* Close Button */}
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 z-10 text-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-8 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
                  >
                    <FiSend className="w-10 h-10 text-indigo-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">
                    {modalConfig.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-800 text-center font-medium mb-4"
                  >
                    {modalConfig.message}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-indigo-50 rounded-xl p-4 mb-6 border-l-4 border-indigo-500"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FiMail className="w-4 h-4 text-indigo-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-indigo-900 font-semibold text-sm mb-1">
                          Verification Code Sent
                        </p>
                        <p className="text-indigo-700 text-sm">
                          We've sent a verification code to{" "}
                          <span className="font-medium">
                            {modalConfig.email}
                          </span>
                        </p>
                        <p className="text-indigo-600 text-xs mt-2">
                          {modalConfig.subMessage}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={() => {
                        setShowSuccessModal(false);
                        router.push(
                          `/change-password?email=${encodeURIComponent(modalConfig.email)}`,
                        );
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Continue →
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== ERROR MODAL - RED THEME ========== */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
                {/* Close Button */}
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="absolute top-4 right-4 z-10 text-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Red Gradient Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 pt-8 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
                  >
                    <FiAlertCircle className="w-10 h-10 text-red-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">
                    {modalConfig.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-red-50 rounded-xl p-4 mb-6 border-l-4 border-red-500"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <FiAlertCircle className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-red-900 font-semibold text-sm mb-1">
                          Error Occurred
                        </p>
                        <p className="text-red-700 text-sm">
                          {modalConfig.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-amber-50 rounded-xl p-3 mb-6"
                  >
                    <p className="text-amber-800 text-xs text-center">
                      💡 {modalConfig.subMessage}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={() => {
                        setShowErrorModal(false);
                        // Focus on email field
                        const emailInput = document.querySelector(
                          'input[type="email"]',
                        );
                        if (emailInput) {
                          (emailInput as HTMLInputElement).focus();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => {
                        setShowErrorModal(false);
                        router.push("/login");
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Back to Login
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== WARNING MODAL - YELLOW/ORANGE THEME ========== */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowWarningModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-yellow-100">
                {/* Close Button */}
                <button
                  onClick={() => setShowWarningModal(false)}
                  className="absolute top-4 right-4 z-10 text-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Yellow/Orange Gradient Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 pt-8 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
                  >
                    <FiAlertCircle className="w-10 h-10 text-amber-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">
                    {modalConfig.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-amber-50 rounded-xl p-4 mb-6 border-l-4 border-amber-500"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <FiAlertCircle className="w-4 h-4 text-amber-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-amber-900 font-semibold text-sm mb-1">
                          Attention Required
                        </p>
                        <p className="text-amber-700 text-sm">
                          {modalConfig.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-50 rounded-xl p-3 mb-6"
                  >
                    <p className="text-gray-600 text-xs text-center">
                      💡 {modalConfig.subMessage}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={() => {
                        setShowWarningModal(false);
                        // Focus on email field
                        const emailInput = document.querySelector(
                          'input[type="email"]',
                        );
                        if (emailInput) {
                          (emailInput as HTMLInputElement).focus();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => {
                        setShowWarningModal(false);
                        router.push("/login");
                      }}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
                    >
                      Back to Login
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgetPassword;
