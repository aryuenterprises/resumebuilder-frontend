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
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";
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

// interface TemplateFiveProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?:boolean
// }

// const TemplateFive: React.FC<TemplateFiveProps> = ({
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
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   // ── Customization ─────────────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";

//   // ── Data sources ─────────────────────────────────────────────────────────
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

//   // ── Image → base64 ───────────────────────────────────────────────────────
//   useEffect(() => {
//     let objectUrl: string | null = null;

//     const processImage = async () => {
//       if (!contact.photo) {
//         setBase64Image(null);
//         return;
//       }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
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
//       } catch (error) {
//         console.error("Error processing image:", error);
//       }
//     };

//     processImage();
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const customSections =
//     isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : [];

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

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .resume-t5 {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: #ffffff;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     .resume-t5 * { box-sizing: border-box; }

//     .resume-t5 p, .resume-t5 div, .resume-t5 span, .resume-t5 li, .resume-t5 a {
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//     }

//     /* Typography */
//     .resume-t5 p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Rich Text Content Styles */
//     .resume-t5 .t5-entry-content ul,
//     .resume-t5 .t5-entry-content ol,
//     .resume-t5 .t5-extra ul,
//     .resume-t5 .t5-extra ol,
//     .resume-t5 .t5-skills-content ul,
//     .resume-t5 .t5-skills-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 0 !important;
//     }

//     .resume-t5 .t5-entry-content li,
//     .resume-t5 .t5-extra li,
//     .resume-t5 .t5-skills-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.5 !important;
//     }

//     .resume-t5 .t5-entry-content strong,
//     .resume-t5 .t5-extra strong,
//     .resume-t5 .t5-skills-content strong { font-weight: 700 !important; color: #111827; }

//     .resume-t5 .t5-entry-content em,
//     .resume-t5 .t5-extra em,
//     .resume-t5 .t5-skills-content em { font-style: italic !important; }

//     .resume-t5 .t5-entry-content u,
//     .resume-t5 .t5-extra u,
//     .resume-t5 .t5-skills-content u { text-decoration: underline !important; }

//     .resume-t5 ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 li {
//       margin-top: 0 !important;
//       margin-bottom: 2px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//     }

//     /* Header - Blue Theme */
//     .resume-t5 .t5-header {
//       background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
//       padding: 28px 24px;
//       border-radius: 12px;
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//     }

//     .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: flex-start;
//       justify-content: space-between;
//       flex-wrap: wrap;
//       gap: 24px;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 20px;
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 12px;
//       object-fit: cover;
//       border: 3px solid rgba(255, 255, 255, 0.2);
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-name {
//       font-size: 26px;
//       font-weight: 700;
//       color: #ffffff;
//       letter-spacing: -0.02em;
//       margin-bottom: 6px;
//       line-height: 1.2;
//     }

//     .resume-t5 .t5-jobtitle {
//       font-size: 14px;
//       color: #bfdbfe;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-details-block {
//       background: rgba(255, 255, 255, 0.1);
//       padding: 12px 16px;
//       border-radius: 10px;
//       min-width: 220px;
//       flex:1;
//     }

//     .resume-t5 .t5-details-label {
//       font-size: 11px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #bfdbfe;
//       margin-bottom: 8px;
//     }

//     .resume-t5 .t5-details-text {
//       font-size: 12px;
//       color: #e2e8f0;
//       line-height: 1.6;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-links {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-top: 16px;
//       padding-top: 16px;
//       border-top: 1px solid rgba(255, 255, 255, 0.15);
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-link-btn {
//       display: inline-flex;
//       align-items: center;
//       padding: 6px 16px;
//       border-radius: 8px;
//       font-size: 12px;
//       font-weight: 500;
//       text-decoration: none;
//       transition: all 0.2s ease;
//     }

//     .resume-t5 .t5-link-linkedin { background-color: #ffffff; color: #1e40af; }
//     .resume-t5 .t5-link-github { background-color: #ffffff; color: #1e40af; }
//     .resume-t5 .t5-link-portfolio { background-color: #ffffff; color: #1e40af; }

//     /* Section */
//     .resume-t5 .t5-section {
//       margin-top: 16px;
//       margin-bottom: 16px;
//     }

//     .resume-t5 .t5-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       color: #1e3a8a;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       padding-bottom: 8px;
//       border-bottom: 2px solid #e2e8f0;
//       margin-bottom: 12px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Experience & Education */
//     .resume-t5 .t5-entry {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .resume-t5 .t5-experience-header,
//     .resume-t5 .t5-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-experience-title,
//     .resume-t5 .t5-education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #0f172a;
//     }

//     .resume-t5 .t5-experience-date,
//     .resume-t5 .t5-education-date {
//       font-size: 12px;
//       color: #64748b;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-experience-subtitle,
//     .resume-t5 .t5-education-subtitle {
//       font-size: 13px;
//       color: #475569;
//       margin-bottom: 6px;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-education-grade {
//       font-size: 12px;
//       color: #64748b;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-entry-content {
//       font-size: 13px;
//       color: #334155;
//       line-height: 1.6;
//       padding-top: 6px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-content p {
//       margin-bottom: 6px !important;
//     }

//     /* Projects */
//     .resume-t5 .t5-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 6px;
//     }

//     .resume-t5 .t5-entry-heading {
//       font-size: 15px;
//       font-weight: 700;
//       color: #0f172a;
//     }

//     .resume-t5 .t5-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .resume-t5 .t5-project-link {
//       font-size: 11px;
//       color: #2563eb;
//       text-decoration: none;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-project-link:hover {
//       text-decoration: underline;
//     }

//     .resume-t5 .t5-project-tech {
//       font-size: 11px;
//       color: #64748b;
//       margin: 4px 0 6px 0;
//       font-weight: 500;
//     }

//     /* Skills */
//     // AFTER
// .resume-t5 .t5-skills-content {
//   font-size: 13px;
//   color: #334155;
//   line-height: 1.6;
//   padding: 4px 0;
//   word-wrap: break-word;
//   overflow-wrap: break-word;
//   page-break-inside: auto !important;
//   break-inside: auto !important;
// }

// .resume-t5 .t5-skills-content li {
//   page-break-inside: avoid !important;
//   break-inside: avoid !important;
// }

//     .resume-t5 .t5-skills-content p {
//       margin-bottom: 4px !important;
//     }

//     /* Extra / Custom Sections */
//     .resume-t5 .custom-section-wrapper {
//       margin-top: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .resume-t5 .t5-extra {
//       font-size: 13px;
//       color: #334155;
//       line-height: 1.6;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Page-break marker */
//     .t5-page-break {
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
//       .resume-t5 .t5-header {
//         background: #1e40af !important;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       .resume-t5 .t5-project-link {
//         color: #2563eb !important;
//       }
//       .resume-t5 .t5-link-linkedin,
//       .resume-t5 .t5-link-portfolio,
//       .resume-t5 .t5-link-github {
//         background-color: #ffffff !important;
//         color: #1e40af !important;
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
//   // AFTER
//   const generateHTML = useCallback(
//     (
//       forPDF = false,
//       pageBreakIds: string[] = [],
//       skillsCutIndex = -1,
//     ): string => {
//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const photoHtml = base64Image
//         ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
//         : "";

//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       const fontPreloads =
//         activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
//           ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
//            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//            <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
//           : "";

//       const header = `
//         <div class="t5-header" data-block-id="t5-header">
//           <div class="t5-header-top">
//             <div class="t5-header-left">
//               ${photoHtml}
//               <div>
//                 <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//                 ${contact?.jobTitle ? `<div class="t5-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//               </div>
//             </div>
//             <div class="t5-details-block">
//               <div class="t5-details-label">CONTACT</div>
//               ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//               ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//               ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//               ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
//             </div>
//           </div>
//           ${
//             linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//               ? `
//             <div class="t5-links">
//               ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
//               ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
//               ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
//             </div>
//           `
//               : ""
//           }
//         </div>`;

//       const sectionBuilders = {
//         summary: () =>
//           summary
//             ? `
//     <div class="t5-section" data-block-id="t5-summary">
//       <div class="t5-section-title">Professional Summary</div>
//       <div class="t5-extra">${rich(summary)}</div>
//     </div>
//   `
//             : "",

//         experience: () =>
//           experiences?.length > 0
//             ? `
//     <div class="t5-section" data-block-id="t5-exp-section">
//       <div class="t5-section-title">Experience</div>
//       ${experiences
//         .map((exp: any, i: number) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `<div class="t5-entry" data-block-id="t5-exp-${i}">
//           <div class="t5-experience-header">
//             <div class="t5-experience-title">${exp.jobTitle || ""}</div>
//             <div class="t5-experience-date">${start}${start && end ? " — " : ""}${end}</div>
//           </div>
//           <div class="t5-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" • ")}</div>
//           ${exp.text ? `<div class="t5-entry-content">${rich(exp.text)}</div>` : ""}
//         </div>`;
//         })
//         .join("")}
//     </div>
//   `
//             : "",

//         projects: () =>
//           projects?.length > 0
//             ? `
//     <div class="t5-section" data-block-id="t5-proj-section">
//       <div class="t5-section-title">Projects</div>
//       ${projects
//         .map(
//           (p: any, i: number) => `
//         <div class="t5-entry" data-block-id="t5-proj-${i}">
//           <div class="t5-project-header">
//             <div class="t5-entry-heading">${p.title || ""}</div>
//             <div class="t5-project-links">
//               ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
//               ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
//             </div>
//           </div>
//           ${p.techStack?.length ? `<div class="t5-project-tech">Tech Stack: ${p.techStack.join(" • ")}</div>` : ""}
//           ${p.description ? `<div class="t5-entry-content">${rich(p.description)}</div>` : ""}
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
//     <div class="t5-section" data-block-id="t5-edu-section">
//       <div class="t5-section-title">Education</div>
//       ${educations
//         .map((edu: any, i: number) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `<div class="t5-entry" data-block-id="t5-edu-${i}">
//           <div class="t5-education-header">
//             <div class="t5-education-school">${edu.schoolname || ""}</div>
//             <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           <div class="t5-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" • ")}</div>
//           ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
//           ${edu.text ? `<div class="t5-entry-content">${rich(edu.text)}</div>` : ""}
//         </div>`;
//         })
//         .join("")}
//     </div>
//   `
//             : "",

//         // AFTER
//         skills: () => {
//           const skillsClean = rich(skills || "");
//           if (!skillsClean || skillsClean === "<p><br></p>") return "";

//           return `<div class="t5-section" data-block-id="t5-skills-section">
//     <div class="t5-section-title">Skills</div>
//     <div class="t5-skills-content" data-block-id="t5-skills-content">${skillsClean}</div>
//   </div>`;
//         },

//         custom: () =>
//           customSections
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any, i: number) => `
//       <div class="t5-section custom-section-wrapper" data-block-id="t5-custom-${i}">
//         <div class="t5-section-title">${s.name}</div>
//         <div class="t5-extra">${rich(s.description)}</div>
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

//       const pdfStyle = forPDF
//         ? `<style>.resume-t5 { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       let bodyContent = `${header}${sectionsHTML}`;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t5-page-break";
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
//   <div class="resume-t5">
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
//       customSections,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       base64Image,
//       CSS,
//     ],
//   );

//   // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".resume-t5");
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
//     .resume-t5 {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".resume-t5");
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
//             ".t5-entry",
//             ".t5-header",
//             ".custom-section-wrapper",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           resume
//             .querySelectorAll<HTMLElement>(".t5-section-title")
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
//                 if (firstItem.classList.contains("t5-skills-content")) return;

//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".t5-entry, .custom-section-wrapper",
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

//           // AFTER
//           const skillsLis = Array.from(
//             resume.querySelectorAll<HTMLElement>(".t5-skills-content li"),
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
//       position: absolute; top: ${MARGIN}px; left: 0;
//       width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .resume-t5 {
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
//     setIsDownloading(true);
//     try {
//       // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       // const pdfHtml = generateHTML(true, pageBreakIds);

//       // AFTER
//       // AFTER
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds, -1);

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

// export default TemplateFive;















"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
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
import { usePathname } from "next/navigation";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
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

interface TemplateFiveProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateFive: React.FC<TemplateFiveProps> = ({
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
  const [base64Image, setBase64Image] = useState<string | null>(null);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";

  // ── Data sources ─────────────────────────────────────────────────────────
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

  // ── Image → base64 ───────────────────────────────────────────────────────
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
            const response = await fetch(contact.photo);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result as string);
            reader.readAsDataURL(blob);
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
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    processImage();
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [contact.photo]);

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const customSections =
    isFinalizeData(finalize) && Array.isArray(finalize.customSection)
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
    return map[fontFamily] || map["'Inter', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ───────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .resume-t5 {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
    }

    .resume-t5 * { box-sizing: border-box; }

    .resume-t5 p, .resume-t5 div, .resume-t5 span, .resume-t5 li, .resume-t5 a {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .resume-t5 p {
      margin: 0 0 4px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .resume-t5 .t5-entry-content ul,
    .resume-t5 .t5-entry-content ol,
    .resume-t5 .t5-extra ul,
    .resume-t5 .t5-extra ol,
    .resume-t5 .t5-skills-content ul,
    .resume-t5 .t5-skills-content ol {
      margin: 4px 0 4px 20px !important;
      padding-left: 0 !important;
    }

    .resume-t5 .t5-entry-content li,
    .resume-t5 .t5-extra li,
    .resume-t5 .t5-skills-content li {
      margin-bottom: 2px !important;
      line-height: 1.5 !important;
    }

    .resume-t5 .t5-entry-content strong,
    .resume-t5 .t5-extra strong,
    .resume-t5 .t5-skills-content strong { font-weight: 700 !important; color: #111827; }

    .resume-t5 .t5-entry-content em,
    .resume-t5 .t5-extra em,
    .resume-t5 .t5-skills-content em { font-style: italic !important; }

    .resume-t5 .t5-entry-content u,
    .resume-t5 .t5-extra u,
    .resume-t5 .t5-skills-content u { text-decoration: underline !important; }

    .resume-t5 ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 li {
      margin-top: 0 !important;
      margin-bottom: 2px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
    }

    /* Header - Blue Theme */
    .resume-t5 .t5-header {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      padding: 28px 24px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .resume-t5 .t5-header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
    }

    .resume-t5 .t5-header-left {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .resume-t5 .t5-photo {
      width: 100px;
      height: 100px;
      border-radius: 12px;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
    }

    .resume-t5 .t5-name {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      line-height: 1.2;
    }

    .resume-t5 .t5-jobtitle {
      font-size: 14px;
      color: #bfdbfe;
      font-weight: 500;
    }

    .resume-t5 .t5-details-block {
      background: rgba(255, 255, 255, 0.1);
      padding: 12px 16px;
      border-radius: 10px;
      min-width: 220px;
      flex:1;
    }

    .resume-t5 .t5-details-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #bfdbfe;
      margin-bottom: 8px;
    }

    .resume-t5 .t5-details-text {
      font-size: 12px;
      color: #e2e8f0;
      line-height: 1.6;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-links {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      flex-wrap: wrap;
    }

    .resume-t5 .t5-link-btn {
      display: inline-flex;
      align-items: center;
      padding: 6px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .resume-t5 .t5-link-linkedin { background-color: #ffffff; color: #1e40af; }
    .resume-t5 .t5-link-github { background-color: #ffffff; color: #1e40af; }
    .resume-t5 .t5-link-portfolio { background-color: #ffffff; color: #1e40af; }

    .resume-t5 .t5-section {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .resume-t5 .t5-section-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 12px;
    }

    .resume-t5 .t5-entry {
      margin-bottom: 16px;
    }

    .resume-t5 .t5-experience-header,
    .resume-t5 .t5-education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-experience-title,
    .resume-t5 .t5-education-school {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }

    .resume-t5 .t5-experience-date,
    .resume-t5 .t5-education-date {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .resume-t5 .t5-experience-subtitle,
    .resume-t5 .t5-education-subtitle {
      font-size: 13px;
      color: #475569;
      margin-bottom: 6px;
      font-weight: 500;
    }

    .resume-t5 .t5-education-grade {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
      font-weight: 500;
    }

    .resume-t5 .t5-entry-content {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      padding-top: 6px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .resume-t5 .t5-entry-content p {
      margin-bottom: 6px !important;
    }

    .resume-t5 .t5-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 6px;
    }

    .resume-t5 .t5-entry-heading {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }

    .resume-t5 .t5-project-links {
      display: flex;
      gap: 12px;
    }

    .resume-t5 .t5-project-link {
      font-size: 11px;
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }

    .resume-t5 .t5-project-link:hover {
      text-decoration: underline;
    }

    .resume-t5 .t5-project-tech {
      font-size: 11px;
      color: #64748b;
      margin: 4px 0 6px 0;
      font-weight: 500;
    }

    .resume-t5 .t5-skills-content {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      padding: 4px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .resume-t5 .t5-skills-content p {
      margin-bottom: 4px !important;
    }

    .resume-t5 .custom-section-wrapper {
      margin-top: 16px;
    }

    .resume-t5 .t5-extra {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t5-page-break {
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
      .resume-t5 .t5-header {
        background: #1e40af !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .resume-t5 .t5-project-link {
        color: #2563eb !important;
      }
      .resume-t5 .t5-link-linkedin,
      .resume-t5 .t5-link-portfolio,
      .resume-t5 .t5-link-github {
        background-color: #ffffff !important;
        color: #1e40af !important;
      }
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
  // Note: skillsCutIndex param removed — the new line-level packer handles
  // skills li splitting the same way it handles every other text block, so
  // there's no longer a separate special-cased skills-cutting pass.
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const addressStr = [
        contact?.address,
        contact?.city,
        contact?.postCode,
        contact?.country,
      ]
        .filter(Boolean)
        .join(", ");

      const photoHtml = base64Image
        ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
        : "";

      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
          : "";

      const header = `
        <div class="t5-header" data-block-id="t5-header">
          <div class="t5-header-top">
            <div class="t5-header-left">
              ${photoHtml}
              <div>
                <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
                ${contact?.jobTitle ? `<div class="t5-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
              </div>
            </div>
            <div class="t5-details-block">
              <div class="t5-details-label">CONTACT</div>
              ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
              ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
              ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
              ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
            </div>
          </div>
          ${
            linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
              ? `
            <div class="t5-links">
              ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
              ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
              ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
            </div>
          `
              : ""
          }
        </div>`;

      const sectionBuilders = {
        summary: () =>
          summary
            ? `
    <div class="t5-section" data-block-id="t5-summary">
      <div class="t5-section-title">Professional Summary</div>
      <div class="t5-extra">${rich(summary)}</div>
    </div>
  `
            : "",

        experience: () =>
          experiences?.length > 0
            ? `
    <div class="t5-section" data-block-id="t5-exp-section">
      <div class="t5-section-title">Experience</div>
      ${experiences
        .map((exp: any, i: number) => {
          const start = formatMonthYear(exp.startDate, false);
          const end = exp.endDate
            ? formatMonthYear(exp.endDate, false)
            : exp.startDate
              ? "Present"
              : "";
          return `<div class="t5-entry" data-block-id="t5-exp-${i}">
          <div class="t5-experience-header">
            <div class="t5-experience-title">${exp.jobTitle || ""}</div>
            <div class="t5-experience-date">${start}${start && end ? " — " : ""}${end}</div>
          </div>
          <div class="t5-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" • ")}</div>
          ${exp.text ? `<div class="t5-entry-content">${rich(exp.text)}</div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  `
            : "",

        projects: () =>
          projects?.length > 0
            ? `
    <div class="t5-section" data-block-id="t5-proj-section">
      <div class="t5-section-title">Projects</div>
      ${projects
        .map(
          (p: any, i: number) => `
        <div class="t5-entry" data-block-id="t5-proj-${i}">
          <div class="t5-project-header">
            <div class="t5-entry-heading">${p.title || ""}</div>
            <div class="t5-project-links">
              ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
            </div>
          </div>
          ${p.techStack?.length ? `<div class="t5-project-tech">Tech Stack: ${p.techStack.join(" • ")}</div>` : ""}
          ${p.description ? `<div class="t5-entry-content">${rich(p.description)}</div>` : ""}
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
    <div class="t5-section" data-block-id="t5-edu-section">
      <div class="t5-section-title">Education</div>
      ${educations
        .map((edu: any, i: number) => {
          const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
          return `<div class="t5-entry" data-block-id="t5-edu-${i}">
          <div class="t5-education-header">
            <div class="t5-education-school">${edu.schoolname || ""}</div>
            <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          <div class="t5-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" • ")}</div>
          ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
          ${edu.text ? `<div class="t5-entry-content">${rich(edu.text)}</div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  `
            : "",

        skills: () => {
          const skillsClean = rich(skills || "");
          if (!skillsClean || skillsClean === "<p><br></p>") return "";

          return `<div class="t5-section" data-block-id="t5-skills-section">
    <div class="t5-section-title">Skills</div>
    <div class="t5-skills-content" data-block-id="t5-skills-content">${skillsClean}</div>
  </div>`;
        },

        custom: () =>
          customSections
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any, i: number) => `
      <div class="t5-section custom-section-wrapper" data-block-id="t5-custom-${i}">
        <div class="t5-section-title">${s.name}</div>
        <div class="t5-extra">${rich(s.description)}</div>
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

      // Matches box model to preview measurement (A4_W width, MARGIN padding)
      // plus @page margin so per-page top/bottom spacing matches preview too.
      const pdfStyle = forPDF
        ? `<style>
            @page { size: A4; margin: ${MARGIN}px 0; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .resume-t5 { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
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
            breakDiv.className = "t5-page-break";
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
  <div class="resume-t5">
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
      customSections,
      summary,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      base64Image,
      CSS,
    ],
  );

  // ── Page splitter (TemplateOne's line-level engine, adapted for t5-*) ────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".resume-t5");
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
  .resume-t5 { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".resume-t5");
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
          // at the bottom of a page. t5-header is included here too — it's
          // always the very first thing on page 1, but marking it atomic
          // means it can never be torn apart if a resume starts unusually.
          const HEADER_LIKE_SELECTOR = [
            ".t5-header",
            ".t5-experience-header",
            ".t5-education-header",
            ".t5-project-header",
            ".t5-section-title",
          ].join(", ");

          // Sit right after a header-like row but OUTSIDE it in the DOM —
          // also keep-with-next so header -> subtitle -> grade -> first
          // content line all move to the next page together if needed.
          const CHAINED_KEEP_SELECTOR = [
            ".t5-experience-subtitle",
            ".t5-education-subtitle",
            ".t5-education-grade",
          ].join(", ");

          // Whole, never split, but fine sitting alone at page bottom.
          const ATOMIC_SELECTOR = [".t5-project-tech"].join(", ");

          const DESC_WRAPPER_SELECTOR = [
            ".t5-entry-content",
            ".t5-extra",
            ".t5-skills-content",
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
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .resume-t5 { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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

      console.log("pdfHtml",pdfHtml)

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

export default TemplateFive;