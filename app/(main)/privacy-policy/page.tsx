// 'use client';

// import React from 'react';
// import {
//   FiShield,
//   FiUser,
//   FiDatabase,
//   FiLock,
//   FiShare2,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiMail,
//   FiGlobe,
// } from "react-icons/fi";

// // Define TypeScript interface
// interface PolicySectionProps {
//   icon: React.ReactNode;
//   title: string;
//   text: string;
// }

// // Reusable Policy Section Component
// const PolicySection = ({ icon, title, text }: PolicySectionProps) => {
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
//       <div className="flex-shrink-0">
//         <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg sm:text-xl md:text-2xl">
//           {icon}
//         </div>
//       </div>

//       <div className="flex-1">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
//           {title}
//         </h2>
//         <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//           {text}
//         </p>
//       </div>
//     </div>
//   );
// };

// const Policy = () => {
//   // Policy sections data
//   const policySections = [
//     {
//       id: 1,
//       icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Overview",
//       text: "This Privacy Policy explains how we collect, use, and protect your personal data when you use ARYU SmartCV. By accessing our platform, you agree to this Policy."
//     },
//     {
//       id: 2,
//       icon: <FiUser className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Information You Provide",
//       text: "We collect information when you create an account, submit forms, respond to emails, upload content, or interact with our services."
//     },
//     {
//       id: 3,
//       icon: <FiDatabase className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Information Collected Automatically",
//       text: "We collect device, browser, IP address, cookies, usage analytics, transaction data, and referral sources to improve your experience."
//     },
//     {
//       id: 4,
//       icon: <FiLock className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "How We Use Your Data",
//       text: "We use your information to provide services, process payments, personalize content, improve features, prevent fraud, and comply with legal obligations."
//     },
//     {
//       id: 5,
//       icon: <FiShare2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Sharing of Data",
//       text: "Your data may be shared with trusted service providers, payment processors, analytics partners, and legal authorities when required."
//     },
//     {
//       id: 6,
//       icon: <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Data Retention",
//       text: "We retain personal data only as long as necessary to fulfill service obligations or meet legal requirements."
//     },
//     {
//       id: 7,
//       icon: <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Your Privacy Rights",
//       text: "You may request access, correction, deletion, restriction, or objection to processing of your personal data."
//     },
//     {
//       id: 8,
//       icon: <FiGlobe className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Third-Party Links",
//       text: "Our platform may contain external links. We are not responsible for third-party privacy practices."
//     },
//     {
//       id: 9,
//       icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Contact Us",
//       text: "For any privacy-related questions, please contact our support team at support@aryusmartcv.com"
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-r from-red-50/50 to-white min-h-screen">
//       <div className="p-4 sm:p-6 md:p-12 lg:p-20">
//         {/* Hero */}
//         <section className="text-center">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
//             Privacy Policy
//           </h1>
//           <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
//             Your privacy matters. Learn how ARYU SmartCV collects, uses, and
//             protects your personal information.
//           </p>
//         </section>

//         {/* Policy Card */}
//         <section className="max-w-4xl md:max-w-6xl mt-8 md:mt-10 mx-auto">
//           <div className="bg-white/80 md:bg-white/70 backdrop-blur-xl border border-red-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm sm:shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10 md:space-y-12">
//             {/* Map through policy sections */}
//             {policySections.map((section) => (
//               <PolicySection
//                 key={section.id}
//                 icon={section.icon}
//                 title={section.title}
//                 text={section.text}
//               />
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Policy;



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
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";

// Define TypeScript interface
interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  index: number;
}

// Reusable Policy Section Component
const PolicySection = ({ icon, title, text, index }: PolicySectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

const Policy = () => {
  // Policy sections data
  const policySections = [
    {
      id: 1,
      icon: <FiShield className="w-5 h-5" />,
      title: "Overview",
      text: "This Privacy Policy explains how we collect, use, and protect your personal data when you use ARYU SmartCV. By accessing our platform, you agree to this Policy."
    },
    {
      id: 2,
      icon: <FiUser className="w-5 h-5" />,
      title: "Information You Provide",
      text: "We collect information when you create an account, submit forms, respond to emails, upload content, or interact with our services."
    },
    {
      id: 3,
      icon: <FiDatabase className="w-5 h-5" />,
      title: "Information Collected Automatically",
      text: "We collect device, browser, IP address, cookies, usage analytics, transaction data, and referral sources to improve your experience."
    },
    {
      id: 4,
      icon: <FiLock className="w-5 h-5" />,
      title: "How We Use Your Data",
      text: "We use your information to provide services, process payments, personalize content, improve features, prevent fraud, and comply with legal obligations."
    },
    {
      id: 5,
      icon: <FiShare2 className="w-5 h-5" />,
      title: "Sharing of Data",
      text: "Your data may be shared with trusted service providers, payment processors, analytics partners, and legal authorities when required."
    },
    {
      id: 6,
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: "Data Retention",
      text: "We retain personal data only as long as necessary to fulfill service obligations or meet legal requirements."
    },
    {
      id: 7,
      icon: <FiAlertCircle className="w-5 h-5" />,
      title: "Your Privacy Rights",
      text: "You may request access, correction, deletion, restriction, or objection to processing of your personal data."
    },
    {
      id: 8,
      icon: <FiGlobe className="w-5 h-5" />,
      title: "Third-Party Links",
      text: "Our platform may contain external links. We are not responsible for third-party privacy practices."
    },
    {
      id: 9,
      icon: <FiMail className="w-5 h-5" />,
      title: "Contact Us",
      text: "For any privacy-related questions, please contact our support team at support@aryusmartcv.com"
    }
  ];

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50/20">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full filter blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <FiInfo className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Privacy Policy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Your privacy matters. Learn how ARYU SmartCV collects, uses, and
            protects your personal information.
          </p>
        </div>

       

        {/* Policy Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
            <p className="text-indigo-100 text-sm mt-1">How we handle your data</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6 divide-y divide-gray-100">
            {policySections.map((section, idx) => (
              <div key={section.id} className={idx > 0 ? "pt-6" : ""}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {section.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Have questions about our Privacy Policy?</h3>
          <p className="text-sm text-gray-500 mb-4">Contact our privacy team for assistance</p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Contact Support
            <FiMail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Policy;