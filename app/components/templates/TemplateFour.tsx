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
// import { Finalize, ResumeProps } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
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

//   /* ======================================================
//      SHARED CSS — used by both JSX preview + generateHTML
//   ====================================================== */
//   const styles = `
//     /* All rules scoped to .t4-resume so nothing leaks to the host website */
   

   

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

//     .t4-resume {
//       max-width: 190mm; /* 210mm - 20mm total margins */
//       margin: 0 auto;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       text-align: left;
//     }

//     @media print {
//       .t4-resume {
//         max-width: none;
//         margin: 0;
//         padding: 0;
//       }
//     }

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
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .t4-resume {
//         width: 100% !important;
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
//      HTML GENERATION — mirrors JSX exactly
//   ====================================================== */
//   const generateHTML = useCallback((): string => {
//     const addressStr = [
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
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${cleanedSkills}</div>
//       `;
//     };

//     // Generate projects HTML
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
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link" target="_blank">GitHub</a>` : ""}
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
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
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
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="header-link" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link" target="_blank">Portfolio</a>` : ""}
//     </div>`
//         : ""
//     }
//   </div>

//   <hr class="header-divider"/>

//   <div class="header-contact-row">
//     ${addressStr ? `<span>${addressStr}</span>` : ""}
//     ${contact?.phone ? `<span> • ${contact.phone}</span>` : ""}
//     ${contact?.email ? `<span> • ${contact.email}</span>` : ""}
//     ${formattedDobHtml ? `<span> • ${formattedDobHtml}</span>` : ""}
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section-title">Summary</div>
//   <div class="extra-content">${cleanQuillHTML(summary)}</div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
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

//   <!-- EDUCATION -->
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
// ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, fin.customSection, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth]);

//   // Debounced update for blob URL
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
//       // Clean up old blob URL
//       if (blobUrlRef.current) {
//         URL.revokeObjectURL(blobUrlRef.current);
//       }
      
//       // Create new blob URL
//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       const url = URL.createObjectURL(blob);
//       blobUrlRef.current = url;
      
//       // Update iframe source
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

// export default TemplateFour;









































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
// import { Finalize, ResumeProps } from "@/app/types/context.types";
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
// //   .t4-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
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
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     customSection:
//       isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//         ? finalize.customSection
//         : [],
//   };

//   /* ======================================================
//      SHARED CSS — used by both preview + PDF
//   ====================================================== */
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t4-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       text-align: left;
//     }

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
//       page-break-inside: avoid;
//       break-inside: avoid;
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

//     .t4-resume .entry-content p,
//     .t4-resume .extra-content p,
//     .t4-resume .skills-content p {
//       white-space: pre-wrap !important;
//     }

//     /* ── HEADER ── */
//     .t4-resume .header-block {
//       text-align: center;
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
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
//       page-break-after: avoid;
//       break-after: avoid;
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

//     /* ── EXPERIENCE HEADER ── */
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

//     .t4-resume .experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* ── EDUCATION HEADER ── */
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

//     .t4-resume .education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       font-weight: 500;
//     }

//     /* ── ENTRY ── */
//     .t4-resume .entry-block {
//       margin-bottom: 12px;
//       page-break-inside: avoid;
//       break-inside: avoid;
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
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t4-resume .custom-section-wrapper .section-title {
//       margin-top: 10px;
//     }

//     /* ── PRINT ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — with PDF mode support
//   ====================================================== */
//   const generateHTML = useCallback((forPDF = false): string => {
//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     // Generate skills HTML
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";
      
//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
//       return `
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${cleanedSkills}</div>
//       `;
//     };

//     // Generate projects HTML
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
//                 ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
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

//     // PDF override: strip the fixed width/padding from .t4-resume so Puppeteer's
//     // own 15mm margins control the layout
//     const pdfOverrideStyle = forPDF
//       ? `<style>.t4-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="t4-resume">

//   <!-- HEADER -->
//   <div class="header-block">
//     <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${contact?.jobTitle ? `<div class="header-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//     ${
//       linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//         ? `
//     <div class="header-links">
//       ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//     </div>`
//         : ""
//     }
//   </div>

//   <hr class="header-divider"/>

//   <div class="header-contact-row">
//     ${addressStr ? `<span>${addressStr}</span>` : ""}
//     ${contact?.phone ? `<span>${addressStr ? " • " : ""}${contact.phone}</span>` : ""}
//     ${contact?.email ? `<span>${(addressStr || contact?.phone) ? " • " : ""}${contact.email}</span>` : ""}
//     ${formattedDobHtml ? `<span>${(addressStr || contact?.phone || contact?.email) ? " • " : ""}${formattedDobHtml}</span>` : ""}
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section-title">Summary</div>
//   <div class="extra-content">${cleanQuillHTML(summary)}</div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
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

//   <!-- EDUCATION -->
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
//   }, [contact, educations, experiences, skills, projects, fin.customSection, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, CSS]);

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
//           const resume = doc.querySelector<HTMLElement>(".t4-resume");
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
//             ".header-block",
//             ".entry-block",
//             ".section-title",
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
//     .t4-resume {
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

// export default TemplateFour;















"use client";
import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
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

// ─────────────────────────────────────────────────────────────────────────────
// PIXEL-PERFECT A4 CONSTANTS
// At 96 dpi: 210mm→794px, 297mm→1123px, 15mm→57px
// PAGE_CONTENT_H = 1123 - 57*2 = 1009px (usable content per page)
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

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

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const fin = {
    customSection:
      isFinalizeData(finalize) && Array.isArray(finalize.customSection)
        ? finalize.customSection
        : [],
  };

  /* ======================================================
     SHARED CSS — used by both preview + PDF
  ====================================================== */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

    @page {
      size: A4;
      margin: 15mm;
    }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t4-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
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
      page-break-inside: avoid;
      break-inside: avoid;
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

    .t4-resume .entry-content p,
    .t4-resume .extra-content p,
    .t4-resume .skills-content p {
      white-space: pre-wrap !important;
    }

    /* ── HEADER ── */
    .t4-resume .header-block {
      text-align: center;
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
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
      page-break-after: avoid;
      break-after: avoid;
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

    /* ── EXPERIENCE HEADER ── */
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

    .t4-resume .experience-subtitle {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    /* ── EDUCATION HEADER ── */
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

    .t4-resume .education-subtitle {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    /* ── ENTRY ── */
    .t4-resume .entry-block {
      margin-bottom: 12px;
      page-break-inside: avoid;
      break-inside: avoid;
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
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t4-resume .custom-section-wrapper .section-title {
      margin-top: 10px;
    }

    /* Page break marker — injected at exact cut points for PDF */
    .t4-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block;
      height: 0;
      margin: 0;
      padding: 0;
    }

    /* ── PRINT ── */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;

  /* ======================================================
     HTML GENERATION — with PDF mode support
     pageBreakIds: array of element data-ids where page breaks should be injected
  ====================================================== */
  const generateHTML = useCallback((forPDF = false, pageBreakIds: string[] = []): string => {
    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postCode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    const href = (url: string) =>
      url.startsWith("http") ? url : `https://${url}`;

    // Generate skills HTML
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === 'string' && !skills.trim())) return "";
      
      const cleanedSkills = cleanQuillHTML(skills);
      if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
      return `
        <div class="t4-section-content" data-block-id="skills-section">
          <div class="section-title">Skills</div>
          <div class="skills-content" data-block-id="skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="t4-section-content" data-block-id="proj-section">
          <div class="section-title">Projects</div>
          ${projects
            .map(
              (project: any, i: number) => `
            <div class="entry-block" data-block-id="proj-${i}">
              <div class="project-header">
                <div class="entry-heading">${project.title || ""}</div>
                <div class="project-links">
                  ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                  ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
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
        </div>
      `;
    };

    // PDF override: strip the fixed width/padding from .t4-resume so Puppeteer's
    // own 15mm margins control the layout
    const pdfOverrideStyle = forPDF
      ? `<style>.t4-resume { width: 100% !important; padding: 0 !important; }</style>`
      : "";

    // Build the full HTML body content
    let bodyContent = `
  <!-- HEADER -->
  <div class="header-block" data-block-id="header">
    <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${contact?.jobTitle ? `<div class="header-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
    ${
      linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
        ? `
    <div class="header-links">
      ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
      ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
      ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
    </div>`
        : ""
    }
  </div>

  <hr class="header-divider"/>

  <div class="header-contact-row">
    ${addressStr ? `<span>${addressStr}</span>` : ""}
    ${contact?.phone ? `<span>${addressStr ? " • " : ""}${contact.phone}</span>` : ""}
    ${contact?.email ? `<span>${(addressStr || contact?.phone) ? " • " : ""}${contact.email}</span>` : ""}
    ${formattedDobHtml ? `<span>${(addressStr || contact?.phone || contact?.email) ? " • " : ""}${formattedDobHtml}</span>` : ""}
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `
  <div class="t4-section-content" data-block-id="summary">
    <div class="section-title">Summary</div>
    <div class="extra-content">${cleanQuillHTML(summary)}</div>
  </div>`
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences?.length > 0
      ? `
  <div class="t4-section-content" data-block-id="exp-section">
    <div class="section-title">Experience</div>
    ${experiences
      .map((exp, i: number) => {
        const start = formatMonthYear(exp.startDate, false);
        const end = exp.endDate
          ? formatMonthYear(exp.endDate, false)
          : exp.startDate
            ? "Present"
            : "";
        return `
    <div class="entry-block" data-block-id="exp-${i}">
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
      .join("")}
  </div>`
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations?.length > 0
      ? `
  <div class="t4-section-content" data-block-id="edu-section">
    <div class="section-title">Education</div>
    ${educations
      .map((edu, i: number) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `
    <div class="entry-block" data-block-id="edu-${i}">
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
      .join("")}
  </div>`
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- CUSTOM SECTIONS -->
  ${fin.customSection
    .filter((s) => s?.name?.trim() || s?.description?.trim())
    .map(
      (s, i: number) => `
  <div class="custom-section-wrapper" data-block-id="custom-${i}">
    ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="extra-content">${cleanQuillHTML(s.description)}</div>` : ""}
  </div>`,
    )
    .join("")}
`;

    // For PDF: inject <div class="t4-page-break"> before each element
    // whose data-block-id matches one of the pageBreakIds
    if (forPDF && pageBreakIds.length > 0) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = bodyContent;
      pageBreakIds.forEach((id) => {
        const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
        if (el) {
          const breakDiv = document.createElement("div");
          breakDiv.className = "t4-page-break";
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
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
  ${pdfOverrideStyle}
</head>
<body style="margin:0;padding:0;background:white;">
<div class="t4-resume">
  ${bodyContent}
</div>
</body>
</html>`;
  }, [contact, educations, experiences, skills, projects, fin.customSection, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, CSS]);

  // ─────────────────────────────────────────────────────────────────────────
  // PAGE SPLITTER
  //
  // Returns both the page HTMLs for preview AND the pageBreakIds for PDF.
  // Same logic as Template One.
  // ─────────────────────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t4-resume");
        if (!resumeEl) {
          resolve([fullHtml]);
          return;
        }
        const resumeSnapshot = resumeEl.outerHTML;

        // Hidden measurement iframe — real iframe so fonts match render iframes
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
    .t4-resume {
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
          const resume = measureDoc.querySelector<HTMLElement>(".t4-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          // Force unconstrained layout
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

          // ── Collect avoid-break blocks ──────────────────────────────
          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          const ITEM_SELECTORS = [
            ".header-block",
            ".entry-block",
            ".section-title",
            ".custom-section-wrapper",
            ".skills-content",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) {
              blocks.push({ top, bottom, id: el.dataset.blockId });
            }
          });

          // Section title + first item paired
          resume
            .querySelectorAll<HTMLElement>(".section-title")
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
                const deepChild = firstItem.querySelector<HTMLElement>(
                  ".entry-block, .custom-section-wrapper, .skills-content",
                );
                const anchor = deepChild || firstItem;
                const anchorBottom = getRelBottom(anchor);
                if (anchorBottom - titleTop > 8) {
                  // ID = the section-content wrapper (title's parent)
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

          // ── Calculate cut points ────────────────────────────────────
          const pageStarts: number[] = [0];
          // pageBreakIds[i] = data-block-id of element starting page i+1
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

          // ── Store pageBreakIds so PDF download can use them ─────────
          (window as any).__resumePageBreakIds = pageBreakIds;

          // ── Build preview page HTMLs ────────────────────────────────
          const pageHtmls: string[] = [];

          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            // KEY FIX: clip at actual cut point, not always PAGE_CONTENT_H
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
    .t4-resume {
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

  // ── Debounced updates ────────────────────────────────────
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

  /* ======================================================
     PDF DOWNLOAD — reads pageBreakIds and passes to generateHTML
  ====================================================== */
  const handleDownload = async () => {
    try {
      const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      const pdfHtml = generateHTML(true, pageBreakIds);

      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html: pdfHtml },
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
      {/* Download button */}
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

              {/* A4 card */}
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

export default TemplateFour;