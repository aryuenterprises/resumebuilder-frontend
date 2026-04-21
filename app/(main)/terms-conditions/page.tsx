// 'use client';

// import React from 'react';
// import {
//   FiFileText,
//   FiUser,
//   FiCreditCard,
//   FiShield,
//   FiAlertTriangle,
//   FiLock,
//   FiRefreshCw,
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

// const TermsPage = () => {
//   // Policy sections data
//   const policySections = [
//     {
//       id: 1,
//       icon: <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Acceptance of Terms",
//       text: "By using ARYU SmartCV, you agree to these Terms and all applicable policies. If you do not agree, please discontinue using the platform immediately."
//     },
//     {
//       id: 2,
//       icon: <FiUser className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "User Account & Registration",
//       text: "You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials."
//     },
//     {
//       id: 3,
//       icon: <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Subscription & Payments",
//       text: "Some features require a paid subscription. All billing is handled securely and subscriptions renew automatically unless cancelled."
//     },
//     {
//       id: 4,
//       icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Use of Service",
//       text: "You may use ARYU SmartCV for personal and professional resume creation. Any illegal, abusive, or unauthorized use is strictly prohibited."
//     },
//     {
//       id: 5,
//       icon: <FiLock className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Privacy & Data Protection",
//       text: "We respect your privacy and comply with applicable Indian data protection laws. Your information is securely stored and used only to provide our services."
//     },
//     {
//       id: 6,
//       icon: <FiAlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Disclaimers & Limitations",
//       text: "We do not guarantee job placement or hiring outcomes. You are solely responsible for the content created using the platform."
//     },
//     {
//       id: 7,
//       icon: <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Termination of Access",
//       text: "We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform."
//     },
//     {
//       id: 8,
//       icon: <FiGlobe className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: "Governing Law",
//       text: "These Terms are governed by the laws of India. Any disputes shall be handled within Indian courts."
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-r from-red-50/50 to-white min-h-screen">

//       <div className="p-4 sm:p-6 md:p-12 lg:p-20">
//         {/* Hero */}
//         <section className="text-center">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
//             Terms of Use & Service
//           </h1>
//           <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
//             Please read these Terms carefully before using ARYU SmartCV. By
//             accessing our platform, you agree to comply with these policies.
//           </p>
//         </section>

//         {/* Terms Card */}
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

// export default TermsPage;





'use client';

import React from 'react';
import {
  FiFileText,
  FiUser,
  FiCreditCard,
  FiShield,
  FiAlertTriangle,
  FiLock,
  FiRefreshCw,
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

const TermsPage = () => {
  // Policy sections data
  const policySections = [
    {
      id: 1,
      icon: <FiFileText className="w-5 h-5" />,
      title: "Acceptance of Terms",
      text: "By using ARYU SmartCV, you agree to these Terms and all applicable policies. If you do not agree, please discontinue using the platform immediately."
    },
    {
      id: 2,
      icon: <FiUser className="w-5 h-5" />,
      title: "User Account & Registration",
      text: "You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials."
    },
    {
      id: 3,
      icon: <FiCreditCard className="w-5 h-5" />,
      title: "Subscription & Payments",
      text: "Some features require a paid subscription. All billing is handled securely and subscriptions renew automatically unless cancelled."
    },
    {
      id: 4,
      icon: <FiShield className="w-5 h-5" />,
      title: "Use of Service",
      text: "You may use ARYU SmartCV for personal and professional resume creation. Any illegal, abusive, or unauthorized use is strictly prohibited."
    },
    {
      id: 5,
      icon: <FiLock className="w-5 h-5" />,
      title: "Privacy & Data Protection",
      text: "We respect your privacy and comply with applicable Indian data protection laws. Your information is securely stored and used only to provide our services."
    },
    {
      id: 6,
      icon: <FiAlertTriangle className="w-5 h-5" />,
      title: "Disclaimers & Limitations",
      text: "We do not guarantee job placement or hiring outcomes. You are solely responsible for the content created using the platform."
    },
    {
      id: 7,
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: "Termination of Access",
      text: "We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform."
    },
    {
      id: 8,
      icon: <FiGlobe className="w-5 h-5" />,
      title: "Governing Law",
      text: "These Terms are governed by the laws of India. Any disputes shall be handled within Indian courts."
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
              Legal Information
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Use & Service
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Please read these Terms carefully before using ARYU SmartCV. By
            accessing our platform, you agree to comply with these policies.
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Key Points Cards */}
       

        {/* Terms Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Terms & Conditions</h2>
            <p className="text-indigo-100 text-sm mt-1">Please read carefully before proceeding</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Have questions about our Terms?</h3>
          <p className="text-sm text-gray-500 mb-4">Contact our legal team for assistance</p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Contact Support
            <FiRefreshCw className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;