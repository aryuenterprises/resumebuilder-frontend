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

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;
// const INNER_PAD_X = 0;
// const INNER_PAD_TOP = 0;

// interface TemplateTwelveProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateTwelve: React.FC<TemplateTwelveProps> = ({
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
//       "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";

//     return `
//     @import url('${displayFontImport}');
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t12-resume {
//       width: ${A4_W}px;
//       padding: 0;
//       margin: 0;
//       background-color: #ffffff;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       color: #111111;
//       font-size: 14px;
//       line-height: 1.5;
//       box-sizing: border-box;
//     }

//     .t12-resume p, .t12-resume div, .t12-resume span, .t12-resume li, .t12-resume a {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     /* Rich text */
//     .t12-resume .entry-content ul,
//     .t12-resume .entry-content ol,
//     .t12-resume .skills-content ul,
//     .t12-resume .skills-content ol,
//     .t12-resume .edu-content ul,
//     .t12-resume .edu-content ol,
//     .t12-resume .custom-section-content ul,
//     .t12-resume .custom-section-content ol {
//       margin: 4px 0 4px 16px !important;
//       padding-left: 0 !important;
//     }

//     .t12-resume .entry-content li,
//     .t12-resume .skills-content li,
//     .t12-resume .edu-content li,
//     .t12-resume .custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.6 !important;
//     }

//     .t12-resume .entry-content ul,
//     .t12-resume .skills-content ul,
//     .t12-resume .edu-content ul,
//     .t12-resume .custom-section-content ul  { list-style-type: disc    !important; }

//     .t12-resume .entry-content ol,
//     .t12-resume .skills-content ol,
//     .t12-resume .edu-content ol,
//     .t12-resume .custom-section-content ol  { list-style-type: decimal !important; }

//     .t12-resume .entry-content strong,
//     .t12-resume .skills-content strong,
//     .t12-resume .edu-content strong,
//     .t12-resume .custom-section-content strong { font-weight: 600 !important; }

//     .t12-resume .entry-content em,
//     .t12-resume .skills-content em,
//     .t12-resume .edu-content em,
//     .t12-resume .custom-section-content em    { font-style: italic !important; }

//     .t12-resume .entry-content u,
//     .t12-resume .skills-content u,
//     .t12-resume .edu-content u,
//     .t12-resume .custom-section-content u     { text-decoration: underline !important; }

//     .t12-resume .entry-content p,
//     .t12-resume .skills-content p,
//     .t12-resume .edu-content p,
//     .t12-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//       margin: 0 0 4px 0 !important;
//     }

//     /* Header */
//     .t12-resume .header-block {
//       margin-bottom: 28px;
//     }

//     .t12-resume .header-name {
//       font-family: ${displayFont};
//       font-size: 44px;
//       font-weight: 700;
//       line-height: 1.05;
//       letter-spacing: -1px;
//       color: #000;
//       margin-bottom: 6px;
//     }

//     .t12-resume .header-jobtitle {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 12px;
//       font-weight: 600;
//       letter-spacing: 3.5px;
//       text-transform: uppercase;
//       color: #888;
//       margin-bottom: 18px;
//     }

//     .t12-resume .header-divider {
//       width: 100%;
//       height: 1px;
//       background: #111;
//       margin-bottom: 12px;
//     }

//     .t12-resume .header-meta-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 0;
//       font-size: 11.5px;
//       color: #555;
//       font-weight: 400;
//     }

//     .t12-resume .header-meta-item {
//       display: flex;
//       align-items: center;
//     }

//     .t12-resume .header-meta-item:not(:last-child)::after {
//       content: '·';
//       margin: 0 9px;
//       color: #bbb;
//     }

//     .t12-resume .header-meta-item a {
//       color: #111;
//       text-decoration: none;
//       border-bottom: 1px solid #bbb;
//     }

//     /* Section title */
//     .t12-resume .section-title {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 9.5px;
//       font-weight: 600;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: #999;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e5e5e5;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Section block */
//     .t12-resume .section-block {
//       margin-bottom: 22px;
//     }

//     /* Summary */
//     .t12-resume .summary-text {
//       font-size: 14px;
//       line-height: 1.85;
//       color: #222;
//       font-weight: 400;
//     }

//     /* Entry blocks (Experience, Education, Projects) */
//     .t12-resume .entry-block {
//       display: grid;
//       grid-template-columns: 110px 1fr;
//       gap: 0 20px;
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t12-resume .entry-block:last-child { margin-bottom: 0; }

//     .t12-resume .entry-left { padding-top: 2px; }

//     .t12-resume .entry-date {
//       font-size: 10.5px;
//       color: #999;
//       font-weight: 400;
//       line-height: 1.5;
//       white-space: pre-line;
//     }

//     .t12-resume .entry-right {
//       border-left: 1px solid #e5e5e5;
//       padding-left: 20px;
//     }

//     .t12-resume .entry-title {
//       font-family: ${displayFont};
//       font-size: 16px;
//       font-weight: 700;
//       color: #000;
//       line-height: 1.2;
//       margin-bottom: 2px;
//     }

//     .t12-resume .entry-subtitle {
//       font-size: 11.5px;
//       color: #777;
//       font-weight: 400;
//       margin-bottom: 7px;
//       letter-spacing: 0.2px;
//     }

//     .t12-resume .entry-content {
//       font-size: 12.5px;
//       line-height: 1.7;
//       color: #444;
//       font-weight: 300;
//     }

//     /* Education grade */
//     .t12-resume .education-grade {
//       font-size: 10.5px;
//       color: #888;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* Skills */
//     .t12-resume .skills-wrapper {
//       display: grid;
//       grid-template-columns: 110px 1fr;
//       gap: 0 20px;
//     }

//     .t12-resume .skills-right {
//       border-left: 1px solid #e5e5e5;
//       padding-left: 20px;
//     }

//     .t12-resume .skills-content {
//       font-size: 12.5px;
//       line-height: 1.7;
//       color: #444;
//       font-weight: 300;
//     }

//     /* Projects */
//     .t12-resume .project-header { margin-bottom: 4px; }

//     .t12-resume .project-links {
//       display: flex;
//       gap: 15px;
//       margin-top: 4px;
//     }

//     .t12-resume .project-link {
//       font-size: 10px;
//       color: #888;
//       text-decoration: underline;
//     }

//     .t12-resume .project-tech-stack {
//       font-size: 10.5px;
//       color: #777;
//       margin: 4px 0 6px;
//     }

//     /* Custom sections */
//     .t12-resume .custom-wrapper {
//       display: grid;
//       grid-template-columns: 110px 1fr;
//       gap: 0 20px;
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t12-resume .custom-wrapper:last-child { margin-bottom: 0; }

//     .t12-resume .custom-left { padding-top: 2px; }

//     .t12-resume .custom-section-name {
//       font-family: ${displayFont};
//       font-size: 16px;
//       font-weight: 700;
//       color: #000;
//       line-height: 1.2;
//     }

//     .t12-resume .custom-right {
//       border-left: 1px solid #e5e5e5;
//       padding-left: 20px;
//     }

//     .t12-resume .custom-section-content {
//       font-size: 12.5px;
//       line-height: 1.7;
//       color: #444;
//       font-weight: 300;
//     }

//     /* Page-break marker */
//     .t12-page-break {
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
//       .t12-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }
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
//         "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";

//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//           : "";

//       // Header
//       const header = `
//         <div class="header-block" data-block-id="t12-header">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">${
//             contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""
//           }</div>
//           <div class="header-divider"></div>
//           <div class="header-meta-row">
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
//       <div class="section-block" data-block-id="t12-summary">
//         <div class="section-title">Profile</div>
//         <div class="summary-text">${rich(summary)}</div>
//       </div>
//     `
//             : "",

//         experience: () =>
//           experiences.length > 0
//             ? `
//       <div class="section-block" data-block-id="t12-exp-section">
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any, i: number) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             return `
//             <div class="entry-block" data-block-id="t12-exp-${i}">
//               <div class="entry-left">
//                 <div class="entry-date">${start}\n–\n${end}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                 ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//               </div>
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
//       <div class="section-block" data-block-id="t12-proj-section">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any, i: number) => `
//           <div class="entry-block" data-block-id="t12-proj-${i}">
//             <div class="entry-left">
//               <div class="entry-date">${p.startDate ? formatMonthYear(p.startDate, true) : ""}${p.startDate && p.endDate ? "\n–\n" : ""}${p.endDate ? formatMonthYear(p.endDate, true) : ""}</div>
//             </div>
//             <div class="entry-right">
//               <div class="project-header">
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
//               ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
//               ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//             </div>
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
//       <div class="section-block" data-block-id="t12-edu-section">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any, i: number) => {
//             const formattedGrade = formatGradeToCgpdAndPercentage(
//               edu.grade || "",
//             );
//             const dateStr = [
//               edu.startDate || "",
//               edu.startDate ? "\n–\n" : "",
//               edu.endDate || "Present",
//             ].join("");
//             return `
//             <div class="entry-block" data-block-id="t12-edu-${i}">
//               <div class="entry-left">
//                 <div class="entry-date">${dateStr}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${
//                   edu.degree || edu.location || formattedGrade
//                     ? `
//                   <div class="entry-subtitle">
//                     ${edu.degree || ""}${edu.degree && edu.location ? ", " : ""}${edu.location || ""}
//                     ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//                 ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//               </div>
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
//               return `<div class="section-block" data-block-id="t12-skills-section">
//         <div class="section-title">Skills</div>
//         <div class="skills-wrapper">
//           <div class="skills-left"></div>
//           <div class="skills-right">
//             <div class="skills-content"><ul>${beforeLis}</ul></div>
//           </div>
//         </div>
//       </div>
//       <div class="t12-page-break"></div>
//       <div class="section-block" data-block-id="t12-skills-section-continued">
//         <div class="section-title">Skills (continued)</div>
//         <div class="skills-wrapper">
//           <div class="skills-left"></div>
//           <div class="skills-right">
//             <div class="skills-content"><ul>${afterLis}</ul></div>
//           </div>
//         </div>
//       </div>`;
//             }
//           }

//           return `<div class="section-block" data-block-id="t12-skills-section">
//     <div class="section-title">Skills</div>
//     <div class="skills-wrapper">
//       <div class="skills-left"></div>
//       <div class="skills-right">
//         <div class="skills-content" data-block-id="t12-skills-content">${skillsClean}</div>
//       </div>
//     </div>
//   </div>`;
//         },

//         custom: () => {
//           if (!Array.isArray(finalize?.customSection)) return "";
//           const hasCustom = finalize.customSection.some(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           );
//           if (!hasCustom) return "";
//           return `
//         <div class="section-block" data-block-id="t12-custom-section">
//           <div class="section-title">Additional</div>
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any, i: number) => `
//               <div class="custom-wrapper" data-block-id="t12-custom-${i}">
//                 <div class="custom-left">
//                   <div class="custom-section-name">${s.name || ""}</div>
//                 </div>
//                 <div class="custom-right">
//                   ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//                 </div>
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
//             .t12-resume {
//               width: 100% !important;
//               padding: 0 !important;
//               margin: 0 !important;
//             }
//           </style>`
//         : "";

//       let bodyContent = `${header}${sectionsHTML}`;

//       // For PDF: inject page breaks
//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t12-page-break";
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
//   <div class="t12-resume">
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
//         const resumeEl = parsed.querySelector<HTMLElement>(".t12-resume");
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
//       width: ${A4_W - MARGIN * 2}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t12-resume {
//       width: ${A4_W - MARGIN * 2}px !important;
//       padding: 0 !important;
//       padding-bottom: 0 !important;
//       margin: 0 !important;
//       box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t12-resume");
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

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           // AFTER
//           const ITEM_SELECTORS = [
//             ".entry-block",
//             ".custom-wrapper",
//             ".header-block",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
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
//               // AFTER
//               if (firstItem) {
//                 // Skip anchor logic for skills — allow it to split across pages
//                 if (firstItem.classList.contains("skills-wrapper")) return;

//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".entry-block, .custom-wrapper",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - titleTop > 8) {
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
//       position: absolute; top: ${MARGIN}px; left: ${MARGIN}px;
//       width: ${A4_W - MARGIN * 2}px; height: ${clipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0;
//       width: ${A4_W - MARGIN * 2}px;
//     }
//     .t12-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${INNER_PAD_X}px !important;
//       padding-right: ${INNER_PAD_X}px !important;
//       padding-top: ${INNER_PAD_TOP}px !important;
//       padding-bottom: 0 !important;
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
//     setIsDownloading(true);
//     try {
//       // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       // const pdfHtml = generateHTML(true, pageBreakIds);

//       // AFTER
//       const pageBreakIds: string[] = (
//         (window as any).__resumePageBreakIds || []
//       ).filter((id: string) => id !== "t12-skills-section");
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
//       setIsDownloading(true);
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

// export default TemplateTwelve;

















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

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;
const INNER_PAD_X = 0;
const INNER_PAD_TOP = 0;

interface TemplateTwelveProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateTwelve: React.FC<TemplateTwelveProps> = ({
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
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";

    return `
    @import url('${displayFontImport}');
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t12-resume {
      width: ${A4_W}px;
      padding: 0;
      margin: 0;
      background-color: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      color: #111111;
      font-size: 14px;
      line-height: 1.5;
      box-sizing: border-box;
    }

    .t12-resume p, .t12-resume div, .t12-resume span, .t12-resume li, .t12-resume a {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t12-resume .entry-content ul,
    .t12-resume .entry-content ol,
    .t12-resume .skills-content ul,
    .t12-resume .skills-content ol,
    .t12-resume .edu-content ul,
    .t12-resume .edu-content ol,
    .t12-resume .custom-section-content ul,
    .t12-resume .custom-section-content ol {
      margin: 4px 0 4px 16px !important;
      padding-left: 0 !important;
    }

    .t12-resume .entry-content li,
    .t12-resume .skills-content li,
    .t12-resume .edu-content li,
    .t12-resume .custom-section-content li {
      margin-bottom: 2px !important;
      line-height: 1.6 !important;
    }

    .t12-resume .entry-content ul,
    .t12-resume .skills-content ul,
    .t12-resume .edu-content ul,
    .t12-resume .custom-section-content ul  { list-style-type: disc    !important; }

    .t12-resume .entry-content ol,
    .t12-resume .skills-content ol,
    .t12-resume .edu-content ol,
    .t12-resume .custom-section-content ol  { list-style-type: decimal !important; }

    .t12-resume .entry-content strong,
    .t12-resume .skills-content strong,
    .t12-resume .edu-content strong,
    .t12-resume .custom-section-content strong { font-weight: 600 !important; }

    .t12-resume .entry-content em,
    .t12-resume .skills-content em,
    .t12-resume .edu-content em,
    .t12-resume .custom-section-content em    { font-style: italic !important; }

    .t12-resume .entry-content u,
    .t12-resume .skills-content u,
    .t12-resume .edu-content u,
    .t12-resume .custom-section-content u     { text-decoration: underline !important; }

    .t12-resume .entry-content p,
    .t12-resume .skills-content p,
    .t12-resume .edu-content p,
    .t12-resume .custom-section-content p {
      white-space: pre-wrap !important;
      margin: 0 0 4px 0 !important;
    }

    .t12-resume .header-block {
      margin-bottom: 28px;
    }

    .t12-resume .header-name {
      font-family: ${displayFont};
      font-size: 44px;
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -1px;
      color: #000;
      margin-bottom: 6px;
    }

    .t12-resume .header-jobtitle {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 18px;
    }

    .t12-resume .header-divider {
      width: 100%;
      height: 1px;
      background: #111;
      margin-bottom: 12px;
    }

    .t12-resume .header-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      font-size: 11.5px;
      color: #555;
      font-weight: 400;
    }

    .t12-resume .header-meta-item {
      display: flex;
      align-items: center;
    }

    .t12-resume .header-meta-item:not(:last-child)::after {
      content: '·';
      margin: 0 9px;
      color: #bbb;
    }

    .t12-resume .header-meta-item a {
      color: #111;
      text-decoration: none;
      border-bottom: 1px solid #bbb;
    }

    .t12-resume .section-title {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 9.5px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e5e5e5;
    }

    .t12-resume .section-block {
      margin-bottom: 22px;
    }

    .t12-resume .summary-text {
      font-size: 14px;
      line-height: 1.85;
      color: #222;
      font-weight: 400;
    }

    .t12-resume .entry-block {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 0 20px;
      margin-bottom: 16px;
    }

    .t12-resume .entry-block:last-child { margin-bottom: 0; }

    .t12-resume .entry-left { padding-top: 2px; }

    .t12-resume .entry-date {
      font-size: 10.5px;
      color: #999;
      font-weight: 400;
      line-height: 1.5;
      white-space: pre-line;
    }

    .t12-resume .entry-right {
      border-left: 1px solid #e5e5e5;
      padding-left: 20px;
    }

    .t12-resume .entry-title {
      font-family: ${displayFont};
      font-size: 16px;
      font-weight: 700;
      color: #000;
      line-height: 1.2;
      margin-bottom: 2px;
    }

    .t12-resume .entry-subtitle {
      font-size: 11.5px;
      color: #777;
      font-weight: 400;
      margin-bottom: 7px;
      letter-spacing: 0.2px;
    }

    .t12-resume .entry-content {
      font-size: 12.5px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    .t12-resume .education-grade {
      font-size: 10.5px;
      color: #888;
      margin-top: 2px;
      font-weight: 500;
    }

    .t12-resume .skills-wrapper {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 0 20px;
    }

    .t12-resume .skills-right {
      border-left: 1px solid #e5e5e5;
      padding-left: 20px;
    }

    .t12-resume .skills-content {
      font-size: 12.5px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    .t12-resume .project-header { margin-bottom: 4px; }

    .t12-resume .project-links {
      display: flex;
      gap: 15px;
      margin-top: 4px;
    }

    .t12-resume .project-link {
      font-size: 10px;
      color: #888;
      text-decoration: underline;
    }

    .t12-resume .project-tech-stack {
      font-size: 10.5px;
      color: #777;
      margin: 4px 0 6px;
    }

    .t12-resume .custom-wrapper {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 0 20px;
      margin-bottom: 16px;
    }

    .t12-resume .custom-wrapper:last-child { margin-bottom: 0; }

    .t12-resume .custom-left { padding-top: 2px; }

    .t12-resume .custom-section-name {
      font-family: ${displayFont};
      font-size: 16px;
      font-weight: 700;
      color: #000;
      line-height: 1.2;
    }

    .t12-resume .custom-right {
      border-left: 1px solid #e5e5e5;
      padding-left: 20px;
    }

    .t12-resume .custom-section-content {
      font-size: 12.5px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    .t12-page-break {
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
      .t12-resume {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
      }
    }
  `;
  }, []);

  const CSS = buildCSS(activeFontFamily);

  const href = (url: string) => (url.startsWith("http") ? url : `https://${url}`);
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── HTML builder ─────────────────────────────────────────────────────────
  // skillsCutIndex removed — line-level packer splits skills naturally.
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");
      const displayFontImport =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
          : "";

      const header = `
        <div class="header-block" data-block-id="t12-header">
          <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="header-jobtitle">${
            contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""
          }</div>
          <div class="header-divider"></div>
          <div class="header-meta-row">
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
      <div class="section-block" data-block-id="t12-summary">
        <div class="section-title">Profile</div>
        <div class="summary-text">${rich(summary)}</div>
      </div>
    `
            : "",

        experience: () =>
          experiences.length > 0
            ? `
      <div class="section-block" data-block-id="t12-exp-section">
        <div class="section-title">Experience</div>
        ${experiences
          .map((exp: any, i: number) => {
            const start = formatMonthYear(exp.startDate, false);
            const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
            return `
            <div class="entry-block" data-block-id="t12-exp-${i}">
              <div class="entry-left">
                <div class="entry-date">${start}\n–\n${end}</div>
              </div>
              <div class="entry-right">
                <div class="entry-title">${exp.jobTitle || ""}</div>
                <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
                ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
              </div>
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
      <div class="section-block" data-block-id="t12-proj-section">
        <div class="section-title">Projects</div>
        ${projects
          .map(
            (p: any, i: number) => `
          <div class="entry-block" data-block-id="t12-proj-${i}">
            <div class="entry-left">
              <div class="entry-date">${p.startDate ? formatMonthYear(p.startDate, true) : ""}${p.startDate && p.endDate ? "\n–\n" : ""}${p.endDate ? formatMonthYear(p.endDate, true) : ""}</div>
            </div>
            <div class="entry-right">
              <div class="project-header">
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
              ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
              ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
            </div>
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
      <div class="section-block" data-block-id="t12-edu-section">
        <div class="section-title">Education</div>
        ${educations
          .map((edu: any, i: number) => {
            const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
            const dateStr = [
              edu.startDate || "",
              edu.startDate ? "\n–\n" : "",
              edu.endDate || "Present",
            ].join("");
            return `
            <div class="entry-block" data-block-id="t12-edu-${i}">
              <div class="entry-left">
                <div class="entry-date">${dateStr}</div>
              </div>
              <div class="entry-right">
                <div class="entry-title">${edu.schoolname || ""}</div>
                ${
                  edu.degree || edu.location || formattedGrade
                    ? `
                  <div class="entry-subtitle">
                    ${edu.degree || ""}${edu.degree && edu.location ? ", " : ""}${edu.location || ""}
                    ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
                  </div>
                `
                    : ""
                }
                ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
              </div>
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
          return `<div class="section-block" data-block-id="t12-skills-section">
    <div class="section-title">Skills</div>
    <div class="skills-wrapper">
      <div class="skills-left"></div>
      <div class="skills-right">
        <div class="skills-content" data-block-id="t12-skills-content">${skillsClean}</div>
      </div>
    </div>
  </div>`;
        },

        custom: () => {
          if (!Array.isArray(finalize?.customSection)) return "";
          const hasCustom = finalize.customSection.some(
            (s: any) => s?.name?.trim() || s?.description?.trim(),
          );
          if (!hasCustom) return "";
          return `
        <div class="section-block" data-block-id="t12-custom-section">
          <div class="section-title">Additional</div>
          ${finalize.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any, i: number) => `
              <div class="custom-wrapper" data-block-id="t12-custom-${i}">
                <div class="custom-left">
                  <div class="custom-section-name">${s.name || ""}</div>
                </div>
                <div class="custom-right">
                  ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
                </div>
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

      // This template's box model was already correct — .t12-resume carries
      // no padding of its own; the @page { margin: 15mm } rule in the base
      // CSS supplies the page margin for print, and the same MARGIN value
      // drives the preview's page-content-clip inset. No double-margin bug
      // to fix here, unlike TemplateOne.
      const pdfStyle = forPDF
        ? `<style>
            .t12-resume {
              width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
          </style>`
        : "";

      let bodyContent = `${header}${sectionsHTML}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t12-page-break";
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
  <div class="t12-resume">
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

  // ── Page splitter (TemplateOne's line-level engine, adapted for t12's
  // two-column grid rows) ───────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t12-resume");
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
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W - MARGIN * 2}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t12-resume { width: ${A4_W - MARGIN * 2}px !important; padding: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t12-resume");
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

          // Header-like: entry-title (plain experience/education entries)
          // or project-header (which wraps entry-title + links for
          // projects) — whole, never split, never stranded alone at the
          // bottom of a page. section-title too, matching every other
          // template's treatment.
          const HEADER_LIKE_SELECTOR = [
            ".project-header",
            ".entry-title",
            ".section-title",
          ].join(", ");

          // Sits right after a header row but as a sibling, not nested —
          // keep chained so it moves with the header/title above it.
          const CHAINED_KEEP_SELECTOR = [
            ".entry-subtitle",
            ".project-tech-stack",
            ".custom-section-name",
          ].join(", ");

          // Whole, never split, fine sitting alone at page bottom.
          const ATOMIC_SELECTOR = [".header-block", ".project-links"].join(", ");

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

            // Skip the narrow date column entirely — its content (a short
            // date range) never needs its own break decision; it just
            // rides along with whatever page its row's content lands on.
            if (el.matches(".entry-left, .entry-date")) {
              consumed.add(el);
              return;
            }

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
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: ${MARGIN}px; width: ${A4_W - MARGIN * 2}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W - MARGIN * 2}px; }
  .t12-resume { width: ${A4_W}px !important; padding-left: ${INNER_PAD_X}px !important; padding-right: ${INNER_PAD_X}px !important; padding-top: ${INNER_PAD_TOP}px !important; padding-bottom: 0 !important; margin: 0 !important; }
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
      // Was `setIsDownloading(true)` before — every successful AND failed
      // download left the button permanently stuck on "Generating PDF…".
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

export default TemplateTwelve;