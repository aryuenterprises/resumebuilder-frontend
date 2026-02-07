import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Config";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const nagivate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // let [requiredError, setRequiredError] = useState("");
  const [requiredError, setRequiredError] = useState(
    "Please complete the reCAPTCHA."
  );

  console.log("formdata", email, password);

  const clickforgetpage = () => {
    nagivate("/forget-password");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clickregisterpage = () => {
    nagivate("/register-form");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [errors, setErrors] = useState({});

  //   const handlesubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = {
  //       email:email,
  //       password:password,
  //     };

  //     const response = await axios.post(
  //       `${API_URL}/api/users/login`,
  //       formData
  //     );
  //     console.log("response:", response);

  //      if (response.data && response.data.token) {
  //             const data = response.data;

  //             // Store user data and token
  //             localStorage.setItem("Resumnit", JSON.stringify(data.user));
  //             Cookies.set("token", data.token, { path: "/" });
  //             localStorage.setItem("admin_token",data.token);

  //      }
  //     // Swal.fire({
  //     //   icon: "success",
  //     //   title: "Expense added successfully!",
  //     //   showConfirmButton: true,
  //     //   timer: 1500,
  //     // });

  //     setErrors({});
  //   } catch (err) {
  //     setErrors(err);

  //   }
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "email is required";
    }

    if (!password.trim()) {
      newErrors.password = "password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);

    if (value) {
      setRequiredError(""); // remove error
    }
    // console.log("Captcha value:", value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      //   Swal.fire({
      //     icon: "warning",
      //     title: "Please fix the errors before submitting.",
      //   });
      return;
    }

    try {
      // Create payload
      const formData = {
        email,
        password,
      };

      // Send login request
      const response = await axios.post(`${API_URL}/api/users/login`, formData);
      console.log("response:", response);

      if (response.data && response.data.token) {
        const { user, token } = response.data;

        // Store user and token
        localStorage.setItem("Resumnit_user", JSON.stringify(user));
        // Cookies.set("token", token, { path: "/" });
        localStorage.setItem("Resumnit_token", token);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          confirmButtonText: "OK",
          confirmButtonColor: "#05a2ff",
        }).then(() => {
          nagivate("/");
        });

        setEmail("");
        setPassword("");

        // Clear any existing errors
        setErrors({});
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid response from server.",
        });
      }
    } catch (err) {
      console.error("Login Error:", err);

      // Handle API error messages
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });

      setErrors({ general: errorMessage });
    }
  };

  return (
    // <div className=" bg-[#f8fbff]">
    //   <Header />
    //   <div className=" flex justify-center pt-20 pb-10 rounded-xl shadow-sm p-8 text-center">
    //     <div className="w-[450px]">
    //       <h2 className="text-[28px] font-roboto font-semibold text-[#2e404a] mb-6">
    //         Welcome back! Please log in
    //       </h2>

    //       {/* Email Field */}
    //       <div className="text-left mb-4">
    //         <label className="block text-[#374151] text-[16px] font-nunito font-normal mb-1">
    //           Email Address
    //         </label>
    //         <input
    //           type="email"
    //           placeholder="Enter email"
    //           autoComplete="off"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
    //         />
    //         {errors.email && (
    //           <p className="text-red-500 text-sm mt-1">{errors.email}</p>
    //         )}
    //       </div>

    //       {/* Password Field */}
    //       <div className="text-left mb-6">
    //         <div className="flex justify-between items-center">
    //           <label className="block text-[#374151] text-[16px] font-nunito font-normal mb-1">
    //             Password
    //           </label>
    //           <div
    //             className="text-blue-500 text-sm font-medium hover:underline cursor-pointer"
    //             onClick={clickforgetpage}
    //           >
    //             Forgot password?
    //           </div>
    //         </div>
    //         <div className="relative mt-1">
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             placeholder="Enter password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="w-full p-3 pr-12 border text-black text-[16px] font-nunito font-normal rounded-lg bg-[#f7f9fc] shadow-sm focus:outline-none  focus:border-blue-500    focus:ring-2 focus:ring-[#abdffc]  focus:shadow-md  transition-all duration-300"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword(!showPassword)}
    //             className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
    //           >
    //             {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
    //           </button>
    //         </div>
    //         {errors.password && (
    //           <p className="text-red-500 text-sm mt-1">{errors.password}</p>
    //         )}
    //       </div>

    //       {/* Login Button */}
    //       <div className="flex justify-center items-center w-full mt-4 ">
    //         <button
    //           //  className="w-[50%] bg-[#05a2ff] hover:bg-[#0088e6] text-white font-semibold py-3 rounded-lg shadow-md transition"

    //           className={`${
    //             captchaValue
    //               ? "bg-[#05a2ff] hover:bg-[#0088e6] text-white"
    //               : "bg-[#3c3d3d] text-white"
    //           } font-semibold py-3 rounded-lg shadow-md transition w-[50%] hover:scale-105 duration-300 `}
    //           onClick={handlesubmit}
    //         >
    //           Log In
    //         </button>
    //         <a
    //           className=" w-[50%] text-[#05a2ff] font-semibold text-end underline cursor-pointer"
    //           onClick={clickregisterpage}
    //         >
    //           Register Now
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>

    <main>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-red-50/10 to-red-100/10 flex justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mt-5 md:mt-12">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 sm:h-2 bg-gradient-to-r from-[#C40116] to-[#5E000B]"></div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-1 sm:mb-2">
                  Welcome back!
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Please log in to continue
                </p>
              </div>

              {/* Email Field */}
              <div className="text-left mb-4 sm:mb-6">
                <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 sm:p-4 pl-10 sm:pl-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                  />
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#C40116]">
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                {errors.email && (
                  <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="text-left mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <label className="block text-gray-800 text-sm sm:text-base font-semibold">
                    Password
                  </label>
                  <div
                    className="text-[#C40116] text-xs sm:text-sm font-semibold hover:text-[#5E000B] cursor-pointer transition-colors"
                    onClick={clickforgetpage}
                  >
                    Forgot password?
                  </div>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 sm:p-4 pl-10 sm:pl-12 pr-10 sm:pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                  />
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#C40116]">
                    <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button & Register Link */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8">
                <button
                  className="bg-gradient-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-sm sm:text-base"
                  onClick={handlesubmit}
                >
                  Log In
                </button>

                <button
                  className="text-[#C40116] font-semibold hover:text-[#5E000B] transition-colors flex items-center group text-sm sm:text-base"
                  onClick={clickregisterpage}
                >
                  <span>Register Now</span>
                  <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Terms & Privacy */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our{" "}
                  <span className="text-[#C40116] cursor-pointer hover:underline">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="text-[#C40116] cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
