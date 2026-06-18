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
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";
// import { motion } from "framer-motion";

// /* ======================================================
//    SHARED CSS — scoped to .t6-resume, no leaks.
// ====================================================== */
// const styles = `
//   .t6-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//     display: flex;
//     min-height: 297mm;
//   }

//   .t6-resume.is-preview {
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

//   .t6-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* Rich text content styles */
//   .t6-resume .t6-entry-content ul,
//   .t6-resume .t6-entry-content ol,
//   .t6-resume .t6-summary ul,
//   .t6-resume .t6-summary ol,
//   .t6-resume .t6-extra ul,
//   .t6-resume .t6-extra ol,
//   .t6-resume .t6-skills-content ul,
//   .t6-resume .t6-skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t6-resume .t6-entry-content li,
//   .t6-resume .t6-summary li,
//   .t6-resume .t6-extra li,
//   .t6-resume .t6-skills-content li {
//     margin-bottom: 4px !important;
//   }

//   .t6-resume .t6-entry-content strong,
//   .t6-resume .t6-summary strong,
//   .t6-resume .t6-extra strong,
//   .t6-resume .t6-skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t6-resume .t6-entry-content em,
//   .t6-resume .t6-summary em,
//   .t6-resume .t6-extra em,
//   .t6-resume .t6-skills-content em {
//     font-style: italic !important;
//   }

//   .t6-resume .t6-entry-content u,
//   .t6-resume .t6-summary u,
//   .t6-resume .t6-extra u,
//   .t6-resume .t6-skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t6-resume .t6-entry-content p,
//   .t6-resume .t6-summary p,
//   .t6-resume .t6-extra p,
//   .t6-resume .t6-skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills Content Styles */
//   .t6-resume .t6-skills-content {
//     margin-top: 8px;
//   }

//   .t6-resume .t6-skills-content p {
//     margin: 0 0 6px 0 !important;
//   }

//   /* ── LEFT COLUMN ── */
//   .t6-resume .t6-left {
//     width: 40%;
//     padding: 20px;
//     background-color: #f3f4f6;
//     border-radius: 16px 0 0 0;
//     flex-shrink: 0;
//   }

//   .t6-resume .t6-name {
//     font-size: 28px;
//     text-transform: uppercase;
//     color: #4b5563;
//     margin-bottom: 4px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.2;
//   }

//   .t6-resume .t6-jobtitle {
//     font-size: 14px;
//     color: #4b5563;
//     margin-bottom: 8px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 8px;
//     flex-wrap: wrap;
//   }

//   .t6-resume .t6-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: #4b5563;
//   }

//   /* ── LEFT SECTION HEADING ── */
//   .t6-resume .t6-lsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 12px;
//   }

//   .t6-resume .t6-divider-sm {
//     border: none;
//     border-top: 1px solid #6b7280;
//     margin-bottom: 8px;
//   }

//   /* ── CONTACT ITEMS ── */
//   .t6-resume .t6-contact-row {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 4px 0;
//   }

//   .t6-resume .t6-icon-wrap {
//     width: 24px;
//     height: 24px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//   }

//   .t6-resume .t6-icon-wrap svg {
//     width: 14px;
//     height: 14px;
//     color: #4b5563;
//     stroke: #4b5563;
//     fill: none;
//   }

//   .t6-resume .t6-contact-text {
//     font-size: 13px;
//     color: #4b5563;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.4;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t6-resume .t6-education-grade {
//     font-size: 12px;
//     color: #6b7280;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── PROJECTS ── */
//   .t6-resume .t6-project-item {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t6-resume .t6-project-link {
//     font-size: 12px;
//     color: #4b5563;
//     text-decoration: underline;
//   }

//   .t6-resume .t6-project-tech {
//     font-size: 12px;
//     color: #6b7280;
//     margin: 4px 0;
//   }

//   /* ── EXTRA TEXT (certs, hobbies, awards) ── */
//   .t6-resume .t6-extra {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── RIGHT COLUMN ── */
//   .t6-resume .t6-right {
//     width: 60%;
//     padding-left: 16px;
//     padding-right: 4px;
//   }

//   /* ── RIGHT SECTION HEADING ── */
//   .t6-resume .t6-rsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 10px;
//   }

//   .t6-resume .t6-divider-md {
//     border: none;
//     border-top: 2px solid #d1d5db;
//     margin-bottom: 8px;
//   }

//   /* ── EXPERIENCE HEADER (Job Title and Date on same line) ── */
//   .t6-resume .t6-experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-experience-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-experience-date {
//     font-size: 13px;
//     color: #4b5563;
//   }

//   /* Experience Subtitle - Company and Location */
//   .t6-resume .t6-experience-subtitle {
//     font-size: 14px;
//     color: #6b7280;
//     margin-bottom: 6px;
//     font-weight: 500;
//   }

//   /* ── EDUCATION HEADER (School and Date on same line) ── */
//   .t6-resume .t6-education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-education-school {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-education-date {
//     font-size: 13px;
//     color: #4b5563;
//   }

//   /* Education Subtitle - Degree and Location */
//   .t6-resume .t6-education-subtitle {
//     font-size: 14px;
//     color: #6b7280;
//     margin-bottom: 4px;
//     font-weight: 500;
//   }

//   /* ── ENTRY ── */
//   .t6-resume .t6-entry {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-top: 6px;
//   }

//   .t6-resume .t6-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t6-resume .t6-entry-date {
//     font-size: 13px;
//     color: #4b5563;
//     margin-top: 3px;
//   }

//   .t6-resume .t6-entry-content {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SUMMARY ── */
//   .t6-resume .t6-summary {
//     padding-top: 8px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//   /* ── WEBSITES ── */
//   .t6-resume .t6-website-item {
//     margin-bottom: 8px;
//   }

//   .t6-resume .t6-website-label {
//     font-size: 13px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-website-link {
//     font-size: 13px;
//     color: #111827;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Custom Section Wrapper */
//   .t6-resume .custom-section-wrapper {
//     margin-top: 0;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t6-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t6-resume .t6-left {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t6-resume .t6-entry { page-break-inside: avoid; break-inside: avoid; }
//     .t6-resume .t6-rsection { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// // Clean, professional SVG icons (no background circle, just clean lines)
// const EmailIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-10 7L2 7" />
//   </svg>
// );

// const PhoneIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );

// const LocationIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );

// // Helper to render SVG icons as HTML strings for PDF generation
// const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
//   switch (type) {
//     case "email":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
//     case "phone":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
//     case "location":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
//     case "calendar":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
//     default:
//       return "";
//   }
// };

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
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
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === 'string' && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <>
//         <div className="t6-lsection">Skills</div>
//         <hr className="t6-divider-sm" />
//         <div
//           className="t6-skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <>
//         <div className="t6-rsection">Projects</div>
//         <hr className="t6-divider-md" />
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t6-project-item">
//             <div className="t6-project-header">
//               <div className="t6-entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t6-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t6-project-link"
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
//                       className="t6-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t6-project-tech">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t6-entry-content"
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
//      HTML GENERATION — uses same `styles` string as preview
//   ====================================================== */
//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//     const addressStr = addressParts;

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t6-lsection">Skills</div>
//         <hr class="t6-divider-sm"/>
//         <div class="t6-skills-content">${cleanedSkills}</div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t6-rsection">Projects</div>
//         <hr class="t6-divider-md"/>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t6-project-item">
//             <div class="t6-project-header">
//               <div class="t6-entry-title">${project.title || ""}</div>
//               <div class="t6-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t6-project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t6-project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `
//               <div class="t6-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             `
//                 : ""
//             }
//             ${
//               project.description
//                 ? `
//               <div class="t6-entry-content">${cleanQuillHTML(project.description)}</div>
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
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t6-resume">

//   <!-- LEFT COLUMN -->
//   <div class="t6-left">

//     <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${contact.jobTitle ? `<div class="t6-jobtitle">${contact.jobTitle}</div>` : ""}

//     <div class="t6-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t6-link">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t6-link">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t6-link">Portfolio</a>` : ""}
//     </div>

//     <div class="t6-lsection">Details</div>
//     <hr class="t6-divider-sm"/>

//     ${
//       contact?.email
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("email")}
//       </div>
//       <div class="t6-contact-text">${contact.email}</div>
//     </div>`
//         : ""
//     }

//     ${
//       contact?.phone
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("phone")}
//       </div>
//       <div class="t6-contact-text">${contact.phone}</div>
//     </div>`
//         : ""
//     }

//     ${
//       addressStr
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("location")}
//       </div>
//       <div class="t6-contact-text">${addressStr}</div>
//     </div>`
//         : ""
//     }

//     ${
//       formattedDob
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("calendar")}
//       </div>
//       <div class="t6-contact-text">${formattedDob}</div>
//     </div>`
//         : ""
//     }

//     ${generateSkillsHTML()}

//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t6-right">

//     ${
//       summary
//         ? `
//     <div class="t6-rsection">Summary</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-summary">${cleanQuillHTML(summary)}</div>`
//         : ""
//     }

//     <!-- EXPERIENCE - NEW LAYOUT -->
//     ${
//       experiences.length > 0
//         ? `
//     <div class="t6-rsection">Experience</div>
//     <hr class="t6-divider-md"/>
//     ${experiences
//       .map((exp) => {
//         const start = formatMonthYear(exp.startDate);
//         const end = exp.endDate
//           ? formatMonthYear(exp.endDate)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t6-entry">
//       <div class="t6-experience-header">
//         <div class="t6-experience-title">${exp.jobTitle || ""}</div>
//         <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//       </div>
//       <div class="t6-experience-subtitle">
//         ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//       </div>
//       ${exp.text ? `<div class="t6-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     <!-- EDUCATION - NEW LAYOUT -->
//     ${
//       educations.length > 0
//         ? `
//     <div class="t6-rsection">Education</div>
//     <hr class="t6-divider-md"/>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//     <div class="t6-entry">
//       <div class="t6-education-header">
//         <div class="t6-education-school">${edu.schoolname || ""}</div>
//         <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//       </div>
//       <div class="t6-education-subtitle">
//         ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//       </div>
//       ${formattedGrade ? `<div class="t6-education-grade">${formattedGrade}</div>` : ""}
//       ${edu.text ? `<div class="t6-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     <!-- CUSTOM SECTIONS -->
//     ${customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
//     <div class="custom-section-wrapper">
//       ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//       ${s.description ? `<div class="t6-extra">${cleanQuillHTML(s.description)}</div>` : ""}
//     </div>`,
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
//      JSX PREVIEW — same .t6-* classes, identical output
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

//       <div
//         className="t6-resume"
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         <div className={`t6-resume ${alldata ? "is-preview" : ""}`}>
//           {/* LEFT COLUMN */}
//           <div className="t6-left">
//             <div className="t6-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {contact.jobTitle && (
//               <div className="t6-jobtitle">{contact.jobTitle}</div>
//             )}

//             <div className="t6-links">
//               {linkedinUrl?.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t6-link"
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
//                   className="t6-link"
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
//                   className="t6-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>

//             <div className="t6-lsection">Details</div>
//             <hr className="t6-divider-sm" />

//             {contact?.email && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <EmailIcon />
//                 </div>
//                 <div className="t6-contact-text">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <PhoneIcon />
//                 </div>
//                 <div className="t6-contact-text">{contact.phone}</div>
//               </div>
//             )}
//             {addressParts && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <LocationIcon />
//                 </div>
//                 <div className="t6-contact-text">{addressParts}</div>
//               </div>
//             )}
//             {formattedDob && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <CalendarIcon />
//                 </div>
//                 <div className="t6-contact-text">{formattedDob}</div>
//               </div>
//             )}

//             {/* SKILLS - Now using text editor format */}
//             {renderSkills()}
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="t6-right">
//             {/* SUMMARY */}
//             {summary && (
//               <>
//                 <div className="t6-rsection">Summary</div>
//                 <hr className="t6-divider-md" />
//                 <div
//                   className="t6-summary"
//                   dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//                 />
//               </>
//             )}

//             {/* EXPERIENCE - NEW LAYOUT */}
//             {experiences.length > 0 && (
//               <>
//                 <div className="t6-rsection">Experience</div>
//                 <hr className="t6-divider-md" />
//                 {experiences.map((exp, i) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate
//                     ? formatMonthYear(exp.endDate, false)
//                     : exp.startDate
//                       ? "Present"
//                       : "";
//                   return (
//                     <div key={exp.id || i} className="t6-entry">
//                       <div className="t6-experience-header">
//                         <div className="t6-experience-title">
//                           {exp.jobTitle || ""}
//                         </div>
//                         <div className="t6-experience-date">
//                           {start}
//                           {start && end ? " - " : ""}
//                           {end}
//                         </div>
//                       </div>
//                       <div className="t6-experience-subtitle">
//                         {[exp.employer, exp.location]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                       {exp.text && (
//                         <div
//                           className="t6-entry-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(exp.text),
//                           }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {/* PROJECTS */}
//             {renderProjects()}

//             {/* EDUCATION - NEW LAYOUT */}
//             {educations.length > 0 && (
//               <>
//                 <div className="t6-rsection">Education</div>
//                 <hr className="t6-divider-md" />
//                 {educations.map((edu, i) => {
//                   const formattedGrade = formatGradeToCgpdAndPercentage(
//                     edu.grade || "",
//                   );
//                   return (
//                     <div key={edu.id || i} className="t6-entry">
//                       <div className="t6-education-header">
//                         <div className="t6-education-school">
//                           {edu.schoolname || ""}
//                         </div>
//                         <div className="t6-education-date">
//                           {[edu.startDate, edu.endDate || "Present"]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                       </div>
//                       <div className="t6-education-subtitle">
//                         {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                       </div>
//                       {formattedGrade && (
//                         <div className="t6-education-grade">
//                           {formattedGrade}
//                         </div>
//                       )}
//                       {edu.text && (
//                         <div
//                           className="t6-entry-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(edu.text),
//                           }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {/* CUSTOM SECTIONS */}
//             {customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, i) => (
//                 <div
//                   key={(section as any).id || i}
//                   className="custom-section-wrapper"
//                 >
//                   {section.name && (
//                     <>
//                       <div className="t6-rsection">{section.name}</div>
//                       <hr className="t6-divider-md" />
//                     </>
//                   )}
//                   {section.description && (
//                     <div
//                       className="t6-extra"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(section.description),
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateSix;

// "use client";

// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
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

// /* ======================================================
//    SHARED CSS — scoped to .t6-resume, no leaks.
// ====================================================== */
// const styles = `

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

//   .t6-resume {
//     max-width: 190mm;
//     margin: 0 auto;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//     display: flex;
//   }

//   @media print {
//     .t6-resume {
//       max-width: none;
//       margin: 0;
//       padding: 0;
//     }
//   }

//   .t6-resume * {
//     box-sizing: border-box;
//   }

//   /* Rich text content styles */
//   .t6-resume .t6-entry-content ul,
//   .t6-resume .t6-entry-content ol,
//   .t6-resume .t6-summary ul,
//   .t6-resume .t6-summary ol,
//   .t6-resume .t6-extra ul,
//   .t6-resume .t6-extra ol,
//   .t6-resume .t6-skills-content ul,
//   .t6-resume .t6-skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t6-resume .t6-entry-content li,
//   .t6-resume .t6-summary li,
//   .t6-resume .t6-extra li,
//   .t6-resume .t6-skills-content li {
//     margin-bottom: 4px !important;
//   }

//   .t6-resume .t6-entry-content strong,
//   .t6-resume .t6-summary strong,
//   .t6-resume .t6-extra strong,
//   .t6-resume .t6-skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t6-resume .t6-entry-content em,
//   .t6-resume .t6-summary em,
//   .t6-resume .t6-extra em,
//   .t6-resume .t6-skills-content em {
//     font-style: italic !important;
//   }

//   .t6-resume .t6-entry-content u,
//   .t6-resume .t6-summary u,
//   .t6-resume .t6-extra u,
//   .t6-resume .t6-skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t6-resume .t6-entry-content p,
//   .t6-resume .t6-summary p,
//   .t6-resume .t6-extra p,
//   .t6-resume .t6-skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills Content Styles */
//   .t6-resume .t6-skills-content {
//     margin-top: 8px;
//   }

//   .t6-resume .t6-skills-content p {
//     margin: 0 0 6px 0 !important;
//   }

//   /* ── LEFT COLUMN ── */
//   .t6-resume .t6-left {
//     width: 40%;
//     padding: 20px;
//     background-color: #f3f4f6;
//     border-radius: 16px 0 0 0;
//     flex-shrink: 0;
//   }

//   .t6-resume .t6-name {
//     font-size: 28px;
//     text-transform: uppercase;
//     color: #4b5563;
//     margin-bottom: 4px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.2;
//   }

//   .t6-resume .t6-jobtitle {
//     font-size: 14px;
//     color: #4b5563;
//     margin-bottom: 8px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 8px;
//     flex-wrap: wrap;
//   }

//   .t6-resume .t6-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: #4b5563;
//   }

//   /* ── LEFT SECTION HEADING ── */
//   .t6-resume .t6-lsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 12px;
//   }

//   .t6-resume .t6-divider-sm {
//     border: none;
//     border-top: 1px solid #6b7280;
//     margin-bottom: 8px;
//   }

//   /* ── CONTACT ITEMS ── */
//   .t6-resume .t6-contact-row {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 4px 0;
//   }

//   .t6-resume .t6-icon-wrap {
//     width: 24px;
//     height: 24px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//   }

//   .t6-resume .t6-icon-wrap svg {
//     width: 14px;
//     height: 14px;
//     color: #4b5563;
//     stroke: #4b5563;
//     fill: none;
//   }

//   .t6-resume .t6-contact-text {
//     font-size: 13px;
//     color: #4b5563;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.4;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t6-resume .t6-education-grade {
//     font-size: 12px;
//     color: #6b7280;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── PROJECTS ── */
//   .t6-resume .t6-project-item {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t6-resume .t6-project-link {
//     font-size: 12px;
//     color: #4b5563;
//     text-decoration: underline;
//   }

//   .t6-resume .t6-project-tech {
//     font-size: 12px;
//     color: #6b7280;
//     margin: 4px 0;
//   }

//   /* ── EXTRA TEXT (certs, hobbies, awards) ── */
//   .t6-resume .t6-extra {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── RIGHT COLUMN ── */
//   .t6-resume .t6-right {
//     width: 60%;
//     padding-left: 16px;
//     padding-right: 4px;
//   }

//   /* ── RIGHT SECTION HEADING ── */
//   .t6-resume .t6-rsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 10px;
//   }

//   .t6-resume .t6-divider-md {
//     border: none;
//     border-top: 2px solid #d1d5db;
//     margin-bottom: 8px;
//   }

//   /* ── EXPERIENCE HEADER (Job Title and Date on same line) ── */
//   .t6-resume .t6-experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-experience-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-experience-date {
//     font-size: 13px;
//     color: #4b5563;
//   }

//   /* Experience Subtitle - Company and Location */
//   .t6-resume .t6-experience-subtitle {
//     font-size: 14px;
//     color: #6b7280;
//     margin-bottom: 6px;
//     font-weight: 500;
//   }

//   /* ── EDUCATION HEADER (School and Date on same line) ── */
//   .t6-resume .t6-education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-education-school {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-education-date {
//     font-size: 13px;
//     color: #4b5563;
//   }

//   /* Education Subtitle - Degree and Location */
//   .t6-resume .t6-education-subtitle {
//     font-size: 14px;
//     color: #6b7280;
//     margin-bottom: 4px;
//     font-weight: 500;
//   }

//   /* ── ENTRY ── */
//   .t6-resume .t6-entry {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-top: 6px;
//   }

//   .t6-resume .t6-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t6-resume .t6-entry-date {
//     font-size: 13px;
//     color: #4b5563;
//     margin-top: 3px;
//   }

//   .t6-resume .t6-entry-content {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SUMMARY ── */
//   .t6-resume .t6-summary {
//     padding-top: 8px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//   /* ── WEBSITES ── */
//   .t6-resume .t6-website-item {
//     margin-bottom: 8px;
//   }

//   .t6-resume .t6-website-label {
//     font-size: 13px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-website-link {
//     font-size: 13px;
//     color: #111827;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* Custom Section Wrapper */
//   .t6-resume .custom-section-wrapper {
//     margin-top: 0;
//   }

//   /* ── PRINT ── */
//   @media print {
//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }
//     .t6-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }
//     .t6-resume .t6-left {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t6-resume .t6-entry { page-break-inside: avoid; break-inside: avoid; }
//     .t6-resume .t6-rsection { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// // Helper to render SVG icons as HTML strings for PDF generation
// const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
//   switch (type) {
//     case "email":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
//     case "phone":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
//     case "location":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
//     case "calendar":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
//     default:
//       return "";
//   }
// };

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const blobUrlRef = useRef<string | null>(null);

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
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

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
//       const observer = new MutationObserver(reportHeight);
//       observer.observe(document.body, { childList: true, subtree: true, attributes: true });
//     </script>
//   `;

//   /* ======================================================
//      HTML GENERATION — uses same `styles` string as preview
//   ====================================================== */
//   const generateHTML = useCallback((): string => {
//     const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//     const addressStr = addressParts;

//     // Generate skills HTML
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t6-lsection">Skills</div>
//         <hr class="t6-divider-sm"/>
//         <div class="t6-skills-content">${cleanedSkills}</div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t6-rsection">Projects</div>
//         <hr class="t6-divider-md"/>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t6-project-item">
//             <div class="t6-project-header">
//               <div class="t6-entry-title">${project.title || ""}</div>
//               <div class="t6-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t6-project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t6-project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `
//               <div class="t6-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             `
//                 : ""
//             }
//             ${
//               project.description
//                 ? `
//               <div class="t6-entry-content">${cleanQuillHTML(project.description)}</div>
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
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t6-resume">

//   <!-- LEFT COLUMN -->
//   <div class="t6-left">

//     <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${contact.jobTitle ? `<div class="t6-jobtitle">${contact.jobTitle}</div>` : ""}

//     <div class="t6-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t6-link" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t6-link" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t6-link" target="_blank">Portfolio</a>` : ""}
//     </div>

//     <div class="t6-lsection">Details</div>
//     <hr class="t6-divider-sm"/>

//     ${
//       contact?.email
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("email")}
//       </div>
//       <div class="t6-contact-text">${contact.email}</div>
//     </div>`
//         : ""
//     }

//     ${
//       contact?.phone
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("phone")}
//       </div>
//       <div class="t6-contact-text">${contact.phone}</div>
//     </div>`
//         : ""
//     }

//     ${
//       addressStr
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("location")}
//       </div>
//       <div class="t6-contact-text">${addressStr}</div>
//     </div>`
//         : ""
//     }

//     ${
//       formattedDobHtml
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("calendar")}
//       </div>
//       <div class="t6-contact-text">${formattedDobHtml}</div>
//     </div>`
//         : ""
//     }

//     ${generateSkillsHTML()}

//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t6-right">

//     ${
//       summary
//         ? `
//     <div class="t6-rsection">Summary</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-summary">${cleanQuillHTML(summary)}</div>`
//         : ""
//     }

//     <!-- EXPERIENCE -->
//     ${
//       experiences.length > 0
//         ? `
//     <div class="t6-rsection">Experience</div>
//     <hr class="t6-divider-md"/>
//     ${experiences
//       .map((exp) => {
//         const start = formatMonthYear(exp.startDate, false);
//         const end = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t6-entry">
//       <div class="t6-experience-header">
//         <div class="t6-experience-title">${exp.jobTitle || ""}</div>
//         <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//       </div>
//       <div class="t6-experience-subtitle">
//         ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//       </div>
//       ${exp.text ? `<div class="t6-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     <!-- EDUCATION -->
//     ${
//       educations.length > 0
//         ? `
//     <div class="t6-rsection">Education</div>
//     <hr class="t6-divider-md"/>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//     <div class="t6-entry">
//       <div class="t6-education-header">
//         <div class="t6-education-school">${edu.schoolname || ""}</div>
//         <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//       </div>
//       <div class="t6-education-subtitle">
//         ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//       </div>
//       ${formattedGrade ? `<div class="t6-education-grade">${formattedGrade}</div>` : ""}
//       ${edu.text ? `<div class="t6-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     <!-- CUSTOM SECTIONS -->
//     ${customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
//     <div class="custom-section-wrapper">
//       ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//       ${s.description ? `<div class="t6-extra">${cleanQuillHTML(s.description)}</div>` : ""}
//     </div>`,
//       )
//       .join("")}

//   </div>
// </div>
// ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, customSection, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, addressParts]);

//   // Debounced update
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

//   // Update blob URL when htmlContent changes (for full view mode)
//   useEffect(() => {
//     if (!alldata && htmlContent) {
//       if (blobUrlRef.current) {
//         URL.revokeObjectURL(blobUrlRef.current);
//       }

//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       const url = URL.createObjectURL(blob);
//       blobUrlRef.current = url;

//       if (iframeRef.current) {
//         iframeRef.current.src = url;
//       }
//     }
//   }, [htmlContent, alldata]);

//   // Cleanup blob URL on unmount
//   useEffect(() => {
//     return () => {
//       if (blobUrlRef.current) {
//         URL.revokeObjectURL(blobUrlRef.current);
//       }
//     };
//   }, []);

//   /* ======================================================
//      PDF DOWNLOAD
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

//       {alldata ? (
//         /* THUMBNAIL mode - using blob URL in iframe for inspectability */
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
//           <iframe
//             src={blobUrlRef.current || undefined}
//             title="resume-preview"
//             style={{
//               width: "210mm",
//               height: "297mm",
//               border: "none",
//               display: "block",
//             }}
//             sandbox="allow-same-origin allow-scripts"
//           />
//         </div>
//       ) : (
//         /* FULL VIEW mode with iframe using blob URL */
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
//             sandbox="allow-same-origin allow-scripts"
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateSix;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
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
// //   .t6-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// // Helper to render SVG icons as HTML strings for PDF generation
// const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
//   switch (type) {
//     case "email":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
//     case "phone":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
//     case "location":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
//     case "calendar":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
//     default:
//       return "";
//   }
// };

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

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

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   /* ======================================================
//      SHARED CSS — scoped to .t6-resume, no leaks.
//   ====================================================== */
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t6-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//       font-size: 15px;
//       line-height: 1.5;
//       color: #374151;
//       display: flex;
//     }

//     .t6-resume * {
//       box-sizing: border-box;
//     }

//     /* Rich text content styles */
//     .t6-resume .t6-entry-content ul,
//     .t6-resume .t6-entry-content ol,
//     .t6-resume .t6-summary ul,
//     .t6-resume .t6-summary ol,
//     .t6-resume .t6-extra ul,
//     .t6-resume .t6-extra ol,
//     .t6-resume .t6-skills-content ul,
//     .t6-resume .t6-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t6-resume .t6-entry-content li,
//     .t6-resume .t6-summary li,
//     .t6-resume .t6-extra li,
//     .t6-resume .t6-skills-content li {
//       margin-bottom: 4px !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-entry-content strong,
//     .t6-resume .t6-summary strong,
//     .t6-resume .t6-extra strong,
//     .t6-resume .t6-skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t6-resume .t6-entry-content em,
//     .t6-resume .t6-summary em,
//     .t6-resume .t6-extra em,
//     .t6-resume .t6-skills-content em {
//       font-style: italic !important;
//     }

//     .t6-resume .t6-entry-content u,
//     .t6-resume .t6-summary u,
//     .t6-resume .t6-extra u,
//     .t6-resume .t6-skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t6-resume .t6-entry-content p,
//     .t6-resume .t6-summary p,
//     .t6-resume .t6-extra p,
//     .t6-resume .t6-skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Skills Content Styles */
//     .t6-resume .t6-skills-content {
//       margin-top: 8px;
//     }

//     .t6-resume .t6-skills-content p {
//       margin: 0 0 6px 0 !important;
//     }

//     /* ── LEFT COLUMN ── */
//     .t6-resume .t6-left {
//       width: 40%;
//       padding: 20px;
//       background-color: #f3f4f6;
//       border-radius: 16px 0 0 0;
//       flex-shrink: 0;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-name {
//       font-size: 28px;
//       text-transform: uppercase;
//       color: #4b5563;
//       margin-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       line-height: 1.2;
//     }

//     .t6-resume .t6-jobtitle {
//       font-size: 14px;
//       color: #4b5563;
//       margin-bottom: 8px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t6-resume .t6-links {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 8px;
//       flex-wrap: wrap;
//     }

//     .t6-resume .t6-link {
//       font-size: 14px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: #4b5563;
//     }

//     /* ── LEFT SECTION HEADING ── */
//     .t6-resume .t6-lsection {
//       font-size: 13px;
//       font-weight: 500;
//       text-transform: uppercase;
//       letter-spacing: 0.1em;
//       color: #4b5563;
//       padding-bottom: 6px;
//       margin-top: 12px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t6-resume .t6-divider-sm {
//       border: none;
//       border-top: 1px solid #6b7280;
//       margin-bottom: 8px;
//     }

//     /* ── CONTACT ITEMS ── */
//     .t6-resume .t6-contact-row {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       padding: 4px 0;
//     }

//     .t6-resume .t6-icon-wrap {
//       width: 24px;
//       height: 24px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .t6-resume .t6-icon-wrap svg {
//       width: 14px;
//       height: 14px;
//       color: #4b5563;
//       stroke: #4b5563;
//       fill: none;
//     }

//     .t6-resume .t6-contact-text {
//       font-size: 13px;
//       color: #4b5563;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       line-height: 1.4;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t6-resume .t6-education-grade {
//       font-size: 12px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t6-resume .t6-project-item {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t6-resume .t6-project-link {
//       font-size: 12px;
//       color: #4b5563;
//       text-decoration: underline;
//     }

//     .t6-resume .t6-project-tech {
//       font-size: 12px;
//       color: #6b7280;
//       margin: 4px 0;
//     }

//     /* ── EXTRA TEXT (certs, hobbies, awards) ── */
//     .t6-resume .t6-extra {
//       padding-top: 6px;
//       padding-bottom: 4px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t6-resume .t6-right {
//       width: 60%;
//       padding-left: 16px;
//       padding-right: 4px;
//     }

//     /* ── RIGHT SECTION HEADING ── */
//     .t6-resume .t6-rsection {
//       font-size: 13px;
//       font-weight: 500;
//       text-transform: uppercase;
//       letter-spacing: 0.1em;
//       color: #4b5563;
//       padding-bottom: 6px;
//       margin-top: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t6-resume .t6-divider-md {
//       border: none;
//       border-top: 2px solid #d1d5db;
//       margin-bottom: 8px;
//     }

//     /* ── EXPERIENCE HEADER ── */
//     .t6-resume .t6-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-experience-title {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t6-resume .t6-experience-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     .t6-resume .t6-experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 6px;
//       font-weight: 500;
//     }

//     /* ── EDUCATION HEADER ── */
//     .t6-resume .t6-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-education-school {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t6-resume .t6-education-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     .t6-resume .t6-education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     /* ── ENTRY ── */
//     .t6-resume .t6-entry {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-entry-title {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       margin-top: 6px;
//     }

//     .t6-resume .t6-entry-title-muted {
//       font-weight: 400;
//       color: #6b7280;
//     }

//     .t6-resume .t6-entry-date {
//       font-size: 13px;
//       color: #4b5563;
//       margin-top: 3px;
//     }

//     .t6-resume .t6-entry-content {
//       padding-top: 6px;
//       padding-bottom: 4px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//     /* ── SUMMARY ── */
//     .t6-resume .t6-summary {
//       padding-top: 8px;
//       padding-bottom: 10px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* ── WEBSITES ── */
//     .t6-resume .t6-website-item {
//       margin-bottom: 8px;
//     }

//     .t6-resume .t6-website-label {
//       font-size: 13px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t6-resume .t6-website-link {
//       font-size: 13px;
//       color: #111827;
//       text-decoration: underline;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Custom Section Wrapper */
//     .t6-resume .custom-section-wrapper {
//       margin-top: 0;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* ── PRINT ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .t6-resume .t6-left {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — single source for preview and PDF
//   ====================================================== */
//   const generateHTML = useCallback((forPDF = false): string => {
//     const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//     const addressStr = addressParts;

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     // Generate skills HTML
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t6-lsection">Skills</div>
//         <hr class="t6-divider-sm"/>
//         <div class="t6-skills-content">${cleanedSkills}</div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t6-rsection">Projects</div>
//         <hr class="t6-divider-md"/>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t6-project-item">
//             <div class="t6-project-header">
//               <div class="t6-entry-title">${project.title || ""}</div>
//               <div class="t6-project-links">
//                 ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t6-project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t6-project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `
//               <div class="t6-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             `
//                 : ""
//             }
//             ${
//               project.description
//                 ? `
//               <div class="t6-entry-content">${cleanQuillHTML(project.description)}</div>
//             `
//                 : ""
//             }
//           </div>
//         `,
//           )
//           .join("")}
//       `;
//     };

//     // PDF override: strip the fixed width/padding from .t6-resume so Puppeteer's
//     // own 15mm margins control the layout
//     const pdfOverrideStyle = forPDF
//       ? `<style>.t6-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t6-resume">

//   <!-- LEFT COLUMN -->
//   <div class="t6-left">

//     <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${contact.jobTitle ? `<div class="t6-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}

//     <div class="t6-links">
//       ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t6-link" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t6-link" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t6-link" target="_blank">Portfolio</a>` : ""}
//     </div>

//     <div class="t6-lsection">Details</div>
//     <hr class="t6-divider-sm"/>

//     ${
//       contact?.email
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("email")}
//       </div>
//       <div class="t6-contact-text">${contact.email}</div>
//     </div>`
//         : ""
//     }

//     ${
//       contact?.phone
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("phone")}
//       </div>
//       <div class="t6-contact-text">${contact.phone}</div>
//     </div>`
//         : ""
//     }

//     ${
//       addressStr
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("location")}
//       </div>
//       <div class="t6-contact-text">${addressStr}</div>
//     </div>`
//         : ""
//     }

//     ${
//       formattedDobHtml
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">
//         ${getIconHTML("calendar")}
//       </div>
//       <div class="t6-contact-text">${formattedDobHtml}</div>
//     </div>`
//         : ""
//     }

//     ${generateSkillsHTML()}

//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t6-right">

//     ${
//       summary
//         ? `
//     <div class="t6-rsection">Summary</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-summary">${cleanQuillHTML(summary)}</div>`
//         : ""
//     }

//     <!-- EXPERIENCE -->
//     ${
//       experiences.length > 0
//         ? `
//     <div class="t6-rsection">Experience</div>
//     <hr class="t6-divider-md"/>
//     ${experiences
//       .map((exp) => {
//         const start = formatMonthYear(exp.startDate, false);
//         const end = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t6-entry">
//       <div class="t6-experience-header">
//         <div class="t6-experience-title">${exp.jobTitle || ""}</div>
//         <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//       </div>
//       <div class="t6-experience-subtitle">
//         ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//       </div>
//       ${exp.text ? `<div class="t6-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${generateProjectsHTML()}

//     <!-- EDUCATION -->
//     ${
//       educations.length > 0
//         ? `
//     <div class="t6-rsection">Education</div>
//     <hr class="t6-divider-md"/>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//     <div class="t6-entry">
//       <div class="t6-education-header">
//         <div class="t6-education-school">${edu.schoolname || ""}</div>
//         <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//       </div>
//       <div class="t6-education-subtitle">
//         ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//       </div>
//       ${formattedGrade ? `<div class="t6-education-grade">${formattedGrade}</div>` : ""}
//       ${edu.text ? `<div class="t6-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     <!-- CUSTOM SECTIONS -->
//     ${customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
//     <div class="custom-section-wrapper">
//       ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//       ${s.description ? `<div class="t6-extra">${cleanQuillHTML(s.description)}</div>` : ""}
//     </div>`,
//       )
//       .join("")}

//   </div>
// </div>
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, customSection, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, addressParts, CSS]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — mirrors Puppeteer's page-break-inside:avoid logic
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
//           const resume = doc.querySelector<HTMLElement>(".t6-resume");
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
//             ".t6-left",
//             ".t6-entry",
//             ".t6-project-item",
//             ".t6-lsection",
//             ".t6-rsection",
//             ".custom-section-wrapper",
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
//     .t6-resume {
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

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html: generateHTML(true),
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
//             className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
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

// export default TemplateSix;

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
// import { Contact, Finalize, ResumeProps } from "@/app/types/context.types";
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

// // Helper to render SVG icons as HTML strings for PDF generation
// const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
//   switch (type) {
//     case "email":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
//     case "phone":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
//     case "location":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
//     case "calendar":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
//     default:
//       return "";
//   }
// };

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data sources ─────────────────────────────────────────────────────────
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

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t6-resume {
//   width: ${A4_W}px;
//   padding: 0 ${MARGIN}px;
//   background: white;
//   font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//   font-size: 15px;
//   line-height: 1.5;
//   color: #374151;
//   display: flex;
//   min-height: ${PAGE_CONTENT_H}px;
//   align-items: stretch;
// }

//     .t6-resume * { box-sizing: border-box; }

//     /* Rich text content styles */
//     .t6-resume .t6-entry-content ul,
//     .t6-resume .t6-entry-content ol,
//     .t6-resume .t6-summary ul,
//     .t6-resume .t6-summary ol,
//     .t6-resume .t6-extra ul,
//     .t6-resume .t6-extra ol,
//     .t6-resume .t6-skills-content ul,
//     .t6-resume .t6-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t6-resume .t6-entry-content li,
//     .t6-resume .t6-summary li,
//     .t6-resume .t6-extra li,
//     .t6-resume .t6-skills-content li {
//       margin-bottom: 4px !important;
//     }

//     .t6-resume .t6-entry-content strong,
//     .t6-resume .t6-summary strong,
//     .t6-resume .t6-extra strong,
//     .t6-resume .t6-skills-content strong { font-weight: 700 !important; }

//     .t6-resume .t6-entry-content em,
//     .t6-resume .t6-summary em,
//     .t6-resume .t6-extra em,
//     .t6-resume .t6-skills-content em { font-style: italic !important; }

//     .t6-resume .t6-entry-content u,
//     .t6-resume .t6-summary u,
//     .t6-resume .t6-extra u,
//     .t6-resume .t6-skills-content u { text-decoration: underline !important; }

//     .t6-resume .t6-entry-content p,
//     .t6-resume .t6-summary p,
//     .t6-resume .t6-extra p,
//     .t6-resume .t6-skills-content p { white-space: pre-wrap !important; }

//     .t6-resume .t6-skills-content { margin-top: 8px; }
//     .t6-resume .t6-skills-content p { margin: 0 0 6px 0 !important; }

//     /* ── LEFT COLUMN ── */
//     // .t6-resume .t6-left {
//     //   width: 40%;
//     //   padding: 20px;
//     //   background-color: #f3f4f6;
//     //   border-radius: 16px 0 0 0;
//     //   flex-shrink: 0;
//     //     height: 100%; /* ADD THIS */
//     // }

//     .t6-resume .t6-left {
//   width: 40%;
//   padding: 20px;
//   background-color: #f3f4f6;
//   border-radius: 16px 0 0 0;
//   flex-shrink: 0;
//   align-self: stretch;
// }

//     .t6-resume .t6-name {
//       font-size: 28px;
//       text-transform: uppercase;
//       color: #4b5563;
//       margin-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       line-height: 1.2;
//     }

//     .t6-resume .t6-jobtitle {
//       font-size: 14px;
//       color: #4b5563;
//       margin-bottom: 8px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t6-resume .t6-links {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 8px;
//       flex-wrap: wrap;
//     }

//     .t6-resume .t6-link {
//       font-size: 14px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: #4b5563;
//     }

//     /* ── LEFT SECTION HEADING ── */
//     .t6-resume .t6-lsection {
//       font-size: 13px;
//       font-weight: 500;
//       text-transform: uppercase;
//       letter-spacing: 0.1em;
//       color: #4b5563;
//       padding-bottom: 6px;
//       margin-top: 12px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t6-resume .t6-divider-sm {
//       border: none;
//       border-top: 1px solid #6b7280;
//       margin-bottom: 8px;
//     }

//     /* ── CONTACT ITEMS ── */
//     .t6-resume .t6-contact-row {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       padding: 4px 0;
//     }

//     .t6-resume .t6-icon-wrap {
//       width: 24px;
//       height: 24px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .t6-resume .t6-icon-wrap svg {
//       width: 14px;
//       height: 14px;
//       color: #4b5563;
//       stroke: #4b5563;
//       fill: none;
//     }

//     .t6-resume .t6-contact-text {
//       font-size: 13px;
//       color: #4b5563;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       line-height: 1.4;
//     }

//     .t6-resume .t6-education-grade {
//       font-size: 12px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t6-resume .t6-project-item {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-project-links { display: flex; gap: 12px; }
//     .t6-resume .t6-project-link  { font-size: 12px; color: #4b5563; text-decoration: underline; }
//     .t6-resume .t6-project-tech  { font-size: 12px; color: #6b7280; margin: 4px 0; }

//     .t6-resume .t6-extra {
//       padding-top: 6px;
//       padding-bottom: 4px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t6-resume .t6-right {
//       width: 60%;
//       padding-left: 16px;
//       padding-right: 4px;
//         height: 100%; /* ADD THIS */
//   overflow-y: visible; /* ADD THIS */
//     }

//     /* ── RIGHT SECTION HEADING ── */
//     .t6-resume .t6-rsection {
//       font-size: 13px;
//       font-weight: 500;
//       text-transform: uppercase;
//       letter-spacing: 0.1em;
//       color: #4b5563;
//       padding-bottom: 6px;
//       margin-top: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t6-resume .t6-divider-md {
//       border: none;
//       border-top: 2px solid #d1d5db;
//       margin-bottom: 8px;
//     }

//     /* ── EXPERIENCE ── */
//     .t6-resume .t6-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-experience-title  { font-size: 15px; font-weight: 600; color: #111827; }
//     .t6-resume .t6-experience-date   { font-size: 13px; color: #4b5563; }
//     .t6-resume .t6-experience-subtitle {
//       font-size: 14px; color: #6b7280; margin-bottom: 6px; font-weight: 500;
//     }

//     /* ── EDUCATION ── */
//     .t6-resume .t6-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-education-school   { font-size: 15px; font-weight: 600; color: #111827; }
//     .t6-resume .t6-education-date     { font-size: 13px; color: #4b5563; }
//     .t6-resume .t6-education-subtitle { font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 500; }

//     /* ── ENTRY ── */
//     .t6-resume .t6-entry {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-entry-title {
//       font-size: 15px; font-weight: 600; color: #111827;
//       word-wrap: break-word; overflow-wrap: break-word; margin-top: 6px;
//     }

//     .t6-resume .t6-entry-date   { font-size: 13px; color: #4b5563; margin-top: 3px; }

//     .t6-resume .t6-entry-content {
//       padding-top: 6px; padding-bottom: 4px;
//       color: #374151; font-size: 14px;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t6-resume .t6-entry-content ul { list-style-type: disc    !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//     /* ── SUMMARY ── */
//     .t6-resume .t6-summary {
//       padding-top: 8px; padding-bottom: 10px;
//       color: #374151; font-size: 14px;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* Custom Section Wrapper */
//     .t6-resume .custom-section-wrapper {
//       margin-top: 0;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Page-break marker injected at exact cut points for PDF */
//     .t6-page-break {
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
//       .t6-resume { width: 100% !important; padding: 0 !important;         height: 100% !important }
//       .t6-resume .t6-left {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//         height: 100% !important
//       }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   // pageBreakIds: array of element data-ids where page breaks should be injected.
//   // Used when forPDF=true so Puppeteer breaks at the same points as the preview.
//   //
//   // TWO-COLUMN NOTE:
//   //   Page breaks are injected INSIDE .t6-right only.
//   //   .t6-left is a fixed sidebar — it has no cut points.
//   //   data-block-id attributes are placed on right-column section groups and entries.
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       // ── Left column ──────────────────────────────────────────────────────
//       const skillsClean = cleanQuillHTML(skills || "");
//       const skillsHTML =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `<div class="t6-lsection">Skills</div>
//              <hr class="t6-divider-sm"/>
//              <div class="t6-skills-content">${skillsClean}</div>`
//           : "";

//       const leftCol = `
//       <div class="t6-left">
//         <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         ${contact?.jobTitle
//           ? `<div class="t6-jobtitle">${
//               typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//             }</div>`
//           : ""}

//         <div class="t6-links">
//           ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t6-link" target="_blank">LinkedIn</a>` : ""}
//           ${githubUrl?.trim()   ? `<a href="${href(githubUrl)}"   class="t6-link" target="_blank">GitHub</a>`   : ""}
//           ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t6-link" target="_blank">Portfolio</a>` : ""}
//         </div>

//         <div class="t6-lsection">Details</div>
//         <hr class="t6-divider-sm"/>
//         ${contact?.email
//           ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("email")}</div>
//                <div class="t6-contact-text">${contact.email}</div>
//              </div>`
//           : ""}
//         ${contact?.phone
//           ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("phone")}</div>
//                <div class="t6-contact-text">${contact.phone}</div>
//              </div>`
//           : ""}
//         ${addressParts
//           ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("location")}</div>
//                <div class="t6-contact-text">${addressParts}</div>
//              </div>`
//           : ""}
//         ${formattedDob
//           ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("calendar")}</div>
//                <div class="t6-contact-text">${formattedDob}</div>
//              </div>`
//           : ""}

//         ${skillsHTML}
//       </div>`;

//       // ── Right column sections (each gets a data-block-id) ────────────────
//       const summaryBlock = summary
//         ? `<div class="t6-right-section" data-block-id="t6-summary">
//              <div class="t6-rsection">Summary</div>
//              <hr class="t6-divider-md"/>
//              <div class="t6-summary">${cleanQuillHTML(summary)}</div>
//            </div>`
//         : "";

//       const expBlock =
//         experiences.length > 0
//           ? `<div class="t6-right-section" data-block-id="t6-exp-section">
//                <div class="t6-rsection">Experience</div>
//                <hr class="t6-divider-md"/>
//                ${experiences
//                  .map((exp: any, i: number) => {
//                    const start = formatMonthYear(exp.startDate, false);
//                    const end = exp.endDate
//                      ? formatMonthYear(exp.endDate, false)
//                      : exp.startDate ? "Present" : "";
//                    return `<div class="t6-entry" data-block-id="t6-exp-${i}">
//                      <div class="t6-experience-header">
//                        <div class="t6-experience-title">${exp.jobTitle || ""}</div>
//                        <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//                      </div>
//                      <div class="t6-experience-subtitle">
//                        ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                      </div>
//                      ${exp.text ? `<div class="t6-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//                    </div>`;
//                  })
//                  .join("")}
//              </div>`
//           : "";

//       const projBlock =
//         projects.length > 0
//           ? `<div class="t6-right-section" data-block-id="t6-proj-section">
//                <div class="t6-rsection">Projects</div>
//                <hr class="t6-divider-md"/>
//                ${projects
//                  .map(
//                    (p: any, i: number) => `
//                  <div class="t6-project-item" data-block-id="t6-proj-${i}">
//                    <div class="t6-project-header">
//                      <div class="t6-entry-title">${p.title || ""}</div>
//                      <div class="t6-project-links">
//                        ${p.liveUrl   ? `<a href="${href(p.liveUrl)}"   class="t6-project-link" target="_blank">Live Demo</a>` : ""}
//                        ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t6-project-link" target="_blank">GitHub</a>`   : ""}
//                      </div>
//                    </div>
//                    ${p.techStack?.length ? `<div class="t6-project-tech"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
//                    ${p.description ? `<div class="t6-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
//                  </div>`,
//                  )
//                  .join("")}
//              </div>`
//           : "";

//       const eduBlock =
//         educations.length > 0
//           ? `<div class="t6-right-section" data-block-id="t6-edu-section">
//                <div class="t6-rsection">Education</div>
//                <hr class="t6-divider-md"/>
//                ${educations
//                  .map((edu: any, i: number) => {
//                    const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                    return `<div class="t6-entry" data-block-id="t6-edu-${i}">
//                      <div class="t6-education-header">
//                        <div class="t6-education-school">${edu.schoolname || ""}</div>
//                        <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                      </div>
//                      <div class="t6-education-subtitle">
//                        ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                      </div>
//                      ${grade ? `<div class="t6-education-grade">${grade}</div>` : ""}
//                      ${edu.text ? `<div class="t6-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//                    </div>`;
//                  })
//                  .join("")}
//              </div>`
//           : "";

//       const customBlock = customSection
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any, i: number) => `
//           <div class="t6-right-section custom-section-wrapper" data-block-id="t6-custom-${i}">
//             ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//             ${s.description ? `<div class="t6-extra">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`,
//         )
//         .join("");

//       // For PDF: inject <div class="t6-page-break"> before the right-column
//       // element whose data-block-id matches each cut point ID.
//       // We rebuild rightColContent, then do the injection inside .t6-right only.
//       let rightColContent = `
//         ${summaryBlock}
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//         ${customBlock}
//       `;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = rightColContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t6-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         rightColContent = tempDiv.innerHTML;
//       }

//       const pdfStyle = forPDF
//   ? `<style>
//       html, body {
//         margin: 0 !important;
//         padding: 0 !important;
//         width: 794px !important;
//         height: 1123px !important;
//       }
//       .t6-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         height: 1123px !important;
//         min-height: 1123px !important;
//         align-items: stretch !important;
//       }
//       .t6-resume .t6-left {
//         min-height: 1123px !important;
//         align-self: stretch !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .t6-resume .t6-right {
//         align-self: stretch !important;
//       }
//     </style>`
//   : "";

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t6-resume">
//     ${leftCol}
//     <div class="t6-right">
//       ${rightColContent}
//     </div>
//   </div>
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
//       dateOfBirth,
//       addressParts,
//       CSS,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — adapted from TemplateOne for two-column layout
//   //
//   // KEY DIFFERENCE vs single-column templates:
//   //   We measure the RIGHT COLUMN height only (not the full .t6-resume flex row).
//   //   The left sidebar is always full-height — it has no independent cut points.
//   //   All block positions are relative to the top of .t6-right, not .t6-resume.
//   //
//   //   Cut-point IDs come from .t6-right-section and .t6-entry elements.
//   //   Section heading + first entry are paired to prevent orphaned headings.
//   //
//   //   clipH = nextStart - thisStart prevents content bleeding on preview pages.
//   //   pageBreakIds stored on window for handleDownload to read.
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t6-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         // Fresh hidden iframe — ensures fonts and layout match the render iframes
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
//     .t6-resume {
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
//           // We measure the RIGHT COLUMN — it controls pagination in a two-col layout.
//           // The left sidebar is purely decorative from a pagination standpoint.
//           const rightCol = measureDoc.querySelector<HTMLElement>(".t6-right");
//           if (!rightCol) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void rightCol.offsetHeight; // force reflow

//           const totalH = rightCol.scrollHeight;
//           const rightRect = rightCol.getBoundingClientRect();
//           const scrollY =
//             measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           // Position relative to the top of .t6-right
//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - rightRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           // ── Collect avoid-break blocks ──────────────────────────────────
//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           // Individual entries and project items
//           const ITEM_SELECTORS = [
//             ".t6-entry",
//             ".t6-project-item",
//             ".custom-section-wrapper",
//           ].join(", ");

//           rightCol.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top    = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // Section heading + first entry paired — avoids orphaned headings.
//           // In T6 the heading (.t6-rsection) and its <hr> live directly inside
//           // .t6-right-section, so we walk the section wrapper's children.
//           rightCol
//             .querySelectorAll<HTMLElement>(".t6-right-section")
//             .forEach((section) => {
//               const sectionTop = getRelTop(section);
//               // Find the first .t6-entry or .t6-project-item inside this section
//               const firstItem = section.querySelector<HTMLElement>(
//                 ".t6-entry, .t6-project-item",
//               );
//               if (firstItem) {
//                 const anchorBottom = getRelBottom(firstItem);
//                 if (anchorBottom - sectionTop > 8) {
//                   blocks.push({
//                     top:    sectionTop,
//                     bottom: anchorBottom,
//                     id:     section.dataset.blockId,
//                   });
//                 }
//               }
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate cut points ────────────────────────────────────────
//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut     = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut  = naiveCut;
//             let cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top  >= naiveCut)     break;
//               if (block.bottom <= currentStart) continue;
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 if (block.top < actualCut) {
//                   actualCut  = block.top;
//                   cutBlockId = block.id;
//                 }
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

//           document.body.removeChild(iframe);

//           // Store for handleDownload
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           // ── Build preview page HTMLs ──────────────────────────────────
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart      = pageStarts[i + 1] ?? totalH;
//             // Clip at actual cut point — prevents bleed into the next page
//             const clipH          = nextStart - contentOffsetY;

//          pageHtmls.push(`<!DOCTYPE html>
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
//       position: absolute; top: ${-contentOffsetY}px; left: 0;
//       width: ${A4_W}px;
//       min-height: ${PAGE_CONTENT_H}px;
//     }
//     .t6-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//       display: flex !important;
//       align-items: stretch !important;
//       min-height: ${PAGE_CONTENT_H}px !important;
//       box-sizing: border-box !important;
//     }
//     .t6-resume .t6-left {
//       min-height: ${PAGE_CONTENT_H}px !important;
//       align-self: stretch !important;
//     }
//     .t6-resume .t6-name {
//       font-size: 28px !important;
//       white-space: normal !important;
//       word-break: break-word !important;
//       overflow-wrap: break-word !important;
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
//   // Reads pageBreakIds from splitIntoPages and passes them to generateHTML so
//   // Puppeteer inserts CSS page-break markers at the exact same cut points.
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);
//       const res: AxiosResponse<Blob> = await api.post(
//               `${API_URL}/candidates/generate-pdf`,
//               { html:pdfHtml  },
//               { responseType: "blob" },
//             );

//       const url = URL.createObjectURL(res.data);
//       const a   = document.createElement("a");
//       a.href    = url;
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

//   // ── RENDER ───────────────────────────────────────────────────────────────
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
//        )}

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
//         // For full preview mode, change the outer div:
// <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//   {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//     <div key={idx} style={{ marginBottom: "28px" }}>
//       {/* Page pill remains the same */}

//       {/* A4 card - ensure it takes full height */}
//       <div
//         style={{
//           width: `${A4_W}px`,
//           height: `${A4_H}px`, // This is correct - fixed height
//           overflow: "hidden",
//           background: "white",
//           boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//           borderRadius: "2px",
//           flexShrink: 0,
//           position: "relative", // ADD THIS
//         }}
//       >
//         <iframe
//           title={`resume-page-${idx + 1}`}
//           srcDoc={pageHtml}
//           style={{
//             width: `${A4_W}px`,
//             height: `${A4_H}px`, // This is correct - fixed height
//             border: "none",
//             display: "block",
//             pointerEvents: "none",
//             position: "absolute", // ADD THIS
//             top: 0, // ADD THIS
//             left: 0, // ADD THIS
//           }}
//           scrolling="no"
//           sandbox="allow-same-origin allow-scripts"
//         />
//       </div>
//     </div>
//   ))}
// </div>
//       )}
//     </>
//   );
// };

// export default TemplateSix;

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
// import { Contact, Finalize, ResumeProps } from "@/app/types/context.types";
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

// // Left column is 40% of content width (A4_W - 2*MARGIN = 680px → 40% = 272px)
// // This is used to constrain the name width identically in preview and PDF.
// const LEFT_COL_W = Math.round((A4_W - MARGIN * 2) * 0.4); // 272px

// const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
//   switch (type) {
//     case "email":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
//     case "phone":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
//     case "location":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
//     case "calendar":
//       return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
//     default:
//       return "";
//   }
// };

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data sources ─────────────────────────────────────────────────────────
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

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   // KEY DESIGN DECISION:
//   //   .t6-resume uses padding: 0 ${MARGIN}px so that the inner content width
//   //   is A4_W - 2*MARGIN = 680px. The left column is 40% of THIS (272px),
//   //   not 40% of A4_W. This must be identical in preview and PDF.
//   //   We use explicit pixel widths on .t6-left and .t6-right to lock this.
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page { size: A4; margin: 0; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t6-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//       font-size: 15px;
//       line-height: 1.5;
//       color: #374151;
//       display: flex;
//       align-items: stretch;
//       min-height: ${PAGE_CONTENT_H}px;
//       box-sizing: border-box;
//     }

//     .t6-resume * { box-sizing: border-box; }

//     /* Rich text content styles */
//     .t6-resume .t6-entry-content ul,
//     .t6-resume .t6-entry-content ol,
//     .t6-resume .t6-summary ul,
//     .t6-resume .t6-summary ol,
//     .t6-resume .t6-extra ul,
//     .t6-resume .t6-extra ol,
//     .t6-resume .t6-skills-content ul,
//     .t6-resume .t6-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t6-resume .t6-entry-content li,
//     .t6-resume .t6-summary li,
//     .t6-resume .t6-extra li,
//     .t6-resume .t6-skills-content li { margin-bottom: 4px !important; }

//     .t6-resume .t6-entry-content strong,
//     .t6-resume .t6-summary strong,
//     .t6-resume .t6-extra strong,
//     .t6-resume .t6-skills-content strong { font-weight: 700 !important; }

//     .t6-resume .t6-entry-content em,
//     .t6-resume .t6-summary em,
//     .t6-resume .t6-extra em,
//     .t6-resume .t6-skills-content em { font-style: italic !important; }

//     .t6-resume .t6-entry-content u,
//     .t6-resume .t6-summary u,
//     .t6-resume .t6-extra u,
//     .t6-resume .t6-skills-content u { text-decoration: underline !important; }

//     .t6-resume .t6-entry-content p,
//     .t6-resume .t6-summary p,
//     .t6-resume .t6-extra p,
//     .t6-resume .t6-skills-content p { white-space: pre-wrap !important; }

//     .t6-resume .t6-skills-content { margin-top: 8px; }
//     .t6-resume .t6-skills-content p { margin: 0 0 6px 0 !important; }

//     /* ── LEFT COLUMN ── */
//     /* Use explicit pixel width so it's identical in preview and PDF */
//     .t6-resume .t6-left {
//       width: ${LEFT_COL_W}px;
//       flex-shrink: 0;
//       flex-grow: 0;
//       padding: 20px;
//       background-color: #f3f4f6;
//       border-radius: 16px 0 0 0;
//       align-self: stretch;
//       min-height: ${PAGE_CONTENT_H}px;
//     }

//     .t6-resume .t6-name {
//       font-size: 28px;
//       text-transform: uppercase;
//       color: #4b5563;
//       margin-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       white-space: normal;
//       line-height: 1.2;
//     }

//     .t6-resume .t6-jobtitle {
//       font-size: 14px;
//       color: #4b5563;
//       margin-bottom: 8px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t6-resume .t6-links {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 8px;
//       flex-wrap: wrap;
//     }

//     .t6-resume .t6-link {
//       font-size: 14px;
//       font-weight: 600;
//       text-decoration: underline;
//       color: #4b5563;
//     }

//     /* ── LEFT SECTION HEADING ── */
//     .t6-resume .t6-lsection {
//       font-size: 13px;
//       font-weight: 500;
//       text-transform: uppercase;
//       letter-spacing: 0.1em;
//       color: #4b5563;
//       padding-bottom: 6px;
//       margin-top: 12px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t6-resume .t6-divider-sm {
//       border: none;
//       border-top: 1px solid #6b7280;
//       margin-bottom: 8px;
//     }

//     /* ── CONTACT ITEMS ── */
//     .t6-resume .t6-contact-row {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       padding: 4px 0;
//     }

//     .t6-resume .t6-icon-wrap {
//       width: 24px;
//       height: 24px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .t6-resume .t6-icon-wrap svg {
//       width: 14px;
//       height: 14px;
//       color: #4b5563;
//       stroke: #4b5563;
//       fill: none;
//     }

//     .t6-resume .t6-contact-text {
//       font-size: 13px;
//       color: #4b5563;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       line-height: 1.4;
//     }

//     .t6-resume .t6-education-grade {
//       font-size: 12px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t6-resume .t6-project-item {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-project-links { display: flex; gap: 12px; }
//     .t6-resume .t6-project-link  { font-size: 12px; color: #4b5563; text-decoration: underline; }
//     .t6-resume .t6-project-tech  { font-size: 12px; color: #6b7280; margin: 4px 0; }

//     .t6-resume .t6-extra {
//       padding-top: 6px;
//       padding-bottom: 4px;
//       color: #374151;
//       font-size: 14px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t6-resume .t6-right {
//       flex: 1;
//       min-width: 0;
//       padding-left: 16px;
//       padding-right: 4px;
//       align-self: stretch;
//       overflow-y: visible;
//     }

//     /* ── RIGHT SECTION HEADING ── */
//     .t6-resume .t6-rsection {
//       font-size: 13px;
//       font-weight: 500;
//       text-transform: uppercase;
//       letter-spacing: 0.1em;
//       color: #4b5563;
//       padding-bottom: 6px;
//       margin-top: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t6-resume .t6-divider-md {
//       border: none;
//       border-top: 2px solid #d1d5db;
//       margin-bottom: 8px;
//     }

//     /* ── EXPERIENCE ── */
//     .t6-resume .t6-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-experience-title  { font-size: 15px; font-weight: 600; color: #111827; }
//     .t6-resume .t6-experience-date   { font-size: 13px; color: #4b5563; }
//     .t6-resume .t6-experience-subtitle {
//       font-size: 14px; color: #6b7280; margin-bottom: 6px; font-weight: 500;
//     }

//     /* ── EDUCATION ── */
//     .t6-resume .t6-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t6-resume .t6-education-school   { font-size: 15px; font-weight: 600; color: #111827; }
//     .t6-resume .t6-education-date     { font-size: 13px; color: #4b5563; }
//     .t6-resume .t6-education-subtitle { font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 500; }

//     /* ── ENTRY ── */
//     .t6-resume .t6-entry {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t6-resume .t6-entry-title {
//       font-size: 15px; font-weight: 600; color: #111827;
//       word-wrap: break-word; overflow-wrap: break-word; margin-top: 6px;
//     }

//     .t6-resume .t6-entry-date { font-size: 13px; color: #4b5563; margin-top: 3px; }

//     .t6-resume .t6-entry-content {
//       padding-top: 6px; padding-bottom: 4px;
//       color: #374151; font-size: 14px;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t6-resume .t6-entry-content ul { list-style-type: disc    !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//     /* ── SUMMARY ── */
//     .t6-resume .t6-summary {
//       padding-top: 8px; padding-bottom: 10px;
//       color: #374151; font-size: 14px;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* Custom Section Wrapper */
//     .t6-resume .custom-section-wrapper {
//       margin-top: 0;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Page-break marker injected at exact cut points for PDF */
//  .t6-page-break {
//   page-break-before: always !important;
//   break-before: page !important;
//   display: block;
//   height: 0;
//   margin: 0;
//   padding: 0;
// }

//    @media print {
//   *, *::before, *::after {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//   }
//   html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
//   .t6-resume {
//     width: ${A4_W - MARGIN * 2}px !important;
//     padding: 0 !important;
//     align-items: stretch !important;
//   }
//   .t6-resume .t6-left {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//     align-self: stretch !important;
//   }
// }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       const skillsClean = cleanQuillHTML(skills || "");
//       const skillsHTML =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `<div class="t6-lsection">Skills</div>
//              <hr class="t6-divider-sm"/>
//              <div class="t6-skills-content">${skillsClean}</div>`
//           : "";

//       const leftCol = `
//       <div class="t6-left">
//         <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         ${
//           contact?.jobTitle
//             ? `<div class="t6-jobtitle">${
//                 typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//               }</div>`
//             : ""
//         }
//         <div class="t6-links">
//           ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t6-link" target="_blank">LinkedIn</a>` : ""}
//           ${githubUrl?.trim() ? `<a href="${href(githubUrl)}"   class="t6-link" target="_blank">GitHub</a>` : ""}
//           ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t6-link" target="_blank">Portfolio</a>` : ""}
//         </div>
//         <div class="t6-lsection">Details</div>
//         <hr class="t6-divider-sm"/>
//         ${
//           contact?.email
//             ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("email")}</div>
//                <div class="t6-contact-text">${contact.email}</div>
//              </div>`
//             : ""
//         }
//         ${
//           contact?.phone
//             ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("phone")}</div>
//                <div class="t6-contact-text">${contact.phone}</div>
//              </div>`
//             : ""
//         }
//         ${
//           addressParts
//             ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("location")}</div>
//                <div class="t6-contact-text">${addressParts}</div>
//              </div>`
//             : ""
//         }
//         ${
//           formattedDob
//             ? `<div class="t6-contact-row">
//                <div class="t6-icon-wrap">${getIconHTML("calendar")}</div>
//                <div class="t6-contact-text">${formattedDob}</div>
//              </div>`
//             : ""
//         }
//         ${skillsHTML}
//       </div>`;

//       const summaryBlock = summary
//         ? `<div class="t6-right-section" data-block-id="t6-summary">
//              <div class="t6-rsection">Summary</div>
//              <hr class="t6-divider-md"/>
//              <div class="t6-summary">${cleanQuillHTML(summary)}</div>
//            </div>`
//         : "";

//       const expBlock =
//         experiences.length > 0
//           ? `<div class="t6-right-section" data-block-id="t6-exp-section">
//                <div class="t6-rsection">Experience</div>
//                <hr class="t6-divider-md"/>
//                ${experiences
//                  .map((exp: any, i: number) => {
//                    const start = formatMonthYear(exp.startDate, false);
//                    const end = exp.endDate
//                      ? formatMonthYear(exp.endDate, false)
//                      : exp.startDate
//                        ? "Present"
//                        : "";
//                    return `<div class="t6-entry" data-block-id="t6-exp-${i}">
//                      <div class="t6-experience-header">
//                        <div class="t6-experience-title">${exp.jobTitle || ""}</div>
//                        <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//                      </div>
//                      <div class="t6-experience-subtitle">
//                        ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                      </div>
//                      ${exp.text ? `<div class="t6-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//                    </div>`;
//                  })
//                  .join("")}
//              </div>`
//           : "";

//       const projBlock =
//         projects.length > 0
//           ? `<div class="t6-right-section" data-block-id="t6-proj-section">
//                <div class="t6-rsection">Projects</div>
//                <hr class="t6-divider-md"/>
//                ${projects
//                  .map(
//                    (p: any, i: number) => `
//                  <div class="t6-project-item" data-block-id="t6-proj-${i}">
//                    <div class="t6-project-header">
//                      <div class="t6-entry-title">${p.title || ""}</div>
//                      <div class="t6-project-links">
//                        ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="t6-project-link" target="_blank">Live Demo</a>` : ""}
//                        ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t6-project-link" target="_blank">GitHub</a>` : ""}
//                      </div>
//                    </div>
//                    ${p.techStack?.length ? `<div class="t6-project-tech"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
//                    ${p.description ? `<div class="t6-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
//                  </div>`,
//                  )
//                  .join("")}
//              </div>`
//           : "";

//       const eduBlock =
//         educations.length > 0
//           ? `<div class="t6-right-section" data-block-id="t6-edu-section">
//                <div class="t6-rsection">Education</div>
//                <hr class="t6-divider-md"/>
//                ${educations
//                  .map((edu: any, i: number) => {
//                    const grade = formatGradeToCgpdAndPercentage(
//                      edu.grade || "",
//                    );
//                    return `<div class="t6-entry" data-block-id="t6-edu-${i}">
//                      <div class="t6-education-header">
//                        <div class="t6-education-school">${edu.schoolname || ""}</div>
//                        <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                      </div>
//                      <div class="t6-education-subtitle">
//                        ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                      </div>
//                      ${grade ? `<div class="t6-education-grade">${grade}</div>` : ""}
//                      ${edu.text ? `<div class="t6-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//                    </div>`;
//                  })
//                  .join("")}
//              </div>`
//           : "";

//       const customBlock = customSection
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any, i: number) => `
//           <div class="t6-right-section custom-section-wrapper" data-block-id="t6-custom-${i}">
//             ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//             ${s.description ? `<div class="t6-extra">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`,
//         )
//         .join("");

//       let rightColContent = `
//         ${summaryBlock}
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//         ${customBlock}
//       `;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = rightColContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t6-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         rightColContent = tempDiv.innerHTML;
//       }

//       const pdfStyle = forPDF
//         ? `<style>
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       @page { size: A4; margin: ${MARGIN}px !important; }
//       html, body {
//         margin: 0 !important;
//         padding: 0 !important;
//         width: ${A4_W}px !important;
//       }
//       .t6-resume {
//         width: ${A4_W - MARGIN * 2}px !important;
//         padding: 0 !important;
//         align-items: stretch !important;
//       }
//       .t6-resume .t6-left {
//         width: ${LEFT_COL_W}px !important;
//         align-self: stretch !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .t6-resume .t6-right {
//         align-self: stretch !important;
//       }
//     </style>`
//         : "";

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t6-resume">
//     ${leftCol}
//     <div class="t6-right">
//       ${rightColContent}
//     </div>
//   </div>
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
//       dateOfBirth,
//       addressParts,
//       CSS,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER
//   // Measures right column height, calculates cut points, builds per-page HTMLs.
//   // The left sidebar stretches to PAGE_CONTENT_H on every page via min-height.
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t6-resume");
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
//     .t6-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//       min-height: 0 !important;
//     }
//     .t6-resume .t6-left {
//       min-height: 0 !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const rightCol = measureDoc.querySelector<HTMLElement>(".t6-right");
//           if (!rightCol) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void rightCol.offsetHeight;

//           const totalH = rightCol.scrollHeight;
//           const rightRect = rightCol.getBoundingClientRect();
//           const scrollY =
//             measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - rightRect.top + scrollY;
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
//             ".t6-entry",
//             ".t6-project-item",
//             ".custom-section-wrapper",
//           ].join(", ");

//           rightCol
//             .querySelectorAll<HTMLElement>(ITEM_SELECTORS)
//             .forEach((el) => {
//               const top = getRelTop(el);
//               const bottom = getRelBottom(el);
//               if (bottom - top > 8) {
//                 blocks.push({ top, bottom, id: el.dataset.blockId });
//               }
//             });

//           rightCol
//             .querySelectorAll<HTMLElement>(".t6-right-section")
//             .forEach((section) => {
//               const sectionTop = getRelTop(section);
//               const firstItem = section.querySelector<HTMLElement>(
//                 ".t6-entry, .t6-project-item",
//               );
//               if (firstItem) {
//                 const anchorBottom = getRelBottom(firstItem);
//                 if (anchorBottom - sectionTop > 8) {
//                   blocks.push({
//                     top: sectionTop,
//                     bottom: anchorBottom,
//                     id: section.dataset.blockId,
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
//       position: absolute; top: ${-contentOffsetY}px; left: 0;
//       width: ${A4_W}px;
//     }
//     /* Force .t6-resume and left column to fill full page height in preview */
//     .t6-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important;
//       padding-bottom: 0 !important;
//       margin: 0 !important;
//       display: flex !important;
//       align-items: stretch !important;
//       min-height: ${PAGE_CONTENT_H}px !important;
//       box-sizing: border-box !important;
//     }
//     .t6-resume .t6-left {
//       width: ${LEFT_COL_W}px !important;
//       flex-shrink: 0 !important;
//       flex-grow: 0 !important;
//       min-height: ${PAGE_CONTENT_H}px !important;
//       align-self: stretch !important;
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
//     }
//   };

//   // ── RENDER ───────────────────────────────────────────────────────────────
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

//       {alldata ? (
//         // ── THUMBNAIL mode ───────────────────────────────────────────────
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
//         // ── FULL PREVIEW mode ────────────────────────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               {pages.length > 1 && (
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
//                     style={{ flex: 1, height: "1px", background: "#d1d5db" }}
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
//                     Page {idx + 1} of {pages.length}
//                   </span>
//                   <div
//                     style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                   />
//                 </div>
//               )}
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
//                   position: "relative",
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
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
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

// export default TemplateSix;

"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { Contact, Finalize, ResumeProps } from "@/app/types/context.types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import {
  ResumeCustomization,
  SectionKey,
  DEFAULT_SECTION_ORDER,
} from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;
const LEFT_COL_W = Math.round((A4_W - MARGIN * 2) * 0.4); // 272px

interface TemplateSixProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
  switch (type) {
    case "email":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
    case "phone":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
    case "location":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    case "calendar":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    default:
      return "";
  }
};

const TemplateSix: React.FC<TemplateSixProps> = ({
  alldata,
  customization,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";
  const activeSectionOrder: SectionKey[] = customization?.sectionOrder ?? [
    ...DEFAULT_SECTION_ORDER,
  ];

  // ── Data sources ─────────────────────────────────────────────────────────
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

  const customSection = Array.isArray(finalize?.customSection)
    ? finalize.customSection
    : [];

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ]
    .filter(Boolean)
    .join(", ");

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
    return map[fontFamily] || map["'Nunito', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder with dynamic font ─────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 0; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }


    .t6-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 15px;
      line-height: 1.5;
      color: #374151;
      display: flex;
      align-items: stretch;
        min-height: 100vh !important;
      
      box-sizing: border-box;
    }

    .t6-resume .t6-left {
      width: ${LEFT_COL_W}px;
      flex-shrink: 0;
      flex-grow: 0;
      padding: 20px;
      background-color: #f3f4f6;
      border-radius: 16px 0 0 0;
        min-height: 100vh !important;
      align-self: stretch;
    }

    .t6-resume * { box-sizing: border-box; }

    .t6-resume p, .t6-resume div, .t6-resume span, .t6-resume li, .t6-resume a {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    /* Rich text content styles */
    .t6-resume .t6-entry-content ul,
    .t6-resume .t6-entry-content ol,
    .t6-resume .t6-summary ul,
    .t6-resume .t6-summary ol,
    .t6-resume .t6-extra ul,
    .t6-resume .t6-extra ol,
    .t6-resume .t6-skills-content ul,
    .t6-resume .t6-skills-content ol {
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }

    .t6-resume .t6-entry-content li,
    .t6-resume .t6-summary li,
    .t6-resume .t6-extra li,
    .t6-resume .t6-skills-content li { margin-bottom: 4px !important; }

    .t6-resume .t6-entry-content strong,
    .t6-resume .t6-summary strong,
    .t6-resume .t6-extra strong,
    .t6-resume .t6-skills-content strong { font-weight: 700 !important; }

    .t6-resume .t6-entry-content em,
    .t6-resume .t6-summary em,
    .t6-resume .t6-extra em,
    .t6-resume .t6-skills-content em { font-style: italic !important; }

    .t6-resume .t6-entry-content u,
    .t6-resume .t6-summary u,
    .t6-resume .t6-extra u,
    .t6-resume .t6-skills-content u { text-decoration: underline !important; }

    .t6-resume .t6-entry-content p,
    .t6-resume .t6-summary p,
    .t6-resume .t6-extra p,
    .t6-resume .t6-skills-content p { white-space: pre-wrap !important; }

    .t6-resume .t6-skills-content { margin-top: 8px; }
    .t6-resume .t6-skills-content p { margin: 0 0 6px 0 !important; }

   

    .t6-resume .t6-name {
      font-size: 28px;
      text-transform: uppercase;
      color: #4b5563;
      margin-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      line-height: 1.2;
    }

    .t6-resume .t6-jobtitle {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 8px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t6-resume .t6-links {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .t6-resume .t6-link {
      font-size: 14px;
      font-weight: 600;
      text-decoration: underline;
      color: #4b5563;
    }

    .t6-resume .t6-lsection {
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #4b5563;
      padding-bottom: 6px;
      margin-top: 12px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t6-resume .t6-divider-sm {
      border: none;
      border-top: 1px solid #6b7280;
      margin-bottom: 8px;
    }

    .t6-resume .t6-contact-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
    }

    .t6-resume .t6-icon-wrap {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .t6-resume .t6-icon-wrap svg {
      width: 14px;
      height: 14px;
      color: #4b5563;
      stroke: #4b5563;
      fill: none;
    }

    .t6-resume .t6-contact-text {
      font-size: 13px;
      color: #4b5563;
      word-wrap: break-word;
      overflow-wrap: break-word;
      line-height: 1.4;
    }

    .t6-resume .t6-education-grade {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
      font-weight: 500;
    }

    /* Projects */
    .t6-resume .t6-project-item {
      margin-bottom: 14px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t6-resume .t6-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t6-resume .t6-project-links { display: flex; gap: 12px; }
    .t6-resume .t6-project-link  { font-size: 12px; color: #4b5563; text-decoration: underline; }
    .t6-resume .t6-project-tech  { font-size: 12px; color: #6b7280; margin: 4px 0; }

    .t6-resume .t6-extra {
      padding-top: 6px;
      padding-bottom: 4px;
      color: #374151;
      font-size: 14px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Right Column */
    .t6-resume .t6-right {
      flex: 1;
      min-width: 0;
      padding-left: 16px;
      padding-right: 4px;
      align-self: stretch;
      overflow-y: visible;
    }

    .t6-resume .t6-rsection {
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #4b5563;
      padding-bottom: 6px;
      margin-top: 10px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t6-resume .t6-divider-md {
      border: none;
      border-top: 2px solid #d1d5db;
      margin-bottom: 8px;
    }

    /* Experience */
    .t6-resume .t6-experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t6-resume .t6-experience-title  { font-size: 15px; font-weight: 600; color: #111827; }
    .t6-resume .t6-experience-date   { font-size: 13px; color: #4b5563; }
    .t6-resume .t6-experience-subtitle {
      font-size: 14px; color: #6b7280; margin-bottom: 6px; font-weight: 500;
    }

    /* Education */
    .t6-resume .t6-education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t6-resume .t6-education-school   { font-size: 15px; font-weight: 600; color: #111827; }
    .t6-resume .t6-education-date     { font-size: 13px; color: #4b5563; }
    .t6-resume .t6-education-subtitle { font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 500; }

    /* Entry */
    .t6-resume .t6-entry {
      margin-bottom: 14px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t6-resume .t6-entry-title {
      font-size: 15px; font-weight: 600; color: #111827;
      word-wrap: break-word; overflow-wrap: break-word; margin-top: 6px;
    }

    .t6-resume .t6-entry-date { font-size: 13px; color: #4b5563; margin-top: 3px; }

    .t6-resume .t6-entry-content {
      padding-top: 6px; padding-bottom: 4px;
      color: #374151; font-size: 14px;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
    .t6-resume .t6-entry-content ul { list-style-type: disc    !important; padding-left: 16px !important; margin: 0 !important; }
    .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
    .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

    /* Summary */
    .t6-resume .t6-summary {
      padding-top: 8px; padding-bottom: 10px;
      color: #374151; font-size: 14px;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    /* Custom Section Wrapper */
    .t6-resume .custom-section-wrapper {
      margin-top: 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Page-break marker */
    .t6-page-break {
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
      html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
      .t6-resume {
        width: ${A4_W - MARGIN * 2}px !important;
        padding: 0 !important;
        align-items: stretch !important;
        min-height: 100vh !important;
      }
      .t6-resume .t6-left {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        align-self: stretch !important;
        min-height: 100vh !important;
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
  // Note: For this template, sections are arranged in a specific order on the right column

  // ── HTML builder with section ordering ───────────────────────────────────

  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      // ── Section builders inside generateHTML ──────────────────────────────
      const sectionBuilders: Record<SectionKey, () => string> = {
        summary: () =>
          summary
            ? `
        <div class="t6-right-section" data-block-id="t6-summary">
          <div class="t6-rsection">Summary</div>
          <hr class="t6-divider-md"/>
          <div class="t6-summary">${rich(summary)}</div>
        </div>
      `
            : "",

        experience: () =>
          experiences.length > 0
            ? `
        <div class="t6-right-section" data-block-id="t6-exp-section">
          <div class="t6-rsection">Experience</div>
          <hr class="t6-divider-md"/>
          ${experiences
            .map((exp: any, i: number) => {
              const start = formatMonthYear(exp.startDate, false);
              const end = exp.endDate
                ? formatMonthYear(exp.endDate, false)
                : exp.startDate
                  ? "Present"
                  : "";
              return `<div class="t6-entry" data-block-id="t6-exp-${i}">
              <div class="t6-experience-header">
                <div class="t6-experience-title">${exp.jobTitle || ""}</div>
                <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
              </div>
              <div class="t6-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
              ${exp.text ? `<div class="t6-entry-content">${rich(exp.text)}</div>` : ""}
            </div>`;
            })
            .join("")}
        </div>
      `
            : "",

        projects: () =>
          projects.length > 0
            ? `
        <div class="t6-right-section" data-block-id="t6-proj-section">
          <div class="t6-rsection">Projects</div>
          <hr class="t6-divider-md"/>
          ${projects
            .map(
              (p: any, i: number) => `
            <div class="t6-project-item" data-block-id="t6-proj-${i}">
              <div class="t6-project-header">
                <div class="t6-entry-title">${p.title || ""}</div>
                <div class="t6-project-links">
                  ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t6-project-link" target="_blank">Live Demo</a>` : ""}
                  ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t6-project-link" target="_blank">GitHub</a>` : ""}
                </div>
              </div>
              ${p.techStack?.length ? `<div class="t6-project-tech"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
              ${p.description ? `<div class="t6-entry-content">${rich(p.description)}</div>` : ""}
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
        <div class="t6-right-section" data-block-id="t6-edu-section">
          <div class="t6-rsection">Education</div>
          <hr class="t6-divider-md"/>
          ${educations
            .map((edu: any, i: number) => {
              const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
              return `<div class="t6-entry" data-block-id="t6-edu-${i}">
              <div class="t6-education-header">
                <div class="t6-education-school">${edu.schoolname || ""}</div>
                <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
              </div>
              <div class="t6-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
              ${grade ? `<div class="t6-education-grade">${grade}</div>` : ""}
              ${edu.text ? `<div class="t6-entry-content">${rich(edu.text)}</div>` : ""}
            </div>`;
            })
            .join("")}
        </div>
      `
            : "",

        // Skills are always rendered in the left column — this builder is unused
        skills: () => "",

        custom: () =>
          customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any, i: number) => `
          <div class="t6-right-section custom-section-wrapper" data-block-id="t6-custom-${i}">
            ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
            ${s.description ? `<div class="t6-extra">${rich(s.description)}</div>` : ""}
          </div>
        `,
            )
            .join(""),
      };

      // Build left column (skills always appear here, not in right column)
      const skillsClean = rich(skills || "");
      const skillsHTML =
        skillsClean && skillsClean !== "<p><br></p>"
          ? `<div class="t6-lsection">Skills</div>
           <hr class="t6-divider-sm"/>
           <div class="t6-skills-content">${skillsClean}</div>`
          : "";

      const leftCol = `
        <div class="t6-left">
          <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          ${contact?.jobTitle ? `<div class="t6-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
          <div class="t6-links">
            ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t6-link" target="_blank">LinkedIn</a>` : ""}
            ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t6-link" target="_blank">GitHub</a>` : ""}
            ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t6-link" target="_blank">Portfolio</a>` : ""}
          </div>
          <div class="t6-lsection">Details</div>
          <hr class="t6-divider-sm"/>
          ${contact?.email ? `<div class="t6-contact-row"><div class="t6-icon-wrap">${getIconHTML("email")}</div><div class="t6-contact-text">${contact.email}</div></div>` : ""}
          ${contact?.phone ? `<div class="t6-contact-row"><div class="t6-icon-wrap">${getIconHTML("phone")}</div><div class="t6-contact-text">${contact.phone}</div></div>` : ""}
          ${addressParts ? `<div class="t6-contact-row"><div class="t6-icon-wrap">${getIconHTML("location")}</div><div class="t6-contact-text">${addressParts}</div></div>` : ""}
          ${formattedDob ? `<div class="t6-contact-row"><div class="t6-icon-wrap">${getIconHTML("calendar")}</div><div class="t6-contact-text">${formattedDob}</div></div>` : ""}
          ${skillsHTML}
        </div>`;

      // Build right column sections in the order defined by customization
      // Filter out "skills" since it's in left column
      const rightSections = activeSectionOrder.filter(
        (key) => key !== "skills",
      );
      const rightColContent = rightSections
        .map((key) => sectionBuilders[key]?.() ?? "")
        .join("");

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
          : "";

      const pdfStyle = forPDF
        ? `<style>
            *, *::before, *::after {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page { size: A4; margin: ${MARGIN}px !important; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .t6-resume {
              width: ${A4_W - MARGIN * 2}px !important;
              padding: 0 !important;
              display: flex !important;
              align-items: stretch !important;
              min-height: 100vh !important;
            }
            .t6-resume .t6-left {
              width: ${LEFT_COL_W}px !important;
              align-self: stretch !important;
              min-height: 100vh !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .t6-resume .t6-right { align-self: stretch !important; }
          </style>`
        : "";
      let rightColFinal = rightColContent;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = rightColFinal;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t6-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        rightColFinal = tempDiv.innerHTML;
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
  <div class="t6-resume">
    ${leftCol}
    <div class="t6-right">
      ${rightColFinal}
    </div>
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
      dateOfBirth,
      addressParts,
      CSS,
    ],
  );

  // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t6-resume");
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
    .t6-resume {
      width: ${A4_W}px !important;
      padding-left: ${MARGIN}px !important;
      padding-right: ${MARGIN}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      margin: 0 !important; box-sizing: border-box !important;
      min-height: 0 !important;
    }
    .t6-resume .t6-left { min-height: 0 !important; }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const rightCol = measureDoc.querySelector<HTMLElement>(".t6-right");
          if (!rightCol) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void rightCol.offsetHeight;

          const totalH = rightCol.scrollHeight;
          const rightRect = rightCol.getBoundingClientRect();
          const scrollY =
            measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

          const getRelTop = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            return r.top - rightRect.top + scrollY;
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
            ".t6-entry",
            ".t6-project-item",
            ".custom-section-wrapper",
          ].join(", ");

          rightCol
            .querySelectorAll<HTMLElement>(ITEM_SELECTORS)
            .forEach((el) => {
              const top = getRelTop(el);
              const bottom = getRelBottom(el);
              if (bottom - top > 8) {
                blocks.push({ top, bottom, id: el.dataset.blockId });
              }
            });

          rightCol
            .querySelectorAll<HTMLElement>(".t6-right-section")
            .forEach((section) => {
              const sectionTop = getRelTop(section);
              const firstItem = section.querySelector<HTMLElement>(
                ".t6-entry, .t6-project-item",
              );
              if (firstItem) {
                const anchorBottom = getRelBottom(firstItem);
                if (anchorBottom - sectionTop > 8) {
                  blocks.push({
                    top: sectionTop,
                    bottom: anchorBottom,
                    id: section.dataset.blockId,
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
      position: absolute; top: ${-contentOffsetY}px; left: 0;
      width: ${A4_W}px;
    }
   .t6-resume {
      width: ${A4_W}px !important;
      padding-left: ${MARGIN}px !important;
      padding-right: ${MARGIN}px !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin: 0 !important;
      display: flex !important;
      align-items: stretch !important;
      height: ${A4_H + contentOffsetY}px !important;
      min-height: ${A4_H + contentOffsetY}px !important;
      box-sizing: border-box !important;
    }
    .t6-resume .t6-left {
      width: ${LEFT_COL_W}px !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
      height: ${A4_H + contentOffsetY}px !important;
      min-height: ${A4_H + contentOffsetY}px !important;
      align-self: stretch !important;
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
      setIsDownloading(true);
    }
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <>
      {lastSegment === "download-resume" && (
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
                                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
                                  }
                                `}
          >
            {/* Animated background gradient for premium feel */}
            {!isDownloading && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}

            <div className="relative flex items-center justify-center gap-3 text-lg">
              {isDownloading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Generating PDF ...</span>
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
              {pages.length > 1 && (
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
                    Page {idx + 1} of {pages.length}
                  </span>
                  <div
                    style={{ flex: 1, height: "1px", background: "#d1d5db" }}
                  />
                </div>
              )}
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
                  position: "relative",
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
                    position: "absolute",
                    top: 0,
                    left: 0,
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

export default TemplateSix;
