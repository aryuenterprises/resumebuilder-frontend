


// "use client";

// import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { API_URL } from "../../config/api";
// import { FiMail, FiArrowLeft, FiShield, FiSend, FiLock } from "react-icons/fi";
// import { MdOutlineAttachEmail } from "react-icons/md";
// import { motion } from "framer-motion";
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

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!email || email.trim() === "") {
//       await Swal.fire({
//         icon: "warning",
//         title: "Email Required",
//         text: "Please enter your registered email address.",
//         confirmButtonColor: "#4f46e5",
//         background: "#ffffff",
//         color: "#1f2937",
//         customClass: {
//           popup: "rounded-2xl",
//         },
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address.",
//         confirmButtonColor: "#4f46e5",
//         background: "#ffffff",
//         color: "#1f2937",
//         customClass: {
//           popup: "rounded-2xl",
//         },
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

//       await Swal.fire({
//         icon: "success",
//         title: "OTP Sent!",
//         html: `
//           <p>We've sent a verification code to</p>
//           <p class="font-semibold text-indigo-600 mt-1">${email}</p>
//           <p class="text-sm text-gray-500 mt-2">Please check your inbox</p>
//         `,
//         confirmButtonText: "Continue",
//         confirmButtonColor: "#4f46e5",
//         background: "#ffffff",
//         color: "#1f2937",
//         customClass: {
//           popup: "rounded-2xl",
//         },
//       });

//       router.push(`/change-password?email=${encodeURIComponent(email)}`);
//     } catch (err: unknown) {
//       console.error("Error sending message:", err);
//       setLoading(false);

//       const error = err as ApiError;

//       await Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text:
//           error.response?.data?.message ||
//           "Something went wrong. Please try again later.",
//         confirmButtonColor: "#ef4444",
//         background: "#ffffff",
//         color: "#1f2937",
//         customClass: {
//           popup: "rounded-2xl",
//         },
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
     

//       <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md"
//         >
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             {/* Header gradient accent */}
//             <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//             <div className="p-6 sm:p-8">
//               {/* Icon */}
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
//                   <FiLock className="w-8 h-8 text-indigo-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Reset Password
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Enter your email address and we'll send you a verification code
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Email Field */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative group">
//                     <div
//                       className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//                         focusedField === "email" ? "text-indigo-600" : "text-gray-400"
//                       }`}
//                     >
//                       <FiMail className="w-5 h-5" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onFocus={() => setFocusedField("email")}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="Enter your registered email"
//                       className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
//                         focusedField === "email"
//                           ? "border-indigo-500 ring-2 ring-indigo-100"
//                           : "border-gray-200 hover:border-indigo-300"
//                       }`}
//                     />
//                   </div>
//                   <p className="text-xs text-gray-400 mt-2">
//                     We'll send a verification code to this email
//                   </p>
//                 </div>

//                 {/* Send Reset Link Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending OTP...
//                     </>
//                   ) : (
//                     <>
//                       <FiSend className="w-4 h-4" />
//                       Send Verification Code
//                     </>
//                   )}
//                 </button>
//               </form>

             

//               {/* Back to Login */}
//               <div className="text-center mt-4">
//                 <button
//                   type="button"
//                   onClick={() => router.back()}
//                   className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm inline-flex items-center gap-1 group cursor-pointer"
//                 >
//                   <FiArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
//                   Back to Login
//                 </button>
//               </div>

//               {/* Terms */}
//               <div className="mt-6 text-center">
//                 <p className="text-xs text-gray-400">
//                   Need help?{" "}
//                   <Link href="/contact-us" className="text-indigo-600 hover:underline cursor-pointer">
//                     Contact Support
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;


















"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import { FiMail, FiArrowLeft, FiShield, FiSend, FiLock } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      await Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your registered email address.",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-2xl",
        },
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-2xl",
        },
      });
      return;
    }

    try {
      setLoading(true);

      const formData = { email };

      const response = await axios.post(
        `${API_URL}/api/users/forgot-password`,
        formData,
      );

      setLoading(false);

      await Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        html: `
          <p>We've sent a verification code to</p>
          <p class="font-semibold text-indigo-600 mt-1">${email}</p>
          <p class="text-sm text-gray-500 mt-2">Please check your inbox</p>
        `,
        confirmButtonText: "Continue",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-2xl",
        },
      });

      router.push(`/change-password?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      console.error("Error sending message:", err);
      setLoading(false);

      const error = err as ApiError;

      await Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        confirmButtonColor: "#ef4444",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-2xl",
        },
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
                  Enter your email address and we'll send you a verification code
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
                        focusedField === "email" ? "text-indigo-600" : "text-gray-400"
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
                  <Link href="/contact-us" className="text-indigo-600 hover:underline cursor-pointer">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgetPassword;