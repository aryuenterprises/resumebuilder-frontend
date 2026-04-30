// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   MonthYearDisplay,
//   formatMonthYear,
//   getLocalStorage,
// } from "@/app/utils";
// import { IoPersonOutline } from "react-icons/io5";

// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || UseContext?.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const projects = alldata?.projects || UseContext?.projects || [];
//   const finalize = alldata?.finalize || UseContext?.finalize || {};
//   const summary = alldata?.summary || UseContext?.summary || "";
//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   // Format date of birth for display
//   const formatDateOfBirth = (dob: string) => {
//     if (!dob) return "";
//     try {
//       const date = new Date(dob);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     } catch {
//       return dob;
//     }
//   };

//   // Helper function to format grade (CGPA/Percentage)
//   const formatGrade = (grade: string) => {
//     if (!grade) return "";

//     const numGrade = parseFloat(grade);
//     if (!isNaN(numGrade)) {
//       if (numGrade <= 10 && grade.includes(".")) {
//         return `CGPA: ${grade}`;
//       } else if (numGrade > 10) {
//         return `Percentage: ${grade}%`;
//       }
//     }

//     return grade;
//   };

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.photo) {
//       if (
//         typeof contact.photo === "string" &&
//         contact.photo.startsWith("blob:")
//       ) {
//         url = contact.photo;
//       } else if (typeof contact.photo === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.photo}`;
//       } else if (
//         contact.photo &&
//         typeof contact.photo === "object" &&
//         "size" in contact.photo
//       ) {
//         objectUrl = URL.createObjectURL(contact.photo as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.croppedImage, contact.photo]);

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
//       // Render categorized skills as compact tags
//       return (
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           {skills.map((category: any) => (
//             <div
//               key={category.id}
//               className="skill-category"
//               style={{ marginBottom: "12px" }}
//             >
//               <div
//                 className="skill-category-title"
//                 style={{
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   marginBottom: "6px",
//                   color: "#374151",
//                 }}
//               >
//                 {category.title}
//               </div>
//               <div className="skills-tags">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="skill-tag">
//                     {skill.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Render simple skills as compact tags
//       return (
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-tags">
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
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="entry-content"
//                 dangerouslySetInnerHTML={{
//                   __html: project.description.replace(/<[^>]*>/g, ""),
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
//     .t2-resume  {
//       width: 210mm;
//       padding: 5mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       text-align: left;
//     }

//     .t2-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       padding:20px;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: hidden;
//     }

//     /* ── SCOPED GLOBAL RESETS ── */
//     .t2-resume  p,
//     .t2-resume  div,
//     .t2-resume  span,
//     .t2-resume  i,
//     .t2-resume  a {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  ul,
//     .t2-resume  ol {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t2-resume  li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t2-resume  ul { list-style-type: disc !important; padding-left: 16px !important; }
//     .t2-resume  ol { list-style-type: decimal !important; padding-left: 16px !important; }

//     /* ── HEADER ── */
//     .t2-resume  .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 4px 0;
//       border-radius: 24px 24px 0 0;
//       border-bottom: 1px solid #d1d5db;
//     }

//     .t2-resume  .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 22%;
//       padding: 4px;
//     }

//     .t2-resume  .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }

//     .t2-resume  .header-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f9fafb;
//     }

//     .t2-resume  .header-info-col {
//       width: 78%;
//       padding-left: 40px;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }

//     .t2-resume  .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .header-address {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-email {
//       font-size: 11px;
//       color: #374151;
//       font-family: serif, 'Nunito', Arial;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-phone {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .t2-resume  .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }

//     .t2-resume  .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* ── BODY ── */
//     .t2-resume  .body-wrap {
//       display: flex;
//       gap: 12px;
//     }

//     /* ── LEFT COLUMN ── */
//     .t2-resume  .left-col {
//       width: 40%;
//       padding-top: 4px;
//       padding-left: 20px;
//     }

//     /* ── DIVIDER ── */
//     .t2-resume  .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 0 4px;
//       flex-shrink: 0;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t2-resume  .right-col {
//       width: 60%;
//       padding-top: 4px;
//       padding-right: 20px;
//     }

//     /* ── SECTION TITLE ── */
//     .t2-resume  .section-title {
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
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── SUMMARY ── */
//     .t2-resume  .summary-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .summary-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS (COMPACT TAGS) ── */
//     .t2-resume  .skills-block {
//       margin-bottom: 8px;
//     }

//     .t2-resume  .skills-tags {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-top: 4px;
//     }

//     .t2-resume  .skill-tag {
//       display: inline-block;
//       background: #f3f4f6;
//       padding: 3px 8px;
//       font-size: 11px;
//       color: #374151;
//       border-radius: 4px;
//       line-height: 1.4;
//     }

//     .t2-resume  .skill-category-title {
//       font-size: 12px;
//       font-weight: 600;
//       margin-bottom: 6px;
//       color: #374151;
//     }

//     /* ── PROJECTS ── */
//     .t2-resume  .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t2-resume  .project-link {
//       font-size: 10px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t2-resume  .project-tech-stack {
//       font-size: 11px;
//       color: #6b7280;
//       margin: 2px 0 4px;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume  .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//       display: inline-block;
//     }

//     /* ── LANGUAGES ── */
//     .t2-resume  .lang-block {
//       margin-top: 4px;
//       margin-bottom: 6px;
//     }

//     /* ── ADDITIONAL SECTIONS ── */
//     .t2-resume  .extra-block {
//       margin-top: 4px;
//       margin-bottom: 6px;
//     }

//     .t2-resume  .extra-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t2-resume  .extra-text-muted {
//       font-size: 13px;
//       color: #6b7280;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     .t2-resume  .entry-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .entry-date {
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

//     .t2-resume  .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── WEBSITES ── */
//     .t2-resume  .website-block {
//       margin-top: 8px;
//     }

//     .t2-resume  .website-item {
//       margin-bottom: 4px;
//     }

//     .t2-resume  .website-label {
//       font-size: 13px;
//       font-weight: 700;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .website-link {
//       font-size: 13px;
//       color: #6b7280;
//       text-decoration: underline;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 5mm;
//       }

//       @page :first {
//         margin-top: 0;
//       }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .t2-resume  .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t2-resume  .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="header-photo" />`
//       : `<div class="header-photo-placeholder"><span>No Photo</span></div>`;

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             ${skills
//               .map(
//                 (category: any) => `
//               <div class="skill-category" style="margin-bottom:12px">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-tags">
//                   ${category.skills
//                     .map(
//                       (skill: any) => `
//                     <span class="skill-tag">${skill.name}</span>
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
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             <div class="skills-tags">
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
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="entry-content">${project.description.replace(/<[^>]*>/g, "")}</div>
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
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
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
//     <div class="header-photo-col">
//       ${photoHtml}
//     </div>
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
//         <div class="summary-text">${summary.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>
//       </div>`
//           : ""
//       }

//       ${generateSkillsHTML()}

//       ${
//         Array.isArray(finalize?.languages) &&
//         finalize.languages.some((l) => l.name?.trim())
//           ? `
//       <div class="lang-block">
//         <div class="section-title">Languages</div>
//         <div class="skills-tags">
//           ${finalize.languages
//             .filter((l) => l.name?.trim())
//             .map(
//               (l) =>
//                 `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`,
//             )
//             .join("")}
//         </div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.certificationsAndLicenses) &&
//         finalize.certificationsAndLicenses.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         )
//           ? `
//       <div class="extra-block">
//         <div class="section-title">Certifications &amp; Licenses</div>
//         <div class="extra-text">${finalize.certificationsAndLicenses
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.hobbiesAndInterests) &&
//         finalize.hobbiesAndInterests.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         )
//           ? `
//       <div class="extra-block">
//         <div class="section-title">Hobbies &amp; Interests</div>
//         <div class="extra-text-muted">${finalize.hobbiesAndInterests
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.awardsAndHonors) &&
//         finalize.awardsAndHonors.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         )
//           ? `
//       <div class="extra-block">
//         <div class="section-title">Awards &amp; Honors</div>
//         <div class="extra-text">${finalize.awardsAndHonors
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.references) &&
//         finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           ? `
//       <div class="extra-block">
//         <div class="section-title">References</div>
//         <div class="extra-text-muted">${finalize.references
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

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
//             const start = formatMonthYear(exp.startDate, true);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, true)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//             <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>` : ""}
//           ${exp.text ? `<div class="entry-content">${exp.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
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
//             const dateStr = [edu.startDate || "", edu.endDate || ""]
//               .filter(Boolean)
//               .join(" - ");
//             const formattedGrade = formatGrade(edu.grade || "");
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             <div class="entry-title">${edu.schoolname || ""}</div>
//             ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//           </div>
//           ${edu.location || edu.degree ? `<div class="entry-subtitle">${[edu.location, edu.degree].filter(Boolean).join(" - ")}${formattedGrade ? ` • ${formattedGrade}` : ""}</div>` : ""}
//           ${!edu.location && !edu.degree && formattedGrade ? `<div class="entry-subtitle">${formattedGrade}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${edu.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//           })
//           .join("")}
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.websitesAndSocialMedia) &&
//         finalize.websitesAndSocialMedia.some(
//           (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//         )
//           ? `
//       <div class="website-block">
//         <div class="section-title">Websites &amp; Social Media</div>
//         ${finalize.websitesAndSocialMedia
//           .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//           .map(
//             (i) => `
//         <div class="website-item">
//           ${i.websiteUrl ? `<div class="website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a>` : ""}
//           ${i.socialMedia ? `<div class="website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a>` : ""}
//         </div>`,
//           )
//           .join("")}
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? `
//       <div style="margin-top:6px">
//         ${finalize.customSection
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s) => `
//         <div style="margin-bottom:6px">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="entry-content">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}
//         </div>`,
//           )
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

// {lastSegment === "download-resume" && (
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
//           minHeight: "297mm",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-wrap">
//           <div className="header-photo-col">
//             {previewUrl ? (
//               <img src={previewUrl} alt="Profile" className="header-photo" />
//             ) : (
//               <div className="header-photo-placeholder">
//                 <IoPersonOutline
//                   style={{ width: 40, height: 40, color: "#9ca3af" }}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="header-info-col">
//             <div className="header-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {[
//               contact?.address,
//               contact?.city,
//               contact?.postcode,
//               contact?.country,
//             ].filter(Boolean).length > 0 && (
//               <div className="header-address">
//                 {[
//                   contact?.address,
//                   contact?.city,
//                   contact?.postcode,
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
//                     __html: summary.replace(/<[^>]*>/g, ""),
//                   }}
//                 />
//               </div>
//             )}

//             {renderSkills()}

//             {Array.isArray(finalize?.languages) &&
//               finalize.languages.some((l) => l.name?.trim()) && (
//                 <div className="lang-block">
//                   <div className="section-title">Languages</div>
//                   <div className="skills-tags">
//                     {finalize.languages
//                       .filter((l) => l.name?.trim())
//                       .map((l, i) => (
//                         <span key={l._id || i} className="skill-tag">
//                           {l.name}
//                           {l.level && ` (${l.level})`}
//                         </span>
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">
//                     Certifications &amp; Licenses
//                   </div>
//                   <div className="extra-text">
//                     {finalize.certificationsAndLicenses
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">Hobbies &amp; Interests</div>
//                   <div className="extra-text-muted">
//                     {finalize.hobbiesAndInterests
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">Awards &amp; Honors</div>
//                   <div className="extra-text">
//                     {finalize.awardsAndHonors
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.references) &&
//               finalize.references.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">References</div>
//                   <div className="extra-text-muted">
//                     {finalize.references
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
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
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       {exp.jobTitle ? (
//                         <div className="entry-title">{exp.jobTitle}</div>
//                       ) : (
//                         <div />
//                       )}
//                       <div className="entry-date">
//                         <MonthYearDisplay
//                           value={exp.startDate}
//                           shortYear={true}
//                         />
//                         {exp.startDate && (exp.endDate || true) && (
//                           <span> - </span>
//                         )}
//                         {exp.endDate ? (
//                           <MonthYearDisplay
//                             value={exp.endDate}
//                             shortYear={true}
//                           />
//                         ) : (
//                           exp.startDate && <span>Present</span>
//                         )}
//                       </div>
//                     </div>
//                     {(exp.location || exp.employer) && (
//                       <div className="entry-subtitle">
//                         {[exp.location, exp.employer]
//                           .filter(Boolean)
//                           .join(" - ")}
//                       </div>
//                     )}
//                     {exp.text && (
//                       <div
//                         className="entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: exp.text.replace(/<[^>]*>/g, ""),
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {renderProjects()}

//             {educations?.length > 0 && (
//               <div style={{ marginTop: "6px" }}>
//                 <div className="section-title">Education</div>
//                 {educations.map((edu, index) => {
//                   const formattedGrade = formatGrade(edu.grade || "");
//                   return (
//                     <div key={edu.id || index} className="entry-block">
//                       <div className="entry-top-row">
//                         <div className="entry-title">
//                           {edu.schoolname || ""}
//                         </div>
//                         <div className="entry-date">
//                           {[edu.startDate, edu.endDate]
//                             .filter(Boolean)
//                             .join(" - ")}
//                         </div>
//                       </div>
//                       {(edu.location || edu.degree || formattedGrade) && (
//                         <div className="entry-subtitle">
//                           {[edu.location, edu.degree]
//                             .filter(Boolean)
//                             .join(" - ")}
//                           {formattedGrade && ` • ${formattedGrade}`}
//                         </div>
//                       )}
//                       {edu.text && (
//                         <div
//                           className="entry-content"
//                           dangerouslySetInnerHTML={{
//                             __html: edu.text.replace(/<[^>]*>/g, ""),
//                           }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {Array.isArray(finalize?.websitesAndSocialMedia) &&
//               finalize.websitesAndSocialMedia.some(
//                 (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//               ) && (
//                 <div className="website-block">
//                   <div className="section-title">
//                     Websites &amp; Social Media
//                   </div>
//                   {finalize.websitesAndSocialMedia
//                     .filter(
//                       (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//                     )
//                     .map((item, i) => (
//                       <div key={item.id || i} className="website-item">
//                         {item.websiteUrl && (
//                           <div>
//                             <div className="website-label">Website:</div>
//                             <a
//                               href={
//                                 item.websiteUrl.startsWith("http")
//                                   ? item.websiteUrl
//                                   : `https://${item.websiteUrl}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="website-link"
//                             >
//                               {item.websiteUrl}
//                             </a>
//                           </div>
//                         )}
//                         {item.socialMedia && (
//                           <div style={{ marginTop: "4px" }}>
//                             <div className="website-label">Social Media:</div>
//                             <a
//                               href={
//                                 item.socialMedia.startsWith("http")
//                                   ? item.socialMedia
//                                   : `https://${item.socialMedia}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="website-link"
//                             >
//                               {item.socialMedia}
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}

//             {Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               ) && (
//                 <div style={{ marginTop: "6px" }}>
//                   {finalize.customSection
//                     .filter((s) => s?.name?.trim() || s?.description?.trim())
//                     .map((section, i) => (
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
//                               __html: section.description.replace(
//                                 /<[^>]*>/g,
//                                 "",
//                               ),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwo;

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
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.photo) {
//       if (
//         typeof contact.photo === "string" &&
//         contact.photo.startsWith("blob:")
//       ) {
//         url = contact.photo;
//       } else if (typeof contact.photo === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.photo}`;
//       } else if (
//         contact.photo &&
//         typeof contact.photo === "object" &&
//         "size" in contact.photo
//       ) {
//         objectUrl = URL.createObjectURL(contact.photo as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.croppedImage, contact.photo]);

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
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           {skills.map((category: any) => (
//             <div
//               key={category.id}
//               className="skill-category"
//               style={{ marginBottom: "12px" }}
//             >
//               <div
//                 className="skill-category-title"
//                 style={{
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   marginBottom: "6px",
//                   color: "#374151",
//                 }}
//               >
//                 {category.title}
//               </div>
//               <div className="skills-tags">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="skill-tag">
//                     {skill.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       return (
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-tags">
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
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
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
//     .t2-resume  {
//       width: 210mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       text-align: left;
//     }

//     .t2-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       padding:20px;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: hidden;
//     }

//     /* ── SCOPED GLOBAL RESETS ── */
//     .t2-resume  p,
//     .t2-resume  div,
//     .t2-resume  span,
//     .t2-resume  i,
//     .t2-resume  a {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  ul,
//     .t2-resume  ol {
//       margin: 0 0 0 20px !important;
//       padding: 0 !important;
//     }

//     .t2-resume  li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t2-resume  ul { list-style-type: disc !important; }
//     .t2-resume  ol { list-style-type: decimal !important; }

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

//     /* ── HEADER ── */
//     .t2-resume  .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap:9px
//     }

//     .t2-resume  .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 22%;
//       padding: 4px;
//     }

//     .t2-resume  .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }

//     .t2-resume  .header-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f9fafb;
//     }

//     .t2-resume  .header-info-col {
//       width: 78%;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }

//     .t2-resume  .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .header-address {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-email {
//       font-size: 11px;
//       color: #374151;
//       font-family: serif, 'Nunito', Arial;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-phone {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .t2-resume  .header-dob {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//       flex-wrap: wrap;
//     }

//     .t2-resume  .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* ── BODY ── */
//     .t2-resume  .body-wrap {
//       display: flex;
//       gap: 12px;
//         flex: 1; /* Add this - takes remaining height */
//   min-height: 297mm; /* Keep this for print */

//     }

//     /* ── LEFT COLUMN ── */
//     .t2-resume  .left-col {
//       width: 40%;
//       padding-top: 4px;
//       padding-left: 20px;
//     }

//     /* ── DIVIDER ── */
//     .t2-resume  .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 0 4px;
//       flex-shrink: 0;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t2-resume  .right-col {
//       width: 60%;
//       padding-top: 4px;
//       padding-right: 20px;
//     }

//     /* ── SECTION TITLE ── */
//     .t2-resume  .section-title {
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
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── SUMMARY ── */
//     .t2-resume  .summary-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .summary-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS (COMPACT TAGS) ── */
//     .t2-resume  .skills-block {
//       margin-bottom: 8px;
//     }

//     .t2-resume  .skills-tags {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-top: 4px;
//     }

//     .t2-resume  .skill-tag {
//       display: inline-block;
//       background: #f3f4f6;
//       padding: 3px 8px;
//       font-size: 11px;
//       color: #374151;
//       border-radius: 4px;
//       line-height: 1.4;
//     }

//     .t2-resume  .skill-category-title {
//       font-size: 12px;
//       font-weight: 600;
//       margin-bottom: 6px;
//       color: #374151;
//     }

//     /* ── PROJECTS ── */
//     .t2-resume  .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t2-resume  .project-link {
//       font-size: 10px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t2-resume  .project-tech-stack {
//       font-size: 11px;
//       color: #6b7280;
//       margin: 2px 0 4px;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t2-resume  .education-grade {
//       font-size: 10px;
//       color: #6b7280;
//       margin-top: 2px;
//       font-weight: 500;
//       display: inline-block;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t2-resume  .custom-section-block {
//       margin-top: 6px;
//       margin-bottom: 6px;
//     }

//     .t2-resume  .custom-section-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     .t2-resume  .entry-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .entry-date {
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

//     .t2-resume  .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .entry-content {
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
//         margin: 5mm;
//       }

//       @page :first {
//         margin-top: 0;
//       }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .t2-resume  .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t2-resume  .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {

//       const photoHtml = previewUrl
//   ? `<div class="header-photo-col">
//        <img src="${previewUrl}" alt="Profile" class="header-photo" />
//      </div>`
//   : '';

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             ${skills
//               .map(
//                 (category: any) => `
//               <div class="skill-category" style="margin-bottom:12px">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-tags">
//                   ${category.skills
//                     .map(
//                       (skill: any) => `
//                     <span class="skill-tag">${skill.name}</span>
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
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             <div class="skills-tags">
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
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
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
//           (s: any) => s?.name?.trim() || s?.description?.trim()
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
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
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
//       ${photoHtml}

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

//             ${generateCustomSectionsHTML()}

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
//           ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.employer,exp.location].filter(Boolean).join(" - ")}</div>` : ""}
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
//             const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             <div class="entry-title">${edu.degree  || ""}</div>
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

//   console.log("context",context)
//     console.log("previewUrl",previewUrl)

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
//       {/* {lastSegment === "download-resume" && ( */}
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
//       {/* )} */}

//       <div
//         className={`t2-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           minHeight: "297mm",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-wrap">
//                       {previewUrl && (

//           <div className="header-photo-col">
//               <img src={previewUrl} alt="Profile" className="header-photo" />
//           </div>
//             ) }

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

//              {/* CUSTOM SECTIONS */}
//             {finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some(
//                 (s: any) => s?.name?.trim() || s?.description?.trim(),
//               ) && (
//                 <div style={{ marginTop: "6px" }}>
//                   {finalize.customSection
//                     .filter((s: any) => s?.name?.trim() || s?.description?.trim())
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
//                           {start}{start && end ? " - " : ""}{end}
//                         </div>
//                       </div>
//                       {(exp.location || exp.employer) && (
//                         <div className="entry-subtitle">
//                           {[ exp.employer,exp.location]
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
//               <div style={{ marginTop: "6px" }}>
//                 <div className="section-title">Education</div>
//                 {educations.map((edu, index) => {
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return (
//                     <div key={edu.id || index} className="entry-block">
//                       <div className="entry-top-row">
//                         <div className="entry-title">
//                           {edu.degree || ""}
//                         </div>
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
//   const skills = alldata?.skills || context?.skills || [];
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
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           {skills.map((category: any) => (
//             <div
//               key={category.id}
//               className="skill-category"
//               style={{ marginBottom: "12px" }}
//             >
//               <div
//                 className="skill-category-title"
//                 style={{
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   marginBottom: "6px",
//                   color: "#374151",
//                 }}
//               >
//                 {category.title}
//               </div>
//               <div className="skills-tags">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="skill-tag">
//                     {skill.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       return (
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-tags">
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
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
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
//        display: flex;           /* Add this */
//   flex-direction: column;  /* Add this */
//   min-height: 297mm;       /* Keep for print */
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

//     /* ── HEADER ── */
//     .t2-resume .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 10px 18px;
//       border-bottom: 1px solid #d1d5db;
//       gap: 16px;
//         flex-shrink: 0;         /* Add this - prevent header from shrinking */

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
//       flex: 1;                /* Add this - takes all remaining space */
//   min-height: 0;          /* Add this - important for flex children */
//     padding-top: 10px; /* Add padding at the top */

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

//     .t2-resume .skills-tags {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-top: 4px;
//     }

//     .t2-resume .skill-tag {
//       display: inline-block;
//       background: #f3f4f6;
//       padding: 3px 8px;
//       font-size: 11px;
//       color: #374151;
//       border-radius: 4px;
//       line-height: 1.4;
//     }

//     .t2-resume .skill-category-title {
//       font-size: 12px;
//       font-weight: 600;
//       margin-bottom: 6px;
//       color: #374151;
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
//     ? `<div class="header-photo-col">
//          <img src="${base64Image}" alt="Profile" class="header-photo" style="width:100px;height:100px;object-fit:cover;border-radius:6px;" />
//        </div>`
//     : '';

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             ${skills
//               .map(
//                 (category: any) => `
//               <div class="skill-category" style="margin-bottom:12px">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-tags">
//                   ${category.skills
//                     .map(
//                       (skill: any) => `
//                     <span class="skill-tag">${skill.name}</span>
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
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             <div class="skills-tags">
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
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
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
//             {lastSegment === "download-resume" && (

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
//             )}

//       <div
//         className={`t2-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//                   minHeight: "297mm",

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

"use client";
import React, { useContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
} from "@/app/utils";
import { IoPersonOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";

const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context?.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";
  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    const processImage = async () => {
      if (!contact.photo) {
        setPreviewUrl(null);
        setBase64Image(null);
        return;
      }

      try {
        let imageUrl: string | null = null;

        if (typeof contact.photo === "string") {
          if (contact.photo.startsWith("blob:")) {
            // Blob URL - fetch and convert to base64
            const response = await fetch(contact.photo);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
              setBase64Image(base64);
              setPreviewUrl(base64);
            };
            reader.readAsDataURL(blob);
          } else {
            // Regular URL - use absolute path
            imageUrl = `${API_URL}/api/uploads/photos/${contact.photo}`;
            setPreviewUrl(imageUrl);
            setBase64Image(imageUrl);
          }
        } else if (
          contact.photo &&
          typeof contact.photo === "object" &&
          "size" in contact.photo
        ) {
          // File object - convert to base64
          objectUrl = URL.createObjectURL(contact.photo as Blob);
          setPreviewUrl(objectUrl);

          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64Image(reader.result as string);
          };
          reader.readAsDataURL(contact.photo as Blob);
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    processImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [contact.photo]);

  // Helper function to render skills (now just a string with HTML content)
  const renderSkills = () => {
    if (!skills || (typeof skills === "string" && !skills.trim())) return null;

    // Clean the HTML content from Quill editor
    const cleanedSkills = cleanQuillHTML(skills);

    if (
      !cleanedSkills ||
      cleanedSkills === "<p><br></p>" ||
      cleanedSkills === ""
    )
      return null;

    return (
      <div className="skills-block">
        <div className="section-title">Skills</div>
        <div
          className="skills-content"
          dangerouslySetInnerHTML={{ __html: cleanedSkills }}
        />
      </div>
    );
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div style={{ marginTop: "6px" }}>
        <div className="section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="entry-block">
            <div className="entry-top-row">
              <div className="entry-title">{project.title}</div>
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
                <strong>Tech:</strong> {project.techStack.join(" , ")}
              </div>
            )}
            {project.description && (
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{
                  __html: cleanQuillHTML(project.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     SHARED CSS
  ====================================================== */
  const styles = `
    /* ── CONTAINER ── */
    .t2-resume {
      width: 210mm;
      box-sizing: border-box;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      text-align: left;
      display: flex;
      flex-direction: column;
      min-height: 297mm;
    }

    .t2-resume.is-preview {
      transform: scale(0.36);
      transform-origin: top left;
      width: 210mm; 
      padding: 20px;
      height: auto;
      max-height: none;
      min-height: auto;
      max-width: none;
      min-width: auto;
      overflow: hidden;
    }

    /* ── SCOPED GLOBAL RESETS ── */
    .t2-resume p,
    .t2-resume div,
    .t2-resume span,
    .t2-resume i,
    .t2-resume a {
      margin: 0;
      padding: 0;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume ul,
    .t2-resume ol {
      margin: 0 0 0 20px !important;
      padding: 0 !important;
    }

    .t2-resume li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    .t2-resume ul { list-style-type: disc !important; }
    .t2-resume ol { list-style-type: decimal !important; }

    /* Resume Lists */
    .t2-resume .resume-list {
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }

    .t2-resume ol.resume-list {
      list-style-type: decimal !important;
    }

    .t2-resume ul.resume-list {
      list-style-type: disc !important;
    }

    /* Rich Text Styles */
    .t2-resume strong, .t2-resume b {
      font-weight: 700 !important;
    }

    .t2-resume em, .t2-resume i {
      font-style: italic !important;
    }

    .t2-resume u {
      text-decoration: underline !important;
    }

    /* Skills Content Styles */
    .t2-resume .skills-content {
      margin-top: 4px;
    }
    
    .t2-resume .skills-content ul,
    .t2-resume .skills-content ol {
      margin: 4px 0 4px 20px !important;
    }
    
    .t2-resume .skills-content li {
      margin-bottom: 2px !important;
    }
    
    .t2-resume .skills-content p {
      margin: 0 0 4px 0 !important;
    }

    /* ── HEADER ── */
    .t2-resume .header-wrap {
      display: flex;
      background-color: #EADCCE;
      padding: 10px 18px;
      border-bottom: 1px solid #d1d5db;
      gap: 16px;
      flex-shrink: 0;
    }

    .t2-resume .header-photo-col {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .t2-resume .header-photo {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid #e5e7eb;
    }

    .t2-resume .header-photo-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    }

    .t2-resume .header-info-col {
      flex: 1;
      padding-right: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .t2-resume .header-name {
      font-size: 26px;
      font-weight: 400;
      letter-spacing: 0.025em;
      color: #1f2937;
      line-height: 1.25;
      text-transform: capitalize;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 2px;
    }

    .t2-resume .header-address {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 1px;
    }

    .t2-resume .header-email {
      font-size: 11px;
      color: #374151;
      font-family: serif, 'Nunito', Arial;
      line-height: 1.5;
      margin-bottom: 1px;
    }

    .t2-resume .header-phone {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 3px;
    }

    .t2-resume .header-dob {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 1px;
    }

    .t2-resume .header-links {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .t2-resume .header-link {
      font-size: 12px;
      font-weight: 700;
      color: #000;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-family: 'Nunito', Arial, sans-serif;
    }

    /* ── BODY ── */
    .t2-resume .body-wrap {
      display: flex;
      gap: 12px;
      flex: 1;
      min-height: 0;
      padding-top: 10px;
    }

    /* ── LEFT COLUMN ── */
    .t2-resume .left-col {
      width: 40%;
      padding: 8px 0 8px 20px;
    }

    /* ── DIVIDER ── */
    .t2-resume .col-divider {
      width: 1px;
      border-left: 1px solid #d1d5db;
      margin: 8px 4px;
      flex-shrink: 0;
    }

    /* ── RIGHT COLUMN ── */
    .t2-resume .right-col {
      width: 60%;
      padding: 8px 20px 8px 0;
    }

    /* ── SECTION TITLE ── */
    .t2-resume .section-title {
      font-size: 13px;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      text-decoration-color: #1f2937;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #111827;
      margin-bottom: 4px;
      margin-top: 12px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume .section-title:first-child {
      margin-top: 0;
    }

    /* ── SUMMARY ── */
    .t2-resume .summary-block {
      margin-bottom: 6px;
    }

    .t2-resume .summary-text {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── SKILLS (COMPACT TAGS) ── */
    .t2-resume .skills-block {
      margin-bottom: 8px;
    }

    /* ── PROJECTS ── */
    .t2-resume .project-links {
      display: flex;
      gap: 12px;
    }

    .t2-resume .project-link {
      font-size: 10px;
      color: #6b7280;
      text-decoration: underline;
    }

    .t2-resume .project-tech-stack {
      font-size: 11px;
      color: #6b7280;
      margin: 2px 0 4px;
    }

    /* ── EDUCATION GRADE ── */
    .t2-resume .education-grade {
      font-size: 10px;
      color: #6b7280;
      margin-top: 2px;
      font-weight: 500;
      display: inline-block;
    }

    /* ── CUSTOM SECTIONS ── */
    .t2-resume .custom-section-block {
      margin-top: 6px;
      margin-bottom: 6px;
    }

    .t2-resume .custom-section-content {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── EXPERIENCE / EDUCATION ENTRIES ── */
    .t2-resume .entry-block {
      margin-bottom: 6px;
    }

    .t2-resume .entry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }

    .t2-resume .entry-title {
      font-size: 11.5px;
      font-weight: 700;
      font-style: italic;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume .entry-date {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11.5px;
      font-weight: 700;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      white-space: nowrap;
    }

    .t2-resume .entry-subtitle {
      font-size: 11px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 2px;
    }

    .t2-resume .entry-content {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── PRINT ── */
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        margin: 0;
        padding: 0;
      }

      .t2-resume {
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        page-break-after: avoid;
        page-break-inside: avoid;
      }

      .t2-resume .header-wrap {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t2-resume .entry-block {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .t2-resume .section-title {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  `;

  /* ======================================================
     HTML GENERATION — for PDF download
  ====================================================== */
  const generateHTML = () => {
    const photoHtml = base64Image
      ? `<div class="header-photo-col">
         <img src="${base64Image}" alt="Profile" class="header-photo" style="width:100px;height:100px;object-fit:cover;border-radius:6px;" />
       </div>`
      : "";

    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postCode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF (now just clean the HTML string)
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === "string" && !skills.trim())) return "";

      const cleanedSkills = cleanQuillHTML(skills);
      if (
        !cleanedSkills ||
        cleanedSkills === "<p><br></p>" ||
        cleanedSkills === ""
      )
        return "";

      return `
        <div class="skills-block">
          <div class="section-title">Skills</div>
          <div class="skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div style="margin-top:6px">
          <div class="section-title">Projects</div>
          ${projects
            .map(
              (project: any) => `
            <div class="entry-block">
              <div class="entry-top-row">
                <div class="entry-title">${project.title || ""}</div>
                <div class="project-links">
                  ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                  ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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

    // Generate custom sections HTML for PDF
    const generateCustomSectionsHTML = () => {
      if (
        !finalize ||
        Array.isArray(finalize) ||
        !Array.isArray(finalize.customSection) ||
        !finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
      ) {
        return "";
      }

      return `
        <div class="custom-section-block">
          ${finalize.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any) => `
            <div style="margin-bottom:6px">
              ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
              ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
            </div>
          `,
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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      background-color: white;
    }
    ${styles}
  </style>
</head>
<body>
<div class="t2-resume">

  <!-- HEADER -->
  <div class="header-wrap">
    ${photoHtml}
    <div class="header-info-col">
      <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
      ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
      ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
      ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
      ${formattedDob ? `<div class="header-dob">${formattedDob}</div>` : ""}
      <div class="header-links">
        ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
        ${githubUrl && githubUrl.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="header-link">GitHub</a>` : ""}
        ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
      </div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body-wrap">

    <!-- LEFT COLUMN -->
    <div class="left-col">

      ${
        summary
          ? `
      <div class="summary-block">
        <div class="section-title">Summary</div>
        <div class="summary-text">${cleanQuillHTML(summary)}</div>
      </div>`
          : ""
      }

      ${generateSkillsHTML()}

      ${generateCustomSectionsHTML()}

    </div>

    <!-- DIVIDER -->
    <div class="col-divider"></div>

    <!-- RIGHT COLUMN -->
    <div class="right-col">

      ${
        experiences?.length > 0
          ? `
      <div>
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
          <div class="entry-top-row">
            ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
            <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
          </div>
          ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
          ${exp.text ? `<div class="entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
        </div>`;
          })
          .join("")}
      </div>`
          : ""
      }

      ${generateProjectsHTML()}

      ${
        educations?.length > 0
          ? `
      <div style="margin-top:6px">
        <div class="section-title">Education</div>
        ${educations
          .map((edu) => {
            const dateStr = [edu.startDate || "", edu.endDate || "Present"]
              .filter(Boolean)
              .join(" - ");
            const formattedGrade = formatGradeToCgpdAndPercentage(
              edu.grade || "",
            );
            return `
        <div class="entry-block">
          <div class="entry-top-row">
            <div class="entry-title">${edu.degree || ""}</div>
            ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
          </div>
          ${edu.schoolname || edu.location ? `<div class="entry-subtitle">${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}${formattedGrade ? ` • ${formattedGrade}` : ""}</div>` : ""}
          ${!edu.location && !edu.degree && formattedGrade ? `<div class="entry-subtitle">${formattedGrade}</div>` : ""}
          ${edu.text ? `<div class="entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
        </div>`;
          })
          .join("")}
      </div>`
          : ""
      }

    </div>
  </div>
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
        className={`t2-resume ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
          minHeight: "297mm",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-wrap">
          {previewUrl && (
            <div className="header-photo-col">
              <img src={previewUrl} alt="Profile" className="header-photo" />
            </div>
          )}
          <div className="header-info-col">
            <div className="header-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {[
              contact?.address,
              contact?.city,
              contact?.postCode,
              contact?.country,
            ].filter(Boolean).length > 0 && (
              <div className="header-address">
                {[
                  contact?.address,
                  contact?.city,
                  contact?.postCode,
                  contact?.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}
            {contact?.email && (
              <div className="header-email">{contact.email}</div>
            )}
            {contact?.phone && (
              <div className="header-phone">{contact.phone}</div>
            )}
            {dateOfBirth && (
              <div className="header-dob">{formatDateOfBirth(dateOfBirth)}</div>
            )}
            <div className="header-links">
              {linkedinUrl && linkedinUrl.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  LinkedIn
                </a>
              )}
              {githubUrl && githubUrl.trim() && (
                <a
                  href={
                    githubUrl.startsWith("http")
                      ? githubUrl
                      : `https://${githubUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  GitHub
                </a>
              )}
              {portfolioUrl && portfolioUrl.trim() && (
                <a
                  href={
                    portfolioUrl.startsWith("http")
                      ? portfolioUrl
                      : `https://${portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="body-wrap">
          {/* LEFT COLUMN */}
          <div className="left-col">
            {summary && (
              <div className="summary-block">
                <div className="section-title">Summary</div>
                <div
                  className="summary-text"
                  dangerouslySetInnerHTML={{
                    __html: cleanQuillHTML(summary),
                  }}
                />
              </div>
            )}

            {renderSkills()}

            {/* CUSTOM SECTIONS */}
            {finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize?.customSection) &&
              finalize.customSection.some(
                (s: any) => s?.name?.trim() || s?.description?.trim(),
              ) && (
                <div>
                  {finalize.customSection
                    .filter(
                      (s: any) => s?.name?.trim() || s?.description?.trim(),
                    )
                    .map((section: any, i: number) => (
                      <div
                        key={section.id || i}
                        style={{ marginBottom: "6px" }}
                      >
                        {section.name && (
                          <div className="section-title">{section.name}</div>
                        )}
                        {section.description && (
                          <div
                            className="entry-content"
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

          {/* DIVIDER */}
          <div className="col-divider" />

          {/* RIGHT COLUMN */}
          <div className="right-col">
            {experiences?.length > 0 && (
              <div>
                <div className="section-title">Experience</div>
                {experiences.map((exp, index) => {
                  const start = formatMonthYear(exp.startDate, false);
                  const end = exp.endDate
                    ? formatMonthYear(exp.endDate, false)
                    : exp.startDate
                      ? "Present"
                      : "";
                  return (
                    <div key={exp.id || index} className="entry-block">
                      <div className="entry-top-row">
                        {exp.jobTitle ? (
                          <div className="entry-title">{exp.jobTitle}</div>
                        ) : (
                          <div />
                        )}
                        <div className="entry-date">
                          {start}
                          {start && end ? " - " : ""}
                          {end}
                        </div>
                      </div>
                      {(exp.location || exp.employer) && (
                        <div className="entry-subtitle">
                          {[exp.employer, exp.location]
                            .filter(Boolean)
                            .join(" - ")}
                        </div>
                      )}
                      {exp.text && (
                        <div
                          className="entry-content"
                          dangerouslySetInnerHTML={{
                            __html: cleanQuillHTML(exp.text),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {renderProjects()}

            {educations?.length > 0 && (
              <div>
                <div className="section-title">Education</div>
                {educations.map((edu, index) => {
                  const formattedGrade = formatGradeToCgpdAndPercentage(
                    edu.grade || "",
                  );
                  return (
                    <div key={edu.id || index} className="entry-block">
                      <div className="entry-top-row">
                        <div className="entry-title">{edu.degree || ""}</div>
                        <div className="entry-date">
                          {[edu.startDate, edu.endDate || "Present"]
                            .filter(Boolean)
                            .join(" - ")}
                        </div>
                      </div>
                      {(edu.location || edu.degree || formattedGrade) && (
                        <div className="entry-subtitle">
                          {[edu.schoolname, edu.location]
                            .filter(Boolean)
                            .join(" - ")}
                          {formattedGrade && ` • ${formattedGrade}`}
                        </div>
                      )}
                      {edu.text && (
                        <div
                          className="entry-content"
                          dangerouslySetInnerHTML={{
                            __html: cleanQuillHTML(edu.text),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateTwo;
