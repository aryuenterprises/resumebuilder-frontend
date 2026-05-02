// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { 
//   FiArrowRight, 
//   FiZap, 
//   FiCheckCircle, 
//   FiUsers, 
//   FiTrendingUp, 
//   FiStar, 
//   FiBriefcase,
//   FiShield,
//   FiAward,
//   FiClock,
//   FiDownload,
//   FiEye
// } from "react-icons/fi";
// import { 
//   FaMagic, 
//   FaRobot,
//   FaCrown,
//   FaRocket,
//   FaGem,
//   FaChartLine
// } from "react-icons/fa";

// const stats = [
//   { value: "120K+", label: "Happy Users", icon: FiUsers, color: "from-blue-500 to-cyan-500" },
//   { value: "98%", label: "Success Rate", icon: FiTrendingUp, color: "from-emerald-500 to-teal-500" },
//   { value: "4.9★", label: "Avg Rating", icon: FiStar, color: "from-amber-500 to-orange-500" },
//   { value: "3min", label: "Quick Creation", icon: FiClock, color: "from-purple-500 to-pink-500" },
// ];

// export const DummyResumeSection = () => {
//   const router = useRouter();
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white relative overflow-hidden">
//       {/* Decorative Elements - Hidden on mobile */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden md:block">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-10 md:mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg mb-4 sm:mb-5 md:mb-6"
//           >
//             <FaCrown className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-yellow-300" />
//             <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">World's #1 AI Resume Builder 2024</span>
//             <FiZap className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-yellow-300" />
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
//           >
//             <span className="text-gray-900">Create a Resume That</span>
//             <br />
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
//               Gets You Hired Fast
//             </span>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-2"
//           >
//             Join 120,000+ professionals who landed their dream jobs with AI-powered resumes
//           </motion.p>
//         </div>

//         {/* Stats Grid - Responsive */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-14"
//         >
//           {stats.map((stat, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ y: -3 }}
//               className={`relative group bg-gradient-to-br ${stat.color} rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
//             >
//               <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mx-auto mb-1 sm:mb-2" />
//               <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">{stat.value}</div>
//               <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80">{stat.label}</div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Main Content - Responsive Grid */}
//         <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
//           {/* Left Column - Features */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="space-y-3 sm:space-y-4 md:space-y-5"
//           >
//             {[
//               { icon: <FaRobot />, title: "AI-Powered Enhancement", desc: "Transform vague bullet points into achievement-focused statements", color: "indigo", badge: "AI Tech" },
//               { icon: <FiShield />, title: "ATS Score Optimization", desc: "Get real-time scoring and fix issues before recruiters screen", color: "emerald", badge: "98% Pass" },
//               { icon: <FaGem />, title: "Premium Templates", desc: "15+ designer-crafted, ATS-friendly templates for every industry", color: "purple", badge: "15+ Templates" },
//               { icon: <FaChartLine />, title: "Job Description Matching", desc: "Tailor your resume to any job with automatic keyword optimization", color: "orange", badge: "Smart Match" },
//             ].map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ x: 4 }}
//                 className={`group bg-white border-l-4 border-${feature.color}-500 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300`}
//               >
//                 <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
//                   <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 group-hover:scale-110 transition-transform flex-shrink-0`}>
//                     <div className="text-sm sm:text-base md:text-lg">{feature.icon}</div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
//                       <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{feature.title}</h3>
//                       <span className={`text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-${feature.color}-100 text-${feature.color}-600 font-medium whitespace-nowrap`}>
//                         {feature.badge}
//                       </span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
//                   </div>
//                   <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
//                 </div>
//               </motion.div>
//             ))}

//             {/* CTA Buttons - Responsive */}
//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onHoverStart={() => setIsHovered(true)}
//                 onHoverEnd={() => setIsHovered(false)}
//                 onClick={() => router.push("/choose-template")}
//                 className="w-full sm:flex-1 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-sm sm:text-base"
//               >
//                 <FaRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Create My Resume Now
//                 <motion.div animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
//                   <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 </motion.div>
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-sm sm:text-base"
//               >
//                 <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Live Demo
//               </motion.button>
//             </div>

//             {/* Trust Indicators - Responsive */}
//             <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 pt-2 sm:pt-3">
//               <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
//                 <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                 <span className="text-[9px] sm:text-[10px] md:text-xs">Free to start</span>
//               </div>
//               <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
//                 <FiShield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                 <span className="text-[9px] sm:text-[10px] md:text-xs">30-day guarantee</span>
//               </div>
//               <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
//                 <FiDownload className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                 <span className="text-[9px] sm:text-[10px] md:text-xs">Instant download</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column - Resume Preview (Responsive) */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="relative mt-6 lg:mt-0"
//           >
//             {/* Floating Badge - Hidden on mobile */}
//             <div className="absolute -top-2 -right-2 z-10 hidden sm:block">
//               <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-full px-2 sm:px-3 py-1 shadow-lg">
//                 <div className="flex items-center gap-1">
//                   <FiAward className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
//                   <span className="text-[8px] sm:text-[10px] font-bold text-white">Top Pick 2024</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border border-gray-100">
//               {/* Gradient Bar */}
//               <div className="h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
//               <div className="p-3 sm:p-4 md:p-5 lg:p-6">
//                 {/* Profile Section - Responsive */}
//                 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
//                   <div className="flex gap-3 items-center sm:items-start">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
//                       <span className="text-sm sm:text-base md:text-lg font-bold text-white">SC</span>
//                     </div>
//                     <div>
//                       <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Sarah Chen</h3>
//                       <p className="text-indigo-600 text-xs sm:text-sm font-medium">Senior Product Designer</p>
//                       <div className="flex flex-wrap gap-2 mt-0.5 text-[9px] sm:text-xs text-gray-500">
//                         <span>📧 sarah@email.com</span>
//                         <span>📍 SF, CA</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-left sm:text-right">
//                     <div className="bg-emerald-50 px-2 sm:px-3 py-1 rounded-lg inline-block">
//                       <p className="text-[8px] sm:text-[9px] md:text-[10px] text-emerald-600 font-semibold">ATS Score</p>
//                       <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-600">98%</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Summary - Responsive */}
//                 <div className="mb-3 sm:mb-4">
//                   <div className="flex items-center gap-1.5 mb-1.5">
//                     <div className="w-1 h-3 sm:h-4 bg-indigo-500 rounded-full" />
//                     <h4 className="text-[11px] sm:text-xs font-semibold text-gray-700">Professional Summary</h4>
//                   </div>
//                   <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 sm:p-3 rounded-lg">
//                     <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
//                       🏆 Award-winning Designer with 6+ years experience. Increased engagement by <span className="font-bold text-indigo-600">156%</span> and generated <span className="font-bold text-indigo-600">$2.4M</span> revenue.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Experience - Responsive */}
//                 <div className="mb-3 sm:mb-4">
//                   <div className="flex items-center gap-1.5 mb-2">
//                     <div className="w-1 h-3 sm:h-4 bg-indigo-500 rounded-full" />
//                     <h4 className="text-[11px] sm:text-xs font-semibold text-gray-700">Work Experience</h4>
//                   </div>
//                   <div className="space-y-2 sm:space-y-3">
//                     <div className="relative pl-3 border-l-2 border-indigo-200">
//                       <div className="absolute -left-[5px] top-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
//                       <div className="flex flex-wrap justify-between items-start gap-1 mb-0.5">
//                         <div>
//                           <p className="text-xs sm:text-sm font-semibold text-gray-800">Senior Product Designer</p>
//                           <p className="text-[9px] sm:text-xs text-indigo-600">Google · 2022 - Present</p>
//                         </div>
//                         <span className="text-[8px] sm:text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Current</span>
//                       </div>
//                       <ul className="space-y-0.5 text-[9px] sm:text-xs text-gray-600 mt-1">
//                         <li className="flex items-start gap-1">✨ Led redesign, increasing adoption by <span className="font-bold text-indigo-600">45%</span></li>
//                         <li className="flex items-start gap-1">👥 Managed team of 8 designers</li>
//                         <li className="flex items-start gap-1 hidden sm:flex">📈 Features used by <span className="font-bold text-indigo-600">50M+</span> users</li>
//                       </ul>
//                     </div>
                    
//                     <div className="relative pl-3 border-l-2 border-gray-200">
//                       <div className="absolute -left-[5px] top-0 w-1.5 h-1.5 rounded-full bg-gray-400" />
//                       <div>
//                         <p className="text-xs sm:text-sm font-semibold text-gray-800">Product Designer</p>
//                         <p className="text-[9px] sm:text-xs text-indigo-600">Meta · 2019 - 2022</p>
//                       </div>
//                       <ul className="space-y-0.5 text-[9px] sm:text-xs text-gray-600 mt-1">
//                         <li className="flex items-start gap-1">🎨 Designed features used by <span className="font-bold text-indigo-600">500M+</span> users</li>
//                         <li className="flex items-start gap-1 hidden sm:flex">🏆 Received 'Design Excellence Award'</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Skills - Responsive */}
//                 <div className="mb-3">
//                   <div className="flex items-center gap-1.5 mb-2">
//                     <div className="w-1 h-3 sm:h-4 bg-indigo-500 rounded-full" />
//                     <h4 className="text-[11px] sm:text-xs font-semibold text-gray-700">Core Skills</h4>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {[
//                       { name: "UI/UX Design", level: 95 },
//                       { name: "Figma", level: 98 },
//                       { name: "User Research", level: 88 },
//                       { name: "Prototyping", level: 92 },
//                     ].map((skill) => (
//                       <div key={skill.name}>
//                         <div className="flex justify-between text-[9px] sm:text-xs mb-0.5">
//                           <span className="text-gray-600">{skill.name}</span>
//                         </div>
                        
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Footer Badges - Responsive */}
//                 <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1 sm:gap-1.5 justify-center">
//                   <span className="text-[8px] sm:text-[9px] md:text-[10px] bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">🏆 ATS Optimized</span>
//                   <span className="text-[8px] sm:text-[9px] md:text-[10px] bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">⭐ Recruiter Approved</span>
//                   <span className="text-[8px] sm:text-[9px] md:text-[10px] bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">📊 Data-Driven</span>
//                 </div>
//               </div>
//             </div>

//             {/* Floating CTA - Hidden on mobile */}
//             <div className="absolute -bottom-3 -left-3 bg-white rounded-lg shadow-lg p-1.5 sm:p-2 border border-gray-100 hidden lg:flex items-center gap-1.5">
//               <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100 flex items-center justify-center">
//                 <FiUsers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
//               </div>
//               <div>
//                 <p className="text-[9px] sm:text-[10px] font-semibold text-gray-800">2,347 resumes created</p>
//                 <p className="text-[7px] sm:text-[8px] text-gray-400">in the last hour</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom Banner - Responsive */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center shadow-lg"
//         >
//           <p className="text-[11px] sm:text-sm md:text-base text-white font-semibold">
//             🎯 <span className="font-bold">Limited Time Offer:</span> Get 50% off annual plans + Free guide
//           </p>
//           <p className="text-[9px] sm:text-xs text-indigo-100 mt-1">Only 247 spots left • Offer ends in 23:59:59</p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };














"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  FiArrowRight, 
  FiZap, 
  FiCheckCircle, 
  FiUsers, 
  FiTrendingUp, 
  FiStar, 
  FiBriefcase,
  FiShield,
  FiAward,
  FiClock,
  FiDownload,
  FiEye
} from "react-icons/fi";
import { 
  FaMagic, 
  FaRobot,
  FaCrown,
  FaRocket,
  FaGem,
  FaChartLine
} from "react-icons/fa";

const stats = [
  { value: "120K+", label: "Happy Users", icon: FiUsers, color: "from-blue-500 to-cyan-500" },
  { value: "98%", label: "Success Rate", icon: FiTrendingUp, color: "from-emerald-500 to-teal-500" },
  { value: "4.9★", label: "Avg Rating", icon: FiStar, color: "from-amber-500 to-orange-500" },
  { value: "3min", label: "Quick Creation", icon: FiClock, color: "from-purple-500 to-pink-500" },
];

export const DummyResumeSection = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white relative overflow-hidden">
      {/* Decorative Elements - Hidden on mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg mb-3 sm:mb-4 md:mb-5 lg:mb-6"
          >
            <FaCrown className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-yellow-300" />
            <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-semibold text-white whitespace-nowrap">World's #1 AI Resume Builder 2024</span>
            <FiZap className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-yellow-300" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-2"
          >
            <span className="text-gray-900">Create a Resume That</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              Gets You Hired Fast
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-500 max-w-2xl mx-auto px-3"
          >
            Join 120,000+ professionals who landed their dream jobs with AI-powered resumes
          </motion.p>
        </div>

        {/* Stats Grid - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 lg:mb-14"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className={`relative group bg-gradient-to-br ${stat.color} rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white mx-auto mb-0.5 sm:mb-1 md:mb-2" />
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white">{stat.value}</div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content - Responsive Grid */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-stretch">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-5"
          >
            {[
              { icon: <FaRobot />, title: "AI-Powered Enhancement", desc: "Transform vague bullet points into achievement-focused statements", color: "indigo", badge: "AI Tech" },
              { icon: <FiShield />, title: "ATS Score Optimization", desc: "Get real-time scoring and fix issues before recruiters screen", color: "emerald", badge: "98% Pass" },
              { icon: <FaGem />, title: "Premium Templates", desc: "15+ designer-crafted, ATS-friendly templates for every industry", color: "purple", badge: "15+ Templates" },
              { icon: <FaChartLine />, title: "Job Description Matching", desc: "Tailor your resume to any job with automatic keyword optimization", color: "orange", badge: "Smart Match" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 3 }}
                className={`group bg-white border-l-4 border-${feature.color}-500 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg">{feature.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 mb-0.5 sm:mb-1">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800">{feature.title}</h3>
                      <span className={`text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-${feature.color}-100 text-${feature.color}-600 font-medium whitespace-nowrap`}>
                        {feature.badge}
                      </span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                  <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </motion.div>
            ))}

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => router.push("/choose-template")}
                className="w-full sm:flex-1 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-[11px] sm:text-xs md:text-sm"
              >
                <FaRocket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Create My Resume Now
                <motion.div animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
                  <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </motion.div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-[11px] sm:text-xs md:text-sm"
              >
                <FiEye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Live Demo
              </motion.button>
            </div>

            {/* Trust Indicators - Responsive */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 pt-2 sm:pt-3">
              <div className="flex items-center gap-0.5 sm:gap-1 text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full">
                <FiCheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]">Free to start</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 text-blue-600 bg-blue-50 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full">
                <FiShield className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]">30-day guarantee</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 text-purple-600 bg-purple-50 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full">
                <FiDownload className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]">Instant download</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Resume Preview (Responsive) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mt-4 lg:mt-0"
          >
            {/* Floating Badge - Hidden on mobile */}
            <div className="absolute -top-2 -right-2 z-10 hidden sm:block">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 shadow-lg">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <FiAward className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] font-bold text-white">Top Pick 2024</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100">
              {/* Gradient Bar */}
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <div className="p-3 sm:p-4 md:p-5">
                {/* Profile Section - Responsive */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                  <div className="flex gap-2 items-center sm:items-start">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-xs sm:text-sm md:text-base font-bold text-white">SC</span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Sarah Chen</h3>
                      <p className="text-indigo-600 text-[9px] sm:text-[10px] md:text-xs font-medium">Senior Product Designer</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5 text-[8px] sm:text-[9px] md:text-[10px] text-gray-500">
                        <span>📧 sarah@email.com</span>
                        <span>📍 SF, CA</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="bg-emerald-50 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-lg inline-block">
                      <p className="text-[7px] sm:text-[8px] md:text-[9px] text-emerald-600 font-semibold">ATS Score</p>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-emerald-600">98%</p>
                    </div>
                  </div>
                </div>

                {/* Summary - Responsive */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                    <div className="w-0.5 h-2 sm:h-3 bg-indigo-500 rounded-full" />
                    <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700">Professional Summary</h4>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-1.5 sm:p-2 md:p-3 rounded-lg">
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-700 leading-relaxed">
                      🏆 Award-winning Designer with 6+ years experience. Increased engagement by <span className="font-bold text-indigo-600">156%</span> and generated <span className="font-bold text-indigo-600">$2.4M</span> revenue.
                    </p>
                  </div>
                </div>

                {/* Experience - Responsive */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                    <div className="w-0.5 h-2 sm:h-3 bg-indigo-500 rounded-full" />
                    <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700">Work Experience</h4>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                    <div className="relative pl-2 sm:pl-3 border-l-2 border-indigo-200">
                      <div className="absolute -left-[3px] sm:-left-[5px] top-0 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-500" />
                      <div className="flex flex-wrap justify-between items-start gap-1 mb-0.5">
                        <div>
                          <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-800">Senior Product Designer</p>
                          <p className="text-[7px] sm:text-[8px] md:text-[9px] text-indigo-600">Google · 2022 - Present</p>
                        </div>
                        <span className="text-[6px] sm:text-[7px] md:text-[8px] bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded-full">Current</span>
                      </div>
                      <ul className="space-y-0.5 text-[7px] sm:text-[8px] md:text-[9px] text-gray-600 mt-0.5 sm:mt-1">
                        <li className="flex items-start gap-0.5 sm:gap-1">✨ Led redesign, increasing adoption by <span className="font-bold text-indigo-600">45%</span></li>
                        <li className="flex items-start gap-0.5 sm:gap-1">👥 Managed team of 8 designers</li>
                        <li className="flex items-start gap-0.5 sm:gap-1 hidden sm:flex">📈 Features used by <span className="font-bold text-indigo-600">50M+</span> users</li>
                      </ul>
                    </div>
                    
                    <div className="relative pl-2 sm:pl-3 border-l-2 border-gray-200">
                      <div className="absolute -left-[3px] sm:-left-[5px] top-0 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-400" />
                      <div>
                        <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-800">Product Designer</p>
                        <p className="text-[7px] sm:text-[8px] md:text-[9px] text-indigo-600">Meta · 2019 - 2022</p>
                      </div>
                      <ul className="space-y-0.5 text-[7px] sm:text-[8px] md:text-[9px] text-gray-600 mt-0.5 sm:mt-1">
                        <li className="flex items-start gap-0.5 sm:gap-1">🎨 Designed features used by <span className="font-bold text-indigo-600">500M+</span> users</li>
                        <li className="flex items-start gap-0.5 sm:gap-1 hidden sm:flex">🏆 Received 'Design Excellence Award'</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills - Responsive */}
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                    <div className="w-0.5 h-2 sm:h-3 bg-indigo-500 rounded-full" />
                    <h4 className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700">Core Skills</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                    {[
                      { name: "UI/UX Design", level: 95 },
                      { name: "Figma", level: 98 },
                      { name: "User Research", level: 88 },
                      { name: "Prototyping", level: 92 },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-[7px] sm:text-[8px] md:text-[9px] mb-0.5">
                          <span className="text-gray-600">{skill.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Badges - Responsive */}
                <div className="pt-1.5 sm:pt-2 border-t border-gray-100 flex flex-wrap gap-0.5 sm:gap-1 justify-center">
                  <span className="text-[6px] sm:text-[7px] md:text-[8px] bg-gray-100 text-gray-600 px-1 sm:px-1.5 py-0.5 rounded-full">🏆 ATS Optimized</span>
                  <span className="text-[6px] sm:text-[7px] md:text-[8px] bg-gray-100 text-gray-600 px-1 sm:px-1.5 py-0.5 rounded-full">⭐ Recruiter Approved</span>
                  <span className="text-[6px] sm:text-[7px] md:text-[8px] bg-gray-100 text-gray-600 px-1 sm:px-1.5 py-0.5 rounded-full">📊 Data-Driven</span>
                </div>
              </div>
            </div>

            {/* Floating CTA - Hidden on mobile */}
            <div className="absolute -bottom-2 -left-2 bg-white rounded-lg shadow-lg p-1 sm:p-1.5 border border-gray-100 hidden xl:flex items-center gap-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <FiUsers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
              </div>
              <div>
                <p className="text-[7px] sm:text-[8px] font-semibold text-gray-800">2,347 resumes created</p>
                <p className="text-[6px] sm:text-[7px] text-gray-400">in the last hour</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 text-center shadow-lg"
        >
          <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white font-semibold">
            🎯 <span className="font-bold">Limited Time Offer:</span> Get 50% off annual plans + Free guide
          </p>
          <p className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-xs text-indigo-100 mt-0.5 sm:mt-1">Only 247 spots left • Offer ends in 23:59:59</p>
        </motion.div>
      </div>
    </section>
  );
};