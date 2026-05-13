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

"use client";

import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
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

const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(1122);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "RESUME_HEIGHT") {
        setIframeHeight(e.data.height);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

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

  // ── CSS (single source — used in both iframe & PDF) ───────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

    

   

    /* PDF margins */
    @page {
      size: A4;
      margin: 10mm;
    }

    /* Print margins reset */
    @media print {
      body {
        padding: 0;
        margin: 0;
      }
    }

    /* Resume container */
    .t3-resume {
      max-width: 190mm;
      margin: 0 auto;
      background-color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: #374151;
    }

    @media print {
      .t3-resume {
        max-width: none;
        margin: 0;
      }
    }

    .t3-resume * {
      box-sizing: border-box;
    }

    .t3-body {
      padding: 0 20px;
    }

    /* ── HEADER ── */
    .t3-header {
      display: flex;
      justify-content: space-between;
      background-color: #878787;
      padding: 4px;
      border-radius: 16px;
      color: white;
    }

    .t3-header-left {
      width: 40%;
      font-size: 27px;
      font-weight: 500;
      padding: 12px;
      text-transform: uppercase;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t3-header-job {
      font-size: 14px;
      font-weight: 400;
      text-transform: lowercase;
      margin-top: 4px;
    }

    .t3-header-links {
      display: flex;
      align-items: center;
      gap: 16px;
      padding-bottom: 8px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    .t3-header-link {
      font-size: 14px;
      font-weight: 600;
      text-decoration: underline;
      color: white;
    }

    .t3-header-right {
      width: 60%;
      padding: 12px;
      font-size: 14px;
    }

    .t3-header-contact-line {
      text-align: right;
      word-wrap: break-word;
      overflow-wrap: break-word;
      margin-bottom: 2px;
    }

    /* ── SECTION TITLE ── */
    .t3-section-title {
      font-size: 22px;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 4px;
      color: #111827;
    }

    /* ── SUMMARY ── */
    .t3-summary {
      padding-top: 6px;
      padding-bottom: 10px;
      color: #374151;
      font-size: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Rich Text Content Styles */
    .t3-summary ul,
    .t3-summary ol,
    .t3-entry-content ul,
    .t3-entry-content ol,
    .t3-project-description ul,
    .t3-project-description ol,
    .t3-extra ul,
    .t3-extra ol,
    .t3-skills-content ul,
    .t3-skills-content ol {
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }

    .t3-summary li,
    .t3-entry-content li,
    .t3-project-description li,
    .t3-extra li,
    .t3-skills-content li {
      margin-bottom: 4px !important;
      line-height: 1.5 !important;
    }

    .t3-summary strong,
    .t3-entry-content strong,
    .t3-project-description strong,
    .t3-extra strong,
    .t3-skills-content strong {
      font-weight: 700 !important;
    }

    .t3-summary em,
    .t3-entry-content em,
    .t3-project-description em,
    .t3-extra em,
    .t3-skills-content em {
      font-style: italic !important;
    }

    .t3-summary u,
    .t3-entry-content u,
    .t3-project-description u,
    .t3-extra u,
    .t3-skills-content u {
      text-decoration: underline !important;
    }

    /* Skills Content Styles */
    .t3-skills-block {
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .t3-skills-content {
      color: #374151;
      font-size: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t3-skills-content p {
      margin: 0 0 6px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* ── ENTRY ── */
    .t3-entry {
      margin-top: 8px;
      padding-bottom: 6px;
    }

    .t3-experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t3-experience-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .t3-experience-date {
      font-size: 14px;
      color: #4b5563;
    }

    .t3-experience-subtitle {
      font-size: 15px;
      color: #6b7280;
      font-weight: 500;
    }

    .t3-education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t3-education-school {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .t3-education-date {
      font-size: 14px;
      color: #4b5563;
    }

    .t3-education-subtitle {
      font-size: 15px;
      color: #6b7280;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .t3-entry-content {
      padding-top: 6px;
      padding-bottom: 6px;
      color: #374151;
      font-size: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
    .t3-entry-content ul { list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; }
    .t3-entry-content ol { list-style-type: decimal !important; padding-left: 20px !important; margin: 0 !important; }
    .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

    .t3-education-grade {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
      font-weight: 500;
    }

    /* ── PROJECTS ── */
    .t3-project-item {
      margin-top: 8px;
      padding-bottom: 6px;
    }

    .t3-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t3-project-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .t3-project-links {
      display: flex;
      gap: 12px;
    }

    .t3-project-link {
      font-size: 12px;
      color: #6b7280;
      text-decoration: underline;
    }

    .t3-project-tech-stack {
      font-size: 13px;
      color: #6b7280;
      margin: 4px 0;
    }

    .t3-project-description {
      padding-top: 6px;
      color: #374151;
      font-size: 14px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Custom section */
    .t3-custom-section {
      margin-top: 16px;
    }

    .t3-custom-section:first-of-type {
      margin-top: 0;
    }

    .t3-custom-section-title {
      font-size: 22px;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 4px;
      color: #111827;
    }

    .t3-custom-section-content {
      padding-top: 6px;
      padding-bottom: 6px;
      color: #374151;
      font-size: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Print overrides */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .t3-header {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .t3-entry, .t3-project-item { 
        page-break-inside: avoid; 
        break-inside: avoid; 
      }
      .t3-section-title { 
        page-break-after: avoid; 
        break-after: avoid; 
      }
    }
  `;

  // ── Height-reporting script injected into iframe ──────────
  const HEIGHT_SCRIPT = `
    <script>
      function reportHeight() {
        var h = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({ type: 'RESUME_HEIGHT', height: h }, '*');
      }
      if (document.readyState === 'complete') reportHeight();
      else window.addEventListener('load', reportHeight);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(reportHeight);
      }
      // Observe DOM changes to report height updates
      const observer = new MutationObserver(reportHeight);
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    </script>
  `;

  // ── HTML generation logic (memoized) ───────────────────────
  const generateHTML = useCallback((): string => {
    const href = (url: string) =>
      url.startsWith("http") ? url : `https://${url}`;
    const rich = (html: string) => {
      const c = cleanQuillHTML(html);
      return c && c !== "<p><br></p>" ? c : "";
    };

    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postCode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const formDob = formatDateOfBirth(dateOfBirth || "");

    // Generate skills HTML
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      const cleanedSkills = rich(skills);
      if (
        !cleanedSkills ||
        cleanedSkills === "<p><br></p>" ||
        cleanedSkills === ""
      )
        return "";
      return `
        <div class="t3-section-title">Skills</div>
        <div class="t3-skills-block">
          <div class="t3-skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";
      return `
        <div class="t3-section-title">Projects</div>
        ${projects
          .map(
            (project: any) => `
          <div class="t3-project-item">
            <div class="t3-project-header">
              <div class="t3-project-title">${project.title || ""}</div>
              <div class="t3-project-links">
                ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t3-project-link" target="_blank">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t3-project-link" target="_blank">GitHub</a>` : ""}
              </div>
            </div>
            ${project.techStack?.length ? `<div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
            ${project.description ? `<div class="t3-project-description">${rich(project.description)}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      `;
    };

    // Generate custom sections HTML
    const generateCustomSectionsHTML = () => {
      if (!customSection.length) return "";
      return customSection
        .filter((s) => s?.name?.trim() || s?.description?.trim())
        .map(
          (s) => `
          <div class="t3-custom-section">
            ${s.name ? `<div class="t3-custom-section-title">${s.name}</div>` : ""}
            ${s.description ? `<div class="t3-custom-section-content">${rich(s.description)}</div>` : ""}
          </div>
        `,
        )
        .join("");
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <style>${CSS}</style>
</head>
<body>
<div class="t3-resume">

  <!-- HEADER -->
  <div class="t3-header">
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
      ${addressStr ? `<div class="t3-header-contact-line">${addressStr}</div>` : ""}
      ${formDob ? `<div class="t3-header-contact-line">${formDob}</div>` : ""}
    </div>
  </div>

  <div class="t3-body">
    ${summary ? `<div class="t3-section-title">Summary</div><div class="t3-summary">${rich(summary)}</div>` : ""}
    
    ${
      experiences.length
        ? `<div class="t3-section-title">Experience</div>
      ${experiences
        .map((exp) => {
          const start = formatMonthYear(exp.startDate, false);
          const end = exp.endDate
            ? formatMonthYear(exp.endDate, false)
            : exp.startDate
              ? "Present"
              : "";
          return `
          <div class="t3-entry">
            <div class="t3-experience-header">
              <div class="t3-experience-title">${exp.jobTitle || ""}</div>
              <div class="t3-experience-date">${start}${start && end ? " - " : ""}${end}</div>
            </div>
            <div class="t3-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
            ${exp.text ? `<div class="t3-entry-content">${rich(exp.text)}</div>` : ""}
          </div>`;
        })
        .join("")}`
        : ""
    }

    ${generateProjectsHTML()}

    ${
      educations.length
        ? `<div class="t3-section-title">Education</div>
      ${educations
        .map((edu) => {
          const formattedGrade = formatGradeToCgpdAndPercentage(
            edu.grade || "",
          );
          return `
          <div class="t3-entry">
            <div class="t3-education-header">
              <div class="t3-education-school">${edu.schoolname || ""}</div>
              <div class="t3-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
            </div>
            <div class="t3-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
            ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
            ${edu.text ? `<div class="t3-entry-content">${rich(edu.text)}</div>` : ""}
          </div>`;
        })
        .join("")}`
        : ""
    }

    ${generateSkillsHTML()}
    ${generateCustomSectionsHTML()}
  </div>
</div>
${HEIGHT_SCRIPT}
</body>
</html>`;
  }, [
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
    dateOfBirth,
  ]);

  // Simple debounce function without lodash
  const debouncedUpdate = useCallback((newHtml: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setHtmlContent(newHtml);
    }, 300);
  }, []);

  // Update HTML when data changes (with debounce)
  useEffect(() => {
    const newHtml = generateHTML();
    debouncedUpdate(newHtml);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [generateHTML, debouncedUpdate]);

  // Initial HTML generation
  useEffect(() => {
    setHtmlContent(generateHTML());
  }, []);

  // ── PDF download ──────────────────────────────────────────
  const handleDownload = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        {
          html: generateHTML(),
          options: {
            margin: {
              top: "10mm",
              right: "10mm",
              bottom: "10mm",
              left: "10mm",
            },
          },
        },
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
    }
  };

  // Update iframe content when htmlContent changes
  useEffect(() => {
    if (iframeRef.current && htmlContent && !alldata) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent, alldata]);

  // ── RENDER ────────────────────────────────────────────────
  return (
    <>
      {lastSegment === "download-resume" && (
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
      )}

      {alldata ? (
        /* THUMBNAIL mode - using direct div for better performance */
        <div
          style={{
            width: "210mm",
            height: "297mm",
            transform: "scale(0.36)",
            transformOrigin: "top left",
            overflow: "auto",
            pointerEvents: "none",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      ) : (
        /* FULL VIEW mode with iframe */
        <div
          style={{
            width: "210mm",
            margin: "0 auto",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <iframe
            ref={iframeRef}
            title="resume-full"
            style={{
              width: "210mm",
              height: `${iframeHeight}px`,
              border: "none",
              display: "block",
              overflow: "hidden",
            }}
            scrolling="no"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      )}
    </>
  );
};

export default TemplateThree;
