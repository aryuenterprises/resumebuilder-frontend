// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { IoPersonOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
// import {
//   MonthYearDisplay,
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

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const { croppedImage } = context.contact || {};
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || context.contact || {};
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

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   // Only get custom sections from finalize
//   const customSections =
//     isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : [];

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === 'string' && !skills.trim())) return null;
    
//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);
    
//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;
    
//     return (
//       <div className="t5-section">
//         <div className="t5-section-title">Skills</div>
//         <div 
//           className="t5-skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="t5-section">
//         <div className="t5-section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t5-entry">
//             <div className="t5-project-header">
//               <div className="t5-entry-heading">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t5-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t5-project-link"
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
//                       className="t5-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t5-project-tech">
//                 <strong>Tech:</strong> {project.techStack.join(" , ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t5-entry-content"
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
//      SHARED CSS — scoped to .resume-t5
//   ====================================================== */
//   const styles = `
//     /* ── ALL RULES SCOPED TO .resume-t5 ── */

//     .resume-t5 * {
//       box-sizing: border-box;
//     }

//     .resume-t5 {
//       width: 210mm;
//       padding: 5mm;
//       background-color: #ffffff;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     .resume-t5.is-preview {
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

//     /* Scoped resets — only inside resume */
//     .resume-t5 p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* Rich text content styles */
//     .resume-t5 .t5-entry-content ul,
//     .resume-t5 .t5-entry-content ol,
//     .resume-t5 .t5-extra ul,
//     .resume-t5 .t5-extra ol,
//     .resume-t5 .t5-skills-content ul,
//     .resume-t5 .t5-skills-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .resume-t5 .t5-entry-content li,
//     .resume-t5 .t5-extra li,
//     .resume-t5 .t5-skills-content li {
//       margin-bottom: 4px !important;
//     }

//     .resume-t5 .t5-entry-content strong,
//     .resume-t5 .t5-extra strong,
//     .resume-t5 .t5-skills-content strong {
//       font-weight: 700 !important;
//     }

//     .resume-t5 .t5-entry-content em,
//     .resume-t5 .t5-extra em,
//     .resume-t5 .t5-skills-content em {
//       font-style: italic !important;
//     }

//     .resume-t5 .t5-entry-content u,
//     .resume-t5 .t5-extra u,
//     .resume-t5 .t5-skills-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .resume-t5 .t5-entry-content p,
//     .resume-t5 .t5-extra p,
//     .resume-t5 .t5-skills-content p {
//       white-space: pre-wrap !important;
//     }

//     .resume-t5 ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     /* ── SKILLS CONTENT ── */
//     .resume-t5 .t5-skills-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-skills-content p {
//       margin: 0 0 6px 0 !important;
//     }

//     /* ── HEADER ── */
//     .resume-t5 .t5-header {
//       background-color: #facc15;
//       padding: 20px;
//       border-radius: 6px;
//       margin-bottom: 10px;
//     }

//     .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//     }

//     .resume-t5 .t5-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-photo-placeholder {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       background: #f3f4f6;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-name {
//       font-size: 22px;
//       font-weight: 700;
//       text-transform: uppercase;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .resume-t5 .t5-jobtitle {
//       font-size: 13px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-details-block {
//       padding-left: 40px;
//     }

//     .resume-t5 .t5-details-label {
//       display: inline-block;
//       background: #000;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 600;
//       padding: 4px 8px;
//       border-radius: 6px;
//       margin-bottom: 6px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     .resume-t5 .t5-details-text {
//       font-size: 13px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-links {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-top: 10px;
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-link-btn {
//       display: inline-flex;
//       align-items: center;
//       padding: 4px 12px;
//       border-radius: 9999px;
//       font-size: 13px;
//       font-weight: 500;
//       color: #fff;
//       text-decoration: none;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-link-linkedin { background-color: #2563eb; }
//     .resume-t5 .t5-link-github { background-color: #1f2937; }
//     .resume-t5 .t5-link-portfolio { background-color: #6b7280; }

//     /* ── SECTION ── */
//     .resume-t5 .t5-section {
//       margin-top: 10px;
//       padding: 0 20px;
//     }

//     .resume-t5 .t5-section-title {
//       display: inline-block;
//       background: #000;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 600;
//       text-transform: uppercase;
//       padding: 4px 8px;
//       border-radius: 6px;
//       margin-bottom: 8px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     /* ── EXPERIENCE HEADER (Job Title and Date on same line) ── */
//     .resume-t5 .t5-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .resume-t5 .t5-experience-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     /* Experience Subtitle - Company and Location */
//     .resume-t5 .t5-experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     /* ── EDUCATION HEADER (School and Date on same line) ── */
//     .resume-t5 .t5-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-education-school {
//       font-size: 16px;
//       font-weight: 600;
//       color: #111827;
//     }

//     .resume-t5 .t5-education-date {
//       font-size: 13px;
//       color: #4b5563;
//     }

//     /* Education Subtitle - Degree and Location */
//     .resume-t5 .t5-education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     /* ── EDUCATION GRADE ── */
//     .resume-t5 .t5-education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── ENTRY ── */
//     .resume-t5 .t5-entry {
//       margin-bottom: 14px;
//     }

//     .resume-t5 .t5-entry-heading {
//       font-size: 16px;
//       font-weight: 600;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//       margin-bottom: 1px;
//       word-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-heading-muted {
//       font-size: 16px;
//       font-weight: 400;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .resume-t5 .t5-entry-sub {
//       font-size: 14px;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-entry-date {
//       font-size: 13px;
//       color: #4b5563;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//       margin-top: 2px;
//     }

//     .resume-t5 .t5-entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding-top: 2px;
//       padding-bottom: 2px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//     }

//     .resume-t5 .t5-entry-content ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 .t5-entry-content ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 .t5-entry-content li {
//       margin: 0 !important;
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//     }

//     /* ── PROJECTS ── */
//     .resume-t5 .t5-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .resume-t5 .t5-project-link {
//       font-size: 12px;
//       color: #2563eb;
//       text-decoration: underline;
//     }

//     .resume-t5 .t5-project-tech {
//       font-size: 12px;
//       color: #6b7280;
//       margin: 4px 0;
//     }

//     /* ── EXTRA CONTENT ── */
//     .resume-t5 .t5-extra {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-extra p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .resume-t5 .t5-extra div { line-height: 1.5 !important; }

//     /* Custom Section Wrapper */
//     .resume-t5 .custom-section-wrapper {
//       margin-top: 12px;
//     }

//     /* ── WEBSITES ── */
//     .resume-t5 .t5-website-label {
//       font-size: 13px;
//       font-weight: 600;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-website-link {
//       font-size: 13px;
//       color: #2563eb;
//       text-decoration: underline;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 5mm; }
//       @page :first { margin-top: 0; }

//       .resume-t5 {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .resume-t5 .t5-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-details-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-link-btn { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

//       .resume-t5 .t5-entry { page-break-inside: avoid; break-inside: avoid; }
//       .resume-t5 .t5-section-title { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — no Tailwind, shared CSS classes
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

//     const photoHtml = base64Image
//     ? `<div class="header-photo-col">
//          <img src="${base64Image}" alt="Profile" class="t5-photo" style="width:100px;height:100px;object-fit:cover;border-radius:6px;" />
//        </div>`
//     : '';
    
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";
      
//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
//       return `
//         <div class="t5-section">
//           <div class="t5-section-title">Skills</div>
//           <div class="t5-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t5-section">
//           <div class="t5-section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="t5-entry">
//               <div class="t5-project-header">
//                 <div class="t5-entry-heading">${project.title || ""}</div>
//                 <div class="t5-project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t5-project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t5-project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="t5-project-tech"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="t5-entry-content">${cleanQuillHTML(project.description)}</div>
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
//     body { margin: 0; padding: 0; background: white; font-family: 'Nunito', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t5">

//   <!-- HEADER -->
//   <div class="t5-header">
//     <div class="t5-header-top">
//       <div class="t5-header-left">
//         ${photoHtml}
//         <div>
//           <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${contact?.jobTitle ? `<div class="t5-jobtitle">${contact.jobTitle}</div>` : ""}
//         </div>
//       </div>
//       <div class="t5-details-block">
//         <div class="t5-details-label">DETAILS</div>
//         ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//         ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//         ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//         ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
//       </div>
//     </div>
//     ${
//       linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//         ? `
//     <div class="t5-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t5-link-btn t5-link-github">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t5-link-btn t5-link-portfolio">Portfolio</a>` : ""}
//     </div>`
//         : ""
//     }
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Summary</div>
//     <div class="t5-extra">${cleanQuillHTML(summary)}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE - NEW LAYOUT -->
//   ${
//     experiences?.length > 0
//       ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const start = formatMonthYear(exp.startDate, false);
//         const end = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t5-entry">
//       <div class="t5-experience-header">
//         <div class="t5-experience-title">${exp.jobTitle || ""}</div>
//         <div class="t5-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//       </div>
//       <div class="t5-experience-subtitle">
//         ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//       </div>
//       ${exp.text ? `<div class="t5-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION - NEW LAYOUT -->
//   ${
//     educations?.length > 0
//       ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//     <div class="t5-entry">
//       <div class="t5-education-header">
//         <div class="t5-education-school">${edu.schoolname || ""}</div>
//         <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//       </div>
//       <div class="t5-education-subtitle">
//         ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//       </div>
//       ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
//       ${edu.text ? `<div class="t5-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//     </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS (Only) -->
//   ${customSections
//     .filter((s) => s?.name?.trim() || s?.description?.trim())
//     .map(
//       (s) => `
//   <div class="t5-section custom-section-wrapper">
//     ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="t5-extra">${cleanQuillHTML(s.description)}</div>` : ""}
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
//      JSX PREVIEW — same CSS classes, no Tailwind
//   ====================================================== */
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

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
//         className={`resume-t5 ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t5-header">
//           <div className="t5-header-top">
//             <div className="t5-header-left">
//               {previewUrl && (
//                 <img src={previewUrl} alt="Profile" className="t5-photo" />
//               )}
//               <div>
//                 <div className="t5-name">
//                   {contact?.firstName || ""} {contact?.lastName || ""}
//                 </div>
//                 {contact?.jobTitle && (
//                   <div className="t5-jobtitle">
//                     {contact.jobTitle}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="t5-details-block">
//               <div className="t5-details-label">DETAILS</div>
//               {[
//                 contact?.address,
//                 contact?.city,
//                 contact?.postCode,
//                 contact?.country,
//               ].filter(Boolean).length > 0 && (
//                 <div className="t5-details-text">
//                   {[
//                     contact?.address,
//                     contact?.city,
//                     contact?.postCode,
//                     contact?.country,
//                   ]
//                     .filter(Boolean)
//                     .join(", ")}
//                 </div>
//               )}
//               {contact?.phone && (
//                 <div className="t5-details-text">{contact.phone}</div>
//               )}
//               {contact?.email && (
//                 <div className="t5-details-text">{contact.email}</div>
//               )}
//               {formattedDob && (
//                 <div className="t5-details-text">{formattedDob}</div>
//               )}
//             </div>
//           </div>
//           {(linkedinUrl?.trim() ||
//             githubUrl?.trim() ||
//             portfolioUrl?.trim()) && (
//             <div className="t5-links">
//               {linkedinUrl?.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t5-link-btn t5-link-linkedin"
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
//                   className="t5-link-btn t5-link-github"
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
//                   className="t5-link-btn t5-link-portfolio"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           )}
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="t5-section">
//             <div className="t5-section-title">Summary</div>
//             <div
//               className="t5-extra"
//               dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE - NEW LAYOUT */}
//         {experiences?.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Experience</div>
//             {experiences.map((exp, index) => {
//               const start = formatMonthYear(exp.startDate, false);
//               const end = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : exp.startDate
//                   ? "Present"
//                   : "";
//               return (
//                 <div key={exp.id || index} className="t5-entry">
//                   <div className="t5-experience-header">
//                     <div className="t5-experience-title">
//                       {exp.jobTitle || ""}
//                     </div>
//                     <div className="t5-experience-date">
//                       {start}
//                       {start && end ? " - " : ""}
//                       {end}
//                     </div>
//                   </div>
//                   <div className="t5-experience-subtitle">
//                     {[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="t5-entry-content"
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

//         {/* EDUCATION - NEW LAYOUT */}
//         {educations?.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Education</div>
//             {educations.map((edu, index) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(
//                 edu.grade || "",
//               );
//               return (
//                 <div key={edu.id || index} className="t5-entry">
//                   <div className="t5-education-header">
//                     <div className="t5-education-school">
//                       {edu.schoolname || ""}
//                     </div>
//                     <div className="t5-education-date">
//                       {[edu.startDate, edu.endDate || "Present"]
//                         .filter(Boolean)
//                         .join(" — ")}
//                     </div>
//                   </div>
//                   <div className="t5-education-subtitle">
//                     {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                   </div>
//                   {formattedGrade && (
//                     <div className="t5-education-grade">{formattedGrade}</div>
//                   )}
//                   {edu.text && (
//                     <div
//                       className="t5-entry-content"
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

//         {/* SKILLS - Now using text editor format */}
//         {renderSkills()}

//         {/* CUSTOM SECTIONS (Only) */}
//         {customSections
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map((section, i) => (
//             <div
//               key={section.id || i}
//               className="t5-section custom-section-wrapper"
//             >
//               {section.name && (
//                 <div className="t5-section-title">{section.name}</div>
//               )}
//               {section.description && (
//                 <div
//                   className="t5-extra"
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

// export default TemplateFive;














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
import { usePathname } from "next/navigation";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
import { motion } from "framer-motion";

const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  
  const [iframeHeight, setIframeHeight] = useState<number>(1122);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string | null>(null);

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

  // Process image to base64
  useEffect(() => {
    let objectUrl: string | null = null;

    const processImage = async () => {
      if (!contact.photo) {
        setBase64Image(null);
        return;
      }

      try {
        if (typeof contact.photo === "string") {
          if (contact.photo.startsWith("blob:")) {
            const response = await fetch(contact.photo);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              setBase64Image(reader.result as string);
            };
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

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const customSections =
    isFinalizeData(finalize) && Array.isArray(finalize.customSection)
      ? finalize.customSection
      : [];

  /* ======================================================
     SHARED CSS — scoped to .resume-t5
  ====================================================== */
  const styles = `
    
  

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

    /* ── ALL RULES SCOPED TO .resume-t5 ── */
    .resume-t5 {
      max-width: 190mm;
      margin: 0 auto;
      background-color: #ffffff;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #111827;
      text-align: left;
    }

    @media print {
      .resume-t5 {
        max-width: none;
        margin: 0;
        padding: 0;
      }
    }

    .resume-t5 * {
      box-sizing: border-box;
    }

    /* Scoped resets — only inside resume */
    .resume-t5 p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-family: 'Nunito', Arial, sans-serif;
    }

    /* Rich text content styles */
    .resume-t5 .t5-entry-content ul,
    .resume-t5 .t5-entry-content ol,
    .resume-t5 .t5-extra ul,
    .resume-t5 .t5-extra ol,
    .resume-t5 .t5-skills-content ul,
    .resume-t5 .t5-skills-content ol {
      margin: 8px 0 8px 20px !important;
      padding-left: 0 !important;
    }

    .resume-t5 .t5-entry-content li,
    .resume-t5 .t5-extra li,
    .resume-t5 .t5-skills-content li {
      margin-bottom: 4px !important;
    }

    .resume-t5 .t5-entry-content strong,
    .resume-t5 .t5-extra strong,
    .resume-t5 .t5-skills-content strong {
      font-weight: 700 !important;
    }

    .resume-t5 .t5-entry-content em,
    .resume-t5 .t5-extra em,
    .resume-t5 .t5-skills-content em {
      font-style: italic !important;
    }

    .resume-t5 .t5-entry-content u,
    .resume-t5 .t5-extra u,
    .resume-t5 .t5-skills-content u {
      text-decoration: underline !important;
    }

    /* Preserve spaces in content */
    .resume-t5 .t5-entry-content p,
    .resume-t5 .t5-extra p,
    .resume-t5 .t5-skills-content p {
      white-space: pre-wrap !important;
    }

    .resume-t5 ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    /* ── SKILLS CONTENT ── */
    .resume-t5 .t5-skills-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding: 4px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .resume-t5 .t5-skills-content p {
      margin: 0 0 6px 0 !important;
    }

    /* ── HEADER ── */
    .resume-t5 .t5-header {
      background-color: #facc15;
      padding: 20px;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .resume-t5 .t5-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .resume-t5 .t5-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .resume-t5 .t5-photo {
      width: 96px;
      height: 96px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid #e5e7eb;
      flex-shrink: 0;
    }

    .resume-t5 .t5-name {
      font-size: 22px;
      font-weight: 700;
      text-transform: uppercase;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    .resume-t5 .t5-jobtitle {
      font-size: 13px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-details-block {
      padding-left: 20px;
    }

    .resume-t5 .t5-details-label {
      display: inline-block;
      background: #000;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 6px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
    }

    .resume-t5 .t5-details-text {
      font-size: 13px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-links {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .resume-t5 .t5-link-btn {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      text-decoration: none;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-link-linkedin { background-color: #2563eb; }
    .resume-t5 .t5-link-github { background-color: #1f2937; }
    .resume-t5 .t5-link-portfolio { background-color: #6b7280; }

    /* ── SECTION ── */
    .resume-t5 .t5-section {
      margin-top: 10px;
      padding: 0 20px;
    }

    .resume-t5 .t5-section-title {
      display: inline-block;
      background: #000;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      text-transform: uppercase;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
    }

    /* ── EXPERIENCE HEADER ── */
    .resume-t5 .t5-experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-experience-title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }

    .resume-t5 .t5-experience-date {
      font-size: 13px;
      color: #4b5563;
    }

    .resume-t5 .t5-experience-subtitle {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 4px;
      font-weight: 500;
    }

    /* ── EDUCATION HEADER ── */
    .resume-t5 .t5-education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-education-school {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }

    .resume-t5 .t5-education-date {
      font-size: 13px;
      color: #4b5563;
    }

    .resume-t5 .t5-education-subtitle {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .resume-t5 .t5-education-grade {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
      font-weight: 500;
    }

    /* ── ENTRY ── */
    .resume-t5 .t5-entry {
      margin-bottom: 14px;
    }

    .resume-t5 .t5-entry-heading {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-bottom: 1px;
      word-wrap: break-word;
    }

    .resume-t5 .t5-entry-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding-top: 2px;
      padding-bottom: 2px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── PROJECTS ── */
    .resume-t5 .t5-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-project-links {
      display: flex;
      gap: 12px;
    }

    .resume-t5 .t5-project-link {
      font-size: 12px;
      color: #2563eb;
      text-decoration: underline;
    }

    .resume-t5 .t5-project-tech {
      font-size: 12px;
      color: #6b7280;
      margin: 4px 0;
    }

    /* ── EXTRA CONTENT ── */
    .resume-t5 .t5-extra {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Custom Section Wrapper */
    .resume-t5 .custom-section-wrapper {
      margin-top: 12px;
    }

    /* ── PRINT ── */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .resume-t5 {
        width: 100% !important;
        box-shadow: none !important;
      }
      .resume-t5 .t5-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-details-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-link-btn { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-entry { page-break-inside: avoid; break-inside: avoid; }
      .resume-t5 .t5-section-title { page-break-after: avoid; break-after: avoid; }
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
     HTML GENERATION — single source for preview and PDF
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

    const photoHtml = base64Image
      ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
      : '';

    const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === 'string' && !skills.trim())) return "";
      
      const cleanedSkills = cleanQuillHTML(skills);
      if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
      return `
        <div class="t5-section">
          <div class="t5-section-title">Skills</div>
          <div class="t5-skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="t5-section">
          <div class="t5-section-title">Projects</div>
          ${projects
            .map(
              (project: any) => `
            <div class="t5-entry">
              <div class="t5-project-header">
                <div class="t5-entry-heading">${project.title || ""}</div>
                <div class="t5-project-links">
                  ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
                  ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
                </div>
              </div>
              ${
                project.techStack && project.techStack.length > 0
                  ? `
                <div class="t5-project-tech"><strong>Tech:</strong> ${project.techStack.join(" , ")}</div>
              `
                  : ""
              }
              ${
                project.description
                  ? `
                <div class="t5-entry-content">${cleanQuillHTML(project.description)}</div>
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

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="resume-t5">

  <!-- HEADER -->
  <div class="t5-header">
    <div class="t5-header-top">
      <div class="t5-header-left">
        ${photoHtml}
        <div>
          <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          ${contact?.jobTitle ? `<div class="t5-jobtitle">${contact.jobTitle}</div>` : ""}
        </div>
      </div>
      <div class="t5-details-block">
        <div class="t5-details-label">DETAILS</div>
        ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
        ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
        ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
        ${formattedDobHtml ? `<div class="t5-details-text">${formattedDobHtml}</div>` : ""}
      </div>
    </div>
    ${
      linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
        ? `
    <div class="t5-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
      ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
      ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
    </div>`
        : ""
    }
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Summary</div>
    <div class="t5-extra">${cleanQuillHTML(summary)}</div>
  </div>`
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences?.length > 0
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Experience</div>
    ${experiences
      .map((exp) => {
        const start = formatMonthYear(exp.startDate, false);
        const end = exp.endDate
          ? formatMonthYear(exp.endDate, false)
          : exp.startDate
            ? "Present"
            : "";
        return `
    <div class="t5-entry">
      <div class="t5-experience-header">
        <div class="t5-experience-title">${exp.jobTitle || ""}</div>
        <div class="t5-experience-date">${start}${start && end ? " - " : ""}${end}</div>
      </div>
      <div class="t5-experience-subtitle">
        ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
      </div>
      ${exp.text ? `<div class="t5-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
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
  <div class="t5-section">
    <div class="t5-section-title">Education</div>
    ${educations
      .map((edu) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `
    <div class="t5-entry">
      <div class="t5-education-header">
        <div class="t5-education-school">${edu.schoolname || ""}</div>
        <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
      </div>
      <div class="t5-education-subtitle">
        ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
      </div>
      ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
      ${edu.text ? `<div class="t5-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
    </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- CUSTOM SECTIONS -->
  ${customSections
    .filter((s) => s?.name?.trim() || s?.description?.trim())
    .map(
      (s) => `
  <div class="t5-section custom-section-wrapper">
    ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="t5-extra">${cleanQuillHTML(s.description)}</div>` : ""}
  </div>`,
    )
    .join("")}

</div>
${HEIGHT_SCRIPT}
</body>
</html>`;
  }, [contact, educations, experiences, skills, projects, customSections, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, base64Image]);

  // Debounced update
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
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      
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
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
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

export default TemplateFive;