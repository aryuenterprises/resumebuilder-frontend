"use client";

import { useState, FormEvent } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaEnvelope,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaComment,
} from "react-icons/fa";
import { FiSend, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { API_URL } from "@/app/config/api";
import { sanitizeText } from "@/app/utils";
import { motion } from "framer-motion";

import Link from "next/link";

// Define TypeScript interfaces
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  mobileNum?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  source: string;
  phone: string | undefined;
}

const ContactPage = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobileNum, setMobileNum] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!mobileNum) {
      newErrors.mobileNum = "Mobile number is required";
    }

    if (!message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData: FormData = {
        name: name,
        email: email,
        message: message,
        source: "resume",
        phone: mobileNum,
      };

      await axios.post(
        `https://aylms.aryuprojects.com/api/lead/submit/`,
        formData,
      );

      Swal.fire({
        icon: "success",
        title: "Message sent successfully!",
        text: "Our team will contact you shortly.",
        confirmButtonText: "Done",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-2xl",
        },
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setMobileNum("");
      setErrors({});
    } catch (err: any) {
      console.error("Error submitting form:", err);

      Swal.fire({
        icon: "error",
        title: "Message sending failed",
        text: err.response?.data?.message || "Please try again later.",
        confirmButtonText: "OK",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-2xl",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "passats@aryuacademy.com",
      description: "Send us an email",
    },
    {
      icon: FaClock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Fast response guaranteed",
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office",
      value: "Remote First",
      description: "Global team",
    },
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-64 sm:w-80 h-64 sm:h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4">
              <FaEnvelope className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Get in Touch
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Let's build your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                career
              </span>{" "}
              together
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
              Need help with PassATS? Our support team is ready to assist you.
              Send us a message and we'll respond within 24 hours.
            </p>

            {/* Contact Info Cards */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
                    <info.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rotate-90 text-indigo-600" />
                  </div>
                  {info.title === "Email" ? (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {info.title}
                      </p>
                      <a
                        href={`mailto:${info.value}`}
                        className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900 break-words hover:underline"
                      >
                        {info.value}
                      </a>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
                        {info.description}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {info.title}
                      </p>
                      <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900 break-words">
                        {info.value}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
                        {info.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-8">
              <div className="text-center mb-5 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Send us a message
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1">
                  We'll get back to you within 24 hours
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
                noValidate
              >
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(sanitizeText(e.target.value))}
                      placeholder="Your name"
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute rotate-90 left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <input
                      type="tel"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={mobileNum}
                      onChange={(e) => setMobileNum(e.target.value)}
                      placeholder="1234567890"
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base ${
                        errors.mobileNum
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.mobileNum && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                      {errors.mobileNum}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-2.5 sm:top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={4}
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none resize-none text-sm sm:text-base ${
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-2.5 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Privacy Note */}
                <p className="text-[9px] sm:text-xs text-gray-400 text-center">
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;









// "use client";

// import { useState, FormEvent, useRef } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// import {
//   FaEnvelope,
//   FaClock,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaUser,
//   FaComment,
// } from "react-icons/fa";
// import { FiSend, FiCheckCircle, FiArrowRight } from "react-icons/fi";
// import { API_URL } from "@/app/config/api";
// import { sanitizeText } from "@/app/utils";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Turnstile } from "@marsidev/react-turnstile"; // 👈 ADD THIS
// import type { TurnstileInstance } from "@marsidev/react-turnstile"; // 👈 ADD THIS

// // Define TypeScript interfaces
// interface FormErrors {
//   name?: string;
//   email?: string;
//   message?: string;
//   mobileNum?: string;
// }

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
//   source: string;
//   phone: string | undefined;
// }

// const ContactPage = () => {
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [mobileNum, setMobileNum] = useState<string | undefined>();
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // 👈 ADD THESE STATE VARIABLES
//   const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
//   const turnstileRef = useRef<TurnstileInstance | null>(null);

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!mobileNum) {
//       newErrors.mobileNum = "Mobile number is required";
//     }

//     if (!message.trim()) {
//       newErrors.message = "Message cannot be empty";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     // 👈 ADD TURNSTILE TOKEN CHECK
//     if (!turnstileToken) {
//       Swal.fire({
//         icon: "warning",
//         title: "Verification Required",
//         text: "Please complete the security check before submitting.",
//         confirmButtonText: "OK",
//         confirmButtonColor: "#4f46e5",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formData: FormData = {
//         name: name,
//         email: email,
//         message: message,
//         source: "resume",
//         phone: mobileNum,
//       };

//       // 👈 MODIFY THIS - Send both form data AND turnstile token
//       const response = await axios.post(
//         `https://aylms.aryuprojects.com/api/lead/submit/`,
//         {
//           ...formData,
//           turnstileToken: turnstileToken, // Send token to your backend
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Message sent successfully!",
//         text: "Our team will contact you shortly.",
//         confirmButtonText: "Done",
//         confirmButtonColor: "#4f46e5",
//         background: "#ffffff",
//         color: "#1f2937",
//         customClass: {
//           popup: "rounded-2xl",
//         },
//       });

//       // Reset form
//       setName("");
//       setEmail("");
//       setMessage("");
//       setMobileNum("");
//       setErrors({});
//       setTurnstileToken(null); // 👈 Clear token
//       turnstileRef.current?.reset(); // 👈 Reset Turnstile widget

//     } catch (err: any) {
//       console.error("Error submitting form:", err);

//       // 👈 CHECK IF ERROR IS FROM TURNSTILE VERIFICATION
//       if (err.response?.status === 403) {
//         Swal.fire({
//           icon: "error",
//           title: "Security Check Failed",
//           text: "Our system detected suspicious activity. Please refresh and try again.",
//           confirmButtonText: "OK",
//           confirmButtonColor: "#4f46e5",
//         });
//         turnstileRef.current?.reset(); // Reset for retry
//         setTurnstileToken(null);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Message sending failed",
//           text: err.response?.data?.message || "Please try again later.",
//           confirmButtonText: "OK",
//           confirmButtonColor: "#4f46e5",
//           background: "#ffffff",
//           color: "#1f2937",
//           customClass: {
//             popup: "rounded-2xl",
//           },
//         });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: FaEnvelope,
//       title: "Email",
//       value: "passats@aryuacademy.com",
//       description: "Send us an email",
//     },
//     {
//       icon: FaClock,
//       title: "Response Time",
//       value: "Within 24 hours",
//       description: "Fast response guaranteed",
//     },
//     {
//       icon: FaPhone,
//       title: "Phone",
//       value: "+1 (555) 123-4567",
//       description: "Mon-Fri, 9AM-6PM",
//     },
//     {
//       icon: FaMapMarkerAlt,
//       title: "Office",
//       value: "Remote First",
//       description: "Global team",
//     },
//   ];

//   return (
//     <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute -top-24 -right-24 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
//       <div className="absolute bottom-0 -left-24 w-64 sm:w-80 h-64 sm:h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4">
//               <FaEnvelope className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
//               <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 Get in Touch
//               </span>
//             </div>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//               Let's build your{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                 career
//               </span>{" "}
//               together
//             </h1>

//             <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
//               Need help with PassATS? Our support team is ready to assist you.
//               Send us a message and we'll respond within 24 hours.
//             </p>

//             {/* Contact Info Cards */}
//             <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {contactInfo.map((info, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
//                     <info.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rotate-90 text-indigo-600" />
//                   </div>
//                   {info.title === "Email" ? (
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-gray-500">
//                         {info.title}
//                       </p>
//                       <a
//                         href={`mailto:${info.value}`}
//                         className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900 break-words hover:underline"
//                       >
//                         {info.value}
//                       </a>
//                       <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
//                         {info.description}
//                       </p>
//                     </div>
//                   ) : (
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-gray-500">
//                         {info.title}
//                       </p>
//                       <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900 break-words">
//                         {info.value}
//                       </p>
//                       <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
//                         {info.description}
//                       </p>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-8">
//               <div className="text-center mb-5 sm:mb-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   Send us a message
//                 </h2>
//                 <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1">
//                   We'll get back to you within 24 hours
//                 </p>
//               </div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-4 sm:space-y-5"
//                 noValidate
//               >
//                 {/* Name */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(sanitizeText(e.target.value))}
//                       placeholder="Your name"
//                       className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base ${
//                         errors.name
//                           ? "border-red-500 focus:border-red-500 focus:ring-red-100"
//                           : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       }`}
//                     />
//                   </div>
//                   {errors.name && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1">
//                       {errors.name}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base ${
//                         errors.email
//                           ? "border-red-500 focus:border-red-500 focus:ring-red-100"
//                           : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       }`}
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1">
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Mobile Number */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
//                     Mobile Number
//                   </label>
//                   <div className="relative">
//                     <FaPhone className="absolute rotate-90 left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                     <input
//                       type="tel"
//                       pattern="[0-9]*"
//                       inputMode="numeric"
//                       value={mobileNum}
//                       onChange={(e) => setMobileNum(e.target.value)}
//                       placeholder="1234567890"
//                       className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base ${
//                         errors.mobileNum
//                           ? "border-red-500 focus:border-red-500 focus:ring-red-100"
//                           : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       }`}
//                     />
//                   </div>
//                   {errors.mobileNum && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1">
//                       {errors.mobileNum}
//                     </p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
//                     Message
//                   </label>
//                   <div className="relative">
//                     <FaComment className="absolute left-3 top-2.5 sm:top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder="Tell us how we can help..."
//                       rows={4}
//                       className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none resize-none text-sm sm:text-base ${
//                         errors.message
//                           ? "border-red-500 focus:border-red-500 focus:ring-red-100"
//                           : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       }`}
//                     />
//                   </div>
//                   {errors.message && (
//                     <p className="text-red-500 text-[10px] sm:text-xs mt-1">
//                       {errors.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* 👈 ADD TURNSTILE WIDGET HERE */}
//                 <div className="flex justify-center py-2">
//                   <Turnstile
//                     ref={turnstileRef}
//                     siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
//                       options={{ theme: "light" }}  // 👈 Pass theme inside options object
//                     onSuccess={(token) => {
//                       console.log("Turnstile verified successfully");
//                       setTurnstileToken(token);
//                     }}
//                     onError={() => {
//                       console.log("Turnstile error");
//                       setTurnstileToken(null);
//                     }}
//                     onExpire={() => {
//                       console.log("Turnstile token expired");
//                       setTurnstileToken(null);
//                     }}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !turnstileToken}
//                   className="group w-full py-2.5 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       <span className="text-xs sm:text-sm">Sending...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Send Message</span>
//                       <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
//                     </>
//                   )}
//                 </button>

//                 {/* Privacy Note */}
//                 <p className="text-[9px] sm:text-xs text-gray-400 text-center">
//                   By submitting this form, you agree to our{" "}
//                   <Link
//                     href="/privacy-policy"
//                     className="text-indigo-600 hover:underline cursor-pointer"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactPage;
