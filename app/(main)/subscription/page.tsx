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

// const Subscription = () => {
//   // Policy sections data
//   const policySections: PolicySection[] = [
//     {
//       id: 'plans',
//       icon: <FiFileText className="w-5 h-5" />,
//       title: 'Subscription Plans',
//       text: 'PassATS offers multiple subscription plans that provide access to premium templates, AI tools, and career-boosting features. Please review each plan carefully before subscribing.',
//     },
//     {
//       id: 'trial',
//       icon: <FiRefreshCw className="w-5 h-5" />,
//       title: 'Free Trial (if available)',
//       text: 'Some plans include a free trial. Once the trial ends, your subscription will automatically continue unless cancelled before the trial period expires.',
//     },
//     {
//       id: 'billing',
//       icon: <FiCreditCard className="w-5 h-5" />,
//       title: 'Billing & Payment',
//       text: 'All payments are securely processed through Stripe. Subscriptions renew automatically at the end of each billing period unless cancelled beforehand. You\'ll receive email notifications before renewal.',
//     },
//     {
//       id: 'cancellation',
//       icon: <FiXCircle className="w-5 h-5" />,
//       title: 'Cancellation',
//       text: 'You may cancel your subscription anytime from your account settings. Premium access remains active until the end of your current billing cycle. No partial refunds are provided for mid-cycle cancellations.',
//     },
//     {
//       id: 'refunds',
//       icon: <FiShield className="w-5 h-5" />,
//       title: 'Refunds',
//       text: 'Payments are generally non-refundable except when required by law or under special circumstances. Refund requests are reviewed on a case-by-case basis within 14 days of purchase.',
//     },
//     {
//       id: 'changes',
//       icon: <FiRefreshCw className="w-5 h-5" />,
//       title: 'Changes to Subscription',
//       text: 'We may update pricing, features, or plans periodically. Any changes will apply to future billing cycles only, with a 30-day notice for price increases.',
//     },
//     {
//       id: 'responsibility',
//       icon: <FiFileText className="w-5 h-5" />,
//       title: 'Your Responsibility',
//       text: 'You are responsible for keeping your billing information accurate and ensuring payments are made on time. Failed payments may result in temporary suspension of premium features.',
//     },
//     {
//       id: 'upgrades',
//       icon: <FiArrowUpCircle className="w-5 h-5" />,
//       title: 'Plan Upgrades & Downgrades',
//       text: 'You can upgrade or downgrade your plan at any time. When upgrading, prorated charges may apply. When downgrading, changes take effect at the start of your next billing cycle.',
//     },
//     {
//       id: 'termination',
//       icon: <FiXCircle className="w-5 h-5" />,
//       title: 'Account Termination',
//       text: 'PassATS reserves the right to terminate subscriptions that violate our Terms of Service. In such cases, no refunds will be provided.',
//     },
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
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//             <FiInfo className="w-3.5 h-3.5 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               Subscription Policy
//             </span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Subscription Policy
//           </h1>
//           <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
//             Transparent, secure and flexible plans designed for your career success with PassATS.
//           </p>
//         </motion.div>

       

//         {/* Policy Sections */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
//             <h2 className="text-xl font-bold text-white">Subscription Terms & Conditions</h2>
//             <p className="text-indigo-100 text-sm mt-1">Please read carefully before subscribing</p>
//           </div>

//           <div className="p-6 sm:p-8 space-y-6 divide-y divide-gray-100">
//             {policySections.map((section, idx) => (
//               <div key={section.id} className={idx > 0 ? "pt-6" : ""}>
//                 <SubscriptionSection
//                   icon={section.icon}
//                   title={section.title}
//                   text={section.text}
//                   index={idx}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Contact Support Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Have questions about subscription?</h3>
//           <p className="text-sm text-gray-500 mb-4">Contact our support team for assistance</p>
//           <a
//             href="/contact-us"
//             className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
//           >
//             Contact Support
//             <FiArrowUpCircle className="w-4 h-4" />
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Subscription;










'use client';
import React from 'react';
import {
  FiCreditCard,
  FiRefreshCw,
  FiXCircle,
  FiShield,
  FiFileText,
  FiArrowUpCircle,
  FiDownload,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface SubscriptionSectionProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  index: number;
}

interface PolicySection {
  id: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}

// Reusable Policy Section Component
const SubscriptionSection = ({ icon, title, text, index }: SubscriptionSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
    >
      <div className="flex-shrink-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-base sm:text-lg md:text-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
          {title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

const Subscription = () => {
  // Policy sections data
  const policySections: PolicySection[] = [
    {
      id: 'plans',
      icon: <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Subscription Plans',
      text: 'PassATS offers multiple subscription plans that provide access to premium templates, AI tools, and career-boosting features. Please review each plan carefully before subscribing.',
    },
    {
      id: 'trial',
      icon: <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Free Trial (if available)',
      text: 'Some plans include a free trial. Once the trial ends, your subscription will automatically continue unless cancelled before the trial period expires.',
    },
    {
      id: 'billing',
      icon: <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Billing & Payment',
      text: 'All payments are securely processed through Stripe. Subscriptions renew automatically at the end of each billing period unless cancelled beforehand. You\'ll receive email notifications before renewal.',
    },
    {
      id: 'cancellation',
      icon: <FiXCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Cancellation',
      text: 'You may cancel your subscription anytime from your account settings. Premium access remains active until the end of your current billing cycle. No partial refunds are provided for mid-cycle cancellations.',
    },
    {
      id: 'refunds',
      icon: <FiShield className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Refunds',
      text: 'Payments are generally non-refundable except when required by law or under special circumstances. Refund requests are reviewed on a case-by-case basis within 14 days of purchase.',
    },
    {
      id: 'changes',
      icon: <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Changes to Subscription',
      text: 'We may update pricing, features, or plans periodically. Any changes will apply to future billing cycles only, with a 30-day notice for price increases.',
    },
    {
      id: 'responsibility',
      icon: <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Your Responsibility',
      text: 'You are responsible for keeping your billing information accurate and ensuring payments are made on time. Failed payments may result in temporary suspension of premium features.',
    },
    {
      id: 'upgrades',
      icon: <FiArrowUpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Plan Upgrades & Downgrades',
      text: 'You can upgrade or downgrade your plan at any time. When upgrading, prorated charges may apply. When downgrading, changes take effect at the start of your next billing cycle.',
    },
    {
      id: 'termination',
      icon: <FiXCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />,
      title: 'Account Termination',
      text: 'PassATS reserves the right to terminate subscriptions that violate our Terms of Service. In such cases, no refunds will be provided.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50/20">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-indigo-50 rounded-full filter blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4">
            <FiInfo className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
            <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Subscription Policy
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent px-3">
            Subscription Policy
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto px-4">
            Transparent, secure and flexible plans designed for your career success with PassATS.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Subscription Terms & Conditions</h2>
            <p className="text-indigo-100 text-[11px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">Please read carefully before subscribing</p>
          </div>

          <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 divide-y divide-gray-100">
            {policySections.map((section, idx) => (
              <div key={section.id} className={idx > 0 ? "pt-4 sm:pt-5 md:pt-6" : ""}>
                <SubscriptionSection
                  icon={section.icon}
                  title={section.title}
                  text={section.text}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 sm:p-6 border border-indigo-100"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Have questions about subscription?</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Contact our support team for assistance</p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 text-xs sm:text-sm md:text-base"
          >
            Contact Support
            <FiArrowUpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <p className="text-[10px] sm:text-xs text-gray-400">
            PassATS is a product of Aryu Academy Private Limited
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;