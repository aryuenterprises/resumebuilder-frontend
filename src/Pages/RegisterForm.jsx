import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
import { use } from "framer-motion/m";
import { API_URL } from "../Config";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function RegisterForm() {
    const nagivate = useNavigate();

     const clickdlogin = (e) => {
      e.preventDefault();
        nagivate('/loging');

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

  
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    state: "",
    country: "",

  });

  console.log("values", values)

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isValid = (val, field) => val.trim() !== "" && touched[field];

  const validateForm = () => {
    const newErrors = {};

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
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

    return Object.keys(newErrors).length === 0; // ✅ returns true if no errors
  };



  const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);


  // Handle Form Submit
  const handlesubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }
  setLoading(true); 
  try {
    const response = await axios.post(`${API_URL}/api/users/create`, values);
    console.log("response:", response);
      setLoading(false);

    // Success message + email confirmation instruction
    Swal.fire({
      icon: "success",
      // title: "Successfull!",
      html: `
        <p>Your Account has been created successfully.</p>
        <p class="text-blue-500 font-semibold mt-2">
          Please check your Registered Email to verify your Account.
        </p>
      `,
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#05a2ff",
    }).then(() => {
      nagivate("/loging"); // redirect user to login page instead of going back
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
  } catch (err) {
     setLoading(false)
    console.error("Error:", err);
    Swal.fire({
      icon: "error",
      title: "Registration Failed!",
      text: err.response?.data?.message || "Something went wrong. Please try again.",
      confirmButtonColor: "#d33",
    });
  }
};

 

  return (

//     <div>
//       <Header />
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//         <form
//           className="bg-white w-full md:w-[70%] lg:w-[50%] border border-gray-200 rounded-2xl p-8 shadow-xl"
//         >
//           <h2 className="text-2xl font-bold text-center text-[#333] mb-8 font-nunito">
//             Register Form
//           </h2>

//           {/* Name Fields */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* First Name */}
//             <div className="w-full relative">
//               <label className="block text-gray-700 font-semibold mb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 value={values.firstName}
//                 onChange={(e) =>
//                   setValues({ ...values, firstName: e.target.value })
//                 }
//                 onBlur={() => handleBlur("firstName")}
//                 placeholder="Enter your first name"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {isValid(values.firstName, "firstName") && (
//                 <div className="absolute inset-y-0 right-3 flex items-center mt-6">
//                   <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                     <svg
//                       className="h-3 w-3 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

//             </div>


//             {/* Last Name */}
//             <div className="w-full relative">
//               <label className="block text-gray-700 font-semibold mb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 value={values.lastName}
//                 onChange={(e) =>
//                   setValues({ ...values, lastName: e.target.value })
//                 }
//                 onBlur={() => handleBlur("lastName")}
//                 placeholder="Enter your last name"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {isValid(values.lastName, "lastName") && (
//                 <div className="absolute inset-y-0 right-3 flex items-center mt-6">
//                   <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                     <svg
//                       className="h-3 w-3 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

//             </div>
//           </div>

//           {/* Email & Phone */}
//           <div className="flex flex-col md:flex-row gap-6 mt-6">
//             {/* Email */}
//             <div className="w-full relative">
//               <label className="block text-gray-700 font-semibold mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={values.email}
//                 onChange={(e) =>
//                   setValues({ ...values, email: e.target.value })
//                 }
//                 onBlur={() => handleBlur("email")}
//                 placeholder="Enter your email"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {isValid(values.email, "email") && (
//                 <div className="absolute inset-y-0 right-3 flex items-center mt-6">
//                   <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                     <svg
//                       className="h-3 w-3 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               {errors.email && <p className="text-red-500">{errors.email}</p>}

//             </div>

//             {/* Phone */}
//             <div className="w-full relative">
//               <label className="block text-gray-700 font-semibold mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 value={values.phone}
//                 onChange={(e) =>
//                   setValues({ ...values, phone: e.target.value })
//                 }
//                 onBlur={() => handleBlur("phone")}
//                 placeholder="Enter your phone number"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {isValid(values.phone, "phone") && (
//                 <div className="absolute inset-y-0 right-3 flex items-center mt-6">
//                   <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                     <svg
//                       className="h-3 w-3 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}

//               {errors.phone && <p className="text-red-500">{errors.phone}</p>}

//             </div>
//           </div>

//           {/* Password */}
//           <div className="mt-6 relative">
//             <label className="block text-gray-700 font-semibold mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={values.password}
//                 onChange={(e) =>
//                   setValues({ ...values, password: e.target.value })
//                 }
//                 onBlur={() => handleBlur("password")}
//                 placeholder="Enter your password"
//                 className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <div
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
//               </div>
//             </div>

//             {isValid(values.password, "password") && (
//               <div className="absolute inset-y-0 right-10 flex items-center mt-6">
//                 <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                   <svg
//                     className="h-3 w-3 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             )}
//                   {errors.password && <p className="text-red-500">{errors.password}</p>}

//           </div>

//           {/* City, State, Country */}
//           <div className="flex flex-col md:flex-row gap-6 mt-6">
//             {["city", "state", "country"].map((field) => (
//               <div className="w-full relative" key={field}>
//                 <label className="block text-gray-700 font-semibold mb-1 capitalize">
//                   {field}
//                 </label>
//                 <input
//                   type="text"
//                   value={values[field]}
//                   onChange={(e) =>
//                     setValues({ ...values, [field]: e.target.value })
//                   }
//                   onBlur={() => handleBlur(field)}
//                   placeholder={`Enter your ${field}`}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 {isValid(values[field], field) && (
//                   <div className="absolute inset-y-0 right-3 flex items-center mt-6">
//                     <div className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
//                       <svg
//                         className="h-3 w-3 text-white"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}

//                  {errors[field] && (
//         <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//       )}
//               </div>
//             ))}
//           </div>



//           {/* Submit */}
//           <div className="flex justify-center mt-8">
//             {/* <button
//               type="button"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-300"
//               onClick={handlesubmit}
//             >
//               Register
//             </button> */}

//             <button
//   type="button"
//   disabled={loading}
//   className={`${
//     loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//   } text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-300`}
//   onClick={handlesubmit}
// >
//   {loading ? "Please wait..." : "Register"}
// </button>
//           </div>
//                   <div className="mt-4 text-center">
//     <button
//       onClick={clickdlogin}
//       className="text-[#05a2ff] hover:underline font-semibold text-[16px] transition-all duration-200"
//     >
//       &larr; Go Back
//     </button>
//   </div>
//         </form>
//       </div>
//       <Footer />
//     </div>



<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
  <Header />
  <div className="flex-1 flex justify-center items-center p-4 sm:p-6">
    <div className="w-full max-w-4xl mt-5 md:mt-12">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
        {/* Header gradient accent */}
        <div className="h-1 sm:h-2 bg-gradient-to-r from-[#C40116] to-[#5E000B]"></div>
        
        <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40116] to-[#5E000B] bg-clip-text text-transparent mb-1 sm:mb-2">
              Create Your Account
            </h2>
          </div>

          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* First Name */}
            <div className="w-full">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                First Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={values.firstName}
                  onChange={(e) =>
                    setValues({ ...values, firstName: e.target.value })
                  }
                  onBlur={() => handleBlur("firstName")}
                  placeholder="Enter your first name"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.firstName, "firstName") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.firstName && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-full">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                Last Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={values.lastName}
                  onChange={(e) =>
                    setValues({ ...values, lastName: e.target.value })
                  }
                  onBlur={() => handleBlur("lastName")}
                  placeholder="Enter your last name"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.lastName, "lastName") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.lastName && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
            {/* Email */}
            <div className="w-full">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                Email
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  onBlur={() => handleBlur("email")}
                  placeholder="Enter your email"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.email, "email") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="w-full">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                Phone
              </label>
              <div className="relative group">
                <input
                  type="tel"
                  value={values.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                  onBlur={() => handleBlur("phone")}
                  placeholder="Enter your phone number"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.phone, "phone") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Password & City in same row */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
            {/* Password */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  className="w-full p-3 sm:p-4 pr-10 sm:pr-12 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C40116] transition-colors"
                >
                  {showPassword ? 
                    <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                    <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  }
                </button>
                {isValid(values.password, "password") && (
                  <div className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.password}</p>
              )}
            </div>

            {/* City */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                City
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={values.city}
                  onChange={(e) =>
                    setValues({ ...values, city: e.target.value })
                  }
                  onBlur={() => handleBlur("city")}
                  placeholder="Enter your city"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.city, "city") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.city && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.city}</p>
              )}
            </div>
          </div>

          {/* State & Country in same row */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
            {/* State */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                State
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={values.state}
                  onChange={(e) =>
                    setValues({ ...values, state: e.target.value })
                  }
                  onBlur={() => handleBlur("state")}
                  placeholder="Enter your state"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.state, "state") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.state && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.state}</p>
              )}
            </div>

            {/* Country */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-800 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                Country
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={values.country}
                  onChange={(e) =>
                    setValues({ ...values, country: e.target.value })
                  }
                  onBlur={() => handleBlur("country")}
                  placeholder="Enter your country"
                  className="w-full p-3 sm:p-4 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl bg-white shadow-sm focus:outline-none focus:border-[#C40116]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#C40116]/10 transition-all duration-300 group-hover:border-[#C40116]/30 text-sm sm:text-base"
                />
                {isValid(values.country, "country") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {errors.country && (
                <p className="text-[#C40116] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              type="button"
              disabled={loading}
              className={`${
                loading 
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-[#C40116] to-[#5E000B] hover:from-[#d6021a] hover:to-[#6e000c] shadow-lg shadow-red-500/30 hover:shadow-xl"
              } text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full md:w-auto`}
              onClick={handlesubmit}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : "Create Account"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={clickdlogin}
              className="text-[#C40116] hover:text-[#5E000B] font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </button>
          </div>

          {/* Terms & Privacy */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <span className="text-[#C40116] cursor-pointer hover:underline">Terms of Service</span>
              {' '}and{' '}
              <span className="text-[#C40116] cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>
  );
}
