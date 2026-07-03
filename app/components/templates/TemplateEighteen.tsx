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

// const stripHtmlHelper = (html: string) =>
//   html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

// const TemplateEighteen: React.FC<ResumeProps> = ({ alldata }) => {
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

//   /* ======================================================
//      JSX HELPERS
//   ====================================================== */
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;
//     const cleanedSkills = cleanQuillHTML(skills);
//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "")
//       return null;

//     return (
//       <div className="t4-card">
//         <div className="t4-section-title">
//           <span className="t4-section-dot" />
//           Skills
//         </div>
//         <div
//           className="t4-skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;
//     return (
//       <div className="t4-card">
//         <div className="t4-section-title">
//           <span className="t4-section-dot" />
//           Projects
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t4-project-item">
//             <div className="t4-project-header">
//               <span className="t4-project-title">{project.title}</span>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t4-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t4-link-badge"
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
//                       className="t4-link-badge"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t4-tech-stack">
//                 {project.techStack.map((tech: string, i: number) => (
//                   <span key={i} className="t4-tech-chip">
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t4-item-body"
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
//      CSS
//   ====================================================== */
//   const styles = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');

// .t4-resume {
//   width: 210mm;
//   box-sizing: border-box;
//   background: #f5f7f6;
//   font-family: 'DM Sans', sans-serif;
//   font-size: 13px;
//   line-height: 1.55;
//   color: #1a2520;
// }

// .t4-resume.is-preview {
//   transform: scale(0.36);
//   transform-origin: top left;
//   width: 210mm;
//   height: auto;
//   max-height: none;
//   min-height: auto;
//   overflow: hidden;
// }

// /* ---- HEADER ---- */
// .t4-resume .t4-header {
//   background: linear-gradient(135deg, #0f766e 0%, #0d9488 55%, #14b8a6 100%);
//   padding: 28px 32px 24px;
//   position: relative;
//   overflow: hidden;
// }

// .t4-resume .t4-header::before {
//   content: '';
//   position: absolute;
//   top: -40px;
//   right: -40px;
//   width: 160px;
//   height: 160px;
//   border-radius: 50%;
//   background: rgba(255,255,255,0.07);
// }

// .t4-resume .t4-header::after {
//   content: '';
//   position: absolute;
//   bottom: -30px;
//   right: 60px;
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background: rgba(255,255,255,0.05);
// }

// .t4-resume .t4-name {
//   font-family: 'DM Serif Display', serif;
//   font-size: 34px;
//   font-weight: 400;
//   color: #ffffff;
//   letter-spacing: -0.5px;
//   line-height: 1.1;
//   margin-bottom: 4px;
// }

// .t4-resume .t4-job-title {
//   font-size: 13px;
//   font-weight: 500;
//   color: rgba(255,255,255,0.75);
//   letter-spacing: 0.8px;
//   text-transform: uppercase;
//   margin-bottom: 16px;
// }

// .t4-resume .t4-contact-chips {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 6px;
//   position: relative;
//   z-index: 1;
// }

// .t4-resume .t4-chip {
//   background: rgba(255,255,255,0.15);
//   color: rgba(255,255,255,0.92);
//   border-radius: 20px;
//   padding: 3px 10px;
//   font-size: 11px;
//   font-weight: 400;
//   letter-spacing: 0.2px;
//   border: 1px solid rgba(255,255,255,0.18);
//   white-space: nowrap;
// }

// .t4-resume .t4-chip a {
//   color: inherit;
//   text-decoration: none;
// }

// /* ---- BODY ---- */
// .t4-resume .t4-body {
//   padding: 18px 20px 24px;
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// }

// /* ---- CARD ---- */
// .t4-resume .t4-card {
//   background: #ffffff;
//   border-radius: 8px;
//   padding: 16px 18px;
//   border: 1px solid #e2ebe8;
//   break-inside: avoid;
//   page-break-inside: avoid;
// }

// .t4-resume .t4-card-grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 12px;
// }

// /* ---- SECTION TITLE ---- */
// .t4-resume .t4-section-title {
//   font-size: 11px;
//   font-weight: 700;
//   letter-spacing: 1.2px;
//   text-transform: uppercase;
//   color: #0f766e;
//   margin-bottom: 12px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// }

// .t4-resume .t4-section-dot {
//   display: inline-block;
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background: #0f766e;
//   flex-shrink: 0;
// }

// /* ---- SUMMARY ---- */
// .t4-resume .t4-summary-text {
//   font-size: 13px;
//   color: #2e4040;
//   line-height: 1.65;
// }

// .t4-resume .t4-summary-text p {
//   margin: 0 0 6px 0 !important;
// }

// /* ---- EXPERIENCE / EDUCATION ITEM ---- */
// .t4-resume .t4-item {
//   padding-bottom: 14px;
//   margin-bottom: 14px;
//   border-bottom: 1px solid #edf2f0;
//   break-inside: avoid;
//   page-break-inside: avoid;
// }

// .t4-resume .t4-item:last-child {
//   margin-bottom: 0;
//   padding-bottom: 0;
//   border-bottom: none;
// }

// .t4-resume .t4-item-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 8px;
//   margin-bottom: 3px;
//   flex-wrap: wrap;
// }

// .t4-resume .t4-item-title {
//   font-size: 14px;
//   font-weight: 600;
//   color: #0f2e2a;
//   line-height: 1.35;
// }

// .t4-resume .t4-item-subtitle {
//   font-size: 12px;
//   color: #4d7068;
//   margin-top: 1px;
// }

// .t4-resume .t4-date-badge {
//   background: #f0fdf9;
//   border: 1px solid #ccede6;
//   border-radius: 12px;
//   padding: 2px 9px;
//   font-size: 11px;
//   color: #0f766e;
//   white-space: nowrap;
//   font-weight: 500;
//   flex-shrink: 0;
// }

// .t4-resume .t4-grade-badge {
//   display: inline-block;
//   background: #f0fdf9;
//   border: 1px solid #ccede6;
//   border-radius: 12px;
//   padding: 1px 8px;
//   font-size: 11px;
//   color: #0f766e;
//   font-weight: 500;
//   margin-top: 3px;
// }

// .t4-resume .t4-item-body {
//   font-size: 12.5px;
//   color: #374b48;
//   line-height: 1.6;
//   margin-top: 6px;
// }

// .t4-resume .t4-item-body p {
//   margin: 0 0 5px 0 !important;
// }

// .t4-resume .t4-item-body ul,
// .t4-resume .t4-item-body ol {
//   margin: 6px 0 6px 18px !important;
//   padding-left: 0 !important;
// }

// .t4-resume .t4-item-body li {
//   margin-bottom: 3px !important;
//   line-height: 1.55 !important;
// }

// .t4-resume .t4-item-body strong { font-weight: 600 !important; }
// .t4-resume .t4-item-body em { font-style: italic !important; }
// .t4-resume .t4-item-body u { text-decoration: underline !important; }

// /* ---- SKILLS ---- */
// .t4-resume .t4-skills-content {
//   font-size: 12.5px;
//   color: #374b48;
//   line-height: 1.65;
// }

// .t4-resume .t4-skills-content p { margin: 0 0 5px 0 !important; }

// .t4-resume .t4-skills-content ul,
// .t4-resume .t4-skills-content ol {
//   margin: 6px 0 6px 18px !important;
//   padding-left: 0 !important;
// }

// .t4-resume .t4-skills-content li {
//   margin-bottom: 3px !important;
//   line-height: 1.55 !important;
// }

// .t4-resume .t4-skills-content strong { font-weight: 600 !important; }

// /* ---- PROJECTS ---- */
// .t4-resume .t4-project-item {
//   padding-bottom: 14px;
//   margin-bottom: 14px;
//   border-bottom: 1px solid #edf2f0;
//   break-inside: avoid;
//   page-break-inside: avoid;
// }

// .t4-resume .t4-project-item:last-child {
//   margin-bottom: 0;
//   padding-bottom: 0;
//   border-bottom: none;
// }

// .t4-resume .t4-project-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: baseline;
//   gap: 8px;
//   flex-wrap: wrap;
//   margin-bottom: 6px;
// }

// .t4-resume .t4-project-title {
//   font-size: 14px;
//   font-weight: 600;
//   color: #0f2e2a;
// }

// .t4-resume .t4-project-links {
//   display: flex;
//   gap: 6px;
// }

// .t4-resume .t4-link-badge {
//   font-size: 10px;
//   font-weight: 500;
//   color: #0f766e;
//   border: 1px solid #ccede6;
//   border-radius: 10px;
//   padding: 1px 8px;
//   text-decoration: none;
//   background: #f0fdf9;
// }

// .t4-resume .t4-tech-stack {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 4px;
//   margin-bottom: 6px;
// }

// .t4-resume .t4-tech-chip {
//   font-size: 10px;
//   font-weight: 500;
//   background: #e6f4f1;
//   color: #0a5247;
//   border-radius: 4px;
//   padding: 2px 7px;
// }

// /* ---- CUSTOM SECTIONS ---- */
// .t4-resume .t4-custom-section-title {
//   font-size: 11px;
//   font-weight: 700;
//   letter-spacing: 1.2px;
//   text-transform: uppercase;
//   color: #0f766e;
//   margin-bottom: 8px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// }

// .t4-resume .t4-custom-content {
//   font-size: 12.5px;
//   color: #374b48;
//   line-height: 1.6;
// }

// .t4-resume .t4-custom-content p { margin: 0 0 5px 0 !important; }
// .t4-resume .t4-custom-content ul,
// .t4-resume .t4-custom-content ol {
//   margin: 6px 0 6px 18px !important;
//   padding-left: 0 !important;
// }
// .t4-resume .t4-custom-content li { margin-bottom: 3px !important; }

// /* ---- PRINT ---- */
// @media print {
//   @page {
//     size: A4;
//     margin: 0mm !important;
//   }

//   * {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//   }

//   body { margin: 0; padding: 0; background: #f5f7f6; }

//   .t4-resume {
//     width: 100%;
//     border: none;
//     box-shadow: none;
//   }

//   .t4-resume .t4-header {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//   }

//   .t4-resume .t4-card {
//     break-inside: avoid;
//     page-break-inside: avoid;
//   }

//   .t4-link-badge,
//   .t4-chip a {
//     color: #0f766e !important;
//   }
// }
// `;

//   /* ======================================================
//      HTML GENERATION — for PDF
//   ====================================================== */
//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     const chipHTML = (label: string, href?: string) => {
//       const inner = href
//         ? `<a href="${href.startsWith("http") ? href : `https://${href}`}" style="color:inherit;text-decoration:none;">${label}</a>`
//         : label;
//       return `<span class="t4-chip">${inner}</span>`;
//     };

//     const chips = [
//       contact?.email ? chipHTML(contact.email) : "",
//       contact?.phone ? chipHTML(contact.phone) : "",
//       formattedDob ? chipHTML(formattedDob) : "",
//       addressParts.length ? chipHTML(addressParts.join(", ")) : "",
//       linkedinUrl ? chipHTML("LinkedIn", linkedinUrl) : "",
//       githubUrl ? chipHTML("GitHub", githubUrl) : "",
//       portfolioUrl ? chipHTML("Portfolio", portfolioUrl) : "",
//     ]
//       .filter(Boolean)
//       .join("");

//     const renderRichText = (text: string, cls: string) => {
//       if (!text) return "";
//       const cleaned = cleanQuillHTML(text);
//       if (cleaned.includes("<") && cleaned.includes(">")) {
//         return `<div class="${cls}">${cleaned}</div>`;
//       }
//       const lines = cleaned.split("\n").filter((l) => l.trim());
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="${cls}"><ul>${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.slice(1).trim() : t;
//             return c ? `<li>${c}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="${cls}" style="white-space:pre-wrap">${stripHtmlHelper(cleaned)}</div>`;
//     };

//     const experiencesHTML =
//       experiences.length > 0
//         ? `<div class="t4-card">
//         <div class="t4-section-title"><span class="t4-section-dot"></span>Experience</div>
//         ${experiences
//           .map((exp) => {
//             const s = formatMonthYear(exp.startDate, false);
//             const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//             return `<div class="t4-item">
//             <div class="t4-item-header">
//               <div>
//                 <div class="t4-item-title">${exp.jobTitle || ""}</div>
//                 <div class="t4-item-subtitle">${exp.employer || ""}${exp.location ? ` &mdash; ${exp.location}` : ""}</div>
//               </div>
//               <span class="t4-date-badge">${s} &ndash; ${e}</span>
//             </div>
//             ${exp.text ? renderRichText(exp.text, "t4-item-body") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//         : "";

//     const educationsHTML =
//       educations.length > 0
//         ? `<div class="t4-card">
//         <div class="t4-section-title"><span class="t4-section-dot"></span>Education</div>
//         ${educations
//           .map((edu) => {
//             const formattedGrade = formatGradeToCgpdAndPercentage(edu?.grade || "");
//             const dateStr =
//               edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""} &ndash; ${edu.endDate || "Present"}`
//                 : "";
//             return `<div class="t4-item">
//             <div class="t4-item-header">
//               <div>
//                 <div class="t4-item-title">${edu.degree || ""}</div>
//                 <div class="t4-item-subtitle">
//                   ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                   ${edu.schoolname && edu.location ? " &mdash; " : ""}
//                   ${edu.location ? `<span>${edu.location}</span>` : ""}
//                 </div>
//                 ${formattedGrade ? `<span class="t4-grade-badge">${formattedGrade}</span>` : ""}
//               </div>
//               ${dateStr ? `<span class="t4-date-badge">${dateStr}</span>` : ""}
//             </div>
//             ${edu.text ? renderRichText(edu.text, "t4-item-body") : ""}
//           </div>`;
//           })
//           .join("")}
//       </div>`
//         : "";

//     const summaryHTML = summary
//       ? `<div class="t4-card">
//         <div class="t4-section-title"><span class="t4-section-dot"></span>Summary</div>
//         <div class="t4-summary-text">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
//       </div>`
//       : "";

//     const skillsClean = cleanQuillHTML(skills);
//     const skillsHTML =
//       skills && skillsClean && skillsClean !== "<p><br></p>"
//         ? `<div class="t4-card">
//         <div class="t4-section-title"><span class="t4-section-dot"></span>Skills</div>
//         <div class="t4-skills-content">${skillsClean}</div>
//       </div>`
//         : "";

//     const projectsHTML =
//       projects && projects.length > 0
//         ? `<div class="t4-card">
//         <div class="t4-section-title"><span class="t4-section-dot"></span>Projects</div>
//         ${projects
//           .map(
//             (project: any) => `
//           <div class="t4-project-item">
//             <div class="t4-project-header">
//               <span class="t4-project-title">${project.title || ""}</span>
//               ${
//                 project.liveUrl || project.githubUrl
//                   ? `<div class="t4-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t4-link-badge">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t4-link-badge">GitHub</a>` : ""}
//               </div>`
//                   : ""
//               }
//             </div>
//             ${
//               project.techStack && project.techStack.length > 0
//                 ? `<div class="t4-tech-stack">${project.techStack.map((t: string) => `<span class="t4-tech-chip">${t}</span>`).join("")}</div>`
//                 : ""
//             }
//             ${project.description ? `<div class="t4-item-body">${cleanQuillHTML(project.description)}</div>` : ""}
//           </div>
//         `,
//           )
//           .join("")}
//       </div>`
//         : "";

//     const customSectionsHTML =
//       finalize &&
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize.customSection) &&
//       finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//         ? finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//           <div class="t4-card">
//             ${s.name ? `<div class="t4-custom-section-title"><span class="t4-section-dot"></span>${s.name}</div>` : ""}
//             ${s.description ? `<div class="t4-custom-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>
//         `,
//             )
//             .join("")
//         : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t4-resume">

//   <div class="t4-header">
//     <div class="t4-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     <div class="t4-job-title">${
//       contact?.jobTitle
//         ? typeof contact.jobTitle === "string"
//           ? contact.jobTitle
//           : (contact.jobTitle as any)?.name || ""
//         : ""
//     }</div>
//     <div class="t4-contact-chips">${chips}</div>
//   </div>

//   <div class="t4-body">
//     ${summaryHTML}
//     ${experiencesHTML}
//     ${projectsHTML}
//     ${educationsHTML}
//     ${skillsHTML}
//     ${customSectionsHTML}
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
//      JSX PREVIEW
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
//         className={`t4-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 20px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t4-header">
//           <div className="t4-name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="t4-job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="t4-contact-chips">
//             {contact?.email && <span className="t4-chip">{contact.email}</span>}
//             {contact?.phone && <span className="t4-chip">{contact.phone}</span>}
//             {formattedDob && <span className="t4-chip">{formattedDob}</span>}
//             {addressParts.length > 0 && (
//               <span className="t4-chip">{addressParts.join(", ")}</span>
//             )}
//             {linkedinUrl && (
//               <span className="t4-chip">
//                 <a
//                   href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {githubUrl && (
//               <span className="t4-chip">
//                 <a
//                   href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   GitHub
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="t4-chip">
//                 <a
//                   href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Portfolio
//                 </a>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t4-body">

//           {/* SUMMARY */}
//           {summary && (
//             <div className="t4-card">
//               <div className="t4-section-title">
//                 <span className="t4-section-dot" />
//                 Summary
//               </div>
//               <div
//                 className="t4-summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="t4-card">
//               <div className="t4-section-title">
//                 <span className="t4-section-dot" />
//                 Experience
//               </div>
//               {experiences.map((exp, i) => {
//                 const s = formatMonthYear(exp.startDate, false);
//                 const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 return (
//                   <div key={i} className="t4-item">
//                     <div className="t4-item-header">
//                       <div>
//                         <div className="t4-item-title">{exp.jobTitle}</div>
//                         <div className="t4-item-subtitle">
//                           {exp.employer}
//                           {exp.location && ` — ${exp.location}`}
//                         </div>
//                       </div>
//                       <span className="t4-date-badge">
//                         {s} – {e}
//                       </span>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="t4-item-body"
//                         dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div className="t4-card">
//               <div className="t4-section-title">
//                 <span className="t4-section-dot" />
//                 Education
//               </div>
//               {educations.map((edu, index) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 return (
//                   <div key={edu.id || index} className="t4-item">
//                     <div className="t4-item-header">
//                       <div>
//                         <div className="t4-item-title">{edu.degree || ""}</div>
//                         <div className="t4-item-subtitle">
//                           {edu.schoolname && <span>{edu.schoolname}</span>}
//                           {edu.schoolname && edu.location && " — "}
//                           {edu.location && <span>{edu.location}</span>}
//                         </div>
//                         {formattedGrade && (
//                           <span className="t4-grade-badge">{formattedGrade}</span>
//                         )}
//                       </div>
//                       {(edu.startDate || edu.endDate) && (
//                         <span className="t4-date-badge">
//                           {edu.startDate || ""} – {edu.endDate || "Present"}
//                         </span>
//                       )}
//                     </div>
//                     {edu.text && (
//                       <div
//                         className="t4-item-body"
//                         dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {renderSkills()}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (s: any) => s?.name?.trim() || s?.description?.trim(),
//             ) &&
//             finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map((section: any, index: number) => (
//                 <div key={section.id || index} className="t4-card">
//                   {section.name && (
//                     <div className="t4-custom-section-title">
//                       <span className="t4-section-dot" />
//                       {section.name}
//                     </div>
//                   )}
//                   {section.description && (
//                     <div
//                       className="t4-custom-content"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(section.description),
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}

//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateEighteen;






























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
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS — identical to TemplateOne
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateEighteenProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateEighteen: React.FC<TemplateEighteenProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Data ──────────────────────────────────────────────────────────────────
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

  const activeFontFamily = customization?.fontFamily ?? "'Poppins', sans-serif";

  const stripHtmlHelper = (html: string) =>
    html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  // ── Font map — identical to TemplateOne ─────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const fontMap: Record<string, string> = {
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
      "'Roboto', sans-serif":
        "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif":
        "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif":
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "'DM Serif Display', serif":
        "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif":
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif":
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return fontMap[fontFamily] || fontMap["'Poppins', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif")) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace")) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ────────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #ffffff; }

    .t18-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.55;
      color: #1a2520;
    }

    /* ---- HEADER ---- */
    .t18-header {
      background: linear-gradient(135deg, #0f766e 0%, #0d9488 55%, #14b8a6 100%);
      padding: 28px 32px 24px;
      position: relative;
      overflow: hidden;
    }
    .t18-header::before {
      content: ''; position: absolute; top: -40px; right: -40px;
      width: 160px; height: 160px; border-radius: 50%; background: rgba(255,255,255,0.07);
    }
    .t18-header::after {
      content: ''; position: absolute; bottom: -30px; right: 60px;
      width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.05);
    }
    .t18-name {
      font-family: 'DM Serif Display', serif; font-size: 34px; font-weight: 400;
      color: #ffffff; letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 4px;
    }
    .t18-job-title {
      font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);
      letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 16px;
    }
    .t18-contact-chips { display: flex; flex-wrap: wrap; gap: 6px; position: relative; z-index: 1; }
    .t18-chip {
      background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.92);
      border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 400;
      letter-spacing: 0.2px; border: 1px solid rgba(255,255,255,0.18); white-space: nowrap;
    }
    .t18-chip a { color: inherit; text-decoration: none; }

    /* ---- BODY ---- */
    .t18-body { padding: 18px 0 24px; display: flex; flex-direction: column; gap: 12px; }

    /* ---- CARD ---- */
    .t18-card { padding: 16px 0; }

    /* ---- SECTION TITLE ---- */
    .t18-section-title, .t18-custom-section-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
      color: #0f766e; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;
      page-break-after: avoid; break-after: avoid;
    }
    .t18-section-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #0f766e; flex-shrink: 0; }

    /* ---- SUMMARY ---- */
    .t18-summary-text { font-size: 13px; color: #2e4040; line-height: 1.65; }
    .t18-summary-text p { margin: 0 0 6px 0 !important; }

    /* ---- EXPERIENCE / EDUCATION ITEM ---- */
    .t18-item {
      padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid #edf2f0;
      break-inside: avoid; page-break-inside: avoid;
    }
    .t18-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
    .t18-item-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 8px; margin-bottom: 3px; flex-wrap: wrap;
      page-break-after: avoid; break-after: avoid;
    }
    .t18-item-title { font-size: 14px; font-weight: 600; color: #0f2e2a; line-height: 1.35; }
    .t18-item-subtitle { font-size: 12px; color: #4d7068; margin-top: 1px; }
    .t18-date-badge {
      background: #f0fdf9; border: 1px solid #ccede6; border-radius: 12px;
      padding: 2px 9px; font-size: 11px; color: #0f766e; white-space: nowrap;
      font-weight: 500; flex-shrink: 0;
    }
    .t18-grade-badge {
      display: inline-block; background: #f0fdf9; border: 1px solid #ccede6; border-radius: 12px;
      padding: 1px 8px; font-size: 11px; color: #0f766e; font-weight: 500; margin-top: 3px;
    }
    .t18-item-body { font-size: 12.5px; color: #374b48; line-height: 1.6; margin-top: 6px; }
    .t18-item-body p { margin: 0 0 5px 0 !important; }
    .t18-item-body ul, .t18-item-body ol,
    .t18-skills-content ul, .t18-skills-content ol,
    .t18-custom-content ul, .t18-custom-content ol {
      margin: 6px 0 6px 18px !important; padding-left: 0 !important;
    }
    .t18-item-body li, .t18-skills-content li, .t18-custom-content li {
      margin-bottom: 3px !important; line-height: 1.55 !important;
    }
    .t18-item-body strong, .t18-skills-content strong { font-weight: 600 !important; }
    .t18-item-body em { font-style: italic !important; }
    .t18-item-body u { text-decoration: underline !important; }

    /* ---- SKILLS ---- */
    .t18-skills-content { font-size: 12.5px; color: #374b48; line-height: 1.65; }
    .t18-skills-content p { margin: 0 0 5px 0 !important; }

    /* ---- PROJECTS ---- */
    .t18-project-item {
      padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid #edf2f0;
      break-inside: avoid; page-break-inside: avoid;
    }
    .t18-project-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
    .t18-project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      gap: 8px; flex-wrap: wrap; margin-bottom: 6px;
      page-break-after: avoid; break-after: avoid;
    }
    .t18-project-title { font-size: 14px; font-weight: 600; color: #0f2e2a; }
    .t18-project-links { display: flex; gap: 6px; }
    .t18-link-badge {
      font-size: 10px; font-weight: 500; color: #0f766e; border: 1px solid #ccede6;
      border-radius: 10px; padding: 1px 8px; text-decoration: none; background: #f0fdf9;
    }
    .t18-tech-stack { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px; }
    .t18-tech-chip {
      font-size: 10px; font-weight: 500; background: #e6f4f1; color: #0a5247;
      border-radius: 4px; padding: 2px 7px;
    }

    /* ---- CUSTOM SECTIONS ---- */
    .t18-custom-content { font-size: 12.5px; color: #374b48; line-height: 1.6; }
    .t18-custom-content p { margin: 0 0 5px 0 !important; }

    .t18-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

    @media print {
      *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { overflow: visible; }
      .t18-resume { width: 100% !important; padding: 0 !important; }
      .t18-link-badge, .t18-chip a { color: #0f766e !important; }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);

      const href = (url: string) => (url.startsWith("http") ? url : `https://${url}`);
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const chipHTML = (label: string, url?: string) => {
        const inner = url
          ? `<a href="${href(url)}" target="_blank">${label}</a>`
          : label;
        return `<span class="t18-chip">${inner}</span>`;
      };

      const chips = [
        contact?.email ? chipHTML(contact.email) : "",
        contact?.phone ? chipHTML(contact.phone) : "",
        formattedDob ? chipHTML(formattedDob) : "",
        addressParts.length ? chipHTML(addressParts.join(", ")) : "",
        linkedinUrl ? chipHTML("LinkedIn", linkedinUrl) : "",
        githubUrl ? chipHTML("GitHub", githubUrl) : "",
        portfolioUrl ? chipHTML("Portfolio", portfolioUrl) : "",
      ]
        .filter(Boolean)
        .join("");

      const jobTitle =
        typeof contact?.jobTitle === "string"
          ? contact.jobTitle
          : (contact?.jobTitle as any)?.name || "";

      const header = `
      <div class="t18-header">
        <div class="t18-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="t18-job-title">${jobTitle}</div>
        <div class="t18-contact-chips">${chips}</div>
      </div>`;

      const richText = (html: string, cls: string) => {
        if (!html) return "";
        const cleaned = cleanQuillHTML(html);
        if (!cleaned || cleaned === "<p><br></p>") return "";
        if (cleaned.includes("<") && cleaned.includes(">")) {
          return `<div class="${cls}">${cleaned}</div>`;
        }
        const lines = cleaned.split("\n").filter((l) => l.trim());
        if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
          return `<div class="${cls}"><ul>${lines
            .map((l) => {
              const t = l.trim();
              const c = t.startsWith("-") || t.startsWith("•") ? t.slice(1).trim() : t;
              return c ? `<li>${c}</li>` : "";
            })
            .join("")}</ul></div>`;
        }
        return `<div class="${cls}" style="white-space:pre-wrap">${stripHtmlHelper(cleaned)}</div>`;
      };

      const hasSkillsContent = (): boolean => {
        if (!skills?.trim()) return false;
        const cleaned = cleanQuillHTML(skills);
        if (!cleaned || cleaned === "<p><br></p>") return false;
        const textOnly = cleaned.replace(/<[^>]*>/g, "").trim();
        return textOnly.length > 0;
      };

      const summaryBlock = summary?.trim()
        ? `<div class="t18-card" data-block-id="summary">
             <div class="t18-section-title"><span class="t18-section-dot"></span>Summary</div>
             ${richText(summary.replace(/\n/g, "<br>"), "t18-summary-text")}
           </div>`
        : "";

      const expBlock = experiences.length
        ? `<div class="t18-card" data-block-id="exp-section">
             <div class="t18-section-title"><span class="t18-section-dot"></span>Experience</div>
             ${experiences
               .map((exp: any, i: number) => {
                 const s = formatMonthYear(exp.startDate, false);
                 const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
                 return `<div class="t18-item" data-block-id="exp-${i}">
                 <div class="t18-item-header">
                   <div>
                     <div class="t18-item-title">${exp.jobTitle || ""}</div>
                     <div class="t18-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
                   </div>
                   <span class="t18-date-badge">${s} – ${e}</span>
                 </div>
                 ${exp.text ? richText(exp.text, "t18-item-body") : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const projBlock = projects.length
        ? `<div class="t18-card" data-block-id="proj-section">
             <div class="t18-section-title"><span class="t18-section-dot"></span>Projects</div>
             ${projects
               .map(
                 (p: any, i: number) => `
               <div class="t18-project-item" data-block-id="proj-${i}">
                 <div class="t18-project-header">
                   <span class="t18-project-title">${p.title || ""}</span>
                   ${
                     p.liveUrl || p.githubUrl
                       ? `<div class="t18-project-links">
                       ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t18-link-badge" target="_blank">Live Demo</a>` : ""}
                       ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t18-link-badge" target="_blank">GitHub</a>` : ""}
                     </div>`
                       : ""
                   }
                 </div>
                 ${p.techStack?.length ? `<div class="t18-tech-stack">${p.techStack.map((t: string) => `<span class="t18-tech-chip">${t}</span>`).join("")}</div>` : ""}
                 ${p.description ? richText(p.description, "t18-item-body") : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      const eduBlock = educations.length
        ? `<div class="t18-card" data-block-id="edu-section">
             <div class="t18-section-title"><span class="t18-section-dot"></span>Education</div>
             ${educations
               .map((edu: any, i: number) => {
                 const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                 const dateStr =
                   edu.startDate || edu.endDate
                     ? `${edu.startDate || ""} – ${edu.endDate || "Present"}`
                     : "";
                 return `<div class="t18-item" data-block-id="edu-${i}">
                 <div class="t18-item-header">
                   <div>
                     <div class="t18-item-title">${edu.degree || ""}</div>
                     <div class="t18-item-subtitle">
                       ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
                       ${edu.schoolname && edu.location ? " — " : ""}
                       ${edu.location ? `<span>${edu.location}</span>` : ""}
                     </div>
                     ${grade ? `<span class="t18-grade-badge">${grade}</span>` : ""}
                   </div>
                   ${dateStr ? `<span class="t18-date-badge">${dateStr}</span>` : ""}
                 </div>
                 ${edu.text ? richText(edu.text, "t18-item-body") : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const skillsBlock = (() => {
        if (!hasSkillsContent()) return "";
        const cleanedSkills = cleanQuillHTML(skills);
        return `<div class="t18-card" data-block-id="skills-section">
          <div class="t18-section-title"><span class="t18-section-dot"></span>Skills</div>
          <div class="t18-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
        </div>`;
      })();

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
          ? finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
                <div class="t18-card" data-block-id="custom-${i}">
                  ${s.name ? `<div class="t18-custom-section-title"><span class="t18-section-dot"></span>${s.name}</div>` : ""}
                  ${s.description ? richText(s.description, "t18-custom-content") : ""}
                </div>`,
              )
              .join("")
          : "";

      const pdfStyle = forPDF
        ? `<style>.t18-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = `${header}<div class="t18-body">${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}</div>`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t18-page-break";
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
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:#ffffff;">
  <div class="t18-resume">${bodyContent}</div>
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
      buildCSS,
    ],
  );

  // ── Page splitter — same algorithm as TemplateOne ───────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t18-resume");
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
<html><head><meta charset="UTF-8"/>
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: #ffffff !important; }
  .t18-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t18-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const totalH = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
          const getRelTop = (el: HTMLElement) => el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) => getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          // Breakable item-level boundaries
          const ITEM_SELECTORS = [
            ".t18-item",
            ".t18-project-item",
          ].join(", ");
          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el),
              bottom = getRelBottom(el);
            if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Skills list items — breakable inside the skills card
          const skillsLis = Array.from(
            resume.querySelectorAll<HTMLElement>(".t18-skills-content li"),
          );
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          // Keep each card's title glued to its first item (avoid orphan headers)
          resume
            .querySelectorAll<HTMLElement>(".t18-section-title, .t18-custom-section-title")
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
                // Allow skills content to split freely across pages
                if (firstItem.classList.contains("t18-skills-content")) return;

                const anchor = firstItem;
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
            let actualCut = naiveCut,
              cutBlockId: string | undefined;
            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (block.top >= currentStart && block.bottom > naiveCut && block.top < actualCut) {
                actualCut = block.top;
                cutBlockId = block.id;
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
<html lang="en"><head><meta charset="UTF-8"/>
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: #ffffff !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: #ffffff; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t18-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
</style></head>
<body>
  <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
</body></html>`);
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

  // ── Debounced updates ──────────────────────────────────────────────────────
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

  // ── Download handler ───────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
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
    } finally {
      setIsDownloading(false);
    }
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  const isThumbnail = !!alldata && !viewMode;

  return (
    <>
      {/* Download button — hide in thumbnail mode */}
      {/* {!isThumbnail && lastSegment === "download-resume" && ( */}
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
                  : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-2xl cursor-pointer"
              }
            `}
          >
            <div className="relative flex items-center justify-center gap-3 text-lg">
              {isDownloading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Generating PDF …</span>
                </>
              ) : (
                <>
                  <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                  <span className="text-sm opacity-75 font-light ml-1">PDF</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      {/* )} */}

      {isThumbnail ? (
        // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
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
        // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
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

export default TemplateEighteen;