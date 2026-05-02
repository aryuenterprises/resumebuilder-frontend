// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import {
//   FiUpload,
//   FiDownload,
//   FiCheck,
//   FiBarChart2,
// } from "react-icons/fi";
// import { FaBrain, FaMagic, FaRobot, FaSpinner } from "react-icons/fa";

// const steps = [
//   {
//     title: "Upload Resume",
//     icon: <FiUpload />,
//     desc: "Upload your existing resume or start fresh",
//     color: "indigo",
//   },
//   {
//     title: "AI Analysis",
//     icon: <FaBrain />,
//     desc: "AI scans and extracts all your information",
//     color: "purple",
//   },
//   {
//     title: "Smart Enhancement",
//     icon: <FaMagic />,
//     desc: "AI rewrites bullet points with metrics",
//     color: "pink",
//   },
//   {
//     title: "ATS Optimization",
//     icon: <FiBarChart2 />,
//     desc: "Keywords added for ATS success",
//     color: "emerald",
//   },
//   {
//     title: "Ready to Apply",
//     icon: <FiDownload />,
//     desc: "Download optimized resume",
//     color: "blue",
//   },
// ];

// export const InteractiveAIDemo = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentStep((prev) => (prev + 1) % steps.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//      <div className="max-w-7xl mx-auto">



//  <div className="text-center mb-6 sm:mb-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-3 sm:mb-4">
//               <FaRobot className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
//               <span className="text-[10px] sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 See AI in Action
//               </span>
//             </div>
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



//   <motion.div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
//       <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
//         <div className="flex gap-1.5 sm:gap-2">
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
//         </div>
//       </div>

//       <div className="p-3 sm:p-4 md:p-6">
//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
//           {/* Steps */}
//           <div className="flex-1 space-y-2 sm:space-y-3">
//             {steps.map((step, idx) => (
//               <StepItem
//                 key={idx}
//                 step={step}
//                 isActive={currentStep === idx}
//                 onClick={() => setCurrentStep(idx)}
//               />
//             ))}
//           </div>

//           {/* Animation Area */}
//           <div className="flex-1 bg-black/30 rounded-lg sm:rounded-xl p-4 sm:p-6 min-h-[250px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
//             <AnimatePresence mode="wait">
//               <AnimationContent step={currentStep} />
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//      </div>
  
//   );
// };

// // Step Item Component
// const StepItem = ({ step, isActive, onClick }: any) => (
//   <motion.div
//     className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 ${
//       isActive
//         ? `bg-${step.color}-500/20 border border-${step.color}-500/50`
//         : "hover:bg-white/5"
//     }`}
//     onClick={onClick}
//     whileHover={{ x: 3 }}
//   >
//     <div
//       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white ${
//         isActive ? "animate-pulse" : ""
//       }`}
//     >
//       {step.icon}
//     </div>
//     <div className="flex-1">
//       <p className="font-semibold text-white text-xs sm:text-sm">{step.title}</p>
//       <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
//         {step.desc}
//       </p>
//     </div>
//     {isActive && (
//       <motion.div
//         layoutId="activeStep"
//         className={`w-1.5 h-1.5 rounded-full bg-${step.color}-500`}
//       />
//     )}
//   </motion.div>
// );

// // Animation Content Component
// const AnimationContent = ({ step }: { step: number }) => {
//   if (step === 0) return <UploadAnimation />;
//   if (step === 1) return <AIAnalysisAnimation />;
//   if (step === 2) return <EnhancementAnimation />;
//   if (step === 3) return <ATSScoreAnimation />;
//   return <CompleteAnimation />;
// };

// const UploadAnimation = () => (
//   <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
//     <div className="relative">
//       <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto border-3 sm:border-4 border-dashed border-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
//         <FiUpload className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-400" />
//       </div>
//       <motion.div
//         className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-indigo-500/50 rounded-full"
//         animate={{ scaleX: [1, 1.5, 1] }}
//         transition={{ duration: 1.5, repeat: Infinity }}
//       />
//     </div>
//     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//       Drag & drop your resume
//     </p>
//     <p className="text-gray-400 text-xs sm:text-sm">PDF or DOCX up to 5MB</p>
//   </motion.div>
// );

// const AIAnalysisAnimation = () => (
//   <div>
//     <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
//       <motion.div
//         className="absolute inset-0 rounded-full border-4 border-purple-500/30"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute inset-2 rounded-full border-4 border-purple-500/50"
//         animate={{ rotate: -360 }}
//         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//       />
//       <div className="absolute inset-0 flex items-center justify-center">
//         <FaRobot className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
//       </div>
//     </div>
//     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//       AI analyzing your data...
//     </p>
//     <motion.div className="w-32 sm:w-48 h-1 bg-gray-700 rounded-full mx-auto mt-2 overflow-hidden">
//       <motion.div
//         className="h-full bg-purple-500 rounded-full"
//         animate={{ width: ["0%", "100%"] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       />
//     </motion.div>
//   </div>
// );

// const EnhancementAnimation = () => (
//   <div>
//     <motion.div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
//       <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl opacity-20" />
//       <motion.div
//         className="absolute inset-0 flex items-center justify-center"
//         animate={{ rotateY: [0, 360] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <FaMagic className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400" />
//       </motion.div>
//     </motion.div>
//     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//       Enhancing your content...
//     </p>
//     <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 w-full max-w-[200px] mx-auto">
//       <motion.div
//         className="h-1.5 sm:h-2 bg-gray-700 rounded-full"
//         animate={{ width: ["0%", "100%"] }}
//         transition={{ duration: 1.5 }}
//       />
//       <motion.div
//         className="h-1.5 sm:h-2 bg-gray-700 rounded-full"
//         animate={{ width: ["0%", "100%"] }}
//         transition={{ duration: 1.5, delay: 0.3 }}
//       />
//       <motion.div
//         className="h-1.5 sm:h-2 bg-gray-700 rounded-full"
//         animate={{ width: ["0%", "100%"] }}
//         transition={{ duration: 1.5, delay: 0.6 }}
//       />
//     </div>
//   </div>
// );

// const ATSScoreAnimation = () => (
//   <div>
//     <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
//       <svg className="w-full h-full" viewBox="0 0 100 100">
//         <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
//         <motion.circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="url(#gradient)"
//           strokeWidth="8"
//           strokeLinecap="round"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 2, repeat: Infinity }}
//           transform="rotate(-90 50 50)"
//         />
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#10b981" />
//             <stop offset="100%" stopColor="#3b82f6" />
//           </linearGradient>
//         </defs>
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-xl sm:text-2xl font-bold text-emerald-400">98%</span>
//       </div>
//     </div>
//     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//       ATS Score: 98%
//     </p>
//     <p className="text-gray-400 text-xs sm:text-sm">Optimized for success!</p>
//   </div>
// );

// const CompleteAnimation = () => (
//   <motion.div
//     initial={{ scale: 0 }}
//     animate={{ scale: 1 }}
//     transition={{ type: "spring" }}
//   >
//     <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
//       <FiCheck className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
//     </div>
//     <p className="text-white mt-3 sm:mt-4 font-medium text-sm sm:text-base">
//       Ready to Apply!
//     </p>
//     <p className="text-gray-400 text-xs sm:text-sm">
//       Download your optimized resume
//     </p>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-xs sm:text-sm flex items-center gap-2 mx-auto"
//     >
//       <FiDownload className="w-3 h-3" /> Download PDF
//     </motion.button>
//   </motion.div>
// );
























"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiUpload,
  FiDownload,
  FiCheck,
  FiBarChart2,
} from "react-icons/fi";
import { FaBrain, FaMagic, FaRobot, FaSpinner } from "react-icons/fa";

const steps = [
  {
    title: "Upload Resume",
    icon: <FiUpload />,
    desc: "Upload your existing resume or start fresh",
    color: "indigo",
  },
  {
    title: "AI Analysis",
    icon: <FaBrain />,
    desc: "AI scans and extracts all your information",
    color: "purple",
  },
  {
    title: "Smart Enhancement",
    icon: <FaMagic />,
    desc: "AI rewrites bullet points with metrics",
    color: "pink",
  },
  {
    title: "ATS Optimization",
    icon: <FiBarChart2 />,
    desc: "Keywords added for ATS success",
    color: "emerald",
  },
  {
    title: "Ready to Apply",
    icon: <FiDownload />,
    desc: "Download optimized resume",
    color: "blue",
  },
];

export const InteractiveAIDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-3 sm:mb-4">
          <FaRobot className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            See AI in Action
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
          Watch AI Transform Your Resume
          <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1 sm:mt-2">
            In Real Time
          </span>
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4">
          Experience the magic of our AI as it analyzes, enhances, and
          optimizes your resume for maximum impact
        </p>
      </div>

      <motion.div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400">Demo</div>
        </div>

        <div className="p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">
            {/* Steps */}
            <div className="flex-1 space-y-2 sm:space-y-2.5 md:space-y-3">
              {steps.map((step, idx) => (
                <StepItem
                  key={idx}
                  step={step}
                  isActive={currentStep === idx}
                  onClick={() => setCurrentStep(idx)}
                />
              ))}
            </div>

            {/* Animation Area */}
            <div className="flex-1 bg-black/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <AnimationContent step={currentStep} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Step Item Component - Fixed dynamic colors
const StepItem = ({ step, isActive, onClick }: any) => {
  const colorMap: Record<string, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    emerald: "from-emerald-500 to-emerald-600",
    blue: "from-blue-500 to-blue-600",
  };

  const bgColorMap: Record<string, string> = {
    indigo: "bg-indigo-500/20 border-indigo-500/50",
    purple: "bg-purple-500/20 border-purple-500/50",
    pink: "bg-pink-500/20 border-pink-500/50",
    emerald: "bg-emerald-500/20 border-emerald-500/50",
    blue: "bg-blue-500/20 border-blue-500/50",
  };

  const dotColorMap: Record<string, string> = {
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
  };

  return (
    <motion.div
      className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 ${
        isActive ? bgColorMap[step.color] : "hover:bg-white/5"
      }`}
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center text-white text-sm sm:text-base ${
          isActive ? "animate-pulse" : ""
        }`}
      >
        {step.icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-white text-xs sm:text-sm md:text-base">
          {step.title}
        </p>
        <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
          {step.desc}
        </p>
      </div>
      {isActive && (
        <motion.div
          layoutId="activeStep"
          className={`w-1.5 h-1.5 rounded-full ${dotColorMap[step.color]}`}
        />
      )}
    </motion.div>
  );
};

// Animation Content Component
const AnimationContent = ({ step }: { step: number }) => {
  if (step === 0) return <UploadAnimation />;
  if (step === 1) return <AIAnalysisAnimation />;
  if (step === 2) return <EnhancementAnimation />;
  if (step === 3) return <ATSScoreAnimation />;
  return <CompleteAnimation />;
};

const UploadAnimation = () => (
  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
    <div className="relative">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto border-2 sm:border-3 md:border-4 border-dashed border-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
        <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-400" />
      </div>
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 h-0.5 bg-indigo-500/50 rounded-full"
        animate={{ scaleX: [1, 1.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
    <p className="text-white mt-3 sm:mt-4 font-medium text-xs sm:text-sm md:text-base">
      Drag & drop your resume
    </p>
    <p className="text-gray-400 text-[10px] sm:text-xs">PDF or DOCX up to 5MB</p>
  </motion.div>
);

const AIAnalysisAnimation = () => (
  <div>
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-4 border-purple-500/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <FaRobot className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
      </div>
    </div>
    <p className="text-white mt-3 sm:mt-4 font-medium text-xs sm:text-sm md:text-base">
      AI analyzing your data...
    </p>
    <motion.div className="w-24 sm:w-32 md:w-40 lg:w-48 h-1 bg-gray-700 rounded-full mx-auto mt-2 overflow-hidden">
      <motion.div
        className="h-full bg-purple-500 rounded-full"
        animate={{ width: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  </div>
);

const EnhancementAnimation = () => (
  <div>
    <motion.div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl opacity-20" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaMagic className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-400" />
      </motion.div>
    </motion.div>
    <p className="text-white mt-3 sm:mt-4 font-medium text-xs sm:text-sm md:text-base">
      Enhancing your content...
    </p>
    <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] mx-auto">
      <motion.div
        className="h-1 sm:h-1.5 bg-gray-700 rounded-full"
        animate={{ width: ["0%", "100%"] }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="h-1 sm:h-1.5 bg-gray-700 rounded-full"
        animate={{ width: ["0%", "100%"] }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.div
        className="h-1 sm:h-1.5 bg-gray-700 rounded-full"
        animate={{ width: ["0%", "100%"] }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />
    </div>
  </div>
);

const ATSScoreAnimation = () => (
  <div>
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-emerald-400">
          98%
        </span>
      </div>
    </div>
    <p className="text-white mt-3 sm:mt-4 font-medium text-xs sm:text-sm md:text-base">
      ATS Score: 98%
    </p>
    <p className="text-gray-400 text-[10px] sm:text-xs">Optimized for success!</p>
  </div>
);

const CompleteAnimation = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring" }}
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
      <FiCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" />
    </div>
    <p className="text-white mt-3 sm:mt-4 font-medium text-xs sm:text-sm md:text-base">
      Ready to Apply!
    </p>
    <p className="text-gray-400 text-[10px] sm:text-xs">
      Download your optimized resume
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-[10px] sm:text-xs flex items-center gap-2 mx-auto transition-all duration-300 cursor-pointer"
    >
      <FiDownload className="w-3 h-3" /> Download PDF
    </motion.button>
  </motion.div>
);