

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiStar,
//   FiHeart,
//   FiX,
// } from "react-icons/fi";
// import {
//   IoSparkles,
//   IoCheckmarkCircle,
// } from "react-icons/io5";
// import { FaCrown, FaGem } from "react-icons/fa";
// import Header from "@/app/components/layouts/Header";
// import { useRouter } from "next/navigation";
// import Footer from "../../components/layouts/Footer";

// // Plan Types
// interface PlanFeature {
//   name: string;
//   included: boolean;
//   highlight?: boolean;
// }

// interface Plan {
//   id: string;
//   name: string;
//   price: number;
//   interval: "month" | "year" | "one-time";
//   description: string;
//   features: PlanFeature[];
//   popular?: boolean;
//   color: string;
//   icon: React.ReactNode;
//   badge?: string;
//   savings?: string;
// }

// export default function ChoosePlanPage() {
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
//   const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);


//   const plans: Plan[] = [
//     {
//       id: "free",
//       name: "Free",
//       price: 0,
//       interval: "one-time",
//       description: "Perfect for getting started with basic resume creation",
//       color: "from-purple-500 to-indigo-500",

//       icon: <FiHeart className="w-6 h-6" />,
//       features: [
//         { name: "1 Resume Template", included: true },
//         { name: "Basic ATS Optimization", included: true },
//         { name: "PDF Download", included: true },
//         { name: "AI-Powered Suggestions", included: true },
//         { name: "Multiple Templates", included: false },
//         { name: "Photo Upload", included: false },
//       ],
//     },
//     {
//       id: "pro",
//       name: "Pro",
//       price: 5.99,
//       interval: "month",
//       description: "Ideal for professionals looking to stand out",
//       popular: true,
//       color: "from-[#C40116] to-[#5E000B]",
//       icon: <FaCrown className="w-6 h-6" />,
//       badge: "Most Popular",
//       features: [
//         { name: "5 Resume Templates", included: true, highlight: true },
//         { name: "Advanced ATS Optimization", included: true, highlight: true },
//         { name: "PDF + Word Downloads", included: true },
//         { name: "AI-Powered Suggestions", included: true, highlight: true },
//         { name: "Photo Upload", included: true },
//         { name: "Cover Letter Builder", included: true },
//         { name: "Interview Prep Kit", included: false },
//       ],
//     },
//     {
//       id: "premium",
//       name: "Premium",
//       price: 10.99,
//       interval: "month",
//       description: "Complete career toolkit for serious job seekers",
//       color: "from-amber-500 to-orange-500",
//       icon: <FaGem className="w-6 h-6" />,
//       badge: "Best Value",
//       features: [
//         { name: "All  Templates", included: true, highlight: true },
//         { name: "Premium ATS Optimization", included: true, highlight: true },
//         { name: "All Format Downloads", included: true },
//         { name: "Unlimited AI Suggestions", included: true, highlight: true },
//         { name: "Photo Upload + Editing", included: true },
//         { name: "Cover Letter Builder", included: true },
//         { name: "Interview Prep Kit", included: true, highlight: true },
//       ],
//     },
//     // {
//     //   id: "business",
//     //   name: "Business",
//     //   price: 49.99,
//     //   interval: "month",
//     //   description: "For teams and organizations",
//     //   color: "from-purple-500 to-indigo-500",
//     //   icon: <FiUsers className="w-6 h-6" />,
//     //   features: [
//     //     { name: "Everything in Premium", included: true },
//     //     { name: "Team Management", included: true, highlight: true },
//     //     { name: "5 Team Members", included: true },
//     //     { name: "Collaboration Tools", included: true, highlight: true },
//     //     { name: "Admin Dashboard", included: true },
//     //     { name: "API Access", included: true },
//     //     { name: "Dedicated Account Manager", included: true, highlight: true },
//     //     { name: "Custom Branding", included: true },
//     //     { name: "Bulk Operations", included: true },
//     //     { name: "SSO Integration", included: true },
//     //   ],
//     // },
//   ];

//   const handleSelectPlan = (planId: string) => {
//     setSelectedPlan(planId);

//   };

//   // Comparison features for the table
//   const comparisonFeatures = [
//     { name: "Templates", free: "1", pro: "5", premium: "All" },
//     {
//       name: "ATS Optimization",
//       free: "Basic",
//       pro: "Advanced",
//       premium: "Premium",
//     },
//     {
//       name: "AI Suggestions",
//       free: "✅",
//       pro: "✅",
//       premium: "Unlimited",
//     },
//     {
//       name: "Photo Upload",
//       free: "❌",
//       pro: "✅",
//       premium: "✅ ",
//     },
//     {
//       name: "Cover Letter",
//       free: "❌",
//       pro: "✅",
//       premium: "✅",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">

//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-linear-to-r from-[#5E000B] to-[#C40116]">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
//               <div className="px-4 py-2 bg-linear-to-r from-yellow-600 to-amber-500 text-white rounded-xl font-semibold flex items-center gap-2">
//                 <IoSparkles className="w-5 h-5" />
//                 <span>Special Launch Offer - Save up to 30%</span>
//               </div>
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
//               Choose Your Perfect
//               <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-200">
//                 Career Growth Plan
//               </span>
//             </h1>

//             <p className="text-xl text-white/90 max-w-3xl mx-auto">
//               Unlock premium features, AI-powered suggestions, and professional
//               templates to land your dream job faster.
//             </p>
//           </motion.div>
//         </div>

//         {/* Curved Bottom */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//             className="w-full h-12 sm:h-16 lg:h-20"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
//         {/* Plans Grid */}
//         <div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
//          gap-6 lg:gap-8"
//         >
//           {plans.map((plan, index) => {
//             const isSelected = selectedPlan === plan.id;
//             const isHovered = hoveredPlan === plan.id;
//             const yearlyPrice = plan.price;

//             return (
//               <motion.div
//                 key={plan.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 onMouseEnter={() => setHoveredPlan(plan.id)}
//                 onMouseLeave={() => setHoveredPlan(null)}
//                 className={`
//                   relative group cursor-pointer rounded-2xl transition-all duration-500
//                   ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}
//                   ${isSelected ? "ring-2 ring-[#C40116] ring-offset-2" : ""}
//                 `}
//                 onClick={() => handleSelectPlan(plan.id)}
//               >
//                 {/* Popular Badge */}
//                 {plan.popular && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
//                     <div className="px-4 py-2 bg-linear-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
//                       <FiStar className="w-4 h-4" />
//                       {plan.badge}
//                     </div>
//                   </div>
//                 )}

//                 {/* Plan Card */}
//                 <div
//                   className={`
//                     relative h-full bg-white rounded-2xl overflow-hidden
//                     transition-all duration-500
//                     ${isHovered ? "scale-105 shadow-2xl" : "shadow-soft"}
//                     ${plan.popular ? "shadow-xl border-2 border-[#C40116]" : "border border-gray-200"}
//                   `}
//                 >
//                   {/* Card Header with Gradient */}
//                   <div
//                     className={`bg-linear-to-r ${plan.color} p-6 text-white relative overflow-hidden`}
//                   >
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
//                     <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-8 -mb-8"></div>

//                     <div className="relative">
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
//                           {plan.icon}
//                         </div>
//                         {plan.badge && !plan.popular && (
//                           <span className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
//                             {plan.badge}
//                           </span>
//                         )}
//                       </div>

//                       <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
//                       <p className="text-white/80 text-sm mb-4">
//                         {plan.description}
//                       </p>

//                       <div className="flex items-baseline gap-1">
//                         <span className="text-4xl font-bold">{plan.price}</span>
//                         {plan.price > 0 && (
//                           <span className="text-white/80 text-sm">month</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Features List */}
//                   <div className="p-6">
//                     <ul className="space-y-3">
//                       {plan.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-start gap-2">
//                           {feature.included ? (
//                             <IoCheckmarkCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
//                           ) : (
//                             <FiX className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
//                           )}
//                           <span
//                             className={`text-sm ${
//                               feature.highlight
//                                 ? "text-gray-900 font-semibold"
//                                 : feature.included
//                                   ? "text-gray-700"
//                                   : "text-gray-400"
//                             }`}
//                           >
//                             {feature.name}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* Select Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleSelectPlan(plan.id);
//                       }}
//                       className={`
//                         w-full mt-6 py-3.5 rounded-xl font-semibold text-sm
//                         transition-all duration-300 relative overflow-hidden group/btn cursor-pointer
//                         ${
//                           plan.id === "free"
//                             ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                             : `bg-linear-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
//                         }
//                       `}
//                     >
//                       <span className="relative z-10">
//                         {plan.id === "free"
//                           ? "Get Started Free"
//                           : `Choose ${plan.name}`}
//                       </span>
//                       {plan.id !== "free" && (
//                         <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Feature Comparison Table */}
//         <div className="mt-20">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Compare All Features
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               See exactly what you get with each plan and choose the one that
//               fits your needs
//             </p>
//           </div>

//           <div className="overflow-x-auto bg-white rounded-2xl shadow-soft border border-gray-200">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="p-6 text-left text-sm font-semibold text-gray-900">
//                     Features
//                   </th>
//                   {plans.map((plan) => (
//                     <th key={plan.id} className="p-6 text-center">
//                       <div
//                         className={`text-lg font-bold bg-linear-to-r ${plan.color} bg-clip-text text-transparent`}
//                       >
//                         {plan.name}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {comparisonFeatures.map((feature, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-b border-gray-100 last:border-0"
//                   >
//                     <td className="p-6 text-sm text-gray-700 font-medium">
//                       {feature.name}
//                     </td>
//                     <td className="p-6 text-center text-sm text-gray-600">
//                       {feature.free}
//                     </td>
//                     <td className="p-6 text-center text-sm text-gray-600 font-medium">
//                       {feature.pro}
//                     </td>
//                     <td className="p-6 text-center text-sm text-gray-600 font-medium">
//                       {feature.premium}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="mt-20">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Everything you need to know about our plans and billing
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               {
//                 q: "Can I switch plans later?",
//                 a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
//               },
//               {
//                 q: "What payment methods do you accept?",
//                 a: "We accept all cards and UPI",
//               },
//               {
//                 q: "Is there a free trial?",
//                 a: "Yes! All paid plans come with a 7-day free trial. No credit card required.",
//               },
//               {
//                 q: "Can I cancel anytime?",
//                 a: "Absolutely. You can cancel your subscription at any time from your account settings.",
//               },

//               {
//                 q: "What's included in the free plan?",
//                 a: "The free plan includes 1 template, basic ATS optimization, and PDF downloads forever.",
//               },
//             ].map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
//               >
//                 <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
//                 <p className="text-sm text-gray-600">{faq.a}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Trust Badges */}
//         <div className="mt-20 text-center">
//           <p className="text-sm text-gray-500 mb-6">
//             Trusted by professionals at
//           </p>
//           <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
//             <span className="text-lg font-semibold text-gray-400">Google</span>
//             <span className="text-lg font-semibold text-gray-400">
//               Microsoft
//             </span>
//             <span className="text-lg font-semibold text-gray-400">Amazon</span>
//             <span className="text-lg font-semibold text-gray-400">Meta</span>
//             <span className="text-lg font-semibold text-gray-400">Apple</span>
//             <span className="text-lg font-semibold text-gray-400">Netflix</span>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiHeart,
  FiX,
} from "react-icons/fi";
import {
  IoSparkles,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { FaCrown, FaGem } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Plan Types
interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year" | "one-time";
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  icon: React.ReactNode;
  badge?: string;
  savings?: string;
}

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      interval: "one-time",
      description: "Perfect for getting started with basic resume creation",
      color: "from-purple-500 to-indigo-500",
      icon: <FiHeart className="w-5 h-5 sm:w-6 sm:h-6" />,
      features: [
        { name: "1 Resume Template", included: true },
        { name: "Basic ATS Optimization", included: true },
        { name: "PDF Download", included: true },
        { name: "AI-Powered Suggestions", included: true },
        { name: "Multiple Templates", included: false },
        { name: "Photo Upload", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: 5.99,
      interval: "month",
      description: "Ideal for professionals looking to stand out",
      popular: true,
      color: "from-[#C40116] to-[#5E000B]",
      icon: <FaCrown className="w-5 h-5 sm:w-6 sm:h-6" />,
      badge: "Most Popular",
      features: [
        { name: "5 Resume Templates", included: true, highlight: true },
        { name: "Advanced ATS Optimization", included: true, highlight: true },
        { name: "AI-Powered Suggestions", included: true, highlight: true },
        { name: "Photo Upload", included: true },
        { name: "Cover Letter Builder", included: true },
        { name: "Interview Prep Kit", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 10.99,
      interval: "month",
      description: "Complete career toolkit for serious job seekers",
      color: "from-amber-500 to-orange-500",
      icon: <FaGem className="w-5 h-5 sm:w-6 sm:h-6" />,
      badge: "Best Value",
      features: [
        { name: "All Templates", included: true, highlight: true },
        { name: "Premium ATS Optimization", included: true, highlight: true },
        { name: "Unlimited AI Suggestions", included: true, highlight: true },
        { name: "Photo Upload", included: true },
        { name: "Cover Letter Builder", included: true },
        { name: "Interview Prep Kit", included: true, highlight: true },
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Add your navigation or plan selection logic here
  };

  // Comparison features for the table
  const comparisonFeatures = [
    { name: "Templates", free: "1", pro: "5", premium: "All" },
    {
      name: "ATS Optimization",
      free: "Basic",
      pro: "Advanced",
      premium: "Premium",
    },
    {
      name: "AI Suggestions",
      free: "✅",
      pro: "✅",
      premium: "Unlimited",
    },
    {
      name: "Photo Upload",
      free: "❌",
      pro: "✅",
      premium: "✅",
    },
    {
      name: "Cover Letter",
      free: "❌",
      pro: "✅",
      premium: "✅",
    },
    {
      name: "Interview Kit",
      free: "❌",
      pro: "❌",
      premium: "✅",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-[#5E000B] to-[#C40116]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-yellow-600 to-amber-500 text-white rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <IoSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Special Launch Offer - Save up to 30%</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4">
              Choose Your Perfect
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-200 mt-2">
                Career Growth Plan
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Unlock premium features, AI-powered suggestions, and professional
              templates to land your dream job faster.
            </p>
          </motion.div>
        </div>

        {/* Curved Bottom - Responsive height */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-8 sm:h-12 md:h-16 lg:h-20"
          >
            <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const isHovered = hoveredPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`
                  relative group cursor-pointer rounded-xl sm:rounded-2xl transition-all duration-500
                  ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}
                  ${isSelected ? "ring-2 ring-[#C40116] ring-offset-2" : ""}
                `}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-linear-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1 whitespace-nowrap">
                      <FiStar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Card */}
                <div
                  className={`
                    relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden
                    transition-all duration-500
                    ${isHovered ? "scale-105 shadow-2xl" : "shadow-lg"}
                    ${plan.popular ? "shadow-xl border-2 border-[#C40116]" : "border border-gray-200"}
                  `}
                >
                  {/* Card Header with Gradient */}
                  <div
                    className={`bg-linear-to-r ${plan.color} p-4 sm:p-5 md:p-6 text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-black/10 rounded-full -ml-8 -mb-8"></div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                          {plan.icon}
                        </div>
                        {plan.badge && !plan.popular && (
                          <span className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                        {plan.description}
                      </p>

                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                          ${plan.price}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-white/80 text-xs sm:text-sm">
                            /{plan.interval}
                          </span>
                        )}
                      </div>
                      {plan.price === 0 && (
                        <span className="text-white/80 text-xs sm:text-sm ml-1">
                          forever
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <ul className="space-y-2 sm:space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-xs sm:text-sm ${
                              feature.highlight
                                ? "text-gray-900 font-semibold"
                                : feature.included
                                  ? "text-gray-700"
                                  : "text-gray-400"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Select Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan.id);
                      }}
                      className={`
                        w-full mt-4 sm:mt-5 md:mt-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
                        transition-all duration-300 relative overflow-hidden group/btn cursor-pointer
                        ${
                          plan.id === "free"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : `bg-linear-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                        }
                      `}
                    >
                      <span className="relative z-10">
                        {plan.id === "free"
                          ? "Get Started Free"
                          : `Choose ${plan.name}`}
                      </span>
                      {plan.id !== "free" && (
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Compare All Features
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              See exactly what you get with each plan and choose the one that
              fits your needs
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
            <div className="min-w-[640px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 sm:p-6 text-left text-xs sm:text-sm font-semibold text-gray-900">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="p-4 sm:p-6 text-center">
                        <div
                          className={`text-base sm:text-lg font-bold bg-linear-to-r ${plan.color} bg-clip-text text-transparent`}
                        >
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="p-4 sm:p-6 text-xs sm:text-sm text-gray-700 font-medium">
                        {feature.name}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600">
                        {feature.free}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
                        {feature.pro}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
                        {feature.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our plans and billing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and UPI payments.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! All paid plans come with a 7-day free trial. No credit card required.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. You can cancel your subscription at any time from your account settings.",
              },
              {
                q: "What's included in the free plan?",
                a: "The free plan includes 1 template, basic ATS optimization, and PDF downloads forever.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee on all paid plans.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-50">
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Google
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Microsoft
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Amazon
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Meta
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Apple
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400">
              Netflix
            </span>
          </div>
        </div>

      
      </div>
    </div>
  );
}