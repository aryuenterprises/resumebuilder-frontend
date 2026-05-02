// "use client";

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiGrid,
//   FiArrowLeft,
//   FiChevronRight,
//   FiDownload,
//   FiEye,
//   FiMenu,
//   FiX,
//   FiLock,
//   FiStar,
//   FiTrendingUp,
//   FiShield,
//   FiZoomIn,
//   FiZoomOut,
//   FiMaximize2,
//   FiMinimize2,
// } from "react-icons/fi";
// import { IoSparkles, IoCheckmarkCircle } from "react-icons/io5";
// import { Crown, Zap } from "lucide-react";
// import { templateData } from "@/app/data";
// import { Template } from "@/app/types";
// import { CreateContext } from "@/app/context/CreateContext";
// import Header from "@/app/components/layouts/Header";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import axios from "axios";
// import { User } from "@/app/types/user.types";
// import { API_URL } from "@/app/config/api";
// import ProtectedRoute from "@/app/utils/ProtectedRoute";

// interface usersCurrentPlan {
//   amount: number;
//   plan: string;
// }

// // Define plan limits with required plan for each template index
// const PLAN_CONFIG = {
//   free: {
//     maxTemplates: 1,
//     label: "Free",
//     color: "from-slate-500 to-slate-600",
//     badgeColor: "bg-slate-100 text-slate-700",
//     borderColor: "border-slate-200",
//   },
//   pro: {
//     maxTemplates: 3,
//     label: "Pro",
//     color: "from-indigo-600 to-indigo-500",
//     badgeColor: "bg-indigo-100 text-indigo-700",
//     borderColor: "border-indigo-200",
//   },
//   proplus: {
//     maxTemplates: 5,
//     label: "Pro Plus",
//     color: "from-amber-500 to-orange-500",
//     badgeColor: "bg-amber-100 text-amber-700",
//     borderColor: "border-amber-200",
//   },
//   premium: {
//     maxTemplates: Infinity,
//     label: "Premium",
//     color: "from-purple-500 to-indigo-600",
//     badgeColor: "bg-purple-100 text-purple-700",
//     borderColor: "border-purple-200",
//   },
// };

// // Helper function to get required plan for a template index
// const getRequiredPlanForTemplate = (index: number): keyof typeof PLAN_CONFIG => {
//   if (index < PLAN_CONFIG.free.maxTemplates) return "free";
//   if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
//   if (index < PLAN_CONFIG.proplus.maxTemplates) return "proplus";
//   return "premium";
// };

// export default function ChangeTemplate() {
//   const router = useRouter();
//   const context = useContext(CreateContext);

//   const { chosenTemplate, setChosenTemplate } = context || {
//     chosenTemplate: null,
//     setChosenTemplate: () => {},
//   };

//   const [previewTemplate, setPreviewTemplate] = useState<Template | null>(
//     chosenTemplate || templateData[0] || null,
//   );
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [usersCurrentPlan, setUsersCurrentPlan] = useState<usersCurrentPlan | null>(null);
//   const [showUpgradePopup, setShowUpgradePopup] = useState(false);
//   const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
//     template: Template;
//     requiredPlan: string;
//   } | null>(null);
  
//   // Fullscreen and Zoom states
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [zoom, setZoom] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
//   const imageContainerRef = useRef<HTMLDivElement>(null);

//   // Get current plan name (normalized)
//   const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
//     const plan = usersCurrentPlan?.plan?.toLowerCase() || "";
//     if (plan.includes("pro plus")) return "proplus";
//     if (plan.includes("pro")) return "pro";
//     if (plan.includes("premium")) return "premium";
//     return "free";
//   };

//   // Check if template is accessible based on plan
//   const isTemplateAccessible = (templateIndex: number): boolean => {
//     const currentPlan = getCurrentPlan();
//     const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
//     return templateIndex < maxTemplates;
//   };

//   // Get available templates count based on plan
//   const getAvailableTemplatesCount = (): number => {
//     const currentPlan = getCurrentPlan();
//     const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
//     return Math.min(maxTemplates, templateData.length);
//   };

//   // Get template index by ID
//   const getTemplateIndex = (templateId: number): number => {
//     return templateData.findIndex((t) => t.id === templateId);
//   };

//   // Handle template selection with lock check
//   const handleSelectTemplate = (template: Template, index: number) => {
//     if (isTemplateAccessible(index)) {
//       setPreviewTemplate(template);
//       // Reset zoom and position when changing template
//       setZoom(1);
//       setImagePosition({ x: 0, y: 0 });
//       if (isMobile) {
//         setIsSidebarOpen(false);
//       }
//     } else {
//       const requiredPlan = getRequiredPlanForTemplate(index);
//       setSelectedLockedTemplate({
//         template,
//         requiredPlan: PLAN_CONFIG[requiredPlan].label,
//       });
//       setShowUpgradePopup(true);
//     }
//   };

//   const handleUseTemplate = () => {
//     if (!previewTemplate) return;

//     const templateIndex = getTemplateIndex(previewTemplate?.id!);

//     if (isTemplateAccessible(templateIndex)) {
//       setChosenTemplate(previewTemplate);
//       setLocalStorage("chosenTemplate", previewTemplate);
//       router.push("/resume-details/contact");
//     } else {
//       const requiredPlan = getRequiredPlanForTemplate(templateIndex);
//       setSelectedLockedTemplate({
//         template: previewTemplate,
//         requiredPlan: PLAN_CONFIG[requiredPlan].label,
//       });
//       setShowUpgradePopup(true);
//     }
//   };

//   // Fullscreen handlers
//   const toggleFullscreen = () => {
//     setIsFullscreen(!isFullscreen);
//     // Reset zoom and position when exiting fullscreen
//     if (isFullscreen) {
//       setZoom(1);
//       setImagePosition({ x: 0, y: 0 });
//     }
//   };

//   // Zoom handlers
//   const zoomIn = () => {
//     setZoom(prev => Math.min(prev + 0.25, 3));
//   };

//   const zoomOut = () => {
//     setZoom(prev => Math.max(prev - 0.25, 0.5));
//   };

//   const resetZoom = () => {
//     setZoom(1);
//     setImagePosition({ x: 0, y: 0 });
//   };

//   // Drag handlers for panned zoom
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (zoom > 1) {
//       setIsDragging(true);
//       setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (isDragging && zoom > 1) {
//       setImagePosition({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y,
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Keyboard handlers for fullscreen
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (isFullscreen) {
//         if (e.key === 'Escape') {
//           setIsFullscreen(false);
//           setZoom(1);
//           setImagePosition({ x: 0, y: 0 });
//         } else if (e.key === '+' || e.key === '=') {
//           zoomIn();
//         } else if (e.key === '-') {
//           zoomOut();
//         } else if (e.key === '0') {
//           resetZoom();
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isFullscreen]);

//   // Prevent body scroll when fullscreen is open
//   useEffect(() => {
//     if (isFullscreen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isFullscreen]);

//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/users/dashboard`, {
//           params: { userId: userDetails?.id },
//         });
//         setUsersCurrentPlan(response?.data?.payments?.[0]);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (userDetails?.id) fetchUserData();
//   }, []);

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Set default template on mount
//   useEffect(() => {
//     if (!previewTemplate && templateData.length > 0) {
//       setPreviewTemplate(templateData[0]);
//     }
//   }, [previewTemplate]);

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (isMobile && isSidebarOpen) {
//         const sidebar = document.getElementById("template-sidebar");
//         const toggle = document.getElementById("sidebar-toggle");
//         if (
//           sidebar &&
//           !sidebar.contains(e.target as Node) &&
//           toggle &&
//           !toggle.contains(e.target as Node)
//         ) {
//           setIsSidebarOpen(false);
//         }
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMobile, isSidebarOpen]);

//   const currentPlan = getCurrentPlan();
//   const availableTemplates = getAvailableTemplatesCount();
//   const totalTemplates = templateData.length;
//   const isUpgradeNeeded = availableTemplates < totalTemplates;

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring" as const, stiffness: 100, damping: 12 },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
//       <ProtectedRoute>
//         <Header />

//         {/* Mobile Sidebar Toggle */}
//         <div className="lg:hidden fixed bottom-6 left-0 right-0 z-30 px-4">
//           <div className="flex items-center justify-center">
//             <button
//               id="sidebar-toggle"
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               {isSidebarOpen ? (
//                 <FiX className="w-5 h-5" />
//               ) : (
//                 <FiMenu className="w-5 h-5" />
//               )}
//               <span className="text-sm font-medium">
//                 {isSidebarOpen ? "Close Templates" : "Browse Templates"}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Upgrade Popup */}
//         <AnimatePresence>
//           {showUpgradePopup && selectedLockedTemplate && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
//               <motion.div
//                 initial={{ scale: 0.9, y: 20, opacity: 0 }}
//                 animate={{ scale: 1, y: 0, opacity: 1 }}
//                 exit={{ scale: 0.9, y: 20, opacity: 0 }}
//                 transition={{ type: "spring", duration: 0.5 }}
//                 className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
//                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Crown className="w-8 h-8 text-white" />
//                   </div>
//                   <h2 className="text-2xl font-bold mb-2">Upgrade Required</h2>
//                   <p className="text-white/80">Unlock this premium template</p>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-3">
//                     <div className="bg-gray-50 rounded-xl p-4">
//                       <p className="text-sm text-gray-500 mb-1">Template:</p>
//                       <p className="text-lg font-bold text-gray-900">
//                         {selectedLockedTemplate.template.style}
//                       </p>
//                       <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full">
//                         <Crown className="w-4 h-4 text-amber-600" />
//                         <span className="text-sm font-semibold text-amber-700">
//                           Requires {selectedLockedTemplate.requiredPlan} Plan
//                         </span>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 rounded-xl p-4">
//                       <p className="text-sm text-gray-500 mb-1">Your Plan:</p>
//                       <p className="text-xl font-bold text-gray-900 capitalize">
//                         {currentPlan}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {availableTemplates} of {totalTemplates} templates unlocked
//                       </p>
//                     </div>

//                     <div className="space-y-2">
//                       <h3 className="font-semibold text-gray-900">Upgrade to access:</h3>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <FiLock className="w-4 h-4 text-indigo-600" />
//                         <span>Unlock {totalTemplates - availableTemplates} more templates</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <FiStar className="w-4 h-4 text-indigo-600" />
//                         <span>Premium designs & layouts</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setShowUpgradePopup(false)}
//                       className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all"
//                     >
//                       Maybe Later
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowUpgradePopup(false);
//                         router.push("/choose-plan");
//                       }}
//                       className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//                     >
//                       View Plans
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Fullscreen Preview Modal */}
//         <AnimatePresence>
//           {isFullscreen && previewTemplate && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
//             >
//               {/* Fullscreen Header */}
//               <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={toggleFullscreen}
//                     className="p-2 hover:bg-white/10 rounded-lg transition text-white"
//                   >
//                     <FiMinimize2 className="w-5 h-5" />
//                   </button>
//                   <span className="text-white font-medium">{previewTemplate.style}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {/* Zoom Controls */}
//                   <button
//                     onClick={zoomOut}
//                     className="p-2 hover:bg-white/10 rounded-lg transition text-white"
//                     title="Zoom Out (Ctrl + -)"
//                   >
//                     <FiZoomOut className="w-5 h-5" />
//                   </button>
//                   <span className="text-white text-sm min-w-[60px] text-center">
//                     {Math.round(zoom * 100)}%
//                   </span>
//                   <button
//                     onClick={zoomIn}
//                     className="p-2 hover:bg-white/10 rounded-lg transition text-white"
//                     title="Zoom In (Ctrl + +)"
//                   >
//                     <FiZoomIn className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={resetZoom}
//                     className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
//                   >
//                     Reset
//                   </button>
//                   <button
//                     onClick={toggleFullscreen}
//                     className="p-2 hover:bg-white/10 rounded-lg transition text-white lg:hidden"
//                   >
//                     <FiMinimize2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Fullscreen Content */}
//               <div
//                 ref={imageContainerRef}
//                 className="flex-1 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUp}
//                 onMouseLeave={handleMouseUp}
//               >
//                 <div
//                   className="transition-transform duration-200 ease-out"
//                   style={{
//                     transform: `scale(${zoom}) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
//                     cursor: zoom > 1 ? 'grab' : 'default',
//                   }}
//                 >
//                   <img
//                     src={previewTemplate.image}
//                     alt={previewTemplate.style}
//                     className="max-h-[90vh] object-contain"
//                     style={{ pointerEvents: 'none' }}
//                   />
//                 </div>
//               </div>

//               {/* Zoom indicator */}
//               {zoom !== 1 && (
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/50 rounded-full text-white text-xs">
//                   Zoom: {Math.round(zoom * 100)}% • Drag to pan
//                 </div>
//               )}

//               {/* Keyboard shortcuts hint */}
//               <div className="absolute bottom-4 right-4 text-white/40 text-xs hidden sm:block">
//                 + / - to zoom • 0 to reset • Esc to exit
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
//             {/* Template List - Sidebar */}
//             <AnimatePresence>
//               {(isSidebarOpen || !isMobile) && (
//                 <motion.div
//                   id="template-sidebar"
//                   variants={containerVariants}
//                   initial={isMobile ? { x: -320, opacity: 0 } : "hidden"}
//                   animate={isMobile ? { x: 0, opacity: 1 } : "visible"}
//                   exit={isMobile ? { x: -320, opacity: 0 } : undefined}
//                   transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                   className={`
//                     ${isMobile
//                       ? "fixed inset-y-0 left-0 z-40 w-[85%] bg-white shadow-2xl overflow-hidden rounded-r-2xl"
//                       : "lg:w-80 space-y-4 relative"
//                   }`}
//                 >
//                   {isMobile && (
//                     <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
//                       <h2 className="font-semibold text-gray-900">Templates</h2>
//                       <button
//                         onClick={() => setIsSidebarOpen(false)}
//                         className="p-2 hover:bg-gray-100 rounded-lg transition"
//                       >
//                         <FiX className="w-5 h-5 text-gray-600" />
//                       </button>
//                     </div>
//                   )}

//                   <div className={isMobile ? "p-4 overflow-y-auto h-[calc(100vh-70px)]" : ""}>
//                     <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                       <div className="flex items-center justify-between mb-4">
//                         <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
//                           <FiGrid className="w-4 h-4 text-indigo-600" />
//                           <span>Templates</span>
//                         </h2>
//                         <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
//                           {availableTemplates}/{totalTemplates}
//                         </span>
//                       </div>

//                       {/* Plan Info Bar */}
//                       {isUpgradeNeeded && (
//                         <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//                           <p className="text-xs text-amber-800">
//                             <strong className="capitalize">{currentPlan}</strong> plan • 
//                             Upgrade to unlock {totalTemplates - availableTemplates} more templates
//                           </p>
//                         </div>
//                       )}

//                       <div className="space-y-2 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
//                         {templateData.map((template, index) => {
//                           const isSelected = previewTemplate?.id === template.id;
//                           const isAccessible = isTemplateAccessible(index);
//                           const requiredPlan = getRequiredPlanForTemplate(index);
//                           const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
//                           const isPremium = requiredPlan !== "free";

//                           return (
//                             <motion.div
//                               key={template.id}
//                               variants={itemVariants}
//                               whileHover={isAccessible ? { x: 4 } : {}}
//                               onClick={() => handleSelectTemplate(template, index)}
//                               className={`
//                                 relative group cursor-pointer rounded-xl transition-all duration-300
//                                 ${!isAccessible ? "opacity-75" : ""}
//                                 ${isSelected && isAccessible
//                                   ? "bg-indigo-50 border-2 border-indigo-500 shadow-md"
//                                   : isAccessible
//                                     ? "bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md"
//                                     : "bg-gray-50 border border-gray-200 cursor-not-allowed"
//                                 }
//                               `}
//                             >
//                               <div className="flex items-start gap-3 p-3">
//                                 <div className="relative w-18 h-18 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                                   <Image
//                                     src={template.image}
//                                     alt={template.style!}
//                                     fill
//                                     className="object-cover"
//                                   />
//                                   {!isAccessible && (
//                                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                                       <FiLock className="w-4 h-4 text-white" />
//                                     </div>
//                                   )}
//                                 </div>

//                                 <div className="flex-1 min-w-0">
//                                   <div className="flex items-center justify-between gap-2 mb-1">
//                                     <h3 className="font-semibold text-gray-900 truncate text-sm">
//                                       {template.style}
//                                     </h3>
//                                     {isPremium ? (
//                                       <span className={`px-1.5 py-0.5 ${PLAN_CONFIG[requiredPlan].badgeColor} rounded-full text-[10px] font-medium flex items-center gap-1`}>
//                                         {requiredPlan === "premium" ? <Crown className="w-3 h-3" /> : <FiStar className="w-3 h-3" />}
//                                         {requiredPlanLabel}
//                                       </span>
//                                     ) : (
//                                       <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-medium">
//                                         Free
//                                       </span>
//                                     )}
//                                   </div>
//                                   <p className="text-[10px] text-gray-500 line-clamp-2 mb-1">
//                                     {template.description}
//                                   </p>
//                                   {isSelected && isAccessible && (
//                                     <span className="inline-flex items-center gap-1 text-indigo-600 text-[10px] font-medium">
//                                       <FiChevronRight className="w-2.5 h-2.5" />
//                                       Selected
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </motion.div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Preview Section */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className={`flex-1 transition-all duration-300 ${isMobile && isSidebarOpen ? "opacity-50 pointer-events-none" : "opacity-100"}`}
//             >
//               <div className="sticky top-20 lg:top-6">
//                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//                   {/* Preview Header */}
//                   <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                       <div className="flex items-center gap-2">
//                         <div className="p-1.5 bg-indigo-100 rounded-lg">
//                           <FiEye className="w-4 h-4 text-indigo-600" />
//                         </div>
//                         <div>
//                           <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
//                           <p className="text-xs text-gray-500">{previewTemplate?.style || "Select a template"}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         {/* Fullscreen Button */}
//                         {previewTemplate && (
//                           <button
//                             onClick={toggleFullscreen}
//                             className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
//                             title="Fullscreen Preview (F11)"
//                           >
//                             <FiMaximize2 className="w-4 h-4" />
//                           </button>
//                         )}
//                         {previewTemplate && (() => {
//                           const templateIndex = getTemplateIndex(previewTemplate.id);
//                           const isAccessible = isTemplateAccessible(templateIndex);
//                           const requiredPlan = getRequiredPlanForTemplate(templateIndex);
//                           return (
//                             <div className={`px-2 py-1 rounded-full text-[10px] font-medium w-fit flex items-center gap-1 ${
//                               isAccessible
//                                 ? requiredPlan === "free"
//                                   ? "bg-emerald-100 text-emerald-700"
//                                   : "bg-indigo-100 text-indigo-700"
//                                 : "bg-amber-100 text-amber-700"
//                             }`}>
//                               {!isAccessible && <FiLock className="w-3 h-3" />}
//                               {isAccessible && requiredPlan !== "free" && <FiStar className="w-3 h-3" />}
//                               <span>{!isAccessible ? `Requires ${PLAN_CONFIG[requiredPlan].label}` : requiredPlan === "free" ? "Free Template" : `${PLAN_CONFIG[requiredPlan].label} Template`}</span>
//                             </div>
//                           );
//                         })()}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   {previewTemplate && (() => {
//                     const templateIndex = getTemplateIndex(previewTemplate.id);
//                     const isAccessible = isTemplateAccessible(templateIndex);
//                     return (
//                       <div className="flex flex-col sm:flex-row justify-end gap-2 p-4 bg-gray-50/50 border-b border-gray-100">
//                         <button
//                           onClick={handleUseTemplate}
//                           disabled={!isAccessible}
//                           className={`w-full sm:w-auto px-5 py-2.5 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${
//                             isAccessible
//                               ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:scale-105"
//                               : "bg-gray-400 text-white cursor-not-allowed"
//                           }`}
//                         >
//                           {isAccessible ? (
//                             <>Use This Template <FiChevronRight className="w-4 h-4" /></>
//                           ) : (
//                             <>Upgrade to Use <FiLock className="w-4 h-4" /></>
//                           )}
//                         </button>
//                         <button
//                           onClick={() => router.back()}
//                           className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm"
//                         >
//                           <FiArrowLeft className="w-4 h-4" /> Go Back
//                         </button>
//                       </div>
//                     );
//                   })()}

//                   {/* Preview Content */}
//                   <div className="p-4">
//                     {previewTemplate ? (
//                       <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200 group">
//                         <Image
//                           src={previewTemplate.image}
//                           alt={previewTemplate.style!}
//                           fill
//                           className="object-contain object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer"
//                           onClick={toggleFullscreen}
//                           priority
//                         />
//                         {(() => {
//                           const templateIndex = getTemplateIndex(previewTemplate.id);
//                           const isAccessible = isTemplateAccessible(templateIndex);
//                           return !isAccessible && (
//                             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                               <div className="text-center">
//                                 <FiLock className="w-8 h-8 text-white mx-auto mb-2" />
//                                 <p className="text-white text-sm font-medium">Premium Template</p>
//                               </div>
//                             </div>
//                           );
//                         })()}
//                         {/* Fullscreen overlay indicator */}
//                         <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <div className="bg-black/50 rounded-lg p-1.5">
//                             <FiMaximize2 className="w-3 h-3 text-white" />
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
//                           <FiGrid className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <h3 className="text-base font-semibold text-gray-700">No Template Selected</h3>
//                         <p className="text-sm text-gray-500">Select a template to preview</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Mobile Overlay */}
//         <AnimatePresence>
//           {isMobile && isSidebarOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsSidebarOpen(false)}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
//             />
//           )}
//         </AnimatePresence>

//         <style jsx>{`
//           .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//           .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
//           .custom-scrollbar::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 10px; }
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4338ca; }
//         `}</style>
//       </ProtectedRoute>
//     </div>
//   );
// }






















































"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiArrowLeft,
  FiChevronRight,
  FiDownload,
  FiEye,
  FiMenu,
  FiX,
  FiLock,
  FiStar,
  FiTrendingUp,
  FiShield,
  FiZoomIn,
  FiZoomOut,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { IoSparkles, IoCheckmarkCircle } from "react-icons/io5";
import { Crown, Zap } from "lucide-react";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import { CreateContext } from "@/app/context/CreateContext";
import Header from "@/app/components/layouts/Header";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import axios from "axios";
import { User } from "@/app/types/user.types";
import { API_URL } from "@/app/config/api";
import ProtectedRoute from "@/app/utils/ProtectedRoute";

interface usersCurrentPlan {
  amount: number;
  plan: string;
}

// Define plan limits with required plan for each template index
const PLAN_CONFIG = {
  free: {
    maxTemplates: 1,
    label: "Free",
    color: "from-slate-500 to-slate-600",
    badgeColor: "bg-slate-100 text-slate-700",
    borderColor: "border-slate-200",
  },
  pro: {
    maxTemplates: 3,
    label: "Pro",
    color: "from-indigo-600 to-indigo-500",
    badgeColor: "bg-indigo-100 text-indigo-700",
    borderColor: "border-indigo-200",
  },
  proplus: {
    maxTemplates: 5,
    label: "Pro Plus",
    color: "from-amber-500 to-orange-500",
    badgeColor: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-200",
  },
  premium: {
    maxTemplates: Infinity,
    label: "Premium",
    color: "from-purple-500 to-indigo-600",
    badgeColor: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
  },
};

// Helper function to get required plan for a template index
const getRequiredPlanForTemplate = (index: number): keyof typeof PLAN_CONFIG => {
  if (index < PLAN_CONFIG.free.maxTemplates) return "free";
  if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
  if (index < PLAN_CONFIG.proplus.maxTemplates) return "proplus";
  return "premium";
};

export default function ChangeTemplate() {
  const router = useRouter();
  const context = useContext(CreateContext);

  const { chosenTemplate, setChosenTemplate } = context || {
    chosenTemplate: null,
    setChosenTemplate: () => {},
  };

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(
    chosenTemplate || templateData[0] || null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [usersCurrentPlan, setUsersCurrentPlan] = useState<usersCurrentPlan | null>(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
    template: Template;
    requiredPlan: string;
  } | null>(null);
  
  // Fullscreen and Zoom states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Get current plan name (normalized)
  const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
    const plan = usersCurrentPlan?.plan?.toLowerCase() || "";
    if (plan.includes("pro plus")) return "proplus";
    if (plan.includes("pro")) return "pro";
    if (plan.includes("premium")) return "premium";
    return "free";
  };

  // Check if template is accessible based on plan
  const isTemplateAccessible = (templateIndex: number): boolean => {
    const currentPlan = getCurrentPlan();
    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return templateIndex < maxTemplates;
  };

  // Get available templates count based on plan
  const getAvailableTemplatesCount = (): number => {
    const currentPlan = getCurrentPlan();
    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return Math.min(maxTemplates, templateData.length);
  };

  // Get template index by ID
  const getTemplateIndex = (templateId: number): number => {
    return templateData.findIndex((t) => t.id === templateId);
  };

  // Handle template selection with lock check
  const handleSelectTemplate = (template: Template, index: number) => {
    if (isTemplateAccessible(index)) {
      setPreviewTemplate(template);
      // Reset zoom and position when changing template
      setZoom(1);
      setImagePosition({ x: 0, y: 0 });
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } else {
      const requiredPlan = getRequiredPlanForTemplate(index);
      setSelectedLockedTemplate({
        template,
        requiredPlan: PLAN_CONFIG[requiredPlan].label,
      });
      setShowUpgradePopup(true);
    }
  };

  const handleUseTemplate = () => {
    if (!previewTemplate) return;

    const templateIndex = getTemplateIndex(previewTemplate?.id!);

    if (isTemplateAccessible(templateIndex)) {
      setChosenTemplate(previewTemplate);
      setLocalStorage("chosenTemplate", previewTemplate);
      router.push("/resume-details/contact");
    } else {
      const requiredPlan = getRequiredPlanForTemplate(templateIndex);
      setSelectedLockedTemplate({
        template: previewTemplate,
        requiredPlan: PLAN_CONFIG[requiredPlan].label,
      });
      setShowUpgradePopup(true);
    }
  };

  // Fullscreen handlers
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Reset zoom and position when exiting fullscreen
    if (isFullscreen) {
      setZoom(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  // Zoom handlers
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Drag handlers for panned zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard handlers for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
          setZoom(1);
          setImagePosition({ x: 0, y: 0 });
        } else if (e.key === '+' || e.key === '=') {
          zoomIn();
        } else if (e.key === '-') {
          zoomOut();
        } else if (e.key === '0') {
          resetZoom();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: { userId: userDetails?.id },
        });
        setUsersCurrentPlan(response?.data?.payments?.[0]);
      } catch (err) {
        console.log(err);
      }
    };

    if (userDetails?.id) fetchUserData();
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set default template on mount
  useEffect(() => {
    if (!previewTemplate && templateData.length > 0) {
      setPreviewTemplate(templateData[0]);
    }
  }, [previewTemplate]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById("template-sidebar");
        const toggle = document.getElementById("sidebar-toggle");
        if (
          sidebar &&
          !sidebar.contains(e.target as Node) &&
          toggle &&
          !toggle.contains(e.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const currentPlan = getCurrentPlan();
  const availableTemplates = getAvailableTemplatesCount();
  const totalTemplates = templateData.length;
  const isUpgradeNeeded = availableTemplates < totalTemplates;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <ProtectedRoute>
        <Header />

        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed bottom-6 left-0 right-0 z-30 px-4">
          <div className="flex items-center justify-center">
            <button
              id="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSidebarOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                {isSidebarOpen ? "Close Templates" : "Browse Templates"}
              </span>
            </button>
          </div>
        </div>

        {/* Upgrade Popup */}
        <AnimatePresence>
          {showUpgradePopup && selectedLockedTemplate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 text-white text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Upgrade Required</h2>
                  <p className="text-white/80 text-xs sm:text-sm">Unlock this premium template</p>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-5 sm:mb-6 space-y-3">
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Template:</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        {selectedLockedTemplate.template.style}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-amber-100 rounded-full">
                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                        <span className="text-[10px] sm:text-xs font-semibold text-amber-700">
                          Requires {selectedLockedTemplate.requiredPlan} Plan
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Your Plan:</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
                        {currentPlan}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                        {availableTemplates} of {totalTemplates} templates unlocked
                      </p>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Upgrade to access:</h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                        <FiLock className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                        <span>Unlock {totalTemplates - availableTemplates} more templates</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                        <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                        <span>Premium designs & layouts</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowUpgradePopup(false)}
                      className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all text-xs sm:text-sm"
                    >
                      Maybe Later
                    </button>
                    <button
                      onClick={() => {
                        setShowUpgradePopup(false);
                        router.push("/choose-plan");
                      }}
                      className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all text-xs sm:text-sm"
                    >
                      View Plans
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Fullscreen Preview Modal */}
        <AnimatePresence>
          {isFullscreen && previewTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
            >
              {/* Fullscreen Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border-b border-white/10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition text-white"
                  >
                    <FiMinimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-white font-medium text-xs sm:text-sm">{previewTemplate.style}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Zoom Controls */}
                  <button
                    onClick={zoomOut}
                    className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition text-white"
                    title="Zoom Out (Ctrl + -)"
                  >
                    <FiZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-5" />
                  </button>
                  <span className="text-white text-[10px] sm:text-xs min-w-[45px] sm:min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition text-white"
                    title="Zoom In (Ctrl + +)"
                  >
                    <FiZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-5" />
                  </button>
                  <button
                    onClick={resetZoom}
                    className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
                  >
                    Reset
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition text-white max-lg:hidden"
                  >
                    <FiMinimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Fullscreen Content */}
              <div
                ref={imageContainerRef}
                className="flex-1 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoom}) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
                    cursor: zoom > 1 ? 'grab' : 'default',
                  }}
                >
                  <img
                    src={previewTemplate.image}
                    alt={previewTemplate.style}
                    className="max-h-[80vh] sm:max-h-[90vh] object-contain"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              </div>

              {/* Zoom indicator */}
              {zoom !== 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/50 rounded-full text-white text-[10px] sm:text-xs">
                  Zoom: {Math.round(zoom * 100)}% • Drag to pan
                </div>
              )}

              {/* Keyboard shortcuts hint */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white/40 text-[8px] sm:text-xs max-sm:hidden sm:block">
                + / - to zoom • 0 to reset • Esc to exit
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-10 xl:py-12">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 xl:gap-8 relative">
            {/* Template List - Sidebar */}
            <AnimatePresence>
              {(isSidebarOpen || !isMobile) && (
                <motion.div
                  id="template-sidebar"
                  variants={containerVariants}
                  initial={isMobile ? { x: -320, opacity: 0 } : "hidden"}
                  animate={isMobile ? { x: 0, opacity: 1 } : "visible"}
                  exit={isMobile ? { x: -320, opacity: 0 } : undefined}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={`
                    ${isMobile
                      ? "fixed inset-y-0 left-0 z-40 w-[85%] max-w-sm bg-white shadow-2xl overflow-hidden rounded-r-2xl"
                      : "lg:w-80 xl:w-96 space-y-4 relative"
                  }`}
                >
                  {isMobile && (
                    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                      <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Templates</h2>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      </button>
                    </div>
                  )}

                  <div className={isMobile ? "p-3 sm:p-4 overflow-y-auto h-[calc(100vh-70px)]" : ""}>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                          <FiGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                          <span>Templates</span>
                        </h2>
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-indigo-50 text-indigo-700 rounded-full text-[9px] sm:text-xs font-medium">
                          {availableTemplates}/{totalTemplates}
                        </span>
                      </div>

                      {/* Plan Info Bar */}
                      {isUpgradeNeeded && (
                        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-[10px] sm:text-xs text-amber-800">
                            <strong className="capitalize">{currentPlan}</strong> plan • 
                            Upgrade to unlock {totalTemplates - availableTemplates} more templates
                          </p>
                        </div>
                      )}

                      <div className="space-y-2 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                        {templateData.map((template, index) => {
                          const isSelected = previewTemplate?.id === template.id;
                          const isAccessible = isTemplateAccessible(index);
                          const requiredPlan = getRequiredPlanForTemplate(index);
                          const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
                          const isPremium = requiredPlan !== "free";

                          return (
                            <motion.div
                              key={template.id}
                              variants={itemVariants}
                              whileHover={isAccessible ? { x: 4 } : {}}
                              onClick={() => handleSelectTemplate(template, index)}
                              className={`
                                relative group cursor-pointer rounded-lg sm:rounded-xl transition-all duration-300
                                ${!isAccessible ? "opacity-75" : ""}
                                ${isSelected && isAccessible
                                  ? "bg-indigo-50 border-2 border-indigo-500 shadow-md"
                                  : isAccessible
                                    ? "bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md"
                                    : "bg-gray-50 border border-gray-200 cursor-not-allowed"
                                }
                              `}
                            >
                              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3">
                                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={template.image}
                                    alt={template.style!}
                                    fill
                                    className="object-cover"
                                  />
                                  {!isAccessible && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                      <FiLock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                                    <h3 className="font-semibold text-gray-900 truncate text-[11px] sm:text-xs md:text-sm">
                                      {template.style}
                                    </h3>
                                    {isPremium ? (
                                      <span className={`px-1 sm:px-1.5 py-0.5 ${PLAN_CONFIG[requiredPlan].badgeColor} rounded-full text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5 sm:gap-1`}>
                                        {requiredPlan === "premium" ? <Crown className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> : <FiStar className="w-2 h-2 sm:w-2.5 sm:h-2.5" />}
                                        <span className="max-xs:hidden xs:inline">{requiredPlanLabel}</span>
                                      </span>
                                    ) : (
                                      <span className="px-1 sm:px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[8px] sm:text-[10px] font-medium">
                                        Free
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[8px] sm:text-[9px] text-gray-500 line-clamp-2 mb-0.5">
                                    {template.description}
                                  </p>
                                  {isSelected && isAccessible && (
                                    <span className="inline-flex items-center gap-0.5 text-indigo-600 text-[8px] sm:text-[9px] font-medium">
                                      <FiChevronRight className="w-2 h-2" />
                                      Selected
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`flex-1 transition-all duration-300 ${isMobile && isSidebarOpen ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            >
              <div className="sticky top-16 sm:top-20 lg:top-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Preview Header */}
                  <div className="p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="p-1 sm:p-1.5 bg-indigo-100 rounded-lg">
                          <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                        </div>
                        <div>
                          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Live Preview</h2>
                          <p className="text-[10px] sm:text-xs text-gray-500">{previewTemplate?.style || "Select a template"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Fullscreen Button */}
                        {previewTemplate && (
                          <button
                            onClick={toggleFullscreen}
                            className="p-1.5 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                            title="Fullscreen Preview (F11)"
                          >
                            <FiMaximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        {previewTemplate && (() => {
                          const templateIndex = getTemplateIndex(previewTemplate.id);
                          const isAccessible = isTemplateAccessible(templateIndex);
                          const requiredPlan = getRequiredPlanForTemplate(templateIndex);
                          return (
                            <div className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5 sm:gap-1 ${
                              isAccessible
                                ? requiredPlan === "free"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-indigo-100 text-indigo-700"
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {!isAccessible && <FiLock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                              {isAccessible && requiredPlan !== "free" && <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                              <span className="max-xs:hidden xs:inline">{!isAccessible ? `Requires ${PLAN_CONFIG[requiredPlan].label}` : requiredPlan === "free" ? "Free Template" : `${PLAN_CONFIG[requiredPlan].label} Template`}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {previewTemplate && (() => {
                    const templateIndex = getTemplateIndex(previewTemplate.id);
                    const isAccessible = isTemplateAccessible(templateIndex);
                    return (
                      <div className="flex flex-col sm:flex-row justify-end gap-1.5 sm:gap-2 p-3 sm:p-4 bg-gray-50/50 border-b border-gray-100">
                        <button
                          onClick={handleUseTemplate}
                          disabled={!isAccessible}
                          className={`w-full cursor-pointer sm:w-auto px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm ${
                            isAccessible
                              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:scale-105"
                              : "bg-gray-400 text-white cursor-not-allowed"
                          }`}
                        >
                          {isAccessible ? (
                            <>Use This Template <FiChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></>
                          ) : (
                            <>Upgrade to Use <FiLock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></>
                          )}
                        </button>
                        <button
                          onClick={() => router.back()}
                          className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm cursor-pointer"
                        >
                          <FiArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Go Back
                        </button>
                      </div>
                    );
                  })()}

                  {/* Preview Content */}
                  <div className="p-3 sm:p-4">
                    {previewTemplate ? (
                      <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200 group">
                        <Image
                          src={previewTemplate.image}
                          alt={previewTemplate.style!}
                          fill
                          className="object-contain object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                          onClick={toggleFullscreen}
                          priority
                        />
                        {(() => {
                          const templateIndex = getTemplateIndex(previewTemplate.id);
                          const isAccessible = isTemplateAccessible(templateIndex);
                          return !isAccessible && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="text-center">
                                <FiLock className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-1 sm:mb-2" />
                                <p className="text-white text-[10px] sm:text-xs font-medium">Premium Template</p>
                              </div>
                            </div>
                          );
                        })()}
                      
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-10 md:py-12">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                          <FiGrid className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-700">No Template Selected</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500">Select a template to preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar { width: 3px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4338ca; }
          
          @media (min-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          }
        `}</style>
      </ProtectedRoute>
    </div>
  );
}