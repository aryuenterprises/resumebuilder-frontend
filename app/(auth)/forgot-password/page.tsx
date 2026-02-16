"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import { MdOutlineAttachEmail } from "react-icons/md";


interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
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
      setLoading(true);

      const formData = { email };

      const response = await axios.post(
        `${API_URL}/api/users/forgot-password`,
        formData,
      );

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data?.message || "OTP sent to your email.",
        confirmButtonColor: "#05a2ff",
      }).then(() => {
        router.push(`/change-password?email=${encodeURIComponent(email)}`);
      });

      return true;
    } catch (err: unknown) {
      console.error("Error sending message:", err);
      setLoading(false);

      const error = err as ApiError;

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        confirmButtonColor: "#d33",
      });

      return false;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 flex justify-center items-center p-4 sm:p-6 mt-5 md:mt-12">
        <div className="w-full max-w-md">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>

            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-2">
                  Reset your password
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Send Reset Link Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center  justify-center gap-2 ${
                  loading
                    ? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                   <MdOutlineAttachEmail className="text-xl"/>
                    <span>Send Reset Link</span>
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

export default ForgetPassword;
