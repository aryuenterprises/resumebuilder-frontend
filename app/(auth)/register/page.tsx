"use client";
import { useState, FormEvent, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiCheck,
  FiAlertCircle,
  FiChevronDown,
  FiChevronUp,
  FiRefreshCw,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/app/config/api";
import Link from "next/link";
import { passwordGenerator, sanitizeNumber } from "@/app/utils";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  state: string;
  country: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  city?: string;
  state?: string;
  country?: string;
  general?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  percentage: number;
}

export default function RegisterForm() {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    state: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Very Weak",
    color: "bg-red-500",
    percentage: 0,
  });

  // Calculate password strength whenever password changes
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

      // Calculate score
      if (requirements.length) score++;
      if (password.length >= 12) score++; // Extra point for longer passwords
      if (requirements.lowercase) score++;
      if (requirements.uppercase) score++;
      if (requirements.numbers) score++;
      if (requirements.special) score++;

      // Cap score at 6
      score = Math.min(score, 6);

      // Determine label and color based on score
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

    setPasswordStrength(calculatePasswordStrength(values.password));
  }, [values.password]);

  const generatePassword = () => {
    const password = passwordGenerator();

    handleChange("password", password);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 12) {
      newErrors.password = "Password must be at least 12 characters";
    } else if (passwordStrength.score < 2) {
      newErrors.password = "Please choose a stronger password";
    }

    if (!values.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!values.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!values.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/users/create`, values);

      setLoading(false);

      await Swal.fire({
        icon: "success",
        html: `
          <p>Your Account has been created successfully.</p>
          <p class="text-gray-500 font-semibold mt-2">
            Please check your Registered Email to verify your Account.
          </p>
        `,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#C40116",
        background: "#ffffff",
        color: "#1f2937",
      });

      // Reset form
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        city: "",
        state: "",
        country: "",
      });
      setErrors({});

      // Redirect to login page
      // router.push("/login");
    } catch (err: any) {
      console.error("Registration Error:", err);

      await Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonColor: "#C40116",
        background: "#ffffff",
        color: "#1f2937",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Password requirements checklist
  const passwordRequirements = [
    { label: "At least 12 characters", met: values.password.length >= 12 },
    { label: "Contains lowercase letter", met: /[a-z]/.test(values.password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(values.password) },
    { label: "Contains number", met: /[0-9]/.test(values.password) },
    {
      label: "Contains special character",
      met: /[^A-Za-z0-9]/.test(values.password),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-4xl mt-5 md:mt-12">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Header gradient accent */}
            <div className="h-1 sm:h-2 bg-linear-to-r from-[#C40116] to-[#5E000B]"></div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-1 sm:mb-2">
                  Create Your Account
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Join ARYU SmartCV and create your professional resume
                </p>
              </div>

              <form onSubmit={handlesubmit} noValidate>
                {/* Name Fields */}
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  {/* First Name */}
                  <div className="w-full">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      First Name
                    </label>
                    <div className="relative group">
                      <input
                        id="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={(e) =>
                          handleChange("firstName", e.target.value)
                        }
                        placeholder="Enter your first name"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={
                          errors.firstName ? "firstName-error" : undefined
                        }
                      />
                    </div>
                    {errors.firstName && (
                      <p
                        id="firstName-error"
                        className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                      >
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      Last Name
                    </label>
                    <div className="relative group">
                      <input
                        id="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={(e) =>
                          handleChange("lastName", e.target.value)
                        }
                        placeholder="Enter your last name"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={
                          errors.lastName ? "lastName-error" : undefined
                        }
                      />
                    </div>
                    {errors.lastName && (
                      <p
                        id="lastName-error"
                        className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                      >
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
                  {/* Email */}
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      Email
                    </label>
                    <div className="relative group">
                      <input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
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

                  {/* Phone */}
                  <div className="w-full">
                    <label
                      htmlFor="phone"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      Phone
                    </label>
                    <div className="relative group">
                      <input
                        id="phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) =>
                          handleChange("phone", sanitizeNumber(e.target.value))
                        }
                        placeholder="Enter your phone number"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                      />
                    </div>
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Field with Strength Indicator */}
                <div className="mt-4 sm:mt-6">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <label
                      htmlFor="password"
                      className="block text-gray-800 text-sm sm:text-base font-semibold"
                    >
                      Password
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
                      >
                        {passwordStrength.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({passwordStrength.score}/6)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <div className="relative flex-1 group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        placeholder="Create a strong password"
                        className="w-full p-3 sm:p-4 pr-10 sm:pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.password}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors focus:outline-none"
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
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="p-3 sm:p-4 bg-linear-to-r from-[#C40116]/10 to-[#5E000B]/10 hover:from-[#C40116]/20 hover:to-[#5E000B]/20 border border-[#C40116]/20 rounded-lg sm:rounded-xl text-[#C40116] hover:text-[#5E000B] transition-colors flex items-center justify-center cursor-pointer"
                      title="Generate strong password"
                    >
                      <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Password Strength Bar */}
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300 ease-out`}
                        style={{ width: `${passwordStrength.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Show/Hide Requirements Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowRequirements(!showRequirements)}
                    className="mt-3 flex items-center gap-1 text-xs text-[#C40116] hover:text-[#5E000B] font-medium focus:outline-none"
                  >
                    {showRequirements ? (
                      <>
                        <FiChevronUp className="w-3 h-3" />
                        Hide password requirements
                      </>
                    ) : (
                      <>
                        <FiChevronDown className="w-3 h-3" />
                        Show password requirements
                      </>
                    )}
                  </button>

                  {/* Password Requirements & Suggestions */}
                  {showRequirements && (
                    <div className="mt-3 space-y-4">
                      {/* Requirements Checklist */}
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">
                          Password Requirements:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {passwordRequirements.map((req, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              {req.met ? (
                                <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                              ) : (
                                <FiAlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                              )}
                              <span
                                className={`text-xs ${req.met ? "text-green-600 font-medium" : "text-gray-500"}`}
                              >
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p
                      id="password-error"
                      className="text-[#C40116] text-xs sm:text-sm mt-2 font-medium"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* City, State & Country */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      City
                    </label>
                    <div className="relative group">
                      <input
                        id="city"
                        type="text"
                        value={values.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Enter your city"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.city}
                        aria-describedby={
                          errors.city ? "city-error" : undefined
                        }
                      />
                    </div>
                    {errors.city && (
                      <p
                        id="city-error"
                        className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      State
                    </label>
                    <div className="relative group">
                      <input
                        id="state"
                        type="text"
                        value={values.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        placeholder="Enter your state"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.state}
                        aria-describedby={
                          errors.state ? "state-error" : undefined
                        }
                      />
                    </div>
                    {errors.state && (
                      <p
                        id="state-error"
                        className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                      >
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                    >
                      Country
                    </label>
                    <div className="relative group">
                      <input
                        id="country"
                        type="text"
                        value={values.country}
                        onChange={(e) =>
                          handleChange("country", e.target.value)
                        }
                        placeholder="Enter your country"
                        className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                        aria-invalid={!!errors.country}
                        aria-describedby={
                          errors.country ? "country-error" : undefined
                        }
                      />
                    </div>
                    {errors.country && (
                      <p
                        id="country-error"
                        className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium"
                      >
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-red-700 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center mt-8 sm:mt-10">
                  <button
                    type="submit"
                    className={`${
                      loading
                        ? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-linear-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 hover:shadow-xl"
                    } text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full md:w-auto flex items-center justify-center cursor-pointer`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-[#C40116] hover:text-[#5E000B] font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center group focus:outline-none focus:underline cursor-pointer"
                  >
                    <FiArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </button>
                </div>

                {/* Terms & Privacy */}
                <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms-conditions"
                      target="_blank"
                      className="text-[#C40116] hover:underline focus:outline-none"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C40116] hover:underline focus:outline-none"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
