import { API_URL } from "../../Config";
import Swal from "sweetalert2";
import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaClock, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactHero = () => {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Name is required";
    }

    if (!lastName.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(lastName)) {
      newErrors.email = "Invalid email format";
    }

    if (!message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = {
        name: firstName,
        email: lastName,
        message: message,
      };

      await axios.post(`${API_URL}/api/contacts/create`, formData);

      Swal.fire({
        icon: "success",
        title: "Message sent successfully!",
        text: "Our team will contact you shortly.",
        confirmButtonText: "Done",
      });

      setFirstName("");
      setLastName("");
      setMessage("");
      setErrors({});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Message sending failed",
        text: err.response?.data?.message || "Please try again later.",
      });
    }
  };

  return (
    // <section className="relative overflow-hidden py-24">
    //   {/* Ambient glow */}
    //   <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-[#c40116]/10 rounded-full blur-[140px]" />

    //   <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    //     {/* Left Content */}
    //     <div>
    //       <span className="inline-block mb-5 px-5 py-2 rounded-full text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
    //         Get in Touch
    //       </span>

    //       <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
    //         Let’s build your <span className="text-[#c40116]">career</span>{" "}
    //         together
    //       </h1>

    //       <p className="mt-6 text-lg text-slate-600 max-w-xl">
    //         Need help with ARYU Better CV? Our support team is ready to assist
    //         you. Send us a message and we’ll respond within 24 hours.
    //       </p>
    //     </div>

    //     {/* Glass Form */}
    //     <form
    //       onSubmit={handleSubmit}
    //       initial={{ opacity: 0, y: 80 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8 }}
    //       className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-md border border-white/60 p-10 space-y-8"
    //     >
    //       <h2 className="text-2xl font-bold text-slate-900">
    //         Send us a message
    //       </h2>

    //       {/* Name */}
    //       <div>
    //         <label className="block text-sm font-semibold mb-2">Name</label>
    //         <input
    //           type="text"
    //           value={firstName}
    //           onChange={(e) => setFirstName(e.target.value)}
    //           placeholder="Your name"
    //           className="w-full p-4 rounded-xl border border-gray-200  transition shadow-sm outline-none focus:ring-2 focus:ring-red-100 focus:border-red-100"
    //         />
    //         {errors.firstName && (
    //           <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
    //         )}
    //       </div>

    //       {/* Email */}
    //       <div>
    //         <label className="block text-sm font-semibold mb-2">Email</label>
    //         <input
    //           type="email"
    //           value={lastName}
    //           onChange={(e) => setLastName(e.target.value)}
    //           placeholder="you@example.com"
    //           className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-100 focus:border-red-100 outline-none transition shadow-sm"
    //         />
    //         {errors.email && (
    //           <p className="text-red-500 text-sm mt-1">{errors.email}</p>
    //         )}
    //       </div>

    //       {/* Message */}
    //       <div>
    //         <label className="block text-sm font-semibold mb-2">Message</label>
    //         <textarea
    //           value={message}
    //           onChange={(e) => setMessage(e.target.value)}
    //           placeholder="Tell us how we can help..."
    //           className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-100 focus:border-red-100 transition shadow-sm outline-none resize-none"
    //         />
    //         {errors.message && (
    //           <p className="text-red-500 text-sm mt-1">{errors.message}</p>
    //         )}
    //       </div>

    //       {/* Button */}
    //       <button
    //         type="submit"
    //         className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
    //       >
    //         Send Message
    //       </button>
    //     </form>
    //   </div>
    // </section>

    <section className="relative overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20">
      {/* Ambient glow - Responsive */}
      <div className="absolute bottom-0 -right-20 sm:-right-32 md:-right-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#c40116]/5 sm:bg-[#c40116]/7 md:bg-[#c40116]/10 rounded-full blur-3xl sm:blur-[100px] md:blur-[120px] lg:blur-[140px]" />

      <div className="relative mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="">
          <span className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
            Get in Touch
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-extrabold leading-tight">
            Let's build your <span className="text-[#c40116]">career</span>{" "}
            together
          </h1>

          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl">
            Need help with ARYU Better CV? Our support team is ready to assist
            you. Send us a message and we'll respond within 24 hours.
          </p>

          {/* Contact Info - Mobile Only */}
          <div className="mt-6 sm:mt-8  space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Email</p>
                <p className="text-sm text-slate-600">support@resumemint.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center">
                <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Response Time
                </p>
                <p className="text-sm text-slate-600">Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center">
                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Phone</p>
                <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:block mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center">
                <FaEnvelope className="w-6 h-6 text-[#c40116]" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Email</p>
                <p className="text-slate-600">support@resumemint.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center">
                <FaClock className="w-6 h-6 text-[#c40116]" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Response Time</p>
                <p className="text-slate-600">Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center">
                <FaMapMarkerAlt className="w-6 h-6 text-[#c40116]" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Office Hours</p>
                <p className="text-slate-600">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Glass Form */}
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 sm:bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 sm:border-white/60 p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Send us a message
            </h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium sm:font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 transition shadow-sm outline-none focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] text-sm sm:text-base bg-[#f7f9fc]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium sm:font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] outline-none transition shadow-sm text-sm sm:text-base bg-[#f7f9fc]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium sm:font-semibold mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help..."
                className="w-full h-32 sm:h-40 px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] transition shadow-sm outline-none resize-none text-sm sm:text-base bg-[#f7f9fc]"
                rows={4}
              />
              {errors.message && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg sm:shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95 text-sm sm:text-base md:text-lg"
            >
              Send Message
            </button>

         
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
