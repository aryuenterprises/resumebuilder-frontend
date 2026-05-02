// "use client";

// import { motion } from "framer-motion";
// import {
//   FiFileText,
//   FiUserCheck,
//   FiCreditCard,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiCpu,
//   FiLock,
//   FiGlobe,
//   FiClock,
//   FiMail,
//   FiArrowRight,
//   FiCheckCircle,
//   FiShield,
//   FiTerminal,
//   FiBookOpen,
//   FiDollarSign,
//   FiXCircle,
// } from "react-icons/fi";
// import {
//   FaRegBuilding,
//   FaRegCalendarAlt,
//   FaGavel,
//   FaHandshake,
//   FaRegSmile,
// } from "react-icons/fa";
// import Link from "next/link";

// export default function TermsAndConditions() {
//   const sections = [
//     {
//       id: 1,
//       icon: <FiFileText className="w-5 h-5" />,
//       title: "Acceptance of Terms",
//       content: `By creating an account or using any feature of the PassATS Service, you represent that:
//         • You are at least 13 years of age
//         • You have read and understood these Terms
//         • You agree to be legally bound by them
        
//         If you are using the Service on behalf of a company or organisation, you represent that you have authority to bind that organisation to these Terms.`,
//     },
//     {
//       id: 2,
//       icon: <FiTerminal className="w-5 h-5" />,
//       title: "Description of Service",
//       content: `PassATS is an AI-powered online resume builder accessible at passats.aryuacademy.com. The Service allows users to create, edit, download, and share professional resumes using AI writing assistance, ATS optimisation tools, and professionally designed templates.
        
//         Features available to you depend on your subscription plan (Free, Pro, Pro Plus, or Lifetime). We reserve the right to add, modify, or remove features at any time with reasonable notice.`,
//     },
//     {
//       id: 3,
//       icon: <FiUserCheck className="w-5 h-5" />,
//       title: "User Accounts",
//       content: `To access most features of the Service, you must create a user account. You are responsible for:
//         • Providing accurate and complete registration information
//         • Maintaining the confidentiality of your account password
//         • All activity that occurs under your account
//         • Notifying us immediately at support@passats.com if you suspect unauthorised access to your account
        
//         We reserve the right to suspend or terminate accounts that violate these Terms or engage in prohibited activities.`,
//     },
//     {
//       id: 4,
//       icon: <FiDollarSign className="w-5 h-5" />,
//       title: "Subscription Plans and Billing",
//       content: `PassATS offers the following subscription plans:
//         • Free: ₹0/month — basic resume building with 1 template and basic ATS optimisation
//         • Pro: ₹49/month — 3 templates, AI suggestions, ATS optimisation, photo upload
//         • Pro Plus: ₹199/3 months (approximately ₹66/month) — 5 templates, advanced ATS, cover letter builder
//         • Lifetime: ₹1,999 one-time payment — all templates, unlimited AI, interview prep kit, no renewal
        
//         All payments are processed in Indian Rupees (INR) through Razorpay. We accept UPI, debit cards, credit cards, and net banking.
        
//         Monthly and Pro Plus subscriptions renew automatically at the end of each billing period unless cancelled before the renewal date. The Lifetime plan is a one-time purchase and does not auto-renew.
        
//         We will provide 7 days' advance notice of any price changes to existing subscribers.`,
//     },
//     {
//       id: 5,
//       icon: <FiRefreshCw className="w-5 h-5" />,
//       title: "Refund Policy",
//       content: `We want you to be satisfied with PassATS. If you are not happy with your paid plan, you may request a full refund within 7 days of your initial purchase or renewal by contacting us at support@passats.com.
        
//         Refunds will be credited to your original payment method within 5–7 business days.
        
//         Refund requests made after 7 days of purchase will be evaluated on a case-by-case basis. We reserve the right to decline refunds where misuse of the refund policy is evident.
        
//         The Lifetime plan is eligible for a full refund within 7 days of purchase only.`,
//     },
//     {
//       id: 6,
//       icon: <FiShield className="w-5 h-5" />,
//       title: "Acceptable Use",
//       content: `You agree to use PassATS only for lawful purposes. You must not:
//         • Create false, misleading, or fraudulent resumes using the Service
//         • Use the Service to misrepresent your qualifications, experience, or identity to employers
//         • Attempt to hack, reverse-engineer, or interfere with the platform or its security
//         • Use automated bots, scrapers, or scripts to access the Service
//         • Share your account credentials with other individuals
//         • Upload content that is unlawful, harmful, or infringes on the rights of others
        
//         Violation of these rules may result in immediate account suspension or termination without refund.`,
//     },
//     {
//       id: 7,
//       icon: <FiCpu className="w-5 h-5" />,
//       title: "AI-Generated Content Disclaimer",
//       content: `PassATS uses artificial intelligence to help generate resume content including bullet points, summaries, and skill suggestions. While we strive for quality and relevance, AI-generated content may not always be accurate, complete, or suitable for every situation.
        
//         You are solely responsible for reviewing all AI-generated content before submitting your resume to any employer. We do not guarantee that use of PassATS will result in job interviews, employment offers, or any specific career outcome.`,
//     },
//     {
//       id: 8,
//       icon: <FiLock className="w-5 h-5" />,
//       title: "Intellectual Property",
//       content: `The PassATS platform — including its design, codebase, AI models, templates, branding, and content — is the intellectual property of Aryu Academy Private Limited. You may not copy, reproduce, modify, distribute, or create derivative works from any part of the platform without our explicit written permission.
        
//         You retain full ownership of the resume content you create using the Service. By using the Service, you grant us a limited, non-exclusive, royalty-free licence to store and process your content solely for the purpose of providing the Service to you.
        
//         Template designs are owned by Aryu Academy Private Limited. Resumes you create using our templates are yours to use, share, and submit freely.`,
//     },
//     {
//       id: 9,
//       icon: <FiAlertCircle className="w-5 h-5" />,
//       title: "Disclaimer of Warranties",
//       content: `The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that:
//         • The Service will be continuously available, error-free, or free from security vulnerabilities
//         • AI-generated content will be accurate, complete, or appropriate for every job application
//         • Using the Service will guarantee job interviews, offers of employment, or career advancement
        
//         You are responsible for verifying all content in your resume before distributing it.`,
//     },
//     {
//       id: 10,
//       icon: <FaGavel className="w-5 h-5" />,
//       title: "Limitation of Liability",
//       content: `To the fullest extent permitted under applicable Indian law, Aryu Academy Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of earnings, loss of opportunity, or loss of data, arising from your use of or inability to use the Service.
        
//         Our total cumulative liability to you for any claims related to the Service shall not exceed the total amount paid by you to us in the three months immediately preceding the event giving rise to the claim.`,
//     },
//     {
//       id: 11,
//       icon: <FiXCircle className="w-5 h-5" />,
//       title: "Termination",
//       content: `You may delete your account at any time from your account settings. Upon account deletion, your resume data will be permanently removed within 30 days.
        
//         We may suspend or terminate your access to the Service without prior notice if you violate these Terms, engage in fraudulent activity, or if required to do so by law.
        
//         Upon termination, your right to use the Service ends immediately. Clauses that by their nature survive termination will remain in effect.`,
//     },
//     {
//       id: 12,
//       icon: <FiGlobe className="w-5 h-5" />,
//       title: "Governing Law and Dispute Resolution",
//       content: `These Terms are governed by the laws of India. Any dispute arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
        
//         Before pursuing formal legal action, we encourage you to contact us at support@passats.com to resolve disputes amicably.
        
//         If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply in full.`,
//     },
//     {
//       id: 13,
//       icon: <FiClock className="w-5 h-5" />,
//       title: "Modifications to Terms",
//       content: `We may update these Terms from time to time. For material changes, we will:
//         • Notify registered users by email at least 7 days before the change takes effect
//         • Update the 'Last updated' date at the top of this page
        
//         Your continued use of the Service after the effective date of any changes constitutes your acceptance of the revised Terms.`,
//     },
//   ];



//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative py-12   px-4 sm:px-6 lg:px-8 overflow-hidden ">
      
//         <div className="relative z-10 max-w-6xl mx-auto ">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center"
//           >
//             Terms and Conditions
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mt-4  text-gray-500"
//           >
//             These Terms and Conditions  govern your access to and use
//             of PassATS, operated by Aryu Academy Private Limited  at passats.aryuacademy.com . By accessing or
//             using the Service, you confirm that you have read, understood, and
//             agree to be bound by these Terms. If you do not agree, do not use
//             the Service.{" "}
//           </motion.p>

        
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="py-5 sm:py-10  px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
          

//           {/* Terms Sections */}
//           <div className="space-y-4">
//             {sections.map((section, idx) => (
//               <motion.div
//                 key={section.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.03 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
//                   <div className="p-4 sm:p-5 md:p-6">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform flex-shrink-0">
//                         {section.icon}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-gray-900 mb-2">
                          
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
//             <h3 className="text-xl md:text-2xl font-bold mb-2">
//               Questions About Our Terms?
//             </h3>
//             <p className="text-indigo-100 mb-6">
//               Our legal team is here to help you understand our terms and
//               conditions.
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

//           {/* Footer Note */}
          
//         </div>
//       </section>
//     </>
//   );
// }
















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
      icon: <FiFileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Acceptance of Terms",
      content: `By creating an account or using any feature of the PassATS Service, you represent that:
        • You are at least 13 years of age
        • You have read and understood these Terms
        • You agree to be legally bound by them
        
        If you are using the Service on behalf of a company or organisation, you represent that you have authority to bind that organisation to these Terms.`,
    },
    {
      id: 2,
      icon: <FiTerminal className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Description of Service",
      content: `PassATS is an AI-powered online resume builder accessible at passats.aryuacademy.com. The Service allows users to create, edit, download, and share professional resumes using AI writing assistance, ATS optimisation tools, and professionally designed templates.
        
        Features available to you depend on your subscription plan (Free, Pro, Pro Plus, or Lifetime). We reserve the right to add, modify, or remove features at any time with reasonable notice.`,
    },
    {
      id: 3,
      icon: <FiUserCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "User Accounts",
      content: `To access most features of the Service, you must create a user account. You are responsible for:
        • Providing accurate and complete registration information
        • Maintaining the confidentiality of your account password
        • All activity that occurs under your account
        • Notifying us immediately at support@passats.com if you suspect unauthorised access to your account
        
        We reserve the right to suspend or terminate accounts that violate these Terms or engage in prohibited activities.`,
    },
    {
      id: 4,
      icon: <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Subscription Plans and Billing",
      content: `PassATS offers the following subscription plans:
        • Free: ₹0/month — basic resume building with 1 template and basic ATS optimisation
        • Pro: ₹49/month — 3 templates, AI suggestions, ATS optimisation, photo upload
        • Pro Plus: ₹199/3 months (approximately ₹66/month) — 5 templates, advanced ATS, cover letter builder
        • Lifetime: ₹999 one-time payment — all templates, unlimited AI, interview prep kit, no renewal
        
        All payments are processed in Indian Rupees (INR) through Razorpay. We accept UPI, debit cards, credit cards, and net banking.
        
        Monthly and Pro Plus subscriptions renew automatically at the end of each billing period unless cancelled before the renewal date. The Lifetime plan is a one-time purchase and does not auto-renew.
        
        We will provide 7 days advance notice of any price changes to existing subscribers.`,
    },
    {
      id: 5,
      icon: <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Refund Policy",
      content: `We want you to be satisfied with PassATS. If you are not happy with your paid plan, you may request a full refund within 7 days of your initial purchase or renewal by contacting us at support@passats.com.
        
        Refunds will be credited to your original payment method within 5–7 business days.
        
        Refund requests made after 7 days of purchase will be evaluated on a case-by-case basis. We reserve the right to decline refunds where misuse of the refund policy is evident.
        
        The Lifetime plan is eligible for a full refund within 7 days of purchase only.`,
    },
    {
      id: 6,
      icon: <FiShield className="w-4 h-4 sm:w-5 sm:h-5" />,
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
      icon: <FiCpu className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "AI-Generated Content Disclaimer",
      content: `PassATS uses artificial intelligence to help generate resume content including bullet points, summaries, and skill suggestions. While we strive for quality and relevance, AI-generated content may not always be accurate, complete, or suitable for every situation.
        
        You are solely responsible for reviewing all AI-generated content before submitting your resume to any employer. We do not guarantee that use of PassATS will result in job interviews, employment offers, or any specific career outcome.`,
    },
    {
      id: 8,
      icon: <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Intellectual Property",
      content: `The PassATS platform — including its design, codebase, AI models, templates, branding, and content — is the intellectual property of Aryu Academy Private Limited. You may not copy, reproduce, modify, distribute, or create derivative works from any part of the platform without our explicit written permission.
        
        You retain full ownership of the resume content you create using the Service. By using the Service, you grant us a limited, non-exclusive, royalty-free licence to store and process your content solely for the purpose of providing the Service to you.
        
        Template designs are owned by Aryu Academy Private Limited. Resumes you create using our templates are yours to use, share, and submit freely.`,
    },
    {
      id: 9,
      icon: <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Disclaimer of Warranties",
      content: `The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that:
        • The Service will be continuously available, error-free, or free from security vulnerabilities
        • AI-generated content will be accurate, complete, or appropriate for every job application
        • Using the Service will guarantee job interviews, offers of employment, or career advancement
        
        You are responsible for verifying all content in your resume before distributing it.`,
    },
    {
      id: 10,
      icon: <FaGavel className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Limitation of Liability",
      content: `To the fullest extent permitted under applicable Indian law, Aryu Academy Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of earnings, loss of opportunity, or loss of data, arising from your use of or inability to use the Service.
        
        Our total cumulative liability to you for any claims related to the Service shall not exceed the total amount paid by you to us in the three months immediately preceding the event giving rise to the claim.`,
    },
    {
      id: 11,
      icon: <FiXCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Termination",
      content: `You may delete your account at any time from your account settings. Upon account deletion, your resume data will be permanently removed within 30 days.
        
        We may suspend or terminate your access to the Service without prior notice if you violate these Terms, engage in fraudulent activity, or if required to do so by law.
        
        Upon termination, your right to use the Service ends immediately. Clauses that by their nature survive termination will remain in effect.`,
    },
    {
      id: 12,
      icon: <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Governing Law and Dispute Resolution",
      content: `These Terms are governed by the laws of India. Any dispute arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
        
        Before pursuing formal legal action, we encourage you to contact us at support@passats.com to resolve disputes amicably.
        
        If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply in full.`,
    },
    {
      id: 13,
      icon: <FiClock className="w-4 h-4 sm:w-5 sm:h-5" />,
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
              <FiFileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Legal Agreement
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Terms and Conditions
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto">
              These Terms and Conditions govern your access to and use
              of PassATS, operated by Aryu Academy Private Limited at passats.aryuacademy.com. By accessing or
              using the Service, you confirm that you have read, understood, and
              agree to be bound by these Terms. If you do not agree, do not use
              the Service.
            </p>
            
           
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Terms Sections */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6 lg:p-7">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
              Questions About Our Terms?
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
              Our legal team is here to help you understand our terms and conditions.
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