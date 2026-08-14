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
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;
// const CONTENT_W = A4_W - MARGIN * 2;

// interface TemplateFourteenProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateFourteen: React.FC<TemplateFourteenProps> = ({
//   alldata,
//   customization,
//   viewMode=false
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily =
//     customization?.fontFamily ?? "'Source Sans 3', sans-serif";

//   // ── Data sources ─────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   // ── Complete Font import map ────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Inter', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
//       "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
//       "'Poppins', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
//       "'Lato', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap",
//       "'Raleway', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap",
//       "'Montserrat', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
//       "'Open Sans', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
//       "'Roboto', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
//       "'Merriweather', serif":
//         "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
//       "'Playfair Display', serif":
//         "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
//       "'DM Serif Display', serif":
//         "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
//       "'Libre Baskerville', serif":
//         "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
//       "'EB Garamond', serif":
//         "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
//       "'Crimson Text', serif":
//         "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
//       "'Source Code Pro', monospace":
//         "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
//       "'JetBrains Mono', monospace":
//         "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
//     };
//     return map[fontFamily] || map["'Source Sans 3', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── Get display font (Playfair Display for headings) ─────────────────────────
//   const getDisplayFont = (): string => {
//     return "'Playfair Display', serif";
//   };

//   // ── CSS builder with dynamic font ─────────────────────────────────────────
//   const buildCSS = useCallback((fontFamily: string) => {
//     const displayFont = getDisplayFont();
//     const displayFontImport =
//       "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap";

//     return `
//     @import url('${displayFontImport}');
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: ${MARGIN}px; }
    
//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { margin: 0; padding: 0; background: white; }

//     .t14-resume {
//       width: ${A4_W}px;
//       background-color: #ffffff;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       color: #1a1a2e;
//       font-size: 14px;
//       line-height: 1.5;
//     }

//     .t14-resume p, .t14-resume div, .t14-resume span, .t14-resume li, .t14-resume a {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     .t14-resume p { margin: 0 0 4px 0 !important; padding: 0 !important; line-height: 1.6 !important; }
//     .t14-resume p:last-child { margin-bottom: 0 !important; }
// .t14-resume .resume-body > .section-block:last-child { margin-bottom: 0 !important; }


//     .t14-resume .entry-content ul,

//     .t14-resume .entry-content ol,
//     .t14-resume .skills-content ul,
//     .t14-resume .skills-content ol,
//     .t14-resume .custom-section-content ul,
//     .t14-resume .custom-section-content ol { margin: 4px 0 4px 20px !important; padding-left: 20px !important; }

//     .t14-resume .entry-content li,
//     .t14-resume .skills-content li,
//     .t14-resume .custom-section-content li { margin-bottom: 2px !important; line-height: 1.6 !important; }

//     .t14-resume .entry-content ul,
//     .t14-resume .skills-content ul,
//     .t14-resume .custom-section-content ul  { list-style-type: disc    !important; }
//     .t14-resume .entry-content ol,
//     .t14-resume .skills-content ol,
//     .t14-resume .custom-section-content ol  { list-style-type: decimal !important; }

//     .t14-resume .entry-content strong,
//     .t14-resume .skills-content strong,
//     .t14-resume .custom-section-content strong { font-weight: 600 !important; }
//     .t14-resume .entry-content em,
//     .t14-resume .skills-content em,
//     .t14-resume .custom-section-content em    { font-style: italic !important; }
//     .t14-resume .entry-content u,
//     .t14-resume .skills-content u,
//     .t14-resume .custom-section-content u     { text-decoration: underline !important; }
//     .t14-resume .entry-content p,
//     .t14-resume .skills-content p,
//     .t14-resume .custom-section-content p     { white-space: pre-wrap !important; }

//     .t14-resume .header-block {
//       background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
//       padding: 32px 36px 28px;
//       position: relative;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t14-resume .header-block::after {
//       content: '';
//       position: absolute;
//       bottom: 0; left: 0; right: 0;
//       height: 4px;
//       background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t14-resume .header-name {
//       font-family: ${displayFont};
//       font-size: 40px; font-weight: 700; line-height: 1.1;
//       color: #ffffff; letter-spacing: 0.5px; margin-bottom: 6px;
//     }
//     .t14-resume .header-jobtitle {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 12px; font-weight: 500; letter-spacing: 3px;
//       text-transform: uppercase; color: #c9a84c; margin-bottom: 20px;
//     }
//     .t14-resume .header-meta-grid { display: flex; flex-wrap: wrap; gap: 8px 24px; }
//     .t14-resume .header-meta-item {
//       display: flex; align-items: center; gap: 6px;
//       font-size: 12px; color: #b0bcd4; font-weight: 400;
//     }
//     .t14-resume .header-meta-item a { color: #c9a84c; text-decoration: none; }

//     .t14-resume .resume-body { padding: 28px 36px 36px; }

//     .t14-resume .section-block { margin-bottom: 26px; }
//     .t14-resume .section-header {
//       display: flex; align-items: center; margin-bottom: 16px; gap: 12px;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t14-resume .section-title {
//       font-family: ${displayFont};
//       font-size: 16px; font-weight: 600; color: #1a2a4a; white-space: nowrap;
//     }
//     .t14-resume .section-accent-bar {
//       height: 2px; flex: 1;
//       background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
//       -webkit-print-color-adjust: exact; print-color-adjust: exact;
//     }

//     .t14-resume .summary-text { font-size: 13.5px; line-height: 1.8; color: #333; font-weight: 400; }

//     .t14-resume .entry-block {
//       margin-bottom: 18px; padding-bottom: 18px;
//       border-bottom: 1px solid #eaedf5;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t14-resume .entry-block:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
//     .t14-resume .entry-top-row {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       gap: 10px; flex-wrap: wrap; margin-bottom: 2px;
//     }
//     .t14-resume .entry-title {
//       font-family: ${displayFont};
//       font-size: 16px; font-weight: 600; color: #1a2a4a; line-height: 1.3;
//     }
//     .t14-resume .entry-date {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 11px; font-weight: 600; letter-spacing: 1px;
//       text-transform: uppercase; color: #ffffff; background: #2e4a7a;
//       padding: 3px 10px; border-radius: 2px; white-space: nowrap;
//       -webkit-print-color-adjust: exact; print-color-adjust: exact;
//     }
//     .t14-resume .entry-subtitle { font-size: 12.5px; color: #4a6491; font-weight: 500; margin-bottom: 8px; }
//     .t14-resume .entry-content  { font-size: 13px; line-height: 1.7; color: #444; font-weight: 400; }

//     .t14-resume .education-grade { font-size: 11px; color: #6b7c93; margin-top: 4px; font-weight: 500; }

//     .t14-resume .skills-content { font-size: 13px; font-weight: 400; color: #444; line-height: 1.6; }

//     .t14-resume .project-header { margin-bottom: 4px; }
//     .t14-resume .project-links  { display: flex; gap: 15px; }
//     .t14-resume .project-link   { font-size: 10px; font-weight: 500; color: #2e4a7a; text-decoration: underline; }
//     .t14-resume .project-tech-stack { font-size: 11px; color: #4a6491; margin: 6px 0; }

//     .t14-resume .custom-section-content { font-size: 13px; line-height: 1.65; color: #444; font-weight: 400; }

//     .t14-page-break {
//       page-break-before: always !important; break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       html, body { overflow: visible; }
//       .t14-resume { width: 100% !important; box-shadow: none !important; }
//       .t14-resume .project-link,
//       .t14-resume .header-meta-item a { color: #c9a84c !important; text-decoration: none !important; }
//     }
//   `;
//   }, []);

//   const CSS = buildCSS(activeFontFamily);

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) =>
//     url.startsWith("http") ? url : `https://${url}`;
//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   const sectionHeaderHTML = (title: string) =>
//     `<div class="section-header">
//        <div class="section-title">${title}</div>
//        <div class="section-accent-bar"></div>
//      </div>`;

//   // ── Section builders ──────────────────────────────────────────────────────

//   // ── HTML builder with section ordering ───────────────────────────────────
//   // AFTER
//   const generateHTML = useCallback(
//     (
//       forPDF = false,
//       pageBreakIds: string[] = [],
//       skillsCutIndex = -1,
//     ): string => {
//       const formattedDob = formatDateOfBirth(dateOfBirth || "");
//       const displayFontImport =
//         "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap";

//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//           : "";

//       // Header
//       const header = `
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//           <div class="header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${href(linkedinUrl)}" target="_blank">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span class="header-meta-item"><a href="${href(githubUrl)}" target="_blank">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${href(portfolioUrl)}" target="_blank">Portfolio</a></span>` : ""}
//           </div>
//         </div>`;

//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `
//       <div class="section-block" data-block-id="t14-summary">
//         ${sectionHeaderHTML("Profile")}
//         <div class="summary-text">${rich(summary)}</div>
//       </div>
//     `
//             : "",

//         experience: () =>
//           experiences.length > 0
//             ? `
//       <div class="section-block" data-block-id="t14-exp-section">
//         ${sectionHeaderHTML("Experience")}
//         ${experiences
//           .map((exp: any, i: number) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             const loc = [exp.employer, exp.location]
//               .filter(Boolean)
//               .join(" • ");
//             return `
//             <div class="entry-block" data-block-id="t14-exp-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-date">${start} – ${end}</div>
//               </div>
//               <div class="entry-subtitle">${loc}</div>
//               ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//             </div>
//           `;
//           })
//           .join("")}
//       </div>
//     `
//             : "",

//         projects: () =>
//           projects.length > 0
//             ? `
//       <div class="section-block" data-block-id="t14-proj-section">
//         ${sectionHeaderHTML("Projects")}
//         ${projects
//           .map(
//             (p: any, i: number) => `
//           <div class="entry-block" data-block-id="t14-proj-${i}">
//             <div class="project-header">
//               <div class="entry-top-row">
//                 <div class="entry-title">${p.title || ""}</div>
//                 ${
//                   p.liveUrl || p.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                     ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
//             ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("")}
//       </div>
//     `
//             : "",

//         education: () =>
//           educations.length > 0
//             ? `
//       <div class="section-block" data-block-id="t14-edu-section">
//         ${sectionHeaderHTML("Education")}
//         ${educations
//           .map((edu: any, i: number) => {
//             const dateStr =
//               edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                 : "";
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             return `
//             <div class="entry-block" data-block-id="t14-edu-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//               </div>
//               ${
//                 edu.degree || edu.location || grade
//                   ? `
//                 <div class="entry-subtitle">
//                   ${edu.degree || ""}${edu.degree && edu.location ? " • " : ""}${edu.location || ""}
//                   ${grade ? `<div class="education-grade">${grade}</div>` : ""}
//                 </div>
//               `
//                   : ""
//               }
//               ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//             </div>
//           `;
//           })
//           .join("")}
//       </div>
//     `
//             : "",

//         skills: () => {
//           const skillsClean = rich(skills || "");
//           if (!skillsClean || skillsClean === "<p><br></p>") return "";

//           if (forPDF && skillsCutIndex >= 0) {
//             const tempDiv = document.createElement("div");
//             tempDiv.innerHTML = skillsClean;
//             const allLis = Array.from(tempDiv.querySelectorAll("li"));
//             if (skillsCutIndex < allLis.length) {
//               const beforeLis = allLis
//                 .slice(0, skillsCutIndex)
//                 .map((li) => `<li>${li.innerHTML}</li>`)
//                 .join("");
//               const afterLis = allLis
//                 .slice(skillsCutIndex)
//                 .map((li) => `<li>${li.innerHTML}</li>`)
//                 .join("");
//               return `<div class="section-block" data-block-id="t14-skills-section">
//         ${sectionHeaderHTML("Skills")}
//         <div class="skills-content"><ul>${beforeLis}</ul></div>
//       </div>
//       <div class="t14-page-break"></div>
//       <div class="section-block" data-block-id="t14-skills-section-continued">
//         ${sectionHeaderHTML("Skills (continued)")}
//         <div class="skills-content"><ul>${afterLis}</ul></div>
//       </div>`;
//             }
//           }

//           return `<div class="section-block" data-block-id="t14-skills-section">
//     ${sectionHeaderHTML("Skills")}
//     <div class="skills-content" data-block-id="t14-skills-content">${skillsClean}</div>
//   </div>`;
//         },

//         custom: () => {
//           if (!Array.isArray(finalize?.customSection)) return "";
//           const hasCustom = finalize.customSection.some(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           );
//           if (!hasCustom) return "";
//           return `
//         <div class="section-block" data-block-id="t14-custom-section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any, i: number) => `
//               <div class="entry-block" data-block-id="t14-custom-${i}">
//                 ${s.name ? `<div class="entry-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>
//             `,
//             )
//             .join("")}
//         </div>
//       `;
//         },
//       };

//       // Build sections in the order defined by customization
//       const sectionsHTML = [
//         sectionBuilders.summary?.(),
//         sectionBuilders.experience?.(),
//         sectionBuilders.projects?.(),
//         sectionBuilders.education?.(),
//         sectionBuilders.skills?.(),
//         sectionBuilders.custom?.(),
//       ]
//         .filter(Boolean)
//         .join("");

//       const pdfStyle = forPDF
//         ? `<style>
//       html, body { margin: 0 !important; padding: 0 !important; }
//       .t14-resume { width: ${CONTENT_W}px !important; margin: 0 !important; }
//       @page { size: A4; margin: ${MARGIN}px !important; }
//     </style>`
//         : "";

//       let bodyContent = sectionsHTML;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t14-page-break";
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
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="${displayFontImport}" rel="stylesheet"/>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t14-resume">
//     ${header}
//     <div class="resume-body">
//       ${bodyContent}
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
//       addressParts,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       CSS,
//     ],
//   );

//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t14-resume");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed",
//           "top:0",
//           "left:-9999px",
//           `width:${CONTENT_W}px`,
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
// <html><head><meta charset="UTF-8"/>
// <style>
//   ${CSS}
//   html, body { margin:0!important;padding:0!important;width:${CONTENT_W}px!important;height:auto!important;overflow:visible!important;background:white!important; }
//   .t14-resume { width:${CONTENT_W}px!important;margin:0!important; }
// </style></head>
// <body>${resumeSnapshot}</body></html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t14-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY =
//             measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement) =>
//             el.getBoundingClientRect().top - resumeRect.top + scrollY;
//           const getRelBottom = (el: HTMLElement) =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const headerEl = resume.querySelector<HTMLElement>(".header-block");
//           if (headerEl)
//             blocks.push({
//               top: getRelTop(headerEl),
//               bottom: getRelBottom(headerEl),
//             });

//           // AFTER
//           resume.querySelectorAll<HTMLElement>(".entry-block").forEach((el) => {
//             const top = getRelTop(el),
//               bottom = getRelBottom(el);
//             if (bottom - top > 8)
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           // AFTER
//           resume
//             .querySelectorAll<HTMLElement>(".section-block")
//             .forEach((section) => {
//               const sectionTop = getRelTop(section);
//               const firstItem = section.querySelector<HTMLElement>(
//                 ".entry-block, .skills-content",
//               );

//               // Skip atomic treatment for skills — allow it to split across pages
//               if (firstItem?.classList.contains("skills-content")) return;

//               if (firstItem) {
//                 const anchorBottom = getRelBottom(firstItem);
//                 if (anchorBottom - sectionTop > 8)
//                   blocks.push({
//                     top: sectionTop,
//                     bottom: anchorBottom,
//                     id: section.dataset.blockId,
//                   });
//               } else {
//                 const sectionBottom = getRelBottom(section);
//                 if (sectionBottom - sectionTop > 8)
//                   blocks.push({
//                     top: sectionTop,
//                     bottom: sectionBottom,
//                     id: section.dataset.blockId,
//                   });
//               }
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];

//           while (pageStarts.length < 20) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut,
//               cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (
//                 block.top >= currentStart &&
//                 block.bottom > naiveCut &&
//                 block.top < actualCut
//               ) {
//                 actualCut = block.top;
//                 cutBlockId = block.id;
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

//           const skillsLis = Array.from(
//             resume.querySelectorAll<HTMLElement>(".skills-content li"),
//           );
//           skillsLis.forEach((li) => {
//             const top = getRelTop(li);
//             const bottom = getRelBottom(li);
//             if (bottom - top > 2) blocks.push({ top, bottom });
//           });

//           blocks.sort((a, b) => a.top - b.top);
//           pageStarts.length = 1;
//           pageBreakIds.length = 0;

//           while (pageStarts.length < 20) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut,
//               cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (
//                 block.top >= currentStart &&
//                 block.bottom > naiveCut &&
//                 block.top < actualCut
//               ) {
//                 actualCut = block.top;
//                 cutBlockId = block.id;
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

//           (window as any).__resumeSkillsCutIndex = -1;
//           for (let p = 0; p < pageStarts.length - 1; p++) {
//             const cutY = pageStarts[p + 1];
//             for (let li = 0; li < skillsLis.length; li++) {
//               const liTop = getRelTop(skillsLis[li]);
//               const liBottom = getRelBottom(skillsLis[li]);
//               if (liTop < cutY && liBottom > cutY) {
//                 (window as any).__resumeSkillsCutIndex = li;
//                 break;
//               }
//               if (liTop >= cutY) {
//                 (window as any).__resumeSkillsCutIndex = li;
//                 break;
//               }
//             }
//             if ((window as any).__resumeSkillsCutIndex >= 0) break;
//           }

//           document.body.removeChild(iframe);
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en"><head><meta charset="UTF-8"/>
// <style>
//   ${CSS}
//   html,body{margin:0!important;padding:0!important;width:${A4_W}px!important;height:${A4_H}px!important;overflow:hidden!important;background:white!important;}
//   .page-margin-box{position:relative;width:${A4_W}px;height:${A4_H}px;background:white;overflow:hidden;}
//   .page-content-clip{position:absolute;top:${MARGIN}px;left:${MARGIN}px;width:${CONTENT_W}px;height:${clipH}px;overflow:hidden;}
//   .page-shift{position:absolute;top:${-contentOffsetY}px;left:0;width:${CONTENT_W}px;}
//   .t14-resume{width:${CONTENT_W}px!important;margin:0!important;}
// </style></head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">${resumeSnapshot}</div>
//     </div>
//   </div>
// </body></html>`);
//           }

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() =>
//             setTimeout(() => requestAnimationFrame(doMeasure), 100),
//           );
//         } else {
//           setTimeout(doMeasure, 500);
//         }
//       });
//     },
//     [CSS],
//   );

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

//   const handleDownload = async (): Promise<void> => {
//     setIsDownloading(true);
//     try {
//       // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       // const pdfHtml = generateHTML(true, pageBreakIds);

//       // AFTER
//       const pageBreakIds: string[] = (
//         (window as any).__resumePageBreakIds || []
//       ).filter((id: string) => id !== "t14-skills-section");
//       const skillsCutIndex: number =
//         (window as any).__resumeSkillsCutIndex ?? -1;
//       const pdfHtml = generateHTML(true, pageBreakIds, skillsCutIndex);

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
//     } finally {
//       setIsDownloading(false);
//     }
//   };

// //   return (
// //     <>
// //       {lastSegment === "download-resume" && (
// //         <div className="text-center my-8">
// //           <motion.button
// //             onClick={handleDownload}
// //             disabled={isDownloading}
// //             whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
// //             whileTap={!isDownloading ? { scale: 0.98 } : {}}
// //             className={`
// //                                                                       relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
// //                                                                       text-white transition-all duration-300 shadow-lg
// //                                                                       ${
// //                                                                         isDownloading
// //                                                                           ? "bg-gray-400 cursor-not-allowed opacity-80"
// //                                                                           : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
// //                                                                       }
// //                                                                     `}
// //           >
// //             {/* Animated background gradient for premium feel */}
// //             {!isDownloading && (
// //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
// //             )}

// //             <div className="relative flex items-center justify-center gap-3 text-lg">
// //               {isDownloading ? (
// //                 <>
// //                   <FaSpinner className="animate-spin text-xl" />
// //                   <span>Generating PDF ...</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
// //                   <span>Download Resume</span>
// //                   <span className="text-sm opacity-75 font-light ml-1">
// //                     PDF
// //                   </span>
// //                 </>
// //               )}
// //             </div>
// //           </motion.button>
// //         </div>
// //       )}

// //       {alldata ? (
// //         <div
// //           style={{
// //             width: `${A4_W}px`,
// //             height: `${A4_H}px`,
// //             transform: "scale(0.36)",
// //             transformOrigin: "top left",
// //             overflow: "hidden",
// //             pointerEvents: "none",
// //             flexShrink: 0,
// //           }}
// //         >
// //           {pages[0] ? (
// //             <iframe
// //               title="resume-thumb"
// //               srcDoc={pages[0]}
// //               style={{
// //                 width: `${A4_W}px`,
// //                 height: `${A4_H}px`,
// //                 border: "none",
// //                 display: "block",
// //                 pointerEvents: "none",
// //               }}
// //               sandbox="allow-same-origin"
// //             />
// //           ) : (
// //             <div
// //               style={{
// //                 width: `${A4_W}px`,
// //                 height: `${A4_H}px`,
// //                 background: "white",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 color: "#ccc",
// //                 fontSize: 14,
// //                 fontFamily: "sans-serif",
// //               }}
// //             >
// //               Loading…
// //             </div>
// //           )}
// //         </div>
// //       ) : (
// //         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
// //           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
// //             <div key={idx} style={{ marginBottom: "28px" }}>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   gap: "10px",
// //                   marginBottom: "10px",
// //                 }}
// //               >
// //                 <div
// //                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
// //                 />
// //                 <span
// //                   style={{
// //                     fontSize: "11px",
// //                     fontWeight: 600,
// //                     color: "#6b7280",
// //                     whiteSpace: "nowrap",
// //                     padding: "3px 12px",
// //                     background: "#f3f4f6",
// //                     borderRadius: "999px",
// //                     border: "1px solid #e5e7eb",
// //                     letterSpacing: "0.05em",
// //                     fontFamily: "system-ui, sans-serif",
// //                   }}
// //                 >
// //                   Page {idx + 1}
// //                   {pages.length > 1 ? ` of ${pages.length}` : ""}
// //                 </span>
// //                 <div
// //                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
// //                 />
// //               </div>
// //               <div
// //                 style={{
// //                   width: `${A4_W}px`,
// //                   height: `${A4_H}px`,
// //                   overflow: "hidden",
// //                   background: "white",
// //                   boxShadow:
// //                     "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
// //                   borderRadius: "2px",
// //                   flexShrink: 0,
// //                 }}
// //               >
// //                 <iframe
// //                   title={`resume-page-${idx + 1}`}
// //                   srcDoc={pageHtml}
// //                   style={{
// //                     width: `${A4_W}px`,
// //                     height: `${A4_H}px`,
// //                     border: "none",
// //                     display: "block",
// //                     pointerEvents: "none",
// //                   }}
// //                   scrolling="no"
// //                   sandbox="allow-same-origin allow-scripts"
// //                 />
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </>
// //   );
// // };


// const isThumbnail = !!alldata && !viewMode ; 
//   return (
//     <>
//       {/* Download button — hide in thumbnail mode */}
//       {!isThumbnail && lastSegment === 'download-resume' &&(
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
//       )}
 
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

// export default TemplateFourteen;























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
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;
const CONTENT_W = A4_W - MARGIN * 2;

interface TemplateFourteenProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateFourteen: React.FC<TemplateFourteenProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const splitRequestIdRef = useRef(0);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily =
    customization?.fontFamily ?? "'Source Sans 3', sans-serif";

  // ── Data sources ─────────────────────────────────────────────────────────
  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills?.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

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
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
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
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif":
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'Source Sans 3', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  const getDisplayFont = (): string => "'Playfair Display', serif";

  // ── CSS builder ───────────────────────────────────────────────────────────
  const buildCSS = useCallback((fontFamily: string) => {
    const displayFont = getDisplayFont();
    const displayFontImport =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap";

    return `
    @import url('${displayFontImport}');
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: ${MARGIN}px; }
    
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t14-resume {
      width: ${A4_W}px;
      background-color: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      color: #1a1a2e;
      font-size: 14px;
      line-height: 1.5;
    }

    .t14-resume p, .t14-resume div, .t14-resume span, .t14-resume li, .t14-resume a {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t14-resume p { margin: 0 0 4px 0 !important; padding: 0 !important; line-height: 1.6 !important; }
    .t14-resume p:last-child { margin-bottom: 0 !important; }
    .t14-resume .resume-body > .section-block:last-child { margin-bottom: 0 !important; }

    .t14-resume .entry-content ul,
    .t14-resume .entry-content ol,
    .t14-resume .skills-content ul,
    .t14-resume .skills-content ol,
    .t14-resume .custom-section-content ul,
    .t14-resume .custom-section-content ol { margin: 4px 0 4px 20px !important; padding-left: 20px !important; }

    .t14-resume .entry-content li,
    .t14-resume .skills-content li,
    .t14-resume .custom-section-content li { margin-bottom: 2px !important; line-height: 1.6 !important; }

    .t14-resume .entry-content ul,
    .t14-resume .skills-content ul,
    .t14-resume .custom-section-content ul  { list-style-type: disc    !important; }
    .t14-resume .entry-content ol,
    .t14-resume .skills-content ol,
    .t14-resume .custom-section-content ol  { list-style-type: decimal !important; }

    .t14-resume .entry-content strong,
    .t14-resume .skills-content strong,
    .t14-resume .custom-section-content strong { font-weight: 600 !important; }
    .t14-resume .entry-content em,
    .t14-resume .skills-content em,
    .t14-resume .custom-section-content em    { font-style: italic !important; }
    .t14-resume .entry-content u,
    .t14-resume .skills-content u,
    .t14-resume .custom-section-content u     { text-decoration: underline !important; }
    .t14-resume .entry-content p,
    .t14-resume .skills-content p,
    .t14-resume .custom-section-content p     { white-space: pre-wrap !important; }

    .t14-resume .header-block {
      background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
      padding: 32px 36px 28px;
      position: relative;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t14-resume .header-block::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t14-resume .header-name {
      font-family: ${displayFont};
      font-size: 40px; font-weight: 700; line-height: 1.1;
      color: #ffffff; letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .t14-resume .header-jobtitle {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 12px; font-weight: 500; letter-spacing: 3px;
      text-transform: uppercase; color: #c9a84c; margin-bottom: 20px;
    }
    .t14-resume .header-meta-grid { display: flex; flex-wrap: wrap; gap: 8px 24px; }
    .t14-resume .header-meta-item {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; color: #b0bcd4; font-weight: 400;
    }
    .t14-resume .header-meta-item a { color: #c9a84c; text-decoration: none; }

    .t14-resume .resume-body { padding: 28px 36px 36px; }

    .t14-resume .section-block { margin-bottom: 26px; }
    .t14-resume .section-header {
      display: flex; align-items: center; margin-bottom: 16px; gap: 12px;
    }
    .t14-resume .section-title {
      font-family: ${displayFont};
      font-size: 16px; font-weight: 600; color: #1a2a4a; white-space: nowrap;
    }
    .t14-resume .section-accent-bar {
      height: 2px; flex: 1;
      background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }

    .t14-resume .summary-text { font-size: 13.5px; line-height: 1.8; color: #333; font-weight: 400; }

    .t14-resume .entry-block {
      margin-bottom: 18px; padding-bottom: 18px;
      border-bottom: 1px solid #eaedf5;
    }
    .t14-resume .entry-block:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
    .t14-resume .entry-top-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 10px; flex-wrap: wrap; margin-bottom: 2px;
    }
    .t14-resume .entry-title {
      font-family: ${displayFont};
      font-size: 16px; font-weight: 600; color: #1a2a4a; line-height: 1.3;
    }
    .t14-resume .entry-date {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 11px; font-weight: 600; letter-spacing: 1px;
      text-transform: uppercase; color: #ffffff; background: #2e4a7a;
      padding: 3px 10px; border-radius: 2px; white-space: nowrap;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .t14-resume .entry-subtitle { font-size: 12.5px; color: #4a6491; font-weight: 500; margin-bottom: 8px; }
    .t14-resume .entry-content  { font-size: 13px; line-height: 1.7; color: #444; font-weight: 400; }

    .t14-resume .education-grade { font-size: 11px; color: #6b7c93; margin-top: 4px; font-weight: 500; }

    .t14-resume .skills-content { font-size: 13px; font-weight: 400; color: #444; line-height: 1.6; }

    .t14-resume .project-header { margin-bottom: 4px; }
    .t14-resume .project-links  { display: flex; gap: 15px; }
    .t14-resume .project-link   { font-size: 10px; font-weight: 500; color: #2e4a7a; text-decoration: underline; }
    .t14-resume .project-tech-stack { font-size: 11px; color: #4a6491; margin: 6px 0; }

    .t14-resume .custom-section-content { font-size: 13px; line-height: 1.65; color: #444; font-weight: 400; }

    .t14-page-break {
      page-break-before: always !important; break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { overflow: visible; }
      .t14-resume { width: 100% !important; box-shadow: none !important; }
      .t14-resume .project-link,
      .t14-resume .header-meta-item a { color: #c9a84c !important; text-decoration: none !important; }
    }
  `;
  }, []);

  const CSS = buildCSS(activeFontFamily);

  const href = (url: string) => (url.startsWith("http") ? url : `https://${url}`);
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  const sectionHeaderHTML = (title: string) =>
    `<div class="section-header">
       <div class="section-title">${title}</div>
       <div class="section-accent-bar"></div>
     </div>`;

  // ── HTML builder ─────────────────────────────────────────────────────────
  // skillsCutIndex removed — line-level packer splits skills naturally.
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");
      const displayFontImport =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap";

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
          : "";

      const header = `
        <div class="header-block" data-block-id="t14-header">
          <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="header-jobtitle">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
          <div class="header-meta-grid">
            ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
            ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
            ${linkedinUrl ? `<span class="header-meta-item"><a href="${href(linkedinUrl)}" target="_blank">LinkedIn</a></span>` : ""}
            ${githubUrl ? `<span class="header-meta-item"><a href="${href(githubUrl)}" target="_blank">GitHub</a></span>` : ""}
            ${portfolioUrl ? `<span class="header-meta-item"><a href="${href(portfolioUrl)}" target="_blank">Portfolio</a></span>` : ""}
          </div>
        </div>`;

      const sectionBuilders = {
        summary: () =>
          summary
            ? `
      <div class="section-block" data-block-id="t14-summary">
        ${sectionHeaderHTML("Profile")}
        <div class="summary-text">${rich(summary)}</div>
      </div>
    `
            : "",

        experience: () =>
          experiences.length > 0
            ? `
      <div class="section-block" data-block-id="t14-exp-section">
        ${sectionHeaderHTML("Experience")}
        ${experiences
          .map((exp: any, i: number) => {
            const start = formatMonthYear(exp.startDate, false);
            const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
            const loc = [exp.employer, exp.location].filter(Boolean).join(" • ");
            return `
            <div class="entry-block" data-block-id="t14-exp-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${exp.jobTitle || ""}</div>
                <div class="entry-date">${start} – ${end}</div>
              </div>
              <div class="entry-subtitle">${loc}</div>
              ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
            </div>
          `;
          })
          .join("")}
      </div>
    `
            : "",

        projects: () =>
          projects.length > 0
            ? `
      <div class="section-block" data-block-id="t14-proj-section">
        ${sectionHeaderHTML("Projects")}
        ${projects
          .map(
            (p: any, i: number) => `
          <div class="entry-block" data-block-id="t14-proj-${i}">
            <div class="project-header">
              <div class="entry-top-row">
                <div class="entry-title">${p.title || ""}</div>
                ${
                  p.liveUrl || p.githubUrl
                    ? `
                  <div class="project-links">
                    ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                    ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
                  </div>
                `
                    : ""
                }
              </div>
            </div>
            ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
            ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
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
      <div class="section-block" data-block-id="t14-edu-section">
        ${sectionHeaderHTML("Education")}
        ${educations
          .map((edu: any, i: number) => {
            const dateStr =
              edu.startDate || edu.endDate
                ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                : "";
            const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
            return `
            <div class="entry-block" data-block-id="t14-edu-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${edu.schoolname || ""}</div>
                ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
              </div>
              ${
                edu.degree || edu.location || grade
                  ? `
                <div class="entry-subtitle">
                  ${edu.degree || ""}${edu.degree && edu.location ? " • " : ""}${edu.location || ""}
                  ${grade ? `<div class="education-grade">${grade}</div>` : ""}
                </div>
              `
                  : ""
              }
              ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
            </div>
          `;
          })
          .join("")}
      </div>
    `
            : "",

        skills: () => {
          const skillsClean = rich(skills || "");
          if (!skillsClean || skillsClean === "<p><br></p>") return "";
          return `<div class="section-block" data-block-id="t14-skills-section">
    ${sectionHeaderHTML("Skills")}
    <div class="skills-content" data-block-id="t14-skills-content">${skillsClean}</div>
  </div>`;
        },

        custom: () => {
          if (!Array.isArray(finalize?.customSection)) return "";
          const hasCustom = finalize.customSection.some(
            (s: any) => s?.name?.trim() || s?.description?.trim(),
          );
          if (!hasCustom) return "";
          return `
        <div class="section-block" data-block-id="t14-custom-section">
          ${finalize.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any, i: number) => `
              <div class="entry-block" data-block-id="t14-custom-${i}">
                ${s.name ? `<div class="entry-title">${s.name}</div>` : ""}
                ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
              </div>
            `,
            )
            .join("")}
        </div>
      `;
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

      const pdfStyle = forPDF
        ? `<style>
      html, body { margin: 0 !important; padding: 0 !important; }
      .t14-resume { width: ${CONTENT_W}px !important; margin: 0 !important; }
      @page { size: A4; margin: ${MARGIN}px !important; }
    </style>`
        : "";

      let bodyContent = sectionsHTML;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t14-page-break";
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
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="${displayFontImport}" rel="stylesheet"/>
  ${fontPreloads}
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t14-resume">
    ${header}
    <div class="resume-body">
      ${bodyContent}
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
      addressParts,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      CSS,
    ],
  );

  // ── Page splitter (TemplateOne's line-level engine, adapted for t14-*) ───
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t14-resume");
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
          `width:${CONTENT_W}px`,
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
  html, body { margin: 0 !important; padding: 0 !important; width: ${CONTENT_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t14-resume { width: ${CONTENT_W}px !important; margin: 0 !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t14-resume");
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
          // at the bottom of a page.
          const HEADER_LIKE_SELECTOR = [
            ".entry-top-row",
            ".section-header",
          ].join(", ");

          // Sits right after a header row but outside it — keep chained.
          const CHAINED_KEEP_SELECTOR = [".entry-subtitle"].join(", ");

          // Whole, never split, but fine sitting alone at page bottom.
          const ATOMIC_SELECTOR = [
            ".header-block",
            ".project-tech-stack",
            ".education-grade",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".summary-text",
            ".entry-content",
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
            if (el.matches(CHAINED_KEEP_SELECTOR)) {
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
  html,body{margin:0!important;padding:0!important;width:${A4_W}px!important;height:${A4_H}px!important;overflow:hidden!important;background:white!important;}
  .page-margin-box{position:relative;width:${A4_W}px;height:${A4_H}px;background:white;overflow:hidden;}
  .page-content-clip{position:absolute;top:${MARGIN}px;left:${MARGIN}px;width:${CONTENT_W}px;height:${clipH}px;overflow:hidden;}
  .page-shift{position:absolute;top:${-contentOffsetY}px;left:0;width:${CONTENT_W}px;}
  .t14-resume{width:${CONTENT_W}px!important;margin:0!important;}
</style></head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">${resumeSnapshot}</div>
    </div>
  </div>
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

  // Guarded against out-of-order async resolution — only the most recently
  // started splitIntoPages call's result is ever applied.
  useEffect(() => {
    if (!htmlContent) return;
    const requestId = ++splitRequestIdRef.current;
    splitIntoPages(htmlContent).then((result) => {
      if (splitRequestIdRef.current === requestId) {
        setPages(result);
      }
    });
  }, [htmlContent, splitIntoPages]);

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
      setIsDownloading(false);
    }
  };

  const isThumbnail = !!alldata && !viewMode;
  return (
    <>
      {/* {!isThumbnail && lastSegment === "download-resume" && ( */}
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
      {/* )} */}

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

export default TemplateFourteen;