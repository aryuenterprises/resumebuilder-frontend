// "use client";
// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { Finalize, ResumeProps } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateFourProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateFour: React.FC<TemplateFourProps> = ({
//   alldata,
//   customization,
//   viewMode=false
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

//   // ── Data ──────────────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context.contact || {};
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

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     customSection:
//       isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//         ? finalize.customSection
//         : [],
//   };

//   // ── Complete Font import map ────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Inter', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//       "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
//       "'Poppins', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Lato', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//       "'Raleway', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
//       "'Montserrat', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
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
//     return map[fontFamily] || map["'Nunito', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder with dynamic font ─────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t4-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 14px;
//       line-height: 1.5;
//       text-align: left;
//     }

//     .t4-resume * {
//       box-sizing: border-box;
//     }

//     .t4-resume p,
//     .t4-resume div,
//     .t4-resume span,
//     .t4-resume h2,
//     .t4-resume h3,
//     .t4-resume i,
//     .t4-resume a,
//     .t4-resume li {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//     }

//     .t4-resume p {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t4-resume ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Rich text content styles */
//     .t4-resume .entry-content ul,
//     .t4-resume .entry-content ol,
//     .t4-resume .extra-content ul,
//     .t4-resume .extra-content ol,
//     .t4-resume .skills-content ul,
//     .t4-resume .skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t4-resume .entry-content li,
//     .t4-resume .extra-content li,
//     .t4-resume .skills-content li {
//       margin-bottom: 4px !important;
//     }

//     .t4-resume .entry-content strong,
//     .t4-resume .extra-content strong,
//     .t4-resume .skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t4-resume .entry-content em,
//     .t4-resume .extra-content em,
//     .t4-resume .skills-content em {
//       font-style: italic !important;
//     }

//     .t4-resume .entry-content u,
//     .t4-resume .extra-content u,
//     .t4-resume .skills-content u {
//       text-decoration: underline !important;
//     }

//     .t4-resume .entry-content p,
//     .t4-resume .extra-content p,
//     .t4-resume .skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Header */
//     .t4-resume .header-block {
//       text-align: center;
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .header-name {
//       font-size: 27px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 0.02em;
//       color: #111827;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .t4-resume .header-jobtitle {
//       font-size: 12px;
//       font-weight: 400;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       margin-bottom: 4px;
//     }

//     .t4-resume .header-links {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 4px;
//       flex-wrap: wrap;
//     }

//     .t4-resume .header-link {
//       font-size: 13px;
//       font-weight: 600;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//     }

//     .t4-resume .header-divider {
//       border: none;
//       border-top: 2px solid #000;
//       margin: 4px 0;
//     }

//     .t4-resume .header-contact-row {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 6px;
//       font-size: 13px;
//       color: #111827;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       flex-wrap: wrap;
//       padding: 3px 0;
//     }

//     /* Section title */
//     .t4-resume .section-title {
//       font-size: 17px;
//       font-weight: 700;
//       color: #111827;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.4;
//       margin-bottom: 4px;
//       margin-top: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Skills content */
//     .t4-resume .skills-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//     }

//     /* Experience header */
//     .t4-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .experience-title {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t4-resume .experience-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     .t4-resume .experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* Education header */
//     .t4-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .education-school {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t4-resume .education-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     .t4-resume .education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* Entry */
//     .t4-resume .entry-block {
//       margin-bottom: 12px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Education grade */
//     .t4-resume .education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* Projects */
//     .t4-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t4-resume .project-link {
//       font-size: 12px;
//       color: #4b5563;
//       text-decoration: underline;
//     }

//     .t4-resume .project-tech-stack {
//       font-size: 12px;
//       color: #6b7280;
//     }

//     /* Extra content */
//     .t4-resume .extra-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .extra-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t4-resume .extra-content div {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Custom Section Wrapper */
//     .t4-resume .custom-section-wrapper {
//       margin-top: 0;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .custom-section-wrapper .section-title {
//       margin-top: 10px;
//     }

//     /* Page break marker */
//     .t4-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     /* Print */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//     }
//   `,
//     [],
//   );

//   const CSS = buildCSS(activeFontFamily);

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) =>
//     url.startsWith("http") ? url : `https://${url}`;

//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── HTML generation with section ordering ─────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false): string => {
//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const formattedDobHtml = formatDateOfBirth(
//         dateOfBirth ? dateOfBirth : "",
//       );

//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
//          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//          <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//           : "";

//       const pdfOverrideStyle = forPDF
//         ? `<style>.t4-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `
//     <div class="t4-section-content" data-block-id="summary">
//       <div class="section-title">Summary</div>
//       <div class="extra-content">${rich(summary)}</div>
//     </div>
//   `
//             : "",

//         experience: () =>
//           experiences?.length > 0
//             ? `
//     <div class="t4-section-content" data-block-id="exp-section">
//       <div class="section-title">Experience</div>
//       ${experiences
//         .map((exp, i: number) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `<div class="entry-block" data-block-id="exp-${i}">
//           <div class="experience-header">
//             <div class="experience-title">${exp.jobTitle || ""}</div>
//             <div class="experience-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//           ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//         </div>`;
//         })
//         .join("")}
//     </div>
//   `
//             : "",

//         projects: () =>
//           projects?.length > 0
//             ? `
//     <div class="t4-section-content" data-block-id="proj-section">
//       <div class="section-title">Projects</div>
//       ${projects
//         .map(
//           (project: any, i: number) => `
//         <div class="entry-block" data-block-id="proj-${i}">
//           <div class="project-header">
//             <div class="entry-heading">${project.title || ""}</div>
//             <div class="project-links">
//               ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//               ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//             </div>
//           </div>
//           ${project.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>` : ""}
//           ${project.description ? `<div class="entry-content">${rich(project.description)}</div>` : ""}
//         </div>
//       `,
//         )
//         .join("")}
//     </div>
//   `
//             : "",

//         education: () =>
//           educations?.length > 0
//             ? `
//     <div class="t4-section-content" data-block-id="edu-section">
//       <div class="section-title">Education</div>
//       ${educations
//         .map((edu, i: number) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `<div class="entry-block" data-block-id="edu-${i}">
//           <div class="education-header">
//             <div class="education-school">${edu.schoolname || ""}</div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//         </div>`;
//         })
//         .join("")}
//     </div>
//   `
//             : "",

//         skills: () => {
//           if (!skills || (typeof skills === "string" && !skills.trim()))
//             return "";
//           const cleanedSkills = rich(skills);
//           if (!cleanedSkills || cleanedSkills === "<p><br></p>") return "";
//           return `<div class="t4-section-content" data-block-id="skills-section">
//     <div class="section-title">Skills</div>
//     <div class="skills-content">${cleanedSkills}</div>
//   </div>`;
//         },
//         custom: () =>
//           fin.customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s, i: number) => `
//       <div class="custom-section-wrapper" data-block-id="custom-${i}">
//         ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//         ${s.description ? `<div class="extra-content">${rich(s.description)}</div>` : ""}
//       </div>
//     `,
//             )
//             .join(""),
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

//       let bodyContent = `
//       <!-- HEADER -->
//       <div class="header-block" data-block-id="header">
//         <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         ${contact?.jobTitle ? `<div class="header-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//         ${
//           linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//             ? `
//           <div class="header-links">
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         `
//             : ""
//         }
//       </div>

//       <hr class="header-divider"/>

//       <div class="header-contact-row">
//         ${addressStr ? `<span>${addressStr}</span>` : ""}
//         ${contact?.phone ? `<span>${addressStr ? " • " : ""}${contact.phone}</span>` : ""}
//         ${contact?.email ? `<span>${addressStr || contact?.phone ? " • " : ""}${contact.email}</span>` : ""}
//         ${formattedDobHtml ? `<span>${addressStr || contact?.phone || contact?.email ? " • " : ""}${formattedDobHtml}</span>` : ""}
//       </div>

//       <!-- SECTIONS (ordered by customization) -->
//       ${sectionsHTML}
//     `;

//       // For PDF: inject page breaks

//       return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t4-resume">
//   ${bodyContent}
// </div>
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
//       fin.customSection,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       CSS,
//     ],
//   );

//   // ── Page splitter ─────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t4-resume");
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
//     .t4-resume {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".t4-resume");
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
//           const resumeTop =
//             resume.getBoundingClientRect().top +
//             (measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop);

//           const getRelTop = (el: HTMLElement): number => {
//             const docScrollY =
//               measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
//             return el.getBoundingClientRect().top + docScrollY - resumeTop;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".entry-block",
//             ".custom-section-wrapper",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8)
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           resume
//             .querySelectorAll<HTMLElement>(".section-title")
//             .forEach((title) => {
//               const titleTop = getRelTop(title);
//               let firstItem: HTMLElement | null = null;
//               let sib = title.nextElementSibling as HTMLElement | null;
//               while (sib) {
//                 if (sib.getBoundingClientRect().height > 8) {
//                   firstItem = sib;
//                   break;
//                 }
//                 sib = sib.nextElementSibling as HTMLElement | null;
//               }
//               if (firstItem) {
//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".entry-block, .custom-section-wrapper",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 const combinedHeight = anchorBottom - titleTop;
//                 if (
//                   combinedHeight > 8 &&
//                   combinedHeight <= PAGE_CONTENT_H * 0.9
//                 ) {
//                   const sectionId = (title.parentElement as HTMLElement)
//                     ?.dataset?.blockId;
//                   blocks.push({
//                     top: titleTop,
//                     bottom: anchorBottom,
//                     id: sectionId,
//                   });
//                 }
//               }
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           const findBestCut = (
//             currentStart: number,
//             naiveCut: number,
//           ): { cut: number; id?: string } => {
//             let actualCut = naiveCut;
//             let cutId: string | undefined;
//             const pageHeight = naiveCut - currentStart;
//             const minFill = currentStart + pageHeight * 0.92;

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
//           const pageBreakIds: string[] = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;
//             const { cut, id } = findBestCut(currentStart, naiveCut);
//             pageStarts.push(cut);
//             if (id) pageBreakIds.push(id);
//           }

//           document.body.removeChild(iframe);
//           (window as any).__resumePageBreakIds = pageBreakIds;

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
//     .t4-resume {
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
//   const handleDownload = async () => {
//     setIsDownloading(true);

//     try {
//       // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       // const pdfHtml = generateHTML(true, pageBreakIds);

//       // AFTER
//       const pdfHtml = generateHTML(true);

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: pdfHtml },
//         { responseType: "blob" },
//       );

//       const url = window.URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

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

// export default TemplateFour;

// "use client";
// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { Finalize, ResumeProps } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateFourProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?: boolean;
// }

// const TemplateFour: React.FC<TemplateFourProps> = ({
//   alldata,
//   customization,
//   viewMode = false,
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

//   // ── Data ──────────────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context.contact || {};
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

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     customSection:
//       isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//         ? finalize.customSection
//         : [],
//   };

//   // ── Complete Font import map ────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Inter', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//       "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
//       "'Poppins', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Lato', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//       "'Raleway', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
//       "'Montserrat', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
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
//     return map[fontFamily] || map["'Nunito', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder with dynamic font ─────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t4-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 14px;
//       line-height: 1.5;
//       text-align: left;
//     }

//     .t4-resume * {
//       box-sizing: border-box;
//     }

//     .t4-resume p,
//     .t4-resume div,
//     .t4-resume span,
//     .t4-resume h2,
//     .t4-resume h3,
//     .t4-resume i,
//     .t4-resume a,
//     .t4-resume li {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//     }

//     .t4-resume p {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t4-resume ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Rich text content styles */
//     .t4-resume .entry-content ul,
//     .t4-resume .entry-content ol,
//     .t4-resume .extra-content ul,
//     .t4-resume .extra-content ol,
//     .t4-resume .skills-content ul,
//     .t4-resume .skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t4-resume .entry-content li,
//     .t4-resume .extra-content li,
//     .t4-resume .skills-content li {
//       margin-bottom: 4px !important;
//     }

//     .t4-resume .entry-content strong,
//     .t4-resume .extra-content strong,
//     .t4-resume .skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t4-resume .entry-content em,
//     .t4-resume .extra-content em,
//     .t4-resume .skills-content em {
//       font-style: italic !important;
//     }

//     .t4-resume .entry-content u,
//     .t4-resume .extra-content u,
//     .t4-resume .skills-content u {
//       text-decoration: underline !important;
//     }

//     .t4-resume .entry-content p,
//     .t4-resume .extra-content p,
//     .t4-resume .skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Header */
//     .t4-resume .header-block {
//       text-align: center;
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .header-name {
//       font-size: 27px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 0.02em;
//       color: #111827;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .t4-resume .header-jobtitle {
//       font-size: 12px;
//       font-weight: 400;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       margin-bottom: 4px;
//     }

//     .t4-resume .header-links {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 4px;
//       flex-wrap: wrap;
//     }

//     .t4-resume .header-link {
//       font-size: 13px;
//       font-weight: 600;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//     }

//     .t4-resume .header-divider {
//       border: none;
//       border-top: 2px solid #000;
//       margin: 4px 0;
//     }

//     .t4-resume .header-contact-row {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 6px;
//       font-size: 13px;
//       color: #111827;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       flex-wrap: wrap;
//       padding: 3px 0;
//     }

//     /* Section title */
//     .t4-resume .section-title {
//       font-size: 17px;
//       font-weight: 700;
//       color: #111827;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.4;
//       margin-bottom: 4px;
//       margin-top: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Skills content */
//     .t4-resume .skills-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//     }

//     /* Experience header */
//     .t4-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .experience-title {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t4-resume .experience-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     .t4-resume .experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* Education header */
//     .t4-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .education-school {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t4-resume .education-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     .t4-resume .education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* Entry */
//     .t4-resume .entry-block {
//       margin-bottom: 12px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Education grade */
//     .t4-resume .education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* Projects */
//     .t4-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t4-resume .project-link {
//       font-size: 12px;
//       color: #4b5563;
//       text-decoration: underline;
//     }

//     .t4-resume .project-tech-stack {
//       font-size: 12px;
//       color: #6b7280;
//     }

//     /* Extra content */
//     .t4-resume .extra-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       line-height: 1.5;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .extra-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t4-resume .extra-content div {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Custom Section Wrapper */
//     .t4-resume .custom-section-wrapper {
//       margin-top: 0;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .custom-section-wrapper .section-title {
//       margin-top: 10px;
//     }

//     /* Page break marker */
//     .t4-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     /* Print */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//     }
//   `,
//     [],
//   );

//   const CSS = buildCSS(activeFontFamily);

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) =>
//     url.startsWith("http") ? url : `https://${url}`;

//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── HTML generation with section ordering ─────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const formattedDobHtml = formatDateOfBirth(
//         dateOfBirth ? dateOfBirth : "",
//       );

//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
//          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//          <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//           : "";

//       const pdfOverrideStyle = forPDF
//         ? `<style>.t4-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `
//     <div class="t4-section-content" data-block-id="summary">
//       <div class="section-title">Summary</div>
//       <div class="extra-content">${rich(summary)}</div>
//     </div>
//   `
//             : "",

//         experience: () =>
//           experiences?.length > 0
//             ? `
//     <div class="t4-section-content" data-block-id="exp-section">
//       <div class="section-title">Experience</div>
//       ${experiences
//         .map((exp, i: number) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `<div class="entry-block" data-block-id="exp-${i}">
//           <div class="experience-header">
//             <div class="experience-title">${exp.jobTitle || ""}</div>
//             <div class="experience-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//           ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//         </div>`;
//         })
//         .join("")}
//     </div>
//   `
//             : "",

//         projects: () =>
//           projects?.length > 0
//             ? `
//     <div class="t4-section-content" data-block-id="proj-section">
//       <div class="section-title">Projects</div>
//       ${projects
//         .map(
//           (project: any, i: number) => `
//         <div class="entry-block" data-block-id="proj-${i}">
//           <div class="project-header">
//             <div class="entry-heading">${project.title || ""}</div>
//             <div class="project-links">
//               ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//               ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//             </div>
//           </div>
//           ${project.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>` : ""}
//           ${project.description ? `<div class="entry-content">${rich(project.description)}</div>` : ""}
//         </div>
//       `,
//         )
//         .join("")}
//     </div>
//   `
//             : "",

//         education: () =>
//           educations?.length > 0
//             ? `
//     <div class="t4-section-content" data-block-id="edu-section">
//       <div class="section-title">Education</div>
//       ${educations
//         .map((edu, i: number) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `<div class="entry-block" data-block-id="edu-${i}">
//           <div class="education-header">
//             <div class="education-school">${edu.schoolname || ""}</div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//         </div>`;
//         })
//         .join("")}
//     </div>
//   `
//             : "",

//         skills: () => {
//           if (!skills || (typeof skills === "string" && !skills.trim()))
//             return "";
//           const cleanedSkills = rich(skills);
//           if (!cleanedSkills || cleanedSkills === "<p><br></p>") return "";
//           return `<div class="t4-section-content" data-block-id="skills-section">
//     <div class="section-title">Skills</div>
//     <div class="skills-content">${cleanedSkills}</div>
//   </div>`;
//         },
//         custom: () =>
//           fin.customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s, i: number) => `
//       <div class="custom-section-wrapper" data-block-id="custom-${i}">
//         ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//         ${s.description ? `<div class="extra-content">${rich(s.description)}</div>` : ""}
//       </div>
//     `,
//             )
//             .join(""),
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

//       let bodyContent = `
//       <!-- HEADER -->
//       <div class="header-block" data-block-id="header">
//         <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         ${contact?.jobTitle ? `<div class="header-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//         ${
//           linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//             ? `
//           <div class="header-links">
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         `
//             : ""
//         }
//       </div>

//       <hr class="header-divider"/>

//       <div class="header-contact-row">
//         ${addressStr ? `<span>${addressStr}</span>` : ""}
//         ${contact?.phone ? `<span>${addressStr ? " • " : ""}${contact.phone}</span>` : ""}
//         ${contact?.email ? `<span>${addressStr || contact?.phone ? " • " : ""}${contact.email}</span>` : ""}
//         ${formattedDobHtml ? `<span>${addressStr || contact?.phone || contact?.email ? " • " : ""}${formattedDobHtml}</span>` : ""}
//       </div>

//       <!-- SECTIONS (ordered by customization) -->
//       ${sectionsHTML}
//     `;

//       // For PDF: inject page breaks at the same block boundaries the
//       // on-screen splitter chose, so print output matches the preview.
//       if (forPDF && pageBreakIds.length > 0) {
//         // "Flat" sections (Summary, Skills) are a single continuous run of
//         // text with only one data-block-id for the whole section — there's
//         // no finer id inside them to break on. Forcing a break before that
//         // one id would yank the entire section onto the next page instead
//         // of letting it fill the remaining space, so those ids are skipped
//         // here and left to the browser's native print pagination (which
//         // flows text freely, while .entry-block/.custom-section-wrapper
//         // keep page-break-inside: avoid so individual entries still never
//         // get split mid-item).
//         const NON_SPLITTABLE_ID = /^(exp|edu|proj|custom)-\d+$/;
//         const hardBreakIds = pageBreakIds.filter((id) =>
//           NON_SPLITTABLE_ID.test(id),
//         );

//         if (hardBreakIds.length > 0) {
//           const tempDiv = document.createElement("div");
//           tempDiv.innerHTML = bodyContent;
//           hardBreakIds.forEach((id) => {
//             const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//             if (el) {
//               const breakDiv = document.createElement("div");
//               breakDiv.className = "t4-page-break";
//               el.parentNode?.insertBefore(breakDiv, el);
//             }
//           });
//           bodyContent = tempDiv.innerHTML;
//         }
//       }

//       return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t4-resume">
//   ${bodyContent}
// </div>
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
//       fin.customSection,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       CSS,
//     ],
//   );

//   // ── Page splitter (Template One's line-precision unit packer) ─────────────
//   // Instead of measuring whole blocks and guessing a "good enough" cut point,
//   // this breaks the resume down into the smallest atomic pieces — a single
//   // wrapped text line (via Range.getClientRects(), so it matches the
//   // browser's real line boxes) or a non-text leaf that must never be split
//   // (a header row, a tech-stack line, etc). Pages are then packed greedily,
//   // and a "keepWithNext" flag lets a header/subtitle/grade line jump to the
//   // next page together with the content that follows it, instead of being
//   // stranded alone at the bottom of a page. This is both more accurate
//   // (breaks always land on a real line edge, never mid-word) and faster
//   // (one DOM pass + one measurement, no iterative "does this fit" retries).
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t4-resume");
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
// <html><head><meta charset="UTF-8"/>
// <style>
//   ${CSS}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
//   .t4-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
// </style></head>
// <body>${resumeSnapshot}</body></html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t4-resume");
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

//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY =
//             measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
//           const getRelTop = (el: Element) =>
//             el.getBoundingClientRect().top - resumeRect.top + scrollY;
//           const getRelBottom = (el: Element) =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           // ── Build atomic "units" in document order ─────────────────────
//           interface Unit {
//             top: number;
//             bottom: number;
//             blockId?: string;
//             keepWithNext?: boolean;
//           }
//           const units: Unit[] = [];
//           const consumed = new Set<Element>();

//           const nearestBlockId = (el: Element): string | undefined => {
//             let cur: Element | null = el;
//             while (cur && cur !== resume) {
//               const id = (cur as HTMLElement).dataset?.blockId;
//               if (id) return id;
//               cur = cur.parentElement;
//             }
//             return undefined;
//           };

//           // Header rows: must stay in one piece AND must never be left
//           // stranded alone at the bottom of a page (keep-with-next).
//           const HEADER_LIKE_SELECTOR = [
//             ".experience-header",
//             ".project-header",
//             ".education-header",
//             ".section-title",
//           ].join(", ");

//           // Atomic pieces that must stay whole but are fine sitting alone
//           // at the bottom of a page.
//           const ATOMIC_SELECTOR = [
//             ".project-tech-stack",
//             ".header-links",
//             ".header-contact-row",
//           ].join(", ");

//           // Rich-text wrappers — their inner p/li lines get measured
//           // individually so breaks land on real line boxes.
//           const DESC_WRAPPER_SELECTOR = [
//             ".entry-content",
//             ".skills-content",
//             ".extra-content",
//           ].join(", ");

//           const pushLines = (el: HTMLElement, keepWithNext = false) => {
//             const range = measureDoc.createRange();
//             range.selectNodeContents(el);
//             const rects = Array.from(range.getClientRects()).filter(
//               (r) => r.height > 2 && r.width > 0,
//             );
//             if (rects.length === 0) return false;
//             const blockId = nearestBlockId(el);
//             rects
//               .sort((a, b) => a.top - b.top)
//               .forEach((r, idx) => {
//                 units.push({
//                   top: r.top - resumeRect.top + scrollY,
//                   bottom: r.bottom - resumeRect.top + scrollY,
//                   blockId,
//                   keepWithNext: idx === 0 ? keepWithNext : false,
//                 });
//               });
//             return true;
//           };

//           const pushAtomic = (el: HTMLElement, keepWithNext = false) => {
//             const h = el.getBoundingClientRect().height;
//             if (h <= 2) return;
//             units.push({
//               top: getRelTop(el),
//               bottom: getRelBottom(el),
//               blockId: nearestBlockId(el),
//               keepWithNext,
//             });
//           };

//           Array.from(resume.querySelectorAll<HTMLElement>("*")).forEach(
//             (el) => {
//               if (consumed.has(el)) return;

//               if (el.matches(HEADER_LIKE_SELECTOR)) {
//                 pushAtomic(el, true);
//                 el.querySelectorAll("*").forEach((c) => consumed.add(c));
//                 consumed.add(el);
//                 return;
//               }
//               if (el.matches(ATOMIC_SELECTOR)) {
//                 pushAtomic(el, false);
//                 el.querySelectorAll("*").forEach((c) => consumed.add(c));
//                 consumed.add(el);
//                 return;
//               }
//               if (el.matches("p, li")) {
//                 if (pushLines(el)) {
//                   el.querySelectorAll("*").forEach((c) => consumed.add(c));
//                   consumed.add(el);
//                 }
//                 return;
//               }
//               // Flat description wrapper with no inner p/li (plain text
//               // pasted without Quill formatting) — split it directly.
//               if (
//                 el.matches(DESC_WRAPPER_SELECTOR) &&
//                 !el.querySelector("p, li")
//               ) {
//                 if (pushLines(el)) consumed.add(el);
//               }
//             },
//           );

//           // Remaining single-line leaves not covered above: name, job
//           // title, and the subtitle/grade lines that sit right after a
//           // header row. Those get keepWithNext so they chain back and
//           // pull their header along instead of splitting off from it.
//           resume
//             .querySelectorAll<HTMLElement>(
//               ".header-name, .header-jobtitle, .experience-subtitle, .education-subtitle, .education-grade",
//             )
//             .forEach((el) => {
//               if (consumed.has(el)) return;
//               const keep =
//                 el.classList.contains("experience-subtitle") ||
//                 el.classList.contains("education-subtitle") ||
//                 el.classList.contains("education-grade");
//               pushAtomic(el, keep);
//               consumed.add(el);
//             });

//           units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

//           const totalH = resume.scrollHeight;

//           // ── Greedily pack units into pages, honoring keep-with-next ────
//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           let pageStart = 0;

//           for (let i = 0; i < units.length; i++) {
//             const u = units[i];
//             if (u.bottom - pageStart <= PAGE_CONTENT_H) continue;

//             // This unit overflows the page. Walk backward over any
//             // immediately-preceding "keep with next" units (a heading, a
//             // subtitle) so they move to the new page together instead of
//             // being stranded alone at the bottom of the old one.
//             let breakAt = i;
//             while (
//               breakAt > 0 &&
//               units[breakAt - 1].keepWithNext &&
//               units[breakAt - 1].top >= pageStart
//             ) {
//               breakAt--;
//             }

//             const newTop = units[breakAt].top;
//             pageStart = newTop > pageStart ? newTop : u.top; // guard vs. infinite loop
//             pageStarts.push(pageStart);
//             pageBreakIds.push(units[breakAt].blockId || "");
//             if (pageStarts.length >= 20) break; // safety cap
//           }

//           document.body.removeChild(iframe);
//           (window as any).__resumePageBreakIds = pageBreakIds.filter(Boolean);

//           const pageHtmls: string[] = [];
//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;
//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en"><head><meta charset="UTF-8"/>
// <style>
//   ${CSS}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
//   .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
//   .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
//   .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
//   .t4-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
// </style></head>
// <body>
//   <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
// </body></html>`);
//           }
//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => requestAnimationFrame(doMeasure));
//         } else {
//           setTimeout(doMeasure, 150);
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
//     setIsDownloading(true);
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: pdfHtml },
//         { responseType: "blob" },
//       );

//       const url = window.URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const isThumbnail = !!alldata && !viewMode;
//   return (
//     <>
//       {/* Download button — hide in thumbnail mode */}
//       {/* {!isThumbnail && lastSegment === "download-resume" && ( */}
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

// export default TemplateFour;

"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatSocialLink,
} from "@/app/utils";
import { Finalize, ResumeProps } from "@/app/types/context.types";
import { usePathname } from "next/navigation";
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

interface TemplateFourProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateFour: React.FC<TemplateFourProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const measureIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
  const contact = alldata?.contact || context.contact || {};
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

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const fin = {
    customSection:
      isFinalizeData(finalize) && Array.isArray(finalize.customSection)
        ? finalize.customSection
        : [],
  };

  // ── Font import map ────────────────────────────────────────────────────────
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
    return map[fontFamily] || map["'Nunito', sans-serif"];
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

    .t4-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background-color: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
    }
    .t4-resume * { box-sizing: border-box; }
    .t4-resume p, .t4-resume div, .t4-resume span, .t4-resume h2,
    .t4-resume h3, .t4-resume i, .t4-resume a, .t4-resume li {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      line-height: 1.5;
    }
    .t4-resume p { margin: 0 !important; padding: 0 !important; }
    .t4-resume ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
    .t4-resume ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
    .t4-resume li {
      margin-top: 0 !important; margin-bottom: 1px !important;
      padding: 0 !important; line-height: 1.5 !important; font-size: 14px !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
    }

    .t4-resume .entry-content ul, .t4-resume .entry-content ol,
    .t4-resume .extra-content ul, .t4-resume .extra-content ol,
    .t4-resume .skills-content ul, .t4-resume .skills-content ol {
      margin: 8px 0 8px 20px !important; padding-left: 0 !important;
    }
    .t4-resume .entry-content li, .t4-resume .extra-content li,
    .t4-resume .skills-content li { margin-bottom: 4px !important; }
    .t4-resume .entry-content strong, .t4-resume .extra-content strong,
    .t4-resume .skills-content strong { font-weight: 700 !important; }
    .t4-resume .entry-content em, .t4-resume .extra-content em,
    .t4-resume .skills-content em { font-style: italic !important; }
    .t4-resume .entry-content u, .t4-resume .extra-content u,
    .t4-resume .skills-content u { text-decoration: underline !important; }
    .t4-resume .entry-content p, .t4-resume .extra-content p,
    .t4-resume .skills-content p { white-space: pre-wrap !important; }

    .t4-resume .header-block { text-align: center; margin-bottom: 6px; }
    .t4-resume .header-name {
      font-size: 27px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.02em; color: #111827; line-height: 1.2; margin-bottom: 3px;
    }
    .t4-resume .header-jobtitle { font-size: 12px; font-weight: 400; color: #374151; line-height: 1.5; margin-bottom: 4px; }
    .t4-resume .header-links { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 4px; flex-wrap: wrap; }
    .t4-resume .header-link { font-size: 13px; font-weight: 600; color: #000; text-decoration: underline; text-underline-offset: 2px; line-height: 1.5; }
    .t4-resume .header-divider { border: none; border-top: 2px solid #000; margin: 4px 0; }
    .t4-resume .header-contact-row { display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 13px; color: #111827; line-height: 1.5; flex-wrap: wrap; padding: 3px 0; }

    .t4-resume .section-title {
      font-size: 17px; font-weight: 700; color: #111827; line-height: 1.4;
      margin-bottom: 4px; margin-top: 10px;
      page-break-after: avoid; break-after: avoid;
    }

    .t4-resume .skills-content { font-size: 14px; color: #374151; line-height: 1.5; padding-bottom: 4px; word-wrap: break-word; overflow-wrap: break-word; }
    .t4-resume .skills-content p { margin: 0 0 6px 0 !important; padding: 0 !important; }

    .t4-resume .experience-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
      page-break-after: avoid; break-after: avoid;
    }
    .t4-resume .experience-title { font-size: 15px; font-weight: 600; color: #111827; }
    .t4-resume .experience-date { font-size: 13px; color: #4b5563; }
    .t4-resume .experience-subtitle { font-size: 14px; color: #6b7280; font-weight: 500; }

    .t4-resume .education-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
      page-break-after: avoid; break-after: avoid;
    }
    .t4-resume .education-school { font-size: 15px; font-weight: 600; color: #111827; }
    .t4-resume .education-date { font-size: 13px; color: #4b5563; }
    .t4-resume .education-subtitle { font-size: 14px; color: #6b7280; font-weight: 500; }

    .t4-resume .entry-block { margin-bottom: 12px; }
    .t4-resume .entry-content { font-size: 14px; color: #374151; line-height: 1.5; padding-bottom: 4px; word-wrap: break-word; overflow-wrap: break-word; }
    .t4-resume .education-grade { font-size: 13px; color: #6b7280; font-weight: 500; }

    .t4-resume .project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
      page-break-after: avoid; break-after: avoid;
    }
    .t4-resume .project-links { display: flex; gap: 12px; }
    .t4-resume .project-link { font-size: 12px; color: #4b5563; text-decoration: underline; }
    .t4-resume .project-tech-stack { font-size: 12px; color: #6b7280; }

    .t4-resume .extra-content { font-size: 14px; color: #374151; line-height: 1.5; padding: 4px 0; word-wrap: break-word; overflow-wrap: break-word; }
    .t4-resume .extra-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
    .t4-resume .extra-content div { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    .t4-resume .custom-section-wrapper { margin-top: 0; }
    .t4-resume .custom-section-wrapper .section-title { margin-top: 10px; }

    .t4-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
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

  // ── HTML generation ───────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);

      const addressStr = [
        contact?.address,
        contact?.city,
        contact?.postCode,
        contact?.country,
      ]
        .filter(Boolean)
        .join(", ");

      const formattedDobHtml = formatDateOfBirth(
        dateOfBirth ? dateOfBirth : "",
      );

      const pdfOverrideStyle = forPDF
        ? `<style>
            @page { size: A4; margin: ${MARGIN}px 0; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .t4-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
          </style>`
        : "";

      const sectionBuilders = {
        summary: () =>
          summary
            ? `
    <div class="t4-section-content" data-block-id="summary">
      <div class="section-title">Summary</div>
      <div class="extra-content">${rich(summary)}</div>
    </div>
  `
            : "",

        experience: () =>
          experiences?.length > 0
            ? `
    <div class="t4-section-content" data-block-id="exp-section">
      <div class="section-title">Experience</div>
      ${experiences
        .map((exp, i: number) => {
          const start = formatMonthYear(exp.startDate, false);
          const end = exp.endDate
            ? formatMonthYear(exp.endDate, false)
            : exp.startDate
              ? "Present"
              : "";
          return `<div class="entry-block" data-block-id="exp-${i}">
          <div class="experience-header">
            <div class="experience-title">${exp.jobTitle || ""}</div>
            <div class="experience-date">${start}${start && end ? " - " : ""}${end}</div>
          </div>
          <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
          ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  `
            : "",

        projects: () =>
          projects?.length > 0
            ? `
    <div class="t4-section-content" data-block-id="proj-section">
      <div class="section-title">Projects</div>
      ${projects
        .map(
          (project: any, i: number) => `
        <div class="entry-block" data-block-id="proj-${i}">
          <div class="project-header">
            <div class="entry-heading">${project.title || ""}</div>
            <div class="project-links">
              ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
              ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
            </div>
          </div>
          ${project.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>` : ""}
          ${project.description ? `<div class="entry-content">${rich(project.description)}</div>` : ""}
        </div>
      `,
        )
        .join("")}
    </div>
  `
            : "",

        education: () =>
          educations?.length > 0
            ? `
    <div class="t4-section-content" data-block-id="edu-section">
      <div class="section-title">Education</div>
      ${educations
        .map((edu, i: number) => {
          const formattedGrade = formatGradeToCgpdAndPercentage(
            edu.grade || "",
          );
          return `<div class="entry-block" data-block-id="edu-${i}">
          <div class="education-header">
            <div class="education-school">${edu.schoolname || ""}</div>
            <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
          ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
          ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  `
            : "",

        skills: () => {
          if (!skills || (typeof skills === "string" && !skills.trim()))
            return "";
          const cleanedSkills = rich(skills);
          if (!cleanedSkills || cleanedSkills === "<p><br></p>") return "";
          return `<div class="t4-section-content" data-block-id="skills-section">
    <div class="section-title">Skills</div>
    <div class="skills-content">${cleanedSkills}</div>
  </div>`;
        },
        custom: () =>
          fin.customSection
            .filter((s) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s, i: number) => `
      <div class="custom-section-wrapper" data-block-id="custom-${i}">
        ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
        ${s.description ? `<div class="extra-content">${rich(s.description)}</div>` : ""}
      </div>
    `,
            )
            .join(""),
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

      let bodyContent = `
      <div class="header-block" data-block-id="header">
        <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        ${contact?.jobTitle ? `<div class="header-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
        ${
          linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
            ? `
          <div class="header-links">
            ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn: ${formatSocialLink(linkedinUrl, "linkedin")}</a>` : ""}
            ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub: ${formatSocialLink(githubUrl, "github")}</a>` : ""}
            ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">${formatSocialLink(portfolioUrl, "portfolio")}</a>` : ""}
          </div>
        `
            : ""
        }
      </div>

      <hr class="header-divider"/>

      <div class="header-contact-row">
        ${addressStr ? `<span>${addressStr}</span>` : ""}
        ${contact?.phone ? `<span>${addressStr ? " • " : ""}${contact.phone}</span>` : ""}
        ${contact?.email ? `<span>${addressStr || contact?.phone ? " • " : ""}${contact.email}</span>` : ""}
        ${formattedDobHtml ? `<span>${addressStr || contact?.phone || contact?.email ? " • " : ""}${formattedDobHtml}</span>` : ""}
      </div>

      ${sectionsHTML}
    `;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t4-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${getFontLinkTag(activeFontFamily)}
  <style>${CSS}</style>
  ${pdfOverrideStyle}
</head>
<body style="margin:0;padding:0;background:white;">
<div class="t4-resume">
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
      fin.customSection,
      summary,
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
    .t4-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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

  // ── Page splitter (line-box unit engine, reused iframe, smart font wait) ───
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t4-resume");
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
  .t4-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t4-resume");
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

          // ── Build atomic "units" ──────────────────────────────────────
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
            ".experience-header",
            ".project-header",
            ".education-header",
            ".section-title",
          ].join(", ");

          const ATOMIC_SELECTOR = [
            ".project-tech-stack",
            ".header-links",
            ".header-contact-row",
            ".header-block",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".entry-content",
            ".skills-content",
            ".extra-content",
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

          // Remaining single-line leaves with keepWithNext for chained items
          resume
            .querySelectorAll<HTMLElement>(
              ".header-name, .header-jobtitle, .experience-subtitle, .education-subtitle, .education-grade",
            )
            .forEach((el) => {
              if (consumed.has(el)) return;
              const keep =
                el.classList.contains("experience-subtitle") ||
                el.classList.contains("education-subtitle") ||
                el.classList.contains("education-grade");
              pushAtomic(el, keep);
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
  .t4-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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

  // ── PDF download ─────────────────────────────────────────────────────────
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
        const pageBreakIds: string[] =
          (window as any).__resumePageBreakIds || [];
        pdfHtml = generateHTML(true, pageBreakIds);
      }

      const res: AxiosResponse<Blob> = await api.post(
        `${API_URL}/candidates/generate-pdf`,
        { html: pdfHtml },
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
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
                <span className="text-sm opacity-75 font-light ml-1">PDF</span>
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

export default TemplateFour;
