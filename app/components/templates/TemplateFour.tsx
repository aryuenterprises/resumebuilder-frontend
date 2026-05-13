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
// import { Finalize, ResumeProps } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
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
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     customSection:
//       isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//         ? finalize.customSection
//         : [],
//   };

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === 'string' && !skills.trim())) return null;
    
//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);
    
//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;
    
//     return (
//       <>
//         <div className="section-title">Skills</div>
//         <div 
//           className="skills-content"
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
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-heading">{project.title}</div>
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
//                 className="entry-content"
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
//      SHARED CSS — used by both JSX preview + generateHTML
//   ====================================================== */
//   const styles = `
//     /* All rules scoped to .t4-resume so nothing leaks to the host website */
//     .t4-resume * {
//       box-sizing: border-box;
//     }

//     .t4-resume p,
//     .t4-resume div,
//     .t4-resume span,
//     .t4-resume h2,
//     .t4-resume h3,
//     .t4-resume i,
//     .t4-resume a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* Reset <p> margins inside resume only */
//     .t4-resume p {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t4-resume ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     /* Rich text content styles */
//     .t4-resume .entry-content ul,
//     .t4-resume .entry-content ol,
//     .t4-resume .extra-content ul,
//     .t4-resume .extra-content ol,
//     .t4-resume .skills-content ul,
//     .t4-resume .skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t4-resume .entry-content li,
//     .t4-resume .extra-content li,
//     .t4-resume .skills-content li {
//       margin-bottom: 4px !important;
//     }

//     .t4-resume .entry-content strong,
//     .t4-resume .extra-content strong,
//     .t4-resume .skills-content strong {
//       font-weight: 700 !important;
//     }

//     .t4-resume .entry-content em,
//     .t4-resume .extra-content em,
//     .t4-resume .skills-content em {
//       font-style: italic !important;
//     }

//     .t4-resume .entry-content u,
//     .t4-resume .extra-content u,
//     .t4-resume .skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t4-resume .entry-content p,
//     .t4-resume .extra-content p,
//     .t4-resume .skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* ── CONTAINER ── */
//     .t4-resume {
//       width: 210mm;
//       padding: 10mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       text-align: left;
//     }

//     .t4-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm; 
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: visible;
//     }

//     /* ── HEADER ── */
//     .t4-resume .header-block {
//       text-align: center;
//       margin-bottom: 6px;
//     }

//     .t4-resume .header-name {
//       font-size: 27px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 0.02em;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .t4-resume .header-jobtitle {
//       font-size: 12px;
//       font-weight: 400;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 4px;
//     }

//     .t4-resume .header-links {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 4px;
//       flex-wrap: wrap;
//     }

//     .t4-resume .header-link {
//       font-size: 13px;
//       font-weight: 600;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t4-resume .header-divider {
//       border: none;
//       border-top: 2px solid #000;
//       margin: 4px 0;
//     }

//     .t4-resume .header-contact-row {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 6px;
//       font-size: 13px;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       flex-wrap: wrap;
//       padding: 3px 0;
//     }

//     /* ── SECTION TITLE ── */
//     .t4-resume .section-title {
//       font-size: 17px;
//       font-weight: 700;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//       margin-bottom: 4px;
//       margin-top: 10px;
//     }

//     /* ── SKILLS CONTENT ── */
//     .t4-resume .skills-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .skills-content p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//     }

//     /* ── EXPERIENCE HEADER (Job Title and Date on same line) ── */
//     .t4-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .experience-title {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t4-resume .experience-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     /* Experience Subtitle - Company and Location */
//     .t4-resume .experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* ── EDUCATION HEADER (School and Date on same line) ── */
//     .t4-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .education-school {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .t4-resume .education-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     /* Education Subtitle - Degree and Location */
//     .t4-resume .education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* ── ENTRY ── */
//     .t4-resume .entry-block {
//       margin-bottom: 12px;
//     }

//     .t4-resume .entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t4-resume .education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* ── PROJECTS ── */
//     .t4-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t4-resume .project-link {
//       font-size: 12px;
//       color: #4b5563;
//       text-decoration: underline;
//     }

//     .t4-resume .project-tech-stack {
//       font-size: 12px;
//       color: #6b7280;
//     }

//     /* ── EXTRA CONTENT ── */
//     .t4-resume .extra-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .extra-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t4-resume .extra-content div {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Custom Section Wrapper */
//     .t4-resume .custom-section-wrapper {
//       margin-top: 0;
//     }

//     .t4-resume .custom-section-wrapper .section-title {
//       margin-top: 10px;
//     }

//     /* ── WEBSITES ── */
//     .t4-resume .website-label {
//       font-size: 13px;
//       font-weight: 600;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t4-resume .website-link {
//       font-size: 13px;
//       color: #374151;
//       text-decoration: underline;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 5mm;
//       }
//       @page :first { margin-top: 0; }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t4-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .t4-resume .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t4-resume .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — mirrors JSX exactly, no Tailwind
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [
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
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${cleanedSkills}</div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="entry-block">
//             <div class="project-header">
//               <div class="entry-heading">${project.title || ""}</div>
//               <div class="project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `
//               <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>
//             `
//                 : ""
//             }
//             ${
//               project.description
//                 ? `
//               <div class="entry-content">${cleanQuillHTML(project.description)}</div>
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
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t4-resume">

//   <!-- HEADER -->
//   <div class="header-block">
//     <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${contact?.jobTitle ? `<div class="header-jobtitle">${contact.jobTitle}</div>` : ""}
//     ${
//       linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//         ? `
//     <div class="header-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="header-link">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
//     </div>`
//         : ""
//     }
//   </div>

//   <hr class="header-divider"/>

//   <div class="header-contact-row">
//     ${addressStr ? `<span>${addressStr}</span>` : ""}
//     ${contact?.phone ? `<span> • ${contact.phone}</span>` : ""}
//     ${contact?.email ? `<span> • ${contact.email}</span>` : ""}
//     ${formattedDob ? `<span> • ${formattedDob}</span>` : ""}
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section-title">Summary</div>
//   <div class="extra-content">${cleanQuillHTML(summary)}</div>`
//       : ""
//   }

//   <!-- EXPERIENCE - NEW LAYOUT -->
//   ${
//     experiences?.length > 0
//       ? `
//   <div class="section-title">Experience</div>
//   ${experiences
//     .map((exp) => {
//       const start = formatMonthYear(exp.startDate, false);
//       const end = exp.endDate
//         ? formatMonthYear(exp.endDate, false)
//         : exp.startDate
//           ? "Present"
//           : "";
//       return `
//   <div class="entry-block">
//     <div class="experience-header">
//       <div class="experience-title">${exp.jobTitle || ""}</div>
//       <div class="experience-date">${start}${start && end ? " - " : ""}${end}</div>
//     </div>
//     <div class="experience-subtitle">
//       ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//     </div>
//     ${exp.text ? `<div class="entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//   </div>`;
//     })
//     .join("")}`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION - NEW LAYOUT -->
//   ${
//     educations?.length > 0
//       ? `
//   <div class="section-title">Education</div>
//   ${educations
//     .map((edu) => {
//       const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//       return `
//   <div class="entry-block">
//     <div class="education-header">
//       <div class="education-school">${edu.schoolname || ""}</div>
//       <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//     </div>
//     <div class="education-subtitle">
//       ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//     </div>
//     ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//     ${edu.text ? `<div class="entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//   </div>`;
//     })
//     .join("")}`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS -->
//   ${fin.customSection
//     .filter((s) => s?.name?.trim() || s?.description?.trim())
//     .map(
//       (s) => `
//   <div class="custom-section-wrapper">
//     ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="extra-content">${cleanQuillHTML(s.description)}</div>` : ""}
//   </div>`,
//     )
//     .join("")}

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
//      JSX PREVIEW — uses same CSS classes as generateHTML
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
//        {/* )} */}

//       <div
//         className={`t4-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-name">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//           </div>
//           {contact?.jobTitle && (
//             <div className="header-jobtitle">{contact.jobTitle}</div>
//           )}
//           {(linkedinUrl?.trim() ||
//             githubUrl?.trim() ||
//             portfolioUrl?.trim()) && (
//             <div className="header-links">
//               {linkedinUrl?.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="header-link"
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
//                   className="header-link"
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
//                   className="header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           )}
//         </div>

//         <hr className="header-divider" />

//         <div className="header-contact-row">
//           {[
//             contact?.address,
//             contact?.city,
//             contact?.postCode,
//             contact?.country,
//           ].filter(Boolean).length > 0 && (
//             <span>
//               {[
//                 contact?.address,
//                 contact?.city,
//                 contact?.postCode,
//                 contact?.country,
//               ]
//                 .filter(Boolean)
//                 .join(", ")}
//             </span>
//           )}
//           {contact?.phone && <span> • {contact.phone}</span>}
//           {contact?.email && <span> • {contact.email}</span>}
//           {formattedDob && <span> • {formattedDob}</span>}
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <>
//             <div className="section-title">Summary</div>
//             <div
//               className="extra-content"
//               dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//             />
//           </>
//         )}

//         {/* EXPERIENCE - NEW LAYOUT */}
//         {experiences?.length > 0 && (
//           <>
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, index) => {
//               const start = formatMonthYear(exp.startDate, false);
//               const end = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : exp.startDate
//                   ? "Present"
//                   : "";
//               return (
//                 <div key={exp.id || index} className="entry-block">
//                   <div className="experience-header">
//                     <div className="experience-title">{exp.jobTitle || ""}</div>
//                     <div className="experience-date">
//                       {start}
//                       {start && end ? " - " : ""}
//                       {end}
//                     </div>
//                   </div>
//                   <div className="experience-subtitle">
//                     {[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(exp.text),
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION - NEW LAYOUT */}
//         {educations?.length > 0 && (
//           <>
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(
//                 edu.grade || "",
//               );
//               return (
//                 <div key={edu.id || index} className="entry-block">
//                   <div className="education-header">
//                     <div className="education-school">
//                       {edu.schoolname || ""}
//                     </div>
//                     <div className="education-date">
//                       {[edu.startDate, edu.endDate || "Present"]
//                         .filter(Boolean)
//                         .join(" — ")}
//                     </div>
//                   </div>
//                   <div className="education-subtitle">
//                     {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                   </div>
//                   {formattedGrade && (
//                     <div className="education-grade">{formattedGrade}</div>
//                   )}
//                   {edu.text && (
//                     <div
//                       className="entry-content"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(edu.text),
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </>
//         )}

//         {/* SKILLS - Now using text editor format */}
//         {renderSkills()}

//         {/* CUSTOM SECTIONS */}
//         {fin.customSection
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map((section, i) => (
//             <div
//               key={section.id || i}
//               className="custom-section-wrapper"
//               style={{ marginTop: i === 0 ? 0 : 0 }}
//             >
//               {section.name && (
//                 <div className="section-title">{section.name}</div>
//               )}
//               {section.description && (
//                 <div
//                   className="extra-content"
//                   dangerouslySetInnerHTML={{
//                     __html: cleanQuillHTML(section.description),
//                   }}
//                 />
//               )}
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default TemplateFour;
























"use client";

import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
} from "@/app/utils";
import { Finalize, ResumeProps } from "@/app/types/context.types";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  
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
  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const fin = {
    customSection:
      isFinalizeData(finalize) && Array.isArray(finalize.customSection)
        ? finalize.customSection
        : [],
  };

  /* ======================================================
     SHARED CSS — used by both JSX preview + generateHTML
  ====================================================== */
  const styles = `
    /* All rules scoped to .t4-resume so nothing leaks to the host website */
   

   

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

    .t4-resume {
      max-width: 190mm; /* 210mm - 20mm total margins */
      margin: 0 auto;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
    }

    @media print {
      .t4-resume {
        max-width: none;
        margin: 0;
        padding: 0;
      }
    }

    .t4-resume * {
      box-sizing: border-box;
    }

    .t4-resume p,
    .t4-resume div,
    .t4-resume span,
    .t4-resume h2,
    .t4-resume h3,
    .t4-resume i,
    .t4-resume a {
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* Reset <p> margins inside resume only */
    .t4-resume p {
      margin: 0 !important;
      padding: 0 !important;
    }

    .t4-resume ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    /* Rich text content styles */
    .t4-resume .entry-content ul,
    .t4-resume .entry-content ol,
    .t4-resume .extra-content ul,
    .t4-resume .extra-content ol,
    .t4-resume .skills-content ul,
    .t4-resume .skills-content ol {
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }

    .t4-resume .entry-content li,
    .t4-resume .extra-content li,
    .t4-resume .skills-content li {
      margin-bottom: 4px !important;
    }

    .t4-resume .entry-content strong,
    .t4-resume .extra-content strong,
    .t4-resume .skills-content strong {
      font-weight: 700 !important;
    }

    .t4-resume .entry-content em,
    .t4-resume .extra-content em,
    .t4-resume .skills-content em {
      font-style: italic !important;
    }

    .t4-resume .entry-content u,
    .t4-resume .extra-content u,
    .t4-resume .skills-content u {
      text-decoration: underline !important;
    }

    /* Preserve spaces in content */
    .t4-resume .entry-content p,
    .t4-resume .extra-content p,
    .t4-resume .skills-content p {
      white-space: pre-wrap !important;
    }

    /* ── HEADER ── */
    .t4-resume .header-block {
      text-align: center;
      margin-bottom: 6px;
    }

    .t4-resume .header-name {
      font-size: 27px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    .t4-resume .header-jobtitle {
      font-size: 12px;
      font-weight: 400;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 4px;
    }

    .t4-resume .header-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-bottom: 4px;
      flex-wrap: wrap;
    }

    .t4-resume .header-link {
      font-size: 13px;
      font-weight: 600;
      color: #000;
      text-decoration: underline;
      text-underline-offset: 2px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t4-resume .header-divider {
      border: none;
      border-top: 2px solid #000;
      margin: 4px 0;
    }

    .t4-resume .header-contact-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      flex-wrap: wrap;
      padding: 3px 0;
    }

    /* ── SECTION TITLE ── */
    .t4-resume .section-title {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-bottom: 4px;
      margin-top: 10px;
    }

    /* ── SKILLS CONTENT ── */
    .t4-resume .skills-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .skills-content p {
      margin: 0 0 6px 0 !important;
      padding: 0 !important;
    }

    /* ── EXPERIENCE HEADER (Job Title and Date on same line) ── */
    .t4-resume .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t4-resume .experience-title {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
    }

    .t4-resume .experience-date {
      font-size: 13px;
      color: #4b5563;
    }

    /* Experience Subtitle - Company and Location */
    .t4-resume .experience-subtitle {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    /* ── EDUCATION HEADER (School and Date on same line) ── */
    .t4-resume .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t4-resume .education-school {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
    }

    .t4-resume .education-date {
      font-size: 13px;
      color: #4b5563;
    }

    /* Education Subtitle - Degree and Location */
    .t4-resume .education-subtitle {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    /* ── ENTRY ── */
    .t4-resume .entry-block {
      margin-bottom: 12px;
    }

    .t4-resume .entry-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── EDUCATION GRADE ── */
    .t4-resume .education-grade {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }

    /* ── PROJECTS ── */
    .t4-resume .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t4-resume .project-links {
      display: flex;
      gap: 12px;
    }

    .t4-resume .project-link {
      font-size: 12px;
      color: #4b5563;
      text-decoration: underline;
    }

    .t4-resume .project-tech-stack {
      font-size: 12px;
      color: #6b7280;
    }

    /* ── EXTRA CONTENT ── */
    .t4-resume .extra-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding: 4px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .extra-content p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t4-resume .extra-content div {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* Custom Section Wrapper */
    .t4-resume .custom-section-wrapper {
      margin-top: 0;
    }

    .t4-resume .custom-section-wrapper .section-title {
      margin-top: 10px;
    }

    /* ── WEBSITES ── */
    .t4-resume .website-label {
      font-size: 13px;
      font-weight: 600;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t4-resume .website-link {
      font-size: 13px;
      color: #374151;
      text-decoration: underline;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      word-wrap: break-word;
    }

    /* ── PRINT ── */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .t4-resume {
        width: 100% !important;
        box-shadow: none !important;
      }
      .t4-resume .entry-block {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .t4-resume .section-title {
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
      const observer = new MutationObserver(reportHeight);
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    </script>
  `;

  /* ======================================================
     HTML GENERATION — mirrors JSX exactly
  ====================================================== */
  const generateHTML = useCallback((): string => {
    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postCode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === 'string' && !skills.trim())) return "";
      
      const cleanedSkills = cleanQuillHTML(skills);
      if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
      return `
        <div class="section-title">Skills</div>
        <div class="skills-content">${cleanedSkills}</div>
      `;
    };

    // Generate projects HTML
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="section-title">Projects</div>
        ${projects
          .map(
            (project: any) => `
          <div class="entry-block">
            <div class="project-header">
              <div class="entry-heading">${project.title || ""}</div>
              <div class="project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link" target="_blank">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link" target="_blank">GitHub</a>` : ""}
              </div>
            </div>
            ${
              project.techStack && project.techStack.length > 0
                ? `
              <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>
            `
                : ""
            }
            ${
              project.description
                ? `
              <div class="entry-content">${cleanQuillHTML(project.description)}</div>
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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t4-resume">

  <!-- HEADER -->
  <div class="header-block">
    <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${contact?.jobTitle ? `<div class="header-jobtitle">${contact.jobTitle}</div>` : ""}
    ${
      linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
        ? `
    <div class="header-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link" target="_blank">LinkedIn</a>` : ""}
      ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="header-link" target="_blank">GitHub</a>` : ""}
      ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link" target="_blank">Portfolio</a>` : ""}
    </div>`
        : ""
    }
  </div>

  <hr class="header-divider"/>

  <div class="header-contact-row">
    ${addressStr ? `<span>${addressStr}</span>` : ""}
    ${contact?.phone ? `<span> • ${contact.phone}</span>` : ""}
    ${contact?.email ? `<span> • ${contact.email}</span>` : ""}
    ${formattedDobHtml ? `<span> • ${formattedDobHtml}</span>` : ""}
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `
  <div class="section-title">Summary</div>
  <div class="extra-content">${cleanQuillHTML(summary)}</div>`
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences?.length > 0
      ? `
  <div class="section-title">Experience</div>
  ${experiences
    .map((exp) => {
      const start = formatMonthYear(exp.startDate, false);
      const end = exp.endDate
        ? formatMonthYear(exp.endDate, false)
        : exp.startDate
          ? "Present"
          : "";
      return `
  <div class="entry-block">
    <div class="experience-header">
      <div class="experience-title">${exp.jobTitle || ""}</div>
      <div class="experience-date">${start}${start && end ? " - " : ""}${end}</div>
    </div>
    <div class="experience-subtitle">
      ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
    </div>
    ${exp.text ? `<div class="entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
  </div>`;
    })
    .join("")}`
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations?.length > 0
      ? `
  <div class="section-title">Education</div>
  ${educations
    .map((edu) => {
      const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
      return `
  <div class="entry-block">
    <div class="education-header">
      <div class="education-school">${edu.schoolname || ""}</div>
      <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
    </div>
    <div class="education-subtitle">
      ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
    </div>
    ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
    ${edu.text ? `<div class="entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
  </div>`;
    })
    .join("")}`
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- CUSTOM SECTIONS -->
  ${fin.customSection
    .filter((s) => s?.name?.trim() || s?.description?.trim())
    .map(
      (s) => `
  <div class="custom-section-wrapper">
    ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="extra-content">${cleanQuillHTML(s.description)}</div>` : ""}
  </div>`,
    )
    .join("")}

</div>
${HEIGHT_SCRIPT}
</body>
</html>`;
  }, [contact, educations, experiences, skills, projects, fin.customSection, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth]);

  // Debounced update for blob URL
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

  // Update blob URL when htmlContent changes (for full view mode)
  useEffect(() => {
    if (!alldata && htmlContent) {
      // Clean up old blob URL
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      
      // Create new blob URL
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      
      // Update iframe source
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    }
  }, [htmlContent, alldata]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { 
          html,
          options: {
            margin: {
              top: '10mm',
              right: '10mm',
              bottom: '10mm',
              left: '10mm'
            }
          }
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

  /* ======================================================
     RENDER
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

      {alldata ? (
        /* THUMBNAIL mode - using blob URL in iframe for inspectability */
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
          <iframe
            src={blobUrlRef.current || undefined}
            title="resume-preview"
            style={{
              width: "210mm",
              height: "297mm",
              border: "none",
              display: "block",
            }}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      ) : (
        /* FULL VIEW mode with iframe using blob URL */
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
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      )}
    </>
  );
};

export default TemplateFour;