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
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();

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
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
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
//             const imageUrl = `${API_URL}/api/uploads/photos/${contact.photo}`;
//             setPreviewUrl(imageUrl);
//             setBase64Image(imageUrl);
//           }
//         } else if (
//           contact.photo &&
//           typeof contact.photo === "object" &&
//           "size" in contact.photo
//         ) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           setPreviewUrl(objectUrl);
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

//   const isCategorizedSkills = (skillsData: any[]) => {
//     if (!skillsData || skillsData.length === 0) return false;
//     return skillsData[0]?.title !== undefined;
//   };

//   const renderSkills = () => {
//     if (!skills || skills.length === 0) return null;
//     const isCategorized = isCategorizedSkills(skills);

//     if (isCategorized) {
//       return (
//         <div className="t3-section">
//           <div className="t3-section-label">Skills</div>
//           {skills.map((category: any) => (
//             <div key={category.id} style={{ marginBottom: "10px" }}>
//               <div className="t3-skill-cat-title">{category.title}</div>
//               <div className="t3-pills">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="t3-pill">{skill.name}</span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return (
//       <div className="t3-section">
//         <div className="t3-section-label">Skills</div>
//         <div className="t3-pills">
//           {skills.map((skill: any, index: number) => (
//             <span key={skill.id || index} className="t3-pill">
//               {skill.name || skill.skill}
//             </span>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;
//     return (
//       <div className="t3-section">
//         <div className="t3-section-label">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t3-entry">
//             <div className="t3-entry-header">
//               <span className="t3-entry-title">{project.title}</span>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t3-entry-links">
//                   {project.liveUrl && (
//                     <a href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank" rel="noreferrer" className="t3-link">Live</a>
//                   )}
//                   {project.githubUrl && (
//                     <a href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank" rel="noreferrer" className="t3-link">GitHub</a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack?.length > 0 && (
//               <div className="t3-tech-stack">{project.techStack.join("  ·  ")}</div>
//             )}
//             {project.description && (
//               <div className="t3-entry-body"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }} />
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
//     @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

//     /* ── ROOT ── */
//     .t3-resume {
//       width: 210mm;
//       min-height: 297mm;
//       box-sizing: border-box;
//       background: #FAFAF8;
//       font-family: 'DM Sans', sans-serif;
//       font-size: 12.5px;
//       line-height: 1.55;
//       color: #1C1C1A;
//       display: flex;
//       flex-direction: column;
//       position: relative;
//     }

//     .t3-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       overflow: hidden;
//     }

//     /* ── RESETS ── */
//     .t3-resume p, .t3-resume div, .t3-resume span, .t3-resume i, .t3-resume a {
//       margin: 0; padding: 0;
//       font-family: 'DM Sans', sans-serif;
//       line-height: 1.55;
//     }
//     .t3-resume ul, .t3-resume ol {
//       margin: 0 0 0 18px !important;
//       padding: 0 !important;
//     }
//     .t3-resume li {
//       margin-bottom: 2px !important;
//       padding: 0 !important;
//       line-height: 1.55 !important;
//       font-size: 12.5px !important;
//     }
//     .t3-resume ul { list-style-type: disc !important; }
//     .t3-resume ol { list-style-type: decimal !important; }
//     .t3-resume strong, .t3-resume b { font-weight: 600 !important; }
//     .t3-resume em, .t3-resume i { font-style: italic !important; }
//     .t3-resume u { text-decoration: underline !important; }

//     /* ── ACCENT BAR (left edge decoration) ── */
//     .t3-resume::before {
//       content: '';
//       position: absolute;
//       top: 0; left: 0;
//       width: 5px;
//       height: 100%;
//       background: linear-gradient(180deg, #2C2C2A 0%, #6B6B5E 60%, #C4B99A 100%);
//     }

//     /* ── HEADER ── */
//     .t3-header {
//       padding: 32px 32px 24px 36px;
//       display: flex;
//       align-items: flex-end;
//       gap: 24px;
//       border-bottom: 1.5px solid #E2DDD5;
//       flex-shrink: 0;
//     }

//     .t3-header-photo {
//       width: 88px;
//       height: 88px;
//       border-radius: 4px;
//       object-fit: cover;
//       flex-shrink: 0;
//       filter: grayscale(10%);
//     }

//     .t3-header-photo-placeholder {
//       width: 88px;
//       height: 88px;
//       border-radius: 4px;
//       flex-shrink: 0;
//       background: #EDEAE4;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .t3-header-main {
//       flex: 1;
//     }

//     .t3-name {
//       font-family: 'DM Serif Display', serif;
//       font-size: 36px;
//       font-weight: 400;
//       letter-spacing: -0.5px;
//       color: #1C1C1A;
//       line-height: 1.1;
//       margin-bottom: 6px;
//     }

//     .t3-contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px 18px;
//       margin-top: 8px;
//     }

//     .t3-contact-item {
//       font-size: 11px;
//       color: #5A5A52;
//       font-weight: 400;
//       letter-spacing: 0.01em;
//     }

//     .t3-contact-link {
//       font-size: 11px;
//       color: #2C2C2A;
//       font-weight: 500;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//     }

//     /* ── BODY ── */
//     .t3-body {
//       display: flex;
//       flex: 1;
//       min-height: 0;
//     }

//     /* ── LEFT SIDEBAR ── */
//     .t3-sidebar {
//       width: 36%;
//       padding: 24px 20px 24px 36px;
//       background: #F3F0EA;
//       border-right: 1.5px solid #E2DDD5;
//       display: flex;
//       flex-direction: column;
//       gap: 0;
//     }

//     /* ── MAIN COLUMN ── */
//     .t3-main {
//       flex: 1;
//       padding: 24px 32px 24px 24px;
//       display: flex;
//       flex-direction: column;
//       gap: 0;
//     }

//     /* ── SECTION LABEL ── */
//     .t3-section {
//       margin-bottom: 18px;
//     }

//     .t3-section-label {
//       font-size: 9px;
//       font-weight: 600;
//       letter-spacing: 0.18em;
//       text-transform: uppercase;
//       color: #8A8A7A;
//       margin-bottom: 10px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #D8D4CB;
//     }

//     /* ── SUMMARY ── */
//     .t3-summary-text {
//       font-size: 12.5px;
//       color: #3A3A32;
//       line-height: 1.65;
//       font-weight: 300;
//     }

//     /* ── SKILLS PILLS ── */
//     .t3-skill-cat-title {
//       font-size: 10.5px;
//       font-weight: 600;
//       color: #3A3A32;
//       margin-bottom: 5px;
//     }

//     .t3-pills {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 5px;
//       margin-bottom: 8px;
//     }

//     .t3-pill {
//       display: inline-block;
//       background: #E8E4DC;
//       color: #3A3A32;
//       font-size: 10.5px;
//       padding: 3px 9px;
//       border-radius: 2px;
//       font-weight: 400;
//       letter-spacing: 0.01em;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     .t3-entry {
//       margin-bottom: 14px;
//       padding-bottom: 14px;
//       border-bottom: 1px solid #E8E4DC;
//     }

//     .t3-entry:last-child {
//       border-bottom: none;
//       margin-bottom: 0;
//       padding-bottom: 0;
//     }

//     .t3-entry-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 8px;
//       margin-bottom: 2px;
//     }

//     .t3-entry-title {
//       font-size: 13px;
//       font-weight: 600;
//       color: #1C1C1A;
//       line-height: 1.4;
//       font-family: 'DM Sans', sans-serif;
//     }

//     .t3-entry-date {
//       font-size: 10.5px;
//       font-weight: 500;
//       color: #8A8A7A;
//       white-space: nowrap;
//       padding-top: 2px;
//       letter-spacing: 0.02em;
//     }

//     .t3-entry-sub {
//       font-size: 11.5px;
//       color: #6B6B5E;
//       font-weight: 400;
//       margin-bottom: 4px;
//       font-style: italic;
//     }

//     .t3-entry-body {
//       font-size: 12.5px;
//       color: #3A3A32;
//       line-height: 1.55;
//       font-weight: 300;
//     }

//     .t3-tech-stack {
//       font-size: 10.5px;
//       color: #8A8A7A;
//       letter-spacing: 0.04em;
//       margin-bottom: 5px;
//       font-weight: 500;
//     }

//     .t3-entry-links {
//       display: flex;
//       gap: 10px;
//     }

//     .t3-link {
//       font-size: 10px;
//       color: #6B6B5E;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//       font-weight: 500;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t3-grade {
//       font-size: 10.5px;
//       color: #8A8A7A;
//       font-weight: 400;
//     }

//     /* ── CUSTOM SECTIONS ── */
//     .t3-custom-content {
//       font-size: 12.5px;
//       color: #3A3A32;
//       line-height: 1.6;
//       font-weight: 300;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//         margin: 0; padding: 0;
//       }
//       .t3-resume {
//         width: 100% !important;
//         margin: 0 !important;
//         box-shadow: none !important;
//       }
//       .t3-sidebar {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//       .t3-entry { page-break-inside: avoid; break-inside: avoid; }
//       .t3-section-label { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const photoHtml = base64Image
//       ? `<img src="${base64Image}" alt="Profile" class="t3-header-photo" />`
//       : `<div class="t3-header-photo-placeholder"></div>`;

//     const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country]
//       .filter(Boolean).join(", ");

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";
//       const isCategorized = isCategorizedSkills(skills);
//       if (isCategorized) {
//         return `
//           <div class="t3-section">
//             <div class="t3-section-label">Skills</div>
//             ${skills.map((category: any) => `
//               <div style="margin-bottom:10px">
//                 <div class="t3-skill-cat-title">${category.title}</div>
//                 <div class="t3-pills">
//                   ${category.skills.map((s: any) => `<span class="t3-pill">${s.name}</span>`).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>`;
//       }
//       return `
//         <div class="t3-section">
//           <div class="t3-section-label">Skills</div>
//           <div class="t3-pills">
//             ${skills.map((s: any) => `<span class="t3-pill">${s.name || s.skill}</span>`).join("")}
//           </div>
//         </div>`;
//     };

//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
//       return `
//         <div class="t3-section">
//           <div class="t3-section-label">Projects</div>
//           ${projects.map((p: any) => `
//             <div class="t3-entry">
//               <div class="t3-entry-header">
//                 <span class="t3-entry-title">${p.title || ""}</span>
//                 <div class="t3-entry-links">
//                   ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t3-link">Live</a>` : ""}
//                   ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t3-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${p.techStack?.length ? `<div class="t3-tech-stack">${p.techStack.join("  ·  ")}</div>` : ""}
//               ${p.description ? `<div class="t3-entry-body">${cleanQuillHTML(p.description)}</div>` : ""}
//             </div>
//           `).join("")}
//         </div>`;
//     };

//     const generateCustomHTML = () => {
//       if (!finalize || Array.isArray(finalize) || !Array.isArray(finalize.customSection)) return "";
//       const valid = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
//       if (!valid.length) return "";
//       return valid.map((s: any) => `
//         <div class="t3-section">
//           ${s.name ? `<div class="t3-section-label">${s.name}</div>` : ""}
//           ${s.description ? `<div class="t3-custom-content">${cleanQuillHTML(s.description)}</div>` : ""}
//         </div>`
//       ).join("");
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet"/>
//   <style>
//     * { margin:0; padding:0; box-sizing:border-box; }
//     body { margin:0; padding:0; background:#FAFAF8; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">

//   <div class="t3-header">
//     ${photoHtml}
//     <div class="t3-header-main">
//       <div class="t3-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       <div class="t3-contact-row">
//         ${addressStr ? `<span class="t3-contact-item">${addressStr}</span>` : ""}
//         ${contact?.email ? `<span class="t3-contact-item">${contact.email}</span>` : ""}
//         ${contact?.phone ? `<span class="t3-contact-item">${contact.phone}</span>` : ""}
//         ${formattedDob ? `<span class="t3-contact-item">${formattedDob}</span>` : ""}
//         ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t3-contact-link">LinkedIn</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t3-contact-link">GitHub</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t3-contact-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//   </div>

//   <div class="t3-body">

//     <div class="t3-sidebar">
//       ${summary ? `
//         <div class="t3-section">
//           <div class="t3-section-label">About</div>
//           <div class="t3-summary-text">${cleanQuillHTML(summary)}</div>
//         </div>` : ""}
//       ${generateSkillsHTML()}
//       ${generateCustomHTML()}
//     </div>

//     <div class="t3-main">
//       ${experiences?.length > 0 ? `
//         <div class="t3-section">
//           <div class="t3-section-label">Experience</div>
//           ${experiences.map((exp) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//             return `
//             <div class="t3-entry">
//               <div class="t3-entry-header">
//                 <span class="t3-entry-title">${exp.jobTitle || ""}</span>
//                 <span class="t3-entry-date">${start}${start && end ? " – " : ""}${end}</span>
//               </div>
//               ${exp.employer || exp.location ? `<div class="t3-entry-sub">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
//               ${exp.text ? `<div class="t3-entry-body">${cleanQuillHTML(exp.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//       ${generateProjectsHTML()}

//       ${educations?.length > 0 ? `
//         <div class="t3-section">
//           <div class="t3-section-label">Education</div>
//           ${educations.map((edu) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             return `
//             <div class="t3-entry">
//               <div class="t3-entry-header">
//                 <span class="t3-entry-title">${edu.degree || ""}</span>
//                 <span class="t3-entry-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}</span>
//               </div>
//               ${edu.schoolname || edu.location ? `<div class="t3-entry-sub">${[edu.schoolname, edu.location].filter(Boolean).join(" · ")}${grade ? ` · ${grade}` : ""}</div>` : ""}
//               ${edu.text ? `<div class="t3-entry-body">${cleanQuillHTML(edu.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : ""}
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
//       const url = URL.createObjectURL(res.data);
//       const a = document.createElement("a");
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

//       <div
//         className={`t3-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 4px 24px rgba(0,0,0,0.08)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t3-header">
//           {previewUrl ? (
//             <img src={previewUrl} alt="Profile" className="t3-header-photo" />
//           ) : null}
//           <div className="t3-header-main">
//             <div className="t3-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             <div className="t3-contact-row">
//               {[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).length > 0 && (
//                 <span className="t3-contact-item">
//                   {[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ")}
//                 </span>
//               )}
//               {contact?.email && <span className="t3-contact-item">{contact.email}</span>}
//               {contact?.phone && <span className="t3-contact-item">{contact.phone}</span>}
//               {dateOfBirth && <span className="t3-contact-item">{formatDateOfBirth(dateOfBirth)}</span>}
//               {linkedinUrl?.trim() && (
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                   target="_blank" rel="noreferrer" className="t3-contact-link">LinkedIn</a>
//               )}
//               {githubUrl?.trim() && (
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                   target="_blank" rel="noreferrer" className="t3-contact-link">GitHub</a>
//               )}
//               {portfolioUrl?.trim() && (
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                   target="_blank" rel="noreferrer" className="t3-contact-link">Portfolio</a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t3-body">

//           {/* SIDEBAR */}
//           <div className="t3-sidebar">
//             {summary && (
//               <div className="t3-section">
//                 <div className="t3-section-label">About</div>
//                 <div className="t3-summary-text"
//                   dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }} />
//               </div>
//             )}

//             {renderSkills()}

//             {finalize && !Array.isArray(finalize) &&
//               Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) && (
//                 <div>
//                   {finalize.customSection
//                     .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                     .map((section: any, i: number) => (
//                       <div key={section.id || i} className="t3-section">
//                         {section.name && <div className="t3-section-label">{section.name}</div>}
//                         {section.description && (
//                           <div className="t3-custom-content"
//                             dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}
//           </div>

//           {/* MAIN */}
//           <div className="t3-main">
//             {experiences?.length > 0 && (
//               <div className="t3-section">
//                 <div className="t3-section-label">Experience</div>
//                 {experiences.map((exp, index) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate
//                     ? formatMonthYear(exp.endDate, false)
//                     : exp.startDate ? "Present" : "";
//                   return (
//                     <div key={exp.id || index} className="t3-entry">
//                       <div className="t3-entry-header">
//                         <span className="t3-entry-title">{exp.jobTitle}</span>
//                         <span className="t3-entry-date">
//                           {start}{start && end ? " – " : ""}{end}
//                         </span>
//                       </div>
//                       {(exp.employer || exp.location) && (
//                         <div className="t3-entry-sub">
//                           {[exp.employer, exp.location].filter(Boolean).join(" · ")}
//                         </div>
//                       )}
//                       {exp.text && (
//                         <div className="t3-entry-body"
//                           dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {renderProjects()}

//             {educations?.length > 0 && (
//               <div className="t3-section">
//                 <div className="t3-section-label">Education</div>
//                 {educations.map((edu, index) => {
//                   const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return (
//                     <div key={edu.id || index} className="t3-entry">
//                       <div className="t3-entry-header">
//                         <span className="t3-entry-title">{edu.degree || ""}</span>
//                         <span className="t3-entry-date">
//                           {[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}
//                         </span>
//                       </div>
//                       {(edu.schoolname || edu.location) && (
//                         <div className="t3-entry-sub">
//                           {[edu.schoolname, edu.location].filter(Boolean).join(" · ")}
//                           {grade && ` · ${grade}`}
//                         </div>
//                       )}
//                       {edu.text && (
//                         <div className="t3-entry-body"
//                           dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />
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

// export default TemplateThree;