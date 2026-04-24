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
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
  getLocalStorage,
  MonthYearDisplay,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { User } from "@/app/types/user.types";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";

// Helper function to convert markdown-style formatting to HTML
const convertMarkdownToHTML = (text: string) => {
  if (!text) return '';
  
  // First, remove empty lines from the content
  const lines = text.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  let cleanedText = nonEmptyLines.join('\n');
  
  let converted = cleanedText;
  
  // Split into lines and process line by line
  const processedLines = converted.split('\n');
  let result = '';
  let inList = false;
  let listItems: string[] = [];
  
  for (let i = 0; i < processedLines.length; i++) {
    let line = processedLines[i];
    
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Check for headers
    const h1Match = line.match(/^# (.*?)$/);
    const h2Match = line.match(/^## (.*?)$/);
    const h3Match = line.match(/^### (.*?)$/);
    
    if (h1Match) {
      if (inList) {
        result += `<ul class="resume-list">${listItems.join('')}</ul>`;
        inList = false;
        listItems = [];
      }
      result += `<h1 class="resume-heading">${h1Match[1].trim()}</h1>`;
      continue;
    }
    
    if (h2Match) {
      if (inList) {
        result += `<ul class="resume-list">${listItems.join('')}</ul>`;
        inList = false;
        listItems = [];
      }
      result += `<h2 class="resume-heading">${h2Match[1].trim()}</h2>`;
      continue;
    }
    
    if (h3Match) {
      if (inList) {
        result += `<ul class="resume-list">${listItems.join('')}</ul>`;
        inList = false;
        listItems = [];
      }
      result += `<h3 class="resume-heading">${h3Match[1].trim()}</h3>`;
      continue;
    }
    
    // Check for bullet items
    const bulletMatch = line.match(/^[-•]\s+(.*)$/);
    
    if (bulletMatch) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      let content = bulletMatch[1];
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
      content = content.replace(/__(.*?)__/g, '<u>$1</u>');
      listItems.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        result += `<ul class="resume-list">${listItems.join('')}</ul>`;
        inList = false;
        listItems = [];
      }
      let processedLine = line;
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      processedLine = processedLine.replace(/__(.*?)__/g, '<u>$1</u>');
      
      if (processedLine.trim()) {
        result += `<div class="plain-text">${processedLine}</div>`;
      }
    }
  }
  
  if (inList) {
    result += `<ul class="resume-list">${listItems.join('')}</ul>`;
  }
  
  return result;
};

// Helper function to clean Quill editor HTML
const cleanQuillHTML = (html: string) => {
  if (!html) return '';
  
  // Check if it's HTML content (has tags)
  const isQuillHTML = (html.includes('<') && html.includes('>')) || 
                      html.includes('data-list="') ||
                      html.includes('ql-ui');
  
  if (!isQuillHTML) {
    return convertMarkdownToHTML(html);
  }
  
  let cleaned = html;
  
  // Remove quill's UI spans
  cleaned = cleaned.replace(/<span class="ql-ui"[^>]*><\/span>/g, '');
  
  // Remove empty paragraphs that cause spacing
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');
  cleaned = cleaned.replace(/<p><\/p>/g, '');
  cleaned = cleaned.replace(/<p>\s*<br>\s*<\/p>/g, '');
  cleaned = cleaned.replace(/<p><br><\/p>/g, '');
  cleaned = cleaned.replace(/<p><br\/><\/p>/g, '');
  
  // Handle improper list wrappers
  if (cleaned.includes('<ol>') && cleaned.includes('data-list="bullet"')) {
    cleaned = cleaned.replace(/<ol>/g, '<ul class="resume-list">');
    cleaned = cleaned.replace(/<\/ol>/g, '</ul>');
    cleaned = cleaned.replace(/data-list="[^"]+"/g, '');
  }
  
  // Handle list items with data-list attributes
  if (cleaned.includes('data-list="ordered"') || cleaned.includes('data-list="bullet"')) {
    const liRegex = /<li\s*data-list="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g;
    const orderedItems: string[] = [];
    const bulletItems: string[] = [];
    let match;
    
    while ((match = liRegex.exec(cleaned)) !== null) {
      const type = match[1];
      const content = match[2].trim();
      
      if (type === 'ordered') {
        orderedItems.push(content);
      } else if (type === 'bullet') {
        bulletItems.push(content);
      }
    }
    
    if (orderedItems.length > 0 || bulletItems.length > 0) {
      let result = '';
      const beforeList = cleaned.substring(0, cleaned.indexOf('<li'));
      if (beforeList.trim()) {
        result += beforeList;
      }
      
      if (orderedItems.length > 0) {
        result += '<ol class="resume-list">';
        orderedItems.forEach(item => {
          result += `<li>${item}</li>`;
        });
        result += '</ol>';
      }
      
      if (bulletItems.length > 0) {
        result += '<ul class="resume-list">';
        bulletItems.forEach(item => {
          result += `<li>${item}</li>`;
        });
        result += '</ul>';
      }
      
      const lastItemEnd = cleaned.lastIndexOf('</li>') + 5;
      if (lastItemEnd < cleaned.length) {
        result += cleaned.substring(lastItemEnd);
      }
      
      return result.trim();
    }
  }
  
  // Clean up remaining data-list attributes
  cleaned = cleaned.replace(/data-list="[^"]+"/g, '');
  
  // Apply list classes
  if (cleaned.includes('<ol>')) {
    cleaned = cleaned.replace(/<ol>/g, '<ol class="resume-list">');
  }
  if (cleaned.includes('<ul>')) {
    cleaned = cleaned.replace(/<ul>/g, '<ul class="resume-list">');
  }
  
  // Trim whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
};

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
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin;
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
    min-height: 297mm;
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
        const s = formatMonthYear(exp.startDate, true);
        const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
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
            ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
            : "";
        const formattedGrade = formatGradeToCgpdAndPercentage(edu?.grade || "");
        return `<div class="education-item" style="margin-bottom:16px">
        <div class="item-header education-header">
          <div class="item-title-container">
            <div class="item-title">${edu.schoolname || ""}</div>
            ${
              edu.degree || edu.location || formattedGrade
                ? `<div class="item-subtitle">
              ${edu.degree ? `<span>${edu.degree}</span>` : ""}
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

  /* ======================================================
     JSX PREVIEW
  ====================================================== */
  return (
    <>
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

      <div
        className={`t1-resume bg-white ${alldata ? "is-preview" : ""} `}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
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
        {experiences.length > 0 && (
          <div className="section-content">
            <div className="section-title">Experience</div>
            {experiences.map((exp, i) => (
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
                    <MonthYearDisplay value={exp.startDate} shortYear />
                    {" - "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear />
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
            ))}
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
                      <div className="item-title">{edu.schoolname || ""}</div>
                      {(edu.degree || edu.location || formattedGrade) && (
                        <div className="item-subtitle">
                          {edu.degree && <span>{edu.degree}</span>}
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
                        {edu.endDate || "present"}
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