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
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const blobUrlRef = useRef<string | null>(null);
  
//   const [iframeHeight, setIframeHeight] = useState<number>(1122);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [base64Image, setBase64Image] = useState<string | null>(null);

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

//   // Process image to base64
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
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               setBase64Image(reader.result as string);
//             };
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

//   const customSections =
//     isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : [];

//   /* ======================================================
//      SHARED CSS — scoped to .resume-t5
//   ====================================================== */
//   const styles = `
    
  

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

//     /* ── ALL RULES SCOPED TO .resume-t5 ── */
//     .resume-t5 {
//       max-width: 190mm;
//       margin: 0 auto;
//       background-color: #ffffff;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     @media print {
//       .resume-t5 {
//         max-width: none;
//         margin: 0;
//         padding: 0;
//       }
//     }

//     .resume-t5 * {
//       box-sizing: border-box;
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
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
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
//       padding-left: 20px;
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

//     /* ── EXPERIENCE HEADER ── */
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

//     .resume-t5 .t5-experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     /* ── EDUCATION HEADER ── */
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

//     .resume-t5 .t5-education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

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

//     /* Custom Section Wrapper */
//     .resume-t5 .custom-section-wrapper {
//       margin-top: 12px;
//     }

//     /* ── PRINT ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .resume-t5 {
//         width: 100% !important;
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
//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postCode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const photoHtml = base64Image
//       ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
//       : '';

//     const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML
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

//     // Generate projects HTML
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
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
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
//   <style>${styles}</style>
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
//         ${formattedDobHtml ? `<div class="t5-details-text">${formattedDobHtml}</div>` : ""}
//       </div>
//     </div>
//     ${
//       linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//         ? `
//     <div class="t5-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
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

//   <!-- EXPERIENCE -->
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

//   <!-- EDUCATION -->
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

//   <!-- CUSTOM SECTIONS -->
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
// ${HEIGHT_SCRIPT}
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, customSections, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, base64Image]);

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
       


//  <div
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

// export default TemplateFive;










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
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";
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
// //   .resume-t5 { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);
//   const [base64Image, setBase64Image] = useState<string | null>(null);

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

//   // Process image to base64
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
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               setBase64Image(reader.result as string);
//             };
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

//   const customSections =
//     isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : [];

//   /* ======================================================
//      SHARED CSS — scoped to .resume-t5
//   ====================================================== */
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     /* ── ALL RULES SCOPED TO .resume-t5 ── */
//     .resume-t5 {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background-color: #ffffff;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     .resume-t5 * {
//       box-sizing: border-box;
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
//       page-break-inside: avoid;
//       break-inside: avoid;
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
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
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
//       padding-left: 20px;
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
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── EXPERIENCE HEADER ── */
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

//     .resume-t5 .t5-experience-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     /* ── EDUCATION HEADER ── */
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

//     .resume-t5 .t5-education-subtitle {
//       font-size: 14px;
//       color: #6b7280;
//       margin-bottom: 4px;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-education-grade {
//       font-size: 13px;
//       color: #6b7280;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* ── ENTRY ── */
//     .resume-t5 .t5-entry {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
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

//     /* Custom Section Wrapper */
//     .resume-t5 .custom-section-wrapper {
//       margin-top: 12px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* ── PRINT ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .resume-t5 .t5-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-details-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-link-btn { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — single source for preview and PDF
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

//     const photoHtml = base64Image
//       ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
//       : '';

//     const formattedDobHtml = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     // Generate skills HTML
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

//     // Generate projects HTML
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
//                   ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
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

//     // PDF override: strip the fixed width/padding from .resume-t5 so Puppeteer's
//     // own 15mm margins control the layout
//     const pdfOverrideStyle = forPDF
//       ? `<style>.resume-t5 { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
// <div class="resume-t5">

//   <!-- HEADER -->
//   <div class="t5-header">
//     <div class="t5-header-top">
//       <div class="t5-header-left">
//         ${photoHtml}
//         <div>
//           <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${contact?.jobTitle ? `<div class="t5-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//         </div>
//       </div>
//       <div class="t5-details-block">
//         <div class="t5-details-label">DETAILS</div>
//         ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//         ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//         ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//         ${formattedDobHtml ? `<div class="t5-details-text">${formattedDobHtml}</div>` : ""}
//       </div>
//     </div>
//     ${
//       linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//         ? `
//     <div class="t5-links">
//       ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
//       ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
//       ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
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

//   <!-- EXPERIENCE -->
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

//   <!-- EDUCATION -->
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

//   <!-- CUSTOM SECTIONS -->
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
//   }, [contact, educations, experiences, skills, projects, customSections, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, base64Image, CSS]);

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
//           const resume = doc.querySelector<HTMLElement>(".resume-t5");
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
//             ".t5-header",
//             ".t5-entry",
//             ".t5-section-title",
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
//     .resume-t5 {
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

// export default TemplateFive;



























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
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";
// import { motion } from "framer-motion";

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// // At 96 dpi: 210mm→794px, 297mm→1123px, 15mm→57px
// // PAGE_CONTENT_H = 1123 - 57*2 = 1009px (usable content per page)
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   // ── Data sources ─────────────────────────────────────────────────────────
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

//   // ── Image → base64 ───────────────────────────────────────────────────────
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
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
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
//       } catch (error) {
//         console.error("Error processing image:", error);
//       }
//     };

//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const customSections =
//     isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : [];

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .resume-t5 {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: #ffffff;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     .resume-t5 * { box-sizing: border-box; }

//     .resume-t5 p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

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
//     .resume-t5 .t5-skills-content strong { font-weight: 700 !important; }

//     .resume-t5 .t5-entry-content em,
//     .resume-t5 .t5-extra em,
//     .resume-t5 .t5-skills-content em { font-style: italic !important; }

//     .resume-t5 .t5-entry-content u,
//     .resume-t5 .t5-extra u,
//     .resume-t5 .t5-skills-content u { text-decoration: underline !important; }

//     .resume-t5 .t5-entry-content p,
//     .resume-t5 .t5-extra p,
//     .resume-t5 .t5-skills-content p { white-space: pre-wrap !important; }

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

//     .resume-t5 .t5-skills-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-skills-content p { margin: 0 0 6px 0 !important; }

//     /* ── HEADER ── */
//     .resume-t5 .t5-header {
//       background-color: #facc15;
//       padding: 20px;
//       border-radius: 6px;
//       margin-bottom: 10px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
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

//     .resume-t5 .t5-details-block { padding-left: 20px; }

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
//       .resume-t5 .t5-links a {
//             text-decoration: none !important;
//       color: #fff !important;

//     }

//     .resume-t5 .t5-link-btn {
//       display: inline-flex;
//       align-items: center;
//       padding: 4px 12px;
//       border-radius: 9999px;
//       font-size: 13px;
//       font-weight: 500;
//       color: #fff;
//       text-decoration: none !important;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-link-linkedin { background-color: #2563eb; }
//     .resume-t5 .t5-link-github   { background-color: #1f2937; }
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
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── EXPERIENCE ── */
//     .resume-t5 .t5-experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-experience-title { font-size: 16px; font-weight: 600; color: #111827; }
//     .resume-t5 .t5-experience-date  { font-size: 13px; color: #4b5563; }
//     .resume-t5 .t5-experience-subtitle {
//       font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 500;
//     }

//     /* ── EDUCATION ── */
//     .resume-t5 .t5-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-education-school { font-size: 16px; font-weight: 600; color: #111827; }
//     .resume-t5 .t5-education-date   { font-size: 13px; color: #4b5563; }
//     .resume-t5 .t5-education-subtitle {
//       font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 500;
//     }
//     .resume-t5 .t5-education-grade  { font-size: 13px; color: #6b7280; margin-top: 4px; font-weight: 500; }

//     /* ── ENTRY ── */
//     .resume-t5 .t5-entry {
//       margin-bottom: 14px;
//       page-break-inside: avoid;
//       break-inside: avoid;
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

//     /* ── PROJECTS ── */
//     .resume-t5 .t5-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-project-links { display: flex; gap: 12px; }
//     .resume-t5 .t5-project-link  { font-size: 12px; color: #2563eb; text-decoration: underline; }
//     .resume-t5 .t5-project-tech  { font-size: 12px; color: #6b7280; margin: 4px 0; }

//     /* ── EXTRA / CUSTOM ── */
//     .resume-t5 .t5-extra {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .custom-section-wrapper {
//       margin-top: 12px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Page-break marker injected at cut points for PDF */
//     .t5-page-break {
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
//       .resume-t5 { width: 100% !important; padding: 0 !important; }
//       .resume-t5 .t5-project-link,
//       .resume-t5 .t5-link-btn { color: #000 !important; text-decoration: underline !important; }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   // pageBreakIds: array of element data-ids where page breaks should be injected.
//   // Used when forPDF=true so Puppeteer breaks at the same points as the preview.
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const photoHtml = base64Image
//         ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
//         : "";

//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       // ── Header ──────────────────────────────────────────────────────────
//       const header = `
//       <div class="t5-header" data-block-id="t5-header">
//         <div class="t5-header-top">
//           <div class="t5-header-left">
//             ${photoHtml}
//             <div>
//               <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//               ${contact?.jobTitle
//                 ? `<div class="t5-jobtitle">${
//                     typeof contact.jobTitle === "string"
//                       ? contact.jobTitle
//                       : (contact.jobTitle as any)?.name || ""
//                   }</div>`
//                 : ""}
//             </div>
//           </div>
//           <div class="t5-details-block">
//             <div class="t5-details-label">DETAILS</div>
//             ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//             ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//             ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//             ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
//           </div>
//         </div>
//         ${
//           linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//             ? `<div class="t5-links">
//                 ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
//                 ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
//                 ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
//               </div>`
//             : ""
//         }
//       </div>`;

//       // ── Summary ──────────────────────────────────────────────────────────
//       const summaryBlock = summary
//         ? `<div class="t5-section" data-block-id="t5-summary">
//             <div class="t5-section-title">Summary</div>
//             <div class="t5-extra">${cleanQuillHTML(summary)}</div>
//           </div>`
//         : "";

//       // ── Experience ───────────────────────────────────────────────────────
//       const expBlock =
//         experiences?.length > 0
//           ? `<div class="t5-section" data-block-id="t5-exp-section">
//               <div class="t5-section-title">Experience</div>
//               ${experiences
//                 .map((exp: any, i: number) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate
//                     ? formatMonthYear(exp.endDate, false)
//                     : exp.startDate
//                     ? "Present"
//                     : "";
//                   return `<div class="t5-entry" data-block-id="t5-exp-${i}">
//                     <div class="t5-experience-header">
//                       <div class="t5-experience-title">${exp.jobTitle || ""}</div>
//                       <div class="t5-experience-date">${start}${start && end ? " - " : ""}${end}</div>
//                     </div>
//                     <div class="t5-experience-subtitle">
//                       ${[exp.employer, exp.location].filter(Boolean).join(" — ")}
//                     </div>
//                     ${exp.text ? `<div class="t5-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//                   </div>`;
//                 })
//                 .join("")}
//             </div>`
//           : "";

//       // ── Projects ─────────────────────────────────────────────────────────
//       const projBlock =
//         projects?.length > 0
//           ? `<div class="t5-section" data-block-id="t5-proj-section">
//               <div class="t5-section-title">Projects</div>
//               ${projects
//                 .map(
//                   (p: any, i: number) => `
//                 <div class="t5-entry" data-block-id="t5-proj-${i}">
//                   <div class="t5-project-header">
//                     <div class="t5-entry-heading">${p.title || ""}</div>
//                     <div class="t5-project-links">
//                       ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
//                       ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
//                     </div>
//                   </div>
//                   ${p.techStack?.length ? `<div class="t5-project-tech"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//                   ${p.description ? `<div class="t5-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
//                 </div>`,
//                 )
//                 .join("")}
//             </div>`
//           : "";

//       // ── Education ────────────────────────────────────────────────────────
//       const eduBlock =
//         educations?.length > 0
//           ? `<div class="t5-section" data-block-id="t5-edu-section">
//               <div class="t5-section-title">Education</div>
//               ${educations
//                 .map((edu: any, i: number) => {
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return `<div class="t5-entry" data-block-id="t5-edu-${i}">
//                     <div class="t5-education-header">
//                       <div class="t5-education-school">${edu.schoolname || ""}</div>
//                       <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                     </div>
//                     <div class="t5-education-subtitle">
//                       ${[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                     </div>
//                     ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
//                     ${edu.text ? `<div class="t5-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//                   </div>`;
//                 })
//                 .join("")}
//             </div>`
//           : "";

//       // ── Skills ───────────────────────────────────────────────────────────
//       const skillsClean = cleanQuillHTML(skills || "");
//       const skillsBlock =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `<div class="t5-section" data-block-id="t5-skills-section">
//               <div class="t5-section-title">Skills</div>
//               <div class="t5-skills-content" data-block-id="t5-skills-content">${skillsClean}</div>
//             </div>`
//           : "";

//       // ── Custom sections ──────────────────────────────────────────────────
//       const customBlock = customSections
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any, i: number) => `
//           <div class="t5-section custom-section-wrapper" data-block-id="t5-custom-${i}">
//             ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
//             ${s.description ? `<div class="t5-extra">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`,
//         )
//         .join("");

//       // PDF override: strip fixed width/padding so Puppeteer's 15mm margins
//       // control the layout; also inject explicit page-break divs at cut points.
//       const pdfStyle = forPDF
//         ? `<style>.resume-t5 { width: 100% !important; padding: 0 !important; }</style>`
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

//       // For PDF: inject <div class="t5-page-break"> before each element whose
//       // data-block-id matches one of the pageBreakIds — same cut points as preview
//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t5-page-break";
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
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="resume-t5">
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
//       customSections,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       base64Image,
//       CSS,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — identical algorithm to TemplateOne
//   //
//   // KEY POINTS:
//   //   1. Creates a fresh hidden iframe per split (avoids stale ref issues)
//   //   2. Waits for fonts.ready + rAF so measurements are accurate
//   //   3. Collects avoid-break blocks (entries, section-title+first-item pairs)
//   //   4. Records data-block-ids at each cut point → pageBreakIds for PDF
//   //   5. Clips each page to clipH = nextStart - thisStart (not always PAGE_CONTENT_H)
//   //      → prevents content bleeding past the actual cut point
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".resume-t5");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

//         // Hidden measurement iframe — created fresh each time so fonts and
//         // layout always match what the visible render iframes produce.
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
//     .resume-t5 {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".resume-t5");
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

//           // ── Collect avoid-break blocks ──────────────────────────────
//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".t5-entry",
//             ".t5-header",
//             ".custom-section-wrapper",
//             ".t5-skills-content",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // Section title + first entry paired — prevents orphaned headings
//           resume
//             .querySelectorAll<HTMLElement>(".t5-section-title")
//             .forEach((title) => {
//               const titleTop = getRelTop(title);
//               let firstItem: HTMLElement | null = null;
//               let sib = title.nextElementSibling as HTMLElement | null;
//               while (sib) {
//                 if (sib.getBoundingClientRect().height > 8) {
//                   firstItem = sib;
//                   break;
//                 }
//                 sib = sib.nextElementSibling as HTMLElement | null;
//               }
//               if (firstItem) {
//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".t5-entry, .custom-section-wrapper, .t5-skills-content",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - titleTop > 8) {
//                   // ID = the .t5-section wrapper (title's parent)
//                   const sectionId = (title.parentElement as HTMLElement)
//                     ?.dataset?.blockId;
//                   blocks.push({
//                     top: titleTop,
//                     bottom: anchorBottom,
//                     id: sectionId,
//                   });
//                 }
//               }
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate cut points ────────────────────────────────────
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

//           // Store pageBreakIds so handleDownload can pass them to generateHTML
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           // ── Build preview page HTMLs ────────────────────────────────
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             // KEY: clip at actual cut point, not always PAGE_CONTENT_H
//             // This prevents content from bleeding past the cut on each page
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
//     .resume-t5 {
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
//   // Reads pageBreakIds calculated during splitIntoPages and passes them to
//   // generateHTML so Puppeteer breaks at the exact same points as the preview.
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
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

//   // ── RENDER ───────────────────────────────────────────────────────────────
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

// export default TemplateFive;





















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
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";
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

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);
//   const [base64Image, setBase64Image] = useState<string | null>(null);

//   // ── Data sources ─────────────────────────────────────────────────────────
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

//   // ── Image → base64 ───────────────────────────────────────────────────────
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
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
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
//       } catch (error) {
//         console.error("Error processing image:", error);
//       }
//     };

//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const customSections =
//     isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : [];

//   // ── CSS ── Professional Blue Theme ───────────────────────────────────────
//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .resume-t5 {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: #ffffff;
//       font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//     }

//     .resume-t5 * { box-sizing: border-box; }

//     /* Typography */
//     .resume-t5 p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* Rich Text Content Styles */
//     .resume-t5 .t5-entry-content ul,
//     .resume-t5 .t5-entry-content ol,
//     .resume-t5 .t5-extra ul,
//     .resume-t5 .t5-extra ol,
//     .resume-t5 .t5-skills-content ul,
//     .resume-t5 .t5-skills-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 0 !important;
//     }

//     .resume-t5 .t5-entry-content li,
//     .resume-t5 .t5-extra li,
//     .resume-t5 .t5-skills-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.5 !important;
//     }

//     .resume-t5 .t5-entry-content strong,
//     .resume-t5 .t5-extra strong,
//     .resume-t5 .t5-skills-content strong { font-weight: 700 !important; color: #111827; }

//     .resume-t5 .t5-entry-content em,
//     .resume-t5 .t5-extra em,
//     .resume-t5 .t5-skills-content em { font-style: italic !important; }

//     .resume-t5 .t5-entry-content u,
//     .resume-t5 .t5-extra u,
//     .resume-t5 .t5-skills-content u { text-decoration: underline !important; }

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
//       margin-bottom: 2px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//     }

//     /* ── HEADER ── Blue Theme */
//     .resume-t5 .t5-header {
//       background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
//       padding: 28px 24px;
//       border-radius: 12px;
//       margin-bottom: 20px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//     }

//     .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: flex-start;
//       justify-content: space-between;
//       flex-wrap: wrap;
//       gap: 24px;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 20px;
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 12px;
//       object-fit: cover;
//       border: 3px solid rgba(255, 255, 255, 0.2);
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-name {
//       font-size: 26px;
//       font-weight: 700;
//       color: #ffffff;
//       letter-spacing: -0.02em;
//       margin-bottom: 6px;
//       line-height: 1.2;
//     }

//     .resume-t5 .t5-jobtitle {
//       font-size: 14px;
//       color: #bfdbfe;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-details-block {
//       background: rgba(255, 255, 255, 0.1);
//       padding: 12px 16px;
//       border-radius: 10px;
//       min-width: 220px;
//       flex:1;
//     }

//     .resume-t5 .t5-details-label {
//       font-size: 11px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #bfdbfe;
//       margin-bottom: 8px;
//     }

//     .resume-t5 .t5-details-text {
//       font-size: 12px;
//       color: #e2e8f0;
//       line-height: 1.6;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-links {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-top: 16px;
//       padding-top: 16px;
//       border-top: 1px solid rgba(255, 255, 255, 0.15);
//       flex-wrap: wrap;
//     }

//     .resume-t5 .t5-link-btn {
//       display: inline-flex;
//       align-items: center;
//       padding: 6px 16px;
//       border-radius: 8px;
//       font-size: 12px;
//       font-weight: 500;
//       text-decoration: none;
//       transition: all 0.2s ease;
//     }

//     .resume-t5 .t5-link-linkedin { background-color: #ffffff; color: #1e40af; }
//     .resume-t5 .t5-link-github { background-color: #ffffff; color: #1e40af; }
//     .resume-t5 .t5-link-portfolio { background-color: #ffffff; color: #1e40af; }

//     /* ── SECTION ── */
//     .resume-t5 .t5-section {
//       margin-top: 16px;
//       margin-bottom: 16px;
//     }

//     .resume-t5 .t5-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       color: #1e3a8a;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       padding-bottom: 8px;
//       border-bottom: 2px solid #e2e8f0;
//       margin-bottom: 12px;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* ── EXPERIENCE & EDUCATION ── */
//     .resume-t5 .t5-entry {
//       margin-bottom: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .resume-t5 .t5-experience-header,
//     .resume-t5 .t5-education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-experience-title,
//     .resume-t5 .t5-education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #0f172a;
//     }

//     .resume-t5 .t5-experience-date,
//     .resume-t5 .t5-education-date {
//       font-size: 12px;
//       color: #64748b;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-experience-subtitle,
//     .resume-t5 .t5-education-subtitle {
//       font-size: 13px;
//       color: #475569;
//       margin-bottom: 6px;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-education-grade {
//       font-size: 12px;
//       color: #64748b;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-entry-content {
//       font-size: 13px;
//       color: #334155;
//       line-height: 1.6;
//       padding-top: 6px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-content p {
//       margin-bottom: 6px !important;
//     }

//     /* ── PROJECTS ── */
//     .resume-t5 .t5-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 6px;
//     }

//     .resume-t5 .t5-entry-heading {
//       font-size: 15px;
//       font-weight: 700;
//       color: #0f172a;
//     }

//     .resume-t5 .t5-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .resume-t5 .t5-project-link {
//       font-size: 11px;
//       color: #2563eb;
//       text-decoration: none;
//       font-weight: 500;
//     }

//     .resume-t5 .t5-project-link:hover {
//       text-decoration: underline;
//     }

//     .resume-t5 .t5-project-tech {
//       font-size: 11px;
//       color: #64748b;
//       margin: 4px 0 6px 0;
//       font-weight: 500;
//     }

//     /* ── SKILLS ── */
//     .resume-t5 .t5-skills-content {
//       font-size: 13px;
//       color: #334155;
//       line-height: 1.6;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-skills-content p {
//       margin-bottom: 4px !important;
//     }

//     /* ── EXTRA / CUSTOM SECTIONS ── */
//     .resume-t5 .custom-section-wrapper {
//       margin-top: 16px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .resume-t5 .t5-extra {
//       font-size: 13px;
//       color: #334155;
//       line-height: 1.6;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Page-break marker */
//     .t5-page-break {
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
//       .resume-t5 .t5-header {
//         background: #1e40af !important;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       .resume-t5 .t5-project-link {
//         color: #2563eb !important;
//       }
//       .resume-t5 .t5-link-linkedin,
//       .resume-t5 .t5-link-portfolio,      .resume-t5 .t5-link-github 
//  {
//         background-color: #ffffff !important;
//         color: #1e40af !important;
//       }
        
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const addressStr = [
//         contact?.address,
//         contact?.city,
//         contact?.postCode,
//         contact?.country,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const photoHtml = base64Image
//         ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
//         : "";

//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       const header = `
//       <div class="t5-header" data-block-id="t5-header">
//         <div class="t5-header-top">
//           <div class="t5-header-left">
//             ${photoHtml}
//             <div>
//               <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//               ${contact?.jobTitle
//                 ? `<div class="t5-jobtitle">${
//                     typeof contact.jobTitle === "string"
//                       ? contact.jobTitle
//                       : (contact.jobTitle as any)?.name || ""
//                   }</div>`
//                 : ""}
//             </div>
//           </div>
//           <div class="t5-details-block">
//             <div class="t5-details-label">CONTACT</div>
//             ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//             ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//             ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//             ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
//           </div>
//         </div>
//         ${
//           linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
//             ? `<div class="t5-links">
//                 ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
//                 ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
//                 ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
//               </div>`
//             : ""
//         }
//       </div>`;

//       const summaryBlock = summary
//         ? `<div class="t5-section" data-block-id="t5-summary">
//             <div class="t5-section-title">Professional Summary</div>
//             <div class="t5-extra">${cleanQuillHTML(summary)}</div>
//           </div>`
//         : "";

//       const expBlock =
//         experiences?.length > 0
//           ? `<div class="t5-section" data-block-id="t5-exp-section">
//               <div class="t5-section-title">Experience</div>
//               ${experiences
//                 .map((exp: any, i: number) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate
//                     ? formatMonthYear(exp.endDate, false)
//                     : exp.startDate
//                     ? "Present"
//                     : "";
//                   return `<div class="t5-entry" data-block-id="t5-exp-${i}">
//                     <div class="t5-experience-header">
//                       <div class="t5-experience-title">${exp.jobTitle || ""}</div>
//                       <div class="t5-experience-date">${start}${start && end ? " — " : ""}${end}</div>
//                     </div>
//                     <div class="t5-experience-subtitle">
//                       ${[exp.employer, exp.location].filter(Boolean).join(" • ")}
//                     </div>
//                     ${exp.text ? `<div class="t5-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//                   </div>`;
//                 })
//                 .join("")}
//             </div>`
//           : "";

//       const projBlock =
//         projects?.length > 0
//           ? `<div class="t5-section" data-block-id="t5-proj-section">
//               <div class="t5-section-title">Projects</div>
//               ${projects
//                 .map(
//                   (p: any, i: number) => `
//                 <div class="t5-entry" data-block-id="t5-proj-${i}">
//                   <div class="t5-project-header">
//                     <div class="t5-entry-heading">${p.title || ""}</div>
//                     <div class="t5-project-links">
//                       ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
//                       ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
//                     </div>
//                   </div>
//                   ${p.techStack?.length ? `<div class="t5-project-tech">Tech Stack: ${p.techStack.join(" • ")}</div>` : ""}
//                   ${p.description ? `<div class="t5-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
//                 </div>`,
//                 )
//                 .join("")}
//             </div>`
//           : "";

//       const eduBlock =
//         educations?.length > 0
//           ? `<div class="t5-section" data-block-id="t5-edu-section">
//               <div class="t5-section-title">Education</div>
//               ${educations
//                 .map((edu: any, i: number) => {
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return `<div class="t5-entry" data-block-id="t5-edu-${i}">
//                     <div class="t5-education-header">
//                       <div class="t5-education-school">${edu.schoolname || ""}</div>
//                       <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                     </div>
//                     <div class="t5-education-subtitle">
//                       ${[edu.degree, edu.location].filter(Boolean).join(" • ")}
//                     </div>
//                     ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
//                     ${edu.text ? `<div class="t5-entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
//                   </div>`;
//                 })
//                 .join("")}
//             </div>`
//           : "";

//       const skillsClean = cleanQuillHTML(skills || "");
//       const skillsBlock =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `<div class="t5-section" data-block-id="t5-skills-section">
//               <div class="t5-section-title">Skills</div>
//               <div class="t5-skills-content" data-block-id="t5-skills-content">${skillsClean}</div>
//             </div>`
//           : "";

//       const customBlock = customSections
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any, i: number) => `
//           <div class="t5-section custom-section-wrapper" data-block-id="t5-custom-${i}">
//             <div class="t5-section-title">${s.name}</div>
//             <div class="t5-extra">${cleanQuillHTML(s.description)}</div>
//           </div>`,
//         )
//         .join("");

//       const pdfStyle = forPDF
//         ? `<style>.resume-t5 { width: 100% !important; padding: 0 !important; }</style>`
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

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t5-page-break";
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
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="resume-t5">
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
//       customSections,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       base64Image,
//       CSS,
//     ],
//   );

//   // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".resume-t5");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

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
//     .resume-t5 {
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
//           const resume = measureDoc.querySelector<HTMLElement>(".resume-t5");
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

//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".t5-entry",
//             ".t5-header",
//             ".custom-section-wrapper",
//             ".t5-skills-content",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           resume
//             .querySelectorAll<HTMLElement>(".t5-section-title")
//             .forEach((title) => {
//               const titleTop = getRelTop(title);
//               let firstItem: HTMLElement | null = null;
//               let sib = title.nextElementSibling as HTMLElement | null;
//               while (sib) {
//                 if (sib.getBoundingClientRect().height > 8) {
//                   firstItem = sib;
//                   break;
//                 }
//                 sib = sib.nextElementSibling as HTMLElement | null;
//               }
//               if (firstItem) {
//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".t5-entry, .custom-section-wrapper, .t5-skills-content",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - titleTop > 8) {
//                   const sectionId = (title.parentElement as HTMLElement)
//                     ?.dataset?.blockId;
//                   blocks.push({
//                     top: titleTop,
//                     bottom: anchorBottom,
//                     id: sectionId,
//                   });
//                 }
//               }
//             });

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
//     .resume-t5 {
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
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       // const res: AxiosResponse<Blob> = await axios.post(
//       //   `${API_URL}/api/candidates/generate-pdf`,
//       //   { html: pdfHtml },
//       //   { responseType: "blob" },
//       // );



//         const res: AxiosResponse<Blob> = await api.post(
//               `${API_URL}/candidates/generate-pdf`,
//               { html:pdfHtml  },
//               { responseType: "blob" },
//             );

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
//            {lastSegment === "download-resume" && ( 
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//         >
//           Download Resume
//         </motion.button>
//       </div>
//       )}

//       {alldata ? (
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

// export default TemplateFive;






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
import { usePathname } from "next/navigation";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import {
  ResumeCustomization,
  SectionKey,
  DEFAULT_SECTION_ORDER,
} from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateFiveProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateFive: React.FC<TemplateFiveProps> = ({ alldata, customization }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
            const [isDownloading, setIsDownloading] = useState<boolean>(false);
  

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";
  const activeSectionOrder: SectionKey[] = customization?.sectionOrder ?? [...DEFAULT_SECTION_ORDER];

  // ── Data sources ─────────────────────────────────────────────────────────
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

  // ── Image → base64 ───────────────────────────────────────────────────────
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
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    processImage();
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [contact.photo]);

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const customSections =
    isFinalizeData(finalize) && Array.isArray(finalize.customSection)
      ? finalize.customSection
      : [];

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

  // ── CSS builder with dynamic font ───────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .resume-t5 {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
    }

    .resume-t5 * { box-sizing: border-box; }

    .resume-t5 p, .resume-t5 div, .resume-t5 span, .resume-t5 li, .resume-t5 a {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    /* Typography */
    .resume-t5 p {
      margin: 0 0 4px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* Rich Text Content Styles */
    .resume-t5 .t5-entry-content ul,
    .resume-t5 .t5-entry-content ol,
    .resume-t5 .t5-extra ul,
    .resume-t5 .t5-extra ol,
    .resume-t5 .t5-skills-content ul,
    .resume-t5 .t5-skills-content ol {
      margin: 4px 0 4px 20px !important;
      padding-left: 0 !important;
    }

    .resume-t5 .t5-entry-content li,
    .resume-t5 .t5-extra li,
    .resume-t5 .t5-skills-content li {
      margin-bottom: 2px !important;
      line-height: 1.5 !important;
    }

    .resume-t5 .t5-entry-content strong,
    .resume-t5 .t5-extra strong,
    .resume-t5 .t5-skills-content strong { font-weight: 700 !important; color: #111827; }

    .resume-t5 .t5-entry-content em,
    .resume-t5 .t5-extra em,
    .resume-t5 .t5-skills-content em { font-style: italic !important; }

    .resume-t5 .t5-entry-content u,
    .resume-t5 .t5-extra u,
    .resume-t5 .t5-skills-content u { text-decoration: underline !important; }

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
      margin-bottom: 2px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
    }

    /* Header - Blue Theme */
    .resume-t5 .t5-header {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      padding: 28px 24px;
      border-radius: 12px;
      margin-bottom: 20px;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .resume-t5 .t5-header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
    }

    .resume-t5 .t5-header-left {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .resume-t5 .t5-photo {
      width: 100px;
      height: 100px;
      border-radius: 12px;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
    }

    .resume-t5 .t5-name {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      line-height: 1.2;
    }

    .resume-t5 .t5-jobtitle {
      font-size: 14px;
      color: #bfdbfe;
      font-weight: 500;
    }

    .resume-t5 .t5-details-block {
      background: rgba(255, 255, 255, 0.1);
      padding: 12px 16px;
      border-radius: 10px;
      min-width: 220px;
      flex:1;
    }

    .resume-t5 .t5-details-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #bfdbfe;
      margin-bottom: 8px;
    }

    .resume-t5 .t5-details-text {
      font-size: 12px;
      color: #e2e8f0;
      line-height: 1.6;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-links {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      flex-wrap: wrap;
    }

    .resume-t5 .t5-link-btn {
      display: inline-flex;
      align-items: center;
      padding: 6px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .resume-t5 .t5-link-linkedin { background-color: #ffffff; color: #1e40af; }
    .resume-t5 .t5-link-github { background-color: #ffffff; color: #1e40af; }
    .resume-t5 .t5-link-portfolio { background-color: #ffffff; color: #1e40af; }

    /* Section */
    .resume-t5 .t5-section {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .resume-t5 .t5-section-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 12px;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Experience & Education */
    .resume-t5 .t5-entry {
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .resume-t5 .t5-experience-header,
    .resume-t5 .t5-education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-experience-title,
    .resume-t5 .t5-education-school {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }

    .resume-t5 .t5-experience-date,
    .resume-t5 .t5-education-date {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .resume-t5 .t5-experience-subtitle,
    .resume-t5 .t5-education-subtitle {
      font-size: 13px;
      color: #475569;
      margin-bottom: 6px;
      font-weight: 500;
    }

    .resume-t5 .t5-education-grade {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
      font-weight: 500;
    }

    .resume-t5 .t5-entry-content {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      padding-top: 6px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .resume-t5 .t5-entry-content p {
      margin-bottom: 6px !important;
    }

    /* Projects */
    .resume-t5 .t5-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 6px;
    }

    .resume-t5 .t5-entry-heading {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }

    .resume-t5 .t5-project-links {
      display: flex;
      gap: 12px;
    }

    .resume-t5 .t5-project-link {
      font-size: 11px;
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }

    .resume-t5 .t5-project-link:hover {
      text-decoration: underline;
    }

    .resume-t5 .t5-project-tech {
      font-size: 11px;
      color: #64748b;
      margin: 4px 0 6px 0;
      font-weight: 500;
    }

    /* Skills */
    // AFTER
.resume-t5 .t5-skills-content {
  font-size: 13px;
  color: #334155;
  line-height: 1.6;
  padding: 4px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  page-break-inside: auto !important;
  break-inside: auto !important;
}

.resume-t5 .t5-skills-content li {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

    .resume-t5 .t5-skills-content p {
      margin-bottom: 4px !important;
    }

    /* Extra / Custom Sections */
    .resume-t5 .custom-section-wrapper {
      margin-top: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .resume-t5 .t5-extra {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Page-break marker */
    .t5-page-break {
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
      .resume-t5 .t5-header {
        background: #1e40af !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .resume-t5 .t5-project-link {
        color: #2563eb !important;
      }
      .resume-t5 .t5-link-linkedin,
      .resume-t5 .t5-link-portfolio,
      .resume-t5 .t5-link-github {
        background-color: #ffffff !important;
        color: #1e40af !important;
      }
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
  (forPDF = false, pageBreakIds: string[] = [], skillsCutIndex = -1): string => {
      const addressStr = [
        contact?.address,
        contact?.city,
        contact?.postCode,
        contact?.country,
      ].filter(Boolean).join(", ");

      const photoHtml = base64Image
        ? `<img src="${base64Image}" alt="Profile" class="t5-photo" />`
        : "";

      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif" 
        ? `<link rel="preconnect" href="https://fonts.googleapis.com"/>
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
           <link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
        : '';

      const header = `
        <div class="t5-header" data-block-id="t5-header">
          <div class="t5-header-top">
            <div class="t5-header-left">
              ${photoHtml}
              <div>
                <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
                ${contact?.jobTitle ? `<div class="t5-jobtitle">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
              </div>
            </div>
            <div class="t5-details-block">
              <div class="t5-details-label">CONTACT</div>
              ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
              ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
              ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
              ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
            </div>
          </div>
          ${linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim() ? `
            <div class="t5-links">
              ${linkedinUrl?.trim() ? `<a href="${href(linkedinUrl)}" class="t5-link-btn t5-link-linkedin" target="_blank">LinkedIn</a>` : ""}
              ${githubUrl?.trim() ? `<a href="${href(githubUrl)}" class="t5-link-btn t5-link-github" target="_blank">GitHub</a>` : ""}
              ${portfolioUrl?.trim() ? `<a href="${href(portfolioUrl)}" class="t5-link-btn t5-link-portfolio" target="_blank">Portfolio</a>` : ""}
            </div>
          ` : ""}
        </div>`;


        const sectionBuilders: Record<SectionKey, () => string> = {
  summary: () => summary ? `
    <div class="t5-section" data-block-id="t5-summary">
      <div class="t5-section-title">Professional Summary</div>
      <div class="t5-extra">${rich(summary)}</div>
    </div>
  ` : "",

  experience: () => experiences?.length > 0 ? `
    <div class="t5-section" data-block-id="t5-exp-section">
      <div class="t5-section-title">Experience</div>
      ${experiences.map((exp: any, i: number) => {
        const start = formatMonthYear(exp.startDate, false);
        const end = exp.endDate ? formatMonthYear(exp.endDate, false) : (exp.startDate ? "Present" : "");
        return `<div class="t5-entry" data-block-id="t5-exp-${i}">
          <div class="t5-experience-header">
            <div class="t5-experience-title">${exp.jobTitle || ""}</div>
            <div class="t5-experience-date">${start}${start && end ? " — " : ""}${end}</div>
          </div>
          <div class="t5-experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" • ")}</div>
          ${exp.text ? `<div class="t5-entry-content">${rich(exp.text)}</div>` : ""}
        </div>`;
      }).join("")}
    </div>
  ` : "",

  projects: () => projects?.length > 0 ? `
    <div class="t5-section" data-block-id="t5-proj-section">
      <div class="t5-section-title">Projects</div>
      ${projects.map((p: any, i: number) => `
        <div class="t5-entry" data-block-id="t5-proj-${i}">
          <div class="t5-project-header">
            <div class="t5-entry-heading">${p.title || ""}</div>
            <div class="t5-project-links">
              ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t5-project-link" target="_blank">Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t5-project-link" target="_blank">GitHub</a>` : ""}
            </div>
          </div>
          ${p.techStack?.length ? `<div class="t5-project-tech">Tech Stack: ${p.techStack.join(" • ")}</div>` : ""}
          ${p.description ? `<div class="t5-entry-content">${rich(p.description)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  ` : "",

  education: () => educations?.length > 0 ? `
    <div class="t5-section" data-block-id="t5-edu-section">
      <div class="t5-section-title">Education</div>
      ${educations.map((edu: any, i: number) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `<div class="t5-entry" data-block-id="t5-edu-${i}">
          <div class="t5-education-header">
            <div class="t5-education-school">${edu.schoolname || ""}</div>
            <div class="t5-education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          <div class="t5-education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" • ")}</div>
          ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
          ${edu.text ? `<div class="t5-entry-content">${rich(edu.text)}</div>` : ""}
        </div>`;
      }).join("")}
    </div>
  ` : "",

  // AFTER
skills: () => {
  const skillsClean = rich(skills || "");
  if (!skillsClean || skillsClean === "<p><br></p>") return "";

  return `<div class="t5-section" data-block-id="t5-skills-section">
    <div class="t5-section-title">Skills</div>
    <div class="t5-skills-content" data-block-id="t5-skills-content">${skillsClean}</div>
  </div>`;
},

  custom: () => customSections
    .filter((s: any) => s?.name?.trim() || s?.description?.trim())
    .map((s: any, i: number) => `
      <div class="t5-section custom-section-wrapper" data-block-id="t5-custom-${i}">
        <div class="t5-section-title">${s.name}</div>
        <div class="t5-extra">${rich(s.description)}</div>
      </div>
    `).join(""),
};

      // Build sections in the order defined by customization
      const sectionsHTML = activeSectionOrder
        .map(key => sectionBuilders[key]?.() ?? "")
        .join("");

      const pdfStyle = forPDF
        ? `<style>.resume-t5 { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = `${header}${sectionsHTML}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t5-page-break";
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
  <div class="resume-t5">
    ${bodyContent}
  </div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      activeSectionOrder,
      contact,
      educations,
      experiences,
      skills,
      projects,
      customSections,
      summary,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      base64Image,
      CSS,
    ],
  );

  // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".resume-t5");
        if (!resumeEl) {
          resolve([fullHtml]);
          return;
        }
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
    .resume-t5 {
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
          const resume = measureDoc.querySelector<HTMLElement>(".resume-t5");
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
            ".t5-entry",
            ".t5-header",
            ".custom-section-wrapper",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) {
              blocks.push({ top, bottom, id: el.dataset.blockId });
            }
          });

          resume.querySelectorAll<HTMLElement>(".t5-section-title").forEach((title) => {
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
            // AFTER
if (firstItem) {
  // Skip anchor logic for skills — allow it to split across pages
  if (firstItem.classList.contains("t5-skills-content")) return;

  const deepChild = firstItem.querySelector<HTMLElement>(".t5-entry, .custom-section-wrapper");
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
const skillsLis = Array.from(resume.querySelectorAll<HTMLElement>(".t5-skills-content li"));
skillsLis.forEach((li) => {
  const top = getRelTop(li);
  const bottom = getRelBottom(li);
  if (bottom - top > 2) blocks.push({ top, bottom });
});

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
    .resume-t5 {
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
      // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      // const pdfHtml = generateHTML(true, pageBreakIds);

      // AFTER
// AFTER
const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
const pdfHtml = generateHTML(true, pageBreakIds, -1);

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
    }
    finally{
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

export default TemplateFive;