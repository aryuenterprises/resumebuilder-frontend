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
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";
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

// interface TemplateThreeProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateThree: React.FC<TemplateThreeProps> = ({
//   alldata,
//   customization,
//   viewMode=false
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";

//   // ── Data ──────────────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || ({} as Contact);
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
//   const summary = alldata?.summary || context?.summary || "";

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

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
//     return map[fontFamily] || map["'Inter', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder with dynamic font ───────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t3-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 13px;
//       line-height: 1.4;
//       color: #374151;
//     }

//     .t3-resume div, .t3-resume span, .t3-resume p, .t3-resume li,
//     .t3-resume a, .t3-resume strong, .t3-resume b, .t3-resume em {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     .t3-body {
//       padding: 0;
//     }

//     /* Header */
//     .t3-header {
//       display: flex;
//       justify-content: space-between;
//       background-color: #878787;
//       padding: 3px;
//       border-radius: 12px;
//       color: white;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-header-left {
//       width: 40%;
//       font-size: 22px;
//       font-weight: 500;
//       padding: 8px;
//       text-transform: uppercase;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-header-job {
//       font-size: 12px;
//       font-weight: 400;
//       text-transform: lowercase;
//       margin-top: 2px;
//     }

//     .t3-header-links {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       padding-bottom: 4px;
//       margin-top: 2px;
//       flex-wrap: wrap;
//     }

//     .t3-header-link {
//       font-size: 12px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: white;
//     }

//     .t3-header-right {
//       width: 60%;
//       padding: 8px;
//       font-size: 12px;
//     }

//     .t3-header-contact-line {
//       text-align: right;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       margin-bottom: 1px;
//     }

//     /* Section title */
//     .t3-section-title {
//       font-size: 18px;
//       font-weight: 600;
//       margin-top: 8px;
//       margin-bottom: 2px;
//       color: #111827;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t3-resume p {
//       margin: 0 0 0 0 !important;
//       padding: 0 !important;
//       line-height: 1.4 !important;
//     }

//     /* Summary */
//     .t3-summary {
//       padding-top: 3px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Rich Text Content Styles */
//     .t3-summary ul, .t3-summary ol, .t3-entry-content ul, .t3-entry-content ol,
//     .t3-project-description ul, .t3-project-description ol, .t3-extra ul, .t3-extra ol,
//     .t3-skills-content ul, .t3-skills-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t3-summary li, .t3-entry-content li, .t3-project-description li,
//     .t3-extra li, .t3-skills-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.4 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Skills */
//     .t3-skills-block {
//       margin-top: 4px;
//       margin-bottom: 4px;
//     }

//     .t3-skills-content {
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Entry */
//     .t3-entry {
//       margin-top: 4px;
//       padding-bottom: 3px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-experience-header, .t3-education-header, .t3-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-bottom: 2px;
//     }

//     .t3-experience-title, .t3-education-school, .t3-project-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-experience-date, .t3-education-date {
//       font-size: 12px;
//       color: #4b5563;
//     }

//     .t3-experience-subtitle, .t3-education-subtitle {
//       font-size: 13px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     .t3-entry-content, .t3-project-description {
//       padding-top: 3px;
//       padding-bottom: 3px;
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-project-links {
//       display: flex;
//       gap: 10px;
//     }

//     .t3-project-link {
//       font-size: 11px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t3-project-tech-stack {
//       font-size: 12px;
//       color: #6b7280;
//       margin: 2px 0;
//     }

//     .t3-education-grade {
//       font-size: 12px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* Custom section */
//     .t3-custom-section {
//       margin-top: 8px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-custom-section:first-of-type {
//       margin-top: 0;
//     }

//     .t3-custom-section-title {
//       font-size: 18px;
//       font-weight: 600;
//       margin-top: 6px;
//       margin-bottom: 2px;
//       color: #111827;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t3-custom-section-content {
//       padding-top: 3px;
//       padding-bottom: 3px;
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Page break marker */
//     .t3-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .t3-header {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
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

//   // ── Section builders ──────────────────────────────────────────────────────

//   // ── HTML builder with section ordering ───────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false): string => {
//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link rel="preconnect" href="https://fonts.googleapis.com">
//            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//            <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
//           : "";

//       // ── Section builders (inside generateHTML so forPDF & skillsCutIndex are in scope)
//       // AFTER (full real implementation inside generateHTML)
//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `<div class="t3-section-content" data-block-id="summary">
//            <div class="t3-section-title">Summary</div>
//            <div class="t3-summary">${rich(summary)}</div>
//          </div>`
//             : "",

//         experience: () =>
//           experiences.length
//             ? `<div class="t3-section-content" data-block-id="exp-section">
//            <div class="t3-section-title">Experience</div>
//            ${experiences
//              .map((exp, i: number) => {
//                const start = formatMonthYear(exp.startDate, false);
//                const end = exp.endDate
//                  ? formatMonthYear(exp.endDate, false)
//                  : exp.startDate
//                    ? "Present"
//                    : "";
//                return `<div class="t3-entry" data-block-id="exp-${i}">
//                <div class="t3-experience-header">
//                  <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//                  <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//                </div>
//                <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
//              </div>`;
//              })
//              .join("")}
//          </div>`
//             : "",

//         projects: () =>
//           projects.length
//             ? `<div class="t3-section-content" data-block-id="proj-section">
//            <div class="t3-section-title">Projects</div>
//            ${projects
//              .map(
//                (project: any, i: number) =>
//                  `<div class="t3-project-item" data-block-id="proj-${i}">
//                <div class="t3-project-header">
//                  <div class="t3-project-title">${project.title || ""}</div>
//                  <div class="t3-project-links">
//                    ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                    ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//                  </div>
//                </div>
//                ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//                ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
//              </div>`,
//              )
//              .join("")}
//          </div>`
//             : "",

//         education: () =>
//           educations.length
//             ? `<div class="t3-section-content" data-block-id="edu-section">
//            <div class="t3-section-title">Education</div>
//            ${educations
//              .map((edu, i: number) => {
//                const formattedGrade = formatGradeToCgpdAndPercentage(
//                  edu.grade || "",
//                );
//                return `<div class="t3-entry" data-block-id="edu-${i}">
//                <div class="t3-education-header">
//                  <div class="t3-education-school">${edu.schoolname || ""}</div>
//                  <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                </div>
//                <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//                ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
//              </div>`;
//              })
//              .join("")}
//          </div>`
//             : "",

//         skills: () => {
//           const cleanedSkills = rich(skills);
//           if (!skills || !cleanedSkills || cleanedSkills === "<p><br></p>")
//             return "";
//           return `<div class="t3-section-content" data-block-id="skills-section">
//     <div class="t3-section-title">Skills</div>
//     <div class="t3-skills-block">
//       <div class="t3-skills-content">${cleanedSkills}</div>
//     </div>
//   </div>`;
//         },

//         custom: () => {
//           if (!customSection.length) return "";
//           const filteredCustom = customSection.filter(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           );
//           if (!filteredCustom.length) return "";
//           return filteredCustom
//             .map(
//               (s, i: number) =>
//                 `<div class="t3-custom-section" data-block-id="custom-${i}">
//           ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
//         </div>`,
//             )
//             .join("");
//         },
//       };

//       const pdfOverrideStyle = forPDF
//         ? `<style>.t3-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

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
//         <!-- HEADER -->
//         <div class="t3-header" data-block-id="header">
//           <div class="t3-header-left">
//             ${contact?.firstName || ""} ${contact?.lastName || ""}
//             ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//             <div class="t3-header-links">
//               ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//               ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//               ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//             </div>
//           </div>
//           <div class="t3-header-right">
//             <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//             ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//             ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
//           </div>
//         </div>
//         <div class="t3-body">
//           ${sectionsHTML}
//         </div>
//       `;

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
// <div class="t3-resume">
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
//       customSection,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       addressParts,
//       formattedDob,
//       CSS,
//     ],
//   );

//   // ── Page splitter ─────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t3-resume");
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
//     .t3-resume {
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

//         // REPLACE everything inside doMeasure() from "const resume = measureDoc..." to "resolve(pageHtmls);"
//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t3-resume");
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
//             ".t3-entry",
//             ".t3-project-item",
//             ".t3-custom-section",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8)
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           resume
//             .querySelectorAll<HTMLElement>(
//               ".t3-section-title, .t3-custom-section-title",
//             )
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
//                   ".t3-entry, .t3-project-item, .t3-custom-section",
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
//             // const previewClipH = Math.max(clipH, Math.min(PAGE_CONTENT_H, totalH - contentOffsetY));
//             const previewClipH = clipH;

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
//       width: ${A4_W}px; height: ${previewClipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t3-resume {
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
//   // REPLACE handleDownload:
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

//   // ── RENDER ────────────────────────────────────────────────────────────────
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
// //                  relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
// //                  text-white transition-all duration-300 shadow-lg
// //                  ${
// //                    isDownloading
// //                      ? "bg-gray-400 cursor-not-allowed opacity-80"
// //                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
// //                  }
// //                `}
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
// export default TemplateThree;









// "use client";
// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { ResumeProps } from "@/app/types/context.types";
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

// interface TemplateThreeProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?: boolean;
// }

// const TemplateThree: React.FC<TemplateThreeProps> = ({
//   alldata,
//   customization,
//   viewMode = false,
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";

//   // ── Data ──────────────────────────────────────────────────────────────────
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

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   // ── Font import map ─────────────────────────────────────────────────────
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
//     return map[fontFamily] || map["'Inter', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };


//   // ── CSS builder ───────────────────────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }
//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { margin: 0; padding: 0; background: white; }

//     .t3-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 13px;
//       line-height: 1.4;
//       color: #374151;
//     }
//     .t3-resume div, .t3-resume span, .t3-resume p, .t3-resume li,
//     .t3-resume a, .t3-resume strong, .t3-resume b, .t3-resume em {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }
//     .t3-body { padding: 0; }

//     .t3-header {
//       display: flex; justify-content: space-between;
//       background-color: #878787; padding: 3px; border-radius: 12px; color: white;
//     }
//     .t3-header-left {
//       width: 40%; font-size: 22px; font-weight: 500; padding: 8px;
//       text-transform: uppercase; word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t3-header-job { font-size: 12px; font-weight: 400; text-transform: lowercase; margin-top: 2px; }
//     .t3-header-links {
//       display: flex; align-items: center; gap: 12px; padding-bottom: 4px;
//       margin-top: 2px; flex-wrap: wrap;
//     }
//     .t3-header-link { font-size: 12px; font-weight: 600; text-decoration: underline; color: white; }
//     .t3-header-right { width: 60%; padding: 8px; font-size: 12px; }
//     .t3-header-contact-line { text-align: right; word-wrap: break-word; overflow-wrap: break-word; margin-bottom: 1px; }

//     .t3-section-title {
//       font-size: 18px; font-weight: 600; margin-top: 8px; margin-bottom: 2px; color: #111827;
//     }
//     .t3-resume p { margin: 0 0 0 0 !important; padding: 0 !important; line-height: 1.4 !important; }

//     .t3-summary { padding-top: 3px; padding-bottom: 6px; color: #374151; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; }

//     .t3-summary ul, .t3-summary ol, .t3-entry-content ul, .t3-entry-content ol,
//     .t3-project-description ul, .t3-project-description ol, .t3-extra ul, .t3-extra ol,
//     .t3-skills-content ul, .t3-skills-content ol {
//       margin: 4px 0 4px 20px !important; padding-left: 0 !important;
//     }
//     .t3-summary li, .t3-entry-content li, .t3-project-description li,
//     .t3-extra li, .t3-skills-content li { margin-bottom: 2px !important; line-height: 1.4 !important; }

//     .t3-skills-block { margin-top: 4px; margin-bottom: 4px; }
//     .t3-skills-content { color: #374151; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; }

//     .t3-entry { margin-top: 4px; padding-bottom: 3px; }
//     .t3-experience-header, .t3-education-header, .t3-project-header {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 6px; margin-bottom: 2px;
//     }
//     .t3-experience-title, .t3-education-school, .t3-project-title { font-size: 14px; font-weight: 600; color: #111827; }
//     .t3-experience-date, .t3-education-date { font-size: 12px; color: #4b5563; }
//     .t3-experience-subtitle, .t3-education-subtitle { font-size: 13px; color: #6b7280; font-weight: 500; }
//     .t3-entry-content, .t3-project-description {
//       padding-top: 3px; padding-bottom: 3px; color: #374151; font-size: 13px;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t3-project-links { display: flex; gap: 10px; }
//     .t3-project-link { font-size: 11px; color: #6b7280; text-decoration: underline; }
//     .t3-project-tech-stack { font-size: 12px; color: #6b7280; margin: 2px 0; }
//     .t3-education-grade { font-size: 12px; color: #6b7280; margin-top: 2px; font-weight: 500; }

//     .t3-custom-section { margin-top: 8px; }
//     .t3-custom-section:first-of-type { margin-top: 0; }
//     .t3-custom-section-title { font-size: 18px; font-weight: 600; margin-top: 6px; margin-bottom: 2px; color: #111827; }
//     .t3-custom-section-content { padding-top: 3px; padding-bottom: 3px; color: #374151; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; }

//     .t3-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

//     @media print {
//       * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       .t3-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//     }
//   `,
//     [],
//   );

//   const CSS = buildCSS(activeFontFamily);

//   const href = (url: string) =>
//     url.startsWith("http") ? url : `https://${url}`;
//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link rel="preconnect" href="https://fonts.googleapis.com">
//            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//            <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
//           : "";

//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `<div class="t3-section-content" data-block-id="summary">
//            <div class="t3-section-title">Summary</div>
//            <div class="t3-summary">${rich(summary)}</div>
//          </div>`
//             : "",

//         experience: () =>
//           experiences.length
//             ? `<div class="t3-section-content" data-block-id="exp-section">
//            <div class="t3-section-title">Experience</div>
//            ${experiences
//              .map((exp, i: number) => {
//                const start = formatMonthYear(exp.startDate, false);
//                const end = exp.endDate
//                  ? formatMonthYear(exp.endDate, false)
//                  : exp.startDate
//                    ? "Present"
//                    : "";
//                return `<div class="t3-entry" data-block-id="exp-${i}">
//                <div class="t3-experience-header">
//                  <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//                  <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//                </div>
//                <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
//              </div>`;
//              })
//              .join("")}
//          </div>`
//             : "",

//         projects: () =>
//           projects.length
//             ? `<div class="t3-section-content" data-block-id="proj-section">
//            <div class="t3-section-title">Projects</div>
//            ${projects
//              .map(
//                (project: any, i: number) =>
//                  `<div class="t3-project-item" data-block-id="proj-${i}">
//                <div class="t3-project-header">
//                  <div class="t3-project-title">${project.title || ""}</div>
//                  <div class="t3-project-links">
//                    ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                    ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//                  </div>
//                </div>
//                ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//                ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
//              </div>`,
//              )
//              .join("")}
//          </div>`
//             : "",

//         education: () =>
//           educations.length
//             ? `<div class="t3-section-content" data-block-id="edu-section">
//            <div class="t3-section-title">Education</div>
//            ${educations
//              .map((edu, i: number) => {
//                const formattedGrade = formatGradeToCgpdAndPercentage(
//                  edu.grade || "",
//                );
//                return `<div class="t3-entry" data-block-id="edu-${i}">
//                <div class="t3-education-header">
//                  <div class="t3-education-school">${edu.schoolname || ""}</div>
//                  <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                </div>
//                <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//                ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
//              </div>`;
//              })
//              .join("")}
//          </div>`
//             : "",

//         skills: () => {
//           const cleanedSkills = rich(skills);
//           if (!skills || !cleanedSkills || cleanedSkills === "<p><br></p>")
//             return "";
//           return `<div class="t3-section-content" data-block-id="skills-section">
//     <div class="t3-section-title">Skills</div>
//     <div class="t3-skills-block">
//       <div class="t3-skills-content">${cleanedSkills}</div>
//     </div>
//   </div>`;
//         },

//         custom: () => {
//           if (!customSection.length) return "";
//           const filteredCustom = customSection.filter(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           );
//           if (!filteredCustom.length) return "";
//           return filteredCustom
//             .map(
//               (s, i: number) =>
//                 `<div class="t3-custom-section" data-block-id="custom-${i}">
//           ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
//         </div>`,
//             )
//             .join("");
//         },
//       };

//       // Matches box model to preview measurement (A4_W width, MARGIN padding)
//       // plus @page margin so per-page top/bottom spacing matches too — same
//       // fix that resolved TemplateOne's preview/PDF mismatch.
//       const pdfStyle = forPDF
//         ? `<style>
//             @page { size: A4; margin: ${MARGIN}px 0; }
//             html, body { margin: 0 !important; padding: 0 !important; }
//             .t3-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
//           </style>`
//         : "";

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
//         <div class="t3-header" data-block-id="header">
//           <div class="t3-header-left">
//             ${contact?.firstName || ""} ${contact?.lastName || ""}
//             ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//             <div class="t3-header-links">
//               ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//               ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//               ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//             </div>
//           </div>
//           <div class="t3-header-right">
//             <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//             ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//             ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
//           </div>
//         </div>
//         <div class="t3-body">
//           ${sectionsHTML}
//         </div>
//       `;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t3-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         bodyContent = tempDiv.innerHTML;
//       }

//       return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${fontPreloads}
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t3-resume">
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
//       customSection,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       addressParts,
//       formattedDob,
//       CSS,
//     ],
//   );

//   // ── Page splitter (TemplateOne's line-level engine, adapted for t3-*) ────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t3-resume");
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
//   .t3-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
// </style></head>
// <body>${resumeSnapshot}</body></html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t3-resume");
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

//           // Header-like rows: whole, never split, never left stranded alone
//           // at the bottom of a page (keep-with-next).
//           const HEADER_LIKE_SELECTOR = [
//             ".t3-experience-header",
//             ".t3-education-header",
//             ".t3-project-header",
//             ".t3-section-title",
//             ".t3-custom-section-title",
//           ].join(", ");

//           // Sit right after a header-like row but OUTSIDE it in the DOM
//           // (t3's subtitle/grade lines aren't nested inside the header div,
//           // unlike TemplateOne) — also keep-with-next so the chain of
//           // header -> subtitle -> grade -> first content line stays intact.
//           const CHAINED_KEEP_SELECTOR = [
//             ".t3-experience-subtitle",
//             ".t3-education-subtitle",
//             ".t3-education-grade",
//           ].join(", ");

//           // Whole, never split, but fine sitting alone at page bottom.
//           const ATOMIC_SELECTOR = [
//             ".t3-project-tech-stack",
//             ".t3-project-links",
//             ".t3-header",
//           ].join(", ");

//           const DESC_WRAPPER_SELECTOR = [
//             ".t3-summary",
//             ".t3-entry-content",
//             ".t3-project-description",
//             ".t3-custom-section-content",
//             ".t3-skills-content",
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
//               if (el.matches(CHAINED_KEEP_SELECTOR)) {
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
//               if (
//                 el.matches(DESC_WRAPPER_SELECTOR) &&
//                 !el.querySelector("p, li")
//               ) {
//                 if (pushLines(el)) consumed.add(el);
//               }
//             },
//           );

//           units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

//           const totalH = resume.scrollHeight;

//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           let pageStart = 0;

//           for (let i = 0; i < units.length; i++) {
//             const u = units[i];
//             if (u.bottom - pageStart <= PAGE_CONTENT_H) continue;

//             let breakAt = i;
//             while (
//               breakAt > 0 &&
//               units[breakAt - 1].keepWithNext &&
//               units[breakAt - 1].top >= pageStart
//             ) {
//               breakAt--;
//             }

//             const newTop = units[breakAt].top;
//             pageStart = newTop > pageStart ? newTop : u.top;
//             pageStarts.push(pageStart);
//             pageBreakIds.push(units[breakAt].blockId || "");
//             if (pageStarts.length >= 20) break;
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
//   .t3-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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

//   // ── Debounced updates (300ms → 120ms for snappier feedback) ─────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 120);
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

//   const isThumbnail = !!alldata && !viewMode;

//   return (
//     <>
//       {/* {!isThumbnail && lastSegment === "download-resume" && ( */}
//       <div className="text-center my-8">
//         <motion.button
//           onClick={handleDownload}
//           disabled={isDownloading}
//           whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//           whileTap={!isDownloading ? { scale: 0.98 } : {}}
//           className={`
//               relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//               text-white transition-all duration-300  shadow-lg
//               ${
//                 isDownloading
//                   ? "bg-gray-400 cursor-not-allowed opacity-80"
//                   : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
//               }
//             `}
//         >
//           {!isDownloading && (
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//           )}
//           <div className="relative flex items-center justify-center gap-3 text-lg">
//             {isDownloading ? (
//               <>
//                 <FaSpinner className="animate-spin text-xl" />
//                 <span>Generating PDF …</span>
//               </>
//             ) : (
//               <>
//                 <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
//                 <span>Download Resume</span>
//                 <span className="text-sm opacity-75 font-light ml-1">PDF</span>
//               </>
//             )}
//           </div>
//         </motion.button>
//       </div>
//       {/* )} */}

//       {isThumbnail ? (
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
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
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
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
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

// export default TemplateThree;
















"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
} from "@/app/utils";
import { ResumeProps } from "@/app/types/context.types";
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

interface TemplateThreeProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateThree: React.FC<TemplateThreeProps> = ({
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

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily =
    customization?.fontFamily ?? "'Inter', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
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

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  const customSection = Array.isArray(finalize?.customSection)
    ? finalize.customSection
    : [];

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

    .t3-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background-color: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.4;
      color: #374151;
    }
    .t3-resume div, .t3-resume span, .t3-resume p, .t3-resume li,
    .t3-resume a, .t3-resume strong, .t3-resume b, .t3-resume em {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }
    .t3-body { padding: 0; }

    .t3-header {
      display: flex; justify-content: space-between;
      background-color: #878787; padding: 3px; border-radius: 12px; color: white;
    }
    .t3-header-left {
      width: 40%; font-size: 22px; font-weight: 500; padding: 8px;
      text-transform: uppercase; word-wrap: break-word; overflow-wrap: break-word;
    }
    .t3-header-job { font-size: 12px; font-weight: 400; text-transform: lowercase; margin-top: 2px; }
    .t3-header-links {
      display: flex; align-items: center; gap: 12px; padding-bottom: 4px;
      margin-top: 2px; flex-wrap: wrap;
    }
    .t3-header-link { font-size: 12px; font-weight: 600; text-decoration: underline; color: white; }
    .t3-header-right { width: 60%; padding: 8px; font-size: 12px; }
    .t3-header-contact-line { text-align: right; word-wrap: break-word; overflow-wrap: break-word; margin-bottom: 1px; }

    .t3-section-title {
      font-size: 18px; font-weight: 600; margin-top: 8px; margin-bottom: 2px; color: #111827;
    }
    .t3-resume p { margin: 0 0 0 0 !important; padding: 0 !important; line-height: 1.4 !important; }

    .t3-summary { padding-top: 3px; padding-bottom: 6px; color: #374151; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; }

    .t3-summary ul, .t3-summary ol, .t3-entry-content ul, .t3-entry-content ol,
    .t3-project-description ul, .t3-project-description ol, .t3-extra ul, .t3-extra ol,
    .t3-skills-content ul, .t3-skills-content ol {
      margin: 4px 0 4px 20px !important; padding-left: 0 !important;
    }
    .t3-summary li, .t3-entry-content li, .t3-project-description li,
    .t3-extra li, .t3-skills-content li { margin-bottom: 2px !important; line-height: 1.4 !important; }

    .t3-skills-block { margin-top: 4px; margin-bottom: 4px; }
    .t3-skills-content { color: #374151; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; }

    .t3-entry { margin-top: 4px; padding-bottom: 3px; }
    .t3-experience-header, .t3-education-header, .t3-project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 6px; margin-bottom: 2px;
      page-break-after: avoid; break-after: avoid;
    }
    .t3-experience-title, .t3-education-school, .t3-project-title { font-size: 14px; font-weight: 600; color: #111827; }
    .t3-experience-date, .t3-education-date { font-size: 12px; color: #4b5563; }
    .t3-experience-subtitle, .t3-education-subtitle { font-size: 13px; color: #6b7280; font-weight: 500; }
    .t3-entry-content, .t3-project-description {
      padding-top: 3px; padding-bottom: 3px; color: #374151; font-size: 13px;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .t3-project-links { display: flex; gap: 10px; }
    .t3-project-link { font-size: 11px; color: #6b7280; text-decoration: underline; }
    .t3-project-tech-stack { font-size: 12px; color: #6b7280; margin: 2px 0; }
    .t3-education-grade { font-size: 12px; color: #6b7280; margin-top: 2px; font-weight: 500; }

    .t3-custom-section { margin-top: 8px; }
    .t3-custom-section:first-of-type { margin-top: 0; }
    .t3-custom-section-title { font-size: 18px; font-weight: 600; margin-top: 6px; margin-bottom: 2px; color: #111827; }
    .t3-custom-section-content { padding-top: 3px; padding-bottom: 3px; color: #374151; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; }

    .t3-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .t3-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `,
    [],
  );

  const href = (url: string) =>
    url.startsWith("http") ? url : `https://${url}`;
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── HTML builder ─────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);

      const sectionBuilders = {
        summary: () =>
          summary
            ? `<div class="t3-section-content" data-block-id="summary">
           <div class="t3-section-title">Summary</div>
           <div class="t3-summary">${rich(summary)}</div>
         </div>`
            : "",

        experience: () =>
          experiences.length
            ? `<div class="t3-section-content" data-block-id="exp-section">
           <div class="t3-section-title">Experience</div>
           ${experiences
             .map((exp, i: number) => {
               const start = formatMonthYear(exp.startDate, false);
               const end = exp.endDate
                 ? formatMonthYear(exp.endDate, false)
                 : exp.startDate
                   ? "Present"
                   : "";
               return `<div class="t3-entry" data-block-id="exp-${i}">
               <div class="t3-experience-header">
                 <div class="t3-experience-title">${exp.jobTitle || ""}</div>
                 <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
               </div>
               <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
               ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
             </div>`;
             })
             .join("")}
         </div>`
            : "",

        projects: () =>
          projects.length
            ? `<div class="t3-section-content" data-block-id="proj-section">
           <div class="t3-section-title">Projects</div>
           ${projects
             .map(
               (project: any, i: number) =>
                 `<div class="t3-project-item" data-block-id="proj-${i}">
               <div class="t3-project-header">
                 <div class="t3-project-title">${project.title || ""}</div>
                 <div class="t3-project-links">
                   ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
                   ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
                 </div>
               </div>
               ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
               ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
             </div>`,
             )
             .join("")}
         </div>`
            : "",

        education: () =>
          educations.length
            ? `<div class="t3-section-content" data-block-id="edu-section">
           <div class="t3-section-title">Education</div>
           ${educations
             .map((edu, i: number) => {
               const formattedGrade = formatGradeToCgpdAndPercentage(
                 edu.grade || "",
               );
               return `<div class="t3-entry" data-block-id="edu-${i}">
               <div class="t3-education-header">
                 <div class="t3-education-school">${edu.schoolname || ""}</div>
                 <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
               </div>
               <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
               ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
               ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
             </div>`;
             })
             .join("")}
         </div>`
            : "",

        skills: () => {
          const cleanedSkills = rich(skills);
          if (!skills || !cleanedSkills || cleanedSkills === "<p><br></p>")
            return "";
          return `<div class="t3-section-content" data-block-id="skills-section">
    <div class="t3-section-title">Skills</div>
    <div class="t3-skills-block">
      <div class="t3-skills-content">${cleanedSkills}</div>
    </div>
  </div>`;
        },

        custom: () => {
          if (!customSection.length) return "";
          const filteredCustom = customSection.filter(
            (s) => s?.name?.trim() || s?.description?.trim(),
          );
          if (!filteredCustom.length) return "";
          return filteredCustom
            .map(
              (s, i: number) =>
                `<div class="t3-custom-section" data-block-id="custom-${i}">
          ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
          ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
        </div>`,
            )
            .join("");
        },
      };

      const pdfStyle = forPDF
        ? `<style>
            @page { size: A4; margin: ${MARGIN}px 0; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .t3-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
          </style>`
        : "";

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
        <div class="t3-header" data-block-id="header">
          <div class="t3-header-left">
            ${contact?.firstName || ""} ${contact?.lastName || ""}
            ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
            <div class="t3-header-links">
              ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
              ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
              ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
            </div>
          </div>
          <div class="t3-header-right">
            <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
            ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
            ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
          </div>
        </div>
        <div class="t3-body">
          ${sectionsHTML}
        </div>
      `;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t3-page-break";
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
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
<div class="t3-resume">
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
      customSection,
      summary,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      addressParts,
      formattedDob,
      buildCSS,
    ],
  );

  // ── PDF builder (clip/shift — matches preview exactly) ─────────────────────
  const buildPDFPagesHTML = useCallback(
    (
      pageStarts: number[],
      totalH: number,
      resumeSnapshot: string,
    ): string => {
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
    .t3-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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
        const resumeEl = parsed.querySelector<HTMLElement>(".t3-resume");
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
  .t3-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume =
            measureDoc.querySelector<HTMLElement>(".t3-resume");
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
            measureDoc.documentElement.scrollTop ||
            measureDoc.body.scrollTop;
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
            ".t3-experience-header",
            ".t3-education-header",
            ".t3-project-header",
            ".t3-section-title",
            ".t3-custom-section-title",
          ].join(", ");

          const CHAINED_KEEP_SELECTOR = [
            ".t3-experience-subtitle",
            ".t3-education-subtitle",
            ".t3-education-grade",
          ].join(", ");

          const ATOMIC_SELECTOR = [
            ".t3-project-tech-stack",
            ".t3-project-links",
            ".t3-header",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".t3-summary",
            ".t3-entry-content",
            ".t3-project-description",
            ".t3-custom-section-content",
            ".t3-skills-content",
          ].join(", ");

          const pushLines = (
            el: HTMLElement,
            keepWithNext = false,
          ) => {
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

          const pushAtomic = (
            el: HTMLElement,
            keepWithNext = false,
          ) => {
            const h = el.getBoundingClientRect().height;
            if (h <= 2) return;
            units.push({
              top: getRelTop(el),
              bottom: getRelBottom(el),
              blockId: nearestBlockId(el),
              keepWithNext,
            });
          };

          Array.from(
            resume.querySelectorAll<HTMLElement>("*"),
          ).forEach((el) => {
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
                el.querySelectorAll("*").forEach((c) =>
                  consumed.add(c),
                );
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
          });

          // Remaining single-line leaves
          resume
            .querySelectorAll<HTMLElement>(
              ".t3-header-left, .t3-header-right, .t3-header-contact-line, .t3-header-job",
            )
            .forEach((el) => {
              if (consumed.has(el)) return;
              pushAtomic(el, false);
              consumed.add(el);
            });

          units.sort(
            (a, b) => a.top - b.top || a.bottom - b.bottom,
          );

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
          (window as any).__resumePageBreakIds =
            pageBreakIds.filter(Boolean);
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
  .t3-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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
          win.document.fonts.ready.then(() =>
            requestAnimationFrame(doMeasure),
          );
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
      const storedTotalH: number | undefined = (window as any)
        .__resumeTotalH;
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

export default TemplateThree;
