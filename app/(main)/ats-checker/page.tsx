// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import {
//   FiUpload,
//   FiFileText,
//   FiAward,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiZap,
//   FiEye,
//   FiArrowRight,
//   FiClock,
//   FiPercent,
//   FiBriefcase,
//   FiInfo,
//   FiSearch,
//   FiTrendingUp,
//   FiLayers,
//   FiRefreshCw,
//   FiStar,
//   FiLayout,
//   FiThumbsUp,
//   FiBookOpen,
//   FiXCircle,
//   FiShield,
//   FiTarget,
//   FiBarChart2,
// } from "react-icons/fi";

// import { FaBrain, FaRocket, FaGraduationCap } from "react-icons/fa";
// import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";
// import { usePreventReload } from "@/app/hooks";

// // ─── Types ───────────────────────────────────────────────────────────────
// interface Issue {
//   message: string;
//   severity: "critical" | "high" | "medium" | "low";
//   suggestion?: string;
//   section: string;
//   impact?: number;
// }

// interface SectionAnalysisData {
//   [key: string]: {
//     status?: string;
//     is_present?: boolean;
//     grade?: string;
//     score?: number;
//     quality_level?: string;
//     target_score?: number;
//     impact_potential?: number;
//     quick_wins?: (string | { action?: string; estimated_gain?: string })[];
//     missing_elements?: (
//       | string
//       | { element?: string; name?: string; text?: string }
//     )[];
//     elements_to_remove?: (
//       | string
//       | { element?: string; name?: string; text?: string }
//     )[];
//     top_priority_fixes?: { action?: string }[];
//     detailed_suggestions?: Array<
//       | {
//           action?: string;
//           why?: string;
//           how?: string;
//           estimated_gain?: string;
//           effort?: string;
//           time?: string;
//         }
//       | string
//     >;
//   };
// }

// interface ATSResults {
//   ats_score?: number;
//   score_breakdown?: {
//     [key: string]: number | null | undefined;
//   };
//   summary?: {
//     ats_verdict?: string;
//   };
//   ai_analysis?: {
//     summary_rewrite?: {
//       current?: string;
//       rewritten?: string;
//       suggested?: string;
//     };
//   };
//   issues?: {
//     [key: string]: Issue[];
//   };
//   section_analysis?: SectionAnalysisData;
// }

// // ─── Loading Screen Component ───────────────────────────────────────────
// const LoadingScreen = () => {
//   const [progress, setProgress] = useState(0);
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     { text: "Scanning resume structure...", icon: FiFileText },
//     { text: "Analyzing keywords...", icon: FiSearch },
//     { text: "Checking ATS compatibility...", icon: FiTrendingUp },
//     { text: "Evaluating formatting...", icon: FiLayers },
//     { text: "Generating insights...", icon: FaBrain },
//     { text: "Preparing results...", icon: HiOutlineSparkles },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 50);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const stepInterval = setInterval(() => {
//       setCurrentStep((prev) => (prev + 1) % steps.length);
//     }, 1000);
//     return () => clearInterval(stepInterval);
//   }, []);

//   const CurrentIcon = steps[currentStep].icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-6 md:p-8 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-600/5" />
//         <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-100 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
//         <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-100 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />

//         <div className="relative z-10">
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               rotate: [0, 360, 360],
//             }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
//           >
//             <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
//           </motion.div>

//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
//             Analyzing Your Resume
//           </h3>
//           <p className="text-center text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">
//             {steps[currentStep].text}
//           </p>

//           <div className="relative h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-3 sm:mb-4">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full"
//             />
//           </div>

//           <div className="flex justify-between items-center text-xs sm:text-sm">
//             <span className="text-gray-500">Processing...</span>
//             <span className="font-semibold text-indigo-600">{progress}%</span>
//           </div>

//           <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
//                 className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600"
//               />
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // ─── Modern Tab Component ───────────────────────────────────────────────
// interface Tab {
//   id: string;
//   label: string;
//   icon: React.ElementType;
//   badge?: number;
// }

// interface ModernTabsProps {
//   activeTab: string;
//   onTabChange: (tabId: string) => void;
//   tabs: Tab[];
// }

// const ModernTabs: React.FC<ModernTabsProps> = ({
//   activeTab,
//   onTabChange,
//   tabs,
// }) => {
//   return (
//     <div className="relative">
//       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-600/5 rounded-xl sm:rounded-2xl blur-xl" />
//       <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-100 shadow-sm">
//         <div className="flex flex-wrap gap-1">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <motion.button
//                 key={tab.id}
//                 onClick={() => onTabChange(tab.id)}
//                 className={`relative flex-1 flex items-center cursor-pointer justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 ${
//                   isActive
//                     ? "text-white"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 {isActive && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg sm:rounded-xl shadow-lg"
//                     transition={{ type: "spring", duration: 0.5 }}
//                   />
//                 )}
//                 <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
//                   <Icon className={`w-3 h-3 sm:w-3.5 sm:h-4 ${isActive ? "text-white" : ""}`} />
//                   <span className="max-sm:hidden">{tab.label}</span>
//                   {tab.badge !== undefined && tab.badge > 0 && !isActive && (
//                     <span className="ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs bg-gray-100 text-gray-600 rounded-full">
//                       {tab.badge}
//                     </span>
//                   )}
//                 </span>
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Modern Score Card Component ────────────────────────────────────────
// interface ModernScoreCardProps {
//   score: number;
//   verdict?: string;
// }

// const ModernScoreCard: React.FC<ModernScoreCardProps> = ({
//   score,
//   verdict,
// }) => {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-2xl">
//       <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48" />
//       <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl translate-y-48 -translate-x-48" />

//       <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
//         <div className="text-center md:text-left">
//           <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/80 mb-1 sm:mb-2 tracking-wider">
//             OVERALL ATS SCORE
//           </div>
//           <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
//             {score}%
//           </div>
//           <div className="w-48 sm:w-64 md:w-80 h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${score}%` }}
//               transition={{ duration: 1, delay: 0.3 }}
//               className="h-full bg-white rounded-full"
//             />
//           </div>
//         </div>

//         <div className="text-center md:text-right">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className=" sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3"
//           >
//             {verdict || "Good"}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Modern Metric Grid Component ───────────────────────────────────────
// interface Metric {
//   key: string;
//   label: string;
//   icon: React.ElementType;
//   value: number;
// }

// interface ModernMetricGridProps {
//   metrics: Metric[];
// }

// const ModernMetricGrid: React.FC<ModernMetricGridProps> = ({ metrics }) => {
//   const getGradient = (score: number) => {
//     if (score >= 80) return "from-emerald-500 to-green-500";
//     if (score >= 60) return "from-blue-500 to-cyan-500";
//     if (score >= 40) return "from-yellow-500 to-orange-500";
//     return "from-red-500 to-rose-500";
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
//       {metrics.map((metric, index) => {
//         const gradient = getGradient(metric.value);
//         const Icon = metric.icon;

//         return (
//           <motion.div
//             key={metric.key}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group relative"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
//                   <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                 </div>
//                 <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
//                   {metric.value}%
//                 </div>
//               </div>
//               <h3 className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
//                 {metric.label}
//               </h3>
//               <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${metric.value}%` }}
//                   transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
//                   className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// // ─── Modern Summary Card ────────────────────────────────────────────────
// interface ModernSummaryCardProps {
//   current: string;
//   rewritten: string;
// }

// const ModernSummaryCard: React.FC<ModernSummaryCardProps> = ({
//   current,
//   rewritten,
// }) => {
//   return (
//     <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
//       <div className="p-4 sm:p-5 md:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="p-1.5 sm:p-2 md:p-2.5 bg-indigo-100 rounded-lg sm:rounded-xl">
//             <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600" />
//           </div>
//           <div>
//             <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
//               Professional Summary Enhancement
//             </h3>
//             <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
//               AI-powered rewrite for better impact
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 sm:p-5 md:p-6 space-y-6 sm:space-y-8">
//         <div className="relative pl-4 sm:pl-5 md:pl-6">
//           <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full" />
//           <div className="space-y-1.5 sm:space-y-2">
//             <div className="flex items-center gap-1.5 sm:gap-2">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400" />
//               <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wider">
//                 Original
//               </span>
//             </div>
//             <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{current}</p>
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="relative pl-4 sm:pl-5 md:pl-6"
//         >
//           <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-indigo-500 rounded-full" />
//           <div className="space-y-1.5 sm:space-y-2">
//             <div className="flex items-center gap-1.5 sm:gap-2">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600 animate-pulse" />
//               <span className="text-[9px] sm:text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
//                 AI Enhanced
//               </span>
//               <span className="text-[8px] sm:text-[9px] bg-emerald-100 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded-full">
//                 +42% Impact
//               </span>
//             </div>
//             <p className="text-gray-900 font-medium text-xs sm:text-sm leading-relaxed">
//               {rewritten}
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // ─── Issues Display Component ───────────────────────────────────────────
// interface IssuesDisplayProps {
//   issues: Record<string, Issue[]>;
// }

// const IssuesDisplay: React.FC<IssuesDisplayProps> = ({ issues }) => {
//   const [expandedSeverity, setExpandedSeverity] = useState<string | null>(null);

//   const severityConfig: Record<
//     string,
//     {
//       icon: React.ElementType;
//       color: string;
//       bg: string;
//       border: string;
//       label: string;
//       description: string;
//     }
//   > = {
//     critical: {
//       icon: FiAlertCircle,
//       color: "text-red-600",
//       bg: "bg-red-50",
//       border: "border-red-200",
//       label: "Critical Issues",
//       description: "Must fix to PassATS filters",
//     },
//     high: {
//       icon: FiAlertCircle,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//       border: "border-orange-200",
//       label: "High Priority",
//       description: "Significant impact on your score",
//     },
//     medium: {
//       icon: FiAlertCircle,
//       color: "text-yellow-600",
//       bg: "bg-yellow-50",
//       border: "border-yellow-200",
//       label: "Medium Priority",
//       description: "Moderate impact on ATS compatibility",
//     },
//     low: {
//       icon: FiInfo,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//       label: "Low Priority",
//       description: "Minor improvements suggested",
//     },
//   };

//   const getSectionIcon = (section: string): React.ReactElement => {
//     switch (section) {
//       case "experience":
//         return <FiBriefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
//       case "education":
//         return <FaGraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
//       case "skills":
//         return <FiZap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
//       case "summary":
//         return <FiFileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
//       default:
//         return <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
//     }
//   };

//   const nonEmptySeverities = Object.entries(issues).filter(
//     ([_, issueList]) => issueList && issueList.length > 0,
//   ) as [string, Issue[]][];

//   if (nonEmptySeverities.length === 0) return null;

//   const totalIssues = nonEmptySeverities.reduce(
//     (acc, [_, issueList]) => acc + issueList.length,
//     0,
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mt-6 sm:mt-8"
//     >
//       <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
//         <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 md:p-2.5 bg-indigo-100 rounded-lg sm:rounded-xl">
//                 <FiAlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600" />
//               </div>
//               <div>
//                 <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
//                   Issues Found ({totalIssues})
//                 </h4>
//                 <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
//                   Address these to improve your ATS score
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-1.5 sm:gap-2 flex-wrap">
//               {nonEmptySeverities.map(([severity, issueList]) => (
//                 <span
//                   key={severity}
//                   className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-medium border ${
//                     severity === "critical"
//                       ? "bg-red-50 text-red-700 border-red-200"
//                       : severity === "high"
//                         ? "bg-orange-50 text-orange-700 border-orange-200"
//                         : severity === "medium"
//                           ? "bg-yellow-50 text-yellow-700 border-yellow-200"
//                           : "bg-blue-50 text-blue-700 border-blue-200"
//                   }`}
//                 >
//                   {severity}: {issueList.length}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="divide-y divide-gray-100">
//           {nonEmptySeverities.map(([severity, issueList]) => {
//             const config = severityConfig[severity];
//             const Icon = config.icon;
//             const isExpanded = expandedSeverity === severity;

//             return (
//               <div key={severity} className="overflow-hidden">
//                 <div
//                   onClick={() => setExpandedSeverity(isExpanded ? null : severity)}
//                   className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
//                 >
//                   <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
//                     <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${config.bg}`}>
//                       <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${config.color}`} />
//                     </div>
//                     <div>
//                       <h5 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900">
//                         {config.label}
//                       </h5>
//                       <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 mt-0.5">
//                         {config.description}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
//                     <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-600">
//                       {issueList.length} issue{issueList.length > 1 ? "s" : ""}
//                     </span>
//                     <motion.div
//                       animate={{ rotate: isExpanded ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                       className={`p-1 rounded-full ${isExpanded ? config.bg : "bg-gray-100"}`}
//                     >
//                       <HiOutlineChevronDown
//                         className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isExpanded ? config.color : "text-gray-500"}`}
//                       />
//                     </motion.div>
//                   </div>
//                 </div>

//                 <AnimatePresence>
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-3 sm:space-y-4">
//                         {issueList.map((issue, idx) => (
//                           <motion.div
//                             key={idx}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${config.border} ${config.bg}/50 backdrop-blur-sm`}
//                           >
//                             <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
//                               <div
//                                 className={`p-1.5 sm:p-2 rounded-lg ${config.bg} shrink-0`}
//                               >
//                                 {getSectionIcon(issue.section)}
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                                   <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
//                                     {issue.section}
//                                   </span>
//                                   {issue.impact && (
//                                     <span
//                                       className={`text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full ${
//                                         issue.impact >= 9
//                                           ? "bg-red-100 text-red-700"
//                                           : issue.impact >= 7
//                                             ? "bg-orange-100 text-orange-700"
//                                             : issue.impact >= 5
//                                               ? "bg-yellow-100 text-yellow-700"
//                                               : "bg-blue-100 text-blue-700"
//                                       }`}
//                                     >
//                                       Impact: {issue.impact}
//                                     </span>
//                                   )}
//                                 </div>

//                                 <p className="text-[10px] sm:text-xs md:text-sm text-gray-800 mb-2 sm:mb-3">
//                                   {issue.message}
//                                 </p>

//                                 {issue.suggestion && (
//                                   <div className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
//                                     <HiOutlineSparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600 mt-0.5 shrink-0" />
//                                     <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
//                                       <span className="font-semibold">
//                                         Suggestion:
//                                       </span>{" "}
//                                       {issue.suggestion}
//                                     </p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ─── Section Analysis Component (Accordion Version) ─────────────────────────────────────────
// interface SectionAnalysisProps {
//   data: SectionAnalysisData | null | undefined;
// }

// const SectionAnalysis: React.FC<SectionAnalysisProps> = ({ data }) => {
//   const [expandedSections, setExpandedSections] = useState<
//     Record<string, boolean>
//   >({});

//   if (!data) {
//     return (
//       <div className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
//         No section analysis available
//       </div>
//     );
//   }

//   const sections = Object.entries(data);

//   const toggleSection = (sectionName: string) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [sectionName]: !prev[sectionName],
//     }));
//   };

//   const getGradeColor = (grade?: string): string => {
//     const colors: Record<string, string> = {
//       A: "text-emerald-600 bg-emerald-100",
//       "A+": "text-emerald-600 bg-emerald-100",
//       B: "text-blue-600 bg-blue-100",
//       "B+": "text-blue-600 bg-blue-100",
//       C: "text-yellow-600 bg-yellow-100",
//       "C+": "text-yellow-600 bg-yellow-100",
//       D: "text-orange-600 bg-orange-100",
//       F: "text-red-600 bg-red-100",
//     };
//     return colors[grade || ""] || "text-gray-600 bg-gray-100";
//   };

//   const getScoreColor = (score?: number): string => {
//     if (!score) return "text-gray-600";
//     if (score >= 70) return "text-emerald-600";
//     if (score >= 40) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const getProgressColor = (score?: number): string => {
//     if (!score) return "bg-gray-500";
//     if (score >= 70) return "bg-emerald-500";
//     if (score >= 40) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   const getSectionIcon = (sectionName: string): React.ReactElement => {
//     const icons: Record<string, React.ElementType> = {
//       awards: FiAward,
//       education: FiBookOpen,
//       experience: FiBriefcase,
//       skills: FiStar,
//     };
//     const Icon = icons[sectionName?.toLowerCase()] || FiInfo;
//     return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />;
//   };

//   const getStatusBadge = (
//     status?: string,
//     isPresent?: boolean,
//   ): { text: string; color: string; icon: React.ElementType } => {
//     if (!isPresent) {
//       return {
//         text: "Missing",
//         color: "bg-red-100 text-red-700",
//         icon: FiXCircle,
//       };
//     }
//     if (status === "needs_improvement") {
//       return {
//         text: "Needs Improvement",
//         color: "bg-yellow-100 text-yellow-700",
//         icon: FiAlertCircle,
//       };
//     }
//     return {
//       text: "Good",
//       color: "bg-emerald-100 text-emerald-700",
//       icon: FiCheckCircle,
//     };
//   };

//   const renderQuickWin = (
//     win: string | { action?: string; estimated_gain?: string },
//     idx: number,
//   ): React.ReactElement => {
//     if (typeof win === "object" && win !== null) {
//       return (
//         <div
//           key={idx}
//           className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 hover:bg-emerald-50 rounded-lg transition-colors"
//         >
//           <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 shrink-0" />
//           <div className="flex-1">
//             <p className="text-[10px] sm:text-xs text-gray-700">
//               {win.action || JSON.stringify(win)}
//             </p>
//             {win.estimated_gain && (
//               <span className="text-[8px] sm:text-[9px] text-emerald-600 mt-0.5 inline-block">
//                 +{win.estimated_gain}
//               </span>
//             )}
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div
//         key={idx}
//         className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 hover:bg-emerald-50 rounded-lg transition-colors"
//       >
//         <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 shrink-0" />
//         <span className="text-[10px] sm:text-xs text-gray-700">{win}</span>
//       </div>
//     );
//   };

//   const renderElement = (
//     element: string | { element?: string; name?: string; text?: string },
//     idx: number,
//     type: string = "missing",
//   ): React.ReactElement => {
//     const colors = {
//       missing: "bg-red-50 text-red-600 border-red-100",
//       remove: "bg-orange-50 text-orange-600 border-orange-100",
//     };
//     const colorClass = colors[type as keyof typeof colors] || colors.missing;

//     if (typeof element === "object" && element !== null) {
//       return (
//         <span
//           key={idx}
//           className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border ${colorClass}`}
//         >
//           {element.element ||
//             element.name ||
//             element.text ||
//             JSON.stringify(element)}
//         </span>
//       );
//     }
//     return (
//       <span
//         key={idx}
//         className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border ${colorClass}`}
//       >
//         {element}
//       </span>
//     );
//   };

//   if (!sections.length) {
//     return (
//       <div className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
//         No section analysis available
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-3 sm:space-y-4">
//       {sections.map(([sectionName, sectionData], index) => {
//         const statusBadge = getStatusBadge(
//           sectionData?.status,
//           sectionData?.is_present,
//         );
//         const StatusIcon = statusBadge.icon;
//         const isExpanded = expandedSections[sectionName] || false;
//         const hasContent =
//           (sectionData?.quick_wins && sectionData.quick_wins.length > 0) ||
//           (sectionData?.missing_elements &&
//             sectionData.missing_elements.length > 0) ||
//           (sectionData?.detailed_suggestions &&
//             sectionData.detailed_suggestions.length > 0) ||
//           (sectionData?.top_priority_fixes &&
//             sectionData.top_priority_fixes.length > 0);

//         return (
//           <motion.div
//             key={sectionName}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: Math.min(index * 0.1, 0.5) }}
//             className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
//           >
//             {/* Accordion Header */}
//             <button
//               onClick={() => toggleSection(sectionName)}
//               className="w-full text-left px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
//             >
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div
//                     className={`p-1.5 sm:p-2 rounded-lg ${getGradeColor(sectionData?.grade)}`}
//                   >
//                     {getSectionIcon(sectionName)}
//                   </div>
//                   <div className="text-left">
//                     <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 capitalize">
//                       {sectionName}
//                     </h3>
//                     <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
//                       <span
//                         className={`text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded inline-flex items-center gap-0.5 sm:gap-1 ${statusBadge.color}`}
//                       >
//                         <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                         {statusBadge.text}
//                       </span>
//                       <span className="text-[8px] sm:text-[9px] text-gray-400">•</span>
//                       <span className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-500 capitalize">
//                         Quality: {sectionData?.quality_level || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   <div className="text-right">
//                     <div
//                       className={`text-base sm:text-lg md:text-xl font-bold ${getGradeColor(sectionData?.grade)}`}
//                     >
//                       {sectionData?.grade || "N/A"}
//                     </div>
//                     <div
//                       className={`text-[9px] sm:text-[10px] md:text-xs font-medium mt-0.5 ${getScoreColor(sectionData?.score)}`}
//                     >
//                       Score: {sectionData?.score || 0}%
//                     </div>
//                   </div>
//                   <motion.div
//                     animate={{ rotate: isExpanded ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="p-1 rounded-full bg-gray-100"
//                   >
//                     <HiOutlineChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
//                   </motion.div>
//                 </div>
//               </div>
//             </button>

//             {/* Accordion Content */}
//             <AnimatePresence>
//               {isExpanded && hasContent && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 border-t border-gray-100">
//                     {/* Score Progress */}
//                     {sectionData?.target_score &&
//                       sectionData.target_score > 0 && (
//                         <div>
//                           <div className="flex justify-between text-[9px] sm:text-[10px] mb-1">
//                             <span className="text-gray-600">
//                               Completion Score
//                             </span>
//                             <span className="text-gray-900 font-medium">
//                               {sectionData?.score || 0} /{" "}
//                               {sectionData?.target_score}
//                             </span>
//                           </div>
//                           <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
//                             <motion.div
//                               initial={{ width: 0 }}
//                               animate={{
//                                 width: `${((sectionData?.score || 0) / sectionData.target_score) * 100}%`,
//                               }}
//                               transition={{ duration: 0.5 }}
//                               className={`h-1.5 sm:h-2 rounded-full ${getProgressColor(sectionData?.score)}`}
//                             />
//                           </div>
//                           {sectionData?.impact_potential &&
//                             sectionData.impact_potential > 0 && (
//                               <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
//                                 <FiTrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500" />
//                                 <span className="text-[8px] sm:text-[9px] text-gray-500">
//                                   Impact potential:{" "}
//                                   {sectionData?.impact_potential}%
//                                 </span>
//                               </div>
//                             )}
//                         </div>
//                       )}

//                     {/* Quick Wins */}
//                     {sectionData?.quick_wins &&
//                       sectionData.quick_wins.length > 0 && (
//                         <div>
//                           <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                             <FiThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
//                             <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
//                               Quick Wins ({sectionData.quick_wins.length})
//                             </span>
//                           </div>
//                           <div className="space-y-0.5 sm:space-y-1 bg-emerald-50/30 rounded-lg p-1.5 sm:p-2 max-h-32 sm:max-h-40 overflow-y-auto">
//                             {sectionData.quick_wins.map((win, idx) =>
//                               renderQuickWin(win, idx),
//                             )}
//                           </div>
//                         </div>
//                       )}

//                     {/* Missing Elements */}
//                     {sectionData?.missing_elements &&
//                       sectionData.missing_elements.length > 0 && (
//                         <div>
//                           <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                             <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
//                             <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
//                               Missing Elements
//                             </span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 sm:gap-1.5 max-h-24 sm:max-h-32 overflow-y-auto p-0.5 sm:p-1">
//                             {sectionData.missing_elements.map((element, idx) =>
//                               renderElement(element, idx, "missing"),
//                             )}
//                           </div>
//                         </div>
//                       )}

//                     {/* Elements to Remove */}
//                     {sectionData?.elements_to_remove &&
//                       sectionData.elements_to_remove.length > 0 && (
//                         <div>
//                           <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                             <FiXCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
//                             <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
//                               Remove These
//                             </span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 sm:gap-1.5 max-h-24 sm:max-h-32 overflow-y-auto p-0.5 sm:p-1">
//                             {sectionData.elements_to_remove.map(
//                               (element, idx) =>
//                                 renderElement(element, idx, "remove"),
//                             )}
//                           </div>
//                         </div>
//                       )}

//                     {/* Top Priority Fixes */}
//                     {sectionData?.top_priority_fixes &&
//                       sectionData.top_priority_fixes.length > 0 && (
//                         <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-100">
//                           <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                             <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600" />
//                             <span className="text-[9px] sm:text-[10px] font-bold text-red-700 uppercase tracking-wider">
//                               Top Priority Fixes
//                             </span>
//                           </div>
//                           <div className="space-y-0.5 sm:space-y-1 max-h-24 sm:max-h-32 overflow-y-auto">
//                             {sectionData.top_priority_fixes.map((fix, idx) => (
//                               <p
//                                 key={idx}
//                                 className="text-[9px] sm:text-[10px] text-red-700 flex items-start gap-1.5 sm:gap-2"
//                               >
//                                 <span className="text-red-500">!</span>
//                                 {fix.action}
//                               </p>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// // ─── Main Component ─────────────────────────────────────────────────────
// const ATSCheckerPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [activeTab, setActiveTab] = useState<"overview" | "issues" | "section">(
//     "overview",
//   );

//   usePreventReload();

//   useEffect(() => {
//     if (file && !uploading && !loading) {
//       analyzeResume();
//     }
//   }, [file]);

//   const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === "dragenter" || e.type === "dragover");
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && droppedFile.type === "application/pdf") {
//       setFile(droppedFile);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//     setAtsResults(null);
//     setActiveTab("overview");
//   };

//   const analyzeResume = async () => {
//     if (!file) return;
//     setUploading(true);
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post<ATSResults>(
//         `https://ai.aryuacademy.com/api/v1/ats/scan-file`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } },
//       );
//       setAtsResults(response?.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setUploading(false);
//       setTimeout(() => {
//         setLoading(false);
//       }, 3000);
//     }
//   };

//   const scoreBreakdown = atsResults?.score_breakdown || {};
//   const atsScore = atsResults?.ats_score || 0;

//   const metrics: Metric[] = Object.entries(scoreBreakdown)
//     .filter(([_, value]) => value !== null && value !== undefined)
//     .map(([key, value]) => {
//       const configs: Record<
//         string,
//         { label: string; icon: React.ElementType }
//       > = {
//         ats_compliance: { label: "ATS Compliance", icon: FiShield },
//         content_quality: { label: "Content Quality", icon: FiFileText },
//         format_compliance: { label: "Format Compliance", icon: FiLayout },
//         keyword_match_score: { label: "Keyword Match", icon: FiTarget },
//         resume_quality_score: { label: "Resume Quality", icon: FiStar },
//         structure_quality: { label: "Structure", icon: FiBarChart2 },
//       };
//       const config = configs[key] || {
//         label: key.replace(/_/g, " "),
//         icon: FiAward,
//       };
//       return {
//         key,
//         label: config.label,
//         icon: config.icon,
//         value: typeof value === "number" ? value : 0,
//       };
//     });

//   const totalIssues = atsResults?.issues
//     ? Object.values(atsResults.issues).flat().length
//     : 0;

//   const tabs: Tab[] = [
//     { id: "overview", label: "Overview", icon: FiEye },
//     { id: "issues", label: "Issues", icon: FiAlertCircle, badge: totalIssues },
//     { id: "section", label: "Section Analysis", icon: FiLayers },
//   ];

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   return (
//     <>
//       <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

//       <section className="relative pt-14 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
//         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             className="text-center max-w-5xl mx-auto"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full mb-4 sm:mb-6 border border-indigo-200 backdrop-blur-sm"
//             >
//               <FaBrain className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
//               <span className="text-[10px] sm:text-xs font-medium text-indigo-700">
//                 AI-Powered ATS Checker
//               </span>
//               <HiOutlineSparkles className="w-2 h-2 sm:w-2.5 sm:h-3 text-indigo-600" />
//             </motion.div>

//             <motion.h1
//               variants={fadeInUp}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2"
//             >
//               <span className="text-gray-900">Optimize Your Resume</span>
//               <br />
//               <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                 From Applied to Interviewed
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={fadeInUp}
//               className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-3"
//             >
//               Most resumes get rejected before HR even sees them. Upload yours
//               and let AI fix what's stopping you from getting shortlisted.
//             </motion.p>
//           </motion.div>

//           <motion.div
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             transition={{ delay: 0.6 }}
//             className="mx-auto"
//           >
//             {!file || !atsResults ? (
//               <div className="bg-white max-w-3xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//                 <div className="p-4 sm:p-5 md:p-7">
//                   <div
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                     className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 ${
//                       dragActive
//                         ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
//                         : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50"
//                     }`}
//                   >
//                     <input
//                       type="file"
//                       id="resume-upload"
//                       className="hidden"
//                       accept=".pdf"
//                       onChange={handleFileChange}
//                     />

//                     <div className="text-center">
//                       <motion.div
//                         animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
//                         transition={{ repeat: Infinity, duration: 3 }}
//                         className="inline-flex p-4 sm:p-5 md:p-6 bg-indigo-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
//                       >
//                         <FiUpload className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-indigo-600" />
//                       </motion.div>

//                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
//                         Upload Your Resume
//                       </h3>
//                       <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
//                         Drag & drop or{" "}
//                         <label
//                           htmlFor="resume-upload"
//                           className="text-indigo-600 font-semibold cursor-pointer hover:underline"
//                         >
//                           browse
//                         </label>
//                       </p>

//                       <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//                         <span className="text-[10px] sm:text-xs text-gray-500">
//                           AI analyzing resumes instantly
//                         </span>
//                       </div>

//                       <div className="space-y-3 sm:space-y-4">
//                         <label
//                           htmlFor="resume-upload"
//                           className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-xs sm:text-sm"
//                         >
//                           <FiUpload className="w-3.5 h-3.5 sm:w-4 sm:h-5" />
//                           Choose File
//                         </label>
//                         <p className="text-[9px] sm:text-xs text-gray-500">Upload PDF only (Max 10MB)</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white max-w-5xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//                 <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 py-3 sm:py-4">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
//                     <div className="flex items-center gap-2 sm:gap-3">
//                       <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg sm:rounded-xl">
//                         <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-indigo-600" />
//                       </div>
//                       <span className="text-xs sm:text-sm font-semibold text-gray-900">
//                         ATS Analysis Results
//                       </span>
//                     </div>
//                     <button
//                       onClick={removeFile}
//                       className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-all duration-500 hover:scale-105"
//                     >
//                       <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       Analyze New Resume
//                     </button>
//                   </div>

//                   <div className="mt-3 sm:mt-4">
//                     <ModernTabs
//                       activeTab={activeTab}
//                       onTabChange={setActiveTab as (tabId: string) => void}
//                       tabs={tabs}
//                     />
//                   </div>
//                 </div>

//                 <div className="p-4 sm:p-5 md:p-6 lg:p-8">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activeTab}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {activeTab === "overview" && (
//                         <div className="space-y-5 sm:space-y-6 md:space-y-8">
//                           <ModernScoreCard
//                             score={atsScore}
//                             verdict={atsResults?.summary?.ats_verdict}
//                           />
//                           {metrics.length > 0 && (
//                             <ModernMetricGrid metrics={metrics} />
//                           )}
//                           {atsResults?.ai_analysis?.summary_rewrite && (
//                             <ModernSummaryCard
//                               current={
//                                 atsResults.ai_analysis.summary_rewrite
//                                   .current || ""
//                               }
//                               rewritten={
//                                 atsResults.ai_analysis.summary_rewrite
//                                   .rewritten ||
//                                 atsResults.ai_analysis.summary_rewrite
//                                   .suggested ||
//                                 ""
//                               }
//                             />
//                           )}
//                         </div>
//                       )}

//                       {activeTab === "issues" && (
//                         <div className="space-y-4 sm:space-y-6">
//                           {atsResults?.issues ? (
//                             <IssuesDisplay issues={atsResults.issues} />
//                           ) : (
//                             <div className="text-center py-8 sm:py-10 md:py-12 text-gray-500">
//                               <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 text-emerald-500" />
//                               <p className="text-xs sm:text-sm">No issues found! Your resume looks great!</p>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {activeTab === "section" && (
//                         <div className="space-y-4 sm:space-y-6">
//                           {atsResults?.section_analysis ? (
//                             <SectionAnalysis
//                               data={atsResults.section_analysis}
//                             />
//                           ) : (
//                             <div className="text-center py-8 sm:py-10 md:py-12 text-gray-500">
//                               <FiInfo className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3" />
//                               <p className="text-xs sm:text-sm">No section analysis available</p>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4">
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={removeFile}
//                       className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
//                     >
//                       <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:rotate-180 transition-transform duration-500" />
//                       Analyze New Resume
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ATSCheckerPage;

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import {
//   FiUpload,
//   FiFileText,
//   FiAward,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiZap,
//   FiEye,
//   FiArrowRight,
//   FiClock,
//   FiPercent,
//   FiBriefcase,
//   FiInfo,
//   FiSearch,
//   FiTrendingUp,
//   FiLayers,
//   FiRefreshCw,
//   FiStar,
//   FiLayout,
//   FiThumbsUp,
//   FiBookOpen,
//   FiXCircle,
//   FiShield,
//   FiTarget,
//   FiBarChart2,
//   FiUser,
//   FiMessageSquare,
//   FiMap,
//   FiGithub,
//   FiLinkedin,
//   FiMail,
//   FiPhone,
// } from "react-icons/fi";

// import { FaBrain, FaRocket, FaGraduationCap } from "react-icons/fa";
// import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";
// import { usePreventReload } from "@/app/hooks";
// import { BsFillLightbulbFill } from "react-icons/bs";

// // ─── Updated Types ───────────────────────────────────────────────────────────────
// interface DimensionBreakdown {
//   raw: number;
//   weight: number;
//   weighted: number;
//   [key: string]: any;
// }

// interface ScoreBreakdown {
//   [key: string]: number | null | undefined;
//   dimension_breakdown?: {
//     [key: string]: DimensionBreakdown;
//   };
// }

// interface ContactDetected {
//   name?: string;
//   email?: string;
//   phone?: string;
//   location?: string;
//   linkedin?: string;
//   github?: string;
//   score?: number;
//   status?: string;
// }

// interface Issue {
//   message: string;
//   severity?: "critical" | "high" | "medium" | "low";
//   suggestion?: string;
//   section: string;
//   impact?: number;
// }

// interface SectionAnalysisItem {
//   score: number;
//   target_score?: number;
//   status?: string;
//   grade?: string;
//   is_present?: boolean;
//   is_complete?: boolean;
//   quality_level?: string;
//   impact_potential?: number;
//   quick_wins?: (string | { action?: string; estimated_gain?: string })[];
//   missing_elements?: any[];
//   elements_to_remove?: any[];
//   top_priority_fixes?: { action?: string }[];
//   detailed_suggestions?: any[];
//   strengths?: string[];
// }

// interface SectionAnalysisData {
//   [key: string]: SectionAnalysisItem;
// }

// interface RecommendationStep {
//   step: number;
//   section: string;
//   action: string;
//   effort: string;
//   estimated_gain: number;
//   time_estimate: string;
//   why_now: string;
// }

// interface AIAnalysis {
//   status?: string;
//   industry_detected?: string;
//   role_level?: string;
//   ats_compatibility_verdict?: string;
//   content_strengths?: string[];
//   critical_improvements?: any[];
//   bullet_rewrites?: any[];
//   summary_rewrite?: {
//     current?: string;
//     suggested?: string;
//     why_better?: string;
//   };
//   missing_sections?: any[];
//   ats_passing_tactics?: string[];
//   overall_assessment?: string;
//   priority_action_plan?: string[];
// }

// interface Recommendations {
//   top_3_priorities?: string[];
//   quick_wins?: string[];
//   improvement_roadmap?: RecommendationStep[];
//   ats_passing_tactics?: string[];
//   recruiter_tips?: string[];
//   estimated_improvement?: number;
// }

// interface Summary {
//   ready_to_apply: boolean;
//   grade?: string;
//   candidate_type?: string;
//   percentile_estimate?: string;
//   ats_compatibility_level?: string;
//   ats_verdict?: string;
//   main_strengths?: string[];
//   main_weaknesses?: string[];
// }

// interface ATSResults {
//   ats_score?: number;
//   score_status?: string;
//   grade?: string;
//   candidate_type?: string;
//   ready_to_apply?: boolean;
//   ready_to_apply_verdict?: string;
//   score_breakdown?: ScoreBreakdown;
//   score_explanation?: any;
//   contact_detected?: ContactDetected;
//   issues?: {
//     [key: string]: Issue[];
//   };
//   critical_issues_count?: number;
//   section_analysis?: SectionAnalysisData;
//   ai_analysis?: AIAnalysis;
//   recommendations?: Recommendations;
//   summary?: Summary;
// }

// // ─── Loading Screen Component ───────────────────────────────────────────
// const LoadingScreen = () => {
//   const [progress, setProgress] = useState(0);
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     { text: "Scanning resume structure...", icon: FiFileText },
//     { text: "Analyzing keywords...", icon: FiSearch },
//     { text: "Checking ATS compatibility...", icon: FiTrendingUp },
//     { text: "Evaluating formatting...", icon: FiLayers },
//     { text: "Generating insights...", icon: FaBrain },
//     { text: "Preparing results...", icon: HiOutlineSparkles },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 50);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const stepInterval = setInterval(() => {
//       setCurrentStep((prev) => (prev + 1) % steps.length);
//     }, 1000);
//     return () => clearInterval(stepInterval);
//   }, []);

//   const CurrentIcon = steps[currentStep].icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-6 md:p-8 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-600/5" />
//         <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-100 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
//         <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-100 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />

//         <div className="relative z-10">
//           <motion.div
//             animate={{
//               scale: [1, 1.1, 1],
//               rotate: [0, 360, 360],
//             }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
//           >
//             <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
//           </motion.div>

//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
//             Analyzing Your Resume
//           </h3>
//           <p className="text-center text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">
//             {steps[currentStep].text}
//           </p>

//           <div className="relative h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-3 sm:mb-4">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full"
//             />
//           </div>

//           <div className="flex justify-between items-center text-xs sm:text-sm">
//             <span className="text-gray-500">Processing...</span>
//             <span className="font-semibold text-indigo-600">{progress}%</span>
//           </div>

//           <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
//                 className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600"
//               />
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // ─── Modern Tab Component ───────────────────────────────────────────────
// interface Tab {
//   id: string;
//   label: string;
//   icon: React.ElementType;
//   badge?: number;
// }

// interface ModernTabsProps {
//   activeTab: string;
//   onTabChange: (tabId: string) => void;
//   tabs: Tab[];
// }

// const ModernTabs: React.FC<ModernTabsProps> = ({
//   activeTab,
//   onTabChange,
//   tabs,
// }) => {
//   return (
//     <div className="relative">
//       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-600/5 rounded-xl sm:rounded-2xl blur-xl" />
//       <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-100 shadow-sm overflow-x-auto">
//         <div className="flex flex-nowrap gap-1 min-w-min">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <motion.button
//                 key={tab.id}
//                 onClick={() => onTabChange(tab.id)}
//                 className={`relative flex items-center cursor-pointer justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
//                   isActive
//                     ? "text-white"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 {isActive && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg sm:rounded-xl shadow-lg"
//                     transition={{ type: "spring", duration: 0.5 }}
//                   />
//                 )}
//                 <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
//                   <Icon className={`w-3 h-3 sm:w-3.5 sm:h-4 ${isActive ? "text-white" : ""}`} />
//                   <span className="max-sm:hidden">{tab.label}</span>
//                   {tab.badge !== undefined && tab.badge > 0 && !isActive && (
//                     <span className="ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs bg-gray-100 text-gray-600 rounded-full">
//                       {tab.badge}
//                     </span>
//                   )}
//                 </span>
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Modern Score Card Component ────────────────────────────────────────
// interface ModernScoreCardProps {
//   score: number;
//   grade?: string;
//   verdict?: string;
//   readyToApply?: boolean;
//   readyToApplyVerdict?: string;
// }

// const ModernScoreCard: React.FC<ModernScoreCardProps> = ({
//   score,
//   grade,
//   verdict,
//   readyToApply,
//   readyToApplyVerdict,
// }) => {
//   const getVerdictColor = (ready: boolean) => {
//     return ready
//       ? "from-emerald-600 to-emerald-500"
//       : "from-orange-600 to-orange-500";
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-2xl">
//         <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48" />
//         <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl translate-y-48 -translate-x-48" />

//         <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
//           <div className="text-center md:text-left">
//             <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/80 mb-1 sm:mb-2 tracking-wider">
//               OVERALL ATS SCORE
//             </div>
//             <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
//               {score}%
//             </div>
//             <div className="w-48 sm:w-64 md:w-80 h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${score}%` }}
//                 transition={{ duration: 1, delay: 0.3 }}
//                 className="h-full bg-white rounded-full"
//               />
//             </div>
//           </div>

//           <div className="text-center md:text-right space-y-2 sm:space-y-3">
//             <div className="space-y-1">
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-base sm:text-xl md:text-2xl font-bold"
//               >
//                 Grade: {grade || "N/A"}
//               </motion.div>
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-xs sm:text-sm text-white/80"
//               >
//                 {verdict || ""}
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Ready to Apply Verdict */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 border ${
//           readyToApply
//             ? "bg-emerald-50 border-emerald-200"
//             : "bg-orange-50 border-orange-200"
//         }`}
//       >
//         <div className="flex items-start gap-3 sm:gap-4">
//           <div
//             className={`p-2 sm:p-2.5 rounded-lg shrink-0 ${
//               readyToApply ? "bg-emerald-100" : "bg-orange-100"
//             }`}
//           >
//             {readyToApply ? (
//               <FiCheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${readyToApply ? "text-emerald-600" : "text-orange-600"}`} />
//             ) : (
//               <FiAlertCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${readyToApply ? "text-emerald-600" : "text-orange-600"}`} />
//             )}
//           </div>
//           <div>
//             <h4 className={`text-sm sm:text-base font-semibold mb-1 ${
//               readyToApply ? "text-emerald-900" : "text-orange-900"
//             }`}>
//               {readyToApply ? "✓ Ready to Apply" : "⚠ Not Ready to Apply"}
//             </h4>
//             <p className={`text-xs sm:text-sm ${
//               readyToApply ? "text-emerald-700" : "text-orange-700"
//             }`}>
//               {readyToApplyVerdict}
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ─── Dimension Breakdown Component ───────────────────────────────────────
// interface DimensionBreakdownProps {
//   dimensions?: {
//     [key: string]: DimensionBreakdown;
//   };
// }

// const DimensionBreakdownComponent: React.FC<DimensionBreakdownProps> = ({
//   dimensions,
// }) => {
//   if (!dimensions) return null;

//   const dimensionLabels: Record<string, { label: string; icon: React.ElementType }> = {
//     keyword_skill_density: { label: "Keyword Density", icon: FiSearch },
//     experience_depth_duration: { label: "Experience", icon: FiBriefcase },
//     achievement_quality: { label: "Achievement Quality", icon: FiStar },
//     structure_completeness: { label: "Structure", icon: FiLayers },
//     format_ats_compliance: { label: "Format", icon: FiShield },
//     fresher_achievements: { label: "Achievements", icon: FiAward },
//   };

//   const visibleDimensions = Object.entries(dimensions).filter(
//     ([key]) => !key.includes("_breakdown") && key !== "hard_caps_applied" && key !== "ai_bonus"
//   );

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
//       {visibleDimensions.map(([key, data]) => {
//         const config = dimensionLabels[key] || { label: key.replace(/_/g, " "), icon: FiInfo };
//         const Icon = config.icon;
//         const rawScore = Math.round(data.raw || 0);
//         const weight = data.weight || 0;
//         const weightedScore = Math.round(data.weighted || 0);

//         return (
//           <motion.div
//             key={key}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="group relative"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-indigo-100">
//                   <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600" />
//                 </div>
//                 <div className="text-right">
//                   <div className="text-lg sm:text-xl font-semibold text-gray-900">
//                     {rawScore}%
//                   </div>
//                   <div className="text-[8px] sm:text-[9px] text-gray-500 font-medium">
//                     Weight: {Math.round(weight * 100)}%
//                   </div>
//                 </div>
//               </div>
//               <h3 className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 sm:mb-3">
//                 {config.label}
//               </h3>
//               <div className="space-y-1.5 sm:space-y-2">
//                 <div className="flex justify-between text-[8px] sm:text-[9px] text-gray-600">
//                   <span>Raw Score</span>
//                   <span className="font-medium">{rawScore}%</span>
//                 </div>
//                 <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${rawScore}%` }}
//                     transition={{ duration: 0.8 }}
//                     className="h-full rounded-full bg-indigo-500"
//                   />
//                 </div>
//                 <div className="flex justify-between text-[8px] sm:text-[9px] text-gray-600">
//                   <span>Weighted Score</span>
//                   <span className="font-medium">{weightedScore} pts</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// // ─── Improvement Roadmap Component ──────────────────────────────────────
// interface ImprovementRoadmapProps {
//   roadmap?: RecommendationStep[];
//   quickWins?: string[];
// }

// const ImprovementRoadmap: React.FC<ImprovementRoadmapProps> = ({
//   roadmap,
//   quickWins,
// }) => {
//   const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});

//   if (!roadmap && !quickWins) return null;

//   return (
//     <div className="space-y-5 sm:space-y-6">
//       {/* Quick Wins */}
//       {quickWins && quickWins.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
//         >
//           <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
//             <div className="p-2 sm:p-2.5 bg-emerald-100 rounded-lg">
//               <FiThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//             </div>
//             <h3 className="text-sm sm:text-base md:text-lg font-semibold text-emerald-900">
//               Quick Wins (5-15 minutes each)
//             </h3>
//           </div>
//           <div className="space-y-2 sm:space-y-3">
//             {quickWins.map((win, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-emerald-100"
//               >
//                 <div className="p-1 sm:p-1.5 bg-emerald-100 rounded shrink-0 mt-0.5">
//                   <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
//                 </div>
//                 <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
//                   {win}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Improvement Roadmap */}
//       {roadmap && roadmap.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
//         >
//           <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-2 sm:p-2.5 bg-indigo-100 rounded-lg">
//                 <FiMap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//               </div>
//               <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
//                 Action Plan (Step by Step)
//               </h3>
//             </div>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {roadmap.map((step) => (
//               <motion.div
//                 key={step.step}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: step.step * 0.1 }}
//                 className="overflow-hidden"
//               >
//                 <button
//                   onClick={() =>
//                     setExpandedSteps((prev) => ({
//                       ...prev,
//                       [step.step]: !prev[step.step],
//                     }))
//                   }
//                   className="w-full text-left p-4 sm:p-5 hover:bg-gray-50/50 transition-colors"
//                 >
//                   <div className="flex items-start gap-3 sm:gap-4">
//                     <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 shrink-0 font-bold text-indigo-600 text-sm sm:text-base">
//                       {step.step}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
//                         <h4 className="text-sm sm:text-base font-semibold text-gray-900 capitalize">
//                           {step.section}
//                         </h4>
//                         <div className="flex items-center gap-2 flex-wrap text-[9px] sm:text-[10px]">
//                           <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
//                             {step.effort}
//                           </span>
//                           <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
//                             +{step.estimated_gain} pts
//                           </span>
//                         </div>
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-gray-600">
//                         {step.action}
//                       </p>
//                     </div>
//                     <motion.div
//                       animate={{
//                         rotate: expandedSteps[step.step] ? 180 : 0,
//                       }}
//                       transition={{ duration: 0.3 }}
//                       className="p-1 rounded-full bg-gray-100 shrink-0 mt-1"
//                     >
//                       <HiOutlineChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
//                     </motion.div>
//                   </div>
//                 </button>

//                 <AnimatePresence>
//                   {expandedSteps[step.step] && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden bg-gray-50/50 border-t border-gray-100"
//                     >
//                       <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <FiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 shrink-0" />
//                           <div>
//                             <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">
//                               Time:
//                             </span>
//                             <p className="text-[10px] sm:text-xs text-gray-600">
//                               {step.time_estimate}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 sm:gap-3">
//                           <BsFillLightbulbFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 mt-0.5 shrink-0" />
//                           <div>
//                             <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">
//                               Why now:
//                             </span>
//                             <p className="text-[10px] sm:text-xs text-gray-600">
//                               {step.why_now}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// // ─── Recruiter Tips Component ───────────────────────────────────────────
// interface RecruiterTipsProps {
//   tips?: string[];
//   atsTactics?: string[];
// }

// const RecruiterTips: React.FC<RecruiterTipsProps> = ({ tips, atsTactics }) => {
//   if (!tips && !atsTactics) return null;

//   return (
//     <div className="space-y-5 sm:space-y-6">
//       {/* ATS Passing Tactics */}
//       {atsTactics && atsTactics.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
//         >
//           <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
//             <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg">
//               <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
//             </div>
//             <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900">
//               ATS Passing Tactics
//             </h3>
//           </div>
//           <div className="space-y-2 sm:space-y-3">
//             {atsTactics.map((tactic, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-blue-100"
//               >
//                 <div className="p-1 sm:p-1.5 bg-blue-100 rounded shrink-0 mt-0.5">
//                   <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
//                 </div>
//                 <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
//                   {tactic}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Recruiter Tips */}
//       {tips && tips.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-purple-50 border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
//         >
//           <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
//             <div className="p-2 sm:p-2.5 bg-purple-100 rounded-lg">
//               <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
//             </div>
//             <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-900">
//               Recruiter Tips
//             </h3>
//           </div>
//           <div className="space-y-2 sm:space-y-3">
//             {tips.map((tip, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-purple-100"
//               >
//                 <div className="p-1 sm:p-1.5 bg-purple-100 rounded shrink-0 mt-0.5">
//                   <FiInfo className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
//                 </div>
//                 <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
//                   {tip}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// // ─── Contact Information Card ──────────────────────────────────────────
// interface ContactCardProps {
//   contact?: ContactDetected;
// }

// const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
//   if (!contact || contact.score === 0) return null;

//   const getStatusColor = (status?: string) => {
//     switch (status) {
//       case "excellent":
//         return "bg-emerald-100 text-emerald-700 border-emerald-200";
//       case "good":
//         return "bg-blue-100 text-blue-700 border-blue-200";
//       case "fair":
//         return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 ${getStatusColor(contact.status)}`}
//     >
//       <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="p-2 sm:p-2.5 bg-current rounded-lg">
//             <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
//           </div>
//           <div>
//             <h3 className="text-sm sm:text-base font-semibold">Contact Information</h3>
//             <p className="text-[9px] sm:text-[10px] opacity-75">
//               {contact.score}% Complete
//             </p>
//           </div>
//         </div>
//         <span className="text-xs sm:text-sm font-bold">
//           {contact.status?.toUpperCase()}
//         </span>
//       </div>

//       <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
//         {contact.name && (
//           <div className="flex items-center gap-2">
//             <FiUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
//             <span>{contact.name}</span>
//           </div>
//         )}
//         {contact.email && (
//           <div className="flex items-center gap-2">
//             <FiMail className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
//             <span className="truncate">{contact.email}</span>
//           </div>
//         )}
//         {contact.phone && (
//           <div className="flex items-center gap-2">
//             <FiPhone className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
//             <span>{contact.phone}</span>
//           </div>
//         )}
//         {contact.linkedin && (
//           <div className="flex items-center gap-2">
//             <FiLinkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
//             <span className="truncate">{contact.linkedin}</span>
//           </div>
//         )}
//         {contact.github && (
//           <div className="flex items-center gap-2">
//             <FiGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
//             <span className="truncate">{contact.github}</span>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// // ─── Main Component ─────────────────────────────────────────────────────
// const ATSCheckerPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [activeTab, setActiveTab] = useState<
//     "overview" | "dimensions" | "roadmap" | "tips" | "sections"
//   >("overview");

//   usePreventReload();

//   useEffect(() => {
//     if (file && !uploading && !loading) {
//       analyzeResume();
//     }
//   }, [file]);

//   const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === "dragenter" || e.type === "dragover");
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && droppedFile.type === "application/pdf") {
//       setFile(droppedFile);
//       setError(null);
//     } else {
//       setError("Please upload a PDF file");
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//     setAtsResults(null);
//     setActiveTab("overview");
//     setError(null);
//   };

//   const analyzeResume = async () => {
//     if (!file) return;
//     setUploading(true);
//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post<ATSResults>(
//         `https://ai.aryuacademy.com/api/v1/ats/scan-file`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setAtsResults(response?.data);
//     } catch (err: any) {
//       const errorMsg = err?.response?.data?.message || err?.message || "Failed to analyze resume";
//       setError(errorMsg);
//       console.error(err);
//       setFile(null);
//     } finally {
//       setUploading(false);
//       setTimeout(() => {
//         setLoading(false);
//       }, 3000);
//     }
//   };

//   const scoreBreakdown = atsResults?.score_breakdown || {};
//   const atsScore = atsResults?.ats_score || 0;
//   const dimensions = scoreBreakdown?.dimension_breakdown;

//   const totalIssues = atsResults?.issues
//     ? Object.values(atsResults.issues).flat().length
//     : 0;

//   const tabs: Tab[] = [
//     { id: "overview", label: "Overview", icon: FiEye },
//     { id: "dimensions", label: "Dimensions", icon: FiBarChart2 },
//     { id: "roadmap", label: "Action Plan", icon: FiMap },
//     { id: "tips", label: "Tips", icon: FiMessageSquare },
//     { id: "sections", label: "Sections", icon: FiLayers, badge: Object.keys(atsResults?.section_analysis || {}).length },
//   ];

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   return (
//     <>
//       <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

//       <section className="relative pt-14 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
//         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             className="text-center max-w-5xl mx-auto"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full mb-4 sm:mb-6 border border-indigo-200 backdrop-blur-sm"
//             >
//               <FaBrain className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
//               <span className="text-[10px] sm:text-xs font-medium text-indigo-700">
//                 AI-Powered ATS Checker
//               </span>
//               <HiOutlineSparkles className="w-2 h-2 sm:w-2.5 sm:h-3 text-indigo-600" />
//             </motion.div>

//             <motion.h1
//               variants={fadeInUp}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2"
//             >
//               <span className="text-gray-900">Optimize Your Resume</span>
//               <br />
//               <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                 From Applied to Interviewed
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={fadeInUp}
//               className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-3"
//             >
//               Most resumes get rejected before HR even sees them. Upload yours
//               and let AI fix what's stopping you from getting shortlisted.
//             </motion.p>
//           </motion.div>

//           <motion.div
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             transition={{ delay: 0.6 }}
//             className="mx-auto"
//           >
//             {!file || !atsResults ? (
//               <div className="bg-white max-w-3xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//                 <div className="p-4 sm:p-5 md:p-7">
//                   <div
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                     className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 ${
//                       dragActive
//                         ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
//                         : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50"
//                     }`}
//                   >
//                     <input
//                       type="file"
//                       id="resume-upload"
//                       className="hidden"
//                       accept=".pdf"
//                       onChange={handleFileChange}
//                     />

//                     <div className="text-center">
//                       <motion.div
//                         animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
//                         transition={{ repeat: Infinity, duration: 3 }}
//                         className="inline-flex p-4 sm:p-5 md:p-6 bg-indigo-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
//                       >
//                         <FiUpload className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-indigo-600" />
//                       </motion.div>

//                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
//                         Upload Your Resume
//                       </h3>
//                       <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
//                         Drag & drop or{" "}
//                         <label
//                           htmlFor="resume-upload"
//                           className="text-indigo-600 font-semibold cursor-pointer hover:underline"
//                         >
//                           browse
//                         </label>
//                       </p>

//                       {error && (
//                         <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
//                           {error}
//                         </div>
//                       )}

//                       <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//                         <span className="text-[10px] sm:text-xs text-gray-500">
//                           AI analyzing resumes instantly
//                         </span>
//                       </div>

//                       <div className="space-y-3 sm:space-y-4">
//                         <label
//                           htmlFor="resume-upload"
//                           className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-xs sm:text-sm"
//                         >
//                           <FiUpload className="w-3.5 h-3.5 sm:w-4 sm:h-5" />
//                           Choose File
//                         </label>
//                         <p className="text-[9px] sm:text-xs text-gray-500">Upload PDF only (Max 10MB)</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white max-w-6xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//                 <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 py-3 sm:py-4">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
//                     <div>
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg sm:rounded-xl">
//                           <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-indigo-600" />
//                         </div>
//                         <div>
//                           <span className="text-xs sm:text-sm font-semibold text-gray-900">
//                             ATS Analysis Results
//                           </span>
//                           <p className="text-[9px] sm:text-[10px] text-gray-500">
//                             {atsResults?.summary?.grade} • {atsResults?.summary?.ats_verdict}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={removeFile}
//                       className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-all duration-500 hover:scale-105"
//                     >
//                       <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       Analyze New Resume
//                     </button>
//                   </div>

//                   <div>
//                     <ModernTabs
//                       activeTab={activeTab}
//                       onTabChange={setActiveTab}
//                       tabs={tabs}
//                     />
//                   </div>
//                 </div>

//                 <div className="p-4 sm:p-5 md:p-6 lg:p-8">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activeTab}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {activeTab === "overview" && (
//                         <div className="space-y-5 sm:space-y-6 md:space-y-8">
//                           <ModernScoreCard
//                             score={atsScore}
//                             grade={atsResults?.grade}
//                             verdict={atsResults?.score_status}
//                             readyToApply={atsResults?.ready_to_apply}
//                             readyToApplyVerdict={atsResults?.ready_to_apply_verdict}
//                           />
//                           <ContactCard contact={atsResults?.contact_detected} />
//                         </div>
//                       )}

//                       {activeTab === "dimensions" && (
//                         <div className="space-y-4 sm:space-y-6">
//                           <DimensionBreakdownComponent dimensions={dimensions} />
//                         </div>
//                       )}

//                       {activeTab === "roadmap" && (
//                         <div className="space-y-4 sm:space-y-6">
//                           <ImprovementRoadmap
//                             roadmap={atsResults?.recommendations?.improvement_roadmap}
//                             quickWins={atsResults?.recommendations?.quick_wins}
//                           />
//                         </div>
//                       )}

//                       {activeTab === "tips" && (
//                         <div className="space-y-4 sm:space-y-6">
//                           <RecruiterTips
//                             tips={atsResults?.recommendations?.recruiter_tips}
//                             atsTactics={atsResults?.recommendations?.ats_passing_tactics}
//                           />
//                         </div>
//                       )}

//                       {activeTab === "sections" && (
//                         <div className="space-y-4 sm:space-y-6">
//                           <div className="text-center py-8 sm:py-10 md:py-12">
//                             <FiInfo className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 text-indigo-600" />
//                             <p className="text-xs sm:text-sm text-gray-500">
//                               Section analysis coming soon
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4">
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={removeFile}
//                       className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
//                     >
//                       <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:rotate-180 transition-transform duration-500" />
//                       Analyze New Resume
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ATSCheckerPage;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiUpload,
  FiFileText,
  FiAward,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiEye,
  FiArrowRight,
  FiClock,
  FiPercent,
  FiBriefcase,
  FiInfo,
  FiSearch,
  FiTrendingUp,
  FiLayers,
  FiRefreshCw,
  FiStar,
  FiLayout,
  FiThumbsUp,
  FiBookOpen,
  FiXCircle,
  FiShield,
  FiTarget,
  FiBarChart2,
  FiUser,
  FiMessageSquare,
  FiMap,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiEdit3,
  FiCopy,
} from "react-icons/fi";

import { FaBrain, FaRocket, FaGraduationCap } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";
import { usePreventReload } from "@/app/hooks";
import { LuBrain } from "react-icons/lu";
import { IoBulb } from "react-icons/io5";
import EditResumeTab from "./EditResumeTab";

// ─── Updated Types ───────────────────────────────────────────────────────────────
interface DimensionBreakdown {
  raw: number;
  weight: number;
  weighted: number;
  [key: string]: any;
}

interface ScoreBreakdown {
  [key: string]: number | null | undefined;
  dimension_breakdown?: {
    [key: string]: DimensionBreakdown;
  };
}

interface ContactDetected {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  score?: number;
  status?: string;
}

interface Issue {
  message: string;
  severity?: "critical" | "high" | "medium" | "low";
  suggestion?: string;
  section: string;
  impact?: number;
}

interface SectionAnalysisItem {
  score: number;
  target_score?: number;
  status?: string;
  grade?: string;
  is_present?: boolean;
  is_complete?: boolean;
  quality_level?: string;
  impact_potential?: number;
  quick_wins?: (string | { action?: string; estimated_gain?: string })[];
  missing_elements?: any[];
  elements_to_remove?: any[];
  top_priority_fixes?: { action?: string }[];
  detailed_suggestions?: any[];
  strengths?: string[];
  rewrite_examples?: Array<{ before?: string; after?: string }>;
}

interface SectionAnalysisData {
  [key: string]: SectionAnalysisItem;
}

interface RecommendationStep {
  step: number;
  section: string;
  action: string;
  effort: string;
  estimated_gain: number;
  time_estimate: string;
  why_now: string;
}

interface AIAnalysis {
  status?: string;
  industry_detected?: string;
  role_level?: string;
  ats_compatibility_verdict?: string;
  content_strengths?: string[];
  critical_improvements?: any[];
  bullet_rewrites?: Array<{
    original?: string;
    rewritten?: string;
    why_better?: string;
  }>;
  summary_rewrite?: {
    current?: string;
    suggested?: string;
    why_better?: string;
  };
  missing_sections?: any[];
  ats_passing_tactics?: string[];
  overall_assessment?: string;
  priority_action_plan?: string[];
}

interface Recommendations {
  top_3_priorities?: string[];
  quick_wins?: string[];
  improvement_roadmap?: RecommendationStep[];
  ats_passing_tactics?: string[];
  recruiter_tips?: string[];
  estimated_improvement?: number;
}

interface Summary {
  ready_to_apply: boolean;
  grade?: string;
  candidate_type?: string;
  percentile_estimate?: string;
  ats_compatibility_level?: string;
  ats_verdict?: string;
  main_strengths?: string[];
  main_weaknesses?: string[];
}

interface ATSResults {
  ats_score?: number;
  score_status?: string;
  grade?: string;
  candidate_type?: string;
  ready_to_apply?: boolean;
  ready_to_apply_verdict?: string;
  score_breakdown?: ScoreBreakdown;
  score_explanation?: any;
  contact_detected?: ContactDetected;
  issues?: {
    [key: string]: Issue[];
  };
  critical_issues_count?: number;
  section_analysis?: SectionAnalysisData;
  ai_analysis?: AIAnalysis;
  recommendations?: Recommendations;
  summary?: Summary;
  meta?: {
    uploaded_file?: string;
    source?: string;
    pipeline?: string;
  };
}

// ─── Loading Screen Component ───────────────────────────────────────────
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "Scanning resume structure...", icon: FiFileText },
    { text: "Analyzing keywords...", icon: FiSearch },
    { text: "Checking ATS compatibility...", icon: FiTrendingUp },
    { text: "Evaluating formatting...", icon: FiLayers },
    { text: "Generating insights...", icon: FaBrain },
    { text: "Preparing results...", icon: HiOutlineSparkles },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1000);
    return () => clearInterval(stepInterval);
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-600/5" />
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-100 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-100 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />

        <div className="relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360, 360],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
          >
            <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </motion.div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
            Analyzing Your Resume
          </h3>
          <p className="text-center text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">
            {steps[currentStep].text}
          </p>

          <div className="relative h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-3 sm:mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full"
            />
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-500">Processing...</span>
            <span className="font-semibold text-indigo-600">{progress}%</span>
          </div>

          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Modern Tab Component ───────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface ModernTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
}

const ModernTabs: React.FC<ModernTabsProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-600/5 rounded-xl sm:rounded-2xl blur-xl" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-100 shadow-sm overflow-x-auto">
        <div className="flex flex-nowrap gap-1 min-w-min">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center cursor-pointer justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg sm:rounded-xl shadow-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <Icon
                    className={`w-3 h-3 sm:w-3.5 sm:h-4 ${isActive ? "text-white" : ""}`}
                  />
                  <span className="max-sm:hidden">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && !isActive && (
                    <span className="ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs bg-gray-100 text-gray-600 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Modern Score Card Component ────────────────────────────────────────
interface ModernScoreCardProps {
  score: number;
  grade?: string;
  verdict?: string;
  readyToApply?: boolean;
  readyToApplyVerdict?: string;
}

const ModernScoreCard: React.FC<ModernScoreCardProps> = ({
  score,
  grade,
  verdict,
  readyToApply,
  readyToApplyVerdict,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl translate-y-48 -translate-x-48" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/80 mb-1 sm:mb-2 tracking-wider">
              OVERALL ATS SCORE
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {score}%
            </div>
            <div className="w-48 sm:w-64 md:w-80 h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          <div className="text-center md:text-right space-y-2 sm:space-y-3">
            <div className="space-y-1">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-xl md:text-2xl font-bold"
              >
                Grade: {grade || "N/A"}
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs sm:text-sm text-white/80"
              >
                {verdict || ""}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Apply Verdict */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 border ${
          readyToApply
            ? "bg-emerald-50 border-emerald-200"
            : "bg-orange-50 border-orange-200"
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={`p-2 sm:p-2.5 rounded-lg shrink-0 ${
              readyToApply ? "bg-emerald-100" : "bg-orange-100"
            }`}
          >
            {readyToApply ? (
              <FiCheckCircle
                className={`w-4 h-4 sm:w-5 sm:h-5 ${readyToApply ? "text-emerald-600" : "text-orange-600"}`}
              />
            ) : (
              <FiAlertCircle
                className={`w-4 h-4 sm:w-5 sm:h-5 ${readyToApply ? "text-emerald-600" : "text-orange-600"}`}
              />
            )}
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold mb-1 ${
                readyToApply ? "text-emerald-900" : "text-orange-900"
              }`}
            >
              {readyToApply ? "✓ Ready to Apply" : "⚠ Not Ready to Apply"}
            </h4>
            <p
              className={`text-xs sm:text-sm ${
                readyToApply ? "text-emerald-700" : "text-orange-700"
              }`}
            >
              {readyToApplyVerdict}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── AI Analysis Component ──────────────────────────────────────────────
interface AIAnalysisComponentProps {
  aiAnalysis?: AIAnalysis;
}

const AIAnalysisComponent: React.FC<AIAnalysisComponentProps> = ({
  aiAnalysis,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!aiAnalysis) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Content Strengths */}
      {aiAnalysis.content_strengths &&
        aiAnalysis.content_strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 bg-emerald-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-emerald-900">
                Content Strengths
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {aiAnalysis.content_strengths.map((strength, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-emerald-100"
                >
                  <FiThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                    {strength}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      {/* Overall Assessment */}
      {aiAnalysis.overall_assessment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg">
              <LuBrain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900">
              AI Assessment
            </h3>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
            {aiAnalysis.overall_assessment}
          </p>
        </motion.div>
      )}

      {/* Summary Rewrite */}
      {aiAnalysis.summary_rewrite && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "summary" ? null : "summary",
              )
            }
            className="w-full text-left p-4 sm:p-5 hover:bg-gray-50 transition-colors border-b border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  Professional Summary Rewrite
                </h3>
              </div>
              <motion.div
                animate={{ rotate: expandedSection === "summary" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-1 rounded-full bg-gray-100"
              >
                <HiOutlineChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {expandedSection === "summary" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 border-t border-gray-200">
                  {/* Current */}
                  <div className="space-y-2">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                      Current Summary
                    </span>
                    <p className="p-3 sm:p-4 bg-red-50 border border-red-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                      {aiAnalysis.summary_rewrite.current}
                    </p>
                  </div>

                  {/* Suggested */}
                  <div className="space-y-2">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                      AI Suggested Version
                    </span>
                    <p className="p-3 sm:p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                      {aiAnalysis.summary_rewrite.suggested}
                    </p>
                  </div>

                  {/* Why Better */}
                  {aiAnalysis.summary_rewrite.why_better && (
                    <div className="p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-lg space-y-1.5">
                      <span className="text-[9px] sm:text-[10px] font-semibold text-blue-700 uppercase tracking-wider block">
                        Why It's Better
                      </span>
                      <p className="text-[10px] sm:text-xs text-blue-700">
                        {aiAnalysis.summary_rewrite.why_better}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Bullet Rewrites */}
      {aiAnalysis.bullet_rewrites && aiAnalysis.bullet_rewrites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              Bullet Point Rewrites
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {aiAnalysis.bullet_rewrites.map((rewrite, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4"
              >
                {/* Original */}
                <div className="space-y-1.5">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider block">
                    Original Bullet
                  </span>
                  <p className="p-2 sm:p-3 bg-red-50 border border-red-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                    "{rewrite.original}"
                  </p>
                </div>

                {/* Rewritten */}
                <div className="space-y-1.5">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block">
                    ✓ Rewritten Version
                  </span>
                  <p className="p-2 sm:p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                    "{rewrite.rewritten}"
                  </p>
                </div>

                {/* Why Better */}
                {rewrite.why_better && (
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <IoBulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-[9px] sm:text-[10px] text-blue-700">
                      <span className="font-semibold">Why: </span>
                      {rewrite.why_better}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Priority Action Plan */}
      {aiAnalysis.priority_action_plan &&
        aiAnalysis.priority_action_plan.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 border border-indigo-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 bg-indigo-100 rounded-lg">
                <FiMap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-indigo-900">
                Priority Action Plan
              </h3>
            </div>
            <ol className="space-y-2 sm:space-y-3">
              {aiAnalysis.priority_action_plan.map((action, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-indigo-100"
                >
                  <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-600 text-white text-[10px] sm:text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 pt-0.5">
                    {action}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
    </div>
  );
};

// ─── Section Analysis Detail Component ──────────────────────────────────────
interface SectionAnalysisDetailProps {
  data: SectionAnalysisData | null | undefined;
}

const SectionAnalysisDetail: React.FC<SectionAnalysisDetailProps> = ({
  data,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  if (!data) {
    return (
      <div className="text-center py-8 sm:py-10 md:py-12 text-gray-500">
        <FiInfo className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
        <p className="text-xs sm:text-sm">No section analysis available</p>
      </div>
    );
  }

  const sections = Object.entries(data).filter(
    ([_, sectionData]) =>
      sectionData && (sectionData.is_present || sectionData.target_score),
  );

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const getGradeColor = (grade?: string): string => {
    if (!grade) return "text-gray-600 bg-gray-100";
    const colors: Record<string, string> = {
      "A+": "text-emerald-600 bg-emerald-100",
      A: "text-emerald-600 bg-emerald-100",
      "A-": "text-emerald-600 bg-emerald-100",
      "B+": "text-blue-600 bg-blue-100",
      B: "text-blue-600 bg-blue-100",
      "B-": "text-blue-600 bg-blue-100",
      "C+": "text-yellow-600 bg-yellow-100",
      C: "text-yellow-600 bg-yellow-100",
      F: "text-red-600 bg-red-100",
    };
    return colors[grade] || "text-gray-600 bg-gray-100";
  };

  const getSectionIcon = (sectionName: string): React.ReactElement => {
    const icons: Record<string, React.ElementType> = {
      contact: FiUser,
      summary: FiFileText,
      experience: FiBriefcase,
      education: FiBookOpen,
      skills: FiStar,
      projects: FiLayout,
      certifications: FiAward,
      languages: FiSearch,
    };
    const Icon = icons[sectionName?.toLowerCase()] || FiInfo;
    return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />;
  };

  const getStatusColor = (status?: string, isPresent?: boolean): string => {
    if (!isPresent) return "bg-red-100 text-red-700";
    if (status === "excellent") return "bg-emerald-100 text-emerald-700";
    if (status === "good") return "bg-blue-100 text-blue-700";
    if (status === "needs_improvement") return "bg-yellow-100 text-yellow-700";
    if (status === "missing") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {sections.map(([sectionName, sectionData], index) => {
        if (!sectionData) return null;
        const isExpanded = expandedSections[sectionName] || false;
        const hasQuickWins =
          sectionData.quick_wins && sectionData.quick_wins.length > 0;
        const hasMissing =
          sectionData.missing_elements &&
          sectionData.missing_elements.length > 0;
        const hasElements =
          sectionData.elements_to_remove &&
          sectionData.elements_to_remove.length > 0;
        const hasStrengths =
          sectionData.strengths && sectionData.strengths.length > 0;

        return (
          <motion.div
            key={sectionName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.1, 0.5) }}
            className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(sectionName)}
              className="w-full text-left px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg ${getGradeColor(sectionData.grade)}`}
                  >
                    {getSectionIcon(sectionName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 capitalize">
                      {sectionName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                      <span
                        className={`text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded inline-block ${getStatusColor(sectionData.status, sectionData.is_present)}`}
                      >
                        {sectionData.status === "missing" ||
                        !sectionData.is_present
                          ? "Missing"
                          : sectionData.status?.replace(/_/g, " ") || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="text-right">
                    <div
                      className={`text-base sm:text-lg md:text-xl font-bold ${getGradeColor(sectionData.grade)}`}
                    >
                      {sectionData.grade || "N/A"}
                    </div>
                    <div
                      className={`text-[9px] sm:text-[10px] md:text-xs font-medium mt-0.5`}
                    >
                      {sectionData.score}/
                      {sectionData.target_score || sectionData.score}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-full bg-gray-100 shrink-0"
                  >
                    <HiOutlineChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 border-t border-gray-100">
                    {/* Strengths */}
                    {hasStrengths && (
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Strengths
                          </span>
                        </div>
                        <div className="space-y-1 pl-4 sm:pl-5">
                          {sectionData.strengths?.map((strength, idx) => (
                            <p
                              key={idx}
                              className="text-[10px] sm:text-xs text-gray-700"
                            >
                              • {strength}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Wins */}
                    {hasQuickWins && (
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <FiThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Quick Wins ({sectionData.quick_wins?.length})
                          </span>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2 bg-emerald-50/50 rounded-lg p-1.5 sm:p-2">
                          {sectionData.quick_wins?.map((win, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-gray-700 p-1 hover:bg-emerald-50 rounded transition-colors"
                            >
                              <span className="text-emerald-600 font-bold mt-0.5 shrink-0">
                                ✓
                              </span>
                              <div>
                                {typeof win === "string" ? (
                                  <p>{win}</p>
                                ) : (
                                  <>
                                    <p>{win.action}</p>
                                    {win.estimated_gain && (
                                      <p className="text-emerald-600 text-[8px] sm:text-[9px] font-medium">
                                        +{win.estimated_gain} pts
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Missing Elements */}
                    {hasMissing && (
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Missing Elements
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {sectionData.missing_elements?.map((element, idx) => (
                            <span
                              key={idx}
                              className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-lg border border-red-100 bg-red-50 text-red-700"
                            >
                              {typeof element === "string"
                                ? element
                                : element.element || element.name || "Unknown"}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Elements to Remove */}
                    {hasElements && (
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <FiXCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Remove These
                          </span>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2 bg-orange-50/50 rounded-lg p-1.5 sm:p-2">
                          {sectionData.elements_to_remove?.map(
                            (element, idx) => (
                              <div
                                key={idx}
                                className="text-[9px] sm:text-[10px] text-gray-700 p-1"
                              >
                                {typeof element === "string" ? (
                                  <p>{element}</p>
                                ) : (
                                  <>
                                    <p className="font-semibold text-orange-700">
                                      {element.element || element.name}
                                    </p>
                                    {element.why && (
                                      <p className="text-gray-600 text-[8px] sm:text-[9px] mt-0.5">
                                        {element.why}
                                      </p>
                                    )}
                                    {element.action && (
                                      <p className="text-emerald-700 text-[8px] sm:text-[9px] font-medium mt-0.5">
                                        → {element.action}
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Rewrite Examples */}
                    {sectionData.rewrite_examples &&
                      sectionData.rewrite_examples.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-100">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <FiEdit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                            <span className="text-[9px] sm:text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                              Rewrite Examples
                            </span>
                          </div>
                          <div className="space-y-2">
                            {sectionData.rewrite_examples.map(
                              (example, idx) => (
                                <div key={idx} className="space-y-1">
                                  <p className="text-[8px] sm:text-[9px] text-red-700 line-through">
                                    Before: {example.before}
                                  </p>
                                  <p className="text-[8px] sm:text-[9px] text-emerald-700 font-medium">
                                    After: {example.after}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// // ─── Recruiter Tips Component ───────────────────────────────────────────
interface RecruiterTipsProps {
  tips?: string[];
  atsTactics?: string[];
}

const RecruiterTips: React.FC<RecruiterTipsProps> = ({ tips, atsTactics }) => {
  if (!tips && !atsTactics) return null;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ATS Passing Tactics */}
      {atsTactics && atsTactics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg">
              <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900">
              ATS Passing Tactics
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {atsTactics.map((tactic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-blue-100"
              >
                <div className="p-1 sm:p-1.5 bg-blue-100 rounded shrink-0 mt-0.5">
                  <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                  {tactic}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recruiter Tips */}
      {tips && tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="p-2 sm:p-2.5 bg-purple-100 rounded-lg">
              <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-900">
              Recruiter Tips
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-purple-100"
              >
                <div className="p-1 sm:p-1.5 bg-purple-100 rounded shrink-0 mt-0.5">
                  <FiInfo className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ─── Contact Card Component ──────────────────────────────────────────
interface ContactCardProps {
  contact?: ContactDetected;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  if (!contact || contact.score === 0) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "excellent":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 ${getStatusColor(contact.status)}`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 bg-current rounded-lg">
            <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold">
              Contact Information
            </h3>
            <p className="text-[9px] sm:text-[10px] opacity-75">
              {contact.score}% Complete
            </p>
          </div>
        </div>
        <span className="text-xs sm:text-sm font-bold">
          {contact.status?.toUpperCase()}
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
        {contact.name && (
          <div className="flex items-center gap-2">
            <FiUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span>{contact.name}</span>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-2">
            <FiMail className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center gap-2">
            <FiPhone className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.linkedin && (
          <div className="flex items-center gap-2">
            <FiLinkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span className="truncate">{contact.linkedin}</span>
          </div>
        )}
        {contact.github && (
          <div className="flex items-center gap-2">
            <FiGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span className="truncate">{contact.github}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────
const ATSCheckerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "ai" | "sections" | "roadmap" | "tips" | "edit"
  >("overview");

  usePreventReload();

  useEffect(() => {
    if (file && !uploading && !loading) {
      analyzeResume();
    }
  }, [file]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAtsResults(null);
    setActiveTab("overview");
    setError(null);
  };

  const analyzeResume = async () => {
    if (!file) return;
    setUploading(true);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<ATSResults>(
        `https://ai.aryuacademy.com/api/v1/ats/scan-file`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      setAtsResults(response?.data);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to analyze resume";
      setError(errorMsg);
      console.error(err);
      setFile(null);
    } finally {
      setUploading(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const atsScore = atsResults?.ats_score || 0;
  const totalSections = atsResults?.section_analysis
    ? Object.keys(atsResults.section_analysis).length
    : 0;

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: FiEye },
    { id: "ai", label: "AI Analysis", icon: FaBrain },
    {
      id: "sections",
      label: "Section Details",
      icon: FiLayers,
      badge: totalSections,
    },
    { id: "tips", label: "Tips", icon: FiMessageSquare },
    { id: "edit", label: "Edit Resume", icon: FiEdit3 }, // ← add this
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <section className="relative pt-14 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full mb-4 sm:mb-6 border border-indigo-200 backdrop-blur-sm"
            >
              <FaBrain className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700">
                AI-Powered ATS Checker
              </span>
              <HiOutlineSparkles className="w-2 h-2 sm:w-2.5 sm:h-3 text-indigo-600" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2"
            >
              <span className="text-gray-900">Optimize Your Resume</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                From Applied to Interviewed
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-3"
            >
              Most resumes get rejected before HR even sees them. Upload yours
              and let AI fix what's stopping you from getting shortlisted.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className="mx-auto"
          >
            {!file || !atsResults ? (
              <div className="bg-white max-w-3xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-5 md:p-7">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 ${
                      dragActive
                        ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />

                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-flex p-4 sm:p-5 md:p-6 bg-indigo-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
                      >
                        <FiUpload className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-indigo-600" />
                      </motion.div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
                        Drag & drop or{" "}
                        <label
                          htmlFor="resume-upload"
                          className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                        >
                          browse
                        </label>
                      </p>

                      {error && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
                          {error}
                        </div>
                      )}

                      <div className="space-y-3 sm:space-y-4">
                        <label
                          htmlFor="resume-upload"
                          className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-xs sm:text-sm"
                        >
                          <FiUpload className="w-3.5 h-3.5 sm:w-4 sm:h-5" />
                          Choose File
                        </label>
                        <p className="text-[9px] sm:text-xs text-gray-500">
                          Upload PDF only (Max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white max-w-6xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 py-3 sm:py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg sm:rounded-xl">
                          <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-indigo-600" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-900">
                            ATS Analysis Results
                          </span>
                          <p className="text-[9px] sm:text-[10px] text-gray-500">
                            {atsResults?.summary?.grade} •{" "}
                            {atsResults?.summary?.ats_verdict}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-all duration-500 hover:scale-105"
                    >
                      <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Analyze New Resume
                    </button>
                  </div>

                  <div>
                    <ModernTabs
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      tabs={tabs}
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-5 sm:space-y-6 md:space-y-8">
                          <ModernScoreCard
                            score={atsScore}
                            grade={atsResults?.grade}
                            verdict={atsResults?.score_status}
                            readyToApply={atsResults?.ready_to_apply}
                            readyToApplyVerdict={
                              atsResults?.ready_to_apply_verdict
                            }
                          />
                          <ContactCard contact={atsResults?.contact_detected} />
                        </div>
                      )}

                      {activeTab === "ai" && (
                        <AIAnalysisComponent
                          aiAnalysis={atsResults?.ai_analysis}
                        />
                      )}

                      {activeTab === "sections" && (
                        <SectionAnalysisDetail
                          data={atsResults?.section_analysis}
                        />
                      )}

                      {activeTab === "tips" && (
                        <div className="space-y-4 sm:space-y-6">
                          <RecruiterTips
                            tips={atsResults?.recommendations?.recruiter_tips}
                            atsTactics={
                              atsResults?.recommendations?.ats_passing_tactics
                            }
                          />
                        </div>
                      )}

                      {activeTab === "edit" && (
                        <EditResumeTab
                          uploadedFileText={
                            atsResults?.meta?.uploaded_file ?? ""
                          }
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={removeFile}
                      className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
                    >
                      <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      Analyze New Resume
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ATSCheckerPage;
