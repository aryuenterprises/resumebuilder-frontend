// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
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

// /* ======================================================
//    SHARED CSS
// ====================================================== */

// const styles = `
//   .t3-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background-color: white;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//   }

//   .t3-resume.is-preview {
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

//   .t3-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* Single source of truth for all horizontal indentation */
//   .t3-body {
//     padding: 0 20px;
//   }

//   /* ── HEADER ── */
//   .t3-header {
//     display: flex;
//     justify-content: space-between;
//     background-color: #878787;
//     padding: 4px;
//     border-radius: 16px;
//     color: white;
//   }

//   .t3-header-left {
//     width: 40%;
//     font-size: 27px;
//     font-weight: 500;
//     padding: 12px;
//     text-transform: uppercase;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-header-job {
//     font-size: 14px;
//     font-weight: 400;
//     text-transform: lowercase;
//     margin-top: 4px;
//   }

//   .t3-header-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     padding-bottom: 8px;
//     margin-top: 4px;
//     flex-wrap: wrap;
//   }

//   .t3-header-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: white;
//   }

//   .t3-header-right {
//     width: 60%;
//     padding: 12px;
//     font-size: 14px;
//   }

//   .t3-header-contact-line {
//     text-align: right;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-bottom: 2px;
//   }

//   /* ── SECTION TITLE ── */
//   .t3-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   /* ── SUMMARY ── */
//   .t3-summary {
//     padding-top: 6px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Rich Text Content Styles */
//   .t3-summary ul,
//   .t3-summary ol,
//   .t3-entry-content ul,
//   .t3-entry-content ol,
//   .t3-project-description ul,
//   .t3-project-description ol,
//   .t3-extra ul,
//   .t3-extra ol,
//   .t3-skills-content ul,
//   .t3-skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t3-summary li,
//   .t3-entry-content li,
//   .t3-project-description li,
//   .t3-extra li,
//   .t3-skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   .t3-summary strong,
//   .t3-entry-content strong,
//   .t3-project-description strong,
//   .t3-extra strong,
//   .t3-skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t3-summary em,
//   .t3-entry-content em,
//   .t3-project-description em,
//   .t3-extra em,
//   .t3-skills-content em {
//     font-style: italic !important;
//   }

//   .t3-summary u,
//   .t3-entry-content u,
//   .t3-project-description u,
//   .t3-extra u,
//   .t3-skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Resume Lists */
//   .t3-resume .resume-list {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t3-resume ol.resume-list {
//     list-style-type: decimal !important;
//   }

//   .t3-resume ul.resume-list {
//     list-style-type: disc !important;
//   }

//   /* Skills Content Styles */
//   .t3-skills-block {
//     margin-top: 8px;
//     margin-bottom: 8px;
//   }

//   .t3-skills-content {
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-skills-content p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* ── ENTRY ── */
//   .t3-entry {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   /* Experience Header - Job Title and Date on same line */
//   .t3-experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-experience-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-experience-date {
//     font-size: 14px;
//     color: #4b5563;
//   }

//   /* Experience Subtitle - Company and Location */
//   .t3-experience-subtitle {
//     font-size: 15px;
//     color: #6b7280;
//     font-weight: 500;
//   }

//   /* Education Header - School and Date on same line */
//   .t3-education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-education-school {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-education-date {
//     font-size: 14px;
//     color: #4b5563;
//   }

//   /* Education Subtitle - Degree and Location */
//   .t3-education-subtitle {
//     font-size: 15px;
//     color: #6b7280;
//     margin-bottom: 4px;
//     font-weight: 500;
//   }

//   .t3-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t3-entry-date {
//     font-size: 14px;
//     color: #4b5563;
//     margin-top: 4px;
//   }

//   .t3-entry-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
//   .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
//   .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── EDUCATION GRADE ── */
//   .t3-education-grade {
//     font-size: 13px;
//     color: #6b7280;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── PROJECTS ── */
//   .t3-project-item {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   .t3-project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-project-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t3-project-link {
//     font-size: 12px;
//     color: #6b7280;
//     text-decoration: underline;
//   }

//   .t3-project-tech-stack {
//     font-size: 13px;
//     color: #6b7280;
//     margin: 4px 0;
//   }

//   .t3-project-description {
//     padding-top: 6px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Custom section spacing fix */
//   .t3-custom-section {
//     margin-top: 16px;
//   }

//   .t3-custom-section:first-of-type {
//     margin-top: 0;
//   }

//   .t3-custom-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   .t3-custom-section-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Preserve spaces in paragraphs */
//   .t3-summary p,
//   .t3-entry-content p,
//   .t3-project-description p,
//   .t3-extra p,
//   .t3-skills-content p {
//     white-space: pre-wrap;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t3-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t3-header {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t3-entry, .t3-project-item { page-break-inside: avoid; break-inside: avoid; }
//     .t3-section-title { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === 'string' && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <>
//         <div className="t3-section-title">Skills</div>
//         <div className="t3-skills-block">
//           <div
//             className="t3-skills-content"
//             dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//           />
//         </div>
//       </>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <>
//         <div className="t3-section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t3-project-item">
//             <div className="t3-project-header">
//               <div className="t3-project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t3-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t3-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t3-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t3-project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" , ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t3-project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   /* ======================================================
//      HTML GENERATION — same styles string, preview === PDF
//   ====================================================== */
//   const generateHTML = () => {
//     const addressParts = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t3-section-title">Skills</div>
//         <div class="t3-skills-block">
//           <div class="t3-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t3-section-title">Projects</div>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t3-project-item">
//             <div class="t3-project-header">
//               <div class="t3-project-title">${project.title || ""}</div>
//               <div class="t3-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t3-project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t3-project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `
//               <div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             `
//                 : ""
//             }
//             ${
//               project.description
//                 ? `
//               <div class="t3-project-description">${cleanQuillHTML(project.description)}</div>
//             `
//                 : ""
//             }
//           </div>
//         `,
//           )
//           .join("")}
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t3-header-link">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t3-header-link">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t3-header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//       ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">

//     ${
//       summary
//         ? `
//     <div class="t3-section-title">Summary</div>
//     <div class="t3-summary">${cleanQuillHTML(summary)}</div>`
//         : ""
//     }

//     ${
//       experiences.length > 0
//         ? `
//     <div class="t3-section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const start = formatMonthYear(exp.startDate, false);
//         const end = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t3-entry">
//       <div class="t3-experience-header">
//         <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//         <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//       </div>
//       <div class="t3-experience-subtitle">
//         ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//       </div>
//       ${exp.text ? `<div class="t3-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     ${
//       educations.length > 0
//         ? `
//     <div class="t3-section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//     <div class="t3-entry">
//       <div class="t3-education-header">
//         <div class="t3-education-school">${edu.schoolname || ""}</div>
//         <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//       </div>
//       <div class="t3-education-subtitle">
//         ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//       </div>
//       ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//       ${edu.text ? `<div class="t3-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateSkillsHTML()}

//     ${customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
// <div class="t3-custom-section">
//   ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//   ${s.description ? `<div class="t3-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
// </div>`,
//       )
//       .join("")}

//   </div>
// </div>
// </body>
// </html>`;
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
//     }
//   };

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//         >
//           Download Resume
//         </motion.button>
//       </div>
//       )}

//       <div
//         className={`t3-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t3-header">
//           <div className="t3-header-left">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//             {contact?.jobTitle && (
//               <div className="t3-header-job">
//                 {typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""}
//               </div>
//             )}
//             <div className="t3-header-links">
//               {linkedinUrl?.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
//                 >
//                   LinkedIn
//                 </a>
//               )}
//               {githubUrl?.trim() && (
//                 <a
//                   href={
//                     githubUrl.startsWith("http")
//                       ? githubUrl
//                       : `https://${githubUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
//                 >
//                   GitHub
//                 </a>
//               )}
//               {portfolioUrl?.trim() && (
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="t3-header-right">
//             <div className="t3-header-contact-line">
//               {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
//             </div>
//             {addressParts && (
//               <div className="t3-header-contact-line">{addressParts}</div>
//             )}
//             {formattedDob && (
//               <div className="t3-header-contact-line">{formattedDob}</div>
//             )}
//           </div>
//         </div>

//         {/* ALL BODY CONTENT */}
//         <div className="t3-body">
//           {summary && (
//             <>
//               <div className="t3-section-title">Summary</div>
//               <div
//                 className="t3-summary"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </>
//           )}

//           {experiences.length > 0 && (
//             <>
//               <div className="t3-section-title">Experience</div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={exp.id || i} className="t3-entry">
//                     <div className="t3-experience-header">
//                       <div className="t3-experience-title">
//                         {exp.jobTitle || ""}
//                       </div>
//                       <div className="t3-experience-date">
//                         {start}
//                         {start && end ? " - " : ""}
//                         {end}
//                       </div>
//                     </div>
//                     <div className="t3-experience-subtitle">
//                       {[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* PROJECTS SECTION */}
//           {renderProjects()}

//           {educations.length > 0 && (
//             <>
//               <div className="t3-section-title">Education</div>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 return (
//                   <div key={edu.id || i} className="t3-entry">
//                     <div className="t3-education-header">
//                       <div className="t3-education-school">
//                         {edu.schoolname || ""}
//                       </div>
//                       <div className="t3-education-date">
//                         {[edu.startDate, edu.endDate || "Present"]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     <div className="t3-education-subtitle">
//                       {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                     </div>
//                     {formattedGrade && (
//                       <div className="t3-education-grade">{formattedGrade}</div>
//                     )}
//                     {edu.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* SKILLS SECTION - Now using text editor format */}
//           {renderSkills()}

//           {customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, i) => (
//               <div key={(section as any).id || i} className="t3-custom-section">
//                 {section.name && (
//                   <div className="t3-custom-section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="t3-custom-section-content"
//                     dangerouslySetInnerHTML={{
//                       __html: cleanQuillHTML(section.description),
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//         </div>
//         {/* end .t3-body */}
//       </div>
//     </>
//   );
// };

// export default TemplateThree;

// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
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

// /* ======================================================
//    SHARED CSS - Single source for both preview and PDF
// ====================================================== */

// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   /* Base body styles */
//   body {
//     background: white;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//   }

//   /* Screen preview margins */
//   @media screen {
//     body {
//       padding: 10mm;
//     }
//   }

//   /* PDF margins */
//   @page {
//     size: A4;
//     margin: 10mm;
//   }

//   /* Print margins reset */
//   @media print {
//     body {
//       padding: 0;
//       margin: 0;
//     }
//   }

//   /* Resume container */
//   .t3-resume {
//     max-width: 190mm; /* 210mm - 20mm total margins */
//     margin: 0 auto;
//     background-color: white;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//   }

//   /* Print reset for container */
//   @media print {
//     .t3-resume {
//       max-width: none;
//       margin: 0;
//       padding: 0;
//     }
//   }

//   .t3-resume.is-preview {
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

//   .t3-resume * {
//     box-sizing: border-box;
//   }

//   /* Single source of truth for all horizontal indentation */
//   .t3-body {
//     padding: 0 20px;
//   }

//   /* ── HEADER ── */
//   .t3-header {
//     display: flex;
//     justify-content: space-between;
//     background-color: #878787;
//     padding: 4px;
//     border-radius: 16px;
//     color: white;
//   }

//   .t3-header-left {
//     width: 40%;
//     font-size: 27px;
//     font-weight: 500;
//     padding: 12px;
//     text-transform: uppercase;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-header-job {
//     font-size: 14px;
//     font-weight: 400;
//     text-transform: lowercase;
//     margin-top: 4px;
//   }

//   .t3-header-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     padding-bottom: 8px;
//     margin-top: 4px;
//     flex-wrap: wrap;
//   }

//   .t3-header-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: white;
//   }

//   .t3-header-right {
//     width: 60%;
//     padding: 12px;
//     font-size: 14px;
//   }

//   .t3-header-contact-line {
//     text-align: right;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-bottom: 2px;
//   }

//   /* ── SECTION TITLE ── */
//   .t3-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   /* ── SUMMARY ── */
//   .t3-summary {
//     padding-top: 6px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Rich Text Content Styles */
//   .t3-summary ul,
//   .t3-summary ol,
//   .t3-entry-content ul,
//   .t3-entry-content ol,
//   .t3-project-description ul,
//   .t3-project-description ol,
//   .t3-extra ul,
//   .t3-extra ol,
//   .t3-skills-content ul,
//   .t3-skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t3-summary li,
//   .t3-entry-content li,
//   .t3-project-description li,
//   .t3-extra li,
//   .t3-skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   .t3-summary strong,
//   .t3-entry-content strong,
//   .t3-project-description strong,
//   .t3-extra strong,
//   .t3-skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t3-summary em,
//   .t3-entry-content em,
//   .t3-project-description em,
//   .t3-extra em,
//   .t3-skills-content em {
//     font-style: italic !important;
//   }

//   .t3-summary u,
//   .t3-entry-content u,
//   .t3-project-description u,
//   .t3-extra u,
//   .t3-skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Resume Lists */
//   .t3-resume .resume-list {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t3-resume ol.resume-list {
//     list-style-type: decimal !important;
//   }

//   .t3-resume ul.resume-list {
//     list-style-type: disc !important;
//   }

//   /* Skills Content Styles */
//   .t3-skills-block {
//     margin-top: 8px;
//     margin-bottom: 8px;
//   }

//   .t3-skills-content {
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-skills-content p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* ── ENTRY ── */
//   .t3-entry {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   /* Experience Header - Job Title and Date on same line */
//   .t3-experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-experience-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-experience-date {
//     font-size: 14px;
//     color: #4b5563;
//   }

//   /* Experience Subtitle - Company and Location */
//   .t3-experience-subtitle {
//     font-size: 15px;
//     color: #6b7280;
//     font-weight: 500;
//   }

//   /* Education Header - School and Date on same line */
//   .t3-education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-education-school {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-education-date {
//     font-size: 14px;
//     color: #4b5563;
//   }

//   /* Education Subtitle - Degree and Location */
//   .t3-education-subtitle {
//     font-size: 15px;
//     color: #6b7280;
//     margin-bottom: 4px;
//     font-weight: 500;
//   }

//   .t3-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t3-entry-date {
//     font-size: 14px;
//     color: #4b5563;
//     margin-top: 4px;
//   }

//   .t3-entry-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
//   .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
//   .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── EDUCATION GRADE ── */
//   .t3-education-grade {
//     font-size: 13px;
//     color: #6b7280;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── PROJECTS ── */
//   .t3-project-item {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   .t3-project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-project-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t3-project-link {
//     font-size: 12px;
//     color: #6b7280;
//     text-decoration: underline;
//   }

//   .t3-project-tech-stack {
//     font-size: 13px;
//     color: #6b7280;
//     margin: 4px 0;
//   }

//   .t3-project-description {
//     padding-top: 6px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Custom section spacing fix */
//   .t3-custom-section {
//     margin-top: 16px;
//   }

//   .t3-custom-section:first-of-type {
//     margin-top: 0;
//   }

//   .t3-custom-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   .t3-custom-section-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Preserve spaces in paragraphs */
//   .t3-summary p,
//   .t3-entry-content p,
//   .t3-project-description p,
//   .t3-extra p,
//   .t3-skills-content p {
//     white-space: pre-wrap;
//   }

//   /* ── PRINT OVERRIDES ── */
//   @media print {
//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }
//     .t3-header {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t3-entry, .t3-project-item {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t3-section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//   }
// `;

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

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

//   /* ======================================================
//      SINGLE HTML GENERATION — used for both preview and PDF
//   ====================================================== */
//   const generateHTML = () => {
//     const addressPartsHtml = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t3-section-title">Skills</div>
//         <div class="t3-skills-block">
//           <div class="t3-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t3-section-title">Projects</div>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t3-project-item">
//             <div class="t3-project-header">
//               <div class="t3-project-title">${project.title || ""}</div>
//               <div class="t3-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `
//               <div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             `
//                 : ""
//             }
//             ${
//               project.description
//                 ? `
//               <div class="t3-project-description">${cleanQuillHTML(project.description)}</div>
//             `
//                 : ""
//             }
//           </div>
//         `,
//           )
//           .join("")}
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressPartsHtml ? `<div class="t3-header-contact-line">${addressPartsHtml}</div>` : ""}
//       ${formattedDobHtml ? `<div class="t3-header-contact-line">${formattedDobHtml}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">

//     ${
//       summary
//         ? `
//     <div class="t3-section-title">Summary</div>
//     <div class="t3-summary">${cleanQuillHTML(summary)}</div>`
//         : ""
//     }

//     ${
//       experiences.length > 0
//         ? `
//     <div class="t3-section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const start = formatMonthYear(exp.startDate, false);
//         const end = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t3-entry">
//       <div class="t3-experience-header">
//         <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//         <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//       </div>
//       <div class="t3-experience-subtitle">
//         ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//       </div>
//       ${exp.text ? `<div class="t3-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     ${
//       educations.length > 0
//         ? `
//     <div class="t3-section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//     <div class="t3-entry">
//       <div class="t3-education-header">
//         <div class="t3-education-school">${edu.schoolname || ""}</div>
//         <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//       </div>
//       <div class="t3-education-subtitle">
//         ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//       </div>
//       ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//       ${edu.text ? `<div class="t3-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateSkillsHTML()}

//     ${customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
// <div class="t3-custom-section">
//   ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//   ${s.description ? `<div class="t3-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
// </div>`,
//       )
//       .join("")}

//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD - Uses same HTML as preview
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html,
//           options: {
//             margin: {
//               top: '10mm',
//               right: '10mm',
//               bottom: '10mm',
//               left: '10mm'
//             }
//           }
//         },
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
//     }
//   };

//   /* ======================================================
//      RENDER
//   ====================================================== */
//   return (
//     <>
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

//       {/* Preview - Uses same generateHTML() */}
//       <div
//         className={`t3-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t3-header">
//           <div className="t3-header-left">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//             {contact?.jobTitle && (
//               <div className="t3-header-job">
//                 {typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""}
//               </div>
//             )}
//             <div className="t3-header-links">
//               {linkedinUrl?.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
//                 >
//                   LinkedIn
//                 </a>
//               )}
//               {githubUrl?.trim() && (
//                 <a
//                   href={
//                     githubUrl.startsWith("http")
//                       ? githubUrl
//                       : `https://${githubUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
//                 >
//                   GitHub
//                 </a>
//               )}
//               {portfolioUrl?.trim() && (
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="t3-header-right">
//             <div className="t3-header-contact-line">
//               {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
//             </div>
//             {addressParts && (
//               <div className="t3-header-contact-line">{addressParts}</div>
//             )}
//             {formattedDob && (
//               <div className="t3-header-contact-line">{formattedDob}</div>
//             )}
//           </div>
//         </div>

//         {/* ALL BODY CONTENT */}
//         <div className="t3-body">
//           {summary && (
//             <>
//               <div className="t3-section-title">Summary</div>
//               <div
//                 className="t3-summary"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </>
//           )}

//           {experiences.length > 0 && (
//             <>
//               <div className="t3-section-title">Experience</div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={exp.id || i} className="t3-entry">
//                     <div className="t3-experience-header">
//                       <div className="t3-experience-title">
//                         {exp.jobTitle || ""}
//                       </div>
//                       <div className="t3-experience-date">
//                         {start}
//                         {start && end ? " - " : ""}
//                         {end}
//                       </div>
//                     </div>
//                     <div className="t3-experience-subtitle">
//                       {[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* PROJECTS SECTION */}
//           {projects.length > 0 && (
//             <>
//               <div className="t3-section-title">Projects</div>
//               {projects.map((project: any, index: number) => (
//                 <div key={project.id || index} className="t3-project-item">
//                   <div className="t3-project-header">
//                     <div className="t3-project-title">{project.title}</div>
//                     {(project.liveUrl || project.githubUrl) && (
//                       <div className="t3-project-links">
//                         {project.liveUrl && (
//                           <a
//                             href={
//                               project.liveUrl.startsWith("http")
//                                 ? project.liveUrl
//                                 : `https://${project.liveUrl}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-project-link"
//                           >
//                             Live Demo
//                           </a>
//                         )}
//                         {project.githubUrl && (
//                           <a
//                             href={
//                               project.githubUrl.startsWith("http")
//                                 ? project.githubUrl
//                                 : `https://${project.githubUrl}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-project-link"
//                           >
//                             GitHub
//                           </a>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {project.techStack && project.techStack.length > 0 && (
//                     <div className="t3-project-tech-stack">
//                       <strong>Tech:</strong> {project.techStack.join(" , ")}
//                     </div>
//                   )}
//                   {project.description && (
//                     <div
//                       className="t3-project-description"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(project.description),
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {educations.length > 0 && (
//             <>
//               <div className="t3-section-title">Education</div>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 return (
//                   <div key={edu.id || i} className="t3-entry">
//                     <div className="t3-education-header">
//                       <div className="t3-education-school">
//                         {edu.schoolname || ""}
//                       </div>
//                       <div className="t3-education-date">
//                         {[edu.startDate, edu.endDate || "Present"]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     <div className="t3-education-subtitle">
//                       {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                     </div>
//                     {formattedGrade && (
//                       <div className="t3-education-grade">{formattedGrade}</div>
//                     )}
//                     {edu.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* SKILLS SECTION */}
//           {skills && typeof skills === 'string' && skills.trim() && (() => {
//             const cleanedSkills = cleanQuillHTML(skills);
//             if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;
//             return (
//               <>
//                 <div className="t3-section-title">Skills</div>
//                 <div className="t3-skills-block">
//                   <div
//                     className="t3-skills-content"
//                     dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//                   />
//                 </div>
//               </>
//             );
//           })()}

//           {customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, i) => (
//               <div key={(section as any).id || i} className="t3-custom-section">
//                 {section.name && (
//                   <div className="t3-custom-section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="t3-custom-section-content"
//                     dangerouslySetInnerHTML={{
//                       __html: cleanQuillHTML(section.description),
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//         </div>
//         {/* end .t3-body */}
//       </div>
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
//   useMemo,
//   useCallback,
// } from "react";
// import axios from "axios";
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

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [iframeHeight, setIframeHeight] = useState<number>(1122);
//   const [htmlContent, setHtmlContent] = useState<string>("");

//   useEffect(() => {
//     const handler = (e: MessageEvent) => {
//       if (e.data?.type === "RESUME_HEIGHT") {
//         setIframeHeight(e.data.height);
//       }
//     };
//     window.addEventListener("message", handler);
//     return () => window.removeEventListener("message", handler);
//   }, []);

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

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     /* PDF margins */
//     @page {
//       size: A4;
//       margin: 10mm;
//     }

//     /* Print margins reset */
//     @media print {
//       body {
//         padding: 0;
//         margin: 0;
//       }
//     }

//     /* Resume container */
//     .t3-resume {
//       max-width: 190mm;
//       margin: 0 auto;
//       background-color: white;
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 15px;
//       line-height: 1.5;
//       color: #374151;
//     }

//     @media print {
//       .t3-resume {
//         max-width: none;
//         margin: 0;
//       }
//     }

//     .t3-resume * {
//       box-sizing: border-box;
//     }

//     .t3-body {
//       padding: 0 20px;
//     }

//     /* ── HEADER ── */
//     .t3-header {
//       display: flex;
//       justify-content: space-between;
//       background-color: #878787;
//       padding: 4px;
//       border-radius: 16px;
//       color: white;
//     }

//     .t3-header-left {
//       width: 40%;
//       font-size: 27px;
//       font-weight: 500;
//       padding: 12px;
//       text-transform: uppercase;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-header-job {
//       font-size: 14px;
//       font-weight: 400;
//       text-transform: lowercase;
//       margin-top: 4px;
//     }

//     .t3-header-links {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       padding-bottom: 8px;
//       margin-top: 4px;
//       flex-wrap: wrap;
//     }

//     .t3-header-link {
//       font-size: 14px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: white;
//     }

//     .t3-header-right {
//       width: 60%;
//       padding: 12px;
//       font-size: 14px;
//     }

//     .t3-header-contact-line {
//       text-align: right;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       margin-bottom: 2px;
//     }

//     /* ── SECTION TITLE ── */
//     .t3-section-title {
//       font-size: 22px;
//       font-weight: 600;
//       margin-top: 10px;
//       margin-bottom: 4px;
//       color: #111827;
//     }

//     /* ── SUMMARY ── */
//     .t3-summary {
//       padding-top: 6px;
//       padding-bottom: 10px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Rich Text Content Styles */
//     .t3-summary ul,
//     .t3-summary ol,
//     .t3-entry-content ul,
//     .t3-entry-content ol,
//     .t3-project-description ul,
//     .t3-project-description ol,
//     .t3-extra ul,
//     .t3-extra ol,
//     .t3-skills-content ul,
//     .t3-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t3-summary li,
//     .t3-entry-content li,
//     .t3-project-description li,
//     .t3-extra li,
//     .t3-skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     .t3-summary strong,
//     .t3-entry-content strong,
//     .t3-project-description strong,
//     .t3-extra strong,
//     .t3-skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t3-summary em,
//     .t3-entry-content em,
//     .t3-project-description em,
//     .t3-extra em,
//     .t3-skills-content em {
//       font-style: italic !important;
//     }

//     .t3-summary u,
//     .t3-entry-content u,
//     .t3-project-description u,
//     .t3-extra u,
//     .t3-skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Skills Content Styles */
//     .t3-skills-block {
//       margin-top: 8px;
//       margin-bottom: 8px;
//     }

//     .t3-skills-content {
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── ENTRY ── */
//     .t3-entry {
//       margin-top: 8px;
//       padding-bottom: 6px;
//     }

//     .t3-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-experience-title {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-experience-date {
//       font-size: 14px;
//       color: #4b5563;
//     }

//     .t3-experience-subtitle {
//       font-size: 15px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     .t3-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-education-school {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-education-date {
//       font-size: 14px;
//       color: #4b5563;
//     }

//     .t3-education-subtitle {
//       font-size: 15px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     .t3-entry-content {
//       padding-top: 6px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//     .t3-education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t3-project-item {
//       margin-top: 8px;
//       padding-bottom: 6px;
//     }

//     .t3-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-project-title {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t3-project-link {
//       font-size: 12px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t3-project-tech-stack {
//       font-size: 13px;
//       color: #6b7280;
//       margin: 4px 0;
//     }

//     .t3-project-description {
//       padding-top: 6px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Custom section */
//     .t3-custom-section {
//       margin-top: 16px;
//     }

//     .t3-custom-section:first-of-type {
//       margin-top: 0;
//     }

//     .t3-custom-section-title {
//       font-size: 22px;
//       font-weight: 600;
//       margin-top: 10px;
//       margin-bottom: 4px;
//       color: #111827;
//     }

//     .t3-custom-section-content {
//       padding-top: 6px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Print overrides */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .t3-header {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       .t3-entry, .t3-project-item {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }
//       .t3-section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   // ── Height-reporting script injected into iframe ──────────
//   const HEIGHT_SCRIPT = `
//     <script>
//       function reportHeight() {
//         var h = document.documentElement.scrollHeight || document.body.scrollHeight;
//         window.parent.postMessage({ type: 'RESUME_HEIGHT', height: h }, '*');
//       }
//       if (document.readyState === 'complete') reportHeight();
//       else window.addEventListener('load', reportHeight);
//       if (document.fonts && document.fonts.ready) {
//         document.fonts.ready.then(reportHeight);
//       }
//       // Observe DOM changes to report height updates
//       const observer = new MutationObserver(reportHeight);
//       observer.observe(document.body, { childList: true, subtree: true, attributes: true });
//     </script>
//   `;

//   // ── HTML generation logic (memoized) ───────────────────────
//   const generateHTML = useCallback((): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;
//     const rich = (html: string) => {
//       const c = cleanQuillHTML(html);
//       return c && c !== "<p><br></p>" ? c : "";
//     };

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formDob = formatDateOfBirth(dateOfBirth || "");

//     // Generate skills HTML
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";
//       const cleanedSkills = rich(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";
//       return `
//         <div class="t3-section-title">Skills</div>
//         <div class="t3-skills-block">
//           <div class="t3-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
//       return `
//         <div class="t3-section-title">Projects</div>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t3-project-item">
//             <div class="t3-project-header">
//               <div class="t3-project-title">${project.title || ""}</div>
//               <div class="t3-project-links">
//                 ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//             ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("")}
//       `;
//     };

//     // Generate custom sections HTML
//     const generateCustomSectionsHTML = () => {
//       if (!customSection.length) return "";
//       return customSection
//         .filter((s) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s) => `
//           <div class="t3-custom-section">
//             ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//             ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
//           </div>
//         `,
//         )
//         .join("");
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body>
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressStr ? `<div class="t3-header-contact-line">${addressStr}</div>` : ""}
//       ${formDob ? `<div class="t3-header-contact-line">${formDob}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">
//     ${summary ? `<div class="t3-section-title">Summary</div><div class="t3-summary">${rich(summary)}</div>` : ""}

//     ${
//       experiences.length
//         ? `<div class="t3-section-title">Experience</div>
//       ${experiences
//         .map((exp) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `
//           <div class="t3-entry">
//             <div class="t3-experience-header">
//               <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//               <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     ${
//       educations.length
//         ? `<div class="t3-section-title">Education</div>
//       ${educations
//         .map((edu) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `
//           <div class="t3-entry">
//             <div class="t3-education-header">
//               <div class="t3-education-school">${edu.schoolname || ""}</div>
//               <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//             ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//             ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}`
//         : ""
//     }

//     ${generateSkillsHTML()}
//     ${generateCustomSectionsHTML()}
//   </div>
// </div>
// ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [
//     contact,
//     educations,
//     experiences,
//     skills,
//     projects,
//     customSection,
//     summary,
//     linkedinUrl,
//     portfolioUrl,
//     githubUrl,
//     dateOfBirth,
//   ]);

//   // Simple debounce function without lodash
//   const debouncedUpdate = useCallback((newHtml: string) => {
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current);
//     }
//     debounceTimerRef.current = setTimeout(() => {
//       setHtmlContent(newHtml);
//     }, 300);
//   }, []);

//   // Update HTML when data changes (with debounce)
//   useEffect(() => {
//     const newHtml = generateHTML();
//     debouncedUpdate(newHtml);

//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current);
//       }
//     };
//   }, [generateHTML, debouncedUpdate]);

//   // Initial HTML generation
//   useEffect(() => {
//     setHtmlContent(generateHTML());
//   }, []);

//   // ── PDF download ──────────────────────────────────────────
//   const handleDownload = async () => {
//     try {
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html: generateHTML(),
//           options: {
//             margin: {
//               top: "10mm",
//               right: "10mm",
//               bottom: "10mm",
//               left: "10mm",
//             },
//           },
//         },
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
//     }
//   };

//   // Update iframe content when htmlContent changes
//   useEffect(() => {
//     if (iframeRef.current && htmlContent && !alldata) {
//       const iframe = iframeRef.current;
//       const doc = iframe.contentDocument || iframe.contentWindow?.document;
//       if (doc) {
//         doc.open();
//         doc.write(htmlContent);
//         doc.close();
//       }
//     }
//   }, [htmlContent, alldata]);

//   // ── RENDER ────────────────────────────────────────────────
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div className="text-center my-5">
//           <motion.button
//             onClick={handleDownload}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//           >
//             Download Resume
//           </motion.button>
//         </div>
//       )}

//       {alldata ? (
//         /* THUMBNAIL mode - using direct div for better performance */
//         <div
//           style={{
//             width: "210mm",
//             height: "297mm",
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "auto",
//             pointerEvents: "none",
//             backgroundColor: "white",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//         </div>
//       ) : (
//         /* FULL VIEW mode with iframe */
//         <div
//           style={{
//             width: "210mm",
//             margin: "0 auto",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <iframe
//             ref={iframeRef}
//             title="resume-full"
//             style={{
//               width: "210mm",
//               height: `${iframeHeight}px`,
//               border: "none",
//               display: "block",
//               overflow: "hidden",
//             }}
//             scrolling="no"
//             sandbox="allow-same-origin allow-scripts"
//           />
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

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// //
// // PDF renderer (Puppeteer) options:
// //   page: A4  →  210 mm × 297 mm
// //   margin: 15 mm on all sides
// //
// // At 96 dpi: 1 mm = 3.7795275591 px
// //   210 mm → 793.70 px  → A4_W        = 794
// //   297 mm → 1122.52 px → A4_H        = 1123
// //    15 mm →  56.69 px  → MARGIN       = 57
// //
// // CRITICAL — how Puppeteer pages content:
// //   Puppeteer renders with 15mm margins, so EACH PAGE has:
// //     top margin    = 57px  (white space)
// //     content area  = 1009px  ← this is where content sits
// //     bottom margin = 57px  (white space)
// //     total         = 1123px
// //
// //   Content is paginated in 1009px SLICES, not 1123px slices.
// //   Page N content starts at: N × 1009px (content offset)
// //   Displayed at:             N × 1123px + 57px (with margin offset)
// //
// // For the preview to match, we must:
// //   1. Cut content every PAGE_CONTENT_H (1009px) — same as Puppeteer
// //   2. Render each page with MARGIN (57px) top/bottom white space
// //   3. Page card height = A4_H (1123px) = MARGIN + content + MARGIN
// //
// // CRITICAL — box-sizing: border-box:
// //   .t3-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data ──────────────────────────────────────────────────
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

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t3-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background-color: white;
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 15px;
//       line-height: 1.5;
//       color: #374151;
//     }

//     .t3-body {
//       padding: 0;
//     }

//     /* ── HEADER ── */
//     .t3-header {
//       display: flex;
//       justify-content: space-between;
//       background-color: #878787;
//       padding: 4px;
//       border-radius: 16px;
//       color: white;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-header-left {
//       width: 40%;
//       font-size: 27px;
//       font-weight: 500;
//       padding: 12px;
//       text-transform: uppercase;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-header-job {
//       font-size: 14px;
//       font-weight: 400;
//       text-transform: lowercase;
//       margin-top: 4px;
//     }

//     .t3-header-links {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       padding-bottom: 8px;
//       margin-top: 4px;
//       flex-wrap: wrap;
//     }

//     .t3-header-link {
//       font-size: 14px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: white;
//     }

//     .t3-header-right {
//       width: 60%;
//       padding: 12px;
//       font-size: 14px;
//     }

//     .t3-header-contact-line {
//       text-align: right;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       margin-bottom: 2px;
//     }

//     /* ── SECTION TITLE ── */
//     .t3-section-title {
//       font-size: 22px;
//       font-weight: 600;
//       margin-top: 10px;
//       margin-bottom: 4px;
//       color: #111827;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── SUMMARY ── */
//     .t3-summary {
//       padding-top: 6px;
//       padding-bottom: 10px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Rich Text Content Styles */
//     .t3-summary ul,
//     .t3-summary ol,
//     .t3-entry-content ul,
//     .t3-entry-content ol,
//     .t3-project-description ul,
//     .t3-project-description ol,
//     .t3-extra ul,
//     .t3-extra ol,
//     .t3-skills-content ul,
//     .t3-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t3-summary li,
//     .t3-entry-content li,
//     .t3-project-description li,
//     .t3-extra li,
//     .t3-skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-summary strong,
//     .t3-entry-content strong,
//     .t3-project-description strong,
//     .t3-extra strong,
//     .t3-skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t3-summary em,
//     .t3-entry-content em,
//     .t3-project-description em,
//     .t3-extra em,
//     .t3-skills-content em {
//       font-style: italic !important;
//     }

//     .t3-summary u,
//     .t3-entry-content u,
//     .t3-project-description u,
//     .t3-extra u,
//     .t3-skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Skills Content Styles */
//     .t3-skills-block {
//       margin-top: 8px;
//       margin-bottom: 8px;
//     }

//     .t3-skills-content {
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── ENTRY ── */
//     .t3-entry {
//       margin-top: 8px;
//       padding-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-experience-title {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-experience-date {
//       font-size: 14px;
//       color: #4b5563;
//     }

//     .t3-experience-subtitle {
//       font-size: 15px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     .t3-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-education-school {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-education-date {
//       font-size: 14px;
//       color: #4b5563;
//     }

//     .t3-education-subtitle {
//       font-size: 15px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     .t3-entry-content {
//       padding-top: 6px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//     .t3-education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t3-project-item {
//       margin-top: 8px;
//       padding-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-project-title {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t3-project-link {
//       font-size: 12px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t3-project-tech-stack {
//       font-size: 13px;
//       color: #6b7280;
//       margin: 4px 0;
//     }

//     .t3-project-description {
//       padding-top: 6px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Custom section */
//     .t3-custom-section {
//       margin-top: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-custom-section:first-of-type {
//       margin-top: 0;
//     }

//     .t3-custom-section-title {
//       font-size: 22px;
//       font-weight: 600;
//       margin-top: 10px;
//       margin-bottom: 4px;
//       color: #111827;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t3-custom-section-content {
//       padding-top: 6px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Print overrides */
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
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   const generateHTML = useCallback((forPDF = false): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;
//     const rich = (html: string) => {
//       const c = cleanQuillHTML(html);
//       return c && c !== "<p><br></p>" ? c : "";
//     };

//     // Generate skills HTML
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";
//       const cleanedSkills = rich(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";
//       return `
//         <div class="t3-section-title">Skills</div>
//         <div class="t3-skills-block">
//           <div class="t3-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
//       return `
//         <div class="t3-section-title">Projects</div>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t3-project-item">
//             <div class="t3-project-header">
//               <div class="t3-project-title">${project.title || ""}</div>
//               <div class="t3-project-links">
//                 ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//             ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("")}
//       `;
//     };

//     // Generate custom sections HTML
//     const generateCustomSectionsHTML = () => {
//       if (!customSection.length) return "";
//       return customSection
//         .filter((s) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s) => `
//           <div class="t3-custom-section">
//             ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//             ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
//           </div>
//         `,
//         )
//         .join("");
//     };

//     // PDF override: strip the fixed width/padding from .t3-resume so Puppeteer's
//     // own 15mm margins control the layout
//     const pdfOverrideStyle = forPDF
//       ? `<style>.t3-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//       ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">
//     ${summary ? `<div class="t3-section-title">Summary</div><div class="t3-summary">${rich(summary)}</div>` : ""}

//     ${
//       experiences.length
//         ? `<div class="t3-section-title">Experience</div>
//       ${experiences
//         .map((exp) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `
//           <div class="t3-entry">
//             <div class="t3-experience-header">
//               <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//               <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     ${
//       educations.length
//         ? `<div class="t3-section-title">Education</div>
//       ${educations
//         .map((edu) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `
//           <div class="t3-entry">
//             <div class="t3-education-header">
//               <div class="t3-education-school">${edu.schoolname || ""}</div>
//               <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//             ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//             ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}`
//         : ""
//     }

//     ${generateSkillsHTML()}
//     ${generateCustomSectionsHTML()}
//   </div>
// </div>
// </body>
// </html>`;
//   }, [
//     contact,
//     educations,
//     experiences,
//     skills,
//     projects,
//     customSection,
//     summary,
//     linkedinUrl,
//     portfolioUrl,
//     githubUrl,
//     addressParts,
//     formattedDob,
//   ]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — mirrors Puppeteer's page-break-inside:avoid logic
//   // (Same as Template One)
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const iframe = measureRef.current;
//         if (!iframe) {
//           resolve([fullHtml]);
//           return;
//         }

//         const doc = iframe.contentDocument || iframe.contentWindow?.document;
//         if (!doc) {
//           resolve([fullHtml]);
//           return;
//         }

//         doc.open();
//         doc.write(fullHtml);
//         doc.close();

//         const doSplit = () => {
//           const resume = doc.querySelector<HTMLElement>(".t3-resume");
//           if (!resume) {
//             resolve([fullHtml]);
//             return;
//           }

//           const resumeTop =
//             resume.getBoundingClientRect().top +
//             (doc.documentElement.scrollTop || doc.body.scrollTop);
//           const totalH = resume.scrollHeight;

//           // ── Collect avoid-break elements ──────────────────────────────────
//           const AVOID_SELECTORS = [
//             ".t3-header",
//             ".t3-entry",
//             ".t3-project-item",
//             ".t3-section-title",
//             ".t3-custom-section",
//           ].join(", ");

//           interface Block {
//             top: number;
//             bottom: number;
//           }
//           const blocks: Block[] = [];

//           resume
//             .querySelectorAll<HTMLElement>(AVOID_SELECTORS)
//             .forEach((el) => {
//               const rect = el.getBoundingClientRect();
//               const elTop =
//                 rect.top -
//                 resumeTop +
//                 (doc.documentElement.scrollTop || doc.body.scrollTop);
//               const elBot =
//                 rect.bottom -
//                 resumeTop +
//                 (doc.documentElement.scrollTop || doc.body.scrollTop);
//               if (elBot - elTop > 8) blocks.push({ top: elTop, bottom: elBot });
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate actual page cut points ──────────────────────────────
//           const pageStarts: number[] = [0];

//           while (true) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;

//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 actualCut = block.top;
//                 break;
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//           }

//           // ── Build one HTML doc per page ───────────────────────────────────
//           const pageHtmls = pageStarts.map(
//             (contentOffsetY) => `<!DOCTYPE html>
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
//       position: relative;
//       width: ${A4_W}px;
//       height: ${A4_H}px;
//       background: white;
//       overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute;
//       top: ${MARGIN}px;
//       left: 0;
//       width: ${A4_W}px;
//       height: ${PAGE_CONTENT_H}px;
//       overflow: hidden;
//     }
//     .page-shift {
//       position: absolute;
//       top: ${-contentOffsetY}px;
//       left: 0;
//       width: ${A4_W}px;
//     }
//     .t3-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important;
//       padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resume.outerHTML}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`,
//           );

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => {
//             typeof win.requestAnimationFrame === "function"
//               ? win.requestAnimationFrame(doSplit)
//               : setTimeout(doSplit, 0);
//           });
//         } else {
//           setTimeout(doSplit, 350);
//         }
//       });
//     },
//     [CSS],
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
//     setHtmlContent(generateHTML());
//   }, [generateHTML]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download ──────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html: generateHTML(true),
//         },
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
//     }
//   };

//   // ── RENDER ────────────────────────────────────────────────
//   return (
//     <>
//       {/* Invisible measurement iframe */}
//       <iframe
//         ref={measureRef}
//         title="resume-measure"
//         aria-hidden="true"
//         style={{
//           position: "fixed",
//           top: "-99999px",
//           left: "-99999px",
//           width: `${A4_W}px`,
//           height: `${A4_H * 10}px`,
//           border: "none",
//           visibility: "hidden",
//           pointerEvents: "none",
//         }}
//         sandbox="allow-same-origin allow-scripts"
//       />

//       {/* Download button */}
//       {lastSegment === "download-resume" && (
//         <div className="text-center my-5">
//           <motion.button
//             onClick={handleDownload}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//           >
//             Download Resume
//           </motion.button>
//         </div>
//       )}

//       {alldata ? (
//         // ── THUMBNAIL mode: first page only, scaled 36% ──────────────────
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
//         // ── FULL PREVIEW mode: paginated A4 pages ────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               {/* Page pill */}
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

//               {/* A4 card */}
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

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// // At 96 dpi: 210mm→794px, 297mm→1123px, 15mm→57px
// // PAGE_CONTENT_H = 1123 - 57*2 = 1009px (usable content per page)
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data ──────────────────────────────────────────────────
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

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

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
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 15px;
//       line-height: 1.5;
//       color: #374151;
//     }

//     .t3-body {
//       padding: 0;
//     }

//     /* ── HEADER ── */
//     .t3-header {
//       display: flex;
//       justify-content: space-between;
//       background-color: #878787;
//       padding: 4px;
//       border-radius: 16px;
//       color: white;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-header-left {
//       width: 40%;
//       font-size: 27px;
//       font-weight: 500;
//       padding: 12px;
//       text-transform: uppercase;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-header-job {
//       font-size: 14px;
//       font-weight: 400;
//       text-transform: lowercase;
//       margin-top: 4px;
//     }

//     .t3-header-links {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       padding-bottom: 8px;
//       margin-top: 4px;
//       flex-wrap: wrap;
//     }

//     .t3-header-link {
//       font-size: 14px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: white;
//     }

//     .t3-header-right {
//       width: 60%;
//       padding: 12px;
//       font-size: 14px;
//     }

//     .t3-header-contact-line {
//       text-align: right;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       margin-bottom: 2px;
//     }

//     /* ── SECTION TITLE ── */
//     .t3-section-title {
//       font-size: 22px;
//       font-weight: 600;
//       margin-top: 10px;
//       margin-bottom: 4px;
//       color: #111827;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t3-resume p {
//       margin: 0 0 0 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── SUMMARY ── */
//     .t3-summary {
//       padding-top: 6px;
//       padding-bottom: 10px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Rich Text Content Styles */
//     .t3-summary ul,
//     .t3-summary ol,
//     .t3-entry-content ul,
//     .t3-entry-content ol,
//     .t3-project-description ul,
//     .t3-project-description ol,
//     .t3-extra ul,
//     .t3-extra ol,
//     .t3-skills-content ul,
//     .t3-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t3-summary li,
//     .t3-entry-content li,
//     .t3-project-description li,
//     .t3-extra li,
//     .t3-skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-summary strong,
//     .t3-entry-content strong,
//     .t3-project-description strong,
//     .t3-extra strong,
//     .t3-skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t3-summary em,
//     .t3-entry-content em,
//     .t3-project-description em,
//     .t3-extra em,
//     .t3-skills-content em {
//       font-style: italic !important;
//     }

//     .t3-summary u,
//     .t3-entry-content u,
//     .t3-project-description u,
//     .t3-extra u,
//     .t3-skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Skills Content Styles */
//     .t3-skills-block {
//       margin-top: 8px;
//       margin-bottom: 8px;
//     }

//     .t3-skills-content {
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── ENTRY ── */
//     .t3-entry {
//       margin-top: 8px;
//       padding-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-experience-title {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-experience-date {
//       font-size: 14px;
//       color: #4b5563;
//     }

//     .t3-experience-subtitle {
//       font-size: 15px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     .t3-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-education-school {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-education-date {
//       font-size: 14px;
//       color: #4b5563;
//     }

//     .t3-education-subtitle {
//       font-size: 15px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     .t3-entry-content {
//       padding-top: 6px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//     .t3-education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t3-project-item {
//       margin-top: 8px;
//       padding-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t3-project-title {
//       font-size: 18px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t3-project-link {
//       font-size: 12px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t3-project-tech-stack {
//       font-size: 13px;
//       color: #6b7280;
//       margin: 4px 0;
//     }

//     .t3-project-description {
//       padding-top: 6px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Custom section */
//     .t3-custom-section {
//       margin-top: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-custom-section:first-of-type {
//       margin-top: 0;
//     }

//     .t3-custom-section-title {
//       font-size: 22px;
//       font-weight: 600;
//       margin-top: 10px;
//       margin-bottom: 4px;
//       color: #111827;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t3-custom-section-content {
//       padding-top: 6px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 15px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Page break marker — injected at exact cut points for PDF */
//     .t3-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     /* Print overrides */
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
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   // pageBreakIds: array of element data-ids where page breaks should be injected
//   // Used when forPDF=true to make Puppeteer break at the same points as preview
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const rich = (html: string) => {
//         const c = cleanQuillHTML(html);
//         return c && c !== "<p><br></p>" ? c : "";
//       };

//       // Generate skills HTML
//       const generateSkillsHTML = () => {
//         if (!skills || (typeof skills === "string" && !skills.trim()))
//           return "";
//         const cleanedSkills = rich(skills);
//         if (
//           !cleanedSkills ||
//           cleanedSkills === "<p><br></p>" ||
//           cleanedSkills === ""
//         )
//           return "";
//         return `
//         <div class="t3-section-content" data-block-id="skills-section">
//           <div class="t3-section-title">Skills</div>
//           <div class="t3-skills-block">
//             <div class="t3-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
//           </div>
//         </div>
//       `;
//       };

//       // Generate projects HTML
//       const generateProjectsHTML = () => {
//         if (!projects || projects.length === 0) return "";
//         return `
//         <div class="t3-section-content" data-block-id="proj-section">
//           <div class="t3-section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any, i: number) => `
//             <div class="t3-project-item" data-block-id="proj-${i}">
//               <div class="t3-project-header">
//                 <div class="t3-project-title">${project.title || ""}</div>
//                 <div class="t3-project-links">
//                   ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//               ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//       };

//       // Generate custom sections HTML
//       const generateCustomSectionsHTML = () => {
//         if (!customSection.length) return "";
//         return customSection
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s, i: number) => `
//           <div class="t3-custom-section" data-block-id="custom-${i}">
//             ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//             ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("");
//       };

//       // PDF override: strip the fixed width/padding from .t3-resume so Puppeteer's
//       // own 15mm margins control the layout
//       const pdfOverrideStyle = forPDF
//         ? `<style>.t3-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       // Build the full HTML body content
//       let bodyContent = `
//   <!-- HEADER -->
//   <div class="t3-header" data-block-id="header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//       ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">
//     ${summary ? `<div class="t3-section-content" data-block-id="summary"><div class="t3-section-title">Summary</div><div class="t3-summary">${rich(summary)}</div></div>` : ""}

//     ${
//       experiences.length
//         ? `<div class="t3-section-content" data-block-id="exp-section"><div class="t3-section-title">Experience</div>
//       ${experiences
//         .map((exp, i: number) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `
//           <div class="t3-entry" data-block-id="exp-${i}">
//             <div class="t3-experience-header">
//               <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//               <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}</div>`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     ${
//       educations.length
//         ? `<div class="t3-section-content" data-block-id="edu-section"><div class="t3-section-title">Education</div>
//       ${educations
//         .map((edu, i: number) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `
//           <div class="t3-entry" data-block-id="edu-${i}">
//             <div class="t3-education-header">
//               <div class="t3-education-school">${edu.schoolname || ""}</div>
//               <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//             ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//             ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}</div>`
//         : ""
//     }

//     ${generateSkillsHTML()}
//     ${generateCustomSectionsHTML()}
//   </div>
// `;

//       // For PDF: inject <div class="t3-page-break"> before each element
//       // whose data-block-id matches one of the pageBreakIds
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
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER
//   //
//   // Returns both the page HTMLs for preview AND the pageBreakIds for PDF.
//   //
//   // KEY INSIGHT — why preview ≠ PDF previously:
//   //   Preview clips content at pixel offsets.
//   //   PDF (Puppeteer) flows content and applies CSS page-break rules.
//   //   These two approaches diverge for any non-trivial layout.
//   //
//   // THE FIX:
//   //   1. Calculate cut points by measuring element positions (preview logic)
//   //   2. Find which data-block-id element starts each new page
//   //   3. Store those IDs as pageBreakIds
//   //   4. When generating PDF HTML, inject <div class="t3-page-break"> before
//   //      those elements — forcing Puppeteer to break at the same points
//   //
//   // PAGE CLIP FIX (preview):
//   //   clip height = nextPageStart - thisPageStart (not always PAGE_CONTENT_H)
//   //   Prevents content bleeding past the cut point on each page.
//   // ─────────────────────────────────────────────────────────────────────────
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

//         // Hidden measurement iframe — real iframe so fonts match render iframes
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

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t3-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           // Force unconstrained layout
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

//           // ── Collect avoid-break blocks ──────────────────────────────
//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".t3-header",
//             ".t3-entry",
//             ".t3-project-item",
//             ".t3-custom-section",
//             ".t3-skills-content",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // Section title + first item paired
//           resume
//             .querySelectorAll<HTMLElement>(".t3-section-title")
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
//                   ".t3-entry, .t3-project-item, .t3-custom-section, .t3-skills-content",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - titleTop > 8) {
//                   // ID = the section-content wrapper (title's parent)
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

//           // ── Calculate cut points ────────────────────────────────────
//           const pageStarts: number[] = [0];
//           // pageBreakIds[i] = data-block-id of element starting page i+1
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

//           document.body.removeChild(iframe);

//           // ── Store pageBreakIds so PDF download can use them ─────────
//           // We store on window temporarily — PDF download reads them
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           // ── Build preview page HTMLs ────────────────────────────────
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             // KEY FIX: clip at actual cut point, not always PAGE_CONTENT_H
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

//   // ── PDF download ─────────────────────────────────────────────────────────
//   // Reads pageBreakIds calculated during splitIntoPages and passes them to
//   // generateHTML so Puppeteer breaks at the exact same points as the preview.
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
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
//     }
//   };

//   // ── RENDER ────────────────────────────────────────────────
//   return (
//     <>
//       {/* Download button */}
//       {/* {lastSegment === "download-resume" && ( */}
//         <div className="text-center my-5">
//           <motion.button
//             onClick={handleDownload}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//           >
//             Download Resume
//           </motion.button>
//         </div>
//       {/* )} */}

//       {alldata ? (
//         // ── THUMBNAIL mode: first page only, scaled 36% ──────────────────
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
//         // ── FULL PREVIEW mode: paginated A4 pages ────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               {/* Page pill */}
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

//               {/* A4 card */}
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

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// // At 96 dpi: 210mm→794px, 297mm→1123px, 15mm→57px
// // PAGE_CONTENT_H = 1123 - 57*2 = 1009px (usable content per page)
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data ──────────────────────────────────────────────────
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

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

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
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 13px;
//       line-height: 1.4;
//       color: #374151;
//     }

//     .t3-body {
//       padding: 0;
//     }

//     /* ── HEADER ── */
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

//     /* ── SECTION TITLE ── */
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

//     /* ── SUMMARY ── */
//     .t3-summary {
//       padding-top: 3px;
//       padding-bottom: 6px;
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Rich Text Content Styles */
//     .t3-summary ul,
//     .t3-summary ol,
//     .t3-entry-content ul,
//     .t3-entry-content ol,
//     .t3-project-description ul,
//     .t3-project-description ol,
//     .t3-extra ul,
//     .t3-extra ol,
//     .t3-skills-content ul,
//     .t3-skills-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t3-summary li,
//     .t3-entry-content li,
//     .t3-project-description li,
//     .t3-extra li,
//     .t3-skills-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.4 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-summary strong,
//     .t3-entry-content strong,
//     .t3-project-description strong,
//     .t3-extra strong,
//     .t3-skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t3-summary em,
//     .t3-entry-content em,
//     .t3-project-description em,
//     .t3-extra em,
//     .t3-skills-content em {
//       font-style: italic !important;
//     }

//     .t3-summary u,
//     .t3-entry-content u,
//     .t3-project-description u,
//     .t3-extra u,
//     .t3-skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Skills Content Styles */
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

//     .t3-skills-content p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.4 !important;
//     }

//     /* ── ENTRY ── */
//     .t3-entry {
//       margin-top: 4px;
//       padding-bottom: 3px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-bottom: 2px;
//     }

//     .t3-experience-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-experience-date {
//       font-size: 12px;
//       color: #4b5563;
//     }

//     .t3-experience-subtitle {
//       font-size: 13px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     .t3-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-bottom: 2px;
//     }

//     .t3-education-school {
//       font-size: 14px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t3-education-date {
//       font-size: 12px;
//       color: #4b5563;
//     }

//     .t3-education-subtitle {
//       font-size: 13px;
//       color: #6b7280;
//       margin-bottom: 2px;
//       font-weight: 500;
//     }

//     .t3-entry-content {
//       padding-top: 3px;
//       padding-bottom: 3px;
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.4 !important; }
//     .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
//     .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.4 !important; margin-bottom: 1px !important; }

//     .t3-education-grade {
//       font-size: 12px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t3-project-item {
//       margin-top: 4px;
//       padding-bottom: 3px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t3-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-bottom: 2px;
//     }

//     .t3-project-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #111827;
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

//     .t3-project-description {
//       padding-top: 3px;
//       color: #374151;
//       font-size: 13px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
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

//     /* Page break marker — injected at exact cut points for PDF */
//     .t3-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     /* Print overrides */
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
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   // pageBreakIds: array of element data-ids where page breaks should be injected
//   // Used when forPDF=true to make Puppeteer break at the same points as preview
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const rich = (html: string) => {
//         const c = cleanQuillHTML(html);
//         return c && c !== "<p><br></p>" ? c : "";
//       };

//       // Generate skills HTML
//       const generateSkillsHTML = () => {
//         if (!skills || (typeof skills === "string" && !skills.trim()))
//           return "";
//         const cleanedSkills = rich(skills);
//         if (
//           !cleanedSkills ||
//           cleanedSkills === "<p><br></p>" ||
//           cleanedSkills === ""
//         )
//           return "";
//         return `
//         <div class="t3-section-content" data-block-id="skills-section">
//           <div class="t3-section-title">Skills</div>
//           <div class="t3-skills-block">
//             <div class="t3-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
//           </div>
//         </div>
//       `;
//       };

//       // Generate projects HTML
//       const generateProjectsHTML = () => {
//         if (!projects || projects.length === 0) return "";
//         return `
//         <div class="t3-section-content" data-block-id="proj-section">
//           <div class="t3-section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any, i: number) => `
//             <div class="t3-project-item" data-block-id="proj-${i}">
//               <div class="t3-project-header">
//                 <div class="t3-project-title">${project.title || ""}</div>
//                 <div class="t3-project-links">
//                   ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//               ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//       };

//       // Generate custom sections HTML
//       const generateCustomSectionsHTML = () => {
//         if (!customSection.length) return "";
//         return customSection
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s, i: number) => `
//           <div class="t3-custom-section" data-block-id="custom-${i}">
//             ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
//             ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("");
//       };

//       // PDF override: strip the fixed width/padding from .t3-resume so Puppeteer's
//       // own 15mm margins control the layout
//       const pdfOverrideStyle = forPDF
//         ? `<style>.t3-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       // Build the full HTML body content
//       let bodyContent = `
//   <!-- HEADER -->
//   <div class="t3-header" data-block-id="header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t3-header-link" target="_blank">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t3-header-link" target="_blank">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t3-header-link" target="_blank">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//       ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">
//     ${summary ? `<div class="t3-section-content" data-block-id="summary"><div class="t3-section-title">Summary</div><div class="t3-summary">${rich(summary)}</div></div>` : ""}

//     ${
//       experiences.length
//         ? `<div class="t3-section-content" data-block-id="exp-section"><div class="t3-section-title">Experience</div>
//       ${experiences
//         .map((exp, i: number) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate
//             ? formatMonthYear(exp.endDate, false)
//             : exp.startDate
//               ? "Present"
//               : "";
//           return `
//           <div class="t3-entry" data-block-id="exp-${i}">
//             <div class="t3-experience-header">
//               <div class="t3-experience-title">${exp.jobTitle || ""}</div>
//               <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}</div>`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     ${
//       educations.length
//         ? `<div class="t3-section-content" data-block-id="edu-section"><div class="t3-section-title">Education</div>
//       ${educations
//         .map((edu, i: number) => {
//           const formattedGrade = formatGradeToCgpdAndPercentage(
//             edu.grade || "",
//           );
//           return `
//           <div class="t3-entry" data-block-id="edu-${i}">
//             <div class="t3-education-header">
//               <div class="t3-education-school">${edu.schoolname || ""}</div>
//               <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//             ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
//             ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//         })
//         .join("")}</div>`
//         : ""
//     }

//     ${generateSkillsHTML()}
//     ${generateCustomSectionsHTML()}
//   </div>
// `;

//       // For PDF: inject <div class="t3-page-break"> before each element
//       // whose data-block-id matches one of the pageBreakIds
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
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER
//   //
//   // Returns both the page HTMLs for preview AND the pageBreakIds for PDF.
//   //
//   // KEY INSIGHT — why preview ≠ PDF previously:
//   //   Preview clips content at pixel offsets.
//   //   PDF (Puppeteer) flows content and applies CSS page-break rules.
//   //   These two approaches diverge for any non-trivial layout.
//   //
//   // THE FIX:
//   //   1. Calculate cut points by measuring element positions (preview logic)
//   //   2. Find which data-block-id element starts each new page
//   //   3. Store those IDs as pageBreakIds
//   //   4. When generating PDF HTML, inject <div class="t3-page-break"> before
//   //      those elements — forcing Puppeteer to break at the same points
//   //
//   // PAGE CLIP FIX (preview):
//   //   clip height = nextPageStart - thisPageStart (not always PAGE_CONTENT_H)
//   //   Prevents content bleeding past the cut point on each page.
//   // ─────────────────────────────────────────────────────────────────────────
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

//         // Hidden measurement iframe — real iframe so fonts match render iframes
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

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t3-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           // Force unconstrained layout
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

//           // ── Collect avoid-break blocks ──────────────────────────────
//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".t3-header",
//             ".t3-entry",
//             ".t3-project-item",
//             ".t3-custom-section",
//             ".t3-skills-content",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // Section title + first item paired
//           resume
//             .querySelectorAll<HTMLElement>(".t3-section-title")
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
//                   ".t3-entry, .t3-project-item, .t3-custom-section, .t3-skills-content",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - titleTop > 8) {
//                   // ID = the section-content wrapper (title's parent)
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

//           // ── Calculate cut points ────────────────────────────────────
//           const pageStarts: number[] = [0];
//           // pageBreakIds[i] = data-block-id of element starting page i+1
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

//           document.body.removeChild(iframe);

//           // ── Store pageBreakIds so PDF download can use them ─────────
//           // We store on window temporarily — PDF download reads them
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           // ── Build preview page HTMLs ────────────────────────────────
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             // KEY FIX: clip at actual cut point, not always PAGE_CONTENT_H
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

//   // ── PDF download ─────────────────────────────────────────────────────────
//   // Reads pageBreakIds calculated during splitIntoPages and passes them to
//   // generateHTML so Puppeteer breaks at the exact same points as the preview.
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//        const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html:pdfHtml },
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
//     }
//   };

//   // ── RENDER ────────────────────────────────────────────────
//   return (
//     <>
//       {/* Download button */}
//       {lastSegment === "download-resume" && (
//         <div className="text-center my-5">
//           <motion.button
//             onClick={handleDownload}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//           >
//             Download Resume
//           </motion.button>
//         </div>
//       )}

//       {alldata ? (
//         // ── THUMBNAIL mode: first page only, scaled 36% ──────────────────
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
//         // ── FULL PREVIEW mode: paginated A4 pages ────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               {/* Page pill */}
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

//               {/* A4 card */}
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
} from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
} from "@/app/utils";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import {
  ResumeCustomization,
  SectionKey,
  DEFAULT_SECTION_ORDER,
} from "@/app/(resume)/download-resume/page";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateThreeProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateThree: React.FC<TemplateThreeProps> = ({
  alldata,
  customization,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";
  const activeSectionOrder: SectionKey[] = customization?.sectionOrder ?? [
    ...DEFAULT_SECTION_ORDER,
  ];

  // ── Data ──────────────────────────────────────────────────────────────────
  const contact = alldata?.contact || context?.contact || ({} as Contact);
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills?.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
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

  // ── Complete Font import map ────────────────────────────────────────────────
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

  // ── CSS builder with dynamic font ───────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page {
      size: A4;
      margin: 15mm;
    }

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

    .t3-body {
      padding: 0;
    }

    /* Header */
    .t3-header {
      display: flex;
      justify-content: space-between;
      background-color: #878787;
      padding: 3px;
      border-radius: 12px;
      color: white;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t3-header-left {
      width: 40%;
      font-size: 22px;
      font-weight: 500;
      padding: 8px;
      text-transform: uppercase;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t3-header-job {
      font-size: 12px;
      font-weight: 400;
      text-transform: lowercase;
      margin-top: 2px;
    }

    .t3-header-links {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 4px;
      margin-top: 2px;
      flex-wrap: wrap;
    }

    .t3-header-link {
      font-size: 12px;
      font-weight: 600;
      text-decoration: underline;
      color: white;
    }

    .t3-header-right {
      width: 60%;
      padding: 8px;
      font-size: 12px;
    }

    .t3-header-contact-line {
      text-align: right;
      word-wrap: break-word;
      overflow-wrap: break-word;
      margin-bottom: 1px;
    }

    /* Section title */
    .t3-section-title {
      font-size: 18px;
      font-weight: 600;
      margin-top: 8px;
      margin-bottom: 2px;
      color: #111827;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t3-resume p {
      margin: 0 0 0 0 !important;
      padding: 0 !important;
      line-height: 1.4 !important;
    }

    /* Summary */
    .t3-summary {
      padding-top: 3px;
      padding-bottom: 6px;
      color: #374151;
      font-size: 13px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Rich Text Content Styles */
    .t3-summary ul, .t3-summary ol, .t3-entry-content ul, .t3-entry-content ol,
    .t3-project-description ul, .t3-project-description ol, .t3-extra ul, .t3-extra ol,
    .t3-skills-content ul, .t3-skills-content ol {
      margin: 4px 0 4px 20px !important;
      padding-left: 0 !important;
    }

    .t3-summary li, .t3-entry-content li, .t3-project-description li,
    .t3-extra li, .t3-skills-content li {
      margin-bottom: 2px !important;
      line-height: 1.4 !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Skills */
    .t3-skills-block {
      margin-top: 4px;
      margin-bottom: 4px;
    }

    .t3-skills-content {
      color: #374151;
      font-size: 13px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Entry */
    .t3-entry {
      margin-top: 4px;
      padding-bottom: 3px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t3-experience-header, .t3-education-header, .t3-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 2px;
    }

    .t3-experience-title, .t3-education-school, .t3-project-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .t3-experience-date, .t3-education-date {
      font-size: 12px;
      color: #4b5563;
    }

    .t3-experience-subtitle, .t3-education-subtitle {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }

    .t3-entry-content, .t3-project-description {
      padding-top: 3px;
      padding-bottom: 3px;
      color: #374151;
      font-size: 13px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t3-project-links {
      display: flex;
      gap: 10px;
    }

    .t3-project-link {
      font-size: 11px;
      color: #6b7280;
      text-decoration: underline;
    }

    .t3-project-tech-stack {
      font-size: 12px;
      color: #6b7280;
      margin: 2px 0;
    }

    .t3-education-grade {
      font-size: 12px;
      color: #6b7280;
      margin-top: 2px;
      font-weight: 500;
    }

    /* Custom section */
    .t3-custom-section {
      margin-top: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t3-custom-section:first-of-type {
      margin-top: 0;
    }

    .t3-custom-section-title {
      font-size: 18px;
      font-weight: 600;
      margin-top: 6px;
      margin-bottom: 2px;
      color: #111827;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t3-custom-section-content {
      padding-top: 3px;
      padding-bottom: 3px;
      color: #374151;
      font-size: 13px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Page break marker */
    .t3-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block;
      height: 0;
      margin: 0;
      padding: 0;
    }

    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .t3-header {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `,
    [],
  );

  const CSS = buildCSS(activeFontFamily);

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) =>
    url.startsWith("http") ? url : `https://${url}`;

  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── Section builders ──────────────────────────────────────────────────────
 

  // ── HTML builder with section ordering ───────────────────────────────────
  const generateHTML = useCallback(
    (
      forPDF = false,
      pageBreakIds: string[] = [],
      skillsCutIndex = -1,
    ): string => {
      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link rel="preconnect" href="https://fonts.googleapis.com">
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
          : "";

              // ── Section builders (inside generateHTML so forPDF & skillsCutIndex are in scope)
  // AFTER (full real implementation inside generateHTML)
const sectionBuilders: Record<SectionKey, () => string> = {
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
           ${experiences.map((exp, i: number) => {
             const start = formatMonthYear(exp.startDate, false);
             const end = exp.endDate
               ? formatMonthYear(exp.endDate, false)
               : exp.startDate ? "Present" : "";
             return `<div class="t3-entry" data-block-id="exp-${i}">
               <div class="t3-experience-header">
                 <div class="t3-experience-title">${exp.jobTitle || ""}</div>
                 <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
               </div>
               <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
               ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
             </div>`;
           }).join("")}
         </div>`
      : "",

  projects: () =>
    projects.length
      ? `<div class="t3-section-content" data-block-id="proj-section">
           <div class="t3-section-title">Projects</div>
           ${projects.map((project: any, i: number) =>
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
             </div>`
           ).join("")}
         </div>`
      : "",

  education: () =>
    educations.length
      ? `<div class="t3-section-content" data-block-id="edu-section">
           <div class="t3-section-title">Education</div>
           ${educations.map((edu, i: number) => {
             const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
             return `<div class="t3-entry" data-block-id="edu-${i}">
               <div class="t3-education-header">
                 <div class="t3-education-school">${edu.schoolname || ""}</div>
                 <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
               </div>
               <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
               ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
               ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
             </div>`;
           }).join("")}
         </div>`
      : "",

  skills: () => {
    const cleanedSkills = rich(skills);
    if (!skills || !cleanedSkills || cleanedSkills === "<p><br></p>") return "";

    if (forPDF && skillsCutIndex >= 0) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cleanedSkills;
      const allLis = Array.from(tempDiv.querySelectorAll("li"));
      if (skillsCutIndex < allLis.length) {
        const beforeLis = allLis.slice(0, skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
        const afterLis = allLis.slice(skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
        return `<div class="t3-section-content" data-block-id="skills-section">
          <div class="t3-section-title">Skills</div>
          <div class="t3-skills-block">
            <div class="t3-skills-content"><ul>${beforeLis}</ul></div>
          </div>
          <div class="t3-page-break"></div>
          <div class="t3-skills-block">
            <div class="t3-skills-content"><ul>${afterLis}</ul></div>
          </div>
        </div>`;
      }
    }

    return `<div class="t3-section-content" data-block-id="skills-section">
      <div class="t3-section-title">Skills</div>
      <div class="t3-skills-block">
        <div class="t3-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
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
      .map((s, i: number) =>
        `<div class="t3-custom-section" data-block-id="custom-${i}">
          ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
          ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
        </div>`
      )
      .join("");
  },
};


      const pdfOverrideStyle = forPDF
        ? `<style>.t3-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      // Build sections in the order defined by customization
      const sectionsHTML = activeSectionOrder
        .map((key) => sectionBuilders[key]?.() ?? "")
        .join("");

      let bodyContent = `
        <!-- HEADER -->
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

      // Inject page breaks for PDF
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
  ${fontPreloads}
  <style>${CSS}</style>
  ${pdfOverrideStyle}
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
      activeSectionOrder,
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
      CSS,
    ],
  );

  // ── Page splitter ─────────────────────────────────────────────────────────
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
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    ${CSS}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    .t3-resume {
      width: ${A4_W}px !important;
      padding-left: ${MARGIN}px !important;
      padding-right: ${MARGIN}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      margin: 0 !important; box-sizing: border-box !important;
    }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t3-resume");
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

          const getRelTop = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            return r.top - resumeRect.top + scrollY;
          };
          const getRelBottom = (el: HTMLElement): number =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          const ITEM_SELECTORS = [
            ".t3-header",
            ".t3-entry",
            ".t3-project-item",
            ".t3-custom-section",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) {
              blocks.push({ top, bottom, id: el.dataset.blockId });
            }
          });

          resume
            .querySelectorAll<HTMLElement>(".t3-section-title")
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
              // AFTER
              if (firstItem) {
                // Skip anchor logic for skills — allow it to split across pages
                if (firstItem.classList.contains("t3-skills-block")) return;

                const deepChild = firstItem.querySelector<HTMLElement>(
                  ".t3-entry, .t3-project-item, .t3-custom-section",
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

            let actualCut = naiveCut;
            let cutBlockId: string | undefined;

            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (block.top >= currentStart && block.bottom > naiveCut) {
                if (block.top < actualCut) {
                  actualCut = block.top;
                  cutBlockId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          // AFTER
          // Add li-level blocks for skills and recompute cuts
          const skillsLis = Array.from(
            resume.querySelectorAll<HTMLElement>(".t3-skills-content li"),
          );
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          blocks.sort((a, b) => a.top - b.top);
          pageStarts.length = 1;
          pageBreakIds.length = 0;

          while (pageStarts.length < MAX_PAGES) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;

            let actualCut = naiveCut;
            let cutBlockId: string | undefined;

            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (block.top >= currentStart && block.bottom > naiveCut) {
                if (block.top < actualCut) {
                  actualCut = block.top;
                  cutBlockId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          // Detect which li index the cut falls on for skills
          (window as any).__resumeSkillsCutIndex = -1;
          for (let p = 0; p < pageStarts.length - 1; p++) {
            const cutY = pageStarts[p + 1];
            for (let li = 0; li < skillsLis.length; li++) {
              const liTop = getRelTop(skillsLis[li]);
              const liBottom = getRelBottom(skillsLis[li]);
              if (liTop < cutY && liBottom > cutY) {
                (window as any).__resumeSkillsCutIndex = li;
                break;
              }
              if (liTop >= cutY) {
                (window as any).__resumeSkillsCutIndex = li;
                break;
              }
            }
            if ((window as any).__resumeSkillsCutIndex >= 0) break;
          }

          document.body.removeChild(iframe);
          (window as any).__resumePageBreakIds = pageBreakIds;

          const pageHtmls: string[] = [];

          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;

            pageHtmls.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    ${CSS}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: ${A4_H}px !important;
      overflow: hidden !important; background: white !important;
    }
    .page-margin-box {
      position: relative; width: ${A4_W}px; height: ${A4_H}px;
      background: white; overflow: hidden;
    }
    .page-content-clip {
      position: absolute; top: ${MARGIN}px; left: 0;
      width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
    }
    .page-shift {
      position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
    }
    .t3-resume {
      width: ${A4_W}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
      margin: 0 !important;
    }
  </style>
</head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">
        ${resumeSnapshot}
      </div>
    </div>
  </div>
</body>
</html>`);
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
    [CSS],
  );

  // ── Debounced updates ────────────────────────────────────────────────────
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

  // ── PDF download ─────────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    try {
      // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      // const pdfHtml = generateHTML(true, pageBreakIds);

      // AFTER
const pageBreakIds: string[] = ((window as any).__resumePageBreakIds || []).filter(
  (id: string) => id !== "skills-section"
);
const skillsCutIndex: number = (window as any).__resumeSkillsCutIndex ?? -1;
const pdfHtml = generateHTML(true, pageBreakIds, skillsCutIndex);

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
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* {lastSegment === "download-resume" && ( */}
        <div className="text-center my-5">
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            Download Resume
          </motion.button>
        </div>
      {/* )} */}

      {alldata ? (
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
                <div
                  style={{ flex: 1, height: "1px", background: "#d1d5db" }}
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
                  style={{ flex: 1, height: "1px", background: "#d1d5db" }}
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
          ))}
        </div>
      )}
    </>
  );
};

export default TemplateThree;
