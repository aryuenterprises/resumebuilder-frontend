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

// const TemplateTwentyThree: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const isCategorizedSkills = (skillsData: any[]) => {
//     if (!skillsData || skillsData.length === 0) return false;
//     return skillsData[0]?.title !== undefined;
//   };

//   const renderSkills = () => {
//     if (!skills || skills.length === 0) return null;
//     const isCategorized = isCategorizedSkills(skills);

//     if (isCategorized) {
//       return (
//         <div className="t3-skills-block">
//           <div className="t3-section-label">Skills</div>
//           {skills.map((category: any) => (
//             <div key={category.id} style={{ marginBottom: "10px" }}>
//               <div className="t3-skill-cat-title">{category.title}</div>
//               <div className="t3-pill-row">
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
//       <div className="t3-skills-block">
//         <div className="t3-section-label">Skills</div>
//         <div className="t3-pill-row">
//           {skills.map((skill: any, i: number) => (
//             <span key={skill.id || i} className="t3-pill">{skill.name || skill.skill}</span>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;
//     return (
//       <div className="t3-section-block">
//         <div className="t3-section-label">Projects</div>
//         {projects.map((project: any, i: number) => (
//           <div key={project.id || i} className="t3-entry">
//             <div className="t3-entry-head">
//               <span className="t3-entry-title">{project.title}</span>
//               <div className="t3-project-links">
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                     target="_blank" rel="noreferrer" className="t3-link-badge"
//                   >↗ Live</a>
//                 )}
//                 {project.githubUrl && (
//                   <a
//                     href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                     target="_blank" rel="noreferrer" className="t3-link-badge"
//                   >↗ GitHub</a>
//                 )}
//               </div>
//             </div>
//             {project.techStack?.length > 0 && (
//               <div className="t3-tech">{project.techStack.join(" · ")}</div>
//             )}
//             {project.description && (
//               <div className="t3-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }} />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ============================================================
//      STYLES
//   ============================================================ */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

//     .t3-resume {
//       width: 210mm;
//       min-height: 297mm;
//       box-sizing: border-box;
//       background: #FAFAF8;
//       font-family: 'DM Sans', sans-serif;
//       font-size: 12.5px;
//       line-height: 1.55;
//       color: #1C1C1C;
//       display: flex;
//       flex-direction: column;
//       position: relative;
//     }

//     .t3-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       min-height: auto;
//       overflow: hidden;
//     }

//     /* Resets */
//     .t3-resume *, .t3-resume p, .t3-resume div, .t3-resume span {
//       box-sizing: border-box;
//       margin: 0; padding: 0;
//     }
//     .t3-resume ul, .t3-resume ol {
//       margin: 0 0 0 18px !important;
//       padding: 0 !important;
//     }
//     .t3-resume li {
//       font-size: 12.5px !important;
//       line-height: 1.55 !important;
//       margin-bottom: 2px !important;
//     }
//     .t3-resume ul { list-style-type: disc !important; }
//     .t3-resume ol { list-style-type: decimal !important; }
//     .t3-resume strong, .t3-resume b { font-weight: 600 !important; }
//     .t3-resume em, .t3-resume i { font-style: italic !important; }
//     .t3-resume u { text-decoration: underline !important; }

//     /* ── ACCENT SIDEBAR ── */
//     .t3-accent-bar {
//       position: absolute;
//       left: 0; top: 0; bottom: 0;
//       width: 5px;
//       background: linear-gradient(180deg, #0A0A0A 0%, #2D2D2D 50%, #0A0A0A 100%);
//     }

//     /* ── HEADER ── */
//     .t3-header {
//       padding: 28px 32px 22px 36px;
//       border-bottom: 1px solid #E0DDD8;
//       display: flex;
//       align-items: flex-start;
//       gap: 20px;
//       flex-shrink: 0;
//       background: #FAFAF8;
//     }

//     .t3-header-photo {
//       width: 86px;
//       height: 86px;
//       border-radius: 4px;
//       object-fit: cover;
//       flex-shrink: 0;
//       filter: grayscale(15%);
//     }

//     .t3-header-info {
//       flex: 1;
//     }

//     .t3-name {
//       font-family: 'DM Serif Display', serif;
//       font-size: 30px;
//       font-weight: 400;
//       color: #0A0A0A;
//       letter-spacing: -0.3px;
//       line-height: 1.1;
//       text-transform: capitalize;
//       margin-bottom: 6px;
//     }

//     .t3-contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 0 20px;
//     }

//     .t3-contact-item {
//       font-size: 11px;
//       color: #555;
//       font-weight: 400;
//       white-space: nowrap;
//       line-height: 1.8;
//     }

//     .t3-contact-item a {
//       color: #0A0A0A;
//       text-decoration: none;
//       font-weight: 500;
//       border-bottom: 1px solid #C0BDB8;
//     }

//     .t3-dob {
//       font-size: 11px;
//       color: #555;
//       line-height: 1.8;
//     }

//     /* ── BODY ── */
//     .t3-body {
//       display: flex;
//       flex: 1;
//       min-height: 0;
//     }

//     /* ── LEFT COLUMN ── */
//     .t3-left {
//       width: 38%;
//       padding: 20px 18px 20px 36px;
//       border-right: 1px solid #E0DDD8;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t3-right {
//       width: 62%;
//       padding: 20px 32px 20px 22px;
//     }

//     /* ── SECTION LABEL ── */
//     .t3-section-label {
//       font-size: 9.5px;
//       font-weight: 600;
//       letter-spacing: 0.18em;
//       text-transform: uppercase;
//       color: #888;
//       margin-bottom: 8px;
//       margin-top: 18px;
//       padding-bottom: 5px;
//       border-bottom: 1px solid #E0DDD8;
//       font-family: 'DM Sans', sans-serif;
//     }

//     .t3-section-label:first-child { margin-top: 0; }

//     .t3-section-block { margin-bottom: 4px; }

//     /* ── SUMMARY ── */
//     .t3-summary-text {
//       font-size: 12.5px;
//       color: #333;
//       line-height: 1.65;
//       font-style: italic;
//       font-family: 'DM Serif Display', serif;
//       font-weight: 400;
//     }

//     /* ── SKILLS ── */
//     .t3-skills-block { margin-bottom: 4px; }

//     .t3-skill-cat-title {
//       font-size: 11px;
//       font-weight: 600;
//       color: #1C1C1C;
//       margin-bottom: 4px;
//     }

//     .t3-pill-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 4px;
//       margin-bottom: 8px;
//     }

//     .t3-pill {
//       display: inline-block;
//       background: #F0EDE8;
//       color: #333;
//       font-size: 10.5px;
//       padding: 2px 9px;
//       border-radius: 2px;
//       font-weight: 400;
//       letter-spacing: 0.01em;
//     }

//     /* ── ENTRY BLOCKS ── */
//     .t3-entry {
//       margin-bottom: 12px;
//       padding-bottom: 12px;
//       border-bottom: 1px dashed #E8E5E0;
//     }

//     .t3-entry:last-child {
//       border-bottom: none;
//       margin-bottom: 0;
//       padding-bottom: 0;
//     }

//     .t3-entry-head {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       gap: 8px;
//       margin-bottom: 1px;
//       flex-wrap: wrap;
//     }

//     .t3-entry-title {
//       font-family: 'DM Serif Display', serif;
//       font-size: 13.5px;
//       font-weight: 400;
//       color: #0A0A0A;
//       line-height: 1.3;
//       flex: 1;
//     }

//     .t3-entry-date {
//       font-size: 10.5px;
//       font-weight: 500;
//       color: #888;
//       white-space: nowrap;
//       letter-spacing: 0.02em;
//     }

//     .t3-entry-sub {
//       font-size: 11px;
//       color: #555;
//       margin-bottom: 4px;
//       line-height: 1.5;
//     }

//     .t3-entry-sub strong {
//       color: #1C1C1C;
//       font-weight: 500 !important;
//     }

//     .t3-entry-body {
//       font-size: 12px;
//       color: #3D3D3D;
//       line-height: 1.6;
//       margin-top: 3px;
//     }

//     /* ── GRADE BADGE ── */
//     .t3-grade {
//       display: inline-block;
//       background: #0A0A0A;
//       color: #FAFAF8;
//       font-size: 9.5px;
//       font-weight: 500;
//       padding: 1px 7px;
//       border-radius: 2px;
//       letter-spacing: 0.04em;
//       margin-left: 6px;
//     }

//     /* ── PROJECT LINKS ── */
//     .t3-project-links { display: flex; gap: 8px; flex-shrink: 0; }

//     .t3-link-badge {
//       font-size: 10px;
//       color: #555;
//       text-decoration: none;
//       border: 1px solid #D0CCC6;
//       padding: 1px 7px;
//       border-radius: 2px;
//       font-weight: 500;
//       white-space: nowrap;
//     }

//     .t3-tech {
//       font-size: 10.5px;
//       color: #888;
//       margin: 3px 0 5px;
//       font-style: italic;
//     }

//     /* ── CUSTOM SECTION ── */
//     .t3-custom-content {
//       font-size: 12px;
//       color: #3D3D3D;
//       line-height: 1.6;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t3-resume { width: 100% !important; box-shadow: none !important; }
//       .t3-entry { page-break-inside: avoid; break-inside: avoid; }
//       .t3-section-label { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ============================================================
//      HTML GENERATION
//   ============================================================ */
//   const generateHTML = () => {
//     const photoHtml = base64Image
//       ? `<img src="${base64Image}" alt="Profile" class="t3-header-photo" />`
//       : "";

//     const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country]
//       .filter(Boolean).join(", ");

//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const contactItems = [
//       addressStr ? `<span class="t3-contact-item">${addressStr}</span>` : "",
//       contact?.email ? `<span class="t3-contact-item">${contact.email}</span>` : "",
//       contact?.phone ? `<span class="t3-contact-item">${contact.phone}</span>` : "",
//       formattedDob ? `<span class="t3-contact-item">${formattedDob}</span>` : "",
//       linkedinUrl?.trim() ? `<span class="t3-contact-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : "",
//       githubUrl?.trim() ? `<span class="t3-contact-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : "",
//       portfolioUrl?.trim() ? `<span class="t3-contact-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : "",
//     ].filter(Boolean).join("");

//     const skillsHtml = (() => {
//       if (!skills?.length) return "";
//       const isCat = isCategorizedSkills(skills);
//       if (isCat) {
//         return `<div class="t3-skills-block">
//           <div class="t3-section-label">Skills</div>
//           ${skills.map((cat: any) => `
//             <div style="margin-bottom:10px">
//               <div class="t3-skill-cat-title">${cat.title}</div>
//               <div class="t3-pill-row">${cat.skills.map((s: any) => `<span class="t3-pill">${s.name}</span>`).join("")}</div>
//             </div>`).join("")}
//         </div>`;
//       }
//       return `<div class="t3-skills-block">
//         <div class="t3-section-label">Skills</div>
//         <div class="t3-pill-row">${skills.map((s: any) => `<span class="t3-pill">${s.name || s.skill}</span>`).join("")}</div>
//       </div>`;
//     })();

//     const customHtml = (() => {
//       if (!finalize || Array.isArray(finalize) || !Array.isArray(finalize.customSection)) return "";
//       const valid = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
//       if (!valid.length) return "";
//       return valid.map((s: any) => `
//         <div class="t3-section-block" style="margin-bottom:8px">
//           ${s.name ? `<div class="t3-section-label">${s.name}</div>` : ""}
//           ${s.description ? `<div class="t3-custom-content">${cleanQuillHTML(s.description)}</div>` : ""}
//         </div>`).join("");
//     })();

//     const expHtml = experiences?.length > 0 ? `
//       <div class="t3-section-block">
//         <div class="t3-section-label">Experience</div>
//         ${experiences.map((exp: any) => {
//           const start = formatMonthYear(exp.startDate, false);
//           const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//           return `<div class="t3-entry">
//             <div class="t3-entry-head">
//               <span class="t3-entry-title">${exp.jobTitle || ""}</span>
//               <span class="t3-entry-date">${start}${start && end ? " – " : ""}${end}</span>
//             </div>
//             ${exp.employer || exp.location ? `<div class="t3-entry-sub"><strong>${exp.employer || ""}</strong>${exp.employer && exp.location ? " · " : ""}${exp.location || ""}</div>` : ""}
//             ${exp.text ? `<div class="t3-entry-body">${cleanQuillHTML(exp.text)}</div>` : ""}
//           </div>`;
//         }).join("")}
//       </div>` : "";

//     const projHtml = projects?.length > 0 ? `
//       <div class="t3-section-block">
//         <div class="t3-section-label">Projects</div>
//         ${projects.map((p: any) => `
//           <div class="t3-entry">
//             <div class="t3-entry-head">
//               <span class="t3-entry-title">${p.title || ""}</span>
//               <div class="t3-project-links">
//                 ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t3-link-badge">↗ Live</a>` : ""}
//                 ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t3-link-badge">↗ GitHub</a>` : ""}
//               </div>
//             </div>
//             ${p.techStack?.length ? `<div class="t3-tech">${p.techStack.join(" · ")}</div>` : ""}
//             ${p.description ? `<div class="t3-entry-body">${cleanQuillHTML(p.description)}</div>` : ""}
//           </div>`).join("")}
//       </div>` : "";

//     const eduHtml = educations?.length > 0 ? `
//       <div class="t3-section-block">
//         <div class="t3-section-label">Education</div>
//         ${educations.map((edu: any) => {
//           const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//           const dateStr = [edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ");
//           return `<div class="t3-entry">
//             <div class="t3-entry-head">
//               <span class="t3-entry-title">${edu.degree || ""}</span>
//               ${dateStr ? `<span class="t3-entry-date">${dateStr}</span>` : ""}
//             </div>
//             <div class="t3-entry-sub">
//               ${[edu.schoolname, edu.location].filter(Boolean).join(" · ")}
//               ${grade ? `<span class="t3-grade">${grade}</span>` : ""}
//             </div>
//             ${edu.text ? `<div class="t3-entry-body">${cleanQuillHTML(edu.text)}</div>` : ""}
//           </div>`;
//         }).join("")}
//       </div>` : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//   <style>
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     body { background: white; font-family: 'DM Sans', sans-serif; font-size: 12.5px; line-height: 1.55; color: #1C1C1C; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">
//   <div class="t3-accent-bar"></div>

//   <div class="t3-header">
//     ${photoHtml}
//     <div class="t3-header-info">
//       <div class="t3-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       <div class="t3-contact-row">${contactItems}</div>
//     </div>
//   </div>

//   <div class="t3-body">
//     <div class="t3-left">
//       ${summary ? `<div class="t3-section-block">
//         <div class="t3-section-label">Profile</div>
//         <div class="t3-summary-text">${cleanQuillHTML(summary)}</div>
//       </div>` : ""}
//       ${skillsHtml}
//       ${customHtml}
//     </div>

//     <div class="t3-right">
//       ${expHtml}
//       ${projHtml}
//       ${eduHtml}
//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ============================================================
//      PDF DOWNLOAD
//   ============================================================ */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html = generateHTML();
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" }
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

//   /* ============================================================
//      JSX PREVIEW
//   ============================================================ */
//   return (
//     <>
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-zinc-900 text-2xl md:text-base hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//         >
//           Download Resume
//         </motion.button>
//       </div>

//       <div
//         className={`t3-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 4px 40px rgba(0,0,0,0.10)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* ACCENT BAR */}
//         <div className="t3-accent-bar" />

//         {/* HEADER */}
//         <div className="t3-header">
//           {previewUrl && (
//             <img src={previewUrl} alt="Profile" className="t3-header-photo" />
//           )}
//           <div className="t3-header-info">
//             <div className="t3-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             <div className="t3-contact-row">
//               {[contact?.address, contact?.city, contact?.postCode, contact?.country]
//                 .filter(Boolean).length > 0 && (
//                 <span className="t3-contact-item">
//                   {[contact?.address, contact?.city, contact?.postCode, contact?.country]
//                     .filter(Boolean).join(", ")}
//                 </span>
//               )}
//               {contact?.email && <span className="t3-contact-item">{contact.email}</span>}
//               {contact?.phone && <span className="t3-contact-item">{contact.phone}</span>}
//               {dateOfBirth && <span className="t3-dob">{formatDateOfBirth(dateOfBirth)}</span>}
//               {linkedinUrl?.trim() && (
//                 <span className="t3-contact-item">
//                   <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                     target="_blank" rel="noreferrer">LinkedIn</a>
//                 </span>
//               )}
//               {githubUrl?.trim() && (
//                 <span className="t3-contact-item">
//                   <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                     target="_blank" rel="noreferrer">GitHub</a>
//                 </span>
//               )}
//               {portfolioUrl?.trim() && (
//                 <span className="t3-contact-item">
//                   <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                     target="_blank" rel="noreferrer">Portfolio</a>
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t3-body">
//           {/* LEFT */}
//           <div className="t3-left">
//             {summary && (
//               <div className="t3-section-block">
//                 <div className="t3-section-label">Profile</div>
//                 <div
//                   className="t3-summary-text"
//                   dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//                 />
//               </div>
//             )}

//             {renderSkills()}

//             {/* CUSTOM SECTIONS */}
//             {finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) && (
//                 <div>
//                   {finalize.customSection
//                     .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                     .map((section: any, i: number) => (
//                       <div key={section.id || i} className="t3-section-block" style={{ marginBottom: "8px" }}>
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

//           {/* RIGHT */}
//           <div className="t3-right">
//             {experiences?.length > 0 && (
//               <div className="t3-section-block">
//                 <div className="t3-section-label">Experience</div>
//                 {experiences.map((exp: any, index: number) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate
//                     ? formatMonthYear(exp.endDate, false)
//                     : exp.startDate ? "Present" : "";
//                   return (
//                     <div key={exp.id || index} className="t3-entry">
//                       <div className="t3-entry-head">
//                         <span className="t3-entry-title">{exp.jobTitle || ""}</span>
//                         <span className="t3-entry-date">
//                           {start}{start && end ? " – " : ""}{end}
//                         </span>
//                       </div>
//                       {(exp.employer || exp.location) && (
//                         <div className="t3-entry-sub">
//                           {exp.employer && <strong>{exp.employer}</strong>}
//                           {exp.employer && exp.location && " · "}
//                           {exp.location}
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
//               <div className="t3-section-block">
//                 <div className="t3-section-label">Education</div>
//                 {educations.map((edu: any, index: number) => {
//                   const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return (
//                     <div key={edu.id || index} className="t3-entry">
//                       <div className="t3-entry-head">
//                         <span className="t3-entry-title">{edu.degree || ""}</span>
//                         <span className="t3-entry-date">
//                           {[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}
//                         </span>
//                       </div>
//                       <div className="t3-entry-sub">
//                         {[edu.schoolname, edu.location].filter(Boolean).join(" · ")}
//                         {grade && <span className="t3-grade">{grade}</span>}
//                       </div>
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

// export default TemplateTwentyThree;