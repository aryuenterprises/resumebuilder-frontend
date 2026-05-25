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
  FiThumbsUp,
  FiX,
  FiAlertCircle,
  FiSend,
} from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../../config/api";
import { passwordGenerator } from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";
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
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  percentage: number;
}

const ChangePassword = () => {
  const router = useRouter();
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

  // Custom Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    subMessage: "",
    email: ""
  });

  const showModal = (type: 'success' | 'error' | 'warning', config: any) => {
    setModalConfig(config);
    if (type === 'success') setShowSuccessModal(true);
    else if (type === 'error') setShowErrorModal(true);
    else if (type === 'warning') setShowWarningModal(true);
  };

  useEffect(() => {
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
      showModal('warning', {
        title: "OTP Required",
        message: "Please enter the verification code sent to your email.",
        subMessage: "Check your inbox for the 6-digit code.",
        email: ""
      });
      return false;
    }

    if (otp.length !== 6) {
      showModal('warning', {
        title: "Invalid OTP",
        message: "OTP must be 6 digits.",
        subMessage: "Please enter the complete 6-digit verification code.",
        email: ""
      });
      return false;
    }

    

    if (!emailFromQuery) {
      showModal('error', {
        title: "Email Missing",
        message: "Please try the reset password process again.",
        subMessage: "Your session may have expired. Request a new OTP.",
        email: ""
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
      };

      const response = await axios.post(
        `${API_URL}/auth/verify-reset-otp/`,
        payload,
      );
      setLoading(false);

      showModal('success', {
        title: "Password Changed Successfully!",
        message: "Your password has been reset successfully.",
        subMessage: "You can now login with your new password.",
        email: emailFromQuery
      });
    } catch (err: unknown) {
      setLoading(false);
      const error = err as ApiError;
      const errorMessage = error.response?.data?.message || "Invalid OTP or something went wrong.";
      
      showModal('error', {
        title: "Password Reset Failed",
        message: errorMessage,
        subMessage: "Please check your OTP and try again. Request a new OTP if needed.",
        email: ""
      });
    }
  };




  const generatePassword = () => {
    const newPassword = passwordGenerator();
    setPassword(newPassword);
    

    
    // Add animation effect to button
    const button = document.getElementById('generate-password-btn');
    if (button) {
      button.classList.add('scale-95');
      setTimeout(() => button.classList.remove('scale-95'), 200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      <div className="relative flex-1 flex items-center justify-center py-16! md:py-0! p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
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
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      onFocus={() => setFocusedField("otp")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[13px] sm:text-base focus:outline-none transition-all duration-200 tracking-widest font-mono ${
                        focusedField === "otp"
                          ? "border-indigo-500 ring-2 ring-indigo-100"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    />
                  </div>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-1.5 sm:mt-2">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                {/* Password Field - IMPROVED FOR MOBILE */}
                {/* <div className="mb-4">
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
                      <span className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:inline">
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
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    
                      <button
                        id="generate-password-btn"
                        type="button"
                        onClick={generatePassword}
                        className="w-auto px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 rounded-lg sm:rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow transform active:scale-95"
                        aria-label="Generate strong password"
                      >
                        <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="max-sm:hidden text-[11px] sm:text-xs font-medium whitespace-nowrap">
                          Generate
                        </span>
                      </button>
                  </div>
                </div> */}

                {/* Password Requirements - All 6 requirements */}
                {/* <AnimatePresence>
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-5 sm:mb-6 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden"
                    >
                      <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">
                        Password Requirements:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {password.length >= 8 ? (
                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
                          )}
                          <span
                            className={`text-[8px] sm:text-[9px] md:text-[10px] ${password.length >= 8 ? "text-emerald-600" : "text-gray-500"}`}
                          >
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {password.length >= 12 ? (
                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
                          )}
                          <span
                            className={`text-[8px] sm:text-[9px] md:text-[10px] ${password.length >= 12 ? "text-emerald-600" : "text-gray-500"}`}
                          >
                            At least 12 characters (stronger)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/[a-z]/.test(password) ? (
                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
                          )}
                          <span
                            className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[a-z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                          >
                            Contains lowercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/[A-Z]/.test(password) ? (
                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
                          )}
                          <span
                            className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[A-Z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                          >
                            Contains uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/[0-9]/.test(password) ? (
                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
                          )}
                          <span
                            className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                          >
                            Contains number
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/[^A-Za-z0-9]/.test(password) ? (
                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
                          )}
                          <span
                            className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[^A-Za-z0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
                          >
                            Contains special character (!@#$% etc.)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying OTP...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Verify OTP
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
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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
                    <FiThumbsUp className="w-10 h-10 text-indigo-600" />
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
                          <FiLock className="w-4 h-4 text-indigo-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-indigo-900 font-semibold text-sm mb-1">
                          Password Updated
                        </p>
                        <p className="text-indigo-700 text-sm">
                          {modalConfig.subMessage}
                        </p>
                        {modalConfig.email && (
                          <p className="text-indigo-600 text-xs mt-2">
                            Account: {modalConfig.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-gray-500 text-xs mb-6"
                  >
                    <span className="inline-flex items-center gap-1">
                      🔒 You can now login with your new password
                    </span>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={() => {
                        setShowSuccessModal(false);
                        router.push("/login");
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Go to Login →
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
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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
                        // Focus on OTP field
                        const otpInput = document.querySelector('input[placeholder*="6-digit"]');
                        if (otpInput) {
                          (otpInput as HTMLInputElement).focus();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => {
                        setShowErrorModal(false);
                        router.push("/forgot-password");
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Request New OTP
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
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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
                        // Focus on the problematic field
                        if (modalConfig.title.includes("OTP")) {
                          const otpInput = document.querySelector('input[placeholder*="6-digit"]');
                          if (otpInput) (otpInput as HTMLInputElement).focus();
                        } else if (modalConfig.title.includes("Password")) {
                          const passwordInput = document.querySelector('input[type="password"]');
                          if (passwordInput) (passwordInput as HTMLInputElement).focus();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => {
                        setShowWarningModal(false);
                        router.push("/forgot-password");
                      }}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
                    >
                      Back to Forgot Password
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

  

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;

























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
//   FiThumbsUp,
//   FiX,
//   FiAlertCircle,
//   FiSend,
//   FiKey,
// } from "react-icons/fi";
// import axios from "axios";
// import { API_URL } from "../../config/api";
// import { passwordGenerator } from "@/app/utils";
// import { motion, AnimatePresence } from "framer-motion";
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
// }

// interface VerifyOtpResponse {
//   reset_token: string;
//   message?: string;
// }

// interface ResetPasswordPayload {
//   reset_token: string;
//   new_password: string;
// }

// interface PasswordStrength {
//   score: number;
//   label: string;
//   color: string;
//   percentage: number;
// }

// const ChangePassword = () => {
//   const router = useRouter();
//   const [emailFromQuery, setEmailFromQuery] = useState("");
//   const [otp, setOtp] = useState<string>("");
//   const [resetToken, setResetToken] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [step, setStep] = useState<"otp" | "newPassword">("otp");
//   const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
//     score: 0,
//     label: "Very Weak",
//     color: "bg-red-500",
//     percentage: 0,
//   });

//   // Custom Modal States
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [showWarningModal, setShowWarningModal] = useState(false);
//   const [modalConfig, setModalConfig] = useState({
//     title: "",
//     message: "",
//     subMessage: "",
//     email: ""
//   });

//   const showModal = (type: 'success' | 'error' | 'warning', config: any) => {
//     setModalConfig(config);
//     if (type === 'success') setShowSuccessModal(true);
//     else if (type === 'error') setShowErrorModal(true);
//     else if (type === 'warning') setShowWarningModal(true);
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const params = new URLSearchParams(window.location.search);
//       const email = params.get("email") || "";
//       setEmailFromQuery(email);
//     }
//   }, []);

//   // Calculate password strength with 6 requirements
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
//       const hasLength8 = password.length >= 8;
//       const hasLength12 = password.length >= 12;
//       const hasLowercase = /[a-z]/.test(password);
//       const hasUppercase = /[A-Z]/.test(password);
//       const hasNumbers = /[0-9]/.test(password);
//       const hasSpecial = /[^A-Za-z0-9]/.test(password);

//       if (hasLength8) score++;
//       if (hasLength12) score++;
//       if (hasLowercase) score++;
//       if (hasUppercase) score++;
//       if (hasNumbers) score++;
//       if (hasSpecial) score++;

//       score = Math.min(score, 6);

//       let label, color, percentage;
//       switch (score) {
//         case 0:
//           label = "Very Weak";
//           color = "bg-red-500";
//           percentage = 0;
//           break;
//         case 1:
//           label = "Very Weak";
//           color = "bg-red-500";
//           percentage = 17;
//           break;
//         case 2:
//           label = "Weak";
//           color = "bg-red-400";
//           percentage = 33;
//           break;
//         case 3:
//           label = "Fair";
//           color = "bg-yellow-500";
//           percentage = 50;
//           break;
//         case 4:
//           label = "Good";
//           color = "bg-yellow-400";
//           percentage = 67;
//           break;
//         case 5:
//           label = "Strong";
//           color = "bg-green-400";
//           percentage = 83;
//           break;
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

//   const validateOtpForm = (): boolean => {
//     if (!otp.trim()) {
//       showModal('warning', {
//         title: "OTP Required",
//         message: "Please enter the verification code sent to your email.",
//         subMessage: "Check your inbox for the 6-digit code.",
//         email: ""
//       });
//       return false;
//     }

//     if (otp.length !== 6) {
//       showModal('warning', {
//         title: "Invalid OTP",
//         message: "OTP must be 6 digits.",
//         subMessage: "Please enter the complete 6-digit verification code.",
//         email: ""
//       });
//       return false;
//     }

//     if (!emailFromQuery) {
//       showModal('error', {
//         title: "Email Missing",
//         message: "Please try the reset password process again.",
//         subMessage: "Your session may have expired. Request a new OTP.",
//         email: ""
//       });
//       return false;
//     }

//     return true;
//   };

//   const validatePasswordForm = (): boolean => {
//     if (!password) {
//       showModal('warning', {
//         title: "Password Required",
//         message: "Please enter a new password.",
//         subMessage: "Create a strong password to secure your account.",
//         email: ""
//       });
//       return false;
//     }

//     if (password.length < 8) {
//       showModal('warning', {
//         title: "Password Too Short",
//         message: "Password must be at least 8 characters long.",
//         subMessage: "For better security, use a longer password with mixed characters.",
//         email: ""
//       });
//       return false;
//     }

//     if (password !== confirmPassword) {
//       showModal('warning', {
//         title: "Passwords Don't Match",
//         message: "The passwords you entered do not match.",
//         subMessage: "Please re-enter your password carefully.",
//         email: ""
//       });
//       return false;
//     }

//     // Check password strength (at least 3 out of 6 requirements for minimum security)
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (password.length >= 12) score++;
//     if (/[a-z]/.test(password)) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^A-Za-z0-9]/.test(password)) score++;
    
//     if (score < 3) {
//       showModal('warning', {
//         title: "Weak Password",
//         message: "Your password is too weak. Please choose a stronger password.",
//         subMessage: "Include uppercase, lowercase, numbers, and special characters.",
//         email: ""
//       });
//       return false;
//     }

//     if (!resetToken) {
//       showModal('error', {
//         title: "Session Expired",
//         message: "Please verify OTP again.",
//         subMessage: "Your reset token is missing. Request a new OTP.",
//         email: ""
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleVerifyOtp = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateOtpForm()) return;

//     try {
//       setLoading(true);
//       const payload: VerifyOtpPayload = {
//         email: emailFromQuery,
//         otp,
//       };

//       const response = await axios.post<VerifyOtpResponse>(
//         `${API_URL}/auth/verify-reset-otp/`,
//         payload,
//       );
      
//       // Save the reset token from response
//       const token = response.data.reset_token;
//       setResetToken(token);
      
//       setLoading(false);
//       // Move to next step - show new password form
//       setStep("newPassword");
      
//     } catch (err: unknown) {
//       setLoading(false);
//       const error = err as ApiError;
//       const errorMessage = error.response?.data?.message || "Invalid OTP or something went wrong.";
      
//       showModal('error', {
//         title: "OTP Verification Failed",
//         message: errorMessage,
//         subMessage: "Please check your OTP and try again. Request a new OTP if needed.",
//         email: ""
//       });
//     }
//   };

//   const handleResetPassword = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validatePasswordForm()) return;

//     try {
//       setLoading(true);
//       const payload: ResetPasswordPayload = {
//         reset_token: resetToken,
//         new_password: password,
//       };




//       await axios.post(
//         `${API_URL}/auth/reset-password/`,
//         payload,
//       );
      
//       setLoading(false);

//       showModal('success', {
//         title: "Password Changed Successfully!",
//         message: "Your password has been reset successfully.",
//         subMessage: "You can now login with your new password.",
//         email: emailFromQuery
//       });
//     } catch (err: unknown) {
//       setLoading(false);
//       const error = err as ApiError;
//       const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      
//       showModal('error', {
//         title: "Password Reset Failed",
//         message: errorMessage,
//         subMessage: "Please try again or request a new OTP if the issue persists.",
//         email: ""
//       });
//     }
//   };

//   const generatePassword = () => {
//     const newPassword = passwordGenerator();
//     setPassword(newPassword);
//     setConfirmPassword("");
    
//     // Add animation effect to button
//     const button = document.getElementById('generate-password-btn');
//     if (button) {
//       button.classList.add('scale-95');
//       setTimeout(() => button.classList.remove('scale-95'), 200);
//     }
//   };

//   const handleBackToOtp = () => {
//     setStep("otp");
//     setPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
//       <div className="relative flex-1 flex items-center justify-center py-16! md:py-0! p-3 sm:p-4 md:p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-xl"
//         >
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//             <div className="p-5 sm:p-6 md:p-8">
//               {/* Step Indicator */}
//               <div className="mb-6 sm:mb-8">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1">
//                     <div className={`h-1 rounded-full transition-all duration-300 ${step === "otp" ? "bg-indigo-600" : "bg-indigo-200"}`}></div>
//                   </div>
//                   <div className="flex-1 mx-2">
//                     <div className={`h-1 rounded-full transition-all duration-300 ${step === "newPassword" ? "bg-indigo-600" : "bg-gray-200"}`}></div>
//                   </div>
//                   <div className="flex-1">
//                     <div className="h-1 rounded-full bg-gray-200"></div>
//                   </div>
//                 </div>
//                 <div className="flex justify-between mt-2">
//                   <span className={`text-xs font-medium ${step === "otp" ? "text-indigo-600" : "text-gray-400"}`}>Verify OTP</span>
//                   <span className={`text-xs font-medium ${step === "newPassword" ? "text-indigo-600" : "text-gray-400"}`}>New Password</span>
//                   <span className="text-xs font-medium text-gray-400">Complete</span>
//                 </div>
//               </div>

//               {/* Icon */}
//               <div className="text-center mb-5 sm:mb-6">
//                 <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
//                   {step === "otp" ? (
//                     <MdOutlineDomainVerification className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
//                   ) : (
//                     <FiLock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
//                   )}
//                 </div>
//                 <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   {step === "otp" ? "Verify OTP" : "Create New Password"}
//                 </h2>
//                 <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2">
//                   {step === "otp" 
//                     ? "Enter the verification code sent to your email"
//                     : "Set a strong password for your account"
//                   }
//                 </p>
//                 {emailFromQuery && (
//                   <div className="mt-2 inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 bg-indigo-50 rounded-full">
//                     <FiShield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
//                     <span className="text-[9px] sm:text-[10px] md:text-xs text-indigo-600 font-medium truncate max-w-[200px] sm:max-w-none">
//                       {emailFromQuery}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* OTP Form */}
//               {step === "otp" && (
//                 <form onSubmit={handleVerifyOtp} noValidate>
//                   {/* OTP Field */}
//                   <div className="mb-6 sm:mb-8">
//                     <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                       Verification Code (OTP)
//                     </label>
//                     <div className="relative">
//                       <div
//                         className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "otp" ? "text-indigo-600" : "text-gray-400"}`}
//                       >
//                         <MdOutlineDomainVerification className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Enter 6-digit code"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         onFocus={() => setFocusedField("otp")}
//                         onBlur={() => setFocusedField(null)}
//                         className={`w-full pl-10 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[13px] sm:text-base focus:outline-none transition-all duration-200 tracking-widest font-mono ${
//                           focusedField === "otp"
//                             ? "border-indigo-500 ring-2 ring-indigo-100"
//                             : "border-gray-200 hover:border-indigo-300"
//                         }`}
//                       />
//                     </div>
//                     <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 mt-1.5 sm:mt-2">
//                       Enter the 6-digit code sent to your email
//                     </p>
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Verifying OTP...
//                       </>
//                     ) : (
//                       <>
//                         <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         Verify & Continue
//                       </>
//                     )}
//                   </button>

//                   {/* Back to Login */}
//                   <div className="text-center mt-4 sm:mt-5">
//                     <button
//                       type="button"
//                       onClick={() => router.push("/login")}
//                       className="text-indigo-600 hover:text-indigo-700 font-semibold text-[11px] sm:text-xs inline-flex items-center gap-1 group cursor-pointer"
//                     >
//                       <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:-translate-x-1 transition-transform" />
//                       Back to Login
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {/* New Password Form */}
//               {step === "newPassword" && (
//                 <form onSubmit={handleResetPassword} noValidate>
//                   {/* Password Field */}
//                   <div className="mb-5 sm:mb-6">
//                     <div className="flex flex-wrap justify-between items-center gap-2 mb-1.5 sm:mb-2">
//                       <label className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
//                         New Password
//                       </label>
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
//                             style={{ width: `${passwordStrength.percentage}%` }}
//                           />
//                         </div>
//                         <span
//                           className={`text-[9px] sm:text-[10px] md:text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
//                         >
//                           {passwordStrength.label}
//                         </span>
//                         <span className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:inline">
//                           ({passwordStrength.score}/6)
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-2">
//                       <div className="relative flex-1">
//                         <div
//                           className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "password" ? "text-indigo-600" : "text-gray-400"}`}
//                         >
//                           <FiLock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
//                         </div>
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           onFocus={() => setFocusedField("password")}
//                           onBlur={() => setFocusedField(null)}
//                           placeholder="Create a strong password"
//                           className={`w-full pl-10 sm:pl-11 md:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
//                             focusedField === "password"
//                               ? "border-indigo-500 ring-2 ring-indigo-100"
//                               : "border-gray-200 hover:border-indigo-300"
//                           }`}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
//                           aria-label={showPassword ? "Hide password" : "Show password"}
//                         >
//                           {showPassword ? (
//                             <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                           ) : (
//                             <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                           )}
//                         </button>
//                       </div>
                      
//                       <button
//                         id="generate-password-btn"
//                         type="button"
//                         onClick={generatePassword}
//                         className="w-auto px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 rounded-lg sm:rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow transform active:scale-95"
//                         aria-label="Generate strong password"
//                       >
//                         <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
//                         <span className="max-sm:hidden text-[11px] sm:text-xs font-medium whitespace-nowrap">
//                           Generate
//                         </span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Confirm Password Field */}
//                   <div className="mb-5 sm:mb-6">
//                     <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <div
//                         className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "confirmPassword" ? "text-indigo-600" : "text-gray-400"}`}
//                       >
//                         <FiKey className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
//                       </div>
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         onFocus={() => setFocusedField("confirmPassword")}
//                         onBlur={() => setFocusedField(null)}
//                         placeholder="Confirm your new password"
//                         className={`w-full pl-10 sm:pl-11 md:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
//                           focusedField === "confirmPassword"
//                             ? "border-indigo-500 ring-2 ring-indigo-100"
//                             : "border-gray-200 hover:border-indigo-300"
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
//                         aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                       >
//                         {showConfirmPassword ? (
//                           <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         ) : (
//                           <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         )}
//                       </button>
//                     </div>
//                     {confirmPassword && password !== confirmPassword && (
//                       <p className="text-red-500 text-[8px] sm:text-[9px] md:text-[10px] mt-1.5">
//                         Passwords do not match
//                       </p>
//                     )}
//                   </div>

//                   {/* Password Requirements */}
//                   <AnimatePresence>
//                     {password && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="mb-5 sm:mb-6 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden"
//                       >
//                         <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700 mb-2 sm:mb-2.5">
//                           Password Requirements:
//                         </h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             {password.length >= 8 ? (
//                               <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
//                             ) : (
//                               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
//                             )}
//                             <span
//                               className={`text-[8px] sm:text-[9px] md:text-[10px] ${password.length >= 8 ? "text-emerald-600" : "text-gray-500"}`}
//                             >
//                               At least 8 characters
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             {password.length >= 12 ? (
//                               <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
//                             ) : (
//                               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
//                             )}
//                             <span
//                               className={`text-[8px] sm:text-[9px] md:text-[10px] ${password.length >= 12 ? "text-emerald-600" : "text-gray-500"}`}
//                             >
//                               At least 12 characters (stronger)
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             {/[a-z]/.test(password) ? (
//                               <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
//                             ) : (
//                               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
//                             )}
//                             <span
//                               className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[a-z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                             >
//                               Contains lowercase letter
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             {/[A-Z]/.test(password) ? (
//                               <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
//                             ) : (
//                               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
//                             )}
//                             <span
//                               className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[A-Z]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                             >
//                               Contains uppercase letter
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             {/[0-9]/.test(password) ? (
//                               <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
//                             ) : (
//                               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
//                             )}
//                             <span
//                               className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                             >
//                               Contains number
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             {/[^A-Za-z0-9]/.test(password) ? (
//                               <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 flex-shrink-0" />
//                             ) : (
//                               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-300 rounded-full flex-shrink-0" />
//                             )}
//                             <span
//                               className={`text-[8px] sm:text-[9px] md:text-[10px] ${/[^A-Za-z0-9]/.test(password) ? "text-emerald-600" : "text-gray-500"}`}
//                             >
//                               Contains special character (!@#$% etc.)
//                             </span>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Action Buttons */}
//                   <div className="flex gap-3">
//                     <button
//                       type="button"
//                       onClick={handleBackToOtp}
//                       className="flex-1 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all duration-200 cursor-pointer text-[11px] sm:text-xs md:text-sm"
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
//                     >
//                       {loading ? (
//                         <>
//                           <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           Resetting...
//                         </>
//                       ) : (
//                         <>
//                           <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                           Reset Password
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               )}
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
//                     <FiThumbsUp className="w-10 h-10 text-indigo-600" />
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
//                           <FiLock className="w-4 h-4 text-indigo-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-indigo-900 font-semibold text-sm mb-1">
//                           Password Updated
//                         </p>
//                         <p className="text-indigo-700 text-sm">
//                           {modalConfig.subMessage}
//                         </p>
//                         {modalConfig.email && (
//                           <p className="text-indigo-600 text-xs mt-2">
//                             Account: {modalConfig.email}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>

//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-center text-gray-500 text-xs mb-6"
//                   >
//                     <span className="inline-flex items-center gap-1">
//                       🔒 You can now login with your new password
//                     </span>
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="flex gap-3"
//                   >
//                     <button
//                       onClick={() => {
//                         setShowSuccessModal(false);
//                         router.push("/login");
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Go to Login →
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
//                         if (step === "otp") {
//                           const otpInput = document.querySelector('input[placeholder*="6-digit"]');
//                           if (otpInput) (otpInput as HTMLInputElement).focus();
//                         }
//                       }}
//                       className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
//                     >
//                       Try Again
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowErrorModal(false);
//                         router.push("/forgot-password");
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Request New OTP
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
//                         if (step === "otp") {
//                           const otpInput = document.querySelector('input[placeholder*="6-digit"]');
//                           if (otpInput) (otpInput as HTMLInputElement).focus();
//                         } else {
//                           const passwordInput = document.querySelector('input[type="password"]');
//                           if (passwordInput) (passwordInput as HTMLInputElement).focus();
//                         }
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Try Again
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowWarningModal(false);
//                         if (step === "otp") {
//                           router.push("/forgot-password");
//                         } else {
//                           handleBackToOtp();
//                         }
//                       }}
//                       className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
//                     >
//                       {step === "otp" ? "Back to Forgot Password" : "Back to OTP"}
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChangePassword;