

// "use client";

// import { useState, FormEvent, ChangeEvent, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FiEye,
//   FiEyeOff,
//   FiRefreshCw,
//   FiLock,
//   FiShield,
//   FiCheckCircle,
//   FiArrowLeft,
// } from "react-icons/fi";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { API_URL } from "../../config/api";
// import { passwordGenerator } from "@/app/utils";
// import { motion } from "framer-motion";
// import { MdOutlineDomainVerification } from "react-icons/md";

// import Link from "next/link";

// interface ApiError {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
// }

// interface VerifyOtpPayload {
//   email: string;
//   otp: string;
//   newPassword: string;
// }

// interface PasswordStrength {
//   score: number;
//   label: string;
//   color: string;
//   percentage: number;
// }

// const ChangePassword = () => {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [emailFromQuery, setEmailFromQuery] = useState("");
//   const [otp, setOtp] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
//     score: 0,
//     label: "Very Weak",
//     color: "bg-red-500",
//     percentage: 0,
//   });

//   useEffect(() => {
//     setIsClient(true);
//     if (typeof window !== "undefined") {
//       const params = new URLSearchParams(window.location.search);
//       const email = params.get("email") || "";
//       setEmailFromQuery(email);
//     }
//   }, []);

//   // Calculate password strength
//   useEffect(() => {
//     const calculatePasswordStrength = (password: string): PasswordStrength => {
//       if (!password) {
//         return {
//           score: 0,
//           label: "Very Weak",
//           color: "bg-red-500",
//           percentage: 0,
//         };
//       }

//       let score = 0;
//       const requirements = {
//         length: password.length >= 8,
//         lowercase: /[a-z]/.test(password),
//         uppercase: /[A-Z]/.test(password),
//         numbers: /[0-9]/.test(password),
//         special: /[^A-Za-z0-9]/.test(password),
//       };

//       if (requirements.length) score++;
//       if (password.length >= 12) score++;
//       if (requirements.lowercase) score++;
//       if (requirements.uppercase) score++;
//       if (requirements.numbers) score++;
//       if (requirements.special) score++;

//       score = Math.min(score, 6);

//       let label, color, percentage;
//       switch (score) {
//         case 0:
//           label = "Very Weak";
//           color = "bg-red-500";
//           percentage = 0;
//           break;
//         case 1:
//           label = "Weak";
//           color = "bg-red-400";
//           percentage = 20;
//           break;
//         case 2:
//           label = "Fair";
//           color = "bg-yellow-500";
//           percentage = 40;
//           break;
//         case 3:
//           label = "Good";
//           color = "bg-yellow-400";
//           percentage = 60;
//           break;
//         case 4:
//           label = "Strong";
//           color = "bg-green-400";
//           percentage = 80;
//           break;
//         case 5:
//         case 6:
//           label = "Very Strong";
//           color = "bg-green-500";
//           percentage = 100;
//           break;
//         default:
//           label = "Very Weak";
//           color = "bg-red-500";
//           percentage = 0;
//       }
//       return { score, label, color, percentage };
//     };

//     setPasswordStrength(calculatePasswordStrength(password));
//   }, [password]);

//   const validateForm = (): boolean => {
//     if (!otp.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "OTP Required",
//         text: "Please enter the verification code sent to your email.",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       return false;
//     }

//     if (otp.length !== 6) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid OTP",
//         text: "OTP must be 6 digits.",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       return false;
//     }

//     if (!password.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Password Required",
//         text: "Please enter your new password.",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       return false;
//     }

//     if (password.length < 8) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak Password",
//         text: "Password must be at least 8 characters long.",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       return false;
//     }

//     if (!emailFromQuery) {
//       Swal.fire({
//         icon: "error",
//         title: "Email Missing",
//         text: "Please try the reset password process again.",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const payload: VerifyOtpPayload = {
//         email: emailFromQuery,
//         otp,
//         newPassword: password,
//       };
//       const response = await axios.post(
//         `${API_URL}/api/users/verify-otp`,
//         payload,
//       );
//       setLoading(false);

//       await Swal.fire({
//         icon: "success",
//         title: "Password Changed!",
//         html: `
//           <p>Your password has been reset successfully.</p>
//           <p class="text-sm text-gray-500 mt-2">You can now login with your new password</p>
//         `,
//         confirmButtonText: "Go to Login",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       router.push("/login");
//     } catch (err: unknown) {
//       setLoading(false);
//       const error = err as ApiError;
//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text:
//           error.response?.data?.message ||
//           "Invalid OTP or something went wrong.",
//         confirmButtonColor: "#ef4444",
//         customClass: { popup: "rounded-2xl" },
//       });
//     }
//   };

//   const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 6);
//     setOtp(value);
//   };

//   const generatePassword = () => {
//     setPassword(passwordGenerator());
//   };

//   // OTP input boxes for better UX
//   const otpDigits = otp.split("");
//   const otpInputs = Array(6).fill(0);

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
//                   Enter the verification code and your new password
//                 </p>
//                 {emailFromQuery && (
//                   <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
//                     <FiShield className="w-3 h-3 text-indigo-600" />
//                     <span className="text-xs text-indigo-600 font-medium">
//                       {emailFromQuery}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* OTP Field */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Verification Code (OTP)
//                   </label>
//                   <div className="relative">
//                     <div
//                       className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "otp" ? "text-indigo-600" : "text-gray-400"}`}
//                     >
//                       <MdOutlineDomainVerification className="w-5 h-5" />
//                     </div>
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       placeholder="Enter 6-digit code"
//                       value={otp}
//                       onChange={handleOtpChange}
//                       onFocus={() => setFocusedField("otp")}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 tracking-widest text-lg font-mono ${
//                         focusedField === "otp"
//                           ? "border-indigo-500 ring-2 ring-indigo-100"
//                           : "border-gray-200 hover:border-indigo-300"
//                       }`}
//                       maxLength={6}
//                     />
//                   </div>
//                   <p className="text-xs text-gray-400 mt-2">
//                     Enter the 6-digit code sent to your email
//                   </p>
//                 </div>

//                 {/* Password Field */}
//                 <div className="mb-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       New Password
//                     </label>
//                     <span
//                       className={`text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
//                     >
//                       {passwordStrength.label}
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <div
//                         className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "password" ? "text-indigo-600" : "text-gray-400"}`}
//                       >
//                         <FiLock className="w-5 h-5" />
//                       </div>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         onFocus={() => setFocusedField("password")}
//                         onBlur={() => setFocusedField(null)}
//                         placeholder="Create a strong password"
//                         className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
//                           focusedField === "password"
//                             ? "border-indigo-500 ring-2 ring-indigo-100"
//                             : "border-gray-200 hover:border-indigo-300"
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
//                       >
//                         {showPassword ? (
//                           <FiEyeOff className="w-5 h-5" />
//                         ) : (
//                           <FiEye className="w-5 h-5" />
//                         )}
//                       </button>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={generatePassword}
//                       className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
//                       title="Generate strong password"
//                     >
//                       <FiRefreshCw className="w-4 h-4" />
//                     </button>
//                   </div>

//                   {/* Password Strength Bar */}
//                   {password && (
//                     <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
//                         style={{ width: `${passwordStrength.percentage}%` }}
//                       />
//                     </div>
//                   )}

//                   <p className="text-xs text-gray-400 mt-2">
//                     Password must be at least 8 characters
//                   </p>
//                 </div>

//                 {/* Password Requirements */}
//                 {password && (
//                   <div className="mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       <div className="flex items-center gap-2">
//                         {password.length >= 8 ? (
//                           <FiCheckCircle className="w-3 h-3 text-emerald-500" />
//                         ) : (
//                           <div className="w-3 h-3 border border-gray-300 rounded-full" />
//                         )}
//                         <span
//                           className={`text-xs ${password.length >= 8 ? "text-emerald-600" : "text-gray-500"}`}
//                         >
//                           At least 8 characters
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {/[A-Z]/.test(password) ? (
//                           <FiCheckCircle className="w-3 h-3 text-emerald-500" />
//                         ) : (
//                           <div className="w-3 h-3 border border-gray-300 rounded-full" />
//                         )}
//                         <span
//                           className={`text-xs ${/[A-Z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                         >
//                           Uppercase letter
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {/[a-z]/.test(password) ? (
//                           <FiCheckCircle className="w-3 h-3 text-emerald-500" />
//                         ) : (
//                           <div className="w-3 h-3 border border-gray-300 rounded-full" />
//                         )}
//                         <span
//                           className={`text-xs ${/[a-z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                         >
//                           Lowercase letter
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {/[0-9]/.test(password) ? (
//                           <FiCheckCircle className="w-3 h-3 text-emerald-500" />
//                         ) : (
//                           <div className="w-3 h-3 border border-gray-300 rounded-full" />
//                         )}
//                         <span
//                           className={`text-xs ${/[0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                         >
//                           Number
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Updating Password...
//                     </>
//                   ) : (
//                     <>
//                       <FiCheckCircle className="w-4 h-4" />
//                       Update Password
//                     </>
//                   )}
//                 </button>

//                 {/* Back to Login */}
//                 <div className="text-center mt-4">
//                   <button
//                     type="button"
//                     onClick={() => router.push("/login")}
//                     className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm inline-flex items-center gap-1 group cursor-pointer"
//                   >
//                     <FiArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
//                     Back to Login
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;



















"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiLock,
  FiShield,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import { passwordGenerator } from "@/app/utils";
import { motion } from "framer-motion";
import { MdOutlineDomainVerification } from "react-icons/md";

import Link from "next/link";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
  newPassword: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  percentage: number;
}

const ChangePassword = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [emailFromQuery, setEmailFromQuery] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Very Weak",
    color: "bg-red-500",
    percentage: 0,
  });

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email") || "";
      setEmailFromQuery(email);
    }
  }, []);

  // Calculate password strength with 6 requirements
  useEffect(() => {
    const calculatePasswordStrength = (password: string): PasswordStrength => {
      if (!password) {
        return {
          score: 0,
          label: "Very Weak",
          color: "bg-red-500",
          percentage: 0,
        };
      }

      let score = 0;
      const hasLength8 = password.length >= 8;
      const hasLength12 = password.length >= 12;
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);

      if (hasLength8) score++;
      if (hasLength12) score++;
      if (hasLowercase) score++;
      if (hasUppercase) score++;
      if (hasNumbers) score++;
      if (hasSpecial) score++;

      score = Math.min(score, 6);

      let label, color, percentage;
      switch (score) {
        case 0:
          label = "Very Weak";
          color = "bg-red-500";
          percentage = 0;
          break;
        case 1:
          label = "Very Weak";
          color = "bg-red-500";
          percentage = 17;
          break;
        case 2:
          label = "Weak";
          color = "bg-red-400";
          percentage = 33;
          break;
        case 3:
          label = "Fair";
          color = "bg-yellow-500";
          percentage = 50;
          break;
        case 4:
          label = "Good";
          color = "bg-yellow-400";
          percentage = 67;
          break;
        case 5:
          label = "Strong";
          color = "bg-green-400";
          percentage = 83;
          break;
        case 6:
          label = "Very Strong";
          color = "bg-green-500";
          percentage = 100;
          break;
        default:
          label = "Very Weak";
          color = "bg-red-500";
          percentage = 0;
      }
      return { score, label, color, percentage };
    };

    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const validateForm = (): boolean => {
    if (!otp.trim()) {
      Swal.fire({
        icon: "warning",
        title: "OTP Required",
        text: "Please enter the verification code sent to your email.",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
      return false;
    }

    if (otp.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "OTP must be 6 digits.",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
      return false;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Password Required",
        text: "Please enter your new password.",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
      return false;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 8 characters long.",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
      return false;
    }

    if (!emailFromQuery) {
      Swal.fire({
        icon: "error",
        title: "Email Missing",
        text: "Please try the reset password process again.",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload: VerifyOtpPayload = {
        email: emailFromQuery,
        otp,
        newPassword: password,
      };
      const response = await axios.post(
        `${API_URL}/api/users/verify-otp`,
        payload,
      );
      setLoading(false);

      await Swal.fire({
        icon: "success",
        title: "Password Changed!",
        html: `
          <p>Your password has been reset successfully.</p>
          <p class="text-sm text-gray-500 mt-2">You can now login with your new password</p>
        `,
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
      router.push("/login");
    } catch (err: unknown) {
      setLoading(false);
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          error.response?.data?.message ||
          "Invalid OTP or something went wrong.",
        confirmButtonColor: "#ef4444",
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const generatePassword = () => {
    setPassword(passwordGenerator());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      <div className="relative flex-1 flex items-center justify-center py-16! md:py-0! p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md "
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2">
                  Enter the verification code and your new password
                </p>
                {emailFromQuery && (
                  <div className="mt-2 inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 bg-indigo-50 rounded-full">
                    <FiShield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-indigo-600 font-medium truncate max-w-[200px] sm:max-w-none">
                      {emailFromQuery}
                    </span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* OTP Field */}
                <div className="mb-5 sm:mb-6">
                  <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Verification Code (OTP)
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "otp" ? "text-indigo-600" : "text-gray-400"}`}
                    >
                      <MdOutlineDomainVerification className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={handleOtpChange}
                      onFocus={() => setFocusedField("otp")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[13px] sm:text-base focus:outline-none transition-all duration-200 tracking-widest font-mono ${
                        focusedField === "otp"
                          ? "border-indigo-500 ring-2 ring-indigo-100"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      maxLength={6}
                    />
                  </div>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-1.5 sm:mt-2">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-1.5 sm:mb-2">
                    <label className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
                      New Password
                    </label>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
                          style={{ width: `${passwordStrength.percentage}%` }}
                        />
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] md:text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
                      >
                        {passwordStrength.label}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400">
                        ({passwordStrength.score}/6)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "password" ? "text-indigo-600" : "text-gray-400"}`}
                      >
                        <FiLock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Create a strong password"
                        className={`w-full pl-10 sm:pl-11 md:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
                          focusedField === "password"
                            ? "border-indigo-500 ring-2 ring-indigo-100"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-indigo-50 text-indigo-600 rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      title="Generate strong password"
                    >
                      <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-1.5 sm:mt-2">
                    Password must be at least 8 characters
                  </p>
                </div>

                {/* Password Requirements - All 6 requirements */}
                {password && (
                  <div className="mb-5 sm:mb-6 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                    <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">
                      Password Requirements:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {password.length >= 8 ? (
                          <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] md:text-[10px] ${password.length >= 8 ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {password.length >= 12 ? (
                          <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] md:text-[10px] ${password.length >= 12 ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          At least 12 characters (stronger)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/[a-z]/.test(password) ? (
                          <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[a-z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Contains lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/[A-Z]/.test(password) ? (
                          <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[A-Z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Contains uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/[0-9]/.test(password) ? (
                          <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Contains number
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/[^A-Za-z0-9]/.test(password) ? (
                          <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[^A-Za-z0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Contains special character (!@#$% etc.)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Update Password
                    </>
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center mt-4 sm:mt-5">
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-[11px] sm:text-xs inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;