// "use client";
// import React, {
//   useContext,
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";
// import {
//   ResumeCustomization,

// } from "@/app/(resume)/download-resume/page";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateSevenProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean;
// }

// const TemplateSeven: React.FC<TemplateSevenProps> = ({ alldata, customization,viewMode=false }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//     const [isDownloading, setIsDownloading] = useState<boolean>(false);
  

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

//   // ── Data sources ─────────────────────────────────────────────────────────
//   const contact    = alldata?.contact    || context.contact    || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences= alldata?.experiences|| context?.experiences|| [];
//   const skills     = alldata?.skills?.text || context?.skills?.text || "";
//   const projects   = alldata?.projects   || context?.projects  || [];
//   const finalize   = alldata?.finalize   || context?.finalize  || {};
//   const summary    = alldata?.summary    || context?.summary   || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl  = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl    = contact?.github;
//   const dateOfBirth  = contact?.dob;

//   // ── Complete Font import map ────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
//       "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
//       "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
//       "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap",
//       "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap",
//       "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
//       "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
//       "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
//       "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
//       "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap",
//       "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
//       "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
//       "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
//       "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
//       "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
//       "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
//     };
//     return map[fontFamily] || map["'Nunito', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes('serif')) return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes('monospace')) return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder with dynamic font ─────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t7-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     .t7-resume p, .t7-resume div, .t7-resume span, .t7-resume li, .t7-resume a,
//     .t7-resume h1, .t7-resume h2, .t7-resume h3 {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     .t7-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Header */
//     .t7-resume .resume-header {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 2px solid #000000;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .name {
//       font-size: 28px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       color: #333333;
//       margin-bottom: 12px;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t7-resume .links {
//       margin-top: 8px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: underline;
//       font-size: 12px;
//     }

//     /* Sections */
//     .t7-resume .section {
//       margin-bottom: 20px;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Experience */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .experience-title    { font-size: 15px; font-weight: 700; color: #000000; }
//     .t7-resume .experience-subtitle { font-size: 13px; font-weight: 500; color: #555555; margin-top: 2px; }
//     .t7-resume .experience-date     { font-size: 12px; color: #555555; white-space: nowrap; }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Education */
//     .t7-resume .education-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .education-school    { font-size: 15px; font-weight: 700; color: #000000; }
//     .t7-resume .education-subtitle  { font-size: 13px; color: #555555; margin-top: 2px; }
//     .t7-resume .education-date      { font-size: 12px; color: #555555; white-space: nowrap; }
//     .t7-resume .education-grade     { font-size: 12px; color: #555555; margin-top: 4px; font-weight: 500; display: inline-block; }

//     .t7-resume .education-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Projects */
//     .t7-resume .project-item {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title  { font-size: 15px; font-weight: 700; color: #000000; }
//     .t7-resume .project-links  { display: flex; gap: 12px; }
//     .t7-resume .project-link   { color: #000000; text-decoration: underline; font-size: 12px; }
//     .t7-resume .project-tech-stack { font-size: 12px; color: #555555; margin: 4px 0 6px; }

//     .t7-resume .project-description {
//       margin-top: 6px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Skills */
//     .t7-resume .skills-content { padding: 0 5px; }

//     .t7-resume .skills-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .skills-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .skills-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }
//     .t7-resume .skills-content p  { margin: 0 0 6px 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* Custom sections */
//     .t7-resume .custom-section-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .custom-section-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .custom-section-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }

//     /* Summary */
//     .t7-resume .summary-text ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .summary-text ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .summary-text li { margin-bottom: 4px !important; line-height: 1.5 !important; }

//     /* List styles for descriptions */
//     .t7-resume .experience-description ul,
//     .t7-resume .experience-description ol,
//     .t7-resume .education-description ul,
//     .t7-resume .education-description ol,
//     .t7-resume .project-description ul,
//     .t7-resume .project-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .experience-description ul,
//     .t7-resume .education-description ul,
//     .t7-resume .project-description ul  { list-style-type: disc    !important; }

//     .t7-resume .experience-description ol,
//     .t7-resume .education-description ol,
//     .t7-resume .project-description ol  { list-style-type: decimal !important; }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li,
//     .t7-resume .project-description li  { margin-bottom: 4px !important; line-height: 1.5 !important; }

//     /* Preserve spaces */
//     .t7-resume .experience-description p,
//     .t7-resume .education-description p,
//     .t7-resume .project-description p,
//     .t7-resume .summary-text p,
//     .t7-resume .custom-section-content p,
//     .t7-resume .skills-content p { white-space: pre-wrap !important; }

//     /* Page-break marker */
//     .t7-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     @media print {
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; }
//       .t7-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//         background: white;
//       }
//       .t7-resume .resume-header { margin-top: 0; padding-top: 0; }
//       .t7-resume .project-link,
//       .t7-resume .link-item { color: #000000 !important; text-decoration: underline !important; }
//     }
//   `,
//     [],
//   );

//   const CSS = buildCSS(activeFontFamily);

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
  
//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── Section builders ──────────────────────────────────────────────────────

  

//   // ── HTML builder with section ordering ───────────────────────────────────
//  // AFTER
// const generateHTML = useCallback(
// (forPDF = false, pageBreakIds: string[] = []): string => {
//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       // Header
//       const header = `
//         <div class="resume-header" data-block-id="t7-header">
//           <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//           <div class="job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
//           <div class="contact-row">
//             ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//             ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//             ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//           </div>
//           ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//           <div class="links">
//             ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>`;

//       const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif" 
//         ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
//            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//            <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//         : '';

//       const pdfStyle = forPDF
//         ? `<style>.t7-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";


//         const sectionBuilders = {
//   summary: () => summary ? `
//     <div class="section" data-block-id="t7-summary">
//       <h2 class="section-title">Professional Summary</h2>
//       <div class="summary-text">${rich(summary)}</div>
//     </div>
//   ` : "",

//   experience: () => experiences.length > 0 ? `
//     <div class="section" data-block-id="t7-exp-section">
//       <h2 class="section-title">Experience</h2>
//       ${experiences.map((exp: any, i: number) => {
//         const startFormatted = formatMonthYear(exp.startDate, false);
//         const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//         return `<div class="experience-item" data-block-id="t7-exp-${i}">
//           <div class="experience-header">
//             <div>
//               <div class="experience-title">${exp.jobTitle || ""}</div>
//               <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//           </div>
//           ${exp.text ? `<div class="experience-description">${rich(exp.text)}</div>` : ""}
//         </div>`;
//       }).join("")}
//     </div>
//   ` : "",

//   projects: () => projects.length > 0 ? `
//     <div class="section" data-block-id="t7-proj-section">
//       <h2 class="section-title">Projects</h2>
//       ${projects.map((p: any, i: number) => `
//         <div class="project-item" data-block-id="t7-proj-${i}">
//           <div class="project-header">
//             <div class="project-title">${p.title || ""}</div>
//             ${p.liveUrl || p.githubUrl ? `
//               <div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             ` : ""}
//           </div>
//           ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
//           ${p.description ? `<div class="project-description">${rich(p.description)}</div>` : ""}
//         </div>
//       `).join("")}
//     </div>
//   ` : "",

//   education: () => educations.length > 0 ? `
//     <div class="section" data-block-id="t7-edu-section">
//       <h2 class="section-title">Education</h2>
//       ${educations.map((edu: any, i: number) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `<div class="education-item" data-block-id="t7-edu-${i}">
//           <div class="education-header">
//             <div>
//               <div class="education-school">${edu.schoolname || ""}</div>
//               <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//               ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//             </div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           ${edu.text ? `<div class="education-description">${rich(edu.text)}</div>` : ""}
//         </div>`;
//       }).join("")}
//     </div>
//   ` : "",

//  // AFTER
// skills: () => {
//   const skillsClean = rich(skills || "");
//   if (!skillsClean || skillsClean === "<p><br></p>") return "";
//   return `<div class="section" data-block-id="t7-skills-section">
//     <h2 class="section-title">Skills</h2>
//     <div class="skills-content" data-block-id="t7-skills-content">${skillsClean}</div>
//   </div>`;
// },

//   custom: () => {
//     if (!Array.isArray(finalize?.customSection)) return "";
//     const filteredCustom = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
//     if (filteredCustom.length === 0) return "";
//     return filteredCustom.map((s: any, i: number) => `
//       <div class="section" data-block-id="t7-custom-${i}">
//         <div class="custom-section">
//           ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//           ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//         </div>
//       </div>
//     `).join("");
//   },
// };

//       // Build sections in the order defined by customization
   


//          const sectionsHTML = [
//   sectionBuilders.summary?.(),
//   sectionBuilders.experience?.(),
//   sectionBuilders.projects?.(),
//   sectionBuilders.education?.(),
//   sectionBuilders.skills?.(),
//   sectionBuilders.custom?.(),
// ]
//   .filter(Boolean)
//   .join("");

//       let bodyContent = `${header}${sectionsHTML}`;

//       // For PDF: inject page breaks
//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t7-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         bodyContent = tempDiv.innerHTML;
//       }

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t7-resume">
//     ${bodyContent}
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
//       addressParts,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       CSS,
//     ],
//   );

//   // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t7-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed",
//           "top:0",
//           "left:-9999px",
//           `width:${A4_W}px`,
//           "height:10000px",
//           "border:none",
//           "opacity:0",
//           "pointer-events:none",
//           "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t7-resume {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".t7-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number => getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".experience-item",
//             ".education-item",
//             ".project-item",
//             ".resume-header",
//             ".custom-section",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // AFTER
// resume.querySelectorAll<HTMLElement>(".section").forEach((section) => {
//   const sectionTop = getRelTop(section);
//   const firstItem = section.querySelector<HTMLElement>(
//     ".experience-item, .education-item, .project-item, .custom-section, .skills-content",
//   );

//   // Skip anchor logic for skills — allow it to split across pages
//   if (firstItem?.classList.contains("skills-content")) return;

//   if (firstItem) {
//     const anchorBottom = getRelBottom(firstItem);
//     if (anchorBottom - sectionTop > 8) {
//       blocks.push({ top: sectionTop, bottom: anchorBottom, id: section.dataset.blockId });
//     }
//   } else {
//     const sectionBottom = getRelBottom(section);
//     if (sectionBottom - sectionTop > 8) {
//       blocks.push({ top: sectionTop, bottom: sectionBottom, id: section.dataset.blockId });
//     }
//   }
// });

//           blocks.sort((a, b) => a.top - b.top);

//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut;
//             let cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 if (block.top < actualCut) {
//                   actualCut = block.top;
//                   cutBlockId = block.id;
//                 }
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

      

// document.body.removeChild(iframe);
// (window as any).__resumePageBreakIds = pageBreakIds;

//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS}
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
//       width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t7-resume {
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
//     [CSS],
//   );

//   // ── Debounced updates ────────────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download ─────────────────────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     setIsDownloading(true)
//     try {
//       // AFTER
// // AFTER
// const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
// const pdfHtml = generateHTML(true, pageBreakIds);

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: pdfHtml },
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
//           setIsDownloading(false)

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

// export default TemplateSeven;











"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
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
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateSevenProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateSeven: React.FC<TemplateSevenProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

  // ── Data sources ─────────────────────────────────────────────────────────
  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills?.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  console.log(skills)
  
  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // ── Font import map ─────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
      "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap",
      "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap",
      "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap",
      "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'Nunito', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif")) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace")) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ───────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t7-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 14px;
      line-height: 1.5;
      color: #111827;
      text-align: left;
    }

    .t7-resume p, .t7-resume div, .t7-resume span, .t7-resume li, .t7-resume a,
    .t7-resume h1, .t7-resume h2, .t7-resume h3 {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume p {
      margin: 0 0 6px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t7-resume .resume-header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #000000;
    }

    .t7-resume .name {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
      color: #000000;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume .job-title {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 12px;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume .contact-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: #444444;
      margin-bottom: 8px;
    }

    .t7-resume .address {
      font-size: 12px;
      color: #444444;
      margin-top: 4px;
    }

    .t7-resume .links {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .t7-resume .link-item {
      color: #000000;
      text-decoration: underline;
      font-size: 12px;
    }

    .t7-resume .section { margin-bottom: 20px; }

    .t7-resume .section-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #000000;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #000000;
      text-align: center !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume .custom-section-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #000000;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #000000;
      text-align: center !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume .experience-item { margin-bottom: 20px; }

    .t7-resume .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 8px;
    }

    .t7-resume .experience-title    { font-size: 15px; font-weight: 700; color: #000000; }
    .t7-resume .experience-subtitle { font-size: 13px; font-weight: 500; color: #555555; margin-top: 2px; }
    .t7-resume .experience-date     { font-size: 12px; color: #555555; white-space: nowrap; }

    .t7-resume .experience-description {
      margin-top: 8px;
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
    }

    .t7-resume .education-item { margin-bottom: 20px; }

    .t7-resume .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 8px;
    }

    .t7-resume .education-school    { font-size: 15px; font-weight: 700; color: #000000; }
    .t7-resume .education-subtitle  { font-size: 13px; color: #555555; margin-top: 2px; }
    .t7-resume .education-date      { font-size: 12px; color: #555555; white-space: nowrap; }
    .t7-resume .education-grade     { font-size: 12px; color: #555555; margin-top: 4px; font-weight: 500; display: inline-block; }

    .t7-resume .education-description {
      margin-top: 8px;
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
    }

    .t7-resume .project-item { margin-bottom: 16px; }

    .t7-resume .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

    .t7-resume .project-title  { font-size: 15px; font-weight: 700; color: #000000; }
    .t7-resume .project-links  { display: flex; gap: 12px; }
    .t7-resume .project-link   { color: #000000; text-decoration: underline; font-size: 12px; }
    .t7-resume .project-tech-stack { font-size: 12px; color: #555555; margin: 4px 0 6px; }

    .t7-resume .project-description {
      margin-top: 6px;
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
    }

    .t7-resume .skills-content { padding: 0 5px; }
    .t7-resume .skills-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .skills-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .skills-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }
    .t7-resume .skills-content p  { margin: 0 0 6px 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    .t7-resume .custom-section-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .custom-section-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .custom-section-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }

    .t7-resume .summary-text ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .summary-text ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .summary-text li { margin-bottom: 4px !important; line-height: 1.5 !important; }

    .t7-resume .experience-description ul,
    .t7-resume .experience-description ol,
    .t7-resume .education-description ul,
    .t7-resume .education-description ol,
    .t7-resume .project-description ul,
    .t7-resume .project-description ol {
      margin: 8px 0 8px 25px !important;
      padding-left: 0 !important;
    }

    .t7-resume .experience-description ul,
    .t7-resume .education-description ul,
    .t7-resume .project-description ul  { list-style-type: disc    !important; }

    .t7-resume .experience-description ol,
    .t7-resume .education-description ol,
    .t7-resume .project-description ol  { list-style-type: decimal !important; }

    .t7-resume .experience-description li,
    .t7-resume .education-description li,
    .t7-resume .project-description li  { margin-bottom: 4px !important; line-height: 1.5 !important; }

    .t7-resume .experience-description p,
    .t7-resume .education-description p,
    .t7-resume .project-description p,
    .t7-resume .summary-text p,
    .t7-resume .custom-section-content p,
    .t7-resume .skills-content p { white-space: pre-wrap !important; }

    .t7-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block;
      height: 0;
      margin: 0;
      padding: 0;
    }

    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; }
      .t7-resume .resume-header { margin-top: 0; padding-top: 0; }
      .t7-resume .project-link,
      .t7-resume .link-item { color: #000000 !important; text-decoration: underline !important; }
    }
  `,
    [],
  );

  const CSS = buildCSS(activeFontFamily);

  const href = (url: string) => (url.startsWith("http") ? url : `https://${url}`);
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  

  // ── HTML builder ─────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const header = `
        <div class="resume-header" data-block-id="t7-header">
          <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
          <div class="job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
          <div class="contact-row">
            ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
            ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
            ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
          </div>
          ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
          <div class="links">
            ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item" target="_blank">LinkedIn: ${formatSocialLink(linkedinUrl, "linkedin")}</a>` : ""}
            ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item" target="_blank">GitHub: ${formatSocialLink(githubUrl, "github")}</a>` : ""}
            ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">${formatSocialLink(portfolioUrl, "portfolio")}</a>` : ""}
          </div>
        </div>`;

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
          : "";

      // Matches box model to preview measurement (A4_W width, MARGIN padding)
      // plus @page margin, so per-page top/bottom spacing matches preview too.
      const pdfStyle = forPDF
        ? `<style>
            @page { size: A4; margin: ${MARGIN}px 0; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .t7-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
          </style>`
        : "";

      const sectionBuilders = {
        summary: () =>
          summary
            ? `
    <div class="section" data-block-id="t7-summary">
      <h2 class="section-title">Professional Summary</h2>
      <div class="summary-text">${rich(summary)}</div>
    </div>
  `
            : "",

        experience: () =>
          experiences.length > 0
            ? `
    <div class="section" data-block-id="t7-exp-section">
      <h2 class="section-title">Experience</h2>
      ${experiences
        .map((exp: any, i: number) => {
          const startFormatted = formatMonthYear(exp.startDate, false);
          const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
          return `<div class="experience-item" data-block-id="t7-exp-${i}">
          <div class="experience-header">
            <div>
              <div class="experience-title">${exp.jobTitle || ""}</div>
              <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
            </div>
            <div class="experience-date">${startFormatted} — ${endFormatted}</div>
          </div>
          ${exp.text ? `<div class="experience-description">${rich(exp.text)}</div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  `
            : "",

        projects: () =>
          projects.length > 0
            ? `
    <div class="section" data-block-id="t7-proj-section">
      <h2 class="section-title">Projects</h2>
      ${projects
        .map(
          (p: any, i: number) => `
        <div class="project-item" data-block-id="t7-proj-${i}">
          <div class="project-header">
            <div class="project-title">${p.title || ""}</div>
            ${p.liveUrl || p.githubUrl ? `
              <div class="project-links">
                ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
              </div>
            ` : ""}
          </div>
          ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
          ${p.description ? `<div class="project-description">${rich(p.description)}</div>` : ""}
        </div>
      `,
        )
        .join("")}
    </div>
  `
            : "",

        education: () =>
          educations.length > 0
            ? `
    <div class="section" data-block-id="t7-edu-section">
      <h2 class="section-title">Education</h2>
      ${educations
        .map((edu: any, i: number) => {
          const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
          return `<div class="education-item" data-block-id="t7-edu-${i}">
          <div class="education-header">
            <div>
              <div class="education-school">${edu.schoolname || ""}</div>
              <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
              ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
            </div>
            <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          ${edu.text ? `<div class="education-description">${rich(edu.text)}</div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  `
            : "",

        skills: () => {
          const skillsClean = rich(skills || "");
          if (!skillsClean || skillsClean === "<p><br></p>") return "";
          return `<div class="section" data-block-id="t7-skills-section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-content" data-block-id="t7-skills-content">${skillsClean}</div>
  </div>`;
        },

        custom: () => {
          if (!Array.isArray(finalize?.customSection)) return "";
          const filteredCustom = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
          if (filteredCustom.length === 0) return "";
          return filteredCustom
            .map(
              (s: any, i: number) => `
      <div class="section" data-block-id="t7-custom-${i}">
        <div class="custom-section">
          ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
          ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
        </div>
      </div>
    `,
            )
            .join("");
        },
      };

      const sectionsHTML = [
        sectionBuilders.summary?.(),
        sectionBuilders.experience?.(),
        sectionBuilders.projects?.(),
        sectionBuilders.education?.(),
        sectionBuilders.skills?.(),
        sectionBuilders.custom?.(),
      ]
        .filter(Boolean)
        .join("");

      let bodyContent = `${header}${sectionsHTML}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t7-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontPreloads}
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t7-resume">
    ${bodyContent}
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
      addressParts,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      CSS,
    ],
  );

  // ── Page splitter (TemplateOne's line-level engine, adapted for t7) ──────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t7-resume");
        if (!resumeEl) {
          resolve([fullHtml]);
          return;
        }
        const resumeSnapshot = resumeEl.outerHTML;

        const iframe = document.createElement("iframe");
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

        const measureDoc = iframe.contentDocument!;
        measureDoc.open();
        measureDoc.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<style>
  ${CSS}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t7-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t7-resume");
          if (!resume) {
            document.body.removeChild(iframe);
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

          // Header-like rows: whole, never split, never left stranded alone
          // at the bottom of a page. Note: unlike t3/t5, t7's subtitle/grade
          // lines are already nested INSIDE experience-header/education-header
          // in the markup, so consuming the header whole naturally carries
          // them along — no separate "chained" selector needed here.
          const HEADER_LIKE_SELECTOR = [
            ".experience-header",
            ".education-header",
            ".project-header",
            ".section-title",
            ".custom-section-title",
          ].join(", ");

          // Whole, never split, but fine sitting alone at page bottom.
          const ATOMIC_SELECTOR = [
            ".resume-header",
            ".project-tech-stack",
            ".links",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".experience-description",
            ".education-description",
            ".project-description",
            ".summary-text",
            ".skills-content",
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

          Array.from(resume.querySelectorAll<HTMLElement>("*")).forEach((el) => {
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
            if (el.matches(DESC_WRAPPER_SELECTOR) && !el.querySelector("p, li")) {
              if (pushLines(el)) consumed.add(el);
            }
          });

          // Fallback: h1 name (single leaf, no p/li wrapper).
          resume.querySelectorAll<HTMLElement>(".name, .job-title, .contact-row, .address").forEach((el) => {
            if (consumed.has(el)) return;
            pushAtomic(el, false);
            consumed.add(el);
          });

          units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

          const totalH = resume.scrollHeight;

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

          document.body.removeChild(iframe);
          (window as any).__resumePageBreakIds = pageBreakIds.filter(Boolean);

          const pageHtmls: string[] = [];
          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;
            pageHtmls.push(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<style>
  ${CSS}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t7-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
</style></head>
<body>
  <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
</body></html>`);
          }
          resolve(pageHtmls);
        };

        const win = iframe.contentWindow as any;
        if (win?.document?.fonts?.ready) {
          win.document.fonts.ready.then(() => requestAnimationFrame(doMeasure));
        } else {
          setTimeout(doMeasure, 150);
        }
      });
    },
    [CSS],
  );

  const splitRequestIdRef = useRef(0);

useEffect(() => {
  if (!htmlContent) return;
  const requestId = ++splitRequestIdRef.current;

  splitIntoPages(htmlContent).then((result) => {
    // Discard results from any call that isn't the most recently started —
    // this is what was letting a stale, shorter clipH win the race and
    // visually clip newly-typed lines until a later edit happened to
    // resolve last.
    if (splitRequestIdRef.current === requestId) {
      setPages(result);
    }
  });
}, [htmlContent, splitIntoPages]);
  // ── Debounced updates (300ms → 120ms) ────────────────────────────────────
  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 120);
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

  // ── PDF download ─────────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
      const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      const pdfHtml = generateHTML(true, pageBreakIds);

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
      // Was missing before — on success, isDownloading never reset and the
      // button stayed stuck on "Generating PDF…" until the page reloaded.
      setIsDownloading(false);
    }
  };

  const isThumbnail = !!alldata && !viewMode;

  return (
    <>
      {!isThumbnail && lastSegment === "download-resume" && (
        <div className="text-center my-8">
          <motion.button
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDownloading ? { scale: 0.98 } : {}}
            className={`
              relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
              text-white transition-all duration-300  shadow-lg
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
                  <span className="text-sm opacity-75 font-light ml-1">PDF</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
       )} 

      {isThumbnail ? (
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
              style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
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
        <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
          {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
            <div key={idx} style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
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
                <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
              </div>
              <div
                style={{
                  width: `${A4_W}px`,
                  height: `${A4_H}px`,
                  overflow: "hidden",
                  background: "white",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              >
                <iframe
                  title={`resume-page-${idx + 1}`}
                  srcDoc={pageHtml}
                  style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
                  scrolling="no"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TemplateSeven;