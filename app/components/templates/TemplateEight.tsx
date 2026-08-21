












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

// interface TemplateEightProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateEight: React.FC<TemplateEightProps> = ({
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
//   const activeFontFamily = customization?.fontFamily ?? "'EB Garamond', serif";

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
//     return map[fontFamily] || map["'EB Garamond', serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── Get complementary sans font ────────────────────────────────────────────
//   const getComplementaryFont = (fontFamily: string): string => {
//     if (fontFamily.includes("serif")) return "'Barlow', sans-serif";
//     return fontFamily;
//   };

//   // ── CSS builder with dynamic font ─────────────────────────────────────────
//   const buildCSS = useCallback((fontFamily: string) => {
//     const complementaryFont = getComplementaryFont(fontFamily);
//     const serifFont = fontFamily.includes("serif")
//       ? fontFamily
//       : "'EB Garamond', serif";

//     return `
//     @import url('${getFontImport(fontFamily)}');
//     @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t8-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: #ffffff;
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//       color: #111111;
//       text-align: left;
//     }

//     .t8-resume .entry-content ul, .t8-resume .skills-content ul,
//     .t8-resume .edu-content ul,   .t8-resume .custom-section-content ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 20px !important;
//       padding-left: 20px !important;
//     }
//     .t8-resume .entry-content ol, .t8-resume .skills-content ol,
//     .t8-resume .edu-content ol,   .t8-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 20px !important;
//       padding-left: 20px !important;
//     }
//     .t8-resume .entry-content li, .t8-resume .skills-content li,
//     .t8-resume .edu-content li,   .t8-resume .custom-section-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }
//     .t8-resume .entry-content strong, .t8-resume .custom-section-content strong,
//     .t8-resume .edu-content strong,   .t8-resume .skills-content strong { font-weight: 700 !important; }
//     .t8-resume .entry-content em,     .t8-resume .custom-section-content em,
//     .t8-resume .edu-content em,       .t8-resume .skills-content em     { font-style: italic !important; }
//     .t8-resume .entry-content u,      .t8-resume .custom-section-content u,
//     .t8-resume .edu-content u,        .t8-resume .skills-content u       { text-decoration: underline !important; }
//     .t8-resume .entry-content p,      .t8-resume .custom-section-content p,
//     .t8-resume .edu-content p,        .t8-resume .skills-content p       { white-space: pre-wrap !important; }

//     .t8-resume .skills-content {
//       font-size: 13px; line-height: 1.65; color: #333;
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//     }
//     .t8-resume .skills-content p { margin: 0 0 6px 0 !important; }

//     .t8-resume .header-block {
//       margin-bottom: 22px; padding-bottom: 16px;
//       border-bottom: 2px solid #111;
//     }
//     .t8-resume .header-name {
//       font-family: ${serifFont}, ${getSystemFallback(serifFont)};
//       font-size: 36px; font-weight: 600;
//       letter-spacing: 0.5px; line-height: 1.1; margin-bottom: 4px;
//       color: #000; text-align: center;
//     }
//     .t8-resume .header-jobtitle {
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//       font-size: 13px; font-weight: 500;
//       letter-spacing: 2.5px; text-transform: uppercase; color: #444;
//       margin-bottom: 12px; text-align: center;
//     }
//     .t8-resume .header-meta {
//       display: flex; flex-wrap: wrap; justify-content: center;
//       gap: 0; font-size: 12.5px; color: #333; line-height: 1.6;
//     }
//     .t8-resume .header-meta-item { display: flex; align-items: center; color: #333; }
//     .t8-resume .header-meta-item:not(:last-child)::after {
//       content: '·'; margin: 0 8px; color: #999; font-weight: 300;
//     }
//     .t8-resume .header-meta a { color: #111; text-decoration: underline; text-underline-offset: 2px; }

//     .t8-resume .education-grade { font-size: 11.5px; color: #666; margin-top: 3px; font-weight: 500; }

//     .t8-resume .section-block { margin-bottom: 20px; }
//     .t8-resume .section-title {
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//       font-size: 10px; font-weight: 600;
//       letter-spacing: 3px; text-transform: uppercase; color: #000;
//       margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #000;
//       text-align: left !important;
//       page-break-after: avoid; break-after: avoid;
//     }

//     .t8-resume .summary-text { font-size: 13.5px; line-height: 1.75; color: #222; }

//     .t8-resume .entry-block {
//       margin-bottom: 16px; 
//       border-bottom: 1px solid #e8e8e8;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t8-resume .entry-block:last-child { border-bottom: none; padding-bottom: 0; }
//     .t8-resume .entry-top-row {
//       display: flex; justify-content: space-between; align-items: baseline;
//       margin-bottom: 2px; flex-wrap: wrap; gap: 6px;
//     }
//     .t8-resume .entry-title {
//       font-family: ${serifFont}, ${getSystemFallback(serifFont)};
//       font-size: 17px; font-weight: 600;
//       color: #000; line-height: 1.3;
//     }
//     .t8-resume .entry-date {
//       font-size: 11.5px; color: #555; font-weight: 400; white-space: nowrap;
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//       letter-spacing: 0.3px;
//     }
//     .t8-resume .entry-subtitle {
//       font-size: 12.5px; color: #444; margin-bottom: 7px;
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//       font-weight: 400; letter-spacing: 0.2px;
//     }
//     .t8-resume .entry-subtitle em { font-style: normal; color: #777; }
//     .t8-resume .entry-content {
//       font-size: 13px; line-height: 1.65; color: #333;
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//     }

//     .t8-resume .project-header {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
//     }
//     .t8-resume .project-links { display: flex; gap: 12px; }
//     .t8-resume .project-link  { font-size: 11px; color: #555; text-decoration: underline; }
//     .t8-resume .project-tech-stack { font-size: 11.5px; color: #666; margin: 4px 0 6px; }

//     .t8-resume .custom-section-content {
//       font-size: 13px; line-height: 1.65; color: #333;
//       font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
//     }

//     /* Page break marker */
//     .t8-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       .t8-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
//       .t8-resume .entry-date { white-space: nowrap; }
//       .t8-resume .entry-content ul, .t8-resume .skills-content ul,
//       .t8-resume .edu-content ul,   .t8-resume .custom-section-content ul {
//         list-style-type: disc !important; padding-left: 20px !important;
//       }
//       .t8-resume .entry-content ol, .t8-resume .skills-content ol,
//       .t8-resume .edu-content ol,   .t8-resume .custom-section-content ol {
//         list-style-type: decimal !important; padding-left: 20px !important;
//       }
//     }
//   `;
//   }, []);

//   const styles = buildCSS(activeFontFamily);

//   // ── Helper functions ──────────────────────────────────────────────────────
//   const href = (url: string) =>
//     url.startsWith("http") ? url : `https://${url}`;

//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   const renderEntryText = (text: string, className: string) => {
//     if (!text) return "";
//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="entry-content ${className}">${rich(text)}</div>`;
//     }
//     const lines = text.split("\n").filter((l) => l.trim() !== "");
//     if (
//       lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//     ) {
//       return `<div class="entry-content ${className}"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//         .map((l) => {
//           const t = l.trim();
//           const content =
//             t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//           return content
//             ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${content}</li>`
//             : "";
//         })
//         .join("")}</ul></div>`;
//     }
//     return `<div class="entry-content ${className}" style="white-space:pre-wrap">${rich(text)}</div>`;
//   };

//   // ── HTML builder with section ordering ───────────────────────────────────
//   // AFTER
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//       const addressStr = addressParts.join(", ");

//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//           : "";

//       // ── Section builders ──────────────────────────────────────────────────────
//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `
//       <div class="section-block" data-block-id="summary">
//         <div class="section-title">Profile</div>
//         <div class="summary-text">${rich(summary)}</div>
//       </div>
//     `
//             : "",

//         experience: () =>
//           experiences.length
//             ? `
//       <div class="section-block" data-block-id="exp-section">
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any, i: number) => {
//             const startFormatted = formatMonthYear(exp.startDate, false);
//             const endFormatted = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             return `
//             <div class="entry-block" data-block-id="exp-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//               </div>
//               <div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
//               ${exp.text ? renderEntryText(exp.text, "entry-content-description") : ""}
//             </div>
//           `;
//           })
//           .join("")}
//       </div>
//     `
//             : "",

//         projects: () =>
//           projects.length
//             ? `
//       <div class="section-block" data-block-id="proj-section">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any, i: number) => `
//           <div class="entry-block" data-block-id="proj-${i}">
//             <div class="project-header">
//               <div class="entry-title">${p.title || ""}</div>
//               <div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
//             ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("")}
//       </div>
//     `
//             : "",

//         education: () =>
//           educations.length
//             ? `
//       <div class="section-block" data-block-id="edu-section">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any, i: number) => {
//             const formattedGrade = formatGradeToCgpdAndPercentage(
//               edu.grade || "",
//             );
//             let textHtml = "";
//             if (edu.text) {
//               if (edu.text.includes("<") && edu.text.includes(">")) {
//                 textHtml = `<div class="edu-content">${rich(edu.text)}</div>`;
//               } else {
//                 const lines = edu.text
//                   .split("\n")
//                   .filter((l: string) => l.trim() !== "");
//                 if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                   textHtml = `<ul class="edu-content" style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//                     .map((l: string) => {
//                       const t = l.trim();
//                       const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                       return c
//                         ? `<li style="margin-bottom:3px;">${c}</li>`
//                         : "";
//                     })
//                     .join("")}</ul>`;
//                 } else {
//                   textHtml = `<div class="edu-content" style="white-space:pre-wrap">${rich(edu.text)}</div>`;
//                 }
//               }
//             }
//             return `
//             <div class="entry-block" data-block-id="edu-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 <div class="entry-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}</div>
//               </div>
//               <div class="entry-subtitle">
//                 ${[edu.degree, edu.location].filter(Boolean).join(" · ")}
//                 ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//               </div>
//               ${textHtml}
//             </div>
//           `;
//           })
//           .join("")}
//       </div>
//     `
//             : "",

//         skills: () => {
//           const skillsClean = rich(skills);
//           if (!skillsClean || skillsClean === "<p><br></p>") return "";

//           return `<div class="section-block" data-block-id="skills-section">
//     <div class="section-title">Skills</div>
//     <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//   </div>`;
//         },

//         //         skills: () => {
//         //   const skillsClean = rich(skills || "");
//         //   if (!skillsClean) return "";
//         //   return `<div class="skills-block" data-block-id="skills-section">
//         //     <div class="section-title">Skills</div>
//         //     <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//         //   </div>`;
//         // },

//         custom: () => {
//           if (!Array.isArray(finalize?.customSection)) return "";
//           const filteredCustom = finalize.customSection.filter(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           );
//           if (filteredCustom.length === 0) return "";
//           return filteredCustom
//             .map(
//               (s: any, i: number) => `
//         <div class="section-block" data-block-id="custom-${i}">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//         </div>
//       `,
//             )
//             .join("");
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
//         ? `<style>.t8-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       let bodyContent = `
//       <div class="header-block" data-block-id="header">
//         <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="header-jobtitle">${
//           contact?.jobTitle
//             ? typeof contact.jobTitle === "string"
//               ? contact.jobTitle
//               : (contact.jobTitle as any)?.name || ""
//             : ""
//         }</div>
//         <div class="header-meta">
//           ${addressStr ? `<span class="header-meta-item">${addressStr}</span>` : ""}
//           ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//           ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
//           ${linkedinUrl ? `<span class="header-meta-item"><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
//           ${githubUrl ? `<span class="header-meta-item"><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
//           ${portfolioUrl ? `<span class="header-meta-item"><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
//         </div>
//       </div>
//       ${sectionsHTML}
//     `;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t8-page-break";
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
//   <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t8-resume">
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
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       addressParts,
//       styles,
//     ],
//   );

//   // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t8-resume");
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
//   <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t8-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t8-resume");
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

//           const ITEM_SELECTORS = [
//             ".entry-block",
//             ".header-block",
//             ".summary-text",
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
//               // AFTER
//               if (firstItem) {
//                 // Skip anchor logic for skills — allow it to split across pages
//                 if (firstItem.classList.contains("skills-content")) return;

//                 const deepChild =
//                   firstItem.querySelector<HTMLElement>(".entry-block");
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
//   <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
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
//     .t8-resume {
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
//     [styles],
//   );

//   // ── Debounced updates ────────────────────────────────────
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

//   // ── PDF download ─────────────────────────────────────────
//   const handleDownload = async () => {
//     setIsDownloading(true);
//     try {
//       //   // AFTER
//       //   const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       //   const res: AxiosResponse<Blob> = await api.post(
//       //     `${API_URL}/candidates/generate-pdf`,
//       //     { html: generateHTML(true, pageBreakIds) },
//       //     { responseType: "blob" },
//       //   );

//       // AFTER
//       const pageBreakIds: string[] = (
//         (window as any).__resumePageBreakIds || []
//       ).filter((id: string) => id !== "skills-section");
//       const skillsCutIndex: number =
//         (window as any).__resumeSkillsCutIndex ?? -1;
//       //   const res: AxiosResponse<Blob> = await api.post(
//       //     `${API_URL}/candidates/generate-pdf`,
//       //     { html: generateHTML(true, pageBreakIds, skillsCutIndex) },
//       //   );

//       // AFTER
//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: generateHTML(true, pageBreakIds) },
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
//     } catch (error) {
//       console.error("Error generating PDF:", error);
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
// //                                               relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
// //                                               text-white transition-all duration-300 shadow-lg
// //                                               ${
// //                                                 isDownloading
// //                                                   ? "bg-gray-400 cursor-not-allowed opacity-80"
// //                                                   : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
// //                                               }
// //                                             `}
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

// export default TemplateEight;




















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
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateEightProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateEight: React.FC<TemplateEightProps> = ({
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
  const activeFontFamily = customization?.fontFamily ?? "'EB Garamond', serif";

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

  // ── Complete Font import map ────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
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
    return map[fontFamily] || map["'EB Garamond', serif"];
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

  // ── Get complementary sans font ────────────────────────────────────────────
  const getComplementaryFont = (fontFamily: string): string => {
    if (fontFamily.includes("serif")) return "'Barlow', sans-serif";
    return fontFamily;
  };

  // ── CSS builder (NO @import — fonts loaded via <link>) ────────────────────
  const buildCSS = useCallback((fontFamily: string) => {
    const complementaryFont = getComplementaryFont(fontFamily);
    const serifFont = fontFamily.includes("serif")
      ? fontFamily
      : "'EB Garamond', serif";

    return `
    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t8-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background-color: #ffffff;
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
      color: #111111;
      text-align: left;
    }
    .t8-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    .t8-resume .entry-content ul, .t8-resume .skills-content ul,
    .t8-resume .edu-content ul,   .t8-resume .custom-section-content ul {
      list-style-type: disc !important;
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }
    .t8-resume .entry-content ol, .t8-resume .skills-content ol,
    .t8-resume .edu-content ol,   .t8-resume .custom-section-content ol {
      list-style-type: decimal !important;
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }
    .t8-resume .entry-content li, .t8-resume .skills-content li,
    .t8-resume .edu-content li,   .t8-resume .custom-section-content li {
      margin-bottom: 4px !important;
      line-height: 1.5 !important;
    }
    .t8-resume .entry-content strong, .t8-resume .custom-section-content strong,
    .t8-resume .edu-content strong,   .t8-resume .skills-content strong { font-weight: 700 !important; }
    .t8-resume .entry-content em,     .t8-resume .custom-section-content em,
    .t8-resume .edu-content em,       .t8-resume .skills-content em     { font-style: italic !important; }
    .t8-resume .entry-content u,      .t8-resume .custom-section-content u,
    .t8-resume .edu-content u,        .t8-resume .skills-content u       { text-decoration: underline !important; }
    .t8-resume .entry-content p,      .t8-resume .custom-section-content p,
    .t8-resume .edu-content p,        .t8-resume .skills-content p       { white-space: pre-wrap !important; }

    .t8-resume .skills-content {
      font-size: 13px; line-height: 1.65; color: #333;
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
    }
    .t8-resume .skills-content p { margin: 0 0 6px 0 !important; }

    .t8-resume .header-block {
      margin-bottom: 22px; padding-bottom: 16px;
      border-bottom: 2px solid #111;
    }
    .t8-resume .header-name {
      font-family: ${serifFont}, ${getSystemFallback(serifFont)};
      font-size: 36px; font-weight: 600;
      letter-spacing: 0.5px; line-height: 1.1; margin-bottom: 4px;
      color: #000; text-align: center;
    }
    .t8-resume .header-jobtitle {
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
      font-size: 13px; font-weight: 500;
      letter-spacing: 2.5px; text-transform: uppercase; color: #444;
      margin-bottom: 12px; text-align: center;
    }
    .t8-resume .header-meta {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 0; font-size: 12.5px; color: #333; line-height: 1.6;
    }
    .t8-resume .header-meta-item { display: flex; align-items: center; color: #333; }
    .t8-resume .header-meta-item:not(:last-child)::after {
      content: '\\00B7'; margin: 0 8px; color: #999; font-weight: 300;
    }
    .t8-resume .header-meta a { color: #111; text-decoration: underline; text-underline-offset: 2px; }

    .t8-resume .education-grade { font-size: 11.5px; color: #666; margin-top: 3px; font-weight: 500; }

    .t8-resume .section-block { margin-bottom: 20px; }
    .t8-resume .section-title {
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
      font-size: 10px; font-weight: 600;
      letter-spacing: 3px; text-transform: uppercase; color: #000;
      margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #000;
      text-align: left !important;
      page-break-after: avoid; break-after: avoid;
    }

    .t8-resume .summary-text { font-size: 13.5px; line-height: 1.75; color: #222; }

    .t8-resume .entry-block {
      margin-bottom: 16px;
      border-bottom: 1px solid #e8e8e8;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t8-resume .entry-block:last-child { border-bottom: none; padding-bottom: 0; }
    .t8-resume .entry-top-row {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 2px; flex-wrap: wrap; gap: 6px;
      page-break-after: avoid; break-after: avoid;
    }
    .t8-resume .entry-title {
      font-family: ${serifFont}, ${getSystemFallback(serifFont)};
      font-size: 17px; font-weight: 600;
      color: #000; line-height: 1.3;
    }
    .t8-resume .entry-date {
      font-size: 11.5px; color: #555; font-weight: 400; white-space: nowrap;
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
      letter-spacing: 0.3px;
    }
    .t8-resume .entry-subtitle {
      font-size: 12.5px; color: #444; margin-bottom: 7px;
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
      font-weight: 400; letter-spacing: 0.2px;
    }
    .t8-resume .entry-subtitle em { font-style: normal; color: #777; }
    .t8-resume .entry-content {
      font-size: 13px; line-height: 1.65; color: #333;
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
    }

    .t8-resume .project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
      page-break-after: avoid; break-after: avoid;
    }
    .t8-resume .project-links { display: flex; gap: 12px; }
    .t8-resume .project-link  { font-size: 11px; color: #555; text-decoration: underline; }
    .t8-resume .project-tech-stack { font-size: 11.5px; color: #666; margin: 4px 0 6px; }

    .t8-resume .custom-section-content {
      font-size: 13px; line-height: 1.65; color: #333;
      font-family: ${complementaryFont}, ${getSystemFallback(complementaryFont)};
    }

    .t8-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { overflow: visible; }
      .t8-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
      .t8-resume .entry-date { white-space: nowrap; }
      .t8-resume .entry-content ul, .t8-resume .skills-content ul,
      .t8-resume .edu-content ul,   .t8-resume .custom-section-content ul {
        list-style-type: disc !important; padding-left: 20px !important;
      }
      .t8-resume .entry-content ol, .t8-resume .skills-content ol,
      .t8-resume .edu-content ol,   .t8-resume .custom-section-content ol {
        list-style-type: decimal !important; padding-left: 20px !important;
      }
      a, a:visited { color: inherit !important; text-decoration: none !important; }
      .project-link, .header-meta a { color: #111 !important; }
    }
  `;
  }, []);

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) =>
    url.startsWith("http") ? url : `https://${url}`;

  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  const renderEntryText = (text: string, className: string) => {
    if (!text) return "";
    if (text.includes("<") && text.includes(">")) {
      return `<div class="entry-content ${className}">${rich(text)}</div>`;
    }
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    if (
      lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
    ) {
      return `<div class="entry-content ${className}"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
        .map((l) => {
          const t = l.trim();
          const content =
            t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
          return content
            ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${content}</li>`
            : "";
        })
        .join("")}</ul></div>`;
    }
    return `<div class="entry-content ${className}" style="white-space:pre-wrap">${rich(text)}</div>`;
  };

  // ── HTML builder with section ordering ───────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);
      const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
      const addressStr = addressParts.join(", ");

      // ── Section builders ────────────────────────────────────────────────
      const sectionBuilders = {
        summary: () =>
          summary
            ? `
      <div class="section-block" data-block-id="summary">
        <div class="section-title">Profile</div>
        <div class="summary-text" data-block-id="summary-content">${rich(summary)}</div>
      </div>
    `
            : "",

        experience: () =>
          experiences.length
            ? `
      <div class="section-block" data-block-id="exp-section">
        <div class="section-title">Experience</div>
        ${experiences
          .map((exp: any, i: number) => {
            const startFormatted = formatMonthYear(exp.startDate, false);
            const endFormatted = exp.endDate
              ? formatMonthYear(exp.endDate, false)
              : "Present";
            return `
            <div class="entry-block" data-block-id="exp-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${exp.jobTitle || ""}</div>
                <div class="entry-date">${startFormatted} – ${endFormatted}</div>
              </div>
              <div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
              ${exp.text ? renderEntryText(exp.text, "entry-content-description") : ""}
            </div>
          `;
          })
          .join("")}
      </div>
    `
            : "",

        projects: () =>
          projects.length
            ? `
      <div class="section-block" data-block-id="proj-section">
        <div class="section-title">Projects</div>
        ${projects
          .map(
            (p: any, i: number) => `
          <div class="entry-block" data-block-id="proj-${i}">
            <div class="project-header">
              <div class="entry-title">${p.title || ""}</div>
              <div class="project-links">
                ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
                ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
            ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    `
            : "",

        education: () =>
          educations.length
            ? `
      <div class="section-block" data-block-id="edu-section">
        <div class="section-title">Education</div>
        ${educations
          .map((edu: any, i: number) => {
            const formattedGrade = formatGradeToCgpdAndPercentage(
              edu.grade || "",
            );
            let textHtml = "";
            if (edu.text) {
              if (edu.text.includes("<") && edu.text.includes(">")) {
                textHtml = `<div class="edu-content">${rich(edu.text)}</div>`;
              } else {
                const lines = edu.text
                  .split("\n")
                  .filter((l: string) => l.trim() !== "");
                if (lines.some((l: string) => l.trim().startsWith("-"))) {
                  textHtml = `<ul class="edu-content" style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
                    .map((l: string) => {
                      const t = l.trim();
                      const c = t.startsWith("-") ? t.substring(1).trim() : t;
                      return c
                        ? `<li style="margin-bottom:3px;">${c}</li>`
                        : "";
                    })
                    .join("")}</ul>`;
                } else {
                  textHtml = `<div class="edu-content" style="white-space:pre-wrap">${rich(edu.text)}</div>`;
                }
              }
            }
            return `
            <div class="entry-block" data-block-id="edu-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${edu.schoolname || ""}</div>
                <div class="entry-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}</div>
              </div>
              <div class="entry-subtitle">
                ${[edu.degree, edu.location].filter(Boolean).join(" · ")}
                ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
              </div>
              ${textHtml}
            </div>
          `;
          })
          .join("")}
      </div>
    `
            : "",

        skills: () => {
          const skillsClean = rich(skills);
          if (!skillsClean || skillsClean === "<p><br></p>") return "";

          return `<div class="section-block" data-block-id="skills-section">
    <div class="section-title">Skills</div>
    <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
  </div>`;
        },

        custom: () => {
          if (!Array.isArray(finalize?.customSection)) return "";
          const filteredCustom = finalize.customSection.filter(
            (s: any) => s?.name?.trim() || s?.description?.trim(),
          );
          if (filteredCustom.length === 0) return "";
          return filteredCustom
            .map(
              (s: any, i: number) => `
        <div class="section-block" data-block-id="custom-${i}">
          ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
          ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
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

      const pdfStyle = forPDF
        ? `<style>
            @page { size: A4; margin: ${MARGIN}px 0; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .t8-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
          </style>`
        : "";

      let bodyContent = `
      <div class="header-block" data-block-id="header">
        <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="header-jobtitle">${
          contact?.jobTitle
            ? typeof contact.jobTitle === "string"
              ? contact.jobTitle
              : (contact.jobTitle as any)?.name || ""
            : ""
        }</div>
        <div class="header-meta">
          ${addressStr ? `<span class="header-meta-item">${addressStr}</span>` : ""}
          ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
          ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
          ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
          ${linkedinUrl ? `<span class="header-meta-item"><a href="${href(linkedinUrl)}">LinkedIn: ${formatSocialLink(linkedinUrl, "linkedin")}</</a></span>` : ""}
          ${githubUrl ? `<span class="header-meta-item"><a href="${href(githubUrl)}">GitHub: ${formatSocialLink(githubUrl, "github")}</a></span>` : ""}
          ${portfolioUrl ? `<span class="header-meta-item"><a href="${href(portfolioUrl)}">${formatSocialLink(portfolioUrl, "portfolio")}</a></span>` : ""}
        </div>
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
            breakDiv.className = "t8-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${getFontLinkTag(activeFontFamily)}
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap"/>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t8-resume">${bodyContent}</div>
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
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      addressParts,
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap"/>
  <style>
    ${CSS}
    @page { size: A4; margin: 0; }
    html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
    .t8-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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
  const BARLOW_LINK_TAG =
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&display=swap"/>';

  // ── Page splitter (reuses iframe, smart font wait, atomic units) ───────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t8-resume");
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
 ${BARLOW_LINK_TAG}
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t8-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t8-resume");
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
            ".entry-top-row",
            ".project-header",
            ".section-title",
            ".entry-title",
          ].join(", ");

          const ATOMIC_SELECTOR = [
            ".project-tech-stack",
            ".header-meta",
            ".education-grade",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".summary-text",
            ".skills-content",
            ".entry-content",
            ".edu-content",
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
          });

          // ── Catch remaining standalone elements ─────────────────────
          resume
            .querySelectorAll<HTMLElement>(
              ".header-name, .header-jobtitle, .entry-title, .entry-subtitle, .entry-date, .education-grade, .project-link",
            )
            .forEach((el) => {
              if (consumed.has(el)) return;
              pushAtomic(el, el.classList.contains("entry-title"));
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
 ${BARLOW_LINK_TAG}
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t8-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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
    [CSS_FOR_MEASURE, FONT_LINK_TAG, BARLOW_LINK_TAG],
  );

  // ── Debounced updates (60ms for faster response) ──────────────────────────
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

  // ── Download handler ───────────────────────────────────────────────────────
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
        // ✅ Per-page clip/shift — matches preview exactly
        pdfHtml = buildPDFPagesHTML(
          storedPageStarts,
          storedTotalH,
          storedSnapshot,
        );
      } else {
        // ⬇ Fallback: old page-break approach
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
      {/* ── Font preconnect — starts DNS+TCP immediately ─────────────────── */}
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

export default TemplateEight;