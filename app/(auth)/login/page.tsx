

// "use client";

// import { useState, FormEvent } from "react";
// import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiLogIn, FiShield } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { API_URL } from "../../config/api";
// import Link from "next/link";
// import { setLocalStorage } from "@/app/utils";
// import { motion } from "framer-motion";
// import { Sparkles } from "lucide-react";

// // Define TypeScript interfaces
// interface LoginErrors {
//   email?: string;
//   password?: string;
//   general?: string;
// }

// const Login = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<LoginErrors>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   const validateForm = () => {
//     const newErrors: LoginErrors = {};

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlesubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const formData = {
//         email,
//         password,
//       };

//       const response = await axios.post(`${API_URL}/api/users/login`, formData, {
//   withCredentials: true,
// });
//       if (response.data && response.data.token) {
//         const { user, token } = response.data;

//         setLocalStorage("user_details", user);
//         setLocalStorage("user_token", token);

//         await Swal.fire({
//           icon: "success",
//           title: "Welcome Back!",
//           text: "You have successfully logged in.",
//           confirmButtonText: "Continue",
//           confirmButtonColor: "#4f46e5",
//           background: "#ffffff",
//           color: "#1f2937",
//           timer: 2000,
//           showConfirmButton: false,
//         });
        
//         setEmail("");
//         setPassword("");
//         setErrors({});
//         setIsLoading(false);

//         router.push("/dashboard");
//       } else {
//         await Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: "Invalid response from server.",
//           confirmButtonColor: "#4f46e5",
//         });
//       }
//     } catch (err: any) {
//       console.error("Login Error:", err);
//       setIsLoading(false);

//       const errorMessage =
//         err.response?.data?.message ||
//         "Something went wrong. Please try again.";

//       await Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: errorMessage,
//         confirmButtonColor: "#4f46e5",
//         background: "#ffffff",
//         color: "#1f2937",
//       });

//       setErrors({ general: errorMessage });
//     } finally {
//       setIsLoading(false);
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
//               {/* Logo/Brand */}
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl mb-3">
//                   <Sparkles className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Welcome Back!
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Sign in to continue to your account
//                 </p>
//               </div>

//               <form onSubmit={handlesubmit} noValidate>
//                 {/* Email Field */}
//                 <div className="mb-5">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative group">
//                     <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-indigo-600' : 'text-gray-400'}`}>
//                       <FiMail className="w-5 h-5" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onFocus={() => setFocusedField('email')}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="Enter your email"
//                       className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
//                         focusedField === 'email'
//                           ? 'border-indigo-500 ring-2 ring-indigo-100'
//                           : errors.email
//                           ? 'border-red-500 bg-red-50/30'
//                           : 'border-gray-200 hover:border-indigo-300'
//                       }`}
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Password Field */}
//                 <div className="mb-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="text-sm font-semibold text-gray-700">
//                       Password
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => router.push("/forgot-password")}
//                       className="text-indigo-600 text-xs font-medium hover:text-indigo-700 transition-colors"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                   <div className="relative group">
//                     <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-indigo-600' : 'text-gray-400'}`}>
//                       <FiLock className="w-5 h-5" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       onFocus={() => setFocusedField('password')}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="Enter your password"
//                       className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
//                         focusedField === 'password'
//                           ? 'border-indigo-500 ring-2 ring-indigo-100'
//                           : errors.password
//                           ? 'border-red-500 bg-red-50/30'
//                           : 'border-gray-200 hover:border-indigo-300'
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
//                     >
//                       {showPassword ? (
//                         <FiEyeOff className="w-5 h-5" />
//                       ) : (
//                         <FiEye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                   )}
//                 </div>

//                 {/* General error message */}
//                 {errors.general && (
//                   <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
//                     <p className="text-red-600 text-sm">{errors.general}</p>
//                   </div>
//                 )}

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Logging in...
//                     </>
//                   ) : (
//                     <>
//                       <FiLogIn className="w-4 h-4" />
//                       Log In
//                     </>
//                   )}
//                 </button>

//                 {/* Register Link */}
//                 <div className="mt-6 text-center">
//                   <p className="text-sm text-gray-600">
//                     Don't have an account?{" "}
//                     <button
//                       type="button"
//                       onClick={() => router.push("/register")}
//                       className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors inline-flex items-center gap-1 group cursor-pointer"
//                     >
//                       Register Now
//                       <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </p>
//                 </div>
//               </form>

             
              
//             </div>
//           </div>

//           {/* Terms & Privacy */}
//           <div className="mt-6 text-center">
//             <p className="text-xs text-gray-400">
//               By continuing, you agree to our{" "}
//               <Link
//                 href="/terms-conditions"
//                 className="text-indigo-600 hover:underline cursor-pointer"
//               >
//                 Terms
//               </Link>{" "}
//               and{" "}
//               <Link
//                 href="/privacy-policy"
//                 className="text-indigo-600 hover:underline cursor-pointer"
//               >
//                 Privacy Policy
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;











"use client";

import { useState, FormEvent } from "react";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiLogIn, FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import Link from "next/link";
import { setLocalStorage } from "@/app/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Define TypeScript interfaces
interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        email,
        password,
      };

      const response = await axios.post(`${API_URL}/api/users/login`, formData, {
        withCredentials: true,
      });
      
      if (response.data && response.data.token) {
        const { user, token } = response.data;

        setLocalStorage("user_details", user);
        setLocalStorage("user_token", token);

        await Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "You have successfully logged in.",
          confirmButtonText: "Continue",
          confirmButtonColor: "#4f46e5",
          background: "#ffffff",
          color: "#1f2937",
          timer: 2000,
          showConfirmButton: false,
        });
        
        setEmail("");
        setPassword("");
        setErrors({});
        setIsLoading(false);

        router.push("/dashboard");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid response from server.",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setIsLoading(false);

      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
      });

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
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

            <div className="p-4 sm:p-6 md:p-8">
              {/* Logo/Brand */}
              <div className="text-center mb-4 sm:mb-5 md:mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-indigo-100 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                  <Sparkles className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  Welcome Back!
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  Sign in to continue to your account
                </p>
              </div>

              <form onSubmit={handlesubmit} noValidate>
                {/* Email Field */}
                <div className="mb-4 sm:mb-5">
                  <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-indigo-600' : 'text-gray-400'}`}>
                      <FiMail className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your email"
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none transition-all duration-200 ${
                        focusedField === 'email'
                          ? 'border-indigo-500 ring-2 ring-indigo-100'
                          : errors.email
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-5 sm:mb-6">
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-indigo-600 text-[9px] sm:text-[10px] md:text-xs font-medium hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-indigo-600' : 'text-gray-400'}`}>
                      <FiLock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your password"
                      className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none transition-all duration-200 ${
                        focusedField === 'password'
                          ? 'border-indigo-500 ring-2 ring-indigo-100'
                          : errors.password
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                      ) : (
                        <FiEye className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* General error message */}
                {errors.general && (
                  <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-red-600 text-[11px] sm:text-xs">{errors.general}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <FiLogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Log In</span>
                    </>
                  )}
                </button>

                {/* Register Link */}
                <div className="mt-5 sm:mt-6 text-center">
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/register")}
                      className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors inline-flex items-center gap-1 group cursor-pointer text-[11px] sm:text-xs"
                    >
                      Register Now
                      <FiArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Terms & Privacy */}
          <div className="mt-4 sm:mt-5 md:mt-6 text-center">
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400">
              By continuing, you agree to our{" "}
              <Link
                href="/terms-conditions"
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;