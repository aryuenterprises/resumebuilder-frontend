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
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateSixteenProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateSixteen: React.FC<TemplateSixteenProps> = ({
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

//   const activeFontFamily = customization?.fontFamily ?? "'Jost', sans-serif";

//   // ── Data ──────────────────────────────────────────────────────────────────
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

//   // ── Font map ───────────────────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const fontMap: Record<string, string> = {
//       "'Jost', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap",
//       "'Inter', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//       "'Poppins', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Lato', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap",
//       "'Raleway', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap",
//       "'Montserrat', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
//       "'Open Sans', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
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
//         "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap",
//       "'Crimson Text', serif":
//         "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
//       "'Source Code Pro', monospace":
//         "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
//       "'JetBrains Mono', monospace":
//         "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
//     };
//     return (
//       fontMap[fontFamily] ||
//       "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap"
//     );
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder ────────────────────────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 0; }
//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { margin: 0; padding: 0; background: white; }

//     .t16-resume {
//       width: ${A4_W}px;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       color: #2c2c2c;
//       box-sizing: border-box;
//     }

//     .t16-resume * { box-sizing: border-box; }

//     .t16-resume p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.6 !important;
//     }
//     .t16-resume p:last-child { margin-bottom: 0 !important; }

//     /* Rich text */
//     .t16-resume .t16-entry-content ul,
//     .t16-resume .t16-entry-content ol,
//     .t16-resume .t16-skills-content ul,
//     .t16-resume .t16-skills-content ol,
//     .t16-resume .t16-edu-content ul,
//     .t16-resume .t16-edu-content ol,
//     .t16-resume .t16-custom-section-content ul,
//     .t16-resume .t16-custom-section-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 20px !important;
//     }
//     .t16-resume .t16-entry-content li,
//     .t16-resume .t16-skills-content li,
//     .t16-resume .t16-edu-content li,
//     .t16-resume .t16-custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.6 !important;
//     }
//     .t16-resume .t16-entry-content ul,
//     .t16-resume .t16-skills-content ul,
//     .t16-resume .t16-edu-content ul,
//     .t16-resume .t16-custom-section-content ul { list-style-type: disc !important; }
//     .t16-resume .t16-entry-content ol,
//     .t16-resume .t16-skills-content ol,
//     .t16-resume .t16-edu-content ol,
//     .t16-resume .t16-custom-section-content ol { list-style-type: decimal !important; }
//     .t16-resume .t16-entry-content strong,
//     .t16-resume .t16-skills-content strong,
//     .t16-resume .t16-edu-content strong,
//     .t16-resume .t16-custom-section-content strong { font-weight: 600 !important; }
//     .t16-resume .t16-entry-content em,
//     .t16-resume .t16-skills-content em,
//     .t16-resume .t16-edu-content em,
//     .t16-resume .t16-custom-section-content em { font-style: italic !important; }
//     .t16-resume .t16-entry-content u,
//     .t16-resume .t16-skills-content u,
//     .t16-resume .t16-edu-content u,
//     .t16-resume .t16-custom-section-content u { text-decoration: underline !important; }
//     .t16-resume .t16-entry-content p,
//     .t16-resume .t16-skills-content p,
//     .t16-resume .t16-edu-content p,
//     .t16-resume .t16-custom-section-content p { white-space: pre-wrap !important; }

//     /* Skills */
//     .t16-resume .t16-skills-content {
//       font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
//       padding: 12px 16px; background: #ffffff;
//       border: 1px solid #ebebeb; border-radius: 4px;
//     }

//     /* Custom Section */
//     .t16-resume .t16-custom-section-content {
//       font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
//       padding: 12px 16px; background: #ffffff;
//       border: 1px solid #ebebeb; border-radius: 4px;
//     }

//     /* Project links */
//     .t16-resume .t16-project-links { display: flex; gap: 15px; }
//     .t16-resume .t16-project-link {
//       font-size: 10px; font-weight: 500; color: #7a8c96; text-decoration: underline;
//     }
//     .t16-resume .t16-project-tech-stack { font-size: 11px; color: #888; margin: 6px 0; }

//     /* HEADER */
//     .t16-resume .t16-header-block {
//       background-color: #ffffff;
//       padding: 36px 36px 28px;
//       border-bottom: 1px solid #e2e2e2;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t16-resume .t16-header-accent-line {
//       width: 48px; height: 3px; background: #7a8c96; margin-bottom: 18px;
//     }
//     .t16-resume .t16-header-name {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 42px; font-weight: 300; line-height: 1.0;
//       letter-spacing: 1px; color: #1a1a1a; margin-bottom: 8px;
//     }
//     .t16-resume .t16-header-name strong { font-weight: 600; }
//     .t16-resume .t16-header-jobtitle {
//       font-size: 11px; font-weight: 500; letter-spacing: 3.5px;
//       text-transform: uppercase; color: #7a8c96; margin-bottom: 22px;
//     }
//     .t16-resume .t16-header-meta-grid {
//       display: flex; flex-wrap: wrap; gap: 8px 24px;
//       font-size: 11.5px; color: #666; font-weight: 300;
//     }
//     .t16-resume .t16-header-meta-item {
//       display: flex; align-items: center; gap: 6px;
//     }
//     .t16-resume .t16-header-meta-dot {
//       width: 3px; height: 3px; border-radius: 50%;
//       background: #7a8c96; flex-shrink: 0;
//     }
//     .t16-resume .t16-header-meta-item a {
//       color: #7a8c96; text-decoration: none; border-bottom: 1px solid #c5d0d6;
//     }

//     /* BODY */
//     .t16-resume .t16-resume-body { padding: 28px 36px 36px; }

//     /* SECTION */
//     .t16-resume .t16-section-block {
//       margin-bottom: 28px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t16-resume .t16-section-block:last-child { margin-bottom: 0; }
//     .t16-resume .t16-section-header {
//       display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t16-resume .t16-section-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 20px; font-weight: 500; color: #1a1a1a;
//       letter-spacing: 0.5px; white-space: nowrap;
//     }
//     .t16-resume .t16-section-ornament {
//       color: #7a8c96; font-size: 14px; font-weight: 300; flex-shrink: 0;
//     }
//     .t16-resume .t16-section-line {
//       flex: 1; height: 1px;
//       background: linear-gradient(to right, #c8d2d8, transparent);
//     }

//     /* SUMMARY */
//     .t16-resume .t16-summary-text {
//       font-size: 16px; line-height: 1.85; color: #444; font-weight: 300;
//       padding: 16px 20px; background: #ffffff;
//       border: 1px solid #e8ecee; border-left: 3px solid #7a8c96;
//       border-radius: 0 4px 4px 0;
//     }

//     /* ENTRY BLOCKS */
//     .t16-resume .t16-entry-block {
//       margin-bottom: 20px; padding: 16px 18px;
//       background: #ffffff; border: 1px solid #ebebeb; border-radius: 4px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t16-resume .t16-entry-block:last-child { margin-bottom: 0; }
//     .t16-resume .t16-entry-top-row {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       gap: 8px; flex-wrap: wrap; margin-bottom: 3px;
//     }
//     .t16-resume .t16-entry-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.2;
//     }
//     .t16-resume .t16-entry-date {
//       font-size: 10.5px; font-weight: 400; letter-spacing: 1px;
//       color: #7a8c96; white-space: nowrap;
//       background: #f0f4f6; padding: 3px 10px; border-radius: 20px;
//     }
//     .t16-resume .t16-entry-subtitle {
//       font-size: 11.5px; font-weight: 400; color: #888;
//       letter-spacing: 0.5px; margin-bottom: 8px;
//     }
//     .t16-resume .t16-entry-content {
//       font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
//     }
//     .t16-resume .t16-edu-content {
//       font-size: 12.5px; line-height: 1.7; color: #555;
//       font-weight: 300; margin-top: 8px;
//     }
//     .t16-resume .t16-education-grade {
//       font-size: 11px; color: #6b7c93; margin-top: 4px; font-weight: 500;
//     }

//     /* Page break marker */
//     .t16-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
//       .t16-resume {
//         width: ${A4_W}px !important;
//         box-shadow: none !important;
//       }
//       .t16-resume .t16-header-block,
//       .t16-resume .t16-skills-content,
//       .t16-resume .t16-summary-text,
//       .t16-resume .t16-custom-section-content {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//     }
//   `,
//     [],
//   );

//   // ── HTML builder ───────────────────────────────────────────────────────────
//   // AFTER
//   const generateHTML = useCallback(
//     (
//       forPDF = false,
//       pageBreakIds: string[] = [],
//       skillsCutIndex = -1,
//     ): string => {
//       const CSS = buildCSS(activeFontFamily);
//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const sectionHeader = (title: string) => `
//         <div class="t16-section-header">
//           <span class="t16-section-title">${title}</span>
//           <span class="t16-section-ornament">&#10022;</span>
//           <div class="t16-section-line"></div>
//         </div>`;

//       // Header
//       const headerBlock = `
//         <div class="t16-header-block" data-block-id="header">
//           <div class="t16-header-accent-line"></div>
//           <div class="t16-header-name">
//             ${contact?.firstName || ""} <strong>${contact?.lastName || ""}</strong>
//           </div>
//           <div class="t16-header-jobtitle">${
//             contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""
//           }</div>
//           <div class="t16-header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
//           </div>
//         </div>`;

//       // Summary
//       const summaryBlock = summary?.trim()
//         ? `<div class="t16-section-block" data-block-id="summary">
//             ${sectionHeader("Profile")}
//             <div class="t16-summary-text">${cleanQuillHTML(summary)}</div>
//            </div>`
//         : "";

//       // Experience
//       const expBlock = experiences.length
//         ? `<div class="t16-section-block" data-block-id="exp-section">
//             ${sectionHeader("Experience")}
//             ${experiences
//               .map((exp: any, i: number) => {
//                 const s = formatMonthYear(exp.startDate, false);
//                 const e = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 const companyLocation = [exp.employer, exp.location]
//                   .filter(Boolean)
//                   .join("  ·  ");
//                 return `<div class="t16-entry-block" data-block-id="exp-${i}">
//                   <div class="t16-entry-top-row">
//                     <div class="t16-entry-title">${exp.jobTitle || ""}</div>
//                     <div class="t16-entry-date">${s} – ${e}</div>
//                   </div>
//                   <div class="t16-entry-subtitle">${companyLocation}</div>
//                   ${exp.text ? `<div class="t16-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//                 </div>`;
//               })
//               .join("")}
//            </div>`
//         : "";

//       // Projects
//       const projBlock = projects.length
//         ? `<div class="t16-section-block" data-block-id="proj-section">
//             ${sectionHeader("Projects")}
//             ${projects
//               .map(
//                 (p: any, i: number) => `
//               <div class="t16-entry-block" data-block-id="proj-${i}">
//                 <div class="t16-entry-top-row">
//                   <div class="t16-entry-title">${p.title || ""}</div>
//                   <div class="t16-project-links">
//                     ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t16-project-link">Live Demo</a>` : ""}
//                     ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t16-project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${p.techStack?.length ? `<div class="t16-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
//                 ${p.description ? `<div class="t16-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
//               </div>`,
//               )
//               .join("")}
//            </div>`
//         : "";

//       // Education
//       const eduBlock = educations.length
//         ? `<div class="t16-section-block" data-block-id="edu-section">
//             ${sectionHeader("Education")}
//             ${educations
//               .map((edu: any, i: number) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                     : "";
//                 const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduText = edu.text ? cleanQuillHTML(edu.text) : "";
//                 const schoolLocation = [edu.schoolname, edu.location]
//                   .filter(Boolean)
//                   .join("  ·  ");
//                 return `<div class="t16-entry-block" data-block-id="edu-${i}">
//                   <div class="t16-entry-top-row">
//                     <div class="t16-entry-title">${edu.schoolname || ""}</div>
//                     ${dateStr ? `<div class="t16-entry-date">${dateStr}</div>` : ""}
//                   </div>
//                   ${
//                     edu.degree || edu.location || grade
//                       ? `
//                     <div class="t16-entry-subtitle">
//                       ${edu.degree || ""}
//                       ${edu.degree && edu.location ? "  ·  " : ""}
//                       ${edu.location || ""}
//                       ${grade ? `<div class="t16-education-grade">${grade}</div>` : ""}
//                     </div>`
//                       : ""
//                   }
//                   ${eduText ? `<div class="t16-edu-content">${eduText}</div>` : ""}
//                 </div>`;
//               })
//               .join("")}
//            </div>`
//         : "";

//       // Skills
//       // AFTER
//       // Skills
//       const skillsClean = cleanQuillHTML(skills || "");
//       let skillsBlock = "";
//       if (skillsClean && skillsClean !== "<p><br></p>") {
//         if (forPDF && skillsCutIndex >= 0) {
//           const tempDiv = document.createElement("div");
//           tempDiv.innerHTML = skillsClean;
//           const allLis = Array.from(tempDiv.querySelectorAll("li"));
//           if (skillsCutIndex < allLis.length) {
//             const beforeLis = allLis
//               .slice(0, skillsCutIndex)
//               .map((li) => `<li>${li.innerHTML}</li>`)
//               .join("");
//             const afterLis = allLis
//               .slice(skillsCutIndex)
//               .map((li) => `<li>${li.innerHTML}</li>`)
//               .join("");
//             skillsBlock = `<div class="t16-section-block" data-block-id="skills-section">
//           ${sectionHeader("Skills")}
//           <div class="t16-skills-content"><ul>${beforeLis}</ul></div>
//          </div>
//          <div class="t16-page-break"></div>
//          <div class="t16-section-block" data-block-id="skills-section-continued">
//           ${sectionHeader("Skills (continued)")}
//           <div class="t16-skills-content"><ul>${afterLis}</ul></div>
//          </div>`;
//           }
//         }
//         if (!skillsBlock) {
//           skillsBlock = `<div class="t16-section-block" data-block-id="skills-section">
//         ${sectionHeader("Skills")}
//         <div class="t16-skills-content" data-block-id="skills-content">${skillsClean}</div>
//        </div>`;
//         }
//       }

//       // Custom sections
//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map(
//                 (s: any, i: number) => `
//               <div class="t16-section-block" data-block-id="custom-${i}">
//                 ${sectionHeader(s.name || "Additional")}
//                 ${s.description ? `<div class="t16-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//               </div>`,
//               )
//               .join("")
//           : "";

//       // PDF style — only print-color-adjust, never changes layout
//       const pdfStyle = forPDF
//         ? `<style>
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       @page { size: A4; margin: ${MARGIN}px !important; }
//       .t16-resume { width: ${A4_W - MARGIN * 2}px !important; }
//       .t16-resume .t16-header-block,
//       .t16-resume .t16-skills-content,
//       .t16-resume .t16-summary-text,
//       .t16-resume .t16-custom-section-content {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//     </style>`
//         : "";

//       let bodyContent = `${headerBlock}
//         <div class="t16-resume-body">
//           ${summaryBlock}
//           ${expBlock}
//           ${projBlock}
//           ${eduBlock}
//           ${skillsBlock}
//           ${customBlock}
//         </div>`;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t16-page-break";
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
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t16-resume">
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
//       buildCSS,
//     ],
//   );

//   // ── Page splitter ──────────────────────────────────────────────────────────
//   const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t16-resume");
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
//   ${CSS_FOR_MEASURE}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
// .t16-resume {
//   width: ${A4_W - MARGIN * 2}px !important;
//   margin: 0 !important; box-sizing: border-box !important;
// }
//   </style></head>
// <body>${resumeSnapshot}</body></html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t16-resume");
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

//           // Individual items only — NOT section containers
//           const ITEM_SELECTORS = [
//             ".t16-entry-block",
//             ".t16-skills-content",
//             ".t16-summary-text",
//             ".t16-custom-section-content",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el),
//               bottom = getRelBottom(el);
//             if (bottom - top > 8)
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           // Section header + first item paired — prevents orphaned headings
//           resume
//             .querySelectorAll<HTMLElement>(".t16-section-header")
//             .forEach((header) => {
//               const headerTop = getRelTop(header);
//               let firstItem: HTMLElement | null = null;
//               let sib = header.nextElementSibling as HTMLElement | null;
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
//                 if (firstItem.classList.contains("t16-skills-content")) return;

//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".t16-entry-block, .t16-summary-text, .t16-custom-section-content",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - headerTop > 8) {
//                   const sectionId = (header.parentElement as HTMLElement)
//                     ?.dataset?.blockId;
//                   blocks.push({
//                     top: headerTop,
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
//             resume.querySelectorAll<HTMLElement>(".t16-skills-content li"),
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
//   ${CSS_FOR_MEASURE}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
//   .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
//  .page-content-clip {
//   position: absolute; top: ${MARGIN}px; left: ${MARGIN}px;
//   width: ${A4_W - MARGIN * 2}px; height: ${clipH}px; overflow: hidden;
// }
// .page-shift {
//   position: absolute; top: ${-contentOffsetY}px; left: 0;
//   width: ${A4_W - MARGIN * 2}px;
// }
// .t16-resume {
//   width: ${A4_W - MARGIN * 2}px !important;
//   margin: 0 !important;
// }
// </style></head>
// <body>
//   <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
// </body></html>`);
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

//   // ── Debounced updates ──────────────────────────────────────────────────────
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

//   // ── Download ───────────────────────────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     setIsDownloading(true);
//     try {
//       // AFTER
//       const pageBreakIds: string[] = (
//         (window as any).__resumePageBreakIds || []
//       ).filter((id: string) => id !== "skills-section");
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

//   // ── RENDER ─────────────────────────────────────────────────────────────────
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
// //                                                                             relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
// //                                                                             text-white transition-all duration-300 shadow-lg
// //                                                                             ${
// //                                                                               isDownloading
// //                                                                                 ? "bg-gray-400 cursor-not-allowed opacity-80"
// //                                                                                 : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
// //                                                                             }
// //                                                                           `}
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
// //         // THUMBNAIL mode
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
// //         // FULL PREVIEW mode
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

// export default TemplateSixteen;


















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
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateSixteenProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateSixteen: React.FC<TemplateSixteenProps> = ({
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

  const activeFontFamily = customization?.fontFamily ?? "'Jost', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
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

  // ── Font map ───────────────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const fontMap: Record<string, string> = {
      "'Jost', sans-serif":
        "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap",
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
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
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return (
      fontMap[fontFamily] ||
      "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap"
    );
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ────────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 0; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t16-resume {
      width: ${A4_W}px;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      color: #2c2c2c;
      box-sizing: border-box;
    }

    .t16-resume * { box-sizing: border-box; }

    .t16-resume p {
      margin: 0 0 4px 0 !important;
      padding: 0 !important;
      line-height: 1.6 !important;
    }
    .t16-resume p:last-child { margin-bottom: 0 !important; }

    .t16-resume .t16-entry-content ul,
    .t16-resume .t16-entry-content ol,
    .t16-resume .t16-skills-content ul,
    .t16-resume .t16-skills-content ol,
    .t16-resume .t16-edu-content ul,
    .t16-resume .t16-edu-content ol,
    .t16-resume .t16-custom-section-content ul,
    .t16-resume .t16-custom-section-content ol {
      margin: 4px 0 4px 20px !important;
      padding-left: 20px !important;
    }
    .t16-resume .t16-entry-content li,
    .t16-resume .t16-skills-content li,
    .t16-resume .t16-edu-content li,
    .t16-resume .t16-custom-section-content li {
      margin-bottom: 2px !important;
      line-height: 1.6 !important;
    }
    .t16-resume .t16-entry-content ul,
    .t16-resume .t16-skills-content ul,
    .t16-resume .t16-edu-content ul,
    .t16-resume .t16-custom-section-content ul { list-style-type: disc !important; }
    .t16-resume .t16-entry-content ol,
    .t16-resume .t16-skills-content ol,
    .t16-resume .t16-edu-content ol,
    .t16-resume .t16-custom-section-content ol { list-style-type: decimal !important; }
    .t16-resume .t16-entry-content strong,
    .t16-resume .t16-skills-content strong,
    .t16-resume .t16-edu-content strong,
    .t16-resume .t16-custom-section-content strong { font-weight: 600 !important; }
    .t16-resume .t16-entry-content em,
    .t16-resume .t16-skills-content em,
    .t16-resume .t16-edu-content em,
    .t16-resume .t16-custom-section-content em { font-style: italic !important; }
    .t16-resume .t16-entry-content u,
    .t16-resume .t16-skills-content u,
    .t16-resume .t16-edu-content u,
    .t16-resume .t16-custom-section-content u { text-decoration: underline !important; }
    .t16-resume .t16-entry-content p,
    .t16-resume .t16-skills-content p,
    .t16-resume .t16-edu-content p,
    .t16-resume .t16-custom-section-content p { white-space: pre-wrap !important; }

    .t16-resume .t16-skills-content {
      font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
      padding: 12px 16px; background: #ffffff;
      border: 1px solid #ebebeb; border-radius: 4px;
    }

    .t16-resume .t16-custom-section-content {
      font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
      padding: 12px 16px; background: #ffffff;
      border: 1px solid #ebebeb; border-radius: 4px;
    }

    .t16-resume .t16-project-links { display: flex; gap: 15px; }
    .t16-resume .t16-project-link {
      font-size: 10px; font-weight: 500; color: #7a8c96; text-decoration: underline;
    }
    .t16-resume .t16-project-tech-stack { font-size: 11px; color: #888; margin: 6px 0; }

    .t16-resume .t16-header-block {
      background-color: #ffffff;
      padding: 36px 36px 28px;
      border-bottom: 1px solid #e2e2e2;
    }
    .t16-resume .t16-header-accent-line {
      width: 48px; height: 3px; background: #7a8c96; margin-bottom: 18px;
    }
    .t16-resume .t16-header-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px; font-weight: 300; line-height: 1.0;
      letter-spacing: 1px; color: #1a1a1a; margin-bottom: 8px;
    }
    .t16-resume .t16-header-name strong { font-weight: 600; }
    .t16-resume .t16-header-jobtitle {
      font-size: 11px; font-weight: 500; letter-spacing: 3.5px;
      text-transform: uppercase; color: #7a8c96; margin-bottom: 22px;
    }
    .t16-resume .t16-header-meta-grid {
      display: flex; flex-wrap: wrap; gap: 8px 24px;
      font-size: 11.5px; color: #666; font-weight: 300;
    }
    .t16-resume .t16-header-meta-item {
      display: flex; align-items: center; gap: 6px;
    }
    .t16-resume .t16-header-meta-dot {
      width: 3px; height: 3px; border-radius: 50%;
      background: #7a8c96; flex-shrink: 0;
    }
    .t16-resume .t16-header-meta-item a {
      color: #7a8c96; text-decoration: none; border-bottom: 1px solid #c5d0d6;
    }

    .t16-resume .t16-resume-body { padding: 28px 36px 36px; }

    .t16-resume .t16-section-block { margin-bottom: 28px; }
    .t16-resume .t16-section-block:last-child { margin-bottom: 0; }
    .t16-resume .t16-section-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
    }
    .t16-resume .t16-section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; font-weight: 500; color: #1a1a1a;
      letter-spacing: 0.5px; white-space: nowrap;
    }
    .t16-resume .t16-section-ornament {
      color: #7a8c96; font-size: 14px; font-weight: 300; flex-shrink: 0;
    }
    .t16-resume .t16-section-line {
      flex: 1; height: 1px;
      background: linear-gradient(to right, #c8d2d8, transparent);
    }

    .t16-resume .t16-summary-text {
      font-size: 16px; line-height: 1.85; color: #444; font-weight: 300;
      padding: 16px 20px; background: #ffffff;
      border: 1px solid #e8ecee; border-left: 3px solid #7a8c96;
      border-radius: 0 4px 4px 0;
    }

    .t16-resume .t16-entry-block {
      margin-bottom: 20px; padding: 16px 18px;
      background: #ffffff; border: 1px solid #ebebeb; border-radius: 4px;
    }
    .t16-resume .t16-entry-block:last-child { margin-bottom: 0; }
    .t16-resume .t16-entry-top-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 8px; flex-wrap: wrap; margin-bottom: 3px;
    }
    .t16-resume .t16-entry-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.2;
    }
    .t16-resume .t16-entry-date {
      font-size: 10.5px; font-weight: 400; letter-spacing: 1px;
      color: #7a8c96; white-space: nowrap;
      background: #f0f4f6; padding: 3px 10px; border-radius: 20px;
    }
    .t16-resume .t16-entry-subtitle {
      font-size: 11.5px; font-weight: 400; color: #888;
      letter-spacing: 0.5px; margin-bottom: 8px;
    }
    .t16-resume .t16-entry-content {
      font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
    }
    .t16-resume .t16-edu-content {
      font-size: 12.5px; line-height: 1.7; color: #555;
      font-weight: 300; margin-top: 8px;
    }
    .t16-resume .t16-education-grade {
      font-size: 11px; color: #6b7c93; margin-top: 4px; font-weight: 500;
    }

    .t16-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
      .t16-resume {
        width: ${A4_W}px !important;
        box-shadow: none !important;
      }
      .t16-resume .t16-header-block,
      .t16-resume .t16-skills-content,
      .t16-resume .t16-summary-text,
      .t16-resume .t16-custom-section-content {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
  // skillsCutIndex removed — line-level packer splits skills naturally.
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;

      const sectionHeader = (title: string) => `
        <div class="t16-section-header">
          <span class="t16-section-title">${title}</span>
          <span class="t16-section-ornament">&#10022;</span>
          <div class="t16-section-line"></div>
        </div>`;

      const headerBlock = `
        <div class="t16-header-block" data-block-id="header">
          <div class="t16-header-accent-line"></div>
          <div class="t16-header-name">
            ${contact?.firstName || ""} <strong>${contact?.lastName || ""}</strong>
          </div>
          <div class="t16-header-jobtitle">${
            contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""
          }</div>
          <div class="t16-header-meta-grid">
            ${addressParts.length > 0 ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.phone}</span>` : ""}
            ${formattedDob ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${formattedDob}</span>` : ""}
            ${linkedinUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
            ${githubUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
            ${portfolioUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
          </div>
        </div>`;

      const summaryBlock = summary?.trim()
        ? `<div class="t16-section-block" data-block-id="summary">
            ${sectionHeader("Profile")}
            <div class="t16-summary-text">${cleanQuillHTML(summary)}</div>
           </div>`
        : "";

      const expBlock = experiences.length
        ? `<div class="t16-section-block" data-block-id="exp-section">
            ${sectionHeader("Experience")}
            ${experiences
              .map((exp: any, i: number) => {
                const s = formatMonthYear(exp.startDate, false);
                const e = exp.endDate
                  ? formatMonthYear(exp.endDate, false)
                  : "Present";
                const companyLocation = [exp.employer, exp.location]
                  .filter(Boolean)
                  .join("  ·  ");
                return `<div class="t16-entry-block" data-block-id="exp-${i}">
                  <div class="t16-entry-top-row">
                    <div class="t16-entry-title">${exp.jobTitle || ""}</div>
                    <div class="t16-entry-date">${s} – ${e}</div>
                  </div>
                  <div class="t16-entry-subtitle">${companyLocation}</div>
                  ${exp.text ? `<div class="t16-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
                </div>`;
              })
              .join("")}
           </div>`
        : "";

      const projBlock = projects.length
        ? `<div class="t16-section-block" data-block-id="proj-section">
            ${sectionHeader("Projects")}
            ${projects
              .map(
                (p: any, i: number) => `
              <div class="t16-entry-block" data-block-id="proj-${i}">
                <div class="t16-entry-top-row">
                  <div class="t16-entry-title">${p.title || ""}</div>
                  <div class="t16-project-links">
                    ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t16-project-link">Live Demo</a>` : ""}
                    ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t16-project-link">GitHub</a>` : ""}
                  </div>
                </div>
                ${p.techStack?.length ? `<div class="t16-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                ${p.description ? `<div class="t16-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
              </div>`,
              )
              .join("")}
           </div>`
        : "";

      const eduBlock = educations.length
        ? `<div class="t16-section-block" data-block-id="edu-section">
            ${sectionHeader("Education")}
            ${educations
              .map((edu: any, i: number) => {
                const dateStr =
                  edu.startDate || edu.endDate
                    ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                    : "";
                const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                const eduText = edu.text ? cleanQuillHTML(edu.text) : "";
                const schoolLocation = [edu.schoolname, edu.location]
                  .filter(Boolean)
                  .join("  ·  ");
                return `<div class="t16-entry-block" data-block-id="edu-${i}">
                  <div class="t16-entry-top-row">
                    <div class="t16-entry-title">${edu.schoolname || ""}</div>
                    ${dateStr ? `<div class="t16-entry-date">${dateStr}</div>` : ""}
                  </div>
                  ${
                    edu.degree || edu.location || grade
                      ? `
                    <div class="t16-entry-subtitle">
                      ${edu.degree || ""}
                      ${edu.degree && edu.location ? "  ·  " : ""}
                      ${edu.location || ""}
                      ${grade ? `<div class="t16-education-grade">${grade}</div>` : ""}
                    </div>`
                      : ""
                  }
                  ${eduText ? `<div class="t16-edu-content">${eduText}</div>` : ""}
                </div>`;
              })
              .join("")}
           </div>`
        : "";

      const skillsClean = cleanQuillHTML(skills || "");
      const skillsBlock =
        skillsClean && skillsClean !== "<p><br></p>"
          ? `<div class="t16-section-block" data-block-id="skills-section">
        ${sectionHeader("Skills")}
        <div class="t16-skills-content" data-block-id="skills-content">${skillsClean}</div>
       </div>`
          : "";

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
              <div class="t16-section-block" data-block-id="custom-${i}">
                ${sectionHeader(s.name || "Additional")}
                ${s.description ? `<div class="t16-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
              </div>`,
              )
              .join("")
          : "";

      const pdfStyle = forPDF
        ? `<style>
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      @page { size: A4; margin: ${MARGIN}px !important; }
      .t16-resume { width: ${A4_W - MARGIN * 2}px !important; }
      .t16-resume .t16-header-block,
      .t16-resume .t16-skills-content,
      .t16-resume .t16-summary-text,
      .t16-resume .t16-custom-section-content {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    </style>`
        : "";

      let bodyContent = `${headerBlock}
        <div class="t16-resume-body">
          ${summaryBlock}
          ${expBlock}
          ${projBlock}
          ${eduBlock}
          ${skillsBlock}
          ${customBlock}
        </div>`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t16-page-break";
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
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t16-resume">
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
      buildCSS,
    ],
  );

  // ── Page splitter (TemplateOne's line-level engine, adapted for t16-*) ───
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t16-resume");
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
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t16-resume { width: ${A4_W - MARGIN * 2}px !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t16-resume");
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
            ".t16-entry-top-row",
            ".t16-section-header",
          ].join(", ");

          // Sits right after a header row but outside it — keep chained.
          const CHAINED_KEEP_SELECTOR = [".t16-entry-subtitle"].join(", ");

          // Whole, never split, but fine sitting alone at page bottom.
          const ATOMIC_SELECTOR = [
            ".t16-header-block",
            ".t16-project-tech-stack",
            ".t16-education-grade",
          ].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".t16-summary-text",
            ".t16-entry-content",
            ".t16-edu-content",
            ".t16-skills-content",
            ".t16-custom-section-content",
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
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: ${MARGIN}px; width: ${A4_W - MARGIN * 2}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W - MARGIN * 2}px; }
  .t16-resume { width: ${A4_W - MARGIN * 2}px !important; margin: 0 !important; }
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
    [CSS_FOR_MEASURE],
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

  // ── Download ───────────────────────────────────────────────────────────────
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

  // ── RENDER ─────────────────────────────────────────────────────────────────
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

export default TemplateSixteen;