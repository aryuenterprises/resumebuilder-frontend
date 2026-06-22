    

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

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to render skills
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

//     return (
//       <div className="section">
//         <h2 className="section-title">Skills</h2>
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
//       <div className="section">
//         <h2 className="section-title">Projects</h2>
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
//                 <strong>Tech:</strong> {project.techStack.join(", ")}
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
//      CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
//   ====================================================== */
//   const styles = `
//   .t7-resume body {
//     margin: 0;
//     padding: 0;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//   }

//   .t7-resume {
//     width: 210mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//     color: #111827;
//     text-align: left;
//   }

//   .t7-resume.is-preview {
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

//   /* Global <p> reset */
//   .t7-resume p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* Header Section */
//   .t7-resume .resume-header {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 2px solid #000000;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t7-resume .name {
//     font-size: 28px;
//     font-weight: 700;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     margin-bottom: 8px;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .job-title {
//     font-size: 16px;
//     font-weight: 500;
//     color: #333333;
//     margin-bottom: 12px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .contact-row {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//     font-size: 12px;
//     color: #444444;
//     margin-bottom: 8px;
//   }

//   .t7-resume .address {
//     font-size: 12px;
//     color: #444444;
//     margin-top: 4px;
//   }

//   .t7-resume .links {
//     margin-top: 8px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//   }

//   .t7-resume .link-item {
//     color: #000000;
//     text-decoration: underline;
//     font-size: 12px;
//   }

//   /* Section Styles */
//   .t7-resume .section {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: center !important;
//     font-family: 'Nunito', sans-serif;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Custom Section Title - Same as other section titles */
//   .t7-resume .custom-section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: center !important;
//     font-family: 'Nunito', sans-serif;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Experience Items */
//   .t7-resume .experience-item {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 8px;
//   }

//   .t7-resume .experience-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-subtitle {
//     font-size: 13px;
//     font-weight: 500;
//     color: #555555;
//     margin-top: 2px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description {
//     margin-top: 8px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Education Items */
//   .t7-resume .education-item {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 8px;
//   }

//   .t7-resume .education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-subtitle {
//     font-size: 13px;
//     color: #555555;
//     margin-top: 2px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-grade {
//     font-size: 12px;
//     color: #555555;
//     margin-top: 4px;
//     font-weight: 500;
//     display: inline-block;
//   }

//   .t7-resume .education-description {
//     margin-top: 8px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Project Items */
//   .t7-resume .project-item {
//     margin-bottom: 16px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//   }

//   .t7-resume .project-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t7-resume .project-link {
//     color: #000000;
//     text-decoration: underline;
//     font-size: 12px;
//   }

//   .t7-resume .project-tech-stack {
//     font-size: 12px;
//     color: #555555;
//     margin: 4px 0 6px;
//   }

//   .t7-resume .project-description {
//     margin-top: 6px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Skills Content - FIXED LIST STYLES */
//   .t7-resume .skills-content {
//     padding: 0 5px;
//   }

//   .t7-resume .skills-content ul {
//     list-style-type: disc !important;
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .skills-content ol {
//     list-style-type: decimal !important;
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* Custom Section Content - FIXED LIST STYLES */
//   .t7-resume .custom-section-content ul {
//     list-style-type: disc !important;
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .custom-section-content ol {
//     list-style-type: decimal !important;
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .custom-section-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   /* Summary Text - FIXED LIST STYLES */
//   .t7-resume .summary-text ul {
//     list-style-type: disc !important;
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .summary-text ol {
//     list-style-type: decimal !important;
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .summary-text li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   /* Experience Description - FIXED LIST STYLES */
//   .t7-resume .experience-description ul,
//   .t7-resume .experience-description ol {
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .experience-description ul {
//     list-style-type: disc !important;
//   }

//   .t7-resume .experience-description ol {
//     list-style-type: decimal !important;
//   }

//   .t7-resume .experience-description li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   /* Education Description - FIXED LIST STYLES */
//   .t7-resume .education-description ul,
//   .t7-resume .education-description ol {
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .education-description ul {
//     list-style-type: disc !important;
//   }

//   .t7-resume .education-description ol {
//     list-style-type: decimal !important;
//   }

//   .t7-resume .education-description li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   /* Project Description - FIXED LIST STYLES */
//   .t7-resume .project-description ul,
//   .t7-resume .project-description ol {
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .project-description ul {
//     list-style-type: disc !important;
//   }

//   .t7-resume .project-description ol {
//     list-style-type: decimal !important;
//   }

//   .t7-resume .project-description li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   /* Resume Lists - General */
//   .t7-resume .resume-list {
//     margin: 8px 0 8px 25px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume ol.resume-list {
//     list-style-type: decimal !important;
//   }

//   .t7-resume ul.resume-list {
//     list-style-type: disc !important;
//   }

//   .t7-resume .resume-list li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   /* Preserve spaces in content */
//   .t7-resume .experience-description p,
//   .t7-resume .education-description p,
//   .t7-resume .project-description p,
//   .t7-resume .summary-text p,
//   .t7-resume .custom-section-content p,
//   .t7-resume .skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Print Styles */
//   @media print {
//     @page {
//       size: A4;
    
//     }

//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       background: white;
//     }

//     .t7-resume {
//       margin: 0;
//       width: 100%;
//           padding: 15mm;  /* Keep the padding here instead of @page */

//       border: none;
//       box-shadow: none;
//       background: white;
//     }

//     .t7-resume .resume-header {
//       margin-top: 0;
//       padding-top: 0;
//     }

//     .t7-resume .section {
//       page-break-inside: avoid;
//     }

//     .t7-resume .experience-item {
//       page-break-inside: avoid;
//     }

//     .t7-resume .project-link,
//     .t7-resume .link-item {
//       color: #000000 !important;
//       text-decoration: underline !important;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
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
//         <div class="section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
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
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
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
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//       ) {
//         return "";
//       }

//       return `
//         <div class="section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//             <div class="custom-section">
//               ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//               ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
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
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t7-resume">

//   <!-- HEADER -->
//   <div class="resume-header">
//     <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="job-title">${contact?.jobTitle || ""}</div>
//     <div class="contact-row">
//       ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//       ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//     </div>
//     ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section">
//     <h2 class="section-title">Professional Summary</h2>
//     <div class="summary-text">${cleanQuillHTML(summary)}</div>
//   </div>
//   `
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Experience</h2>
//     ${experiences
//       .map((exp) => {
//         const startFormatted = formatMonthYear(exp.startDate, false);
//         const endFormatted = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : "Present";
//         return `
//         <div class="experience-item">
//           <div class="experience-header">
//             <div>
//               <div class="experience-title">${exp.jobTitle || ""}</div>
//               <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//           </div>
//           ${
//             exp.text
//               ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
//               : ""
//           }
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Education</h2>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//         <div class="education-item">
//           <div class="education-header">
//             <div>
//               <div class="education-school">${edu.schoolname || ""}</div>
//               <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//               ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//             </div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
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


//   return (
//     <>
//       <div className="text-center my-5">

//             {lastSegment === "download-resume" && (

//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//         >
//           Download Resume
//         </motion.button>
//             )}
//       </div>

//       <div
//         className={`t7-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">{contact?.jobTitle}</div>
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {dateOfBirth && (
//               <div className="contact-item">
//                 {formatDateOfBirth(dateOfBirth)}
//               </div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" , ")}</div>
//           )}
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
//           <div className="section">
//             <h2 className="section-title">Professional Summary</h2>
//             <div
//               className="summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: cleanQuillHTML(summary),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section">
//             <h2 className="section-title">Experience</h2>
//             {experiences.map((exp, i) => {
//               const start = formatMonthYear(exp.startDate, false);
//               const end = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : "Present";
//               return (
//                 <div key={i} className="experience-item">
//                   <div className="experience-header">
//                     <div>
//                       <div className="experience-title">
//                         {exp.jobTitle || ""}
//                       </div>
//                       <div className="experience-subtitle">
//                         {[exp.employer, exp.location]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     <div className="experience-date">
//                       {start} — {end}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="experience-description"
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
//         {educations.length > 0 && (
//           <div className="section">
//             <h2 className="section-title">Education</h2>
//             {educations.map((edu, i) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(
//                 edu.grade || "",
//               );
//               return (
//                 <div key={i} className="education-item">
//                   <div className="education-header">
//                     <div>
//                       <div className="education-school">
//                         {edu.schoolname || ""}
//                       </div>
//                       <div className="education-subtitle">
//                         {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                       </div>
//                       {formattedGrade && (
//                         <div className="education-grade">{formattedGrade}</div>
//                       )}
//                     </div>
//                     <div className="education-date">
//                       {[edu.startDate, edu.endDate || "Present"]
//                         .filter(Boolean)
//                         .join(" — ")}
//                     </div>
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="education-description"
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
//           Array.isArray(finalize.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section">
//               {finalize.customSection.map(
//                 (section, i) =>
//                   (section?.name?.trim() || section?.description?.trim()) && (
//                     <div key={i} className="custom-section">
//                       {section.name && (
//                         <h2 className="custom-section-title">{section.name}</h2>
//                       )}
//                       {section.description && (
//                         <div
//                           className="custom-section-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(section.description),
//                           }}
//                         />
//                       )}
//                     </div>
//                   ),
//               )}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateSeven;












// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
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

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   /* ======================================================
//      CSS — SINGLE SOURCE with ONE @media print block
//   ====================================================== */
//   const styles = `
   

   
//     /* PDF page margins - ONLY ONCE */
//     @page {
//       size: A4;
//       margin: 10mm;
//     }

//     .t7-resume {
//       max-width: 190mm;
//       margin: 0 auto;
//       background: white;
//       font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     /* Global <p> reset */
//     .t7-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Header Section */
//     .t7-resume .resume-header {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 2px solid #000000;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t7-resume .name {
//       font-size: 28px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       color: #333333;
//       margin-bottom: 12px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t7-resume .links {
//       margin-top: 8px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: underline;
//       font-size: 12px;
//     }

//     /* Section Styles */
//     .t7-resume .section {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: 'Nunito', sans-serif;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Custom Section Title */
//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: 'Nunito', sans-serif;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Experience Items */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .experience-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .experience-subtitle {
//       font-size: 13px;
//       font-weight: 500;
//       color: #555555;
//       margin-top: 2px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .experience-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Education Items */
//     .t7-resume .education-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .education-subtitle {
//       font-size: 13px;
//       color: #555555;
//       margin-top: 2px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .education-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .education-grade {
//       font-size: 12px;
//       color: #555555;
//       margin-top: 4px;
//       font-weight: 500;
//       display: inline-block;
//     }

//     .t7-resume .education-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Project Items */
//     .t7-resume .project-item {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t7-resume .project-link {
//       color: #000000;
//       text-decoration: underline;
//       font-size: 12px;
//     }

//     .t7-resume .project-tech-stack {
//       font-size: 12px;
//       color: #555555;
//       margin: 4px 0 6px;
//     }

//     .t7-resume .project-description {
//       margin-top: 6px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Skills Content */
//     .t7-resume .skills-content {
//       padding: 0 5px;
//     }

//     .t7-resume .skills-content ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .skills-content ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Custom Section Content */
//     .t7-resume .custom-section-content ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .custom-section-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Summary Text */
//     .t7-resume .summary-text ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .summary-text ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .summary-text li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Experience Description Lists */
//     .t7-resume .experience-description ul,
//     .t7-resume .experience-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .experience-description ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .experience-description ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .experience-description li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Education Description Lists */
//     .t7-resume .education-description ul,
//     .t7-resume .education-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .education-description ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .education-description ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .education-description li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Project Description Lists */
//     .t7-resume .project-description ul,
//     .t7-resume .project-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .project-description ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .project-description ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .project-description li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Preserve spaces in content */
//     .t7-resume .experience-description p,
//     .t7-resume .education-description p,
//     .t7-resume .project-description p,
//     .t7-resume .summary-text p,
//     .t7-resume .custom-section-content p,
//     .t7-resume .skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* 
//       ── SINGLE PRINT BLOCK ── 
//       Everything print-related goes here, once.
//     */
//     @media print {
//       body {
//         padding: 0;
//         margin: 0;
//       }

//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t7-resume {
//         max-width: none;
//         margin: 0;
//         padding: 0;
//         border: none;
//         box-shadow: none;
//         background: white;
//       }

//       .t7-resume .resume-header {
//         margin-top: 0;
//         padding-top: 0;
//       }

//       .t7-resume .section {
//         page-break-inside: avoid;
//       }

//       .t7-resume .experience-item {
//         page-break-inside: avoid;
//       }

//       .t7-resume .project-link,
//       .t7-resume .link-item {
//         color: #000000 !important;
//         text-decoration: underline !important;
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
//       const observer = new MutationObserver(reportHeight);
//       observer.observe(document.body, { childList: true, subtree: true, attributes: true });
//     </script>
//   `;

//   /* ======================================================
//      HTML GENERATION — single source for preview and PDF
//   ====================================================== */
//   const generateHTML = useCallback((): string => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML
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
//         <div class="section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
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
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link" target="_blank">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
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

//     // Generate custom sections HTML
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

//       return `
//         <div class="section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//             <div class="custom-section">
//               ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//               ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
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
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t7-resume">

//   <!-- HEADER -->
//   <div class="resume-header">
//     <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="job-title">${contact?.jobTitle || ""}</div>
//     <div class="contact-row">
//       ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//       ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//     </div>
//     ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item" target="_blank">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section">
//     <h2 class="section-title">Professional Summary</h2>
//     <div class="summary-text">${cleanQuillHTML(summary)}</div>
//   </div>
//   `
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Experience</h2>
//     ${experiences
//       .map((exp) => {
//         const startFormatted = formatMonthYear(exp.startDate, false);
//         const endFormatted = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : "Present";
//         return `
//         <div class="experience-item">
//           <div class="experience-header">
//             <div>
//               <div class="experience-title">${exp.jobTitle || ""}</div>
//               <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//           </div>
//           ${
//             exp.text
//               ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
//               : ""
//           }
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Education</h2>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//         <div class="education-item">
//           <div class="education-header">
//             <div>
//               <div class="education-school">${edu.schoolname || ""}</div>
//               <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//               ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//             </div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS -->
//   ${generateCustomSectionsHTML()}

// </div>
// ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, finalize, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, addressParts]);

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
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
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
//      RENDER
//   ====================================================== */
//   return (
//     <>
//       <div className="text-center my-5">
//         {lastSegment === "download-resume" && (
//           <motion.button
//             onClick={handleDownload}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//           >
//             Download Resume
//           </motion.button>
//         )}
//       </div>

//       {alldata ? (
//         /* THUMBNAIL mode */
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
//         /* FULL VIEW mode */
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

// export default TemplateSeven;



















// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
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
// //   .t7-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

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

//   /* ======================================================
//      CSS — SINGLE SOURCE with ONE @media print block
//   ====================================================== */
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t7-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     /* Global <p> reset */
//     .t7-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Header Section */
//     .t7-resume .resume-header {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 2px solid #000000;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .name {
//       font-size: 28px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       color: #333333;
//       margin-bottom: 12px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t7-resume .links {
//       margin-top: 8px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: underline;
//       font-size: 12px;
//     }

//     /* Section Styles */
//     .t7-resume .section {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: 'Nunito', sans-serif;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Custom Section Title */
//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: 'Nunito', sans-serif;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Experience Items */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .experience-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .experience-subtitle {
//       font-size: 13px;
//       font-weight: 500;
//       color: #555555;
//       margin-top: 2px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .experience-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Education Items */
//     .t7-resume .education-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .education-subtitle {
//       font-size: 13px;
//       color: #555555;
//       margin-top: 2px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .education-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .education-grade {
//       font-size: 12px;
//       color: #555555;
//       margin-top: 4px;
//       font-weight: 500;
//       display: inline-block;
//     }

//     .t7-resume .education-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Project Items */
//     .t7-resume .project-item {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t7-resume .project-link {
//       color: #000000;
//       text-decoration: underline;
//       font-size: 12px;
//     }

//     .t7-resume .project-tech-stack {
//       font-size: 12px;
//       color: #555555;
//       margin: 4px 0 6px;
//     }

//     .t7-resume .project-description {
//       margin-top: 6px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* Skills Content */
//     .t7-resume .skills-content {
//       padding: 0 5px;
//     }

//     .t7-resume .skills-content ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .skills-content ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .skills-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Custom Section Content */
//     .t7-resume .custom-section-content ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .custom-section-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Summary Text */
//     .t7-resume .summary-text ul {
//       list-style-type: disc !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .summary-text ol {
//       list-style-type: decimal !important;
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .summary-text li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Experience Description Lists */
//     .t7-resume .experience-description ul,
//     .t7-resume .experience-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .experience-description ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .experience-description ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .experience-description li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Education Description Lists */
//     .t7-resume .education-description ul,
//     .t7-resume .education-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .education-description ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .education-description ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .education-description li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Project Description Lists */
//     .t7-resume .project-description ul,
//     .t7-resume .project-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .project-description ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .project-description ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .project-description li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//     }

//     /* Preserve spaces in content */
//     .t7-resume .experience-description p,
//     .t7-resume .education-description p,
//     .t7-resume .project-description p,
//     .t7-resume .summary-text p,
//     .t7-resume .custom-section-content p,
//     .t7-resume .skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* 
//       ── SINGLE PRINT BLOCK ── 
//       Everything print-related goes here, once.
//     */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t7-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//         background: white;
//       }

//       .t7-resume .resume-header {
//         margin-top: 0;
//         padding-top: 0;
//       }

//       .t7-resume .project-link,
//       .t7-resume .link-item {
//         color: #000000 !important;
//         text-decoration: underline !important;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — single source for preview and PDF
//   ====================================================== */
//   const generateHTML = useCallback((forPDF = false): string => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     // Generate skills HTML
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
//         <div class="section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
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
//                     ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
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

//     // Generate custom sections HTML
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

//       return `
//         <div class="section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//             <div class="custom-section">
//               ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//               ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     // PDF override: strip the fixed width/padding from .t7-resume so Puppeteer's
//     // own 15mm margins control the layout
//     const pdfOverrideStyle = forPDF
//       ? `<style>.t7-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t7-resume">

//   <!-- HEADER -->
//   <div class="resume-header">
//     <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
//     <div class="contact-row">
//       ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//       ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//     </div>
//     ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//     <div class="links">
//       ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section">
//     <h2 class="section-title">Professional Summary</h2>
//     <div class="summary-text">${cleanQuillHTML(summary)}</div>
//   </div>
//   `
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Experience</h2>
//     ${experiences
//       .map((exp) => {
//         const startFormatted = formatMonthYear(exp.startDate, false);
//         const endFormatted = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : "Present";
//         return `
//         <div class="experience-item">
//           <div class="experience-header">
//             <div>
//               <div class="experience-title">${exp.jobTitle || ""}</div>
//               <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//           </div>
//           ${
//             exp.text
//               ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
//               : ""
//           }
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Education</h2>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//         <div class="education-item">
//           <div class="education-header">
//             <div>
//               <div class="education-school">${edu.schoolname || ""}</div>
//               <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//               ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//             </div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS -->
//   ${generateCustomSectionsHTML()}

// </div>
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, finalize, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, addressParts, CSS]);

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
//           const resume = doc.querySelector<HTMLElement>(".t7-resume");
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
//             ".resume-header",
//             ".section",
//             ".experience-item",
//             ".education-item",
//             ".project-item",
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
//     .t7-resume {
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
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { 
//           html: generateHTML(true),
//         },
//         { responseType: "blob" },
//       );

//       const url: string = URL.createObjectURL(res.data);
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

// export default TemplateSeven;











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

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data sources ─────────────────────────────────────────────────────────
//   const contact    = alldata?.contact    || context.contact    || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences= alldata?.experiences|| context?.experiences|| [];
//   const skills     = alldata?.skills?.text || context?.skills?.text || "";
//   const projects   = alldata?.projects   || context?.projects  || [];
//   const finalize   = alldata?.finalize   || context?.finalize  || {};
//   const summary    = alldata?.summary    || context?.summary   || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl  = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl    = contact?.github;
//   const dateOfBirth  = contact?.dob;

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t7-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     .t7-resume p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── HEADER ── */
//     .t7-resume .resume-header {
//       text-align: center;
//       margin-bottom: 20px;
//       padding-bottom: 15px;
//       border-bottom: 2px solid #000000;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .name {
//       font-size: 28px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       color: #333333;
//       margin-bottom: 12px;
//       font-family: 'Nunito', sans-serif;
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t7-resume .links {
//       margin-top: 8px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: underline;
//       font-size: 12px;
//     }

//     /* ── SECTIONS ── */
//     .t7-resume .section {
//       margin-bottom: 20px;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: 'Nunito', sans-serif;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #000000;
//       text-align: center !important;
//       font-family: 'Nunito', sans-serif;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── EXPERIENCE ── */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .experience-title    { font-size: 15px; font-weight: 700; color: #000000; font-family: 'Nunito', sans-serif; }
//     .t7-resume .experience-subtitle { font-size: 13px; font-weight: 500; color: #555555; margin-top: 2px; font-family: 'Nunito', sans-serif; }
//     .t7-resume .experience-date     { font-size: 12px; color: #555555; white-space: nowrap; font-family: 'Nunito', sans-serif; }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* ── EDUCATION ── */
//     .t7-resume .education-item {
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 8px;
//     }

//     .t7-resume .education-school    { font-size: 15px; font-weight: 700; color: #000000; font-family: 'Nunito', sans-serif; }
//     .t7-resume .education-subtitle  { font-size: 13px; color: #555555; margin-top: 2px; font-family: 'Nunito', sans-serif; }
//     .t7-resume .education-date      { font-size: 12px; color: #555555; white-space: nowrap; font-family: 'Nunito', sans-serif; }
//     .t7-resume .education-grade     { font-size: 12px; color: #555555; margin-top: 4px; font-weight: 500; display: inline-block; }

//     .t7-resume .education-description {
//       margin-top: 8px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* ── PROJECTS ── */
//     .t7-resume .project-item {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title  { font-size: 15px; font-weight: 700; color: #000000; font-family: 'Nunito', sans-serif; }
//     .t7-resume .project-links  { display: flex; gap: 12px; }
//     .t7-resume .project-link   { color: #000000; text-decoration: underline; font-size: 12px; }
//     .t7-resume .project-tech-stack { font-size: 12px; color: #555555; margin: 4px 0 6px; }

//     .t7-resume .project-description {
//       margin-top: 6px;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//     }

//     /* ── SKILLS ── */
//     .t7-resume .skills-content { padding: 0 5px; }

//     .t7-resume .skills-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .skills-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .skills-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }
//     .t7-resume .skills-content p  { margin: 0 0 6px 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* ── CUSTOM SECTIONS ── */
//     .t7-resume .custom-section-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .custom-section-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .custom-section-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }

//     /* ── SUMMARY ── */
//     .t7-resume .summary-text ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .summary-text ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
//     .t7-resume .summary-text li { margin-bottom: 4px !important; line-height: 1.5 !important; }

//     /* ── LIST STYLES for descriptions ── */
//     .t7-resume .experience-description ul,
//     .t7-resume .experience-description ol,
//     .t7-resume .education-description ul,
//     .t7-resume .education-description ol,
//     .t7-resume .project-description ul,
//     .t7-resume .project-description ol {
//       margin: 8px 0 8px 25px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .experience-description ul,
//     .t7-resume .education-description ul,
//     .t7-resume .project-description ul  { list-style-type: disc    !important; }

//     .t7-resume .experience-description ol,
//     .t7-resume .education-description ol,
//     .t7-resume .project-description ol  { list-style-type: decimal !important; }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li,
//     .t7-resume .project-description li  { margin-bottom: 4px !important; line-height: 1.5 !important; }

//     /* Preserve spaces */
//     .t7-resume .experience-description p,
//     .t7-resume .education-description p,
//     .t7-resume .project-description p,
//     .t7-resume .summary-text p,
//     .t7-resume .custom-section-content p,
//     .t7-resume .skills-content p { white-space: pre-wrap !important; }

//     /* Page-break marker injected at cut points for PDF */
//     .t7-page-break {
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
//       .t7-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//         background: white;
//       }
//       .t7-resume .resume-header { margin-top: 0; padding-top: 0; }
//       .t7-resume .project-link,
//       .t7-resume .link-item { color: #000000 !important; text-decoration: underline !important; }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   // pageBreakIds: array of element data-ids where page breaks should be injected.
//   // Used when forPDF=true so Puppeteer breaks at the same points as the preview.
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const formattedDob = formatDateOfBirth(dateOfBirth || "");
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       // ── Header ──────────────────────────────────────────────────────────
//       const header = `
//       <div class="resume-header" data-block-id="t7-header">
//         <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//         <div class="job-title">${
//           typeof contact?.jobTitle === "string"
//             ? contact.jobTitle
//             : (contact?.jobTitle as any)?.name || ""
//         }</div>
//         <div class="contact-row">
//           ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//           ${formattedDob   ? `<div class="contact-item">${formattedDob}</div>`  : ""}
//         </div>
//         ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//         <div class="links">
//           ${linkedinUrl  ? `<a href="${href(linkedinUrl)}"  class="link-item" target="_blank">LinkedIn</a>`  : ""}
//           ${githubUrl    ? `<a href="${href(githubUrl)}"    class="link-item" target="_blank">GitHub</a>`    : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">Portfolio</a>` : ""}
//         </div>
//       </div>`;

//       // ── Summary ──────────────────────────────────────────────────────────
//       const summaryBlock = summary
//         ? `<div class="section" data-block-id="t7-summary">
//              <h2 class="section-title">Professional Summary</h2>
//              <div class="summary-text">${cleanQuillHTML(summary)}</div>
//            </div>`
//         : "";

//       // ── Experience ───────────────────────────────────────────────────────
//       const expBlock =
//         experiences.length > 0
//           ? `<div class="section" data-block-id="t7-exp-section">
//                <h2 class="section-title">Experience</h2>
//                ${experiences
//                  .map((exp: any, i: number) => {
//                    const startFormatted = formatMonthYear(exp.startDate, false);
//                    const endFormatted   = exp.endDate
//                      ? formatMonthYear(exp.endDate, false)
//                      : "Present";
//                    return `<div class="experience-item" data-block-id="t7-exp-${i}">
//                      <div class="experience-header">
//                        <div>
//                          <div class="experience-title">${exp.jobTitle || ""}</div>
//                          <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                        </div>
//                        <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//                      </div>
//                      ${exp.text ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>` : ""}
//                    </div>`;
//                  })
//                  .join("")}
//              </div>`
//           : "";

//       // ── Projects ─────────────────────────────────────────────────────────
//       const projBlock =
//         projects.length > 0
//           ? `<div class="section" data-block-id="t7-proj-section">
//                <h2 class="section-title">Projects</h2>
//                ${projects
//                  .map(
//                    (p: any, i: number) => `
//                  <div class="project-item" data-block-id="t7-proj-${i}">
//                    <div class="project-header">
//                      <div class="project-title">${p.title || ""}</div>
//                      ${
//                        p.liveUrl || p.githubUrl
//                          ? `<div class="project-links">
//                               ${p.liveUrl   ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                               ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>`   : ""}
//                             </div>`
//                          : ""
//                      }
//                    </div>
//                    ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
//                    ${p.description ? `<div class="project-description">${cleanQuillHTML(p.description)}</div>` : ""}
//                  </div>`,
//                  )
//                  .join("")}
//              </div>`
//           : "";

//       // ── Education ────────────────────────────────────────────────────────
//       const eduBlock =
//         educations.length > 0
//           ? `<div class="section" data-block-id="t7-edu-section">
//                <h2 class="section-title">Education</h2>
//                ${educations
//                  .map((edu: any, i: number) => {
//                    const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                    return `<div class="education-item" data-block-id="t7-edu-${i}">
//                      <div class="education-header">
//                        <div>
//                          <div class="education-school">${edu.schoolname || ""}</div>
//                          <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                          ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                        </div>
//                        <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                      </div>
//                      ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
//                    </div>`;
//                  })
//                  .join("")}
//              </div>`
//           : "";

//       // ── Skills ───────────────────────────────────────────────────────────
//       const skillsClean = cleanQuillHTML(skills || "");
//       const skillsBlock =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `<div class="section" data-block-id="t7-skills-section">
//                <h2 class="section-title">Skills</h2>
//                <div class="skills-content" data-block-id="t7-skills-content">${skillsClean}</div>
//              </div>`
//           : "";

//       // ── Custom sections ──────────────────────────────────────────────────
//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map(
//                 (s: any, i: number) => `
//               <div class="section" data-block-id="t7-custom-${i}">
//                 <div class="custom-section">
//                   ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//                   ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                 </div>
//               </div>`,
//               )
//               .join("")
//           : "";

//       const pdfStyle = forPDF
//         ? `<style>.t7-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       let bodyContent = `
//         ${header}
//         ${summaryBlock}
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//         ${skillsBlock}
//         ${customBlock}
//       `;

//       // For PDF: inject <div class="t7-page-break"> before each element whose
//       // data-block-id matches one of the pageBreakIds — same cut points as preview
//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t7-page-break";
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
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t7-resume">
//     ${bodyContent}
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
//       CSS,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — identical algorithm to TemplateOne
//   //
//   // KEY POINTS:
//   //   1. Fresh hidden iframe per split (avoids stale ref issues)
//   //   2. fonts.ready + rAF + 100ms so measurements are accurate
//   //   3. Collects avoid-break blocks (items + section-title/first-item pairs)
//   //   4. Records data-block-ids at each cut point → pageBreakIds for PDF
//   //   5. clipH = nextStart - thisStart prevents content bleeding on preview pages
//   //
//   // T7-SPECIFIC NOTE:
//   //   Section headings are <h2 class="section-title"> inside .section wrappers.
//   //   We pair the .section wrapper top with its first item bottom.
//   //   The section wrapper itself carries the data-block-id used for PDF breaks.
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t7-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         // Fresh hidden iframe — ensures fonts & layout always match render iframes
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
//     .t7-resume {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".t7-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           // Force unconstrained layout so scrollHeight is accurate
//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight; // force reflow

//           const totalH    = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY   = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop    = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           // ── Collect avoid-break blocks ──────────────────────────────────
//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           // Individual items — these are the atomic units that must not be split
//           const ITEM_SELECTORS = [
//             ".experience-item",
//             ".education-item",
//             ".project-item",
//             ".resume-header",
//             ".custom-section",
//             ".skills-content",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top    = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // Section wrapper (.section) paired with its first child item —
//           // prevents the section-title <h2> from being orphaned at a page bottom.
//           // The .section wrapper carries the data-block-id used for PDF breaks.
//           resume.querySelectorAll<HTMLElement>(".section").forEach((section) => {
//             const sectionTop = getRelTop(section);

//             // First meaningful item inside this section
//             const firstItem = section.querySelector<HTMLElement>(
//               ".experience-item, .education-item, .project-item, .custom-section, .skills-content",
//             );

//             if (firstItem) {
//               const anchorBottom = getRelBottom(firstItem);
//               if (anchorBottom - sectionTop > 8) {
//                 blocks.push({
//                   top:    sectionTop,
//                   bottom: anchorBottom,
//                   id:     section.dataset.blockId,
//                 });
//               }
//             } else {
//               // Sections with no child items (summary, skills plain text) —
//               // treat the whole section as one block
//               const sectionBottom = getRelBottom(section);
//               if (sectionBottom - sectionTop > 8) {
//                 blocks.push({
//                   top:    sectionTop,
//                   bottom: sectionBottom,
//                   id:     section.dataset.blockId,
//                 });
//               }
//             }
//           });

//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate cut points ────────────────────────────────────────
//           const pageStarts: number[]    = [0];
//           const pageBreakIds: string[]  = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut     = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut  = naiveCut;
//             let cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top  >= naiveCut)       break;
//               if (block.bottom <= currentStart)  continue;
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
//             // KEY: clip at actual cut point — prevents bleed into next page
//             const clipH          = nextStart - contentOffsetY;

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
//     .t7-resume {
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
//   // Reads pageBreakIds from splitIntoPages and passes them to generateHTML so
//   // Puppeteer inserts CSS page-break markers at the exact same cut points.
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       // const res: AxiosResponse<Blob> = await axios.post(
//       //   `${API_URL}/api/candidates/generate-pdf`,
//       //   { html: pdfHtml },
//       //   { responseType: "blob" },


//         const res: AxiosResponse<Blob> = await api.post(
//               `${API_URL}/candidates/generate-pdf`,
//               { html:pdfHtml  },
//               { responseType: "blob" },
//             );
      
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

// export default TemplateSeven;




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
import api from "@/app/utils/api";
import {
  ResumeCustomization,

} from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateSevenProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateSeven: React.FC<TemplateSevenProps> = ({ alldata, customization }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
  

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";

  // ── Data sources ─────────────────────────────────────────────────────────
  const contact    = alldata?.contact    || context.contact    || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences= alldata?.experiences|| context?.experiences|| [];
  const skills     = alldata?.skills?.text || context?.skills?.text || "";
  const projects   = alldata?.projects   || context?.projects  || [];
  const finalize   = alldata?.finalize   || context?.finalize  || {};
  const summary    = alldata?.summary    || context?.summary   || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl  = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl    = contact?.github;
  const dateOfBirth  = contact?.dob;

  // ── Complete Font import map ────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
      "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap",
      "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap",
      "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap",
      "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'Nunito', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes('serif')) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes('monospace')) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder with dynamic font ─────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t7-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 14px;
      line-height: 1.5;
      color: #111827;
      text-align: left;
    }

    .t7-resume p, .t7-resume div, .t7-resume span, .t7-resume li, .t7-resume a,
    .t7-resume h1, .t7-resume h2, .t7-resume h3 {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume p {
      margin: 0 0 6px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* Header */
    .t7-resume .resume-header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #000000;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t7-resume .name {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
      color: #000000;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume .job-title {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 12px;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t7-resume .contact-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: #444444;
      margin-bottom: 8px;
    }

    .t7-resume .address {
      font-size: 12px;
      color: #444444;
      margin-top: 4px;
    }

    .t7-resume .links {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .t7-resume .link-item {
      color: #000000;
      text-decoration: underline;
      font-size: 12px;
    }

    /* Sections */
    .t7-resume .section {
      margin-bottom: 20px;
    }

    .t7-resume .section-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #000000;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #000000;
      text-align: center !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      page-break-after: avoid;
      break-after: avoid;
    }

    .t7-resume .custom-section-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #000000;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #000000;
      text-align: center !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Experience */
    .t7-resume .experience-item {
      margin-bottom: 20px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t7-resume .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 8px;
    }

    .t7-resume .experience-title    { font-size: 15px; font-weight: 700; color: #000000; }
    .t7-resume .experience-subtitle { font-size: 13px; font-weight: 500; color: #555555; margin-top: 2px; }
    .t7-resume .experience-date     { font-size: 12px; color: #555555; white-space: nowrap; }

    .t7-resume .experience-description {
      margin-top: 8px;
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
    }

    /* Education */
    .t7-resume .education-item {
      margin-bottom: 20px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t7-resume .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 8px;
    }

    .t7-resume .education-school    { font-size: 15px; font-weight: 700; color: #000000; }
    .t7-resume .education-subtitle  { font-size: 13px; color: #555555; margin-top: 2px; }
    .t7-resume .education-date      { font-size: 12px; color: #555555; white-space: nowrap; }
    .t7-resume .education-grade     { font-size: 12px; color: #555555; margin-top: 4px; font-weight: 500; display: inline-block; }

    .t7-resume .education-description {
      margin-top: 8px;
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
    }

    /* Projects */
    .t7-resume .project-item {
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t7-resume .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

    .t7-resume .project-title  { font-size: 15px; font-weight: 700; color: #000000; }
    .t7-resume .project-links  { display: flex; gap: 12px; }
    .t7-resume .project-link   { color: #000000; text-decoration: underline; font-size: 12px; }
    .t7-resume .project-tech-stack { font-size: 12px; color: #555555; margin: 4px 0 6px; }

    .t7-resume .project-description {
      margin-top: 6px;
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
    }

    /* Skills */
    .t7-resume .skills-content { padding: 0 5px; }

    .t7-resume .skills-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .skills-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .skills-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }
    .t7-resume .skills-content p  { margin: 0 0 6px 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    /* Custom sections */
    .t7-resume .custom-section-content ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .custom-section-content ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .custom-section-content li { margin-bottom: 4px !important; line-height: 1.5 !important; }

    /* Summary */
    .t7-resume .summary-text ul { list-style-type: disc    !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .summary-text ol { list-style-type: decimal !important; margin: 8px 0 8px 25px !important; padding-left: 0 !important; }
    .t7-resume .summary-text li { margin-bottom: 4px !important; line-height: 1.5 !important; }

    /* List styles for descriptions */
    .t7-resume .experience-description ul,
    .t7-resume .experience-description ol,
    .t7-resume .education-description ul,
    .t7-resume .education-description ol,
    .t7-resume .project-description ul,
    .t7-resume .project-description ol {
      margin: 8px 0 8px 25px !important;
      padding-left: 0 !important;
    }

    .t7-resume .experience-description ul,
    .t7-resume .education-description ul,
    .t7-resume .project-description ul  { list-style-type: disc    !important; }

    .t7-resume .experience-description ol,
    .t7-resume .education-description ol,
    .t7-resume .project-description ol  { list-style-type: decimal !important; }

    .t7-resume .experience-description li,
    .t7-resume .education-description li,
    .t7-resume .project-description li  { margin-bottom: 4px !important; line-height: 1.5 !important; }

    /* Preserve spaces */
    .t7-resume .experience-description p,
    .t7-resume .education-description p,
    .t7-resume .project-description p,
    .t7-resume .summary-text p,
    .t7-resume .custom-section-content p,
    .t7-resume .skills-content p { white-space: pre-wrap !important; }

    /* Page-break marker */
    .t7-page-break {
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
      .t7-resume {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
        background: white;
      }
      .t7-resume .resume-header { margin-top: 0; padding-top: 0; }
      .t7-resume .project-link,
      .t7-resume .link-item { color: #000000 !important; text-decoration: underline !important; }
    }
  `,
    [],
  );

  const CSS = buildCSS(activeFontFamily);

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
  
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── Section builders ──────────────────────────────────────────────────────

  

  // ── HTML builder with section ordering ───────────────────────────────────
 // AFTER
const generateHTML = useCallback(
(forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      // Header
      const header = `
        <div class="resume-header" data-block-id="t7-header">
          <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
          <div class="job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
          <div class="contact-row">
            ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
            ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
            ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
          </div>
          ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
          <div class="links">
            ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item" target="_blank">LinkedIn</a>` : ""}
            ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item" target="_blank">GitHub</a>` : ""}
            ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item" target="_blank">Portfolio</a>` : ""}
          </div>
        </div>`;

      const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif" 
        ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
        : '';

      const pdfStyle = forPDF
        ? `<style>.t7-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";


        const sectionBuilders = {
  summary: () => summary ? `
    <div class="section" data-block-id="t7-summary">
      <h2 class="section-title">Professional Summary</h2>
      <div class="summary-text">${rich(summary)}</div>
    </div>
  ` : "",

  experience: () => experiences.length > 0 ? `
    <div class="section" data-block-id="t7-exp-section">
      <h2 class="section-title">Experience</h2>
      ${experiences.map((exp: any, i: number) => {
        const startFormatted = formatMonthYear(exp.startDate, false);
        const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
        return `<div class="experience-item" data-block-id="t7-exp-${i}">
          <div class="experience-header">
            <div>
              <div class="experience-title">${exp.jobTitle || ""}</div>
              <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
            </div>
            <div class="experience-date">${startFormatted} — ${endFormatted}</div>
          </div>
          ${exp.text ? `<div class="experience-description">${rich(exp.text)}</div>` : ""}
        </div>`;
      }).join("")}
    </div>
  ` : "",

  projects: () => projects.length > 0 ? `
    <div class="section" data-block-id="t7-proj-section">
      <h2 class="section-title">Projects</h2>
      ${projects.map((p: any, i: number) => `
        <div class="project-item" data-block-id="t7-proj-${i}">
          <div class="project-header">
            <div class="project-title">${p.title || ""}</div>
            ${p.liveUrl || p.githubUrl ? `
              <div class="project-links">
                ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
              </div>
            ` : ""}
          </div>
          ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
          ${p.description ? `<div class="project-description">${rich(p.description)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  ` : "",

  education: () => educations.length > 0 ? `
    <div class="section" data-block-id="t7-edu-section">
      <h2 class="section-title">Education</h2>
      ${educations.map((edu: any, i: number) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `<div class="education-item" data-block-id="t7-edu-${i}">
          <div class="education-header">
            <div>
              <div class="education-school">${edu.schoolname || ""}</div>
              <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
              ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
            </div>
            <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          ${edu.text ? `<div class="education-description">${rich(edu.text)}</div>` : ""}
        </div>`;
      }).join("")}
    </div>
  ` : "",

 // AFTER
skills: () => {
  const skillsClean = rich(skills || "");
  if (!skillsClean || skillsClean === "<p><br></p>") return "";
  return `<div class="section" data-block-id="t7-skills-section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-content" data-block-id="t7-skills-content">${skillsClean}</div>
  </div>`;
},

  custom: () => {
    if (!Array.isArray(finalize?.customSection)) return "";
    const filteredCustom = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
    if (filteredCustom.length === 0) return "";
    return filteredCustom.map((s: any, i: number) => `
      <div class="section" data-block-id="t7-custom-${i}">
        <div class="custom-section">
          ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
          ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
        </div>
      </div>
    `).join("");
  },
};

      // Build sections in the order defined by customization
   


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

      let bodyContent = `${header}${sectionsHTML}`;

      // For PDF: inject page breaks
      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t7-page-break";
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
  <div class="t7-resume">
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
      finalize,
      summary,
      addressParts,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      CSS,
    ],
  );

  // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t7-resume");
        if (!resumeEl) { resolve([fullHtml]); return; }
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
    .t7-resume {
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
          const resume = measureDoc.querySelector<HTMLElement>(".t7-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const totalH = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

          const getRelTop = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            return r.top - resumeRect.top + scrollY;
          };
          const getRelBottom = (el: HTMLElement): number => getRelTop(el) + el.getBoundingClientRect().height;

          interface Block { top: number; bottom: number; id?: string; }
          const blocks: Block[] = [];

          const ITEM_SELECTORS = [
            ".experience-item",
            ".education-item",
            ".project-item",
            ".resume-header",
            ".custom-section",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) {
              blocks.push({ top, bottom, id: el.dataset.blockId });
            }
          });

          // AFTER
resume.querySelectorAll<HTMLElement>(".section").forEach((section) => {
  const sectionTop = getRelTop(section);
  const firstItem = section.querySelector<HTMLElement>(
    ".experience-item, .education-item, .project-item, .custom-section, .skills-content",
  );

  // Skip anchor logic for skills — allow it to split across pages
  if (firstItem?.classList.contains("skills-content")) return;

  if (firstItem) {
    const anchorBottom = getRelBottom(firstItem);
    if (anchorBottom - sectionTop > 8) {
      blocks.push({ top: sectionTop, bottom: anchorBottom, id: section.dataset.blockId });
    }
  } else {
    const sectionBottom = getRelBottom(section);
    if (sectionBottom - sectionTop > 8) {
      blocks.push({ top: sectionTop, bottom: sectionBottom, id: section.dataset.blockId });
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
      position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
    }
    .t7-resume {
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
    setIsDownloading(true)
    try {
      // AFTER
// AFTER
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
          setIsDownloading(false)

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
                  boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
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

export default TemplateSeven;