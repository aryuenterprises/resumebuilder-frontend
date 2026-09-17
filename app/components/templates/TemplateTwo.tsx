// "use client";
// import React, {
//   useContext,
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
//   formatSocialLink,
// } from "@/app/utils";
// import { ResumeProps } from "@/app/types";
// import api from "@/app/utils/api";
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { FaDownload, FaSpinner } from "react-icons/fa";
// import apiClient from "@/app/utils/apiClient";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateTwoProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?: boolean;
// }

// const TemplateTwo: React.FC<TemplateTwoProps> = ({
//   alldata,
//   customization,
//   viewMode = false,
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const measureIframeRef = useRef<HTMLIFrameElement | null>(null);
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
//       if (!contact.photo) {
//         setBase64Image(null);
//         return;
//       }

//       try {
//         // Handle base64 string from API
//         if (typeof contact.photo === "string") {
//           // Check if it's a blob URL
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           }
//           // Check if it's already a complete data URL
//           else if (contact.photo.startsWith("data:image/")) {
//             setBase64Image(contact.photo);
//           }
//           // Check if it's a file path
//           else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         }
//         // Handle File/Blob object
//         else if (
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

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

//   // ── Font map ────────────────────────────────────────────────────────────────
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
//         "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght=400;700&display=swap",
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

//   const getFontLinkTag = (fontFamily: string): string => {
//     const url = getFontImport(fontFamily);
//     if (!url) return "";
//     return `<link rel="stylesheet" href="${url}"/>`;
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder (NO @import — font via <link>) ─────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
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
//       flex-wrap: wrap;
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
//     }
//     .t2-resume .entry-top-row {
//       display: flex; justify-content: space-between;
//       align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
//       page-break-after: avoid; break-after: avoid;
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
//   const href = (url: string) =>
//     url.startsWith("http") ? url : `https://${url}`;

//   const rich = (html: string) => {
//     const c = cleanQuillHTML(html);
//     return c && c !== "<p><br></p>" ? c : "";
//   };

//   // ── HTML builder ───────────────────────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false): string => {
//       const CSS = buildCSS(activeFontFamily);

//       const formDob = formatDateOfBirth(dateOfBirth || "");
//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

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
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn: ${formatSocialLink(linkedinUrl, "linkedin")}</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub: ${formatSocialLink(githubUrl, "github")}</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">${formatSocialLink(portfolioUrl, "portfolio")}</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//       // Section builders
//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `<div class="summary-block" data-block-id="summary">
//           <div class="section-title">Summary</div>
//           <div class="summary-text">${rich(summary)}</div>
//         </div>`
//             : "",

//         skills: () => {
//           const skillsClean = rich(skills || "");
//           if (!skillsClean) return "";
//           return `<div class="skills-block" data-block-id="skills-section">
//             <div class="section-title">Skills</div>
//             <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//           </div>`;
//         },

//         custom: () =>
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           )
//             ? `<div class="custom-section-block" data-block-id="custom-section">
//             ${finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map(
//                 (s: any, i: number) => `
//               <div style="margin-bottom:6px" data-block-id="custom-${i}">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>
//             `,
//               )
//               .join("")}
//           </div>`
//             : "",

//         experience: () =>
//           experiences.length
//             ? `<div data-block-id="exp-section">
//           <div class="section-title">Experience</div>
//           ${experiences
//             .map((exp: any, i: number) => {
//               const start = formatMonthYear(exp.startDate, false);
//               const end = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : exp.isCurrentlyWorking
//                   ? "Present"
//                   : "";
//               return `<div class="entry-block" data-block-id="exp-${i}">
//               <div class="entry-top-row">
//                 ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//                 <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//               </div>
//               ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//               ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//             </div>`;
//             })
//             .join("")}
//         </div>`
//             : "",

//         projects: () =>
//           projects.length
//             ? `<div style="margin-top:6px" data-block-id="proj-section">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (p: any, i: number) => `
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
//           `,
//             )
//             .join("")}
//         </div>`
//             : "",

//         education: () =>
//           educations.length
//             ? `<div style="margin-top:6px" data-block-id="edu-section">
//           <div class="section-title">Education</div>
//           ${educations
//             .map((edu: any, i: number) => {
//               const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//               const dateStr = [edu.startDate, edu.endDate ? edu.endDate : edu.isCurrentlyStudying ? "Present" : ""]
//                 .filter(Boolean)
//                 .join(" - ");
//               return `<div class="entry-block" data-block-id="edu-${i}">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.degree || ""}</div>
//                 ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//               </div>
//               ${
//                 edu.schoolname || edu.location || grade
//                   ? `
//                 <div class="entry-subtitle">
//                   ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//                 </div>`
//                   : ""
//               }
//               ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//             </div>`;
//             })
//             .join("")}
//         </div>`
//             : "",
//       };

//       // Build left and right columns
//       const leftSections: string[] = ["summary", "skills", "custom"];
//       const rightSections: string[] = ["experience", "projects", "education"];

//       const orderedLeft = leftSections
//         .filter((key) =>
//           sectionBuilders[key as keyof typeof sectionBuilders]?.(),
//         )
//         .map((key) => sectionBuilders[key as keyof typeof sectionBuilders]())
//         .join("");

//       const orderedRight = rightSections
//         .filter((key) =>
//           sectionBuilders[key as keyof typeof sectionBuilders]?.(),
//         )
//         .map((key) => sectionBuilders[key as keyof typeof sectionBuilders]())
//         .join("");

//       const pdfStyle = forPDF
//         ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   ${getFontLinkTag(activeFontFamily)}
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

//   // ── PDF builder (clip/shift — matches preview exactly) ─────────────────────
//   const buildPDFPagesHTML = useCallback(
//     (pageStarts: number[], totalH: number, resumeSnapshot: string): string => {
//       const CSS = buildCSS(activeFontFamily);

//       let pagesBody = "";
//       for (let i = 0; i < pageStarts.length; i++) {
//         const contentOffsetY = pageStarts[i];
//         const nextStart = pageStarts[i + 1] ?? totalH;
//         const clipH = nextStart - contentOffsetY;
//         const isLastPage = i === pageStarts.length - 1;

//         pagesBody += `
//     <div class="pdf-page" style="position:relative;width:${A4_W}px;height:${A4_H}px;overflow:hidden;background:white;${!isLastPage ? "page-break-after:always;break-after:page;" : ""}">
//       <div style="position:absolute;top:${MARGIN}px;left:0;width:${A4_W}px;height:${clipH}px;overflow:hidden;">
//         <div style="position:absolute;top:${-contentOffsetY}px;left:0;width:${A4_W}px;">
//           ${resumeSnapshot}
//         </div>
//       </div>
//     </div>`;
//       }

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume</title>
//   ${getFontLinkTag(activeFontFamily)}
//   <style>
//     ${CSS}
//     @page { size: A4; margin: 0; }
//     html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
//     .t2-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
//     .pdf-page { page-break-inside: avoid; }
//   </style>
// </head>
// <body style="margin:0;padding:0;background:white;">
//   ${pagesBody}
// </body>
// </html>`;
//     },
//     [buildCSS, activeFontFamily],
//   );

//   // ── Memoized CSS & font link for measurement ───────────────────────────────
//   const CSS_FOR_MEASURE = useMemo(
//     () => buildCSS(activeFontFamily),
//     [buildCSS, activeFontFamily],
//   );
//   const FONT_LINK_TAG = useMemo(
//     () => getFontLinkTag(activeFontFamily),
//     [activeFontFamily],
//   );

//   // ── Page splitter (same line-box logic as TemplateOne) ─────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

//         // ── Reuse or create measurement iframe ────────────────────────────
//         let iframe = measureIframeRef.current;
//         if (!iframe || !document.body.contains(iframe)) {
//           iframe = document.createElement("iframe");
//           iframe.style.cssText = [
//             "position:fixed",
//             "top:0",
//             "left:-9999px",
//             `width:${A4_W}px`,
//             "height:10000px",
//             "border:none",
//             "opacity:0",
//             "pointer-events:none",
//             "z-index:-1",
//           ].join(";");
//           document.body.appendChild(iframe);
//           measureIframeRef.current = iframe;
//         }

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html><head><meta charset="UTF-8"/>
//  ${FONT_LINK_TAG}
// <style>
//   ${CSS_FOR_MEASURE}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
//   .t2-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
// </style></head>
// <body>${resumeSnapshot}</body></html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
//           if (!resume) {
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

//           // ── Build atomic "units" (same logic as TemplateOne) ──────────
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

//           const HEADER_LIKE_SELECTOR = [
//             ".entry-top-row",
//             ".section-title",
//             ".entry-title",
//           ].join(", ");

//           const ATOMIC_SELECTOR = [
//             ".project-tech-stack",
//             ".header-links",
//             ".header-wrap",
//           ].join(", ");

//           const DESC_WRAPPER_SELECTOR = [
//             ".summary-text",
//             ".skills-content",
//             ".entry-content",
//             ".custom-section-content",
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
//               if (
//                 el.matches(DESC_WRAPPER_SELECTOR) &&
//                 !el.querySelector("p, li")
//               ) {
//                 if (pushLines(el)) consumed.add(el);
//               }
//             },
//           );

//           // Remaining single-line leaves
//           resume
//             .querySelectorAll<HTMLElement>(
//               ".header-name, .header-address, .header-email, .header-phone, .header-dob, .entry-subtitle, .education-grade",
//             )
//             .forEach((el) => {
//               if (consumed.has(el)) return;
//               pushAtomic(el, false);
//               consumed.add(el);
//             });

//           units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

//           const totalH = resume.scrollHeight;

//           // ── Greedily pack units into pages ───────────────────────────
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

//           // ── Store data for PDF generation ────────────────────────────
//           (window as any).__resumePageBreakIds = pageBreakIds.filter(Boolean);
//           (window as any).__resumePageStarts = pageStarts;
//           (window as any).__resumeTotalH = totalH;
//           (window as any).__resumeSnapshot = resumeSnapshot;

//           // ── Build per-page HTML ──────────────────────────────────────
//           const pageHtmls: string[] = [];
//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;
//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en"><head><meta charset="UTF-8"/>
//  ${FONT_LINK_TAG}
// <style>
//   ${CSS_FOR_MEASURE}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
//   .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
//   .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
//   .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
//   .t2-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
// </style></head>
// <body>
//   <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
// </body></html>`);
//           }
//           resolve(pageHtmls);
//         };

//         // ── Smart font wait ────────────────────────────────────────────
//         const mainFontsReady =
//           typeof document !== "undefined" &&
//           document.fonts?.status === "loaded";
//         const win = iframe!.contentWindow as any;

//         if (mainFontsReady) {
//           requestAnimationFrame(() => requestAnimationFrame(doMeasure));
//         } else if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => requestAnimationFrame(doMeasure));
//         } else {
//           setTimeout(doMeasure, 150);
//         }
//       });
//     },
//     [CSS_FOR_MEASURE, FONT_LINK_TAG],
//   );

//   // ── Debounced updates (60ms) ───────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 60);
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

//   // ── Cleanup measurement iframe on unmount ─────────────────────────────────
//   useEffect(() => {
//     return () => {
//       if (
//         measureIframeRef.current &&
//         document.body.contains(measureIframeRef.current)
//       ) {
//         document.body.removeChild(measureIframeRef.current);
//         measureIframeRef.current = null;
//       }
//     };
//   }, []);

//   // ── Download handler ──────────────────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     setIsDownloading(true);
//     try {
//       const storedPageStarts: number[] | undefined = (window as any)
//         .__resumePageStarts;
//       const storedTotalH: number | undefined = (window as any).__resumeTotalH;
//       const storedSnapshot: string | undefined = (window as any)
//         .__resumeSnapshot;

//       let pdfHtml: string;

//       if (storedPageStarts?.length && storedTotalH && storedSnapshot) {
//         pdfHtml = buildPDFPagesHTML(
//           storedPageStarts,
//           storedTotalH,
//           storedSnapshot,
//         );
//       } else {
//         pdfHtml = generateHTML(true);
//       }

//       const res: AxiosResponse<Blob> = await apiClient.post(
//         `/candidates/generate-pdf`,
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
//       {/* ── Font preconnect ──────────────────────────────────────────────── */}
//       <link rel="preconnect" href="https://fonts.googleapis.com" />
//       <link
//         rel="preconnect"
//         href="https://fonts.gstatic.com"
//         crossOrigin="anonymous"
//       />

//       {/* ── Download button ──────────────────────────────────────────────── */}
//       {!isThumbnail && lastSegment === "download-resume" && (
//         <div className="text-center my-8">
//           <motion.button
//             onClick={handleDownload}
//             disabled={isDownloading}
//             whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//             whileTap={!isDownloading ? { scale: 0.98 } : {}}
//             className={`
//             relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//             text-white transition-all duration-300 shadow-lg
//             ${
//               isDownloading
//                 ? "bg-gray-400 cursor-not-allowed opacity-80"
//                 : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
//             }
//           `}
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
//                   <span className="text-sm opacity-75 font-light ml-1">
//                     PDF
//                   </span>
//                 </>
//               )}
//             </div>
//           </motion.button>
//         </div>
//       )}
//       {isThumbnail ? (
//         // ── THUMBNAIL MODE ──────────────────────────────────────────────
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
//         // ── FULL PREVIEW MODE ──────────────────────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {pages.length > 0 ? (
//             // ── Paginated view ────────────────────────────────────────
//             pages.map((pageHtml, idx) => (
//               <div key={idx} style={{ marginBottom: "28px" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: "10px",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       flex: 1,
//                       height: "1px",
//                       background: "#d1d5db",
//                     }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "11px",
//                       fontWeight: 600,
//                       color: "#6b7280",
//                       whiteSpace: "nowrap",
//                       padding: "3px 12px",
//                       background: "#f3f4f6",
//                       borderRadius: "999px",
//                       border: "1px solid #e5e7eb",
//                       letterSpacing: "0.05em",
//                       fontFamily: "system-ui, sans-serif",
//                     }}
//                   >
//                     Page {idx + 1}
//                     {pages.length > 1 ? ` of ${pages.length}` : ""}
//                   </span>
//                   <div
//                     style={{
//                       flex: 1,
//                       height: "1px",
//                       background: "#d1d5db",
//                     }}
//                   />
//                 </div>
//                 <div
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     overflow: "hidden",
//                     background: "white",
//                     boxShadow:
//                       "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                     borderRadius: "2px",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <iframe
//                     title={`resume-page-${idx + 1}`}
//                     srcDoc={pageHtml}
//                     style={{
//                       width: `${A4_W}px`,
//                       height: `${A4_H}px`,
//                       border: "none",
//                       display: "block",
//                       pointerEvents: "none",
//                     }}
//                     scrolling="no"
//                     sandbox="allow-same-origin allow-scripts"
//                   />
//                 </div>
//               </div>
//             ))
//           ) : htmlContent ? (
//             // ── Instant preview while paginating ──────────────────────
//             <div>
//               <div
//                 style={{
//                   width: `${A4_W}px`,
//                   height: `${A4_H}px`,
//                   overflow: "hidden",
//                   background: "white",
//                   boxShadow:
//                     "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <iframe
//                   title="resume-loading-preview"
//                   srcDoc={htmlContent}
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     border: "none",
//                     display: "block",
//                   }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//               <div
//                 style={{
//                   textAlign: "center",
//                   padding: "12px",
//                   color: "#9ca3af",
//                   fontSize: "13px",
//                   fontFamily: "system-ui, sans-serif",
//                 }}
//               >
//                 Formatting pages…
//               </div>
//             </div>
//           ) : null}
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
  useState,
  useEffect,
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
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaDownload, FaSpinner } from "react-icons/fa";
import apiClient from "@/app/utils/apiClient";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS (Standard 96 DPI Print Ratio)
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px usable vertical area

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

  const measureRef = useRef<HTMLDivElement>(null);
  const [pageOffsets, setPageOffsets] = useState<number[]>([0]);

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
        if (typeof contact.photo === "string") {
          if (contact.photo.startsWith("blob:")) {
            const res = await fetch(contact.photo);
            const blob = await res.blob();
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result as string);
            reader.readAsDataURL(blob);
          } else if (contact.photo.startsWith("data:image/")) {
            setBase64Image(contact.photo);
          } else {
            setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
          }
        } else if (
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

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  const href = (url: string) =>
    url?.startsWith("http") ? url : `https://${url}`;

  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── Exact Visual CSS ────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    .t2-resume-body {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      box-sizing: border-box;
    }

    .t2-resume-body div, .t2-resume-body span, .t2-resume-body i, .t2-resume-body a,
    .t2-resume-body p, .t2-resume-body li, .t2-resume-body strong, .t2-resume-body b {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }
    .t2-resume-body p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t2-resume-body ul, .t2-resume-body ol { margin: 0 0 0 20px !important; padding: 0 !important; }
    .t2-resume-body ul  { list-style-type: disc !important; }
    .t2-resume-body ol  { list-style-type: decimal !important; }
    .t2-resume-body li  {
      margin-bottom: 1px !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
    }
    .t2-resume-body strong, .t2-resume-body b { font-weight: 700 !important; }
    .t2-resume-body em, .t2-resume-body i     { font-style: italic !important; }
    .t2-resume-body u                    { text-decoration: underline !important; }

    /* Header */


     .t2-resume-body .header-photo-col {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .t2-resume-body .header-photo {
      width: 100px; height: 100px;
      border-radius: 6px; object-fit: cover;
      border: 1px solid #e5e7eb;
    }

    .t2-resume-body .header-wrap {
  display: flex;
  background-color: #EADCCE;
  padding: 14px 18px 16px 18px !important; /* Explicit bottom padding */
  border-bottom: 1px solid #d1d5db;
  gap: 16px;
  min-height: 80px; /* Enforce stable minimum container height */
  box-sizing: border-box !important;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.t2-resume-body .header-info-col {
  flex: 1;
  padding-right: 12px;
  display: block !important; /* Prevents flex-centering from collapsing container bottom */
}

.t2-resume-body .header-address, 
.t2-resume-body .header-email,
.t2-resume-body .header-phone,   
.t2-resume-body .header-dob {
  font-size: 11px;
  color: #374151;
  line-height: 1.5;
  margin: 0 0 2px 0 !important;
}

.t2-resume-body .header-links {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 4px;
}
    .t2-resume-body .header-link {
      font-size: 12px; font-weight: 700;
      color: #000 !important; text-decoration: underline !important;
      text-underline-offset: 3px; white-space: nowrap; display: inline-block;
    }

    /* Body two-column */
    .t2-resume-body .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
    .t2-resume-body .left-col  { width: 40%; padding: 8px 0 8px 18px; }
    .t2-resume-body .col-divider {
      width: 1px; border-left: 1px solid #d1d5db;
      margin: 8px 4px; flex-shrink: 0;
    }
    .t2-resume-body .right-col { width: 60%; padding: 8px 18px 8px 0; }

    /* Section titles */
    .t2-resume-body .section-title {
      font-size: 13px; font-weight: 700;
      text-decoration: underline; text-underline-offset: 3px;
      text-decoration-thickness: 2px; text-decoration-color: #1f2937;
      letter-spacing: 0.03em; text-transform: uppercase;
      color: #111827; margin-bottom: 4px; margin-top: 12px;
      line-height: 1.5;
    }
    .t2-resume-body .section-title:first-child { margin-top: 0; }

    /* Summary */
    .t2-resume-body .summary-block { margin-bottom: 6px; }
    .t2-resume-body .summary-text  {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    /* Skills */
    .t2-resume-body .skills-block   { margin-bottom: 8px; }
    .t2-resume-body .skills-content { margin-top: 4px; }
    .t2-resume-body .skills-content ul, .t2-resume-body .skills-content ol { margin: 4px 0 4px 20px !important; }
    .t2-resume-body .skills-content li { margin-bottom: 2px !important; }
    .t2-resume-body .skills-content p  { margin: 0 0 4px 0 !important; }

    /* Projects */
    .t2-resume-body .project-links {
      display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center;
    }
    .t2-resume-body .project-link {
      font-size: 10px; color: #6b7280 !important;
      text-decoration: underline !important;
      white-space: nowrap; display: inline-block;
    }
    .t2-resume-body .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

    /* Entry blocks */
    .t2-resume-body .entry-block {
      margin-bottom: 6px;
    }
    .t2-resume-body .entry-top-row {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
    }
    .t2-resume-body .entry-title {
      font-size: 11.5px; font-weight: 700; font-style: italic;
      color: #111827; line-height: 1.5; flex: 1; min-width: 0;
    }
    .t2-resume-body .entry-date {
      font-size: 11.5px; font-weight: 700; color: #111827;
      line-height: 1.5; white-space: nowrap; flex-shrink: 0;
    }
    .t2-resume-body .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
    .t2-resume-body .entry-content  {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .t2-resume-body .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

    /* Custom sections */
    .t2-resume-body .custom-section-block   { margin: 6px 0; }
    .t2-resume-body .custom-section-content {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }
  `,
    [],
  );

  // ── Unified Reusable TemplateTwo DOM Tree ──────────────────────────────────
  const renderResumeContent = () => {
    const formDob = formatDateOfBirth(dateOfBirth || "");
    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postCode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const hasSkillsClean = rich(skills || "");

    return (
      <div className="t2-resume-body">
        {/* Header */}
        <div className="header-wrap" data-block-id="header">
          {base64Image && (
            <div className="header-photo-col">
              <img src={base64Image} alt="Profile" className="header-photo" />
            </div>
          )}
          <div className="header-info-col">
            <div className="header-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {addressStr && <div className="header-address">{addressStr}</div>}
            {contact?.email && (
              <div className="header-email">{contact.email}</div>
            )}
            {contact?.phone && (
              <div className="header-phone">{contact.phone}</div>
            )}
            {formDob && <div className="header-dob">{formDob}</div>}
            <div className="header-links">
              {linkedinUrl?.trim() && (
                <a
                  href={href(linkedinUrl)}
                  className="header-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn: {formatSocialLink(linkedinUrl, "linkedin")}
                </a>
              )}
              {githubUrl?.trim() && (
                <a
                  href={href(githubUrl)}
                  className="header-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub: {formatSocialLink(githubUrl, "github")}
                </a>
              )}
              {portfolioUrl?.trim() && (
                <a
                  href={href(portfolioUrl)}
                  className="header-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {formatSocialLink(portfolioUrl, "portfolio")}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Two-Column Body Wrap */}
        <div className="body-wrap">
          {/* Left Column */}
          <div className="left-col">
            {/* Summary */}
            {summary?.trim() && (
              <div className="summary-block" data-block-id="summary">
                <div className="section-title">Summary</div>
                <div
                  className="summary-text"
                  dangerouslySetInnerHTML={{ __html: rich(summary) }}
                />
              </div>
            )}

            {/* Skills */}
            {hasSkillsClean && (
              <div className="skills-block" data-block-id="skills-section">
                <div className="section-title">Skills</div>
                <div
                  className="skills-content"
                  data-block-id="skills-content"
                  dangerouslySetInnerHTML={{ __html: hasSkillsClean }}
                />
              </div>
            )}

            {/* Custom Sections */}
            {!Array.isArray(finalize) &&
              Array.isArray(finalize?.customSection) &&
              finalize.customSection.some(
                (s: any) => s?.name?.trim() || s?.description?.trim(),
              ) && (
                <div
                  className="custom-section-block"
                  data-block-id="custom-section"
                >
                  {finalize.customSection
                    .filter(
                      (s: any) => s?.name?.trim() || s?.description?.trim(),
                    )
                    .map((s: any, i: number) => (
                      <div
                        key={i}
                        style={{ marginBottom: "6px" }}
                        data-block-id={`custom-${i}`}
                      >
                        {s.name && (
                          <div className="section-title">{s.name}</div>
                        )}
                        {s.description && (
                          <div
                            className="custom-section-content"
                            dangerouslySetInnerHTML={{
                              __html: rich(s.description),
                            }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
          </div>

          {/* Column Divider */}
          <div className="col-divider" />

          {/* Right Column */}
          <div className="right-col">
            {/* Experience */}
            {experiences.length > 0 && (
              <div data-block-id="exp-section">
                <div className="section-title">Experience</div>
                {experiences.map((exp: any, i: number) => {
                  const start = formatMonthYear(exp.startDate, false);
                  const end = exp.endDate
                    ? formatMonthYear(exp.endDate, false)
                    : exp.isCurrentlyWorking
                      ? "Present"
                      : "";
                  return (
                    <div
                      key={i}
                      className="entry-block"
                      data-block-id={`exp-${i}`}
                    >
                      <div className="entry-top-row">
                        {exp.jobTitle ? (
                          <div className="entry-title">{exp.jobTitle}</div>
                        ) : (
                          <div />
                        )}
                        <div className="entry-date">
                          {start}
                          {start && end ? " - " : ""}
                          {end}
                        </div>
                      </div>
                      {(exp.employer || exp.location) && (
                        <div className="entry-subtitle">
                          {[exp.employer, exp.location]
                            .filter(Boolean)
                            .join(" - ")}
                        </div>
                      )}
                      {exp.text && (
                        <div
                          className="entry-content"
                          dangerouslySetInnerHTML={{ __html: rich(exp.text) }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div style={{ marginTop: "6px" }} data-block-id="proj-section">
                <div className="section-title">Projects</div>
                {projects.map((p: any, i: number) => (
                  <div
                    key={i}
                    className="entry-block"
                    data-block-id={`proj-${i}`}
                  >
                    <div className="entry-top-row">
                      <div className="entry-title">{p.title || ""}</div>
                      <div className="project-links">
                        {p.liveUrl && (
                          <a
                            href={href(p.liveUrl)}
                            className="project-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live Demo
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={href(p.githubUrl)}
                            className="project-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    {p.techStack?.length > 0 && (
                      <div className="project-tech-stack">
                        <strong>Tech:</strong> {p.techStack.join(" , ")}
                      </div>
                    )}
                    {p.description && (
                      <div
                        className="entry-content"
                        dangerouslySetInnerHTML={{
                          __html: rich(p.description),
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {educations.length > 0 && (
              <div style={{ marginTop: "6px" }} data-block-id="edu-section">
                <div className="section-title">Education</div>
                {educations.map((edu: any, i: number) => {
                  const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                  const dateStr = [
                    edu.startDate,
                    edu.endDate
                      ? edu.endDate
                      : edu.isCurrentlyStudying
                        ? "Present"
                        : "",
                  ]
                    .filter(Boolean)
                    .join(" - ");
                  return (
                    <div
                      key={i}
                      className="entry-block"
                      data-block-id={`edu-${i}`}
                    >
                      <div className="entry-top-row">
                        <div className="entry-title">{edu.degree || ""}</div>
                        {dateStr ? (
                          <div className="entry-date">{dateStr}</div>
                        ) : (
                          <div />
                        )}
                      </div>
                      {(edu.schoolname || edu.location || grade) && (
                        <div className="entry-subtitle">
                          {[edu.schoolname, edu.location]
                            .filter(Boolean)
                            .join(" - ")}
                          {grade ? ` • ${grade}` : ""}
                        </div>
                      )}
                      {edu.text && (
                        <div
                          className="entry-content"
                          dangerouslySetInnerHTML={{ __html: rich(edu.text) }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── Precision DOM Pagination Calculator ─────────────────────────────────────
  const calculatePagination = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;

    const resumeEl = el.querySelector<HTMLElement>(".t2-resume-body");
    if (!resumeEl) return;

    // Force layout flush so bounding rects are accurate
    void resumeEl.offsetHeight;

    const resumeRect = resumeEl.getBoundingClientRect();
    const totalH = resumeEl.scrollHeight;

    // If total content fits on a single A4 page
    if (totalH <= PAGE_CONTENT_H) {
      setPageOffsets([0]);
      return;
    }

    const selectors = [
      ".header-wrap",
      ".section-title",
      ".entry-block",
      ".summary-block",
      ".skills-block",
      ".custom-section-block > div",
    ].join(", ");

    const blocks = Array.from(
      resumeEl.querySelectorAll<HTMLElement>(selectors),
    );
    const offsets: number[] = [0];
    let currentStart = 0;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const rect = block.getBoundingClientRect();
      const relativeTop = rect.top - resumeRect.top;
      const relativeBottom = rect.bottom - resumeRect.top;

      if (relativeBottom - currentStart > PAGE_CONTENT_H) {
        let breakIndex = i;

        // Prevent orphan section titles
        if (
          breakIndex > 0 &&
          blocks[breakIndex - 1].classList.contains("section-title") &&
          blocks[breakIndex - 1].getBoundingClientRect().top - resumeRect.top >=
            currentStart
        ) {
          breakIndex--;
        }

        const targetTop =
          blocks[breakIndex].getBoundingClientRect().top - resumeRect.top;
        currentStart = targetTop > currentStart ? targetTop : relativeTop;
        offsets.push(currentStart);
        i = breakIndex;
      }
    }

    // Safety fallback
    if (offsets.length === 1 && totalH > PAGE_CONTENT_H) {
      let cursor = 0;
      const fallbackOffsets: number[] = [0];
      while (cursor + PAGE_CONTENT_H < totalH) {
        cursor += PAGE_CONTENT_H;
        fallbackOffsets.push(cursor);
      }
      setPageOffsets(fallbackOffsets);
      return;
    }

    setPageOffsets((prev) => {
      if (
        prev.length === offsets.length &&
        prev.every((val, idx) => Math.abs(val - offsets[idx]) < 2)
      ) {
        return prev;
      }
      return offsets;
    });
  }, []);

  // Recalculate on form input changes & when fonts/images finish loading
  useEffect(() => {
    const timer = setTimeout(calculatePagination, 120);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => calculatePagination());
    }

    return () => clearTimeout(timer);
  }, [
    calculatePagination,
    contact,
    educations,
    experiences,
    skills,
    projects,
    finalize,
    summary,
    activeFontFamily,
    base64Image,
  ]);

  // ── Multi-Page PDF Download Handler ─────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    if (!measureRef.current) return;
    setIsDownloading(true);

    try {
      const resumeSnapshot =
        measureRef.current.querySelector(".t2-resume-body")?.outerHTML || "";
      const fontUrl = getFontImport(activeFontFamily);
      const cssStyles = buildCSS(activeFontFamily);
      const totalH =
        measureRef.current.querySelector(".t2-resume-body")?.scrollHeight ||
        A4_H;

      let pagesBody = "";
      // Inside handleDownload in TemplateTwo.tsx:
      for (let i = 0; i < pageOffsets.length; i++) {
        const contentOffsetY = pageOffsets[i];
        const nextStart = pageOffsets[i + 1] ?? totalH;
        // Use PAGE_CONTENT_H for a full page frame rather than tight scrollHeight truncation
        const clipH =
          pageOffsets.length === 1
            ? PAGE_CONTENT_H
            : nextStart - contentOffsetY;
        const isLastPage = i === pageOffsets.length - 1;

        pagesBody += `
    <div class="pdf-page" style="position:relative;width:${A4_W}px;height:${A4_H}px;overflow:hidden;background:white;${
      !isLastPage ? "page-break-after:always;break-after:page;" : ""
    }">
      <div style="position:absolute;top:${MARGIN}px;left:0;width:${A4_W}px;height:${clipH}px;overflow:hidden;">
        <div style="position:absolute;top:${-contentOffsetY}px;left:0;width:${A4_W}px;">
          ${resumeSnapshot}
        </div>
      </div>
    </div>`;
      }

      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontUrl ? `<link rel="stylesheet" href="${fontUrl}"/>` : ""}
  <style>
    ${cssStyles}
    @page { size: A4; margin: 0; }
    html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
    .pdf-page { page-break-inside: avoid; }
  </style>
</head>
<body style="margin:0;padding:0;background:white;">
  ${pagesBody}
</body>
</html>`;

      const res: AxiosResponse<Blob> = await apiClient.post(
        `/candidates/generate-pdf`,
        { html: fullHtml },
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
      {getFontImport(activeFontFamily) && (
        <link rel="stylesheet" href={getFontImport(activeFontFamily)} />
      )}
      <style>{buildCSS(activeFontFamily)}</style>

      {/* ── Offscreen In-Memory Measure Container (Standard React DOM) ── */}
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "-9999px",
          width: `${A4_W}px`,
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -999,
        }}
      >
        {renderResumeContent()}
      </div>

      {/* ── Download Button ──────────────────────────────────────────────── */}
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

      {/* ── Screen Page Previews (Pure React Cards, Zero Iframes) ────────── */}
      <div
        style={
          isThumbnail
            ? {
                width: `${A4_W}px`,
                height: `${A4_H}px`,
                transform: "scale(0.36)",
                transformOrigin: "top left",
                overflow: "hidden",
                pointerEvents: "none",
                flexShrink: 0,
              }
            : {
                width: `${A4_W}px`,
                margin: "0 auto",
                paddingBottom: "40px",
              }
        }
      >
        {pageOffsets.map((offsetY, idx) => {
          const totalH =
            measureRef.current?.querySelector(".t2-resume-body")
              ?.scrollHeight || A4_H;
          const nextStart = pageOffsets[idx + 1] ?? totalH;
          const clipH =
            pageOffsets.length === 1 ? PAGE_CONTENT_H : nextStart - offsetY;

          return (
            <div key={idx} style={{ marginBottom: "32px" }}>
              {/* ... page counter ... */}
              <div
                style={{
                  position: "relative",
                  width: `${A4_W}px`,
                  height: `${A4_H}px`,
                  background: "white",
                  overflow: "hidden",
                  boxShadow: isThumbnail
                    ? "none"
                    : "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: `${MARGIN}px`,
                    left: 0,
                    width: `${A4_W}px`,
                    height: `${clipH}px`,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: `${-offsetY}px`,
                      left: 0,
                      width: `${A4_W}px`,
                    }}
                  >
                    {renderResumeContent()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TemplateTwo;
