import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Forget_password = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState({});

  const [email, setEmail] = useState("");


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // if (e) e.preventDefault()



  //   try {


  //     const formData = {
  //       email: email,


  //     };

  //     // console.log("formData", formData)

  //     const response = await axios.post(
  //       `${API_URL}/api/users/forgot-password`,
  //       formData,

  //     );
  //     console.log("response", response)

  //     toast.success(" Email Send successfully.");





  //     // reset();


  //     return true;

  //   } catch (err) {
  //     setErrors(err);
  //     console.error("Error sending message:", err);

  //     return false;



  //   }

  // };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your registered email address.",
        confirmButtonColor: "#05a2ff",
      });
      return;
    }

    try {
      setLoading(true); // 🔹 Start loading before API

      const formData = { email };

      const response = await axios.post(
        `${API_URL}/api/users/forgot-password`,
        formData
      );

      console.log("response", response);

      //  Stop loading after success
      setLoading(false);

      //  Show success message from backend in SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data?.message || "OTP sent to your email.",
        confirmButtonColor: "#05a2ff",
      }).then(() => {
        navigate("/change-password", { state: { email } });
      });

      // Optionally clear email input here:
      // setEmail("");

      return true;
    } catch (err) {
      console.error("Error sending message:", err);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again later.",
        confirmButtonColor: "#d33",
      });

      return false;
    }
  };


  return (
  //   <div className=" bg-[#f8fbff]">
  //     <Header />
  //     <div className=" flex justify-center pt-20 pb-10 rounded-xl shadow-sm p-8 text-center">
  //       <div className="w-[450px]">
  //         <h2 className="text-[28px] font-roboto font-semibold text-[#2e404a] mb-6">
  //           Forgot your password?
  //         </h2>
  //         <div className="text-[18px] font-nunito font-normal text-[#133a75]">Enter the email address associated with your account and we’ll send you a link to reset your password.</div>



  //         {/* Email Field */}
  //         <div className="text-left mb-4 mt-5">
  //           <label className="block text-[#374151] text-[16px] font-nunito font-normal mb-1">Email Address</label>
  //           <input
  //             type="email"
  //             placeholder="Enter email"
  //             autoComplete="new-email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
  //           />
  //         </div>



  //         {/* Login Button */}
  //         {/* <button className="w-full bg-[#05a2ff] hover:bg-[#0088e6] text-white font-semibold py-3 rounded-lg shadow-md transition" onClick={handleSubmit}>
  //           Send Reset Link
  //         </button> */}

  //         <button
  //           type="submit"
  //           onClick={handleSubmit}
  //           disabled={loading}
  //           className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${loading
  //               ? "bg-gray-400 cursor-not-allowed"
  //               : "bg-[#05a2ff] hover:bg-[#0088e6]"
  //             }`}
  //         >
  //           {loading ? (
  //             <>
  //               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  //               Sending...
  //             </>
  //           ) : (
  //             "Send OTP"
  //           )}
  //         </button>

  //          <div className="mt-4 text-center">
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
  <div className="flex-1 flex justify-center items-center p-4 sm:p-6 mt-5 md:mt-12">
    <div className="w-full max-w-md">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
        {/* Header gradient accent */}
        <div className="h-1 sm:h-2 bg-gradient-to-r from-[#C40116] to-[#5E000B]"></div>
        
        <div className="p-6 sm:p-8">
         

          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-2">
              Reset your password
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
              Email Address
            </label>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="new-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 sm:p-4  border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
              />
             
            </div>
          </div>

          {/* Send Reset Link Button */}
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
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send Reset Link</span>
              </>
            )}
          </button>

          

          {/* Back to Login */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => window.history.back()}
              className="text-[#C40116] hover:text-[#5E000B] font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

export default Forget_password;
