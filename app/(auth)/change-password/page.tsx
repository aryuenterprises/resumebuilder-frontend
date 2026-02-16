"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";

import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import { passwordGenerator } from "@/app/utils";

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

const ChangePassword = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  // const params = new URLSearchParams(window.location.search);
  // const emailFromQuery = params.get("email") || "";

   const [isClient, setIsClient] = useState(false);
   const [emailFromQuery, setEmailFromQuery] = useState("");

  useEffect(() => {
    // This runs only on the client after hydration
    setIsClient(true);
    
    // Now it's safe to access window
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email") || "";
      setEmailFromQuery(email);
    
    }
  }, []);

  // const emailFromQuery = searchParams.get("email") || "";
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (!otp.trim()) {
      Swal.fire({
        icon: "warning",
        title: "OTP Required",
        text: "Please enter the OTP sent to your email.",
        confirmButtonColor: "#05a2ff",
      });
      return false;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Password Required",
        text: "Please enter your new password.",
        confirmButtonColor: "#05a2ff",
      });
      return false;
    }

    if (password.length < 12) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 12 characters long.",
        confirmButtonColor: "#05a2ff",
      });
      return false;
    }

    if (!emailFromQuery) {
      Swal.fire({
        icon: "error",
        title: "Email Missing",
        text: "Email information is missing. Please try the reset password process again.",
        confirmButtonColor: "#05a2ff",
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

      Swal.fire({
        icon: "success",
        title: "Password Changed!",
        text:
          response.data?.message ||
          "Your password has been reset successfully.",
        confirmButtonColor: "#05a2ff",
      }).then(() => {
        router.push("/login");
      });
    } catch (err: unknown) {
      setLoading(false);
      const error = err as ApiError;

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          error.response?.data?.message ||
          "Invalid OTP or something went wrong.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and limit to 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const generatePassword = () => {
    const password = passwordGenerator();
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-2">
                  Reset Your Password
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter the OTP and your new password below
                </p>
                {emailFromQuery && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Reset password for:{" "}
                    <span className="font-medium">{emailFromQuery}</span>
                  </p>
                )}
              </div>

              {/* OTP Field */}
              <div className="mb-4">
                <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                  One-Time Password (OTP)
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                  New Password
                </label>
                <div className="flex gap-3">
                  <div className="relative group w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 sm:p-4 pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
                    className="p-3 sm:p-4 bg-linear-to-r from-[#C40116]/10 to-[#5E000B]/10 hover:from-[#C40116]/20 hover:to-[#5E000B]/20 border border-[#C40116]/20 rounded-lg sm:rounded-xl text-[#C40116] hover:text-[#5E000B] transition-colors flex items-center justify-center cursor-pointer"
                    title="Generate strong password"
                  >
                    <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Password must be at least 12 characters long
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Update Password</span>
                  </>
                )}
              </button>

              {/* Back to Login */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
                <button
                  onClick={() => router.back()}
                  className="text-[#C40116] hover:text-[#5E000B] font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center group cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
