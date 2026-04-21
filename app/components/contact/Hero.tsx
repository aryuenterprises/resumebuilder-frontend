// 'use client';

// import { useState, FormEvent } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { FaEnvelope, FaClock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
// import { API_URL } from '@/app/config/api';
// import { sanitizeText } from '@/app/utils';

// // Define TypeScript interfaces
// interface FormErrors {
//   firstName?: string;
//   email?: string;
//   message?: string;
// }

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
// }

// const Hero = () => {
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState(''); // Note: This is actually email in your form
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);



//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!firstName.trim()) {
//       newErrors.firstName = 'Name is required';
//     }

//     if (!lastName.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(lastName)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!message.trim()) {
//       newErrors.message = 'Message cannot be empty';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);

//     try {
//       const formData: FormData = {
//         name: firstName,
//         email: lastName,
//         message: message,
//       };

//       await axios.post(`${API_URL}/api/contacts/create`, formData);

//       Swal.fire({
//         icon: 'success',
//         title: 'Message sent successfully!',
//         text: 'Our team will contact you shortly.',
//         confirmButtonText: 'Done',
//         confirmButtonColor: '#c40116',
//         background: '#ffffff',
//         color: '#1f2937',
//       });

//       // Reset form
//       setFirstName('');
//       setLastName('');
//       setMessage('');
//       setErrors({});
//     } catch (err: any) {
//       console.error('Error submitting form:', err);
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Message sending failed',
//         text: err.response?.data?.message || 'Please try again later.',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#c40116',
//         background: '#ffffff',
//         color: '#1f2937',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="relative overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 bg-gradient-to-b from-white to-gray-50/30">
//       {/* Ambient glow - Responsive */}
//       <div className="absolute bottom-0 -right-20 sm:-right-32 md:-right-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#c40116]/5 sm:bg-[#c40116]/7 md:bg-[#c40116]/10 rounded-full blur-3xl sm:blur-[100px] md:blur-[120px] lg:blur-[140px] pointer-events-none" />

//       <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
//         {/* Left Content */}
//         <div className="order-2 lg:order-1">
//           <span className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
//             Get in Touch
//           </span>

//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-extrabold leading-tight text-gray-900">
//             Let&apos;s build your <span className="text-[#c40116]">career</span>{' '}
//             together
//           </h1>

//           <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
//             Need help with ARYU SmartCV? Our support team is ready to assist
//             you. Send us a message and we&apos;ll respond within 24 hours.
//           </p>

//           {/* Contact Info - Mobile Only */}
//           <div className="mt-6 sm:mt-8 lg:hidden space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
//                 <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Email</p>
//                 <p className="text-sm text-gray-600">support@aryusmartcv.com</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
//                 <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   Response Time
//                 </p>
//                 <p className="text-sm text-gray-600">Within 24 hours</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
//                 <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Phone</p>
//                 <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Info - Desktop */}
//           <div className="hidden lg:block mt-8 space-y-6">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
//                 <FaEnvelope className="w-6 h-6 text-[#c40116]" />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-800">Email</p>
//                 <p className="text-gray-600">support@aryusmartcv.com</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
//                 <FaClock className="w-6 h-6 text-[#c40116]" />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-800">Response Time</p>
//                 <p className="text-gray-600">Within 24 hours</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
//                 <FaMapMarkerAlt className="w-6 h-6 text-[#c40116]" />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-800">Office Hours</p>
//                 <p className="text-gray-600">Mon-Fri, 9AM-6PM EST</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Glass Form */}
//         <div className="order-1 lg:order-2">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white/80 sm:bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 sm:border-white/60 p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
//             noValidate
//           >
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Send us a message
//             </h2>

//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium sm:font-semibold mb-2 text-gray-700"
//               >
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => setFirstName(sanitizeText(e.target.value))}
//                 placeholder="Your name"
//                 className="w-full px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 transition-all shadow-sm outline-none focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] text-sm sm:text-base bg-gray-50 focus:bg-white"
//                 aria-invalid={!!errors.firstName}
//                 aria-describedby={errors.firstName ? 'name-error' : undefined}
//               />
//               {errors.firstName && (
//                 <p id="name-error" className="text-red-500 text-xs sm:text-sm mt-1">
//                   {errors.firstName}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium sm:font-semibold mb-2 text-gray-700"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] outline-none transition-all shadow-sm text-sm sm:text-base bg-gray-50 focus:bg-white"
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? 'email-error' : undefined}
//               />
//               {errors.email && (
//                 <p id="email-error" className="text-red-500 text-xs sm:text-sm mt-1">
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Message */}
//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium sm:font-semibold mb-2 text-gray-700"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Tell us how we can help..."
//                 className="w-full h-32 sm:h-40 px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] transition-all shadow-sm outline-none resize-none text-sm sm:text-base bg-gray-50 focus:bg-white"
//                 rows={4}
//                 aria-invalid={!!errors.message}
//                 aria-describedby={errors.message ? 'message-error' : undefined}
//               />
//               {errors.message && (
//                 <p id="message-error" className="text-red-500 text-xs sm:text-sm mt-1">
//                   {errors.message}
//                 </p>
//               )}
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg sm:shadow-xl hover:shadow-2xl transition-all active:scale-95 text-sm sm:text-base md:text-lg ${
//                 isSubmitting
//                   ? 'opacity-70 cursor-not-allowed'
//                   : 'hover:-translate-y-0.5'
//               }`}
//             >
//               {isSubmitting ? 'Sending...' : 'Send Message'}
//             </button>

//             {/* Privacy Note */}
//             <p className="text-xs text-gray-500 text-center mt-4">
//               By submitting this form, you agree to our{' '}
//               <a href="/privacy-policy" className="text-[#c40116] hover:underline">
//                 Privacy Policy
//               </a>
//               . We'll never share your information.
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


'use client';

import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEnvelope, FaClock, FaPhone, FaMapMarkerAlt, FaUser, FaComment } from 'react-icons/fa';
import { FiSend, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { API_URL } from '@/app/config/api';
import { sanitizeText } from '@/app/utils';
import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!message.trim()) {
      newErrors.message = 'Message cannot be empty';
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
      };

      await axios.post(`${API_URL}/api/contacts/create`, formData);

      Swal.fire({
        icon: 'success',
        title: 'Message sent successfully!',
        text: 'Our team will contact you shortly.',
        confirmButtonText: 'Done',
        confirmButtonColor: '#4f46e5',
        background: '#ffffff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl',
        },
      });

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (err: any) {
      console.error('Error submitting form:', err);
      
      Swal.fire({
        icon: 'error',
        title: 'Message sending failed',
        text: err.response?.data?.message || 'Please try again later.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4f46e5',
        background: '#ffffff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl',
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
      value: "support@aryusmartcv.com",
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
    <section className="relative bg-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
              <FaEnvelope className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Get in Touch
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Let's build your{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                career
              </span>{' '}
              together
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
              Need help with ARYU SmartCV? Our support team is ready to assist you. 
              Send us a message and we'll respond within 24 hours.
            </p>

            {/* Contact Info Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <info.icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{info.title}</p>
                    <p className="text-sm font-semibold text-gray-900">{info.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{info.description}</p>
                  </div>
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(sanitizeText(e.target.value))}
                      placeholder="Your name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={4}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none resize-none ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Privacy Note */}
                <p className="text-xs text-gray-400 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy-policy" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </a>
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