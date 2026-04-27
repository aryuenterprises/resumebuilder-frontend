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

"use client";
import React, { useContext } from "react";
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

// Helper function to strip HTML tags
const stripHtmlHelper = (html: string) =>
  html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
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

  // Helper function to check if skills are categorized
  const isCategorizedSkills = (skillsData: any[]) => {
    if (!skillsData || skillsData.length === 0) return false;
    return skillsData[0]?.title !== undefined;
  };

  // Helper function to render skills based on format
  const renderSkills = () => {
    if (!skills || skills.length === 0) return null;

    const isCategorized = isCategorizedSkills(skills);

    if (isCategorized) {
      return (
        <div className="section-content">
          <div className="section-title">Skills</div>
          <div className="skills-container">
            {skills.map((category: any) => (
              <div key={category.id} className="skill-category">
                <div className="skill-category-title">{category.title}</div>
                <div className="skills-list">
                  {category?.skills?.map((skill: any) => (
                    <span key={skill.id} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="section-content">
          <div className="section-title">Skills</div>
          <div className="skills-list">
            {skills.map((skill: any, index: number) => (
              <span key={skill.id || index} className="skill-tag">
                {skill.name || skill.skill}
              </span>
            ))}
          </div>
        </div>
      );
    }
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div className="section-content">
        <div className="section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="project-item">
            <div className="project-header">
              <div className="project-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
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
                      className="project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="project-description"
                dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — shared between preview & PDF
  ====================================================== */
  const styles = `
 .t1-resume  body {
    margin: 0;
    padding: 0;
    background-color: white;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  .t1-resume  {
    width: 210mm;
    // min-height: 297mm;
    padding: 15mm;
    box-sizing: border-box;
    background-color: white;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  .t1-resume.is-preview {
    transform: scale(0.36);
    transform-origin: top left;
    width: 210mm;
    padding:20px;
    height: auto;
    max-height: none;
    min-height: auto;
    max-width: none;
    min-width: auto;
    overflow: hidden;
  }

  /* Global <p> reset */
  .t1-resume p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* HEADER */
  .t1-resume .contact-info {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    page-break-after: avoid;
    break-after: avoid;
  }

  .t1-resume .contact-info .name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
    line-height: 1.2;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .contact-info .job-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .contact-info .address {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .contact-details {
    font-size: 14px;
    color: #444;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .t1-resume .contact-details span {
    padding: 2px 8px;
  }

  .t1-resume .links {
    margin-top: 5px;
    text-align: center;
  }

  .t1-resume .link-item {
    color: #0077b5;
    text-decoration: none;
    font-size: 14px;
    padding: 2px 8px;
  }

  /* Heading Styles */
  .t1-resume .resume-heading {
    font-weight: 700;
    margin: 12px 0 8px 0;
    line-height: 1.4;
    page-break-after: avoid;
    break-after: avoid;
  }

  .t1-resume h1.resume-heading {
    font-size: 20px;
  }

  .t1-resume h2.resume-heading {
    font-size: 18px;
  }

  .t1-resume h3.resume-heading {
    font-size: 16px;
  }

  /* SECTIONS */
  .t1-resume .section-content {
    margin-bottom: 16px;
  }

  .t1-resume .section-title {
    background: #f0f0f0;
    padding: 6px 10px;
    text-align: left;
    font-weight: 700;
    margin: 12px 0 8px;
    font-size: 16px;
    line-height: 1.4;
    border-left: 3px solid #333;
    font-family: 'Poppins', Arial, sans-serif;
    page-break-after: avoid;
    break-after: avoid;
  }

  /* SKILLS STYLES - COMPACT & CLEAN */
  .t1-resume .skills-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .t1-resume .skill-category {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .t1-resume .skill-category-title {
    font-weight: 600;
    font-size: 14px;
    color: #333;
    margin-bottom: 6px;
    padding-bottom: 2px;
    border-bottom: 1px solid #e0e0e0;
    display: inline-block;
  }

  .t1-resume .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }

  .t1-resume .skill-tag {
    display: inline-block;
    background: #f5f5f5;
    padding: 4px 10px;
    font-size: 12px;
    color: #444;
    border-radius: 3px;
    line-height: 1.4;
    white-space: nowrap;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* PROJECTS STYLES */
  .t1-resume .project-item {
    margin-bottom: 16px;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .t1-resume .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t1-resume .project-title {
    font-weight: 700;
    font-size: 15px;
    color: #222;
  }

  .t1-resume .project-links {
    display: flex;
    gap: 12px;
  }

  .t1-resume .project-link {
    font-size: 11px;
    color: #0077b5;
    text-decoration: none;
  }

  .t1-resume .project-tech-stack {
    font-size: 12px;
    color: #666;
    margin: 4px 0 6px;
  }

  .t1-resume .project-description {
    font-size: 13px;
    line-height: 1.5;
    color: #444;
    margin-top: 6px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  /* Rich Text Content Styles */
  .t1-resume .experience-description ul,
  .t1-resume .experience-description ol,
  .t1-resume .education-description ul,
  .t1-resume .education-description ol,
  .t1-resume .project-description ul,
  .t1-resume .project-description ol,
  .t1-resume .custom-section-content ul,
  .t1-resume .custom-section-content ol,
  .t1-resume .summary-text ul,
  .t1-resume .summary-text ol {
    margin: 8px 0 8px 20px !important;
    padding-left: 0 !important;
  }

  .t1-resume .experience-description li,
  .t1-resume .education-description li,
  .t1-resume .project-description li,
  .t1-resume .custom-section-content li,
  .t1-resume .summary-text li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t1-resume .experience-description strong,
  .t1-resume .education-description strong,
  .t1-resume .project-description strong,
  .t1-resume .custom-section-content strong,
  .t1-resume .summary-text strong {
    font-weight: 700 !important;
  }

  .t1-resume .experience-description em,
  .t1-resume .education-description em,
  .t1-resume .project-description em,
  .t1-resume .custom-section-content em,
  .t1-resume .summary-text em {
    font-style: italic !important;
  }

  .t1-resume .experience-description u,
  .t1-resume .education-description u,
  .t1-resume .project-description u,
  .t1-resume .custom-section-content u,
  .t1-resume .summary-text u {
    text-decoration: underline !important;
  }

  .t1-resume .experience-description h1,
  .t1-resume .experience-description h2,
  .t1-resume .experience-description h3,
  .t1-resume .education-description h1,
  .t1-resume .education-description h2,
  .t1-resume .education-description h3 {
    margin: 12px 0 6px 0;
    font-weight: 600;
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Resume Lists */
  .t1-resume .resume-list {
    margin: 8px 0 8px 20px !important;
    padding-left: 0 !important;
  }

  .t1-resume ol.resume-list {
    list-style-type: decimal !important;
  }

  .t1-resume ul.resume-list {
    list-style-type: disc !important;
  }

  .t1-resume .resume-list li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Better spacing for content */
  .t1-resume .experience-description,
  .t1-resume .education-description,
  .t1-resume .project-description,
  .t1-resume .custom-section-content,
  .t1-resume .summary-text {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  /* Handle line breaks properly */
  .t1-resume .experience-description br,
  .t1-resume .education-description br,
  .t1-resume .project-description br,
  .t1-resume .custom-section-content br {
    display: block;
    margin: 4px 0;
    content: "";
  }

  /* ITEM HEADERS */
  .t1-resume .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
    flex-wrap: wrap;
    gap: 10px;
    page-break-after: avoid;
    break-after: avoid;
  }

  .t1-resume .experience-header,
  .t1-resume .education-header {
    align-items: baseline;
  }

  .t1-resume .item-title-container {
    min-width: 200px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t1-resume .item-title {
    font-weight: 700;
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 2px;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .item-subtitle {
    font-size: 13px;
    color: #555;
    margin-top: 2px;
    line-height: 1.4;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .item-date {
    white-space: nowrap;
    font-size: 12px;
    color: #777;
    min-width: fit-content;
    text-align: right;
  }

  .t1-resume .experience-date,
  .t1-resume .education-date {
    font-size: 12px;
    color: #666;
    padding: 2px 6px;
    background: #f8f8f8;
    border-radius: 3px;
    line-height: 1.4;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* Education Grade Styles */
  .t1-resume .education-grade {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
    font-weight: 500;
    display: inline-block;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 3px;
  }

  /* CONTENT */
  .t1-resume .item-content {
    font-size: 13px;
    line-height: 1.5;
    color: #444;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .item-content p,
  .t1-resume .experience-description p,
  .t1-resume .education-description p,
  .t1-resume .summary-text p,
  .t1-resume .custom-section-content p,
  .t1-resume .project-description p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
    font-size: 13px !important;
    font-family: 'Poppins', Arial, sans-serif !important;
  }

  .t1-resume .summary-text {
    padding: 0 5px;
    font-size: 13px;
    line-height: 1.5;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .experience-description,
  .t1-resume .education-description {
    margin-top: 5px;
    text-align: left;
    font-size: 13px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* LIST STYLES */
  .t1-resume .experience-description ul,
  .t1-resume .education-description ul,
  .t1-resume .experience-list,
  .t1-resume .education-list {
    list-style-type: disc !important;
    padding-left: 20px !important;
    margin: 5px 0 !important;
  }

  .t1-resume .experience-description ol,
  .t1-resume .education-description ol {
    list-style-type: decimal !important;
    padding-left: 20px !important;
    margin: 5px 0 !important;
  }

  .t1-resume .experience-description li,
  .t1-resume .education-description li,
  .t1-resume .experience-list li,
  .t1-resume .education-list li {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    line-height: 1.5 !important;
    list-style-position: outside !important;
    font-size: 13px !important;
    font-family: 'Poppins', Arial, sans-serif !important;
  }

  .t1-resume .custom-section-content {
    padding-left: 5px;
  }

  .t1-resume .plain-text {
    margin: 0 0 4px 0;
    padding: 0;
    line-height: 1.5;
  }

  /* Orphan control */
  .t1-resume p,
  .t1-resume li,
  .t1-resume .item-content {
    orphans: 3;
    widows: 3;
  }

  /* PRINT */
  @media print {
    @page {
      size: A4;
      margin-top: 15mm;
      margin-bottom: 15mm;
    }

    @page :first {
      margin-top: 0;
    }

    .t1-resume body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      margin: 0;
      padding: 0;
    }

    .t1-resume {
      width: 210mm !important;
      padding: 15mm !important;
      margin: 0 !important;
      box-shadow: none !important;
      box-sizing: border-box !important;
    }

    .no-print {
      display: none !important;
    }

    .t1-resume .experience-item,
    .t1-resume .education-item,
    .t1-resume .project-item,
    .t1-resume .skill-category,
    .t1-resume .custom-section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t1-resume .section-title,
    .t1-resume h1.resume-heading,
    .t1-resume h2.resume-heading,
    .t1-resume h3.resume-heading {
      page-break-after: avoid;
      break-after: avoid;
    }

    .t1-resume .experience-description,
    .t1-resume .education-description {
      page-break-inside: auto;
      break-inside: auto;
    }

    .t1-resume .resume-list li {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t1-resume .item-header {
      page-break-after: avoid;
      break-after: avoid;
    }

    .t1-resume p,
    .t1-resume li,
    .t1-resume .item-content {
      orphans: 3;
      widows: 3;
    }
  }
`;

  /* =====================================================
     HTML GENERATION — for PDF download
  ====================================================== */
  const generateHTML = () => {
    const renderExperienceText = (text: string) => {
      if (!text) return "";

      const cleanedText = cleanQuillHTML(text);

      if (cleanedText.includes("<") && cleanedText.includes(">")) {
        return `<div class="item-content experience-description wrap-break-word">${cleanedText}</div>`;
      }
      const lines = cleanedText.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
      ) {
        return `<div class="item-content experience-description">
          <ul class="experience-list">
            ${lines
              .map((l) => {
                const t = l.trim();
                const c =
                  t.startsWith("-") || t.startsWith("•")
                    ? t.substring(1).trim()
                    : t;
                return c ? `<li>${c}</li>` : "";
              })
              .join("")}
          </ul>
        </div>`;
      }
      return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(cleanedText)}</div>`;
    };

    const renderEducationText = (text: string) => {
      if (!text) return "";

      const cleanedText = cleanQuillHTML(text);

      if (cleanedText.includes("<") && cleanedText.includes(">")) {
        return `<div class="item-content education-description">${cleanedText}</div>`;
      }
      const lines = cleanedText.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
      ) {
        return `<div class="education-content">
          <ul class="education-list">
            ${lines
              .map((l) => {
                const t = l.trim();
                const c =
                  t.startsWith("-") || t.startsWith("•")
                    ? t.substring(1).trim()
                    : t;
                return c ? `<li>${c}</li>` : "";
              })
              .join("")}
          </ul>
        </div>`;
      }
      return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(cleanedText)}</div>`;
    };

    // Format date of birth for PDF
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";

      const isCategorized = isCategorizedSkills(skills);

      if (isCategorized) {
        return `
          <div class="section-content">
            <div class="section-title">Skills</div>
            <div class="skills-container">
              ${skills
                .map(
                  (category: any) => `
                <div class="skill-category">
                  <div class="skill-category-title">${category.title}</div>
                  <div class="skills-list">
                    ${category.skills
                      .map(
                        (skill: any) => `
                      <span class="skill-tag">${skill.name}</span>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
      } else {
        return `
          <div class="section-content">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${skills
                .map(
                  (skill: any) => `
                <span class="skill-tag">${skill.name || skill.skill}</span>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="section-content">
          <div class="section-title">Projects</div>
          ${projects
            .map(
              (project: any) => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-title">${project.title || ""}</div>
                ${
                  project.liveUrl || project.githubUrl
                    ? `
                  <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                    ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
                  </div>
                `
                    : ""
                }
              </div>
              ${
                project.techStack && project.techStack.length > 0
                  ? `
                <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
              `
                  : ""
              }
              ${
                project.description
                  ? `
                <div class="project-description">${cleanQuillHTML(project.description)}</div>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    };

    // Generate custom sections HTML for PDF
    const generateCustomSectionsHTML = () => {
      if (
        !finalize ||
        Array.isArray(finalize) ||
        !Array.isArray(finalize.customSection) ||
        !finalize.customSection.some(
          (s) => s?.name?.trim() || s?.description?.trim()
        )
      ) {
        return "";
      }

      return `
        <div class="section-content">
          ${finalize.customSection
            .filter((s) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s) => `
            <div class="custom-section">
              ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
              ${s.description ? `<div class="item-content custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
            </div>
          `
            )
            .join("")}
        </div>
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t1-resume">

  <!-- HEADER -->
  <div class="contact-info">
    <div class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
    <div class="address">${addressParts.join(", ")}</div>
    <div class="contact-details">
      ${contact?.email ? `<span>${contact.email}</span>` : ""}
      ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
      ${formattedDob ? `<span>${formattedDob}</span>` : ""}
    </div>
    <div class="links">
      ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
      ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
      ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
    </div>
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `<div class="section-content">
    <div class="section-title">Summary</div>
    <div class="item-content summary-text">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
  </div>`
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences.length > 0
      ? `<div class="section-content">
    <div class="section-title">Experience</div>
    ${experiences
      .map((exp) => {
        const s = formatMonthYear(exp.startDate,  false);
        const e = exp.endDate ? formatMonthYear(exp.endDate,  false) : "Present";
        return `<div class="experience-item" style="margin-bottom:16px">
        <div class="item-header experience-header">
          <div class="item-title-container">
            <div class="item-title">${exp.jobTitle || ""}</div>
            <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
          </div>
          <div class="item-date experience-date">${s} - ${e}</div>
        </div>
        ${exp.text ? renderExperienceText(exp.text) : ""}
      </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations.length > 0
      ? `<div class="section-content">
    <div class="section-title">Education</div>
    ${educations
      .map((edu) => {
        const dateStr =
          edu.startDate || edu.endDate
            ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
            : "";
        const formattedGrade = formatGradeToCgpdAndPercentage(edu?.grade || "");
        return `<div class="education-item" style="margin-bottom:16px">
        <div class="item-header education-header">
          <div class="item-title-container">
            <div class="item-title">${edu.degree || ""}</div>
            ${
              edu.degree || edu.location || formattedGrade
                ? `<div class="item-subtitle">
              ${edu.degree ? `<span>${edu.schoolname}</span>` : ""}
              ${edu.degree && edu.location ? " — " : ""}
              ${edu.location ? `<span>${edu.location}</span>` : ""}
              ${(edu.degree || edu.location) && formattedGrade ? " • " : ""}
              ${formattedGrade ? `<span class="education-grade">${formattedGrade}</span>` : ""}
            </div>`
                : ""
            }
          </div>
          ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
        </div>
        ${renderEducationText(edu.text || "")}
      </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- CUSTOM SECTIONS -->
  ${generateCustomSectionsHTML()}

</div>
</body>
</html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML();

      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );

      const pdfBlob: Blob = res.data;

      const url: string = URL.createObjectURL(pdfBlob);
      const a: HTMLAnchorElement = document.createElement("a");

      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  console.log("context",context)

  /* ======================================================
     JSX PREVIEW
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
        className={`t1-resume bg-white ${alldata ? "is-preview" : ""} `}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
                            minHeight: "297mm",

        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="contact-info">
          <div className="name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="job-title">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="address">{addressParts.join(", ")}</div>
          <div className="contact-details">
            {contact?.email && <span>{contact.email}</span>}
            {contact?.phone && <span>{contact.phone}</span>}
            {dateOfBirth && <span>{formatDateOfBirth(dateOfBirth)}</span>}
          </div>
          <div className="links">
            {linkedinUrl && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https://${linkedinUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {githubUrl && (
              <a
                href={
                  githubUrl.startsWith("http")
                    ? githubUrl
                    : `https://${githubUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {portfolioUrl && (
              <a
                href={
                  portfolioUrl.startsWith("http")
                    ? portfolioUrl
                    : `https://${portfolioUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="section-content">
            <div className="section-title">Summary</div>
            <div
              className="item-content summary-text"
              dangerouslySetInnerHTML={{
                __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")),
              }}
            />
          </div>
        )}

        {/* EXPERIENCE */}
        {/* {experiences.length > 0 && (
          <div className="section-content">
            <div className="section-title">Experience</div>
            {experiences.map((exp, i) => ({
               const s = formatMonthYear(exp.startDate, true)
        const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
              <div
                key={i}
                className="experience-item"
                style={{ marginBottom: "16px" }}
              >
                <div className="item-header experience-header">
                  <div className="item-title-container">
                    <div className="item-title">{exp.jobTitle}</div>
                    <div className="item-subtitle">
                      {exp.employer}
                      {exp.location && ` — ${exp.location}`}
                    </div>
                  </div>
                  <div className="item-date experience-date">
                    {}
                    {" - "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate}  />
                    ) : (
                      "Present"
                    )}
                  </div>
                </div>
                {exp.text && (
                  <div
                    className="item-content experience-description wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
                  />
                )}
              </div>
}))}
          </div>
        )} */}

        {experiences.length > 0 && (
  <div className="section-content">
    <div className="section-title">Experience</div>
    {experiences.map((exp, i) => {
      // 1. Logic happens inside the braces
      const s = formatMonthYear(exp.startDate, false);
      const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";

      // 2. Return the JSX
      return (
        <div
          key={i}
          className="experience-item"
          style={{ marginBottom: "16px" }}
        >
          <div className="item-header experience-header">
            <div className="item-title-container">
              <div className="item-title">{exp.jobTitle}</div>
              <div className="item-subtitle">
                {exp.employer}
                {exp.location && ` — ${exp.location}`}
              </div>
            </div>
            <div className="item-date experience-date">
              {/* Using the formatted strings you created above */}
              {s} — {e}
            </div>
          </div>
          {exp.text && (
            <div
              className="item-content experience-description wrap-break-word"
              dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
            />
          )}
        </div>
      );
    })}
  </div>
)}

        {/* PROJECTS */}
        {renderProjects()}

        {/* EDUCATION */}
        {educations?.length > 0 && (
          <div className="section-content">
            <div className="section-title">Education</div>
            {educations.map((edu, index) => {
              const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");

              return (
                <div
                  key={edu.id || index}
                  className="education-item"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="item-header education-header">
                    <div className="item-title-container">
                      <div className="item-title">{edu.degree || ""}</div>
                      {(edu.degree || edu.location || formattedGrade) && (
                        <div className="item-subtitle">
                          {edu.degree && <span>{edu.schoolname}</span>}
                          {edu.degree && edu.location && " — "}
                          {edu.location && <span>{edu.location}</span>}
                          {(edu.degree || edu.location) &&
                            formattedGrade &&
                            " • "}
                          {formattedGrade && (
                            <span className="education-grade">
                              {formattedGrade}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="item-date education-date">
                        {edu.startDate || ""}
                        {" - "}
                        {edu.endDate || "Present"}
                      </div>
                    )}
                  </div>
                  {edu.text && (
                    <div
                      className="item-content education-description"
                      dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS */}
        {renderSkills()}

        {/* CUSTOM SECTIONS */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.customSection) &&
          finalize.customSection.some(
            (s) => s?.name?.trim() || s?.description?.trim(),
          ) && (
            <div className="section-content">
              {finalize.customSection
                .filter((s) => s?.name?.trim() || s?.description?.trim())
                .map((section, index) => (
                  <div key={section.id || index} className="custom-section">
                    {section.name && (
                      <div className="section-title custom-section-title">
                        {section.name}
                      </div>
                    )}
                    {section.description && (
                      <div
                        className="item-content custom-section-content"
                        dangerouslySetInnerHTML={{
                          __html: cleanQuillHTML(section.description),
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
      </div>
    </>
  );
};

export default TemplateOne;
















// "use client";
// import React, {
//   useContext,
//   useEffect,
//   useRef,
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
// import { motion, AnimatePresence } from "framer-motion";

// /* ─────────────────────────────────────────────────────────────────
//    A4 dimensions at 96 dpi  →  794 × 1123 px
//    The PDF renderer uses exactly these dimensions per page.
//    We render an iframe at 794px wide and show 1123px tall slices.
// ───────────────────────────────────────────────────────────────── */
// const A4_W_PX = 794; // 210mm @ 96 dpi
// const A4_H_PX = 1123; // 297mm @ 96 dpi

// const stripHtmlHelper = (html: string) =>
//   html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

// /* ─────────────────────────────────────────────────────────────────
//    Component
// ───────────────────────────────────────────────────────────────── */
// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   /* ── iframe preview state (editor mode only) ── */
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [iframeKey, setIframeKey] = useState(0);
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   /* ─────────────────────────────────────────────────────────────
//      Address / link helpers
//   ───────────────────────────────────────────────────────────── */
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

//   /* ─────────────────────────────────────────────────────────────
//      Shared CSS — identical between PDF and iframe preview
//   ───────────────────────────────────────────────────────────── */
//   const sharedCSS = `
//     * { box-sizing: border-box; }
//     body {
//       margin: 0; padding: 0; background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px; line-height: 1.5;
//     }
//     .resume {
//       width: 210mm;
//       padding: 15mm;
//       background: white;
//       font-family: 'Poppins', Arial, sans-serif;
//       font-size: 14px; line-height: 1.5;
//     }
//     p { margin: 0 0 6px 0; padding: 0; line-height: 1.5; }

//     .contact-info {
//       text-align: center; margin-bottom: 20px;
//       padding-bottom: 15px; border-bottom: 1px solid #eee;
//     }
//     .contact-info .name      { font-size: 24px; font-weight: 700; margin-bottom: 4px; line-height: 1.2; }
//     .contact-info .job-title { font-size: 16px; color: #333; margin-bottom: 8px; }
//     .contact-info .address   { font-size: 14px; color: #666; margin-bottom: 10px; }
//     .contact-details {
//       font-size: 14px; color: #444; margin-bottom: 10px;
//       display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;
//     }
//     .contact-details span { padding: 2px 8px; }
//     .links { margin-top: 5px; }
//     .link-item { color: #0077b5; text-decoration: none; font-size: 14px; padding: 2px 8px; }

//     .section-content { margin-bottom: 16px; }
//     .section-title {
//       background: #f0f0f0; padding: 6px 10px; font-weight: 700;
//       margin: 12px 0 8px; font-size: 16px; line-height: 1.4;
//       border-left: 3px solid #333;
//       page-break-after: avoid; break-after: avoid;
//     }

//     .item-header {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       margin-bottom: 6px; flex-wrap: wrap; gap: 10px;
//     }
//     .item-title-container { min-width: 200px; }
//     .item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
//     .item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
//     .item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
//     .experience-date, .education-date {
//       font-size: 12px; color: #666; padding: 2px 6px;
//       background: #f8f8f8; border-radius: 3px; line-height: 1.4;
//     }
//     .education-grade {
//       font-size: 12px; color: #666; font-weight: 500;
//       display: inline-block; background: #f0f0f0; padding: 2px 8px; border-radius: 3px;
//     }

//     .item-content  { font-size: 13px; line-height: 1.5; color: #444; }
//     .summary-text  { padding: 0 5px; font-size: 13px; line-height: 1.5; }
//     .experience-description,
//     .education-description {
//       margin-top: 5px; font-size: 13px; line-height: 1.5;
//       white-space: pre-wrap; word-wrap: break-word;
//     }
//     .item-content p, .experience-description p, .education-description p,
//     .summary-text p, .custom-section-content p, .project-description p {
//       margin: 0 0 6px 0 !important; padding: 0 !important;
//       line-height: 1.5 !important; font-size: 13px !important;
//     }

//     .experience-description ul, .education-description ul,
//     .experience-list, .education-list {
//       list-style-type: disc !important; padding-left: 20px !important; margin: 5px 0 !important;
//     }
//     .experience-description ol, .education-description ol {
//       list-style-type: decimal !important; padding-left: 20px !important; margin: 5px 0 !important;
//     }
//     .experience-description li, .education-description li,
//     .experience-list li, .education-list li {
//       margin-bottom: 2px !important; line-height: 1.5 !important;
//       list-style-position: outside !important; font-size: 13px !important;
//     }
//     .summary-text ul, .summary-text ol,
//     .custom-section-content ul, .custom-section-content ol,
//     .project-description ul, .project-description ol {
//       margin: 8px 0 8px 20px !important; padding-left: 0 !important;
//     }
//     .summary-text li, .custom-section-content li, .project-description li {
//       margin-bottom: 4px !important; line-height: 1.5 !important;
//     }
//     .experience-description strong, .education-description strong,
//     .project-description strong, .custom-section-content strong,
//     .summary-text strong { font-weight: 700 !important; }
//     .experience-description em, .education-description em,
//     .project-description em, .custom-section-content em,
//     .summary-text em { font-style: italic !important; }

//     .skills-container { display: flex; flex-direction: column; gap: 12px; }
//     .skill-category   { break-inside: avoid; page-break-inside: avoid; }
//     .skill-category-title {
//       font-weight: 600; font-size: 14px; color: #333;
//       margin-bottom: 6px; padding-bottom: 2px;
//       border-bottom: 1px solid #e0e0e0; display: inline-block;
//     }
//     .skills-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
//     .skill-tag {
//       display: inline-block; background: #f5f5f5;
//       padding: 4px 10px; font-size: 12px; color: #444;
//       border-radius: 3px; line-height: 1.4; white-space: nowrap;
//     }

//     .project-item    { margin-bottom: 16px; break-inside: avoid; page-break-inside: avoid; }
//     .project-header  { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
//     .project-title   { font-weight: 700; font-size: 15px; color: #222; }
//     .project-links   { display: flex; gap: 12px; }
//     .project-link    { font-size: 11px; color: #0077b5; text-decoration: none; }
//     .project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }
//     .project-description { font-size: 13px; line-height: 1.5; color: #444; margin-top: 6px; white-space: pre-wrap; word-wrap: break-word; }

//     .custom-section-content { padding-left: 5px; }

//     @media print {
//       @page { size: A4; margin: 15mm; }
//       @page :first { margin-top: 0; }
//       body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume { width: 210mm !important; padding: 15mm !important; margin: 0 !important; box-shadow: none !important; }
//       .experience-item, .education-item, .project-item,
//       .skill-category, .custom-section { page-break-inside: avoid; break-inside: avoid; }
//       .section-title { page-break-after: avoid; break-after: avoid; }
//       p, li, .item-content { orphans: 3; widows: 3; }
//     }
//   `;

//   /* ─────────────────────────────────────────────────────────────
//      Build the full HTML document
//      Used by BOTH the iframe preview AND the PDF download.
//      They receive the exact same HTML — guaranteed pixel match.
//   ───────────────────────────────────────────────────────────── */
//   const buildHTML = useCallback((): string => {
//     const formattedDob = formatDateOfBirth(dateOfBirth || "");
//     const isCategorized = (s: any[]) =>
//       s?.length > 0 && s[0]?.title !== undefined;

//     const jobTitle = contact?.jobTitle
//       ? typeof contact.jobTitle === "string"
//         ? contact.jobTitle
//         : (contact.jobTitle as any)?.name || ""
//       : "";

//     const skillsBlock = (): string => {
//       if (!skills?.length) return "";
//       if (isCategorized(skills)) {
//         return `<div class="section-content">
//           <div class="section-title">Skills</div>
//           <div class="skills-container">
//             ${skills
//               .map(
//                 (c: any) => `
//               <div class="skill-category">
//                 <div class="skill-category-title">${c.title}</div>
//                 <div class="skills-list">
//                   ${c.skills.map((s: any) => `<span class="skill-tag">${s.name}</span>`).join("")}
//                 </div>
//               </div>`,
//               )
//               .join("")}
//           </div>
//         </div>`;
//       }
//       return `<div class="section-content">
//         <div class="section-title">Skills</div>
//         <div class="skills-list">
//           ${skills.map((s: any) => `<span class="skill-tag">${s.name || s.skill}</span>`).join("")}
//         </div>
//       </div>`;
//     };

//     const projectsBlock = (): string => {
//       if (!projects?.length) return "";
//       return `<div class="section-content">
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
//                 ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : "https://" + p.liveUrl}"   class="project-link">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : "https://" + p.githubUrl}" class="project-link">GitHub</a>` : ""}
//               </div>`
//                   : ""
//               }
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
//             ${p.description ? `<div class="project-description">${cleanQuillHTML(p.description)}</div>` : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`;
//     };

//     const expText = (text: string): string => {
//       if (!text) return "";
//       const c = cleanQuillHTML(text);
//       if (c.includes("<") && c.includes(">"))
//         return `<div class="item-content experience-description">${c}</div>`;
//       const lines = c.split("\n").filter((l: string) => l.trim());
//       if (
//         lines.some(
//           (l: string) => l.trim().startsWith("-") || l.trim().startsWith("•"),
//         )
//       )
//         return `<div class="item-content experience-description"><ul class="experience-list">${lines
//           .map((l: string) => {
//             const t = l.trim();
//             const x =
//               t.startsWith("-") || t.startsWith("•") ? t.slice(1).trim() : t;
//             return x ? `<li>${x}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(c)}</div>`;
//     };

//     const eduText = (text: string): string => {
//       if (!text) return "";
//       const c = cleanQuillHTML(text);
//       if (c.includes("<") && c.includes(">"))
//         return `<div class="item-content education-description">${c}</div>`;
//       const lines = c.split("\n").filter((l: string) => l.trim());
//       if (
//         lines.some(
//           (l: string) => l.trim().startsWith("-") || l.trim().startsWith("•"),
//         )
//       )
//         return `<div class="item-content education-description"><ul class="education-list">${lines
//           .map((l: string) => {
//             const t = l.trim();
//             const x =
//               t.startsWith("-") || t.startsWith("•") ? t.slice(1).trim() : t;
//             return x ? `<li>${x}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(c)}</div>`;
//     };

//     const customBlock = (): string => {
//       if (
//         !finalize ||
//         Array.isArray(finalize) ||
//         !Array.isArray(finalize.customSection)
//       )
//         return "";
//       const valid = finalize.customSection.filter(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       );
//       if (!valid.length) return "";
//       return `<div class="section-content">${valid
//         .map(
//           (s: any) => `
//         <div class="custom-section">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="item-content custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//         </div>`,
//         )
//         .join("")}
//       </div>`;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${sharedCSS}</style>
// </head>
// <body>
// <div class="resume">

//   <div class="contact-info">
//     <div class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${jobTitle ? `<div class="job-title">${jobTitle}</div>` : ""}
//     ${addressParts.length ? `<div class="address">${addressParts.join(", ")}</div>` : ""}
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//       ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : "https://" + linkedinUrl}"  class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : "https://" + githubUrl}"    class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : "https://" + portfolioUrl}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
//   </div>`
//       : ""
//   }

//   ${
//     experiences.length
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp: any) => {
//         const s = formatMonthYear(exp.startDate, false);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} – ${e}</div>
//         </div>
//         ${expText(exp.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   ${projectsBlock()}

//   ${
//     educations.length
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu: any) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""} – ${edu.endDate || "Present"}`
//             : "";
//         const g = formatGradeToCgpdAndPercentage(edu?.grade || "");
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.degree || ""}</div>
//             ${
//               edu.degree || edu.location || g
//                 ? `<div class="item-subtitle">
//               ${edu.degree ? `<span>${edu.schoolname}</span>` : ""}
//               ${edu.degree && edu.location ? " — " : ""}
//               ${edu.location ? `<span>${edu.location}</span>` : ""}
//               ${(edu.degree || edu.location) && g ? " • " : ""}
//               ${g ? `<span class="education-grade">${g}</span>` : ""}
//             </div>`
//                 : ""
//             }
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${eduText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   ${skillsBlock()}
//   ${customBlock()}

// </div>
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
//     linkedinUrl,
//     portfolioUrl,
//     githubUrl,
//     dateOfBirth,
//   ]);

//   /* ─────────────────────────────────────────────────────────────
//      Re-mount iframe whenever data changes
//   ───────────────────────────────────────────────────────────── */
//   useEffect(() => {
//     if (alldata) return;
//     setIframeKey((k) => k + 1);
//     setCurrentPage(0);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     alldata,
//     summary,
//     experiences,
//     educations,
//     skills,
//     projects,
//     finalize,
//     contact,
//   ]);

//   /* Measure iframe content height → derive totalPages */
//   const handleIframeLoad = useCallback(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;
//     try {
//       const doc = iframe.contentDocument || iframe.contentWindow?.document;
//       if (!doc) return;
//       const h = Math.max(
//         doc.body.scrollHeight,
//         doc.documentElement.scrollHeight,
//       );
//       const pages = Math.max(1, Math.ceil(h / A4_H_PX));
//       setTotalPages(pages);
//       // Expand iframe height so the full content is rendered (needed for accurate scrollHeight)
//       iframe.style.height = `${pages * A4_H_PX}px`;
//     } catch (_) {
//       /* sandboxed */
//     }
//   }, []);

//   /* ─────────────────────────────────────────────────────────────
//      PDF download — uses the identical HTML as the iframe
//   ───────────────────────────────────────────────────────────── */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html = buildHTML();
//       const res: AxiosResponse<Blob> = await axios.post(
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
//     } catch (err) {
//       console.error("Error generating PDF:", err);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   /* ─────────────────────────────────────────────────────────────
//      THUMBNAIL MODE  (alldata passed — small card in listings)
//      Keeps the old scale transform; fine for tiny card previews.
//   ───────────────────────────────────────────────────────────── */
//   if (alldata) {
//     const thumbCSS = `
//       .t1-thumb { width:210mm; padding:15mm; background:#fff; font-family:'Poppins',Arial,sans-serif; font-size:14px; line-height:1.5; transform:scale(0.36); transform-origin:top left; overflow:hidden; }
//       .t1-thumb p { margin:0 0 6px 0 !important; }
//       .t1-thumb .contact-info { text-align:center; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #eee; }
//       .t1-thumb .name { font-size:24px; font-weight:700; margin-bottom:4px; }
//       .t1-thumb .job-title { font-size:16px; color:#333; margin-bottom:8px; }
//       .t1-thumb .address { font-size:14px; color:#666; margin-bottom:10px; }
//       .t1-thumb .contact-details { font-size:14px; color:#444; margin-bottom:10px; display:flex; justify-content:center; flex-wrap:wrap; gap:12px; }
//       .t1-thumb .contact-details span { padding:2px 8px; }
//       .t1-thumb .links { margin-top:5px; }
//       .t1-thumb .link-item { color:#0077b5; text-decoration:none; font-size:14px; padding:2px 8px; }
//       .t1-thumb .section-content { margin-bottom:16px; }
//       .t1-thumb .section-title { background:#f0f0f0; padding:6px 10px; font-weight:700; margin:12px 0 8px; font-size:16px; border-left:3px solid #333; }
//       .t1-thumb .item-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px; flex-wrap:wrap; gap:10px; }
//       .t1-thumb .item-title { font-weight:700; font-size:15px; line-height:1.4; margin-bottom:2px; }
//       .t1-thumb .item-subtitle { font-size:13px; color:#555; margin-top:2px; }
//       .t1-thumb .item-date { white-space:nowrap; font-size:12px; color:#777; }
//       .t1-thumb .experience-date, .t1-thumb .education-date { font-size:12px; color:#666; padding:2px 6px; background:#f8f8f8; border-radius:3px; }
//       .t1-thumb .education-grade { font-size:12px; color:#666; font-weight:500; background:#f0f0f0; padding:2px 8px; border-radius:3px; }
//       .t1-thumb .item-content { font-size:13px; line-height:1.5; color:#444; }
//       .t1-thumb .summary-text { padding:0 5px; font-size:13px; }
//       .t1-thumb .experience-description, .t1-thumb .education-description { margin-top:5px; font-size:13px; line-height:1.5; }
//       .t1-thumb .experience-description ul, .t1-thumb .education-description ul { list-style-type:disc !important; padding-left:20px !important; margin:5px 0 !important; }
//       .t1-thumb .experience-description li, .t1-thumb .education-description li { margin-bottom:2px !important; font-size:13px !important; }
//       .t1-thumb .skills-list { display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
//       .t1-thumb .skill-tag { background:#f5f5f5; padding:4px 10px; font-size:12px; color:#444; border-radius:3px; }
//       .t1-thumb .skill-category-title { font-weight:600; font-size:14px; color:#333; margin-bottom:6px; border-bottom:1px solid #e0e0e0; display:inline-block; }
//       .t1-thumb .project-title { font-weight:700; font-size:15px; color:#222; }
//       .t1-thumb .project-tech-stack { font-size:12px; color:#666; margin:4px 0 6px; }
//       .t1-thumb .project-description { font-size:13px; line-height:1.5; color:#444; margin-top:6px; }
//     `;

//     const jobTitleThumb = contact?.jobTitle
//       ? typeof contact.jobTitle === "string"
//         ? contact.jobTitle
//         : (contact.jobTitle as any)?.name || ""
//       : "";
//     const isCat = (s: any[]) => s?.length > 0 && s[0]?.title !== undefined;

//     return (
//       <div className="t1-thumb bg-white" style={{ margin: "0 auto" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{thumbCSS}</style>

//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           {jobTitleThumb && <div className="job-title">{jobTitleThumb}</div>}
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

//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp: any, i: number) => {
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
//                   <div className="item-header">
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
//                       className="item-content experience-description"
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

//         {projects?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Projects</div>
//             {projects.map((p: any, i: number) => (
//               <div key={p.id || i} className="project-item">
//                 <div className="project-title">{p.title}</div>
//                 {p.techStack?.length > 0 && (
//                   <div className="project-tech-stack">
//                     <strong>Tech:</strong> {p.techStack.join(" • ")}
//                   </div>
//                 )}
//                 {p.description && (
//                   <div
//                     className="project-description"
//                     dangerouslySetInnerHTML={{
//                       __html: cleanQuillHTML(p.description),
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu: any, i: number) => {
//               const g = formatGradeToCgpdAndPercentage(edu.grade || "");
//               return (
//                 <div
//                   key={edu.id || i}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.degree || ""}</div>
//                       {(edu.degree || edu.location || g) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.schoolname}</span>}
//                           {edu.degree && edu.location && " — "}
//                           {edu.location && <span>{edu.location}</span>}
//                           {(edu.degree || edu.location) && g && " • "}
//                           {g && <span className="education-grade">{g}</span>}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""} – {edu.endDate || "Present"}
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

//         {skills?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Skills</div>
//             {isCat(skills) ? (
//               <div className="skills-container">
//                 {skills.map((cat: any) => (
//                   <div key={cat.id} className="skill-category">
//                     <div className="skill-category-title">{cat.title}</div>
//                     <div className="skills-list">
//                       {cat?.skills?.map((sk: any) => (
//                         <span key={sk.id} className="skill-tag">
//                           {sk.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="skills-list">
//                 {skills.map((sk: any, i: number) => (
//                   <span key={sk.id || i} className="skill-tag">
//                     {sk.name || sk.skill}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                 .map((section: any, i: number) => (
//                   <div key={section.id || i} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
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
//     );
//   }

//   /* ─────────────────────────────────────────────────────────────
//      EDITOR MODE — iframe-based pixel-perfect paginated preview

//      How it works:
//        1. buildHTML() produces the exact same HTML sent to Puppeteer/PDF
//        2. That HTML is injected into an iframe via srcdoc (no network)
//        3. The iframe is 794px wide (A4 @ 96dpi) — unscaled, full fidelity
//        4. A CSS transform scales the 794px iframe down to DISPLAY_WIDTH
//        5. The clip viewport hides all but the current page's 1123px slice
//        6. translateY on the stage div slides to the correct page
//        7. Page count = ceil(iframe scrollHeight / 1123)

//      Result: preview == download, pixel for pixel.
//   ───────────────────────────────────────────────────────────── */
//   const DISPLAY_WIDTH = 700; // px — adjust to match your editor column width
//   const scale = DISPLAY_WIDTH / A4_W_PX;
//   const displayHeight = A4_H_PX * scale;

//   const html = buildHTML();

//   // Y positions of page-break rulers inside the (unscaled) iframe coordinate space
//   const pageRulers = Array.from(
//     { length: totalPages - 1 },
//     (_, i) => (i + 1) * A4_H_PX,
//   );

//   return (
//     <>
//       {/* Download button */}
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

//       {/* Outer container */}
//       <div style={{ width: `${DISPLAY_WIDTH}px`, margin: "0 auto" }}>
//         {/* ── Clip viewport: shows exactly one A4 page ── */}
//         <div
//           style={{
//             width: `${DISPLAY_WIDTH}px`,
//             height: `${displayHeight}px`,
//             overflow: "hidden",
//             position: "relative",
//             boxShadow:
//               "0 2px 24px rgba(0,0,0,0.16), 0 1px 4px rgba(0,0,0,0.07)",
//             borderRadius: "3px",
//             background: "#fff",
//           }}
//         >
//           {/* ── Scaled + sliding stage ── */}
//           <div
//             style={{
//               width: `${A4_W_PX}px`,
//               transformOrigin: "top left",
//               // Scale down to display width, then slide up by page offset
//               transform: `scale(${scale}) translateY(-${currentPage * A4_H_PX}px)`,
//               transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
//               willChange: "transform",
//               position: "relative",
//             }}
//           >
//             {/*
//               The iframe renders the IDENTICAL HTML used for PDF generation.
//               sandbox="allow-same-origin" lets fonts load; scripts disabled.
//               Height starts at 1 page; handleIframeLoad expands it after measuring.
//             */}
//             <iframe
//               key={iframeKey}
//               ref={iframeRef}
//               srcDoc={html}
//               onLoad={handleIframeLoad}
//               scrolling="no"
//               title="Resume preview"
//               sandbox="allow-same-origin"
//               style={{
//                 width: `${A4_W_PX}px`,
//                 height: `${A4_H_PX}px`, // expanded by handleIframeLoad
//                 minHeight: `${A4_H_PX}px`,
//                 border: "none",
//                 display: "block",
//                 background: "#fff",
//                 pointerEvents: "none", // prevent accidental link clicks
//               }}
//             />

//             {/* Page-break rulers (in iframe coordinate space) */}
//             {pageRulers.map((y) => (
//               <div
//                 key={y}
//                 style={{
//                   position: "absolute",
//                   top: `${y}px`,
//                   left: 0,
//                   right: 0,
//                   height: "2px",
//                   background: "rgba(220, 38, 38, 0.55)",
//                   zIndex: 20,
//                   pointerEvents: "none",
//                 }}
//               />
//             ))}
//           </div>

//           {/* Bottom fade hint when more content below */}
//           {currentPage < totalPages - 1 && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 height: "52px",
//                 background: "linear-gradient(transparent, rgba(0,0,0,0.07))",
//                 pointerEvents: "none",
//                 zIndex: 10,
//               }}
//             />
//           )}
//         </div>

//         {/* ── Page navigation (only shown when multi-page) ── */}
//         {totalPages > 1 && (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "16px",
//               marginTop: "16px",
//             }}
//           >
//             <motion.button
//               onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
//               disabled={currentPage === 0}
//               whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
//               whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
//               style={{
//                 padding: "6px 18px",
//                 borderRadius: "6px",
//                 border: "1px solid #d1d5db",
//                 background: currentPage === 0 ? "#f9fafb" : "#fff",
//                 color: currentPage === 0 ? "#9ca3af" : "#374151",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 cursor: currentPage === 0 ? "default" : "pointer",
//                 transition: "all 0.15s",
//               }}
//             >
//               ← Prev
//             </motion.button>

//             {/* Pill dots */}
//             <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i)}
//                   title={`Page ${i + 1}`}
//                   style={{
//                     width: i === currentPage ? "22px" : "8px",
//                     height: "8px",
//                     borderRadius: "4px",
//                     border: "none",
//                     background: i === currentPage ? "#059669" : "#d1d5db",
//                     cursor: "pointer",
//                     padding: 0,
//                     transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
//                   }}
//                 />
//               ))}
//             </div>

//             <motion.button
//               onClick={() =>
//                 setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
//               }
//               disabled={currentPage === totalPages - 1}
//               whileHover={currentPage < totalPages - 1 ? { scale: 1.05 } : {}}
//               whileTap={currentPage < totalPages - 1 ? { scale: 0.95 } : {}}
//               style={{
//                 padding: "6px 18px",
//                 borderRadius: "6px",
//                 border: "1px solid #d1d5db",
//                 background: currentPage === totalPages - 1 ? "#f9fafb" : "#fff",
//                 color: currentPage === totalPages - 1 ? "#9ca3af" : "#374151",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 cursor: currentPage === totalPages - 1 ? "default" : "pointer",
//                 transition: "all 0.15s",
//               }}
//             >
//               Next →
//             </motion.button>
//           </div>
//         )}

//         {/* Page counter */}
//         <AnimatePresence mode="wait">
//           <motion.p
//             key={currentPage}
//             initial={{ opacity: 0, y: 4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -4 }}
//             transition={{ duration: 0.18 }}
//             style={{
//               textAlign: "center",
//               marginTop: "8px",
//               fontSize: "13px",
//               color: "#6b7280",
//             }}
//           >
//             Page {currentPage + 1} of {totalPages}
//           </motion.p>
//         </AnimatePresence>

//         {/* Legend */}
//         {totalPages > 1 && (
//           <p
//             style={{
//               textAlign: "center",
//               fontSize: "11px",
//               color: "#9ca3af",
//               marginTop: "4px",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 width: "20px",
//                 height: "2px",
//                 background: "rgba(220,38,38,0.55)",
//                 verticalAlign: "middle",
//                 marginRight: "5px",
//               }}
//             />
//             Red line = page break in downloaded PDF
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;
