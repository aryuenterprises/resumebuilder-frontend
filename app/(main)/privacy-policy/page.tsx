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
//   FiCheckCircle,
//   FiInfo,
// } from "react-icons/fi";
// import { motion } from "framer-motion";

// // Define TypeScript interface
// interface PolicySectionProps {
//   icon: React.ReactNode;
//   title: string;
//   text: string;
//   index: number;
// }

// // Reusable Policy Section Component
// const PolicySection = ({ icon, title, text, index }: PolicySectionProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.05 }}
//       className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
//     >
//       <div className="flex-shrink-0">
//         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
//           {icon}
//         </div>
//       </div>
//       <div className="flex-1">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
//           {title}
//         </h2>
//         <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//           {text}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const Policy = () => {
//   // Policy sections data
//   const policySections = [
//     {
//       id: 1,
//       icon: <FiShield className="w-5 h-5" />,
//       title: "Overview",
//       text: "This Privacy Policy explains how we collect, use, and protect your personal data when you use ARYU SmartCV. By accessing our platform, you agree to this Policy."
//     },
//     {
//       id: 2,
//       icon: <FiUser className="w-5 h-5" />,
//       title: "Information You Provide",
//       text: "We collect information when you create an account, submit forms, respond to emails, upload content, or interact with our services."
//     },
//     {
//       id: 3,
//       icon: <FiDatabase className="w-5 h-5" />,
//       title: "Information Collected Automatically",
//       text: "We collect device, browser, IP address, cookies, usage analytics, transaction data, and referral sources to improve your experience."
//     },
//     {
//       id: 4,
//       icon: <FiLock className="w-5 h-5" />,
//       title: "How We Use Your Data",
//       text: "We use your information to provide services, process payments, personalize content, improve features, prevent fraud, and comply with legal obligations."
//     },
//     {
//       id: 5,
//       icon: <FiShare2 className="w-5 h-5" />,
//       title: "Sharing of Data",
//       text: "Your data may be shared with trusted service providers, payment processors, analytics partners, and legal authorities when required."
//     },
//     {
//       id: 6,
//       icon: <FiRefreshCw className="w-5 h-5" />,
//       title: "Data Retention",
//       text: "We retain personal data only as long as necessary to fulfill service obligations or meet legal requirements."
//     },
//     {
//       id: 7,
//       icon: <FiAlertCircle className="w-5 h-5" />,
//       title: "Your Privacy Rights",
//       text: "You may request access, correction, deletion, restriction, or objection to processing of your personal data."
//     },
//     {
//       id: 8,
//       icon: <FiGlobe className="w-5 h-5" />,
//       title: "Third-Party Links",
//       text: "Our platform may contain external links. We are not responsible for third-party privacy practices."
//     },
//     {
//       id: 9,
//       icon: <FiMail className="w-5 h-5" />,
//       title: "Contact Us",
//       text: "For any privacy-related questions, please contact our support team at support@aryusmartcv.com"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50/20">
//       {/* Decorative Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full filter blur-3xl opacity-30" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//             <FiInfo className="w-3.5 h-3.5 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               Privacy Policy
//             </span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Privacy Policy
//           </h1>
//           <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
//             Your privacy matters. Learn how ARYU SmartCV collects, uses, and
//             protects your personal information.
//           </p>
//         </div>

//         {/* Policy Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
//             <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
//             <p className="text-indigo-100 text-sm mt-1">How we handle your data</p>
//           </div>

//           <div className="p-6 sm:p-8 space-y-6 divide-y divide-gray-100">
//             {policySections.map((section, idx) => (
//               <div key={section.id} className={idx > 0 ? "pt-6" : ""}>
//                 <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
//                       {section.icon}
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
//                       {section.title}
//                     </h2>
//                     <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                       {section.text}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Contact Support Section */}
//         <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Have questions about our Privacy Policy?</h3>
//           <p className="text-sm text-gray-500 mb-4">Contact our privacy team for assistance</p>
//           <a
//             href="/contact-us"
//             className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
//           >
//             Contact Support
//             <FiMail className="w-4 h-4" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Policy;

"use client";

import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiMail,
  FiGlobe,
  FiClock,
  FiUserCheck,
  FiTrash2,
  FiDownload,
  FiEdit2,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaShieldAlt,
  FaRegBuilding,
  FaRegCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      icon: <FiShield className="w-5 h-5" />,
      title: "Information We Collect",
      content: `When you register and use PassATS, we may collect the following:
        • Account information: your name, email address, and password
        • Resume content: work experience, education, skills, projects, and any other information you enter into your resume
        • Usage data: pages visited, features used, session duration, device type, and browser information
        • Payment information: processed securely through Razorpay; we do not store card numbers or UPI credentials on our servers
        • Support communications: messages and queries sent to our support team`,
    },
    {
      id: 2,
      icon: <FiEye className="w-5 h-5" />,
      title: "How We Use Your Information",
      content: `We use the information we collect to:
        • Provide, operate, and improve the PassATS service
        • Store and process your resume content as instructed by you
        • Process payments and manage your subscription plan
        • Send service-related communications including account updates and security alerts
        • Respond to support requests and troubleshoot issues
        • Analyse usage patterns using anonymised, aggregated data to improve our product
        
        We do not use your resume content to train AI models without your explicit written consent.`,
    },
    {
      id: 3,
      icon: <FiDatabase className="w-5 h-5" />,
      title: "Data Sharing and Disclosure",
      content: `We do not sell, trade, rent, or transfer your personal information to third parties for commercial purposes.
        
        We may share your information only in the following circumstances:
        • With trusted service providers who assist us in operating the platform (such as cloud hosting and payment processors) — all bound by confidentiality agreements
        • When required by applicable Indian law, court order, or lawful government authority
        • To protect the rights, property, or safety of PassATS, our users, or the public
        
        We never share your resume data with employers, recruiters, job boards, or advertising platforms.`,
    },
    {
      id: 4,
      icon: <FiLock className="w-5 h-5" />,
      title: "Data Storage and Security",
      content: `Your data is stored on secure servers. We implement industry-standard security measures including HTTPS/TLS encryption for all data in transit, encrypted storage for sensitive personal data, strict access controls limiting who can view user data, and regular security reviews.
        
        No digital transmission or storage system is completely secure. While we take commercially reasonable precautions, we cannot guarantee absolute security. We will notify affected users of any data breach as required by applicable law.`,
    },
    {
      id: 5,
      icon: <FiUserCheck className="w-5 h-5" />,
      title: "Your Rights",
      content: `You have the following rights with respect to your personal data:
        • Access: request a copy of the personal data we hold about you
        • Correction: request correction of inaccurate or incomplete data
        • Deletion: request permanent deletion of your account and all associated data
        • Portability: request your resume data in PDF or DOCX format
        • Withdrawal of consent: opt out of optional data processing at any time
        
        To exercise any of these rights, please contact us at support@aryuacademy.com. We will respond within 15 business days.`,
    },
    {
      id: 6,
      icon: <FiGlobe className="w-5 h-5" />,
      title: "Cookies and Tracking",
      content: `PassATS uses cookies and similar technologies to maintain your login session, save your preferences, and understand how users interact with the platform.
        
        You can manage cookie settings in your browser. Disabling certain cookies may affect the functionality of the Service.
        
        We do not use cookies for advertising purposes and do not share cookie data with advertising networks.`,
    },
    {
      id: 7,
      icon: <FaGraduationCap className="w-5 h-5" />,
      title: "Children's Privacy",
      content: `PassATS is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at support@aryuacademy.com and we will promptly delete it.`,
    },
    {
      id: 8,
      icon: <FiLock className="w-5 h-5" />,
      title: "Third-Party Links",
      content: `The Service may contain links to external websites including Aryu Academy, Aryu Technologies, Aryu Agency, and Aryu Enterprises. We are not responsible for the privacy practices of these external sites. We encourage you to review their individual privacy policies.`,
    },
    {
      id: 9,
      icon: <FiClock className="w-5 h-5" />,
      title: "Data Retention",
      content: `We retain your personal data for as long as your account is active or as needed to provide the Service.
        
        If you delete your account, we will permanently delete your data within 30 days, except where we are required to retain it for legal or regulatory compliance purposes.`,
    },
    {
      id: 10,
      icon: <FiAlertCircle className="w-5 h-5" />,
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy periodically. When we make material changes, we will update the 'Last updated' date at the top of this page and notify registered users by email.
        
        Your continued use of the Service after updated terms are posted constitutes your acceptance of the changes.`,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12  px-4 sm:px-6 lg:px-8 overflow-hidden ">
       

        <div className="relative z-10 max-w-6xl mx-auto ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold text-gray-900 leading-tight"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4  text-gray-500"
          >
            This Privacy Policy describes how Aryu Academy Private Limited
            ("we", "us", or "our") collects, uses, and protects your personal
            information when you use PassATS, accessible at
            passats.aryuacademy.com (the "Service"). By using the Service, you
            agree to the collection and use of information as described in this
            policy.
          </motion.p>
        </div>
      </section>

      {/* Policy Content */}
        <section className= "py-5 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className=" w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold md:font-bold text-gray-900 mb-3">
                          {section.id}. {section.title}
                        </h3>
                        <div className="text-gray-600 text-sm leading-relaxed space-y-2 whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 text-center text-white"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FiMail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Have Questions?</h3>
            <p className="text-indigo-100 mb-6">
              Our privacy team is here to help you understand how we protect
              your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@aryuacademy.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <FiMail className="w-4 h-4 shrink-0" />
                support@aryuacademy.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                Contact Support
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          
        </div>
      </section>
    </>
  );
}
