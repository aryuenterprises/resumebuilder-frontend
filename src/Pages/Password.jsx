import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { API_URL } from "../Config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Password = () => {
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  console.log("Email received:", emailFromState);
  //   const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
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

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
        confirmButtonColor: "#05a2ff",
      });
      return false;
    }

    return true;
  };

  // 🔹 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        email: emailFromState,
        otp,
        newPassword: password,
      };

      const response = await axios.post(
        `${API_URL}/api/users/verify-otp`,
        payload
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
        navigate("/loging");
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          err.response?.data?.message || "Invalid OTP or something went wrong.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    //   <div className="bg-[#f8fbff] min-h-screen">
    //     <Header />
    //     <div className="flex justify-center pt-20 pb-10 p-8 text-center">
    //       <div className="w-[450px] bg-white rounded-xl shadow-md p-8">
    //         <h2 className="text-[26px] font-semibold text-[#2e404a] mb-6">
    //           Reset Your Password
    //         </h2>

    //         {/* Email */}
    //         <div className="text-left mb-4">
    //           <label className="block text-[#374151] text-[16px] mb-1">
    //             Email Address
    //           </label>
    //           <input
    //             type="email"
    //             value={emailFromState}
    //             disabled
    //             className="w-full p-3 border text-black rounded-lg bg-[#f7f9fc] focus:ring-2 focus:ring-[#abdffc] outline-none"
    //           />
    //         </div>

    //         {/* OTP */}
    //         <div className="text-left mb-4">
    //           <label className="block text-[#374151] text-[16px] mb-1">
    //             OTP
    //           </label>
    //           <input
    //             type="number"
    //             placeholder="Enter OTP"
    //             value={otp}
    //             onChange={(e) => setOtp(e.target.value)}
    //             className="w-full p-3 border text-black rounded-lg bg-[#f7f9fc] focus:ring-2 focus:ring-[#abdffc] outline-none"
    //           />
    //         </div>

    //         {/* Password */}
    //         <div className="text-left mb-6 relative">
    //           <label className="block text-[#374151] text-[16px] mb-1">
    //             New Password
    //           </label>
    //           <div className="relative">
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               placeholder="Enter new password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="w-full p-3 pr-10 border text-[#374151] rounded-lg bg-[#f7f9fc] focus:ring-2 focus:ring-[#abdffc] outline-none"
    //             />
    //             <div
    //               className="absolute right-3 top-3 cursor-pointer text-gray-500"
    //               onClick={() => setShowPassword(!showPassword)}
    //             >
    //               {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
    //             </div>
    //           </div>
    //         </div>

    //         {/* Submit Button */}
    //         <button
    //           type="submit"
    //           onClick={handleSubmit}
    //           disabled={loading}
    //           className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
    //             loading
    //               ? "bg-gray-400 cursor-not-allowed"
    //               : "bg-[#05a2ff] hover:bg-[#0088e6]"
    //           }`}
    //         >
    //           {loading ? (
    //             <>
    //               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    //               Processing...
    //             </>
    //           ) : (
    //             "Change Password"
    //           )}
    //         </button>
    //                 <div className="mt-4 text-center">
    //   <button
    //     onClick={() => window.history.back()}
    //     className="text-[#05a2ff] hover:underline font-semibold text-[16px] transition-all duration-200"
    //   >
    //     &larr; Go Back
    //   </button>
    // </div>
    //       </div>
    //     </div>
    //     <Footer />
    //   </div>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 sm:h-2 bg-gradient-to-r from-[#C40116] to-[#5E000B]"></div>

            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-2">
                  Reset Your Password
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter the OTP and your new password below
                </p>
              </div>

              {/* Email Field (Disabled) */}
              {/* <div className="mb-4">
                <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={emailFromState}
                    disabled
                    className="w-full p-3 sm:p-4  border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-gray-50 cursor-not-allowed text-sm sm:text-base"
                  />

                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              </div> */}

              {/* OTP Field */}
              <div className="mb-4">
                <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                  One-Time Password (OTP)
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 sm:p-4  border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                  />
                </div>
                
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                  New Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 sm:p-4  pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
             
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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
                  onClick={() => window.history.back()}
                  className="text-[#C40116] hover:text-[#5E000B] font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center group"
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
      <Footer />
    </div>
  );
};

export default Password;
