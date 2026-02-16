'use client';

import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEnvelope, FaClock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { API_URL } from '@/app/config/api';
import { sanitizeText } from '@/app/utils';

// Define TypeScript interfaces
interface FormErrors {
  firstName?: string;
  email?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Hero = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); // Note: This is actually email in your form
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);



  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Name is required';
    }

    if (!lastName.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(lastName)) {
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
        name: firstName,
        email: lastName,
        message: message,
      };

      await axios.post(`${API_URL}/api/contacts/create`, formData);

      Swal.fire({
        icon: 'success',
        title: 'Message sent successfully!',
        text: 'Our team will contact you shortly.',
        confirmButtonText: 'Done',
        confirmButtonColor: '#c40116',
        background: '#ffffff',
        color: '#1f2937',
      });

      // Reset form
      setFirstName('');
      setLastName('');
      setMessage('');
      setErrors({});
    } catch (err: any) {
      console.error('Error submitting form:', err);
      
      Swal.fire({
        icon: 'error',
        title: 'Message sending failed',
        text: err.response?.data?.message || 'Please try again later.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#c40116',
        background: '#ffffff',
        color: '#1f2937',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 bg-gradient-to-b from-white to-gray-50/30">
      {/* Ambient glow - Responsive */}
      <div className="absolute bottom-0 -right-20 sm:-right-32 md:-right-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#c40116]/5 sm:bg-[#c40116]/7 md:bg-[#c40116]/10 rounded-full blur-3xl sm:blur-[100px] md:blur-[120px] lg:blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <span className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
            Get in Touch
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-extrabold leading-tight text-gray-900">
            Let&apos;s build your <span className="text-[#c40116]">career</span>{' '}
            together
          </h1>

          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
            Need help with ARYU SmartCV? Our support team is ready to assist
            you. Send us a message and we&apos;ll respond within 24 hours.
          </p>

          {/* Contact Info - Mobile Only */}
          <div className="mt-6 sm:mt-8 lg:hidden space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Email</p>
                <p className="text-sm text-gray-600">support@aryusmartcv.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
                <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Response Time
                </p>
                <p className="text-sm text-gray-600">Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Phone</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:block mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-6 h-6 text-[#c40116]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600">support@aryusmartcv.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
                <FaClock className="w-6 h-6 text-[#c40116]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Response Time</p>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c40116]/10 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="w-6 h-6 text-[#c40116]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Office Hours</p>
                <p className="text-gray-600">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Glass Form */}
        <div className="order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 sm:bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 sm:border-white/60 p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
            noValidate
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Send us a message
            </h2>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium sm:font-semibold mb-2 text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(sanitizeText(e.target.value))}
                placeholder="Your name"
                className="w-full px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 transition-all shadow-sm outline-none focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] text-sm sm:text-base bg-gray-50 focus:bg-white"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? 'name-error' : undefined}
              />
              {errors.firstName && (
                <p id="name-error" className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium sm:font-semibold mb-2 text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] outline-none transition-all shadow-sm text-sm sm:text-base bg-gray-50 focus:bg-white"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium sm:font-semibold mb-2 text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help..."
                className="w-full h-32 sm:h-40 px-4 py-3 sm:px-4 sm:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c40116]/20 focus:border-[#c40116] transition-all shadow-sm outline-none resize-none text-sm sm:text-base bg-gray-50 focus:bg-white"
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg sm:shadow-xl hover:shadow-2xl transition-all active:scale-95 text-sm sm:text-base md:text-lg ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our{' '}
              <a href="/privacy-policy" className="text-[#c40116] hover:underline">
                Privacy Policy
              </a>
              . We'll never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;