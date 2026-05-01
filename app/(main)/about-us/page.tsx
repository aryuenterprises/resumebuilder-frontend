// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import Link from "next/link";
// import {
//   FiUsers,
//   FiTrendingUp,
//   FiMapPin,
//   FiDollarSign,
//   FiShield,
//   FiHeart,
//   FiTarget,
//   FiEye,
//   FiCheckCircle,
//   FiArrowRight,
//   FiGlobe,
//   FiLock,
//   FiCreditCard,
//   FiAlertCircle,
//   FiXCircle,
//   FiMail,
//   FiZap,
//   FiFileText,
// } from "react-icons/fi";
// import {
//   FaGraduationCap,
//   FaLaptopCode,
//   FaChartLine,
//   FaBuilding,
//   FaUserTie,
//   FaRegBuilding,
//   FaQuoteLeft,
// } from "react-icons/fa";
// import Testimonial from "@/app/components/sections/Testimonial";

// export default function AboutPage() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

//   const stats = [
//     {
//       value: "10,000+",
//       label: "Resumes Built",
//       icon: FiUsers,
//       suffix: "and counting",
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       value: "50,000+",
//       label: "ATS Scores ",
//       icon: FiTrendingUp,
//       suffix: "Checked",
//       gradient: "from-indigo-500 to-purple-500",
//     },
//     {
//       value: "100+",
//       label: "Cities Reached",
//       icon: FiMapPin,
//       suffix: "from metros to Tier 2",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       value: "₹49",
//       label: "Starting Price",
//       icon: FiDollarSign,
//       suffix: "10× cheaper than global tools",
//       gradient: "from-emerald-500 to-teal-500",
//     },
//   ];

//   const ecosystem = [
//     {
//       name: "Aryu Academy",
//       icon: <FaGraduationCap className="w-4 h-4" />,
//       description:
//         "Ed-tech platform — courses in Python, data science, web development, digital marketing, and more.",
//       gradient: "from-blue-500 to-cyan-500",
//       bgGradient: "from-blue-50 to-cyan-50",
//       borderColor: "border-blue-100",
//       iconBg: "bg-blue-100",
//       iconColor: "text-blue-600",
//     },
//     {
//       name: "Aryu Technologies",
//       icon: <FaLaptopCode className="w-4 h-4" />,
//       description:
//         "Technology solutions and software development for businesses across India.",
//       gradient: "from-indigo-500 to-purple-500",
//       bgGradient: "from-indigo-50 to-purple-50",
//       borderColor: "border-indigo-100",
//       iconBg: "bg-indigo-100",
//       iconColor: "text-indigo-600",
//     },
//     {
//       name: "Aryu Agency",
//       icon: <FaChartLine className="w-4 h-4" />,
//       description:
//         "Digital marketing agency — SEO, paid ads, social media, and content strategy.",
//       gradient: "from-purple-500 to-pink-500",
//       bgGradient: "from-purple-50 to-pink-50",
//       borderColor: "border-purple-100",
//       iconBg: "bg-purple-100",
//       iconColor: "text-purple-600",
//     },
//     {
//       name: "Aryu Enterprises",
//       icon: <FaBuilding className="w-4 h-4" />,
//       description:
//         "Business consulting and enterprise solutions for growing organisations.",
//       gradient: "from-emerald-500 to-teal-500",
//       bgGradient: "from-emerald-50 to-teal-50",
//       borderColor: "border-emerald-100",
//       iconBg: "bg-emerald-100",
//       iconColor: "text-emerald-600",
//     },
//   ];

//   const careerStages = [
//     {
//       title: "Fresh Graduates",
//       icon: "📚",
//       description:
//         "Entering the job market for the first time with a degree and limited work history. PassATS gives you a professional resume that competes with experienced candidates on ATS scoring.",
//       gradient: "from-indigo-500 to-purple-500",
//     },
//     {
//       title: "Government / PSU Applicants",
//       icon: "🏛️",
//       description:
//         "Applying for banking, UPSC, PSU, or state government roles. PassATS provides English-format government resume templates with photo box, category fields, and declaration footer.",
//       gradient: "from-emerald-500 to-teal-500",
//     },
//     {
//       title: "Working Professionals",
//       icon: "💼",
//       description:
//         "Ready for your next role, a promotion, or a career switch. PassATS helps you reframe experience as achievements, tailor your resume to each JD, and improve your ATS score before applying.",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       title: "Career Switchers",
//       icon: "🔄",
//       description:
//         "Moving from one industry or function to another. PassATS helps you highlight transferable skills and reposition your experience for a new direction.",
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       title: "Final-Year Students",
//       icon: "🎓",
//       description:
//         "Applying for campus placements  PassATS helps you turn projects and internships into achievement even with no full-time experience.",
//       gradient: "from-blue-500 to-cyan-500",
//     },
//   ];

//   const promises = [
//     {
//       icon: <FiShield className="w-4 h-4" />,
//       title: "Never Sell Your Data",
//       description:
//         "We will never sell your resume data to employers, recruiters, or data brokers.",
//     },
//     {
//       icon: <FiLock className="w-4 h-4" />,
//       title: "No AI Training Without Consent",
//       description:
//         "We will never use your resume content to train AI models without your explicit consent.",
//     },
//     {
//       icon: <FiCreditCard className="w-4 h-4" />,
//       title: "No Billing Tricks",
//       description:
//         "We will never auto-charge you without clear notice — no trial traps, no billing tricks.",
//     },
//     {
//       icon: <FiEye className="w-4 h-4" />,
//       title: "Real Numbers",
//       description:
//         "We will always show you real numbers — not inflated stats designed to look impressive.",
//     },
//     {
//       icon: <FiHeart className="w-4 h-4" />,
//       title: "Genuinely Useful Free Plan",
//       description:
//         "We will always offer a free plan that is genuinely useful — not a tease that forces you to pay immediately.",
//     },
//     {
//       icon: <FiDollarSign className="w-4 h-4" />,
//       title: "Priced in INR",
//       description:
//         "We will always price in INR — because you earn in rupees, and you should pay in rupees.",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white"
//       >
//         <motion.div
//           style={{ opacity, scale }}
//           className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-5xl mx-auto"
//           >
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
//             >
//               We Built the Resume Tool
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
//                 Job Seekers Actually Needed!
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-base md:text-lg text-white/95 mb-8 mx-auto"
//             >
//               PassATS is an AI-powered resume builder built from the ground up
//               for the Global job market — by the team behind Aryu Academy, one
//               of India's growing ed-tech platforms.
//             </motion.p>
//           </motion.div>
//         </motion.div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             preserveAspectRatio="none"
//             className="w-full h-10"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" />
//           </svg>
//         </div>
//       </section>

//       {/* About Aryu Academy */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
//             >
//               <FaRegBuilding className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Who We Are
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Backed by{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Aryu Academy
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm md:text-base overflow-x-hidden">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-4"
//             >
//               <p className="text-gray-600 leading-relaxed ">
//                 PassATS is a product of Aryu Academy — an ed-tech platform based
//                 in Chennai, Tamil Nadu, that has been training students and
//                 working professionals in technology, digital marketing, and
//                 career-ready skills.
//               </p>
//               <p className="text-gray-600 leading-relaxed ">
//                 Aryu Academy was built on a single belief: that the gap between
//                 learning a skill and getting hired for it should not exist. Our
//                 courses are practical, our instructors are industry
//                 professionals, and our focus has always been on real outcomes —
//                 not just certificates.
//               </p>
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
//                 <FaQuoteLeft className="w-5 h-5 md:w-6 sm:h-6 text-indigo-400 mb-2" />
//                 <p className="text-indigo-800 font-medium  leading-relaxed">
//                   PassATS is the next step in that mission. Once a student
//                   completes a course at Aryu Academy, they need a resume that
//                   communicates their new skills clearly, gets past ATS, and
//                   lands them interviews. PassATS is that bridge.
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 shadow-md"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
//                   <FaBuilding className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 The Aryu Ecosystem
//               </h3>
//               <div className="space-y-3">
//                 {ecosystem.map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: 20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: idx * 0.1 }}
//                     viewport={{ once: true }}
//                     whileHover={{ x: 3 }}
//                     className={`flex gap-3 p-3 rounded-lg bg-gradient-to-r ${item.bgGradient} border ${item.borderColor} transition-all`}
//                   >
//                     <div
//                       className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0`}
//                     >
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 ">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-gray-500 mt-0.5">
//                         {item.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* The Problem Section */}
//       <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
//         {/* Premium background accents */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-white -z-10"></div>
//         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-50/20 to-transparent rounded-full blur-3xl -z-10"></div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
//             {/* Problem Card - Left Side */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="group relative bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
//             >
//               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"></div>

//               <div className="p-5 md:p-6">
//                 {/* Badge */}
//                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/60 mb-3">
//                   <div className="w-1 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>
//                   <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
//                     The Problem
//                   </span>
//                 </div>

//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight mb-2">
//                   The Gap No One
//                   <span className=" ms-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
//                     Was Filling
//                   </span>
//                 </h2>

//                 <div className="space-y-2 text-sm text-slate-600">
//                   <p>
//                     At Aryu Academy, we have trained thousands of students
//                     globally in Python, data science, full-stack, and more.
//                   </p>
//                   <p className="font-semibold text-slate-800">
//                     Then we watched them struggle to get shortlisted.
//                   </p>
//                   <p>
//                     The problem was never their skills. It was their resume.
//                   </p>

//                   {/* Compact statistic card */}
//                   <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-3 mt-2">
//                     <p className="text-white text-xl font-bold">
//                       75%{" "}
//                       <span className="text-sm font-normal text-indigo-200">
//                         of resumes
//                       </span>
//                     </p>
//                     <p className="text-indigo-200 text-sm font-medium">
//                       filtered out by ATS before human review
//                     </p>
//                   </div>

//                   {/* Compact CTA */}
//                   <div className="flex items-center gap-2 pt-1">
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center">
//                       <svg
//                         className="w-3.5 h-3.5 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                     </div>
//                     <p className="font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
//                       We built a tool that actually fixes the problem.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Comparison Table Card - Right Side */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl"
//             >
//               <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-2xl"></div>
//               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-600/20 rounded-full blur-2xl"></div>

//               <div className="relative p-4 sm:p-5 md:p-6 z-10">
//                 {/* Header */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
//                     <svg
//                       className="w-4 h-4 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
//                       Comparison
//                     </p>
//                     <h3 className="text-base font-bold text-white leading-tight">
//                       Global Tools vs PassATS
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Premium Table */}
//                 <div className="overflow-hidden rounded-xl border border-white/10">
//                   <table className="w-full text-sm">
//                     {/* Table Header */}
//                     <thead className="bg-white/5 border-b border-white/10">
//                       <tr>
//                         <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 w-2/5">
//                           Feature
//                         </th>
//                         <th className="text-left py-2.5 px-3 text-xs font-semibold text-red-300">
//                           Other Tools
//                         </th>
//                         <th className="text-left py-2.5 px-3 text-xs font-semibold text-green-300">
//                           PassATS
//                         </th>
//                       </tr>
//                     </thead>
//                     {/* Table Body */}
//                     <tbody className="divide-y divide-white/5">
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Pricing
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           $30-60/month
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           $3/month
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Templates
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           Generic
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           Role-specific
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Currency
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           USD only
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           Multi-currency
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           ATS Optimization
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           Limited
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           Advanced AI
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Billing
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           Hidden fees
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           100% transparent
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
//         <div className="relative z-10 max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-3"
//             >
//               <FiZap className="w-3 h-3 text-white" />
//               <span className="text-[11px] font-medium text-white">
//                 Real Impact
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
//               PassATS by the Numbers
//             </h2>
//             <p className="text-indigo-100 text-sm">
//               Real results from real job seekers
//             </p>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all">
//                   <div
//                     className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-2`}
//                   >
//                     <stat.icon className="w-3 h-3 md:w-5 md:h-5 text-white" />
//                   </div>
//                   <div className="text-lg font-bold text-white">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-indigo-100">{stat.label}</div>
//                   <div className="text-sm text-indigo-100 ">{stat.suffix}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission & Values */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
//             >
//               <FiTarget className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Our Mission
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               What We Stand For
//             </h2>
//           </div>

//           <div className="relative mb-10">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-xl opacity-30" />
//             <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-center shadow-xl">
//               <FaQuoteLeft className="w-8 h-8 text-white/30 mx-auto mb-3" />
//               <p className="text-base md:text-lg font-bold text-white leading-relaxed">
//                 "To make every Indian job seeker — regardless of city, college,
//                 or background — able to present their skills on a resume that
//                 gets through ATS, gets read by recruiters, and gets them in the
//                 room."
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {[
//               {
//                 icon: <FiHeart className="w-4 h-4" />,
//                 title: "Honesty First",
//                 description:
//                   "No fake stats. No trial traps. No inflated numbers.",
//                 gradient: "from-blue-500 to-cyan-500",
//                 bgGradient: "from-blue-50 to-cyan-50",
//               },
//               {
//                 icon: <FiGlobe className="w-4 h-4" />,
//                 title: "India First",
//                 description:
//                   "Every feature, every template, every pricing decision is made with the Indian job seeker in mind.",
//                 gradient: "from-indigo-500 to-purple-500",
//                 bgGradient: "from-indigo-50 to-purple-50",
//               },
//               {
//                 icon: <FiTrendingUp className="w-4 h-4" />,
//                 title: "Outcomes Over Aesthetics",
//                 description:
//                   "A beautiful resume that doesn't get viewed is useless. We optimize for results.",
//                 gradient: "from-purple-500 to-pink-500",
//                 bgGradient: "from-purple-50 to-pink-50",
//               },
//             ].map((value, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className={`bg-gradient-to-br ${value.bgGradient} rounded-xl p-5 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all`}
//               >
//                 <div
//                   className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
//                 >
//                   <div className="text-white">{value.icon}</div>
//                 </div>
//                 <h3 className="text-base font-bold text-gray-900 mb-2">
//                   {value.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Career Stages */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
//               <FiUsers className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 For Everyone
//               </span>
//             </div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Built for{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Every Stage of Your Career
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {careerStages.map((stage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -3 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all">
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stage.gradient} flex items-center justify-center text-xl shadow-md flex-shrink-0`}
//                     >
//                       {stage.icon}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900  mb-1">
//                         {stage.title}
//                       </h3>
//                       <p className="text-sm text-gray-500 leading-relaxed">
//                         {stage.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Promises Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-indigo-100 mb-3"
//             >
//               <FiShield className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Our Commitment
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               What We Promise You
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {promises.map((promise, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -3 }}
//                 className="bg-white rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
//                     {promise.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900  mb-1">
//                       {promise.title}
//                     </h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">
//                       {promise.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Testimonial />

//       {/* Contact Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
//             >
//               <FiMail className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Get in Touch
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Connect With{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Our Team
//               </span>
//             </h2>
//           </div>

//           {/* Location Description */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             viewport={{ once: true }}
//             className="text-center max-w-2xl mx-auto mb-12"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//               <FiMapPin className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700">
//                 Based in Chennai
//               </span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3">
//               Building for All of India
//             </h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               PassATS is developed and maintained by the team at Aryu Academy,
//               headquartered in Chennai, Tamil Nadu. We are a team of educators,
//               engineers, and career coaches who have seen firsthand how much a
//               well-crafted resume can change someone's professional trajectory.
//             </p>
//           </motion.div>

//           {/* Contact Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {[
//               {
//                 icon: <FiMail className="w-5 h-5" />,
//                 title: "Email Us",
//                 value: "support@aryuacademy.com",
//                 description: "For support, feedback, or partnership enquiries",
//                 gradient: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: <FiGlobe className="w-5 h-5" />,
//                 title: "Website",
//                 value: "passats.aryuacademy.com",
//                 description: "Build your resume and get your ATS score",
//                 gradient: "from-indigo-500 to-purple-500",
//               },
//               {
//                 icon: <FiMapPin className="w-5 h-5" />,
//                 title: "Location",
//                 value: "Chennai, Tamil Nadu",
//                 description: "Aryu Academy Private Limited, India",
//                 gradient: "from-purple-500 to-pink-500",
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all">
//                   <div
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
//                   >
//                     <div className="text-white">{item.icon}</div>
//                   </div>
//                   <h3 className="text-base font-bold text-gray-900 mb-1">
//                     {item.title}
//                   </h3>
//                   {item.value.startsWith("http") ? (
//                     <a
//                       href={item.value}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
//                     >
//                       {item.value}
//                     </a>
//                   ) : item.value.includes("@") ? (
//                     <a
//                       href={`mailto:${item.value}`}
//                       className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
//                     >
//                       {item.value}
//                     </a>
//                   ) : (
//                     <p className="text-gray-800 text-sm font-medium">
//                       {item.value}
//                     </p>
//                   )}
//                   <p className="text-sm text-gray-500 mt-2">
//                     {item.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
//         <div className="relative z-10 max-w-3xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-5">
//               <FiHeart className="w-3 h-3 text-white" />
//               <span className="text-[11px] font-medium text-white uppercase tracking-wide">
//                 Start Your Journey Today
//               </span>
//             </div>

//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
//               Ready to Build a Resume
//               <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
//                 That Actually Works?
//               </span>
//             </h2>

//             <p className="mt-4 text-sm text-indigo-100 max-w-2xl mx-auto">
//               Join job seekers across India who are using PassATS to get past
//               ATS, get noticed by recruiters, and get the interview.
//             </p>

//             <div className="mt-6">
//               <Link
//                 href="/choose-template"
//                 className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
//               >
//                 Build My Resume Free
//                 <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </div>

//             <div className="mt-4">
//               <p className="text-indigo-200 text-xs">
//                 Have questions?{" "}
//                 <a
//                   href="mailto:support@aryuacademy.com"
//                   className="text-white font-semibold hover:underline transition-all"
//                 >
//                   Contact us at support@aryuacademy.com
//                 </a>
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }



















// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import Link from "next/link";
// import {
//   FiUsers,
//   FiTrendingUp,
//   FiMapPin,
//   FiDollarSign,
//   FiShield,
//   FiHeart,
//   FiTarget,
//   FiEye,
//   FiCheckCircle,
//   FiArrowRight,
//   FiGlobe,
//   FiLock,
//   FiCreditCard,
//   FiAlertCircle,
//   FiXCircle,
//   FiMail,
//   FiZap,
//   FiFileText,
// } from "react-icons/fi";
// import {
//   FaGraduationCap,
//   FaLaptopCode,
//   FaChartLine,
//   FaBuilding,
//   FaUserTie,
//   FaRegBuilding,
//   FaQuoteLeft,
// } from "react-icons/fa";
// import Testimonial from "@/app/components/sections/Testimonial";

// export default function AboutPage() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

//   const stats = [
//     {
//       value: "50,000+",
//       label: "Resumes Built",
//       icon: FiUsers,
//       suffix: "globally and growing",
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       value: "150,000+",
//       label: "ATS Scores",
//       icon: FiTrendingUp,
//       suffix: "optimized & checked",
//       gradient: "from-indigo-500 to-purple-500",
//     },
//     {
//       value: "120+",
//       label: "Countries",
//       icon: FiGlobe,
//       suffix: "worldwide",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       value: "$3.99",
//       label: "Starting Price",
//       icon: FiDollarSign,
//       suffix: "fair, transparent pricing",
//       gradient: "from-emerald-500 to-teal-500",
//     },
//   ];

//   const ecosystem = [
//     {
//       name: "Aryu Academy",
//       icon: <FaGraduationCap className="w-4 h-4" />,
//       description:
//         "Global ed-tech platform — courses in Python, data science, web development, digital marketing, and more.",
//       gradient: "from-blue-500 to-cyan-500",
//       bgGradient: "from-blue-50 to-cyan-50",
//       borderColor: "border-blue-100",
//       iconBg: "bg-blue-100",
//       iconColor: "text-blue-600",
//     },
//     {
//       name: "Aryu Technologies",
//       icon: <FaLaptopCode className="w-4 h-4" />,
//       description:
//         "Technology solutions and software development for businesses across the globe.",
//       gradient: "from-indigo-500 to-purple-500",
//       bgGradient: "from-indigo-50 to-purple-50",
//       borderColor: "border-indigo-100",
//       iconBg: "bg-indigo-100",
//       iconColor: "text-indigo-600",
//     },
//     {
//       name: "Aryu Agency",
//       icon: <FaChartLine className="w-4 h-4" />,
//       description:
//         "Digital marketing agency — SEO, paid ads, social media, and content strategy for global brands.",
//       gradient: "from-purple-500 to-pink-500",
//       bgGradient: "from-purple-50 to-pink-50",
//       borderColor: "border-purple-100",
//       iconBg: "bg-purple-100",
//       iconColor: "text-purple-600",
//     },
//     {
//       name: "Aryu Enterprises",
//       icon: <FaBuilding className="w-4 h-4" />,
//       description:
//         "Business consulting and enterprise solutions for growing organisations worldwide.",
//       gradient: "from-emerald-500 to-teal-500",
//       bgGradient: "from-emerald-50 to-teal-50",
//       borderColor: "border-emerald-100",
//       iconBg: "bg-emerald-100",
//       iconColor: "text-emerald-600",
//     },
//   ];

//   const careerStages = [
//     {
//       title: "Fresh Graduates",
//       icon: "📚",
//       description:
//         "Entering the job market for the first time with a degree and limited work history. PassATS gives you a professional resume that competes with experienced candidates on ATS scoring.",
//       gradient: "from-indigo-500 to-purple-500",
//     },
//     {
//       title: "Global Job Seekers",
//       icon: "🌍",
//       description:
//         "Targeting roles across the globe. PassATS ensures your resume meets international standards and passes any ATS system.",
//       gradient: "from-emerald-500 to-teal-500",
//     },
//     {
//       title: "Working Professionals",
//       icon: "💼",
//       description:
//         "Ready for your next role, a promotion, or a career switch. PassATS helps you reframe experience as achievements, tailor your resume to each JD, and improve your ATS score before applying.",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       title: "Career Switchers",
//       icon: "🔄",
//       description:
//         "Moving from one industry or function to another. PassATS helps you highlight transferable skills and reposition your experience for a new direction.",
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       title: "Remote Job Hunters",
//       icon: "🏠",
//       description:
//         "Applying for remote positions worldwide. PassATS optimizes your resume for global ATS systems and remote-first companies.",
//       gradient: "from-blue-500 to-cyan-500",
//     },
//   ];

//   const promises = [
//     {
//       icon: <FiShield className="w-4 h-4" />,
//       title: "Never Sell Your Data",
//       description:
//         "We will never sell your resume data to employers, recruiters, or data brokers.",
//     },
//     {
//       icon: <FiLock className="w-4 h-4" />,
//       title: "No AI Training Without Consent",
//       description:
//         "We will never use your resume content to train AI models without your explicit consent.",
//     },
//     {
//       icon: <FiCreditCard className="w-4 h-4" />,
//       title: "No Billing Tricks",
//       description:
//         "We will never auto-charge you without clear notice — no trial traps, no billing tricks.",
//     },
//     {
//       icon: <FiEye className="w-4 h-4" />,
//       title: "Real Numbers",
//       description:
//         "We will always show you real numbers — not inflated stats designed to look impressive.",
//     },
//     {
//       icon: <FiHeart className="w-4 h-4" />,
//       title: "Genuinely Useful Free Plan",
//       description:
//         "We will always offer a free plan that is genuinely useful — not a tease that forces you to pay immediately.",
//     },
//     {
//       icon: <FiDollarSign className="w-4 h-4" />,
//       title: "Fair Global Pricing",
//       description:
//         "You can pay in USD or your local currency — because fair pricing means paying what's right for you.",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white"
//       >
//         <motion.div
//           style={{ opacity, scale }}
//           className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-5xl mx-auto"
//           >
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
//             >
//               We Built the Resume Tool
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
//                 Job Seekers Actually Needed
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-base md:text-lg text-white/95 mb-8 mx-auto"
//             >
//               PassATS is an AI-powered resume builder built from the ground up
//               for the global job market — by the team behind Aryu Academy, one of
//               the world's growing ed-tech platforms.
//             </motion.p>
//           </motion.div>
//         </motion.div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             preserveAspectRatio="none"
//             className="w-full h-10"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" />
//           </svg>
//         </div>
//       </section>

//       {/* About Aryu Academy */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
//             >
//               <FaRegBuilding className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Who We Are
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Backed by{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Aryu Academy
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm md:text-base overflow-x-hidden">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-4"
//             >
//               <p className="text-gray-600 leading-relaxed ">
//                 PassATS is a product of Aryu Academy — an ed-tech platform that has been training students and
//                 working professionals globally in technology, digital marketing, and career-ready skills.
//               </p>
//               <p className="text-gray-600 leading-relaxed ">
//                 Aryu Academy was built on a single belief: that the gap between
//                 learning a skill and getting hired for it should not exist. Our
//                 courses are practical, our instructors are industry
//                 professionals, and our focus has always been on real outcomes —
//                 not just certificates.
//               </p>
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
//                 <FaQuoteLeft className="w-5 h-5 md:w-6 sm:h-6 text-indigo-400 mb-2" />
//                 <p className="text-indigo-800 font-medium  leading-relaxed">
//                   PassATS is the next step in that mission. Once a student
//                   completes a course at Aryu Academy, they need a resume that
//                   communicates their new skills clearly, gets past ATS, and
//                   lands them interviews — anywhere in the world. PassATS is that bridge.
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 shadow-md"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
//                   <FaBuilding className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 The Aryu Ecosystem
//               </h3>
//               <div className="space-y-3">
//                 {ecosystem.map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: 20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: idx * 0.1 }}
//                     viewport={{ once: true }}
//                     whileHover={{ x: 3 }}
//                     className={`flex gap-3 p-3 rounded-lg bg-gradient-to-r ${item.bgGradient} border ${item.borderColor} transition-all`}
//                   >
//                     <div
//                       className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0`}
//                     >
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 ">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-gray-500 mt-0.5">
//                         {item.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* The Problem Section */}
//       <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-white -z-10"></div>
//         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-50/20 to-transparent rounded-full blur-3xl -z-10"></div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
//             {/* Problem Card - Left Side */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="group relative bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
//             >
//               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"></div>

//               <div className="p-5 md:p-6">
//                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/60 mb-3">
//                   <div className="w-1 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>
//                   <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
//                     The Problem
//                   </span>
//                 </div>

//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight mb-2">
//                   The Gap No One
//                   <span className=" ms-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
//                     Was Filling
//                   </span>
//                 </h2>

//                 <div className="space-y-2 text-sm text-slate-600">
//                   <p>
//                     At Aryu Academy, we have trained thousands of students
//                     globally in Python, data science, full-stack, and more.
//                   </p>
//                   <p className="font-semibold text-slate-800">
//                     Then we watched them struggle to get shortlisted.
//                   </p>
//                   <p>
//                     The problem was never their skills. It was their resume.
//                   </p>

//                   <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-3 mt-2">
//                     <p className="text-white text-xl font-bold">
//                       75%{" "}
//                       <span className="text-sm font-normal text-indigo-200">
//                         of resumes
//                       </span>
//                     </p>
//                     <p className="text-indigo-200 text-sm font-medium">
//                       filtered out by ATS before human review
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2 pt-1">
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center">
//                       <svg
//                         className="w-3.5 h-3.5 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                     </div>
//                     <p className="font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
//                       We built a tool that actually fixes the problem.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Comparison Table Card - Right Side */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl"
//             >
//               <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-2xl"></div>
//               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-600/20 rounded-full blur-2xl"></div>

//               <div className="relative p-4 sm:p-5 md:p-6 z-10">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
//                     <svg
//                       className="w-4 h-4 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
//                       Comparison
//                     </p>
//                     <h3 className="text-base font-bold text-white leading-tight">
//                       Global Tools vs PassATS
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-xl border border-white/10">
//                   <table className="w-full text-sm">
//                     <thead className="bg-white/5 border-b border-white/10">
//                       <tr>
//                         <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 w-2/5">
//                           Feature
//                         </th>
//                         <th className="text-left py-2.5 px-3 text-xs font-semibold text-red-300">
//                           Other Tools
//                         </th>
//                         <th className="text-left py-2.5 px-3 text-xs font-semibold text-green-300">
//                           PassATS
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-white/5">
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Pricing
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           $30-60/month
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           $3.99/month
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Templates
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           Generic
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           Role & region-specific
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Currency
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           USD only
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           Multi-currency support
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           ATS Optimization
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           Limited
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           Advanced AI (global ATS)
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-white/5 transition-colors">
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-300 font-medium">
//                           Billing
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-slate-400">
//                           Hidden fees
//                         </td>
//                         <td className="py-2 px-3 text-[10px] sm:text-xs text-green-300 font-medium">
//                           100% transparent
//                         </td>
//                       </tr>
//                     </tbody>
                  
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
//         <div className="relative z-10 max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-3"
//             >
//               <FiZap className="w-3 h-3 text-white" />
//               <span className="text-[11px] font-medium text-white">
//                 Real Impact
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
//               PassATS by the Numbers
//             </h2>
//             <p className="text-indigo-100 text-sm">
//               Real results from real job seekers worldwide
//             </p>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all">
//                   <div
//                     className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-2`}
//                   >
//                     <stat.icon className="w-3 h-3 md:w-5 md:h-5 text-white" />
//                   </div>
//                   <div className="text-lg font-bold text-white">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-indigo-100">{stat.label}</div>
//                   <div className="text-xs text-indigo-100/80 mt-0.5">
//                     {stat.suffix}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission & Values */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
//             >
//               <FiTarget className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Our Mission
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               What We Stand For
//             </h2>
//           </div>

//           <div className="relative mb-10">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-xl opacity-30" />
//             <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-center shadow-xl">
//               <FaQuoteLeft className="w-8 h-8 text-white/30 mx-auto mb-3" />
//               <p className="text-base md:text-lg font-bold text-white leading-relaxed">
//                 "To empower every job seeker — regardless of location, background,
//                 or education — to present their skills on a resume that gets through ATS,
//                 gets read by recruiters, and gets them in the room."
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {[
//               {
//                 icon: <FiHeart className="w-4 h-4" />,
//                 title: "Honesty First",
//                 description:
//                   "No fake stats. No trial traps. No inflated numbers.",
//                 gradient: "from-blue-500 to-cyan-500",
//                 bgGradient: "from-blue-50 to-cyan-50",
//               },
//               {
//                 icon: <FiGlobe className="w-4 h-4" />,
//                 title: "Global First",
//                 description:
//                   "Every feature, every template, every pricing decision is made with the global job seeker in mind.",
//                 gradient: "from-indigo-500 to-purple-500",
//                 bgGradient: "from-indigo-50 to-purple-50",
//               },
//               {
//                 icon: <FiTrendingUp className="w-4 h-4" />,
//                 title: "Outcomes Over Aesthetics",
//                 description:
//                   "A beautiful resume that doesn't get viewed is useless. We optimize for results.",
//                 gradient: "from-purple-500 to-pink-500",
//                 bgGradient: "from-purple-50 to-pink-50",
//               },
//             ].map((value, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className={`bg-gradient-to-br ${value.bgGradient} rounded-xl p-5 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all`}
//               >
//                 <div
//                   className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
//                 >
//                   <div className="text-white">{value.icon}</div>
//                 </div>
//                 <h3 className="text-base font-bold text-gray-900 mb-2">
//                   {value.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Career Stages */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
//               <FiUsers className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 For Everyone
//               </span>
//             </div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Built for{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Every Stage of Your Career
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {careerStages.map((stage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -3 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all">
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stage.gradient} flex items-center justify-center text-xl shadow-md flex-shrink-0`}
//                     >
//                       {stage.icon}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900  mb-1">
//                         {stage.title}
//                       </h3>
//                       <p className="text-sm text-gray-500 leading-relaxed">
//                         {stage.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Promises Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-indigo-100 mb-3"
//             >
//               <FiShield className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Our Commitment
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               What We Promise You
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {promises.map((promise, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -3 }}
//                 className="bg-white rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
//                     {promise.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900  mb-1">
//                       {promise.title}
//                     </h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">
//                       {promise.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Testimonial />

//       {/* Contact Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
//             >
//               <FiMail className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
//                 Get in Touch
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Connect With{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Our Team
//               </span>
//             </h2>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             viewport={{ once: true }}
//             className="text-center max-w-2xl mx-auto mb-12"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//               <FiMapPin className="w-3 h-3 text-indigo-600" />
//               <span className="text-[11px] font-medium text-indigo-700">
//                 Global Team
//               </span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3">
//               Building for Job Seekers Worldwide
//             </h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               PassATS is developed and maintained by the team at Aryu Academy.
//               We are a team of educators, engineers, and career coaches who have
//               seen firsthand how much a well-crafted resume can change someone's
//               professional trajectory — whether they're applying in New York,
//               London, Singapore, or anywhere in between.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {[
//               {
//                 icon: <FiMail className="w-5 h-5" />,
//                 title: "Email Us",
//                 value: "support@aryuacademy.com",
//                 description: "For support, feedback, or partnership enquiries",
//                 gradient: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: <FiGlobe className="w-5 h-5" />,
//                 title: "Website",
//                 value: "passats.aryuacademy.com",
//                 description: "Build your resume and get your ATS score",
//                 gradient: "from-indigo-500 to-purple-500",
//               },
//               {
//                 icon: <FiDollarSign className="w-5 h-5" />,
//                 title: "Payments",
//                 value: "Secure global payments",
//                 description: "Pay securely in your local currency",
//                 gradient: "from-purple-500 to-pink-500",
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all">
//                   <div
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
//                   >
//                     <div className="text-white">{item.icon}</div>
//                   </div>
//                   <h3 className="text-base font-bold text-gray-900 mb-1">
//                     {item.title}
//                   </h3>
//                   {item.value.startsWith("http") ? (
//                     <a
//                       href={item.value}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
//                     >
//                       {item.value}
//                     </a>
//                   ) : item.value.includes("@") ? (
//                     <a
//                       href={`mailto:${item.value}`}
//                       className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
//                     >
//                       {item.value}
//                     </a>
//                   ) : (
//                     <p className="text-gray-800 text-sm font-medium">
//                       {item.value}
//                     </p>
//                   )}
//                   <p className="text-sm text-gray-500 mt-2">
//                     {item.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
//         <div className="relative z-10 max-w-3xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-5">
//               <FiHeart className="w-3 h-3 text-white" />
//               <span className="text-[11px] font-medium text-white uppercase tracking-wide">
//                 Start Your Journey Today
//               </span>
//             </div>

//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
//               Ready to Build a Resume
//               <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
//                 That Actually Works?
//               </span>
//             </h2>

//             <p className="mt-4 text-sm text-indigo-100 max-w-2xl mx-auto">
//               Join job seekers across the globe who are using PassATS to get
//               past ATS, get noticed by recruiters, and get the interview.
//             </p>

//             <div className="mt-6">
//               <Link
//                 href="/choose-template"
//                 className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
//               >
//                 Build My Resume Free
//                 <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </div>

//             <div className="mt-4">
//               <p className="text-indigo-200 text-xs">
//                 Have questions?{" "}
//                 <a
//                   href="mailto:support@aryuacademy.com"
//                   className="text-white font-semibold hover:underline transition-all"
//                 >
//                   Contact us at support@aryuacademy.com
//                 </a>
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }


















"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  FiUsers,
  FiTrendingUp,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiHeart,
  FiTarget,
  FiEye,
  FiCheckCircle,
  FiArrowRight,
  FiGlobe,
  FiLock,
  FiCreditCard,
  FiMail,
  FiZap,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaChartLine,
  FaBuilding,
  FaRegBuilding,
  FaQuoteLeft,
} from "react-icons/fa";
import Testimonial from "@/app/components/sections/Testimonial";

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const stats = [
    {
      value: "50,000+",
      label: "Resumes Built",
      icon: FiUsers,
      suffix: "globally and growing",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "150,000+",
      label: "ATS Scores",
      icon: FiTrendingUp,
      suffix: "optimized & checked",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      value: "120+",
      label: "Countries",
      icon: FiGlobe,
      suffix: "worldwide",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      value: "$3.99",
      label: "Starting Price",
      icon: FiDollarSign,
      suffix: "fair, transparent pricing",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const ecosystem = [
    {
      name: "Aryu Academy",
      icon: <FaGraduationCap className="w-4 h-4" />,
      description:
        "Global ed-tech platform — courses in Python, data science, web development, digital marketing, and more.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      name: "Aryu Technologies",
      icon: <FaLaptopCode className="w-4 h-4" />,
      description:
        "Technology solutions and software development for businesses across the globe.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-100",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      name: "Aryu Agency",
      icon: <FaChartLine className="w-4 h-4" />,
      description:
        "Digital marketing agency — SEO, paid ads, social media, and content strategy for global brands.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      name: "Aryu Enterprises",
      icon: <FaBuilding className="w-4 h-4" />,
      description:
        "Business consulting and enterprise solutions for growing organisations worldwide.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  const careerStages = [
    {
      title: "Fresh Graduates",
      icon: "📚",
      description:
        "Entering the job market for the first time with a degree and limited work history. PassATS gives you a professional resume that competes with experienced candidates on ATS scoring.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Global Job Seekers",
      icon: "🌍",
      description:
        "Targeting roles across the globe. PassATS ensures your resume meets international standards and passes any ATS system.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Working Professionals",
      icon: "💼",
      description:
        "Ready for your next role, a promotion, or a career switch. PassATS helps you reframe experience as achievements, tailor your resume to each JD, and improve your ATS score before applying.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Career Switchers",
      icon: "🔄",
      description:
        "Moving from one industry or function to another. PassATS helps you highlight transferable skills and reposition your experience for a new direction.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Remote Job Hunters",
      icon: "🏠",
      description:
        "Applying for remote positions worldwide. PassATS optimizes your resume for global ATS systems and remote-first companies.",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  const promises = [
    {
      icon: <FiShield className="w-4 h-4" />,
      title: "Never Sell Your Data",
      description:
        "We will never sell your resume data to employers, recruiters, or data brokers.",
    },
    {
      icon: <FiLock className="w-4 h-4" />,
      title: "No AI Training Without Consent",
      description:
        "We will never use your resume content to train AI models without your explicit consent.",
    },
    {
      icon: <FiCreditCard className="w-4 h-4" />,
      title: "No Billing Tricks",
      description:
        "We will never auto-charge you without clear notice — no trial traps, no billing tricks.",
    },
    {
      icon: <FiEye className="w-4 h-4" />,
      title: "Real Numbers",
      description:
        "We will always show you real numbers — not inflated stats designed to look impressive.",
    },
    {
      icon: <FiHeart className="w-4 h-4" />,
      title: "Genuinely Useful Free Plan",
      description:
        "We will always offer a free plan that is genuinely useful — not a tease that forces you to pay immediately.",
    },
    {
      icon: <FiDollarSign className="w-4 h-4" />,
      title: "Fair Global Pricing",
      description:
        "You can pay in USD or your local currency — because fair pricing means paying what's right for you.",
    },
  ];

  return (
    <>
      {/* Hero Section - Clean Modern */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700"
      >
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <FiZap className="w-3 h-3 text-yellow-300" />
              <span className="text-xs font-medium text-white/90">AI-Powered Resume Builder</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-white">We Built the Resume Tool</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent mt-3">
                Job Seekers Actually Needed
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              PassATS is an AI-powered resume builder built from the ground up
              for the global job market — by the team behind Aryu Academy, one of
              the world's growing ed-tech platforms.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/choose-template"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:shadow-2xl transition-all text-base"
              >
                Build My Resume Free
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 100L1440 0V100H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Section - Clean Numbers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Minimal Elegant */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
              <FaRegBuilding className="w-3 h-3 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Who We Are
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Backed by{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Aryu Academy
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <p className="text-gray-600 leading-relaxed text-base">
                PassATS is a product of Aryu Academy — an ed-tech platform that has been training students and
                working professionals globally in technology, digital marketing, and career-ready skills.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Aryu Academy was built on a single belief: that the gap between
                learning a skill and getting hired for it should not exist. Our
                courses are practical, our instructors are industry
                professionals, and our focus has always been on real outcomes —
                not just certificates.
              </p>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <FaQuoteLeft className="w-6 h-6 text-indigo-400 mb-3" />
                <p className="text-indigo-800 font-medium leading-relaxed text-base">
                  PassATS is the next step in that mission. Once a student
                  completes a course at Aryu Academy, they need a resume that
                  communicates their new skills clearly, gets past ATS, and
                  lands them interviews — anywhere in the world. PassATS is that bridge.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <FaBuilding className="w-3 h-3 text-white" />
                </div>
                The Aryu Ecosystem
              </h3>
              <div className="space-y-3">
                {ecosystem.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 p-3 rounded-lg bg-gradient-to-r ${item.bgGradient} border ${item.borderColor}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section - Clean Split */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium text-red-600 uppercase tracking-wide">
                  The Problem
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The Gap No One
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Was Filling
                </span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At Aryu Academy, we have trained thousands of students
                  globally in Python, data science, full-stack, and more.
                </p>
                <p className="font-semibold text-gray-800">
                  Then we watched them struggle to get shortlisted.
                </p>
                <p>The problem was never their skills. It was their resume.</p>
                <div className="bg-gray-900 rounded-xl p-5 mt-4">
                  <p className="text-white text-2xl font-bold">
                    75%{" "}
                    <span className="text-sm font-normal text-gray-400">
                      of resumes
                    </span>
                  </p>
                  <p className="text-indigo-300 text-sm">
                    filtered out by ATS before human review
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-sm text-indigo-600">
                    We built a tool that actually fixes the problem.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-indigo-400">Comparison</p>
                  <h3 className="text-sm font-bold text-white">Global Tools vs PassATS</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { feature: "Pricing", other: "$30-60/month", pass: "$3.99/month" },
                  { feature: "Templates", other: "Generic", pass: "Role & region-specific" },
                  { feature: "Currency", other: "USD only", pass: "Multi-currency support" },
                  { feature: "ATS Optimization", other: "Limited", pass: "Advanced AI (global ATS)" },
                  { feature: "Billing", other: "Hidden fees", pass: "100% transparent" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-xs text-gray-400 w-1/3">{item.feature}</span>
                    <span className="text-xs text-red-400 w-1/3 text-center">{item.other}</span>
                    <span className="text-xs text-green-400 w-1/3 text-right">{item.pass}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Clean Quote */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 mb-5">
            <FiTarget className="w-3 h-3 text-white" />
            <span className="text-xs font-medium text-white uppercase tracking-wide">
              Our Mission
            </span>
          </div>
          <FaQuoteLeft className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
            "To empower every job seeker — regardless of location, background,
            or education — to present their skills on a resume that gets through ATS,
            gets read by recruiters, and gets them in the room."
          </p>
        </div>
      </section>

      {/* Values Section - Clean Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiHeart className="w-5 h-5" />,
                title: "Honesty First",
                description: "No fake stats. No trial traps. No inflated numbers.",
                bg: "bg-rose-50",
                color: "text-rose-600",
              },
              {
                icon: <FiGlobe className="w-5 h-5" />,
                title: "Global First",
                description: "Every feature, every template, every pricing decision is made with the global job seeker in mind.",
                bg: "bg-indigo-50",
                color: "text-indigo-600",
              },
              {
                icon: <FiTrendingUp className="w-5 h-5" />,
                title: "Outcomes Over Aesthetics",
                description: "A beautiful resume that doesn't get viewed is useless. We optimize for results.",
                bg: "bg-emerald-50",
                color: "text-emerald-600",
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-gray-50">
                <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`}>
                  <div className={value.color}>{value.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Stages - Clean Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
              <FiUsers className="w-3 h-3 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                For Everyone
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Every Stage of Your Career
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {careerStages.map((stage, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{stage.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{stage.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises Section - Clean Trust */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
              <FiShield className="w-3 h-3 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Our Commitment
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Promise You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {promises.map((promise, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  {promise.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{promise.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{promise.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />

      {/* Contact Section - Clean */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
              <FiMail className="w-3 h-3 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Get in Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Connect With{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
          </div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
              <FiMapPin className="w-3 h-3 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">Global Team</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Building for Job Seekers Worldwide</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              PassATS is developed and maintained by the team at Aryu Academy.
              We are a team of educators, engineers, and career coaches who have
              seen firsthand how much a well-crafted resume can change someone's
              professional trajectory — whether they're applying in New York,
              London, Singapore, or anywhere in between.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiMail className="w-5 h-5" />,
                title: "Email Us",
                value: "support@aryuacademy.com",
                description: "For support, feedback, or partnership enquiries",
                bg: "bg-blue-50",
                color: "text-blue-600",
              },
              {
                icon: <FiGlobe className="w-5 h-5" />,
                title: "Website",
                value: "passats.aryuacademy.com",
                description: "Build your resume and get your ATS score",
                bg: "bg-indigo-50",
                color: "text-indigo-600",
              },
              {
                icon: <FiDollarSign className="w-5 h-5" />,
                title: "Payments",
                value: "Secure global payments",
                description: "Pay securely in your local currency",
                bg: "bg-purple-50",
                color: "text-purple-600",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-3`}>
                  <div className={item.color}>{item.icon}</div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                {item.value.includes("@") ? (
                  <a href={`mailto:${item.value}`} className="text-indigo-600 text-sm font-medium">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-800 text-sm font-medium">{item.value}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 mb-5">
            <FiHeart className="w-3 h-3 text-white" />
            <span className="text-xs font-medium text-white uppercase tracking-wide">
              Start Your Journey Today
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build a Resume
            <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              That Actually Works?
            </span>
          </h2>
          <p className="text-white/80 mb-6">
            Join job seekers across the globe who are using PassATS to get
            past ATS, get noticed by recruiters, and get the interview.
          </p>
          <Link
            href="/choose-template"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Build My Resume Free
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/60 text-xs mt-4">
            Have questions?{" "}
            <a href="mailto:support@aryuacademy.com" className="text-white font-semibold hover:underline">
              Contact us at support@aryuacademy.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}