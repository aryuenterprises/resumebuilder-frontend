// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   FiGrid,
//   FiArrowLeft,
//   FiChevronRight,
//   FiDownload,
//   FiEye,
// } from "react-icons/fi";
// import { IoSparkles, IoCheckmarkCircle } from "react-icons/io5";
// import { templateData } from "@/app/data";
// import { Template } from "@/app/types";
// import { CreateContext } from "@/app/context/CreateContext";
// import Header from "@/app/components/layouts/Header";

// export default function ChangeTemplate() {
//   const router = useRouter();
//   const context = useContext(CreateContext);

//   const { chosenTemplate, setChosenTemplate } = context;

//   const [previewTemplate, setPreviewTemplate] = useState<Template | null>(
//     chosenTemplate || templateData[0] || null,
//   );

//   useEffect(() => {
//     if (!previewTemplate && templateData.length > 0) {
//       setPreviewTemplate(templateData[0]);
//     }
//   }, [previewTemplate]);

//   const handleSelectTemplate = (template: Template) => {
//     setPreviewTemplate(template);
//   };

//   const handleUseTemplate = () => {
//     if (!previewTemplate) return;

//     setChosenTemplate(previewTemplate);
//     localStorage.setItem("chosenTemplate", JSON.stringify(previewTemplate));
//     router.push("/resume-details/contact");
//   };

//   const containerVariants = {
//     hidden: {
//       opacity: 0,
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: {
//       y: 20,
//       opacity: 0,
//     },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring" as const,
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       <Header />

//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-[#5E000B] to-[#C40116]">
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
//               Choose Your Perfect
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">
//                 Resume Template
//               </span>
//             </h1>

//             <p className="text-xl text-white/90 max-w-3xl mx-auto">
//               Just pick your favorite and start building!
//             </p>

//             {/* Stats */}
//             <div className="flex flex-wrap justify-center gap-8 mt-12">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">
//                   {templateData.length}+
//                 </div>
//                 <div className="text-white/80 text-sm">
//                   Professional Templates
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">100%</div>
//                 <div className="text-white/80 text-sm">ATS Friendly</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">5min</div>
//                 <div className="text-white/80 text-sm">Quick Setup</div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Curved Bottom */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
//           </svg>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Templates Grid - Side by Side Layout */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Template List - Sidebar */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="lg:w-[380px] space-y-4"
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-soft">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <FiGrid className="w-5 h-5 text-[#C40116]" />
//                   Available Templates
//                 </h2>
//                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
//                   {templateData.length} templates
//                 </span>
//               </div>

//               <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//                 {templateData.map((template) => {
//                   const isSelected = previewTemplate?.id === template.id;

//                   return (
//                     <motion.div
//                       key={template.id}
//                       variants={itemVariants}
//                       whileHover={{ x: 4 }}
//                       onClick={() => handleSelectTemplate(template)}
//                       className={`
//                         relative group cursor-pointer rounded-xl transition-all duration-300
//                         ${
//                           isSelected
//                             ? "bg-gradient-to-r from-[#C40116]/10 to-[#5E000B]/10 border-2 border-[#C40116] shadow-lg"
//                             : "bg-white border border-gray-200 hover:border-[#C40116]/50 hover:shadow-md"
//                         }
//                       `}
//                     >
//                       <div className="flex items-start gap-4 p-4">
//                         {/* Template Preview Thumbnail */}
//                         <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
//                           <Image
//                             src={template.image}
//                             alt={template.style}
//                             fill
//                             sizes="64px"
//                             className="object-cover"
//                           />
//                         </div>

//                         {/* Template Info */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center justify-between mb-1">
//                             <h3 className="font-semibold text-gray-900 truncate">
//                               {template.style}
//                             </h3>
//                             <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap">
//                               Free
//                             </span>
//                           </div>
//                           <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                             {template.description}
//                           </p>

//                           <div className="flex items-center gap-2">
//                             {isSelected && (
//                               <span className="inline-flex items-center gap-1 text-[#C40116] text-xs font-medium">
//                                 <FiChevronRight className="w-3 h-3" />
//                                 Selected
//                               </span>
//                             )}

//                             {template.pic === "true" && (
//                               <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
//                                 <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
//                                 Photo Ready
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Quick Tips Card */}
//             <div className="bg-gradient-to-br from-[#C40116]/5 to-[#5E000B]/5 rounded-2xl border border-[#C40116]/20 p-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2 bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-lg">
//                   <IoSparkles className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900">Quick Tips</h3>
//               </div>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <span className="text-[#C40116] font-bold">•</span>
//                   All templates are ATS-friendly
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-[#C40116] font-bold">•</span>
//                   Templates with photo support are marked "Photo Ready"
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-[#C40116] font-bold">•</span>
//                   You can switch templates anytime
//                 </li>
//               </ul>
//             </div>
//           </motion.div>

//           {/* Preview Section */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="flex-1"
//           >
//             <div className="sticky top-6">
//               <div className="bg-white rounded-2xl border border-gray-200/50 shadow-soft overflow-hidden">
//                 {/* Preview Header */}
//                 <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-br from-[#C40116]/10 to-[#5E000B]/10 rounded-lg">
//                         <FiEye className="w-5 h-5 text-[#C40116]" />
//                       </div>
//                       <div>
//                         <h2 className="text-xl font-semibold text-gray-900">
//                           Live Preview
//                         </h2>
//                         <p className="text-sm text-gray-500">
//                           {previewTemplate?.style || "Select a template"}
//                         </p>
//                       </div>
//                     </div>

//                     {previewTemplate && (
//                       <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
//                         Free Template
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {previewTemplate && (
//                     <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={handleUseTemplate}
//                         className="px-6 py-3.5 bg-gradient-to-r from-[#C40116] to-[#5E000B] hover:from-[#5E000B] hover:to-[#C40116] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
//                       >
//                         Use This Template
//                       </motion.button>

//                       <button
//                         onClick={() => router.back()}
//                         className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
//                       >
//                         <FiArrowLeft className="w-5 h-5" />
//                         Go Back
//                       </button>
//                     </div>
//                 )}
//                 {/* Preview Content */}
//                 <div className="p-6">
//                   {previewTemplate ? (
//                     <motion.div
//                       key={previewTemplate.id}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="space-y-6"
//                     >
//                       {/* Template Preview Image */}
//                       <div className="relative aspect-[3/4] w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200/50 group">
//                         <Image
//                           src={previewTemplate.image}
//                           alt={previewTemplate.style}
//                           fill
//                           sizes="(max-width: 768px) 100vw, 50vw"
//                           className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
//                           priority
//                           quality={100}
//                           unoptimized
//                         />

//                         {/* Free Badge Overlay */}
//                         <div className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
//                           <IoCheckmarkCircle className="w-4 h-4" />
//                           Free
//                         </div>

//                         {/* Photo Ready Badge */}
//                         {previewTemplate.pic === "true" && (
//                           <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500 text-white rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
//                             <span>📸</span>
//                             Photo Ready
//                           </div>
//                         )}
//                       </div>

//                     </motion.div>
//                   ) : (
//                     <div className="text-center py-16">
//                       <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
//                         <FiGrid className="w-12 h-12 text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                         No Template Selected
//                       </h3>
//                       <p className="text-gray-500 text-sm">
//                         Select a template from the left to preview it here
//                       </p>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #c40116;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #5e000b;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useContext } from "react";
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
} from "react-icons/fi";
import { IoSparkles, IoCheckmarkCircle } from "react-icons/io5";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import { CreateContext } from "@/app/context/CreateContext";
import Header from "@/app/components/layouts/Header";
import { setLocalStorage } from "@/app/utils";

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

  const handleSelectTemplate = (template: Template) => {
    setPreviewTemplate(template);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleUseTemplate = () => {
    if (!previewTemplate) return;

    setChosenTemplate(previewTemplate);
    // localStorage.setItem("chosenTemplate", JSON.stringify(previewTemplate));

    setLocalStorage("chosenTemplate", previewTemplate);


    router.push("/resume-details/contact");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      {/* Mobile Sidebar Toggle - Only visible on mobile/tablet */}
      <div className="lg:hidden fixed bottom-0 z-30 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 w-full">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            id="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C40116] to-[#5E000B] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSidebarOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {isSidebarOpen ? "Close Templates" : "See Templates"}
            </span>
          </button>
        </div>
      </div>

      {/* Hero Section - Responsive padding and text sizes */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5E000B] to-[#C40116]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
              Choose Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200 mt-2 sm:mt-0">
                Resume Template
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Just pick your favorite and start building!
            </p>

            {/* Stats - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 max-w-3xl mx-auto px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {templateData.length}+
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  Professional Templates
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  ATS Friendly
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  5min
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  Quick Setup
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Curved Bottom - Responsive */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 lg:h-10">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Templates Grid - Responsive layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
          {/* Template List - Sidebar - Mobile Drawer */}
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
                  ${
                    isMobile
                      ? "fixed inset-y-0 left-0 z-40 w-[95%] bg-white shadow-2xl overflow-hidden"
                      : "lg:w-[380px] space-y-4 relative"
                  }
                `}
              >
                {isMobile && (
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#C40116]/5 to-[#5E000B]/5">
                    <h2 className="font-semibold text-gray-900">Templates</h2>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}

                <div
                  className={
                    isMobile ? "p-4 overflow-y-auto h-[calc(100vh-70px)]" : ""
                  }
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 sm:p-5 lg:p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FiGrid className="w-4 h-4 sm:w-5 sm:h-5 text-[#C40116]" />
                        <span className="truncate">Available Templates</span>
                      </h2>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap">
                        {templateData.length} templates
                      </span>
                    </div>

                    <div className="space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                      {templateData.map((template) => {
                        const isSelected = previewTemplate?.id === template.id;

                        return (
                          <motion.div
                            key={template.id}
                            variants={itemVariants}
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectTemplate(template)}
                            className={`
                              relative group cursor-pointer rounded-xl transition-all duration-300
                              ${
                                isSelected
                                  ? "bg-gradient-to-r from-[#C40116]/10 to-[#5E000B]/10 border-2 border-[#C40116] shadow-lg"
                                  : "bg-white border border-gray-200 hover:border-[#C40116]/50 hover:shadow-md"
                              }
                            `}
                          >
                            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4">
                              {/* Template Preview Thumbnail - Responsive size */}
                              <div className="relative w-14 h-16 sm:w-16 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                                <Image
                                  src={template.image}
                                  alt={template.style}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </div>

                              {/* Template Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                                    {template.style}
                                  </h3>
                                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                    Free
                                  </span>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mb-2">
                                  {template.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-2">
                                  {isSelected && (
                                    <span className="inline-flex items-center gap-1 text-[#C40116] text-[10px] sm:text-xs font-medium">
                                      <FiChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      Selected
                                    </span>
                                  )}

                                  {template.pic === "true" && (
                                    <span className="inline-flex items-center gap-1 text-amber-600 text-[10px] sm:text-xs font-medium">
                                      <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                                      Photo Ready
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Tips Card - Responsive */}
                  <div className="max-md:hidden mt-4 bg-gradient-to-br from-[#C40116]/5 to-[#5E000B]/5 rounded-2xl border border-[#C40116]/20 p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-r from-[#C40116] to-[#5E000B] rounded-lg">
                        <IoSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        Quick Tips
                      </h3>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#C40116] font-bold">•</span>
                        <span className="flex-1">
                          All templates are ATS-friendly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#C40116] font-bold">•</span>
                        <span className="flex-1">
                          Templates with photo support are marked "Photo Ready"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#C40116] font-bold">•</span>
                        <span className="flex-1">
                          You can switch templates anytime
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview Section - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`
              flex-1 transition-all duration-300
              ${isMobile && isSidebarOpen ? "opacity-50 pointer-events-none" : "opacity-100"}
            `}
          >
            <div className="sticky top-20 lg:top-6">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/50 shadow-soft overflow-hidden">
                {/* Preview Header - Responsive */}
                <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#C40116]/10 to-[#5E000B]/10 rounded-lg">
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5 text-[#C40116]" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                          Live Preview
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {previewTemplate?.style || "Select a template"}
                        </p>
                      </div>
                    </div>

                    {previewTemplate && (
                      <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] sm:text-xs font-medium w-fit">
                        Free Template
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                {previewTemplate && (
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 bg-gray-50/50 border-b border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUseTemplate}
                      className="w-fit px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#C40116] to-[#5E000B] hover:from-[#5E000B] hover:to-[#C40116] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <span>Use This Template</span>
                    </motion.button>

                    <button
                      onClick={() => router.back()}
                      className="w-full sm:w-auto px-4 py-3 sm:px-5 sm:py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="">Go Back</span>
                    </button>
                  </div>
                )}

                {/* Preview Content - Responsive */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {previewTemplate ? (
                    <motion.div
                      key={previewTemplate.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-5 lg:space-y-6"
                    >
                      {/* Template Preview Image - Responsive sizing */}
                      <div className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-gray-200/50 group">
                        <Image
                          src={previewTemplate.image}
                          alt={previewTemplate.style}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          priority
                          quality={100}
                          unoptimized
                        />

                        {/* Badges - Responsive positioning and sizing */}
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-1.5 bg-emerald-500 text-white rounded-full text-[10px] sm:text-xs font-medium shadow-lg flex items-center gap-0.5 sm:gap-1">
                          <IoCheckmarkCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                          <span>Free</span>
                        </div>

                        {previewTemplate.pic === "true" && (
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-1.5 bg-amber-500 text-white rounded-full text-[10px] sm:text-xs font-medium shadow-lg flex items-center gap-0.5 sm:gap-1">
                            <span className="text-xs sm:text-sm">📸</span>
                            <span className="hidden xs:inline">
                              Photo Ready
                            </span>
                            <span className="xs:hidden">Photo</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 sm:py-16">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <FiGrid className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                        No Template Selected
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 px-4">
                        Select a template from the left to preview it here
                      </p>
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

      {/* Custom Scrollbar Styles - Responsive */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c40116;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5e000b;
        }

        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
      `}</style>
    </div>
  );
}
