// "use client";
// import React, {
//   useContext,
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { ResumeProps } from "@/app/types";
// import api from "@/app/utils/api";
// import {
//   ResumeCustomization,
//   SectionKey,
//   DEFAULT_TWO_COLUMN_ORDER,
// } from "@/app/(resume)/download-resume/page";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateTwoProps extends ResumeProps {
//   customization?: ResumeCustomization;
// }

// const TemplateTwo: React.FC<TemplateTwoProps> = ({ alldata, customization }) => {
//   const context = useContext(CreateContext);
//     const pathname = usePathname();
//     const lastSegment = pathname.split("/").pop();
//       const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization defaults ────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";
//   const activeLeftOrder: SectionKey[] = customization?.twoColumnOrder?.left ?? [...DEFAULT_TWO_COLUMN_ORDER.left];
//   const activeRightOrder: SectionKey[] = customization?.twoColumnOrder?.right ?? [...DEFAULT_TWO_COLUMN_ORDER.right];

//   // ── Data sources ──────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   // ── Photo → base64 ────────────────────────────────────────────────────────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;
//     const processImage = async () => {
//       if (!contact.photo) { setBase64Image(null); return; }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };
//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   // ── Complete Font import map ────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//       "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
//       "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//       "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
//       "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
//       "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
//       "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
//       "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
//       "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
//       "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
//       "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
//       "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
//       "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
//       "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
//       "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
//     };
//     return map[fontFamily] || map["'Inter', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes('serif')) return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes('monospace')) return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder ───────────────────────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t2-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     .t2-resume div, .t2-resume span, .t2-resume i, .t2-resume a,
//     .t2-resume p, .t2-resume li, .t2-resume strong, .t2-resume b {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }
//     .t2-resume p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t2-resume ul, .t2-resume ol { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em, .t2-resume i     { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* Header */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px; height: 100px;
//       border-radius: 6px; object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1; padding-right: 12px;
//       display: flex; flex-direction: column; justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px; font-weight: 400; letter-spacing: 0.025em;
//       color: #1f2937; line-height: 1.25; text-transform: capitalize; margin-bottom: 2px;
//     }
//     .t2-resume .header-address, .t2-resume .header-email,
//     .t2-resume .header-phone,   .t2-resume .header-dob {
//       font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex; gap: 16px; align-items: center;
//       flex-wrap: nowrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px; font-weight: 700;
//       color: #000 !important; text-decoration: underline !important;
//       text-underline-offset: 3px; white-space: nowrap; display: inline-block;
//     }

//     /* Body two-column */
//     .t2-resume .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px; border-left: 1px solid #d1d5db;
//       margin: 8px 4px; flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* Section titles */
//     .t2-resume .section-title {
//       font-size: 13px; font-weight: 700;
//       text-decoration: underline; text-underline-offset: 3px;
//       text-decoration-thickness: 2px; text-decoration-color: #1f2937;
//       letter-spacing: 0.03em; text-transform: uppercase;
//       color: #111827; margin-bottom: 4px; margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* Summary */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     /* Skills */
//     .t2-resume .skills-block   { margin-bottom: 8px; }
//     .t2-resume .skills-content { margin-top: 4px; }
//     .t2-resume .skills-content ul, .t2-resume .skills-content ol { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p  { margin: 0 0 4px 0 !important; }

//     /* Projects */
//     .t2-resume .project-links {
//       display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center;
//     }
//     .t2-resume .project-link {
//       font-size: 10px; color: #6b7280 !important;
//       text-decoration: underline !important;
//       white-space: nowrap; display: inline-block;
//     }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* Entry blocks */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex; justify-content: space-between;
//       align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px; font-weight: 700; font-style: italic;
//       color: #111827; line-height: 1.5; flex: 1; min-width: 0;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px; font-weight: 700; color: #111827;
//       line-height: 1.5; white-space: nowrap; flex-shrink: 0;
//     }
//     .t2-resume .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
//     .t2-resume .entry-content  {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t2-resume .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

//     /* Custom sections */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     /* Page break */
//     .t2-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; background: white; margin: 0; padding: 0; }
//       .t2-resume {
//         width: 100% !important; max-width: none !important;
//         box-shadow: none !important; margin: 0 !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       .t2-resume .header-link {
//         color: #000 !important;
//         text-decoration: underline !important;
//       }
//       .t2-resume .project-link {
//         color: #6b7280 !important;
//         text-decoration: underline !important;
//       }
//     }
//   `,
//     [],
//   );

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;

//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── HTML builder with proper section ordering ─────────────────────────────
//   // const generateHTML = useCallback(
// // (forPDF = false, pageBreakIds: string[] = [], skillsCutIndex = -1): string => {

// const generateHTML = useCallback(
// (forPDF = false): string => {

//       const CSS = buildCSS(activeFontFamily);

//       const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//         ? `<link rel="preconnect" href="https://fonts.googleapis.com">
//            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//            <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
//         : '';

//       const formDob = formatDateOfBirth(dateOfBirth || "");
//       const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ");

//       // Header
//       const photoBlock = base64Image
//         ? `<div class="header-photo-col"><img src="${base64Image}" alt="Profile" class="header-photo"/></div>`
//         : "";

//       const header = `
//       <div class="header-wrap" data-block-id="header">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//       // Section builders
//       const sectionBuilders: Record<SectionKey, () => string> = {
//         summary: () => summary ? `<div class="summary-block" data-block-id="summary">
//           <div class="section-title">Summary</div>
//           <div class="summary-text">${rich(summary)}</div>
//         </div>` : "",

// // skills: () => {
// //   const skillsClean = rich(skills || "");
// //   if (!skillsClean) return "";

// //   if (forPDF && skillsCutIndex >= 0) {
// //     const tempDiv = document.createElement("div");
// //     tempDiv.innerHTML = skillsClean;
// //     const allLis = Array.from(tempDiv.querySelectorAll("li"));
// //     if (skillsCutIndex < allLis.length) {
// //       const beforeLis = allLis.slice(0, skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
// //       const afterLis = allLis.slice(skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
// //       return `<div class="skills-block" data-block-id="skills-section">
// //         <div class="section-title">Skills</div>
// //         <div class="skills-content"><ul>${beforeLis}</ul></div>
// //         <div class="t2-page-break"></div>
// //         <div class="skills-content"><ul>${afterLis}</ul></div>
// //       </div>`;
// //     }
// //   }

// //   return `<div class="skills-block" data-block-id="skills-section">
// //     <div class="section-title">Skills</div>
// //     <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
// //   </div>`;
// // },

// skills: () => {
//   const skillsClean = rich(skills || "");
//   if (!skillsClean) return "";
//   return `<div class="skills-block" data-block-id="skills-section">
//     <div class="section-title">Skills</div>
//     <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//   </div>`;
// },

//         custom: () => !Array.isArray(finalize) && Array.isArray(finalize?.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//           ? `<div class="custom-section-block" data-block-id="custom-section">
//             ${finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any, i: number) => `
//               <div style="margin-bottom:6px" data-block-id="custom-${i}">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>
//             `).join("")}
//           </div>` : "",

//         experience: () => experiences.length ? `<div data-block-id="exp-section">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp: any, i: number) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate ? formatMonthYear(exp.endDate, false) : (exp.startDate ? "Present" : "");
//             return `<div class="entry-block" data-block-id="exp-${i}">
//               <div class="entry-top-row">
//                 ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//                 <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//               </div>
//               ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//               ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : "",

//         projects: () => projects.length ? `<div style="margin-top:6px" data-block-id="proj-section">
//           <div class="section-title">Projects</div>
//           ${projects.map((p: any, i: number) => `
//             <div class="entry-block" data-block-id="proj-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${p.title || ""}</div>
//                 <div class="project-links">
//                   ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                   ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//               ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//             </div>
//           `).join("")}
//         </div>` : "",

//         education: () => educations.length ? `<div style="margin-top:6px" data-block-id="edu-section">
//           <div class="section-title">Education</div>
//           ${educations.map((edu: any, i: number) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr = [edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" - ");
//             return `<div class="entry-block" data-block-id="edu-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.degree || ""}</div>
//                 ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//               </div>
//               ${edu.schoolname || edu.location || grade ? `
//                 <div class="entry-subtitle">
//                   ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//                 </div>` : ""}
//               ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : "",
//       };

//       // Build left and right columns using the custom ordering from props
//       const leftSections: SectionKey[] = ["summary", "skills", "custom"];
//       const rightSections: SectionKey[] = ["experience", "projects", "education"];

//       // Use the active orders to build the columns
//       const orderedLeft = activeLeftOrder
//         .filter(key => leftSections.includes(key) && sectionBuilders[key]?.())
//         .map(key => sectionBuilders[key]())
//         .join("");

//       const orderedRight = activeRightOrder
//         .filter(key => rightSections.includes(key) && sectionBuilders[key]?.())
//         .map(key => sectionBuilders[key]())
//         .join("");

//       const pdfStyle = forPDF ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>` : "";

//       let leftCol = orderedLeft;
//       let rightCol = orderedRight;

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">${leftCol}</div>
//       <div class="col-divider"></div>
//       <div class="right-col">${rightCol}</div>
//     </div>
//   </div>
// </body>
// </html>`;
//     },
//     [
//       activeFontFamily,
//       activeLeftOrder,
//       activeRightOrder,
//       contact,
//       educations,
//       experiences,
//       skills,
//       projects,
//       finalize,
//       summary,
//       base64Image,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       buildCSS,
//     ],
//   );

//   // ── Page splitter ─────────────────────────────────────────────────────────
//   const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

//   // REPLACE the entire splitIntoPages useCallback with this:
// const splitIntoPages = useCallback(
//   (fullHtml: string): Promise<string[]> => {
//     return new Promise((resolve) => {
//       const parser = new DOMParser();
//       const parsed = parser.parseFromString(fullHtml, "text/html");
//       const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
//       if (!resumeEl) { resolve([fullHtml]); return; }
//       const resumeSnapshot = resumeEl.outerHTML;

//       const iframe = document.createElement("iframe");
//       iframe.style.cssText = [
//         "position:fixed", "top:0", "left:-9999px",
//         `width:${A4_W}px`, "height:10000px", "border:none",
//         "opacity:0", "pointer-events:none", "z-index:-1",
//       ].join(";");
//       document.body.appendChild(iframe);

//       const measureDoc = iframe.contentDocument!;
//       measureDoc.open();
//       measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS_FOR_MEASURE}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t2-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//       measureDoc.close();

//       // REPLACE everything inside doMeasure() from the "const resumeRect..." line
// // down to "resolve(pageHtmls);" with this:

// const doMeasure = () => {
//   const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
//   if (!resume) {
//     document.body.removeChild(iframe);
//     resolve([fullHtml]);
//     return;
//   }

//   measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
//   measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//   void resume.offsetHeight;

//   // Use the full resume scrollHeight as totalH — most reliable
//   const totalH = resume.scrollHeight;

//   // All positions relative to top of .t2-resume
//   const resumeTop = resume.getBoundingClientRect().top +
//     (measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop);

//   const getRelTop = (el: HTMLElement): number => {
//     const r = el.getBoundingClientRect();
//     const docScrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
//     return r.top + docScrollY - resumeTop;
//   };
//   const getRelBottom = (el: HTMLElement): number =>
//     getRelTop(el) + el.getBoundingClientRect().height;

//   const leftCol = resume.querySelector<HTMLElement>(".left-col");
//   const rightCol = resume.querySelector<HTMLElement>(".right-col");

//   interface Block { top: number; bottom: number; id?: string; }
//   const leftBlocks: Block[] = [];
//   const rightBlocks: Block[] = [];

//   // REPLACE the entire collectBlocks function:
// const collectBlocks = (col: HTMLElement, blocks: Block[]) => {
//   const ITEM_SELECTORS = [
//     ".entry-block",
//     ".summary-block",
//     ".skills-block",
//     ".custom-section-block",
//   ].join(", ");

//   col.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//     const top = getRelTop(el);
//     const bottom = getRelBottom(el);
//     if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
//   });

//   // Section-title anchor: only keep title+firstItem together
//   // if the combined height fits within a reasonable fraction of the page
//   col.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
//     const titleTop = getRelTop(title);
//     let firstItem: HTMLElement | null = null;
//     let sib = title.nextElementSibling as HTMLElement | null;
//     while (sib) {
//       if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
//       sib = sib.nextElementSibling as HTMLElement | null;
//     }
//     if (firstItem) {
//       const deepChild = firstItem.querySelector<HTMLElement>(
//         ".entry-block, .custom-section-block"
//       );
//       const anchor = deepChild || firstItem;
//       const anchorBottom = getRelBottom(anchor);
//       const combinedHeight = anchorBottom - titleTop;
//       // Only add anchor block if it fits on a single page
//       // (prevents pushing giant blocks to next page unnecessarily)
//       if (combinedHeight > 8 && combinedHeight <= PAGE_CONTENT_H * 0.9) {
//         const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
//         blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
//       }
//     }
//   });

//   blocks.sort((a, b) => a.top - b.top);
// };

//   if (leftCol) collectBlocks(leftCol, leftBlocks);
//   if (rightCol) collectBlocks(rightCol, rightBlocks);

//   // Find the earliest safe cut point considering BOTH columns
//   // REPLACE the entire findBestCut function:
// // REPLACE findBestCut:
// const findBestCut = (
//   blocks: Block[],
//   currentStart: number,
//   naiveCut: number
// ): { cut: number; id?: string } => {
//   let actualCut = naiveCut;
//   let cutId: string | undefined;

//   const pageHeight = naiveCut - currentStart; // = PAGE_CONTENT_H
//   // Only push cut back if we'd still fill at least 80% of the page
//   const minFill = currentStart + pageHeight * 0.80;

//   for (const block of blocks) {
//     if (block.top >= naiveCut) break;
//     if (block.bottom <= currentStart) continue;

//     // Block straddles the cut line
//     if (block.bottom > naiveCut) {
//       const blockHeight = block.bottom - block.top;

//       if (
//         block.top >= minFill &&           // pushing back still fills 80% of page
//         blockHeight <= PAGE_CONTENT_H &&  // block fits on a single page
//         block.top < actualCut             // this is earlier than current best cut
//       ) {
//         actualCut = block.top;
//         cutId = block.id;
//       }
//       // else: let naive cut stand — either block is too tall or would waste too much space
//     }
//   }

//   if (actualCut <= currentStart) actualCut = naiveCut;
//   return { cut: actualCut, id: cutId };
// };

//   const pageStarts: number[] = [0];
//   const pageBreakIds: string[] = [];
//   const MAX_PAGES = 20;

//   while (pageStarts.length < MAX_PAGES) {
//     const currentStart = pageStarts[pageStarts.length - 1];
//     const naiveCut = currentStart + PAGE_CONTENT_H;
//     if (naiveCut >= totalH) break;

//     const leftResult = findBestCut(leftBlocks, currentStart, naiveCut);
//     const rightResult = findBestCut(rightBlocks, currentStart, naiveCut);

//     // Take the EARLIER cut — whichever column needs the break sooner
//     const earlier =
//       leftResult.cut <= rightResult.cut ? leftResult : rightResult;

//     pageStarts.push(earlier.cut);
//     if (earlier.id) pageBreakIds.push(earlier.id);
//   }

//   document.body.removeChild(iframe);
//   (window as any).__resumePageBreakIds = pageBreakIds;

//   // REPLACE the pageHtmls.push(...) section (the for loop that builds pageHtmls):
// const pageHtmls: string[] = [];
// for (let i = 0; i < pageStarts.length; i++) {
//   const contentOffsetY = pageStarts[i];
//   const nextStart = pageStarts[i + 1] ?? totalH;
//   const clipH = nextStart - contentOffsetY;
//   // Show full PAGE_CONTENT_H in preview, but never more than actual content
//   const previewClipH = Math.max(clipH, Math.min(PAGE_CONTENT_H, totalH - contentOffsetY));

//   pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS_FOR_MEASURE}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative; width: ${A4_W}px; height: ${A4_H}px;
//       background: white; overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute; top: ${MARGIN}px; left: 0;
//       width: ${A4_W}px; height: ${previewClipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t2-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resumeSnapshot}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`);
// }

//   resolve(pageHtmls);
// };

//       const win = iframe.contentWindow as any;
//       if (win?.document?.fonts?.ready) {
//         win.document.fonts.ready.then(() => {
//           setTimeout(() => requestAnimationFrame(doMeasure), 100);
//         });
//       } else {
//         setTimeout(doMeasure, 500);
//       }
//     });
//   },
//   [CSS_FOR_MEASURE],
// );

//   // ── Debounced updates ─────────────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── Download event listener ──────────────────────────────────────────────
//   // useEffect(() => {
//   //   const handler = async (e: Event) => {
//   //     try {
//   //       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//   //       const pdfHtml = generateHTML(true, pageBreakIds);

//   //       const res: AxiosResponse<Blob> = await api.post(
//   //         `${API_URL}/candidates/generate-pdf`,
//   //         { html: pdfHtml },
//   //         { responseType: "blob" },
//   //       );

//   //       const url = URL.createObjectURL(res.data);
//   //       const a = document.createElement("a");
//   //       a.href = url;
//   //       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//   //       document.body.appendChild(a);
//   //       a.click();
//   //       document.body.removeChild(a);
//   //       URL.revokeObjectURL(url);
//   //     } catch (err) {
//   //       console.error("PDF error:", err);
//   //       alert("Failed to generate PDF. Please try again.");
//   //     }
//   //   };

//   //   window.addEventListener("resume:download", handler);
//   //   return () => window.removeEventListener("resume:download", handler);
//   // }, [generateHTML, contact]);

//     const handleDownload = async (): Promise<void> => {
//           setIsDownloading(true);

//     try {
//      // AFTER
// // const pageBreakIds: string[] = ((window as any).__resumePageBreakIds || []).filter(
// //   (id: string) => id !== "skills-section"
// // );
// // const skillsCutIndex: number = (window as any).__resumeSkillsCutIndex ?? -1;
// // const res: AxiosResponse<Blob> = await api.post(
// //   `${API_URL}/candidates/generate-pdf`,
// //   { html: generateHTML(true, pageBreakIds, skillsCutIndex) },
// //   { responseType: "blob" },
// // );

// // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
// // const res: AxiosResponse<Blob> = await api.post(
// //   `${API_URL}/candidates/generate-pdf`,
// //   { html: generateHTML(true, pageBreakIds) },
// //   { responseType: "blob" },
// // );

//       const res: AxiosResponse<Blob> = await api.post(
//   `${API_URL}/candidates/generate-pdf`,
//   { html: generateHTML(true) },
//   { responseType: "blob" },
// );
//       const url = URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("PDF error:", err);
//       alert("Failed to generate PDF. Please try again.");
//     }
//     finally{
//           setIsDownloading(false);

//     }
//   };

//   // ── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <>
//     {/* Download button */}

//       {lastSegment === "download-resume" && (
//               <div className="text-center my-8">
//                 <motion.button
//                   onClick={handleDownload}
//                   disabled={isDownloading}
//                   whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//                   whileTap={!isDownloading ? { scale: 0.98 } : {}}
//                   className={`
//             relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//             text-white transition-all duration-300 shadow-lg
//             ${
//               isDownloading
//                 ? "bg-gray-400 cursor-not-allowed opacity-80"
//                 : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
//             }
//           `}
//                 >
//                   {/* Animated background gradient for premium feel */}
//                   {!isDownloading && (
//                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//                   )}

//                   <div className="relative flex items-center justify-center gap-3 text-lg">
//                     {isDownloading ? (
//                       <>
//                         <FaSpinner className="animate-spin text-xl" />
//                         <span>Generating PDF ...</span>
//                       </>
//                     ) : (
//                       <>
//                         <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
//                         <span>Download Resume</span>
//                         <span className="text-sm opacity-75 font-light ml-1">
//                           PDF
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </motion.button>
//               </div>
//             )}

//       {alldata ? (
//         <div
//           style={{
//             width: `${A4_W}px`,
//             height: `${A4_H}px`,
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "hidden",
//             pointerEvents: "none",
//             flexShrink: 0,
//           }}
//         >
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 border: "none",
//                 display: "block",
//                 pointerEvents: "none",
//               }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 background: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#ccc",
//                 fontSize: 14,
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "10px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     color: "#6b7280",
//                     whiteSpace: "nowrap",
//                     padding: "3px 12px",
//                     background: "#f3f4f6",
//                     borderRadius: "999px",
//                     border: "1px solid #e5e7eb",
//                     letterSpacing: "0.05em",
//                     fontFamily: "system-ui, sans-serif",
//                   }}
//                 >
//                   Page {idx + 1}
//                   {pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//               </div>

//               <div
//                 style={{
//                   width: `${A4_W}px`,
//                   height: `${A4_H}px`,
//                   overflow: "hidden",
//                   background: "white",
//                   boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                   borderRadius: "2px",
//                   flexShrink: 0,
//                 }}
//               >
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     border: "none",
//                     display: "block",
//                     pointerEvents: "none",
//                   }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateTwo;

// "use client";
// import React, {
//   useContext,
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { ResumeProps } from "@/app/types";
// import api from "@/app/utils/api";
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateTwoProps extends ResumeProps {
//   customization?: ResumeCustomization;
//     viewMode?: boolean;

// }

// const TemplateTwo: React.FC<TemplateTwoProps> = ({ alldata, customization,  viewMode = false }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization defaults ────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

//   // ── Data sources ──────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   // ── Photo → base64 ────────────────────────────────────────────────────────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;
//     const processImage = async () => {
//       if (!contact.photo) { setBase64Image(null); return; }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };
//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   // ── Complete Font import map ────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//       "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
//       "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//       "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
//       "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
//       "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
//       "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
//       "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
//       "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
//       "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
//       "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
//       "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
//       "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
//       "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
//       "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
//     };
//     return map[fontFamily] || map["'Inter', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes('serif')) return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes('monospace')) return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder ───────────────────────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t2-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     .t2-resume div, .t2-resume span, .t2-resume i, .t2-resume a,
//     .t2-resume p, .t2-resume li, .t2-resume strong, .t2-resume b {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }
//     .t2-resume p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t2-resume ul, .t2-resume ol { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em, .t2-resume i     { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* Header */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px; height: 100px;
//       border-radius: 6px; object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1; padding-right: 12px;
//       display: flex; flex-direction: column; justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px; font-weight: 400; letter-spacing: 0.025em;
//       color: #1f2937; line-height: 1.25; text-transform: capitalize; margin-bottom: 2px;
//     }
//     .t2-resume .header-address, .t2-resume .header-email,
//     .t2-resume .header-phone,   .t2-resume .header-dob {
//       font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex; gap: 16px; align-items: center;
//       flex-wrap: nowrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px; font-weight: 700;
//       color: #000 !important; text-decoration: underline !important;
//       text-underline-offset: 3px; white-space: nowrap; display: inline-block;
//     }

//     /* Body two-column */
//     .t2-resume .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px; border-left: 1px solid #d1d5db;
//       margin: 8px 4px; flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* Section titles */
//     .t2-resume .section-title {
//       font-size: 13px; font-weight: 700;
//       text-decoration: underline; text-underline-offset: 3px;
//       text-decoration-thickness: 2px; text-decoration-color: #1f2937;
//       letter-spacing: 0.03em; text-transform: uppercase;
//       color: #111827; margin-bottom: 4px; margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* Summary */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     /* Skills */
//     .t2-resume .skills-block   { margin-bottom: 8px; }
//     .t2-resume .skills-content { margin-top: 4px; }
//     .t2-resume .skills-content ul, .t2-resume .skills-content ol { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p  { margin: 0 0 4px 0 !important; }

//     /* Projects */
//     .t2-resume .project-links {
//       display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center;
//     }
//     .t2-resume .project-link {
//       font-size: 10px; color: #6b7280 !important;
//       text-decoration: underline !important;
//       white-space: nowrap; display: inline-block;
//     }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* Entry blocks */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex; justify-content: space-between;
//       align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px; font-weight: 700; font-style: italic;
//       color: #111827; line-height: 1.5; flex: 1; min-width: 0;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px; font-weight: 700; color: #111827;
//       line-height: 1.5; white-space: nowrap; flex-shrink: 0;
//     }
//     .t2-resume .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
//     .t2-resume .entry-content  {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t2-resume .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

//     /* Custom sections */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     /* Page break */
//     .t2-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; background: white; margin: 0; padding: 0; }
//       .t2-resume {
//         width: 100% !important; max-width: none !important;
//         box-shadow: none !important; margin: 0 !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       .t2-resume .header-link {
//         color: #000 !important;
//         text-decoration: underline !important;
//       }
//       .t2-resume .project-link {
//         color: #6b7280 !important;
//         text-decoration: underline !important;
//       }
//     }
//   `,
//     [],
//   );

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;

//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── HTML builder with proper section ordering ─────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false): string => {
//       const CSS = buildCSS(activeFontFamily);

//       const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//         ? `<link rel="preconnect" href="https://fonts.googleapis.com">
//            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//            <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
//         : '';

//       const formDob = formatDateOfBirth(dateOfBirth || "");
//       const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ");

//       // Header
//       const photoBlock = base64Image
//         ? `<div class="header-photo-col"><img src="${base64Image}" alt="Profile" class="header-photo"/></div>`
//         : "";

//       const header = `
//       <div class="header-wrap" data-block-id="header">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//       // Section builders
//       const sectionBuilders = {
//         summary: () => summary ? `<div class="summary-block" data-block-id="summary">
//           <div class="section-title">Summary</div>
//           <div class="summary-text">${rich(summary)}</div>
//         </div>` : "",

//         skills: () => {
//           const skillsClean = rich(skills || "");
//           if (!skillsClean) return "";
//           return `<div class="skills-block" data-block-id="skills-section">
//             <div class="section-title">Skills</div>
//             <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//           </div>`;
//         },

//         custom: () => !Array.isArray(finalize) && Array.isArray(finalize?.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//           ? `<div class="custom-section-block" data-block-id="custom-section">
//             ${finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any, i: number) => `
//               <div style="margin-bottom:6px" data-block-id="custom-${i}">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>
//             `).join("")}
//           </div>` : "",

//         experience: () => experiences.length ? `<div data-block-id="exp-section">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp: any, i: number) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate ? formatMonthYear(exp.endDate, false) : (exp.startDate ? "Present" : "");
//             return `<div class="entry-block" data-block-id="exp-${i}">
//               <div class="entry-top-row">
//                 ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//                 <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//               </div>
//               ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//               ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : "",

//         projects: () => projects.length ? `<div style="margin-top:6px" data-block-id="proj-section">
//           <div class="section-title">Projects</div>
//           ${projects.map((p: any, i: number) => `
//             <div class="entry-block" data-block-id="proj-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${p.title || ""}</div>
//                 <div class="project-links">
//                   ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                   ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//               ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//             </div>
//           `).join("")}
//         </div>` : "",

//         education: () => educations.length ? `<div style="margin-top:6px" data-block-id="edu-section">
//           <div class="section-title">Education</div>
//           ${educations.map((edu: any, i: number) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr = [edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" - ");
//             return `<div class="entry-block" data-block-id="edu-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.degree || ""}</div>
//                 ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//               </div>
//               ${edu.schoolname || edu.location || grade ? `
//                 <div class="entry-subtitle">
//                   ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//                 </div>` : ""}
//               ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : "",
//       };

//       // Build left and right columns with fixed section ordering
//       const leftSections: string[] = ["summary", "skills", "custom"];
//       const rightSections: string[] = ["experience", "projects", "education"];

//       const orderedLeft = leftSections
//         .filter(key => sectionBuilders[key as keyof typeof sectionBuilders]?.())
//         .map(key => sectionBuilders[key as keyof typeof sectionBuilders]())
//         .join("");

//       const orderedRight = rightSections
//         .filter(key => sectionBuilders[key as keyof typeof sectionBuilders]?.())
//         .map(key => sectionBuilders[key as keyof typeof sectionBuilders]())
//         .join("");

//       const pdfStyle = forPDF ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>` : "";

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">${orderedLeft}</div>
//       <div class="col-divider"></div>
//       <div class="right-col">${orderedRight}</div>
//     </div>
//   </div>
// </body>
// </html>`;
//     },
//     [
//       activeFontFamily,
//       contact,
//       educations,
//       experiences,
//       skills,
//       projects,
//       finalize,
//       summary,
//       base64Image,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       buildCSS,
//     ],
//   );

//   // ── Page splitter ─────────────────────────────────────────────────────────
//   const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed", "top:0", "left:-9999px",
//           `width:${A4_W}px`, "height:10000px", "border:none",
//           "opacity:0", "pointer-events:none", "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS_FOR_MEASURE}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t2-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeTop = resume.getBoundingClientRect().top +
//             (measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop);

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             const docScrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
//             return r.top + docScrollY - resumeTop;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           const leftCol = resume.querySelector<HTMLElement>(".left-col");
//           const rightCol = resume.querySelector<HTMLElement>(".right-col");

//           interface Block { top: number; bottom: number; id?: string; }
//           const leftBlocks: Block[] = [];
//           const rightBlocks: Block[] = [];

//           const collectBlocks = (col: HTMLElement, blocks: Block[]) => {
//             const ITEM_SELECTORS = [
//               ".entry-block",
//               ".summary-block",
//               ".skills-block",
//               ".custom-section-block",
//             ].join(", ");

//             col.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//               const top = getRelTop(el);
//               const bottom = getRelBottom(el);
//               if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
//             });

//             col.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
//               const titleTop = getRelTop(title);
//               let firstItem: HTMLElement | null = null;
//               let sib = title.nextElementSibling as HTMLElement | null;
//               while (sib) {
//                 if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
//                 sib = sib.nextElementSibling as HTMLElement | null;
//               }
//               if (firstItem) {
//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".entry-block, .custom-section-block"
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 const combinedHeight = anchorBottom - titleTop;
//                 if (combinedHeight > 8 && combinedHeight <= PAGE_CONTENT_H * 0.9) {
//                   const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
//                   blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
//                 }
//               }
//             });

//             blocks.sort((a, b) => a.top - b.top);
//           };

//           if (leftCol) collectBlocks(leftCol, leftBlocks);
//           if (rightCol) collectBlocks(rightCol, rightBlocks);

//           const findBestCut = (
//             blocks: Block[],
//             currentStart: number,
//             naiveCut: number
//           ): { cut: number; id?: string } => {
//             let actualCut = naiveCut;
//             let cutId: string | undefined;

//             const pageHeight = naiveCut - currentStart;
//             const minFill = currentStart + pageHeight * 0.80;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;

//               if (block.bottom > naiveCut) {
//                 const blockHeight = block.bottom - block.top;

//                 if (
//                   block.top >= minFill &&
//                   blockHeight <= PAGE_CONTENT_H &&
//                   block.top < actualCut
//                 ) {
//                   actualCut = block.top;
//                   cutId = block.id;
//                 }
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             return { cut: actualCut, id: cutId };
//           };

//           const pageStarts: number[] = [0];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             const leftResult = findBestCut(leftBlocks, currentStart, naiveCut);
//             const rightResult = findBestCut(rightBlocks, currentStart, naiveCut);

//             const earlier =
//               leftResult.cut <= rightResult.cut ? leftResult : rightResult;

//             pageStarts.push(earlier.cut);
//           }

//           document.body.removeChild(iframe);

//           const pageHtmls: string[] = [];
//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;
//             const previewClipH = Math.max(clipH, Math.min(PAGE_CONTENT_H, totalH - contentOffsetY));

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS_FOR_MEASURE}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative; width: ${A4_W}px; height: ${A4_H}px;
//       background: white; overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute; top: ${MARGIN}px; left: 0;
//       width: ${A4_W}px; height: ${previewClipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t2-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resumeSnapshot}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`);
//           }

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => {
//             setTimeout(() => requestAnimationFrame(doMeasure), 100);
//           });
//         } else {
//           setTimeout(doMeasure, 500);
//         }
//       });
//     },
//     [CSS_FOR_MEASURE],
//   );

//   // ── Debounced updates ─────────────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── Download handler ──────────────────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     setIsDownloading(true);
//     try {
//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: generateHTML(true) },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("PDF error:", err);
//       alert("Failed to generate PDF. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

// const isThumbnail = !!alldata && !viewMode ;
//   return (
//     <>
//       {/* Download button — hide in thumbnail mode */}
//       {/* {!isThumbnail && lastSegment === 'download-resume' &&( */}
//         <div className="text-center my-8">
//           <motion.button
//             onClick={handleDownload}
//             disabled={isDownloading}
//             whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//             whileTap={!isDownloading ? { scale: 0.98 } : {}}
//             className={`
//               relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//               text-white transition-all duration-300  shadow-lg
//               ${
//                 isDownloading
//                   ? "bg-gray-400 cursor-not-allowed opacity-80"
//                   : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
//               }
//             `}
//           >
//             {!isDownloading && (
//               <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//             )}
//             <div className="relative flex items-center justify-center gap-3 text-lg">
//               {isDownloading ? (
//                 <>
//                   <FaSpinner className="animate-spin text-xl" />
//                   <span>Generating PDF …</span>
//                 </>
//               ) : (
//                 <>
//                   <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
//                   <span>Download Resume</span>
//                   <span className="text-sm opacity-75 font-light ml-1">PDF</span>
//                 </>
//               )}
//             </div>
//           </motion.button>
//         </div>
//       {/* )} */}

//       {isThumbnail ? (
//         // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
//         <div
//           style={{
//             width: `${A4_W}px`,
//             height: `${A4_H}px`,
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "hidden",
//             pointerEvents: "none",
//             flexShrink: 0,
//           }}
//         >
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 border: "none",
//                 display: "block",
//                 pointerEvents: "none",
//               }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 background: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#ccc",
//                 fontSize: 14,
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "10px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     color: "#6b7280",
//                     whiteSpace: "nowrap",
//                     padding: "3px 12px",
//                     background: "#f3f4f6",
//                     borderRadius: "999px",
//                     border: "1px solid #e5e7eb",
//                     letterSpacing: "0.05em",
//                     fontFamily: "system-ui, sans-serif",
//                   }}
//                 >
//                   Page {idx + 1}
//                   {pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//               </div>
//               <div
//                 style={{
//                   width: `${A4_W}px`,
//                   height: `${A4_H}px`,
//                   overflow: "hidden",
//                   background: "white",
//                   boxShadow:
//                     "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                   borderRadius: "2px",
//                   flexShrink: 0,
//                 }}
//               >
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     border: "none",
//                     display: "block",
//                     pointerEvents: "none",
//                   }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateTwo;

"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
  formatSocialLink,
} from "@/app/utils";
import { ResumeProps } from "@/app/types";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateTwoProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateTwo: React.FC<TemplateTwoProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const measureIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization defaults ────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

  // ── Data sources ──────────────────────────────────────────────────────────
  const contact = alldata?.contact || context?.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills?.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // ── Photo → base64 ────────────────────────────────────────────────────────
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    const processImage = async () => {
      if (!contact.photo) {
        setBase64Image(null);
        return;
      }

      try {
        // Handle base64 string from API
        if (typeof contact.photo === "string") {
          // Check if it's a blob URL
          if (contact.photo.startsWith("blob:")) {
            const res = await fetch(contact.photo);
            const blob = await res.blob();
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result as string);
            reader.readAsDataURL(blob);
          }
          // Check if it's already a complete data URL
          else if (contact.photo.startsWith("data:image/")) {
            setBase64Image(contact.photo);
          }
          // Check if it's a file path
          else {
            setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
          }
        }
        // Handle File/Blob object
        else if (
          contact.photo &&
          typeof contact.photo === "object" &&
          "size" in contact.photo
        ) {
          objectUrl = URL.createObjectURL(contact.photo as Blob);
          const reader = new FileReader();
          reader.onloadend = () => setBase64Image(reader.result as string);
          reader.readAsDataURL(contact.photo as Blob);
        }
      } catch (err) {
        console.error("Error processing image:", err);
      }
    };

    processImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [contact.photo]);

  // ── Font map ────────────────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "'Roboto', sans-serif":
        "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif":
        "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif":
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "'DM Serif Display', serif":
        "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif":
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght=400;700&display=swap",
      "'EB Garamond', serif":
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'Inter', sans-serif"];
  };

  const getFontLinkTag = (fontFamily: string): string => {
    const url = getFontImport(fontFamily);
    if (!url) return "";
    return `<link rel="stylesheet" href="${url}"/>`;
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder (NO @import — font via <link>) ─────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t2-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
    }

    .t2-resume div, .t2-resume span, .t2-resume i, .t2-resume a,
    .t2-resume p, .t2-resume li, .t2-resume strong, .t2-resume b {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }
    .t2-resume p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t2-resume ul, .t2-resume ol { margin: 0 0 0 20px !important; padding: 0 !important; }
    .t2-resume ul  { list-style-type: disc !important; }
    .t2-resume ol  { list-style-type: decimal !important; }
    .t2-resume li  {
      margin-bottom: 1px !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
    }
    .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
    .t2-resume em, .t2-resume i     { font-style: italic !important; }
    .t2-resume u                    { text-decoration: underline !important; }

    /* Header */
    .t2-resume .header-wrap {
      display: flex;
      background-color: #EADCCE;
      padding: 10px 18px;
      border-bottom: 1px solid #d1d5db;
      gap: 16px;
      flex-shrink: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t2-resume .header-photo-col {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .t2-resume .header-photo {
      width: 100px; height: 100px;
      border-radius: 6px; object-fit: cover;
      border: 1px solid #e5e7eb;
    }
    .t2-resume .header-info-col {
      flex: 1; padding-right: 12px;
      display: flex; flex-direction: column; justify-content: center;
    }
    .t2-resume .header-name {
      font-size: 26px; font-weight: 400; letter-spacing: 0.025em;
      color: #1f2937; line-height: 1.25; text-transform: capitalize; margin-bottom: 2px;
    }
    .t2-resume .header-address, .t2-resume .header-email,
    .t2-resume .header-phone,   .t2-resume .header-dob {
      font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 1px;
    }
    .t2-resume .header-links {
      display: flex; gap: 16px; align-items: center;
      flex-wrap: wrap;
    }
    .t2-resume .header-link {
      font-size: 12px; font-weight: 700;
      color: #000 !important; text-decoration: underline !important;
      text-underline-offset: 3px; white-space: nowrap; display: inline-block;
    }

    /* Body two-column */
    .t2-resume .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
    .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
    .t2-resume .col-divider {
      width: 1px; border-left: 1px solid #d1d5db;
      margin: 8px 4px; flex-shrink: 0;
    }
    .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

    /* Section titles */
    .t2-resume .section-title {
      font-size: 13px; font-weight: 700;
      text-decoration: underline; text-underline-offset: 3px;
      text-decoration-thickness: 2px; text-decoration-color: #1f2937;
      letter-spacing: 0.03em; text-transform: uppercase;
      color: #111827; margin-bottom: 4px; margin-top: 12px;
      line-height: 1.5;
      page-break-after: avoid; break-after: avoid;
    }
    .t2-resume .section-title:first-child { margin-top: 0; }

    /* Summary */
    .t2-resume .summary-block { margin-bottom: 6px; }
    .t2-resume .summary-text  {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    /* Skills */
    .t2-resume .skills-block   { margin-bottom: 8px; }
    .t2-resume .skills-content { margin-top: 4px; }
    .t2-resume .skills-content ul, .t2-resume .skills-content ol { margin: 4px 0 4px 20px !important; }
    .t2-resume .skills-content li { margin-bottom: 2px !important; }
    .t2-resume .skills-content p  { margin: 0 0 4px 0 !important; }

    /* Projects */
    .t2-resume .project-links {
      display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center;
    }
    .t2-resume .project-link {
      font-size: 10px; color: #6b7280 !important;
      text-decoration: underline !important;
      white-space: nowrap; display: inline-block;
    }
    .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

    /* Entry blocks */
    .t2-resume .entry-block {
      margin-bottom: 6px;
    }
    .t2-resume .entry-top-row {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
      page-break-after: avoid; break-after: avoid;
    }
    .t2-resume .entry-title {
      font-size: 11.5px; font-weight: 700; font-style: italic;
      color: #111827; line-height: 1.5; flex: 1; min-width: 0;
    }
    .t2-resume .entry-date {
      font-size: 11.5px; font-weight: 700; color: #111827;
      line-height: 1.5; white-space: nowrap; flex-shrink: 0;
    }
    .t2-resume .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
    .t2-resume .entry-content  {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .t2-resume .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

    /* Custom sections */
    .t2-resume .custom-section-block   { margin: 6px 0; }
    .t2-resume .custom-section-content {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    /* Page break */
    .t2-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; background: white; margin: 0; padding: 0; }
      .t2-resume {
        width: 100% !important; max-width: none !important;
        box-shadow: none !important; margin: 0 !important;
      }
      .t2-resume .header-wrap {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .t2-resume .header-link {
        color: #000 !important;
        text-decoration: underline !important;
      }
      .t2-resume .project-link {
        color: #6b7280 !important;
        text-decoration: underline !important;
      }
    }
  `,
    [],
  );

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) =>
    url.startsWith("http") ? url : `https://${url}`;

  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── HTML builder ───────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false): string => {
      const CSS = buildCSS(activeFontFamily);

      const formDob = formatDateOfBirth(dateOfBirth || "");
      const addressStr = [
        contact?.address,
        contact?.city,
        contact?.postCode,
        contact?.country,
      ]
        .filter(Boolean)
        .join(", ");

      // Header
      const photoBlock = base64Image
        ? `<div class="header-photo-col"><img src="${base64Image}" alt="Profile" class="header-photo"/></div>`
        : "";

      const header = `
      <div class="header-wrap" data-block-id="header">
        ${photoBlock}
        <div class="header-info-col">
          <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
          ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
          ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
          ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
          <div class="header-links">
            ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn: ${formatSocialLink(linkedinUrl, "linkedin")}</a>` : ""}
            ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub: ${formatSocialLink(githubUrl, "github")}</a>` : ""}
            ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">${formatSocialLink(portfolioUrl, "portfolio")}</a>` : ""}
          </div>
        </div>
      </div>`;

      // Section builders
      const sectionBuilders = {
        summary: () =>
          summary
            ? `<div class="summary-block" data-block-id="summary">
          <div class="section-title">Summary</div>
          <div class="summary-text">${rich(summary)}</div>
        </div>`
            : "",

        skills: () => {
          const skillsClean = rich(skills || "");
          if (!skillsClean) return "";
          return `<div class="skills-block" data-block-id="skills-section">
            <div class="section-title">Skills</div>
            <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
          </div>`;
        },

        custom: () =>
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.customSection) &&
          finalize.customSection.some(
            (s: any) => s?.name?.trim() || s?.description?.trim(),
          )
            ? `<div class="custom-section-block" data-block-id="custom-section">
            ${finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
              <div style="margin-bottom:6px" data-block-id="custom-${i}">
                ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
                ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>`
            : "",

        experience: () =>
          experiences.length
            ? `<div data-block-id="exp-section">
          <div class="section-title">Experience</div>
          ${experiences
            .map((exp: any, i: number) => {
              const start = formatMonthYear(exp.startDate, false);
              const end = exp.endDate
                ? formatMonthYear(exp.endDate, false)
                : exp.startDate
                  ? "Present"
                  : "";
              return `<div class="entry-block" data-block-id="exp-${i}">
              <div class="entry-top-row">
                ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
                <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
              </div>
              ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
              ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
            </div>`;
            })
            .join("")}
        </div>`
            : "",

        projects: () =>
          projects.length
            ? `<div style="margin-top:6px" data-block-id="proj-section">
          <div class="section-title">Projects</div>
          ${projects
            .map(
              (p: any, i: number) => `
            <div class="entry-block" data-block-id="proj-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${p.title || ""}</div>
                <div class="project-links">
                  ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                  ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
                </div>
              </div>
              ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
              ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>`
            : "",

        education: () =>
          educations.length
            ? `<div style="margin-top:6px" data-block-id="edu-section">
          <div class="section-title">Education</div>
          ${educations
            .map((edu: any, i: number) => {
              const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
              const dateStr = [edu.startDate, edu.endDate || "Present"]
                .filter(Boolean)
                .join(" - ");
              return `<div class="entry-block" data-block-id="edu-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${edu.degree || ""}</div>
                ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
              </div>
              ${
                edu.schoolname || edu.location || grade
                  ? `
                <div class="entry-subtitle">
                  ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
                </div>`
                  : ""
              }
              ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
            </div>`;
            })
            .join("")}
        </div>`
            : "",
      };

      // Build left and right columns
      const leftSections: string[] = ["summary", "skills", "custom"];
      const rightSections: string[] = ["experience", "projects", "education"];

      const orderedLeft = leftSections
        .filter((key) =>
          sectionBuilders[key as keyof typeof sectionBuilders]?.(),
        )
        .map((key) => sectionBuilders[key as keyof typeof sectionBuilders]())
        .join("");

      const orderedRight = rightSections
        .filter((key) =>
          sectionBuilders[key as keyof typeof sectionBuilders]?.(),
        )
        .map((key) => sectionBuilders[key as keyof typeof sectionBuilders]())
        .join("");

      const pdfStyle = forPDF
        ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${getFontLinkTag(activeFontFamily)}
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t2-resume">
    ${header}
    <div class="body-wrap">
      <div class="left-col">${orderedLeft}</div>
      <div class="col-divider"></div>
      <div class="right-col">${orderedRight}</div>
    </div>
  </div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      contact,
      educations,
      experiences,
      skills,
      projects,
      finalize,
      summary,
      base64Image,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      buildCSS,
    ],
  );

  // ── PDF builder (clip/shift — matches preview exactly) ─────────────────────
  const buildPDFPagesHTML = useCallback(
    (pageStarts: number[], totalH: number, resumeSnapshot: string): string => {
      const CSS = buildCSS(activeFontFamily);

      let pagesBody = "";
      for (let i = 0; i < pageStarts.length; i++) {
        const contentOffsetY = pageStarts[i];
        const nextStart = pageStarts[i + 1] ?? totalH;
        const clipH = nextStart - contentOffsetY;
        const isLastPage = i === pageStarts.length - 1;

        pagesBody += `
    <div class="pdf-page" style="position:relative;width:${A4_W}px;height:${A4_H}px;overflow:hidden;background:white;${!isLastPage ? "page-break-after:always;break-after:page;" : ""}">
      <div style="position:absolute;top:${MARGIN}px;left:0;width:${A4_W}px;height:${clipH}px;overflow:hidden;">
        <div style="position:absolute;top:${-contentOffsetY}px;left:0;width:${A4_W}px;">
          ${resumeSnapshot}
        </div>
      </div>
    </div>`;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume</title>
  ${getFontLinkTag(activeFontFamily)}
  <style>
    ${CSS}
    @page { size: A4; margin: 0; }
    html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
    .t2-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
    .pdf-page { page-break-inside: avoid; }
  </style>
</head>
<body style="margin:0;padding:0;background:white;">
  ${pagesBody}
</body>
</html>`;
    },
    [buildCSS, activeFontFamily],
  );

  // ── Memoized CSS & font link for measurement ───────────────────────────────
  const CSS_FOR_MEASURE = useMemo(
    () => buildCSS(activeFontFamily),
    [buildCSS, activeFontFamily],
  );
  const FONT_LINK_TAG = useMemo(
    () => getFontLinkTag(activeFontFamily),
    [activeFontFamily],
  );

  // ── Page splitter (same line-box logic as TemplateOne) ─────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
        if (!resumeEl) {
          resolve([fullHtml]);
          return;
        }
        const resumeSnapshot = resumeEl.outerHTML;

        // ── Reuse or create measurement iframe ────────────────────────────
        let iframe = measureIframeRef.current;
        if (!iframe || !document.body.contains(iframe)) {
          iframe = document.createElement("iframe");
          iframe.style.cssText = [
            "position:fixed",
            "top:0",
            "left:-9999px",
            `width:${A4_W}px`,
            "height:10000px",
            "border:none",
            "opacity:0",
            "pointer-events:none",
            "z-index:-1",
          ].join(";");
          document.body.appendChild(iframe);
          measureIframeRef.current = iframe;
        }

        const measureDoc = iframe.contentDocument!;
        measureDoc.open();
        measureDoc.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
 ${FONT_LINK_TAG}
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t2-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
          if (!resume) {
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const resumeRect = resume.getBoundingClientRect();
          const scrollY =
            measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
          const getRelTop = (el: Element) =>
            el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: Element) =>
            getRelTop(el) + el.getBoundingClientRect().height;

          // ── Build atomic "units" (same logic as TemplateOne) ──────────
          interface Unit {
            top: number;
            bottom: number;
            blockId?: string;
            keepWithNext?: boolean;
          }
          const units: Unit[] = [];
          const consumed = new Set<Element>();

          const nearestBlockId = (el: Element): string | undefined => {
            let cur: Element | null = el;
            while (cur && cur !== resume) {
              const id = (cur as HTMLElement).dataset?.blockId;
              if (id) return id;
              cur = cur.parentElement;
            }
            return undefined;
          };

          const HEADER_LIKE_SELECTOR = [
            ".entry-top-row",
            ".section-title",
            ".entry-title",
          ].join(", ");

          const ATOMIC_SELECTOR = [
            ".project-tech-stack",
            ".header-links",
            ".header-wrap",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".summary-text",
            ".skills-content",
            ".entry-content",
            ".custom-section-content",
          ].join(", ");

          const pushLines = (el: HTMLElement, keepWithNext = false) => {
            const range = measureDoc.createRange();
            range.selectNodeContents(el);
            const rects = Array.from(range.getClientRects()).filter(
              (r) => r.height > 2 && r.width > 0,
            );
            if (rects.length === 0) return false;
            const blockId = nearestBlockId(el);
            rects
              .sort((a, b) => a.top - b.top)
              .forEach((r, idx) => {
                units.push({
                  top: r.top - resumeRect.top + scrollY,
                  bottom: r.bottom - resumeRect.top + scrollY,
                  blockId,
                  keepWithNext: idx === 0 ? keepWithNext : false,
                });
              });
            return true;
          };

          const pushAtomic = (el: HTMLElement, keepWithNext = false) => {
            const h = el.getBoundingClientRect().height;
            if (h <= 2) return;
            units.push({
              top: getRelTop(el),
              bottom: getRelBottom(el),
              blockId: nearestBlockId(el),
              keepWithNext,
            });
          };

          Array.from(resume.querySelectorAll<HTMLElement>("*")).forEach(
            (el) => {
              if (consumed.has(el)) return;

              if (el.matches(HEADER_LIKE_SELECTOR)) {
                pushAtomic(el, true);
                el.querySelectorAll("*").forEach((c) => consumed.add(c));
                consumed.add(el);
                return;
              }
              if (el.matches(ATOMIC_SELECTOR)) {
                pushAtomic(el, false);
                el.querySelectorAll("*").forEach((c) => consumed.add(c));
                consumed.add(el);
                return;
              }
              if (el.matches("p, li")) {
                if (pushLines(el)) {
                  el.querySelectorAll("*").forEach((c) => consumed.add(c));
                  consumed.add(el);
                }
                return;
              }
              if (
                el.matches(DESC_WRAPPER_SELECTOR) &&
                !el.querySelector("p, li")
              ) {
                if (pushLines(el)) consumed.add(el);
              }
            },
          );

          // Remaining single-line leaves
          resume
            .querySelectorAll<HTMLElement>(
              ".header-name, .header-address, .header-email, .header-phone, .header-dob, .entry-subtitle, .education-grade",
            )
            .forEach((el) => {
              if (consumed.has(el)) return;
              pushAtomic(el, false);
              consumed.add(el);
            });

          units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

          const totalH = resume.scrollHeight;

          // ── Greedily pack units into pages ───────────────────────────
          const pageStarts: number[] = [0];
          const pageBreakIds: string[] = [];
          let pageStart = 0;

          for (let i = 0; i < units.length; i++) {
            const u = units[i];
            if (u.bottom - pageStart <= PAGE_CONTENT_H) continue;

            let breakAt = i;
            while (
              breakAt > 0 &&
              units[breakAt - 1].keepWithNext &&
              units[breakAt - 1].top >= pageStart
            ) {
              breakAt--;
            }

            const newTop = units[breakAt].top;
            pageStart = newTop > pageStart ? newTop : u.top;
            pageStarts.push(pageStart);
            pageBreakIds.push(units[breakAt].blockId || "");
            if (pageStarts.length >= 20) break;
          }

          // ── Store data for PDF generation ────────────────────────────
          (window as any).__resumePageBreakIds = pageBreakIds.filter(Boolean);
          (window as any).__resumePageStarts = pageStarts;
          (window as any).__resumeTotalH = totalH;
          (window as any).__resumeSnapshot = resumeSnapshot;

          // ── Build per-page HTML ──────────────────────────────────────
          const pageHtmls: string[] = [];
          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;
            pageHtmls.push(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
 ${FONT_LINK_TAG}
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t2-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
</style></head>
<body>
  <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
</body></html>`);
          }
          resolve(pageHtmls);
        };

        // ── Smart font wait ────────────────────────────────────────────
        const mainFontsReady =
          typeof document !== "undefined" &&
          document.fonts?.status === "loaded";
        const win = iframe!.contentWindow as any;

        if (mainFontsReady) {
          requestAnimationFrame(() => requestAnimationFrame(doMeasure));
        } else if (win?.document?.fonts?.ready) {
          win.document.fonts.ready.then(() => requestAnimationFrame(doMeasure));
        } else {
          setTimeout(doMeasure, 150);
        }
      });
    },
    [CSS_FOR_MEASURE, FONT_LINK_TAG],
  );

  // ── Debounced updates (60ms) ───────────────────────────────────────────────
  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 60);
  }, []);

  useEffect(() => {
    scheduleUpdate(generateHTML());
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [generateHTML, scheduleUpdate]);

  useEffect(() => {
    if (!htmlContent) return;
    splitIntoPages(htmlContent).then(setPages);
  }, [htmlContent, splitIntoPages]);

  // ── Cleanup measurement iframe on unmount ─────────────────────────────────
  useEffect(() => {
    return () => {
      if (
        measureIframeRef.current &&
        document.body.contains(measureIframeRef.current)
      ) {
        document.body.removeChild(measureIframeRef.current);
        measureIframeRef.current = null;
      }
    };
  }, []);

  // ── Download handler ──────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
      const storedPageStarts: number[] | undefined = (window as any)
        .__resumePageStarts;
      const storedTotalH: number | undefined = (window as any).__resumeTotalH;
      const storedSnapshot: string | undefined = (window as any)
        .__resumeSnapshot;

      let pdfHtml: string;

      if (storedPageStarts?.length && storedTotalH && storedSnapshot) {
        pdfHtml = buildPDFPagesHTML(
          storedPageStarts,
          storedTotalH,
          storedSnapshot,
        );
      } else {
        pdfHtml = generateHTML(true);
      }

      const res: AxiosResponse<Blob> = await api.post(
        `${API_URL}/candidates/generate-pdf`,
        { html: pdfHtml },
        { responseType: "blob" },
      );
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const isThumbnail = !!alldata && !viewMode;

  return (
    <>
      {/* ── Font preconnect ──────────────────────────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* ── Download button ──────────────────────────────────────────────── */}
      {!isThumbnail && lastSegment === "download-resume" && (
        <div className="text-center my-8">
          <motion.button
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDownloading ? { scale: 0.98 } : {}}
            className={`
            relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
            text-white transition-all duration-300 shadow-lg
            ${
              isDownloading
                ? "bg-gray-400 cursor-not-allowed opacity-80"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
            }
          `}
          >
            {!isDownloading && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}
            <div className="relative flex items-center justify-center gap-3 text-lg">
              {isDownloading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Generating PDF …</span>
                </>
              ) : (
                <>
                  <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                  <span className="text-sm opacity-75 font-light ml-1">
                    PDF
                  </span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      )}
      {isThumbnail ? (
        // ── THUMBNAIL MODE ──────────────────────────────────────────────
        <div
          style={{
            width: `${A4_W}px`,
            height: `${A4_H}px`,
            transform: "scale(0.36)",
            transformOrigin: "top left",
            overflow: "hidden",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        >
          {pages[0] ? (
            <iframe
              title="resume-thumb"
              srcDoc={pages[0]}
              style={{
                width: `${A4_W}px`,
                height: `${A4_H}px`,
                border: "none",
                display: "block",
                pointerEvents: "none",
              }}
              sandbox="allow-same-origin"
            />
          ) : (
            <div
              style={{
                width: `${A4_W}px`,
                height: `${A4_H}px`,
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ccc",
                fontSize: 14,
                fontFamily: "sans-serif",
              }}
            >
              Loading…
            </div>
          )}
        </div>
      ) : (
        // ── FULL PREVIEW MODE ──────────────────────────────────────────
        <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
          {pages.length > 0 ? (
            // ── Paginated view ────────────────────────────────────────
            pages.map((pageHtml, idx) => (
              <div key={idx} style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "#d1d5db",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6b7280",
                      whiteSpace: "nowrap",
                      padding: "3px 12px",
                      background: "#f3f4f6",
                      borderRadius: "999px",
                      border: "1px solid #e5e7eb",
                      letterSpacing: "0.05em",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    Page {idx + 1}
                    {pages.length > 1 ? ` of ${pages.length}` : ""}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "#d1d5db",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: `${A4_W}px`,
                    height: `${A4_H}px`,
                    overflow: "hidden",
                    background: "white",
                    boxShadow:
                      "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                >
                  <iframe
                    title={`resume-page-${idx + 1}`}
                    srcDoc={pageHtml}
                    style={{
                      width: `${A4_W}px`,
                      height: `${A4_H}px`,
                      border: "none",
                      display: "block",
                      pointerEvents: "none",
                    }}
                    scrolling="no"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              </div>
            ))
          ) : htmlContent ? (
            // ── Instant preview while paginating ──────────────────────
            <div>
              <div
                style={{
                  width: `${A4_W}px`,
                  height: `${A4_H}px`,
                  overflow: "hidden",
                  background: "white",
                  boxShadow:
                    "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
                  borderRadius: "2px",
                }}
              >
                <iframe
                  title="resume-loading-preview"
                  srcDoc={htmlContent}
                  style={{
                    width: `${A4_W}px`,
                    height: `${A4_H}px`,
                    border: "none",
                    display: "block",
                  }}
                  scrolling="no"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "12px",
                  color: "#9ca3af",
                  fontSize: "13px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Formatting pages…
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default TemplateTwo;
