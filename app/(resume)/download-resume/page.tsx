// "use client";
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useContext,
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

// // ─── Types ────────────────────────────────────────────────────────────────────
// export type SectionKey =
//   | "summary"
//   | "experience"
//   | "projects"
//   | "education"
//   | "skills"
//   | "custom";

// export interface TwoColumnOrder {
//   left: SectionKey[];
//   right: SectionKey[];
// }

// export interface ResumeCustomization {
//   fontFamily: string;
//   sectionOrder: SectionKey[];
//   twoColumnOrder: TwoColumnOrder;
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

// export const DEFAULT_TWO_COLUMN_ORDER: TwoColumnOrder = {
//   left: ["summary", "skills", "custom"],
//   right: ["experience", "projects", "education"],
// };

// const DEFAULT_CUSTOMIZATION: ResumeCustomization = {
//   fontFamily: "'Inter', sans-serif",
//   sectionOrder: [...DEFAULT_SECTION_ORDER],
//   twoColumnOrder: {
//     left: [...DEFAULT_TWO_COLUMN_ORDER.left],
//     right: [...DEFAULT_TWO_COLUMN_ORDER.right],
//   },
// };

// // ─── Get accessible templates based on plan ───────────────────────────────────
// const getAccessibleTemplates = (plan: string): Template[] => {
//   switch (plan?.toLowerCase()) {
//     case "premium":
//       return templateData; // All templates
//     case "pro":
//       return templateData.slice(0, 3); // First 3 templates
//     case "free":
//     default:
//       return templateData.slice(0, 1); // First 1 template only
//   }
// };

// // ─── Thumbnail component (live resume at 36% scale) ──────────────────────────
// const ResumeThumbnail: React.FC<{
//   component: React.ComponentType<any>;
//   isSelected: boolean;
// }> = ({ component, isSelected }) => {
//   const A4_W = 794,
//     A4_H = 1123;
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
//         }}
//       >
//         {React.createElement(component, { alldata: undefined })}
//       </div>
//     </div>
//   );
// };

// // ─── Draggable list (single column) ──────────────────────────────────────────
// const DraggableSectionList: React.FC<{
//   order: SectionKey[];
//   onChange: (o: SectionKey[]) => void;
//   showLockedHeader?: boolean;
// }> = ({ order, onChange, showLockedHeader = true }) => {
//   const dragItem = useRef<number | null>(null);
//   const dragOver = useRef<number | null>(null);
//   const [dragging, setDragging] = useState<number | null>(null);
//   const [over, setOver] = useState<number | null>(null);

//   const end = () => {
//     if (dragItem.current !== null && dragOver.current !== null) {
//       const n = [...order];
//       const [m] = n.splice(dragItem.current, 1);
//       n.splice(dragOver.current, 0, m);
//       onChange(n);
//     }
//     dragItem.current = dragOver.current = null;
//     setDragging(null);
//     setOver(null);
//   };
//   const mv = (i: number, d: -1 | 1) => {
//     const j = i + d;
//     if (j < 0 || j >= order.length) return;
//     const n = [...order];
//     [n[i], n[j]] = [n[j], n[i]];
//     onChange(n);
//   };

//   return (
//     <div className="space-y-1.5">
//       {showLockedHeader && (
//         <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed">
//           <span className="text-sm">👤</span>
//           <span className="text-xs font-medium text-gray-600 flex-1">
//             Contact Header
//           </span>
//           <span className="text-[10px] text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">
//             Locked
//           </span>
//         </div>
//       )}
//       {order.map((sec, i) => (
//         <div
//           key={sec}
//           draggable
//           onDragStart={() => {
//             dragItem.current = i;
//             setDragging(i);
//           }}
//           onDragEnter={() => {
//             dragOver.current = i;
//             setOver(i);
//           }}
//           onDragEnd={end}
//           onDragOver={(e) => e.preventDefault()}
//           className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-grab active:cursor-grabbing select-none group
//             ${dragging === i ? "opacity-30 scale-95 border-dashed" : ""}
//             ${over === i && dragging !== i ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
//         >
//           <svg
//             className="w-3 h-3 text-gray-300 flex-shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 8h16M4 16h16"
//             />
//           </svg>
//           <span className="text-xs">{SECTION_ICONS[sec]}</span>
//           <span className="text-xs font-medium text-gray-700 flex-1">
//             {SECTION_LABELS[sec]}
//           </span>
//           <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
//             <button
//               onClick={() => mv(i, -1)}
//               disabled={i === 0}
//               className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-20"
//             >
//               <svg
//                 className="w-3 h-3 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2.5}
//                   d="M5 15l7-7 7 7"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={() => mv(i, 1)}
//               disabled={i === order.length - 1}
//               className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-20"
//             >
//               <svg
//                 className="w-3 h-3 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2.5}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─── Two-column cross-drag ────────────────────────────────────────────────────
// const TwoColumnSections: React.FC<{
//   customization: ResumeCustomization;
//   onChange: (c: ResumeCustomization) => void;
//   populatedSections: SectionKey[];
// }> = ({ customization, onChange, populatedSections }) => {
//   const { left, right } = customization.twoColumnOrder;
//   const filteredLeft = left.filter((s) => populatedSections.includes(s));
//   const filteredRight = right.filter((s) => populatedSections.includes(s));

//   const dragSrc = useRef<{ col: "left" | "right"; index: number } | null>(null);
//   const [dropTarget, setDropTarget] = useState<{
//     col: "left" | "right";
//     index: number | "empty";
//   } | null>(null);
//   const [draggingItem, setDraggingItem] = useState<{
//     col: "left" | "right";
//     index: number;
//   } | null>(null);

//   const commit = (nl: SectionKey[], nr: SectionKey[]) =>
//     onChange({ ...customization, twoColumnOrder: { left: nl, right: nr } });

//   const handleDrop = (
//     targetCol: "left" | "right",
//     targetIndex: number | "empty",
//   ) => {
//     const src = dragSrc.current;
//     if (!src) return;
//     const nl = [...filteredLeft],
//       nr = [...filteredRight];
//     const srcArr = src.col === "left" ? nl : nr;
//     const [moved] = srcArr.splice(src.index, 1);
//     const tgtArr = targetCol === "left" ? nl : nr;
//     if (targetIndex === "empty") tgtArr.push(moved);
//     else if (src.col === targetCol) {
//       const adj =
//         targetIndex > src.index
//           ? (targetIndex as number) - 1
//           : (targetIndex as number);
//       tgtArr.splice(adj, 0, moved);
//     } else tgtArr.splice(targetIndex as number, 0, moved);
//     dragSrc.current = null;
//     setDraggingItem(null);
//     setDropTarget(null);
//     commit(nl, nr);
//   };

//   const moveInCol = (col: "left" | "right", i: number, d: -1 | 1) => {
//     const arr = col === "left" ? [...filteredLeft] : [...filteredRight];
//     const j = i + d;
//     if (j < 0 || j >= arr.length) return;
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//     col === "left" ? commit(arr, filteredRight) : commit(filteredLeft, arr);
//   };

//   const moveToOther = (col: "left" | "right", i: number) => {
//     const nl = [...filteredLeft],
//       nr = [...filteredRight];
//     if (col === "left") {
//       const [m] = nl.splice(i, 1);
//       nr.push(m);
//     } else {
//       const [m] = nr.splice(i, 1);
//       nl.push(m);
//     }
//     commit(nl, nr);
//   };

//   const renderCard = (sec: SectionKey, i: number, col: "left" | "right") => {
//     const arr = col === "left" ? filteredLeft : filteredRight;
//     const isDragging = draggingItem?.col === col && draggingItem?.index === i;
//     const isTarget = dropTarget?.col === col && dropTarget?.index === i;
//     const isCross = isTarget && draggingItem?.col !== col;
//     return (
//       <div
//         key={sec}
//         draggable
//         onDragStart={() => {
//           dragSrc.current = { col, index: i };
//           setDraggingItem({ col, index: i });
//         }}
//         onDragEnter={(e) => {
//           e.preventDefault();
//           setDropTarget({ col, index: i });
//         }}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={() => handleDrop(col, i)}
//         onDragEnd={() => {
//           dragSrc.current = null;
//           setDraggingItem(null);
//           setDropTarget(null);
//         }}
//         className={`relative rounded-lg border px-2 py-2 select-none cursor-grab active:cursor-grabbing transition-all group
//           ${isDragging ? "opacity-25 scale-95 border-dashed" : ""}
//           ${isTarget && !isDragging ? (isCross ? "border-violet-400 bg-violet-50 ring-1 ring-violet-300" : "border-indigo-400 bg-indigo-50") : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
//       >
//         <div className="flex items-center gap-1.5 pr-14">
//           <svg
//             className="w-3 h-3 text-gray-300 flex-shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 8h16M4 16h16"
//             />
//           </svg>
//           <span className="text-[10px] font-medium text-gray-700 truncate">
//             {SECTION_ICONS[sec]} {SECTION_LABELS[sec]}
//           </span>
//         </div>
//         <div className="absolute top-1 right-1 hidden group-hover:flex items-center gap-0.5">
//           <button
//             onClick={() => moveInCol(col, i, -1)}
//             disabled={i === 0}
//             className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-20"
//           >
//             <svg
//               className="w-2.5 h-2.5 text-gray-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M5 15l7-7 7 7"
//               />
//             </svg>
//           </button>
//           <button
//             onClick={() => moveInCol(col, i, 1)}
//             disabled={i === arr.length - 1}
//             className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-20"
//           >
//             <svg
//               className="w-2.5 h-2.5 text-gray-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeWidth={2.5}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </button>
//           <button
//             onClick={() => moveToOther(col, i)}
//             title="Switch column"
//             className="p-0.5 rounded hover:bg-violet-100 text-violet-400 hover:text-violet-600"
//           >
//             <svg
//               className="w-2.5 h-2.5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d={
//                   col === "left"
//                     ? "M13 5l7 7-7 7M5 5l7 7-7 7"
//                     : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
//                 }
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const emptyZone = (col: "left" | "right") => {
//     const isT = dropTarget?.col === col && dropTarget?.index === "empty";
//     return (
//       <div
//         onDragEnter={(e) => {
//           e.preventDefault();
//           setDropTarget({ col, index: "empty" });
//         }}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={() => handleDrop(col, "empty")}
//         className={`rounded-lg border-2 border-dashed px-2 py-4 text-center text-[10px] transition-colors
//           ${isT ? "border-violet-400 bg-violet-50 text-violet-500" : "border-gray-200 text-gray-300"}`}
//       >
//         Drop here
//       </div>
//     );
//   };

//   return (
//     <div>
//       <p className="text-xs text-gray-400 mb-3">
//         Drag across columns · ↔ button to switch
//       </p>
//       <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-100 border border-indigo-200 mb-3 cursor-not-allowed">
//         <span className="text-xs font-semibold text-indigo-600 flex-1 text-center">
//           Header — Locked
//         </span>
//       </div>
//       <div className="grid grid-cols-2 gap-2">
//         {(["left", "right"] as const).map((col) => {
//           const arr = col === "left" ? filteredLeft : filteredRight;
//           const color = col === "left" ? "bg-blue-400" : "bg-emerald-400";
//           return (
//             <div key={col} className="flex flex-col gap-1.5">
//               <div className="flex items-center gap-1.5 mb-1">
//                 <div
//                   className={`w-2 h-2 rounded-full ${color} flex-shrink-0`}
//                 />
//                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
//                   {col}
//                 </span>
//               </div>
//               {arr.length === 0
//                 ? emptyZone(col)
//                 : arr.map((sec, i) => renderCard(sec, i, col))}
//               {draggingItem?.col !== col && arr.length > 0 && (
//                 <div
//                   onDragEnter={(e) => {
//                     e.preventDefault();
//                     setDropTarget({ col, index: "empty" });
//                   }}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={() => handleDrop(col, "empty")}
//                   className={`rounded-lg border-2 border-dashed px-2 py-1.5 text-center text-[10px] transition-colors
//                     ${dropTarget?.col === col && dropTarget?.index === "empty" ? "border-violet-400 bg-violet-50 text-violet-500" : "border-gray-100 text-gray-300"}`}
//                 >
//                   + add here
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // ─── Font Picker ──────────────────────────────────────────────────────────────
// const FontPicker: React.FC<{
//   value: string;
//   onChange: (f: string) => void;
// }> = ({ value, onChange }) => {
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

//   const categories = [...new Set(FONT_OPTIONS.map((f) => f.category))];
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
//                 onClick={() => onChange(font.value)}
//                 className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all text-center cursor-pointer
//                   ${value === font.value ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
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
// };

// // ─── Template Switcher Sidebar ────────────────────────────────────────────────
// const TemplateSwitcher: React.FC<{
//   currentId: number;
//   onSwitch: (t: Template) => void;
//   userPlan: string;
// }> = ({ currentId, onSwitch, userPlan }) => {
//   const accessibleTemplates = getAccessibleTemplates(userPlan);
//   const isTemplateAccessible = (templateId: number): boolean => {
//     return accessibleTemplates.some((t) => t.id === templateId);
//   };

//   return (
//     <div className="space-y-2">
//       {templateData.map((t) => {
//         const isSelected = t.id === currentId;
//         const isAccessible = isTemplateAccessible(t.id);
//         const isLocked = !isAccessible;

//         return (
//           <button
//             key={t.id}
//             onClick={() => isAccessible && onSwitch(t)}
//             disabled={!isAccessible}
//             className={`w-full  gap-3 p-2 rounded-xl border transition-all text-left
//               ${isSelected && isAccessible ? "border-indigo-500 bg-indigo-50 shadow-sm" : ""}
//               ${!isAccessible ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}
//               ${isSelected && !isAccessible ? "border-red-300 bg-red-50" : ""}`}
//           >
//             {/* Live thumbnail */}
//             <div
//               className="flex-shrink-0 rounded-md overflow-hidden bg-gray-50 relative"
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
//             <div className="flex-1 min-w-0">
//               {/* <div className="flex items-center gap-2"> */}
//               {isLocked && (
//                 <span className="text-[8px] font-medium bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
//                   {/* {userPlan === "free" && t.id > 1
//                       ? "Upgrade to Pro"
//                       : userPlan === "pro" && t.id > 3
//                         ? "Upgrade to Premium"
//                         : "Locked"} */}
//                   Upgrade Required
//                 </span>
//               )}
//               <p
//                 className={`text-xs font-semibold truncate ${isSelected && isAccessible ? "text-indigo-700" : "text-gray-800"}`}
//               >
//                 {t.style}
//               </p>

//               {/* </div> */}
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
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// // ─── Customization Panel ──────────────────────────────────────────────────────
// const CustomizationPanel: React.FC<{
//   customization: ResumeCustomization;
//   onChange: (c: ResumeCustomization) => void;
//   onReset: () => void;
//   showDownload: boolean;
//   onDownload: () => void;
//   isDownloading: boolean;
//   isTwoColumn: boolean;
//   currentTemplateId: number;
//   onSwitchTemplate: (t: Template) => void;
//   populatedSections: SectionKey[];
//   userPlan: string;
// }> = ({
//   customization,
//   onChange,
//   onReset,
//   showDownload,
//   onDownload,
//   isDownloading,
//   isTwoColumn,
//   currentTemplateId,
//   onSwitchTemplate,
//   populatedSections,
//   userPlan,
// }) => {
//   const [activeTab, setActiveTab] = useState<"template" | "font" | "sections">(
//     "template",
//   );

//   const tabs = [
//     { id: "template" as const, label: "Template" },
//     { id: "font" as const, label: "Font" },
//     // { id: "sections" as const, label: "Order" },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="px-4 pt-4 pb-3 border-b border-gray-100">
//         <div className="flex items-center justify-between mb-0.5">
//           <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
//             Customize
//           </h2>
//           <button
//             onClick={onReset}
//             className="text-[10px] text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline cursor-pointer transition-colors"
//           >
//             Reset
//           </button>
//         </div>
//         <p className="text-[10px] text-gray-400">Personalize before download</p>
//         {/* Plan badge */}
//         <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
//           Plan: {userPlan?.toUpperCase() || "FREE"}
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-100">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2.5 text-[11px] cursor-pointer font-semibold transition-colors
//               ${activeTab === tab.id ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-400 hover:text-gray-600"}`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="overflow-y-auto px-3 py-3 max-h-[55vh] lg:max-h-[calc(100vh-320px)]">
//         {activeTab === "template" && (
//           <div>
//             <p className="text-[10px] text-gray-400 mb-2">
//               Switch template — live preview updates instantly
//             </p>
//             <TemplateSwitcher
//               currentId={currentTemplateId}
//               onSwitch={onSwitchTemplate}
//               userPlan={userPlan}
//             />
//           </div>
//         )}
//         {activeTab === "font" && (
//           <div>
//             <p className="text-[10px] text-gray-400 mb-2">
//               16 professional fonts across 3 categories
//             </p>
//             <FontPicker
//               value={customization.fontFamily}
//               onChange={(f) => onChange({ ...customization, fontFamily: f })}
//             />
//           </div>
//         )}
//         {activeTab === "sections" &&
//           (populatedSections.length === 0 ? (
//             <p className="text-xs text-gray-400 text-center py-6">
//               No sections with data found.
//             </p>
//           ) : isTwoColumn ? (
//             <TwoColumnSections
//               customization={customization}
//               onChange={onChange}
//               populatedSections={populatedSections}
//             />
//           ) : (
//             <div>
//               <p className="text-[10px] text-gray-400 mb-2">
//                 Only sections with data are shown
//               </p>
//               <DraggableSectionList
//                 order={customization.sectionOrder.filter((s) =>
//                   populatedSections.includes(s),
//                 )}
//                 onChange={(newOrder) => {
//                   // Merge back: keep sections without data in their original position at the end
//                   const withoutData = customization.sectionOrder.filter(
//                     (s) => !populatedSections.includes(s),
//                   );
//                   onChange({
//                     ...customization,
//                     sectionOrder: [...newOrder, ...withoutData],
//                   });
//                 }}
//               />
//             </div>
//           ))}
//       </div>

//       {/* Download button (desktop) */}
//       {/* {showDownload && (
//         <div className="px-4 py-3 border-t border-gray-100">
//           <button
//             onClick={onDownload}
//             disabled={isDownloading}
//             className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
//           >
//             {isDownloading ? (
//               <>
//                 <svg
//                   className="animate-spin w-4 h-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                   />
//                 </svg>
//                 Generating PDF…
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   />
//                 </svg>
//                 Download Resume
//               </>
//             )}
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const Page = () => {
//   usePreventReload();
//   const context = useContext(CreateContext);

//   const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
//   const [selectedComponent, setSelectedComponent] =
//     useState<React.ComponentType<any> | null>(null);
//   const [isTwoColumn, setIsTwoColumn] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [customization, setCustomization] = useState<ResumeCustomization>({
//     ...DEFAULT_CUSTOMIZATION,
//   });
//   const [userPlan, setUserPlan] = useState<string>("free");

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [previewScale, setPreviewScale] = useState(1);

//   // ── Fetch user plan ──────────────────────────────────────────────
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data;
//         const plan = subscription?.current_plan || "free";
//         setUserPlan(plan.toLowerCase());
//       } catch (err) {
//         console.error("Failed to fetch user plan:", err);
//         setUserPlan("free");
//         console.log("bb");
//       }
//     };

//     const userDetails = getLocalStorage<{ id: string }>("user_details");
//     if (userDetails?.id) {
//       fetchUserData();
//     } else {
//       setUserPlan("free");
//       console.log("");
//     }
//   }, []);

//   // ── Detect populated sections from context ─────────────────────────
//   const populatedSections = useCallback((): SectionKey[] => {
//     const contact = context?.contact || {};
//     const educations = context?.education || [];
//     const experiences = context?.experiences || [];
//     const skills = context?.skills?.text || "";
//     const projects = context?.projects || [];
//     const finalize = context?.finalize || {};
//     const summary = context?.summary || "";

//     const customSection =
//       finalize &&
//       typeof finalize === "object" &&
//       !Array.isArray(finalize) &&
//       Array.isArray((finalize as any).customSection)
//         ? (finalize as any).customSection.filter(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           )
//         : [];

//     const has: SectionKey[] = [];
//     if (summary?.trim()) has.push("summary");
//     if (Array.isArray(experiences) && experiences.length > 0)
//       has.push("experience");
//     if (Array.isArray(projects) && projects.length > 0) has.push("projects");
//     if (Array.isArray(educations) && educations.length > 0)
//       has.push("education");
//     if (skills?.trim()) has.push("skills");
//     if (customSection.length > 0) has.push("custom");
//     return has;
//   }, [context])();

//   // ── Detect two-column ──────────────────────────────────────────────
//   const detectTwoColumn = (t: Template): boolean => {
//     const TWO_IDS = [2];
//     const TWO_PATTERN = /templatetwo|template_two|template-two|twocolumn/i;
//     return (
//       !!(t as any).twoColumn ||
//       TWO_PATTERN.test(t.component?.displayName || t.component?.name || "") ||
//       TWO_IDS.includes(Number(t.id))
//     );
//   };

//   // ── Check if template is accessible based on plan ───────────────────
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

//   // ── Switch template ────────────────────────────────────────────────
//   const applyTemplate = useCallback(
//     (t: Template) => {
//       if (!isTemplateAccessible(t.id)) {
//         console.warn(`Template ${t.id} not accessible on ${userPlan} plan`);
//         return;
//       }
//       setCurrentTemplate(t);
//       setSelectedComponent(() => t.component ?? null);
//       const isTwo = detectTwoColumn(t);
//       setIsTwoColumn(isTwo);
//       setLocalStorage("chosenTemplate", t);
//       // Update default font per template family
//       setCustomization((prev) => ({
//         ...prev,
//         fontFamily: isTwo ? "'Nunito', sans-serif" : "'Inter', sans-serif",
//       }));
//     },
//     [userPlan, isTemplateAccessible],
//   );

//   // ── Load initial template ──────────────────────────────────────────
//   // useEffect(() => {
//   //   if (!userPlan) return;

//   //   const saved = getLocalStorage<Template>("chosenTemplate");
//   //   let found = templateData.find(
//   //     (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
//   //   );

//   //   // Check if saved template is accessible, if not, fallback to first accessible
//   //   if (!found || !isTemplateAccessible(found.id)) {
//   //     const accessibleTemplates = templateData.filter((t) =>
//   //       isTemplateAccessible(t.id),
//   //     );
//   //     found = accessibleTemplates[0] || templateData[0];
//   //   }

//   //   if (found) applyTemplate(found);
//   // }, [userPlan, isTemplateAccessible, applyTemplate]);

//   // ── Load initial template ──────────────────────────────────────────
//   useEffect(() => {
//     if (!userPlan) return;

//     const saved = getLocalStorage<Template>("chosenTemplate");
//     let found = templateData.find(
//       (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
//     );

//     // If we have a saved template, use it for preview even if not accessible
//     // But we'll show upgrade prompts in the UI
//     if (found) {
//       applyTemplate(found);
//     } else {
//       // Only fallback to first accessible if no saved template exists
//       const accessibleTemplates = templateData.filter((t) =>
//         isTemplateAccessible(t.id),
//       );
//       found = accessibleTemplates[0] || templateData[0];
//       if (found) applyTemplate(found);
//     }
//   }, [userPlan, isTemplateAccessible, applyTemplate]);

//   // ── Responsive scale ───────────────────────────────────────────────
//   useEffect(() => {
//     const calc = () => {
//       if (containerRef.current) {
//         const w = containerRef.current.clientWidth;
//         setPreviewScale(Math.max(0.25, Math.min(1, (w - 8) / 794)));
//       }
//     };
//     setTimeout(calc, 100);
//     window.addEventListener("resize", calc);
//     return () => window.removeEventListener("resize", calc);
//   }, [selectedComponent]);

//   const handleReset = useCallback(() => {
//     setCustomization({
//       ...DEFAULT_CUSTOMIZATION,
//       fontFamily: isTwoColumn ? "'Nunito', sans-serif" : "'Inter', sans-serif",
//       twoColumnOrder: {
//         left: [...DEFAULT_TWO_COLUMN_ORDER.left],
//         right: [...DEFAULT_TWO_COLUMN_ORDER.right],
//       },
//     });
//   }, [isTwoColumn]);

//   const handleDownload = useCallback(async () => {
//     setIsDownloading(true);
//     try {
//       window.dispatchEvent(
//         new CustomEvent("resume:download", { detail: { customization } }),
//       );
//     } finally {
//       setTimeout(() => setIsDownloading(false), 3500);
//     }
//   }, [customization]);

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

//   const panelProps = {
//     customization,
//     onChange: setCustomization,
//     onReset: handleReset,
//     onDownload: handleDownload,
//     isDownloading,
//     isTwoColumn,
//     currentTemplateId: currentTemplate?.id ?? 0,
//     onSwitchTemplate: applyTemplate,
//     populatedSections,
//     userPlan,
//   };

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
//               Switch templates, customize Fonts, then download your PDF.
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
//             {/* Left panel */}
//             <div className="w-full lg:w-72 xl:w-80 lg:flex-shrink-0 lg:sticky lg:top-6">
//               <div className="block lg:hidden">
//                 <CustomizationPanel {...panelProps} showDownload={false} />
//               </div>
//               <div className="hidden lg:block">
//                 <CustomizationPanel {...panelProps} showDownload={true} />
//               </div>
//             </div>

//             {/* Resume preview */}
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
//                     {React.createElement(selectedComponent, { customization })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile download bar */}
//       {/* <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
//         <button
//           onClick={handleDownload}
//           disabled={isDownloading}
//           className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
//         >
//           {isDownloading ? (
//             <>
//               <svg
//                 className="animate-spin w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 />
//               </svg>
//               Generating PDF…
//             </>
//           ) : (
//             <>
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                 />
//               </svg>
//               Download Resume
//             </>
//           )}
//         </button>
//       </div> */}

//       <Footer />
//     </ProtectedRoute>
//   );
// };

// export default Page;





















































// "use client";
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useContext,
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

// // ─── Get accessible templates based on plan ───────────────────────────────────
// const getAccessibleTemplates = (plan: string): Template[] => {
//   switch (plan?.toLowerCase()) {
//     case "premium":
//       return templateData; // All templates
//     case "pro":
//       return templateData.slice(0, 3); // First 3 templates
//     case "free":
//     default:
//       return templateData.slice(0, 1); // First 1 template only
//   }
// };

// // ─── Thumbnail component (live resume at 36% scale) ──────────────────────────
// const ResumeThumbnail: React.FC<{
//   component: React.ComponentType<any>;
//   isSelected: boolean;
// }> = ({ component, isSelected }) => {
//   const A4_W = 794,
//     A4_H = 1123;
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
//         }}
//       >
//         {React.createElement(component, { alldata: undefined })}
//       </div>
//     </div>
//   );
// };

// // ─── Font Picker ──────────────────────────────────────────────────────────────
// const FontPicker: React.FC<{
//   value: string;
//   onChange: (f: string) => void;
// }> = ({ value, onChange }) => {
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

//   const categories = [...new Set(FONT_OPTIONS.map((f) => f.category))];
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
//                 onClick={() => onChange(font.value)}
//                 className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all text-center cursor-pointer
//                   ${value === font.value ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
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
// };

// // ─── Template Switcher Sidebar ────────────────────────────────────────────────
// const TemplateSwitcher: React.FC<{
//   currentId: number;
//   onSwitch: (t: Template) => void;
//   userPlan: string;
// }> = ({ currentId, onSwitch, userPlan }) => {
//   const accessibleTemplates = getAccessibleTemplates(userPlan);
//   const isTemplateAccessible = (templateId: number): boolean => {
//     return accessibleTemplates.some((t) => t.id === templateId);
//   };

//   return (
//     <div className="space-y-2">
//       {templateData.map((t) => {
//         const isSelected = t.id === currentId;
//         const isAccessible = isTemplateAccessible(t.id);
//         const isLocked = !isAccessible;

//         return (
//           <button
//             key={t.id}
//             onClick={() => isAccessible && onSwitch(t)}
//             disabled={!isAccessible}
//             className={`w-full gap-3 p-2 rounded-xl border transition-all text-left
//               ${isSelected && isAccessible ? "border-indigo-500 bg-indigo-50 shadow-sm" : ""}
//               ${!isAccessible ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}
//               ${isSelected && !isAccessible ? "border-red-300 bg-red-50" : ""}`}
//           >
//             {/* Live thumbnail */}
//             <div
//               className="flex-shrink-0 rounded-md overflow-hidden bg-gray-50 relative"
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
//             <div className="flex-1 min-w-0">
//               {isLocked && (
//                 <span className="text-[8px] font-medium bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
//                   Upgrade Required
//                 </span>
//               )}
//               <p
//                 className={`text-xs font-semibold truncate ${isSelected && isAccessible ? "text-indigo-700" : "text-gray-800"}`}
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
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// // ─── Customization Panel ──────────────────────────────────────────────────────
// const CustomizationPanel: React.FC<{
//   customization: ResumeCustomization;
//   onChange: (c: ResumeCustomization) => void;
//   onReset: () => void;
//   currentTemplateId: number;
//   onSwitchTemplate: (t: Template) => void;
//   userPlan: string;
// }> = ({
//   customization,
//   onChange,
//   onReset,
//   currentTemplateId,
//   onSwitchTemplate,
//   userPlan,
// }) => {
//   const [activeTab, setActiveTab] = useState<"template" | "font">("template");

//   const tabs = [
//     { id: "template" as const, label: "Template" },
//     { id: "font" as const, label: "Font" },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="px-4 pt-4 pb-3 border-b border-gray-100">
//         <div className="flex items-center justify-between mb-0.5">
//           <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
//             Customize
//           </h2>
//           <button
//             onClick={onReset}
//             className="text-[10px] text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline cursor-pointer transition-colors"
//           >
//             Reset
//           </button>
//         </div>
//         <p className="text-[10px] text-gray-400">Personalize before download</p>
//         {/* Plan badge */}
//         <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
//           Plan: {userPlan?.toUpperCase() || "FREE"}
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-100">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2.5 text-[11px] cursor-pointer font-semibold transition-colors
//               ${activeTab === tab.id ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-400 hover:text-gray-600"}`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="overflow-y-auto px-3 py-3 max-h-[55vh] lg:max-h-[calc(100vh-320px)]">
//         {activeTab === "template" && (
//           <div>
//             <p className="text-[10px] text-gray-400 mb-2">
//               Switch template — live preview updates instantly
//             </p>
//             <TemplateSwitcher
//               currentId={currentTemplateId}
//               onSwitch={onSwitchTemplate}
//               userPlan={userPlan}
//             />
//           </div>
//         )}
//         {activeTab === "font" && (
//           <div>
//             <p className="text-[10px] text-gray-400 mb-2">
//               16 professional fonts across 3 categories
//             </p>
//             <FontPicker
//               value={customization.fontFamily}
//               onChange={(f) => onChange({ ...customization, fontFamily: f })}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const Page = () => {
//   usePreventReload();
//   const context = useContext(CreateContext);

//   const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
//   const [selectedComponent, setSelectedComponent] =
//     useState<React.ComponentType<any> | null>(null);
//   const [isTwoColumn, setIsTwoColumn] = useState(false);
//   const [customization, setCustomization] = useState<ResumeCustomization>({
//     ...DEFAULT_CUSTOMIZATION,
//   });
//   const [userPlan, setUserPlan] = useState<string>("free");

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [previewScale, setPreviewScale] = useState(1);

//   // ── Fetch user plan ──────────────────────────────────────────────
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data;
//         const plan = subscription?.current_plan || "free";
//         setUserPlan(plan.toLowerCase());
//       } catch (err) {
//         console.error("Failed to fetch user plan:", err);
//         setUserPlan("free");
//       }
//     };

//     const userDetails = getLocalStorage<{ id: string }>("user_details");
//     if (userDetails?.id) {
//       fetchUserData();
//     } else {
//       setUserPlan("free");
//     }
//   }, []);

//   // ── Detect two-column ──────────────────────────────────────────────
//   const detectTwoColumn = (t: Template): boolean => {
//     const TWO_IDS = [2];
//     const TWO_PATTERN = /templatetwo|template_two|template-two|twocolumn/i;
//     return (
//       !!(t as any).twoColumn ||
//       TWO_PATTERN.test(t.component?.displayName || t.component?.name || "") ||
//       TWO_IDS.includes(Number(t.id))
//     );
//   };

//   // ── Check if template is accessible based on plan ───────────────────
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

//   // ── Switch template ────────────────────────────────────────────────
//   const applyTemplate = useCallback(
//     (t: Template) => {
//       if (!isTemplateAccessible(t.id)) {
//         console.warn(`Template ${t.id} not accessible on ${userPlan} plan`);
//         return;
//       }
//       setCurrentTemplate(t);
//       setSelectedComponent(() => t.component ?? null);
//       const isTwo = detectTwoColumn(t);
//       setIsTwoColumn(isTwo);
//       setLocalStorage("chosenTemplate", t);
//       // Update default font per template family
//       setCustomization((prev) => ({
//         ...prev,
//         fontFamily: isTwo ? "'Nunito', sans-serif" : "'Inter', sans-serif",
//       }));
//     },
//     [userPlan, isTemplateAccessible],
//   );

//   // ── Load initial template ──────────────────────────────────────────
//   useEffect(() => {
//     if (!userPlan) return;

//     const saved = getLocalStorage<Template>("chosenTemplate");
//     let found = templateData.find(
//       (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
//     );

//     // If we have a saved template, use it for preview even if not accessible
//     // But we'll show upgrade prompts in the UI
//     if (found) {
//       applyTemplate(found);
//     } else {
//       // Only fallback to first accessible if no saved template exists
//       const accessibleTemplates = templateData.filter((t) =>
//         isTemplateAccessible(t.id),
//       );
//       found = accessibleTemplates[0] || templateData[0];
//       if (found) applyTemplate(found);
//     }
//   }, [userPlan, isTemplateAccessible, applyTemplate]);

//   // ── Responsive scale ───────────────────────────────────────────────
//   useEffect(() => {
//     const calc = () => {
//       if (containerRef.current) {
//         const w = containerRef.current.clientWidth;
//         setPreviewScale(Math.max(0.25, Math.min(1, (w - 8) / 794)));
//       }
//     };
//     setTimeout(calc, 100);
//     window.addEventListener("resize", calc);
//     return () => window.removeEventListener("resize", calc);
//   }, [selectedComponent]);

//   const handleReset = useCallback(() => {
//     setCustomization({
//       ...DEFAULT_CUSTOMIZATION,
//       fontFamily: isTwoColumn ? "'Nunito', sans-serif" : "'Inter', sans-serif",
//     });
//   }, [isTwoColumn]);

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

//   const panelProps = {
//     customization,
//     onChange: setCustomization,
//     onReset: handleReset,
//     currentTemplateId: currentTemplate?.id ?? 0,
//     onSwitchTemplate: applyTemplate,
//     userPlan,
//   };

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
//             {/* Left panel */}
//             <div className="w-full lg:w-72 xl:w-80 lg:flex-shrink-0 lg:sticky lg:top-6">
//               <div className="block lg:hidden">
//                 <CustomizationPanel {...panelProps} />
//               </div>
//               <div className="hidden lg:block">
//                 <CustomizationPanel {...panelProps} />
//               </div>
//             </div>

//             {/* Resume preview */}
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
//                     {React.createElement(selectedComponent, { customization })}
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
  lazy,
  Suspense,
} from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { templateData } from "@/app/data";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import Link from "next/link";
import { CreateContext } from "@/app/context/CreateContext";
import { usePreventReload } from "@/app/hooks";
import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

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

// ─── Get accessible templates based on plan ───────────────────────────────────
const getAccessibleTemplates = (plan: string): Template[] => {
  switch (plan?.toLowerCase()) {
    case "premium":
      return templateData; // All templates
    case "pro":
      return templateData.slice(0, 3); // First 3 templates
    case "free":
    default:
      return templateData.slice(0, 1); // First 1 template only
  }
};

// ─── OPTIMIZED: Memoized Thumbnail component ──────────────────────────────────
const ResumeThumbnail = React.memo<{
  component: React.ComponentType<any>;
  isSelected: boolean;
}>(({ component, isSelected }) => {
  const A4_W = 794,
    A4_H = 1123;
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
        }}
      >
        {React.createElement(component, { alldata: undefined })}
      </div>
    </div>
  );
});
ResumeThumbnail.displayName = "ResumeThumbnail";

// ─── OPTIMIZED: Memoized Font Picker ──────────────────────────────────────────
const FontPicker = React.memo<{
  value: string;
  onChange: (f: string) => void;
}>(({ value, onChange }) => {
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
    []
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
                onClick={() => onChange(font.value)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border transition-all text-center cursor-pointer
                  ${value === font.value ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
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

// ─── OPTIMIZED: Memoized Template Switcher ────────────────────────────────────
const TemplateSwitcher = React.memo<{
  currentId: number;
  onSwitch: (t: Template) => void;
  userPlan: string;
}>(({ currentId, onSwitch, userPlan }) => {
  const accessibleTemplates = useMemo(
    () => getAccessibleTemplates(userPlan),
    [userPlan]
  );

  const isTemplateAccessible = useCallback(
    (templateId: number): boolean => {
      return accessibleTemplates.some((t) => t.id === templateId);
    },
    [accessibleTemplates]
  );

  return (
    <div className="space-y-2">
      {templateData.map((t) => {
        const isSelected = t.id === currentId;
        const isAccessible = isTemplateAccessible(t.id);
        const isLocked = !isAccessible;

        return (
          <button
            key={t.id}
            onClick={() => isAccessible && onSwitch(t)}
            disabled={!isAccessible}
            className={`w-full gap-3 p-2 rounded-xl border transition-all text-left
              ${isSelected && isAccessible ? "border-indigo-500 bg-indigo-50 shadow-sm" : ""}
              ${!isAccessible ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}
              ${isSelected && !isAccessible ? "border-red-300 bg-red-50" : ""}`}
          >
            {/* Live thumbnail */}
            <div
              className="flex-shrink-0 rounded-md overflow-hidden bg-gray-50 relative"
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
            <div className="flex-1 min-w-0">
              {isLocked && (
                <span className="text-[8px] font-medium bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                  Upgrade Required
                </span>
              )}
              <p
                className={`text-xs font-semibold truncate ${isSelected && isAccessible ? "text-indigo-700" : "text-gray-800"}`}
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
          </button>
        );
      })}
    </div>
  );
});
TemplateSwitcher.displayName = "TemplateSwitcher";

// ─── OPTIMIZED: Memoized Customization Panel ──────────────────────────────────
const CustomizationPanel = React.memo<{
  customization: ResumeCustomization;
  onChange: (c: ResumeCustomization) => void;
  onReset: () => void;
  currentTemplateId: number;
  onSwitchTemplate: (t: Template) => void;
  userPlan: string;
}>(({
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
    []
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
            onClick={onReset}
            className="text-[10px] text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="text-[10px] text-gray-400">Personalize before download</p>
        {/* Plan badge */}
        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
          Plan: {userPlan?.toUpperCase() || "FREE"}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-[11px] cursor-pointer font-semibold transition-colors
              ${activeTab === tab.id ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-400 hover:text-gray-600"}`}
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
});
CustomizationPanel.displayName = "CustomizationPanel";

// ─── Main Page ────────────────────────────────────────────────────────────────
const Page = () => {
  usePreventReload();
  const context = useContext(CreateContext);

  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [isTwoColumn, setIsTwoColumn] = useState(false);
  const [customization, setCustomization] = useState<ResumeCustomization>({
    ...DEFAULT_CUSTOMIZATION,
  });
  const [userPlan, setUserPlan] = useState<string>("free");

  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  // ─── OPTIMIZATION: React Query for user plan ──────────────────────────────
  const { data: userData } = useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const res = await api.get("/dashboard");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!getLocalStorage<{ id: string }>("user_details")?.id,
  });

  // ─── Process user plan ──────────────────────────────────────────────
  useEffect(() => {
    if (userData?.subscription) {
      const plan = userData.subscription.current_plan || "free";
      setUserPlan(plan.toLowerCase());
    }
  }, [userData]);

  // ─── Detect two-column ──────────────────────────────────────────────
  const detectTwoColumn = useCallback((t: Template): boolean => {
    const TWO_IDS = [2];
    const TWO_PATTERN = /templatetwo|template_two|template-two|twocolumn/i;
    return (
      !!(t as any).twoColumn ||
      TWO_PATTERN.test(t.component?.displayName || t.component?.name || "") ||
      TWO_IDS.includes(Number(t.id))
    );
  }, []);

  // ─── Check if template is accessible based on plan ───────────────────
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
    [userPlan]
  );

  // ─── Switch template ────────────────────────────────────────────────
  const applyTemplate = useCallback(
    (t: Template) => {
      if (!isTemplateAccessible(t.id)) {
        console.warn(`Template ${t.id} not accessible on ${userPlan} plan`);
        return;
      }
      setCurrentTemplate(t);
      setSelectedComponent(() => t.component ?? null);
      const isTwo = detectTwoColumn(t);
      setIsTwoColumn(isTwo);
      setLocalStorage("chosenTemplate", t);
      // Update default font per template family
      setCustomization((prev) => ({
        ...prev,
        fontFamily: isTwo ? "'Nunito', sans-serif" : "'Inter', sans-serif",
      }));
    },
    [userPlan, isTemplateAccessible, detectTwoColumn]
  );

  // ─── Load initial template ──────────────────────────────────────────
  useEffect(() => {
    if (!userPlan) return;

    const saved = getLocalStorage<Template>("chosenTemplate");
    let found = templateData.find(
      (r) => r.id == saved?.id || r.id == (saved as any)?.templateId,
    );

    // If we have a saved template, use it for preview even if not accessible
    if (found) {
      applyTemplate(found);
    } else {
      // Only fallback to first accessible if no saved template exists
      const accessibleTemplates = templateData.filter((t) =>
        isTemplateAccessible(t.id)
      );
      found = accessibleTemplates[0] || templateData[0];
      if (found) applyTemplate(found);
    }
  }, [userPlan, isTemplateAccessible, applyTemplate]);

  // ─── Responsive scale ───────────────────────────────────────────────
  useEffect(() => {
    const calc = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setPreviewScale(Math.max(0.25, Math.min(1, (w - 8) / 794)));
      }
    };
    const timeoutId = setTimeout(calc, 100);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calc);
    };
  }, [selectedComponent]);

  // ─── Reset handler ──────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setCustomization({
      ...DEFAULT_CUSTOMIZATION,
      fontFamily: isTwoColumn ? "'Nunito', sans-serif" : "'Inter', sans-serif",
    });
  }, [isTwoColumn]);

  // ─── Memoize panel props ────────────────────────────────────────────
  const panelProps = useMemo(
    () => ({
      customization,
      onChange: setCustomization,
      onReset: handleReset,
      currentTemplateId: currentTemplate?.id ?? 0,
      onSwitchTemplate: applyTemplate,
      userPlan,
    }),
    [customization, handleReset, currentTemplate, applyTemplate, userPlan]
  );

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
            {/* Left panel */}
            <div className="w-full lg:w-72 xl:w-80 lg:flex-shrink-0 lg:sticky lg:top-6">
              <div className="block lg:hidden">
                <CustomizationPanel {...panelProps} />
              </div>
              <div className="hidden lg:block">
                <CustomizationPanel {...panelProps} />
              </div>
            </div>

            {/* Resume preview */}
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
                    {React.createElement(selectedComponent, { customization })}
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
