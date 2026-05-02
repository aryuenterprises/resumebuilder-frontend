// "use client";

// import { motion } from "framer-motion";
// import {
//   FiShield,
//   FiLock,
//   FiEye,
//   FiDatabase,
//   FiMail,
//   FiGlobe,
//   FiClock,
//   FiUserCheck,
//   FiTrash2,
//   FiDownload,
//   FiEdit2,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiArrowRight,
// } from "react-icons/fi";
// import {
//   FaShieldAlt,
//   FaRegBuilding,
//   FaRegCalendarAlt,
//   FaGraduationCap,
// } from "react-icons/fa";
// import Link from "next/link";

// export default function PrivacyPolicy() {
//   const sections = [
//     {
//       id: 1,
//       icon: <FiShield className="w-5 h-5" />,
//       title: "Information We Collect",
//       content: `When you register and use PassATS, we may collect the following:
//         • Account information: your name, email address, and password
//         • Resume content: work experience, education, skills, projects, and any other information you enter into your resume
//         • Usage data: pages visited, features used, session duration, device type, and browser information
//         • Payment information: processed securely through Razorpay; we do not store card numbers or UPI credentials on our servers
//         • Support communications: messages and queries sent to our support team`,
//     },
//     {
//       id: 2,
//       icon: <FiEye className="w-5 h-5" />,
//       title: "How We Use Your Information",
//       content: `We use the information we collect to:
//         • Provide, operate, and improve the PassATS service
//         • Store and process your resume content as instructed by you
//         • Process payments and manage your subscription plan
//         • Send service-related communications including account updates and security alerts
//         • Respond to support requests and troubleshoot issues
//         • Analyse usage patterns using anonymised, aggregated data to improve our product
        
//         We do not use your resume content to train AI models without your explicit written consent.`,
//     },
//     {
//       id: 3,
//       icon: <FiDatabase className="w-5 h-5" />,
//       title: "Data Sharing and Disclosure",
//       content: `We do not sell, trade, rent, or transfer your personal information to third parties for commercial purposes.
        
//         We may share your information only in the following circumstances:
//         • With trusted service providers who assist us in operating the platform (such as cloud hosting and payment processors) — all bound by confidentiality agreements
//         • When required by applicable Indian law, court order, or lawful government authority
//         • To protect the rights, property, or safety of PassATS, our users, or the public
        
//         We never share your resume data with employers, recruiters, job boards, or advertising platforms.`,
//     },
//     {
//       id: 4,
//       icon: <FiLock className="w-5 h-5" />,
//       title: "Data Storage and Security",
//       content: `Your data is stored on secure servers. We implement industry-standard security measures including HTTPS/TLS encryption for all data in transit, encrypted storage for sensitive personal data, strict access controls limiting who can view user data, and regular security reviews.
        
//         No digital transmission or storage system is completely secure. While we take commercially reasonable precautions, we cannot guarantee absolute security. We will notify affected users of any data breach as required by applicable law.`,
//     },
//     {
//       id: 5,
//       icon: <FiUserCheck className="w-5 h-5" />,
//       title: "Your Rights",
//       content: `You have the following rights with respect to your personal data:
//         • Access: request a copy of the personal data we hold about you
//         • Correction: request correction of inaccurate or incomplete data
//         • Deletion: request permanent deletion of your account and all associated data
//         • Portability: request your resume data in PDF or DOCX format
//         • Withdrawal of consent: opt out of optional data processing at any time
        
//         To exercise any of these rights, please contact us at support@passats.com. We will respond within 15 business days.`,
//     },
//     {
//       id: 6,
//       icon: <FiGlobe className="w-5 h-5" />,
//       title: "Cookies and Tracking",
//       content: `PassATS uses cookies and similar technologies to maintain your login session, save your preferences, and understand how users interact with the platform.
        
//         You can manage cookie settings in your browser. Disabling certain cookies may affect the functionality of the Service.
        
//         We do not use cookies for advertising purposes and do not share cookie data with advertising networks.`,
//     },
//     {
//       id: 7,
//       icon: <FaGraduationCap className="w-5 h-5" />,
//       title: "Children's Privacy",
//       content: `PassATS is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at support@passats.com and we will promptly delete it.`,
//     },
//     {
//       id: 8,
//       icon: <FiLock className="w-5 h-5" />,
//       title: "Third-Party Links",
//       content: `The Service may contain links to external websites including Aryu Academy, Aryu Technologies, Aryu Agency, and Aryu Enterprises. We are not responsible for the privacy practices of these external sites. We encourage you to review their individual privacy policies.`,
//     },
//     {
//       id: 9,
//       icon: <FiClock className="w-5 h-5" />,
//       title: "Data Retention",
//       content: `We retain your personal data for as long as your account is active or as needed to provide the Service.
        
//         If you delete your account, we will permanently delete your data within 30 days, except where we are required to retain it for legal or regulatory compliance purposes.`,
//     },
//     {
//       id: 10,
//       icon: <FiAlertCircle className="w-5 h-5" />,
//       title: "Changes to This Policy",
//       content: `We may update this Privacy Policy periodically. When we make material changes, we will update the 'Last updated' date at the top of this page and notify registered users by email.
        
//         Your continued use of the Service after updated terms are posted constitutes your acceptance of the changes.`,
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative py-12  px-4 sm:px-6 lg:px-8 overflow-hidden ">
       

//         <div className="relative z-10 max-w-6xl mx-auto ">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold text-gray-900 leading-tight"
//           >
//             Privacy Policy
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mt-4  text-gray-500"
//           >
//             This Privacy Policy describes how Aryu Academy Private Limited
//             ("we", "us", or "our") collects, uses, and protects your personal
//             information when you use PassATS, accessible at
//             passats.aryuacademy.com (the "Service"). By using the Service, you
//             agree to the collection and use of information as described in this
//             policy.
//           </motion.p>
//         </div>
//       </section>

//       {/* Policy Content */}
//         <section className= "py-5 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           {/* Policy Sections */}
//           <div className="space-y-6">
//             {sections.map((section, idx) => (
//               <motion.div
//                 key={section.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.05 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
//                   <div className="p-4 sm:p-5 md:p-6">
//                     <div className="flex items-start gap-4">
//                       <div className=" w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
//                         {section.icon}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-lg md:text-xl font-semibold md:font-bold text-gray-900 mb-3">
//                           {section.id}. {section.title}
//                         </h3>
//                         <div className="text-gray-600 text-sm leading-relaxed space-y-2 whitespace-pre-line">
//                           {section.content}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Contact Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 text-center text-white"
//           >
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
//               <FiMail className="w-8 h-8 text-white" />
//             </div>
//             <h3 className="text-xl md:text-2xl font-bold mb-2">Have Questions?</h3>
//             <p className="text-indigo-100 mb-6">
//               Our privacy team is here to help you understand how we protect
//               your data.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="mailto:support@passats.com"
//                 className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all"
//               >
//                 <FiMail className="w-4 h-4 shrink-0" />
//                 support@passats.com
//               </a>
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
//               >
//                 Contact Support
//                 <FiArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </motion.div>

          
//         </div>
//       </section>
//     </>
//   );
// }








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
      icon: <FiShield className="w-4 h-4 sm:w-5 sm:h-5" />,
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
      icon: <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />,
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
      icon: <FiDatabase className="w-4 h-4 sm:w-5 sm:h-5" />,
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
      icon: <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Data Storage and Security",
      content: `Your data is stored on secure servers. We implement industry-standard security measures including HTTPS/TLS encryption for all data in transit, encrypted storage for sensitive personal data, strict access controls limiting who can view user data, and regular security reviews.
        
        No digital transmission or storage system is completely secure. While we take commercially reasonable precautions, we cannot guarantee absolute security. We will notify affected users of any data breach as required by applicable law.`,
    },
    {
      id: 5,
      icon: <FiUserCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Your Rights",
      content: `You have the following rights with respect to your personal data:
        • Access: request a copy of the personal data we hold about you
        • Correction: request correction of inaccurate or incomplete data
        • Deletion: request permanent deletion of your account and all associated data
        • Portability: request your resume data in PDF or DOCX format
        • Withdrawal of consent: opt out of optional data processing at any time
        
        To exercise any of these rights, please contact us at support@passats.com. We will respond within 15 business days.`,
    },
    {
      id: 6,
      icon: <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Cookies and Tracking",
      content: `PassATS uses cookies and similar technologies to maintain your login session, save your preferences, and understand how users interact with the platform.
        
        You can manage cookie settings in your browser. Disabling certain cookies may affect the functionality of the Service.
        
        We do not use cookies for advertising purposes and do not share cookie data with advertising networks.`,
    },
    {
      id: 7,
      icon: <FaGraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Children's Privacy",
      content: `PassATS is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at support@passats.com and we will promptly delete it.`,
    },
    {
      id: 8,
      icon: <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Third-Party Links",
      content: `The Service may contain links to external websites including Aryu Academy, Aryu Technologies, Aryu Agency, and Aryu Enterprises. We are not responsible for the privacy practices of these external sites. We encourage you to review their individual privacy policies.`,
    },
    {
      id: 9,
      icon: <FiClock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Data Retention",
      content: `We retain your personal data for as long as your account is active or as needed to provide the Service.
        
        If you delete your account, we will permanently delete your data within 30 days, except where we are required to retain it for legal or regulatory compliance purposes.`,
    },
    {
      id: 10,
      icon: <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy periodically. When we make material changes, we will update the 'Last updated' date at the top of this page and notify registered users by email.
        
        Your continued use of the Service after updated terms are posted constitutes your acceptance of the changes.`,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Decorative Background */}
        <div className="absolute -top-24 -right-24 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-64 sm:w-80 h-64 sm:h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-100 border border-indigo-200 mb-4 sm:mb-6">
              <FiShield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Privacy & Security
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Privacy Policy
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto">
              This Privacy Policy describes how Aryu Academy Private Limited
              ("we", "us", or "our") collects, uses, and protects your personal
              information when you use PassATS, accessible at
              passats.aryuacademy.com (the "Service"). By using the Service, you
              agree to the collection and use of information as described in this
              policy.
            </p>
            
            <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
              <FiClock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Last updated: January 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Policy Sections */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6 lg:p-7">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold md:font-bold text-gray-900 mb-2 sm:mb-3">
                          {section.id}. {section.title}
                        </h3>
                        <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed space-y-2 whitespace-pre-line">
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
            className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 text-center text-white"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full mb-3 sm:mb-4">
              <FiMail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Have Questions?</h3>
            <p className="text-indigo-100 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
              Our privacy team is here to help you understand how we protect your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:support@passats.com"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-indigo-600 font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm md:text-base"
              >
                <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                support@passats.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-white/20 transition-all text-xs sm:text-sm md:text-base"
              >
                Contact Support
                <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 text-center"
          >
            <p className="text-[10px] sm:text-xs text-gray-400">
              PassATS is a product of Aryu Academy Private Limited
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}