// "use client";

// import { useState, FormEvent, ChangeEvent, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";

// import axios from "axios";
// import Swal from "sweetalert2";
// import { API_URL } from "../../config/api";
// import { passwordGenerator } from "@/app/utils";

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

// const ChangePassword = () => {
//   const router = useRouter();

//    const [isClient, setIsClient] = useState(false);
//    const [emailFromQuery, setEmailFromQuery] = useState("");

//   useEffect(() => {
//     // This runs only on the client after hydration
//     setIsClient(true);

//     // Now it's safe to access window
//     if (typeof window !== 'undefined') {
//       const params = new URLSearchParams(window.location.search);
//       const email = params.get("email") || "";
//       setEmailFromQuery(email);

//     }
//   }, []);

//   // const emailFromQuery = searchParams.get("email") || "";
//   const [otp, setOtp] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);

//   const validateForm = (): boolean => {
//     if (!otp.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "OTP Required",
//         text: "Please enter the OTP sent to your email.",
//         confirmButtonColor: "#05a2ff",
//       });
//       return false;
//     }

//     if (!password.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Password Required",
//         text: "Please enter your new password.",
//         confirmButtonColor: "#05a2ff",
//       });
//       return false;
//     }

//     if (password.length < 12) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak Password",
//         text: "Password must be at least 12 characters long.",
//         confirmButtonColor: "#05a2ff",
//       });
//       return false;
//     }

//     if (!emailFromQuery) {
//       Swal.fire({
//         icon: "error",
//         title: "Email Missing",
//         text: "Email information is missing. Please try the reset password process again.",
//         confirmButtonColor: "#05a2ff",
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

//       Swal.fire({
//         icon: "success",
//         title: "Password Changed!",
//         text:
//           response.data?.message ||
//           "Your password has been reset successfully.",
//         confirmButtonColor: "#05a2ff",
//       }).then(() => {
//         router.push("/login");
//       });
//     } catch (err: unknown) {
//       setLoading(false);
//       const error = err as ApiError;

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text:
//           error.response?.data?.message ||
//           "Invalid OTP or something went wrong.",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Allow only numbers and limit to 6 digits
//     const value = e.target.value.replace(/\D/g, "").slice(0, 6);
//     setOtp(value);
//   };

//   const generatePassword = () => {
//     const password = passwordGenerator();
//     setPassword(password);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
//       <div className="flex-1 flex justify-center items-center p-4 sm:p-6">
//         <div className="w-full max-w-md">
//           <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
//             {/* Header gradient accent */}
//             <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>

//             <div className="p-4 sm:p-5 md:p-6 lg:p-8">
//               <div className="text-center mb-6">
//                 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-2">
//                   Reset Your Password
//                 </h2>
//                 <p className="text-sm sm:text-base text-gray-600">
//                   Enter the OTP and your new password below
//                 </p>
//                 {emailFromQuery && (
//                   <p className="text-xs sm:text-sm text-gray-500 mt-2">
//                     Reset password for:{" "}
//                     <span className="font-medium">{emailFromQuery}</span>
//                   </p>
//                 )}
//               </div>

//               {/* OTP Field */}
//               <div className="mb-4">
//                 <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
//                   One-Time Password (OTP)
//                 </label>
//                 <div className="relative group">
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="\d*"
//                     placeholder="Enter 6-digit OTP"
//                     value={otp}
//                     onChange={handleOtpChange}
//                     className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="mb-6">
//                 <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
//                   New Password
//                 </label>
//                 <div className="flex gap-3">
//                   <div className="relative group w-full">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your new password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full p-3 sm:p-4 pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors cursor-pointer"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <FiEyeOff className="w-5 h-5" />
//                       ) : (
//                         <FiEye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={generatePassword}
//                     className="p-3 sm:p-4 bg-linear-to-r from-[#C40116]/10 to-[#5E000B]/10 hover:from-[#C40116]/20 hover:to-[#5E000B]/20 border border-[#C40116]/20 rounded-lg sm:rounded-xl text-[#C40116] hover:text-[#5E000B] transition-colors flex items-center justify-center cursor-pointer"
//                     title="Generate strong password"
//                   >
//                     <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>
//                 </div>

//                 <p className="text-xs text-gray-500 mt-2">
//                   Password must be at least 12 characters long
//                 </p>
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className={`w-full py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
//                   loading
//                     ? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed"
//                     : "bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Updating Password...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     <span>Update Password</span>
//                   </>
//                 )}
//               </button>

//               {/* Back to Login */}
//               <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
//                 <button
//                   onClick={() => router.back()}
//                   className="text-[#C40116] hover:text-[#5E000B] font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center group cursor-pointer"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                     />
//                   </svg>
//                   Back to Login
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
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

  // Calculate password strength
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
      const requirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
      };

      if (requirements.length) score++;
      if (password.length >= 12) score++;
      if (requirements.lowercase) score++;
      if (requirements.uppercase) score++;
      if (requirements.numbers) score++;
      if (requirements.special) score++;

      score = Math.min(score, 6);

      let label, color, percentage;
      switch (score) {
        case 0:
          label = "Very Weak";
          color = "bg-red-500";
          percentage = 0;
          break;
        case 1:
          label = "Weak";
          color = "bg-red-400";
          percentage = 20;
          break;
        case 2:
          label = "Fair";
          color = "bg-yellow-500";
          percentage = 40;
          break;
        case 3:
          label = "Good";
          color = "bg-yellow-400";
          percentage = 60;
          break;
        case 4:
          label = "Strong";
          color = "bg-green-400";
          percentage = 80;
          break;
        case 5:
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

  // OTP input boxes for better UX
  const otpDigits = otp.split("");
  const otpInputs = Array(6).fill(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

            <div className="p-6 sm:p-8">
              {/* Icon */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
                  <FiLock className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  Reset Password
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the verification code and your new password
                </p>
                {emailFromQuery && (
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
                    <FiShield className="w-3 h-3 text-indigo-600" />
                    <span className="text-xs text-indigo-600 font-medium">
                      {emailFromQuery}
                    </span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* OTP Field */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Verification Code (OTP)
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "otp" ? "text-indigo-600" : "text-gray-400"}`}
                    >
                      <MdOutlineDomainVerification className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={handleOtpChange}
                      onFocus={() => setFocusedField("otp")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 tracking-widest text-lg font-mono ${
                        focusedField === "otp"
                          ? "border-indigo-500 ring-2 ring-indigo-100"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      maxLength={6}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      New Password
                    </label>
                    <span
                      className={`text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "password" ? "text-indigo-600" : "text-gray-400"}`}
                      >
                        <FiLock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Create a strong password"
                        className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
                          focusedField === "password"
                            ? "border-indigo-500 ring-2 ring-indigo-100"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-5 h-5" />
                        ) : (
                          <FiEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                      title="Generate strong password"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Password Strength Bar */}
                  {password && (
                    <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
                        style={{ width: `${passwordStrength.percentage}%` }}
                      />
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    Password must be at least 8 characters
                  </p>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        {password.length >= 8 ? (
                          <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <div className="w-3 h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs ${password.length >= 8 ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/[A-Z]/.test(password) ? (
                          <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <div className="w-3 h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs ${/[A-Z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/[a-z]/.test(password) ? (
                          <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <div className="w-3 h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs ${/[a-z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/[0-9]/.test(password) ? (
                          <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <div className="w-3 h-3 border border-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs ${/[0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                        >
                          Number
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-4 h-4" />
                      Update Password
                    </>
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <FiArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
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
