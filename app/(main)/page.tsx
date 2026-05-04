// "use client";

// import Image from "next/image";
// import {
//   AnimatePresence,
//   motion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useRef, useState } from "react";
// import {
//   FiArrowRight,
//   FiZap,
//   FiShield,
//   FiTrendingUp,
//   FiUsers,
//   FiStar,
//   FiClock,
//   FiCheckCircle,
//   FiAward,
//   FiBriefcase,
//   FiDollarSign,
//   FiUpload,
//   FiEdit2,
//   FiFileText,
//   FiDownload,
//   FiLock,
//   FiCreditCard,
//   FiHelpCircle,
//   FiCheck,
//   FiBarChart2,
//   FiEye,
//   FiLayout,
//   FiCpu,
//   FiHeart,
//   FiX,
//   FiSearch,
//   FiUser,
//   FiAlertCircle,
//   FiPlay,
//   FiRefreshCw,
//   FiCopy,
//   FiTarget,
// } from "react-icons/fi";
// import {
//   FaMagic,
//   FaFileAlt,
//   FaRocket,
//   FaShieldAlt,
//   FaStar as FaStarIcon,
//   FaRegGem,
//   FaChartLine,
//   FaCloudUploadAlt,
//   FaRegEdit,
//   FaSearch,
//   FaChessQueen,
//   FaChessKing,
//   FaGem,
//   FaPalette,
//   FaGraduationCap,
//   FaStar,
//   FaCheckCircle,
//   FaMountain,
//   FaHandHoldingUsd,
//   FaBrain,
//   FaRobot,
//   FaTags,
//   FaSpinner,
//   FaCrown,
// } from "react-icons/fa";

// import { HiSparkles } from "react-icons/hi";
// import Testimonial from "../components/sections/Testimonial";
// import Faq from "../components/sections/FAQ";
// import CTA from "../components/sections/CTA";

// interface Feature {
//   icon: ReactNode;
//   title: string;
//   description: string;
// }

// const features: Feature[] = [
//   {
//     icon: <FaFileAlt className="w-5 h-5" />,
//     title: "Professional Templates",
//     description:
//       "6+ ATS-safe templates built for Global job roles - from fresher to senior professional",
//   },
//   {
//     icon: <FaCheckCircle className="w-5 h-5" />,
//     title: "ATS Score 0 - 100",
//     description:
//       "Get a real score, see every issue, fix it in one click Not a vague 'looks good' ",
//   },
//   {
//     icon: <FaMagic className="w-5 h-5" />,
//     title: "JD Keyword Tailoring",
//     description:
//       "Paste a job description and PassATS matches your resume to it automatically",
//   },
//   {
//     icon: <FaRocket className="w-5 h-5" />,
//     title: "AI Bullet Writer",
//     description:
//       "Turns your raw experience into achievement-focused bullets with action verbs and metrics",
//   },
//   {
//     icon: <FaMountain className="w-5 h-5" />,
//     title: "AI Cover Letter ",
//     description:
//       "Generate a matching cover letter in 30 seconds Three tone options",
//   },
//   {
//     icon: <FaHandHoldingUsd className="w-5 h-5" />,
//     title: "Download & Share",
//     description: "PDF download + WhatsApp sharing Ready to send in seconds",
//   },
// ];

// const stats = [
//   { value: "120K+", label: "Users Trust Us", icon: FiUsers },
//   { value: "98%", label: "ATS Success Rate", icon: FiTrendingUp },
//   { value: "4.9★", label: "User Rating", icon: FiStar },
//   { value: "10K+", label: "Resumes Created", icon: FiCheckCircle },
// ];

// const statsData = [
//   { value: "120K+", label: "Active Users", icon: FiUsers, color: "indigo" },
//   {
//     value: "98%",
//     label: "ATS Pass Rate",
//     icon: FiTrendingUp,
//     color: "emerald",
//   },
//   { value: "4.9★", label: "User Rating", icon: FiStar, color: "yellow" },
//   {
//     value: "10K+",
//     label: "Resumes Created",
//     icon: FiCheckCircle,
//     color: "blue",
//   },
// ];

// // ========== SECTION 1: RESUME UPLOAD & AUTO-FILL EDIT DEMO ==========
// const InteractiveAIDemo = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const steps = [
//     {
//       title: "Upload Resume",
//       icon: <FiUpload />,
//       desc: "Upload your existing resume or start fresh",
//       color: "indigo",
//       animation: "upload",
//     },
//     {
//       title: "AI Analysis",
//       icon: <FaBrain />,
//       desc: "AI scans and extracts all your information",
//       color: "purple",
//       animation: "scan",
//     },
//     {
//       title: "Smart Enhancement",
//       icon: <FaMagic />,
//       desc: "AI rewrites bullet points with metrics",
//       color: "pink",
//       animation: "magic",
//     },
//     {
//       title: "ATS Optimization",
//       icon: <FiBarChart2 />,
//       desc: "Keywords added for ATS success",
//       color: "emerald",
//       animation: "score",
//     },
//     {
//       title: "Ready to Apply",
//       icon: <FiDownload />,
//       desc: "Download optimized resume",
//       color: "blue",
//       animation: "complete",
//     },
//   ];

//   useEffect(() => {
//     // if (!isPlaying) return;
//     const timer = setInterval(() => {
//       setCurrentStep((prev) => (prev + 1) % steps.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, [steps.length]);

//   return (
//     <motion.div
//       layout
//       className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 `}
//     >
//       <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
//         <div className="flex gap-1.5 sm:gap-2">
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
//         </div>
//       </div>

//       <div className="p-3 sm:p-4 md:p-6">
//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
//           {/* Steps - Responsive */}
//           <div className="flex-1 space-y-2 sm:space-y-3">
//             {steps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 ${currentStep === idx ? `bg-${step.color}-500/20 border border-${step.color}-500/50` : "hover:bg-white/5"}`}
//                 onClick={() => setCurrentStep(idx)}
//                 whileHover={{ x: 3 }}
//               >
//                 <div
//                   className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white ${currentStep === idx ? "animate-pulse" : ""}`}
//                 >
//                   {step.icon}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-white text-xs sm:text-sm">
//                     {step.title}
//                   </p>
//                   <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
//                     {step.desc}
//                   </p>
//                 </div>
//                 {currentStep === idx && (
//                   <motion.div
//                     layoutId="activeStep"
//                     className={`w-1.5 h-1.5 rounded-full bg-${step.color}-500`}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {/* Animation Area - Responsive */}
//           <div className="flex-1 bg-black/30 rounded-lg sm:rounded-xl p-4 sm:p-6 min-h-[250px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentStep}
//                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -20, scale: 0.9 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-center w-full"
//               >
//                 {currentStep === 0 && (
//                   <motion.div
//                     animate={{ y: [0, -10, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     <div className="relative">
//                       <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto border-3 sm:border-4 border-dashed border-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
//                         <FiUpload className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-400" />
//                       </div>
//                       <motion.div
//                         className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-indigo-500/50 rounded-full"
//                         animate={{ scaleX: [1, 1.5, 1] }}
//                         transition={{ duration: 1.5, repeat: Infinity }}
//                       />
//                     </div>
//                     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//                       Drag & drop your resume
//                     </p>
//                     <p className="text-gray-400 text-xs sm:text-sm">
//                       PDF or DOCX up to 5MB
//                     </p>
//                   </motion.div>
//                 )}

//                 {currentStep === 1 && (
//                   <div>
//                     <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
//                       <motion.div
//                         className="absolute inset-0 rounded-full border-4 border-purple-500/30"
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                       <motion.div
//                         className="absolute inset-2 rounded-full border-4 border-purple-500/50"
//                         animate={{ rotate: -360 }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <FaRobot className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
//                       </div>
//                     </div>
//                     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//                       AI analyzing your data...
//                     </p>
//                     <motion.div className="w-32 sm:w-48 h-1 bg-gray-700 rounded-full mx-auto mt-2 overflow-hidden">
//                       <motion.div
//                         className="h-full bg-purple-500 rounded-full"
//                         animate={{ width: ["0%", "100%"] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                       />
//                     </motion.div>
//                   </div>
//                 )}

//                 {currentStep === 2 && (
//                   <div>
//                     <motion.div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
//                       <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl opacity-20" />
//                       <motion.div
//                         className="absolute inset-0 flex items-center justify-center"
//                         animate={{ rotateY: [0, 360] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                       >
//                         <FaMagic className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400" />
//                       </motion.div>
//                     </motion.div>
//                     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//                       Enhancing your content...
//                     </p>
//                     <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 w-full max-w-[200px] mx-auto">
//                       <motion.div
//                         className="h-1.5 sm:h-2 bg-gray-700 rounded-full"
//                         animate={{ width: ["0%", "100%"] }}
//                         transition={{ duration: 1.5 }}
//                       />
//                       <motion.div
//                         className="h-1.5 sm:h-2 bg-gray-700 rounded-full"
//                         animate={{ width: ["0%", "100%"] }}
//                         transition={{ duration: 1.5, delay: 0.3 }}
//                       />
//                       <motion.div
//                         className="h-1.5 sm:h-2 bg-gray-700 rounded-full"
//                         animate={{ width: ["0%", "100%"] }}
//                         transition={{ duration: 1.5, delay: 0.6 }}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {currentStep === 3 && (
//                   <div>
//                     <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
//                       <svg className="w-full h-full" viewBox="0 0 100 100">
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="45"
//                           fill="none"
//                           stroke="#1f2937"
//                           strokeWidth="8"
//                         />
//                         <motion.circle
//                           cx="50"
//                           cy="50"
//                           r="45"
//                           fill="none"
//                           stroke="url(#gradient)"
//                           strokeWidth="8"
//                           strokeLinecap="round"
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: 1 }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                           transform="rotate(-90 50 50)"
//                         />
//                         <defs>
//                           <linearGradient
//                             id="gradient"
//                             x1="0%"
//                             y1="0%"
//                             x2="100%"
//                             y2="0%"
//                           >
//                             <stop offset="0%" stopColor="#10b981" />
//                             <stop offset="100%" stopColor="#3b82f6" />
//                           </linearGradient>
//                         </defs>
//                       </svg>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <span className="text-xl sm:text-2xl font-bold text-emerald-400">
//                           98%
//                         </span>
//                       </div>
//                     </div>
//                     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//                       ATS Score: 98%
//                     </p>
//                     <p className="text-gray-400 text-xs sm:text-sm">
//                       Optimized for success!
//                     </p>
//                   </div>
//                 )}

//                 {currentStep === 4 && (
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring" }}
//                   >
//                     <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
//                       <FiCheck className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
//                     </div>
//                     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//                       Ready to Apply!
//                     </p>
//                     <p className="text-gray-400 text-xs sm:text-sm">
//                       Download your optimized resume
//                     </p>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-xs sm:text-sm flex items-center gap-2 mx-auto"
//                     >
//                       <FiDownload className="w-3 h-3" /> Download PDF
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== SECTION 3: AI CONTENT SUGGESTIONS WITH PROPER DISPLAY ==========
// const AIContentSuggestionsDemo = () => {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [activeSection, setActiveSection] = useState(0);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [displayText, setDisplayText] = useState("");
//   const [userData, setUserData] = useState({
//     degree: "Computer Science Engineering",
//     university: "Stanford University",
//     year: "2020-2024",
//     cgpa: "8.7/10",
//     jobTitle: "Full Stack Developer",
//     company: "Google",
//     experience: "2 years",
//   });

//   const sections = [
//     {
//       id: "education",
//       name: "Education",
//       icon: <FaGraduationCap />,
//       color: "blue",
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: "experience",
//       name: "Experience",
//       icon: <FiBriefcase />,
//       color: "orange",
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       id: "skills",
//       name: "Skills",
//       icon: <FaTags />,
//       color: "purple",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       id: "summary",
//       name: "Summary",
//       icon: <FiUser />,
//       color: "cyan",
//       gradient: "from-cyan-500 to-blue-500",
//     },
//   ];

//   const generateAISuggestion = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       let text = "";
//       if (activeSection === 0) {
//         text = `${userData.degree} from ${userData.university} (${userData.year})\n\n📚 CGPA: ${userData.cgpa} (First Class with Distinction)\n\n📖 Relevant Coursework:\n• Data Structures & Algorithms\n• Operating Systems\n• Database Management Systems\n• Machine Learning\n• Cloud Computing\n\n🏆 Achievements:\n• Dean's List 2022\n• Published Research Paper on AI in Healthcare\n• Winner of Hackathon 2023`;
//       } else if (activeSection === 1) {
//         text = `${userData.jobTitle} at ${userData.company}\n📍 ${userData.experience} years of experience\n\n🚀 Key Achievements:\n\n• Architected and deployed scalable microservices handling 2M+ daily requests, reducing API latency by 38%\n\n• Led a team of 6 engineers to deliver critical features ahead of schedule, receiving 'Star Performer' award\n\n• Implemented CI/CD pipelines reducing deployment time by 60% and improving team productivity\n\n• Optimized database queries improving response time by 45% and reducing server costs by 30%\n\n• Mentored 3 junior developers, helping them achieve promotion within 12 months`;
//       } else if (activeSection === 2) {
//         text = `🛠️ Technical Skills\n\n• Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Redux\n• Backend: Node.js, Python, Java, Spring Boot, GraphQL, REST APIs\n• Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, Jenkins\n• Databases: PostgreSQL, MongoDB, Redis, MySQL\n• Tools: Git, Jira, Figma, Postman, Agile/Scrum\n\n🤝 Soft Skills\n\n• Leadership & Team Management\n• Problem Solving & Critical Thinking\n• Communication & Collaboration\n• Project Management\n• Mentoring & Knowledge Sharing`;
//       } else {
//         text = `👋 Professional Summary\n\nResults-driven ${userData.jobTitle} with ${userData.experience} years of experience at ${userData.company}, specializing in building scalable web applications and leading technical teams.\n\n${userData.degree} graduate from ${userData.university} with a strong foundation in full-stack development, system design, and cloud architecture.\n\n💡 Proven track record of delivering high-impact features that drive user engagement and business growth. Passionate about solving complex problems, mentoring developers, and staying current with emerging technologies.\n\n🎯 Looking to leverage technical expertise and leadership skills to drive innovation at a forward-thinking company.`;
//       }
//       setDisplayText(text);
//       setIsGenerating(false);
//     }, 800);
//   };

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setActiveSection((prev) => (prev + 1) % sections.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, [isPlaying, sections.length]);

//   useEffect(() => {
//     generateAISuggestion();
//   }, [activeSection]);

//   return (
//     <motion.div
//       layout
//       className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 `}
//     >
//       <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
//         <div className="flex gap-1.5 sm:gap-2">
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
//         </div>
//         <div className="flex items-center gap-2 sm:gap-3">
//           <span className="text-[10px] sm:text-xs text-gray-400 font-mono hidden sm:block">
//             AI Content Suggestions{" "}
//           </span>
//         </div>
//       </div>

//       <div className="p-3 sm:p-4 md:p-6">
//         {/* Section Tabs - Responsive */}
//         <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
//           {sections.map((section, idx) => (
//             <motion.button
//               key={idx}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveSection(idx)}
//               className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm ${
//                 activeSection === idx
//                   ? `bg-gradient-to-r ${section.gradient} text-white shadow-lg`
//                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//               }`}
//             >
//               {section.icon}
//               <span className="hidden sm:inline">{section.name}</span>
//             </motion.button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//           {/* Left Panel - Input Form */}
//           <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
//             <div className="flex items-center gap-2 mb-3 sm:mb-4">
//               <div
//                 className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${sections[activeSection].gradient} flex items-center justify-center text-white text-xs sm:text-sm`}
//               >
//                 {sections[activeSection].icon}
//               </div>
//               <h3 className="text-white font-medium text-sm sm:text-base">
//                 Your {sections[activeSection].name} Data
//               </h3>
//             </div>

//             {activeSection === 0 && (
//               <div className="space-y-2 sm:space-y-3">
//                 <div>
//                   <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                     Degree
//                   </label>
//                   <input
//                     type="text"
//                     value={userData.degree}
//                     readOnly
//                     className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                     University
//                   </label>
//                   <input
//                     type="text"
//                     value={userData.university}
//                     readOnly
//                     className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div>
//                     <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                       Year
//                     </label>
//                     <input
//                       readOnly
//                       type="text"
//                       value={userData.year}
//                       className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                       CGPA
//                     </label>
//                     <input
//                       readOnly
//                       type="text"
//                       value={userData.cgpa}
//                       className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeSection === 1 && (
//               <div className="space-y-2 sm:space-y-3">
//                 <div>
//                   <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                     Job Title
//                   </label>
//                   <input
//                     type="text"
//                     readOnly
//                     value={userData.jobTitle}
//                     className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                     Company
//                   </label>
//                   <input
//                     type="text"
//                     readOnly
//                     value={userData.company}
//                     className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">
//                     Experience (years)
//                   </label>
//                   <input
//                     readOnly
//                     type="text"
//                     value={userData.experience}
//                     className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//             )}

//             {(activeSection === 2 || activeSection === 3) && (
//               <div className="p-3 sm:p-4 bg-gray-800/50 rounded-lg">
//                 <p className="text-gray-400 text-xs sm:text-sm">
//                   AI generates based on:
//                 </p>
//                 <ul className="mt-2 space-y-1 text-gray-300 text-xs sm:text-sm">
//                   <li>• Education: {userData.degree}</li>
//                   <li>
//                     • Experience: {userData.jobTitle} at {userData.company}
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Right Panel - AI Generated Content */}
//           <div
//             className={`bg-gradient-to-br ${sections[activeSection].gradient}/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-${sections[activeSection].color}-500/20`}
//           >
//             <div className="flex items-center gap-2 mb-2 sm:mb-3">
//               <FaMagic
//                 className={`w-3 h-3 sm:w-4 sm:h-4 text-${sections[activeSection].color}-400`}
//               />
//               <h3 className="text-white font-medium text-sm sm:text-base">
//                 AI Generated {sections[activeSection].name}
//               </h3>
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="ml-auto"
//               >
//                 <HiSparkles
//                   className={`w-3 h-3 sm:w-4 sm:h-4 text-${sections[activeSection].color}-400`}
//                 />
//               </motion.div>
//             </div>

//             <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 min-h-[280px] sm:min-h-[320px] max-h-[280px] sm:max-h-[320px] overflow-y-auto">
//               {isGenerating ? (
//                 <div className="flex flex-col items-center justify-center h-32 sm:h-40">
//                   <FaSpinner className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-spin mb-2" />
//                   <p className="text-gray-400 text-xs sm:text-sm">
//                     AI is generating content...
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-white text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
//                   {displayText.split("\n").map((line, i) => {
//                     if (line.startsWith("•")) {
//                       return (
//                         <div
//                           key={i}
//                           className="flex items-start gap-1 sm:gap-2 ml-2 sm:ml-4 mb-1"
//                         >
//                           <span className="text-emerald-400">▹</span>
//                           <span className="text-gray-300">
//                             {line.substring(1)}
//                           </span>
//                         </div>
//                       );
//                     }
//                     if (
//                       line.startsWith("📚") ||
//                       line.startsWith("📖") ||
//                       line.startsWith("🏆") ||
//                       line.startsWith("🚀") ||
//                       line.startsWith("🛠️") ||
//                       line.startsWith("🤝") ||
//                       line.startsWith("👋") ||
//                       line.startsWith("💡") ||
//                       line.startsWith("🎯")
//                     ) {
//                       return (
//                         <div
//                           key={i}
//                           className="font-semibold text-emerald-400 mt-2 mb-1 text-xs sm:text-sm"
//                         >
//                           {line}
//                         </div>
//                       );
//                     }
//                     if (line.trim() === "")
//                       return <div key={i} className="h-1 sm:h-2" />;
//                     return (
//                       <div key={i} className="mb-0.5 sm:mb-1">
//                         {line}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== NEW SECTION: COMPARISON TABLE ==========
// const ComparisonTable = () => {
//   const features = [
//     { name: "ATS Score Check", passats: true, others: false },
//     { name: "AI Bullet Point Writer", passats: true, others: false },
//     { name: "JD Keyword Tailoring", passats: true, others: false },
//     { name: "Cover Letter Generator", passats: true, others: "Limited" },
//     { name: "Multiple Templates", passats: "15+", others: "3-5" },
//     { name: "Unlimited Resumes", passats: true, others: false },
//     { name: "Priority Support", passats: true, others: false },
//     { name: "Analytics Dashboard", passats: true, others: false },
//   ];

//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
//           >
//             <FiBarChart2 className="w-3.5 h-3.5 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               Why Choose Us
//             </span>
//           </motion.div>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
//             PassATS vs.{" "}
//             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Other Resume Builders
//             </span>
//           </h2>
//           <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
//             See why 120,000+ professionals choose PassATS over competitors
//           </p>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 <th className="text-left py-4 px-4 text-gray-600 font-semibold">Feature</th>
//                 <th className="text-center py-4 px-4">
//                   <div className="flex flex-col items-center">
//                     <FaCrown className="w-6 h-6 text-yellow-500 mb-1" />
//                     <div className="text-indigo-600 font-bold text-lg">PassATS</div>
//                   </div>
//                 </th>
//                 <th className="text-center py-4 px-4">
//                   <div className="text-gray-500 font-medium">Other Tools</div>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {features.map((feature, idx) => (
//                 <motion.tr
//                   key={idx}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="py-3 px-4 text-gray-700 font-medium">{feature.name}</td>
//                   <td className="py-3 px-4 text-center">
//                     {feature.passats === true ? (
//                       <div className="flex flex-col items-center">
//                         <FiCheck className="w-5 h-5 text-emerald-500" />
//                         <span className="text-[10px] text-emerald-600 mt-1">Included</span>
//                       </div>
//                     ) : feature.passats === false ? (
//                       <FiX className="w-5 h-5 text-gray-400 mx-auto" />
//                     ) : (
//                       <span className="text-emerald-600 font-bold">{feature.passats}</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     {feature.others === true ? (
//                       <FiCheck className="w-5 h-5 text-emerald-500 mx-auto" />
//                     ) : feature.others === false ? (
//                       <FiX className="w-5 h-5 text-gray-400 mx-auto" />
//                     ) : (
//                       <span className="text-gray-500">{feature.others}</span>
//                     )}
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="mt-8 text-center"
//         >
//           <button
//             onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}
//             className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
//           >
//             Start Your Free Trial Today
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default function Home() {
//   const router = useRouter();

//   return (
//     <>
//       {/* ========== HERO SECTION ========== */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
//         <div className="relative z-10 text-center ">
//           {/* Top Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center max-sm:hidden gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
//           >
//             <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
//             <span className="text-xs font-medium text-indigo-700 tracking-wide uppercase">
//               Intelligent Resume Builder
//             </span>
//           </motion.div>

//           {/* Main Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.6 }}
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.15] sm:leading-[1.2] mt-8 sm:mt-0"
//           >
//             Your Dream{" "}
//             <span className="relative inline-block">
//               <span className="relative z-10 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-linear">
//                 Job opportunity
//               </span>
//             </span>
//             <br />
//             <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//               starts with the right resume
//             </span>
//           </motion.h1>

//           {/* Description */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className=" max-w-5xl mx-auto text-base sm:text-lg md:text-xl text-gray-500 mb-10 leading-relaxed px-4"
//           >
//             Build a professional, ATS-optimised resume in minutes - with AI that
//             understands the Global job market. Backed by Aryu Academy - trusted
//             by students and professionals across Global
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/choose-plan")}
//               className="px-6 sm:px-8 py-3 sm:py-4 h-15 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-indigo-300 w-60 sm:w-auto hover:text-indigo-600 transition-all duration-300 cursor-pointer text-base sm:text-lg"
//             >
//               View Plans
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/choose-template")}
//               className="group relative px-6 sm:px-8 py-3 sm:py-4 h-15 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer text-base sm:text-lg overflow-hidden  justify-center w-60 sm:w-auto"
//             >
//               <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//               <span className="relative flex items-center gap-2">
//                 Build My Resume{" "}
//                 <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//               </span>
//             </motion.button>
//           </motion.div>

//           <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
//             {[
//               {
//                 value: 120,
//                 suffix: "K+",
//                 label: "Trusted Users",
//                 icon: FiUsers,
//               },
//               {
//                 value: 98,
//                 suffix: "%",
//                 label: "ATS Success",
//                 icon: FiTrendingUp,
//               },
//               { value: 4.9, suffix: "★", label: "User Rating", icon: FiStar },
//             ].map((stat, idx) => (
//               <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
//                 <div className="p-1 sm:p-1.5 rounded-full bg-indigo-50">
//                   <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
//                 </div>
//                 <div>
//                   <span className="font-bold text-gray-900 text-sm sm:text-lg">
//                     {stat.value}
//                     {stat.suffix}
//                   </span>
//                   <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5 sm:ml-1">
//                     {stat.label}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section 1: Interactive AI Demo */}
//       <section
//         id="ai-demo"
//         className="py-10 sm:py-16 md:py-20 px-4 bg-white scroll-mt-16"
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-6 sm:mb-10">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-3 sm:mb-4"
//             >
//               <FaRobot className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
//               <span className="text-[10px] sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 See AI in Action
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Watch AI Transform Your Resume
//               <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 In Real Time
//               </span>
//             </h2>
//             <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
//               Experience the magic of our AI as it analyzes, enhances, and
//               optimizes your resume for maximum impact.
//             </p>
//           </div>
//           <InteractiveAIDemo />
//           {/* How It Works Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             viewport={{ once: true }}
//             className="text-center my-12"
//           >
//             <h3 className="text-2xl font-bold text-gray-900 mb-8">
//               How PassATS Works{" "}
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               {[
//                 {
//                   step: "01",
//                   title: "Enter Your Details",
//                   desc: "Add your work History, Education, and Skills or Upload your existing resume — PassATS reads it Automatically",
//                   icon: "📝",
//                 },
//                 {
//                   step: "02",
//                   title: " AI Builds + Optimises ",
//                   desc: "PassATS writes your bullet points, scores your ATS compatibility, and tailors keywords to the Job Description",
//                   icon: "🤖",
//                 },
//                 {
//                   step: "03",
//                   title: "Download & Apply ",
//                   desc: "Download a polished PDF Share via WhatsApp or LinkedIn Start applying with confidence",
//                   icon: "📄",
//                 },
//               ].map((item, idx) => (
//                 <div key={idx} className="relative">
//                   <div className="text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent opacity-20 absolute -top-4 left-1/2 transform -translate-x-1/2">
//                     {item.step}
//                   </div>
//                   <div className="relative pt-8">
//                     <div className="text-3xl mb-3">{item.icon}</div>
//                     <h4 className="font-semibold text-gray-900 mb-1">
//                       {item.title}
//                     </h4>
//                     <p className="text-sm text-gray-500">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* CTA Banner */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             viewport={{ once: true }}
//             className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 text-center shadow-2xl"
//           >
//             <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
//             <div className="relative z-10">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
//                 <FaMagic className="w-8 h-8 text-white" />
//               </div>
//               <p className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2">
//                 Ready to build your AI-powered resume?
//               </p>
//               <p className="text-indigo-100 text-sm md:text-base mb-6">
//                 Join 50,000+ job seekers who landed their dream jobs
//               </p>
//               <button
//                 onClick={() => router.push("/choose-template")}
//                 className="group px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
//               >
//                 Start Building Free
//                 <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Section 2: AI Content Suggestions */}
//       <section
//         id="ai-content"
//         className="py-10 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white scroll-mt-16"
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-6 sm:mb-10">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-3 sm:mb-4"
//             >
//               <FaMagic className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
//               <span className="text-[10px] sm:text-sm font-semibold text-purple-700">
//                 Feature 02
//               </span>
//             </motion.div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               AI Content Suggestions
//               <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Personalized for Your Profile
//               </span>
//             </h2>
//             <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
//               AI analyzes your education and experience to generate optimized
//               content for every section
//             </p>
//           </div>
//           <AIContentSuggestionsDemo />
//         </div>
//       </section>

//       {/* BeforeAfter */}
//       <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
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
//                 From vague to interview-ready{" "}
//                 <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent ">
//                   in one click
//                 </span>
//               </h2>

//               <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed">
//                 PassATS analyzes your experience, suggests powerful industry
//                 specific skills, and rewrites your achievements as measurable
//                 impact statements - the kind that Pass ATS filters and get
//                 callbacks
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
//                       "Built REST APIs for the payments module, reducing average
//                       response latency by 32% and cutting error rate from 4.2%
//                       to 0.6%"
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

//       {/* Card-Style Trust Bar */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl border border-indigo-100 shadow-sm p-6 sm:p-8">
//             {/* Optional Heading */}
//             <div className="text-center mb-8">
//               <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wide">
//                 Trusted by Job Seekers
//               </p>
//               <p className="text-gray-800 text-lg sm:text-xl mt-1">
//                 Join thousands who've built their careers with us
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
//               {/* Stat 1 */}
//               <div className="text-center">
//                 <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
//                   50K+
//                 </div>
//                 <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
//                 <p className="text-gray-700 font-medium">Resumes Built</p>
//                 <p className="text-xs text-gray-500 mt-1">By Professionals</p>
//               </div>

//               {/* Stat 2 */}
//               <div className="text-center">
//                 <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
//                   10K+
//                 </div>
//                 <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
//                 <p className="text-gray-700 font-medium">ATS Scores Checked</p>
//                 <p className="text-xs text-gray-500 mt-1">This Month</p>
//               </div>

//               {/* Stat 3 */}
//               <div className="text-center">
//                 <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
//                   ✓
//                 </div>
//                 <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
//                 <p className="text-gray-700 font-medium">Backed by Academy</p>
//                 <p className="text-xs text-gray-500 mt-1">Aryu Certified</p>
//               </div>

//               {/* Stat 4 */}
//               <div className="text-center">
//                 <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
//                   100%
//                 </div>
//                 <div className="h-0.5 w-12 bg-indigo-200 mx-auto mb-3"></div>
//                 <p className="text-gray-700 font-medium">ATS-Compatible</p>
//                 <p className="text-xs text-gray-500 mt-1">Guaranteed Format</p>
//               </div>

//               {/* Stat 5 */}
//               <div className="text-center">
//                 <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">
//                   $0
//                 </div>
//                 <div className="h-0.5 w-12 bg-emerald-200 mx-auto mb-3"></div>
//                 <p className="text-gray-700 font-medium">Free to Start</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Payment Not Required
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DUMMY RESUME */}
//       <section className="relative bg-white py-14 sm:py-16 md:py-20 lg:py-24  overflow-hidden">
//         {/* Decorative Background Elements */}
//         <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
//         <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* Left Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//                 <FiZap className="w-3.5 h-3.5 text-indigo-600" />
//                 <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                   AI Resume Builder for Freshers & Job Seekers
//                 </span>
//               </div>

//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                 Get a Job-Winning Resume in 3 Minutes
//                 <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
//                   Even With No Experience
//                 </span>
//               </h2>

//               <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
//                 AI builds, writes, and optimizes your resume for real job roles
//                 so you get shortlisted faster No experience? No problem
//               </p>

//               {/* CTA Buttons */}
//               <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//                 <button
//                   onClick={() => router.push("/choose-template")}
//                   className="group px-6 md:px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   Create My Resume Now Free
//                   <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//                 </button>

//                 <button
//                   onClick={() => router.push("/choose-template")}
//                   className="px-6 md:px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
//                 >
//                   See Sample Resumes
//                 </button>
//               </div>

//               {/* Trust Badges */}
//               <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
//                 <div className="flex items-center gap-1.5">
//                   <FiCheckCircle className="w-4 h-4 text-emerald-500" />
//                   <span>No experience needed</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <FiCheckCircle className="w-4 h-4 text-emerald-500" />
//                   <span>ATS-friendly & recruiter-ready</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <FiCheckCircle className="w-4 h-4 text-emerald-500" />
//                   <span>Download in seconds</span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Visual Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 sm:p-8 shadow-lg">
//                 {/* Card Content */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-indigo-600 rounded-full" />
//                     <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
//                       Instant Resume Preview
//                     </span>
//                   </div>

//                   {/* Resume Preview Lines */}
//                   <div className="space-y-3">
//                     <div className="h-4 w-full bg-indigo-100 rounded-full" />
//                     <div className="h-4 w-5/6 bg-indigo-100 rounded-full" />
//                     <div className="h-4 w-4/6 bg-indigo-100 rounded-full" />
//                   </div>

//                   {/* Skills Section */}
//                   <div className="pt-4">
//                     <div className="h-3 w-24 bg-indigo-200 rounded-full mb-3" />
//                     <div className="flex flex-wrap gap-2">
//                       <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
//                         React.js
//                       </span>
//                       <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
//                         Node.js
//                       </span>
//                       <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
//                         TypeScript
//                       </span>
//                       <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
//                         Next.js
//                       </span>
//                     </div>
//                   </div>

//                   {/* Experience Section */}
//                   <div className="pt-2">
//                     <div className="h-3 w-32 bg-indigo-200 rounded-full mb-3" />
//                     <div className="space-y-2">
//                       <div className="h-3 w-full bg-indigo-50 rounded-full" />
//                       <div className="h-3 w-5/6 bg-indigo-50 rounded-full" />
//                     </div>
//                   </div>

//                   {/* CTA Bar */}
//                 </div>
//               </div>

//               {/* Decorative elements */}
//               <div className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full blur-xl -z-10" />
//               <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-100 rounded-full blur-xl -z-10" />
//             </motion.div>
//           </div>

//           {/* Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
//           >
//             {stats.map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <div className="p-2 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
//                     <stat.icon className="w-4 h-4 text-indigo-600" />
//                   </div>
//                 </div>
//                 <div className="text-xl font-bold text-gray-900">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-gray-500">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ========== ATS SCORE SECTION ========== */}
//       <section className="py-20 px-4 overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
//                 <FiAlertCircle className="w-3.5 h-3.5 text-red-600" />
//                 <span className="text-xs font-medium text-red-700 uppercase">
//                   Don't Get Filtered Out
//                 </span>
//               </div>

//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                 75% of Resumes
//                 <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
//                   Never Reach a Recruiter
//                 </span>
//               </h2>

//               <p className="mt-4 text-lg text-gray-500 leading-relaxed">
//                 PassATS gives you a real score from 0 to 100 and shows you
//                 exactly what to fix before you apply.
//               </p>

//               <div className="mt-8 space-y-4">
//                 {[
//                   {
//                     title: "ATS Compatibility Check",
//                     desc: "Scans 15+ criteria including formatting and keywords",
//                     icon: <FiSearch />,
//                   },
//                   {
//                     title: "JD Keyword Tailoring",
//                     desc: "Auto-injects missing keywords from any job description",
//                     icon: <FiTarget />,
//                   },
//                   {
//                     title: "Recruiter Preview",
//                     desc: "See how recruiters see your resume in 6 seconds",
//                     icon: <FiEye />,
//                   },
//                 ].map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: idx * 0.1 }}
//                     whileHover={{ x: 5 }}
//                     className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
//                   >
//                     <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">
//                         {item.title}
//                       </h4>
//                       <p className="text-sm text-gray-500">{item.desc}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
//                     <FiShield className="w-3 h-3 text-indigo-600" />
//                     <span className="text-xs font-medium text-indigo-700">
//                       Your ATS Score
//                     </span>
//                   </div>
//                   <motion.div
//                     initial={{ scale: 0.5, opacity: 0 }}
//                     whileInView={{ scale: 1, opacity: 1 }}
//                     transition={{ type: "spring", delay: 0.3 }}
//                     className="text-7xl font-bold text-indigo-600 mt-4"
//                   >
//                     98%
//                   </motion.div>
//                 </div>

//                 <div className="space-y-5">
//                   {[
//                     { label: "Keyword Match", value: 95, color: "emerald" },
//                     { label: "Formatting", value: 100, color: "emerald" },
//                     { label: "Readability", value: 85, color: "amber" },
//                   ].map((item, idx) => (
//                     <div key={idx}>
//                       <div className="flex justify-between text-sm mb-2">
//                         <span className="text-gray-600">{item.label}</span>
//                         <motion.span
//                           initial={{ opacity: 0 }}
//                           whileInView={{ opacity: 1 }}
//                           transition={{ delay: 0.5 + idx * 0.1 }}
//                           className={`font-semibold text-${item.color}-600`}
//                         >
//                           {item.value}%
//                         </motion.span>
//                       </div>
//                       <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           whileInView={{ width: `${item.value}%` }}
//                           transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
//                           className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full`}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 p-4 bg-amber-50 rounded-xl">
//                   <p className="text-sm text-amber-700 flex items-center gap-2">
//                     <FiAlertCircle className="w-4 h-4" />
//                     Use more action verbs to improve readability
//                   </p>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => router.push("/ats-checker")}
//                   className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
//                 >
//                   <FiBarChart2 className="w-4 h-4" />
//                   Run Full ATS Check
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       <ComparisonTable/>

//       {/* ========== FINAL CTA ========== */}
//       <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-grid-white/10" />
//         <div className="relative max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
//           >
//             <FaRocket className="w-4 h-4 text-white" />
//             <span className="text-xs font-medium text-white uppercase">
//               Start Your Journey Today
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
//           >
//             Ready to Land Your Dream Job?
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-4 text-sm sm:text-base md:text-lg text-indigo-100"
//           >
//             Join 50,000+ job seekers who transformed their careers
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <button
//               onClick={() => router.push("/choose-template")}
//               className="group px-8 py-3 md:py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer md:text-lg"
//             >
//               Create My Resume Free
//               <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//             </button>
//             <button
//               onClick={() =>
//                 document
//                   .getElementById("pricing-section")
//                   ?.scrollIntoView({ behavior: "smooth" })
//               }
//               className="px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all cursor-pointer md:text-lg"
//             >
//               View All Plans
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* WhyChooseUs */}
//       <section className="relative bg-gray-50 py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
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
//                 Built for Global's job market
//               </span>
//             </motion.div>

//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
//             >
//               Everything You Need to Pass
//               <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent ">
//                 ATS and Get Shortlisted
//               </span>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed"
//             >
//               From campus placement to senior roles - PassATS gives you the
//               tools to compete with confidence in the Global job market
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
//         </div>
//       </section>

//       <Testimonial />

//       {/* cta */}
//       <div className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 animate-gradient">
//         <div className="relative  mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           {/* Heading with gradient text */}
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-4 sm:mb-6 leading-tight">
//             Your Next Job Starts with{" "}
//             <span className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 bg-clip-text text-transparent">
//               the Right Resume.
//             </span>
//           </h2>

//           {/* Body */}
//           <p className="text-base sm:text-lg text-indigo-100 text-center max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
//             Whether you are applying for campus placement, your first role, or
//             your next big move — PassATS gives you the resume that gets you in
//             the room.
//           </p>

//           {/* CTA Buttons Row */}
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
//             <button
//               onClick={() => router.push("/choose-template")}
//               className="group px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
//             >
//               Build My Resume — It's Free
//               <svg
//                 className="w-4 h-4 transition-transform group-hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                 />
//               </svg>
//             </button>

//             {/* Optional Secondary Button */}
//             <button
//               onClick={() => router.push("/choose-plan")}
//               className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
//             >
//               Choose Plan
//             </button>
//           </div>
//         </div>
//       </div>
//       <Faq />
//     </>
//   );
// }



// import { HeroSection } from "../components/home/HeroSection";
// import { BeforeAfterSection } from "../components/home/BeforeAfterSection";
// import { TrustBar } from "../components/home/TrustBar";
// import { DummyResumeSection } from "../components/home/DummyResumeSection";
// import { ATSScoreSection } from "../components/home/ATSScoreSection";
// import { ComparisonTable } from "../components/home/ComparisonTable";
// import { FinalCTA } from "../components/home/FinalCTA";
// import { WhyChooseUs } from "../components/home/WhyChooseUs";
// import Testimonial from "../components/sections/Testimonial";
// import Faq from "../components/sections/FAQ";
// import { InteractiveAIDemo } from "../components/home/InteractiveAIDemo";
// import { AIContentSuggestionsDemo } from "../components/home/AIContentSuggestionsDemo";
// import CTATwo from "../components/sections/CTATwo";

// export default function Home() {
//   return (
//     <>
//       <HeroSection />
//       <InteractiveAIDemo />
//       <BeforeAfterSection />
//       <AIContentSuggestionsDemo />
//       <TrustBar />
//       <DummyResumeSection />
//       <ATSScoreSection />
//       <ComparisonTable />
//       <FinalCTA />
//       <WhyChooseUs />
//       <Testimonial />
//       <CTATwo />

//       <Faq />
//     </>
//   );
// }






















import dynamic from "next/dynamic";

// Simple dynamic imports - remove ssr: false option
const Testimonial = dynamic(
  () => import("../components/sections/Testimonial")
);

const Faq = dynamic(
  () => import("../components/sections/FAQ")
);

const CTATwo = dynamic(
  () => import("../components/sections/CTATwo")
);

// For components that need loading skeletons
const InteractiveAIDemo = dynamic(
  () => import("../components/home/InteractiveAIDemo").then((mod) => mod.InteractiveAIDemo),
  { loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-xl" /> }
);

const AIContentSuggestionsDemo = dynamic(
  () => import("../components/home/AIContentSuggestionsDemo").then((mod) => mod.AIContentSuggestionsDemo),
  { loading: () => <div className="h-[450px] bg-gray-100 animate-pulse rounded-xl" /> }
);

// Regular imports for other components (no dynamic needed)
import { HeroSection } from "../components/home/HeroSection";
import { BeforeAfterSection } from "../components/home/BeforeAfterSection";
import { TrustBar } from "../components/home/TrustBar";
import { DummyResumeSection } from "../components/home/DummyResumeSection";
import { ATSScoreSection } from "../components/home/ATSScoreSection";
import { ComparisonTable } from "../components/home/ComparisonTable";
import { FinalCTA } from "../components/home/FinalCTA";
import { WhyChooseUs } from "../components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InteractiveAIDemo />
      <BeforeAfterSection />
      <AIContentSuggestionsDemo />
      <TrustBar />
      {/* <DummyResumeSection /> */}
      <ATSScoreSection />
      <ComparisonTable />
      <FinalCTA />
      <WhyChooseUs />
      <Testimonial />
      <CTATwo />
      <Faq />
    </>
  );
}
