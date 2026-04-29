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
//   .t6-resume .t6-extra ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t6-resume .t6-entry-content li,
//   .t6-resume .t6-summary li,
//   .t6-resume .t6-extra li {
//     margin-bottom: 4px !important;
//   }

//   .t6-resume .t6-entry-content strong,
//   .t6-resume .t6-summary strong,
//   .t6-resume .t6-extra strong {
//     font-weight: 700 !important;
//   }

//   .t6-resume .t6-entry-content em,
//   .t6-resume .t6-summary em,
//   .t6-resume .t6-extra em {
//     font-style: italic !important;
//   }

//   .t6-resume .t6-entry-content u,
//   .t6-resume .t6-summary u,
//   .t6-resume .t6-extra u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t6-resume .t6-entry-content p,
//   .t6-resume .t6-summary p,
//   .t6-resume .t6-extra p {
//     white-space: pre-wrap !important;
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

//   /* ── SIMPLE SKILLS (VERTICAL LIST - FLEX COLUMN) ── */
//   .t6-resume .t6-skills-simple {
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     margin-top: 4px;
//   }

//   .t6-resume .t6-skill-simple-item {
//     font-size: 13px;
//     color: #374151;
//     padding: 2px 0;
//   }

//   /* ── CATEGORIZED SKILLS (HORIZONTAL ROW - FLEX WRAP) ── */
//   .t6-resume .t6-skills-categorized {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//     margin-top: 4px;
//   }

//   .t6-resume .t6-skill-category {
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-skill-category-title {
//     font-size: 13px;
//     font-weight: 600;
//     color: #111827;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #d1d5db;
//   }

//   .t6-resume .t6-skill-category-items {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//   }

//   .t6-resume .t6-skill-category-item {
//     display: inline-block;
//     font-size: 12px;
//     color: #374151;
//     background: #e5e7eb;
//     padding: 4px 10px;
//     border-radius: 20px;
//   }

//   /* ── LANGUAGES (SIMPLE GRID) ── */
//   .t6-resume .t6-lang-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     column-gap: 16px;
//     row-gap: 8px;
//     margin-top: 8px;
//   }

//   .t6-resume .t6-lang-grid > div {
//     min-width: 0;
//   }

//   .t6-resume .t6-skill-name {
//     font-size: 13px;
//     color: #1f2937;
//     margin-bottom: 3px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
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
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
//   const summary = alldata?.summary || context?.summary || "";

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");


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

//   // Helper function to check if skills are categorized
//   const isCategorizedSkills = (skillsData: any[]) => {
//     if (!skillsData || skillsData.length === 0) return false;
//     return skillsData[0]?.title !== undefined;
//   };

//   // Helper function to render skills based on format
//   const renderSkills = () => {
//     if (!skills || skills.length === 0) return null;

//     const isCategorized = isCategorizedSkills(skills);

//     if (isCategorized) {
//       return (
//         <>
//           <div className="t6-lsection">Skills</div>
//           <hr className="t6-divider-sm" />
//           <div className="t6-skills-categorized">
//             {skills.map((category: any) => (
//               <div key={category.id} className="t6-skill-category">
//                 <div className="t6-skill-category-title">{category.title}</div>
//                 <div className="t6-skill-category-items">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="t6-skill-category-item">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <div className="t6-lsection">Skills</div>
//           <hr className="t6-divider-sm" />
//           <div className="t6-skills-simple">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="t6-skill-simple-item">
//                 {skill.name || skill.skill}
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     }
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

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="t6-lsection">Skills</div>
//           <hr class="t6-divider-sm"/>
//           <div class="t6-skills-categorized">
//             ${skills
//               .map(
//                 (category: any) => `
//               <div class="t6-skill-category">
//                 <div class="t6-skill-category-title">${category.title}</div>
//                 <div class="t6-skill-category-items">
//                   ${category.skills
//                     .map(
//                       (skill: any) => `
//                     <span class="t6-skill-category-item">${skill.name}</span>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `,
//               )
//               .join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="t6-lsection">Skills</div>
//           <hr class="t6-divider-sm"/>
//           <div class="t6-skills-simple">
//             ${skills
//               .map(
//                 (skill: any) => `
//               <div class="t6-skill-simple-item">${skill.name || skill.skill}</div>
//             `,
//               )
//               .join("")}
//           </div>
//         `;
//       }
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
//       {/* {lastSegment === "download-resume" && ( */}
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
//       {/* )}  */}

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

//             {/* SKILLS - Different styles based on format */}
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
















"use client";

import React, { useContext } from "react";
import axios from "axios";
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

/* ======================================================
   SHARED CSS — scoped to .t6-resume, no leaks.
====================================================== */
const styles = `
  .t6-resume {
    width: 210mm;
    padding: 5mm;
    box-sizing: border-box;
    background: white;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #374151;
    display: flex;
    min-height: 297mm;
  }

  .t6-resume.is-preview {
    transform: scale(0.36);
    transform-origin: top left;
    width: 210mm; 
    height: auto;
    max-height: none;
    min-height: auto;
    max-width: none;
    min-width: auto;
    overflow: visible;
  }

  .t6-resume * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
  .t6-resume .t6-skills-content li {
    margin-bottom: 4px !important;
  }

  .t6-resume .t6-entry-content strong,
  .t6-resume .t6-summary strong,
  .t6-resume .t6-extra strong,
  .t6-resume .t6-skills-content strong {
    font-weight: 700 !important;
  }

  .t6-resume .t6-entry-content em,
  .t6-resume .t6-summary em,
  .t6-resume .t6-extra em,
  .t6-resume .t6-skills-content em {
    font-style: italic !important;
  }

  .t6-resume .t6-entry-content u,
  .t6-resume .t6-summary u,
  .t6-resume .t6-extra u,
  .t6-resume .t6-skills-content u {
    text-decoration: underline !important;
  }

  /* Preserve spaces in content */
  .t6-resume .t6-entry-content p,
  .t6-resume .t6-summary p,
  .t6-resume .t6-extra p,
  .t6-resume .t6-skills-content p {
    white-space: pre-wrap !important;
  }

  /* Skills Content Styles */
  .t6-resume .t6-skills-content {
    margin-top: 8px;
  }

  .t6-resume .t6-skills-content p {
    margin: 0 0 6px 0 !important;
  }

  /* ── LEFT COLUMN ── */
  .t6-resume .t6-left {
    width: 40%;
    padding: 20px;
    background-color: #f3f4f6;
    border-radius: 16px 0 0 0;
    flex-shrink: 0;
  }

  .t6-resume .t6-name {
    font-size: 28px;
    text-transform: uppercase;
    color: #4b5563;
    margin-bottom: 4px;
    word-wrap: break-word;
    overflow-wrap: break-word;
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

  /* ── LEFT SECTION HEADING ── */
  .t6-resume .t6-lsection {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #4b5563;
    padding-bottom: 6px;
    margin-top: 12px;
  }

  .t6-resume .t6-divider-sm {
    border: none;
    border-top: 1px solid #6b7280;
    margin-bottom: 8px;
  }

  /* ── CONTACT ITEMS ── */
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

  /* ── EDUCATION GRADE ── */
  .t6-resume .t6-education-grade {
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
    font-weight: 500;
  }

  /* ── PROJECTS ── */
  .t6-resume .t6-project-item {
    margin-bottom: 14px;
  }

  .t6-resume .t6-project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t6-resume .t6-project-links {
    display: flex;
    gap: 12px;
  }

  .t6-resume .t6-project-link {
    font-size: 12px;
    color: #4b5563;
    text-decoration: underline;
  }

  .t6-resume .t6-project-tech {
    font-size: 12px;
    color: #6b7280;
    margin: 4px 0;
  }

  /* ── EXTRA TEXT (certs, hobbies, awards) ── */
  .t6-resume .t6-extra {
    padding-top: 6px;
    padding-bottom: 4px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── RIGHT COLUMN ── */
  .t6-resume .t6-right {
    width: 60%;
    padding-left: 16px;
    padding-right: 4px;
  }

  /* ── RIGHT SECTION HEADING ── */
  .t6-resume .t6-rsection {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #4b5563;
    padding-bottom: 6px;
    margin-top: 10px;
  }

  .t6-resume .t6-divider-md {
    border: none;
    border-top: 2px solid #d1d5db;
    margin-bottom: 8px;
  }

  /* ── EXPERIENCE HEADER (Job Title and Date on same line) ── */
  .t6-resume .t6-experience-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t6-resume .t6-experience-title {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
  }

  .t6-resume .t6-experience-date {
    font-size: 13px;
    color: #4b5563;
  }

  /* Experience Subtitle - Company and Location */
  .t6-resume .t6-experience-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 6px;
    font-weight: 500;
  }

  /* ── EDUCATION HEADER (School and Date on same line) ── */
  .t6-resume .t6-education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t6-resume .t6-education-school {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
  }

  .t6-resume .t6-education-date {
    font-size: 13px;
    color: #4b5563;
  }

  /* Education Subtitle - Degree and Location */
  .t6-resume .t6-education-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
    font-weight: 500;
  }

  /* ── ENTRY ── */
  .t6-resume .t6-entry {
    margin-bottom: 14px;
  }

  .t6-resume .t6-entry-title {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin-top: 6px;
  }

  .t6-resume .t6-entry-title-muted {
    font-weight: 400;
    color: #6b7280;
  }

  .t6-resume .t6-entry-date {
    font-size: 13px;
    color: #4b5563;
    margin-top: 3px;
  }

  .t6-resume .t6-entry-content {
    padding-top: 6px;
    padding-bottom: 4px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
  .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
  .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
  .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

  /* ── SUMMARY ── */
  .t6-resume .t6-summary {
    padding-top: 8px;
    padding-bottom: 10px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

  /* ── WEBSITES ── */
  .t6-resume .t6-website-item {
    margin-bottom: 8px;
  }

  .t6-resume .t6-website-label {
    font-size: 13px;
    font-weight: 600;
    color: #111827;
  }

  .t6-resume .t6-website-link {
    font-size: 13px;
    color: #111827;
    text-decoration: underline;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Custom Section Wrapper */
  .t6-resume .custom-section-wrapper {
    margin-top: 0;
  }

  /* ── PRINT ── */
  @media print {
    @page { size: A4; margin: 5mm; }
    .t6-resume {
      width: 100% !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
    .t6-resume .t6-left {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t6-resume .t6-entry { page-break-inside: avoid; break-inside: avoid; }
    .t6-resume .t6-rsection { page-break-after: avoid; break-after: avoid; }
  }
`;

// Clean, professional SVG icons (no background circle, just clean lines)
const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Helper to render SVG icons as HTML strings for PDF generation
const getIconHTML = (type: "email" | "phone" | "location" | "calendar") => {
  switch (type) {
    case "email":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>`;
    case "phone":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
    case "location":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    case "calendar":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    default:
      return "";
  }
};

const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

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
  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

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

  // Helper function to render skills (now just a string with HTML content)
  const renderSkills = () => {
    if (!skills || (typeof skills === 'string' && !skills.trim())) return null;
    
    // Clean the HTML content from Quill editor
    const cleanedSkills = cleanQuillHTML(skills);
    
    if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;
    
    return (
      <>
        <div className="t6-lsection">Skills</div>
        <hr className="t6-divider-sm" />
        <div 
          className="t6-skills-content"
          dangerouslySetInnerHTML={{ __html: cleanedSkills }}
        />
      </>
    );
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <>
        <div className="t6-rsection">Projects</div>
        <hr className="t6-divider-md" />
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="t6-project-item">
            <div className="t6-project-header">
              <div className="t6-entry-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="t6-project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="t6-project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl.startsWith("http")
                          ? project.githubUrl
                          : `https://${project.githubUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="t6-project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="t6-project-tech">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="t6-entry-content"
                dangerouslySetInnerHTML={{
                  __html: cleanQuillHTML(project.description),
                }}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  /* ======================================================
     HTML GENERATION — uses same `styles` string as preview
  ====================================================== */
  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
    const addressStr = addressParts;

    // Generate skills HTML for PDF (now just clean the HTML string)
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === 'string' && !skills.trim())) return "";
      
      const cleanedSkills = cleanQuillHTML(skills);
      if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
      return `
        <div class="t6-lsection">Skills</div>
        <hr class="t6-divider-sm"/>
        <div class="t6-skills-content">${cleanedSkills}</div>
      `;
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="t6-rsection">Projects</div>
        <hr class="t6-divider-md"/>
        ${projects
          .map(
            (project: any) => `
          <div class="t6-project-item">
            <div class="t6-project-header">
              <div class="t6-entry-title">${project.title || ""}</div>
              <div class="t6-project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t6-project-link">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t6-project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${
              project.techStack && project.techStack.length > 0
                ? `
              <div class="t6-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
            `
                : ""
            }
            ${
              project.description
                ? `
              <div class="t6-entry-content">${cleanQuillHTML(project.description)}</div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    body { margin: 0; padding: 0; background: white; }
    ${styles}
  </style>
</head>
<body>
<div class="t6-resume">

  <!-- LEFT COLUMN -->
  <div class="t6-left">

    <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${contact.jobTitle ? `<div class="t6-jobtitle">${contact.jobTitle}</div>` : ""}

    <div class="t6-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t6-link">LinkedIn</a>` : ""}
      ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t6-link">GitHub</a>` : ""}
      ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t6-link">Portfolio</a>` : ""}
    </div>

    <div class="t6-lsection">Details</div>
    <hr class="t6-divider-sm"/>

    ${
      contact?.email
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">
        ${getIconHTML("email")}
      </div>
      <div class="t6-contact-text">${contact.email}</div>
    </div>`
        : ""
    }

    ${
      contact?.phone
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">
        ${getIconHTML("phone")}
      </div>
      <div class="t6-contact-text">${contact.phone}</div>
    </div>`
        : ""
    }

    ${
      addressStr
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">
        ${getIconHTML("location")}
      </div>
      <div class="t6-contact-text">${addressStr}</div>
    </div>`
        : ""
    }

    ${
      formattedDob
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">
        ${getIconHTML("calendar")}
      </div>
      <div class="t6-contact-text">${formattedDob}</div>
    </div>`
        : ""
    }

    ${generateSkillsHTML()}

  </div>

  <!-- RIGHT COLUMN -->
  <div class="t6-right">

    ${
      summary
        ? `
    <div class="t6-rsection">Summary</div>
    <hr class="t6-divider-md"/>
    <div class="t6-summary">${cleanQuillHTML(summary)}</div>`
        : ""
    }

    <!-- EXPERIENCE - NEW LAYOUT -->
    ${
      experiences.length > 0
        ? `
    <div class="t6-rsection">Experience</div>
    <hr class="t6-divider-md"/>
    ${experiences
      .map((exp) => {
        const start = formatMonthYear(exp.startDate);
        const end = exp.endDate
          ? formatMonthYear(exp.endDate)
          : exp.startDate
            ? "Present"
            : "";
        return `
    <div class="t6-entry">
      <div class="t6-experience-header">
        <div class="t6-experience-title">${exp.jobTitle || ""}</div>
        <div class="t6-experience-date">${start}${start && end ? " - " : ""}${end}</div>
      </div>
      <div class="t6-experience-subtitle">
        ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
      </div>
      ${exp.text ? `<div class="t6-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
    </div>`;
      })
      .join("")}`
        : ""
    }

    ${generateProjectsHTML()}

    <!-- EDUCATION - NEW LAYOUT -->
    ${
      educations.length > 0
        ? `
    <div class="t6-rsection">Education</div>
    <hr class="t6-divider-md"/>
    ${educations
      .map((edu) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `
    <div class="t6-entry">
      <div class="t6-education-header">
        <div class="t6-education-school">${edu.schoolname || ""}</div>
        <div class="t6-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
      </div>
      <div class="t6-education-subtitle">
        ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
      </div>
      ${formattedGrade ? `<div class="t6-education-grade">${formattedGrade}</div>` : ""}
      ${edu.text ? `<div class="t6-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
    </div>`;
      })
      .join("")}`
        : ""
    }

    <!-- CUSTOM SECTIONS -->
    ${customSection
      .filter((s) => s?.name?.trim() || s?.description?.trim())
      .map(
        (s) => `
    <div class="custom-section-wrapper">
      ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
      ${s.description ? `<div class="t6-extra">${cleanQuillHTML(s.description)}</div>` : ""}
    </div>`,
      )
      .join("")}

  </div>
</div>
</body>
</html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
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

  /* ======================================================
     JSX PREVIEW — same .t6-* classes, identical output
  ====================================================== */

  return (
    <>
      {lastSegment === "download-resume" && (
        <div className="text-center my-5">
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            Download Resume
          </motion.button>
        </div>
      )}

      <div
        className="t6-resume"
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        <div className={`t6-resume ${alldata ? "is-preview" : ""}`}>
          {/* LEFT COLUMN */}
          <div className="t6-left">
            <div className="t6-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {contact.jobTitle && (
              <div className="t6-jobtitle">{contact.jobTitle}</div>
            )}

            <div className="t6-links">
              {linkedinUrl?.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t6-link"
                >
                  LinkedIn
                </a>
              )}
              {githubUrl?.trim() && (
                <a
                  href={
                    githubUrl.startsWith("http")
                      ? githubUrl
                      : `https://${githubUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t6-link"
                >
                  GitHub
                </a>
              )}
              {portfolioUrl?.trim() && (
                <a
                  href={
                    portfolioUrl.startsWith("http")
                      ? portfolioUrl
                      : `https://${portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t6-link"
                >
                  Portfolio
                </a>
              )}
            </div>

            <div className="t6-lsection">Details</div>
            <hr className="t6-divider-sm" />

            {contact?.email && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <EmailIcon />
                </div>
                <div className="t6-contact-text">{contact.email}</div>
              </div>
            )}
            {contact?.phone && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <PhoneIcon />
                </div>
                <div className="t6-contact-text">{contact.phone}</div>
              </div>
            )}
            {addressParts && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <LocationIcon />
                </div>
                <div className="t6-contact-text">{addressParts}</div>
              </div>
            )}
            {formattedDob && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <CalendarIcon />
                </div>
                <div className="t6-contact-text">{formattedDob}</div>
              </div>
            )}

            {/* SKILLS - Now using text editor format */}
            {renderSkills()}
          </div>

          {/* RIGHT COLUMN */}
          <div className="t6-right">
            {/* SUMMARY */}
            {summary && (
              <>
                <div className="t6-rsection">Summary</div>
                <hr className="t6-divider-md" />
                <div
                  className="t6-summary"
                  dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
                />
              </>
            )}

            {/* EXPERIENCE - NEW LAYOUT */}
            {experiences.length > 0 && (
              <>
                <div className="t6-rsection">Experience</div>
                <hr className="t6-divider-md" />
                {experiences.map((exp, i) => {
                  const start = formatMonthYear(exp.startDate, false);
                  const end = exp.endDate
                    ? formatMonthYear(exp.endDate, false)
                    : exp.startDate
                      ? "Present"
                      : "";
                  return (
                    <div key={exp.id || i} className="t6-entry">
                      <div className="t6-experience-header">
                        <div className="t6-experience-title">
                          {exp.jobTitle || ""}
                        </div>
                        <div className="t6-experience-date">
                          {start}
                          {start && end ? " - " : ""}
                          {end}
                        </div>
                      </div>
                      <div className="t6-experience-subtitle">
                        {[exp.employer, exp.location]
                          .filter(Boolean)
                          .join(" — ")}
                      </div>
                      {exp.text && (
                        <div
                          className="t6-entry-content"
                          dangerouslySetInnerHTML={{
                            __html: cleanQuillHTML(exp.text),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {/* PROJECTS */}
            {renderProjects()}

            {/* EDUCATION - NEW LAYOUT */}
            {educations.length > 0 && (
              <>
                <div className="t6-rsection">Education</div>
                <hr className="t6-divider-md" />
                {educations.map((edu, i) => {
                  const formattedGrade = formatGradeToCgpdAndPercentage(
                    edu.grade || "",
                  );
                  return (
                    <div key={edu.id || i} className="t6-entry">
                      <div className="t6-education-header">
                        <div className="t6-education-school">
                          {edu.schoolname || ""}
                        </div>
                        <div className="t6-education-date">
                          {[edu.startDate, edu.endDate || "Present"]
                            .filter(Boolean)
                            .join(" — ")}
                        </div>
                      </div>
                      <div className="t6-education-subtitle">
                        {[edu.degree, edu.location].filter(Boolean).join(" — ")}
                      </div>
                      {formattedGrade && (
                        <div className="t6-education-grade">
                          {formattedGrade}
                        </div>
                      )}
                      {edu.text && (
                        <div
                          className="t6-entry-content"
                          dangerouslySetInnerHTML={{
                            __html: cleanQuillHTML(edu.text),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {/* CUSTOM SECTIONS */}
            {customSection
              .filter((s) => s?.name?.trim() || s?.description?.trim())
              .map((section, i) => (
                <div
                  key={(section as any).id || i}
                  className="custom-section-wrapper"
                >
                  {section.name && (
                    <>
                      <div className="t6-rsection">{section.name}</div>
                      <hr className="t6-divider-md" />
                    </>
                  )}
                  {section.description && (
                    <div
                      className="t6-extra"
                      dangerouslySetInnerHTML={{
                        __html: cleanQuillHTML(section.description),
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateSix;