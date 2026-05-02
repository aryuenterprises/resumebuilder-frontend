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
//   FiShield,
//   // FiSparkles,
// } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { API_URL } from "@/app/config/api";
// import Link from "next/link";
// import { passwordGenerator, sanitizeNumber } from "@/app/utils";
// import { motion } from "framer-motion";
// import { HiSparkles } from "react-icons/hi";

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

// // Type for input field names
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
//     <div className="mb-4">
//       <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//         {label} {required && <span className="text-indigo-500">*</span>}
//       </label>
//       <div className="relative">
//         <div
//           className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//             isFocused ? "text-indigo-600" : "text-gray-400"
//           }`}
//         >
//           <Icon className="w-4 h-4" />
//         </div>
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           onFocus={() => setFocusedField(name)}
//           onBlur={() => setFocusedField(null)}
//           placeholder={placeholder}
//           className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
//             isFocused
//               ? "border-indigo-500 ring-2 ring-indigo-100"
//               : hasError
//               ? "border-red-500 bg-red-50/30"
//               : "border-gray-200 hover:border-indigo-300"
//           }`}
//         />
//       </div>
//       {hasError && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
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
//   const [showRequirements, setShowRequirements] = useState(false);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [loading, setLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState<InputFieldName | null>(null);
//   const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
//     score: 0,
//     label: "Very Weak",
//     color: "bg-red-500",
//     percentage: 0,
//   });

//   // Calculate password strength whenever password changes
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

//       let score = 0;
//       const requirements = {
//         length: password.length >= 8,
//         lowercase: /[a-z]/.test(password),
//         uppercase: /[A-Z]/.test(password),
//         numbers: /[0-9]/.test(password),
//         special: /[^A-Za-z0-9]/.test(password),
//       };

//       if (requirements.length) score++;
//       if (password.length >= 12) score++;
//       if (requirements.lowercase) score++;
//       if (requirements.uppercase) score++;
//       if (requirements.numbers) score++;
//       if (requirements.special) score++;

//       score = Math.min(score, 6);

//       let label, color, percentage;
//       switch (score) {
//         case 0:
//           label = "Very Weak";
//           color = "bg-red-500";
//           percentage = 0;
//           break;
//         case 1:
//           label = "Weak";
//           color = "bg-red-400";
//           percentage = 20;
//           break;
//         case 2:
//           label = "Fair";
//           color = "bg-yellow-500";
//           percentage = 40;
//           break;
//         case 3:
//           label = "Good";
//           color = "bg-yellow-400";
//           percentage = 60;
//           break;
//         case 4:
//           label = "Strong";
//           color = "bg-green-400";
//           percentage = 80;
//           break;
//         case 5:
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
//     const password = passwordGenerator();
//     handleChange("password", password);
//   };

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!values.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!values.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(values.email))
//       newErrors.email = "Invalid email format";
//     if (!values.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!values.password.trim()) newErrors.password = "Password is required";
//     else if (values.password.length < 8)
//       newErrors.password = "Password must be at least 8 characters";
//     else if (passwordStrength.score < 2)
//       newErrors.password = "Please choose a stronger password";
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
//       const response = await axios.post(`${API_URL}/api/users/create`, values);
//       setLoading(false);

//       await Swal.fire({
//         icon: "success",
//         title: "Account Created!",
//         html: `
//           <p>Your account has been created successfully.</p>
//           <p class="text-gray-500 text-sm mt-2">
//             Please check your email to verify your account.
//           </p>
//         `,
//         confirmButtonText: "Go to Login",
//         confirmButtonColor: "#4f46e5",
//         background: "#ffffff",
//         color: "#1f2937",
//       });

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
//       router.push("/login");
//     } catch (err: any) {
//       console.error("Registration Error:", err);
//       await Swal.fire({
//         icon: "error",
//         title: "Registration Failed",
//         text:
//           err.response?.data?.message ||
//           "Something went wrong. Please try again.",
//         confirmButtonColor: "#4f46e5",
//       });
//     } finally {
//       setLoading(false);
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
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
     

//       <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-4xl"
//         >
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//             <div className="p-6 sm:p-8">
//               {/* Header */}
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl mb-3">
//                   <HiSparkles className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Create Your Account
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Join PassATS and create your professional resume
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Name Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

//                 {/* Password Field */}
//                 <div className="mb-4">
//                   <div className="flex justify-between items-center mb-1.5">
//                     <label className="text-sm font-semibold text-gray-700">
//                       Password <span className="text-indigo-500">*</span>
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
//                       >
//                         {passwordStrength.label}
//                       </span>
//                       <span className="text-xs text-gray-400">
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
//                         <FiLock className="w-4 h-4" />
//                       </div>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         value={values.password}
//                         onChange={(e) => handleChange("password", e.target.value)}
//                         onFocus={() => setFocusedField("password")}
//                         onBlur={() => setFocusedField(null)}
//                         placeholder="Create a strong password"
//                         className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-200 ${
//                           focusedField === "password"
//                             ? "border-indigo-500 ring-2 ring-indigo-100"
//                             : errors.password
//                             ? "border-red-500 bg-red-50/30"
//                             : "border-gray-200 hover:border-indigo-300"
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
//                       >
//                         {showPassword ? (
//                           <FiEyeOff className="w-4 h-4" />
//                         ) : (
//                           <FiEye className="w-4 h-4" />
//                         )}
//                       </button>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={generatePassword}
//                       className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
//                       title="Generate strong password"
//                     >
//                       <FiRefreshCw className="w-4 h-4" />
//                     </button>
//                   </div>

                  

//                   {/* Show/Hide Requirements Toggle */}
//                   <button
//                     type="button"
//                     onClick={() => setShowRequirements(!showRequirements)}
//                     className="mt-2 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
//                   >
//                     {showRequirements ? (
//                       <FiChevronUp className="w-3 h-3" />
//                     ) : (
//                       <FiChevronDown className="w-3 h-3" />
//                     )}
//                     {showRequirements
//                       ? "Hide password requirements"
//                       : "Show password requirements"}
//                   </button>

//                   {/* Password Requirements */}
//                   {showRequirements && (
//                     <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                       <h4 className="text-xs font-semibold text-gray-700 mb-2">
//                         Password Requirements:
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         {passwordRequirements.map((req, index) => (
//                           <div key={index} className="flex items-center gap-2">
//                             {req.met ? (
//                               <FiCheck className="w-3 h-3 text-emerald-500" />
//                             ) : (
//                               <FiAlertCircle className="w-3 h-3 text-gray-300" />
//                             )}
//                             <span
//                               className={`text-xs ${req.met ? "text-emerald-600 font-medium" : "text-gray-500"}`}
//                             >
//                               {req.label}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {errors.password && (
//                     <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                   )}
//                 </div>

//                 {/* Location Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                   <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
//                     <p className="text-red-600 text-sm">{errors.general}</p>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Creating Account...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>

//                 {/* Back to Login */}
//                 <div className="mt-6 text-center">
//                   <button
//                     type="button"
//                     onClick={() => router.push("/login")}
//                     className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm inline-flex items-center gap-1 group cursor-pointer"
//                   >
//                     <FiArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
//                     Back to Login
//                   </button>
//                 </div>

              

//                 {/* Terms & Privacy */}
//                 <div className="mt-4 text-center">
//                   <p className="text-xs text-gray-400">
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
//     </div>
//   );
// }













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
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/app/config/api";
import Link from "next/link";
import { passwordGenerator, sanitizeNumber } from "@/app/utils";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

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
      {hasError && <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs mt-1">{errors[name]}</p>}
    </div>
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
  const [showRequirements, setShowRequirements] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<InputFieldName | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Very Weak",
    color: "bg-red-500",
    percentage: 0,
  });

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

  const generatePassword = () => {
    const password = passwordGenerator();
    handleChange("password", password);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.firstName.trim()) newErrors.firstName = "First name is required";
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
      const response = await axios.post(`${API_URL}/api/users/create`, values);
      setLoading(false);

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        html: `
          <p>Your account has been created successfully.</p>
          <p class="text-gray-500 text-sm mt-2">
            Please check your email to verify your account.
          </p>
        `,
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
      });

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
      router.push("/login");
    } catch (err: any) {
      console.error("Registration Error:", err);
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setLoading(false);
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
    { label: "At least 12 characters (extra strength)", met: values.password.length <= 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                {/* Password Field */}
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
                        onChange={(e) => handleChange("password", e.target.value)}
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
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-indigo-50 text-indigo-600 rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      title="Generate strong password"
                    >
                      <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Show/Hide Requirements Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowRequirements(!showRequirements)}
                    className="mt-1.5 sm:mt-2 flex items-center gap-1 text-[9px] sm:text-[10px] text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                  >
                    {showRequirements ? (
                      <FiChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    ) : (
                      <FiChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    )}
                    {showRequirements
                      ? "Hide password requirements"
                      : "Show password requirements"}
                  </button>

                  {/* Password Requirements */}
                  {showRequirements && (
                    <div className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                      <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Password Requirements:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {passwordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                            {req.met ? (
                              <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                            ) : (
                              <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" />
                            )}
                            <span
                              className={`text-[8px] sm:text-[9px] md:text-[10px] ${req.met ? "text-emerald-600 font-medium" : "text-gray-500"}`}
                            >
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-[9px] sm:text-[10px] mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Location Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
                    <p className="text-red-600 text-[11px] sm:text-xs">{errors.general}</p>
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
                  <p className="text-[8px] sm:text-[9px] md:text-[12px] text-gray-400">
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
    </div>
  );
}