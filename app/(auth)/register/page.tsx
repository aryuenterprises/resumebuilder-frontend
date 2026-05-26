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
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiThumbsUp,
  FiX,
  FiAlertTriangle,
  FiWifiOff,
  FiCheckCircle,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import Link from "next/link";
import { passwordGenerator, sanitizeNumber } from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi";
import { useBodyScrollLock } from "@/app/hooks";

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

interface CustomAlert {
  show: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

type InputFieldName = keyof FormValues;

interface InputFieldProps {
  label: string;
  name: InputFieldName;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ElementType;
  required?: boolean;
  focusedField: InputFieldName | null;
  setFocusedField: (field: InputFieldName | null) => void;
  errors: FormErrors;
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  focusedField,
  setFocusedField,
  errors,
}: InputFieldProps) => {
  const isFocused = focusedField === name;
  const hasError = !!errors[name];

  return (
    <div className="mb-3 sm:mb-4">
      <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
        {label} {required && <span className="text-indigo-500">*</span>}
      </label>
      <div className="relative">
        <div
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
            isFocused
              ? "border-indigo-500 ring-2 ring-indigo-100"
              : hasError
                ? "border-red-500 bg-red-50/30"
                : "border-gray-200 hover:border-indigo-300"
          }`}
        />
      </div>
      {hasError && (
        <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs mt-1">
          {errors[name]}
        </p>
      )}
    </div>
  );
};

// Custom Toast/Alert Component
const CustomAlert = ({ alert, onClose }: { alert: CustomAlert; onClose: () => void }) => {
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show, onClose]);

  if (!alert.show) return null;

  const getIcon = () => {
    switch (alert.type) {
      case "success":
        return <FiCheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <FiAlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FiCheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (alert.type) {
      case "success":
        return "bg-green-50 border-green-500";
      case "error":
        return "bg-red-50 border-red-500";
      default:
        return "bg-blue-50 border-blue-500";
    }
  };

  const getTitleColor = () => {
    switch (alert.type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      default:
        return "text-blue-800";
    }
  };

  const getMessageColor = () => {
    switch (alert.type) {
      case "success":
        return "text-green-700";
      case "error":
        return "text-red-700";
      default:
        return "text-blue-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md"
    >
      <div className={`rounded-xl border-l-4 ${getBgColor()} bg-white shadow-2xl overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="flex-1">
              <h3 className={`font-semibold text-sm ${getTitleColor()}`}>
                {alert.title}
              </h3>
              <p className={`text-sm mt-1 ${getMessageColor()}`}>
                {alert.message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className={`h-full ${
              alert.type === "success"
                ? "bg-green-500"
                : alert.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<InputFieldName | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Very Weak",
    color: "bg-red-500",
    percentage: 0,
  });

  // Custom Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendEmailLoading, setResendEmailLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Custom Alert State
  const [customAlert, setCustomAlert] = useState<CustomAlert>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  useBodyScrollLock(showSuccessModal || showErrorModal);

  // Fixed password strength calculation
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

      // Track which requirements are met
      const hasLength = password.length >= 8;
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);
      const hasLongLength = password.length >= 12;

      // Count how many requirements are met (max 6)
      let score = 0;
      if (hasLength) score++;
      if (hasLowercase) score++;
      if (hasUppercase) score++;
      if (hasNumbers) score++;
      if (hasSpecial) score++;
      if (hasLongLength) score++;

      // Determine label, color, and percentage
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

    setPasswordStrength(calculatePasswordStrength(values.password));
  }, [values.password]);

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const showAlert = (type: "success" | "error" | "info", title: string, message: string) => {
    setCustomAlert({
      show: true,
      type,
      title,
      message,
    });
  };

  const generatePassword = () => {
    const newPassword = passwordGenerator();
    handleChange("password", newPassword);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!values.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email))
      newErrors.email = "Invalid email format";
    if (!values.phone.trim()) newErrors.phone = "Phone number is required";
    if (!values.password.trim()) newErrors.password = "Password is required";
    else if (values.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (passwordStrength.score < 3)
      newErrors.password = "Please choose a stronger password (at least Fair)";
    if (!values.city.trim()) newErrors.city = "City is required";
    if (!values.state.trim()) newErrors.state = "State is required";
    if (!values.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // const response = await axios.post(`${API_URL}/auth/signup/`, {
      //   first_name: values.firstName,
      //   last_name: values.lastName,
      //   email: values.email,
      //   phone: values.phone,
      //   password: values.password,
      //   city: values.city,
      //   state: values.state,
      //   country: values.country,
      // });
       const response = await axios.post(
        `${API_URL}/api/users/create`,
        values,
      );
      setLoading(false);

      setResendEmail(values.email);
      // Show success modal
      setShowSuccessModal(true);

      // Clear form after successful registration
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

    } catch (err: any) {
      console.error("Registration Error:", err);
      setLoading(false);

      // Extract error message
      let errorText = "Something went wrong. Please try again.";

      if (err.response?.data?.message) {
        errorText = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorText = err.response.data.error;
      } else if (err.message === "Network Error") {
        errorText = "Network error. Please check your internet connection.";
      } else if (err.code === "ECONNABORTED") {
        errorText = "Request timeout. Please try again.";
      }

      setErrorMessage(errorText);
      setShowErrorModal(true);
    }
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: values.password.length >= 8 },
    { label: "Contains lowercase letter", met: /[a-z]/.test(values.password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(values.password) },
    { label: "Contains number", met: /[0-9]/.test(values.password) },
    {
      label: "Contains special character",
      met: /[^A-Za-z0-9]/.test(values.password),
    },
    {
      label: "At least 12 characters (extra strength)",
      met: values.password.length >= 12,
    },
  ];

  const resendVerificationEmail = async () => {
    if (resendEmailLoading || resendCooldown > 0) return;

    setResendEmailLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/resend-verification-email/`,
        {
          email: resendEmail,
        }
      );

      showAlert("success", "Email Sent!", "Verification link has been resent to your email.");

      // Start cooldown (30 seconds)
      setResendCooldown(30);

    } catch (err: any) {
      console.error("Resend error:", err);

      let errorMsg = "Failed to resend verification email. ";
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.response?.status === 429) {
        errorMsg = "Too many requests. Please wait a moment before trying again.";
      } else {
        errorMsg = "Please try again later.";
      }

      showAlert("error", "Resend Failed", errorMsg);
    } finally {
      setResendEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      {/* Custom Alert */}
      <AnimatePresence>
        {customAlert.show && (
          <CustomAlert alert={customAlert} onClose={() => setCustomAlert(prev => ({ ...prev, show: false }))} />
        )}
      </AnimatePresence>

      <div className="relative flex-1 flex items-center justify-center py-16! p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl "
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

            <div className="p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-4 sm:mb-5 md:mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-indigo-100 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                  <HiSparkles className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  Create Your Account
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  Join PassATS and create your professional resume
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    icon={FiUser}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    icon={FiUser}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email"
                    icon={FiMail}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(e) =>
                      handleChange("phone", sanitizeNumber(e.target.value))
                    }
                    placeholder="Enter your phone number"
                    icon={FiPhone}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                </div>

                {/* Password Field - IMPROVED */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-1 sm:mb-1.5">
                    <label className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
                      Password <span className="text-indigo-500">*</span>
                    </label>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.percentage}%` }}
                        />
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] md:text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
                      >
                        {passwordStrength.label}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400">
                        ({passwordStrength.score}/6)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                          focusedField === "password"
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                      >
                        <FiLock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Create a strong password"
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
                          focusedField === "password"
                            ? "border-indigo-500 ring-2 ring-indigo-100"
                            : errors.password
                              ? "border-red-500 bg-red-50/30"
                              : "border-gray-200 hover:border-indigo-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>

                    {/* Improved Generate Button with Tooltip */}
                    <div className="relative group">
                      <button
                        id="generate-password-btn"
                        type="button"
                        onClick={generatePassword}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 rounded-lg sm:rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 group shadow-sm hover:shadow transform active:scale-95 h-full"
                        aria-label="Generate strong password "
                      >
                        <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="hidden sm:inline text-[11px] sm:text-xs font-medium">
                          Generate Password
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <AnimatePresence>
                    {values.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden"
                      >
                        <h4 className="text-xs  font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          Password Requirements:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                          {passwordRequirements.map((req, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center gap-1.5 sm:gap-2"
                            >
                              {req.met ? (
                                <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                              ) : (
                                <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" />
                              )}
                              <span
                                className={`text-[10px] md:text-[11px] ${req.met ? "text-emerald-600 font-medium" : "text-gray-500"}`}
                              >
                                {req.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.password && (
                    <p className="text-red-500 text-[9px] sm:text-[10px] mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Location Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                  <InputField
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Enter your city"
                    icon={FiMapPin}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                  <InputField
                    label="State"
                    name="state"
                    value={values.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    placeholder="Enter your state"
                    icon={FiMapPin}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                  <InputField
                    label="Country"
                    name="country"
                    value={values.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Enter your country"
                    icon={FiMapPin}
                    required
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    errors={errors}
                  />
                </div>

                {errors.general && (
                  <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-50 border border-red-100 rounded-lg sm:rounded-xl">
                    <p className="text-red-600 text-[11px] sm:text-xs">
                      {errors.general}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Back to Login */}
                <div className="mt-4 sm:mt-5 md:mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </button>
                </div>

                {/* Terms & Privacy */}
                <div className="mt-3 sm:mt-4 text-center">
                  <p className="text-[8px] sm:text-[9px] md:text-[12px] text-gray-500">
                    By creating an account, you agree to our{" "}
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
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========== SUCCESS MODAL ========== */}
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
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 z-10 text-gray-200 hover:text-white transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-8 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
                  >
                    <FiThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-600" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Registration Successful!
                  </h3>
                </div>

                <div className="p-6">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-800 text-center font-medium mb-4"
                  >
                    Your account has been successfully created.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-indigo-50 rounded-xl p-4 mb-4 border-l-4 border-indigo-500"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FiMail className="w-4 h-4 text-indigo-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-indigo-900 font-semibold text-sm mb-1">
                          Verification Required
                        </p>
                        <p className="text-indigo-700 text-sm">
                          A verification link has been sent to your email.
                        </p>
                        <p className="text-indigo-600 text-xs mt-2">
                          Please check your email and verify your account to
                          access all features.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Improved Resend Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-6"
                  >
                    {resendEmailLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-indigo-600 text-sm">
                          Sending verification email...
                        </span>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Didn't receive the verification link?{" "}
                        <button
                          onClick={resendVerificationEmail}
                          disabled={resendCooldown > 0}
                          className={`text-indigo-600 hover:text-indigo-700 font-medium transition-colors cursor-pointer hover:underline ${
                            resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {resendCooldown > 0 ? `Resend it (${resendCooldown}s)` : "Resend it"}
                        </button>
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={() => setShowSuccessModal(false)}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
                    >
                      Close
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== ERROR MODAL ========== */}
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
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-50">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>

                <div className="bg-gradient-to-r from-red-600/90 to-red-500 px-6 pt-8 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
                  >
                    <FiAlertTriangle className="w-10 h-10 text-red-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">
                    Registration Failed
                  </h3>
                </div>

                <div className="p-5 md:p-6">
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
                        <p className="text-red-700 text-sm">{errorMessage}</p>
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
                      💡 Please check your information and try again. If the
                      problem persists, contact support.
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
                        // Focus on first invalid field
                        const firstError = Object.keys(errors)[0];
                        if (firstError) {
                          const element = document.querySelector(
                            `[name="${firstError}"]`,
                          );
                          if (element) {
                            (element as HTMLInputElement).focus();
                          }
                        }
                      }}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
                    >
                      Review Form
                    </button>
                    <button
                      onClick={() => {
                        setShowErrorModal(false);
                        // Retry logic - scroll to form
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
                    >
                      Try Again
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
}








// "use client";
// import { useState, FormEvent, useEffect } from "react";
// import {
//   FiEye,
//   FiEyeOff,
//   FiArrowLeft,
//   FiCheck,
//   FiAlertCircle,
//   FiChevronDown,
//   FiChevronUp,
//   FiRefreshCw,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiLock,
//   FiThumbsUp,
//   FiX,
//   FiAlertTriangle,
//   FiWifiOff,
// } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import Link from "next/link";
// import { passwordGenerator, sanitizeNumber } from "@/app/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiSparkles } from "react-icons/hi";
// import { useBodyScrollLock } from "@/app/hooks";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface FormErrors {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;
//   password?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   general?: string;
// }

// interface PasswordStrength {
//   score: number;
//   label: string;
//   color: string;
//   percentage: number;
// }

// type InputFieldName = keyof FormValues;

// interface InputFieldProps {
//   label: string;
//   name: InputFieldName;
//   type?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder: string;
//   icon: React.ElementType;
//   required?: boolean;
//   focusedField: InputFieldName | null;
//   setFocusedField: (field: InputFieldName | null) => void;
//   errors: FormErrors;
// }

// const InputField = ({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   icon: Icon,
//   required,
//   focusedField,
//   setFocusedField,
//   errors,
// }: InputFieldProps) => {
//   const isFocused = focusedField === name;
//   const hasError = !!errors[name];

//   return (
//     <div className="mb-3 sm:mb-4">
//       <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
//         {label} {required && <span className="text-indigo-500">*</span>}
//       </label>
//       <div className="relative">
//         <div
//           className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//             isFocused ? "text-indigo-600" : "text-gray-400"
//           }`}
//         >
//           <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//         </div>
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           onFocus={() => setFocusedField(name)}
//           onBlur={() => setFocusedField(null)}
//           placeholder={placeholder}
//           className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
//             isFocused
//               ? "border-indigo-500 ring-2 ring-indigo-100"
//               : hasError
//                 ? "border-red-500 bg-red-50/30"
//                 : "border-gray-200 hover:border-indigo-300"
//           }`}
//         />
//       </div>
//       {hasError && (
//         <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs mt-1">
//           {errors[name]}
//         </p>
//       )}
//     </div>
//   );
// };

// export default function RegisterForm() {
//   const router = useRouter();

//   const [values, setValues] = useState<FormValues>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [loading, setLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState<InputFieldName | null>(null);
//   const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
//     score: 0,
//     label: "Very Weak",
//     color: "bg-red-500",
//     percentage: 0,
//   });

//   // Custom Modal States
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [resendEmail, setResendEmail] = useState("");
//   const [resendEmailLoading, setResendEmailLoading] = useState(false);
//   const [resendEmailSuccess, setResendEmailSuccess] = useState("");

//   useBodyScrollLock(showSuccessModal || showErrorModal);

//   // Fixed password strength calculation
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

//       // Track which requirements are met
//       const hasLength = password.length >= 8;
//       const hasLowercase = /[a-z]/.test(password);
//       const hasUppercase = /[A-Z]/.test(password);
//       const hasNumbers = /[0-9]/.test(password);
//       const hasSpecial = /[^A-Za-z0-9]/.test(password);
//       const hasLongLength = password.length >= 12;

//       // Count how many requirements are met (max 6)
//       let score = 0;
//       if (hasLength) score++;
//       if (hasLowercase) score++;
//       if (hasUppercase) score++;
//       if (hasNumbers) score++;
//       if (hasSpecial) score++;
//       if (hasLongLength) score++;

//       // Determine label, color, and percentage
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

//     setPasswordStrength(calculatePasswordStrength(values.password));
//   }, [values.password]);

//   const generatePassword = () => {
//     const newPassword = passwordGenerator();
//     handleChange("password", newPassword);
//   };

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!values.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!values.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(values.email))
//       newErrors.email = "Invalid email format";
//     if (!values.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!values.password.trim()) newErrors.password = "Password is required";
//     else if (values.password.length < 8)
//       newErrors.password = "Password must be at least 8 characters";
//     else if (passwordStrength.score < 3)
//       newErrors.password = "Please choose a stronger password (at least Fair)";
//     if (!values.city.trim()) newErrors.city = "City is required";
//     if (!values.state.trim()) newErrors.state = "State is required";
//     if (!values.country.trim()) newErrors.country = "Country is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);

//     try {
//       // const response = await axios.post(
//       //   `${API_URL}/api/users/create`,
//       //   values,
//       // );
//       const response = await axios.post(`${API_URL}/auth/signup/`, {
//         first_name: values.firstName,
//         last_name: values.lastName,
//         email: values.email,
//         phone: values.phone,
//         password: values.password,
//         city: values.city,
//         state: values.state,
//         country: values.country,
//       });
//       setLoading(false);

//       setResendEmail(values.email);
//       // Show success modal
//       setShowSuccessModal(true);

//       // Clear form after successful registration
//       setValues({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         password: "",
//         city: "",
//         state: "",
//         country: "",
//       });
//       setErrors({});
//     } catch (err: any) {
//       console.error("Registration Error:", err);
//       setLoading(false);

//       // Extract error message
//       let errorText = "Something went wrong. Please try again.";

//       if (err.response?.data?.message) {
//         errorText = err.response.data.message;
//       } else if (err.response?.data?.error) {
//         errorText = err.response.data.error;
//       } else if (err.message === "Network Error") {
//         errorText = "Network error. Please check your internet connection.";
//       } else if (err.code === "ECONNABORTED") {
//         errorText = "Request timeout. Please try again.";
//       }

//       setErrorMessage(errorText);
//       setShowErrorModal(true);
//     }
//   };

//   const handleChange = (field: keyof FormValues, value: string) => {
//     setValues((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const passwordRequirements = [
//     { label: "At least 8 characters", met: values.password.length >= 8 },
//     { label: "Contains lowercase letter", met: /[a-z]/.test(values.password) },
//     { label: "Contains uppercase letter", met: /[A-Z]/.test(values.password) },
//     { label: "Contains number", met: /[0-9]/.test(values.password) },
//     {
//       label: "Contains special character",
//       met: /[^A-Za-z0-9]/.test(values.password),
//     },
//     {
//       label: "At least 12 characters (extra strength)",
//       met: values.password.length >= 12,
//     },
//   ];

//   const resendVerificationEmail = async () => {
//     setResendEmailLoading(true);
//     setResendEmailSuccess("");
//     try {
//       const response = await axios.post(
//         `${API_URL}/auth/resend-verification-email/`,
//         {
//           email: resendEmail,
//         },
//       );

//       console.log("response",response)
//       setResendEmailSuccess(response.data.message || "Verification email resent successfully");
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setResendEmailLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
//       <div className="relative flex-1 flex items-center justify-center py-16! p-3 sm:p-4 md:p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-3xl "
//         >
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//             <div className="p-4 sm:p-6 md:p-8">
//               {/* Header */}
//               <div className="text-center mb-4 sm:mb-5 md:mb-6">
//                 <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-indigo-100 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
//                   <HiSparkles className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-indigo-600" />
//                 </div>
//                 <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Create Your Account
//                 </h2>
//                 <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
//                   Join PassATS and create your professional resume
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Name Row */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
//                   <InputField
//                     label="First Name"
//                     name="firstName"
//                     value={values.firstName}
//                     onChange={(e) => handleChange("firstName", e.target.value)}
//                     placeholder="Enter your first name"
//                     icon={FiUser}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                   <InputField
//                     label="Last Name"
//                     name="lastName"
//                     value={values.lastName}
//                     onChange={(e) => handleChange("lastName", e.target.value)}
//                     placeholder="Enter your last name"
//                     icon={FiUser}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                 </div>

//                 {/* Email & Phone Row */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
//                   <InputField
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={values.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     placeholder="Enter your email"
//                     icon={FiMail}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                   <InputField
//                     label="Phone Number"
//                     name="phone"
//                     type="tel"
//                     value={values.phone}
//                     onChange={(e) =>
//                       handleChange("phone", sanitizeNumber(e.target.value))
//                     }
//                     placeholder="Enter your phone number"
//                     icon={FiPhone}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                 </div>

//                 {/* Password Field - IMPROVED */}
//                 <div className="mb-3 sm:mb-4">
//                   <div className="flex flex-wrap justify-between items-center gap-2 mb-1 sm:mb-1.5">
//                     <label className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
//                       Password <span className="text-indigo-500">*</span>
//                     </label>
//                     <div className="flex items-center gap-1.5 sm:gap-2">
//                       <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full transition-all duration-300 ${passwordStrength.color}`}
//                           style={{ width: `${passwordStrength.percentage}%` }}
//                         />
//                       </div>
//                       <span
//                         className={`text-[9px] sm:text-[10px] md:text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
//                       >
//                         {passwordStrength.label}
//                       </span>
//                       <span className="text-[9px] sm:text-[10px] text-gray-400">
//                         ({passwordStrength.score}/6)
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <div
//                         className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//                           focusedField === "password"
//                             ? "text-indigo-600"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         <FiLock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                       </div>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         value={values.password}
//                         onChange={(e) =>
//                           handleChange("password", e.target.value)
//                         }
//                         onFocus={() => setFocusedField("password")}
//                         onBlur={() => setFocusedField(null)}
//                         placeholder="Create a strong password"
//                         className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-xs md:text-sm focus:outline-none transition-all duration-200 ${
//                           focusedField === "password"
//                             ? "border-indigo-500 ring-2 ring-indigo-100"
//                             : errors.password
//                               ? "border-red-500 bg-red-50/30"
//                               : "border-gray-200 hover:border-indigo-300"
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
//                         aria-label={
//                           showPassword ? "Hide password" : "Show password"
//                         }
//                       >
//                         {showPassword ? (
//                           <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         ) : (
//                           <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         )}
//                       </button>
//                     </div>

//                     {/* Improved Generate Button with Tooltip */}
//                     <div className="relative group">
//                       <button
//                         id="generate-password-btn"
//                         type="button"
//                         onClick={generatePassword}
//                         className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 rounded-lg sm:rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 group shadow-sm hover:shadow transform active:scale-95 h-full"
//                         aria-label="Generate strong password "
//                       >
//                         <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
//                         <span className="hidden sm:inline text-[11px] sm:text-xs font-medium">
//                           Generate Password
//                         </span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Password Requirements */}
//                   <AnimatePresence>
//                     {values.password && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden"
//                       >
//                         <h4 className="text-xs  font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                           Password Requirements:
//                         </h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
//                           {passwordRequirements.map((req, index) => (
//                             <motion.div
//                               key={index}
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: index * 0.05 }}
//                               className="flex items-center gap-1.5 sm:gap-2"
//                             >
//                               {req.met ? (
//                                 <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
//                               ) : (
//                                 <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" />
//                               )}
//                               <span
//                                 className={`text-[10px] md:text-[11px] ${req.met ? "text-emerald-600 font-medium" : "text-gray-500"}`}
//                               >
//                                 {req.label}
//                               </span>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                   {errors.password && (
//                     <p className="text-red-500 text-[9px] sm:text-[10px] mt-1">
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 {/* Location Row */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
//                   <InputField
//                     label="City"
//                     name="city"
//                     value={values.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     placeholder="Enter your city"
//                     icon={FiMapPin}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                   <InputField
//                     label="State"
//                     name="state"
//                     value={values.state}
//                     onChange={(e) => handleChange("state", e.target.value)}
//                     placeholder="Enter your state"
//                     icon={FiMapPin}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                   <InputField
//                     label="Country"
//                     name="country"
//                     value={values.country}
//                     onChange={(e) => handleChange("country", e.target.value)}
//                     placeholder="Enter your country"
//                     icon={FiMapPin}
//                     required
//                     focusedField={focusedField}
//                     setFocusedField={setFocusedField}
//                     errors={errors}
//                   />
//                 </div>

//                 {errors.general && (
//                   <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-50 border border-red-100 rounded-lg sm:rounded-xl">
//                     <p className="text-red-600 text-[11px] sm:text-xs">
//                       {errors.general}
//                     </p>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-[11px] sm:text-xs md:text-sm"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Creating Account...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>

//                 {/* Back to Login */}
//                 <div className="mt-4 sm:mt-5 md:mt-6 text-center">
//                   <button
//                     type="button"
//                     onClick={() => router.push("/login")}
//                     className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group cursor-pointer"
//                   >
//                     <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:-translate-x-1 transition-transform" />
//                     Back to Login
//                   </button>
//                 </div>

//                 {/* Terms & Privacy */}
//                 <div className="mt-3 sm:mt-4 text-center">
//                   <p className="text-[8px] sm:text-[9px] md:text-[12px] text-gray-500">
//                     By creating an account, you agree to our{" "}
//                     <Link
//                       href="/terms-conditions"
//                       className="text-indigo-600 hover:underline cursor-pointer"
//                     >
//                       Terms
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       href="/privacy-policy"
//                       className="text-indigo-600 hover:underline cursor-pointer"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ========== SUCCESS MODAL ========== */}
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
//                 <button
//                   onClick={() => setShowSuccessModal(false)}
//                   className="absolute top-4 right-4 z-10 text-gray-200 hover:text-white transition-colors cursor-pointer"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>

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
//                     Registration Successful!
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-gray-800 text-center font-medium mb-4"
//                   >
//                     Your account has been successfully created.
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
//                           <FiMail className="w-4 h-4 text-indigo-600" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-indigo-900 font-semibold text-sm mb-1">
//                           Verification Required
//                         </p>
//                         <p className="text-indigo-700 text-sm">
//                           A verification link has been sent to your email.
//                         </p>
//                         <p className="text-indigo-600 text-xs mt-2">
//                           Please check your email and verify your account to
//                           access all features.
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-center mb-6"
//                   >
//                     <p className="text-gray-500 text-sm">
//                       Didn't receive the verification link?{" "}
//                       {resendEmailLoading ? (
//                         <span className="text-indigo-600 text-xs mt-2">
//                           Sending...
//                         </span>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             resendVerificationEmail();
//                           }}
//                           className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors cursor-pointer hover:underline"
//                         >
//                           Resend it
//                         </button>
//                       )}
//                       {resendEmailSuccess && (
//                         <p className="text-indigo-600 text-xs mt-2">

// {resendEmailSuccess}
//                         </p>
//                       )}
//                     </p>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="flex gap-3"
//                   >
//                     <button
//                       onClick={() => setShowSuccessModal(false)}
//                       className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
//                     >
//                       Close
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ========== ERROR MODAL ========== */}
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
//               <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-50">
//                 <button
//                   onClick={() => setShowErrorModal(false)}
//                   className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors cursor-pointer"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>

//                 <div className="bg-gradient-to-r from-red-600/90 to-red-500 px-6 pt-8 pb-6 text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//                     className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
//                   >
//                     <FiAlertTriangle className="w-10 h-10 text-red-600" />
//                   </motion.div>
//                   <h3 className="text-2xl font-bold text-white">
//                     Registration Failed
//                   </h3>
//                 </div>

//                 <div className="p-5 md:p-6">
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
//                         <p className="text-red-700 text-sm">{errorMessage}</p>
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
//                       💡 Please check your information and try again. If the
//                       problem persists, contact support.
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
//                         // Focus on first invalid field
//                         const firstError = Object.keys(errors)[0];
//                         if (firstError) {
//                           const element = document.querySelector(
//                             `[name="${firstError}"]`,
//                           );
//                           if (element) {
//                             (element as HTMLInputElement).focus();
//                           }
//                         }
//                       }}
//                       className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm"
//                     >
//                       Review Form
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowErrorModal(false);
//                         // Retry logic - scroll to form
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-sm"
//                     >
//                       Try Again
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Add custom CSS for animations */}
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
// }

























