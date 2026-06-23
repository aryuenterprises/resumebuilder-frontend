// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeventeen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

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
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   // Helper function to render skills (using cleanQuillHTML)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <div className="t17-section-block">
//         <div className="t17-section-header">
//           <div className="t17-section-title">Skills</div>
//           <div className="t17-section-line"></div>
//         </div>
//         <div
//           className="t17-skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="t17-section-block">
//         <div className="t17-section-header">
//           <div className="t17-section-title">Projects</div>
//           <div className="t17-section-line"></div>
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t17-entry-block">
//             <div className="t17-entry-top-row">
//               <div className="t17-entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t17-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t17-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t17-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t17-project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t17-entry-content"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | SLATE GRAY | SOFT & ELEGANT
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

//   .t17-resume-container {
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #fafafa;
//     font-family: 'Jost', sans-serif;
//     color: #2c2c2c;
//     text-align: left;
//   }

//   .t17-resume-container.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
//   }

//   /* Fix p tag spacing */
//   .t17-resume-container p {
//     margin: 0 0 4px 0 !important;
//     padding: 0 !important;
//     line-height: 1.6 !important;
//   }

//   .t17-resume-container p:last-child {
//     margin-bottom: 0 !important;
//   }

//   /* Rich text content styles */
//   .t17-resume-container .t17-entry-content ul,
//   .t17-resume-container .t17-entry-content ol,
//   .t17-resume-container .t17-skills-content ul,
//   .t17-resume-container .t17-skills-content ol,
//   .t17-resume-container .t17-edu-content ul,
//   .t17-resume-container .t17-edu-content ol,
//   .t17-resume-container .t17-custom-section-content ul,
//   .t17-resume-container .t17-custom-section-content ol {
//     margin: 4px 0 4px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t17-resume-container .t17-entry-content li,
//   .t17-resume-container .t17-skills-content li,
//   .t17-resume-container .t17-edu-content li,
//   .t17-resume-container .t17-custom-section-content li {
//     margin-bottom: 2px !important;
//     line-height: 1.6 !important;
//   }

//   .t17-resume-container .t17-entry-content ul,
//   .t17-resume-container .t17-skills-content ul,
//   .t17-resume-container .t17-edu-content ul,
//   .t17-resume-container .t17-custom-section-content ul {
//     list-style-type: disc !important;
//   }

//   .t17-resume-container .t17-entry-content ol,
//   .t17-resume-container .t17-skills-content ol,
//   .t17-resume-container .t17-edu-content ol,
//   .t17-resume-container .t17-custom-section-content ol {
//     list-style-type: decimal !important;
//   }

//   .t17-resume-container .t17-entry-content strong,
//   .t17-resume-container .t17-skills-content strong,
//   .t17-resume-container .t17-edu-content strong,
//   .t17-resume-container .t17-custom-section-content strong {
//     font-weight: 600 !important;
//   }

//   .t17-resume-container .t17-entry-content em,
//   .t17-resume-container .t17-skills-content em,
//   .t17-resume-container .t17-edu-content em,
//   .t17-resume-container .t17-custom-section-content em {
//     font-style: italic !important;
//   }

//   .t17-resume-container .t17-entry-content u,
//   .t17-resume-container .t17-skills-content u,
//   .t17-resume-container .t17-edu-content u,
//   .t17-resume-container .t17-custom-section-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t17-resume-container .t17-entry-content p,
//   .t17-resume-container .t17-skills-content p,
//   .t17-resume-container .t17-edu-content p,
//   .t17-resume-container .t17-custom-section-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills content styling */
//   .t17-resume-container .t17-skills-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   /* Custom Section Content */
//   .t17-resume-container .t17-custom-section-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   /* Project links */
//   .t17-resume-container .t17-project-links {
//     display: flex;
//     gap: 15px;
//   }

//   .t17-resume-container .t17-project-link {
//     font-size: 10px;
//     font-weight: 500;
//     color: #7a8c96;
//     text-decoration: underline;
//   }

//   .t17-resume-container .t17-project-tech-stack {
//     font-size: 11px;
//     color: #888;
//     margin: 6px 0;
//   }

//   /* ── HEADER ── */
//   .t17-resume-container .t17-header-block {
//     background-color: #f0f0ef;
//     padding: 36px 36px 28px;
//     border-bottom: 1px solid #d8d8d4;
//     text-align: left;
//   }

//   .t17-resume-container .t17-header-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 52px;
//     font-weight: 300;
//     letter-spacing: 3px;
//     line-height: 1.0;
//     color: #1e1e1e;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-header-jobtitle {
//     font-family: 'Jost', sans-serif;
//     font-size: 10.5px;
//     font-weight: 500;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #7a8a8a;
//     margin-bottom: 20px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-header-divider {
//     width: 40px;
//     height: 1px;
//     background: #9aa5a5;
//     margin-bottom: 16px;
//   }

//   .t17-resume-container .t17-header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 4px 0;
//     font-size: 11.5px;
//     color: #5a6a6a;
//     font-weight: 300;
//     text-align: left;
//     font-family: 'Jost', sans-serif;
//   }

//   .t17-resume-container .t17-header-meta-item {
//     display: flex;
//     align-items: center;
//     color: #5a6a6a;
//   }

//   .t17-resume-container .t17-header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 10px;
//     color: #b0bcbc;
//   }

//   .t17-resume-container .t17-header-meta-item a {
//     color: #5a7a7a;
//     text-decoration: underline;
//     text-underline-offset: 3px;
//     text-decoration-color: #b0bcbc;
//   }

//   /* ── BODY ── */
//   .t17-resume-container .t17-resume-body {
//     padding: 28px 36px 36px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t17-resume-container .t17-section-block {
//     margin-bottom: 28px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-section-header {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-section-title {
//     font-family: 'Jost', sans-serif;
//     font-size: 9.5px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #7a8a8a;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t17-resume-container .t17-section-line {
//     flex: 1;
//     height: 1px;
//     background: #d8d8d4;
//   }

//   /* ── SUMMARY ── */
//   .t17-resume-container .t17-summary-text {
//     font-size: 16px;
//     font-weight: 300;
//     line-height: 1.85;
//     color: #3c4c4c;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t17-resume-container .t17-entry-block {
//     margin-bottom: 20px;
//     padding-bottom: 20px;
//     border-bottom: 1px solid #e8e8e4;
//     text-align: left;
//   }

//   .t17-resume-container .t17-entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .t17-resume-container .t17-entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 3px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-entry-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 19px;
//     font-weight: 500;
//     color: #1e1e1e;
//     line-height: 1.2;
//     letter-spacing: 0.3px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-entry-date {
//     font-size: 10px;
//     font-weight: 400;
//     letter-spacing: 1.5px;
//     text-transform: uppercase;
//     color: #9aa5a5;
//     white-space: nowrap;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   .t17-resume-container .t17-entry-subtitle {
//     font-size: 11.5px;
//     color: #7a8a8a;
//     font-weight: 400;
//     letter-spacing: 0.8px;
//     font-family: 'Jost', sans-serif;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t17-resume-container .t17-entry-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   /* ── EDU CONTENT ── */
//   .t17-resume-container .t17-edu-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   /* Education Grade */
//   .t17-resume-container .t17-education-grade {
//     font-size: 11px;
//     color: #6b7c93;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 0;
//     }

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t17-resume-container {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t17-header-block {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t17-entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t17-section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//   }

// =
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="t17-entry-content t17-entry-content-desc">${cleanQuillHTML(text)}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="t17-entry-content t17-entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c ? `<li style="margin-bottom:4px;line-height:1.65;list-style-type:disc!important;">${c}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="t17-entry-content t17-entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const sectionHeader = (title: string) => `
//       <div class="t17-section-header">
//         <div class="t17-section-title">${title}</div>
//         <div class="t17-section-line"></div>
//       </div>`;

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t17-section-block">
//           ${sectionHeader("Skills")}
//           <div class="t17-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t17-section-block">
//           ${sectionHeader("Projects")}
//           ${projects.map((project: any) => `
//             <div class="t17-entry-block">
//               <div class="t17-entry-top-row">
//                 <div class="t17-entry-title">${project.title || ""}</div>
//                 <div class="t17-project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t17-project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t17-project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="t17-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="t17-entry-content">${cleanQuillHTML(project.description)}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML for PDF
//     const generateCustomSectionsHTML = () => {
//       if (
//         !finalize ||
//         Array.isArray(finalize) ||
//         !Array.isArray(finalize.customSection) ||
//         !finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//       ) {
//         return "";
//       }

//       return finalize.customSection
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any) => `
//           <div class="t17-section-block">
//             ${s.name ? sectionHeader(s.name) : ""}
//             ${s.description ? `<div class="t17-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>
//         `,
//         )
//         .join("");
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t17-resume-container">

//         <!-- HEADER -->
//         <div class="t17-header-block">
//           <div class="t17-header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="t17-header-jobtitle">
//             ${contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div class="t17-header-divider"></div>
//           <div class="t17-header-meta-row">
//             ${addressParts.length > 0 ? `<span class="t17-header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="t17-header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="t17-header-meta-item">${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span class="t17-header-meta-item">${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span class="t17-header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span class="t17-header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span class="t17-header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="t17-resume-body">

//           ${summary ? `
//           <div class="t17-section-block">
//             ${sectionHeader("Profile")}
//             <div class="t17-summary-text">${cleanQuillHTML(summary)}</div>
//           </div>` : ""}

//           ${experiences.length > 0 ? `
//           <div class="t17-section-block">
//             ${sectionHeader("Experience")}
//             ${experiences.map((exp) => {
//               const startFormatted = formatMonthYear(exp.startDate, false);
//               const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//               const companyLocation = [exp.employer, exp.location].filter(Boolean).join("  ·  ");
//               return `
//               <div class="t17-entry-block">
//                 <div class="t17-entry-top-row">
//                   <div class="t17-entry-title">${exp.jobTitle || ""}</div>
//                   <div class="t17-entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="t17-entry-subtitle">${companyLocation}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           ${generateProjectsHTML()}

//           ${educations.length > 0 ? `
//           <div class="t17-section-block">
//             ${sectionHeader("Education")}
//             ${educations.map((edu) => {
//               const dateStr = edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                 : "";
//               const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//               const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//               return `
//               <div class="t17-entry-block">
//                 <div class="t17-entry-top-row">
//                   <div class="t17-entry-title">${edu.schoolname || ""}</div>
//                   ${dateStr ? `<div class="t17-entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${edu.degree || edu.location || formattedGrade ? `<div class="t17-entry-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? "  ·  " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="t17-education-grade">${formattedGrade}</div>` : ""}
//                 </div>` : ""}
//                 ${eduTextHtml ? `<div class="t17-edu-content">${eduTextHtml}</div>` : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           ${generateSkillsHTML()}

//           ${generateCustomSectionsHTML()}

//         </div>
//       </div>
//     </body>
//     </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
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
//     }
//   };

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
//       {lastSegment === "download-resume" && (
//         <div className="text-center my-5">
//           <motion.button
//             onClick={handleDownload}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//           >
//             Download Resume
//           </motion.button>
//         </div>
//       )}

//       <div
//         className={`t17-resume-container ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t17-header-block">
//           <div className="t17-header-name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="t17-header-jobtitle">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="t17-header-divider" />
//           <div className="t17-header-meta-row">
//             {addressParts.length > 0 && (
//               <span className="t17-header-meta-item">{addressParts.join(", ")}</span>
//             )}
//             {contact?.email && <span className="t17-header-meta-item">{contact.email}</span>}
//             {contact?.phone && <span className="t17-header-meta-item">{contact.phone}</span>}
//             {formattedDob && <span className="t17-header-meta-item">{formattedDob}</span>}
//             {linkedinUrl && (
//               <span className="t17-header-meta-item">
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//               </span>
//             )}
//             {githubUrl && (
//               <span className="t17-header-meta-item">
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="t17-header-meta-item">
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t17-resume-body">

//           {/* SUMMARY */}
//           {summary && (
//             <div className="t17-section-block">
//               <div className="t17-section-header">
//                 <div className="t17-section-title">Profile</div>
//                 <div className="t17-section-line" />
//               </div>
//               <div
//                 className="t17-summary-text"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="t17-section-block">
//               <div className="t17-section-header">
//                 <div className="t17-section-title">Experience</div>
//                 <div className="t17-section-line" />
//               </div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 const companyLocation = [exp.employer, exp.location].filter(Boolean).join("  ·  ");
//                 return (
//                   <div key={i} className="t17-entry-block">
//                     <div className="t17-entry-top-row">
//                       <div className="t17-entry-title">{exp.jobTitle}</div>
//                       <div className="t17-entry-date">{start} – {end}</div>
//                     </div>
//                     <div className="t17-entry-subtitle">{companyLocation}</div>
//                     {exp.text && (
//                       <div
//                         className="t17-entry-content t17-entry-content-desc"
//                         dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div className="t17-section-block">
//               <div className="t17-section-header">
//                 <div className="t17-section-title">Education</div>
//                 <div className="t17-section-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 return (
//                   <div key={edu.id || index} className="t17-entry-block">
//                     <div className="t17-entry-top-row">
//                       <div className="t17-entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="t17-entry-date">
//                           {edu.startDate || ""}{edu.startDate && edu.endDate && " – "}{edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location || formattedGrade) && (
//                       <div className="t17-entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && "  ·  "}
//                         {edu.location || ""}
//                         {formattedGrade && <div className="t17-education-grade">{formattedGrade}</div>}
//                       </div>
//                     )}
//                     {eduTextHtml && (
//                       <div className="t17-edu-content" dangerouslySetInnerHTML={{ __html: eduTextHtml }} />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {skills && renderSkills()}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s: any) => s?.name?.trim() || s?.description?.trim()
//             ) &&
//             finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map((section: any, index: number) => (
//                 <div key={section.id || index} className="t17-section-block">
//                   <div className="t17-section-header">
//                     <div className="t17-section-title">{section.name || "Additional"}</div>
//                     <div className="t17-section-line" />
//                   </div>
//                   {section.description && (
//                     <div
//                       className="t17-custom-section-content"
//                       dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeventeen;

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

interface TemplateSeventeenProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?:boolean
}

const TemplateSeventeen: React.FC<TemplateSeventeenProps> = ({
  alldata,
  customization,
  viewMode=false
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

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
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap",
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
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return fontMap[fontFamily] || fontMap["'Jost', sans-serif"];
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
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t17-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 14px;
      line-height: 1.5;
    }
    .t17-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; }

    /* ── HEADER ── */
    .t17-header-block {
      background-color: #ffffff;
      padding: 36px 0 24px;
      border-bottom: 2px solid #1e1e1e;
      margin-bottom: 24px;
      text-align: left;
    }

    .t17-header-name {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 52px;
      font-weight: 300;
      letter-spacing: 3px;
      line-height: 1.0;
      color: #1e1e1e;
      margin-bottom: 6px;
    }

    .t17-header-jobtitle {
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: #7a8a8a;
      margin-bottom: 18px;
    }

    .t17-header-divider {
      width: 40px;
      height: 1px;
      background: #9aa5a5;
      margin-bottom: 14px;
    }

    .t17-header-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 0;
      font-size: 11.5px;
      color: #5a6a6a;
      font-weight: 300;
    }

    .t17-header-meta-item {
      display: flex;
      align-items: center;
      color: #5a6a6a;
    }

    .t17-header-meta-item:not(:last-child)::after {
      content: '·';
      margin: 0 10px;
      color: #b0bcbc;
    }

    .t17-header-meta-item a {
      color: #5a7a7a;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: #b0bcbc;
    }

    /* ── SECTION ── */
    .t17-section-block {
      margin-bottom: 24px;
    }

    .t17-section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t17-section-title {
      font-size: 9.5px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #7a8a8a;
      white-space: nowrap;
    }

    .t17-section-line {
      flex: 1;
      height: 1px;
      background: #d8d8d4;
    }

    /* ── SUMMARY ── */
    .t17-summary-text {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.85;
      color: #3c4c4c;
    }

    /* ── ENTRY BLOCKS ── */
    .t17-entry-block {
      margin-bottom: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid #ebebeb;
    }

    .t17-entry-block:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .t17-entry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 3px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t17-entry-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 19px;
      font-weight: 500;
      color: #1e1e1e;
      line-height: 1.2;
      letter-spacing: 0.3px;
    }

    .t17-entry-date {
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #9aa5a5;
      white-space: nowrap;
    }

    .t17-entry-subtitle {
      font-size: 11.5px;
      color: #7a8a8a;
      font-weight: 400;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
    }

    .t17-entry-content,
    .t17-edu-content,
    .t17-skills-content,
    .t17-custom-section-content {
      font-size: 13px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    .t17-project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t17-project-links {
      display: inline-flex;
      gap: 10px;
      flex-shrink: 0;
      align-items: center;
    }

    .t17-project-link {
      font-size: 11px;
      color: #374151 !important;
      text-decoration: none !important;
      white-space: nowrap;
    }

    .t17-project-tech-stack {
      font-size: 12px;
      color: #888;
      margin: 4px 0 6px;
    }

    .t17-education-grade {
      font-size: 11px;
      color: #6b7c93;
      font-weight: 500;
      margin-top: 2px;
    }

    /* ── LISTS ── */
    .t17-entry-content ul, .t17-entry-content ol,
    .t17-edu-content ul, .t17-edu-content ol,
    .t17-skills-content ul, .t17-skills-content ol,
    .t17-custom-section-content ul, .t17-custom-section-content ol,
    .t17-summary-text ul, .t17-summary-text ol {
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }
    .t17-entry-content ul, .t17-skills-content ul,
    .t17-summary-text ul { list-style-type: disc !important; }
    .t17-entry-content ol, .t17-skills-content ol,
    .t17-summary-text ol { list-style-type: decimal !important; }
    .t17-entry-content li, .t17-edu-content li,
    .t17-skills-content li, .t17-custom-section-content li,
    .t17-summary-text li {
      margin-bottom: 4px !important;
      line-height: 1.6 !important;
      font-size: 13px !important;
    }

    .t17-page-break {
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
      .t17-resume { width: 100% !important; padding: 0 !important; }
      .t17-project-link, .t17-header-meta-item a {
        color: #374151 !important;
        text-decoration: none !important;
      }
      a, a:visited { color: inherit !important; text-decoration: none !important; }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);

      const richText = (html: string, cls: string) => {
        if (!html) return "";
        const clean = cleanQuillHTML(html);
        if (!clean || clean === "<p><br></p>") return "";
        return `<div class="${cls}">${clean}</div>`;
      };

      const hasSkillsContent = (): boolean => {
        if (!skills?.trim()) return false;
        const cleaned = cleanQuillHTML(skills);
        if (!cleaned || cleaned === "<p><br></p>") return false;
        const textOnly = cleaned.replace(/<[^>]*>/g, "").trim();
        return textOnly.length > 0;
      };

      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const sectionHeader = (title: string) => `
        <div class="t17-section-header">
          <div class="t17-section-title">${title}</div>
          <div class="t17-section-line"></div>
        </div>`;

      const header = `
      <div class="t17-header-block">
        <div class="t17-header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="t17-header-jobtitle">
          ${
            typeof contact?.jobTitle === "string"
              ? contact.jobTitle
              : (contact?.jobTitle as any)?.name || ""
          }
        </div>
        <div class="t17-header-divider"></div>
        <div class="t17-header-meta-row">
          ${addressParts.length ? `<span class="t17-header-meta-item">${addressParts.join(", ")}</span>` : ""}
          ${contact?.email ? `<span class="t17-header-meta-item">${contact.email}</span>` : ""}
          ${contact?.phone ? `<span class="t17-header-meta-item">${contact.phone}</span>` : ""}
          ${formattedDob ? `<span class="t17-header-meta-item">${formattedDob}</span>` : ""}
          ${linkedinUrl ? `<span class="t17-header-meta-item"><a href="${href(linkedinUrl)}" target="_blank">LinkedIn</a></span>` : ""}
          ${githubUrl ? `<span class="t17-header-meta-item"><a href="${href(githubUrl)}" target="_blank">GitHub</a></span>` : ""}
          ${portfolioUrl ? `<span class="t17-header-meta-item"><a href="${href(portfolioUrl)}" target="_blank">Portfolio</a></span>` : ""}
        </div>
      </div>`;

      const summaryBlock = summary?.trim()
        ? `<div class="t17-section-block" data-block-id="summary">
             ${sectionHeader("Profile")}
             ${richText(summary.replace(/\n/g, "<br>"), "t17-summary-text")}
           </div>`
        : "";

      const expBlock = experiences.length
        ? `<div class="t17-section-block" data-block-id="exp-section">
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
                 return `<div class="t17-entry-block" data-block-id="exp-${i}">
                   <div class="t17-entry-top-row">
                     <div class="t17-entry-title">${exp.jobTitle || ""}</div>
                     <div class="t17-entry-date">${s} – ${e}</div>
                   </div>
                   <div class="t17-entry-subtitle">${companyLocation}</div>
                   ${exp.text ? richText(exp.text, "t17-entry-content") : ""}
                 </div>`;
               })
               .join("")}
           </div>`
        : "";

      const projBlock = projects.length
        ? `<div class="t17-section-block" data-block-id="proj-section">
             ${sectionHeader("Projects")}
             ${projects
               .map(
                 (p: any, i: number) => `
               <div class="t17-entry-block" data-block-id="proj-${i}">
                 <div class="t17-project-header">
                   <div class="t17-entry-title">${p.title || ""}</div>
                   ${
                     p.liveUrl || p.githubUrl
                       ? `<div class="t17-project-links">
                           ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t17-project-link" target="_blank">Live Demo</a>` : ""}
                           ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t17-project-link" target="_blank">GitHub</a>` : ""}
                         </div>`
                       : ""
                   }
                 </div>
                 ${p.techStack?.length ? `<div class="t17-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                 ${p.description ? richText(p.description, "t17-entry-content") : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      const eduBlock = educations.length
        ? `<div class="t17-section-block" data-block-id="edu-section">
             ${sectionHeader("Education")}
             ${educations
               .map((edu: any, i: number) => {
                 const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                 const dateStr =
                   edu.startDate || edu.endDate
                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                     : "";
                 return `<div class="t17-entry-block" data-block-id="edu-${i}">
                   <div class="t17-entry-top-row">
                     <div class="t17-entry-title">${edu.schoolname || ""}</div>
                     ${dateStr ? `<div class="t17-entry-date">${dateStr}</div>` : ""}
                   </div>
                   ${
                     edu.degree || edu.location || grade
                       ? `<div class="t17-entry-subtitle">
                         ${edu.degree || ""}
                         ${edu.degree && edu.location ? "  ·  " : ""}
                         ${edu.location || ""}
                         ${grade ? `<div class="t17-education-grade">${grade}</div>` : ""}
                       </div>`
                       : ""
                   }
                   ${edu.text ? richText(edu.text, "t17-edu-content") : ""}
                 </div>`;
               })
               .join("")}
           </div>`
        : "";

      const skillsBlock = (() => {
        if (!hasSkillsContent()) return "";
        const cleanedSkills = cleanQuillHTML(skills);
        return `<div class="t17-section-block" data-block-id="skills-section">
          ${sectionHeader("Skills")}
          <div class="t17-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
        </div>`;
      })();

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? `<div class="t17-section-block">
               ${finalize.customSection
                 .filter((s: any) => s?.name?.trim() || s?.description?.trim())
                 .map(
                   (s: any, i: number) => `
                   <div class="t17-custom-section" data-block-id="custom-${i}">
                     ${s.name ? sectionHeader(s.name) : ""}
                     ${s.description ? richText(s.description, "t17-custom-section-content") : ""}
                   </div>`,
                 )
                 .join("")}
             </div>`
          : "";

      const pdfStyle = forPDF
        ? `<style>.t17-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = `${header}${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t17-page-break";
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
  <title>Resume</title>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t17-resume">${bodyContent}</div>
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

  // ── Page splitter (identical logic to TemplateOne) ─────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t17-resume");
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
  .t17-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t17-resume");
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

          const totalH = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY =
            measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
          const getRelTop = (el: HTMLElement) =>
            el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          const ITEM_SELECTORS = [
            ".t17-entry-block",
            ".t17-entry-top-row",
            ".t17-custom-section",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el),
              bottom = getRelBottom(el);
            if (bottom - top > 8)
              blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Treat each li inside skills as a breakable boundary
          const skillsLis = Array.from(
            resume.querySelectorAll<HTMLElement>(".t17-skills-content li"),
          );
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          resume
            .querySelectorAll<HTMLElement>(".t17-section-header")
            .forEach((title) => {
              const titleTop = getRelTop(title);
              let firstItem: HTMLElement | null = null;
              let sib = title.nextElementSibling as HTMLElement | null;
              while (sib) {
                if (sib.getBoundingClientRect().height > 8) {
                  firstItem = sib;
                  break;
                }
                sib = sib.nextElementSibling as HTMLElement | null;
              }
              if (firstItem) {
                if (firstItem.classList.contains("t17-skills-content")) return;

                const deepChild = firstItem.querySelector<HTMLElement>(
                  ".t17-entry-block, .t17-custom-section",
                );
                const anchor = deepChild || firstItem;
                const anchorBottom = getRelBottom(anchor);
                if (anchorBottom - titleTop > 8) {
                  const sectionId = (title.parentElement as HTMLElement)
                    ?.dataset?.blockId;
                  blocks.push({
                    top: titleTop,
                    bottom: anchorBottom,
                    id: sectionId,
                  });
                }
              }
            });

          blocks.sort((a, b) => a.top - b.top);

          const pageStarts: number[] = [0];
          const pageBreakIds: string[] = [];
          const MAX_PAGES = 20;

          while (pageStarts.length < MAX_PAGES) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;
            let actualCut = naiveCut,
              cutBlockId: string | undefined;
            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (
                block.top >= currentStart &&
                block.bottom > naiveCut &&
                block.top < actualCut
              ) {
                actualCut = block.top;
                cutBlockId = block.id;
              }
            }
            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          document.body.removeChild(iframe);
          (window as any).__resumePageBreakIds = pageBreakIds;

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
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t17-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
</style></head>
<body>
  <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
</body></html>`);
          }
          resolve(pageHtmls);
        };

        const win = iframe.contentWindow as any;
        if (win?.document?.fonts?.ready) {
          win.document.fonts.ready.then(() => {
            setTimeout(() => requestAnimationFrame(doMeasure), 100);
          });
        } else {
          setTimeout(doMeasure, 500);
        }
      });
    },
    [CSS_FOR_MEASURE],
  );

  // ── Debounced updates ──────────────────────────────────────────────────────
  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
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

  // ── Download handler ───────────────────────────────────────────────────────
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
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div className="text-center my-8">
//           <motion.button
//             onClick={handleDownload}
//             disabled={isDownloading}
//             whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//             whileTap={!isDownloading ? { scale: 0.98 } : {}}
//             className={`
//               relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//               text-white transition-all duration-300 shadow-lg
//               ${
//                 isDownloading
//                   ? "bg-gray-400 cursor-not-allowed opacity-80"
//                   : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
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
//                   <span>Generating PDF ...</span>
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

//       {alldata ? (
//         // Thumbnail / card preview (used when alldata is passed — e.g. template picker)
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
//         // Full multi-page preview (used on the editor / download page)
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


const isThumbnail = !!alldata && !viewMode ; 
  return (
    <>
      {/* Download button — hide in thumbnail mode */}
      {!isThumbnail && lastSegment === 'download-resume' &&(
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
        // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
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
        // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
        <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
          {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
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
          ))}
        </div>
      )}
    </>
  );
};

export default TemplateSeventeen;
