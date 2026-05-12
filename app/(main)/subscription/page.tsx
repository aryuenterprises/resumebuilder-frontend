// 'use client';
// import React from 'react';
// import {
//   FiCreditCard,
//   FiRefreshCw,
//   FiXCircle,
//   FiShield,
//   FiFileText,
//   FiArrowUpCircle,
//   FiDownload,
//   FiInfo,
//   FiCheckCircle,
// } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// // Define TypeScript interfaces
// interface SubscriptionSectionProps {
//   icon: React.ReactNode;
//   title: string;
//   text: string;
//   index: number;
// }

// interface PolicySection {
//   id: string;
//   icon: React.ReactNode;
//   title: string;
//   text: string;
// }

// // Reusable Policy Section Component
// const SubscriptionSection = ({ icon, title, text, index }: SubscriptionSectionProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: Math.min(index * 0.05, 0.5) }}
//       className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
//     >
//       <div className="flex-shrink-0">
//         <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-base sm:text-lg md:text-xl group-hover:scale-110 transition-transform duration-300">
//           {icon}
//         </div>
//       </div>
//       <div className="flex-1">
//         <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
//           {title}
//         </h2>
//         <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
//           {text}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const Subscription = () => {
//   // Policy sections data
//   const policySections: PolicySection[] = [
//     {
//       id: 'plans',
//       icon: <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Subscription Plans',
//       text: 'PassATS offers multiple subscription plans that provide access to premium templates, AI tools, and career-boosting features. Please review each plan carefully before subscribing.',
//     },
//     {
//       id: 'trial',
//       icon: <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Free Trial (if available)',
//       text: 'Some plans include a free trial. Once the trial ends, your subscription will automatically continue unless cancelled before the trial period expires.',
//     },
//     {
//       id: 'billing',
//       icon: <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Billing & Payment',
//       text: 'All payments are securely processed through Stripe. Subscriptions renew automatically at the end of each billing period unless cancelled beforehand. You\'ll receive email notifications before renewal.',
//     },
//     {
//       id: 'cancellation',
//       icon: <FiXCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Cancellation',
//       text: 'You may cancel your subscription anytime from your account settings. Premium access remains active until the end of your current billing cycle. No partial refunds are provided for mid-cycle cancellations.',
//     },
//     {
//       id: 'refunds',
//       icon: <FiShield className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Refunds',
//       text: 'Payments are generally non-refundable except when required by law or under special circumstances. Refund requests are reviewed on a case-by-case basis within 14 days of purchase.',
//     },
//     {
//       id: 'changes',
//       icon: <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Changes to Subscription',
//       text: 'We may update pricing, features, or plans periodically. Any changes will apply to future billing cycles only, with a 30-day notice for price increases.',
//     },
//     {
//       id: 'responsibility',
//       icon: <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Your Responsibility',
//       text: 'You are responsible for keeping your billing information accurate and ensuring payments are made on time. Failed payments may result in temporary suspension of premium features.',
//     },
//     {
//       id: 'upgrades',
//       icon: <FiArrowUpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Plan Upgrades & Downgrades',
//       text: 'You can upgrade or downgrade your plan at any time. When upgrading, prorated charges may apply. When downgrading, changes take effect at the start of your next billing cycle.',
//     },
//     {
//       id: 'termination',
//       icon: <FiXCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
//       title: 'Account Termination',
//       text: 'PassATS reserves the right to terminate subscriptions that violate our Terms of Service. In such cases, no refunds will be provided.',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50/20">
//       {/* Decorative Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
//         <div className="absolute -bottom-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-indigo-50 rounded-full filter blur-3xl opacity-30" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-8 sm:mb-10 md:mb-12"
//         >
//           <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4">
//             <FiInfo className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
//             <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               Subscription Policy
//             </span>
//           </div>

//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent px-3">
//             Subscription Policy
//           </h1>
//           <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto px-4">
//             Transparent, secure and flexible plans designed for your career success with PassATS.
//           </p>
//         </motion.div>

//         {/* Policy Sections */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
//         >
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
//             <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Subscription Terms & Conditions</h2>
//             <p className="text-indigo-100 text-[11px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">Please read carefully before subscribing</p>
//           </div>

//           <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 divide-y divide-gray-100">
//             {policySections.map((section, idx) => (
//               <div key={section.id} className={idx > 0 ? "pt-4 sm:pt-5 md:pt-6" : ""}>
//                 <SubscriptionSection
//                   icon={section.icon}
//                   title={section.title}
//                   text={section.text}
//                   index={idx}
//                 />
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Contact Support Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-8 sm:mt-10 md:mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 sm:p-6 border border-indigo-100"
//         >
//           <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Have questions about subscription?</h3>
//           <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Contact our support team for assistance</p>
//           <a
//             href="/contact-us"
//             className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 text-xs sm:text-sm md:text-base"
//           >
//             Contact Support
//             <FiArrowUpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           </a>
//         </motion.div>

//         {/* Footer Note */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-6 sm:mt-8 text-center"
//         >
//           <p className="text-[10px] sm:text-xs text-gray-400">
//             PassATS is a product of Aryu Academy Private Limited
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Subscription;

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
  FiCreditCard,
  FiRefreshCw,
  FiXCircle,
  FiDollarSign,
  FiCalendar,
  FiZap,
  FiHeart,
} from "react-icons/fi";
import {
  FaShieldAlt,
  FaRegBuilding,
  FaRegCalendarAlt,
  FaGraduationCap,
  FaGem,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";

export default function SubscriptionPolicy() {
  const sections = [
    {
      id: 1,
      icon: <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Subscription Plans",
      content: `PassATS offers multiple subscription plans designed for different stages of your job search. Each plan provides access to a different set of features — including AI-powered resume tools, ATS optimisation, and professional templates.

Our current plans are:
• Free — ₹0/month. Includes 1 template, basic ATS check, and limited AI bullet generation. No credit card required.
• Pro — ₹99/month. Includes 3 templates, AI suggestions, ATS optimisation, and photo upload.
• Lifetime — ₹249 one-time payment. Includes all templates, unlimited AI features, interview prep kit, and all future updates. No recurring charges.`,
    },
    {
      id: 2,
      icon: <FaGem className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Free Plan (Always Available)",
      content: `PassATS offers a genuine Free plan — not a time-limited trial. The Free plan is available indefinitely with no expiry date and no credit card required.

The Free plan includes limited access to core features. You may upgrade to a paid plan at any time from your account settings.

We do not automatically convert Free users to paid subscriptions. Any upgrade requires your explicit action and confirmation.`,
    },
    {
      id: 3,
      icon: <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Billing & Payment",
      content: `All payments are processed securely through Razorpay. We accept UPI, debit cards, credit cards, and net banking. All prices are in Indian Rupees (INR).

For monthly and Pro Plus plans, your subscription is billed at the start of each billing period. You will receive an email confirmation after every successful payment.

Subscriptions renew automatically at the end of each billing period unless cancelled before the renewal date. We will send a renewal reminder email at least 3 days before your billing date.

The Lifetime plan is a one-time payment and does not renew. Once purchased, you retain access permanently.`,
    },
    {
      id: 4,
      icon: <FiXCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Cancellation",
      content: `You may cancel your subscription at any time directly from your account settings — no need to contact support.

When you cancel:
• Your premium access remains active until the end of your current billing period.
• You will not be charged again after cancellation.
• Your account reverts to the Free plan at the end of the billing cycle.
• All resumes you have built remain saved in your account.

No partial refunds are provided for unused time in the current billing cycle, unless covered by our refund policy below.`,
    },
    {
      id: 5,
      icon: <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Refunds",
      content: `We want you to be satisfied with PassATS. If you are not happy with a paid plan, you may request a full refund within 7 days of your initial purchase or renewal by contacting us at support@aryuacademy.com.

Refunds will be credited to your original payment method within 5–7 business days.

Please note:
• Refund requests made after 7 days will be reviewed on a case-by-case basis.
• The Lifetime plan is eligible for a full refund within 7 days of purchase only.
• Refunds will not be processed where misuse or abuse of the refund policy is evident.
• We reserve the right to decline refunds for accounts that have made repeated refund requests.`,
    },
    {
      id: 6,
      icon: <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Changes to Subscription Plans or Pricing",
      content: `PassATS may update its pricing, features, or plan structure periodically. When we make changes that affect existing subscribers:

• Price increases will be communicated with at least 30 days' advance notice by email.
• Feature changes will be communicated with at least 7 days' advance notice.
• All changes apply to future billing cycles only — your current period is never affected mid-cycle.

You may cancel before a price change takes effect if you do not wish to continue at the new rate.`,
    },
    {
      id: 7,
      icon: <FiUserCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Your Responsibility",
      content: `As a subscriber, you are responsible for:
• Keeping your billing information accurate and up to date in your account settings.
• Ensuring your payment method has sufficient funds or credit at the time of renewal.
• Cancelling your subscription before the renewal date if you do not wish to be charged.
• Notifying us promptly at support@aryuacademy.com if you believe a charge was made in error.

Failed payments may result in temporary suspension of premium features until payment is resolved.`,
    },
    {
      id: 8,
      icon: <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Plan Upgrades & Downgrades",
      content: `You can upgrade or downgrade your plan at any time from your account settings.

Upgrades: When you upgrade mid-cycle, you will be charged the prorated difference for the remaining days in your current billing period. Your upgraded features become available immediately.

Downgrades: When you downgrade, the change takes effect at the start of your next billing cycle. You retain your current plan's features until then.

Switching to Free: Downgrading to the Free plan takes effect at the end of your current paid billing period. No refund is provided for the remaining days.`,
    },
    {
      id: 9,
      icon: <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Account Termination",
      content: `PassATS and Aryu Academy Private Limited reserve the right to suspend or terminate subscriptions and accounts that violate our Terms and Conditions or are found to be engaging in fraudulent, abusive, or harmful activity.

In cases of termination due to policy violation:
• Access to premium features will be revoked immediately.
• No refunds will be provided for the remaining subscription period.
• The decision to terminate is at our sole discretion and will be communicated by email.

If you believe a termination was made in error, contact us at support@aryuacademy.com within 7 days.`,
    },
    {
      id: 10,
      icon: <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Questions About Your Subscription",
      content: `If you have any questions, concerns, or disputes related to your subscription, billing, or refund, please contact our support team:

Email: support@aryuacademy.com
Website: passats.aryuacademy.com
Company: Aryu Academy Private Limited, Chennai, Tamil Nadu, India

We aim to respond to all subscription-related queries within 2 business days.`,
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
              <FiCreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Subscription & Billing
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Subscription Policy
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto">
              Transparent, secure, and flexible plans designed for your career
              success with PassATS.
            </p>

            <p className="mt-2 text-[11px] sm:text-xs text-gray-400 max-w-2xl mx-auto">
              Please read carefully before subscribing
            </p>
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
              Have Questions About Your Subscription?
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
              Contact our support team for assistance with billing,
              cancellation, or refunds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:passats@aryuacademy.com"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-indigo-600 font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm md:text-base"
              >
                <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                passats@aryuacademy.com
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-white/20 transition-all text-xs sm:text-sm md:text-base"
              >
                Contact Support
                <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>

          
        </div>
      </section>
    </>
  );
}
