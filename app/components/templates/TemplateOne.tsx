// "use client";
// import React, { useContext } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
//   getLocalStorage,
//   MonthYearDisplay,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   console.log("context",context)

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

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
//       // Render categorized skills - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-container">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-list">
//                   {category?.skills?.map((skill: any) => (
//                     <span key={skill.id} className="skill-tag">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Render simple skills list - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-tag">
//                 {skill.name || skill.skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       );
//     }
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
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
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 16px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 12px 0 8px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* SKILLS STYLES - COMPACT & CLEAN */
//   .t1-resume .skills-container {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//   }

//   .t1-resume .skill-category {
//     break-inside: avoid;
//   }

//   .t1-resume .skill-category-title {
//     font-weight: 600;
//     font-size: 14px;
//     color: #333;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//     display: inline-block;
//   }

//   .t1-resume .skills-list {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px;
//     margin-top: 6px;
//   }

//   .t1-resume .skill-tag {
//     display: inline-block;
//     background: #f5f5f5;
//     padding: 4px 10px;
//     font-size: 12px;
//     color: #444;
//     border-radius: 3px;
//     line-height: 1.4;
//     white-space: nowrap;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 16px;
//     break-inside: avoid;
//   }

//   .t1-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t1-resume .project-title {
//     font-weight: 700;
//     font-size: 15px;
//     color: #222;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-link {
//     font-size: 11px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   .t1-resume .project-description {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 6px;
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 13px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 12px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* Education Grade Styles */
//   .t1-resume .education-grade {
//     font-size: 12px;
//     color: #666;
//     margin-top: 2px;
//     font-weight: 500;
//     display: inline-block;
//     background: #f0f0f0;
//     padding: 2px 8px;
//     border-radius: 3px;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .additional-content p,
//   .t1-resume .project-description p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 13px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 13px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   /* ADDITIONAL SECTIONS */
//   .t1-resume .additional-content {
//     padding-left: 10px;
//   }

//   .t1-resume .additional-item {
//     margin-bottom: 4px;
//     font-size: 13px;
//     line-height: 1.4;
//   }

//   /* PRINT */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t1-resume .experience-item,
//     .t1-resume .education-item,
//     .t1-resume .project-item,
//     .t1-resume .skill-category {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//   }

// `;

//   /* =====================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content education-description">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Format date of birth for PDF
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF - COMPACT VERSION
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-container">
//               ${skills
//                 .map(
//                   (category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-list">
//                     ${category.skills
//                       .map(
//                         (skill: any) => `
//                       <span class="skill-tag">${skill.name}</span>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (skill: any) => `
//                 <span class="skill-tag">${skill.name || skill.skill}</span>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${project.description}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//       ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//             : "";
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu?.grade || "");
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.schoolname || ""}</div>
//             ${
//               edu.degree || edu.location || formattedGrade
//                 ? `<div class="item-subtitle">
//               ${edu.degree ? `<span>${edu.degree}</span>` : ""}
//               ${edu.degree && edu.location ? " — " : ""}
//               ${edu.location ? `<span>${edu.location}</span>` : ""}
//               ${(edu.degree || edu.location) && formattedGrade ? " • " : ""}
//               ${formattedGrade ? `<span class="education-grade">${formattedGrade}</span>` : ""}
//             </div>`
//                 : ""
//             }
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- LANGUAGES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.languages) &&
//     finalize.languages.some((l) => l.name && l.name.trim() !== "")
//       ? `<div class="section-content">
//     <div class="section-title">Languages</div>
//     <div class="skills-list">
//       ${finalize.languages
//         .filter((l) => l.name && l.name.trim() !== "")
//         .map(
//           (l) =>
//             `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.certificationsAndLicenses) &&
//     finalize.certificationsAndLicenses.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Certifications and Licenses</div>
//     <div class="additional-content">
//       ${finalize.certificationsAndLicenses
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.hobbiesAndInterests) &&
//     finalize.hobbiesAndInterests.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Hobbies and Interests</div>
//     <div class="additional-content">
//       ${finalize.hobbiesAndInterests
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.awardsAndHonors) &&
//     finalize.awardsAndHonors.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Awards and Honors</div>
//     <div class="additional-content">
//       ${finalize.awardsAndHonors
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.websitesAndSocialMedia) &&
//     finalize.websitesAndSocialMedia.some(
//       (i) =>
//         (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//         (i.socialMedia && i.socialMedia.trim() !== ""),
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Websites and Social Media</div>
//     <div class="additional-content">
//       ${finalize.websitesAndSocialMedia
//         .filter((i) => i.websiteUrl || i.socialMedia)
//         .map(
//           (i) =>
//             `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.references) &&
//     finalize.references.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">References</div>
//     <div class="additional-content">
//       ${finalize.references
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `<div class="section-content">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `<div class="custom-section">
//       ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//       ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""} `}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {dateOfBirth && <span>{formatDateOfBirth(dateOfBirth)}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: exp.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l) => l.trim() !== "");
//                   if (lines.some((l) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <div className="education-content">
//                         <ul className="education-list">
//                           {lines.map((l, li) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       </div>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="item-content education-description"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }

//               const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");

//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location || formattedGrade) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.degree && edu.location && " — "}
//                           {edu.location && <span>{edu.location}</span>}
//                           {(edu.degree || edu.location) &&
//                             formattedGrade &&
//                             " • "}
//                           {formattedGrade && (
//                             <span className="education-grade">
//                               {formattedGrade}
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {" - "}
//                         {edu.endDate || "present"}
//                       </div>
//                     )}
//                   </div>
//                   {textContent}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {renderSkills()}

//         {/* LANGUAGES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-list">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <span key={lang._id || index} className="skill-tag">
//                         {lang.name}
//                         {lang.level && ` (${lang.level})`}
//                       </span>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* CERTIFICATIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* HOBBIES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* AWARDS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* WEBSITES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (i) =>
//               (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//               (i.socialMedia && i.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div key={item.id || index} className="additional-item">
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* REFERENCES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">References</div>
//               <div className="additional-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* CUSTOM SECTIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

// "use client";
// import React, { useContext } from "react";
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
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// // Helper function to strip HTML tags
// const stripHtmlHelper = (html: string) =>
//   html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
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
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-container">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-list">
//                   {category?.skills?.map((skill: any) => (
//                     <span key={skill.id} className="skill-tag">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-tag">
//                 {skill.name || skill.skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       );
//     }
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
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
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     // min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* Heading Styles */
//   .t1-resume .resume-heading {
//     font-weight: 700;
//     margin: 12px 0 8px 0;
//     line-height: 1.4;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t1-resume h1.resume-heading {
//     font-size: 20px;
//   }

//   .t1-resume h2.resume-heading {
//     font-size: 18px;
//   }

//   .t1-resume h3.resume-heading {
//     font-size: 16px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 16px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 12px 0 8px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* SKILLS STYLES - COMPACT & CLEAN */
//   .t1-resume .skills-container {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//   }

//   .t1-resume .skill-category {
//     break-inside: avoid;
//     page-break-inside: avoid;
//   }

//   .t1-resume .skill-category-title {
//     font-weight: 600;
//     font-size: 14px;
//     color: #333;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//     display: inline-block;
//   }

//   .t1-resume .skills-list {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px;
//     margin-top: 6px;
//   }

//   .t1-resume .skill-tag {
//     display: inline-block;
//     background: #f5f5f5;
//     padding: 4px 10px;
//     font-size: 12px;
//     color: #444;
//     border-radius: 3px;
//     line-height: 1.4;
//     white-space: nowrap;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 16px;
//     break-inside: avoid;
//     page-break-inside: avoid;
//   }

//   .t1-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t1-resume .project-title {
//     font-weight: 700;
//     font-size: 15px;
//     color: #222;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-link {
//     font-size: 11px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   .t1-resume .project-description {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 6px;
//     white-space: pre-wrap;
//     word-wrap: break-word;
//   }

//   /* Rich Text Content Styles */
//   .t1-resume .experience-description ul,
//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ul,
//   .t1-resume .education-description ol,
//   .t1-resume .project-description ul,
//   .t1-resume .project-description ol,
//   .t1-resume .custom-section-content ul,
//   .t1-resume .custom-section-content ol,
//   .t1-resume .summary-text ul,
//   .t1-resume .summary-text ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .project-description li,
//   .t1-resume .custom-section-content li,
//   .t1-resume .summary-text li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t1-resume .experience-description strong,
//   .t1-resume .education-description strong,
//   .t1-resume .project-description strong,
//   .t1-resume .custom-section-content strong,
//   .t1-resume .summary-text strong {
//     font-weight: 700 !important;
//   }

//   .t1-resume .experience-description em,
//   .t1-resume .education-description em,
//   .t1-resume .project-description em,
//   .t1-resume .custom-section-content em,
//   .t1-resume .summary-text em {
//     font-style: italic !important;
//   }

//   .t1-resume .experience-description u,
//   .t1-resume .education-description u,
//   .t1-resume .project-description u,
//   .t1-resume .custom-section-content u,
//   .t1-resume .summary-text u {
//     text-decoration: underline !important;
//   }

//   .t1-resume .experience-description h1,
//   .t1-resume .experience-description h2,
//   .t1-resume .experience-description h3,
//   .t1-resume .education-description h1,
//   .t1-resume .education-description h2,
//   .t1-resume .education-description h3 {
//     margin: 12px 0 6px 0;
//     font-weight: 600;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Resume Lists */
//   .t1-resume .resume-list {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t1-resume ol.resume-list {
//     list-style-type: decimal !important;
//   }

//   .t1-resume ul.resume-list {
//     list-style-type: disc !important;
//   }

//   .t1-resume .resume-list li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   /* Better spacing for content */
//   .t1-resume .experience-description,
//   .t1-resume .education-description,
//   .t1-resume .project-description,
//   .t1-resume .custom-section-content,
//   .t1-resume .summary-text {
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     white-space: pre-wrap;
//   }

//   /* Handle line breaks properly */
//   .t1-resume .experience-description br,
//   .t1-resume .education-description br,
//   .t1-resume .project-description br,
//   .t1-resume .custom-section-content br {
//     display: block;
//     margin: 4px 0;
//     content: "";
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 13px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 12px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* Education Grade Styles */
//   .t1-resume .education-grade {
//     font-size: 12px;
//     color: #666;
//     margin-top: 2px;
//     font-weight: 500;
//     display: inline-block;
//     background: #f0f0f0;
//     padding: 2px 8px;
//     border-radius: 3px;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .project-description p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 13px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 13px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .custom-section-content {
//     padding-left: 5px;
//   }

//   .t1-resume .plain-text {
//     margin: 0 0 4px 0;
//     padding: 0;
//     line-height: 1.5;
//   }

//   /* Orphan control */
//   .t1-resume p,
//   .t1-resume li,
//   .t1-resume .item-content {
//     orphans: 3;
//     widows: 3;
//   }

//   /* PRINT */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t1-resume .experience-item,
//     .t1-resume .education-item,
//     .t1-resume .project-item,
//     .t1-resume .skill-category,
//     .t1-resume .custom-section {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t1-resume .section-title,
//     .t1-resume h1.resume-heading,
//     .t1-resume h2.resume-heading,
//     .t1-resume h3.resume-heading {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t1-resume .experience-description,
//     .t1-resume .education-description {
//       page-break-inside: auto;
//       break-inside: auto;
//     }

//     .t1-resume .resume-list li {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t1-resume .item-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t1-resume p,
//     .t1-resume li,
//     .t1-resume .item-content {
//       orphans: 3;
//       widows: 3;
//     }
//   }
// `;

//   /* =====================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const renderExperienceText = (text: string) => {
//       if (!text) return "";

//       const cleanedText = cleanQuillHTML(text);

//       if (cleanedText.includes("<") && cleanedText.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${cleanedText}</div>`;
//       }
//       const lines = cleanedText.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(cleanedText)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";

//       const cleanedText = cleanQuillHTML(text);

//       if (cleanedText.includes("<") && cleanedText.includes(">")) {
//         return `<div class="item-content education-description">${cleanedText}</div>`;
//       }
//       const lines = cleanedText.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(cleanedText)}</div>`;
//     };

//     // Format date of birth for PDF
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-container">
//               ${skills
//                 .map(
//                   (category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-list">
//                     ${category.skills
//                       .map(
//                         (skill: any) => `
//                       <span class="skill-tag">${skill.name}</span>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (skill: any) => `
//                 <span class="skill-tag">${skill.name || skill.skill}</span>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
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
//           (s) => s?.name?.trim() || s?.description?.trim()
//         )
//       ) {
//         return "";
//       }

//       return `
//         <div class="section-content">
//           ${finalize.customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s) => `
//             <div class="custom-section">
//               ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//               ${s.description ? `<div class="item-content custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//             </div>
//           `
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <div class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//       ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate,  false);
//         const e = exp.endDate ? formatMonthYear(exp.endDate,  false) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//             : "";
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu?.grade || "");
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.degree || ""}</div>
//             ${
//               edu.degree || edu.location || formattedGrade
//                 ? `<div class="item-subtitle">
//               ${edu.degree ? `<span>${edu.schoolname}</span>` : ""}
//               ${edu.degree && edu.location ? " — " : ""}
//               ${edu.location ? `<span>${edu.location}</span>` : ""}
//               ${(edu.degree || edu.location) && formattedGrade ? " • " : ""}
//               ${formattedGrade ? `<span class="education-grade">${formattedGrade}</span>` : ""}
//             </div>`
//                 : ""
//             }
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS -->
//   ${generateCustomSectionsHTML()}

// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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

//   console.log("context",context)

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
//         {lastSegment === "download-resume" && (

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
//         )}

//       <div
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""} `}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//                             minHeight: "297mm",

//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {dateOfBirth && <span>{formatDateOfBirth(dateOfBirth)}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {/* {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => ({
//                const s = formatMonthYear(exp.startDate, true)
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     {}
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate}  />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
//                   />
//                 )}
//               </div>
// }))}
//           </div>
//         )} */}

//         {experiences.length > 0 && (
//   <div className="section-content">
//     <div className="section-title">Experience</div>
//     {experiences.map((exp, i) => {
//       // 1. Logic happens inside the braces
//       const s = formatMonthYear(exp.startDate, false);
//       const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";

//       // 2. Return the JSX
//       return (
//         <div
//           key={i}
//           className="experience-item"
//           style={{ marginBottom: "16px" }}
//         >
//           <div className="item-header experience-header">
//             <div className="item-title-container">
//               <div className="item-title">{exp.jobTitle}</div>
//               <div className="item-subtitle">
//                 {exp.employer}
//                 {exp.location && ` — ${exp.location}`}
//               </div>
//             </div>
//             <div className="item-date experience-date">
//               {/* Using the formatted strings you created above */}
//               {s} — {e}
//             </div>
//           </div>
//           {exp.text && (
//             <div
//               className="item-content experience-description wrap-break-word"
//               dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
//             />
//           )}
//         </div>
//       );
//     })}
//   </div>
// )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");

//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.degree || ""}</div>
//                       {(edu.degree || edu.location || formattedGrade) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.schoolname}</span>}
//                           {edu.degree && edu.location && " — "}
//                           {edu.location && <span>{edu.location}</span>}
//                           {(edu.degree || edu.location) &&
//                             formattedGrade &&
//                             " • "}
//                           {formattedGrade && (
//                             <span className="education-grade">
//                               {formattedGrade}
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {" - "}
//                         {edu.endDate || "Present"}
//                       </div>
//                     )}
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {renderSkills()}

//         {/* CUSTOM SECTIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(section.description),
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

// "use client";
// import React, { useContext } from "react";
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
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// // Helper function to strip HTML tags
// const stripHtmlHelper = (html: string) =>
//   html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills.text || "";
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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

//     return (
//       <div className="section-content">
//         <div className="section-title">Skills</div>
//         <div
//           className="skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
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
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" , ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* Heading Styles */
//   .t1-resume .resume-heading {
//     font-weight: 700;
//     margin: 12px 0 8px 0;
//     line-height: 1.4;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t1-resume h1.resume-heading {
//     font-size: 20px;
//   }

//   .t1-resume h2.resume-heading {
//     font-size: 18px;
//   }

//   .t1-resume h3.resume-heading {
//     font-size: 16px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 16px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 12px 0 8px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* SKILLS STYLES - For rich text content */
//   .t1-resume .skills-content {
//     padding: 0 5px;
//   }

//   .t1-resume .skills-content ul,
//   .t1-resume .skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t1-resume .skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t1-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   .t1-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t1-resume .skills-content em {
//     font-style: italic !important;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 16px;
//     break-inside: avoid;
//     page-break-inside: avoid;
//   }

//   .t1-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t1-resume .project-title {
//     font-weight: 700;
//     font-size: 15px;
//     color: #222;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-link {
//     font-size: 11px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   .t1-resume .project-description {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 6px;
//     white-space: pre-wrap;
//     word-wrap: break-word;
//   }

//   /* Rich Text Content Styles */
//   .t1-resume .experience-description ul,
//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ul,
//   .t1-resume .education-description ol,
//   .t1-resume .project-description ul,
//   .t1-resume .project-description ol,
//   .t1-resume .custom-section-content ul,
//   .t1-resume .custom-section-content ol,
//   .t1-resume .summary-text ul,
//   .t1-resume .summary-text ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .project-description li,
//   .t1-resume .custom-section-content li,
//   .t1-resume .summary-text li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t1-resume .experience-description strong,
//   .t1-resume .education-description strong,
//   .t1-resume .project-description strong,
//   .t1-resume .custom-section-content strong,
//   .t1-resume .summary-text strong {
//     font-weight: 700 !important;
//   }

//   .t1-resume .experience-description em,
//   .t1-resume .education-description em,
//   .t1-resume .project-description em,
//   .t1-resume .custom-section-content em,
//   .t1-resume .summary-text em {
//     font-style: italic !important;
//   }

//   .t1-resume .experience-description u,
//   .t1-resume .education-description u,
//   .t1-resume .project-description u,
//   .t1-resume .custom-section-content u,
//   .t1-resume .summary-text u {
//     text-decoration: underline !important;
//   }

//   .t1-resume .experience-description h1,
//   .t1-resume .experience-description h2,
//   .t1-resume .experience-description h3,
//   .t1-resume .education-description h1,
//   .t1-resume .education-description h2,
//   .t1-resume .education-description h3 {
//     margin: 12px 0 6px 0;
//     font-weight: 600;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Resume Lists */
//   .t1-resume .resume-list {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t1-resume ol.resume-list {
//     list-style-type: decimal !important;
//   }

//   .t1-resume ul.resume-list {
//     list-style-type: disc !important;
//   }

//   .t1-resume .resume-list li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   /* Better spacing for content */
//   .t1-resume .experience-description,
//   .t1-resume .education-description,
//   .t1-resume .project-description,
//   .t1-resume .custom-section-content,
//   .t1-resume .summary-text {
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     white-space: pre-wrap;
//   }

//   /* Handle line breaks properly */
//   .t1-resume .experience-description br,
//   .t1-resume .education-description br,
//   .t1-resume .project-description br,
//   .t1-resume .custom-section-content br {
//     display: block;
//     margin: 4px 0;
//     content: "";
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 13px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 12px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* Education Grade Styles */
//   .t1-resume .education-grade {
//     font-size: 12px;
//     color: #666;
//     margin-top: 2px;
//     font-weight: 500;
//     display: inline-block;
//     background: #f0f0f0;
//     padding: 2px 8px;
//     border-radius: 3px;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .project-description p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 13px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 13px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .custom-section-content {
//     padding-left: 5px;
//   }

//   .t1-resume .plain-text {
//     margin: 0 0 4px 0;
//     padding: 0;
//     line-height: 1.5;
//   }

//   /* Orphan control */
//   .t1-resume p,
//   .t1-resume li,
//   .t1-resume .item-content {
//     orphans: 3;
//     widows: 3;
//   }

//   /* PRINT */
//   /* Print Styles - Most reliable approach */
// @media print {
//   @page {
//     size: A4;
//     margin: 0mm !important;
//   }

//   @page :first {
//     margin: 0mm !important;
//   }

//   * {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//   }

//   body {
//     margin: 0;
//     padding: 0;
//     font-family: 'Nunito', sans-serif !important;
//     background: white;
//   }

//   .t1-resume {
//     margin: 0;
//     width: 100%;
//     border: none;
//     box-shadow: none;
//     font-family: 'Nunito', sans-serif !important;
//     position: relative;
//   }

//   /* First page - no top margin/padding */
//   .t1-resume .resume-header {
//     margin-top: 0;
//     padding-top: 20px;
//     padding-left: 50px;
//     padding-right: 50px;
//   }

//   /* Regular margins for main content on all pages */
//   .t1-resume .resume-main {
//     padding: 30px 50px 45px 50px;
//   }

//   /* Add top margin for elements that flow to second page */
//   .t1-resume .resume-main {
//     page-break-before: auto;
//   }

//   /* Ensure proper page breaks */
//   .t1-resume .section {
//     page-break-inside: avoid;
//     page-break-after: auto;
//   }

//   .t1-resume .experience-item {
//     page-break-inside: avoid;
//   }

//   /* Add space at the bottom of each page */
//   .t1-resume {
//     margin-bottom: 15mm;
//   }

//   .t1-resume .project-link,
//   .t1-resume .link-item {
//     color: #000000 !important;
//     text-decoration: underline !important;
//   }

//   /* Ensure all text uses Nunito in print */
//   .t1-resume * {
//     font-family: 'Nunito', sans-serif !important;
//   }

//   /* Add margin to the top of the second page by targeting the first element after a page break */
//   .t1-resume .resume-main > :first-child {
//     margin-top: 15mm;
//   }
// }
// `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const renderExperienceText = (text: string) => {
//       if (!text) return "";

//       const cleanedText = cleanQuillHTML(text);

//       if (cleanedText.includes("<") && cleanedText.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${cleanedText}</div>`;
//       }
//       const lines = cleanedText.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(cleanedText)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";

//       const cleanedText = cleanQuillHTML(text);

//       if (cleanedText.includes("<") && cleanedText.includes(">")) {
//         return `<div class="item-content education-description">${cleanedText}</div>`;
//       }
//       const lines = cleanedText.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(cleanedText)}</div>`;
//     };

//     // Format date of birth for PDF
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Skills</div>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
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
//           (s) => s?.name?.trim() || s?.description?.trim(),
//         )
//       ) {
//         return "";
//       }

//       return `
//         <div class="section-content">
//           ${finalize.customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s) => `
//             <div class="custom-section">
//               ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//               ${s.description ? `<div class="item-content custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <div class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//       ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate, false);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//             : "";
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu?.grade || "");
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.degree || ""}</div>
//             ${
//               edu.degree || edu.location || formattedGrade
//                 ? `<div class="item-subtitle">
//               ${edu.degree ? `<span>${edu.schoolname}</span>` : ""}
//               ${edu.degree && edu.location ? " — " : ""}
//               ${edu.location ? `<span>${edu.location}</span>` : ""}
//               ${(edu.degree || edu.location) && formattedGrade ? " • " : ""}
//               ${formattedGrade ? `<span class="education-grade">${formattedGrade}</span>` : ""}
//             </div>`
//                 : ""
//             }
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS -->
//   ${generateCustomSectionsHTML()}

// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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

//   /* ======================================================
//      JSX PREVIEW
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
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""} `}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {dateOfBirth && <span>{formatDateOfBirth(dateOfBirth)}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => {
//               const s = formatMonthYear(exp.startDate, false);
//               const e = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : "Present";

//               return (
//                 <div
//                   key={i}
//                   className="experience-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header experience-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{exp.jobTitle}</div>
//                       <div className="item-subtitle">
//                         {exp.employer}
//                         {exp.location && ` — ${exp.location}`}
//                       </div>
//                     </div>
//                     <div className="item-date experience-date">
//                       {s} — {e}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="item-content experience-description wrap-break-word"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(exp.text),
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(
//                 edu.grade || "",
//               );

//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.degree || ""}</div>
//                       {(edu.degree || edu.location || formattedGrade) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.schoolname}</span>}
//                           {edu.degree && edu.location && " — "}
//                           {edu.location && <span>{edu.location}</span>}
//                           {(edu.degree || edu.location) &&
//                             formattedGrade &&
//                             " • "}
//                           {formattedGrade && (
//                             <span className="education-grade">
//                               {formattedGrade}
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {" - "}
//                         {edu.endDate || "Present"}
//                       </div>
//                     )}
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(edu.text),
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {renderSkills()}

//         {/* CUSTOM SECTIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(section.description),
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

// "use client";
// import React, { useContext, useMemo, useRef, useEffect, useState } from "react";
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
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // ── Dynamic iframe height for full-view mode (no scrollbar) ──
//   // We listen for a postMessage from the iframe telling us the real
//   // document height, then set the iframe height to exactly that value.
//   const [iframeHeight, setIframeHeight] = useState<number>(1122); // 297mm ≈ 1122px

//   useEffect(() => {
//     const handler = (e: MessageEvent) => {
//       if (e.data?.type === "RESUME_HEIGHT") {
//         setIframeHeight(e.data.height);
//       }
//     };
//     window.addEventListener("message", handler);
//     return () => window.removeEventListener("message", handler);
//   }, []);

//   // ── Data sources ──────────────────────────────────────────
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

//   // ── Shared CSS ─────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

//     * { margin: 0; padding: 0; box-sizing: border-box; }

//     /*
//       FIX 1 — SCROLLBAR IN PREVIEW
//       Setting overflow:hidden on html+body prevents the iframe from
//       ever showing a scrollbar. The iframe height is set dynamically
//       to match the content, so nothing is clipped.
//     */
//     html, body {
//       overflow: hidden;
//       background: white;
//     }

//     body {
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #222;
//     }

//     /*
//       PAGE MARGINS IN PDF
//       ─────────────────────────────────────────────────────────────
//       @page controls the physical paper margins the PDF renderer
//       applies when it paginates content onto A4 pages.
//       This gives 15mm on every side of EVERY page (page 1 bottom,
//       page 2 top, page 3 top, etc.).

//       IMPORTANT: The .resume div has NO padding in print/PDF mode.
//       Padding is added only for the iframe preview (via the inline
//       style on the div in JSX). This prevents the margin being
//       counted twice (once from @page, once from div padding).

//       Preview : div padding 15mm  + @page margin 0   = 15mm visible
//       PDF      : div padding 0    + @page margin 15mm = 15mm visible
//       ─────────────────────────────────────────────────────────────
//     */
//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     .resume {
//       width: 210mm;
//       padding: 15mm;      /* screen/preview: matches @page margin used in PDF */
//       background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       /* NO padding here — see comment above */
//     }

//     /* Strip the preview padding when actually printing */
//     @media print {
//       .resume {
//         padding: 0 !important;
//       }
//     }

//     /* Global p reset */
//     p { margin: 0 0 6px 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* ── HEADER ── */
//     .contact-info {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 1px solid #eee;
//     }
//     .contact-info .name {
//       font-size: 24px;
//       font-weight: 700;
//       margin-bottom: 4px;
//       line-height: 1.2;
//     }
//     .contact-info .job-title {
//       font-size: 16px;
//       color: #333;
//       margin-bottom: 8px;
//     }
//     .contact-info .address {
//       font-size: 14px;
//       color: #666;
//       margin-bottom: 10px;
//     }
//     .contact-details {
//       font-size: 14px;
//       color: #444;
//       margin-bottom: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 12px;
//     }
//     .contact-details span { padding: 2px 8px; }
//     .links { margin-top: 5px; text-align: center; }
//     .link-item {
//       color: #0077b5;
//       text-decoration: none;
//       font-size: 14px;
//       padding: 2px 8px;
//     }

//     /* ── SECTION TITLES ── */
//     .section-content { margin-bottom: 16px; }
//     .section-title {
//       background: #f0f0f0;
//       padding: 6px 10px;
//       font-weight: 700;
//       margin: 12px 0 8px;
//       font-size: 16px;
//       border-left: 3px solid #333;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── ITEM LAYOUT ── */
//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 6px;
//       flex-wrap: wrap;
//       gap: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .item-title-container { min-width: 200px; }
//     .item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
//     .item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
//     .item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
//     .experience-date,
//     .education-date {
//       font-size: 12px;
//       color: #666;
//       padding: 2px 6px;
//       background: #f8f8f8;
//       border-radius: 3px;
//       line-height: 1.4;
//     }
//     .education-grade {
//       font-size: 12px;
//       color: #666;
//       font-weight: 500;
//       background: #f0f0f0;
//       padding: 2px 8px;
//       border-radius: 3px;
//     }

//     /* ── RICH-TEXT CONTENT ── */
//     .item-content,
//     .summary-text,
//     .experience-description,
//     .education-description,
//     .project-description,
//     .custom-section-content,
//     .skills-content {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #444;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }
//     .summary-text,
//     .skills-content { padding: 0 5px; }
//     .experience-description,
//     .education-description { margin-top: 5px; }

//     /* Lists */
//     .experience-description ul, .experience-description ol,
//     .education-description ul,  .education-description ol,
//     .project-description ul,    .project-description ol,
//     .custom-section-content ul, .custom-section-content ol,
//     .summary-text ul,           .summary-text ol,
//     .skills-content ul,         .skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }
//     .experience-description ul, .summary-text ul, .skills-content ul { list-style-type: disc !important; }
//     .experience-description ol, .summary-text ol, .skills-content ol { list-style-type: decimal !important; }

//     .experience-description li, .education-description li,
//     .project-description li,    .custom-section-content li,
//     .summary-text li,           .skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* ── PROJECTS ── */
//     .project-item { margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; }
//     .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }
//     .project-title { font-weight: 700; font-size: 15px; color: #222; }
//     .project-links { display: flex; gap: 12px; }
//     .project-link  { font-size: 11px; color: #0077b5; text-decoration: none; }
//     .project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; }
//       /* padding:0 so @page margin is the ONLY spacing — not doubled */
//       .resume { border: none; box-shadow: none; padding: 0 !important; }
//       .project-link, .link-item { color: #000 !important; text-decoration: underline !important; }
//       .section-title   { page-break-after: avoid;  break-after: avoid;  }
//       .experience-item,
//       .education-item,
//       .project-item    { page-break-inside: avoid; break-inside: avoid; }
//     }
//   `;

//   // ── Tiny script injected into the iframe ─────────────────
//   // After the iframe document loads it measures its own scrollHeight
//   // and posts the value back to the parent. The parent uses this to
//   // set the exact iframe height → no scrollbar, no clipping.
//   const HEIGHT_SCRIPT = `
//     <script>
//       function reportHeight() {
//         var h = document.documentElement.scrollHeight || document.body.scrollHeight;
//         window.parent.postMessage({ type: 'RESUME_HEIGHT', height: h }, '*');
//       }
//       if (document.readyState === 'complete') reportHeight();
//       else window.addEventListener('load', reportHeight);
//       // also report after fonts load (they can change line heights)
//       if (document.fonts && document.fonts.ready) {
//         document.fonts.ready.then(reportHeight);
//       }
//     </script>
//   `;

//   // ── HTML builder ──────────────────────────────────────────
//   const generateHTML = useMemo((): string => {
//     const richText = (html: string, cls: string) => {
//       if (!html) return "";
//       const clean = cleanQuillHTML(html);
//       if (!clean || clean === "<p><br></p>") return "";
//       return `<div class="item-content ${cls}">${clean}</div>`;
//     };

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const header = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
//         ${addressParts.length ? `<div class="address">${addressParts.join(", ")}</div>` : ""}
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<a href="${href(linkedinUrl)}"  class="link-item" target="_blank">LinkedIn</a>` : ""}
//           ${githubUrl ? `<a href="${href(githubUrl)}"    class="link-item" target="_blank">GitHub</a>` : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">Portfolio</a>` : ""}
//         </div>
//       </div>`;

//     const summaryBlock = summary
//       ? `
//       <div class="section-content">
//         <div class="section-title">Summary</div>
//         ${richText(summary.replace(/\n/g, "<br>"), "summary-text")}
//       </div>`
//       : "";

//     const expBlock = experiences.length
//       ? `
//       <div class="section-content">
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const s = formatMonthYear(exp.startDate, false);
//             const e = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             return `<div class="experience-item" style="margin-bottom:16px">
//             <div class="item-header experience-header">
//               <div class="item-title-container">
//                 <div class="item-title">${exp.jobTitle || ""}</div>
//                 <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//               </div>
//               <div class="item-date experience-date">${s} - ${e}</div>
//             </div>
//             ${exp.text ? richText(exp.text, "experience-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     const projBlock = projects.length
//       ? `
//       <div class="section-content">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="project-item">
//             <div class="project-header">
//               <div class="project-title">${p.title || ""}</div>
//               ${
//                 p.liveUrl || p.githubUrl
//                   ? `<div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>`
//                   : ""
//               }
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? richText(p.description, "project-description") : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//       : "";

//     const eduBlock = educations.length
//       ? `
//       <div class="section-content">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr =
//               edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                 : "";
//             return `<div class="education-item" style="margin-bottom:16px">
//             <div class="item-header education-header">
//               <div class="item-title-container">
//                 <div class="item-title">${edu.degree || ""}</div>
//                 <div class="item-subtitle">
//                   ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                   ${edu.schoolname && edu.location ? " — " : ""}
//                   ${edu.location ? `<span>${edu.location}</span>` : ""}
//                   ${(edu.schoolname || edu.location) && grade ? " • " : ""}
//                   ${grade ? `<span class="education-grade">${grade}</span>` : ""}
//                 </div>
//               </div>
//               ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//             </div>
//             ${edu.text ? richText(edu.text, "education-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     const skillsClean = cleanQuillHTML(skills || "");
//     const skillsBlock =
//       skillsClean && skillsClean !== "<p><br></p>"
//         ? `
//       <div class="section-content">
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${skillsClean}</div>
//       </div>`
//         : "";

//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       )
//         ? `
//       <div class="section-content">
//         ${finalize.customSection
//           .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s: any) => `
//             <div class="custom-section">
//               ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//               ${s.description ? richText(s.description, "custom-section-content") : ""}
//             </div>`,
//           )
//           .join("")}
//       </div>`
//         : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body>
//   <!--
//     NO padding on .resume here.
//     • PDF/print  → @page { margin: 15mm } handles all page margins
//     • Preview    → the iframe wrapper div in JSX adds padding: 15mm
//     Adding padding here would double it in the PDF (div padding + @page margin).
//   -->
//   <div class="resume">
//     ${header}
//     ${summaryBlock}
//     ${expBlock}
//     ${projBlock}
//     ${eduBlock}
//     ${skillsBlock}
//     ${customBlock}
//   </div>
//   ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     contact,
//     educations,
//     experiences,
//     skills,
//     projects,
//     finalize,
//     summary,
//     addressParts,
//     linkedinUrl,
//     portfolioUrl,
//     githubUrl,
//     dateOfBirth,
//   ]);

//   // ── PDF download ──────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: generateHTML },
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
//         /*
//           THUMBNAIL / PREVIEW mode (template picker grid)
//           ─────────────────────────────────────────────────
//           Scale A4 iframe down to a small card.
//           No padding needed here — thumbnail previews are tiny.
//         */
//         <div
//           style={{
//             width: "210mm",
//             height: "297mm",
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "hidden",
//             pointerEvents: "none",
//           }}
//         >
//           <iframe
//             srcDoc={generateHTML}
//             title="resume-preview"
//             style={{
//               width: "210mm",
//               height: "297mm",
//               border: "none",
//               background: "white",
//               display: "block",
//               overflow: "hidden",
//             }}
//             scrolling="no"
//             sandbox="allow-same-origin"
//           />
//         </div>
//       ) : (
//         /*
//           FULL VIEW / EDITOR mode
//           ────────────────────────────────────────────────────────
//           WHY THE TEXT WAS CROPPED:
//             wrapper had padding:15mm + boxSizing:border-box
//             → wrapper inner width = 210mm - 30mm = 180mm
//             → iframe width:100% = 180mm
//             → .resume inside iframe is 210mm wide → 30mm clipped!

//           FIX — two-layer approach:
//             Outer shell  : wider than 210mm, provides visual shadow/bg
//             Inner wrapper: exactly 210mm, no padding, holds the iframe
//             iframe       : exactly 210mm — always matches .resume width
//             .resume div  : padding:15mm in CSS (screen only, not print)
//                            so preview spacing = PDF @page margin spacing
//         */
//         <div
//           style={{
//             width: "210mm",
//             margin: "0 auto",
//             background: "white",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <iframe
//             ref={iframeRef}
//             srcDoc={generateHTML}
//             title="resume-full"
//             style={{
//               width:
//                 "210mm" /* fixed px — NEVER % or it shrinks below .resume width */,
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

// export default TemplateOne;

// "use client";
// import React, {
//   useContext,
//   useMemo,
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
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // ── Dynamic iframe height for full-view mode ──
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

//   // ── Data sources ──────────────────────────────────────────
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

//   // ── Shared CSS ─────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

//     /* PDF margins */
//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     /* Print margins reset */
//     @media print {
//       body {
//         padding: 0;
//         margin: 0;
//       }
//     }

//     .resume {
//       max-width: 180mm; /* 210mm - 30mm total margins */
//       margin: 0 auto;
//       background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//     }

//     @media print {
//       .resume {
//         max-width: none;
//         margin: 0;
//       }
//     }

//     /* Global p reset */
//     p { margin: 0 0 6px 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* ── HEADER ── */
//     .contact-info {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 1px solid #eee;
//     }
//     .contact-info .name {
//       font-size: 24px;
//       font-weight: 700;
//       margin-bottom: 4px;
//       line-height: 1.2;
//     }
//     .contact-info .job-title {
//       font-size: 16px;
//       color: #333;
//       margin-bottom: 8px;
//     }
//     .contact-info .address {
//       font-size: 14px;
//       color: #666;
//       margin-bottom: 10px;
//     }
//     .contact-details {
//       font-size: 14px;
//       color: #444;
//       margin-bottom: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 12px;
//     }
//     .contact-details span { padding: 2px 8px; }
//     .links { margin-top: 5px; text-align: center; }
//     .link-item {
//       color: #0077b5;
//       text-decoration: none;
//       font-size: 14px;
//       padding: 2px 8px;
//     }

//     /* ── SECTION TITLES ── */
//     .section-content { margin-bottom: 16px; }
//     .section-title {
//       background: #f0f0f0;
//       padding: 6px 10px;
//       font-weight: 700;
//       margin: 12px 0 8px;
//       font-size: 16px;
//       border-left: 3px solid #333;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── ITEM LAYOUT ── */
//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 6px;
//       flex-wrap: wrap;
//       gap: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .item-title-container { min-width: 200px; }
//     .item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
//     .item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
//     .item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
//     .experience-date,
//     .education-date {
//       font-size: 12px;
//       color: #666;
//       padding: 2px 6px;
//       background: #f8f8f8;
//       border-radius: 3px;
//       line-height: 1.4;
//     }
//     .education-grade {
//       font-size: 12px;
//       color: #666;
//       font-weight: 500;
//       background: #f0f0f0;
//       padding: 2px 8px;
//       border-radius: 3px;
//     }

//     /* ── RICH-TEXT CONTENT ── */
//     .item-content,
//     .summary-text,
//     .experience-description,
//     .education-description,
//     .project-description,
//     .custom-section-content,
//     .skills-content {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #444;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }
//     .summary-text,
//     .skills-content { padding: 0 5px; }
//     .experience-description,
//     .education-description { margin-top: 5px; }

//     /* Lists */
//     .experience-description ul, .experience-description ol,
//     .education-description ul,  .education-description ol,
//     .project-description ul,    .project-description ol,
//     .custom-section-content ul, .custom-section-content ol,
//     .summary-text ul,           .summary-text ol,
//     .skills-content ul,         .skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }
//     .experience-description ul, .summary-text ul, .skills-content ul { list-style-type: disc !important; }
//     .experience-description ol, .summary-text ol, .skills-content ol { list-style-type: decimal !important; }

//     .experience-description li, .education-description li,
//     .project-description li,    .custom-section-content li,
//     .summary-text li,           .skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* ── PROJECTS ── */
//     .project-item { margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; }
//     .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }
//     .project-title { font-weight: 700; font-size: 15px; color: #222; }
//     .project-links { display: flex; gap: 12px; }
//     .project-link  { font-size: 11px; color: #0077b5; text-decoration: none; }
//     .project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; }
//       .resume { border: none; box-shadow: none; }
//       .project-link, .link-item { color: #000 !important; text-decoration: underline !important; }
//       .section-title   { page-break-after: avoid;  break-after: avoid;  }
//       .experience-item,
//       .education-item,
//       .project-item    { page-break-inside: avoid; break-inside: avoid; }
//     }
//   `;

//   // ── Height-reporting script injected into iframe ─────────────────
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
//       // Observe DOM changes
//       const observer = new MutationObserver(reportHeight);
//       observer.observe(document.body, { childList: true, subtree: true, attributes: true });
//     </script>
//   `;

//   // ── HTML builder ──────────────────────────────────────────
//   const generateHTML = useCallback((): string => {
//     const richText = (html: string, cls: string) => {
//       if (!html) return "";
//       const clean = cleanQuillHTML(html);
//       if (!clean || clean === "<p><br></p>") return "";
//       return `<div class="item-content ${cls}">${clean}</div>`;
//     };

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const header = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
//         ${addressParts.length ? `<div class="address">${addressParts.join(", ")}</div>` : ""}
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<a href="${href(linkedinUrl)}"  class="link-item" target="_blank">LinkedIn</a>` : ""}
//           ${githubUrl ? `<a href="${href(githubUrl)}"    class="link-item" target="_blank">GitHub</a>` : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">Portfolio</a>` : ""}
//         </div>
//       </div>`;

//     const summaryBlock = summary
//       ? `
//       <div class="section-content">
//         <div class="section-title">Summary</div>
//         ${richText(summary.replace(/\n/g, "<br>"), "summary-text")}
//       </div>`
//       : "";

//     const expBlock = experiences.length
//       ? `
//       <div class="section-content">
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const s = formatMonthYear(exp.startDate, false);
//             const e = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             return `<div class="experience-item" style="margin-bottom:16px">
//             <div class="item-header experience-header">
//               <div class="item-title-container">
//                 <div class="item-title">${exp.jobTitle || ""}</div>
//                 <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//               </div>
//               <div class="item-date experience-date">${s} - ${e}</div>
//             </div>
//             ${exp.text ? richText(exp.text, "experience-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     const projBlock = projects.length
//       ? `
//       <div class="section-content">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="project-item">
//             <div class="project-header">
//               <div class="project-title">${p.title || ""}</div>
//               ${
//                 p.liveUrl || p.githubUrl
//                   ? `<div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>`
//                   : ""
//               }
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? richText(p.description, "project-description") : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//       : "";

//     const eduBlock = educations.length
//       ? `
//       <div class="section-content">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr =
//               edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                 : "";
//             return `<div class="education-item" style="margin-bottom:16px">
//             <div class="item-header education-header">
//               <div class="item-title-container">
//                 <div class="item-title">${edu.degree || ""}</div>
//                 <div class="item-subtitle">
//                   ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                   ${edu.schoolname && edu.location ? " — " : ""}
//                   ${edu.location ? `<span>${edu.location}</span>` : ""}
//                   ${(edu.schoolname || edu.location) && grade ? " • " : ""}
//                   ${grade ? `<span class="education-grade">${grade}</span>` : ""}
//                 </div>
//               </div>
//               ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//             </div>
//             ${edu.text ? richText(edu.text, "education-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     const skillsClean = cleanQuillHTML(skills || "");
//     const skillsBlock =
//       skillsClean && skillsClean !== "<p><br></p>"
//         ? `
//       <div class="section-content">
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${skillsClean}</div>
//       </div>`
//         : "";

//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       )
//         ? `
//       <div class="section-content">
//         ${finalize.customSection
//           .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s: any) => `
//             <div class="custom-section">
//               ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//               ${s.description ? richText(s.description, "custom-section-content") : ""}
//             </div>`,
//           )
//           .join("")}
//       </div>`
//         : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body>
//   <div class="resume">
//     ${header}
//     ${summaryBlock}
//     ${expBlock}
//     ${projBlock}
//     ${eduBlock}
//     ${skillsBlock}
//     ${customBlock}
//   </div>
//   ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [
//     contact,
//     educations,
//     experiences,
//     skills,
//     projects,
//     finalize,
//     summary,
//     addressParts,
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

//   // Update iframe content when htmlContent changes (only for full view mode)
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

//   // ── PDF download ──────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html: generateHTML(),
//           options: {
//             margin: {
//               top: "15mm",
//               right: "15mm",
//               bottom: "15mm",
//               left: "15mm",
//             },
//           },
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
//         /*
//           THUMBNAIL / PREVIEW mode - using direct div for performance
//         */
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
//         /*
//           FULL VIEW / EDITOR mode
//         */
//         <div
//           style={{
//             width: "210mm",
//             margin: "0 auto",
//             background: "white",
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

// export default TemplateOne;

// "use client";
// import React, {
//   useContext,
//   useMemo,
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
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // ── Dynamic iframe height for full-view mode ──
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

//   // ── Data sources ──────────────────────────────────────────
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

//   // ── Shared CSS with unique t1- prefix ─────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

//     /* PDF margins */
//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     /* Print margins reset */
//     @media print {
//       .t1-resume {
//         padding: 0;
//         margin: 0;
//       }
//     }

//     .t1-resume {
//       max-width: 180mm; /* 210mm - 30mm total margins */
//       margin: 0 auto;
//       background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//     }

//     @media print {
//       .t1-resume {
//         max-width: none;
//         margin: 0;
//       }
//     }

//     /* Global p reset - scoped to t1-resume */
//     .t1-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── HEADER ── */
//     .t1-contact-info {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 1px solid #eee;
//     }
//     .t1-contact-info .t1-name {
//       font-size: 24px;
//       font-weight: 700;
//       margin-bottom: 4px;
//       line-height: 1.2;
//     }
//     .t1-contact-info .t1-job-title {
//       font-size: 16px;
//       color: #333;
//       margin-bottom: 8px;
//     }
//     .t1-contact-info .t1-address {
//       font-size: 14px;
//       color: #666;
//       margin-bottom: 10px;
//     }
//     .t1-contact-details {
//       font-size: 14px;
//       color: #444;
//       margin-bottom: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 12px;
//     }
//     .t1-contact-details span {
//       padding: 2px 8px;
//     }
//     .t1-links {
//       margin-top: 5px;
//       text-align: center;
//     }
//     .t1-link-item {
//       color: #0077b5;
//       text-decoration: none;
//       font-size: 14px;
//       padding: 2px 8px;
//     }

//     /* ── SECTION TITLES ── */
//     .t1-section-content {
//       margin-bottom: 16px;
//     }
//     .t1-section-title {
//       background: #f0f0f0;
//       padding: 6px 10px;
//       font-weight: 700;
//       margin: 12px 0 8px;
//       font-size: 16px;
//       border-left: 3px solid #333;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── ITEM LAYOUT ── */
//     .t1-item-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 6px;
//       flex-wrap: wrap;
//       gap: 10px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .t1-item-title-container {
//       min-width: 200px;
//     }
//     .t1-item-title {
//       font-weight: 700;
//       font-size: 15px;
//       line-height: 1.4;
//       margin-bottom: 2px;
//     }
//     .t1-item-subtitle {
//       font-size: 13px;
//       color: #555;
//       margin-top: 2px;
//       line-height: 1.4;
//     }
//     .t1-item-date {
//       white-space: nowrap;
//       font-size: 12px;
//       color: #777;
//       text-align: right;
//     }
//     .t1-experience-date,
//     .t1-education-date {
//       font-size: 12px;
//       color: #666;
//       padding: 2px 6px;
//       background: #f8f8f8;
//       border-radius: 3px;
//       line-height: 1.4;
//     }
//     .t1-education-grade {
//       font-size: 12px;
//       color: #666;
//       font-weight: 500;
//       background: #f0f0f0;
//       padding: 2px 8px;
//       border-radius: 3px;
//     }

//     /* ── RICH-TEXT CONTENT ── */
//     .t1-item-content,
//     .t1-summary-text,
//     .t1-experience-description,
//     .t1-education-description,
//     .t1-project-description,
//     .t1-custom-section-content,
//     .t1-skills-content {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #444;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }
//     .t1-summary-text,
//     .t1-skills-content {
//       padding: 0 5px;
//     }
//     .t1-experience-description,
//     .t1-education-description {
//       margin-top: 5px;
//     }

//     /* Lists */
//     .t1-experience-description ul, .t1-experience-description ol,
//     .t1-education-description ul,  .t1-education-description ol,
//     .t1-project-description ul,    .t1-project-description ol,
//     .t1-custom-section-content ul, .t1-custom-section-content ol,
//     .t1-summary-text ul,           .t1-summary-text ol,
//     .t1-skills-content ul,         .t1-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }
//     .t1-experience-description ul, .t1-summary-text ul, .t1-skills-content ul {
//       list-style-type: disc !important;
//     }
//     .t1-experience-description ol, .t1-summary-text ol, .t1-skills-content ol {
//       list-style-type: decimal !important;
//     }

//     .t1-experience-description li, .t1-education-description li,
//     .t1-project-description li,    .t1-custom-section-content li,
//     .t1-summary-text li,           .t1-skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* ── PROJECTS ── */
//     .t1-project-item {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t1-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }
//     .t1-project-title {
//       font-weight: 700;
//       font-size: 15px;
//       color: #222;
//     }
//     .t1-project-links {
//       display: flex;
//       gap: 12px;
//     }
//     .t1-project-link {
//       font-size: 11px;
//       color: #0077b5;
//       text-decoration: none;
//     }
//     .t1-project-tech-stack {
//       font-size: 12px;
//       color: #666;
//       margin: 4px 0 6px;
//     }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body {
//         overflow: visible;
//       }
//       .t1-resume {
//         border: none;
//         box-shadow: none;
//       }
//       .t1-project-link, .t1-link-item {
//         color: #000 !important;
//         text-decoration: underline !important;
//       }
//       .t1-section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//       .t1-experience-item,
//       .t1-education-item,
//       .t1-project-item {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }
//     }
//   `;

//   // ── Height-reporting script injected into iframe ─────────────────
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
//       // Observe DOM changes
//       const observer = new MutationObserver(reportHeight);
//       observer.observe(document.body, { childList: true, subtree: true, attributes: true });
//     </script>
//   `;

//   // ── HTML builder ──────────────────────────────────────────
//   const generateHTML = useCallback((): string => {
//     const richText = (html: string, cls: string) => {
//       if (!html) return "";
//       const clean = cleanQuillHTML(html);
//       if (!clean || clean === "<p><br></p>") return "";
//       return `<div class="t1-item-content ${cls}">${clean}</div>`;
//     };

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const header = `
//       <div class="t1-contact-info">
//         <div class="t1-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="t1-job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
//         ${addressParts.length ? `<div class="t1-address">${addressParts.join(", ")}</div>` : ""}
//         <div class="t1-contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//         </div>
//         <div class="t1-links">
//           ${linkedinUrl ? `<a href="${href(linkedinUrl)}"  class="t1-link-item" target="_blank">LinkedIn</a>` : ""}
//           ${githubUrl ? `<a href="${href(githubUrl)}"    class="t1-link-item" target="_blank">GitHub</a>` : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="t1-link-item" target="_blank">Portfolio</a>` : ""}
//         </div>
//       </div>`;

//     const summaryBlock = summary
//       ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Summary</div>
//         ${richText(summary.replace(/\n/g, "<br>"), "t1-summary-text")}
//       </div>`
//       : "";

//     const expBlock = experiences.length
//       ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const s = formatMonthYear(exp.startDate, false);
//             const e = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             return `<div class="t1-experience-item" style="margin-bottom:16px">
//             <div class="t1-item-header t1-experience-header">
//               <div class="t1-item-title-container">
//                 <div class="t1-item-title">${exp.jobTitle || ""}</div>
//                 <div class="t1-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//               </div>
//               <div class="t1-item-date t1-experience-date">${s} - ${e}</div>
//             </div>
//             ${exp.text ? richText(exp.text, "t1-experience-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     const projBlock = projects.length
//       ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="t1-project-item">
//             <div class="t1-project-header">
//               <div class="t1-project-title">${p.title || ""}</div>
//               ${
//                 p.liveUrl || p.githubUrl
//                   ? `<div class="t1-project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="t1-project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t1-project-link" target="_blank">GitHub</a>` : ""}
//               </div>`
//                   : ""
//               }
//             </div>
//             ${p.techStack?.length ? `<div class="t1-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? richText(p.description, "t1-project-description") : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//       : "";

//     const eduBlock = educations.length
//       ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr =
//               edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                 : "";
//             return `<div class="t1-education-item" style="margin-bottom:16px">
//             <div class="t1-item-header t1-education-header">
//               <div class="t1-item-title-container">
//                 <div class="t1-item-title">${edu.degree || ""}</div>
//                 <div class="t1-item-subtitle">
//                   ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                   ${edu.schoolname && edu.location ? " — " : ""}
//                   ${edu.location ? `<span>${edu.location}</span>` : ""}
//                   ${(edu.schoolname || edu.location) && grade ? " • " : ""}
//                   ${grade ? `<span class="t1-education-grade">${grade}</span>` : ""}
//                 </div>
//               </div>
//               ${dateStr ? `<div class="t1-item-date t1-education-date">${dateStr}</div>` : ""}
//             </div>
//             ${edu.text ? richText(edu.text, "t1-education-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     const skillsClean = cleanQuillHTML(skills || "");
//     const skillsBlock =
//       skillsClean && skillsClean !== "<p><br></p>"
//         ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Skills</div>
//         <div class="t1-skills-content">${skillsClean}</div>
//       </div>`
//         : "";

//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       )
//         ? `
//       <div class="t1-section-content">
//         ${finalize.customSection
//           .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s: any) => `
//             <div class="t1-custom-section">
//               ${s.name ? `<div class="t1-section-title">${s.name}</div>` : ""}
//               ${s.description ? richText(s.description, "t1-custom-section-content") : ""}
//             </div>`,
//           )
//           .join("")}
//       </div>`
//         : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body style="margin:0; padding:0; background:white;">
//   <div class="t1-resume">
//     ${header}
//     ${summaryBlock}
//     ${expBlock}
//     ${projBlock}
//     ${eduBlock}
//     ${skillsBlock}
//     ${customBlock}
//   </div>
//   ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [
//     contact,
//     educations,
//     experiences,
//     skills,
//     projects,
//     finalize,
//     summary,
//     addressParts,
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
//   }, [generateHTML]);

//   // Update iframe content when htmlContent changes (only for full view mode)
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

//   // ── PDF download ──────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html: generateHTML(),
//           options: {
//             margin: {
//               top: "15mm",
//               right: "15mm",
//               bottom: "15mm",
//               left: "15mm",
//             },
//           },
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
//         /*
//           THUMBNAIL / PREVIEW mode - using direct div for performance
//         */
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
//         /*
//           FULL VIEW / EDITOR mode
//         */
//         <div
//           style={{
//             width: "210mm",
//             margin: "0 auto",
//             background: "white",
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

// export default TemplateOne;

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
// import { ResumeProps } from "@/app/types";
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
// //   .t1-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W            = 794;   // px — A4 width at 96 dpi
// const A4_H            = 1123;  // px — A4 height at 96 dpi
// const MARGIN          = 57;    // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H  = A4_H - MARGIN * 2;  // 1009px — usable content per page

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context     = useContext(CreateContext);
//   const pathname    = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const measureRef       = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages,       setPages]       = useState<string[]>([]);

//   // ── Data sources ─────────────────────────────────────────────────────────
//   const contact     = alldata?.contact     || context.contact     || {};
//   const educations  = alldata?.educations  || context?.education  || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills      = alldata?.skills?.text || context?.skills?.text || "";
//   const projects    = alldata?.projects    || context?.projects   || [];
//   const finalize    = alldata?.finalize    || context?.finalize   || {};
//   const summary     = alldata?.summary     || context?.summary    || "";

//   const addressParts = [
//     contact?.address, contact?.city, contact?.postCode, contact?.country,
//   ].filter(Boolean);
//   const linkedinUrl  = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl    = contact?.github;
//   const dateOfBirth  = contact?.dob;

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   // box-sizing: border-box on .t1-resume is the key:
//   //   width:794px + padding:57px → inner text area = 680px = PDF content width
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t1-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip
//          so that scrollHeight = pure content height, matching Puppeteer's 1009px slices */
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//     }

//     .t1-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── HEADER ── */
//     .t1-contact-info {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 1px solid #eee;
//     }
//     .t1-name      { font-size: 24px; font-weight: 700; margin-bottom: 4px; line-height: 1.2; }
//     .t1-job-title { font-size: 16px; color: #333; margin-bottom: 8px; }
//     .t1-address   { font-size: 14px; color: #666; margin-bottom: 10px; }
//     .t1-contact-details {
//       font-size: 14px; color: #444; margin-bottom: 10px;
//       display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;
//     }
//     .t1-contact-details span { padding: 2px 8px; }
//     .t1-links { margin-top: 5px; text-align: center; }
//     .t1-link-item { color: #0077b5; text-decoration: none; font-size: 14px; padding: 2px 8px; }

//     /* ── SECTIONS ── */
//     .t1-section-content { margin-bottom: 16px; }
//     .t1-section-title {
//       background: #f0f0f0; padding: 6px 10px; font-weight: 700;
//       margin: 12px 0 8px; font-size: 16px; border-left: 3px solid #333;
//       page-break-after: avoid; break-after: avoid;
//     }

//     /* ── ITEM LAYOUT ── */
//     .t1-item-header {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       margin-bottom: 6px; flex-wrap: wrap; gap: 10px;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t1-item-title-container { min-width: 200px; flex: 1; }
//     .t1-item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
//     .t1-item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
//     .t1-item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
//     .t1-experience-date, .t1-education-date {
//       font-size: 12px; color: #666; padding: 2px 6px;
//       background: #f8f8f8; border-radius: 3px; line-height: 1.4;
//     }
//     .t1-education-grade {
//       font-size: 12px; color: #666; font-weight: 500;
//       background: #f0f0f0; padding: 2px 8px; border-radius: 3px;
//     }

//     /* ── RICH TEXT ── */
//     .t1-item-content, .t1-summary-text, .t1-experience-description,
//     .t1-education-description, .t1-project-description,
//     .t1-custom-section-content, .t1-skills-content {
//       font-size: 13px; line-height: 1.5; color: #444;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t1-summary-text, .t1-skills-content { padding: 0 5px; }
//     .t1-experience-description, .t1-education-description { margin-top: 5px; }

//     .t1-experience-description ul, .t1-experience-description ol,
//     .t1-education-description ul,  .t1-education-description ol,
//     .t1-project-description ul,    .t1-project-description ol,
//     .t1-custom-section-content ul, .t1-custom-section-content ol,
//     .t1-summary-text ul,           .t1-summary-text ol,
//     .t1-skills-content ul,         .t1-skills-content ol {
//       margin: 8px 0 8px 20px !important; padding-left: 0 !important;
//     }
//     .t1-experience-description ul, .t1-summary-text ul, .t1-skills-content ul { list-style-type: disc !important; }
//     .t1-experience-description ol, .t1-summary-text ol, .t1-skills-content ol { list-style-type: decimal !important; }
//     .t1-experience-description li, .t1-education-description li,
//     .t1-project-description li,    .t1-custom-section-content li,
//     .t1-summary-text li,           .t1-skills-content li {
//       margin-bottom: 4px !important; line-height: 1.5 !important;
//       font-size: 13px !important; page-break-inside: avoid; break-inside: avoid;
//     }

//     /* ── PROJECTS ── */
//     .t1-project-item { margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; }
//     .t1-project-header {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
//     }
//     .t1-project-title      { font-weight: 700; font-size: 15px; color: #222; }
//     .t1-project-links      { display: flex; gap: 12px; }
//     .t1-project-link       { font-size: 11px; color: #0077b5; text-decoration: none; }
//     .t1-project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

//     /* ── PRINT ── */
//     @media print {
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; }
//       .t1-resume { width: 100% !important; padding: 0 !important; }
//       .t1-project-link, .t1-link-item { color: #000 !important; text-decoration: underline !important; }
//       .t1-section-title { page-break-after: avoid; break-after: avoid; }
//       .t1-experience-item, .t1-education-item, .t1-project-item {
//         page-break-inside: avoid; break-inside: avoid;
//       }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   // forPDF=true  → adds override to strip width/padding so Puppeteer's 15mm margin owns the spacing
//   // forPDF=false → .t1-resume keeps width:794px + padding:57px (preview mode)
//   const generateHTML = useCallback((forPDF = false): string => {
//     const richText = (html: string, cls: string) => {
//       if (!html) return "";
//       const clean = cleanQuillHTML(html);
//       if (!clean || clean === "<p><br></p>") return "";
//       return `<div class="t1-item-content ${cls}">${clean}</div>`;
//     };
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;
//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const header = `
//       <div class="t1-contact-info">
//         <div class="t1-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="t1-job-title">${
//           typeof contact?.jobTitle === "string"
//             ? contact.jobTitle
//             : (contact?.jobTitle as any)?.name || ""
//         }</div>
//         ${addressParts.length ? `<div class="t1-address">${addressParts.join(", ")}</div>` : ""}
//         <div class="t1-contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           ${formattedDob   ? `<span>${formattedDob}</span>`  : ""}
//         </div>
//         <div class="t1-links">
//           ${linkedinUrl  ? `<a href="${href(linkedinUrl)}"  class="t1-link-item" target="_blank">LinkedIn</a>`  : ""}
//           ${githubUrl    ? `<a href="${href(githubUrl)}"    class="t1-link-item" target="_blank">GitHub</a>`    : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="t1-link-item" target="_blank">Portfolio</a>` : ""}
//         </div>
//       </div>`;

//     const summaryBlock = summary ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Summary</div>
//         ${richText(summary.replace(/\n/g, "<br>"), "t1-summary-text")}
//       </div>` : "";

//     const expBlock = experiences.length ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Experience</div>
//         ${experiences.map((exp: any) => {
//           const s = formatMonthYear(exp.startDate, false);
//           const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//           return `<div class="t1-experience-item" style="margin-bottom:16px">
//             <div class="t1-item-header">
//               <div class="t1-item-title-container">
//                 <div class="t1-item-title">${exp.jobTitle || ""}</div>
//                 <div class="t1-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//               </div>
//               <div class="t1-item-date t1-experience-date">${s} - ${e}</div>
//             </div>
//             ${exp.text ? richText(exp.text, "t1-experience-description") : ""}
//           </div>`;
//         }).join("")}
//       </div>` : "";

//     const projBlock = projects.length ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Projects</div>
//         ${projects.map((p: any) => `
//           <div class="t1-project-item">
//             <div class="t1-project-header">
//               <div class="t1-project-title">${p.title || ""}</div>
//               ${p.liveUrl || p.githubUrl ? `
//                 <div class="t1-project-links">
//                   ${p.liveUrl   ? `<a href="${href(p.liveUrl)}"   class="t1-project-link" target="_blank">Live Demo</a>` : ""}
//                   ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t1-project-link" target="_blank">GitHub</a>`   : ""}
//                 </div>` : ""}
//             </div>
//             ${p.techStack?.length ? `<div class="t1-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? richText(p.description, "t1-project-description") : ""}
//           </div>`).join("")}
//       </div>` : "";

//     const eduBlock = educations.length ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Education</div>
//         ${educations.map((edu: any) => {
//           const grade   = formatGradeToCgpdAndPercentage(edu.grade || "");
//           const dateStr = edu.startDate || edu.endDate
//             ? `${edu.startDate || ""} - ${edu.endDate || "Present"}` : "";
//           return `<div class="t1-education-item" style="margin-bottom:16px">
//             <div class="t1-item-header">
//               <div class="t1-item-title-container">
//                 <div class="t1-item-title">${edu.degree || ""}</div>
//                 <div class="t1-item-subtitle">
//                   ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                   ${edu.schoolname && edu.location ? " — " : ""}
//                   ${edu.location ? `<span>${edu.location}</span>` : ""}
//                   ${(edu.schoolname || edu.location) && grade ? " • " : ""}
//                   ${grade ? `<span class="t1-education-grade">${grade}</span>` : ""}
//                 </div>
//               </div>
//               ${dateStr ? `<div class="t1-item-date t1-education-date">${dateStr}</div>` : ""}
//             </div>
//             ${edu.text ? richText(edu.text, "t1-education-description") : ""}
//           </div>`;
//         }).join("")}
//       </div>` : "";

//     const skillsClean = cleanQuillHTML(skills || "");
//     const skillsBlock = skillsClean && skillsClean !== "<p><br></p>" ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Skills</div>
//         <div class="t1-skills-content">${skillsClean}</div>
//       </div>` : "";

//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//         ? `<div class="t1-section-content">
//             ${finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map((s: any) => `
//                 <div class="t1-custom-section">
//                   ${s.name ? `<div class="t1-section-title">${s.name}</div>` : ""}
//                   ${s.description ? richText(s.description, "t1-custom-section-content") : ""}
//                 </div>`).join("")}
//           </div>` : "";

//     // PDF override: strip the fixed width/padding from .t1-resume so Puppeteer's
//     // own 15mm margins control the layout — exactly 680px of text width either way.
//     const pdfOverrideStyle = forPDF
//       ? `<style>.t1-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume</title>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t1-resume">
//     ${header}
//     ${summaryBlock}
//     ${expBlock}
//     ${projBlock}
//     ${eduBlock}
//     ${skillsBlock}
//     ${customBlock}
//   </div>
// </body>
// </html>`;
//   }, [
//     contact, educations, experiences, skills, projects,
//     finalize, summary, addressParts, linkedinUrl, portfolioUrl,
//     githubUrl, dateOfBirth,
//   ]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — matches Puppeteer's pagination exactly
//   //
//   // HOW PUPPETEER PAGINATES:
//   //   - Each PDF page has MARGIN (57px) top + MARGIN (57px) bottom whitespace
//   //   - Usable content per page = PAGE_CONTENT_H = 1009px
//   //   - Content slice for page N = N × 1009px … (N+1) × 1009px
//   //
//   // HOW WE REPLICATE IN THE PREVIEW:
//   //   The .t1-resume in the hidden iframe has:
//   //     - width: 794px, padding: 57px (border-box) → inner content = 680px wide
//   //     - NO top/bottom padding — content starts at y=0 of .t1-resume
//   //
//   //   For each page card we produce a doc where:
//   //     - The A4 card is A4_W × A4_H (794 × 1123px)
//   //     - Inside: top whitespace = MARGIN (57px), then content clip = PAGE_CONTENT_H (1009px), then bottom whitespace = MARGIN (57px)
//   //     - Content is shifted up by (i × PAGE_CONTENT_H) so the right slice shows
//   //
//   //   This means shiftY = i × PAGE_CONTENT_H (not i × A4_H — that was the bug).
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback((fullHtml: string): Promise<string[]> => {
//     return new Promise((resolve) => {
//       const iframe = measureRef.current;
//       if (!iframe) { resolve([fullHtml]); return; }

//       const doc = iframe.contentDocument || iframe.contentWindow?.document;
//       if (!doc) { resolve([fullHtml]); return; }

//       doc.open();
//       doc.write(fullHtml);
//       doc.close();

//       const doSplit = () => {
//         const resume = doc.querySelector<HTMLElement>(".t1-resume");
//         if (!resume) { resolve([fullHtml]); return; }

//         // scrollHeight of .t1-resume = total content height (no top/bottom padding in CSS)
//         // We paginate this in PAGE_CONTENT_H (1009px) slices — same as Puppeteer
//         const totalH   = resume.scrollHeight;
//         const numPages = Math.max(1, Math.ceil(totalH / PAGE_CONTENT_H));
//         const pageHtmls: string[] = [];

//         for (let i = 0; i < numPages; i++) {
//           // Content offset: how far into the resume this page starts
//           const contentOffsetY = i * PAGE_CONTENT_H;

//           // The .t1-resume outer HTML is our content source.
//           // In the page doc the layout is:
//           //   [MARGIN px white]  ← matches PDF top margin
//           //   [PAGE_CONTENT_H px of resume content, clipped]
//           //   [MARGIN px white]  ← matches PDF bottom margin
//           //
//           // We achieve this with:
//           //   .page-margin-box: A4_W × A4_H, white background, overflow hidden
//           //     .page-content-clip: absolute, top:MARGIN, height:PAGE_CONTENT_H, overflow hidden
//           //       .page-shift: shifts resume up by contentOffsetY so page i's slice shows

//           pageHtmls.push(`<!DOCTYPE html>
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
//     /* Full A4 white sheet */
//     .page-margin-box {
//       position: relative;
//       width: ${A4_W}px;
//       height: ${A4_H}px;
//       background: white;
//       overflow: hidden;
//     }
//     /* Content window: sits between top and bottom margin, clips overflow */
//     .page-content-clip {
//       position: absolute;
//       top: ${MARGIN}px;
//       left: 0;
//       width: ${A4_W}px;
//       height: ${PAGE_CONTENT_H}px;
//       overflow: hidden;
//     }
//     /* Shifts the full resume up so the correct 1009px slice is visible */
//     .page-shift {
//       position: absolute;
//       top: ${-contentOffsetY}px;
//       left: 0;
//       width: ${A4_W}px;
//     }
//     /* Resume must have NO top/bottom padding here — we handle vertical
//        spacing with MARGIN via .page-content-clip.top */
//     .t1-resume {
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
// </html>`);
//         }

//         resolve(pageHtmls);
//       };

//       // Wait for web fonts so scrollHeight is accurate, then one rAF to flush layout
//       const win = iframe.contentWindow as any;
//       if (win?.document?.fonts?.ready) {
//         win.document.fonts.ready.then(() => {
//           typeof win.requestAnimationFrame === "function"
//             ? win.requestAnimationFrame(doSplit)
//             : setTimeout(doSplit, 0);
//         });
//       } else {
//         setTimeout(doSplit, 350);
//       }
//     });
//   }, [CSS]);

//   // ── Debounced updates ────────────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => { setHtmlContent(generateHTML()); }, [generateHTML]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download ─────────────────────────────────────────────────────────
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         {
//           html: generateHTML(true),
//           options: {
//             margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
//           },
//         },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(res.data);
//       const a   = document.createElement("a");
//       a.href     = url;
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
//       {/* ── Invisible measurement iframe (off-screen, never shown) ── */}
//       <iframe
//         ref={measureRef}
//         title="resume-measure"
//         aria-hidden="true"
//         style={{
//           position:      "fixed",
//           top:           "-99999px",
//           left:          "-99999px",
//           width:         `${A4_W}px`,
//           // Tall enough for many pages so scrollHeight is never clipped
//           height:        `${A4_H * 10}px`,
//           border:        "none",
//           visibility:    "hidden",
//           pointerEvents: "none",
//         }}
//         sandbox="allow-same-origin allow-scripts"
//       />

//       {/* ── Download button (only on /download-resume route) ── */}
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
//         <div style={{
//           width:           `${A4_W}px`,
//           height:          `${A4_H}px`,
//           transform:       "scale(0.36)",
//           transformOrigin: "top left",
//           overflow:        "hidden",
//           pointerEvents:   "none",
//           flexShrink:      0,
//         }}>
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{
//                 width: `${A4_W}px`, height: `${A4_H}px`,
//                 border: "none", display: "block", pointerEvents: "none",
//               }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div style={{
//               width: `${A4_W}px`, height: `${A4_H}px`, background: "white",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               color: "#ccc", fontSize: 14, fontFamily: "sans-serif",
//             }}>
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
//               <div style={{
//                 display: "flex", alignItems: "center",
//                 justifyContent: "center", gap: "10px", marginBottom: "10px",
//               }}>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//                 <span style={{
//                   fontSize: "11px", fontWeight: 600, color: "#6b7280",
//                   whiteSpace: "nowrap", padding: "3px 12px",
//                   background: "#f3f4f6", borderRadius: "999px",
//                   border: "1px solid #e5e7eb", letterSpacing: "0.05em",
//                   fontFamily: "system-ui, sans-serif",
//                 }}>
//                   Page {idx + 1}{pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//               </div>

//               {/* A4 card — exact dimensions, no scroll */}
//               <div style={{
//                 width:      `${A4_W}px`,
//                 height:     `${A4_H}px`,
//                 overflow:   "hidden",
//                 background: "white",
//                 boxShadow:  "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                 borderRadius: "2px",
//                 flexShrink: 0,
//               }}>
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{
//                     width:         `${A4_W}px`,
//                     height:        `${A4_H}px`,
//                     border:        "none",
//                     display:       "block",
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

// export default TemplateOne;

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
// import { ResumeProps } from "@/app/types";
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
// //   .t1-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

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

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   // box-sizing: border-box on .t1-resume is the key:
//   //   width:794px + padding:57px → inner text area = 680px = PDF content width
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t1-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip
//          so that scrollHeight = pure content height, matching Puppeteer's 1009px slices */
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//     }

//     .t1-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── HEADER ── */
//     .t1-contact-info {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 1px solid #eee;
//     }
//     .t1-name      { font-size: 24px; font-weight: 700; margin-bottom: 4px; line-height: 1.2; }
//     .t1-job-title { font-size: 16px; color: #333; margin-bottom: 8px; }
//     .t1-address   { font-size: 14px; color: #666; margin-bottom: 10px; }
//     .t1-contact-details {
//       font-size: 14px; color: #444; margin-bottom: 10px;
//       display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;
//     }
//     .t1-contact-details span { padding: 2px 8px; }
//     .t1-links { margin-top: 5px; text-align: center; }
//     .t1-link-item { color: #0077b5; text-decoration: none; font-size: 14px; padding: 2px 8px; }

//     /* ── SECTIONS ── */
//     .t1-section-content { margin-bottom: 16px; }
//     .t1-section-title {
//       background: #f0f0f0; padding: 6px 10px; font-weight: 700;
//       margin: 12px 0 8px; font-size: 16px; border-left: 3px solid #333;
//       page-break-after: avoid; break-after: avoid;
//     }

//     /* ── ITEM LAYOUT ── */
//     .t1-item-header {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       margin-bottom: 6px; flex-wrap: wrap; gap: 10px;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t1-item-title-container { min-width: 200px; flex: 1; }
//     .t1-item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
//     .t1-item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
//     .t1-item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
//     .t1-experience-date, .t1-education-date {
//       font-size: 12px; color: #666; padding: 2px 6px;
//       background: #f8f8f8; border-radius: 3px; line-height: 1.4;
//     }
//     .t1-education-grade {
//       font-size: 12px; color: #666; font-weight: 500;
//       background: #f0f0f0; padding: 2px 8px; border-radius: 3px;
//     }

//     /* ── RICH TEXT ── */
//     .t1-item-content, .t1-summary-text, .t1-experience-description,
//     .t1-education-description, .t1-project-description,
//     .t1-custom-section-content, .t1-skills-content {
//       font-size: 13px; line-height: 1.5; color: #444;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t1-summary-text, .t1-skills-content { padding: 0 5px; }
//     .t1-experience-description, .t1-education-description { margin-top: 5px; }

//     .t1-experience-description ul, .t1-experience-description ol,
//     .t1-education-description ul,  .t1-education-description ol,
//     .t1-project-description ul,    .t1-project-description ol,
//     .t1-custom-section-content ul, .t1-custom-section-content ol,
//     .t1-summary-text ul,           .t1-summary-text ol,
//     .t1-skills-content ul,         .t1-skills-content ol {
//       margin: 8px 0 8px 20px !important; padding-left: 0 !important;
//     }
//     .t1-experience-description ul, .t1-summary-text ul, .t1-skills-content ul { list-style-type: disc !important; }
//     .t1-experience-description ol, .t1-summary-text ol, .t1-skills-content ol { list-style-type: decimal !important; }
//     .t1-experience-description li, .t1-education-description li,
//     .t1-project-description li,    .t1-custom-section-content li,
//     .t1-summary-text li,           .t1-skills-content li {
//       margin-bottom: 4px !important; line-height: 1.5 !important;
//       font-size: 13px !important; page-break-inside: avoid; break-inside: avoid;
//     }

//     /* ── PROJECTS ── */
//     .t1-project-item { margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; }
//     .t1-project-header {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
//     }
//     .t1-project-title      { font-weight: 700; font-size: 15px; color: #222; }
//     .t1-project-links      { display: flex; gap: 12px; }
//     .t1-project-link       { font-size: 11px; color: #0077b5; text-decoration: none; }
//     .t1-project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

//     /* ── PRINT ── */
//     @media print {
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; }
//       .t1-resume { width: 100% !important; padding: 0 !important; }
//       .t1-project-link, .t1-link-item { color: #000 !important; text-decoration: underline !important; }
//       .t1-section-title { page-break-after: avoid; break-after: avoid; }
//       .t1-experience-item, .t1-education-item, .t1-project-item {
//         page-break-inside: avoid; break-inside: avoid;
//       }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   // forPDF=true  → adds override to strip width/padding so Puppeteer's 15mm margin owns the spacing
//   // forPDF=false → .t1-resume keeps width:794px + padding:57px (preview mode)
//   const generateHTML = useCallback(
//     (forPDF = false): string => {
//       const richText = (html: string, cls: string) => {
//         if (!html) return "";
//         const clean = cleanQuillHTML(html);
//         if (!clean || clean === "<p><br></p>") return "";
//         return `<div class="t1-item-content ${cls}">${clean}</div>`;
//       };
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       const header = `
//       <div class="t1-contact-info">
//         <div class="t1-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="t1-job-title">${
//           typeof contact?.jobTitle === "string"
//             ? contact.jobTitle
//             : (contact?.jobTitle as any)?.name || ""
//         }</div>
//         ${addressParts.length ? `<div class="t1-address">${addressParts.join(", ")}</div>` : ""}
//         <div class="t1-contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//         </div>
//         <div class="t1-links">
//           ${linkedinUrl ? `<a href="${href(linkedinUrl)}"  class="t1-link-item" target="_blank">LinkedIn</a>` : ""}
//           ${githubUrl ? `<a href="${href(githubUrl)}"    class="t1-link-item" target="_blank">GitHub</a>` : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="t1-link-item" target="_blank">Portfolio</a>` : ""}
//         </div>
//       </div>`;

//       const summaryBlock = summary
//         ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Summary</div>
//         ${richText(summary.replace(/\n/g, "<br>"), "t1-summary-text")}
//       </div>`
//         : "";

//       const expBlock = experiences.length
//         ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const s = formatMonthYear(exp.startDate, false);
//             const e = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : "Present";
//             return `<div class="t1-experience-item" style="margin-bottom:16px">
//             <div class="t1-item-header">
//               <div class="t1-item-title-container">
//                 <div class="t1-item-title">${exp.jobTitle || ""}</div>
//                 <div class="t1-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//               </div>
//               <div class="t1-item-date t1-experience-date">${s} - ${e}</div>
//             </div>
//             ${exp.text ? richText(exp.text, "t1-experience-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//         : "";

//       const projBlock = projects.length
//         ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="t1-project-item">
//             <div class="t1-project-header">
//               <div class="t1-project-title">${p.title || ""}</div>
//               ${
//                 p.liveUrl || p.githubUrl
//                   ? `
//                 <div class="t1-project-links">
//                   ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="t1-project-link" target="_blank">Live Demo</a>` : ""}
//                   ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t1-project-link" target="_blank">GitHub</a>` : ""}
//                 </div>`
//                   : ""
//               }
//             </div>
//             ${p.techStack?.length ? `<div class="t1-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? richText(p.description, "t1-project-description") : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//         : "";

//       const eduBlock = educations.length
//         ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr =
//               edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                 : "";
//             return `<div class="t1-education-item" style="margin-bottom:16px">
//             <div class="t1-item-header">
//               <div class="t1-item-title-container">
//                 <div class="t1-item-title">${edu.degree || ""}</div>
//                 <div class="t1-item-subtitle">
//                   ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                   ${edu.schoolname && edu.location ? " — " : ""}
//                   ${edu.location ? `<span>${edu.location}</span>` : ""}
//                   ${(edu.schoolname || edu.location) && grade ? " • " : ""}
//                   ${grade ? `<span class="t1-education-grade">${grade}</span>` : ""}
//                 </div>
//               </div>
//               ${dateStr ? `<div class="t1-item-date t1-education-date">${dateStr}</div>` : ""}
//             </div>
//             ${edu.text ? richText(edu.text, "t1-education-description") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//         : "";

//       const skillsClean = cleanQuillHTML(skills || "");
//       const skillsBlock =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `
//       <div class="t1-section-content">
//         <div class="t1-section-title">Skills</div>
//         <div class="t1-skills-content">${skillsClean}</div>
//       </div>`
//           : "";

//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? `<div class="t1-section-content">
//             ${finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map(
//                 (s: any) => `
//                 <div class="t1-custom-section">
//                   ${s.name ? `<div class="t1-section-title">${s.name}</div>` : ""}
//                   ${s.description ? richText(s.description, "t1-custom-section-content") : ""}
//                 </div>`,
//               )
//               .join("")}
//           </div>`
//           : "";

//       // PDF override: strip the fixed width/padding from .t1-resume so Puppeteer's
//       // own 15mm margins control the layout — exactly 680px of text width either way.
//       const pdfOverrideStyle = forPDF
//         ? `<style>.t1-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume</title>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t1-resume">
//     ${header}
//     ${summaryBlock}
//     ${expBlock}
//     ${projBlock}
//     ${eduBlock}
//     ${skillsBlock}
//     ${customBlock}
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
//       finalize,
//       summary,
//       addressParts,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — mirrors Puppeteer's page-break-inside:avoid logic
//   //
//   // PROBLEM WITH NAIVE PIXEL SLICING:
//   //   Puppeteer honours CSS `page-break-inside: avoid` / `break-inside: avoid`.
//   //   When a block element (education item, experience item, project, section
//   //   title) would be split across a page boundary, Puppeteer pushes the WHOLE
//   //   element to the next page. A naive `i × 1009px` slice ignores this and
//   //   cuts mid-element — so the preview shows different page breaks than the PDF.
//   //
//   // OUR SOLUTION — element-aware page break calculation:
//   //   1. Collect every "avoid-break" element: all descendants of .t1-resume
//   //      that have page-break-inside:avoid or break-inside:avoid in their
//   //      computed style, PLUS .t1-section-title elements (break-after:avoid).
//   //   2. Walk a sorted list of their {top, bottom} positions (relative to
//   //      .t1-resume top).
//   //   3. Starting from y=0, advance a cursor. When the cursor would exceed
//   //      the current page boundary (pageStart + PAGE_CONTENT_H):
//   //        a. Find the last avoid-break element whose top < page boundary.
//   //        b. If that element's bottom > page boundary → its top becomes the
//   //           actual page cut point (element pushed to next page).
//   //        c. Otherwise → cut at the natural PAGE_CONTENT_H boundary.
//   //   4. Use those cut points as contentOffsetY values for each page iframe.
//   //
//   // Each page iframe layout (identical to previous approach):
//   //   [MARGIN px white top]
//   //   [PAGE_CONTENT_H px content clip, shifted by -contentOffsetY]
//   //   [MARGIN px white bottom]
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
//           const resume = doc.querySelector<HTMLElement>(".t1-resume");
//           if (!resume) {
//             resolve([fullHtml]);
//             return;
//           }

//           const resumeTop =
//             resume.getBoundingClientRect().top +
//             (doc.documentElement.scrollTop || doc.body.scrollTop);
//           const totalH = resume.scrollHeight;

//           // ── Collect avoid-break elements ──────────────────────────────────
//           // These are elements Puppeteer will never split across a page boundary.
//           const AVOID_SELECTORS = [
//             ".t1-experience-item",
//             ".t1-education-item",
//             ".t1-project-item",
//             ".t1-section-title",
//             ".t1-item-header",
//             ".t1-custom-section",
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
//               // Only track elements large enough to matter (> 8px)
//               if (elBot - elTop > 8) blocks.push({ top: elTop, bottom: elBot });
//             });

//           // Sort by top position
//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate actual page cut points ──────────────────────────────
//           // pageStarts[i] = content Y where page i begins (relative to resume top)
//           const pageStarts: number[] = [0];

//           while (true) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;

//             if (naiveCut >= totalH) break; // last page, no more cuts needed

//             // Find blocks that straddle the naive cut line
//             // (their top is before the cut AND their bottom is after the cut)
//             let actualCut = naiveCut;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break; // past cut, no conflict
//               if (block.bottom <= currentStart) continue; // before this page
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 // This block starts on this page but overflows → push to next page
//                 // The cut happens at block.top (the block starts the next page)
//                 actualCut = block.top;
//                 break;
//               }
//             }

//             // Safety: if actualCut == currentStart the block is larger than a
//             // full page — just cut at naiveCut to avoid infinite loop
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
//     /* Full A4 white sheet — provides top + bottom white margin */
//     .page-margin-box {
//       position: relative;
//       width: ${A4_W}px;
//       height: ${A4_H}px;
//       background: white;
//       overflow: hidden;
//     }
//     /* Content window between the two margins */
//     .page-content-clip {
//       position: absolute;
//       top: ${MARGIN}px;
//       left: 0;
//       width: ${A4_W}px;
//       height: ${PAGE_CONTENT_H}px;
//       overflow: hidden;
//     }
//     /* Shifts the resume so the correct content slice is at top:0 of the clip */
//     .page-shift {
//       position: absolute;
//       top: ${-contentOffsetY}px;
//       left: 0;
//       width: ${A4_W}px;
//     }
//     /* Match measurement iframe exactly — no top/bottom padding */
//     .t1-resume {
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

//         // Wait for web fonts + one rAF so layout is fully flushed
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
//     setHtmlContent(generateHTML());
//   }, [generateHTML]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download ─────────────────────────────────────────────────────────
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

//   // ── RENDER ───────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ── Invisible measurement iframe (off-screen, never shown) ── */}
//       <iframe
//         ref={measureRef}
//         title="resume-measure"
//         aria-hidden="true"
//         style={{
//           position: "fixed",
//           top: "-99999px",
//           left: "-99999px",
//           width: `${A4_W}px`,
//           // Tall enough for many pages so scrollHeight is never clipped
//           height: `${A4_H * 10}px`,
//           border: "none",
//           visibility: "hidden",
//           pointerEvents: "none",
//         }}
//         sandbox="allow-same-origin allow-scripts"
//       />

//       {/* ── Download button (only on /download-resume route) ── */}
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
//      {/* )}  */}

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

//               {/* A4 card — exact dimensions, no scroll */}
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

// export default TemplateOne;

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
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// PIXEL-PERFECT A4 CONSTANTS
//
// PDF renderer (Puppeteer) options:
//   page: A4  →  210 mm × 297 mm
//   margin: 15 mm on all sides
//
// At 96 dpi: 1 mm = 3.7795275591 px
//   210 mm → 793.70 px  → A4_W        = 794
//   297 mm → 1122.52 px → A4_H        = 1123
//    15 mm →  56.69 px  → MARGIN       = 57
//
// CRITICAL — how Puppeteer pages content:
//   Puppeteer renders with 15mm margins, so EACH PAGE has:
//     top margin    = 57px  (white space)
//     content area  = 1009px  ← this is where content sits
//     bottom margin = 57px  (white space)
//     total         = 1123px
//
//   Content is paginated in 1009px SLICES, not 1123px slices.
//   Page N content starts at: N × 1009px (content offset)
//   Displayed at:             N × 1123px + 57px (with margin offset)
//
// For the preview to match, we must:
//   1. Cut content every PAGE_CONTENT_H (1009px) — same as Puppeteer
//   2. Render each page with MARGIN (57px) top/bottom white space
//   3. Page card height = A4_H (1123px) = MARGIN + content + MARGIN
//
// CRITICAL — box-sizing: border-box:
//   .t1-resume { width: 794px; padding: 57px; box-sizing: border-box }
//   → inner text width = 794 - 57 - 57 = 680 px
//   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794; // px — A4 width at 96 dpi
const A4_H = 1123; // px — A4 height at 96 dpi
const MARGIN = 57; // px — 15 mm at 96 dpi
const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const measureRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

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

  // ── CSS ──────────────────────────────────────────────────────────────────
  // box-sizing: border-box on .t1-resume is the key:
  //   width:794px + padding:57px → inner text area = 680px = PDF content width
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t1-resume {
      width: ${A4_W}px;
      /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip
         so that scrollHeight = pure content height, matching Puppeteer's 1009px slices */
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: 'Poppins', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }

    .t1-resume p {
      margin: 0 0 6px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* ── HEADER ── */
    .t1-contact-info {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .t1-name      { font-size: 24px; font-weight: 700; margin-bottom: 4px; line-height: 1.2; }
    .t1-job-title { font-size: 16px; color: #333; margin-bottom: 8px; }
    .t1-address   { font-size: 14px; color: #666; margin-bottom: 10px; }
    .t1-contact-details {
      font-size: 14px; color: #444; margin-bottom: 10px;
      display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;
    }
    .t1-contact-details span { padding: 2px 8px; }
    .t1-links { margin-top: 5px; text-align: center; }
    .t1-link-item { color: #0077b5; text-decoration: none; font-size: 14px; padding: 2px 8px; }

    /* ── SECTIONS ── */
    .t1-section-content { margin-bottom: 16px; }
    .t1-section-title {
      background: #f0f0f0; padding: 6px 10px; font-weight: 700;
      margin: 12px 0 8px; font-size: 16px; border-left: 3px solid #333;
      page-break-after: avoid; break-after: avoid;
    }

    /* ── ITEM LAYOUT ── */
    .t1-item-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 6px; flex-wrap: wrap; gap: 10px;
      page-break-after: avoid; break-after: avoid;
    }
    .t1-item-title-container { min-width: 200px; flex: 1; }
    .t1-item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
    .t1-item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
    .t1-item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
    .t1-experience-date, .t1-education-date {
      font-size: 12px; color: #666; padding: 2px 6px;
      background: #f8f8f8; border-radius: 3px; line-height: 1.4;
    }
    .t1-education-grade {
      font-size: 12px; color: #666; font-weight: 500;
      background: #f0f0f0; padding: 2px 8px; border-radius: 3px;
    }

    /* ── RICH TEXT ── */
    .t1-item-content, .t1-summary-text, .t1-experience-description,
    .t1-education-description, .t1-project-description,
    .t1-custom-section-content, .t1-skills-content {
      font-size: 13px; line-height: 1.5; color: #444;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .t1-summary-text, .t1-skills-content { padding: 0 5px; }
    .t1-experience-description, .t1-education-description { margin-top: 5px; }

    .t1-experience-description ul, .t1-experience-description ol,
    .t1-education-description ul,  .t1-education-description ol,
    .t1-project-description ul,    .t1-project-description ol,
    .t1-custom-section-content ul, .t1-custom-section-content ol,
    .t1-summary-text ul,           .t1-summary-text ol,
    .t1-skills-content ul,         .t1-skills-content ol {
      margin: 8px 0 8px 20px !important; padding-left: 0 !important;
    }
    .t1-experience-description ul, .t1-summary-text ul, .t1-skills-content ul { list-style-type: disc !important; }
    .t1-experience-description ol, .t1-summary-text ol, .t1-skills-content ol { list-style-type: decimal !important; }
    .t1-experience-description li, .t1-education-description li,
    .t1-project-description li,    .t1-custom-section-content li,
    .t1-summary-text li,           .t1-skills-content li {
      margin-bottom: 4px !important; line-height: 1.5 !important;
      font-size: 13px !important; page-break-inside: avoid; break-inside: avoid;
    }

    /* ── PROJECTS ── */
    .t1-project-item { margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; }
    .t1-project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
    }
    .t1-project-title      { font-weight: 700; font-size: 15px; color: #222; }
    .t1-project-links      { display: flex; gap: 12px; }
    .t1-project-link       { font-size: 11px; color: #0077b5; text-decoration: none; }
    .t1-project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

    /* ── PRINT ── */
    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; }
      .t1-resume { width: 100% !important; padding: 0 !important; }
      .t1-project-link, .t1-link-item { color: #000 !important; text-decoration: underline !important; }
      .t1-section-title { page-break-after: avoid; break-after: avoid; }
      .t1-experience-item, .t1-education-item, .t1-project-item {
        page-break-inside: avoid; break-inside: avoid;
      }
    }
  `;

  // ── HTML builder ─────────────────────────────────────────────────────────
  // forPDF=true  → adds override to strip width/padding so Puppeteer's 15mm margin owns the spacing
  // forPDF=false → .t1-resume keeps width:794px + padding:57px (preview mode)
  const generateHTML = useCallback(
    (forPDF = false): string => {
      const richText = (html: string, cls: string) => {
        if (!html) return "";
        const clean = cleanQuillHTML(html);
        if (!clean || clean === "<p><br></p>") return "";
        return `<div class="t1-item-content ${cls}">${clean}</div>`;
      };
      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const header = `
      <div class="t1-contact-info">
        <div class="t1-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="t1-job-title">${
          typeof contact?.jobTitle === "string"
            ? contact.jobTitle
            : (contact?.jobTitle as any)?.name || ""
        }</div>
        ${addressParts.length ? `<div class="t1-address">${addressParts.join(", ")}</div>` : ""}
        <div class="t1-contact-details">
          ${contact?.email ? `<span>${contact.email}</span>` : ""}
          ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
          ${formattedDob ? `<span>${formattedDob}</span>` : ""}
        </div>
        <div class="t1-links">
          ${linkedinUrl ? `<a href="${href(linkedinUrl)}"  class="t1-link-item" target="_blank">LinkedIn</a>` : ""}
          ${githubUrl ? `<a href="${href(githubUrl)}"    class="t1-link-item" target="_blank">GitHub</a>` : ""}
          ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="t1-link-item" target="_blank">Portfolio</a>` : ""}
        </div>
      </div>`;

      const summaryBlock = summary
        ? `
      <div class="t1-section-content">
        <div class="t1-section-title">Summary</div>
        ${richText(summary.replace(/\n/g, "<br>"), "t1-summary-text")}
      </div>`
        : "";

      const expBlock = experiences.length
        ? `
      <div class="t1-section-content">
        <div class="t1-section-title">Experience</div>
        ${experiences
          .map((exp: any) => {
            const s = formatMonthYear(exp.startDate, false);
            const e = exp.endDate
              ? formatMonthYear(exp.endDate, false)
              : "Present";
            return `<div class="t1-experience-item" style="margin-bottom:16px">
            <div class="t1-item-header">
              <div class="t1-item-title-container">
                <div class="t1-item-title">${exp.jobTitle || ""}</div>
                <div class="t1-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
              </div>
              <div class="t1-item-date t1-experience-date">${s} - ${e}</div>
            </div>
            ${exp.text ? richText(exp.text, "t1-experience-description") : ""}
          </div>`;
          })
          .join("")}
      </div>`
        : "";

      const projBlock = projects.length
        ? `
      <div class="t1-section-content">
        <div class="t1-section-title">Projects</div>
        ${projects
          .map(
            (p: any) => `
          <div class="t1-project-item">
            <div class="t1-project-header">
              <div class="t1-project-title">${p.title || ""}</div>
              ${
                p.liveUrl || p.githubUrl
                  ? `
                <div class="t1-project-links">
                  ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="t1-project-link" target="_blank">Live Demo</a>` : ""}
                  ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t1-project-link" target="_blank">GitHub</a>` : ""}
                </div>`
                  : ""
              }
            </div>
            ${p.techStack?.length ? `<div class="t1-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
            ${p.description ? richText(p.description, "t1-project-description") : ""}
          </div>`,
          )
          .join("")}
      </div>`
        : "";

      const eduBlock = educations.length
        ? `
      <div class="t1-section-content">
        <div class="t1-section-title">Education</div>
        ${educations
          .map((edu: any) => {
            const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
            const dateStr =
              edu.startDate || edu.endDate
                ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
                : "";
            return `<div class="t1-education-item" style="margin-bottom:16px">
            <div class="t1-item-header">
              <div class="t1-item-title-container">
                <div class="t1-item-title">${edu.degree || ""}</div>
                <div class="t1-item-subtitle">
                  ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
                  ${edu.schoolname && edu.location ? " — " : ""}
                  ${edu.location ? `<span>${edu.location}</span>` : ""}
                  ${(edu.schoolname || edu.location) && grade ? " • " : ""}
                  ${grade ? `<span class="t1-education-grade">${grade}</span>` : ""}
                </div>
              </div>
              ${dateStr ? `<div class="t1-item-date t1-education-date">${dateStr}</div>` : ""}
            </div>
            ${edu.text ? richText(edu.text, "t1-education-description") : ""}
          </div>`;
          })
          .join("")}
      </div>`
        : "";

      const skillsClean = cleanQuillHTML(skills || "");
      const skillsBlock =
        skillsClean && skillsClean !== "<p><br></p>"
          ? `
      <div class="t1-section-content">
        <div class="t1-section-title">Skills</div>
        <div class="t1-skills-content">${skillsClean}</div>
      </div>`
          : "";

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? `<div class="t1-section-content">
            ${finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any) => `
                <div class="t1-custom-section">
                  ${s.name ? `<div class="t1-section-title">${s.name}</div>` : ""}
                  ${s.description ? richText(s.description, "t1-custom-section-content") : ""}
                </div>`,
              )
              .join("")}
          </div>`
          : "";

      // PDF override: strip the fixed width/padding from .t1-resume so Puppeteer's
      // own 15mm margins control the layout — exactly 680px of text width either way.
      const pdfOverrideStyle = forPDF
        ? `<style>.t1-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume</title>
  <style>${CSS}</style>
  ${pdfOverrideStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t1-resume">
    ${header}
    ${summaryBlock}
    ${expBlock}
    ${projBlock}
    ${eduBlock}
    ${skillsBlock}
    ${customBlock}
  </div>
</body>
</html>`;
    },
    [
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
    ],
  );

  // ─────────────────────────────────────────────────────────────────────────
  // PAGE SPLITTER — mirrors Puppeteer's page-break-inside:avoid logic
  //
  // PROBLEM WITH NAIVE PIXEL SLICING:
  //   Puppeteer honours CSS `page-break-inside: avoid` / `break-inside: avoid`.
  //   When a block element (education item, experience item, project, section
  //   title) would be split across a page boundary, Puppeteer pushes the WHOLE
  //   element to the next page. A naive `i × 1009px` slice ignores this and
  //   cuts mid-element — so the preview shows different page breaks than the PDF.
  //
  // OUR SOLUTION — element-aware page break calculation:
  //   1. Collect every "avoid-break" element: all descendants of .t1-resume
  //      that have page-break-inside:avoid or break-inside:avoid in their
  //      computed style, PLUS .t1-section-title elements (break-after:avoid).
  //   2. Walk a sorted list of their {top, bottom} positions (relative to
  //      .t1-resume top).
  //   3. Starting from y=0, advance a cursor. When the cursor would exceed
  //      the current page boundary (pageStart + PAGE_CONTENT_H):
  //        a. Find the last avoid-break element whose top < page boundary.
  //        b. If that element's bottom > page boundary → its top becomes the
  //           actual page cut point (element pushed to next page).
  //        c. Otherwise → cut at the natural PAGE_CONTENT_H boundary.
  //   4. Use those cut points as contentOffsetY values for each page iframe.
  //
  // Each page iframe layout (identical to previous approach):
  //   [MARGIN px white top]
  //   [PAGE_CONTENT_H px content clip, shifted by -contentOffsetY]
  //   [MARGIN px white bottom]
  // ─────────────────────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const iframe = measureRef.current;
        if (!iframe) {
          resolve([fullHtml]);
          return;
        }

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) {
          resolve([fullHtml]);
          return;
        }

        doc.open();
        doc.write(fullHtml);
        doc.close();

        const doSplit = () => {
          const resume = doc.querySelector<HTMLElement>(".t1-resume");
          if (!resume) {
            resolve([fullHtml]);
            return;
          }

          const resumeTop =
            resume.getBoundingClientRect().top +
            (doc.documentElement.scrollTop || doc.body.scrollTop);
          const totalH = resume.scrollHeight;

          // ── Collect avoid-break elements ──────────────────────────────────
          interface Block {
            top: number;
            bottom: number;
          }
          const blocks: Block[] = [];

          // Track elements we've already processed to avoid duplicates
          const processedElements = new Set<HTMLElement>();

          // ── Process section wrappers that contain titles ───────────────────
          // Each .t1-section-content contains a title + content that must stay together
          resume
            .querySelectorAll<HTMLElement>(".t1-section-content")
            .forEach((section) => {
              const rect = section.getBoundingClientRect();
              const top =
                rect.top -
                resumeTop +
                (doc.documentElement.scrollTop || doc.body.scrollTop);
              const bottom =
                rect.bottom -
                resumeTop +
                (doc.documentElement.scrollTop || doc.body.scrollTop);

              if (bottom - top > 8) {
                blocks.push({ top, bottom });
                processedElements.add(section);

                // Also mark all children as processed to avoid duplicates
                section.querySelectorAll<HTMLElement>("*").forEach((child) => {
                  processedElements.add(child);
                });
              }
            });

          // ── Process other avoid-break elements ─────────────────────────────
          const AVOID_SELECTORS = [
            ".t1-experience-item",
            ".t1-education-item",
            ".t1-project-item",
            ".t1-item-header",
            ".t1-custom-section",
          ].join(", ");

          resume
            .querySelectorAll<HTMLElement>(AVOID_SELECTORS)
            .forEach((el) => {
              // Skip if already processed (part of a section-content block)
              if (processedElements.has(el)) return;

              const rect = el.getBoundingClientRect();
              const elTop =
                rect.top -
                resumeTop +
                (doc.documentElement.scrollTop || doc.body.scrollTop);
              const elBot =
                rect.bottom -
                resumeTop +
                (doc.documentElement.scrollTop || doc.body.scrollTop);

              if (elBot - elTop > 8) {
                blocks.push({ top: elTop, bottom: elBot });
                processedElements.add(el);
              }
            });

          // Sort by top position
          blocks.sort((a, b) => a.top - b.top);

          // ── Calculate actual page cut points ──────────────────────────────
          // pageStarts[i] = content Y where page i begins (relative to resume top)
          const pageStarts: number[] = [0];

          while (true) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut = currentStart + PAGE_CONTENT_H;

            if (naiveCut >= totalH) break; // last page, no more cuts needed

            // Find blocks that straddle the naive cut line
            // (their top is before the cut AND their bottom is after the cut)
            let actualCut = naiveCut;

            for (const block of blocks) {
              if (block.top >= naiveCut) break; // past cut, no conflict
              if (block.bottom <= currentStart) continue; // before this page
              if (block.top >= currentStart && block.bottom > naiveCut) {
                // This block starts on this page but overflows → push to next page
                // The cut happens at block.top (the block starts the next page)
                actualCut = block.top;
                break;
              }
            }

            // Safety: if actualCut == currentStart the block is larger than a
            // full page — just cut at naiveCut to avoid infinite loop
            if (actualCut <= currentStart) actualCut = naiveCut;

            pageStarts.push(actualCut);
          }

          // ── Build one HTML doc per page ───────────────────────────────────
          const pageHtmls = pageStarts.map(
            (contentOffsetY) => `<!DOCTYPE html>
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
    /* Full A4 white sheet — provides top + bottom white margin */
    .page-margin-box {
      position: relative;
      width: ${A4_W}px;
      height: ${A4_H}px;
      background: white;
      overflow: hidden;
    }
    /* Content window between the two margins */
    .page-content-clip {
      position: absolute;
      top: ${MARGIN}px;
      left: 0;
      width: ${A4_W}px;
      height: ${PAGE_CONTENT_H}px;
      overflow: hidden;
    }
    /* Shifts the resume so the correct content slice is at top:0 of the clip */
    .page-shift {
      position: absolute;
      top: ${-contentOffsetY}px;
      left: 0;
      width: ${A4_W}px;
    }
    /* Match measurement iframe exactly — no top/bottom padding */
    .t1-resume {
      width: ${A4_W}px !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      padding-left: ${MARGIN}px !important;
      padding-right: ${MARGIN}px !important;
      margin: 0 !important;
    }
  </style>
</head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">
        ${resume.outerHTML}
      </div>
    </div>
  </div>
</body>
</html>`,
          );

          resolve(pageHtmls);
        };

        // Wait for web fonts + one rAF so layout is fully flushed
        const win = iframe.contentWindow as any;
        if (win?.document?.fonts?.ready) {
          win.document.fonts.ready.then(() => {
            typeof win.requestAnimationFrame === "function"
              ? win.requestAnimationFrame(doSplit)
              : setTimeout(doSplit, 0);
          });
        } else {
          setTimeout(doSplit, 350);
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
    setHtmlContent(generateHTML());
  }, [generateHTML]);

  useEffect(() => {
    if (!htmlContent) return;
    splitIntoPages(htmlContent).then(setPages);
  }, [htmlContent, splitIntoPages]);

  // ── PDF download ─────────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    try {
      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        {
          html: generateHTML(true),
        },
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

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Invisible measurement iframe (off-screen, never shown) ── */}
      <iframe
        ref={measureRef}
        title="resume-measure"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-99999px",
          left: "-99999px",
          width: `${A4_W}px`,
          // Tall enough for many pages so scrollHeight is never clipped
          height: `${A4_H * 10}px`,
          border: "none",
          visibility: "hidden",
          pointerEvents: "none",
        }}
        sandbox="allow-same-origin allow-scripts"
      />

      {/* ── Download button (only on /download-resume route) ── */}
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
      {/* )}  */}

      {alldata ? (
        // ── THUMBNAIL mode: first page only, scaled 36% ──────────────────
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
        // ── FULL PREVIEW mode: paginated A4 pages ────────────────────────
        <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
          {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
            <div key={idx} style={{ marginBottom: "28px" }}>
              {/* Page pill */}
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

              {/* A4 card — exact dimensions, no scroll */}
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

export default TemplateOne;
