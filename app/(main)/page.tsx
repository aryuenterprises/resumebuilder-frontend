// "use client";

// import Image from "next/image";
// import Testimonial from "../components/sections/Testimonial";
// import Faq from "../components/sections/FAQ";
// import CTA from "../components/sections/CTA";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import {
//   FiArrowRight,
//   FiZap,
//   FiShield,
//   FiTrendingUp,
//   FiUsers,
//   FiStar,
//   FiClock,
// } from "react-icons/fi";
// import {
//   FaMagic,
//   FaFileAlt,
//   FaCheckCircle,
//   FaMountain,
//   FaHandHoldingUsd,
//   FaRocket,
//   FaShieldAlt,
//   FaStar,
// } from "react-icons/fa";
// import { ReactNode } from "react";

// const stats = [
//   { value: "10,000+", label: "Resumes Created", icon: FiUsers },
//   { value: "98%", label: "ATS Pass Rate", icon: FiShield },
//   { value: "4.9★", label: "User Rating", icon: FiStar },
//   { value: "3 min", label: "Avg Build Time", icon: FiClock },
// ];

// interface Feature {
//   icon: ReactNode;
//   title: string;
//   description: string;
// }

// const features: Feature[] = [
//   {
//     icon: <FaFileAlt className="w-5 h-5" />,
//     title: "Recruiter Approved Templates",
//     description:
//       "Choose from clean, modern designs built for every career level — fresher to senior.",
//   },
//   {
//     icon: <FaCheckCircle className="w-5 h-5" />,
//     title: "ATS-Optimized by Default",
//     description:
//       "Every resume is structured to pass applicant tracking systems at top Indian and global companies.",
//   },
//   {
//     icon: <FaMagic className="w-5 h-5" />,
//     title: "AI-Written Bullet Points",
//     description:
//       "Instantly generate powerful, role-specific bullet points — no writing experience needed.",
//   },
//   {
//     icon: <FaRocket className="w-5 h-5" />,
//     title: "Smart AI Writing Assistant",
//     description:
//       "Get real-time suggestions tailored to your job title, skills, and industry as you build.",
//   },
//   {
//     icon: <FaMountain className="w-5 h-5" />,
//     title: "Highlight What Makes You Unique",
//     description:
//       "Our AI surfaces your strongest achievements and presents them the way recruiters want to see them.",
//   },
//   {
//     icon: <FaHandHoldingUsd className="w-5 h-5" />,
//     title: "More Interviews. Better Offers.",
//     description:
//       "A well-crafted, ATS-ready resume leads directly to more callbacks and stronger salary conversations.",
//   },
// ];

// export default function Home() {
//   const router = useRouter();

//   return (
//     <>
//        {/* Hero  */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
//         {/* Gradient Orbs */}
//         <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
//         <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100 rounded-full filter blur-3xl opacity-10" />

//         <div className="relative z-10 max-w-7xl mx-auto text-center">
//           {/* Top Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
//           >
//             <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
//             <span className="text-xs font-medium text-indigo-700 tracking-wide uppercase">
//               Now with AI Analysis
//             </span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.5 }}
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight"
//           >
//             Your next Job opportunity
//             <br />
//             <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//               starts with the right resume
//             </span>
//           </motion.h1>

//           {/* Sub Text */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mb-10 leading-relaxed"
//           >
//             ARYU SmartCV is the pro-grade AI resume builder for All.
//             ATS-perfected, AI-augmented, and ready in minutes.
//           </motion.p>

//           {/* Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
//           >
//             <button
//               onClick={() => router.push("/choose-template")}
//               className="group px-6 md:px-8 py-3 md:py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
//             >
//               Create My Resume Free
//               <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//             </button>

//             <button
//               onClick={() => router.push("/choose-template")}
//               className="px-6 md:px-8 py-3 md:py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
//             >
//               View Templates
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* BeforeAfter */}
//       <section className="bg-white py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
//             {/* Left Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
//                 <FiZap className="w-3.5 h-3.5 text-indigo-600" />
//                 <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                   AI Transformation
//                 </span>
//               </div>

//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                 Stop guessing what recruiters want.
//                 <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
//                   Let AI do it.
//                 </span>
//               </h2>

//               <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed">
//                 ARYU SmartCV analyzes your experience, suggests powerful
//                 industry specific skills, and rewrites your achievements as
//                 measurable impact statements — the kind that pass ATS filters
//                 and get callbacks.
//               </p>

//               <div className="mt-8 flex flex-wrap gap-4">
//                 <button
//                   onClick={() => router.push("/choose-template")}
//                   className="group px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
//                 >
//                   Try Now
//                   <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//                 </button>

//                 <button
//                   onClick={() => router.push("/choose-template")}
//                   className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
//                 >
//                   View Examples
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="mt-8 pt-6 border-t border-gray-100">
//                 <div className="flex flex-wrap gap-6">
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">40%</p>
//                     <p className="text-xs text-gray-500">
//                       More Interview Calls
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">3x</p>
//                     <p className="text-xs text-gray-500">Faster Shortlisting</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">98%</p>
//                     <p className="text-xs text-gray-500">ATS Pass Rate</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
//                 {/* Header */}
//                 <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
//                   <div className="flex items-center gap-4">
//                     <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md">
//                       <Image
//                         src="/images/doubleresume.png"
//                         alt="Double resume comparison"
//                         fill
//                         className="object-cover"
//                         sizes="(max-width: 640px) 56px, 64px"
//                       />
//                     </div>
//                     <div>
//                       <div className="text-xs text-gray-500 font-medium">
//                         Sample transformation
//                       </div>
//                       <div className="font-bold text-lg text-gray-900">
//                         Before → After
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Before/After Cards */}
//                 <div className="p-5 sm:p-6 space-y-4">
//                   {/* Before Card */}
//                   <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
//                         Before
//                       </span>
//                       <div className="w-8 h-px bg-gray-200" />
//                     </div>
//                     <div className="text-sm sm:text-base text-gray-600 italic">
//                       "Responsible for backend tasks"
//                     </div>
//                   </div>

//                   {/* Arrow Icon */}
//                   <div className="flex justify-center">
//                     <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
//                       <FiTrendingUp className="w-4 h-4 text-indigo-600" />
//                     </div>
//                   </div>

//                   {/* After Card */}
//                   <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
//                         After
//                       </span>
//                       <div className="w-8 h-px bg-indigo-200" />
//                     </div>
//                     <div className="text-sm sm:text-base font-medium text-gray-900">
//                       "Built REST APIs for payments, reducing latency by 32% and
//                       increasing reliability."
//                     </div>
//                   </div>
//                 </div>

//                 {/* Feature Tags */}
//                 <div className="px-5 sm:p-6 pt-0 pb-5 flex flex-wrap gap-2">
//                   <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
//                     ATS Optimized
//                   </span>
//                   <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
//                     AI Powered
//                   </span>
//                   <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
//                     Impact Metrics
//                   </span>
//                 </div>

//                 {/* Decorative Gradient */}
//                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
//                 <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/*TrustedBy */}
//       <section className="relative bg-white py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
//         {/* Decorative Background Elements */}
//         <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
//         <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-20 pointer-events-none" />

//         <div className="relative max-w-6xl mx-auto text-center">
//           {/* Tag */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
//           >
//             <FiZap className="w-3.5 h-3.5 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               ATS optimized by AI • 98% pass rate
//             </span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             viewport={{ once: true }}
//             className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
//           >
//             Your resume should open doors,{" "}
//             <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
//               not get filtered out.
//             </span>
//           </motion.h2>

//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
//           >
//             Over 75% of resumes never reach a human recruiter. ARYU SmartCV's AI
//             engine ensures yours passes every ATS filter and lands in front of
//             the right people.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
//           >
//             <button
//               onClick={() => router.push("/choose-template")}
//               className="group px-6 md:px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
//             >
//               Build My Resume Free
//               <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//             </button>

//             <button
//               onClick={() => router.push("/choose-template")}
//               className="px-6 md:px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
//             >
//               View Templates
//             </button>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
//           >
//             {stats.map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
//               >
//                 <div className="p-2 bg-indigo-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
//                   <stat.icon className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <span className="text-2xl font-bold text-gray-900">
//                   {stat.value}
//                 </span>
//                 <span className="text-sm text-gray-500">{stat.label}</span>
//               </div>
//             ))}
//           </motion.div>

//           {/* Trust Badges */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-12 pt-8 border-t border-gray-100"
//           >
//             <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
//               Trusted by professionals from
//             </p>
//             <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
//               <span className="text-base font-semibold text-gray-500">
//                 Google
//               </span>
//               <span className="text-base font-semibold text-gray-500">
//                 Microsoft
//               </span>
//               <span className="text-base font-semibold text-gray-500">
//                 Amazon
//               </span>
//               <span className="text-base font-semibold text-gray-500">
//                 Meta
//               </span>
//               <span className="text-base font-semibold text-gray-500">
//                 Apple
//               </span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* WhyChooseUs */}
//       <section className="relative bg-gray-50 py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
//         {/* Decorative Background Elements */}
//         <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
//         <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

//         <div className="relative max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center max-w-3xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
//             >
//               <FiTrendingUp className="w-3.5 h-3.5 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 Built for India's job market
//               </span>
//             </motion.div>

//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
//             >
//               Everything you need to land{" "}
//               <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
//                 your next interview.
//               </span>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed"
//             >
//               From fresh graduates to working professionals, ARYU SmartCV gives
//               you the tools, templates, and AI assistance to build a resume that
//               actually gets responses.
//             </motion.p>
//           </div>

//           {/* Feature Cards Grid */}
//           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.05 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//                 className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
//               >
//                 <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
//                   {feature.icon}
//                 </div>

//                 <h3 className="text-lg font-bold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>

//                 <p className="text-sm text-gray-500 leading-relaxed">
//                   {feature.description}
//                 </p>

//                 <div className="mt-4 w-10 h-0.5 bg-indigo-200 rounded-full transition-all duration-300 group-hover:w-14 group-hover:bg-indigo-600" />
//               </motion.div>
//             ))}
//           </div>

//           {/* CTA Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="mt-12 text-center"
//           >
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Your next opportunity is one resume away.
//             </h3>

//             <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
//               Build your resume free — no signup required. Ready in under 3
//               minutes.
//             </p>

//             <button
//               onClick={() => router.push("/choose-template")}
//               className="group mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
//             >
//               Create My Resume Now
//               <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//             </button>
//           </motion.div>

//           {/* Trust Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-8 pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400"
//           >
//             <div className="flex items-center gap-1">
//               <FaStar className="w-3 h-3 text-yellow-500" />
//               <span>4.9/5 Rating</span>
//             </div>
//             <div className="w-1 h-1 bg-gray-300 rounded-full" />
//             <div className="flex items-center gap-1">
//               <FiUsers className="w-3 h-3 text-indigo-500" />
//               <span>10,000+ Users</span>
//             </div>
//             <div className="w-1 h-1 bg-gray-300 rounded-full" />
//             <div className="flex items-center gap-1">
//               <FaShieldAlt className="w-3 h-3 text-green-500" />
//               <span>98% ATS Pass Rate</span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* <ResumeCarousel/> */}

//       <Testimonial />
//       <Faq />
//       <CTA />
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode, useRef, useState } from "react";
import {
  FiArrowRight,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiClock,
  FiCheckCircle,
  FiAward,
  FiBriefcase,
  FiDollarSign,
  FiUpload,
  FiEdit2,
  FiFileText,
  FiDownload,
  FiLock,
  FiCreditCard,
  FiHelpCircle,
  FiCheck,
  FiBarChart2,
  FiEye,
  FiLayout,
  FiCpu,
  FiHeart,
  FiX,
  FiSearch,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";
import {
  FaMagic,
  FaFileAlt,
  FaRocket,
  FaShieldAlt,
  FaStar as FaStarIcon,
  FaRegGem,
  FaChartLine,
  FaCloudUploadAlt,
  FaRegEdit,
  FaSearch,
  FaChessQueen,
  FaChessKing,
  FaGem,
  FaPalette,
  FaGraduationCap,
  FaStar,
  FaCheckCircle,
  FaMountain,
  FaHandHoldingUsd,
} from "react-icons/fa";

import { HiSparkles } from "react-icons/hi";
import Testimonial from "../components/sections/Testimonial";
import Faq from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";

// ============ ATS FEATURES ==========
const atsFeatures = [
  {
    icon: <FiSearch className="w-5 h-5" />,
    title: "ATS Compatibility Check",
    description:
      "Scans 15 criteria including formatting, keywords, action verbs, and section completeness.",
  },
  {
    icon: <FiBarChart2 className="w-5 h-5" />,
    title: "JD Keyword Tailoring ",
    description:
      "Paste any job description. PassATS identifies missing keywords and injects them into the right sections automatically.'  (upgrade to active feature name)",
  },
  {
    icon: <FiEye className="w-5 h-5" />,
    title: "Recruiter Preview",
    description:
      "See exactly how recruiters see your resume in their first 6-second scan.",
  },
];

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaFileAlt className="w-5 h-5" />,
    title: "Professional Templates",
    description:
      "6+ ATS-safe templates built for Indian job roles — from fresher to senior professional.",
  },
  {
    icon: <FaCheckCircle className="w-5 h-5" />,
    title: "ATS Score 0–100",
    description:
      "Get a real score, see every issue, fix it in one click. Not a vague 'looks good' ",
  },
  {
    icon: <FaMagic className="w-5 h-5" />,
    title: "JD Keyword Tailoring",
    description:
      "Paste a job description and PassATS matches your resume to it automatically.",
  },
  {
    icon: <FaRocket className="w-5 h-5" />,
    title: "AI Bullet Writer",
    description:
      "Turns your raw experience into achievement-focused bullets with action verbs and metrics.",
  },
  {
    icon: <FaMountain className="w-5 h-5" />,
    title: "AI Cover Letter ",
    description:
      "Generate a matching cover letter in 30 seconds. Three tone options.",
  },
  {
    icon: <FaHandHoldingUsd className="w-5 h-5" />,
    title: "Download & Share",
    description: "PDF download + WhatsApp sharing. Ready to send in seconds.",
  },
];

const stats = [
  { value: "120K+", label: "Users Trust Us", icon: FiUsers },
  { value: "98%", label: "ATS Success Rate", icon: FiTrendingUp },
  { value: "4.9★", label: "User Rating", icon: FiStar },
  { value: "10K+", label: "Resumes Created", icon: FiCheckCircle },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center ">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-medium text-indigo-700 tracking-wide uppercase">
              Intelligent Resume Builder
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.15] sm:leading-[1.2] mt-8 sm:mt-0"
          >
            Your next{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-linear">
                Job opportunity
              </span>
            </span>
            <br />
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              starts with the right resume
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className=" max-w-5xl mx-auto text-base sm:text-lg md:text-xl text-gray-500 mb-10 leading-relaxed px-4"
          >
            Build a professional, ATS-optimised resume in minutes — with AI that
            understands the Indian job market. Backed by Aryu Academy — trusted by students and professionals
            across India
          </motion.p>

          

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/choose-plan")}
              className="px-6 sm:px-8 py-3 sm:py-4 h-15 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer text-base sm:text-lg"
            >
              View Plans
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/choose-template")}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 h-15 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer text-base sm:text-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Build My Resume{" "}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">10,000+</span> resumes
                created
              </span>
            </div>

            <div className="w-px h-6 bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FiStar
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">4.9</span> from 5,000+
                reviews
              </span>
            </div>

            <div className="w-px h-6 bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">98%</span> ATS pass
                rate
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Card-Style Trust Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl border border-indigo-100 shadow-sm p-6 sm:p-8">
            {/* Optional Heading */}
            <div className="text-center mb-8">
              <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wide">
                Trusted by Job Seekers
              </p>
              <p className="text-gray-800 text-lg sm:text-xl mt-1">
                Join thousands who've built their careers with us
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                  50K+
                </div>
                <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
                <p className="text-gray-700 font-medium">Resumes Built</p>
                <p className="text-xs text-gray-400 mt-1">by professionals</p>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                  10K+
                </div>
                <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
                <p className="text-gray-700 font-medium">ATS Scores Checked</p>
                <p className="text-xs text-gray-400 mt-1">this month</p>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                  ✓
                </div>
                <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
                <p className="text-gray-700 font-medium">Backed by Academy</p>
                <p className="text-xs text-gray-400 mt-1">Aryu certified</p>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                  100%
                </div>
                <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
                <p className="text-gray-700 font-medium">ATS-Compatible</p>
                <p className="text-xs text-gray-400 mt-1">guaranteed format</p>
              </div>

              {/* Stat 5 */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">
                  $0
                </div>
                <div className="h-0.5 w-12 bg-emerald-200 mx-auto mb-3"></div>
                <p className="text-gray-700 font-medium">Free to Start</p>
                <p className="text-xs text-gray-400 mt-1">no card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== AI FEATURES SECTION - COMPREHENSIVE ========== */}
      <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-b from-white to-indigo-50/20">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center  mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-lg border border-indigo-100 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span className="text-sm font-semibold md:font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                INTELLIGENT RESUME BUILDER
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              AI That Writes, Scores, and Optimises{" "}
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                {/* Resume with Smart Suggestions */}
                For the Indian Job Market
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto"
            >
              PassATS handles every section of your resume — with AI trained to
              pass ATS systems used by Indian recruiters.
            </motion.p>
          </div>

          {/* Main Features Grid - 2x2 Layout for Better Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/5 to-transparent rounded-full" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <FaGraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-md md:text-lg text-gray-900 mb-2">
                      Education Section
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      Formats your academic background, CGPA, and coursework for
                      Indian recruiter expectations.{" "}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-2">
                    <HiSparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-blue-600 uppercase">
                        AI Example
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        B.Tech Computer Science, Anna University | CGPA: 8.4/10
                        | Relevant Coursework: Data Structures, Operating
                        Systems, DBMS, Machine Learning' (India-specific format)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Degree Formatting
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    CGPA Optimization
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Coursework Highlight
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-500/5 to-transparent rounded-full" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <FiBriefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-md md:text-lg text-gray-900 mb-2">
                      Experience Section
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      Rewrites job duties into measurable achievements that pass
                      ATS and impress hiring managers.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="flex items-start gap-2">
                    <HiSparkles className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 uppercase">
                        AI Example
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        "Led a team of 6 developers to build a
                        microservices-based payment gateway, reducing API
                        response time by 38% and processing 2L+ daily
                        transactions."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    Impact Metrics
                  </span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    Action Verbs
                  </span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    Quantifiable Results
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/5 to-transparent rounded-full" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <FiCpu className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-md md:text-lg text-gray-900 mb-2">
                      Skills Section
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      Suggests role-specific skills and keywords that match
                      Indian job descriptions — automatically{" "}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-start gap-2">
                    <HiSparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-purple-600 uppercase">
                        AI Example
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        "Technical: Python, Java, AWS, Docker, Kubernetes |
                        Soft: Leadership, Communication, Problem-solving |
                        Tools: Git, Jira, Figma"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Technical Skills
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Soft Skills
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Keywords Match
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-pink-500/5 to-transparent rounded-full" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <FiFileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-md md:text-lg text-gray-900 mb-2">
                      Professional Summary
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      Writes a 3-line summary that tells recruiters who you are,
                      what you do best, and why you fit the role.{" "}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-linear-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="flex items-start gap-2">
                    <HiSparkles className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-pink-600 uppercase">
                        AI Example
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        "Results-driven Full Stack Developer with 4 years of
                        experience building scalable web applications.
                        Proficient in React, Node.js, and AWS. Passionate about
                        clean code and fast delivery."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                    Personalized Tone
                  </span>
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                    Key Achievements
                  </span>
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                    Career Narrative
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              How PassATS Works{" "}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Enter Your Details",
                  desc: "                    Add your work history, education, and skills. Or upload your existing resume — PassATS reads it automatically.",
                  icon: "📝",
                },
                {
                  step: "02",
                  title: " AI Builds + Optimises ",
                  desc: "PassATS writes your bullet points, scores your ATS compatibility, and tailors keywords to the job description.",
                  icon: "🤖",
                },
                {
                  step: "03",
                  title: "'Download & Apply ",
                  desc: "Download a polished PDF. Share via WhatsApp or LinkedIn. Start applying with confidence.",
                  icon: "📄",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent opacity-20 absolute -top-4 left-1/2 transform -translate-x-1/2">
                    {item.step}
                  </div>
                  <div className="relative pt-8">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 text-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <FaMagic className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2">
                Ready to build your AI-powered resume?
              </p>
              <p className="text-indigo-100 text-sm md:text-base mb-6">
                Join 50,000+ job seekers who landed their dream jobs
              </p>
              <button
                onClick={() => router.push("/choose-template")}
                className="group px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                Start Building Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BeforeAfter */}
      <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
                <FiZap className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                  AI Transformation
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                From vague to interview-ready{" "}
                <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent ">
                  in one click.{" "}
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed">
                ARYU SmartCV analyzes your experience, suggests powerful
                industry specific skills, and rewrites your achievements as
                measurable impact statements — the kind that pass ATS filters
                and get callbacks.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => router.push("/choose-template")}
                  className="group px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
                >
                  Try Now
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => router.push("/choose-template")}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
                >
                  View Examples
                </button>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">40%</p>
                    <p className="text-xs text-gray-500">
                      More Interview Calls
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3x</p>
                    <p className="text-xs text-gray-500">Faster Shortlisting</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-xs text-gray-500">ATS Pass Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/images/doubleresume.png"
                        alt="Double resume comparison"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 56px, 64px"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">
                        Sample transformation
                      </div>
                      <div className="font-bold text-lg text-gray-900">
                        Before → After
                      </div>
                    </div>
                  </div>
                </div>

                {/* Before/After Cards */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Before Card */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Before
                      </span>
                      <div className="w-8 h-px bg-gray-200" />
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 italic">
                      "Responsible for backend tasks"
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FiTrendingUp className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>

                  {/* After Card */}
                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                        After
                      </span>
                      <div className="w-8 h-px bg-indigo-200" />
                    </div>
                    <div className="text-sm sm:text-base font-medium text-gray-900">
                      "Built REST APIs for the payments module, reducing average
                      response latency by 32% and cutting error rate from 4.2%
                      to 0.6%."
                    </div>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="px-5 sm:p-6 pt-0 pb-5 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                    ATS Optimized
                  </span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                    AI Powered
                  </span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                    Impact Metrics
                  </span>
                </div>

                {/* Decorative Gradient */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== UPLOAD & EDIT RESUME SECTION - AUTO-FILL WITH AI ========== */}
      <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-br from-indigo-50/50 via-white to-purple-50/50">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Upload Your Resume,
                <span className="block bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent ">
                  Let AI Do the Rest
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-500 leading-tight">
                Already have a resume? Upload it as a PDF or Word file. PassATS
                reads every section automatically and gives you AI-powered
                suggestions to improve each one — without starting from scratch.
              </p>

              {/* How it works steps */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold md:font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Upload Your Resume
                    </h4>
                    <p className="text-sm text-gray-500">
                      PDF or DOCX format, max 5MB
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold md:font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      PassATS Reads Everything{" "}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Your work history, education, skills, and contact details
                      are parsed instantly.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold md:font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Get AI Improvements
                    </h4>
                    <p className="text-sm text-gray-500">
                      One-click rewrites, keyword additions, and ATS fixes
                      applied to your existing content.{" "}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/choose-template")}
                className="group relative mt-8 px-5 md:px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all flex items-center gap-3 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FiUpload className="w-5 h-5" />
                <span>Upload My Resume & Improve It</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Right Content - Editor Preview with Auto-filled Data */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Editor Card */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                {/* Editor Header */}
                <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-gray-400 ml-2 font-mono">
                      resume-builder.aryu.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <HiSparkles className="w-3 h-3" />
                      AI Active
                    </span>
                  </div>
                </div>

                {/* Editor Body */}
                <div className="p-5 bg-white max-h-[500px] overflow-y-auto">
                  {/* Progress Indicator */}
                  <div className="mb-4 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      Auto-filling your data...
                    </span>
                    <span className="text-indigo-600 font-semibold">
                      100% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="bg-linear-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                    />
                  </div>

                  {/* Personal Info - Auto-filled */}
                  <div className="mb-6 p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FiUser className="w-4 h-4 text-indigo-600" />
                        Personal Information
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Auto-filled
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>{" "}
                        <span className="font-medium text-gray-900">
                          Kamal Hassan
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>{" "}
                        <span className="font-medium text-gray-900">
                          Kamal.hassan01@email.com
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>{" "}
                        <span className="font-medium text-gray-900">
                          12345 67890
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span>{" "}
                        <span className="font-medium text-gray-900">
                          Chennai, IN
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Experience Section - Auto-filled with AI Suggestions */}
                  <div className="mb-6 border rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FiBriefcase className="w-4 h-4 text-indigo-600" />
                        Work Experience
                      </h3>
                      <button className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                        <HiSparkles className="w-3 h-3" />
                        AI Suggest All
                      </button>
                    </div>

                    {/* Experience 1 */}
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Senior Software Engineer
                          </h4>
                          <p className="text-sm text-gray-600">
                            TechCorp Inc. • 2022 - Present
                          </p>
                        </div>
                        <button className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg font-medium flex items-center gap-1">
                          <HiSparkles className="w-3 h-3" />
                          Improve
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 italic line-through decoration-gray-300">
                          "Developed features for the main product"
                        </p>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100"
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
                              <HiSparkles className="w-3 h-3 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-indigo-700">
                                AI Suggested
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                "Architectured and deployed 5+ microservices
                                using Node.js and AWS, reducing system latency
                                by 40% and serving 1M+ daily requests"
                              </p>
                              <div className="flex gap-2 mt-2">
                                <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg">
                                  Apply
                                </button>
                                <button className="text-xs text-gray-500">
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Experience 2 */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Software Engineer
                          </h4>
                          <p className="text-sm text-gray-600">
                            StartupX • 2019 - 2022
                          </p>
                        </div>
                        <button className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg font-medium flex items-center gap-1">
                          <HiSparkles className="w-3 h-3" />
                          Improve
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          "Built REST APIs and worked on frontend features"
                        </p>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs text-gray-400">
                            Click "Improve" for AI suggestions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section - Auto-filled with AI Categories */}
                  <div className="border rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FiCpu className="w-4 h-4 text-indigo-600" />
                        Skills
                      </h3>
                      <button className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                        <HiSparkles className="w-3 h-3" />
                        AI Optimize
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Python",
                          "JavaScript",
                          "React",
                          "Node.js",
                          "AWS",
                          "Docker",
                          "Kubernetes",
                          "MongoDB",
                          "PostgreSQL",
                          "Git",
                        ].map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 p-2 bg-indigo-50 rounded-lg text-xs text-indigo-600 flex items-center gap-2">
                        <HiSparkles className="w-3 h-3" />
                        AI suggests adding: "TypeScript", "GraphQL", "Redis"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              {
                icon: <FiUpload className="w-4 h-4" />,
                text: "Auto-fill from existing resume",
              },
              {
                icon: <HiSparkles className="w-4 h-4" />,
                text: "AI-powered content enhancement",
              },
              {
                icon: <FiShield className="w-4 h-4" />,
                text: "100% secure & private",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center md:justify-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {item.icon}
                </div>
                <span className="text-sm text-gray-600">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DUMMY RESUME */}
      <section className="relative bg-white py-14 sm:py-16 md:py-20 lg:py-24  overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
                <FiZap className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                  AI Resume Builder for Freshers & Job Seekers
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Get a Job-Winning Resume in 3 Minutes
                <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
                  Even With No Experience
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
                AI builds, writes, and optimizes your resume for real job roles
                so you get shortlisted faster. No experience? No problem.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => router.push("/choose-template")}
                  className="group px-6 md:px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create My Resume Now Free
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => router.push("/choose-template")}
                  className="px-6 md:px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
                >
                  See Sample Resumes
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>No experience needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>ATS-friendly & recruiter-ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Download in seconds</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 sm:p-8 shadow-lg">
                {/* Card Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                      Instant Resume Preview
                    </span>
                  </div>

                  {/* Resume Preview Lines */}
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-indigo-100 rounded-full" />
                    <div className="h-4 w-5/6 bg-indigo-100 rounded-full" />
                    <div className="h-4 w-4/6 bg-indigo-100 rounded-full" />
                  </div>

                  {/* Skills Section */}
                  <div className="pt-4">
                    <div className="h-3 w-24 bg-indigo-200 rounded-full mb-3" />
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                        React.js
                      </span>
                      <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                        Next.js
                      </span>
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="pt-2">
                    <div className="h-3 w-32 bg-indigo-200 rounded-full mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-indigo-50 rounded-full" />
                      <div className="h-3 w-5/6 bg-indigo-50 rounded-full" />
                    </div>
                  </div>

                  {/* CTA Bar */}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full blur-xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-100 rounded-full blur-xl -z-10" />
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
                    <stat.icon className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== ATS CHECKER SECTION - LIGHT PREMIUM ========== */}
      <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-br from-gray-50 to-white">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - ATS Score Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl border border-gray-100">
                <div className="absolute -inset-1  rounded-2xl blur-xl opacity-20" />

                <div className="relative">
                  {/* Header with Circular Score */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
                        <FiShield className="w-3 h-3 text-indigo-600" />
                        <span className=" font-medium text-indigo-700">
                          Your ATS SCORE
                        </span>
                      </div>
                    </div>

                    <span className="text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold text-blue-600 ">
                      98 %
                    </span>
                  </div>

                  {/* Score Bars */}
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Keyword Match</span>
                        <span className="font-semibold text-emerald-600">
                          95%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-linear-to-r from-emerald-500 to-green-500 h-2.5 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Formatting</span>
                        <span className="font-semibold text-emerald-600">
                          100%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="bg-linear-to-r from-emerald-500 to-green-500 h-2.5 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Readability</span>
                        <span className="font-semibold text-amber-600">
                          85%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className="bg-linear-to-r from-amber-500 to-orange-500 h-2.5 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700">
                        Use more action verbs to improve readability score
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/ats-checker")}
                    className="mt-6 w-full py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiBarChart2 className="w-4 h-4" />
                    Run Full ATS Check
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Don't Get Filtered Out
                <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ">
                  Pass ATS with Confidence
                </span>
              </h2>

              <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed">
                <span className="font-bold text-red-500">75% of resumes</span>{" "}
                are filtered out before a recruiter reads them. PassATS gives
                you a real score from 0 to 100 — and shows you exactly what to
                fix before you apply.
              </p>

              <div className="mt-8 space-y-4">
                {atsFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          >
            <FaRocket className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white uppercase">
              Start Your Journey Today
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Ready to Land Your Dream Job?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-sm sm:text-base md:text-lg text-indigo-100"
          >
            Join 50,000+ job seekers who transformed their careers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => router.push("/choose-template")}
              className="group px-8 py-3 md:py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer md:text-lg"
            >
              Create My Resume Free
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("pricing-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all cursor-pointer md:text-lg"
            >
              View All Plans
            </button>
          </motion.div>
        </div>
      </section>

      {/* WhyChooseUs */}
      <section className="relative bg-gray-50 py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
            >
              <FiTrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                Built for India's job market
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Everything You Need to Pass
              <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent ">
                ATS and Get Shortlisted
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed"
            >
              From campus placement to senior roles — PassATS gives you the
              tools to compete with confidence in the Indian job market.
            </motion.p>
          </div>

          {/* Feature Cards Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 w-10 h-0.5 bg-indigo-200 rounded-full transition-all duration-300 group-hover:w-14 group-hover:bg-indigo-600" />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your next opportunity is one resume away.
            </h3>

            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Build your resume free — no signup required. Ready in under 3
              minutes.
            </p>

            <button
              onClick={() => router.push("/choose-template")}
              className="group mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              Create My Resume Now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400"
          >
            <div className="flex items-center gap-1">
              <FaStar className="w-3 h-3 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1">
              <FiUsers className="w-3 h-3 text-indigo-500" />
              <span>10,000+ Users</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1">
              <FaShieldAlt className="w-3 h-3 text-green-500" />
              <span>98% ATS Pass Rate</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonial />
      <Faq />

      {/* Full Width with Animated Gradient */}
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 animate-gradient">
        <div className="relative  mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Heading with gradient text */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-4 sm:mb-6 leading-tight">
            Your Next Job Starts with{" "}
            <span className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 bg-clip-text text-transparent">
              the Right Resume.
            </span>
          </h2>

          {/* Body */}
          <p className="text-base sm:text-lg text-indigo-100 text-center max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Whether you are applying for campus placement, your first role, or
            your next big move — PassATS gives you the resume that gets you in
            the room.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <button
              onClick={() => router.push("/choose-template")}
              className="group px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              Build My Resume — It's Free
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            {/* Optional Secondary Button */}
            <button
              onClick={() => router.push("/choose-plan")}
              className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              Choose Plan
            </button>
          </div>

          {/* Trust Message */}
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-indigo-100">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <span className="hidden sm:inline text-indigo-300">•</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Start in under 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
