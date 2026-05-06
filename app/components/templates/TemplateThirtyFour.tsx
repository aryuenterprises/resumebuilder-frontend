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

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
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

// export default TemplateFour;