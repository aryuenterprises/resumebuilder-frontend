












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
//   FiMail,
//   FiZap,
// } from "react-icons/fi";
// import {
//   FaGraduationCap,
//   FaLaptopCode,
//   FaChartLine,
//   FaBuilding,
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
//       {/* Hero Section - Clean Modern */}
//       <section
//         ref={heroRef}
//         className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700"
//       >
//         <div className="absolute inset-0 bg-black/20" />
//         <motion.div
//           style={{ opacity, scale }}
//           className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-5xl mx-auto"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
//             >
//               <FiZap className="w-3 h-3 text-yellow-300" />
//               <span className="text-xs font-medium text-white/90">AI-Powered Resume Builder</span>
//             </motion.div>
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
//             >
//               <span className="text-white">We Built the Resume Tool</span>
//               <span className="block bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent mt-3">
//                 Job Seekers Actually Needed
//               </span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
//             >
//               PassATS is an AI-powered resume builder built from the ground up
//               for the global job market — by the team behind Aryu Academy, one of
//               the world's growing ed-tech platforms.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <Link
//                 href="/choose-template"
//                 className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:shadow-2xl transition-all text-base"
//               >
//                 Build My Resume Free
//                 <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-12">
//             <path d="M0 100L1440 0V100H0Z" fill="white" />
//           </svg>
//         </div>
//       </section>

//       {/* Stats Section - Clean Numbers */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="text-center"
//               >
//                 <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
//                   <stat.icon className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
//                 <div className="text-sm font-medium text-gray-600 mt-1">{stat.label}</div>
//                 <div className="text-xs text-gray-400 mt-0.5">{stat.suffix}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section - Minimal Elegant */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
//               <FaRegBuilding className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 Who We Are
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Backed by{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Aryu Academy
//               </span>
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-5"
//             >
//               <p className="text-gray-600 leading-relaxed text-base">
//                 PassATS is a product of Aryu Academy — an ed-tech platform that has been training students and
//                 working professionals globally in technology, digital marketing, and career-ready skills.
//               </p>
//               <p className="text-gray-600 leading-relaxed text-base">
//                 Aryu Academy was built on a single belief: that the gap between
//                 learning a skill and getting hired for it should not exist. Our
//                 courses are practical, our instructors are industry
//                 professionals, and our focus has always been on real outcomes —
//                 not just certificates.
//               </p>
//               <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
//                 <FaQuoteLeft className="w-6 h-6 text-indigo-400 mb-3" />
//                 <p className="text-indigo-800 font-medium leading-relaxed text-base">
//                   PassATS is the next step in that mission. Once a student
//                   completes a course at Aryu Academy, they need a resume that
//                   communicates their new skills clearly, gets past ATS, and
//                   lands them interviews — anywhere in the world. PassATS is that bridge.
//                 </p>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
//                 <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
//                   <FaBuilding className="w-3 h-3 text-white" />
//                 </div>
//                 The Aryu Ecosystem
//               </h3>
//               <div className="space-y-3">
//                 {ecosystem.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex gap-3 p-3 rounded-lg bg-gradient-to-r ${item.bgGradient} border ${item.borderColor}`}
//                   >
//                     <div
//                       className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0`}
//                     >
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 text-sm">
//                         {item.name}
//                       </h4>
//                       <p className="text-xs text-gray-500 mt-0.5">
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Problem Section - Clean Split */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 mb-4">
//                 <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
//                 <span className="text-xs font-medium text-red-600 uppercase tracking-wide">
//                   The Problem
//                 </span>
//               </div>
//               <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//                 The Gap No One
//                 <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   Was Filling
//                 </span>
//               </h2>
//               <div className="space-y-4 text-gray-600">
//                 <p>
//                   At Aryu Academy, we have trained thousands of students
//                   globally in Python, data science, full-stack, and more.
//                 </p>
//                 <p className="font-semibold text-gray-800">
//                   Then we watched them struggle to get shortlisted.
//                 </p>
//                 <p>The problem was never their skills. It was their resume.</p>
//                 <div className="bg-gray-900 rounded-xl p-5 mt-4">
//                   <p className="text-white text-2xl font-bold">
//                     75%{" "}
//                     <span className="text-sm font-normal text-gray-400">
//                       of resumes
//                     </span>
//                   </p>
//                   <p className="text-indigo-300 text-sm">
//                     filtered out by ATS before human review
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 pt-2">
//                   <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   </div>
//                   <p className="font-semibold text-sm text-indigo-600">
//                     We built a tool that actually fixes the problem.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-900 rounded-2xl p-6">
//               <div className="flex items-center gap-2 mb-5">
//                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
//                   <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-indigo-400">Comparison</p>
//                   <h3 className="text-sm font-bold text-white">Global Tools vs PassATS</h3>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 {[
//                   { feature: "Pricing", other: "$30-60/month", pass: "$3.99/month" },
//                   { feature: "Templates", other: "Generic", pass: "Role & region-specific" },
//                   { feature: "Currency", other: "USD only", pass: "Multi-currency support" },
//                   { feature: "ATS Optimization", other: "Limited", pass: "Advanced AI (global ATS)" },
//                   { feature: "Billing", other: "Hidden fees", pass: "100% transparent" },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800">
//                     <span className="text-xs text-gray-400 w-1/3">{item.feature}</span>
//                     <span className="text-xs text-red-400 w-1/3 text-center">{item.other}</span>
//                     <span className="text-xs text-green-400 w-1/3 text-right">{item.pass}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission Section - Clean Quote */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 mb-5">
//             <FiTarget className="w-3 h-3 text-white" />
//             <span className="text-xs font-medium text-white uppercase tracking-wide">
//               Our Mission
//             </span>
//           </div>
//           <FaQuoteLeft className="w-10 h-10 text-white/30 mx-auto mb-4" />
//           <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
//             "To empower every job seeker — regardless of location, background,
//             or education — to present their skills on a resume that gets through ATS,
//             gets read by recruiters, and gets them in the room."
//           </p>
//         </div>
//       </section>

//       {/* Values Section - Clean Grid */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Stand For</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: <FiHeart className="w-5 h-5" />,
//                 title: "Honesty First",
//                 description: "No fake stats. No trial traps. No inflated numbers.",
//                 bg: "bg-rose-50",
//                 color: "text-rose-600",
//               },
//               {
//                 icon: <FiGlobe className="w-5 h-5" />,
//                 title: "Global First",
//                 description: "Every feature, every template, every pricing decision is made with the global job seeker in mind.",
//                 bg: "bg-indigo-50",
//                 color: "text-indigo-600",
//               },
//               {
//                 icon: <FiTrendingUp className="w-5 h-5" />,
//                 title: "Outcomes Over Aesthetics",
//                 description: "A beautiful resume that doesn't get viewed is useless. We optimize for results.",
//                 bg: "bg-emerald-50",
//                 color: "text-emerald-600",
//               },
//             ].map((value, idx) => (
//               <div key={idx} className="text-center p-6 rounded-xl bg-gray-50">
//                 <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`}>
//                   <div className={value.color}>{value.icon}</div>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
//                 <p className="text-sm text-gray-500">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Career Stages - Clean Cards */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
//               <FiUsers className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 For Everyone
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Built for{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Every Stage of Your Career
//               </span>
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {careerStages.map((stage, idx) => (
//               <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
//                 <div className="flex items-start gap-3">
//                   <div className="text-2xl">{stage.icon}</div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">{stage.title}</h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">{stage.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Promises Section - Clean Trust */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
//               <FiShield className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 Our Commitment
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Promise You</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {promises.map((promise, idx) => (
//               <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
//                 <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
//                   {promise.icon}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-1 text-sm">{promise.title}</h3>
//                   <p className="text-xs text-gray-500 leading-relaxed">{promise.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Testimonial />

//       {/* Contact Section - Clean */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
//               <FiMail className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 Get in Touch
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Connect With{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Our Team
//               </span>
//             </h2>
//           </div>
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 mb-4">
//               <FiMapPin className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700">Global Team</span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3">Building for Job Seekers Worldwide</h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               PassATS is developed and maintained by the team at Aryu Academy.
//               We are a team of educators, engineers, and career coaches who have
//               seen firsthand how much a well-crafted resume can change someone's
//               professional trajectory — whether they're applying in New York,
//               London, Singapore, or anywhere in between.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: <FiMail className="w-5 h-5" />,
//                 title: "Email Us",
//                 value: "support@aryuacademy.com",
//                 description: "For support, feedback, or partnership enquiries",
//                 bg: "bg-blue-50",
//                 color: "text-blue-600",
//               },
//               {
//                 icon: <FiGlobe className="w-5 h-5" />,
//                 title: "Website",
//                 value: "passats.aryuacademy.com",
//                 description: "Build your resume and get your ATS score",
//                 bg: "bg-indigo-50",
//                 color: "text-indigo-600",
//               },
//               {
//                 icon: <FiDollarSign className="w-5 h-5" />,
//                 title: "Payments",
//                 value: "Secure global payments",
//                 description: "Pay securely in your local currency",
//                 bg: "bg-purple-50",
//                 color: "text-purple-600",
//               },
//             ].map((item, idx) => (
//               <div key={idx} className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
//                 <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-3`}>
//                   <div className={item.color}>{item.icon}</div>
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
//                 {item.value.includes("@") ? (
//                   <a href={`mailto:${item.value}`} className="text-indigo-600 text-sm font-medium">
//                     {item.value}
//                   </a>
//                 ) : (
//                   <p className="text-gray-800 text-sm font-medium">{item.value}</p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-2">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section - Clean */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
//         <div className="max-w-3xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 mb-5">
//             <FiHeart className="w-3 h-3 text-white" />
//             <span className="text-xs font-medium text-white uppercase tracking-wide">
//               Start Your Journey Today
//             </span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//             Ready to Build a Resume
//             <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
//               That Actually Works?
//             </span>
//           </h2>
//           <p className="text-white/80 mb-6">
//             Join job seekers across the globe who are using PassATS to get
//             past ATS, get noticed by recruiters, and get the interview.
//           </p>
//           <Link
//             href="/choose-template"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all"
//           >
//             Build My Resume Free
//             <FiArrowRight className="w-4 h-4" />
//           </Link>
//           <p className="text-white/60 text-xs mt-4">
//             Have questions?{" "}
//             <a href="mailto:support@aryuacademy.com" className="text-white font-semibold hover:underline">
//               Contact us at support@aryuacademy.com
//             </a>
//           </p>
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
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiArrowUpRight,
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
      icon: <FaGraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />,
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
      icon: <FaLaptopCode className="w-3 h-3 sm:w-4 sm:h-4" />,
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
      icon: <FaChartLine className="w-3 h-3 sm:w-4 sm:h-4" />,
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
      icon: <FaBuilding className="w-3 h-3 sm:w-4 sm:h-4" />,
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
      icon: <FiShield className="w-3 h-3 sm:w-4 sm:h-4" />,
      title: "Never Sell Your Data",
      description:
        "We will never sell your resume data to employers, recruiters, or data brokers.",
    },
    {
      icon: <FiLock className="w-3 h-3 sm:w-4 sm:h-4" />,
      title: "No AI Training Without Consent",
      description:
        "We will never use your resume content to train AI models without your explicit consent.",
    },
    {
      icon: <FiCreditCard className="w-3 h-3 sm:w-4 sm:h-4" />,
      title: "No Billing Tricks",
      description:
        "We will never auto-charge you without clear notice — no trial traps, no billing tricks.",
    },
    {
      icon: <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />,
      title: "Real Numbers",
      description:
        "We will always show you real numbers — not inflated stats designed to look impressive.",
    },
    {
      icon: <FiHeart className="w-3 h-3 sm:w-4 sm:h-4" />,
      title: "Genuinely Useful Free Plan",
      description:
        "We will always offer a free plan that is genuinely useful — not a tease that forces you to pay immediately.",
    },
    {
      icon: <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4" />,
      title: "Fair Global Pricing",
      description:
        "You can pay in USD or your local currency — because fair pricing means paying what's right for you.",
    },
  ];

  return (
    <>
      {/* Hero Section - Responsive */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700"
      >
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6"
            >
              <FiZap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-300" />
              <span className="text-[10px] sm:text-xs font-medium text-white/90">AI-Powered Resume Builder</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2"
            >
              <span className="text-white">We Built the Resume Tool</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent mt-2 sm:mt-3">
                Job Seekers Actually Needed
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto px-3"
            >
              PassATS is an AI-powered resume builder built from the ground up
              for the global job market — by the team behind Aryu Academy, one of
              the world's growing ed-tech platforms.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link
                href="/choose-template"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-semibold rounded-xl sm:rounded-2xl hover:shadow-2xl transition-all text-sm sm:text-base"
              >
                Build My Resume Free
                <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-6 sm:h-8 md:h-12">
            <path d="M0 100L1440 0V100H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Section - Responsive Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{stat.label}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-100 mb-3 sm:mb-4">
              <FaRegBuilding className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Who We Are
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 px-2">
              Backed by{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Aryu Academy
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-5"
            >
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                PassATS is a product of Aryu Academy — an ed-tech platform that has been training students and
                working professionals globally in technology, digital marketing, and career-ready skills.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Aryu Academy was built on a single belief: that the gap between
                learning a skill and getting hired for it should not exist. Our
                courses are practical, our instructors are industry
                professionals, and our focus has always been on real outcomes —
                not just certificates.
              </p>
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                <FaQuoteLeft className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 mb-2 sm:mb-3" />
                <p className="text-indigo-800 font-medium leading-relaxed text-sm sm:text-base">
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
              className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <FaBuilding className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                The Aryu Ecosystem
              </h3>
              <div className="space-y-2.5 sm:space-y-3">
                {ecosystem.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-gradient-to-r ${item.bgGradient} border ${item.borderColor}`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                        {item.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 leading-relaxed">
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

      {/* Problem Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-red-50 mb-3 sm:mb-4">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500"></div>
                <span className="text-[10px] sm:text-xs font-medium text-red-600 uppercase tracking-wide">
                  The Problem
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                The Gap No One
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1">
                  Was Filling
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <p className="text-sm sm:text-base">
                  At Aryu Academy, we have trained thousands of students
                  globally in Python, data science, full-stack, and more.
                </p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  Then we watched them struggle to get shortlisted.
                </p>
                <p className="text-sm sm:text-base">The problem was never their skills. It was their resume.</p>
                <div className="bg-gray-900 rounded-xl p-4 sm:p-5 mt-3 sm:mt-4">
                  <p className="text-white text-xl sm:text-2xl font-bold">
                    75%{" "}
                    <span className="text-[10px] sm:text-sm font-normal text-gray-400">
                      of resumes
                    </span>
                  </p>
                  <p className="text-indigo-300 text-xs sm:text-sm">
                    filtered out by ATS before human review
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-indigo-600">
                    We built a tool that actually fixes the problem.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-indigo-400">Comparison</p>
                  <h3 className="text-xs sm:text-sm font-bold text-white">Global Tools vs PassATS</h3>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { feature: "Pricing", other: "$30-60/month", pass: "$3.99/month" },
                  { feature: "Templates", other: "Generic", pass: "Role & region-specific" },
                  { feature: "Currency", other: "USD only", pass: "Multi-currency support" },
                  { feature: "ATS Optimization", other: "Limited", pass: "Advanced AI (global ATS)" },
                  { feature: "Billing", other: "Hidden fees", pass: "100% transparent" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-800 gap-2">
                    <span className="text-[10px] sm:text-xs text-gray-400 w-1/4">{item.feature}</span>
                    <span className="text-[10px] sm:text-xs text-red-400 w-2/5 text-center">{item.other}</span>
                    <span className="text-[10px] sm:text-xs text-green-400 w-2/5 text-right">{item.pass}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 mb-3 sm:mb-5">
            <FiTarget className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            <span className="text-[10px] sm:text-xs font-medium text-white uppercase tracking-wide">
              Our Mission
            </span>
          </div>
          <FaQuoteLeft className="w-7 h-7 sm:w-10 sm:h-10 text-white/30 mx-auto mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white leading-relaxed px-3">
            "To empower every job seeker — regardless of location, background,
            or education — to present their skills on a resume that gets through ATS,
            gets read by recruiters, and gets them in the room."
          </p>
        </div>
      </section>

      {/* Values Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Honesty First",
                description: "No fake stats. No trial traps. No inflated numbers.",
                bg: "bg-rose-50",
                color: "text-rose-600",
              },
              {
                icon: <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Global First",
                description: "Every feature, every template, every pricing decision is made with the global job seeker in mind.",
                bg: "bg-indigo-50",
                color: "text-indigo-600",
              },
              {
                icon: <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Outcomes Over Aesthetics",
                description: "A beautiful resume that doesn't get viewed is useless. We optimize for results.",
                bg: "bg-emerald-50",
                color: "text-emerald-600",
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center p-5 sm:p-6 rounded-xl bg-gray-50">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <div className={value.color}>{value.icon}</div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{value.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Stages - Responsive Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-100 mb-3 sm:mb-4">
              <FiUsers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                For Everyone
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 px-2">
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Every Stage of Your Career
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {careerStages.map((stage, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-xl sm:text-2xl">{stage.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{stage.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises Section - Responsive Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-100 mb-3 sm:mb-4">
              <FiShield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Our Commitment
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">What We Promise You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {promises.map((promise, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  {promise.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm">{promise.title}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">{promise.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />

    


    {/* Contact Section - Modern Redesign (No Form) */}
<section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white shadow-sm border border-indigo-100 mb-3 sm:mb-4">
        <FiMail className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
        <span className="text-[10px] sm:text-xs font-semibold text-indigo-700 uppercase tracking-wide">
          Get in Touch
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 px-2">
        Let's{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Connect
        </span>
      </h2>
      <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-md mx-auto">
        Have questions? We'd love to hear from you
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
      {[
        {
          icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />,
          title: "Email Support",
          value: "support@aryuacademy.com",
          description: "We respond within 24 hours",
          bg: "bg-gradient-to-br from-blue-500 to-indigo-500",
          cardBg: "from-blue-50 to-indigo-50",
          border: "border-blue-100",
          link: "mailto:support@aryuacademy.com",
        },
        {
          icon: <FiGlobe className="w-5 h-5 sm:w-6 sm:h-6" />,
          title: "Visit Website",
          value: "passats.aryuacademy.com",
          description: "Build your ATS-friendly resume",
          bg: "bg-gradient-to-br from-indigo-500 to-purple-500",
          cardBg: "from-indigo-50 to-purple-50",
          border: "border-indigo-100",
          link: "https://passats.aryuacademy.com",
          external: true,
        },
        {
          icon: <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
          title: "Our Location",
          value: "Chennai, India",
          description: "Serving job seekers worldwide",
          bg: "bg-gradient-to-br from-purple-500 to-pink-500",
          cardBg: "from-purple-50 to-pink-50",
          border: "border-purple-100",
          link: null,
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -8 }}
          className={`relative group bg-gradient-to-br ${item.cardBg} rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border ${item.border} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer`}
        >
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-transparent group-hover:via-white/50 transition-all duration-700" />
          
          {/* Icon - Responsive sizes */}
          <div className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl ${item.bg} flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white">
              {/* Scale icon based on screen size */}
              <div className="scale-100 sm:scale-110 md:scale-100">
                {item.icon}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <h3 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{item.title}</h3>
          
          {item.link ? (
            <a
              href={item.link}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-indigo-600 font-semibold text-xs sm:text-sm md:text-base hover:underline break-all inline-flex items-center gap-1 group/link"
            >
              <span className="truncate max-w-[180px] sm:max-w-none">{item.value}</span>
              {item.external && (
                <FiArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 opacity-0 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 flex-shrink-0" />
              )}
            </a>
          ) : (
            <p className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">{item.value}</p>
          )}
          
          <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">{item.description}</p>

          {/* Decorative Dot */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>

    {/* Social Links Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200"
    >
      <div className="text-center mb-5 sm:mb-6">
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Follow us on social media</p>
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {[
            { icon: FiLinkedin, url: "https://linkedin.com", label: "LinkedIn", color: "hover:text-[#0077b5]" },
            { icon: FiTwitter, url: "https://twitter.com", label: "Twitter", color: "hover:text-[#1DA1F2]" },
            { icon: FiFacebook, url: "https://facebook.com", label: "Facebook", color: "hover:text-[#1877f2]" },
            { icon: FiInstagram, url: "https://instagram.com", label: "Instagram", color: "hover:text-[#e4405f]" },
            { icon: FiYoutube, url: "https://youtube.com", label: "YouTube", color: "hover:text-[#ff0000]" },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 sm:p-2 md:p-3 rounded-full bg-white text-gray-500 ${social.color} transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100`}
              aria-label={social.label}
            >
              <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
        <div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">24/7</p>
          <p className="text-[10px] sm:text-xs text-gray-500">Support Available</p>
        </div>
        <div className="w-px h-6 sm:h-8 bg-gray-200 my-auto hidden sm:block" />
        <div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">&lt;24h</p>
          <p className="text-[10px] sm:text-xs text-gray-500">Response Time</p>
        </div>
        <div className="w-px h-6 sm:h-8 bg-gray-200 my-auto hidden sm:block" />
        <div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">100%</p>
          <p className="text-[10px] sm:text-xs text-gray-500">Satisfaction Rate</p>
        </div>
      </div>

      {/* Contact Note */}
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-[10px] sm:text-xs text-gray-400">
          Or reach out directly at{" "}
          <a href="mailto:passats@gmail.com" className="text-indigo-600 hover:underline font-medium">
            passats@gmail.com
          </a>
        </p>
      </div>
    </motion.div>
  </div>
</section>




      {/* CTA Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 mb-3 sm:mb-5">
            <FiHeart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            <span className="text-[10px] sm:text-xs font-medium text-white uppercase tracking-wide">
              Start Your Journey Today
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-3">
            Ready to Build a Resume
            <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent mt-1">
              That Actually Works?
            </span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-6 px-4">
            Join job seekers across the globe who are using PassATS to get
            past ATS, get noticed by recruiters, and get the interview.
          </p>
          <Link
            href="/choose-template"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Build My Resume Free
            <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
          <p className="text-white/60 text-[10px] sm:text-xs mt-4">
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