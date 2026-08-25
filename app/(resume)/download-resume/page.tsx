// "use client";

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useContext,
//   useMemo,
//   KeyboardEvent,
// } from "react";
// import Header from "../../components/layouts/Header";
// import Footer from "../../components/layouts/Footer";
// import { templateData } from "@/app/data";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import ProtectedRoute from "@/app/utils/ProtectedRoute";
// import Link from "next/link";
// import { CreateContext } from "@/app/context/CreateContext";
// import { usePreventReload } from "@/app/hooks";
// import api from "@/app/utils/api";
// import { API_URL } from "@/app/config/api";

// // ─── Types ────────────────────────────────────────────────────────────────────
// export interface ResumeCustomization {
//   fontFamily: string;
// }

// // ─── 16 Professional Fonts ───────────────────────────────────────────────────
// export const FONT_OPTIONS: {
//   label: string;
//   value: string;
//   category: string;
// }[] = [
//   // Sans-serif
//   { label: "Inter", value: "'Inter', sans-serif", category: "Sans-serif" },
//   { label: "Poppins", value: "'Poppins', sans-serif", category: "Sans-serif" },
//   { label: "Lato", value: "'Lato', sans-serif", category: "Sans-serif" },
//   { label: "Nunito", value: "'Nunito', sans-serif", category: "Sans-serif" },
//   { label: "Raleway", value: "'Raleway', sans-serif", category: "Sans-serif" },
//   {
//     label: "Montserrat",
//     value: "'Montserrat', sans-serif",
//     category: "Sans-serif",
//   },
//   {
//     label: "Open Sans",
//     value: "'Open Sans', sans-serif",
//     category: "Sans-serif",
//   },
//   { label: "Roboto", value: "'Roboto', sans-serif", category: "Sans-serif" },
//   // Serif
//   { label: "Merriweather", value: "'Merriweather', serif", category: "Serif" },
//   {
//     label: "Playfair Display",
//     value: "'Playfair Display', serif",
//     category: "Serif",
//   },
//   {
//     label: "DM Serif Display",
//     value: "'DM Serif Display', serif",
//     category: "Serif",
//   },
//   {
//     label: "Libre Baskerville",
//     value: "'Libre Baskerville', serif",
//     category: "Serif",
//   },
//   { label: "EB Garamond", value: "'EB Garamond', serif", category: "Serif" },
//   { label: "Crimson Text", value: "'Crimson Text', serif", category: "Serif" },
//   // Mono
//   {
//     label: "Source Code Pro",
//     value: "'Source Code Pro', monospace",
//     category: "Mono",
//   },
//   {
//     label: "JetBrains Mono",
//     value: "'JetBrains Mono', monospace",
//     category: "Mono",
//   },
// ];

// const FONT_GOOGLE_URL =
//   "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=Nunito:wght@300;400;600;700&family=Raleway:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;600;700&family=DM+Serif+Display&family=Libre+Baskerville:wght@400;700&family=EB+Garamond:wght@400;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Code+Pro:wght@400;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

// const DEFAULT_CUSTOMIZATION: ResumeCustomization = {
//   fontFamily: "'Inter', sans-serif",
// };

// // ─── Plan Access Control Helper ──────────────────────────────────────────────
// const getAccessibleTemplates = (plan: string): Template[] => {
//   switch (plan?.toLowerCase()) {
//     case "premium":
//       return templateData;
//     case "pro":
//       return templateData.slice(0, 3);
//     case "free":
//     default:
//       return templateData.slice(0, 1);
//   }
// };

// // ─── Thumbnail Component (Isolated & Scaled) ──────────────────────────────────
// const ResumeThumbnail: React.FC<{
//   component: React.ComponentType<any>;
//   isSelected: boolean;
// }> = React.memo(({ component, isSelected }) => {
//   const A4_W = 794;
//   const A4_H = 1123;
//   const THUMB_SCALE = 0.22;

//   return (
//     <div
//       style={{
//         width: A4_W * THUMB_SCALE,
//         height: A4_H * THUMB_SCALE,
//         overflow: "hidden",
//         position: "relative",
//         flexShrink: 0,
//         borderRadius: 4,
//         border: isSelected ? "2px solid #6366f1" : "2px solid transparent",
//       }}
//     >
//       <div
//         style={{
//           width: A4_W,
//           height: A4_H,
//           transform: `scale(${THUMB_SCALE})`,
//           transformOrigin: "top left",
//           pointerEvents: "none",
//           userSelect: "none",
//         }}
//       >
//         {React.createElement(component, {
//           alldata: undefined,
//           isThumbnail: true,
//         })}
//       </div>
//     </div>
//   );
// });
// ResumeThumbnail.displayName = "ResumeThumbnail";

// // ─── Font Picker ──────────────────────────────────────────────────────────────
// const FontPicker: React.FC<{
//   value: string;
//   onChange: (f: string) => void;
// }> = React.memo(({ value, onChange }) => {
//   useEffect(() => {
//     const id = "resume-font-preload";
//     if (!document.getElementById(id)) {
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = "stylesheet";
//       link.href = FONT_GOOGLE_URL;
//       document.head.appendChild(link);
//     }
//   }, []);

//   const categories = useMemo(
//     () => [...new Set(FONT_OPTIONS.map((f) => f.category))],
//     [],
//   );

//   return (
//     <div className="space-y-3">
//       {categories.map((cat) => (
//         <div key={cat}>
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
//             {cat}
//           </p>
//           <div className="grid grid-cols-2 gap-1.5">
//             {FONT_OPTIONS.filter((f) => f.category === cat).map((font) => (
//               <button
//                 key={font.value}
//                 type="button"
//                 onClick={() => onChange(font.value)}
//                 className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all text-center cursor-pointer ${
//                   value === font.value
//                     ? "border-indigo-500 bg-indigo-50 shadow-sm"
//                     : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//                 }`}
//               >
//                 {value === font.value && (
//                   <span className="absolute top-1 right-1 w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center">
//                     <svg
//                       className="w-1.5 h-1.5 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={3}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </span>
//                 )}
//                 <span
//                   style={{ fontFamily: font.value }}
//                   className="text-lg font-bold text-gray-800 leading-none mb-0.5"
//                 >
//                   Aa
//                 </span>
//                 <span className="text-[9px] text-gray-500 font-medium leading-tight truncate w-full text-center">
//                   {font.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// });
// FontPicker.displayName = "FontPicker";

// // ─── Template Switcher Sidebar (Accessible Div Container) ─────────────────────
// const TemplateSwitcher: React.FC<{
//   currentId: number;
//   onSwitch: (t: Template) => void;
//   userPlan: string;
// }> = React.memo(({ currentId, onSwitch, userPlan }) => {
//   const accessibleTemplates = useMemo(
//     () => getAccessibleTemplates(userPlan),
//     [userPlan],
//   );

//   const isTemplateAccessible = useCallback(
//     (templateId: number): boolean => {
//       return accessibleTemplates.some((t) => t.id === templateId);
//     },
//     [accessibleTemplates],
//   );

//   const handleKeyDown = (
//     e: KeyboardEvent<HTMLDivElement>,
//     t: Template,
//     isAccessible: boolean,
//   ) => {
//     if ((e.key === "Enter" || e.key === " ") && isAccessible) {
//       e.preventDefault();
//       onSwitch(t);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       {templateData.map((t) => {
//         const isSelected = t.id === currentId;
//         const isAccessible = isTemplateAccessible(t.id);
//         const isLocked = !isAccessible;

//         return (
//           <div
//             key={t.id}
//             role="button"
//             tabIndex={isAccessible ? 0 : -1}
//             aria-disabled={!isAccessible}
//             aria-selected={isSelected}
//             onClick={() => isAccessible && onSwitch(t)}
//             onKeyDown={(e) => handleKeyDown(e, t, isAccessible)}
//             className={`w-full flex items-start gap-3 p-2 rounded-xl border transition-all select-none text-left ${
//               isAccessible
//                 ? "cursor-pointer"
//                 : "cursor-not-allowed opacity-60 bg-gray-50 border-gray-200"
//             } ${
//               isSelected && isAccessible
//                 ? "border-indigo-500 bg-indigo-50 shadow-sm"
//                 : isAccessible
//                   ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//                   : ""
//             } ${isSelected && !isAccessible ? "border-red-300 bg-red-50" : ""}`}
//           >
//             {/* Live Thumbnail Preview */}
//             <div
//               className="flex-shrink-0 rounded-md overflow-hidden bg-gray-50 relative pointer-events-none"
//               style={{ width: 175, height: 247 }}
//             >
//               {t.component && (
//                 <ResumeThumbnail component={t.component} isSelected={false} />
//               )}
//               {isLocked && (
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>
//                 </div>
//               )}
//             </div>

//             {/* Template Info */}
//             <div className="flex-1 min-w-0 pointer-events-none">
//               {isLocked && (
//                 <span className="text-[8px] font-medium bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full inline-block mb-1">
//                   Upgrade Required
//                 </span>
//               )}
//               <p
//                 className={`text-xs font-semibold truncate ${
//                   isSelected && isAccessible
//                     ? "text-indigo-700"
//                     : "text-gray-800"
//                 }`}
//               >
//                 {t.style}
//               </p>
//               {t.description && (
//                 <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-tight">
//                   {t.description}
//                 </p>
//               )}
//               {isSelected && isAccessible && (
//                 <span className="inline-flex items-center gap-0.5 text-indigo-600 text-[10px] font-medium mt-1">
//                   ✓ Selected
//                 </span>
//               )}
//               {isSelected && !isAccessible && (
//                 <span className="inline-flex items-center gap-0.5 text-red-500 text-[10px] font-medium mt-1">
//                   ⚠ Not available on your plan
//                 </span>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// });
// TemplateSwitcher.displayName = "TemplateSwitcher";

// // ─── Customization Panel ──────────────────────────────────────────────────────
// const CustomizationPanel: React.FC<{
//   customization: ResumeCustomization;
//   onChange: (c: ResumeCustomization) => void;
//   onReset: () => void;
//   currentTemplateId: number;
//   onSwitchTemplate: (t: Template) => void;
//   userPlan: string;
// }> = React.memo(
//   ({
//     customization,
//     onChange,
//     onReset,
//     currentTemplateId,
//     onSwitchTemplate,
//     userPlan,
//   }) => {
//     const [activeTab, setActiveTab] = useState<"template" | "font">("template");

//     const tabs = useMemo(
//       () => [
//         { id: "template" as const, label: "Template" },
//         { id: "font" as const, label: "Font" },
//       ],
//       [],
//     );

//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="px-4 pt-4 pb-3 border-b border-gray-100">
//           <div className="flex items-center justify-between mb-0.5">
//             <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
//               Customize
//             </h2>
//             <button
//               type="button"
//               onClick={onReset}
//               className="text-[10px] text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline cursor-pointer transition-colors"
//             >
//               Reset
//             </button>
//           </div>
//           <p className="text-[10px] text-gray-400">
//             Personalize before download
//           </p>
//           <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
//             Plan: {userPlan?.toUpperCase() || "FREE"}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-100">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               type="button"
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 py-2.5 text-[11px] cursor-pointer font-semibold transition-colors ${
//                 activeTab === tab.id
//                   ? "text-indigo-600 border-b-2 border-indigo-500"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="overflow-y-auto px-3 py-3 max-h-[55vh] lg:max-h-[calc(100vh-320px)]">
//           {activeTab === "template" && (
//             <div>
//               <p className="text-[10px] text-gray-400 mb-2">
//                 Switch template — live preview updates instantly
//               </p>
//               <TemplateSwitcher
//                 currentId={currentTemplateId}
//                 onSwitch={onSwitchTemplate}
//                 userPlan={userPlan}
//               />
//             </div>
//           )}
//           {activeTab === "font" && (
//             <div>
//               <p className="text-[10px] text-gray-400 mb-2">
//                 16 professional fonts across 3 categories
//               </p>
//               <FontPicker
//                 value={customization.fontFamily}
//                 onChange={(f) => onChange({ ...customization, fontFamily: f })}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   },
// );
// CustomizationPanel.displayName = "CustomizationPanel";

// // ─── Main Page ────────────────────────────────────────────────────────────────
// // const Page = () => {
// //   usePreventReload();
// //   useContext(CreateContext);

// //   const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
// //   const [selectedComponent, setSelectedComponent] =
// //     useState<React.ComponentType<any> | null>(null);
// //   const [isTwoColumn, setIsTwoColumn] = useState(false);
// //   const [customization, setCustomization] = useState<ResumeCustomization>({
// //     ...DEFAULT_CUSTOMIZATION,
// //   });
// //   const [userPlan, setUserPlan] = useState<string>("free");

// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [previewScale, setPreviewScale] = useState(1);

// //   // ── Fetch user plan ──────────────────────────────────────────────
// //   useEffect(() => {
// //     let isMounted = true;

// //     const fetchUserData = async () => {
// //       try {
// //         const res = await api.get("/dashboard");
// //         const { subscription } = res?.data || {};
// //         const plan = subscription?.current_plan || "free";
// //         if (isMounted) setUserPlan(plan.toLowerCase());
// //       } catch (err) {
// //         console.error("Failed to fetch user plan:", err);
// //         if (isMounted) setUserPlan("free");
// //       }
// //     };

// //     const userDetails = getLocalStorage<{ id: string }>("user_details");
// //     if (userDetails?.id) {
// //       fetchUserData();
// //     } else {
// //       setUserPlan("free");
// //     }

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);

// //   // ── Detect layout format ──────────────────────────────────────────
// //   const detectTwoColumn = useCallback((t: Template): boolean => {
// //     const TWO_IDS = [2];
// //     const TWO_PATTERN = /templatetwo|template_two|template-two|twocolumn/i;
// //     return (
// //       !!(t as any).twoColumn ||
// //       TWO_PATTERN.test(t.component?.displayName || t.component?.name || "") ||
// //       TWO_IDS.includes(Number(t.id))
// //     );
// //   }, []);

// //   // ── Template Plan Authorization ──────────────────────────────────
// //   const isTemplateAccessible = useCallback(
// //     (templateId: number): boolean => {
// //       switch (userPlan) {
// //         case "premium":
// //           return true;
// //         case "pro":
// //           return templateId <= 3;
// //         case "free":
// //         default:
// //           return templateId === 1;
// //       }
// //     },
// //     [userPlan],
// //   );

// //   // ── Apply template Selection ─────────────────────────────────────
// //   const applyTemplate = useCallback(
// //     (t: Template) => {
// //       if (!isTemplateAccessible(t.id)) {
// //         console.warn(`Template ${t.id} is locked on the ${userPlan} plan.`);
// //         return;
// //       }
// //       setCurrentTemplate(t);
// //       setSelectedComponent(() => t.component ?? null);
// //       const isTwo = detectTwoColumn(t);
// //       setIsTwoColumn(isTwo);
// //       setLocalStorage("chosenTemplate", t);
// //       setCustomization((prev) => ({
// //         ...prev,
// //         fontFamily: isTwo ? "'Nunito', sans-serif" : "'Inter', sans-serif",
// //       }));
// //     },
// //     [userPlan, isTemplateAccessible, detectTwoColumn],
// //   );

// //   // ── Restore saved template selection on boot ─────────────────────
// //   useEffect(() => {
// //     if (!userPlan) return;

// //     const saved = getLocalStorage<Template>("chosenTemplate");
// //     let found = templateData.find(
// //       (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
// //     );

// //     if (found) {
// //       applyTemplate(found);
// //     } else {
// //       const accessibleTemplates = templateData.filter((t) =>
// //         isTemplateAccessible(t.id),
// //       );
// //       found = accessibleTemplates[0] || templateData[0];
// //       if (found) applyTemplate(found);
// //     }
// //   }, [userPlan, isTemplateAccessible, applyTemplate]);

// //   // ── Dynamic Responsive Scale ─────────────────────────────────────
// //   useEffect(() => {
// //     const calc = () => {
// //       if (containerRef.current) {
// //         const w = containerRef.current.clientWidth;
// //         setPreviewScale(Math.max(0.25, Math.min(1, (w - 8) / 794)));
// //       }
// //     };
// //     const timer = setTimeout(calc, 100);
// //     window.addEventListener("resize", calc);
// //     return () => {
// //       clearTimeout(timer);
// //       window.removeEventListener("resize", calc);
// //     };
// //   }, [selectedComponent]);

// //   const handleReset = useCallback(() => {
// //     setCustomization({
// //       ...DEFAULT_CUSTOMIZATION,
// //       fontFamily: isTwoColumn ? "'Nunito', sans-serif" : "'Inter', sans-serif",
// //     });
// //   }, [isTwoColumn]);

// //   const panelProps = useMemo(
// //     () => ({
// //       customization,
// //       onChange: setCustomization,
// //       onReset: handleReset,
// //       currentTemplateId: currentTemplate?.id ?? 0,
// //       onSwitchTemplate: applyTemplate,
// //       userPlan,
// //     }),
// //     [customization, handleReset, currentTemplate, applyTemplate, userPlan],
// //   );

// //   if (!selectedComponent) {
// //     return (
// //       <ProtectedRoute>
// //         <Header />
// //         <div className="min-h-screen bg-gray-50 flex justify-center items-center">
// //           <div className="text-center">
// //             <p className="text-gray-500 mb-2">No resume template selected.</p>
// //             <Link
// //               href="/dashboard"
// //               className="text-indigo-500 hover:underline font-medium"
// //             >
// //               ← Go to Dashboard
// //             </Link>
// //           </div>
// //         </div>
// //         <Footer />
// //       </ProtectedRoute>
// //     );
// //   }

// //   return (
// //     <ProtectedRoute>
// //       <Header />

// //       <div className="min-h-screen bg-gray-50 py-6 pb-28 lg:pb-8">
// //         <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
// //           <div className="mb-4 sm:mb-6">
// //             <h1 className="md:text-xl font-semibold text-gray-800">
// //               Finalize Your Resume
// //             </h1>
// //             <p className="text-xs sm:text-sm text-gray-500 mt-1">
// //               Switch templates, customize fonts, then download your PDF.
// //             </p>
// //           </div>

// //           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
// //             {/* Sidebar Controls */}
// //             <div className="w-full lg:w-72 xl:w-80 lg:flex-shrink-0 lg:sticky lg:top-6">
// //               <div className="block lg:hidden">
// //                 <CustomizationPanel {...panelProps} />
// //               </div>
// //               <div className="hidden lg:block">
// //                 <CustomizationPanel {...panelProps} />
// //               </div>
// //             </div>

// //             {/* Live Resume Canvas */}
// //             <div className="w-full lg:flex-1 min-w-0">
// //               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
// //                     Live Preview
// //                   </span>
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
// //                       {currentTemplate?.style}
// //                     </span>
// //                     <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
// //                       A4 · PDF ready
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <div
// //                   ref={containerRef}
// //                   className="flex justify-center overflow-hidden"
// //                 >
// //                   <div
// //                     style={{
// //                       transform: `scale(${previewScale})`,
// //                       transformOrigin: "top center",
// //                       width: `${794 / previewScale}px`,
// //                     }}
// //                   >
// //                     {React.createElement(selectedComponent, {
// //                       customization,
// //                       isThumbnail: false,
// //                     })}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </ProtectedRoute>
// //   );
// // };

// // export default Page;


// // ─── Main Page ────────────────────────────────────────────────────────────────
// const Page = () => {
//   usePreventReload();

//   const {
//   setContact,
//   setEducation,
//   setExperiences,
//   setProjects,
//   setSkills,
//   setSummary,
//   setFinalize,
//   setFullResumeData,
// } = useContext(CreateContext);

// const [isResumeDataLoaded, setIsResumeDataLoaded] = useState(false);

// // ── Fetch resume data (contact, education, experience, etc.) ──────
// // This page sits outside the /resume-details/* layout, so
// // ResumeDataFetcher never wraps it — without this, a hard refresh
// // wipes CreateContext (it's in-memory only) and the template falls
// // back to placeholder data.

//   useEffect(() => {
//   let isMounted = true;

//   const fetchResumeData = async () => {
//     try {
//       const userDetails = getLocalStorage<{ id: string }>("user_details");
//       if (!userDetails?.id) return;

//       const latestResumeId = getLocalStorage<string>("latest_resume_id");

//       const response = await api.get(`${API_URL}/user-resumes`);
//       const allResumes = Array.isArray(response.data) ? response.data : [];

//       // Prefer the specific resume the user was working on (matches
//       // latest_resume_id) over just grabbing whichever comes first —
//       // otherwise a dashboard "Edit" on an older resume gets silently
//       // swapped for the most recently touched one on refresh here.
//       const targetResume = latestResumeId
//         ? allResumes.find((r: any) => String(r.id) === String(latestResumeId))
//         : allResumes[0];

//       const resumeData = targetResume?.resume_data;

//       if (!resumeData || !isMounted) return;

//       setContact(resumeData?.contact || "");
//       setEducation(resumeData?.educations || []);
//       setExperiences(resumeData?.experiences || []);
//       setProjects(resumeData?.projects || []);
//       setSkills(resumeData?.skills || "");
//       setSummary(resumeData?.summary || "");
//       setFinalize(resumeData?.finalize || {});

//       setFullResumeData({
//         template: getLocalStorage<Template>("chosenTemplate")?.id,
//         contact: resumeData?.contact || {},
//         experiences: resumeData?.experiences || [],
//         education: resumeData?.educations || [],
//         skills: resumeData?.skills || {},
//         summary: resumeData?.summary || "",
//         finalize: resumeData?.finalize || {},
//         projects: resumeData?.projects || [],
//       });
//     } catch (err) {
//       console.error("Failed to fetch resume data:", err);
//     } finally {
//       if (isMounted) setIsResumeDataLoaded(true);
//     }
//   };

//   fetchResumeData();

//   return () => {
//     isMounted = false;
//   };
// }, []);


//   const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
//   const [selectedComponent, setSelectedComponent] =
//     useState<React.ComponentType<any> | null>(null);
//   const [isTwoColumn, setIsTwoColumn] = useState(false);
//   const [customization, setCustomization] = useState<ResumeCustomization>({
//     ...DEFAULT_CUSTOMIZATION,
//   });
//   const [userPlan, setUserPlan] = useState<string>("free");
//   const [isPlanLoaded, setIsPlanLoaded] = useState(false);
//   const [isInitializing, setIsInitializing] = useState(true);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [previewScale, setPreviewScale] = useState(1);

//   // ── Fetch user plan ──────────────────────────────────────────────
//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserData = async () => {
//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data || {};
//         const plan = subscription?.current_plan || "free";
//         if (isMounted) setUserPlan(plan.toLowerCase());
//       } catch (err) {
//         console.error("Failed to fetch user plan:", err);
//         if (isMounted) setUserPlan("free");
//       } finally {
//         if (isMounted) setIsPlanLoaded(true);
//       }
//     };

//     const userDetails = getLocalStorage<{ id: string }>("user_details");
//     if (userDetails?.id) {
//       fetchUserData();
//     } else {
//       setUserPlan("free");
//       setIsPlanLoaded(true);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // ── Template Plan Authorization ──────────────────────────────────
//   const isTemplateAccessible = useCallback(
//     (templateId: number): boolean => {
//       switch (userPlan) {
//         case "premium":
//           return true;
//         case "pro":
//           return templateId <= 3;
//         case "free":
//         default:
//           return templateId === 1;
//       }
//     },
//     [userPlan],
//   );

//   // ── Apply template Selection ─────────────────────────────────────
//   const applyTemplate = useCallback(
//     (t: Template) => {
//       if (!isTemplateAccessible(t.id)) {
//         console.warn(`Template ${t.id} is locked on the ${userPlan} plan.`);
//         return;
//       }
//       setCurrentTemplate(t);
//       setSelectedComponent(() => t.component ?? null);
//       const isTwo = !!(t as any).twoColumn;
//       setIsTwoColumn(isTwo);
//       setLocalStorage("chosenTemplate", t);
//       setCustomization((prev) => ({
//         ...prev,
//         fontFamily: isTwo ? "'Nunito', sans-serif" : "'Inter', sans-serif",
//       }));
//     },
//     [userPlan, isTemplateAccessible],
//   );

//   // ── Restore saved template selection on boot ─────────────────────
//   // Waits for the real plan to load first, so this runs once with the
//   // correct plan instead of once with the "free" placeholder and again
//   // after the real plan arrives.
//   // ── Restore saved template selection on boot ─────────────────────
//   useEffect(() => {
//     if (!isPlanLoaded || !isResumeDataLoaded) return;  // CHANGED

//     const saved = getLocalStorage<Template>("chosenTemplate");
//     let found = templateData.find(
//       (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
//     );

//     if (found) {
//       applyTemplate(found);
//     } else {
//       const accessibleTemplates = templateData.filter((t) =>
//         isTemplateAccessible(t.id),
//       );
//       found = accessibleTemplates[0] || templateData[0];
//       if (found) applyTemplate(found);
//     }

//     setIsInitializing(false);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isPlanLoaded, isResumeDataLoaded]);  // CHANGED

//   // ── Dynamic Responsive Scale ─────────────────────────────────────
//   useEffect(() => {
//     const calc = () => {
//       if (containerRef.current) {
//         const w = containerRef.current.clientWidth;
//         setPreviewScale(Math.max(0.25, Math.min(1, (w - 8) / 794)));
//       }
//     };
//     const timer = setTimeout(calc, 100);
//     window.addEventListener("resize", calc);
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", calc);
//     };
//   }, [selectedComponent]);

//   const handleReset = useCallback(() => {
//     setCustomization({
//       ...DEFAULT_CUSTOMIZATION,
//       fontFamily: isTwoColumn ? "'Nunito', sans-serif" : "'Inter', sans-serif",
//     });
//   }, [isTwoColumn]);

//   const panelProps = useMemo(
//     () => ({
//       customization,
//       onChange: setCustomization,
//       onReset: handleReset,
//       currentTemplateId: currentTemplate?.id ?? 0,
//       onSwitchTemplate: applyTemplate,
//       userPlan,
//     }),
//     [customization, handleReset, currentTemplate, applyTemplate, userPlan],
//   );

//   // ── Loading state — shown while plan/template is being resolved ──
//   if (isInitializing) {
//     return (
//       <ProtectedRoute>
//         <Header />
//         <div className="min-h-screen bg-gray-50 flex justify-center items-center">
//           <div className="text-center">
//             <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
//             <p className="text-gray-500 text-sm">Preparing your resume…</p>
//           </div>
//         </div>
//         <Footer />
//       </ProtectedRoute>
//     );
//   }

//   // ── Truly no template available (only reachable after init finishes) ──
//   if (!selectedComponent) {
//     return (
//       <ProtectedRoute>
//         <Header />
//         <div className="min-h-screen bg-gray-50 flex justify-center items-center">
//           <div className="text-center">
//             <p className="text-gray-500 mb-2">No resume template selected.</p>
//             <Link
//               href="/dashboard"
//               className="text-indigo-500 hover:underline font-medium"
//             >
//               ← Go to Dashboard
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </ProtectedRoute>
//     );
//   }

//   return (
//     <ProtectedRoute>
//       <Header />

//       <div className="min-h-screen bg-gray-50 py-6 pb-28 lg:pb-8">
//         <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
//           <div className="mb-4 sm:mb-6">
//             <h1 className="md:text-xl font-semibold text-gray-800">
//               Finalize Your Resume
//             </h1>
//             <p className="text-xs sm:text-sm text-gray-500 mt-1">
//               Switch templates, customize fonts, then download your PDF.
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
//             {/* Sidebar Controls */}
//             <div className="w-full lg:w-72 xl:w-80 lg:flex-shrink-0 lg:sticky lg:top-6">
//               <div className="block lg:hidden">
//                 <CustomizationPanel {...panelProps} />
//               </div>
//               <div className="hidden lg:block">
//                 <CustomizationPanel {...panelProps} />
//               </div>
//             </div>

//             {/* Live Resume Canvas */}
//             <div className="w-full lg:flex-1 min-w-0">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
//                     Live Preview
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
//                       {currentTemplate?.style}
//                     </span>
//                     <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
//                       A4 · PDF ready
//                     </span>
//                   </div>
//                 </div>
//                 <div
//                   ref={containerRef}
//                   className="flex justify-center overflow-hidden"
//                 >
//                   <div
//                     style={{
//                       transform: `scale(${previewScale})`,
//                       transformOrigin: "top center",
//                       width: `${794 / previewScale}px`,
//                     }}
//                   >
//                     {React.createElement(selectedComponent, {
//                       customization,
//                       isThumbnail: false,
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </ProtectedRoute>
//   );
// };

// export default Page;








"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
  KeyboardEvent,
} from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { templateData } from "@/app/data";
import { getLocalStorage, getSessionStorage, setLocalStorage } from "@/app/utils";
import { EditingResumeData, Template } from "@/app/types";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import Link from "next/link";
import { CreateContext } from "@/app/context/CreateContext";
import { usePreventReload } from "@/app/hooks";
import api from "@/app/utils/api";
import { API_URL } from "@/app/config/api";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ResumeCustomization {
  fontFamily: string;
}

// ─── 16 Professional Fonts ───────────────────────────────────────────────────
export const FONT_OPTIONS: {
  label: string;
  value: string;
  category: string;
}[] = [
  // Sans-serif
  { label: "Inter", value: "'Inter', sans-serif", category: "Sans-serif" },
  { label: "Poppins", value: "'Poppins', sans-serif", category: "Sans-serif" },
  { label: "Lato", value: "'Lato', sans-serif", category: "Sans-serif" },
  { label: "Nunito", value: "'Nunito', sans-serif", category: "Sans-serif" },
  { label: "Raleway", value: "'Raleway', sans-serif", category: "Sans-serif" },
  {
    label: "Montserrat",
    value: "'Montserrat', sans-serif",
    category: "Sans-serif",
  },
  {
    label: "Open Sans",
    value: "'Open Sans', sans-serif",
    category: "Sans-serif",
  },
  { label: "Roboto", value: "'Roboto', sans-serif", category: "Sans-serif" },
  // Serif
  { label: "Merriweather", value: "'Merriweather', serif", category: "Serif" },
  {
    label: "Playfair Display",
    value: "'Playfair Display', serif",
    category: "Serif",
  },
  {
    label: "DM Serif Display",
    value: "'DM Serif Display', serif",
    category: "Serif",
  },
  {
    label: "Libre Baskerville",
    value: "'Libre Baskerville', serif",
    category: "Serif",
  },
  { label: "EB Garamond", value: "'EB Garamond', serif", category: "Serif" },
  { label: "Crimson Text", value: "'Crimson Text', serif", category: "Serif" },
  // Mono
  {
    label: "Source Code Pro",
    value: "'Source Code Pro', monospace",
    category: "Mono",
  },
  {
    label: "JetBrains Mono",
    value: "'JetBrains Mono', monospace",
    category: "Mono",
  },
];

const FONT_GOOGLE_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=Nunito:wght@300;400;600;700&family=Raleway:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;600;700&family=DM+Serif+Display&family=Libre+Baskerville:wght@400;700&family=EB+Garamond:wght@400;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Code+Pro:wght@400;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

const DEFAULT_CUSTOMIZATION: ResumeCustomization = {
  fontFamily: "'Inter', sans-serif",
};

// ─── Plan Access Control Helper ──────────────────────────────────────────────
const getAccessibleTemplates = (plan: string): Template[] => {
  switch (plan?.toLowerCase()) {
    case "premium":
      return templateData;
    case "pro":
      return templateData.slice(0, 3);
    case "free":
    default:
      return templateData.slice(0, 1);
  }
};

// ─── Thumbnail Component (Isolated & Scaled) ──────────────────────────────────
const ResumeThumbnail: React.FC<{
  component: React.ComponentType<any>;
  isSelected: boolean;
}> = React.memo(({ component, isSelected }) => {
  const A4_W = 794;
  const A4_H = 1123;
  const THUMB_SCALE = 0.22;

  return (
    <div
      style={{
        width: A4_W * THUMB_SCALE,
        height: A4_H * THUMB_SCALE,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        borderRadius: 4,
        border: isSelected ? "2px solid #6366f1" : "2px solid transparent",
      }}
    >
      <div
        style={{
          width: A4_W,
          height: A4_H,
          transform: `scale(${THUMB_SCALE})`,
          transformOrigin: "top left",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {React.createElement(component, {
          alldata: undefined,
          isThumbnail: true,
        })}
      </div>
    </div>
  );
});
ResumeThumbnail.displayName = "ResumeThumbnail";

// ─── Font Picker ──────────────────────────────────────────────────────────────
const FontPicker: React.FC<{
  value: string;
  onChange: (f: string) => void;
}> = React.memo(({ value, onChange }) => {
  useEffect(() => {
    const id = "resume-font-preload";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = FONT_GOOGLE_URL;
      document.head.appendChild(link);
    }
  }, []);

  const categories = useMemo(
    () => [...new Set(FONT_OPTIONS.map((f) => f.category))],
    [],
  );

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <div key={cat}>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            {cat}
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {FONT_OPTIONS.filter((f) => f.category === cat).map((font) => (
              <button
                key={font.value}
                type="button"
                onClick={() => onChange(font.value)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all text-center cursor-pointer ${
                  value === font.value
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {value === font.value && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-1.5 h-1.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                )}
                <span
                  style={{ fontFamily: font.value }}
                  className="text-lg font-bold text-gray-800 leading-none mb-0.5"
                >
                  Aa
                </span>
                <span className="text-[9px] text-gray-500 font-medium leading-tight truncate w-full text-center">
                  {font.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
FontPicker.displayName = "FontPicker";

// ─── Template Switcher Sidebar (Accessible Div Container) ─────────────────────
const TemplateSwitcher: React.FC<{
  currentId: number;
  onSwitch: (t: Template) => void;
  userPlan: string;
}> = React.memo(({ currentId, onSwitch, userPlan }) => {
  const accessibleTemplates = useMemo(
    () => getAccessibleTemplates(userPlan),
    [userPlan],
  );

  const isTemplateAccessible = useCallback(
    (templateId: number): boolean => {
      return accessibleTemplates.some((t) => t.id === templateId);
    },
    [accessibleTemplates],
  );

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    t: Template,
    isAccessible: boolean,
  ) => {
    if ((e.key === "Enter" || e.key === " ") && isAccessible) {
      e.preventDefault();
      onSwitch(t);
    }
  };

  return (
    <div className="space-y-2">
      {templateData.map((t) => {
        const isSelected = t.id === currentId;
        const isAccessible = isTemplateAccessible(t.id);
        const isLocked = !isAccessible;

        return (
          <div
            key={t.id}
            role="button"
            tabIndex={isAccessible ? 0 : -1}
            aria-disabled={!isAccessible}
            aria-selected={isSelected}
            onClick={() => isAccessible && onSwitch(t)}
            onKeyDown={(e) => handleKeyDown(e, t, isAccessible)}
            className={`w-full flex items-start gap-3 p-2 rounded-xl border transition-all select-none text-left ${
              isAccessible
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-60 bg-gray-50 border-gray-200"
            } ${
              isSelected && isAccessible
                ? "border-indigo-500 bg-indigo-50 shadow-sm"
                : isAccessible
                  ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  : ""
            } ${isSelected && !isAccessible ? "border-red-300 bg-red-50" : ""}`}
          >
            {/* Live Thumbnail Preview */}
            <div
              className="flex-shrink-0 rounded-md overflow-hidden bg-gray-50 relative pointer-events-none"
              style={{ width: 175, height: 247 }}
            >
              {t.component && (
                <ResumeThumbnail component={t.component} isSelected={false} />
              )}
              {isLocked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="flex-1 min-w-0 pointer-events-none">
              {isLocked && (
                <span className="text-[8px] font-medium bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full inline-block mb-1">
                  Upgrade Required
                </span>
              )}
              <p
                className={`text-xs font-semibold truncate ${
                  isSelected && isAccessible
                    ? "text-indigo-700"
                    : "text-gray-800"
                }`}
              >
                {t.style}
              </p>
              {t.description && (
                <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                  {t.description}
                </p>
              )}
              {isSelected && isAccessible && (
                <span className="inline-flex items-center gap-0.5 text-indigo-600 text-[10px] font-medium mt-1">
                  ✓ Selected
                </span>
              )}
              {isSelected && !isAccessible && (
                <span className="inline-flex items-center gap-0.5 text-red-500 text-[10px] font-medium mt-1">
                  ⚠ Not available on your plan
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
TemplateSwitcher.displayName = "TemplateSwitcher";

// ─── Customization Panel ──────────────────────────────────────────────────────
const CustomizationPanel: React.FC<{
  customization: ResumeCustomization;
  onChange: (c: ResumeCustomization) => void;
  onReset: () => void;
  currentTemplateId: number;
  onSwitchTemplate: (t: Template) => void;
  userPlan: string;
}> = React.memo(
  ({
    customization,
    onChange,
    onReset,
    currentTemplateId,
    onSwitchTemplate,
    userPlan,
  }) => {
    const [activeTab, setActiveTab] = useState<"template" | "font">("template");

    const tabs = useMemo(
      () => [
        { id: "template" as const, label: "Template" },
        { id: "font" as const, label: "Font" },
      ],
      [],
    );

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Customize
            </h2>
            <button
              type="button"
              onClick={onReset}
              className="text-[10px] text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline cursor-pointer transition-colors"
            >
              Reset
            </button>
          </div>
          <p className="text-[10px] text-gray-400">
            Personalize before download
          </p>
          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
            Plan: {userPlan?.toUpperCase() || "FREE"}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-[11px] cursor-pointer font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-3 py-3 max-h-[55vh] lg:max-h-[calc(100vh-320px)]">
          {activeTab === "template" && (
            <div>
              <p className="text-[10px] text-gray-400 mb-2">
                Switch template — live preview updates instantly
              </p>
              <TemplateSwitcher
                currentId={currentTemplateId}
                onSwitch={onSwitchTemplate}
                userPlan={userPlan}
              />
            </div>
          )}
          {activeTab === "font" && (
            <div>
              <p className="text-[10px] text-gray-400 mb-2">
                16 professional fonts across 3 categories
              </p>
              <FontPicker
                value={customization.fontFamily}
                onChange={(f) => onChange({ ...customization, fontFamily: f })}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);
CustomizationPanel.displayName = "CustomizationPanel";

// ─── Main Page ────────────────────────────────────────────────────────────────
const Page = () => {
  usePreventReload();

  const {
  setContact,
  setEducation,
  setExperiences,
  setProjects,
  setSkills,
  setSummary,
  setFinalize,
  setFullResumeData,
} = useContext(CreateContext);

const [isResumeDataLoaded, setIsResumeDataLoaded] = useState(false);

// ── Fetch resume data (contact, education, experience, etc.) ──────
// This page sits outside the /resume-details/* layout, so
// ResumeDataFetcher never wraps it — without this, a hard refresh
// wipes CreateContext (it's in-memory only) and the template falls
// back to placeholder data.

  useEffect(() => {
  let isMounted = true;

  const fetchResumeData = async () => {
    try {
      const userDetails = getLocalStorage<{ id: string }>("user_details");
      if (!userDetails?.id) return;

      // FIX: the dashboard's Download (and Edit) buttons write the specific
      // resume being acted on into "editingResumeIdAndData" — that's the
      // source of truth for *which* resume the user actually clicked.
      // "latest_resume_id" only reflects whichever resume was most recently
      // created/saved via the ContactForm flow, which is a different resume
      // whenever you download one that isn't the last one you edited.
      //
      // editingResumeIdAndData is only ever written, never cleared, so it
      // can leak from a past Edit/Download into a later "Create New Resume"
      // session. Gate it behind "oldRouteNameDashboard" — the same session
      // flag ContactForm already uses for this exact purpose — so it's only
      // trusted when the user actually arrived via a dashboard Edit/Download
      // click in *this* browsing session, not just because it's still
      // sitting in localStorage from before.
      const cameFromDashboardAction = getSessionStorage(
        "oldRouteNameDashboard",
      );
      const editingResumeIdAndData = cameFromDashboardAction
        ? getLocalStorage<EditingResumeData>("editingResumeIdAndData")
        : null;
      const latestResumeId = getLocalStorage<string>("latest_resume_id");
      const targetResumeId = editingResumeIdAndData?.id ?? latestResumeId;

      const response = await api.get(`${API_URL}/user-resumes`);
      const allResumes = Array.isArray(response.data) ? response.data : [];

      // Prefer the specific resume the user was working on (matches
      // targetResumeId) over just grabbing whichever comes first —
      // otherwise a dashboard "Edit"/"Download" on an older resume gets
      // silently swapped for the most recently touched one on refresh here.
      const targetResume = targetResumeId
        ? allResumes.find((r: any) => String(r.id) === String(targetResumeId))
        : allResumes[0];

      const resumeData = targetResume?.resume_data;

      if (!resumeData || !isMounted) return;

      setContact(resumeData?.contact || "");
      setEducation(resumeData?.educations || []);
      setExperiences(resumeData?.experiences || []);
      setProjects(resumeData?.projects || []);
      setSkills(resumeData?.skills || "");
      setSummary(resumeData?.summary || "");
      setFinalize(resumeData?.finalize || {});

      setFullResumeData({
        template: getLocalStorage<Template>("chosenTemplate")?.id,
        contact: resumeData?.contact || {},
        experiences: resumeData?.experiences || [],
        education: resumeData?.educations || [],
        skills: resumeData?.skills || {},
        summary: resumeData?.summary || "",
        finalize: resumeData?.finalize || {},
        projects: resumeData?.projects || [],
      });
    } catch (err) {
      console.error("Failed to fetch resume data:", err);
    } finally {
      if (isMounted) setIsResumeDataLoaded(true);
    }
  };

  fetchResumeData();

  return () => {
    isMounted = false;
  };
}, []);


  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [isTwoColumn, setIsTwoColumn] = useState(false);
  const [customization, setCustomization] = useState<ResumeCustomization>({
    ...DEFAULT_CUSTOMIZATION,
  });
  const [userPlan, setUserPlan] = useState<string>("free");
  const [isPlanLoaded, setIsPlanLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  // ── Fetch user plan ──────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const res = await api.get("/dashboard");
        const { subscription } = res?.data || {};
        const plan = subscription?.current_plan || "free";
        if (isMounted) setUserPlan(plan.toLowerCase());
      } catch (err) {
        console.error("Failed to fetch user plan:", err);
        if (isMounted) setUserPlan("free");
      } finally {
        if (isMounted) setIsPlanLoaded(true);
      }
    };

    const userDetails = getLocalStorage<{ id: string }>("user_details");
    if (userDetails?.id) {
      fetchUserData();
    } else {
      setUserPlan("free");
      setIsPlanLoaded(true);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // ── Template Plan Authorization ──────────────────────────────────
  const isTemplateAccessible = useCallback(
    (templateId: number): boolean => {
      switch (userPlan) {
        case "premium":
          return true;
        case "pro":
          return templateId <= 3;
        case "free":
        default:
          return templateId === 1;
      }
    },
    [userPlan],
  );

  // ── Apply template Selection ─────────────────────────────────────
  const applyTemplate = useCallback(
    (t: Template) => {
      if (!isTemplateAccessible(t.id)) {
        console.warn(`Template ${t.id} is locked on the ${userPlan} plan.`);
        return;
      }
      setCurrentTemplate(t);
      setSelectedComponent(() => t.component ?? null);
      const isTwo = !!(t as any).twoColumn;
      setIsTwoColumn(isTwo);
      setLocalStorage("chosenTemplate", t);
      setCustomization((prev) => ({
        ...prev,
        fontFamily: isTwo ? "'Nunito', sans-serif" : "'Inter', sans-serif",
      }));
    },
    [userPlan, isTemplateAccessible],
  );

  // ── Restore saved template selection on boot ─────────────────────
  // Waits for the real plan to load first, so this runs once with the
  // correct plan instead of once with the "free" placeholder and again
  // after the real plan arrives.
  // ── Restore saved template selection on boot ─────────────────────
  useEffect(() => {
    if (!isPlanLoaded || !isResumeDataLoaded) return;  // CHANGED

    const saved = getLocalStorage<Template>("chosenTemplate");
    let found = templateData.find(
      (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
    );

    if (found) {
      applyTemplate(found);
    } else {
      const accessibleTemplates = templateData.filter((t) =>
        isTemplateAccessible(t.id),
      );
      found = accessibleTemplates[0] || templateData[0];
      if (found) applyTemplate(found);
    }

    setIsInitializing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlanLoaded, isResumeDataLoaded]);  // CHANGED

  // ── Dynamic Responsive Scale ─────────────────────────────────────
  useEffect(() => {
    const calc = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setPreviewScale(Math.max(0.25, Math.min(1, (w - 8) / 794)));
      }
    };
    const timer = setTimeout(calc, 100);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calc);
    };
  }, [selectedComponent]);

  const handleReset = useCallback(() => {
    setCustomization({
      ...DEFAULT_CUSTOMIZATION,
      fontFamily: isTwoColumn ? "'Nunito', sans-serif" : "'Inter', sans-serif",
    });
  }, [isTwoColumn]);

  const panelProps = useMemo(
    () => ({
      customization,
      onChange: setCustomization,
      onReset: handleReset,
      currentTemplateId: currentTemplate?.id ?? 0,
      onSwitchTemplate: applyTemplate,
      userPlan,
    }),
    [customization, handleReset, currentTemplate, applyTemplate, userPlan],
  );

  // ── Loading state — shown while plan/template is being resolved ──
  if (isInitializing) {
    return (
      <ProtectedRoute>
        <Header />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Preparing your resume…</p>
          </div>
        </div>
        <Footer />
      </ProtectedRoute>
    );
  }

  // ── Truly no template available (only reachable after init finishes) ──
  if (!selectedComponent) {
    return (
      <ProtectedRoute>
        <Header />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No resume template selected.</p>
            <Link
              href="/dashboard"
              className="text-indigo-500 hover:underline font-medium"
            >
              ← Go to Dashboard
            </Link>
          </div>
        </div>
        <Footer />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Header />

      <div className="min-h-screen bg-gray-50 py-6 pb-28 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="mb-4 sm:mb-6">
            <h1 className="md:text-xl font-semibold text-gray-800">
              Finalize Your Resume
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Switch templates, customize fonts, then download your PDF.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
            {/* Sidebar Controls */}
            <div className="w-full lg:w-72 xl:w-80 lg:flex-shrink-0 lg:sticky lg:top-6">
              <div className="block lg:hidden">
                <CustomizationPanel {...panelProps} />
              </div>
              <div className="hidden lg:block">
                <CustomizationPanel {...panelProps} />
              </div>
            </div>

            {/* Live Resume Canvas */}
            <div className="w-full lg:flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Live Preview
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
                      {currentTemplate?.style}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
                      A4 · PDF ready
                    </span>
                  </div>
                </div>
                <div
                  ref={containerRef}
                  className="flex justify-center overflow-hidden"
                >
                  <div
                    style={{
                      transform: `scale(${previewScale})`,
                      transformOrigin: "top center",
                      width: `${794 / previewScale}px`,
                    }}
                  >
                    {React.createElement(selectedComponent, {
                      customization,
                      isThumbnail: false,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
};

export default Page;











