"use client";

import { useState, FormEvent } from "react";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import Link from "next/link";
import { setLocalStorage } from "@/app/utils";

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

      const response = await axios.post(`${API_URL}/api/users/login`, formData);

      if (response.data && response.data.token) {
        const { user, token } = response.data;

        // Store user and token
        // localStorage.setItem("user_details", JSON.stringify(user));
        // localStorage.setItem("user_token", token);

        setLocalStorage("user_details",user)
        setLocalStorage("user_token",token)

        await Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          confirmButtonText: "OK",
          confirmButtonColor: "#C40116",
          background: "#ffffff",
          color: "#1f2937",
        });
        setEmail("");
        setPassword("");
        setErrors({});
        setIsLoading(false);

        router.push("/choose-template");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Invalid response from server.",
          confirmButtonColor: "#C40116",
        });
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setIsLoading(false);

      // Handle API error messages
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#C40116",
        background: "#ffffff",
        color: "#1f2937",
      });

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="grow bg-linear-to-br from-red-50/10 to-red-100/10 flex justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mt-5 md:mt-12">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>

            <div className="p-4 sm:p-6 md:p-8">
              {/* heading */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-1 sm:mb-2">
                  Welcome back!
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Please log in to continue
                </p>
              </div>

              <form onSubmit={handlesubmit} noValidate>
                {/* Email Field */}
                <div className="text-left mb-4 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#C40116]">
                      <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="text-left mb-6 sm:mb-8">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <label
                      htmlFor="password"
                      className="block text-gray-800 text-sm sm:text-base font-semibold"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-[#C40116] text-xs  font-semibold hover:text-[#5E000B] cursor-pointer transition-colors focus:outline-none focus:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 pr-10 sm:pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                      aria-invalid={!!errors.password}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                    />
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#C40116]">
                      <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors focus:outline-none focus:text-[#C40116] cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* General error message */}
                {errors.general && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-red-700 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Login Button & Register Link */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-sm sm:text-base cursor-pointer ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="text-[#C40116] font-semibold hover:text-[#5E000B] transition-colors flex items-center group text-sm sm:text-base focus:outline-none focus:underline cursor-pointer"
                  >
                    <span>Register Now</span>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              {/* Terms & Privacy */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms-conditions"
                    target="_blank"
                    className="text-[#C40116] hover:underline focus:outline-none cursor-pointer"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-[#C40116] hover:underline focus:outline-none cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
