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

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
//       if (!contact.photo) { setPreviewUrl(null); setBase64Image(null); return; }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => { const b = reader.result as string; setBase64Image(b); setPreviewUrl(b); };
//             reader.readAsDataURL(blob);
//           } else {
//             const url = `${API_URL}/api/uploads/photos/${contact.photo}`;
//             setPreviewUrl(url); setBase64Image(url);
//           }
//         } else if (contact.photo && typeof contact.photo === "object" && "size" in contact.photo) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           setPreviewUrl(objectUrl);
//           const reader = new FileReader();
//           reader.onloadend = () => setBase64Image(reader.result as string);
//           reader.readAsDataURL(contact.photo as Blob);
//         }
//       } catch (e) { console.error(e); }
//     };
//     processImage();
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact.photo]);

//   const isCategorizedSkills = (s: any[]) => s?.length > 0 && s[0]?.title !== undefined;

//   const renderSkills = () => {
//     if (!skills?.length) return null;
//     const isCat = isCategorizedSkills(skills);
//     if (isCat) {
//       return (
//         <div className="t4-block">
//           <div className="t4-section-title"><span>Skills</span></div>
//           {skills.map((cat: any) => (
//             <div key={cat.id} style={{ marginBottom: "10px" }}>
//               <div className="t4-skill-cat">{cat.title}</div>
//               <div className="t4-pill-row">
//                 {cat.skills.map((sk: any) => <span key={sk.id} className="t4-pill">{sk.name}</span>)}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return (
//       <div className="t4-block">
//         <div className="t4-section-title"><span>Skills</span></div>
//         <div className="t4-pill-row">
//           {skills.map((sk: any, i: number) => <span key={sk.id || i} className="t4-pill">{sk.name || sk.skill}</span>)}
//         </div>
//       </div>
//     );
//   };

//   const renderProjects = () => {
//     if (!projects?.length) return null;
//     return (
//       <div className="t4-block">
//         <div className="t4-section-title"><span>Projects</span></div>
//         {projects.map((p: any, i: number) => (
//           <div key={p.id || i} className="t4-entry">
//             <div className="t4-entry-row">
//               <span className="t4-entry-role">{p.title}</span>
//               <div className="t4-proj-links">
//                 {p.liveUrl && <a href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} target="_blank" rel="noreferrer" className="t4-ext-link">Live ↗</a>}
//                 {p.githubUrl && <a href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`} target="_blank" rel="noreferrer" className="t4-ext-link">GitHub ↗</a>}
//               </div>
//             </div>
//             {p.techStack?.length > 0 && <div className="t4-tech">{p.techStack.join(" · ")}</div>}
//             {p.description && <div className="t4-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(p.description) }} />}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ── CSS ── */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

//     .t4-resume {
//       width: 210mm;
//       min-height: 297mm;
//       box-sizing: border-box;
//       background: #FFFFFF;
//       font-family: 'Inter', sans-serif;
//       font-size: 12px;
//       line-height: 1.6;
//       color: #1A1A2E;
//       display: flex;
//       flex-direction: column;
//       position: relative;
//     }

//     .t4-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       overflow: hidden;
//     }

//     /* resets */
//     .t4-resume p,.t4-resume div,.t4-resume span,.t4-resume i,.t4-resume a {
//       margin:0;padding:0;font-family:'Inter',sans-serif;line-height:1.6;
//     }
//     .t4-resume ul,.t4-resume ol { margin:0 0 0 18px!important;padding:0!important; }
//     .t4-resume li { margin-bottom:2px!important;padding:0!important;line-height:1.6!important;font-size:12px!important; }
//     .t4-resume ul { list-style-type:disc!important; }
//     .t4-resume ol { list-style-type:decimal!important; }
//     .t4-resume strong,.t4-resume b { font-weight:600!important; }
//     .t4-resume em,.t4-resume i { font-style:italic!important; }
//     .t4-resume u { text-decoration:underline!important; }

//     /* ── HEADER ── */
//     .t4-header {
//       background: #0F172A;
//       padding: 28px 32px 24px 32px;
//       display: flex;
//       align-items: center;
//       gap: 22px;
//       position: relative;
//       overflow: hidden;
//       flex-shrink: 0;
//     }

//     /* decorative circles */
//     .t4-header::before {
//       content: '';
//       position: absolute;
//       right: -40px; top: -60px;
//       width: 200px; height: 200px;
//       border-radius: 50%;
//       background: rgba(99,102,241,0.15);
//       pointer-events: none;
//     }
//     .t4-header::after {
//       content: '';
//       position: absolute;
//       right: 60px; bottom: -80px;
//       width: 160px; height: 160px;
//       border-radius: 50%;
//       background: rgba(99,102,241,0.08);
//       pointer-events: none;
//     }

//     .t4-header-photo {
//       width: 82px;
//       height: 82px;
//       border-radius: 50%;
//       object-fit: cover;
//       border: 2.5px solid rgba(99,102,241,0.6);
//       flex-shrink: 0;
//       position: relative;
//       z-index: 1;
//     }

//     .t4-header-info {
//       flex: 1;
//       position: relative;
//       z-index: 1;
//     }

//     .t4-name {
//       font-family: 'Syne', sans-serif;
//       font-size: 30px;
//       font-weight: 800;
//       color: #FFFFFF;
//       letter-spacing: -0.3px;
//       line-height: 1.1;
//       margin-bottom: 10px;
//     }

//     .t4-contact-grid {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 5px 20px;
//     }

//     .t4-contact-chip {
//       font-size: 10.5px;
//       color: #94A3B8;
//       font-weight: 400;
//       letter-spacing: 0.01em;
//     }

//     .t4-contact-link {
//       font-size: 10.5px;
//       color: #A5B4FC;
//       font-weight: 500;
//       text-decoration: none;
//       letter-spacing: 0.01em;
//     }

//     .t4-contact-link:hover { text-decoration: underline; }

//     /* ── COLORED STRIPE under header ── */
//     .t4-stripe {
//       height: 4px;
//       background: linear-gradient(90deg, #6366F1 0%, #8B5CF6 40%, #06B6D4 100%);
//       flex-shrink: 0;
//     }

//     /* ── BODY ── */
//     .t4-body {
//       display: flex;
//       flex: 1;
//       min-height: 0;
//     }

//     /* ── SIDEBAR ── */
//     .t4-sidebar {
//       width: 34%;
//       padding: 22px 18px 22px 28px;
//       border-right: 1px solid #E2E8F0;
//       background: #F8FAFC;
//     }

//     /* ── MAIN ── */
//     .t4-main {
//       flex: 1;
//       padding: 22px 28px 22px 22px;
//     }

//     /* ── BLOCK spacing ── */
//     .t4-block {
//       margin-bottom: 20px;
//     }

//     /* ── SECTION TITLE ── */
//     .t4-section-title {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       margin-bottom: 10px;
//     }

//     .t4-section-title span {
//       font-family: 'Syne', sans-serif;
//       font-size: 10px;
//       font-weight: 700;
//       letter-spacing: 0.14em;
//       text-transform: uppercase;
//       color: #6366F1;
//     }

//     .t4-section-title::after {
//       content: '';
//       flex: 1;
//       height: 1px;
//       background: #E2E8F0;
//     }

//     /* ── SUMMARY ── */
//     .t4-summary {
//       font-size: 12px;
//       color: #475569;
//       line-height: 1.7;
//       font-weight: 300;
//     }

//     /* ── SKILLS ── */
//     .t4-skill-cat {
//       font-size: 10.5px;
//       font-weight: 600;
//       color: #334155;
//       margin-bottom: 5px;
//       letter-spacing: 0.02em;
//     }

//     .t4-pill-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 5px;
//       margin-bottom: 4px;
//     }

//     .t4-pill {
//       background: #EEF2FF;
//       color: #4338CA;
//       font-size: 10.5px;
//       font-weight: 500;
//       padding: 2px 9px;
//       border-radius: 99px;
//       letter-spacing: 0.01em;
//     }

//     /* ── EXPERIENCE ENTRY ── */
//     .t4-entry {
//       margin-bottom: 14px;
//       padding-bottom: 14px;
//       border-bottom: 1px solid #F1F5F9;
//     }

//     .t4-entry:last-child {
//       border-bottom: none;
//       margin-bottom: 0;
//       padding-bottom: 0;
//     }

//     .t4-entry-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 8px;
//       margin-bottom: 1px;
//     }

//     .t4-entry-role {
//       font-family: 'Syne', sans-serif;
//       font-size: 13px;
//       font-weight: 700;
//       color: #0F172A;
//       line-height: 1.3;
//     }

//     .t4-entry-date {
//       font-size: 10.5px;
//       color: #94A3B8;
//       font-weight: 500;
//       white-space: nowrap;
//       padding-top: 2px;
//     }

//     .t4-entry-org {
//       font-size: 11.5px;
//       color: #6366F1;
//       font-weight: 500;
//       margin-bottom: 4px;
//     }

//     .t4-entry-body {
//       font-size: 12px;
//       color: #475569;
//       line-height: 1.65;
//       font-weight: 300;
//     }

//     /* ── EDUCATION degree badge ── */
//     .t4-edu-degree {
//       font-family: 'Syne', sans-serif;
//       font-size: 13px;
//       font-weight: 700;
//       color: #0F172A;
//     }

//     .t4-edu-school {
//       font-size: 11.5px;
//       color: #6366F1;
//       font-weight: 500;
//       margin-bottom: 3px;
//     }

//     .t4-grade-badge {
//       display: inline-block;
//       background: #F0FDF4;
//       color: #16A34A;
//       font-size: 10px;
//       font-weight: 600;
//       padding: 1px 7px;
//       border-radius: 4px;
//       margin-left: 6px;
//       vertical-align: middle;
//     }

//     /* ── PROJECT links ── */
//     .t4-proj-links { display: flex; gap: 10px; }
//     .t4-ext-link {
//       font-size: 10px;
//       color: #6366F1;
//       font-weight: 500;
//       text-decoration: none;
//     }
//     .t4-ext-link:hover { text-decoration: underline; }

//     .t4-tech {
//       font-size: 10.5px;
//       color: #94A3B8;
//       margin-bottom: 4px;
//       font-weight: 400;
//       letter-spacing: 0.03em;
//     }

//     /* ── CUSTOM SECTION ── */
//     .t4-custom-body {
//       font-size: 12px;
//       color: #475569;
//       line-height: 1.65;
//       font-weight: 300;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       body { -webkit-print-color-adjust:exact;print-color-adjust:exact;margin:0;padding:0; }
//       .t4-resume { width:100%!important;margin:0!important;box-shadow:none!important; }
//       .t4-header { -webkit-print-color-adjust:exact;print-color-adjust:exact; }
//       .t4-stripe { -webkit-print-color-adjust:exact;print-color-adjust:exact; }
//       .t4-sidebar { -webkit-print-color-adjust:exact;print-color-adjust:exact; }
//       .t4-entry { page-break-inside:avoid;break-inside:avoid; }
//       .t4-section-title { page-break-after:avoid;break-after:avoid; }
//     }
//   `;

//   /* ── HTML for PDF ── */
//   const generateHTML = () => {
//     const photoHtml = base64Image
//       ? `<img src="${base64Image}" alt="Profile" class="t4-header-photo" />`
//       : "";

//     const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ");
//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const skillsHTML = () => {
//       if (!skills?.length) return "";
//       const isCat = isCategorizedSkills(skills);
//       if (isCat) return `
//         <div class="t4-block">
//           <div class="t4-section-title"><span>Skills</span></div>
//           ${skills.map((cat: any) => `
//             <div style="margin-bottom:10px">
//               <div class="t4-skill-cat">${cat.title}</div>
//               <div class="t4-pill-row">${cat.skills.map((sk: any) => `<span class="t4-pill">${sk.name}</span>`).join("")}</div>
//             </div>`).join("")}
//         </div>`;
//       return `
//         <div class="t4-block">
//           <div class="t4-section-title"><span>Skills</span></div>
//           <div class="t4-pill-row">${skills.map((sk: any) => `<span class="t4-pill">${sk.name || sk.skill}</span>`).join("")}</div>
//         </div>`;
//     };

//     const projectsHTML = () => {
//       if (!projects?.length) return "";
//       return `
//         <div class="t4-block">
//           <div class="t4-section-title"><span>Projects</span></div>
//           ${projects.map((p: any) => `
//             <div class="t4-entry">
//               <div class="t4-entry-row">
//                 <span class="t4-entry-role">${p.title || ""}</span>
//                 <div class="t4-proj-links">
//                   ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t4-ext-link">Live ↗</a>` : ""}
//                   ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t4-ext-link">GitHub ↗</a>` : ""}
//                 </div>
//               </div>
//               ${p.techStack?.length ? `<div class="t4-tech">${p.techStack.join(" · ")}</div>` : ""}
//               ${p.description ? `<div class="t4-entry-body">${cleanQuillHTML(p.description)}</div>` : ""}
//             </div>`).join("")}
//         </div>`;
//     };

//     const customHTML = () => {
//       if (!finalize || Array.isArray(finalize) || !Array.isArray(finalize.customSection)) return "";
//       const valid = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
//       if (!valid.length) return "";
//       return valid.map((s: any) => `
//         <div class="t4-block">
//           ${s.name ? `<div class="t4-section-title"><span>${s.name}</span></div>` : ""}
//           ${s.description ? `<div class="t4-custom-body">${cleanQuillHTML(s.description)}</div>` : ""}
//         </div>`).join("");
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//   <style>*{margin:0;padding:0;box-sizing:border-box;}body{margin:0;padding:0;background:#fff;}${styles}</style>
// </head>
// <body>
// <div class="t4-resume">

//   <div class="t4-header">
//     ${photoHtml}
//     <div class="t4-header-info">
//       <div class="t4-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       <div class="t4-contact-grid">
//         ${addressStr ? `<span class="t4-contact-chip">${addressStr}</span>` : ""}
//         ${contact?.email ? `<span class="t4-contact-chip">${contact.email}</span>` : ""}
//         ${contact?.phone ? `<span class="t4-contact-chip">${contact.phone}</span>` : ""}
//         ${formattedDob ? `<span class="t4-contact-chip">${formattedDob}</span>` : ""}
//         ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t4-contact-link">LinkedIn ↗</a>` : ""}
//         ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t4-contact-link">GitHub ↗</a>` : ""}
//         ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t4-contact-link">Portfolio ↗</a>` : ""}
//       </div>
//     </div>
//   </div>
//   <div class="t4-stripe"></div>

//   <div class="t4-body">

//     <div class="t4-sidebar">
//       ${summary ? `
//         <div class="t4-block">
//           <div class="t4-section-title"><span>About</span></div>
//           <div class="t4-summary">${cleanQuillHTML(summary)}</div>
//         </div>` : ""}
//       ${skillsHTML()}
//       ${customHTML()}
//     </div>

//     <div class="t4-main">
//       ${experiences?.length > 0 ? `
//         <div class="t4-block">
//           <div class="t4-section-title"><span>Experience</span></div>
//           ${experiences.map((exp) => {
//             const start = formatMonthYear(exp.startDate, false);
//             const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//             return `
//             <div class="t4-entry">
//               <div class="t4-entry-row">
//                 <span class="t4-entry-role">${exp.jobTitle || ""}</span>
//                 <span class="t4-entry-date">${start}${start && end ? " – " : ""}${end}</span>
//               </div>
//               ${exp.employer || exp.location ? `<div class="t4-entry-org">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
//               ${exp.text ? `<div class="t4-entry-body">${cleanQuillHTML(exp.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//       ${projectsHTML()}

//       ${educations?.length > 0 ? `
//         <div class="t4-block">
//           <div class="t4-section-title"><span>Education</span></div>
//           ${educations.map((edu) => {
//             const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             return `
//             <div class="t4-entry">
//               <div class="t4-entry-row">
//                 <span class="t4-edu-degree">${edu.degree || ""}${grade ? `<span class="t4-grade-badge">${grade}</span>` : ""}</span>
//                 <span class="t4-entry-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}</span>
//               </div>
//               ${edu.schoolname || edu.location ? `<div class="t4-edu-school">${[edu.schoolname, edu.location].filter(Boolean).join(" · ")}</div>` : ""}
//               ${edu.text ? `<div class="t4-entry-body">${cleanQuillHTML(edu.text)}</div>` : ""}
//             </div>`;
//           }).join("")}
//         </div>` : ""}
//     </div>

//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ── DOWNLOAD ── */
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
//     } catch (e) {
//       console.error(e);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   /* ── JSX ── */
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
//         className={`t4-resume ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 4px 32px rgba(15,23,42,0.12)" : "" }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t4-header">
//           {previewUrl && <img src={previewUrl} alt="Profile" className="t4-header-photo" />}
//           <div className="t4-header-info">
//             <div className="t4-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
//             <div className="t4-contact-grid">
//               {[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).length > 0 && (
//                 <span className="t4-contact-chip">
//                   {[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ")}
//                 </span>
//               )}
//               {contact?.email && <span className="t4-contact-chip">{contact.email}</span>}
//               {contact?.phone && <span className="t4-contact-chip">{contact.phone}</span>}
//               {dateOfBirth && <span className="t4-contact-chip">{formatDateOfBirth(dateOfBirth)}</span>}
//               {linkedinUrl?.trim() && (
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t4-contact-link">LinkedIn ↗</a>
//               )}
//               {githubUrl?.trim() && (
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer" className="t4-contact-link">GitHub ↗</a>
//               )}
//               {portfolioUrl?.trim() && (
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer" className="t4-contact-link">Portfolio ↗</a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* GRADIENT STRIPE */}
//         <div className="t4-stripe" />

//         {/* BODY */}
//         <div className="t4-body">

//           {/* SIDEBAR */}
//           <div className="t4-sidebar">
//             {summary && (
//               <div className="t4-block">
//                 <div className="t4-section-title"><span>About</span></div>
//                 <div className="t4-summary" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }} />
//               </div>
//             )}

//             {renderSkills()}

//             {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) && (
//                 finalize.customSection
//                   .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                   .map((section: any, i: number) => (
//                     <div key={section.id || i} className="t4-block">
//                       {section.name && <div className="t4-section-title"><span>{section.name}</span></div>}
//                       {section.description && (
//                         <div className="t4-custom-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />
//                       )}
//                     </div>
//                   ))
//               )}
//           </div>

//           {/* MAIN */}
//           <div className="t4-main">
//             {experiences?.length > 0 && (
//               <div className="t4-block">
//                 <div className="t4-section-title"><span>Experience</span></div>
//                 {experiences.map((exp, i) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//                   return (
//                     <div key={exp.id || i} className="t4-entry">
//                       <div className="t4-entry-row">
//                         <span className="t4-entry-role">{exp.jobTitle}</span>
//                         <span className="t4-entry-date">{start}{start && end ? " – " : ""}{end}</span>
//                       </div>
//                       {(exp.employer || exp.location) && (
//                         <div className="t4-entry-org">{[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
//                       )}
//                       {exp.text && <div className="t4-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {renderProjects()}

//             {educations?.length > 0 && (
//               <div className="t4-block">
//                 <div className="t4-section-title"><span>Education</span></div>
//                 {educations.map((edu, i) => {
//                   const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return (
//                     <div key={edu.id || i} className="t4-entry">
//                       <div className="t4-entry-row">
//                         <span className="t4-edu-degree">
//                           {edu.degree || ""}
//                           {grade && <span className="t4-grade-badge">{grade}</span>}
//                         </span>
//                         <span className="t4-entry-date">
//                           {[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}
//                         </span>
//                       </div>
//                       {(edu.schoolname || edu.location) && (
//                         <div className="t4-edu-school">{[edu.schoolname, edu.location].filter(Boolean).join(" · ")}</div>
//                       )}
//                       {edu.text && <div className="t4-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />}
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

// export default TemplateFour;