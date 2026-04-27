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

// const TermsPage = () => {
//   // Policy sections data
//   const policySections = [
//     {
//       id: 1,
//       icon: <FiFileText className="w-5 h-5" />,
//       title: "Acceptance of Terms",
//       text: "By using ARYU SmartCV, you agree to these Terms and all applicable policies. If you do not agree, please discontinue using the platform immediately."
//     },
//     {
//       id: 2,
//       icon: <FiUser className="w-5 h-5" />,
//       title: "User Account & Registration",
//       text: "You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials."
//     },
//     {
//       id: 3,
//       icon: <FiCreditCard className="w-5 h-5" />,
//       title: "Subscription & Payments",
//       text: "Some features require a paid subscription. All billing is handled securely and subscriptions renew automatically unless cancelled."
//     },
//     {
//       id: 4,
//       icon: <FiShield className="w-5 h-5" />,
//       title: "Use of Service",
//       text: "You may use ARYU SmartCV for personal and professional resume creation. Any illegal, abusive, or unauthorized use is strictly prohibited."
//     },
//     {
//       id: 5,
//       icon: <FiLock className="w-5 h-5" />,
//       title: "Privacy & Data Protection",
//       text: "We respect your privacy and comply with applicable Indian data protection laws. Your information is securely stored and used only to provide our services."
//     },
//     {
//       id: 6,
//       icon: <FiAlertTriangle className="w-5 h-5" />,
//       title: "Disclaimers & Limitations",
//       text: "We do not guarantee job placement or hiring outcomes. You are solely responsible for the content created using the platform."
//     },
//     {
//       id: 7,
//       icon: <FiRefreshCw className="w-5 h-5" />,
//       title: "Termination of Access",
//       text: "We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform."
//     },
//     {
//       id: 8,
//       icon: <FiGlobe className="w-5 h-5" />,
//       title: "Governing Law",
//       text: "These Terms are governed by the laws of India. Any disputes shall be handled within Indian courts."
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
//               Legal Information
//             </span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Terms of Use & Service
//           </h1>
//           <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
//             Please read these Terms carefully before using ARYU SmartCV. By
//             accessing our platform, you agree to comply with these policies.
//           </p>
//         </div>

//         {/* Last Updated */}
//         <div className="text-center mb-8">
//           <p className="text-sm text-gray-400">
//             Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//           </p>
//         </div>

//         {/* Key Points Cards */}

//         {/* Terms Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
//             <h2 className="text-xl font-bold text-white">Terms & Conditions</h2>
//             <p className="text-indigo-100 text-sm mt-1">Please read carefully before proceeding</p>
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
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Have questions about our Terms?</h3>
//           <p className="text-sm text-gray-500 mb-4">Contact our legal team for assistance</p>
//           <a
//             href="/contact-us"
//             className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
//           >
//             Contact Support
//             <FiRefreshCw className="w-4 h-4" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsPage;

"use client";

import { motion } from "framer-motion";
import {
  FiFileText,
  FiUserCheck,
  FiCreditCard,
  FiRefreshCw,
  FiAlertCircle,
  FiCpu,
  FiLock,
  FiGlobe,
  FiClock,
  FiMail,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiTerminal,
  FiBookOpen,
  FiDollarSign,
  FiXCircle,
} from "react-icons/fi";
import {
  FaRegBuilding,
  FaRegCalendarAlt,
  FaGavel,
  FaHandshake,
  FaRegSmile,
} from "react-icons/fa";
import Link from "next/link";

export default function TermsAndConditions() {
  const sections = [
    {
      id: 1,
      icon: <FiFileText className="w-5 h-5" />,
      title: "Acceptance of Terms",
      content: `By creating an account or using any feature of the PassATS Service, you represent that:
        • You are at least 13 years of age
        • You have read and understood these Terms
        • You agree to be legally bound by them
        
        If you are using the Service on behalf of a company or organisation, you represent that you have authority to bind that organisation to these Terms.`,
    },
    {
      id: 2,
      icon: <FiTerminal className="w-5 h-5" />,
      title: "Description of Service",
      content: `PassATS is an AI-powered online resume builder accessible at passats.aryuacademy.com. The Service allows users to create, edit, download, and share professional resumes using AI writing assistance, ATS optimisation tools, and professionally designed templates.
        
        Features available to you depend on your subscription plan (Free, Pro, Pro Plus, or Lifetime). We reserve the right to add, modify, or remove features at any time with reasonable notice.`,
    },
    {
      id: 3,
      icon: <FiUserCheck className="w-5 h-5" />,
      title: "User Accounts",
      content: `To access most features of the Service, you must create a user account. You are responsible for:
        • Providing accurate and complete registration information
        • Maintaining the confidentiality of your account password
        • All activity that occurs under your account
        • Notifying us immediately at support@aryuacademy.com if you suspect unauthorised access to your account
        
        We reserve the right to suspend or terminate accounts that violate these Terms or engage in prohibited activities.`,
    },
    {
      id: 4,
      icon: <FiDollarSign className="w-5 h-5" />,
      title: "Subscription Plans and Billing",
      content: `PassATS offers the following subscription plans:
        • Free: ₹0/month — basic resume building with 1 template and basic ATS optimisation
        • Pro: ₹49/month — 3 templates, AI suggestions, ATS optimisation, photo upload
        • Pro Plus: ₹199/3 months (approximately ₹66/month) — 5 templates, advanced ATS, cover letter builder
        • Lifetime: ₹1,999 one-time payment — all templates, unlimited AI, interview prep kit, no renewal
        
        All payments are processed in Indian Rupees (INR) through Razorpay. We accept UPI, debit cards, credit cards, and net banking.
        
        Monthly and Pro Plus subscriptions renew automatically at the end of each billing period unless cancelled before the renewal date. The Lifetime plan is a one-time purchase and does not auto-renew.
        
        We will provide 7 days' advance notice of any price changes to existing subscribers.`,
    },
    {
      id: 5,
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: "Refund Policy",
      content: `We want you to be satisfied with PassATS. If you are not happy with your paid plan, you may request a full refund within 7 days of your initial purchase or renewal by contacting us at support@aryuacademy.com.
        
        Refunds will be credited to your original payment method within 5–7 business days.
        
        Refund requests made after 7 days of purchase will be evaluated on a case-by-case basis. We reserve the right to decline refunds where misuse of the refund policy is evident.
        
        The Lifetime plan is eligible for a full refund within 7 days of purchase only.`,
    },
    {
      id: 6,
      icon: <FiShield className="w-5 h-5" />,
      title: "Acceptable Use",
      content: `You agree to use PassATS only for lawful purposes. You must not:
        • Create false, misleading, or fraudulent resumes using the Service
        • Use the Service to misrepresent your qualifications, experience, or identity to employers
        • Attempt to hack, reverse-engineer, or interfere with the platform or its security
        • Use automated bots, scrapers, or scripts to access the Service
        • Share your account credentials with other individuals
        • Upload content that is unlawful, harmful, or infringes on the rights of others
        
        Violation of these rules may result in immediate account suspension or termination without refund.`,
    },
    {
      id: 7,
      icon: <FiCpu className="w-5 h-5" />,
      title: "AI-Generated Content Disclaimer",
      content: `PassATS uses artificial intelligence to help generate resume content including bullet points, summaries, and skill suggestions. While we strive for quality and relevance, AI-generated content may not always be accurate, complete, or suitable for every situation.
        
        You are solely responsible for reviewing all AI-generated content before submitting your resume to any employer. We do not guarantee that use of PassATS will result in job interviews, employment offers, or any specific career outcome.`,
    },
    {
      id: 8,
      icon: <FiLock className="w-5 h-5" />,
      title: "Intellectual Property",
      content: `The PassATS platform — including its design, codebase, AI models, templates, branding, and content — is the intellectual property of Aryu Academy Private Limited. You may not copy, reproduce, modify, distribute, or create derivative works from any part of the platform without our explicit written permission.
        
        You retain full ownership of the resume content you create using the Service. By using the Service, you grant us a limited, non-exclusive, royalty-free licence to store and process your content solely for the purpose of providing the Service to you.
        
        Template designs are owned by Aryu Academy Private Limited. Resumes you create using our templates are yours to use, share, and submit freely.`,
    },
    {
      id: 9,
      icon: <FiAlertCircle className="w-5 h-5" />,
      title: "Disclaimer of Warranties",
      content: `The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that:
        • The Service will be continuously available, error-free, or free from security vulnerabilities
        • AI-generated content will be accurate, complete, or appropriate for every job application
        • Using the Service will guarantee job interviews, offers of employment, or career advancement
        
        You are responsible for verifying all content in your resume before distributing it.`,
    },
    {
      id: 10,
      icon: <FaGavel className="w-5 h-5" />,
      title: "Limitation of Liability",
      content: `To the fullest extent permitted under applicable Indian law, Aryu Academy Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of earnings, loss of opportunity, or loss of data, arising from your use of or inability to use the Service.
        
        Our total cumulative liability to you for any claims related to the Service shall not exceed the total amount paid by you to us in the three months immediately preceding the event giving rise to the claim.`,
    },
    {
      id: 11,
      icon: <FiXCircle className="w-5 h-5" />,
      title: "Termination",
      content: `You may delete your account at any time from your account settings. Upon account deletion, your resume data will be permanently removed within 30 days.
        
        We may suspend or terminate your access to the Service without prior notice if you violate these Terms, engage in fraudulent activity, or if required to do so by law.
        
        Upon termination, your right to use the Service ends immediately. Clauses that by their nature survive termination will remain in effect.`,
    },
    {
      id: 12,
      icon: <FiGlobe className="w-5 h-5" />,
      title: "Governing Law and Dispute Resolution",
      content: `These Terms are governed by the laws of India. Any dispute arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
        
        Before pursuing formal legal action, we encourage you to contact us at support@aryuacademy.com to resolve disputes amicably.
        
        If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply in full.`,
    },
    {
      id: 13,
      icon: <FiClock className="w-5 h-5" />,
      title: "Modifications to Terms",
      content: `We may update these Terms from time to time. For material changes, we will:
        • Notify registered users by email at least 7 days before the change takes effect
        • Update the 'Last updated' date at the top of this page
        
        Your continued use of the Service after the effective date of any changes constitutes your acceptance of the revised Terms.`,
    },
  ];



  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12   px-4 sm:px-6 lg:px-8 overflow-hidden ">
      
        <div className="relative z-10 max-w-6xl mx-auto ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center"
          >
            Terms and Conditions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4  text-gray-500"
          >
            These Terms and Conditions  govern your access to and use
            of PassATS, operated by Aryu Academy Private Limited  at passats.aryuacademy.com . By accessing or
            using the Service, you confirm that you have read, understood, and
            agree to be bound by these Terms. If you do not agree, do not use
            the Service.{" "}
          </motion.p>

        
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5 sm:py-10  px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          

          {/* Terms Sections */}
          <div className="space-y-4">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform flex-shrink-0">
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          
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
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Questions About Our Terms?
            </h3>
            <p className="text-indigo-100 mb-6">
              Our legal team is here to help you understand our terms and
              conditions.
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

          {/* Footer Note */}
          
        </div>
      </section>
    </>
  );
}
