// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { IoPersonOutline } from "react-icons/io5";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context?.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;

//     const processImage = async () => {
//       if (!contact.photo) {
//         setPreviewUrl(null);
//         setBase64Image(null);
//         return;
//       }

//       try {
//         let imageUrl: string | null = null;

//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             // Blob URL - fetch and convert to base64
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               const base64 = reader.result as string;
//               setBase64Image(base64);
//               setPreviewUrl(base64);
//             };
//             reader.readAsDataURL(blob);
//           } else {
//             // Regular URL - use absolute path
//             imageUrl = `${API_URL}/api/uploads/photos/${contact.photo}`;
//             setPreviewUrl(imageUrl);
//             setBase64Image(imageUrl);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           // File object - convert to base64
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           setPreviewUrl(objectUrl);

//           const reader = new FileReader();
//           reader.onloadend = () => {
//             setBase64Image(reader.result as string);
//           };
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (error) {
//         console.error("Error processing image:", error);
//       }
//     };

//     processImage();

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

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
//       <div className="skills-block">
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
//       <div style={{ marginTop: "6px" }}>
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="entry-top-row">
//               <div className="entry-title">{project.title}</div>
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
//       </div>
//     );
//   };

//   /* ======================================================
//      SHARED CSS
//   ====================================================== */
//   const styles = `
//     /* ── CONTAINER ── */
//     .t2-resume {
//       width: 210mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       text-align: left;
//       display: flex;
//       flex-direction: column;
//       min-height: 297mm;
//     }

//     .t2-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       padding: 20px;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: hidden;
//     }

//     /* ── SCOPED GLOBAL RESETS ── */
//     .t2-resume p,
//     .t2-resume div,
//     .t2-resume span,
//     .t2-resume i,
//     .t2-resume a {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume ul,
//     .t2-resume ol {
//       margin: 0 0 0 20px !important;
//       padding: 0 !important;
//     }

//     .t2-resume li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t2-resume ul { list-style-type: disc !important; }
//     .t2-resume ol { list-style-type: decimal !important; }

//     /* Resume Lists */
//     .t2-resume .resume-list {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t2-resume ol.resume-list {
//       list-style-type: decimal !important;
//     }

//     .t2-resume ul.resume-list {
//       list-style-type: disc !important;
//     }

//     /* Rich Text Styles */
//     .t2-resume strong, .t2-resume b {
//       font-weight: 700 !important;
//     }

//     .t2-resume em, .t2-resume i {
//       font-style: italic !important;
//     }

//     .t2-resume u {
//       text-decoration: underline !important;
//     }

//     /* Skills Content Styles */
//     .t2-resume .skills-content {
//       margin-top: 4px;
//     }

//     .t2-resume .skills-content ul,
//     .t2-resume .skills-content ol {
//       margin: 4px 0 4px 20px !important;
//     }

//     .t2-resume .skills-content li {
//       margin-bottom: 2px !important;
//     }

//     .t2-resume .skills-content p {
//       margin: 0 0 4px 0 !important;
//     }

//     /* ── HEADER ── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//     }

//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }

//     .t2-resume .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }

//     .t2-resume .header-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f9fafb;
//     }

//     .t2-resume .header-info-col {
//       flex: 1;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }

//     .t2-resume .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 2px;
//     }

//     .t2-resume .header-address {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume .header-email {
//       font-size: 11px;
//       color: #374151;
//       font-family: serif, 'Nunito', Arial;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }

//     .t2-resume .header-phone {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .t2-resume .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }

//     .t2-resume .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* ── BODY ── */
//     .t2-resume .body-wrap {
//       display: flex;
//       gap: 12px;
//       flex: 1;
//       min-height: 0;
//       padding-top: 10px;
//     }

//     /* ── LEFT COLUMN ── */
//     .t2-resume .left-col {
//       width: 40%;
//       padding: 8px 0 8px 20px;
//     }

//     /* ── DIVIDER ── */
//     .t2-resume .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 8px 4px;
//       flex-shrink: 0;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t2-resume .right-col {
//       width: 60%;
//       padding: 8px 20px 8px 0;
//     }

//     /* ── SECTION TITLE ── */
//     .t2-resume .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       margin-top: 12px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume .section-title:first-child {
//       margin-top: 0;
//     }

//     /* ── SUMMARY ── */
//     .t2-resume .summary-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume .summary-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS (COMPACT TAGS) ── */
//     .t2-resume .skills-block {
//       margin-bottom: 8px;
//     }

//     /* ── PROJECTS ── */
//     .t2-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t2-resume .project-link {
//       font-size: 10px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t2-resume .project-tech-stack {
//       font-size: 11px;
//       color: #6b7280;
//       margin: 2px 0 4px;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//       display: inline-block;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t2-resume .custom-section-block {
//       margin-top: 6px;
//       margin-bottom: 6px;
//     }

//     .t2-resume .custom-section-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }

//     .t2-resume .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume .entry-date {
//       display: flex;
//       align-items: center;
//       gap: 3px;
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       white-space: nowrap;
//     }

//     .t2-resume .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .t2-resume .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//         margin: 0;
//         padding: 0;
//       }

//       .t2-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         margin: 0 !important;
//         box-shadow: none !important;
//         page-break-after: avoid;
//         page-break-inside: avoid;
//       }

//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t2-resume .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const photoHtml = base64Image
//       ? `<div class="header-photo-col">
//          <img src="${base64Image}" alt="Profile" class="header-photo" style="width:100px;height:100px;object-fit:cover;border-radius:6px;" />
//        </div>`
//       : "";

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
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

//       return `
//         <div class="skills-block">
//           <div class="section-title">Skills</div>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div style="margin-top:6px">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="entry-block">
//               <div class="entry-top-row">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                 </div>
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
//                 <div class="entry-content">${cleanQuillHTML(project.description)}</div>
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
//         <div class="custom-section-block">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//             <div style="margin-bottom:6px">
//               ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
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
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       background-color: white;
//     }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t2-resume">

//   <!-- HEADER -->
//   <div class="header-wrap">
//     ${photoHtml}
//     <div class="header-info-col">
//       <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//       ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//       ${formattedDob ? `<div class="header-dob">${formattedDob}</div>` : ""}
//       <div class="header-links">
//         ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
//         ${githubUrl && githubUrl.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="header-link">GitHub</a>` : ""}
//         ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="body-wrap">

//     <!-- LEFT COLUMN -->
//     <div class="left-col">

//       ${
//         summary
//           ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${cleanQuillHTML(summary)}</div>
//       </div>`
//           : ""
//       }

//       ${generateSkillsHTML()}

//       ${generateCustomSectionsHTML()}

//     </div>

//     <!-- DIVIDER -->
//     <div class="col-divider"></div>

//     <!-- RIGHT COLUMN -->
//     <div class="right-col">

//       ${
//         experiences?.length > 0
//           ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//             <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//           ${exp.text ? `<div class="entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//         </div>`;
//           })
//           .join("")}
//       </div>`
//           : ""
//       }

//       ${generateProjectsHTML()}

//       ${
//         educations?.length > 0
//           ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu) => {
//             const dateStr = [edu.startDate || "", edu.endDate || "Present"]
//               .filter(Boolean)
//               .join(" - ");
//             const formattedGrade = formatGradeToCgpdAndPercentage(
//               edu.grade || "",
//             );
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             <div class="entry-title">${edu.degree || ""}</div>
//             ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//           </div>
//           ${edu.schoolname || edu.location ? `<div class="entry-subtitle">${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${formattedGrade ? ` • ${formattedGrade}` : ""}</div>` : ""}
//           ${!edu.location && !edu.degree && formattedGrade ? `<div class="entry-subtitle">${formattedGrade}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//         </div>`;
//           })
//           .join("")}
//       </div>`
//           : ""
//       }

//     </div>
//   </div>
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
//         className={`t2-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-wrap">
//           {previewUrl && (
//             <div className="header-photo-col">
//               <img src={previewUrl} alt="Profile" className="header-photo" />
//             </div>
//           )}
//           <div className="header-info-col">
//             <div className="header-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {[
//               contact?.address,
//               contact?.city,
//               contact?.postCode,
//               contact?.country,
//             ].filter(Boolean).length > 0 && (
//               <div className="header-address">
//                 {[
//                   contact?.address,
//                   contact?.city,
//                   contact?.postCode,
//                   contact?.country,
//                 ]
//                   .filter(Boolean)
//                   .join(", ")}
//               </div>
//             )}
//             {contact?.email && (
//               <div className="header-email">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="header-phone">{contact.phone}</div>
//             )}
//             {dateOfBirth && (
//               <div className="header-dob">{formatDateOfBirth(dateOfBirth)}</div>
//             )}
//             <div className="header-links">
//               {linkedinUrl && linkedinUrl.trim() && (
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
//               {githubUrl && githubUrl.trim() && (
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
//               {portfolioUrl && portfolioUrl.trim() && (
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
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="body-wrap">
//           {/* LEFT COLUMN */}
//           <div className="left-col">
//             {summary && (
//               <div className="summary-block">
//                 <div className="section-title">Summary</div>
//                 <div
//                   className="summary-text"
//                   dangerouslySetInnerHTML={{
//                     __html: cleanQuillHTML(summary),
//                   }}
//                 />
//               </div>
//             )}

//             {renderSkills()}

//             {/* CUSTOM SECTIONS */}
//             {finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some(
//                 (s: any) => s?.name?.trim() || s?.description?.trim(),
//               ) && (
//                 <div>
//                   {finalize.customSection
//                     .filter(
//                       (s: any) => s?.name?.trim() || s?.description?.trim(),
//                     )
//                     .map((section: any, i: number) => (
//                       <div
//                         key={section.id || i}
//                         style={{ marginBottom: "6px" }}
//                       >
//                         {section.name && (
//                           <div className="section-title">{section.name}</div>
//                         )}
//                         {section.description && (
//                           <div
//                             className="entry-content"
//                             dangerouslySetInnerHTML={{
//                               __html: cleanQuillHTML(section.description),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}
//           </div>

//           {/* DIVIDER */}
//           <div className="col-divider" />

//           {/* RIGHT COLUMN */}
//           <div className="right-col">
//             {experiences?.length > 0 && (
//               <div>
//                 <div className="section-title">Experience</div>
//                 {experiences.map((exp, index) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate
//                     ? formatMonthYear(exp.endDate, false)
//                     : exp.startDate
//                       ? "Present"
//                       : "";
//                   return (
//                     <div key={exp.id || index} className="entry-block">
//                       <div className="entry-top-row">
//                         {exp.jobTitle ? (
//                           <div className="entry-title">{exp.jobTitle}</div>
//                         ) : (
//                           <div />
//                         )}
//                         <div className="entry-date">
//                           {start}
//                           {start && end ? " - " : ""}
//                           {end}
//                         </div>
//                       </div>
//                       {(exp.location || exp.employer) && (
//                         <div className="entry-subtitle">
//                           {[exp.employer, exp.location]
//                             .filter(Boolean)
//                             .join(" - ")}
//                         </div>
//                       )}
//                       {exp.text && (
//                         <div
//                           className="entry-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(exp.text),
//                           }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {renderProjects()}

//             {educations?.length > 0 && (
//               <div>
//                 <div className="section-title">Education</div>
//                 {educations.map((edu, index) => {
//                   const formattedGrade = formatGradeToCgpdAndPercentage(
//                     edu.grade || "",
//                   );
//                   return (
//                     <div key={edu.id || index} className="entry-block">
//                       <div className="entry-top-row">
//                         <div className="entry-title">{edu.degree || ""}</div>
//                         <div className="entry-date">
//                           {[edu.startDate, edu.endDate || "Present"]
//                             .filter(Boolean)
//                             .join(" - ")}
//                         </div>
//                       </div>
//                       {(edu.location || edu.degree || formattedGrade) && (
//                         <div className="entry-subtitle">
//                           {[edu.schoolname, edu.location]
//                             .filter(Boolean)
//                             .join(" - ")}
//                           {formattedGrade && ` • ${formattedGrade}`}
//                         </div>
//                       )}
//                       {edu.text && (
//                         <div
//                           className="entry-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(edu.text),
//                           }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwo;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
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

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // ── Dynamic iframe height (removes scrollbar) ─────────────
//   const [iframeHeight, setIframeHeight] = useState<number>(1122); // 297mm fallback

//   useEffect(() => {
//     const handler = (e: MessageEvent) => {
//       if (e.data?.type === "RESUME_HEIGHT") {
//         setIframeHeight(e.data.height);
//       }
//     };
//     window.addEventListener("message", handler);
//     return () => window.removeEventListener("message", handler);
//   }, []);

//   // ── Data ──────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
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

//   // ── Photo → base64 (so it works inside srcdoc / PDF) ──────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;

//     const processImage = async () => {
//       if (!contact.photo) {
//         setBase64Image(null);
//         return;
//       }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };

//     processImage();
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     * { margin: 0; padding: 0; box-sizing: border-box; }

//     /*
//       overflow:hidden on html+body prevents the iframe ever showing
//       a scrollbar. The iframe height is set dynamically to match
//       content height so nothing is clipped.
//     */
//     html, body {
//       overflow: hidden;
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     /*
//       @page sets physical paper margins for EVERY page of the PDF
//       (page 1 bottom, page 2 top, page 3 top, …).
//       The .t2-resume padding below mirrors this for the screen preview.
//     */
//     @page {
//       size: A4;
//       margin: 10mm;
//     }

//     .t2-resume {
//       width: 210mm;
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       display: flex;
//       flex-direction: column;
//       min-height: 297mm;
//     }

//     /* ── SCOPED RESETS ── */
//     .t2-resume p,
//     .t2-resume div,
//     .t2-resume span,
//     .t2-resume i,
//     .t2-resume a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }
//     .t2-resume ul,
//     .t2-resume ol  { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em,     .t2-resume i { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* ── HEADER ── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       margin-bottom: 2px;
//     }
//     .t2-resume .header-address,
//     .t2-resume .header-email,
//     .t2-resume .header-phone,
//     .t2-resume .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//     }

//     /* ── BODY ── */
//     .t2-resume .body-wrap {
//       display: flex;
//       gap: 12px;
//       flex: 1;
//       padding-top: 10px;
//     }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 8px 4px;
//       flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* ── SECTION TITLE ── */
//     .t2-resume .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* ── SUMMARY ── */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS ── */
//     .t2-resume .skills-block        { margin-bottom: 8px; }
//     .t2-resume .skills-content      { margin-top: 4px; }
//     .t2-resume .skills-content ul,
//     .t2-resume .skills-content ol   { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li   { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p    { margin: 0 0 4px 0 !important; }

//     /* ── PROJECTS ── */
//     .t2-resume .project-links { display: flex; gap: 12px; }
//     .t2-resume .project-link  { font-size: 10px; color: #6b7280; text-decoration: underline; }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* ── ENTRY BLOCKS ── */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       line-height: 1.5;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       line-height: 1.5;
//       white-space: nowrap;
//     }
//     .t2-resume .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }
//     .t2-resume .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; background: white; }
//       .t2-resume {
//         width: 100% !important;
//         box-shadow: none !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
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
//     </script>
//   `;

//   // ── Single HTML builder ───────────────────────────────────
//   const generateHTML = useMemo((): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;
//     const rich = (html: string) => {
//       const c = cleanQuillHTML(html);
//       return c && c !== "<p><br></p>" ? c : "";
//     };
//     const formDob = formatDateOfBirth(dateOfBirth || "");

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     // Photo
//     const photoBlock = base64Image
//       ? `<div class="header-photo-col">
//            <img src="${base64Image}" alt="Profile" class="header-photo"/>
//          </div>`
//       : "";

//     // Header
//     const header = `
//       <div class="header-wrap">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl && linkedinUrl.trim() ? `<a href="${href(linkedinUrl)}"  class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl && githubUrl.trim() ? `<a href="${href(githubUrl)}"    class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl && portfolioUrl.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//     // Summary
//     const summaryBlock = summary
//       ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${rich(summary)}</div>
//       </div>`
//       : "";

//     // Skills
//     const skillsClean = rich(skills || "");
//     const skillsBlock = skillsClean
//       ? `
//       <div class="skills-block">
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${skillsClean}</div>
//       </div>`
//       : "";

//     // Custom sections
//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       )
//         ? `<div class="custom-section-block">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div style="margin-bottom:6px">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>`,
//             )
//             .join("")}
//         </div>`
//         : "";

//     // Experience
//     const expBlock = experiences.length
//       ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//               <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//             ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     // Projects
//     const projBlock = projects.length
//       ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${p.title || ""}</div>
//               <div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//       : "";

//     // Education
//     const eduBlock = educations.length
//       ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr = [edu.startDate, edu.endDate || "Present"]
//               .filter(Boolean)
//               .join(" - ");
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${edu.degree || ""}</div>
//               ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//             </div>
//             ${
//               edu.schoolname || edu.location || grade
//                 ? `
//               <div class="entry-subtitle">
//                 ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//               </div>`
//                 : ""
//             }
//             ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body>
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">
//         ${summaryBlock}
//         ${skillsBlock}
//         ${customBlock}
//       </div>
//       <div class="col-divider"></div>
//       <div class="right-col">
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//       </div>
//     </div>
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
//     base64Image,
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
//         { html: generateHTML }, // same string preview uses
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
//         /*
//           THUMBNAIL mode — scale A4 iframe to a small card.
//           pointer-events:none = view only, no interaction.
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
//               display: "block",
//               overflow: "hidden",
//             }}
//             scrolling="no"
//             sandbox="allow-same-origin"
//           />
//         </div>
//       ) : (
//         /*
//           FULL VIEW mode.
//           ─────────────────────────────────────────────────────
//           The iframe is always exactly 210mm wide — matching the
//           .t2-resume div inside it. Never use % width here or
//           content on the right edge will be clipped.

//           Height is set dynamically via postMessage so the iframe
//           is exactly as tall as its content → no scrollbar.

//           Spacing in preview  = body padding in CSS (mirrors @page margin)
//           Spacing in PDF      = @page { margin: 10mm } in CSS
//         */
//         <div
//           style={{
//             width: "210mm",
//             margin: "0 auto",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <iframe
//             ref={iframeRef}
//             srcDoc={generateHTML}
//             title="resume-full"
//             style={{
//               width: "210mm" /* fixed — NEVER % */,
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

// export default TemplateTwo;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
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

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // ── Dynamic iframe height (removes scrollbar) ─────────────
//   const [iframeHeight, setIframeHeight] = useState<number>(1122); // 297mm fallback

//   useEffect(() => {
//     const handler = (e: MessageEvent) => {
//       if (e.data?.type === "RESUME_HEIGHT") {
//         setIframeHeight(e.data.height);
//       }
//     };
//     window.addEventListener("message", handler);
//     return () => window.removeEventListener("message", handler);
//   }, []);

//   // ── Data ──────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
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

//   // ── Photo → base64 (so it works inside srcdoc / PDF) ──────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;

//     const processImage = async () => {
//       if (!contact.photo) {
//         setBase64Image(null);
//         return;
//       }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };

//     processImage();
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     * { margin: 0; padding: 0; box-sizing: border-box; }

//     html, body {
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     /* For screen preview - add visible margins */
//     body {
//       padding: 10mm;
//     }

//     /* For PDF - @page margins */
//     @page {
//       size: A4;
//       margin: 10mm;
//     }

//     .t2-resume {
//       max-width: 190mm; /* 210mm - 20mm (total margins) */
//       margin: 0 auto;
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     /* Remove body padding when printing */
//     @media print {
//       body {
//         padding: 0;
//         margin: 0;
//       }

//       .t2-resume {
//         max-width: none;
//         margin: 0;
//       }
//     }

//     /* ── SCOPED RESETS ── */
//     .t2-resume p,
//     .t2-resume div,
//     .t2-resume span,
//     .t2-resume i,
//     .t2-resume a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }
//     .t2-resume ul,
//     .t2-resume ol  { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em,     .t2-resume i { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* ── HEADER ── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       margin-bottom: 2px;
//     }
//     .t2-resume .header-address,
//     .t2-resume .header-email,
//     .t2-resume .header-phone,
//     .t2-resume .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//     }

//     /* ── BODY ── */
//     .t2-resume .body-wrap {
//       display: flex;
//       gap: 12px;
//       flex: 1;
//       padding-top: 10px;
//     }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 8px 4px;
//       flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* ── SECTION TITLE ── */
//     .t2-resume .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* ── SUMMARY ── */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS ── */
//     .t2-resume .skills-block        { margin-bottom: 8px; }
//     .t2-resume .skills-content      { margin-top: 4px; }
//     .t2-resume .skills-content ul,
//     .t2-resume .skills-content ol   { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li   { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p    { margin: 0 0 4px 0 !important; }

//     /* ── PROJECTS ── */
//     .t2-resume .project-links { display: flex; gap: 12px; }
//     .t2-resume .project-link  { font-size: 10px; color: #6b7280; text-decoration: underline; }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* ── ENTRY BLOCKS ── */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       line-height: 1.5;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       line-height: 1.5;
//       white-space: nowrap;
//     }
//     .t2-resume .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }
//     .t2-resume .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body {
//         overflow: visible;
//         background: white;
//         margin: 0;
//         padding: 0;
//       }
//       .t2-resume {
//         width: 100% !important;
//         max-width: none !important;
//         box-shadow: none !important;
//         margin: 0 !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
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
//     </script>
//   `;

//   // ── Single HTML builder ───────────────────────────────────
//   const generateHTML = useMemo((): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;
//     const rich = (html: string) => {
//       const c = cleanQuillHTML(html);
//       return c && c !== "<p><br></p>" ? c : "";
//     };
//     const formDob = formatDateOfBirth(dateOfBirth || "");

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     // Photo
//     const photoBlock = base64Image
//       ? `<div class="header-photo-col">
//            <img src="${base64Image}" alt="Profile" class="header-photo"/>
//          </div>`
//       : "";

//     // Header
//     const header = `
//       <div class="header-wrap">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl && linkedinUrl.trim() ? `<a href="${href(linkedinUrl)}"  class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl && githubUrl.trim() ? `<a href="${href(githubUrl)}"    class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl && portfolioUrl.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//     // Summary
//     const summaryBlock = summary
//       ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${rich(summary)}</div>
//       </div>`
//       : "";

//     // Skills
//     const skillsClean = rich(skills || "");
//     const skillsBlock = skillsClean
//       ? `
//       <div class="skills-block">
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${skillsClean}</div>
//       </div>`
//       : "";

//     // Custom sections
//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       )
//         ? `<div class="custom-section-block">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div style="margin-bottom:6px">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>`,
//             )
//             .join("")}
//         </div>`
//         : "";

//     // Experience
//     const expBlock = experiences.length
//       ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//               <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//             ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     // Projects
//     const projBlock = projects.length
//       ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${p.title || ""}</div>
//               <div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//       : "";

//     // Education
//     const eduBlock = educations.length
//       ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr = [edu.startDate, edu.endDate || "Present"]
//               .filter(Boolean)
//               .join(" - ");
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${edu.degree || ""}</div>
//               ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//             </div>
//             ${
//               edu.schoolname || edu.location || grade
//                 ? `
//               <div class="entry-subtitle">
//                 ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//               </div>`
//                 : ""
//             }
//             ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body>
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">
//         ${summaryBlock}
//         ${skillsBlock}
//         ${customBlock}
//       </div>
//       <div class="col-divider"></div>
//       <div class="right-col">
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//       </div>
//     </div>
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
//     base64Image,
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
//         {
//           html: generateHTML,
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
//       {/* {lastSegment === "download-resume" && ( */}
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//         >
//           Download Resume
//         </motion.button>
//       </div>
//       {/* )} */}

//       {alldata ? (
//         /*
//           THUMBNAIL mode — scale A4 iframe to a small card.
//           pointer-events:none = view only, no interaction.
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
//               display: "block",
//               overflow: "hidden",
//             }}
//             scrolling="no"
//             sandbox="allow-same-origin"
//           />
//         </div>
//       ) : (
//         /*
//           FULL VIEW mode.
//         */
//         <div
//           style={{
//             width: "210mm",
//             margin: "0 auto",
//             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <iframe
//             ref={iframeRef}
//             srcDoc={generateHTML}
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

// export default TemplateTwo;

// "use client";
// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
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

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // ── Dynamic iframe height (removes scrollbar) ─────────────
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

//   // ── Data ──────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
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

//   // ── Photo → base64 (so it works inside srcdoc / PDF) ──────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;

//     const processImage = async () => {
//       if (!contact.photo) {
//         setBase64Image(null);
//         return;
//       }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };

//     processImage();
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     /* For PDF - @page margins */
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

//     .t2-resume {
//       max-width: 190mm; /* 210mm - 20mm (total margins) */
//       margin: 0 auto;
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     @media print {
//       .t2-resume {
//         max-width: none;
//         margin: 0;
//       }
//     }

//     /* ── SCOPED RESETS ── */
//     .t2-resume p,
//     .t2-resume div,
//     .t2-resume span,
//     .t2-resume i,
//     .t2-resume a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }
//     .t2-resume ul,
//     .t2-resume ol  { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em,     .t2-resume i { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* ── HEADER ── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       margin-bottom: 2px;
//     }
//     .t2-resume .header-address,
//     .t2-resume .header-email,
//     .t2-resume .header-phone,
//     .t2-resume .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//     }

//     /* ── BODY ── */
//     .t2-resume .body-wrap {
//       display: flex;
//       gap: 12px;
//       flex: 1;
//       padding-top: 10px;
//     }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 8px 4px;
//       flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* ── SECTION TITLE ── */
//     .t2-resume .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* ── SUMMARY ── */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS ── */
//     .t2-resume .skills-block        { margin-bottom: 8px; }
//     .t2-resume .skills-content      { margin-top: 4px; }
//     .t2-resume .skills-content ul,
//     .t2-resume .skills-content ol   { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li   { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p    { margin: 0 0 4px 0 !important; }

//     /* ── PROJECTS ── */
//     .t2-resume .project-links { display: flex; gap: 12px; }
//     .t2-resume .project-link  { font-size: 10px; color: #6b7280; text-decoration: underline; }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* ── ENTRY BLOCKS ── */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       line-height: 1.5;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       line-height: 1.5;
//       white-space: nowrap;
//     }
//     .t2-resume .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }
//     .t2-resume .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body {
//         overflow: visible;
//         background: white;
//         margin: 0;
//         padding: 0;
//       }
//       .t2-resume {
//         width: 100% !important;
//         max-width: none !important;
//         box-shadow: none !important;
//         margin: 0 !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
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
//       // Observe DOM changes for dynamic height updates
//       const observer = new MutationObserver(reportHeight);
//       observer.observe(document.body, { childList: true, subtree: true, attributes: true });
//     </script>
//   `;

//   // ── Single HTML builder ───────────────────────────────────
//   const generateHTML = useCallback((): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;
//     const rich = (html: string) => {
//       const c = cleanQuillHTML(html);
//       return c && c !== "<p><br></p>" ? c : "";
//     };
//     const formDob = formatDateOfBirth(dateOfBirth || "");

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     // Photo
//     const photoBlock = base64Image
//       ? `<div class="header-photo-col">
//            <img src="${base64Image}" alt="Profile" class="header-photo"/>
//          </div>`
//       : "";

//     // Header
//     const header = `
//       <div class="header-wrap">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl && linkedinUrl.trim() ? `<a href="${href(linkedinUrl)}"  class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl && githubUrl.trim() ? `<a href="${href(githubUrl)}"    class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl && portfolioUrl.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//     // Summary
//     const summaryBlock = summary
//       ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${rich(summary)}</div>
//       </div>`
//       : "";

//     // Skills
//     const skillsClean = rich(skills || "");
//     const skillsBlock = skillsClean
//       ? `
//       <div class="skills-block">
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${skillsClean}</div>
//       </div>`
//       : "";

//     // Custom sections
//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       )
//         ? `<div class="custom-section-block">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div style="margin-bottom:6px">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>`,
//             )
//             .join("")}
//         </div>`
//         : "";

//     // Experience
//     const expBlock = experiences.length
//       ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//               <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//             ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     // Projects
//     const projBlock = projects.length
//       ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${p.title || ""}</div>
//               <div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//       : "";

//     // Education
//     const eduBlock = educations.length
//       ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr = [edu.startDate, edu.endDate || "Present"]
//               .filter(Boolean)
//               .join(" - ");
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${edu.degree || ""}</div>
//               ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//             </div>
//             ${
//               edu.schoolname || edu.location || grade
//                 ? `
//               <div class="entry-subtitle">
//                 ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//               </div>`
//                 : ""
//             }
//             ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//       : "";

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
// </head>
// <body>
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">
//         ${summaryBlock}
//         ${skillsBlock}
//         ${customBlock}
//       </div>
//       <div class="col-divider"></div>
//       <div class="right-col">
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//       </div>
//     </div>
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
//     base64Image,
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
//               top: "10mm",
//               right: "10mm",
//               bottom: "10mm",
//               left: "10mm",
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
//       {/* {lastSegment === "download-resume" && ( */}
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//         >
//           Download Resume
//         </motion.button>
//       </div>
//       {/* )} */}

//       {alldata ? (
//         /*
//           THUMBNAIL mode — using direct div for better performance
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
//           FULL VIEW mode with iframe
//         */
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

// export default TemplateTwo;












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
// //   .t2-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data ──────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
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

//   // ── Photo → base64 (so it works inside srcdoc / PDF) ──────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;

//     const processImage = async () => {
//       if (!contact.photo) {
//         setBase64Image(null);
//         return;
//       }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };

//     processImage();
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.photo]);

//   // ── CSS (single source — used in both iframe & PDF) ───────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t2-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     /* ── SCOPED RESETS ── */
//     .t2-resume p,
//     .t2-resume div,
//     .t2-resume span,
//     .t2-resume i,
//     .t2-resume a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }
//     .t2-resume ul,
//     .t2-resume ol  { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em,     .t2-resume i { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* ── HEADER ── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       margin-bottom: 2px;
//     }
//     .t2-resume .header-address,
//     .t2-resume .header-email,
//     .t2-resume .header-phone,
//     .t2-resume .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//     }

//     /* ── BODY ── */
//     .t2-resume .body-wrap {
//       display: flex;
//       gap: 12px;
//       flex: 1;
//       padding-top: 10px;
//     }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 8px 4px;
//       flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* ── SECTION TITLE ── */
//     .t2-resume .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* ── SUMMARY ── */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS ── */
//     .t2-resume .skills-block        { margin-bottom: 8px; }
//     .t2-resume .skills-content      { margin-top: 4px; }
//     .t2-resume .skills-content ul,
//     .t2-resume .skills-content ol   { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li   { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p    { margin: 0 0 4px 0 !important; }

//     /* ── PROJECTS ── */
//     .t2-resume .project-links { display: flex; gap: 12px; }
//     .t2-resume .project-link  { font-size: 10px; color: #6b7280; text-decoration: underline; }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* ── ENTRY BLOCKS ── */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       line-height: 1.5;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       line-height: 1.5;
//       white-space: nowrap;
//     }
//     .t2-resume .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }
//     .t2-resume .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── PRINT / PDF ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { 
//         overflow: visible; 
//         background: white;
//         margin: 0;
//         padding: 0;
//       }
//       .t2-resume {
//         width: 100% !important;
//         max-width: none !important;
//         box-shadow: none !important;
//         margin: 0 !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const rich = (html: string) => {
//         const c = cleanQuillHTML(html);
//         return c && c !== "<p><br></p>" ? c : "";
//       };
//       const formDob = formatDateOfBirth(dateOfBirth || "");

//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       // Photo
//       const photoBlock = base64Image
//         ? `<div class="header-photo-col">
//            <img src="${base64Image}" alt="Profile" class="header-photo"/>
//          </div>`
//         : "";

//       // Header
//       const header = `
//       <div class="header-wrap">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl && linkedinUrl.trim() ? `<a href="${href(linkedinUrl)}"  class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl && githubUrl.trim() ? `<a href="${href(githubUrl)}"    class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl && portfolioUrl.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//       // Summary
//       const summaryBlock = summary
//         ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${rich(summary)}</div>
//       </div>`
//         : "";

//       // Skills
//       const skillsClean = rich(skills || "");
//       const skillsBlock = skillsClean
//         ? `
//       <div class="skills-block">
//         <div class="section-title">Skills</div>
//         <div class="skills-content">${skillsClean}</div>
//       </div>`
//         : "";

//       // Custom sections
//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? `<div class="custom-section-block">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div style="margin-bottom:6px">
//                 ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//               </div>`,
//             )
//             .join("")}
//         </div>`
//           : "";

//       // Experience
//       const expBlock = experiences.length
//         ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp: any) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, false)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//               <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//             </div>
//             ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//             ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//         : "";

//       // Projects
//       const projBlock = projects.length
//         ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Projects</div>
//         ${projects
//           .map(
//             (p: any) => `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${p.title || ""}</div>
//               <div class="project-links">
//                 ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
//                 ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//             ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//           </div>`,
//           )
//           .join("")}
//       </div>`
//         : "";

//       // Education
//       const eduBlock = educations.length
//         ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu: any) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const dateStr = [edu.startDate, edu.endDate || "Present"]
//               .filter(Boolean)
//               .join(" - ");
//             return `
//           <div class="entry-block">
//             <div class="entry-top-row">
//               <div class="entry-title">${edu.degree || ""}</div>
//               ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//             </div>
//             ${
//               edu.schoolname || edu.location || grade
//                 ? `
//               <div class="entry-subtitle">
//                 ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//               </div>`
//                 : ""
//             }
//             ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//         : "";

//       // PDF override: strip the fixed width/padding from .t2-resume so Puppeteer's
//       // own 15mm margins control the layout
//       const pdfOverrideStyle = forPDF
//         ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">
//         ${summaryBlock}
//         ${skillsBlock}
//         ${customBlock}
//       </div>
//       <div class="col-divider"></div>
//       <div class="right-col">
//         ${expBlock}
//         ${projBlock}
//         ${eduBlock}
//       </div>
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
//       finalize,
//       summary,
//       base64Image,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//     ],
//   );

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
//           const resume = doc.querySelector<HTMLElement>(".t2-resume");
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
//             ".entry-block",
//             ".header-wrap",
//             ".section-title",
//             ".custom-section-block",
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
//     .t2-resume {
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
//             {lastSegment === "download-resume" && (

//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg cursor-pointer"
//         >
//           Download Resume
//         </motion.button>
//       </div>
//             )}

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

// export default TemplateTwo;







































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
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";

// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Data ──────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
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

//   // ── Photo → base64 ────────────────────────────────────────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;
//     const processImage = async () => {
//       if (!contact.photo) { setBase64Image(null); return; }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (contact.photo && typeof contact.photo === "object" && "size" in contact.photo) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };
//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   // ── CSS ───────────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t2-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//    .t2-resume div, .t2-resume span, .t2-resume i, .t2-resume a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }
//       .t2-resume p {
//       margin: 0 0 0 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t2-resume ul, .t2-resume ol { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em, .t2-resume i     { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px; height: 100px;
//       border-radius: 6px; object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1; padding-right: 12px;
//       display: flex; flex-direction: column; justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px; font-weight: 400; letter-spacing: 0.025em;
//       color: #1f2937; line-height: 1.25; text-transform: capitalize; margin-bottom: 2px;
//     }
//     .t2-resume .header-address, .t2-resume .header-email,
//     .t2-resume .header-phone,   .t2-resume .header-dob {
//       font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 1px;
//     }
//     .t2-resume .header-links { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
//     .t2-resume .header-link {
//       font-size: 12px; font-weight: 700; color: #000;
//       text-decoration: underline; text-underline-offset: 3px;
//     }

//     .t2-resume .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px; border-left: 1px solid #d1d5db;
//       margin: 8px 4px; flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     .t2-resume .section-title {
//       font-size: 13px; font-weight: 700;
//       text-decoration: underline; text-underline-offset: 3px;
//       text-decoration-thickness: 2px; text-decoration-color: #1f2937;
//       letter-spacing: 0.03em; text-transform: uppercase;
//       color: #111827; margin-bottom: 4px; margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  { font-size: 13px; color: #374151; line-height: 1.5; word-wrap: break-word; overflow-wrap: break-word; }

//     .t2-resume .skills-block   { margin-bottom: 8px; }
//     .t2-resume .skills-content { margin-top: 4px; }
//     .t2-resume .skills-content ul, .t2-resume .skills-content ol { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p  { margin: 0 0 4px 0 !important; }

//     .t2-resume .project-links    { display: flex; gap: 12px; }
//     .t2-resume .project-link     { font-size: 10px; color: #111827; text-decoration: underline; }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex; justify-content: space-between;
//       align-items: center; margin-bottom: 1px;
//     }
//     .t2-resume .entry-title   { font-size: 11.5px; font-weight: 700; font-style: italic; color: #111827; line-height: 1.5; }
//     .t2-resume .entry-date    { font-size: 11.5px; font-weight: 700; color: #111827; line-height: 1.5; white-space: nowrap; }
//     .t2-resume .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
//     .t2-resume .entry-content  { font-size: 13px; color: #374151; line-height: 1.5; word-wrap: break-word; overflow-wrap: break-word; }
//     .t2-resume .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content { font-size: 13px; color: #374151; line-height: 1.5; word-wrap: break-word; overflow-wrap: break-word; }

//     /* Page break marker injected for PDF */
//     .t2-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       html, body { overflow: visible; background: white; margin: 0; padding: 0; }
//       .t2-resume { width: 100% !important; max-width: none !important; box-shadow: none !important; margin: 0 !important; }
//       .t2-resume .header-wrap { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   // pageBreakIds: data-block-ids where page breaks should be injected (PDF only)
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const rich = (html: string) => {
//         const c = cleanQuillHTML(html);
//         return c && c !== "<p><br></p>" ? c : "";
//       };
//       const formDob = formatDateOfBirth(dateOfBirth || "");

//       const addressStr = [
//         contact?.address, contact?.city, contact?.postCode, contact?.country,
//       ].filter(Boolean).join(", ");

//       const photoBlock = base64Image
//         ? `<div class="header-photo-col">
//              <img src="${base64Image}" alt="Profile" class="header-photo"/>
//            </div>`
//         : "";

//       const header = `
//       <div class="header-wrap" data-block-id="header">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//       const summaryBlock = summary
//         ? `<div class="summary-block" data-block-id="summary">
//              <div class="section-title">Summary</div>
//              <div class="summary-text">${rich(summary)}</div>
//            </div>`
//         : "";

//       const skillsClean = rich(skills || "");
//       const skillsBlock = skillsClean
//         ? `<div class="skills-block" data-block-id="skills-section">
//              <div class="section-title">Skills</div>
//              <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//            </div>`
//         : "";

//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//           ? `<div class="custom-section-block" data-block-id="custom-section">
//               ${finalize.customSection
//                 .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                 .map((s: any, i: number) => `
//                   <div style="margin-bottom:6px" data-block-id="custom-${i}">
//                     ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//                   </div>`)
//                 .join("")}
//              </div>`
//           : "";

//       const expBlock = experiences.length
//         ? `<div data-block-id="exp-section">
//              <div class="section-title">Experience</div>
//              ${experiences.map((exp: any, i: number) => {
//                const start = formatMonthYear(exp.startDate, false);
//                const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//                return `<div class="entry-block" data-block-id="exp-${i}">
//                  <div class="entry-top-row">
//                    ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//                    <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//                  </div>
//                  ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//                  ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//                </div>`;
//              }).join("")}
//            </div>`
//         : "";

//       const projBlock = projects.length
//         ? `<div style="margin-top:6px" data-block-id="proj-section">
//              <div class="section-title">Projects</div>
//              ${projects.map((p: any, i: number) => `
//                <div class="entry-block" data-block-id="proj-${i}">
//                  <div class="entry-top-row">
//                    <div class="entry-title">${p.title || ""}</div>
//                    <div class="project-links">
//                      ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                      ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//                    </div>
//                  </div>
//                  ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//                  ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//                </div>`).join("")}
//            </div>`
//         : "";

//       const eduBlock = educations.length
//         ? `<div style="margin-top:6px" data-block-id="edu-section">
//              <div class="section-title">Education</div>
//              ${educations.map((edu: any, i: number) => {
//                const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                const dateStr = [edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" - ");
//                return `<div class="entry-block" data-block-id="edu-${i}">
//                  <div class="entry-top-row">
//                    <div class="entry-title">${edu.degree || ""}</div>
//                    ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//                  </div>
//                  ${edu.schoolname || edu.location || grade ? `
//                    <div class="entry-subtitle">
//                      ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//                    </div>` : ""}
//                  ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//                </div>`;
//              }).join("")}
//            </div>`
//         : "";

//       const pdfStyle = forPDF
//         ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       let leftCol = `${summaryBlock}${skillsBlock}${customBlock}`;
//       let rightCol = `${expBlock}${projBlock}${eduBlock}`;

//       // Inject page-break markers for PDF at calculated cut points
//       if (forPDF && pageBreakIds.length > 0) {
//         const injectBreaks = (html: string): string => {
//           const tempDiv = document.createElement("div");
//           tempDiv.innerHTML = html;
//           pageBreakIds.forEach((id) => {
//             const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//             if (el) {
//               const breakDiv = document.createElement("div");
//               breakDiv.className = "t2-page-break";
//               el.parentNode?.insertBefore(breakDiv, el);
//             }
//           });
//           return tempDiv.innerHTML;
//         };
//         leftCol = injectBreaks(leftCol);
//         rightCol = injectBreaks(rightCol);
//       }

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">${leftCol}</div>
//       <div class="col-divider"></div>
//       <div class="right-col">${rightCol}</div>
//     </div>
//   </div>
// </body>
// </html>`;
//     },
//     [
//       contact, educations, experiences, skills, projects, finalize,
//       summary, base64Image, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — same logic as TemplateOne
//   // Measures in a hidden iframe, calculates cut points by finding blocks
//   // that straddle each page boundary, clips each page at the actual cut point.
//   // Also stores pageBreakIds so PDF download uses the same breaks.
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed", "top:0", "left:-9999px",
//           `width:${A4_W}px`, "height:10000px", "border:none",
//           "opacity:0", "pointer-events:none", "z-index:-1",
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
//     .t2-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           // Individual avoid-break items
//           const ITEM_SELECTORS = [
//             ".entry-block",
//             ".summary-block",
//             ".skills-block",
//             ".custom-section-block",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           // Section title + first item paired — prevents orphaned titles
//           resume.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
//             const titleTop = getRelTop(title);
//             let firstItem: HTMLElement | null = null;
//             let sib = title.nextElementSibling as HTMLElement | null;
//             while (sib) {
//               if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
//               sib = sib.nextElementSibling as HTMLElement | null;
//             }
//             if (firstItem) {
//               const deepChild = firstItem.querySelector<HTMLElement>(
//                 ".entry-block, .skills-content, .custom-section-block"
//               );
//               const anchor = deepChild || firstItem;
//               const anchorBottom = getRelBottom(anchor);
//               if (anchorBottom - titleTop > 8) {
//                 const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
//                 blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
//               }
//             }
//           });

//           blocks.sort((a, b) => a.top - b.top);

//           // Calculate cut points — pick min(top) among all straddling blocks
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

//           // Store pageBreakIds for PDF download
//           (window as any).__resumeT2PageBreakIds = pageBreakIds;

//           document.body.removeChild(iframe);

//           // Build page HTMLs — clip height = nextStart - thisStart (not always PAGE_CONTENT_H)
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
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t2-resume {
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
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download — uses pageBreakIds from splitIntoPages ─
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumeT2PageBreakIds || [];
     
//        const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html:generateHTML(true, pageBreakIds)  },
//         { responseType: "blob" },
//       );
     
//       // const res: AxiosResponse<Blob> = await axios.post(
//       //   `${API_URL}/api/candidates/generate-pdf`,
//       //   { html: generateHTML(true, pageBreakIds) },
//       //   { responseType: "blob" },
//       // );
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
//         <div
//           style={{
//             width: `${A4_W}px`, height: `${A4_H}px`,
//             transform: "scale(0.36)", transformOrigin: "top left",
//             overflow: "hidden", pointerEvents: "none", flexShrink: 0,
//           }}
//         >
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 14, fontFamily: "sans-serif" }}>
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//                 <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", whiteSpace: "nowrap", padding: "3px 12px", background: "#f3f4f6", borderRadius: "999px", border: "1px solid #e5e7eb", letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif" }}>
//                   Page {idx + 1}{pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//               </div>
//               <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, overflow: "hidden", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)", borderRadius: "2px", flexShrink: 0 }}>
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
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

// export default TemplateTwo;














// "use client";
// import React, {
//   useContext,
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { ResumeProps } from "@/app/types";
// import api from "@/app/utils/api";
// import {
//   ResumeCustomization,
//   SectionKey,
//   DEFAULT_TWO_COLUMN_ORDER,
// } from "@/app/(resume)/download-resume/page"; // adjust path if needed

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// interface TemplateTwoProps extends ResumeProps {
//   customization?: ResumeCustomization;
// }

// const TemplateTwo: React.FC<TemplateTwoProps> = ({ alldata, customization }) => {
//   const context = useContext(CreateContext);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   // ── Customization defaults ────────────────────────────────────────────────
//   const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";
//   const activeLeftOrder: SectionKey[]  =
//     customization?.twoColumnOrder?.left  ?? [...DEFAULT_TWO_COLUMN_ORDER.left];
//   const activeRightOrder: SectionKey[] =
//     customization?.twoColumnOrder?.right ?? [...DEFAULT_TWO_COLUMN_ORDER.right];

//   // ── Data sources ──────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context?.contact || {};
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

//   // ── Photo → base64 ────────────────────────────────────────────────────────
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   useEffect(() => {
//     let objectUrl: string | null = null;
//     const processImage = async () => {
//       if (!contact.photo) { setBase64Image(null); return; }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const res = await fetch(contact.photo);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => setBase64Image(reader.result as string);
//             reader.readAsDataURL(blob);
//           } else {
//             setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (err) {
//         console.error("Error processing image:", err);
//       }
//     };
//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   // ── Font import map (same as TemplateOne) ────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const map: Record<string, string> = {
//       "'Nunito', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//       "'Poppins', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Merriweather', serif":
//         "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
//       "'Playfair Display', serif":
//         "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
//       "'Lato', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Source Code Pro', monospace":
//         "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
//       "'Raleway', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap",
//       "'DM Serif Display', serif":
//         "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
//     };
//     return (
//       map[fontFamily] ??
//       "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap"
//     );
//   };

//   // ── CSS builder (font injected dynamically) ───────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t2-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: ${fontFamily};
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     .t2-resume div, .t2-resume span, .t2-resume i, .t2-resume a {
//       font-family: ${fontFamily};
//       line-height: 1.5;
//     }
//     .t2-resume p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t2-resume ul, .t2-resume ol { margin: 0 0 0 20px !important; padding: 0 !important; }
//     .t2-resume ul  { list-style-type: disc !important; }
//     .t2-resume ol  { list-style-type: decimal !important; }
//     .t2-resume li  {
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: ${fontFamily} !important;
//     }
//     .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
//     .t2-resume em, .t2-resume i     { font-style: italic !important; }
//     .t2-resume u                    { text-decoration: underline !important; }

//     /* ── Header ─────────────────────────────────────────────── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//       flex-shrink: 0;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t2-resume .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-shrink: 0;
//     }
//     .t2-resume .header-photo {
//       width: 100px; height: 100px;
//       border-radius: 6px; object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }
//     .t2-resume .header-info-col {
//       flex: 1; padding-right: 12px;
//       display: flex; flex-direction: column; justify-content: center;
//     }
//     .t2-resume .header-name {
//       font-size: 26px; font-weight: 400; letter-spacing: 0.025em;
//       color: #1f2937; line-height: 1.25; text-transform: capitalize; margin-bottom: 2px;
//     }
//     .t2-resume .header-address, .t2-resume .header-email,
//     .t2-resume .header-phone,   .t2-resume .header-dob {
//       font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 1px;
//     }
//     .t2-resume .header-links {
//       display: flex; gap: 16px; align-items: center;
//       flex-wrap: nowrap;
//     }
//     .t2-resume .header-link {
//       font-size: 12px; font-weight: 700;
//       color: #000 !important; text-decoration: underline !important;
//       text-underline-offset: 3px; white-space: nowrap; display: inline-block;
//     }

//     /* ── Body two-column ────────────────────────────────────── */
//     .t2-resume .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
//     .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
//     .t2-resume .col-divider {
//       width: 1px; border-left: 1px solid #d1d5db;
//       margin: 8px 4px; flex-shrink: 0;
//     }
//     .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

//     /* ── Section titles ──────────────────────────────────────── */
//     .t2-resume .section-title {
//       font-size: 13px; font-weight: 700;
//       text-decoration: underline; text-underline-offset: 3px;
//       text-decoration-thickness: 2px; text-decoration-color: #1f2937;
//       letter-spacing: 0.03em; text-transform: uppercase;
//       color: #111827; margin-bottom: 4px; margin-top: 12px;
//       line-height: 1.5;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t2-resume .section-title:first-child { margin-top: 0; }

//     /* ── Summary ─────────────────────────────────────────────── */
//     .t2-resume .summary-block { margin-bottom: 6px; }
//     .t2-resume .summary-text  {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     /* ── Skills ──────────────────────────────────────────────── */
//     .t2-resume .skills-block   { margin-bottom: 8px; }
//     .t2-resume .skills-content { margin-top: 4px; }
//     .t2-resume .skills-content ul, .t2-resume .skills-content ol { margin: 4px 0 4px 20px !important; }
//     .t2-resume .skills-content li { margin-bottom: 2px !important; }
//     .t2-resume .skills-content p  { margin: 0 0 4px 0 !important; }

//     /* ── Project links ───────────────────────────────────────── */
//     .t2-resume .project-links {
//       display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center;
//     }
//     .t2-resume .project-link {
//       font-size: 10px; color: #6b7280 !important;
//       text-decoration: underline !important;
//       white-space: nowrap; display: inline-block;
//     }
//     .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

//     /* ── Entry blocks ────────────────────────────────────────── */
//     .t2-resume .entry-block {
//       margin-bottom: 6px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t2-resume .entry-top-row {
//       display: flex; justify-content: space-between;
//       align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
//     }
//     .t2-resume .entry-title {
//       font-size: 11.5px; font-weight: 700; font-style: italic;
//       color: #111827; line-height: 1.5; flex: 1; min-width: 0;
//     }
//     .t2-resume .entry-date {
//       font-size: 11.5px; font-weight: 700; color: #111827;
//       line-height: 1.5; white-space: nowrap; flex-shrink: 0;
//     }
//     .t2-resume .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
//     .t2-resume .entry-content  {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t2-resume .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

//     /* ── Custom sections ─────────────────────────────────────── */
//     .t2-resume .custom-section-block   { margin: 6px 0; }
//     .t2-resume .custom-section-content {
//       font-size: 13px; color: #374151; line-height: 1.5;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }

//     /* ── Page break marker ───────────────────────────────────── */
//     .t2-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       html, body { overflow: visible; background: white; margin: 0; padding: 0; }
//       .t2-resume {
//         width: 100% !important; max-width: none !important;
//         box-shadow: none !important; margin: 0 !important;
//       }
//       .t2-resume .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       /* Keep link colours in PDF */
//       .t2-resume .header-link {
//         color: #000 !important;
//         text-decoration: underline !important;
//       }
//       .t2-resume .project-link {
//         color: #6b7280 !important;
//         text-decoration: underline !important;
//       }
//     }
//   `,
//     [],
//   );

//   // ── HTML builder ──────────────────────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const CSS = buildCSS(activeFontFamily);

//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const rich = (html: string) => {
//         const c = cleanQuillHTML(html);
//         return c && c !== "<p><br></p>" ? c : "";
//       };
//       const formDob = formatDateOfBirth(dateOfBirth || "");

//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       // ── Header (always rendered, never reordered) ──────────────────────
//       const photoBlock = base64Image
//         ? `<div class="header-photo-col">
//              <img src="${base64Image}" alt="Profile" class="header-photo"/>
//            </div>`
//         : "";

//       const header = `
//       <div class="header-wrap" data-block-id="header">
//         ${photoBlock}
//         <div class="header-info-col">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//           ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//           ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
//           <div class="header-links">
//             ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
//             ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
//             ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
//           </div>
//         </div>
//       </div>`;

//       // ── Section builders keyed by SectionKey ──────────────────────────
//       // TemplateTwo is two-column: summary/skills/custom go LEFT, exp/proj/edu go RIGHT.
//       // We still respect activeSectionOrder for ordering within each column.
//       const leftSections: SectionKey[] = ["summary", "skills", "custom"];
//       const rightSections: SectionKey[] = ["experience", "projects", "education"];

//       const sectionBuilders: Record<SectionKey, () => string> = {
//         summary: () =>
//           summary
//             ? `<div class="summary-block" data-block-id="summary">
//                  <div class="section-title">Summary</div>
//                  <div class="summary-text">${rich(summary)}</div>
//                </div>`
//             : "",

//         skills: () => {
//           const skillsClean = rich(skills || "");
//           return skillsClean
//             ? `<div class="skills-block" data-block-id="skills-section">
//                  <div class="section-title">Skills</div>
//                  <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//                </div>`
//             : "";
//         },

//         custom: () =>
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s: any) => s?.name?.trim() || s?.description?.trim(),
//           )
//             ? `<div class="custom-section-block" data-block-id="custom-section">
//                 ${finalize.customSection
//                   .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s: any, i: number) => `
//                     <div style="margin-bottom:6px" data-block-id="custom-${i}">
//                       ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                       ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
//                     </div>`,
//                   )
//                   .join("")}
//                </div>`
//             : "",

//         experience: () =>
//           experiences.length
//             ? `<div data-block-id="exp-section">
//                  <div class="section-title">Experience</div>
//                  ${experiences
//                    .map((exp: any, i: number) => {
//                      const start = formatMonthYear(exp.startDate, false);
//                      const end = exp.endDate
//                        ? formatMonthYear(exp.endDate, false)
//                        : exp.startDate
//                          ? "Present"
//                          : "";
//                      return `<div class="entry-block" data-block-id="exp-${i}">
//                        <div class="entry-top-row">
//                          ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//                          <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//                        </div>
//                        ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
//                        ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
//                      </div>`;
//                    })
//                    .join("")}
//                </div>`
//             : "",

//         projects: () =>
//           projects.length
//             ? `<div style="margin-top:6px" data-block-id="proj-section">
//                  <div class="section-title">Projects</div>
//                  ${projects
//                    .map(
//                      (p: any, i: number) => `
//                    <div class="entry-block" data-block-id="proj-${i}">
//                      <div class="entry-top-row">
//                        <div class="entry-title">${p.title || ""}</div>
//                        <div class="project-links">
//                          ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
//                          ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
//                        </div>
//                      </div>
//                      ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//                      ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
//                    </div>`,
//                    )
//                    .join("")}
//                </div>`
//             : "",

//         education: () =>
//           educations.length
//             ? `<div style="margin-top:6px" data-block-id="edu-section">
//                  <div class="section-title">Education</div>
//                  ${educations
//                    .map((edu: any, i: number) => {
//                      const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                      const dateStr = [edu.startDate, edu.endDate || "Present"]
//                        .filter(Boolean)
//                        .join(" - ");
//                      return `<div class="entry-block" data-block-id="edu-${i}">
//                        <div class="entry-top-row">
//                          <div class="entry-title">${edu.degree || ""}</div>
//                          ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//                        </div>
//                        ${edu.schoolname || edu.location || grade ? `
//                          <div class="entry-subtitle">
//                            ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
//                          </div>` : ""}
//                        ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
//                      </div>`;
//                    })
//                    .join("")}
//                </div>`
//             : "",
//       };

//       // Build left and right columns respecting twoColumnOrder
//       const orderedLeft = activeLeftOrder
//         .filter((k) => leftSections.includes(k))
//         .map((k) => sectionBuilders[k]?.() ?? "")
//         .join("");

//       const orderedRight = activeRightOrder
//         .filter((k) => rightSections.includes(k))
//         .map((k) => sectionBuilders[k]?.() ?? "")
//         .join("");

//       const pdfStyle = forPDF
//         ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>`
//         : "";

//       // Inject page-break markers for PDF
//       let leftCol = orderedLeft;
//       let rightCol = orderedRight;

//       if (forPDF && pageBreakIds.length > 0) {
//         const injectBreaks = (html: string): string => {
//           const tempDiv = document.createElement("div");
//           tempDiv.innerHTML = html;
//           pageBreakIds.forEach((id) => {
//             const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//             if (el) {
//               const breakDiv = document.createElement("div");
//               breakDiv.className = "t2-page-break";
//               el.parentNode?.insertBefore(breakDiv, el);
//             }
//           });
//           return tempDiv.innerHTML;
//         };
//         leftCol = injectBreaks(leftCol);
//         rightCol = injectBreaks(rightCol);
//       }

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t2-resume">
//     ${header}
//     <div class="body-wrap">
//       <div class="left-col">${leftCol}</div>
//       <div class="col-divider"></div>
//       <div class="right-col">${rightCol}</div>
//     </div>
//   </div>
// </body>
// </html>`;
//     },
//     [
//       activeFontFamily,
//       activeLeftOrder,
//       activeRightOrder,
//       contact,
//       educations,
//       experiences,
//       skills,
//       projects,
//       finalize,
//       summary,
//       base64Image,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       buildCSS,
//     ],
//   );

//   // ── Page splitter ─────────────────────────────────────────────────────────
//   const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed", "top:0", "left:-9999px",
//           `width:${A4_W}px`, "height:10000px", "border:none",
//           "opacity:0", "pointer-events:none", "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${CSS_FOR_MEASURE}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t2-resume {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

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

//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".entry-block",
//             ".summary-block",
//             ".skills-block",
//             ".custom-section-block",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8)
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           resume.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
//             const titleTop = getRelTop(title);
//             let firstItem: HTMLElement | null = null;
//             let sib = title.nextElementSibling as HTMLElement | null;
//             while (sib) {
//               if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
//               sib = sib.nextElementSibling as HTMLElement | null;
//             }
//             if (firstItem) {
//               const deepChild = firstItem.querySelector<HTMLElement>(
//                 ".entry-block, .skills-content, .custom-section-block",
//               );
//               const anchor = deepChild || firstItem;
//               const anchorBottom = getRelBottom(anchor);
//               if (anchorBottom - titleTop > 8) {
//                 const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
//                 blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
//               }
//             }
//           });

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
//           // Same global key pattern as TemplateOne
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
//     ${CSS_FOR_MEASURE}
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
//     .t2-resume {
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
//     [CSS_FOR_MEASURE],
//   );

//   // ── Debounced updates ─────────────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── Download event listener (same as TemplateOne — no inline button) ──────
//   useEffect(() => {
//     const handler = async (e: Event) => {
//       try {
//         const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//         const pdfHtml = generateHTML(true, pageBreakIds);

//         const res: AxiosResponse<Blob> = await api.post(
//           `${API_URL}/candidates/generate-pdf`,
//           { html: pdfHtml },
//           { responseType: "blob" },
//         );

//         const url = URL.createObjectURL(res.data);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//       } catch (err) {
//         console.error("PDF error:", err);
//         alert("Failed to generate PDF. Please try again.");
//       }
//     };

//     window.addEventListener("resume:download", handler);
//     return () => window.removeEventListener("resume:download", handler);
//   }, [generateHTML, contact]);

//   // ── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {alldata ? (
//         // Thumbnail mode (template selection grid)
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
//         // Full preview mode (download page)
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

// export default TemplateTwo;















"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
} from "@/app/utils";
import { ResumeProps } from "@/app/types";
import api from "@/app/utils/api";
import {
  ResumeCustomization,
  SectionKey,
  DEFAULT_TWO_COLUMN_ORDER,
} from "@/app/(resume)/download-resume/page";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";


// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateTwoProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateTwo: React.FC<TemplateTwoProps> = ({ alldata, customization }) => {
  const context = useContext(CreateContext);
    const pathname = usePathname();
    const lastSegment = pathname.split("/").pop();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization defaults ────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Nunito', sans-serif";
  const activeLeftOrder: SectionKey[] = customization?.twoColumnOrder?.left ?? [...DEFAULT_TWO_COLUMN_ORDER.left];
  const activeRightOrder: SectionKey[] = customization?.twoColumnOrder?.right ?? [...DEFAULT_TWO_COLUMN_ORDER.right];

  // ── Data sources ──────────────────────────────────────────────────────────
  const contact = alldata?.contact || context?.contact || {};
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

  // ── Photo → base64 ────────────────────────────────────────────────────────
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    const processImage = async () => {
      if (!contact.photo) { setBase64Image(null); return; }
      try {
        if (typeof contact.photo === "string") {
          if (contact.photo.startsWith("blob:")) {
            const res = await fetch(contact.photo);
            const blob = await res.blob();
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result as string);
            reader.readAsDataURL(blob);
          } else {
            setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
          }
        } else if (
          contact.photo &&
          typeof contact.photo === "object" &&
          "size" in contact.photo
        ) {
          objectUrl = URL.createObjectURL(contact.photo as Blob);
          const reader = new FileReader();
          reader.onloadend = () => setBase64Image(reader.result as string);
          reader.readAsDataURL(contact.photo as Blob);
        }
      } catch (err) {
        console.error("Error processing image:", err);
      }
    };
    processImage();
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [contact.photo]);

  // ── Complete Font import map ────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
      "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
      "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'Inter', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes('serif')) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes('monospace')) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ───────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t2-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
    }

    .t2-resume div, .t2-resume span, .t2-resume i, .t2-resume a,
    .t2-resume p, .t2-resume li, .t2-resume strong, .t2-resume b {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }
    .t2-resume p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t2-resume ul, .t2-resume ol { margin: 0 0 0 20px !important; padding: 0 !important; }
    .t2-resume ul  { list-style-type: disc !important; }
    .t2-resume ol  { list-style-type: decimal !important; }
    .t2-resume li  {
      margin-bottom: 1px !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
    }
    .t2-resume strong, .t2-resume b { font-weight: 700 !important; }
    .t2-resume em, .t2-resume i     { font-style: italic !important; }
    .t2-resume u                    { text-decoration: underline !important; }

    /* Header */
    .t2-resume .header-wrap {
      display: flex;
      background-color: #EADCCE;
      padding: 10px 18px;
      border-bottom: 1px solid #d1d5db;
      gap: 16px;
      flex-shrink: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t2-resume .header-photo-col {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .t2-resume .header-photo {
      width: 100px; height: 100px;
      border-radius: 6px; object-fit: cover;
      border: 1px solid #e5e7eb;
    }
    .t2-resume .header-info-col {
      flex: 1; padding-right: 12px;
      display: flex; flex-direction: column; justify-content: center;
    }
    .t2-resume .header-name {
      font-size: 26px; font-weight: 400; letter-spacing: 0.025em;
      color: #1f2937; line-height: 1.25; text-transform: capitalize; margin-bottom: 2px;
    }
    .t2-resume .header-address, .t2-resume .header-email,
    .t2-resume .header-phone,   .t2-resume .header-dob {
      font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 1px;
    }
    .t2-resume .header-links {
      display: flex; gap: 16px; align-items: center;
      flex-wrap: nowrap;
    }
    .t2-resume .header-link {
      font-size: 12px; font-weight: 700;
      color: #000 !important; text-decoration: underline !important;
      text-underline-offset: 3px; white-space: nowrap; display: inline-block;
    }

    /* Body two-column */
    .t2-resume .body-wrap { display: flex; gap: 12px; flex: 1; padding-top: 10px; }
    .t2-resume .left-col  { width: 40%; padding: 8px 0 8px 18px; }
    .t2-resume .col-divider {
      width: 1px; border-left: 1px solid #d1d5db;
      margin: 8px 4px; flex-shrink: 0;
    }
    .t2-resume .right-col { width: 60%; padding: 8px 18px 8px 0; }

    /* Section titles */
    .t2-resume .section-title {
      font-size: 13px; font-weight: 700;
      text-decoration: underline; text-underline-offset: 3px;
      text-decoration-thickness: 2px; text-decoration-color: #1f2937;
      letter-spacing: 0.03em; text-transform: uppercase;
      color: #111827; margin-bottom: 4px; margin-top: 12px;
      line-height: 1.5;
      page-break-after: avoid; break-after: avoid;
    }
    .t2-resume .section-title:first-child { margin-top: 0; }

    /* Summary */
    .t2-resume .summary-block { margin-bottom: 6px; }
    .t2-resume .summary-text  {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    /* Skills */
    .t2-resume .skills-block   { margin-bottom: 8px; }
    .t2-resume .skills-content { margin-top: 4px; }
    .t2-resume .skills-content ul, .t2-resume .skills-content ol { margin: 4px 0 4px 20px !important; }
    .t2-resume .skills-content li { margin-bottom: 2px !important; }
    .t2-resume .skills-content p  { margin: 0 0 4px 0 !important; }

    /* Projects */
    .t2-resume .project-links {
      display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center;
    }
    .t2-resume .project-link {
      font-size: 10px; color: #6b7280 !important;
      text-decoration: underline !important;
      white-space: nowrap; display: inline-block;
    }
    .t2-resume .project-tech-stack { font-size: 11px; color: #6b7280; margin: 2px 0 4px; }

    /* Entry blocks */
    .t2-resume .entry-block {
      margin-bottom: 6px;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t2-resume .entry-top-row {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 1px; flex-wrap: nowrap; gap: 8px;
    }
    .t2-resume .entry-title {
      font-size: 11.5px; font-weight: 700; font-style: italic;
      color: #111827; line-height: 1.5; flex: 1; min-width: 0;
    }
    .t2-resume .entry-date {
      font-size: 11.5px; font-weight: 700; color: #111827;
      line-height: 1.5; white-space: nowrap; flex-shrink: 0;
    }
    .t2-resume .entry-subtitle { font-size: 11px; color: #374151; line-height: 1.5; margin-bottom: 2px; }
    .t2-resume .entry-content  {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .t2-resume .education-grade { font-size: 10px; color: #6b7280; margin-top: 2px; font-weight: 500; }

    /* Custom sections */
    .t2-resume .custom-section-block   { margin: 6px 0; }
    .t2-resume .custom-section-content {
      font-size: 13px; color: #374151; line-height: 1.5;
      word-wrap: break-word; overflow-wrap: break-word;
    }

    /* Page break */
    .t2-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; background: white; margin: 0; padding: 0; }
      .t2-resume {
        width: 100% !important; max-width: none !important;
        box-shadow: none !important; margin: 0 !important;
      }
      .t2-resume .header-wrap {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .t2-resume .header-link {
        color: #000 !important;
        text-decoration: underline !important;
      }
      .t2-resume .project-link {
        color: #6b7280 !important;
        text-decoration: underline !important;
      }
    }
  `,
    [],
  );

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
  
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── HTML builder with proper section ordering ─────────────────────────────
  const generateHTML = useCallback(
(forPDF = false, pageBreakIds: string[] = [], skillsCutIndex = -1): string => {
      const CSS = buildCSS(activeFontFamily);
      
      const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif" 
        ? `<link rel="preconnect" href="https://fonts.googleapis.com">
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
        : '';

      const formDob = formatDateOfBirth(dateOfBirth || "");
      const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ");

      // Header
      const photoBlock = base64Image
        ? `<div class="header-photo-col"><img src="${base64Image}" alt="Profile" class="header-photo"/></div>`
        : "";

      const header = `
      <div class="header-wrap" data-block-id="header">
        ${photoBlock}
        <div class="header-info-col">
          <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
          ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
          ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
          ${formDob ? `<div class="header-dob">${formDob}</div>` : ""}
          <div class="header-links">
            ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="header-link" target="_blank">LinkedIn</a>` : ""}
            ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="header-link" target="_blank">GitHub</a>` : ""}
            ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="header-link" target="_blank">Portfolio</a>` : ""}
          </div>
        </div>
      </div>`;

      // Section builders
      const sectionBuilders: Record<SectionKey, () => string> = {
        summary: () => summary ? `<div class="summary-block" data-block-id="summary">
          <div class="section-title">Summary</div>
          <div class="summary-text">${rich(summary)}</div>
        </div>` : "",

      
skills: () => {
  const skillsClean = rich(skills || "");
  if (!skillsClean) return "";

  if (forPDF && skillsCutIndex >= 0) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = skillsClean;
    const allLis = Array.from(tempDiv.querySelectorAll("li"));
    if (skillsCutIndex < allLis.length) {
      const beforeLis = allLis.slice(0, skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
      const afterLis = allLis.slice(skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
      return `<div class="skills-block" data-block-id="skills-section">
        <div class="section-title">Skills</div>
        <div class="skills-content"><ul>${beforeLis}</ul></div>
        <div class="t2-page-break"></div>
        <div class="skills-content"><ul>${afterLis}</ul></div>
      </div>`;
    }
  }

  return `<div class="skills-block" data-block-id="skills-section">
    <div class="section-title">Skills</div>
    <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
  </div>`;
},

        custom: () => !Array.isArray(finalize) && Array.isArray(finalize?.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
          ? `<div class="custom-section-block" data-block-id="custom-section">
            ${finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any, i: number) => `
              <div style="margin-bottom:6px" data-block-id="custom-${i}">
                ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
                ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
              </div>
            `).join("")}
          </div>` : "",

        experience: () => experiences.length ? `<div data-block-id="exp-section">
          <div class="section-title">Experience</div>
          ${experiences.map((exp: any, i: number) => {
            const start = formatMonthYear(exp.startDate, false);
            const end = exp.endDate ? formatMonthYear(exp.endDate, false) : (exp.startDate ? "Present" : "");
            return `<div class="entry-block" data-block-id="exp-${i}">
              <div class="entry-top-row">
                ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
                <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
              </div>
              ${exp.employer || exp.location ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
              ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
            </div>`;
          }).join("")}
        </div>` : "",

        projects: () => projects.length ? `<div style="margin-top:6px" data-block-id="proj-section">
          <div class="section-title">Projects</div>
          ${projects.map((p: any, i: number) => `
            <div class="entry-block" data-block-id="proj-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${p.title || ""}</div>
                <div class="project-links">
                  ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                  ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
                </div>
              </div>
              ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
              ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
            </div>
          `).join("")}
        </div>` : "",

        education: () => educations.length ? `<div style="margin-top:6px" data-block-id="edu-section">
          <div class="section-title">Education</div>
          ${educations.map((edu: any, i: number) => {
            const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
            const dateStr = [edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" - ");
            return `<div class="entry-block" data-block-id="edu-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${edu.degree || ""}</div>
                ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
              </div>
              ${edu.schoolname || edu.location || grade ? `
                <div class="entry-subtitle">
                  ${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${grade ? ` • ${grade}` : ""}
                </div>` : ""}
              ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
            </div>`;
          }).join("")}
        </div>` : "",
      };

      // Build left and right columns using the custom ordering from props
      const leftSections: SectionKey[] = ["summary", "skills", "custom"];
      const rightSections: SectionKey[] = ["experience", "projects", "education"];

      // Use the active orders to build the columns
      const orderedLeft = activeLeftOrder
        .filter(key => leftSections.includes(key) && sectionBuilders[key]?.())
        .map(key => sectionBuilders[key]())
        .join("");

      const orderedRight = activeRightOrder
        .filter(key => rightSections.includes(key) && sectionBuilders[key]?.())
        .map(key => sectionBuilders[key]())
        .join("");

      const pdfStyle = forPDF ? `<style>.t2-resume { width: 100% !important; padding: 0 !important; }</style>` : "";

      let leftCol = orderedLeft;
      let rightCol = orderedRight;

      if (forPDF && pageBreakIds.length > 0) {
        const injectBreaks = (html: string): string => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          pageBreakIds.forEach((id) => {
            const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
            if (el) {
              const breakDiv = document.createElement("div");
              breakDiv.className = "t2-page-break";
              el.parentNode?.insertBefore(breakDiv, el);
            }
          });
          return tempDiv.innerHTML;
        };
        leftCol = injectBreaks(leftCol);
        rightCol = injectBreaks(rightCol);
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontPreloads}
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t2-resume">
    ${header}
    <div class="body-wrap">
      <div class="left-col">${leftCol}</div>
      <div class="col-divider"></div>
      <div class="right-col">${rightCol}</div>
    </div>
  </div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      activeLeftOrder,
      activeRightOrder,
      contact,
      educations,
      experiences,
      skills,
      projects,
      finalize,
      summary,
      base64Image,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      buildCSS,
    ],
  );

  // ── Page splitter ─────────────────────────────────────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t2-resume");
        if (!resumeEl) { resolve([fullHtml]); return; }
        const resumeSnapshot = resumeEl.outerHTML;

        const iframe = document.createElement("iframe");
        iframe.style.cssText = [
          "position:fixed", "top:0", "left:-9999px",
          `width:${A4_W}px`, "height:10000px", "border:none",
          "opacity:0", "pointer-events:none", "z-index:-1",
        ].join(";");
        document.body.appendChild(iframe);

        const measureDoc = iframe.contentDocument!;
        measureDoc.open();
        measureDoc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    ${CSS_FOR_MEASURE}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    .t2-resume {
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
          const resume = measureDoc.querySelector<HTMLElement>(".t2-resume");
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

          const ITEM_SELECTORS = [".entry-block", ".summary-block",  ".custom-section-block"].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          resume.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
            const titleTop = getRelTop(title);
            let firstItem: HTMLElement | null = null;
            let sib = title.nextElementSibling as HTMLElement | null;
            while (sib) {
              if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
              sib = sib.nextElementSibling as HTMLElement | null;
            }
           // AFTER
if (firstItem) {
  // Skip anchor logic for skills — allow it to split across pages
  if (firstItem.classList.contains("skills-content")) return;

  const deepChild = firstItem.querySelector<HTMLElement>(".entry-block, .custom-section-block");
  const anchor = deepChild || firstItem;
  const anchorBottom = getRelBottom(anchor);
  if (anchorBottom - titleTop > 8) {
    const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
    blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
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
// Treat each li inside skills as a breakable boundary
const skillsLis = Array.from(resume.querySelectorAll<HTMLElement>(".skills-content li"));
skillsLis.forEach((li) => {
  const top = getRelTop(li);
  const bottom = getRelBottom(li);
  if (bottom - top > 2) blocks.push({ top, bottom });
});

// Re-sort after adding li blocks, then recompute page cuts
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

// Detect which li index the cut falls inside skills
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
    ${CSS_FOR_MEASURE}
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
    .t2-resume {
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
    [CSS_FOR_MEASURE],
  );

  // ── Debounced updates ─────────────────────────────────────────────────────
  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
  }, []);

  useEffect(() => {
    scheduleUpdate(generateHTML());
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [generateHTML, scheduleUpdate]);

  useEffect(() => {
    if (!htmlContent) return;
    splitIntoPages(htmlContent).then(setPages);
  }, [htmlContent, splitIntoPages]);

  // ── Download event listener ──────────────────────────────────────────────
  // useEffect(() => {
  //   const handler = async (e: Event) => {
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

  //   window.addEventListener("resume:download", handler);
  //   return () => window.removeEventListener("resume:download", handler);
  // }, [generateHTML, contact]);

    const handleDownload = async (): Promise<void> => {
    try {
     // AFTER
const pageBreakIds: string[] = ((window as any).__resumePageBreakIds || []).filter(
  (id: string) => id !== "skills-section"
);
const skillsCutIndex: number = (window as any).__resumeSkillsCutIndex ?? -1;
const res: AxiosResponse<Blob> = await api.post(
  `${API_URL}/candidates/generate-pdf`,
  { html: generateHTML(true, pageBreakIds, skillsCutIndex) },
  { responseType: "blob" },
);
     
      // const res: AxiosResponse<Blob> = await axios.post(
      //   `${API_URL}/api/candidates/generate-pdf`,
      //   { html: generateHTML(true, pageBreakIds) },
      //   { responseType: "blob" },
      // );
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
    {/* Download button */}
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

export default TemplateTwo;













