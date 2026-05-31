"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { templateData } from "@/app/data";
import { getLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import Link from "next/link";

const Page = () => {
  const [scale, setScale] = useState(1);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTemplate = () => {
      const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
      const selectedResume = templateData.find(
        (resume) =>
          resume.id == chosenTemplate?.id || chosenTemplate?.templateId,
      );
      setSelectedComponent(() => selectedResume?.component);
    };

    loadTemplate();
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current && resumeRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = Math.min(1, containerWidth / 800);
        setScale(newScale);
      }
    };

    setTimeout(calculateScale, 100);
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [selectedComponent]);

  
  if (!selectedComponent) {
    return (
      <ProtectedRoute>
        <Header />
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-600">No resume template found.</p>
            <Link
              href="/dashboard"
              className="text-emerald-500 underline mt-2 inline-block"
            >
              Go to Dashboard
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

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* Auto-scaled Resume with Hidden Overflow */}
          <div
            ref={containerRef}
            className="flex justify-center overflow-hidden"
           
          >
            <div
              ref={resumeRef}
              className="transition-all duration-300"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                width: `${210 / scale}mm`,
              }}
            >
              {React.createElement(selectedComponent)}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
};

export default Page;














// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Header from "../../components/layouts/Header";
// import Footer from "../../components/layouts/Footer";
// import { templateData } from "@/app/data";
// import { getLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import ProtectedRoute from "@/app/utils/ProtectedRoute";
// import Link from "next/link";

// // ─── Types ────────────────────────────────────────────────────────────────────
// export type SectionKey =
//   | "summary"
//   | "experience"
//   | "projects"
//   | "education"
//   | "skills"
//   | "custom";

// export interface ResumeCustomization {
//   fontFamily: string;
//   sectionOrder: SectionKey[];
// }

// // ─── Constants ────────────────────────────────────────────────────────────────
// export const FONT_OPTIONS: { label: string; value: string; preview: string }[] = [
//   { label: "Poppins", value: "'Poppins', sans-serif", preview: "Aa" },
//   { label: "Merriweather", value: "'Merriweather', serif", preview: "Aa" },
//   { label: "Playfair Display", value: "'Playfair Display', serif", preview: "Aa" },
//   { label: "Lato", value: "'Lato', sans-serif", preview: "Aa" },
//   { label: "Source Code Pro", value: "'Source Code Pro', monospace", preview: "Aa" },
//   { label: "Raleway", value: "'Raleway', sans-serif", preview: "Aa" },
//   { label: "Nunito", value: "'Nunito', sans-serif", preview: "Aa" },
//   { label: "DM Serif Display", value: "'DM Serif Display', serif", preview: "Aa" },
// ];

// export const SECTION_LABELS: Record<SectionKey, string> = {
//   summary: "Summary",
//   experience: "Experience",
//   projects: "Projects",
//   education: "Education",
//   skills: "Skills",
//   custom: "Custom Sections",
// };

// export const SECTION_ICONS: Record<SectionKey, string> = {
//   summary: "📝",
//   experience: "💼",
//   projects: "🚀",
//   education: "🎓",
//   skills: "⚡",
//   custom: "✨",
// };

// export const DEFAULT_SECTION_ORDER: SectionKey[] = [
//   "summary",
//   "experience",
//   "projects",
//   "education",
//   "skills",
//   "custom",
// ];

// // ─── DraggableSectionList ─────────────────────────────────────────────────────
// const DraggableSectionList: React.FC<{
//   order: SectionKey[];
//   onChange: (order: SectionKey[]) => void;
// }> = ({ order, onChange }) => {
//   const dragItem = useRef<number | null>(null);
//   const dragOverItem = useRef<number | null>(null);
//   const [dragging, setDragging] = useState<number | null>(null);
//   const [dragOver, setDragOver] = useState<number | null>(null);

//   const handleDragStart = (index: number) => {
//     dragItem.current = index;
//     setDragging(index);
//   };

//   const handleDragEnter = (index: number) => {
//     dragOverItem.current = index;
//     setDragOver(index);
//   };

//   const handleDragEnd = () => {
//     if (dragItem.current !== null && dragOverItem.current !== null) {
//       const newOrder = [...order];
//       const dragged = newOrder.splice(dragItem.current, 1)[0];
//       newOrder.splice(dragOverItem.current, 0, dragged);
//       onChange(newOrder);
//     }
//     dragItem.current = null;
//     dragOverItem.current = null;
//     setDragging(null);
//     setDragOver(null);
//   };

//   const moveUp = (index: number) => {
//     if (index === 0) return;
//     const newOrder = [...order];
//     [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
//     onChange(newOrder);
//   };

//   const moveDown = (index: number) => {
//     if (index === order.length - 1) return;
//     const newOrder = [...order];
//     [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
//     onChange(newOrder);
//   };

//   return (
//     <div className="space-y-2">
//       {/* Locked Header */}
//       <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed">
//         <span className="text-base">👤</span>
//         <span className="text-sm font-medium text-gray-600 flex-1">Contact Header</span>
//         <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full font-medium">
//           Locked
//         </span>
//         <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       </div>

//       {/* Draggable Sections */}
//       {order.map((section, index) => (
//         <div
//           key={section}
//           draggable
//           onDragStart={() => handleDragStart(index)}
//           onDragEnter={() => handleDragEnter(index)}
//           onDragEnd={handleDragEnd}
//           onDragOver={(e) => e.preventDefault()}
//           className={`
//             flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-150 cursor-grab active:cursor-grabbing select-none
//             ${dragging === index ? "opacity-40 scale-95" : "opacity-100"}
//             ${dragOver === index && dragging !== index ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}
//           `}
//         >
//           {/* Drag handle */}
//           <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
//           </svg>

//           <span className="text-base">{SECTION_ICONS[section]}</span>
//           <span className="text-sm font-medium text-gray-700 flex-1">{SECTION_LABELS[section]}</span>

//           {/* Arrow controls */}
//           <div className="flex gap-1">
//             <button
//               onClick={() => moveUp(index)}
//               disabled={index === 0}
//               className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
//               title="Move up"
//             >
//               <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
//               </svg>
//             </button>
//             <button
//               onClick={() => moveDown(index)}
//               disabled={index === order.length - 1}
//               className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
//               title="Move down"
//             >
//               <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─── FontPicker ───────────────────────────────────────────────────────────────
// const FontPicker: React.FC<{
//   value: string;
//   onChange: (font: string) => void;
// }> = ({ value, onChange }) => {
//   // Inject Google Fonts link for all preview fonts
//   useEffect(() => {
//     const id = "resume-font-preload";
//     if (!document.getElementById(id)) {
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = "stylesheet";
//       link.href =
//         "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Source+Code+Pro:wght@400;600&family=Raleway:wght@300;400;700&family=Nunito:wght@300;400;700&family=DM+Serif+Display&family=Poppins:wght@300;400;600;700&display=swap";
//       document.head.appendChild(link);
//     }
//   }, []);

//   return (
//     <div className="grid grid-cols-2 gap-2">
//       {FONT_OPTIONS.map((font) => (
//         <button
//           key={font.value}
//           onClick={() => onChange(font.value)}
//           className={`
//             relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-150 text-center group
//             ${value === font.value
//               ? "border-emerald-500 bg-emerald-50 shadow-sm"
//               : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//             }
//           `}
//         >
//           {value === font.value && (
//             <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
//               <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//               </svg>
//             </span>
//           )}
//           <span
//             style={{ fontFamily: font.value }}
//             className="text-2xl font-bold text-gray-800 leading-none mb-1"
//           >
//             {font.preview}
//           </span>
//           <span className="text-xs text-gray-500 font-medium leading-tight">{font.label}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// // ─── CustomizationPanelInner (shared between mobile and desktop) ──────────────
// const CustomizationPanelInner: React.FC<{
//   customization: ResumeCustomization;
//   onChange: (c: ResumeCustomization) => void;
//   onReset: () => void;
//   showDownload: boolean;
//   onDownload: () => void;
//   isDownloading: boolean;
// }> = ({ customization, onChange, onReset, showDownload, onDownload, isDownloading }) => {
//   const [activeTab, setActiveTab] = useState<"font" | "sections">("font");

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-100">
//         <div className="flex items-center justify-between mb-1">
//           <h2 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide uppercase">Customize</h2>
//           <button
//             onClick={onReset}
//             className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline-offset-2 hover:underline"
//           >
//             Reset
//           </button>
//         </div>
//         <p className="text-xs text-gray-400">Personalize your resume before download</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-100">
//         <button
//           onClick={() => setActiveTab("font")}
//           className={`flex-1 py-2.5 sm:py-3 text-xs font-semibold transition-colors ${
//             activeTab === "font"
//               ? "text-emerald-600 border-b-2 border-emerald-500"
//               : "text-gray-400 hover:text-gray-600"
//           }`}
//         >
//           Font Style
//         </button>
//         <button
//           onClick={() => setActiveTab("sections")}
//           className={`flex-1 py-2.5 sm:py-3 text-xs font-semibold transition-colors ${
//             activeTab === "sections"
//               ? "text-emerald-600 border-b-2 border-emerald-500"
//               : "text-gray-400 hover:text-gray-600"
//           }`}
//         >
//           Section Order
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="px-3 sm:px-4 py-3 sm:py-4">
//         {activeTab === "font" && (
//           <div>
//             <p className="text-xs text-gray-400 mb-3">Choose a font that matches your style</p>
//             <FontPicker
//               value={customization.fontFamily}
//               onChange={(fontFamily) => onChange({ ...customization, fontFamily })}
//             />
//           </div>
//         )}
//         {activeTab === "sections" && (
//           <div>
//             <p className="text-xs text-gray-400 mb-3">
//               Drag sections to reorder — header is always first
//             </p>
//             <DraggableSectionList
//               order={customization.sectionOrder}
//               onChange={(sectionOrder) => onChange({ ...customization, sectionOrder })}
//             />
//             <p className="mt-3 text-xs text-gray-400 text-center">
//               💡 Tip: Put your strongest section near the top
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Download Button — shown only on desktop inside panel */}
//       {showDownload && (
//         <div className="px-4 py-4 border-t border-gray-100">
//           <button
//             onClick={onDownload}
//             disabled={isDownloading}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
//           >
//             {isDownloading ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Generating PDF…
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                 </svg>
//                 Download Resume
//               </>
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── CustomizationPanel (desktop wrapper — always shows download button) ──────
// const CustomizationPanel: React.FC<{
//   customization: ResumeCustomization;
//   onChange: (c: ResumeCustomization) => void;
//   onReset: () => void;
//   onDownload: () => void;
//   isDownloading: boolean;
// }> = ({ customization, onChange, onReset, onDownload, isDownloading }) => (
//   <CustomizationPanelInner
//     customization={customization}
//     onChange={onChange}
//     onReset={onReset}
//     showDownload={true}
//     onDownload={onDownload}
//     isDownloading={isDownloading}
//   />
// );

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const Page = () => {
//   const [selectedComponent, setSelectedComponent] = useState<React.ComponentType<any> | null>(null);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [customization, setCustomization] = useState<ResumeCustomization>({
//     fontFamily: "'Poppins', sans-serif",
//     sectionOrder: [...DEFAULT_SECTION_ORDER],
//   });

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [previewScale, setPreviewScale] = useState(1);

//   // Load template
//   useEffect(() => {
//     const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
//     const selectedResume = templateData.find(
//       (r) => r.id == chosenTemplate?.id || chosenTemplate?.templateId,
//     );
//     setSelectedComponent(() => selectedResume?.component ?? null);
//   }, []);

//   // Responsive preview scale
//   useEffect(() => {
//     const calc = () => {
//       if (containerRef.current) {
//         const w = containerRef.current.clientWidth;
//         // On mobile the preview container IS the full width minus padding.
//         // On desktop it's width minus the 288px panel minus gap.
//         // We use the actual measured container width so it always fits.
//         const scale = Math.min(1, (w - 8) / 794);
//         setPreviewScale(Math.max(0.25, scale)); // never smaller than 25%
//       }
//     };
//     setTimeout(calc, 100);
//     window.addEventListener("resize", calc);
//     return () => window.removeEventListener("resize", calc);
//   }, [selectedComponent]);

//   const handleReset = useCallback(() => {
//     setCustomization({
//       fontFamily: "'Poppins', sans-serif",
//       sectionOrder: [...DEFAULT_SECTION_ORDER],
//     });
//   }, []);

//   const handleDownload = useCallback(async () => {
//     setIsDownloading(true);
//     try {
//       // Trigger download via the child component's exposed handler
//       // The TemplateOne component reads customization from context/props,
//       // so we dispatch a custom event that it listens to.
//       window.dispatchEvent(
//         new CustomEvent("resume:download", { detail: { customization } }),
//       );
//     } finally {
//       // Reset after a brief delay (actual PDF generation time varies)
//       setTimeout(() => setIsDownloading(false), 3000);
//     }
//   }, [customization]);

//   if (!selectedComponent) {
//     return (
//       <ProtectedRoute>
//         <Header />
//         <div className="min-h-screen bg-gray-50 flex justify-center items-center">
//           <div className="text-center">
//             <p className="text-gray-500 mb-2">No resume template selected.</p>
//             <Link href="/dashboard" className="text-emerald-500 hover:underline font-medium">
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

//       {/* Extra bottom padding on mobile so content clears the fixed download bar */}
//       <div className="min-h-screen bg-gray-50 py-6 pb-28 lg:pb-8">
//         <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">

//           {/* Page Title */}
//           <div className="mb-4 sm:mb-6">
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Finalize Your Resume</h1>
//             <p className="text-xs sm:text-sm text-gray-500 mt-1">
//               Customize style &amp; layout, then download your polished PDF.
//             </p>
//           </div>

//           {/*
//             ── Layout:
//                Mobile  (< lg) : stacked — customization panel on top, preview below
//                Desktop (≥ lg) : side-by-side — panel left (fixed width), preview right
//           */}
//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">

//             {/* ── Customization Panel ─────────────────────────────────────── */}
//             {/*   Mobile: full-width card. Desktop: sticky 280px sidebar.    */}
//             <div className="w-full lg:w-72 lg:flex-shrink-0 lg:sticky lg:top-6">
//               {/* On mobile, hide the download button inside the panel — we show
//                   a floating bar at the bottom instead */}
//               <div className="block lg:hidden">
//                 <CustomizationPanelInner
//                   customization={customization}
//                   onChange={setCustomization}
//                   onReset={handleReset}
//                   showDownload={false}
//                   onDownload={handleDownload}
//                   isDownloading={isDownloading}
//                 />
//               </div>
//               <div className="hidden lg:block">
//                 <CustomizationPanel
//                   customization={customization}
//                   onChange={setCustomization}
//                   onReset={handleReset}
//                   onDownload={handleDownload}
//                   isDownloading={isDownloading}
//                 />
//               </div>
//             </div>

//             {/* ── Resume Preview ───────────────────────────────────────────── */}
//             <div className="w-full lg:flex-1 min-w-0">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
//                 <div className="flex items-center justify-between mb-3 sm:mb-4">
//                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
//                     Preview
//                   </span>
//                   <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
//                     A4 · PDF ready
//                   </span>
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
//                     {React.createElement(selectedComponent, { customization })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ── Mobile floating download bar (hidden on lg+) ─────────────────── */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
//         <button
//           onClick={handleDownload}
//           disabled={isDownloading}
//           className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm active:scale-95"
//         >
//           {isDownloading ? (
//             <>
//               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Generating PDF…
//             </>
//           ) : (
//             <>
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//               </svg>
//               Download Resume
//             </>
//           )}
//         </button>
//       </div>

//       <Footer />
//     </ProtectedRoute>
//   );
// };

// export default Page;