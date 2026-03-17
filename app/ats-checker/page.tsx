// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Header from "../components/layouts/Header";
// import Footer from "../components/layouts/Footer";
// import {
//   Upload,
//   FileText,
//   Award,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Loader2,
//   Star,
//   Target,
//   Zap,
//   Shield,
//   BarChart3,
//   Sparkles,
//   ChevronRight,
//   Clock,
//   Percent,
//   FileCheck,
//   Brain,
//   Rocket,
//   Users,
//   Building2,
//   GraduationCap,
//   Briefcase,
//   Download,
//   Share2,
//   BookmarkPlus,
//   Info,
// } from "lucide-react";
// import axios from "axios";

// const SectionAnalysisDisplay = ({ sectionAnalysis }) => {
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "high":
//         return "bg-red-100 text-red-700 border-red-200";
//       case "medium":
//         return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       case "low":
//         return "bg-blue-100 text-blue-700 border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "excellent":
//         return "text-green-600 bg-green-50";
//       case "good":
//         return "text-blue-600 bg-blue-50";
//       case "average":
//         return "text-yellow-600 bg-yellow-50";
//       case "poor":
//         return "text-red-600 bg-red-50";
//       default:
//         return "text-gray-600 bg-gray-50";
//     }
//   };

//   if (!sectionAnalysis || sectionAnalysis.length === 0) return null;

//   return (
//     <div className="mt-6">
//       <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//         <FileText className="w-5 h-5 text-[#c40116]" />
//         Detailed Section Analysis
//       </h4>

//       <div className="space-y-4">
//         {sectionAnalysis.map((section, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
//           >
//             {/* Section Header - Clickable */}
//             <div
//               className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === section.section ? null : section.section,
//                 )
//               }
//             >
//               <div className="flex items-center gap-4 flex-1">
//                 {/* Section Icon */}
//                 <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                   {section.section === "experience" && (
//                     <Briefcase className="w-5 h-5 text-[#c40116]" />
//                   )}
//                   {section.section === "education" && (
//                     <GraduationCap className="w-5 h-5 text-[#c40116]" />
//                   )}
//                   {section.section === "skills" && (
//                     <Zap className="w-5 h-5 text-[#c40116]" />
//                   )}
//                   {section.section === "summary" && (
//                     <FileText className="w-5 h-5 text-[#c40116]" />
//                   )}
//                   {section.section === "projects" && (
//                     <Rocket className="w-5 h-5 text-[#c40116]" />
//                   )}
//                 </div>

//                 {/* Section Name and Score */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-1">
//                     <h5 className="font-medium text-gray-900 capitalize">
//                       {section.section.replace("_", " ")}
//                     </h5>
//                     <span
//                       className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(section.status)}`}
//                     >
//                       {section.status}
//                     </span>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="flex items-center gap-3">
//                     <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${section.score}%` }}
//                         transition={{ delay: idx * 0.1 }}
//                         className={`h-full rounded-full ${
//                           section.score >= 80
//                             ? "bg-green-500"
//                             : section.score >= 60
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                         }`}
//                       />
//                     </div>
//                     <span
//                       className={`text-sm font-medium ${
//                         section.score >= 80
//                           ? "text-green-600"
//                           : section.score >= 60
//                             ? "text-yellow-600"
//                             : "text-red-600"
//                       }`}
//                     >
//                       {section.score}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* Expand/Collapse Icon */}
//                 <ChevronRight
//                   className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
//                     expandedSection === section.section ? "rotate-90" : ""
//                   }`}
//                 />
//               </div>
//             </div>

//             {/* Expanded Content - Issues and Suggestions */}
//             <AnimatePresence>
//               {expandedSection === section.section && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="border-t border-gray-100 bg-gray-50/50"
//                 >
//                   <div className="p-4 space-y-4">
//                     {/* Issues */}
//                     {section.issues && section.issues.length > 0 && (
//                       <div>
//                         <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                           <AlertCircle className="w-4 h-4 text-red-500" />
//                           Issues Found
//                         </h6>
//                         <div className="space-y-2">
//                           {section.issues.map((issue, issueIdx) => (
//                             <div
//                               key={issueIdx}
//                               className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}
//                             >
//                               <div className="flex items-start gap-2">
//                                 <div className="mt-0.5">
//                                   {issue.severity === "high" && (
//                                     <AlertCircle className="w-4 h-4 text-red-500" />
//                                   )}
//                                   {issue.severity === "medium" && (
//                                     <AlertCircle className="w-4 h-4 text-yellow-500" />
//                                   )}
//                                   {issue.severity === "low" && (
//                                     <AlertCircle className="w-4 h-4 text-blue-500" />
//                                   )}
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="text-sm text-gray-800">
//                                     {issue.message}
//                                   </p>
//                                   {issue.suggestion && (
//                                     <p className="text-xs text-gray-600 mt-1">
//                                       <span className="font-medium">
//                                         Suggestion:
//                                       </span>{" "}
//                                       {issue.suggestion}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Suggestions Array */}
//                     {section.suggestions && section.suggestions.length > 0 && (
//                       <div>
//                         <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                           <Sparkles className="w-4 h-4 text-[#c40116]" />
//                           Improvement Suggestions
//                         </h6>
//                         <div className="space-y-2">
//                           {section.suggestions.map(
//                             (suggestion, suggestionIdx) => (
//                               <div
//                                 key={suggestionIdx}
//                                 className="flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-100"
//                               >
//                                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
//                                 <span className="text-sm text-gray-700">
//                                   {suggestion}
//                                 </span>
//                               </div>
//                             ),
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* If no issues or suggestions */}
//                     {(!section.issues || section.issues.length === 0) &&
//                       (!section.suggestions ||
//                         section.suggestions.length === 0) && (
//                         <div className="text-center py-4">
//                           <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
//                             <CheckCircle className="w-4 h-4 text-green-500" />
//                             <span className="text-sm text-green-700">
//                               No issues found in this section!
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Add this component inside your ATSCheckerPage
// const IssuesDisplay = ({ issues }) => {
//   const [expandedSeverity, setExpandedSeverity] = useState<string | null>(null);

//   const severityConfig = {
//     critical: {
//       icon: AlertCircle,
//       color: "text-red-600",
//       bg: "bg-red-50",
//       border: "border-red-200",
//       hover: "hover:bg-red-100",
//       label: "Critical Issues",
//     },
//     high: {
//       icon: AlertCircle,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//       border: "border-orange-200",
//       hover: "hover:bg-orange-100",
//       label: "High Priority",
//     },
//     medium: {
//       icon: AlertCircle,
//       color: "text-yellow-600",
//       bg: "bg-yellow-50",
//       border: "border-yellow-200",
//       hover: "hover:bg-yellow-100",
//       label: "Medium Priority",
//     },
//     low: {
//       icon: Info,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//       hover: "hover:bg-blue-100",
//       label: "Low Priority",
//     },
//   };

//   const getSectionIcon = (section: string) => {
//     switch (section) {
//       case "experience":
//         return <Briefcase className="w-4 h-4" />;
//       case "education":
//         return <GraduationCap className="w-4 h-4" />;
//       case "skills":
//         return <Zap className="w-4 h-4" />;
//       case "summary":
//         return <FileText className="w-4 h-4" />;
//       default:
//         return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   // Filter out empty severity groups
//   const nonEmptySeverities = Object.entries(issues).filter(
//     ([_, issueList]) => issueList && issueList.length > 0,
//   ) as [string, Issue[]][];

//   if (nonEmptySeverities.length === 0) return null;

//   // Calculate total issues count
//   const totalIssues = nonEmptySeverities.reduce(
//     (acc, [_, issueList]) => acc + issueList.length,
//     0,
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden"
//     >
//       {/* Header with Summary */}
//       <div className="p-4 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <AlertCircle className="w-5 h-5 text-[#c40116]" />
//             <h4 className="font-semibold text-gray-900">
//               Issues Found ({totalIssues})
//             </h4>
//           </div>
//           <div className="flex gap-2">
//             {nonEmptySeverities.map(([severity, issueList]) => (
//               <span
//                 key={severity}
//                 className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   severity === "critical"
//                     ? "bg-red-100 text-red-700"
//                     : severity === "high"
//                       ? "bg-orange-100 text-orange-700"
//                       : severity === "medium"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-blue-100 text-blue-700"
//                 }`}
//               >
//                 {severity}: {issueList.length}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Issues by Severity */}
//       <div className="divide-y divide-gray-100">
//         {nonEmptySeverities.map(([severity, issueList]) => {
//           const config =
//             severityConfig[severity as keyof typeof severityConfig];
//           const Icon = config.icon;
//           const isExpanded = expandedSeverity === severity;

//           return (
//             <div key={severity} className="overflow-hidden">
//               {/* Severity Header - Clickable */}
//               <div
//                 onClick={() =>
//                   setExpandedSeverity(isExpanded ? null : severity)
//                 }
//                 className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${config.hover}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${config.bg}`}>
//                     <Icon className={`w-4 h-4 ${config.color}`} />
//                   </div>
//                   <div>
//                     <h5 className="font-medium text-gray-900">
//                       {config.label}
//                     </h5>
//                     <p className="text-xs text-gray-500">
//                       {issueList.length} issue(s)
//                     </p>
//                   </div>
//                 </div>
//                 <ChevronRight
//                   className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
//                     isExpanded ? "rotate-90" : ""
//                   }`}
//                 />
//               </div>

//               {/* Issues List - Expandable */}
//               <AnimatePresence>
//                 {isExpanded && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="border-t border-gray-100"
//                   >
//                     <div className="p-4 space-y-3">
//                       {issueList.map((issue, idx) => (
//                         <motion.div
//                           key={idx}
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: idx * 0.1 }}
//                           className={`p-3 rounded-lg border ${config.border} ${config.bg}/30`}
//                         >
//                           <div className="flex items-start gap-3">
//                             {/* Section Icon */}
//                             <div
//                               className={`p-1.5 rounded-lg ${config.bg} mt-0.5`}
//                             >
//                               {getSectionIcon(issue.section)}
//                             </div>

//                             <div className="flex-1">
//                               {/* Section and Impact */}
//                               <div className="flex items-center gap-2 mb-1">
//                                 <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
//                                   {issue.section}
//                                 </span>
//                                 {issue.impact && (
//                                   <span
//                                     className={`text-xs px-2 py-0.5 rounded-full ${
//                                       issue.impact >= 9
//                                         ? "bg-red-100 text-red-700"
//                                         : issue.impact >= 7
//                                           ? "bg-orange-100 text-orange-700"
//                                           : issue.impact >= 5
//                                             ? "bg-yellow-100 text-yellow-700"
//                                             : "bg-blue-100 text-blue-700"
//                                     }`}
//                                   >
//                                     Impact: {issue.impact}/10
//                                   </span>
//                                 )}
//                               </div>

//                               {/* Message */}
//                               <p className="text-sm text-gray-800 mb-2">
//                                 {issue.message}
//                               </p>

//                               {/* Suggestion */}
//                               {issue.suggestion && (
//                                 <div className="flex items-start gap-2 mt-2 p-2 bg-white rounded-lg border border-gray-100">
//                                   <Sparkles className="w-3 h-3 text-[#c40116] mt-0.5 shrink-0" />
//                                   <p className="text-xs text-gray-600">
//                                     <span className="font-medium">
//                                       Suggestion:
//                                     </span>{" "}
//                                     {issue.suggestion}
//                                   </p>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// };

// const ATSCheckerPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [results, setResults] = useState<null | {
  
//     keywords: {
//       word: string;
//       count: number;
//       importance: "high" | "medium" | "low";
//     }[];
   
//   }>(null);
//   const [atsResults, setAtsResults] = useState({});
//   const [dragActive, setDragActive] = useState(false);
//   const [activeTab, setActiveTab] = useState<"overview" | "keywords">(
//     "overview",
//   );

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const droppedFile = e.dataTransfer.files[0];
//     if (
//       droppedFile &&
//       (droppedFile.type === "application/pdf" ||
//         droppedFile.type === "application/msword" ||
//         droppedFile.type ===
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
//     ) {
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
//     setResults(null);
//     setActiveTab("overview");
//   };

//   const analyzeResume = async () => {
//     if (!file) return;

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/ats/scan`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       // console.log("response",response.data)
//       setAtsResults(response?.data?.data);

//       // Simulate API call with realistic data
//       setResults({
//         keywords: [
//           { word: "JavaScript", count: 8, importance: "high" },
//           { word: "React", count: 6, importance: "high" },
//           { word: "Node.js", count: 4, importance: "medium" },
//           { word: "TypeScript", count: 3, importance: "high" },
//           { word: "Next.js", count: 2, importance: "medium" },
//           { word: "Team Leadership", count: 3, importance: "high" },
//           { word: "Agile", count: 5, importance: "medium" },
//           { word: "CI/CD", count: 2, importance: "low" },
//           { word: "REST APIs", count: 4, importance: "medium" },
//           { word: "MongoDB", count: 2, importance: "low" },
//         ],
        
//       });

//       setUploading(false);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   console.log("results", results);
//   console.log("atsResults", atsResults);

//   return (
//     <>
//       <Header />

//       {/* Hero Section with Red Theme */}
//       <section className="relative pt-28 pb-20 overflow-hidden">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />

//         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20"
//             >
//               <Brain className="w-4 h-4 text-[#c40116]" />
//               <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 AI-Powered ATS Analysis
//               </span>
//               <Sparkles className="w-3 h-3 text-[#c40116]" />
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
//             >
//               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Optimize Your Resume
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 Beat the ATS Bots
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
//             >
//               Get past automated screens and land more interviews with our
//               advanced AI-powered ATS resume checker. 95% of resumes never reach
//               human eyes.
//             </motion.p>

//             {/* Trust Badges */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-wrap items-center justify-center gap-8 mb-12"
//             >
//               {[
//                 {
//                   icon: Users,
//                   label: "Trusted by",
//                   value: "50,000+ job seekers",
//                 },
//                 {
//                   icon: Building2,
//                   label: "Used at",
//                   value: "2,500+ companies",
//                 },
//                 {
//                   icon: GraduationCap,
//                   label: "Recommended by",
//                   value: "200+ career coaches",
//                 },
//               ].map((stat, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <div className="p-2.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                     <stat.icon className="w-5 h-5 text-[#c40116]" />
//                   </div>
//                   <div className="text-left">
//                     <div className="text-sm text-gray-500">{stat.label}</div>
//                     <div className="font-semibold text-gray-900">
//                       {stat.value}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="max-w-4xl mx-auto"
//           >
//             <div className="bg-white rounded-3xl shadow-[0_20px_70px_-15px_rgba(196,1,22,0.2)] border border-[#c40116]/10 overflow-hidden backdrop-blur-xl">
//               {/* Card Header with Tabs */}
//               <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50 px-6 py-4">
//                 <div className="flex items-center gap-2">
//                   <FileCheck className="w-5 h-5 text-[#c40116]" />
//                   <span className="font-semibold text-gray-900">
//                     ATS Resume Analyzer
//                   </span>
//                 </div>

//                 {results && (
//                   <div className="flex gap-4 mt-4">
//                     {["overview", "keywords"].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab as any)}
//                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
//                           activeTab === tab
//                             ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md"
//                             : "text-gray-600 hover:bg-gray-100"
//                         }`}
//                       >
//                         {tab}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Content Area */}
//               <div className="p-8">
//                 {!results ? (
//                   <>
//                     {/* Upload Area */}
//                     <div
//                       onDragEnter={handleDrag}
//                       onDragLeave={handleDrag}
//                       onDragOver={handleDrag}
//                       onDrop={handleDrop}
//                       className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 ${
//                         dragActive
//                           ? "border-[#c40116] bg-[#c40116]/5"
//                           : file
//                             ? "border-green-500 bg-green-50/30"
//                             : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
//                       }`}
//                     >
//                       <input
//                         type="file"
//                         id="resume-upload"
//                         className="hidden"
//                         accept=".pdf"
//                         onChange={handleFileChange}
//                       />

//                       {!file ? (
//                         <div className="text-center">
//                           <motion.div
//                             animate={{ y: [0, -10, 0] }}
//                             transition={{ repeat: Infinity, duration: 3 }}
//                             className="inline-flex p-5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-6"
//                           >
//                             <Upload className="w-10 h-10 text-[#c40116]" />
//                           </motion.div>
//                           <h3 className="text-xl font-bold text-gray-900 mb-2">
//                             Drag & Drop Your Resume
//                           </h3>
//                           <p className="text-gray-500 mb-6">
//                             or{" "}
//                             <label
//                               htmlFor="resume-upload"
//                               className="text-[#c40116] font-medium cursor-pointer hover:underline"
//                             >
//                               browse files
//                             </label>
//                           </p>
//                           <div className="flex items-center justify-center gap-4 mb-6">
//                             <div className="flex -space-x-3">
//                               <img
//                                 src="/icons/ats-circleimage1.svg"
//                                 alt=""
//                                 className="w-11 h-11"
//                               />
//                               <img
//                                 src="/icons/ats-circleimage2.svg"
//                                 alt=""
//                                 className="w-11 h-11"
//                               />
//                               <img
//                                 src="/icons/ats-circleimage3.svg"
//                                 alt=""
//                                 className="w-11 h-11"
//                               />
//                             </div>
//                             <span className="text-sm text-gray-500">
//                               500+ resumes analyzed today
//                             </span>
//                           </div>
//                           <label
//                             htmlFor="resume-upload"
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
//                           >
//                             <Upload className="w-4 h-4" />
//                             Choose File
//                           </label>
//                           <p className="text-xs text-gray-400 mt-4">
//                             Supports PDF only
//                           </p>
//                         </div>
//                       ) : (
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="flex items-center justify-between"
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className="p-3 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                               <FileText className="w-8 h-8 text-[#c40116]" />
//                             </div>
//                             <div>
//                               <p className="font-semibold text-gray-900">
//                                 {file.name}
//                               </p>
//                               <div className="flex items-center gap-3 mt-1">
//                                 <span className="text-sm text-gray-500">
//                                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                                 </span>
//                                 <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                                 <span className="text-sm text-green-600 flex items-center gap-1">
//                                   <CheckCircle className="w-3 h-3" />
//                                   Ready to analyze
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                           <button
//                             onClick={removeFile}
//                             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                           >
//                             <X className="w-5 h-5 text-gray-500" />
//                           </button>
//                         </motion.div>
//                       )}
//                     </div>

//                     {/* analyse btn */}
//                     {file && !results && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-6"
//                       >
//                         <button
//                           onClick={analyzeResume}
//                           disabled={uploading}
//                           className="w-full py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
//                         >
//                           {uploading ? (
//                             <>
//                               <Loader2 className="w-5 h-5 animate-spin" />
//                               Analyzing with AI...
//                             </>
//                           ) : (
//                             <>
//                               <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//                               Analyze Resume
//                               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                             </>
//                           )}
//                         </button>
//                       </motion.div>
//                     )}
//                   </>
//                 ) : (
//                   /* Results Section with Tabs */
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activeTab}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {activeTab === "overview" && (
//                         <div className="space-y-6">
//                           {/* Score Overview */}
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="col-span-1 bg-gradient-to-br from-[#c40116]/5 to-[#be0117]/5 rounded-xl p-6 border border-[#c40116]/10">
//                               <div className="text-center">
//                                 <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-3xl font-bold mb-3">
//                                   {atsResults?.ats_score}
//                                 </div>
//                                 <h4 className="font-semibold text-gray-900">
//                                   Overall ATS Score
//                                 </h4>
//                                 <p className="text-sm text-gray-500 mt-1">
//                                   {
//                                     atsResults?.summary
//                                       ?.estimated_ats_compatibility
//                                   }
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="col-span-2 grid grid-cols-2 gap-4">
//                               {[
//                                 {
//                                   icon: FileText,
//                                   label: "content_quality",
//                                   value:
//                                     atsResults?.score_breakdown
//                                       ?.content_quality,
//                                 },
//                                 {
//                                   icon: Clock,
//                                   label: "Format compliance",
//                                   value:
//                                     atsResults?.score_breakdown
//                                       ?.format_compliance,
//                                 },
//                                 {
//                                   icon: Percent,
//                                   label: "Keyword alignment",
//                                   value:
//                                     atsResults?.score_breakdown
//                                       ?.keyword_alignment,
//                                 },
//                                 {
//                                   icon: Award,
//                                   label: "Structure quality",
//                                   value:
//                                     atsResults?.score_breakdown
//                                       ?.structure_quality,
//                                 },
//                               ].map((metric, index) => (
//                                 <div
//                                   key={index}
//                                   className="bg-gray-50 rounded-xl p-4 h-fit"
//                                 >
//                                   <div className="flex items-center gap-2 mb-2">
//                                     <metric.icon className="w-4 h-4 text-[#c40116]" />
//                                     <span className="text-xs text-gray-500">
//                                       {metric.label}
//                                     </span>
//                                   </div>
//                                   <div className="text-xl font-bold text-gray-900">
//                                     {metric.value}
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Section Scores */}
//                           {atsResults?.section_analysis &&
//                             atsResults?.section_analysis.length > 0 && (
//                               <SectionAnalysisDisplay
//                                 sectionAnalysis={atsResults?.section_analysis}
//                               />
//                             )}

//                           {/* Top Suggestions */}
//                           {atsResults?.issues && (
//                             <IssuesDisplay issues={atsResults?.issues} />
//                           )}
//                         </div>
//                       )}

//                       {activeTab === "keywords" && (
//                         <div className="space-y-6">
//                           {/* Keyword Analysis */}
//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-4">
//                               Found Keywords
//                             </h4>
//                             <div className="space-y-3">
//                               {results.keywords.map((keyword, index) => (
//                                 <motion.div
//                                   key={index}
//                                   initial={{ opacity: 0, x: -10 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: index * 0.05 }}
//                                   className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
//                                 >
//                                   <div
//                                     className={`w-2 h-2 rounded-full ${
//                                       keyword.importance === "high"
//                                         ? "bg-green-500"
//                                         : keyword.importance === "medium"
//                                           ? "bg-yellow-500"
//                                           : "bg-blue-500"
//                                     }`}
//                                   />
//                                   <span className="flex-1 font-medium text-gray-900">
//                                     {keyword.word}
//                                   </span>
//                                   <span className="text-sm text-gray-500">
//                                     {keyword.count} times
//                                   </span>
//                                   <span
//                                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                       keyword.importance === "high"
//                                         ? "bg-green-100 text-green-700"
//                                         : keyword.importance === "medium"
//                                           ? "bg-yellow-100 text-yellow-700"
//                                           : "bg-blue-100 text-blue-700"
//                                     }`}
//                                   >
//                                     {keyword.importance}
//                                   </span>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Missing Keywords */}
//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                               <AlertCircle className="w-4 h-4 text-yellow-500" />
//                               Missing Keywords to Add
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                               {results.missingKeywords.map((keyword, index) => (
//                                 <motion.span
//                                   key={index}
//                                   initial={{ opacity: 0, scale: 0.9 }}
//                                   animate={{ opacity: 1, scale: 1 }}
//                                   transition={{ delay: index * 0.05 }}
//                                   className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium"
//                                 >
//                                   {keyword}
//                                 </motion.span>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   </AnimatePresence>
//                 )}
//               </div>

//               {/* Footer Actions */}
//               {results && (
//                 <div className="border-t border-gray-100 bg-gray-50/50 px-8 py-4">
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={removeFile}
//                       className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
//                     >
//                       <X className="w-4 h-4" />
//                       Analyze New Resume
//                     </button>

//                     <button className="px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2">
//                       <Rocket className="w-4 h-4" />
//                       Optimize Resume
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Social Proof */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="text-center mt-16"
//           >
//             <p className="text-sm text-gray-500 mb-4">Trusted by teams at</p>
//             <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
//               {[
//                 "Google",
//                 "Microsoft",
//                 "Amazon",
//                 "Meta",
//                 "Apple",
//                 "Netflix",
//               ].map((company) => (
//                 <span
//                   key={company}
//                   className="text-lg font-semibold text-gray-400"
//                 >
//                   {company}
//                 </span>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default ATSCheckerPage;






// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Header from "../components/layouts/Header";
// import Footer from "../components/layouts/Footer";
// import {
//   Upload,
//   FileText,
//   Award,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Loader2,
//   Star,
//   Target,
//   Zap,
//   Shield,
//   BarChart3,
//   Sparkles,
//   ChevronRight,
//   Clock,
//   Percent,
//   FileCheck,
//   Brain,
//   Rocket,
//   Users,
//   Building2,
//   GraduationCap,
//   Briefcase,
//   Download,
//   Share2,
//   BookmarkPlus,
//   Info,
//   ChevronDown,
//   Eye,
//   ThumbsUp,
//   Gift,
//   ArrowRight,
//   Globe,
//   Lock,
//   ZapOff,
// } from "lucide-react";
// import axios from "axios";

// // Types
// interface Issue {
//   message: string;
//   severity: "critical" | "high" | "medium" | "low";
//   suggestion?: string;
//   section: string;
//   impact?: number;
// }

// interface SectionAnalysis {
//   section: string;
//   score: number;
//   status: string;
//   issues?: Issue[];
//   suggestions?: string[];
// }

// interface ATSResults {
//   ats_score: number;
//   summary?: {
//     estimated_ats_compatibility: string;
//   };
//   score_breakdown?: {
//     content_quality: number;
//     format_compliance: number;
//     keyword_alignment: number;
//     structure_quality: number;
//   };
//   section_analysis?: SectionAnalysis[];
//   issues?: Record<string, Issue[]>;
// }

// const SectionAnalysisDisplay = ({ sectionAnalysis }: { sectionAnalysis: SectionAnalysis[] }) => {
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "high":
//         return "bg-red-100 text-red-700 border-red-200";
//       case "medium":
//         return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       case "low":
//         return "bg-blue-100 text-blue-700 border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "excellent":
//         return "text-green-600 bg-green-50 border-green-200";
//       case "good":
//         return "text-blue-600 bg-blue-50 border-blue-200";
//       case "average":
//         return "text-yellow-600 bg-yellow-50 border-yellow-200";
//       case "poor":
//         return "text-red-600 bg-red-50 border-red-200";
//       default:
//         return "text-gray-600 bg-gray-50 border-gray-200";
//     }
//   };

//   const getSectionIcon = (section: string) => {
//     switch (section) {
//       case "experience":
//         return <Briefcase className="w-5 h-5" />;
//       case "education":
//         return <GraduationCap className="w-5 h-5" />;
//       case "skills":
//         return <Zap className="w-5 h-5" />;
//       case "summary":
//         return <FileText className="w-5 h-5" />;
//       case "projects":
//         return <Rocket className="w-5 h-5" />;
//       default:
//         return <FileText className="w-5 h-5" />;
//     }
//   };

//   if (!sectionAnalysis || sectionAnalysis.length === 0) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mt-8"
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <FileText className="w-5 h-5 text-[#c40116]" />
//           Section-wise Analysis
//         </h4>
//         <span className="text-sm text-gray-500">{sectionAnalysis.length} sections analyzed</span>
//       </div>

//       <div className="space-y-4">
//         {sectionAnalysis.map((section, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             className="group"
//           >
//             <div
//               className={`bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#c40116]/20 ${
//                 expandedSection === section.section ? "shadow-lg border-[#c40116]/30" : ""
//               }`}
//             >
//               {/* Section Header */}
//               <div
//                 className="p-5 flex items-center justify-between cursor-pointer"
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === section.section ? null : section.section
//                   )
//                 }
//               >
//                 <div className="flex items-center gap-4 flex-1">
//                   {/* Icon with gradient background */}
//                   <div className={`p-3 rounded-xl transition-all duration-300 ${
//                     expandedSection === section.section
//                       ? "bg-gradient-to-br from-[#c40116] to-[#be0117] text-white"
//                       : "bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] group-hover:scale-110"
//                   }`}>
//                     {getSectionIcon(section.section)}
//                   </div>

//                   {/* Section Info */}
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h5 className="font-semibold text-gray-900 capitalize">
//                         {section.section.replace("_", " ")}
//                       </h5>
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(section.status)}`}>
//                         {section.status}
//                       </span>
//                     </div>

//                     {/* Progress Bar with percentage */}
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${section.score}%` }}
//                           transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
//                           className={`h-full rounded-full ${
//                             section.score >= 80
//                               ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                               : section.score >= 60
//                               ? "bg-gradient-to-r from-yellow-500 to-orange-500"
//                               : "bg-gradient-to-r from-red-500 to-rose-500"
//                           }`}
//                         />
//                       </div>
//                       <span className={`text-sm font-semibold min-w-[45px] ${
//                         section.score >= 80
//                           ? "text-green-600"
//                           : section.score >= 60
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}>
//                         {section.score}%
//                       </span>
//                     </div>
//                   </div>

//                   {/* Expand/Collapse Icon */}
//                   <motion.div
//                     animate={{ rotate: expandedSection === section.section ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className={`p-2 rounded-full transition-colors ${
//                       expandedSection === section.section
//                         ? "bg-[#c40116]/10 text-[#c40116]"
//                         : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
//                     }`}
//                   >
//                     <ChevronDown className="w-5 h-5" />
//                   </motion.div>
//                 </div>
//               </div>

//               {/* Expanded Content */}
//               <AnimatePresence>
//                 {expandedSection === section.section && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="border-t border-gray-100 bg-gray-50/50 p-5 space-y-5">
//                       {/* Issues */}
//                       {section.issues && section.issues.length > 0 && (
//                         <div>
//                           <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                             <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
//                             Issues to Address ({section.issues.length})
//                           </h6>
//                           <div className="space-y-3">
//                             {section.issues.map((issue, issueIdx) => (
//                               <motion.div
//                                 key={issueIdx}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: issueIdx * 0.1 }}
//                                 className={`p-4 rounded-xl border ${getSeverityColor(issue.severity)} bg-white`}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className="mt-0.5">
//                                     {issue.severity === "high" && (
//                                       <AlertCircle className="w-4 h-4 text-red-500" />
//                                     )}
//                                     {issue.severity === "medium" && (
//                                       <AlertCircle className="w-4 h-4 text-yellow-500" />
//                                     )}
//                                     {issue.severity === "low" && (
//                                       <Info className="w-4 h-4 text-blue-500" />
//                                     )}
//                                   </div>
//                                   <div className="flex-1">
//                                     <p className="text-sm text-gray-800 mb-2">{issue.message}</p>
//                                     {issue.suggestion && (
//                                       <div className="flex items-start gap-2 mt-2 p-3 bg-white rounded-lg border border-gray-100">
//                                         <Sparkles className="w-3 h-3 text-[#c40116] mt-0.5 shrink-0" />
//                                         <p className="text-xs text-gray-600">
//                                           <span className="font-medium">Pro tip:</span> {issue.suggestion}
//                                         </p>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Suggestions */}
//                       {section.suggestions && section.suggestions.length > 0 && (
//                         <div>
//                           <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                             <div className="w-1.5 h-1.5 rounded-full bg-[#c40116]" />
//                             Improvement Suggestions
//                           </h6>
//                           <div className="space-y-2">
//                             {section.suggestions.map((suggestion, suggestionIdx) => (
//                               <motion.div
//                                 key={suggestionIdx}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: suggestionIdx * 0.1 }}
//                                 className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#c40116]/20 transition-colors"
//                               >
//                                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
//                                 <span className="text-sm text-gray-700">{suggestion}</span>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* No Issues Found */}
//                       {(!section.issues || section.issues.length === 0) &&
//                         (!section.suggestions || section.suggestions.length === 0) && (
//                           <div className="text-center py-6">
//                             <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                               <CheckCircle className="w-4 h-4 text-green-500" />
//                               <span className="text-sm font-medium text-green-700">
//                                 This section looks great! No issues found.
//                               </span>
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// const IssuesDisplay = ({ issues }: { issues: Record<string, Issue[]> }) => {
//   const [expandedSeverity, setExpandedSeverity] = useState<string | null>(null);

//   const severityConfig = {
//     critical: {
//       icon: AlertCircle,
//       color: "text-red-600",
//       bg: "bg-red-50",
//       border: "border-red-200",
//       gradient: "from-red-500 to-rose-500",
//       lightBg: "bg-red-50/50",
//       label: "Critical Issues",
//       description: "Must fix to pass ATS filters",
//     },
//     high: {
//       icon: AlertCircle,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//       border: "border-orange-200",
//       gradient: "from-orange-500 to-red-500",
//       lightBg: "bg-orange-50/50",
//       label: "High Priority",
//       description: "Significant impact on your score",
//     },
//     medium: {
//       icon: AlertCircle,
//       color: "text-yellow-600",
//       bg: "bg-yellow-50",
//       border: "border-yellow-200",
//       gradient: "from-yellow-500 to-orange-500",
//       lightBg: "bg-yellow-50/50",
//       label: "Medium Priority",
//       description: "Moderate impact on ATS compatibility",
//     },
//     low: {
//       icon: Info,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//       gradient: "from-blue-500 to-cyan-500",
//       lightBg: "bg-blue-50/50",
//       label: "Low Priority",
//       description: "Minor improvements suggested",
//     },
//   };

//   const getSectionIcon = (section: string) => {
//     switch (section) {
//       case "experience":
//         return <Briefcase className="w-4 h-4" />;
//       case "education":
//         return <GraduationCap className="w-4 h-4" />;
//       case "skills":
//         return <Zap className="w-4 h-4" />;
//       case "summary":
//         return <FileText className="w-4 h-4" />;
//       default:
//         return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const nonEmptySeverities = Object.entries(issues).filter(
//     ([_, issueList]) => issueList && issueList.length > 0
//   ) as [string, Issue[]][];

//   if (nonEmptySeverities.length === 0) return null;

//   const totalIssues = nonEmptySeverities.reduce(
//     (acc, [_, issueList]) => acc + issueList.length,
//     0
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mt-8"
//     >
//       <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
//         {/* Header */}
//         <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                 <AlertCircle className="w-5 h-5 text-[#c40116]" />
//               </div>
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900">Issues Found ({totalIssues})</h4>
//                 <p className="text-sm text-gray-500">Address these to improve your ATS score</p>
//               </div>
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               {nonEmptySeverities.map(([severity, issueList]) => (
//                 <span
//                   key={severity}
//                   className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
//                     severity === "critical"
//                       ? "bg-red-50 text-red-700 border-red-200"
//                       : severity === "high"
//                       ? "bg-orange-50 text-orange-700 border-orange-200"
//                       : severity === "medium"
//                       ? "bg-yellow-50 text-yellow-700 border-yellow-200"
//                       : "bg-blue-50 text-blue-700 border-blue-200"
//                   }`}
//                 >
//                   {severity}: {issueList.length}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Issues by Severity */}
//         <div className="divide-y divide-gray-100">
//           {nonEmptySeverities.map(([severity, issueList]) => {
//             const config = severityConfig[severity as keyof typeof severityConfig];
//             const Icon = config.icon;
//             const isExpanded = expandedSeverity === severity;

//             return (
//               <div key={severity} className="overflow-hidden">
//                 {/* Severity Header */}
//                 <div
//                   onClick={() => setExpandedSeverity(isExpanded ? null : severity)}
//                   className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className={`p-3 rounded-xl ${config.bg}`}>
//                       <Icon className={`w-5 h-5 ${config.color}`} />
//                     </div>
//                     <div>
//                       <h5 className="font-semibold text-gray-900">{config.label}</h5>
//                       <p className="text-xs text-gray-500 mt-0.5">{config.description}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm font-medium text-gray-600">
//                       {issueList.length} issue{issueList.length > 1 ? 's' : ''}
//                     </span>
//                     <motion.div
//                       animate={{ rotate: isExpanded ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                       className={`p-1.5 rounded-full ${isExpanded ? config.bg : 'bg-gray-100'}`}
//                     >
//                       <ChevronDown className={`w-4 h-4 ${isExpanded ? config.color : 'text-gray-500'}`} />
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Issues List */}
//                 <AnimatePresence>
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <div className="px-5 pb-5 space-y-4">
//                         {issueList.map((issue, idx) => (
//                           <motion.div
//                             key={idx}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className={`p-5 rounded-xl border ${config.border} ${config.lightBg} bg-white/50 backdrop-blur-sm`}
//                           >
//                             <div className="flex items-start gap-4">
//                               {/* Section Icon */}
//                               <div className={`p-2.5 rounded-lg ${config.bg} shrink-0`}>
//                                 {getSectionIcon(issue.section)}
//                               </div>

//                               <div className="flex-1">
//                                 {/* Section and Impact */}
//                                 <div className="flex items-center gap-2 mb-2 flex-wrap">
//                                   <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
//                                     {issue.section}
//                                   </span>
//                                   {issue.impact && (
//                                     <span className={`text-xs px-2.5 py-1 rounded-full ${
//                                       issue.impact >= 9
//                                         ? "bg-red-100 text-red-700"
//                                         : issue.impact >= 7
//                                         ? "bg-orange-100 text-orange-700"
//                                         : issue.impact >= 5
//                                         ? "bg-yellow-100 text-yellow-700"
//                                         : "bg-blue-100 text-blue-700"
//                                     }`}>
//                                       Impact: {issue.impact}/10
//                                     </span>
//                                   )}
//                                 </div>

//                                 {/* Message */}
//                                 <p className="text-sm text-gray-800 mb-3">{issue.message}</p>

//                                 {/* Suggestion */}
//                                 {issue.suggestion && (
//                                   <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
//                                     <Sparkles className="w-4 h-4 text-[#c40116] mt-0.5 shrink-0" />
//                                     <p className="text-sm text-gray-600">
//                                       <span className="font-semibold">Suggestion:</span> {issue.suggestion}
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

// // Main Component
// const ATSCheckerPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [results, setResults] = useState<{
//     keywords: Array<{
//       word: string;
//       count: number;
//       importance: "high" | "medium" | "low";
//     }>;
//     missingKeywords: string[];
//   } | null>(null);
//   const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [activeTab, setActiveTab] = useState<"overview" | "keywords" >("overview");

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const droppedFile = e.dataTransfer.files[0];
//     if (
//       droppedFile &&
//       (droppedFile.type === "application/pdf" ||
//         droppedFile.type === "application/msword" ||
//         droppedFile.type ===
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
//     ) {
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
//     setResults(null);
//     setAtsResults(null);
//     setActiveTab("overview");
//   };

//   const analyzeResume = async () => {
//     if (!file) return;

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/ats/scan`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );


//       console.log("response",response)
//       setAtsResults(response?.data?.data);
//       setResults({
//         keywords: [
//           { word: "JavaScript", count: 8, importance: "high" },
//           { word: "React", count: 6, importance: "high" },
//           { word: "Node.js", count: 4, importance: "medium" },
//           { word: "TypeScript", count: 3, importance: "high" },
//           { word: "Next.js", count: 2, importance: "medium" },
//           { word: "Team Leadership", count: 3, importance: "high" },
//           { word: "Agile", count: 5, importance: "medium" },
//           { word: "CI/CD", count: 2, importance: "low" },
//           { word: "REST APIs", count: 4, importance: "medium" },
//           { word: "MongoDB", count: 2, importance: "low" },
//         ],
//         missingKeywords: ["Python", "AWS", "Docker", "Kubernetes", "GraphQL"],
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Animation variants
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const staggerChildren = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   return (
//     <>
//       <Header />
      
//       {/* Hero Section with Modern Gradient */}
//       <section className="relative pt-28 pb-20 overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
//         <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />
        
    
//         <div className="relative  mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             className="text-center max-w-4xl mx-auto"
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20 backdrop-blur-sm"
//             >
//               <Brain className="w-4 h-4 text-[#c40116]" />
//               <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 AI-Powered ATS Analysis
//               </span>
//               <Sparkles className="w-3 h-3 text-[#c40116]" />
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               variants={fadeInUp}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
//             >
//               <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//                 Optimize Your Resume
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-[#c40116] via-[#e63545] to-[#be0117] bg-clip-text text-transparent">
//                 Beat the ATS Bots
//               </span>
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               variants={fadeInUp}
//               className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
//             >
//               Get past automated screens and land more interviews with our
//               advanced AI-powered ATS resume checker. <span className="font-semibold text-[#c40116]">95% of resumes</span> never reach
//               human eyes.
//             </motion.p>

//             {/* Trust Badges */}
//             <motion.div
//               variants={staggerChildren}
//               initial="initial"
//               animate="animate"
//               className="flex flex-wrap items-center justify-center gap-8 mb-12"
//             >
//               {[
//                 { icon: Users, label: "Trusted by", value: "50,000+ job seekers", color: "from-blue-500 to-cyan-500" },
//                 { icon: Building2, label: "Used at", value: "2,500+ companies", color: "from-purple-500 to-pink-500" },
//                 { icon: GraduationCap, label: "Recommended by", value: "200+ career coaches", color: "from-green-500 to-emerald-500" },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="flex items-center gap-3 group"
//                 >
//                   <div className={`p-3 bg-gradient-to-br ${stat.color} bg-opacity-10 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
//                     <stat.icon className="w-5 h-5 text-gray-700" />
//                   </div>
//                   <div className="text-left">
//                     <div className="text-sm text-gray-500">{stat.label}</div>
//                     <div className="font-semibold text-gray-900">{stat.value}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Main Card */}
//           <motion.div
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             transition={{ delay: 0.6 }}
//             className="max-w-5xl mx-auto"
//           >
//             <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl">
//               {/* Card Header */}
//               <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                       <FileCheck className="w-5 h-5 text-[#c40116]" />
//                     </div>
//                     <span className="font-semibold text-gray-900">ATS Resume Analyzer</span>
//                   </div>
                  
                 
              

//                 {/* Tabs */}
//                 {results && (
//                   <div className="flex gap-2 mt-4">
//                     {[
//                       { id: "overview", label: "Overview", icon: Eye },
//                       { id: "keywords", label: "Keywords", icon: Zap },
//                     ].map((tab) => {
//                       const Icon = tab.icon;
//                       return (
//                         <button
//                           key={tab.id}
//                           onClick={() => setActiveTab(tab.id as any)}
//                           className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize flex items-center gap-2 ${
//                             activeTab === tab.id
//                               ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md shadow-[#c40116]/20"
//                               : "text-gray-600 hover:bg-gray-100"
//                           }`}
//                         >
//                           <Icon className="w-4 h-4" />
//                           {tab.label}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>

//               {/* Content Area */}
//               <div className="p-8">
//                 {!results ? (
//                   <>
//                     {/* Upload Area */}
//                     <div
//                       onDragEnter={handleDrag}
//                       onDragLeave={handleDrag}
//                       onDragOver={handleDrag}
//                       onDrop={handleDrop}
//                       className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
//                         dragActive
//                           ? "border-[#c40116] bg-[#c40116]/5 scale-[1.02]"
//                           : file
//                             ? "border-green-500 bg-green-50/30"
//                             : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
//                       }`}
//                     >
//                       <input
//                         type="file"
//                         id="resume-upload"
//                         className="hidden"
//                         accept=".pdf"
//                         onChange={handleFileChange}
//                       />

//                       {!file ? (
//                         <div className="text-center">
//                           <motion.div
//                             animate={{ 
//                               y: [0, -10, 0],
//                               scale: [1, 1.05, 1]
//                             }}
//                             transition={{ repeat: Infinity, duration: 3 }}
//                             className="inline-flex p-6 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-6"
//                           >
//                             <Upload className="w-12 h-12 text-[#c40116]" />
//                           </motion.div>
                          
//                           <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                             Drag & Drop Your Resume
//                           </h3>
//                           <p className="text-gray-500 mb-6">
//                             or{" "}
//                             <label
//                               htmlFor="resume-upload"
//                               className="text-[#c40116] font-medium cursor-pointer hover:underline hover:text-[#be0117] transition-colors"
//                             >
//                               browse files
//                             </label>
//                           </p>
                          
//                           <div className="flex items-center justify-center gap-4 mb-8">
//                             <div className="flex items-center justify-center gap-4 ">
//                            <div className="flex -space-x-3">
//                                <img
//                                 src="/icons/ats-circleimage1.svg"
//                                 alt=""
//                                 className="w-11 h-11"
//                               />
//                               <img
//                                 src="/icons/ats-circleimage2.svg"
//                                 alt=""
//                                 className="w-11 h-11"
//                               />
//                               <img
//                                 src="/icons/ats-circleimage3.svg"
//                                 alt=""
//                                 className="w-11 h-11"
//                               />
//                             </div>
//                             </div>
//                             <span className="text-sm text-gray-500">
//                               <span className="font-semibold text-[#c40116]">500+</span> resumes analyzed today
//                             </span>
//                           </div>

//                           <div className="space-y-4">
//                             <label
//                               htmlFor="resume-upload"
//                               className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:from-[#be0117] hover:to-[#c40116]"
//                             >
//                               <Upload className="w-4 h-4" />
//                               Choose File
//                             </label>
                            
//                             <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
//                               <span className="flex items-center gap-1">
//                                 <FileText className="w-3 h-3" /> PDF only
//                               </span>
                             
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="flex items-center justify-between"
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className="p-4 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                               <FileText className="w-10 h-10 text-[#c40116]" />
//                             </div>
//                             <div>
//                               <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
//                               <div className="flex items-center gap-3 mt-2">
//                                 <span className="text-sm text-gray-500">
//                                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                                 </span>
//                                 <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                                 <span className="text-sm text-green-600 flex items-center gap-1">
//                                   <CheckCircle className="w-4 h-4" />
//                                   Ready to analyze
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                           <button
//                             onClick={removeFile}
//                             className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
//                           >
//                             <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
//                           </button>
//                         </motion.div>
//                       )}
//                     </div>

//                     {/* Analyze Button */}
//                     {file && !results && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-6"
//                       >
//                         <button
//                           onClick={analyzeResume}
//                           disabled={uploading}
//                           className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
//                         >
//                           <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//                           {uploading ? (
//                             <>
//                               <Loader2 className="w-5 h-5 animate-spin" />
//                               <span>Analyzing with AI...</span>
//                             </>
//                           ) : (
//                             <>
//                               <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//                               <span>Analyze Resume</span>
//                               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                             </>
//                           )}
//                         </button>
//                       </motion.div>
//                     )}
//                   </>
//                 ) : (
//                   /* Results Section */
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activeTab}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {activeTab === "overview" && (
//                         <div className="space-y-8">
//                           {/* Score Overview */}
//                           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                             {/* Main Score Card */}
//                             <motion.div
//                               initial={{ scale: 0.9, opacity: 0 }}
//                               animate={{ scale: 1, opacity: 1 }}
//                               transition={{ delay: 0.1 }}
//                               className="lg:col-span-1 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-2xl p-6 text-white relative overflow-hidden"
//                             >
//                               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
//                               <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                              
//                               <div className="relative z-10">
//                                 <div className="text-5xl font-bold mb-2">{atsResults?.ats_score || 78}</div>
//                                 <div className="text-white/80 text-sm mb-4">Overall ATS Score</div>
                                
//                                 <div className="w-full bg-white/20 rounded-full h-2 mb-4">
//                                   <motion.div
//                                     initial={{ width: 0 }}
//                                     animate={{ width: `${atsResults?.ats_score || 78}%` }}
//                                     transition={{ delay: 0.5, duration: 1 }}
//                                     className="bg-white h-2 rounded-full"
//                                   />
//                                 </div>
                                
//                                 <p className="text-white/90 text-sm">
//                                   {atsResults?.summary?.estimated_ats_compatibility || 
//                                     "Good chance of passing ATS with minor improvements"}
//                                 </p>
//                               </div>
//                             </motion.div>

//                             {/* Metric Cards */}
//                             <div className="lg:col-span-2 grid grid-cols-2 gap-4">
//                               {[
//                                 { 
//                                   icon: FileText, 
//                                   label: "Content Quality", 
//                                   value: atsResults?.score_breakdown?.content_quality || 85,
//                                   color: "from-blue-500 to-cyan-500",
//                                   bg: "bg-blue-50"
//                                 },
//                                 { 
//                                   icon: Clock, 
//                                   label: "Format Compliance", 
//                                   value: atsResults?.score_breakdown?.format_compliance || 92,
//                                   color: "from-purple-500 to-pink-500",
//                                   bg: "bg-purple-50"
//                                 },
//                                 { 
//                                   icon: Percent, 
//                                   label: "Keyword Alignment", 
//                                   value: atsResults?.score_breakdown?.keyword_alignment || 68,
//                                   color: "from-yellow-500 to-orange-500",
//                                   bg: "bg-yellow-50"
//                                 },
//                                 { 
//                                   icon: Award, 
//                                   label: "Structure Quality", 
//                                   value: atsResults?.score_breakdown?.structure_quality || 88,
//                                   color: "from-green-500 to-emerald-500",
//                                   bg: "bg-green-50"
//                                 },
//                               ].map((metric, index) => (
//                                 <motion.div
//                                   key={index}
//                                   initial={{ opacity: 0, y: 20 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.2 + index * 0.1 }}
//                                   className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all hover:border-[#c40116]/20 group"
//                                 >
//                                   <div className="flex items-center gap-3 mb-3">
//                                     <div className={`p-2.5 rounded-xl bg-gradient-to-br ${metric.color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
//                                       <metric.icon className={`w-4 h-4 text-${metric.color.split('-')[1]}-600`} />
//                                     </div>
//                                     <span className="text-xs text-gray-500 uppercase tracking-wider">
//                                       {metric.label}
//                                     </span>
//                                   </div>
//                                   <div className="text-2xl font-bold text-gray-900 mb-2">
//                                     {metric.value}%
//                                   </div>
//                                   <div className="w-full bg-gray-100 rounded-full h-1.5">
//                                     <motion.div
//                                       initial={{ width: 0 }}
//                                       animate={{ width: `${metric.value}%` }}
//                                       transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
//                                       className={`h-1.5 rounded-full bg-gradient-to-r ${metric.color}`}
//                                     />
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Section Analysis */}
//                           {atsResults?.section_analysis && atsResults.section_analysis.length > 0 && (
//                             <SectionAnalysisDisplay sectionAnalysis={atsResults.section_analysis} />
//                           )}

//                           {/* Issues Display */}
//                           {atsResults?.issues && (
//                             <IssuesDisplay issues={atsResults.issues} />
//                           )}
//                         </div>
//                       )}

                    

//                       {activeTab === "keywords" && (
//                         <div className="space-y-8">
//                           {/* Keyword Analysis Header */}
//                           <div className="flex items-center justify-between">
//                             <h3 className="text-xl font-bold text-gray-900">Keyword Analysis</h3>
//                             <div className="flex gap-2">
//                               <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
//                                 {results.keywords.length} found
//                               </span>
//                               <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
//                                 {results.missingKeywords.length} missing
//                               </span>
//                             </div>
//                           </div>

//                           {/* Found Keywords */}
//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                               <CheckCircle className="w-4 h-4 text-green-500" />
//                               Found Keywords
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                               {results.keywords.map((keyword, index) => (
//                                 <motion.div
//                                   key={index}
//                                   initial={{ opacity: 0, x: -10 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: index * 0.05 }}
//                                   className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#c40116]/20 hover:shadow-md transition-all group"
//                                 >
//                                   <div className={`w-2 h-2 rounded-full ${
//                                     keyword.importance === "high"
//                                       ? "bg-green-500"
//                                       : keyword.importance === "medium"
//                                       ? "bg-yellow-500"
//                                       : "bg-blue-500"
//                                   }`} />
//                                   <span className="flex-1 font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
//                                     {keyword.word}
//                                   </span>
//                                   <span className="text-sm text-gray-500">{keyword.count}x</span>
//                                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                     keyword.importance === "high"
//                                       ? "bg-green-100 text-green-700"
//                                       : keyword.importance === "medium"
//                                       ? "bg-yellow-100 text-yellow-700"
//                                       : "bg-blue-100 text-blue-700"
//                                   }`}>
//                                     {keyword.importance}
//                                   </span>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Missing Keywords */}
//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                               <AlertCircle className="w-4 h-4 text-yellow-500" />
//                               Missing Keywords to Add
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                               {results.missingKeywords.map((keyword, index) => (
//                                 <motion.span
//                                   key={index}
//                                   initial={{ opacity: 0, scale: 0.9 }}
//                                   animate={{ opacity: 1, scale: 1 }}
//                                   transition={{ delay: index * 0.05 }}
//                                   className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 rounded-xl text-sm font-medium border border-yellow-200 hover:shadow-md hover:scale-105 transition-all cursor-default"
//                                 >
//                                   {keyword}
//                                 </motion.span>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Keyword Density Chart */}
//                           <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
//                             <h4 className="font-semibold text-gray-900 mb-4">Keyword Density</h4>
//                             <div className="space-y-3">
//                               {results.keywords.slice(0, 5).map((keyword, index) => (
//                                 <div key={index} className="flex items-center gap-3">
//                                   <span className="text-sm text-gray-600 w-24">{keyword.word}</span>
//                                   <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <motion.div
//                                       initial={{ width: 0 }}
//                                       animate={{ width: `${(keyword.count / 10) * 100}%` }}
//                                       transition={{ delay: index * 0.1, duration: 0.8 }}
//                                       className={`h-full rounded-full ${
//                                         keyword.importance === "high"
//                                           ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                                           : keyword.importance === "medium"
//                                           ? "bg-gradient-to-r from-yellow-500 to-orange-500"
//                                           : "bg-gradient-to-r from-blue-500 to-cyan-500"
//                                       }`}
//                                     />
//                                   </div>
//                                   <span className="text-sm font-medium text-gray-700">{keyword.count}</span>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   </AnimatePresence>
//                 )}
//               </div>

//               {/* Footer Actions */}
//               {results && (
//                 <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-4">
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={removeFile}
//                       className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 group"
//                     >
//                       <div className="p-1.5 group-hover:bg-gray-200 rounded-full transition-colors">
//                         <X className="w-4 h-4" />
//                       </div>
//                       Analyze New Resume
//                     </button>

                    
//                       <button className="px-6 py-2.5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 group hover:scale-105">
//                         <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                         Optimize Resume
//                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Social Proof */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="text-center mt-16"
//           >
//             <p className="text-sm text-gray-500 mb-6">Trusted by teams at</p>
//             <div className="flex flex-wrap justify-center items-center gap-12">
//               {[
//                 { name: "Google" },
//                 { name: "Microsoft" },
//                 { name: "Amazon" },
//                 { name: "Meta" },
//                 { name: "Apple" },
//                 { name: "Netflix" },
//               ].map((company) => (
//                 <motion.div
//                   key={company.name}
//                   whileHover={{ scale: 1.1 }}
//                   className="flex items-center gap-2 text-gray-400 hover:text-[#c40116] transition-colors cursor-default"
//                 >
//                   <span className="text-sm font-semibold">{company.name}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

   

//       <Footer />
//     </>
//   );
// };

// export default ATSCheckerPage;



















"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import axios from "axios";

// Import from react-icons
import { 
  FiUpload, 
  FiFileText, 
  FiAward, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiX, 
  FiLoader, 
  FiStar, 
  FiTarget, 
  FiZap, 
  FiShield, 
  FiBarChart2, 
  FiEye, 
  FiArrowRight, 
  FiClock, 
  FiPercent, 
  FiBriefcase, 
  FiDownload, 
  FiShare2, 
  FiBookmark, 
  FiInfo, 
  FiChevronDown, 
  FiCalendar, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLinkedin, 
  FiGithub, 
  FiGlobe, 
  FiUsers, 
  FiHome, 
  FiSettings, 
  FiHelpCircle, 
  FiMenu, 
  FiSearch,
  FiTrendingUp,
  FiPieChart,
  FiLayers,
  FiGrid,
  FiList,
  FiRefreshCw,
 
  FiGitBranch,
  FiGithub as FiGitHub,
  FiLinkedin as FiLinkedIn,
  
  FiBriefcase as FiBriefcaseIcon,
  FiUsers as FiUsersIcon,
  FiUserPlus,
  FiUserCheck,
  FiUserX,
  FiUserMinus,
  FiUser,
  FiUsers as FiTeam,
  FiHeart as FiHeartIcon,
  FiStar as FiStarIcon,
  FiThumbsUp as FiThumbsUpIcon,
  FiThumbsDown,
  FiMessageSquare,
  FiMail as FiMailIcon,
  FiPhone as FiPhoneIcon,
  FiMapPin as FiMapPinIcon,
  FiGlobe as FiGlobeIcon,
  FiCalendar as FiCalendarIcon,
  FiClock as FiClockIcon,
  FiAward as FiAwardIcon,
 
  FiCpu as FiCpuIcon,
  FiHardDrive,
  FiServer,
  FiWifi,
  FiBluetooth,
  FiCast,
  FiAirplay,
  FiRadio,
  FiTv,
  FiSpeaker,
  FiHeadphones as FiHeadphonesIcon,
  FiMic,
  FiVideo as FiVideoIcon,
  FiCamera as FiCameraIcon,
  FiImage,
  FiFilm,
  FiMusic as FiMusicIcon,
  FiVolume2,
  FiVolumeX,
  FiVolume1,
  FiVolume,
  FiPieChart as FiPieChartIcon,
  FiBarChart2 as FiBarChartIcon,
  FiTrendingUp as FiTrendingUpIcon,
  FiTrendingDown,
  FiActivity,
  FiSliders,
  FiSettings as FiSettingsIcon,
  
  FiSun as FiSunIcon,
  FiMoon as FiMoonIcon,
  FiCloud as FiCloudIcon,
  FiCloudRain,
  FiCloudSnow,
  FiCloudLightning,
  FiWind,
  FiCompass,
  FiNavigation,
  FiAnchor,
  FiUmbrella,
  FiCoffee,
  FiGift,
  FiPackage as FiPackageIcon,
  FiBox as FiBoxIcon,
  FiArchive as FiArchiveIcon,
  FiFolder as FiFolderIcon,
  FiFolderPlus,
  FiFolderMinus,
  FiFile,
  FiFilePlus,
  FiFileMinus,
  FiFileText as FiFileTextIcon,
 
  FiFileMinus as FiFileMinusIcon,
  FiFilePlus as FiFilePlusIcon,
} from "react-icons/fi";

import { 
  FaBrain, 
  FaRocket, 
  FaShieldAlt, 
  FaBuilding, 
  FaUsers, 
  FaGraduationCap,
  FaStar,
  FaRegStar,
  FaRegCheckCircle,
  FaRegClock,
  FaRegFileAlt,
  FaRegLightbulb,
  FaRegChartBar,
  FaRegGem,
  FaRegHeart,
  FaRegThumbsUp,
  FaRegComment,
  FaRegShareSquare,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaRegCircle,
  FaRegCheckCircle as FaRegCheckCircleIcon,
  FaRegTimesCircle,
  FaRegQuestionCircle,
  FaRegEye,
  FaRegEyeSlash,
  FaRegBell,
  FaRegBellSlash,
  FaRegEnvelope,
  FaRegEnvelopeOpen,
  FaRegPaperPlane,
  FaRegClock as FaRegClockIcon,
  
  FaRegMoneyBillAlt,
  FaRegChartBar as FaRegChartBarIcon,
  
  FaRegGem as FaRegGemIcon,
  FaRegHeart as FaRegHeartIcon,
  FaRegStar as FaRegStarIcon,
  FaRegThumbsUp as FaRegThumbsUpIcon,
  FaRegThumbsDown,
  FaRegSmile,
  FaRegFrown,
  FaRegMeh,
  FaRegLaugh,
  FaRegLaughSquint,
  FaRegLaughWink,
  FaRegSadTear,
  FaRegSadCry,
  FaRegAngry,
  FaRegDizzy,
  FaRegFlushed,
  FaRegFrownOpen,
  FaRegGrimace,
  FaRegGrin,
  FaRegGrinAlt,
  FaRegGrinBeam,
  FaRegGrinHearts,
  FaRegGrinSquint,
  FaRegGrinStars,
  FaRegGrinTears,
  
} from "react-icons/fa";

import { 
  HiOutlineSparkles, 
  HiOutlineLightBulb, 
  HiOutlineCog, 
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineChartSquareBar,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineViewBoards,
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineMusicNote,
  HiOutlineSpeakerphone,
  HiOutlineBell,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineLink,
  HiOutlineExternalLink,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineKey,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineSparkles as HiOutlineSparklesIcon,
  HiOutlineLightBulb as HiOutlineLightBulbIcon,
  HiOutlineCog as HiOutlineCogIcon,
  HiOutlineChartBar as HiOutlineChartBarIcon,
  HiOutlineChartPie as HiOutlineChartPieIcon,
  HiOutlineTrendingUp as HiOutlineTrendingUpIcon,
  HiOutlineTrendingDown as HiOutlineTrendingDownIcon,
  HiOutlineRefresh,
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
  HiOutlineDotsHorizontal,
  HiOutlineDotsVertical,
  HiOutlineMenu,
  HiOutlineMenuAlt1,
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt3,
  HiOutlineMenuAlt4,
  HiOutlineX,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineCheck,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineUpload,
  HiOutlineDownload,
  HiOutlineSave,
  HiOutlineSaveAs,
  HiOutlineDuplicate,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlinePencilAlt,
  HiOutlineDocument,
  HiOutlineDocumentAdd,
  HiOutlineDocumentRemove,
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentText,
  
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineChip,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineCloud,
  HiOutlineCloudUpload,
  HiOutlineCloudDownload,
  HiOutlineGlobe,
  HiOutlineGlobeAlt,
  HiOutlineLocationMarker as HiOutlineLocationMarkerIcon,
  HiOutlineMap,
  HiOutlinePhone as HiOutlinePhoneIcon,
  HiOutlineMail as HiOutlineMailIcon,
  HiOutlineLink as HiOutlineLinkIcon,
  HiOutlineExternalLink as HiOutlineExternalLinkIcon,
  HiOutlineLockClosed as HiOutlineLockClosedIcon,
  HiOutlineLockOpen as HiOutlineLockOpenIcon,
  HiOutlineKey as HiOutlineKeyIcon,
  HiOutlineShieldCheck as HiOutlineShieldCheckIcon,
  HiOutlineSparkles as HiOutlineSparklesIcon2,
} from "react-icons/hi";

import { 
  MdOutlineGrain, 
  MdOutlineWaves, 
  MdOutlineBolt, 
  MdOutlineFlashOn,
  MdOutlineFlashOff,
  MdOutlineWhatshot,
  MdOutlineNightlight,
  MdOutlineWbSunny,
  MdOutlineCloudQueue,
  MdOutlineCloudDone,
  MdOutlineCloudOff,
  MdOutlineCloudCircle,
  MdOutlineCloudSync,
  MdOutlineDataUsage,
  MdOutlineStorage,
  MdOutlineMemory,
  MdOutlineDeveloperBoard,
  MdOutlinePrecisionManufacturing,
  MdOutlineEngineering,
  MdOutlineScience,
  MdOutlineBiotech,
  MdOutlinePsychology,
  MdOutlineAutoAwesome,
  MdOutlineAutoFixHigh,
  MdOutlineAutoFixNormal,
  MdOutlineAutoFixOff,
  MdOutlineAutoGraph,
  MdOutlineAutoStories,
  MdOutlineAutoMode,
  MdOutlineAdsClick,
  MdOutlineTouchApp,
  MdOutlineGesture,
  MdOutlineMouse,

  MdOutlineKeyboard,
  MdOutlineKeyboardVoice,
  MdOutlineMic,
  MdOutlineMicOff,
  MdOutlineVideocam,
  MdOutlineVideocamOff,
  MdOutlineScreenShare,
  MdOutlineStopScreenShare,
  MdOutlinePresentToAll,
  MdOutlineRecordVoiceOver,
  MdOutlineVoiceOverOff,
  MdOutlineHearing,
  MdOutlineHearingDisabled,
  MdOutlineAccessibility,
  MdOutlineAccessible,
  MdOutlineNotAccessible,
  MdOutlineSpeaker,
  MdOutlineSpeakerGroup,
  MdOutlineSpeakerNotes,
  MdOutlineSpeakerNotesOff,
  MdOutlineSdStorage,
  MdOutlineSimCard,
  MdOutlineSimCardAlert,
  MdOutlineSdCard,
  MdOutlineSdCardAlert,
  MdOutlineHardware,
  MdOutlineConstruction,
  MdOutlineHandyman,
  MdOutlineElectricalServices,
  MdOutlinePlumbing,
  MdOutlineRoofing,
  MdOutlineWindow,
  MdOutlineDoorSliding,
  MdOutlineDoorFront,
  MdOutlineDoorBack,
  MdOutlineGarage,
  MdOutlineFence,
  MdOutlineDeck,
  MdOutlineBalcony,
  MdOutlineStairs,
  MdOutlineElevator,
  MdOutlineEscalator,
  MdOutlineEscalatorWarning,
  MdOutlineAir,
  MdOutlineAcUnit,
  MdOutlineHeatPump,
  MdOutlineFireplace,
  MdOutlineFireExtinguisher,
  MdOutlineSmokeFree,
} from "react-icons/md";


import { 
  IoSparklesOutline, 
  IoSparklesSharp, 
  IoSparkles,
  IoRocketOutline,
  IoRocketSharp,
  IoRocket,
  IoFlashOutline,
  IoFlashSharp,
  IoFlash,
  IoBulbOutline,
  IoBulbSharp,
  IoBulb,
  IoShieldOutline,
  IoShieldSharp,
  IoShield,
  IoShieldCheckmarkOutline,
  IoShieldCheckmarkSharp,
  IoShieldCheckmark,
  IoShieldHalfOutline,
  IoShieldHalfSharp,
  IoShieldHalf,
  IoDocumentTextOutline,
  IoDocumentTextSharp,
  IoDocumentText,
  IoDocumentOutline,
  IoDocumentSharp,
  IoDocument,
  IoDocumentsOutline,
  IoDocumentsSharp,
  IoDocuments,
  IoFolderOutline,
  IoFolderSharp,

  IoFileTrayStacked,
} from "react-icons/io5";

// Types
interface Issue {
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  suggestion?: string;
  section: string;
  impact?: number;
}

interface SectionAnalysis {
  section: string;
  score: number;
  status: string;
  issues?: Issue[];
  suggestions?: string[];
}

interface ATSResults {
  ats_score: number;
  summary?: {
    estimated_ats_compatibility: string;
  };
  score_breakdown?: {
    content_quality: number;
    format_compliance: number;
    keyword_alignment: number;
    structure_quality: number;
  };
  section_analysis?: SectionAnalysis[];
  issues?: Record<string, Issue[]>;
}

// Loading Screen Component
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
      setProgress(prev => {
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
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000);

    return () => clearInterval(stepInterval);
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c40116]/10 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#be0117]/10 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />

        <div className="relative z-10">
          {/* Icon Animation */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360, 360],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-2xl flex items-center justify-center shadow-xl"
          >
            <CurrentIcon className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Analyzing Your Resume
          </h3>
          
          {/* Current Step */}
          <p className="text-center text-gray-600 mb-8">
            {steps[currentStep].text}
          </p>

          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-gradient-to-r from-[#c40116] to-[#be0117] rounded-full"
            />
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Processing...</span>
            <span className="font-semibold text-[#c40116]">{progress}%</span>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#c40116]"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Section Analysis Component
const SectionAnalysisDisplay = ({ sectionAnalysis }: { sectionAnalysis: SectionAnalysis[] }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "average":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "experience":
        return <FiBriefcase className="w-5 h-5" />;
      case "education":
        return <FaGraduationCap className="w-5 h-5" />;
      case "skills":
        return <FiZap className="w-5 h-5" />;
      case "summary":
        return <FiFileText className="w-5 h-5" />;
      case "projects":
        return <FaRocket className="w-5 h-5" />;
      default:
        return <FiFileText className="w-5 h-5" />;
    }
  };

  if (!sectionAnalysis || sectionAnalysis.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-[#c40116]" />
          Section-wise Analysis
        </h4>
        <span className="text-sm text-gray-500">{sectionAnalysis.length} sections analyzed</span>
      </div>

      <div className="space-y-4">
        {sectionAnalysis.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div
              className={`bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#c40116]/20 ${
                expandedSection === section.section ? "shadow-lg border-[#c40116]/30" : ""
              }`}
            >
              {/* Section Header */}
              <div
                className="p-5 flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.section ? null : section.section
                  )
                }
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon with gradient background */}
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    expandedSection === section.section
                      ? "bg-gradient-to-br from-[#c40116] to-[#be0117] text-white"
                      : "bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] group-hover:scale-110"
                  }`}>
                    {getSectionIcon(section.section)}
                  </div>

                  {/* Section Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-gray-900 capitalize">
                        {section.section.replace("_", " ")}
                      </h5>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(section.status)}`}>
                        {section.status}
                      </span>
                    </div>

                    {/* Progress Bar with percentage */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${section.score}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            section.score >= 80
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : section.score >= 60
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-rose-500"
                          }`}
                        />
                      </div>
                      <span className={`text-sm font-semibold min-w-[45px] ${
                        section.score >= 80
                          ? "text-green-600"
                          : section.score >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                        {section.score}%
                      </span>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <motion.div
                    animate={{ rotate: expandedSection === section.section ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-full transition-colors ${
                      expandedSection === section.section
                        ? "bg-[#c40116]/10 text-[#c40116]"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                    }`}
                  >
                    <HiOutlineChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedSection === section.section && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-100 bg-gray-50/50 p-5 space-y-5">
                      {/* Issues */}
                      {section.issues && section.issues.length > 0 && (
                        <div>
                          <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Issues to Address ({section.issues.length})
                          </h6>
                          <div className="space-y-3">
                            {section.issues.map((issue, issueIdx) => (
                              <motion.div
                                key={issueIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: issueIdx * 0.1 }}
                                className={`p-4 rounded-xl border ${getSeverityColor(issue.severity)} bg-white`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">
                                    {issue.severity === "high" && (
                                      <FiAlertCircle className="w-4 h-4 text-red-500" />
                                    )}
                                    {issue.severity === "medium" && (
                                      <FiAlertCircle className="w-4 h-4 text-yellow-500" />
                                    )}
                                    {issue.severity === "low" && (
                                      <FiInfo className="w-4 h-4 text-blue-500" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-800 mb-2">{issue.message}</p>
                                    {issue.suggestion && (
                                      <div className="flex items-start gap-2 mt-2 p-3 bg-white rounded-lg border border-gray-100">
                                        <HiOutlineSparkles className="w-3 h-3 text-[#c40116] mt-0.5 shrink-0" />
                                        <p className="text-xs text-gray-600">
                                          <span className="font-medium">Pro tip:</span> {issue.suggestion}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {section.suggestions && section.suggestions.length > 0 && (
                        <div>
                          <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c40116]" />
                            Improvement Suggestions
                          </h6>
                          <div className="space-y-2">
                            {section.suggestions.map((suggestion, suggestionIdx) => (
                              <motion.div
                                key={suggestionIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: suggestionIdx * 0.1 }}
                                className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#c40116]/20 transition-colors"
                              >
                                <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-700">{suggestion}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No Issues Found */}
                      {(!section.issues || section.issues.length === 0) &&
                        (!section.suggestions || section.suggestions.length === 0) && (
                          <div className="text-center py-6">
                            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-700">
                                This section looks great! No issues found.
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Issues Display Component
const IssuesDisplay = ({ issues }: { issues: Record<string, Issue[]> }) => {
  const [expandedSeverity, setExpandedSeverity] = useState<string | null>(null);

  const severityConfig = {
    critical: {
      icon: FiAlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      gradient: "from-red-500 to-rose-500",
      lightBg: "bg-red-50/50",
      label: "Critical Issues",
      description: "Must fix to pass ATS filters",
    },
    high: {
      icon: FiAlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      gradient: "from-orange-500 to-red-500",
      lightBg: "bg-orange-50/50",
      label: "High Priority",
      description: "Significant impact on your score",
    },
    medium: {
      icon: FiAlertCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      gradient: "from-yellow-500 to-orange-500",
      lightBg: "bg-yellow-50/50",
      label: "Medium Priority",
      description: "Moderate impact on ATS compatibility",
    },
    low: {
      icon: FiInfo,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      gradient: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50/50",
      label: "Low Priority",
      description: "Minor improvements suggested",
    },
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "experience":
        return <FiBriefcase className="w-4 h-4" />;
      case "education":
        return <FaGraduationCap className="w-4 h-4" />;
      case "skills":
        return <FiZap className="w-4 h-4" />;
      case "summary":
        return <FiFileText className="w-4 h-4" />;
      default:
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  const nonEmptySeverities = Object.entries(issues).filter(
    ([_, issueList]) => issueList && issueList.length > 0
  ) as [string, Issue[]][];

  if (nonEmptySeverities.length === 0) return null;

  const totalIssues = nonEmptySeverities.reduce(
    (acc, [_, issueList]) => acc + issueList.length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
                <FiAlertCircle className="w-5 h-5 text-[#c40116]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Issues Found ({totalIssues})</h4>
                <p className="text-sm text-gray-500">Address these to improve your ATS score</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {nonEmptySeverities.map(([severity, issueList]) => (
                <span
                  key={severity}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                    severity === "critical"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : severity === "high"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : severity === "medium"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {severity}: {issueList.length}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Issues by Severity */}
        <div className="divide-y divide-gray-100">
          {nonEmptySeverities.map(([severity, issueList]) => {
            const config = severityConfig[severity as keyof typeof severityConfig];
            const Icon = config.icon;
            const isExpanded = expandedSeverity === severity;

            return (
              <div key={severity} className="overflow-hidden">
                {/* Severity Header */}
                <div
                  onClick={() => setExpandedSeverity(isExpanded ? null : severity)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${config.bg}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{config.label}</h5>
                      <p className="text-xs text-gray-500 mt-0.5">{config.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">
                      {issueList.length} issue{issueList.length > 1 ? 's' : ''}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-1.5 rounded-full ${isExpanded ? config.bg : 'bg-gray-100'}`}
                    >
                      <HiOutlineChevronDown className={`w-4 h-4 ${isExpanded ? config.color : 'text-gray-500'}`} />
                    </motion.div>
                  </div>
                </div>

                {/* Issues List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 space-y-4">
                        {issueList.map((issue, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-5 rounded-xl border ${config.border} ${config.lightBg} bg-white/50 backdrop-blur-sm`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Section Icon */}
                              <div className={`p-2.5 rounded-lg ${config.bg} shrink-0`}>
                                {getSectionIcon(issue.section)}
                              </div>

                              <div className="flex-1">
                                {/* Section and Impact */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                                    {issue.section}
                                  </span>
                                  {issue.impact && (
                                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                                      issue.impact >= 9
                                        ? "bg-red-100 text-red-700"
                                        : issue.impact >= 7
                                        ? "bg-orange-100 text-orange-700"
                                        : issue.impact >= 5
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}>
                                      Impact: {issue.impact}/10
                                    </span>
                                  )}
                                </div>

                                {/* Message */}
                                <p className="text-sm text-gray-800 mb-3">{issue.message}</p>

                                {/* Suggestion */}
                                {issue.suggestion && (
                                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <HiOutlineSparkles className="w-4 h-4 text-[#c40116] mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-600">
                                      <span className="font-semibold">Suggestion:</span> {issue.suggestion}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const ATSCheckerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    keywords: Array<{
      word: string;
      count: number;
      importance: "high" | "medium" | "low";
    }>;
    missingKeywords: string[];
  } | null>(null);
  const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "keywords">("overview");

  // Handle file upload - automatically trigger analysis
  useEffect(() => {
    if (file && !uploading && !loading) {
      analyzeResume();
    }
  }, [file]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResults(null);
    setAtsResults(null);
    setActiveTab("overview");
  };

  const analyzeResume = async () => {
    if (!file) return;

    setUploading(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/ats/scan`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response);
      setAtsResults(response?.data?.data);
      
      // Mock keywords data
      setTimeout(() => {
        setResults({
          keywords: [
            { word: "JavaScript", count: 8, importance: "high" },
            { word: "React", count: 6, importance: "high" },
            { word: "Node.js", count: 4, importance: "medium" },
            { word: "TypeScript", count: 3, importance: "high" },
            { word: "Next.js", count: 2, importance: "medium" },
            { word: "Team Leadership", count: 3, importance: "high" },
            { word: "Agile", count: 5, importance: "medium" },
            { word: "CI/CD", count: 2, importance: "low" },
            { word: "REST APIs", count: 4, importance: "medium" },
            { word: "MongoDB", count: 2, importance: "low" },
          ],
          missingKeywords: ["Python", "AWS", "Docker", "Kubernetes", "GraphQL"],
        });
      }, 500);
      
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Header />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#be0117]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20 backdrop-blur-sm"
            >
              <FaBrain className="w-4 h-4 text-[#c40116]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
                AI-Powered ATS Analysis
              </span>
              <HiOutlineSparkles className="w-3 h-3 text-[#c40116]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl  font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Optimize Your Resume
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#c40116] via-[#e63545] to-[#be0117] bg-clip-text text-transparent ">
From Applied to Interviewed              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Get past automated screens and land more interviews with our
              advanced AI-powered ATS resume checker. <span className="font-semibold text-[#c40116]">95% of resumes</span> never reach
              human eyes.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-center justify-center gap-8 mb-12"
            >
              {[
                { icon: FiUsers, label: "Trusted by", value: "50,000+ job seekers" },
                { icon: FaBuilding, label: "Used at", value: "2,500+ companies" },
                { icon: FaGraduationCap, label: "Recommended by", value: "200+ career coaches" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3 group"
                >
                  <div className="p-3 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl group-hover:scale-110 transition-transform">
                    <stat.icon className="w-5 h-5 text-[#c40116]" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500">{stat.label}</div>
                    <div className="font-semibold text-gray-900">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Upload Card */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className=" mx-auto"
          >
            {!results ? (
              <div className="bg-white max-w-3xl mx-auto rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                      dragActive
                        ? "border-[#c40116] bg-[#c40116]/5 scale-[1.02]"
                        : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
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
                        animate={{ 
                          y: [0, -10, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-flex p-6 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-6"
                      >
                        <FiUpload className="w-16 h-16 text-[#c40116]" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Drag & drop or{" "}
                        <label
                          htmlFor="resume-upload"
                          className="text-[#c40116] font-semibold cursor-pointer hover:underline"
                        >
                          browse
                        </label>
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex -space-x-3">
                          <img
                            src="/icons/ats-circleimage1.svg"
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                          <img
                            src="/icons/ats-circleimage2.svg"
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                          <img
                            src="/icons/ats-circleimage3.svg"
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          <span className="font-semibold text-[#c40116]">10,000+</span> resumes analyzed
                        </span>
                      </div>

                      <div className="space-y-4">
                        <label
                          htmlFor="resume-upload"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                        >
                          <FiUpload className="w-5 h-5" />
                          Choose File
                        </label>
                        
                        <p className="text-xs text-gray-400">
                          Supports PDF (Max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Results Section */
              <div className="bg-white max-w-4xl mx-auto rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Results Header */}
                <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
                        <FiFileText className="w-5 h-5 text-[#c40116]" />
                      </div>
                      <span className="font-semibold text-gray-900">ATS Analysis Results</span>
                    </div>
                    
                    <button
                      onClick={removeFile}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                      Analyze New
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mt-4">
                    {[
                      { id: "overview", label: "Overview", icon: FiEye },
                      { id: "keywords", label: "Keywords", icon: FiZap },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize flex items-center gap-2 ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-md shadow-[#c40116]/20"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-8">
                          {/* Score Overview */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Score Card */}
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="lg:col-span-1 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-2xl p-6 text-white relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                              
                              <div className="relative z-10">
                                <div className="text-5xl font-bold mb-2">{atsResults?.ats_score || 78}</div>
                                <div className="text-white/80 text-sm mb-4">Overall ATS Score</div>
                                
                                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${atsResults?.ats_score || 78}%` }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="bg-white h-2 rounded-full"
                                  />
                                </div>
                                
                                <p className="text-white/90 text-sm">
                                  {atsResults?.summary?.estimated_ats_compatibility || 
                                    "Good chance of passing ATS with minor improvements"}
                                </p>
                              </div>
                            </motion.div>

                            {/* Metric Cards */}
                            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                              {[
                                { icon: FiFileText, label: "Content Quality", value: atsResults?.score_breakdown?.content_quality || 85 },
                                { icon: FiClock, label: "Format Compliance", value: atsResults?.score_breakdown?.format_compliance || 92 },
                                { icon: FiPercent, label: "Keyword Alignment", value: atsResults?.score_breakdown?.keyword_alignment || 68 },
                                { icon: FiAward, label: "Structure Quality", value: atsResults?.score_breakdown?.structure_quality || 88 },
                              ].map((metric, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 + index * 0.1 }}
                                  className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all hover:border-[#c40116]/20 group"
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 group-hover:scale-110 transition-transform">
                                      <metric.icon className="w-4 h-4 text-[#c40116]" />
                                    </div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                      {metric.label}
                                    </span>
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900 mb-2">
                                    {metric.value}%
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${metric.value}%` }}
                                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                                      className="h-1.5 rounded-full bg-gradient-to-r from-[#c40116] to-[#be0117]"
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Section Analysis */}
                          {atsResults?.section_analysis && atsResults.section_analysis.length > 0 && (
                            <SectionAnalysisDisplay sectionAnalysis={atsResults.section_analysis} />
                          )}

                          {/* Issues Display */}
                          {atsResults?.issues && (
                            <IssuesDisplay issues={atsResults.issues} />
                          )}
                        </div>
                      )}

                      {activeTab === "keywords" && (
                        <div className="space-y-8">
                          {/* Keyword Analysis Header */}
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Keyword Analysis</h3>
                            <div className="flex gap-2">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                {results.keywords.length} found
                              </span>
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                {results.missingKeywords.length} missing
                              </span>
                            </div>
                          </div>

                          {/* Found Keywords */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              Found Keywords
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {results.keywords.map((keyword, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#c40116]/20 hover:shadow-md transition-all group"
                                >
                                  <div className={`w-2 h-2 rounded-full ${
                                    keyword.importance === "high"
                                      ? "bg-green-500"
                                      : keyword.importance === "medium"
                                      ? "bg-yellow-500"
                                      : "bg-blue-500"
                                  }`} />
                                  <span className="flex-1 font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
                                    {keyword.word}
                                  </span>
                                  <span className="text-sm text-gray-500">{keyword.count}x</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    keyword.importance === "high"
                                      ? "bg-green-100 text-green-700"
                                      : keyword.importance === "medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}>
                                    {keyword.importance}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Missing Keywords */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <FiAlertCircle className="w-4 h-4 text-yellow-500" />
                              Missing Keywords to Add
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {results.missingKeywords.map((keyword, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 rounded-xl text-sm font-medium border border-yellow-200 hover:shadow-md hover:scale-105 transition-all cursor-default"
                                >
                                  {keyword}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Keyword Density Chart */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Keyword Density</h4>
                            <div className="space-y-3">
                              {results.keywords.slice(0, 5).map((keyword, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <span className="text-sm text-gray-600 w-24">{keyword.word}</span>
                                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(keyword.count / 10) * 100}%` }}
                                      transition={{ delay: index * 0.1, duration: 0.8 }}
                                      className={`h-full rounded-full ${
                                        keyword.importance === "high"
                                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                          : keyword.importance === "medium"
                                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                          : "bg-gradient-to-r from-blue-500 to-cyan-500"
                                      }`}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{keyword.count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={removeFile}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 group"
                    >
                      <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      Analyze New Resume
                    </button>

                    <button className="px-6 py-2.5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 group hover:scale-105">
                      <FaRocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Optimize Resume
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <p className="text-sm text-gray-500 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map((company) => (
                <motion.div
                  key={company}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-[#c40116] transition-colors cursor-default font-semibold"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ATSCheckerPage;