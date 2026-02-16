'use client';

import React from 'react';
import {
  FiShield,
  FiUser,
  FiDatabase,
  FiLock,
  FiShare2,
  FiRefreshCw,
  FiAlertCircle,
  FiMail,
  FiGlobe,
} from "react-icons/fi";

// Define TypeScript interface
interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

// Reusable Policy Section Component
const PolicySection = ({ icon, title, text }: PolicySectionProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg sm:text-xl md:text-2xl">
          {icon}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

const Policy = () => {
  // Policy sections data
  const policySections = [
    {
      id: 1,
      icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Overview",
      text: "This Privacy Policy explains how we collect, use, and protect your personal data when you use ARYU SmartCV. By accessing our platform, you agree to this Policy."
    },
    {
      id: 2,
      icon: <FiUser className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Information You Provide",
      text: "We collect information when you create an account, submit forms, respond to emails, upload content, or interact with our services."
    },
    {
      id: 3,
      icon: <FiDatabase className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Information Collected Automatically",
      text: "We collect device, browser, IP address, cookies, usage analytics, transaction data, and referral sources to improve your experience."
    },
    {
      id: 4,
      icon: <FiLock className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "How We Use Your Data",
      text: "We use your information to provide services, process payments, personalize content, improve features, prevent fraud, and comply with legal obligations."
    },
    {
      id: 5,
      icon: <FiShare2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Sharing of Data",
      text: "Your data may be shared with trusted service providers, payment processors, analytics partners, and legal authorities when required."
    },
    {
      id: 6,
      icon: <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Data Retention",
      text: "We retain personal data only as long as necessary to fulfill service obligations or meet legal requirements."
    },
    {
      id: 7,
      icon: <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Your Privacy Rights",
      text: "You may request access, correction, deletion, restriction, or objection to processing of your personal data."
    },
    {
      id: 8,
      icon: <FiGlobe className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Third-Party Links",
      text: "Our platform may contain external links. We are not responsible for third-party privacy practices."
    },
    {
      id: 9,
      icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
      title: "Contact Us",
      text: "For any privacy-related questions, please contact our support team at support@aryusmartcv.com"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-red-50/50 to-white min-h-screen">
      <div className="p-4 sm:p-6 md:p-12 lg:p-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters. Learn how ARYU SmartCV collects, uses, and
            protects your personal information.
          </p>
        </section>

        {/* Policy Card */}
        <section className="max-w-4xl md:max-w-6xl mt-8 md:mt-10 mx-auto">
          <div className="bg-white/80 md:bg-white/70 backdrop-blur-xl border border-red-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm sm:shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Map through policy sections */}
            {policySections.map((section) => (
              <PolicySection
                key={section.id}
                icon={section.icon}
                title={section.title}
                text={section.text}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Policy;