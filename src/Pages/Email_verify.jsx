import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Email_verify() {

        const nagivate = useNavigate();

     const clickdlogin = () => {
   
        nagivate('/loging');

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
  return (
    <div className="bg-[#f4f8ff] min-h-screen flex flex-col">
      <Header />

      {/* Centered Container */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 border border-gray-100 relative overflow-hidden">

          {/* Soft Top Gradient Highlight */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl"></div>

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-50 p-4 rounded-full shadow-sm border border-green-100">
              <FaCheckCircle className="text-green-600" size={48} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Verification Successful
          </h2>

          {/* Text */}
          <p className="text-center text-gray-600 mt-3 text-sm leading-relaxed">
            Your account has been successfully verified. Please click the login 
            button below to access your account.
          </p>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            onClick={clickdlogin}>
              Login Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Email_verify;
