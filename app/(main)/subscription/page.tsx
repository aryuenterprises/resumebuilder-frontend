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
// } from 'react-icons/fi';

// // Define TypeScript interfaces
// interface SubscriptionSectionProps {
//   icon: React.ReactNode;
//   title: string;
//   text: string;
// }

// interface PolicySection {
//   id: string;
//   icon: React.ReactNode;
//   title: string;
//   text: string;
// }

// interface PaymentMethod {
//   id: string;
//   name: string;
//   icon: string;
// }

// interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Reusable Policy Section Component
// const SubscriptionSection = ({ icon, title, text }: SubscriptionSectionProps) => {
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

// const Subscription = () => {
//   // Policy sections data
//   const policySections: PolicySection[] = [
//     {
//       id: 'plans',
//       icon: <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Subscription Plans',
//       text: 'ARYU SmartCV offers multiple subscription plans that provide access to premium templates, AI tools, and career-boosting features. Please review each plan carefully before subscribing.',
//     },
//     {
//       id: 'trial',
//       icon: <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Free Trial (if available)',
//       text: 'Some plans include a free trial. Once the trial ends, your subscription will automatically continue unless cancelled before the trial period expires.',
//     },
//     {
//       id: 'billing',
//       icon: <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Billing & Payment',
//       text: 'All payments are securely processed through Stripe. Subscriptions renew automatically at the end of each billing period unless cancelled beforehand. You\'ll receive email notifications before renewal.',
//     },
//     {
//       id: 'cancellation',
//       icon: <FiXCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Cancellation',
//       text: 'You may cancel your subscription anytime from your account settings. Premium access remains active until the end of your current billing cycle. No partial refunds are provided for mid-cycle cancellations.',
//     },
//     {
//       id: 'refunds',
//       icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Refunds',
//       text: 'Payments are generally non-refundable except when required by law or under special circumstances. Refund requests are reviewed on a case-by-case basis within 14 days of purchase.',
//     },
//     {
//       id: 'changes',
//       icon: <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Changes to Subscription',
//       text: 'We may update pricing, features, or plans periodically. Any changes will apply to future billing cycles only, with a 30-day notice for price increases.',
//     },
//     {
//       id: 'responsibility',
//       icon: <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Your Responsibility',
//       text: 'You are responsible for keeping your billing information accurate and ensuring payments are made on time. Failed payments may result in temporary suspension of premium features.',
//     },
//     {
//       id: 'upgrades',
//       icon: <FiArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Plan Upgrades & Downgrades',
//       text: 'You can upgrade or downgrade your plan at any time. When upgrading, prorated charges may apply. When downgrading, changes take effect at the start of your next billing cycle.',
//     },
//     {
//       id: 'termination',
//       icon: <FiXCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />,
//       title: 'Account Termination',
//       text: 'ARYU SmartCV reserves the right to terminate subscriptions that violate our Terms of Service. In such cases, no refunds will be provided.',
//     },
//   ];

  

//   return (
//     <div className="bg-gradient-to-r from-red-50/50 to-white min-h-screen">
//       <div className="p-4 sm:p-6 md:p-12 lg:p-20">
//         {/* Hero Section */}
//         <section className="text-center">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent">
//             Subscription Policy
//           </h1>
//           <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
//             Transparent, secure and flexible plans designed for your career
//             success with ARYU SmartCV.
//           </p>
//         </section>

//         {/* Policy Sections */}
//         <section className="max-w-4xl md:max-w-6xl mt-8 md:mt-10 mx-auto">
//           <div className="bg-white/80 md:bg-white/70 backdrop-blur-xl border border-red-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm sm:shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10 md:space-y-12">
//             {/* Map through policy sections */}
//             {policySections.map((section) => (
//               <SubscriptionSection
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

const Subscription = () => {
  // Policy sections data
  const policySections: PolicySection[] = [
    {
      id: 'plans',
      icon: <FiFileText className="w-5 h-5" />,
      title: 'Subscription Plans',
      text: 'ARYU SmartCV offers multiple subscription plans that provide access to premium templates, AI tools, and career-boosting features. Please review each plan carefully before subscribing.',
    },
    {
      id: 'trial',
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: 'Free Trial (if available)',
      text: 'Some plans include a free trial. Once the trial ends, your subscription will automatically continue unless cancelled before the trial period expires.',
    },
    {
      id: 'billing',
      icon: <FiCreditCard className="w-5 h-5" />,
      title: 'Billing & Payment',
      text: 'All payments are securely processed through Stripe. Subscriptions renew automatically at the end of each billing period unless cancelled beforehand. You\'ll receive email notifications before renewal.',
    },
    {
      id: 'cancellation',
      icon: <FiXCircle className="w-5 h-5" />,
      title: 'Cancellation',
      text: 'You may cancel your subscription anytime from your account settings. Premium access remains active until the end of your current billing cycle. No partial refunds are provided for mid-cycle cancellations.',
    },
    {
      id: 'refunds',
      icon: <FiShield className="w-5 h-5" />,
      title: 'Refunds',
      text: 'Payments are generally non-refundable except when required by law or under special circumstances. Refund requests are reviewed on a case-by-case basis within 14 days of purchase.',
    },
    {
      id: 'changes',
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: 'Changes to Subscription',
      text: 'We may update pricing, features, or plans periodically. Any changes will apply to future billing cycles only, with a 30-day notice for price increases.',
    },
    {
      id: 'responsibility',
      icon: <FiFileText className="w-5 h-5" />,
      title: 'Your Responsibility',
      text: 'You are responsible for keeping your billing information accurate and ensuring payments are made on time. Failed payments may result in temporary suspension of premium features.',
    },
    {
      id: 'upgrades',
      icon: <FiArrowUpCircle className="w-5 h-5" />,
      title: 'Plan Upgrades & Downgrades',
      text: 'You can upgrade or downgrade your plan at any time. When upgrading, prorated charges may apply. When downgrading, changes take effect at the start of your next billing cycle.',
    },
    {
      id: 'termination',
      icon: <FiXCircle className="w-5 h-5" />,
      title: 'Account Termination',
      text: 'ARYU SmartCV reserves the right to terminate subscriptions that violate our Terms of Service. In such cases, no refunds will be provided.',
    },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <FiInfo className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Subscription Policy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Subscription Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Transparent, secure and flexible plans designed for your career success with ARYU SmartCV.
          </p>
        </motion.div>

       

        {/* Policy Sections */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Subscription Terms & Conditions</h2>
            <p className="text-indigo-100 text-sm mt-1">Please read carefully before subscribing</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6 divide-y divide-gray-100">
            {policySections.map((section, idx) => (
              <div key={section.id} className={idx > 0 ? "pt-6" : ""}>
                <SubscriptionSection
                  icon={section.icon}
                  title={section.title}
                  text={section.text}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Have questions about subscription?</h3>
          <p className="text-sm text-gray-500 mb-4">Contact our support team for assistance</p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Contact Support
            <FiArrowUpCircle className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;