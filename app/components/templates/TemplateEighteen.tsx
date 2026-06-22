












// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { IoPersonOutline, IoMailOutline, IoCallOutline, IoLocationOutline, IoGlobeOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// interface CustomSection {
//   _id?: string;
//   id?: string;
//   name?: string;
//   description?: string;
// }

// interface FinalizeData {
//   customSection?: CustomSection[];
// }

// const TemplateEighteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context?.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const getJobTitle = (jobTitle: any): string => {
//     if (!jobTitle) return "";
//     if (typeof jobTitle === "string") return jobTitle;
//     if (typeof jobTitle === "object" && jobTitle !== null)
//       return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
//     return "";
//   };

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact?.photo) {
//       if (typeof contact.photo === "string" && contact.photo.startsWith("blob:")) {
//         url = contact.photo;
//       } else if (typeof contact.photo === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.photo}`;
//       } else if ((contact.photo as any) instanceof Blob || (contact.photo as any) instanceof File) {
//         objectUrl = URL.createObjectURL(contact.photo as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact?.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => { 
//       if (objectUrl) URL.revokeObjectURL(objectUrl); 
//     };
//   }, [contact?.photo]);

//   const isFinalizeData = (data: any): data is FinalizeData =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const customSections = isFinalizeData(finalize) && Array.isArray(finalize.customSection) ? finalize.customSection : [];

//   // Helper function to render skills (using cleanQuillHTML)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <div className="t12-skills-content">
//         <div dangerouslySetInnerHTML={{ __html: cleanedSkills }} />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div style={{ marginTop: "25px" }}>
//         <h2 className="t12-section-title-right">Projects</h2>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t12-entry">
//             <div className="t12-entry-header">
//               <span className="t12-entry-title">{project.title}</span>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t12-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t12-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t12-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t12-project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t12-entry-content"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — MODERN COLORFUL DOUBLE COLUMN
//   ====================================================== */
//   const styles = `
//   .resume-t18 * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   .resume-t18 {
//     max-width: 1100px;
//     margin: 0 auto;
//     background: #ffffff;
//     border-radius: 24px;
//     box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//     overflow: hidden;
//     display: flex;
//     flex-wrap: wrap;
//   }

//   .resume-t18.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 1100px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
//   }

//   /* Fix p tag spacing */
//   .resume-t18 p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.6 !important;
//   }

//   .resume-t18 p:last-child {
//     margin-bottom: 0 !important;
//   }

//   /* Rich text content styles */
//   .resume-t18 .t12-entry-content ul,
//   .resume-t18 .t12-entry-content ol,
//   .resume-t18 .t12-skills-content ul,
//   .resume-t18 .t12-skills-content ol,
//   .resume-t18 .t12-custom-section-content ul,
//   .resume-t18 .t12-custom-section-content ol {
//     margin: 6px 0 6px 20px !important;
//     padding-left: 20px !important;
//   }

//   .resume-t18 .t12-entry-content li,
//   .resume-t18 .t12-skills-content li,
//   .resume-t18 .t12-custom-section-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.6 !important;
//   }

//   .resume-t18 .t12-entry-content ul,
//   .resume-t18 .t12-skills-content ul,
//   .resume-t18 .t12-custom-section-content ul {
//     list-style-type: disc !important;
//   }

//   .resume-t18 .t12-entry-content ol,
//   .resume-t18 .t12-skills-content ol,
//   .resume-t18 .t12-custom-section-content ol {
//     list-style-type: decimal !important;
//   }

//   .resume-t18 .t12-entry-content strong,
//   .resume-t18 .t12-skills-content strong,
//   .resume-t18 .t12-custom-section-content strong {
//     font-weight: 700 !important;
//   }

//   .resume-t18 .t12-entry-content em,
//   .resume-t18 .t12-skills-content em,
//   .resume-t18 .t12-custom-section-content em {
//     font-style: italic !important;
//   }

//   .resume-t18 .t12-entry-content u,
//   .resume-t18 .t12-skills-content u,
//   .resume-t18 .t12-custom-section-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .resume-t18 .t12-entry-content p,
//   .resume-t18 .t12-skills-content p,
//   .resume-t18 .t12-custom-section-content p {
//     white-space: pre-wrap !important;
//   }

//   /* LEFT COLUMN - COLORFUL SIDEBAR */
//   .t18-left {
//     width: 33%;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     color: white;
//     padding: 40px 30px;
//   }

//   /* RIGHT COLUMN */
//   .t18-right {
//     width: 67%;
//     background: white;
//     padding: 40px 35px;
//   }

//   /* PHOTO */
//   .t18-photo-wrapper {
//     text-align: center;
//     margin-bottom: 30px;
//   }

//   .t18-photo {
//     width: 160px;
//     height: 160px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 4px solid rgba(255, 255, 255, 0.3);
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//   }

//   .t18-photo-placeholder {
//     width: 160px;
//     height: 160px;
//     border-radius: 50%;
//     background: rgba(255, 255, 255, 0.2);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto;
//     border: 4px solid rgba(255, 255, 255, 0.3);
//   }

//   /* LEFT COLUMN TYPOGRAPHY */
//   .t18-name {
//     font-size: 28px;
//     font-weight: 800;
//     text-align: center;
//     margin-bottom: 8px;
//     letter-spacing: -0.5px;
//   }

//   .t18-jobtitle {
//     font-size: 14px;
//     text-align: center;
//     opacity: 0.9;
//     margin-bottom: 25px;
//     padding-bottom: 20px;
//     border-bottom: 2px solid rgba(255, 255, 255, 0.2);
//   }

//   .t18-section-title-left {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     margin-bottom: 15px;
//     margin-top: 25px;
//     color: white;
//   }

//   .t18-contact-item {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin-bottom: 12px;
//     font-size: 12px;
//     opacity: 0.9;
//     word-break: break-word;
//   }

//   .t18-contact-icon {
//     font-size: 16px;
//     min-width: 24px;
//   }

//   .t18-link {
//     color: white;
//     text-decoration: none;
//     transition: opacity 0.2s;
//   }

//   .t18-link:hover {
//     opacity: 0.8;
//     text-decoration: underline;
//   }

//   /* SKILLS IN LEFT COLUMN */
//   .t18-skills-content {
//     margin-top: 10px;
//     font-size: 12px;
//     line-height: 1.6;
//   }

//   .t18-skills-content ul {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//   }

//   .t18-skills-content li {
//     margin-bottom: 4px;
//   }

//   /* RIGHT COLUMN STYLES */
//   .t18-section-title-right {
//     font-size: 18px;
//     font-weight: 700;
//     color: #2d3748;
//     margin-bottom: 15px;
//     padding-bottom: 8px;
//     border-bottom: 3px solid #667eea;
//     display: inline-block;
//   }

//   .t18-summary {
//     font-size: 14px;
//     line-height: 1.6;
//     color: #4a5568;
//     margin-bottom: 25px;
//   }

//   /* Experience Items */
//   .t18-entry {
//     margin-bottom: 25px;
//   }

//   .t18-entry-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 5px;
//   }

//   .t18-entry-title {
//     font-size: 16px;
//     font-weight: 700;
//     color: #2d3748;
//   }

//   .t18-entry-date {
//     font-size: 12px;
//     color: #667eea;
//     font-weight: 500;
//   }

//   .t18-entry-subtitle {
//     font-size: 13px;
//     color: #718096;
//     margin-bottom: 8px;
//   }

//   .t18-entry-content {
//     font-size: 13px;
//     line-height: 1.6;
//     color: #4a5568;
//   }

//   /* Projects */
//   .t18-project-links {
//     display: flex;
//     gap: 15px;
//   }

//   .t18-project-link {
//     font-size: 11px;
//     color: #667eea;
//     text-decoration: underline;
//   }

//   .t18-project-tech-stack {
//     font-size: 12px;
//     color: #718096;
//     margin: 6px 0;
//   }

//   /* Education */
//   .t18-education-item {
//     margin-bottom: 20px;
//   }

//   .t18-education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #2d3748;
//   }

//   .t18-education-degree {
//     font-size: 13px;
//     color: #718096;
//     margin-top: 2px;
//   }

//   .t18-education-date {
//     font-size: 11px;
//     color: #667eea;
//     margin-top: 3px;
//   }

//   .t18-education-grade {
//     font-size: 11px;
//     color: #718096;
//     margin-top: 3px;
//     font-weight: 500;
//   }

//   /* Education Description */
//   .t18-education-description {
//     font-size: 13px;
//     line-height: 1.6;
//     color: #4a5568;
//     margin-top: 6px;
//   }

//   /* Custom Sections */
//   .t18-custom-section {
//     margin-bottom: 20px;
//   }

//   .t18-custom-section-title {
//     font-size: 14px;
//     font-weight: 700;
//     color: #2d3748;
//     margin-bottom: 8px;
//   }

//   .t18-custom-section-content {
//     font-size: 13px;
//     color: #4a5568;
//     line-height: 1.6;
//   }

//   /* Print Styles */
//   @media print {
//     @page {
//       size: A4;
//       margin: 0;
//     }

//     body {
//       background: white;
//       padding: 0;
//       margin: 0;
//     }

//     .resume-t18 {
//       max-width: 100%;
//       border-radius: 0;
//       box-shadow: none;
//     }

//     .t18-left {
//       background: #667eea;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   /* Responsive */
//   @media (max-width: 768px) {
//     .resume-t18 {
//       flex-direction: column;
//     }

//     .t18-left,
//     .t18-right {
//       width: 100%;
//     }

//     .t18-left {
//       padding: 30px 25px;
//     }

//     .t18-right {
//       padding: 30px 25px;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ");
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t18-photo" />`
//       : `<div class="t18-photo-placeholder"><span style="color:white;font-size:12px;">No Photo</span></div>`;

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      
//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
//       return cleanedSkills;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
      
//       return `
//         <div style="margin-top: 25px;">
//           <h2 class="t18-section-title-right">Projects</h2>
//           ${projects.map((project: any) => `
//             <div class="t18-entry">
//               <div class="t18-entry-header">
//                 <span class="t18-entry-title">${project.title || ""}</span>
//                 <div class="t18-project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t18-project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t18-project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="t18-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="t18-entry-content">${cleanQuillHTML(project.description)}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML for PDF
//     const generateCustomSectionsHTML = () => {
//       if (!customSections.length) return "";
      
//       return customSections
//         .filter((s: CustomSection) => s?.name?.trim() || s?.description?.trim())
//         .map((s: CustomSection) => `
//           <div style="margin-top: 25px;">
//             ${s.name ? `<h2 class="t18-section-title-right">${s.name}</h2>` : ""}
//             ${s.description ? `<div class="t18-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>
//         `).join("");
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="resume-t18">

//   <!-- LEFT COLUMN -->
//   <div class="t18-left">
//     <div class="t18-photo-wrapper">
//       ${photoHtml}
//     </div>
//     <h1 class="t18-name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="t18-jobtitle">${getJobTitle(contact?.jobTitle)}</div>

//     <!-- CONTACT INFO -->
//     <div class="t18-section-title-left">Contact</div>
//     ${addressStr ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">📍</div>
//       <div>${addressStr}</div>
//     </div>` : ""}
//     ${contact?.phone ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">📱</div>
//       <div>${contact.phone}</div>
//     </div>` : ""}
//     ${contact?.email ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">✉️</div>
//       <div>${contact.email}</div>
//     </div>` : ""}
//     ${formattedDob ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">🎂</div>
//       <div>${formattedDob}</div>
//     </div>` : ""}
//     ${linkedinUrl ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">🔗</div>
//       <div><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t18-link" target="_blank">LinkedIn</a></div>
//     </div>` : ""}
//     ${githubUrl ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">🐙</div>
//       <div><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t18-link" target="_blank">GitHub</a></div>
//     </div>` : ""}
//     ${portfolioUrl ? `
//     <div class="t18-contact-item">
//       <div class="t18-contact-icon">🌐</div>
//       <div><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t18-link" target="_blank">Portfolio</a></div>
//     </div>` : ""}

//     <!-- SKILLS -->
//     ${skills ? `
//     <div class="t18-section-title-left">Skills</div>
//     <div class="t18-skills-content">${generateSkillsHTML()}</div>` : ""}
//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t18-right">
//     <!-- SUMMARY -->
//     ${summary ? `
//     <div>
//       <h2 class="t18-section-title-right">About Me</h2>
//       <div class="t18-summary">${cleanQuillHTML(summary)}</div>
//     </div>` : ""}

//     <!-- EXPERIENCE -->
//     ${experiences?.length > 0 ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t18-section-title-right">Work Experience</h2>
//       ${experiences.map((exp: any) => `
//       <div class="t18-entry">
//         <div class="t18-entry-header">
//           <span class="t18-entry-title">${exp.jobTitle || ""}</span>
//           <span class="t18-entry-date">${formatMonthYear(exp.startDate, false)} — ${exp.endDate ? formatMonthYear(exp.endDate, false) : "Present"}</span>
//         </div>
//         <div class="t18-entry-subtitle">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
//         ${exp.text ? `<div class="t18-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     <!-- PROJECTS -->
//     ${generateProjectsHTML()}

//     <!-- EDUCATION -->
//     ${educations?.length > 0 ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t18-section-title-right">Education</h2>
//       ${educations.map((edu: any) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//         return `
//         <div class="t18-education-item">
//           <div class="t18-education-school">${edu.schoolname || ""}</div>
//           ${edu.degree ? `<div class="t18-education-degree">${edu.degree}</div>` : ""}
//           ${edu.location ? `<div class="t18-education-degree">${edu.location}</div>` : ""}
//           ${(edu.startDate || edu.endDate) ? `<div class="t18-education-date">${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}</div>` : ""}
//           ${formattedGrade ? `<div class="t18-education-grade">${formattedGrade}</div>` : ""}
//           ${eduTextHtml ? `<div class="t18-education-description">${eduTextHtml}</div>` : ""}
//         </div>`;
//       }).join("")}
//     </div>` : ""}

//     <!-- CUSTOM SECTIONS -->
//     ${generateCustomSectionsHTML()}
//   </div>

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
//       const res = await axios.post(`${API_URL}/api/candidates/generate-pdf`, { html }, { responseType: "blob" });
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
//             className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
//           >
//             📄 Download Resume
//           </motion.button>
//         </div>
//       )}

//       <div className={`resume-t18 ${alldata ? 'is-preview' : ''}`} style={{ margin: "0 auto" }}>
//         <style>{styles}</style>

//         {/* LEFT COLUMN */}
//         <div className="t18-left">
//           <div className="t18-photo-wrapper">
//             {previewUrl
//               ? <img src={previewUrl} alt="Profile" className="t18-photo" />
//               : <div className="t18-photo-placeholder"><IoPersonOutline style={{ width: 60, height: 60, color: "white" }} /></div>
//             }
//           </div>
//           <h1 className="t18-name">{contact?.firstName || ""} {contact?.lastName || ""}</h1>
//           <div className="t18-jobtitle">{getJobTitle(contact?.jobTitle)}</div>

//           {/* CONTACT INFO */}
//           <div className="t18-section-title-left">Contact</div>
//           {[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).length > 0 && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon"><IoLocationOutline /></div>
//               <div>{[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ")}</div>
//             </div>
//           )}
//           {contact?.phone && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon"><IoCallOutline /></div>
//               <div>{contact.phone}</div>
//             </div>
//           )}
//           {contact?.email && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon"><IoMailOutline /></div>
//               <div>{contact.email}</div>
//             </div>
//           )}
//           {formattedDob && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon">🎂</div>
//               <div>{formattedDob}</div>
//             </div>
//           )}
//           {linkedinUrl && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon"><IoGlobeOutline /></div>
//               <div><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t18-link">LinkedIn</a></div>
//             </div>
//           )}
//           {githubUrl && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon">🐙</div>
//               <div><a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer" className="t18-link">GitHub</a></div>
//             </div>
//           )}
//           {portfolioUrl && (
//             <div className="t18-contact-item">
//               <div className="t18-contact-icon"><IoGlobeOutline /></div>
//               <div><a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer" className="t18-link">Portfolio</a></div>
//             </div>
//           )}

//           {/* SKILLS */}
//           {skills && renderSkills() && (
//             <>
//               <div className="t18-section-title-left">Skills</div>
//               {renderSkills()}
//             </>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="t18-right">
//           {/* SUMMARY */}
//           {summary && (
//             <div>
//               <h2 className="t18-section-title-right">About Me</h2>
//               <div className="t18-summary" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }} />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences?.length > 0 && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t18-section-title-right">Work Experience</h2>
//               {experiences.map((exp: any, idx: number) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 return (
//                   <div key={exp.id || idx} className="t18-entry">
//                     <div className="t18-entry-header">
//                       <span className="t18-entry-title">{exp.jobTitle || ""}</span>
//                       <span className="t18-entry-date">{start} — {end}</span>
//                     </div>
//                     <div className="t18-entry-subtitle">
//                       {exp.employer || ""}
//                       {exp.location && ` • ${exp.location}`}
//                     </div>
//                     {exp.text && <div className="t18-entry-content" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t18-section-title-right">Education</h2>
//               {educations.map((edu: any, idx: number) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 return (
//                   <div key={edu.id || idx} className="t18-education-item">
//                     <div className="t18-education-school">{edu.schoolname || ""}</div>
//                     {edu.degree && <div className="t18-education-degree">{edu.degree}</div>}
//                     {edu.location && <div className="t18-education-degree">{edu.location}</div>}
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="t18-education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " — "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                     {formattedGrade && <div className="t18-education-grade">{formattedGrade}</div>}
//                     {eduTextHtml && <div className="t18-education-description" dangerouslySetInnerHTML={{ __html: eduTextHtml }} />}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {customSections.filter((s: CustomSection) => s?.name?.trim() || s?.description?.trim()).map((section: CustomSection, idx: number) => (
//             <div key={section.id || idx} style={{ marginTop: "25px" }}>
//               {section.name && <h2 className="t18-section-title-right">{section.name}</h2>}
//               {section.description && <div className="t18-custom-section-content" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateEighteen;

























// "use client";
// import React, { useContext } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   getLocalStorage,
//   MonthYearDisplay,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const styles = `
//   .t19-resume {
//     width: 210mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
//     font-size: 13px;
//     line-height: 1.6;
//     color: #2d3748;
//   }

//   .t19-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   .t19-resume.is-preview {
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

//   /* Fix p tag spacing */
//   .t19-resume p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.6 !important;
//   }

//   .t19-resume p:last-child {
//     margin-bottom: 0 !important;
//   }

//   /* Rich text content styles */
//   .t19-resume .t19-entry-content ul,
//   .t19-resume .t19-entry-content ol,
//   .t19-resume .t19-summary ul,
//   .t19-resume .t19-summary ol,
//   .t19-resume .t19-custom-section-content ul,
//   .t19-resume .t19-custom-section-content ol,
//   .t19-resume .t19-skills-content ul,
//   .t19-resume .t19-skills-content ol {
//     margin: 6px 0 6px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t19-resume .t19-entry-content li,
//   .t19-resume .t19-summary li,
//   .t19-resume .t19-custom-section-content li,
//   .t19-resume .t19-skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.6 !important;
//   }

//   .t19-resume .t19-entry-content ul,
//   .t19-resume .t19-summary ul,
//   .t19-resume .t19-custom-section-content ul,
//   .t19-resume .t19-skills-content ul {
//     list-style-type: disc !important;
//   }

//   .t19-resume .t19-entry-content ol,
//   .t19-resume .t19-summary ol,
//   .t19-resume .t19-custom-section-content ol,
//   .t19-resume .t19-skills-content ol {
//     list-style-type: decimal !important;
//   }

//   .t19-resume .t19-entry-content strong,
//   .t19-resume .t19-summary strong,
//   .t19-resume .t19-custom-section-content strong,
//   .t19-resume .t19-skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t19-resume .t19-entry-content em,
//   .t19-resume .t19-summary em,
//   .t19-resume .t19-custom-section-content em,
//   .t19-resume .t19-skills-content em {
//     font-style: italic !important;
//   }

//   .t19-resume .t19-entry-content u,
//   .t19-resume .t19-summary u,
//   .t19-resume .t19-custom-section-content u,
//   .t19-resume .t19-skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t19-resume .t19-entry-content p,
//   .t19-resume .t19-summary p,
//   .t19-resume .t19-custom-section-content p,
//   .t19-resume .t19-skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills content styling */
//   .t19-resume .t19-skills-content {
//     font-size: 12px;
//     line-height: 1.6;
//     color: #4a5568;
//   }

//   /* Custom Section Content */
//   .t19-resume .t19-custom-section-content {
//     font-size: 12px;
//     line-height: 1.6;
//     color: #4a5568;
//   }

//   /* ── HEADER ── */
//   .t19-header {
//     background: #ffffff;
//     padding: 22px 24px 0;
//     border-bottom: 3px solid #e53e3e;
//   }

//   .t19-name {
//     font-family: 'Playfair Display', Georgia, serif;
//     font-size: 36px;
//     font-weight: 800;
//     color: #1a202c;
//     letter-spacing: -0.02em;
//     line-height: 1.1;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t19-jobtitle {
//     font-size: 11px;
//     font-weight: 600;
//     color: #e53e3e;
//     text-transform: uppercase;
//     letter-spacing: 0.12em;
//     margin-top: 3px;
//     margin-bottom: 10px;
//   }

//   .t19-contact-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 4px 16px;
//     padding-bottom: 10px;
//     align-items: center;
//   }

//   .t19-contact-item {
//     font-size: 11px;
//     color: #718096;
//     display: flex;
//     align-items: center;
//     gap: 4px;
//   }

//   .t19-contact-sep {
//     color: #e53e3e;
//     font-size: 10px;
//   }

//   .t19-header-link {
//     font-size: 11px;
//     color: #e53e3e;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── BODY ── */
//   .t19-body {
//     display: flex;
//     align-items: stretch;
//   }

//   /* ── LEFT COLUMN (62%) ── */
//   .t19-left {
//     width: 62%;
//     padding: 18px 20px 20px 24px;
//     border-right: 1px solid #fed7d7;
//     background: #ffffff;
//   }

//   /* ── RIGHT COLUMN (38%) ── */
//   .t19-right {
//     width: 38%;
//     padding: 18px 20px 20px 16px;
//     background: #fff5f5;
//   }

//   /* ── SECTION TITLES ── */
//   .t19-stitle-l {
//     font-size: 10px;
//     font-weight: 800;
//     text-transform: uppercase;
//     letter-spacing: 0.14em;
//     color: #e53e3e;
//     margin-top: 16px;
//     margin-bottom: 8px;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }

//   .t19-stitle-l:first-child {
//     margin-top: 0;
//   }

//   .t19-stitle-l::after {
//     content: '';
//     flex: 1;
//     height: 1px;
//     background: #fed7d7;
//   }

//   .t19-stitle-r {
//     font-size: 10px;
//     font-weight: 800;
//     text-transform: uppercase;
//     letter-spacing: 0.14em;
//     color: #e53e3e;
//     margin-top: 16px;
//     margin-bottom: 8px;
//   }

//   .t19-stitle-r:first-child {
//     margin-top: 0;
//   }

//   .t19-stitle-r::after {
//     content: '';
//     display: block;
//     height: 1.5px;
//     background: #fed7d7;
//     margin-top: 4px;
//   }

//   /* ── SUMMARY ── */
//   .t19-summary {
//     font-size: 12.5px;
//     color: #4a5568;
//     line-height: 1.7;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── ENTRY ── */
//   .t19-entry {
//     margin-bottom: 14px;
//     padding-bottom: 14px;
//     border-bottom: 1px solid #fff0f0;
//   }

//   .t19-entry:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .t19-entry-top {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//   }

//   .t19-entry-title-wrap {
//     display: flex;
//     align-items: baseline;
//     gap: 6px;
//     flex: 1;
//   }

//   .t19-dot {
//     width: 7px;
//     height: 7px;
//     background: #e53e3e;
//     border-radius: 50%;
//     flex-shrink: 0;
//     margin-top: 4px;
//   }

//   .t19-entry-title {
//     font-size: 13px;
//     font-weight: 700;
//     color: #1a202c;
//     line-height: 1.3;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t19-entry-date {
//     font-size: 10px;
//     color: #a0aec0;
//     white-space: nowrap;
//     flex-shrink: 0;
//     margin-top: 2px;
//   }

//   .t19-entry-sub {
//     font-size: 11px;
//     color: #718096;
//     margin-top: 2px;
//     margin-left: 13px;
//     font-style: italic;
//   }

//   .t19-entry-content {
//     font-size: 12px;
//     color: #4a5568;
//     line-height: 1.6;
//     margin-top: 5px;
//     margin-left: 13px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── SKILLS (right sidebar) ── */
//   .t19-skills-content {
//     margin-top: 8px;
//   }

//   /* ── PROJECTS ── */
//   .t19-project-links {
//     display: flex;
//     gap: 12px;
//     margin-top: 4px;
//   }

//   .t19-project-link {
//     font-size: 10px;
//     color: #e53e3e;
//     text-decoration: underline;
//   }

//   .t19-project-tech-stack {
//     font-size: 11px;
//     color: #718096;
//     margin: 4px 0;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t19-education-grade {
//     font-size: 10px;
//     color: #718096;
//     margin-top: 2px;
//     font-weight: 500;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 0; }
//     .t19-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }
//     .t19-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//     .t19-right  { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//     .t19-entry  { page-break-inside: avoid; break-inside: avoid; }
//     .t19-stitle-l, .t19-stitle-r { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateNineteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context?.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const dateOfBirth = contact?.dob;
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;

//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const jobTitle = contact?.jobTitle
//     ? typeof contact.jobTitle === "string"
//       ? contact.jobTitle
//       : (contact.jobTitle as any)?.name || ""
//     : "";

//   const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country]
//     .filter(Boolean)
//     .join(", ");

//   // Helper function to render skills (using cleanQuillHTML)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <div
//         className="t19-skills-content"
//         dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//       />
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <>
//         <div className="t19-stitle-l">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t19-entry">
//             <div className="t19-entry-top">
//               <div className="t19-entry-title-wrap">
//                 <div className="t19-dot" />
//                 <div className="t19-entry-title">{project.title}</div>
//               </div>
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t19-project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {(project.liveUrl || project.githubUrl) && (
//               <div className="t19-project-links">
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="t19-project-link"
//                   >
//                     Live Demo
//                   </a>
//                 )}
//                 {project.githubUrl && (
//                   <a
//                     href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="t19-project-link"
//                   >
//                     GitHub
//                   </a>
//                 )}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t19-entry-content"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   const fmtDate = (val?: string | null, short = true): string => {
//     if (!val) return "";
//     try {
//       return formatMonthYear(val, short);
//     } catch {
//       return val;
//     }
//   };

//   const contactItems = [
//     contact?.email,
//     contact?.phone,
//     formattedDob,
//     addressStr || null,
//   ].filter(Boolean) as string[];

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      
//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
//       return `<div class="t19-skills-content">${cleanedSkills}</div>`;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
      
//       return `
//         <div class="t19-stitle-l">Projects</div>
//         ${projects.map((project: any) => `
//           <div class="t19-entry">
//             <div class="t19-entry-top">
//               <div class="t19-entry-title-wrap">
//                 <div class="t19-dot" />
//                 <div class="t19-entry-title">${project.title || ""}</div>
//               </div>
//             </div>
//             ${project.techStack && project.techStack.length > 0 ? `
//               <div class="t19-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             ` : ""}
//             ${(project.liveUrl || project.githubUrl) ? `
//               <div class="t19-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t19-project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t19-project-link">GitHub</a>` : ""}
//               </div>
//             ` : ""}
//             ${project.description ? `
//               <div class="t19-entry-content">${cleanQuillHTML(project.description)}</div>
//             ` : ""}
//           </div>
//         `).join("")}
//       `;
//     };

//     // Generate custom sections HTML for PDF
//     const generateCustomSectionsHTML = () => {
//       if (!customSection.length) return "";
      
//       return customSection
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any) => `
//           ${s.name ? `<div class="t19-stitle-l">${s.name}</div>` : ""}
//           ${s.description ? `<div class="t19-summary">${cleanQuillHTML(s.description)}</div>` : ""}
//         `,
//         )
//         .join("");
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t19-resume">

//   <!-- HEADER -->
//   <div class="t19-header">
//     <div class="t19-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${jobTitle ? `<div class="t19-jobtitle">${jobTitle}</div>` : ""}
//     <div class="t19-contact-row">
//       ${contactItems
//         .map(
//           (item, i) => `
//         ${i > 0 ? `<span class="t19-contact-sep">·</span>` : ""}
//         <span class="t19-contact-item">${item}</span>
//       `,
//         )
//         .join("")}
//       ${linkedinUrl?.trim() ? `
//         <span class="t19-contact-sep">·</span>
//         <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t19-header-link">LinkedIn</a>
//       ` : ""}
//       ${githubUrl?.trim() ? `
//         <span class="t19-contact-sep">·</span>
//         <a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t19-header-link">GitHub</a>
//       ` : ""}
//       ${portfolioUrl?.trim() ? `
//         <span class="t19-contact-sep">·</span>
//         <a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t19-header-link">Portfolio</a>
//       ` : ""}
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="t19-body">

//     <!-- LEFT COLUMN -->
//     <div class="t19-left">

//       ${summary ? `
//         <div class="t19-stitle-l">Summary</div>
//         <div class="t19-summary">${cleanQuillHTML(summary)}</div>
//       ` : ""}

//       ${experiences.length > 0 ? `
//         <div class="t19-stitle-l">Experience</div>
//         ${experiences
//           .map((exp) => {
//             const start = fmtDate(exp.startDate);
//             const end = exp.endDate ? fmtDate(exp.endDate) : exp.startDate ? "Present" : "";
//             const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" · ");
//             return `
//             <div class="t19-entry">
//               <div class="t19-entry-top">
//                 <div class="t19-entry-title-wrap">
//                   <div class="t19-dot"></div>
//                   <div class="t19-entry-title">${exp.jobTitle || ""}</div>
//                 </div>
//                 ${start || end ? `<div class="t19-entry-date">${start}${start && end ? " – " : ""}${end}</div>` : ""}
//               </div>
//               ${companyLocation ? `<div class="t19-entry-sub">${companyLocation}</div>` : ""}
//               ${exp.text ? `<div class="t19-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
//             </div>`;
//           })
//           .join("")}
//       ` : ""}

//       ${generateProjectsHTML()}

//       ${educations.length > 0 ? `
//         <div class="t19-stitle-l">Education</div>
//         ${educations
//           .map((edu) => {
//             const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//             const schoolLocation = [edu.schoolname, edu.location].filter(Boolean).join(" · ");
//             return `
//             <div class="t19-entry">
//               <div class="t19-entry-top">
//                 <div class="t19-entry-title-wrap">
//                   <div class="t19-dot"></div>
//                   <div class="t19-entry-title">${edu.degree || ""}</div>
//                 </div>
//                 ${edu.startDate || edu.endDate ? `<div class="t19-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>` : ""}
//               </div>
//               ${schoolLocation ? `<div class="t19-entry-sub">${schoolLocation}</div>` : ""}
//               ${formattedGrade ? `<div class="t19-education-grade">${formattedGrade}</div>` : ""}
//               ${eduTextHtml ? `<div class="t19-entry-content">${eduTextHtml}</div>` : ""}
//             </div>`;
//           })
//           .join("")}
//       ` : ""}

//       ${generateCustomSectionsHTML()}

//     </div>

//     <!-- RIGHT COLUMN -->
//     <div class="t19-right">

//       ${skills ? `
//         <div class="t19-stitle-r">Skills</div>
//         ${generateSkillsHTML()}
//       ` : ""}

//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact?.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
//     if (!userId || !Contactid) return;
//     try {
//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");
//       await axios.post(`${API_URL}/api/users/download-resume`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html = generateHTML();
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
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
//       await fetchOldResumeData(res.data);
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
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer shadow-md hover:shadow-lg"
//           >
//             Download Resume
//           </motion.button>
//         </div>
//       )}

//       <div
//         className={`t19-resume ${alldata ? 'is-preview' : ''}`}
//         style={{
//           margin: "0 auto",
//           width: "210mm",
//           minHeight: "297mm",
//           boxShadow: !alldata ? "0 0 12px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t19-header">
//           <div className="t19-name">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//           </div>
//           {jobTitle && <div className="t19-jobtitle">{jobTitle}</div>}
//           <div className="t19-contact-row">
//             {contactItems.map((item, i) => (
//               <React.Fragment key={i}>
//                 {i > 0 && <span className="t19-contact-sep">·</span>}
//                 <span className="t19-contact-item">{item}</span>
//               </React.Fragment>
//             ))}
//             {linkedinUrl?.trim() && (
//               <>
//                 <span className="t19-contact-sep">·</span>
//                 <a
//                   href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t19-header-link"
//                 >
//                   LinkedIn
//                 </a>
//               </>
//             )}
//             {githubUrl?.trim() && (
//               <>
//                 <span className="t19-contact-sep">·</span>
//                 <a
//                   href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t19-header-link"
//                 >
//                   GitHub
//                 </a>
//               </>
//             )}
//             {portfolioUrl?.trim() && (
//               <>
//                 <span className="t19-contact-sep">·</span>
//                 <a
//                   href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t19-header-link"
//                 >
//                   Portfolio
//                 </a>
//               </>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t19-body">
//           {/* LEFT COLUMN */}
//           <div className="t19-left">
//             {summary && (
//               <>
//                 <div className="t19-stitle-l">Summary</div>
//                 <div
//                   className="t19-summary"
//                   dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//                 />
//               </>
//             )}

//             {experiences.length > 0 && (
//               <>
//                 <div className="t19-stitle-l">Experience</div>
//                 {experiences.map((exp, i) => {
//                   const start = fmtDate(exp.startDate);
//                   const end = exp.endDate ? fmtDate(exp.endDate) : exp.startDate ? "Present" : "";
//                   const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" · ");
//                   return (
//                     <div key={exp.id || i} className="t19-entry">
//                       <div className="t19-entry-top">
//                         <div className="t19-entry-title-wrap">
//                           <div className="t19-dot" />
//                           <div className="t19-entry-title">{exp.jobTitle || ""}</div>
//                         </div>
//                         {(start || end) && (
//                           <div className="t19-entry-date">
//                             {start}{start && end ? " – " : ""}{end}
//                           </div>
//                         )}
//                       </div>
//                       {companyLocation && <div className="t19-entry-sub">{companyLocation}</div>}
//                       {exp.text && (
//                         <div
//                           className="t19-entry-content"
//                           dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {renderProjects()}

//             {educations.length > 0 && (
//               <>
//                 <div className="t19-stitle-l">Education</div>
//                 {educations.map((edu, i) => {
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                   const schoolLocation = [edu.schoolname, edu.location].filter(Boolean).join(" · ");
//                   return (
//                     <div key={edu.id || i} className="t19-entry">
//                       <div className="t19-entry-top">
//                         <div className="t19-entry-title-wrap">
//                           <div className="t19-dot" />
//                           <div className="t19-entry-title">{edu.degree || ""}</div>
//                         </div>
//                         {(edu.startDate || edu.endDate) && (
//                           <div className="t19-entry-date">
//                             {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
//                           </div>
//                         )}
//                       </div>
//                       {schoolLocation && <div className="t19-entry-sub">{schoolLocation}</div>}
//                       {formattedGrade && <div className="t19-education-grade">{formattedGrade}</div>}
//                       {eduTextHtml && (
//                         <div
//                           className="t19-entry-content"
//                           dangerouslySetInnerHTML={{ __html: eduTextHtml }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map((section: any, i: number) => (
//                 <div key={section.id || i}>
//                   {section.name && <div className="t19-stitle-l">{section.name}</div>}
//                   {section.description && (
//                     <div
//                       className="t19-summary"
//                       dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="t19-right">
//             {skills && renderSkills() && (
//               <>
//                 <div className="t19-stitle-r">Skills</div>
//                 {renderSkills()}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateNineteen;




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
// A4 CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateNineteenProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateNineteen: React.FC<TemplateNineteenProps> = ({
  alldata,
  customization,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  const activeFontFamily = customization?.fontFamily ?? "'DM Sans', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
  const contact = alldata?.contact || context?.contact || {};
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

  // ── Font map ───────────────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const fontMap: Record<string, string> = {
      "'DM Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600;700&display=swap",
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
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return fontMap[fontFamily] || fontMap["'DM Sans', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ────────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t19-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.6;
      color: #2d3748;
    }

    .t19-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; }

    /* ── HEADER ── */
    .t19-header {
      padding: 24px 0 0;
      border-bottom: 3px solid #e53e3e;
      margin-bottom: 0;
    }

    .t19-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 38px;
      font-weight: 800;
      color: #1a202c;
      letter-spacing: -0.02em;
      line-height: 1.1;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t19-jobtitle {
      font-size: 11px;
      font-weight: 600;
      color: #e53e3e;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-top: 4px;
      margin-bottom: 10px;
    }

    .t19-contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      padding-bottom: 12px;
      align-items: center;
    }

    .t19-contact-item {
      font-size: 11px;
      color: #718096;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .t19-contact-sep {
      color: #e53e3e;
      font-size: 10px;
    }

    .t19-header-link {
      font-size: 11px;
      color: #e53e3e;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* ── SECTION TITLES ── */
    .t19-section-content { margin-bottom: 4px; }

    .t19-stitle {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #e53e3e;
      margin-top: 18px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t19-stitle:first-child { margin-top: 0; }

    .t19-stitle::after {
      content: '';
      flex: 1;
      height: 1.5px;
      background: #fed7d7;
    }

    /* ── SUMMARY ── */
    .t19-summary {
      font-size: 12.5px;
      color: #4a5568;
      line-height: 1.7;
      word-wrap: break-word;
      overflow-wrap: break-word;
      padding: 0 2px;
    }

    /* ── ENTRY ── */
    .t19-entry {
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #fff0f0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t19-entry:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .t19-entry-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t19-entry-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 7px;
      flex: 1;
    }

    .t19-dot {
      width: 7px;
      height: 7px;
      background: #e53e3e;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 4px;
      display: inline-block;
    }

    .t19-entry-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #1a202c;
      line-height: 1.3;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t19-entry-date {
      font-size: 10.5px;
      color: #a0aec0;
      white-space: nowrap;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .t19-entry-sub {
      font-size: 11px;
      color: #718096;
      margin-top: 2px;
      margin-left: 14px;
      font-style: italic;
    }

    .t19-entry-content {
      font-size: 12px;
      color: #4a5568;
      line-height: 1.65;
      margin-top: 5px;
      margin-left: 14px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── LISTS ── */
    .t19-entry-content ul, .t19-entry-content ol,
    .t19-summary ul, .t19-summary ol,
    .t19-skills-content ul, .t19-skills-content ol,
    .t19-custom-section-content ul, .t19-custom-section-content ol {
      margin: 6px 0 6px 20px !important;
      padding-left: 0 !important;
    }
    .t19-entry-content ul, .t19-summary ul, .t19-skills-content ul,
    .t19-custom-section-content ul { list-style-type: disc !important; }
    .t19-entry-content ol, .t19-summary ol, .t19-skills-content ol,
    .t19-custom-section-content ol { list-style-type: decimal !important; }
    .t19-entry-content li, .t19-summary li, .t19-skills-content li,
    .t19-custom-section-content li {
      margin-bottom: 4px !important;
      line-height: 1.6 !important;
      font-size: 12px !important;
    }
    .t19-entry-content strong, .t19-summary strong,
    .t19-skills-content strong, .t19-custom-section-content strong { font-weight: 700 !important; }
    .t19-entry-content em, .t19-summary em,
    .t19-skills-content em, .t19-custom-section-content em { font-style: italic !important; }
    .t19-entry-content u, .t19-summary u,
    .t19-skills-content u, .t19-custom-section-content u { text-decoration: underline !important; }

    /* ── SKILLS ── */
    .t19-skills-content {
      font-size: 12px;
      line-height: 1.65;
      color: #4a5568;
      padding: 0 2px;
    }

    /* ── CUSTOM SECTIONS ── */
    .t19-custom-section-content {
      font-size: 12px;
      line-height: 1.65;
      color: #4a5568;
      padding: 0 2px;
    }

    /* ── PROJECTS ── */
    .t19-project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 8px;
    }

    .t19-project-links {
      display: inline-flex;
      gap: 10px;
      flex-shrink: 0;
      align-items: center;
    }

    .t19-project-link {
      font-size: 10px;
      color: #e53e3e !important;
      text-decoration: underline !important;
      white-space: nowrap;
    }

    .t19-project-tech-stack {
      font-size: 11px;
      color: #718096;
      margin: 3px 0 4px 14px;
    }

    /* ── EDUCATION ── */
    .t19-education-grade {
      font-size: 10px;
      color: #718096;
      margin-top: 2px;
      margin-left: 14px;
      font-weight: 500;
    }

    /* ── PAGE BREAK ── */
    .t19-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; }
      .t19-resume { width: 100% !important; padding: 0 !important; }
      .t19-project-link { color: #e53e3e !important; }
      .t19-header-link { color: #e53e3e !important; }
      a, a:visited { color: inherit !important; }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);

      const richText = (html: string, cls: string) => {
        if (!html) return "";
        const clean = cleanQuillHTML(html);
        if (!clean || clean === "<p><br></p>") return "";
        return `<div class="${cls}">${clean}</div>`;
      };

      const hasSkillsContent = (): boolean => {
        if (!skills?.trim()) return false;
        const cleaned = cleanQuillHTML(skills);
        if (!cleaned || cleaned === "<p><br></p>") return false;
        return cleaned.replace(/<[^>]*>/g, "").trim().length > 0;
      };

      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const jobTitle = contact?.jobTitle
        ? typeof contact.jobTitle === "string"
          ? contact.jobTitle
          : (contact.jobTitle as any)?.name || ""
        : "";

      const contactItems = [
        contact?.email,
        contact?.phone,
        formattedDob,
        addressParts.length ? addressParts.join(", ") : null,
      ].filter(Boolean) as string[];

      // ── HEADER ──
      const header = `
      <div class="t19-header">
        <div class="t19-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        ${jobTitle ? `<div class="t19-jobtitle">${jobTitle}</div>` : ""}
        <div class="t19-contact-row">
          ${contactItems
            .map(
              (item, i) =>
                `${i > 0 ? `<span class="t19-contact-sep">·</span>` : ""}
                 <span class="t19-contact-item">${item}</span>`,
            )
            .join("")}
          ${linkedinUrl?.trim() ? `<span class="t19-contact-sep">·</span><a href="${href(linkedinUrl)}" class="t19-header-link" target="_blank">LinkedIn</a>` : ""}
          ${githubUrl?.trim() ? `<span class="t19-contact-sep">·</span><a href="${href(githubUrl)}" class="t19-header-link" target="_blank">GitHub</a>` : ""}
          ${portfolioUrl?.trim() ? `<span class="t19-contact-sep">·</span><a href="${href(portfolioUrl)}" class="t19-header-link" target="_blank">Portfolio</a>` : ""}
        </div>
      </div>`;

      // ── SUMMARY ──
      const summaryBlock = summary?.trim()
        ? `<div class="t19-section-content" data-block-id="summary">
             <div class="t19-stitle">Summary</div>
             ${richText(summary.replace(/\n/g, "<br>"), "t19-summary")}
           </div>`
        : "";

      // ── EXPERIENCE ──
      const expBlock = experiences.length
        ? `<div class="t19-section-content" data-block-id="exp-section">
             <div class="t19-stitle">Experience</div>
             ${experiences
               .map((exp: any, i: number) => {
                 const s = formatMonthYear(exp.startDate, false);
                 const e = exp.endDate
                   ? formatMonthYear(exp.endDate, false)
                   : exp.startDate ? "Present" : "";
                 const companyLocation = [exp.employer, exp.location]
                   .filter(Boolean)
                   .join(" · ");
                 return `<div class="t19-entry" data-block-id="exp-${i}">
                   <div class="t19-entry-top">
                     <div class="t19-entry-title-wrap">
                       <span class="t19-dot"></span>
                       <span class="t19-entry-title">${exp.jobTitle || ""}</span>
                     </div>
                     ${s || e ? `<div class="t19-entry-date">${s}${s && e ? " – " : ""}${e}</div>` : ""}
                   </div>
                   ${companyLocation ? `<div class="t19-entry-sub">${companyLocation}</div>` : ""}
                   ${exp.text ? richText(exp.text, "t19-entry-content") : ""}
                 </div>`;
               })
               .join("")}
           </div>`
        : "";

      // ── PROJECTS ──
      const projBlock = projects.length
        ? `<div class="t19-section-content" data-block-id="proj-section">
             <div class="t19-stitle">Projects</div>
             ${projects
               .map(
                 (p: any, i: number) => `
               <div class="t19-entry" data-block-id="proj-${i}">
                 <div class="t19-entry-top">
                   <div class="t19-entry-title-wrap">
                     <span class="t19-dot"></span>
                     <span class="t19-entry-title">${p.title || ""}</span>
                   </div>
                   ${p.liveUrl || p.githubUrl
                     ? `<div class="t19-project-links">
                         ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t19-project-link" target="_blank">Live Demo</a>` : ""}
                         ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t19-project-link" target="_blank">GitHub</a>` : ""}
                       </div>`
                     : ""}
                 </div>
                 ${p.techStack?.length ? `<div class="t19-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                 ${p.description ? richText(p.description, "t19-entry-content") : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      // ── EDUCATION ──
      const eduBlock = educations.length
        ? `<div class="t19-section-content" data-block-id="edu-section">
             <div class="t19-stitle">Education</div>
             ${educations
               .map((edu: any, i: number) => {
                 const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                 const schoolLocation = [edu.schoolname, edu.location]
                   .filter(Boolean)
                   .join(" · ");
                 return `<div class="t19-entry" data-block-id="edu-${i}">
                   <div class="t19-entry-top">
                     <div class="t19-entry-title-wrap">
                       <span class="t19-dot"></span>
                       <span class="t19-entry-title">${edu.degree || ""}</span>
                     </div>
                     ${edu.startDate || edu.endDate
                       ? `<div class="t19-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>`
                       : ""}
                   </div>
                   ${schoolLocation ? `<div class="t19-entry-sub">${schoolLocation}</div>` : ""}
                   ${grade ? `<div class="t19-education-grade">${grade}</div>` : ""}
                   ${edu.text ? richText(edu.text, "t19-entry-content") : ""}
                 </div>`;
               })
               .join("")}
           </div>`
        : "";

      // ── SKILLS ──
      const skillsBlock = (() => {
        if (!hasSkillsContent()) return "";
        const cleanedSkills = cleanQuillHTML(skills);
        return `<div class="t19-section-content" data-block-id="skills-section">
          <div class="t19-stitle">Skills</div>
          <div class="t19-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
        </div>`;
      })();

      // ── CUSTOM SECTIONS ──
      const customSection = Array.isArray(finalize?.customSection)
        ? finalize.customSection
        : !Array.isArray(finalize) && Array.isArray(finalize?.customSection)
        ? finalize.customSection
        : [];

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
                <div class="t19-section-content" data-block-id="custom-${i}">
                  ${s.name ? `<div class="t19-stitle">${s.name}</div>` : ""}
                  ${s.description ? richText(s.description, "t19-custom-section-content") : ""}
                </div>`,
              )
              .join("")
          : "";

      const pdfStyle = forPDF
        ? `<style>.t19-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = `${header}${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t19-page-break";
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
  <title>Resume</title>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t19-resume">${bodyContent}</div>
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

  // ── Page splitter (identical to TemplateOne) ───────────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t19-resume");
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
  html, body {
    margin: 0 !important; padding: 0 !important;
    width: ${A4_W}px !important; height: auto !important;
    overflow: visible !important; background: white !important;
  }
  .t19-resume {
    width: ${A4_W}px !important;
    padding-left: ${MARGIN}px !important;
    padding-right: ${MARGIN}px !important;
    padding-top: 0 !important; padding-bottom: 0 !important;
    margin: 0 !important; box-sizing: border-box !important;
  }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t19-resume");
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
          const scrollY =
            measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
          const getRelTop = (el: HTMLElement) =>
            el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          // Collect all breakable entry/item blocks
          const ITEM_SELECTORS = [
            ".t19-entry",
            ".t19-section-content",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8)
              blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Skills li breakpoints
          const skillsLis = Array.from(
            resume.querySelectorAll<HTMLElement>(".t19-skills-content li"),
          );
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          // Section-title anchor: keep title glued to first entry
          resume
            .querySelectorAll<HTMLElement>(".t19-stitle")
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
                if (firstItem.classList.contains("t19-skills-content")) return;

                const deepChild = firstItem.querySelector<HTMLElement>(
                  ".t19-entry",
                );
                const anchor = deepChild || firstItem;
                const anchorBottom = getRelBottom(anchor);
                if (anchorBottom - titleTop > 8) {
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
              if (
                block.top >= currentStart &&
                block.bottom > naiveCut &&
                block.top < actualCut
              ) {
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
  html, body {
    margin: 0 !important; padding: 0 !important;
    width: ${A4_W}px !important; height: ${A4_H}px !important;
    overflow: hidden !important; background: white !important;
  }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t19-resume {
    width: ${A4_W}px !important;
    padding-top: 0 !important; padding-bottom: 0 !important;
    padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
    margin: 0 !important;
  }
</style></head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">${resumeSnapshot}</div>
    </div>
  </div>
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
                  : "bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-2xl hover:from-red-600 hover:to-rose-700"
              }
            `}
          >
            {!isDownloading && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
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
                  <span className="text-sm opacity-75 font-light ml-1">PDF</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      )}

      {alldata ? (
        // Thumbnail preview (template picker)
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
        // Full multi-page preview (editor / download page)
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

export default TemplateNineteen;