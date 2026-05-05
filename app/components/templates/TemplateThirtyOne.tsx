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
//       if (!contact.photo) { setPreviewUrl(null); setBase64Image(null); return; }
//       try {
//         if (typeof contact.photo === "string") {
//           if (contact.photo.startsWith("blob:")) {
//             const response = await fetch(contact.photo);
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => { const b64 = reader.result as string; setBase64Image(b64); setPreviewUrl(b64); };
//             reader.readAsDataURL(blob);
//           } else {
//             const url = `${API_URL}/api/uploads/photos/${contact.photo}`;
//             setPreviewUrl(url); setBase64Image(url);
//           }
//         } else if (contact.photo && typeof contact.photo === "object" && "size" in contact.photo) {
//           objectUrl = URL.createObjectURL(contact.photo as Blob);
//           setPreviewUrl(objectUrl);
//           const reader = new FileReader();
//           reader.onloadend = () => { setBase64Image(reader.result as string); };
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
//           <div className="t4-label"><span className="t4-label-dot" />Skills</div>
//           {skills.map((cat: any) => (
//             <div key={cat.id} style={{ marginBottom: "10px" }}>
//               <div className="t4-cat-title">{cat.title}</div>
//               <div className="t4-pill-row">
//                 {cat.skills.map((sk: any, i: number) => (
//                   <span key={sk.id} className={`t4-pill t4-pill-${(i % 4)}`}>{sk.name}</span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return (
//       <div className="t4-block">
//         <div className="t4-label"><span className="t4-label-dot" />Skills</div>
//         <div className="t4-pill-row">
//           {skills.map((sk: any, i: number) => (
//             <span key={sk.id || i} className={`t4-pill t4-pill-${(i % 4)}`}>{sk.name || sk.skill}</span>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderProjects = () => {
//     if (!projects?.length) return null;
//     return (
//       <div className="t4-block">
//         <div className="t4-label"><span className="t4-label-dot" />Projects</div>
//         {projects.map((p: any, i: number) => (
//           <div key={p.id || i} className="t4-card">
//             <div className={`t4-card-accent t4-accent-${i % 4}`} />
//             <div className="t4-card-body">
//               <div className="t4-card-head">
//                 <span className="t4-card-title">{p.title}</span>
//                 <div className="t4-link-row">
//                   {p.liveUrl && <a href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} target="_blank" rel="noreferrer" className="t4-ext-link">Live ↗</a>}
//                   {p.githubUrl && <a href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`} target="_blank" rel="noreferrer" className="t4-ext-link">GitHub ↗</a>}
//                 </div>
//               </div>
//               {p.techStack?.length > 0 && <div className="t4-tech">{p.techStack.join("  ·  ")}</div>}
//               {p.description && <div className="t4-body-text" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(p.description) }} />}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* =============================================================
//      STYLES
//   ============================================================= */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

//     :root {
//       --c1: #FF5C5C;
//       --c2: #FFB800;
//       --c3: #00C9A7;
//       --c4: #4D7FFF;
//       --bg: #FFFCF7;
//       --ink: #1A1A1A;
//       --ink2: #555;
//       --border: #EAE6DF;
//       --sidebar: #1A1A1A;
//     }

//     .t4-resume {
//       width: 210mm;
//       min-height: 297mm;
//       background: var(--bg);
//       font-family: 'Plus Jakarta Sans', sans-serif;
//       font-size: 12px;
//       line-height: 1.6;
//       color: var(--ink);
//       display: flex;
//       flex-direction: column;
//       position: relative;
//       box-sizing: border-box;
//     }

//     .t4-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       min-height: auto;
//       overflow: hidden;
//     }

//     /* Resets */
//     .t4-resume *, .t4-resume p, .t4-resume div, .t4-resume span { box-sizing: border-box; margin: 0; padding: 0; }
//     .t4-resume ul, .t4-resume ol { margin: 0 0 0 18px !important; padding: 0 !important; }
//     .t4-resume li { font-size: 12px !important; line-height: 1.6 !important; margin-bottom: 2px !important; }
//     .t4-resume ul { list-style-type: disc !important; }
//     .t4-resume ol { list-style-type: decimal !important; }
//     .t4-resume strong, .t4-resume b { font-weight: 700 !important; }
//     .t4-resume em, .t4-resume i { font-style: italic !important; }
//     .t4-resume u { text-decoration: underline !important; }

//     /* ── TOP COLOR STRIPE ── */
//     .t4-stripe {
//       height: 6px;
//       background: linear-gradient(90deg, var(--c1) 0%, var(--c2) 33%, var(--c3) 66%, var(--c4) 100%);
//       flex-shrink: 0;
//     }

//     /* ── HEADER ── */
//     .t4-header {
//       display: flex;
//       align-items: stretch;
//       flex-shrink: 0;
//       background: var(--bg);
//       border-bottom: 1.5px solid var(--border);
//     }

//     .t4-header-photo-wrap {
//       width: 110px;
//       flex-shrink: 0;
//       overflow: hidden;
//       position: relative;
//     }

//     .t4-header-photo {
//       width: 110px;
//       height: 100%;
//       min-height: 120px;
//       object-fit: cover;
//       display: block;
//     }

//     .t4-header-photo-placeholder {
//       width: 110px;
//       min-height: 120px;
//       background: #F0EDE8;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .t4-header-main {
//       flex: 1;
//       padding: 18px 20px 16px 20px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       gap: 6px;
//     }

//     .t4-name-row {
//       display: flex;
//       align-items: baseline;
//       gap: 10px;
//       flex-wrap: wrap;
//     }

//     .t4-name {
//       font-family: 'Plus Jakarta Sans', sans-serif;
//       font-size: 28px;
//       font-weight: 700;
//       color: var(--ink);
//       letter-spacing: -0.5px;
//       line-height: 1.1;
//       text-transform: capitalize;
//     }

//     .t4-role-tag {
//       display: inline-block;
//       background: var(--c4);
//       color: white;
//       font-size: 10px;
//       font-weight: 700;
//       letter-spacing: 0.12em;
//       text-transform: uppercase;
//       padding: 3px 10px;
//       border-radius: 100px;
//       white-space: nowrap;
//     }

//     .t4-contact-chips {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px;
//     }

//     .t4-chip {
//       display: inline-flex;
//       align-items: center;
//       gap: 4px;
//       background: #F0EDE8;
//       border-radius: 100px;
//       padding: 3px 10px;
//       font-size: 10.5px;
//       color: var(--ink2);
//       font-weight: 400;
//       white-space: nowrap;
//     }

//     .t4-chip a {
//       color: var(--ink);
//       text-decoration: none;
//       font-weight: 600;
//     }

//     /* ── BODY ── */
//     .t4-body {
//       display: flex;
//       flex: 1;
//       min-height: 0;
//     }

//     /* ── SIDEBAR ── */
//     .t4-sidebar {
//       width: 37%;
//       background: var(--sidebar);
//       padding: 20px 18px 20px 18px;
//       color: #E8E5DF;
//       flex-shrink: 0;
//     }

//     /* ── MAIN ── */
//     .t4-main {
//       flex: 1;
//       padding: 20px 22px 20px 20px;
//     }

//     /* ── SECTION LABEL ── */
//     .t4-label {
//       display: flex;
//       align-items: center;
//       gap: 7px;
//       font-size: 9px;
//       font-weight: 700;
//       letter-spacing: 0.2em;
//       text-transform: uppercase;
//       color: #888;
//       margin-bottom: 10px;
//       margin-top: 16px;
//     }

//     .t4-sidebar .t4-label { color: #888; }
//     .t4-label:first-child { margin-top: 0; }

//     .t4-label-dot {
//       width: 8px;
//       height: 8px;
//       border-radius: 2px;
//       background: var(--c1);
//       flex-shrink: 0;
//       display: inline-block;
//     }

//     /* rotate dot colors per section — done via nth-child in JS with class */
//     .t4-block:nth-child(1) .t4-label-dot { background: var(--c3); }
//     .t4-block:nth-child(2) .t4-label-dot { background: var(--c2); }
//     .t4-block:nth-child(3) .t4-label-dot { background: var(--c1); }
//     .t4-block:nth-child(4) .t4-label-dot { background: var(--c4); }
//     .t4-block:nth-child(5) .t4-label-dot { background: var(--c3); }

//     .t4-block { margin-bottom: 4px; }

//     /* ── SUMMARY ── */
//     .t4-summary {
//       font-size: 12px;
//       color: #C8C4BC;
//       line-height: 1.7;
//       font-weight: 300;
//     }

//     /* ── SKILLS / PILLS ── */
//     .t4-cat-title {
//       font-size: 10.5px;
//       font-weight: 600;
//       color: #AAA;
//       margin-bottom: 5px;
//       letter-spacing: 0.04em;
//     }

//     .t4-pill-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }

//     .t4-pill {
//       display: inline-block;
//       font-size: 10.5px;
//       font-weight: 500;
//       padding: 3px 9px;
//       border-radius: 4px;
//     }

//     /* Sidebar pills — muted colored */
//     .t4-sidebar .t4-pill-0 { background: rgba(255,92,92,0.18); color: #FF9090; }
//     .t4-sidebar .t4-pill-1 { background: rgba(255,184,0,0.18); color: #FFCF6E; }
//     .t4-sidebar .t4-pill-2 { background: rgba(0,201,167,0.18); color: #6EECD8; }
//     .t4-sidebar .t4-pill-3 { background: rgba(77,127,255,0.18); color: #94B5FF; }

//     /* Main pills — light bg */
//     .t4-main .t4-pill-0 { background: rgba(255,92,92,0.10); color: #CC3333; }
//     .t4-main .t4-pill-1 { background: rgba(255,184,0,0.12); color: #9A6E00; }
//     .t4-main .t4-pill-2 { background: rgba(0,201,167,0.10); color: #00896E; }
//     .t4-main .t4-pill-3 { background: rgba(77,127,255,0.10); color: #2255CC; }

//     /* ── CARD ENTRIES (projects/exp) ── */
//     .t4-card {
//       display: flex;
//       margin-bottom: 10px;
//       border-radius: 6px;
//       overflow: hidden;
//       border: 1.5px solid var(--border);
//       background: white;
//     }

//     .t4-card:last-child { margin-bottom: 0; }

//     .t4-card-accent {
//       width: 4px;
//       flex-shrink: 0;
//     }
//     .t4-accent-0 { background: var(--c1); }
//     .t4-accent-1 { background: var(--c2); }
//     .t4-accent-2 { background: var(--c3); }
//     .t4-accent-3 { background: var(--c4); }

//     .t4-card-body { padding: 8px 12px; flex: 1; min-width: 0; }

//     .t4-card-head {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       gap: 8px;
//       margin-bottom: 2px;
//       flex-wrap: wrap;
//     }

//     .t4-card-title {
//       font-weight: 700;
//       font-size: 12.5px;
//       color: var(--ink);
//     }

//     .t4-link-row { display: flex; gap: 6px; }

//     .t4-ext-link {
//       font-size: 10px;
//       font-weight: 600;
//       color: var(--c4);
//       text-decoration: none;
//       white-space: nowrap;
//     }

//     .t4-tech {
//       font-size: 10.5px;
//       color: var(--ink2);
//       margin: 2px 0 4px;
//       font-style: italic;
//     }

//     .t4-body-text {
//       font-size: 11.5px;
//       color: #444;
//       line-height: 1.6;
//     }

//     /* ── EXPERIENCE ENTRIES ── */
//     .t4-exp-entry {
//       margin-bottom: 12px;
//       padding-bottom: 12px;
//       border-bottom: 1.5px solid var(--border);
//     }

//     .t4-exp-entry:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

//     .t4-exp-head {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 8px;
//       margin-bottom: 1px;
//     }

//     .t4-exp-title {
//       font-weight: 700;
//       font-size: 12.5px;
//       color: var(--ink);
//       line-height: 1.3;
//     }

//     .t4-exp-date {
//       font-size: 10px;
//       font-weight: 600;
//       color: white;
//       background: #333;
//       padding: 2px 8px;
//       border-radius: 100px;
//       white-space: nowrap;
//       flex-shrink: 0;
//     }

//     .t4-exp-sub {
//       font-size: 11px;
//       color: var(--ink2);
//       margin-bottom: 4px;
//     }

//     .t4-exp-body {
//       font-size: 11.5px;
//       color: #444;
//       line-height: 1.6;
//     }

//     /* ── EDUCATION ── */
//     .t4-edu-entry {
//       margin-bottom: 10px;
//       display: flex;
//       gap: 10px;
//       align-items: flex-start;
//     }

//     .t4-edu-entry:last-child { margin-bottom: 0; }

//     .t4-edu-dot-col { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
//     .t4-edu-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
//     .t4-edu-dot-0 { background: var(--c3); }
//     .t4-edu-dot-1 { background: var(--c4); }
//     .t4-edu-dot-2 { background: var(--c2); }
//     .t4-edu-dot-3 { background: var(--c1); }

//     .t4-edu-content { flex: 1; }

//     .t4-edu-degree {
//       font-weight: 700;
//       font-size: 12px;
//       color: #E8E5DF;
//       line-height: 1.3;
//     }

//     .t4-edu-school {
//       font-size: 10.5px;
//       color: #888;
//       margin-top: 1px;
//     }

//     .t4-edu-date {
//       font-size: 10px;
//       color: #666;
//     }

//     .t4-grade-badge {
//       display: inline-block;
//       background: var(--c2);
//       color: #1A1A1A;
//       font-size: 9.5px;
//       font-weight: 700;
//       padding: 1px 7px;
//       border-radius: 3px;
//       margin-top: 2px;
//     }

//     .t4-edu-desc {
//       font-size: 11px;
//       color: #888;
//       line-height: 1.5;
//       margin-top: 3px;
//     }

//     /* ── LINKS on SIDEBAR ── */
//     .t4-link-item {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       font-size: 11px;
//       color: #AAA;
//       margin-bottom: 5px;
//       font-weight: 400;
//     }

//     .t4-link-item a { color: #C8C4BC; text-decoration: none; font-weight: 500; word-break: break-all; }

//     .t4-link-icon {
//       width: 18px;
//       height: 18px;
//       border-radius: 4px;
//       flex-shrink: 0;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 9px;
//       font-weight: 700;
//       color: white;
//     }

//     .t4-icon-li { background: var(--c4); }
//     .t4-icon-gh { background: #333; }
//     .t4-icon-po { background: var(--c3); }

//     /* ── CUSTOM SECTIONS ── */
//     .t4-custom-text {
//       font-size: 12px;
//       color: #C8C4BC;
//       line-height: 1.65;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t4-resume { width: 100% !important; box-shadow: none !important; }
//       .t4-exp-entry, .t4-card, .t4-edu-entry { page-break-inside: avoid; break-inside: avoid; }
//     }
//   `;

//   /* =============================================================
//      HTML GENERATION
//   ============================================================= */
//   const generateHTML = () => {
//     const photoHtml = base64Image
//       ? `<div class="t4-header-photo-wrap"><img src="${base64Image}" alt="Profile" class="t4-header-photo" /></div>`
//       : "";

//     const addressStr = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ");
//     const formattedDob = formatDateOfBirth(dateOfBirth || "");

//     const chips = [
//       addressStr ? `<span class="t4-chip">${addressStr}</span>` : "",
//       contact?.email ? `<span class="t4-chip">${contact.email}</span>` : "",
//       contact?.phone ? `<span class="t4-chip">${contact.phone}</span>` : "",
//       formattedDob ? `<span class="t4-chip">${formattedDob}</span>` : "",
//     ].filter(Boolean).join("");

//     const links = [
//       linkedinUrl?.trim() ? `<div class="t4-link-item"><div class="t4-link-icon t4-icon-li">in</div><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></div>` : "",
//       githubUrl?.trim() ? `<div class="t4-link-item"><div class="t4-link-icon t4-icon-gh">gh</div><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></div>` : "",
//       portfolioUrl?.trim() ? `<div class="t4-link-item"><div class="t4-link-icon t4-icon-po">↗</div><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></div>` : "",
//     ].filter(Boolean).join("");

//     const skillsHtml = (() => {
//       if (!skills?.length) return "";
//       const isCat = isCategorizedSkills(skills);
//       if (isCat) {
//         return `<div class="t4-block"><div class="t4-label"><span class="t4-label-dot"></span>Skills</div>
//           ${skills.map((cat: any) => `<div style="margin-bottom:10px">
//             <div class="t4-cat-title">${cat.title}</div>
//             <div class="t4-pill-row">${cat.skills.map((sk: any, i: number) => `<span class="t4-pill t4-pill-${i % 4}">${sk.name}</span>`).join("")}</div>
//           </div>`).join("")}
//         </div>`;
//       }
//       return `<div class="t4-block"><div class="t4-label"><span class="t4-label-dot"></span>Skills</div>
//         <div class="t4-pill-row">${skills.map((sk: any, i: number) => `<span class="t4-pill t4-pill-${i % 4}">${sk.name || sk.skill}</span>`).join("")}</div>
//       </div>`;
//     })();

//     const customHtml = (() => {
//       if (!finalize || Array.isArray(finalize) || !Array.isArray(finalize.customSection)) return "";
//       const valid = finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
//       if (!valid.length) return "";
//       return valid.map((s: any) => `<div class="t4-block" style="margin-bottom:8px">
//         ${s.name ? `<div class="t4-label"><span class="t4-label-dot"></span>${s.name}</div>` : ""}
//         ${s.description ? `<div class="t4-custom-text">${cleanQuillHTML(s.description)}</div>` : ""}
//       </div>`).join("");
//     })();

//     const expHtml = experiences?.length > 0 ? `<div class="t4-block">
//       <div class="t4-label"><span class="t4-label-dot"></span>Experience</div>
//       ${experiences.map((exp: any) => {
//         const start = formatMonthYear(exp.startDate, false);
//         const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//         return `<div class="t4-exp-entry">
//           <div class="t4-exp-head">
//             <div class="t4-exp-title">${exp.jobTitle || ""}</div>
//             <div class="t4-exp-date">${start}${start && end ? " – " : ""}${end}</div>
//           </div>
//           ${exp.employer || exp.location ? `<div class="t4-exp-sub">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${exp.text ? `<div class="t4-exp-body">${cleanQuillHTML(exp.text)}</div>` : ""}
//         </div>`;
//       }).join("")}
//     </div>` : "";

//     const projHtml = projects?.length > 0 ? `<div class="t4-block">
//       <div class="t4-label"><span class="t4-label-dot"></span>Projects</div>
//       ${projects.map((p: any, i: number) => `<div class="t4-card">
//         <div class="t4-card-accent t4-accent-${i % 4}"></div>
//         <div class="t4-card-body">
//           <div class="t4-card-head">
//             <span class="t4-card-title">${p.title || ""}</span>
//             <div class="t4-link-row">
//               ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t4-ext-link">Live ↗</a>` : ""}
//               ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t4-ext-link">GitHub ↗</a>` : ""}
//             </div>
//           </div>
//           ${p.techStack?.length ? `<div class="t4-tech">${p.techStack.join("  ·  ")}</div>` : ""}
//           ${p.description ? `<div class="t4-body-text">${cleanQuillHTML(p.description)}</div>` : ""}
//         </div>
//       </div>`).join("")}
//     </div>` : "";

//     const eduHtml = educations?.length > 0 ? `<div class="t4-block">
//       <div class="t4-label"><span class="t4-label-dot"></span>Education</div>
//       ${educations.map((edu: any, i: number) => {
//         const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         const dateStr = [edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ");
//         return `<div class="t4-edu-entry">
//           <div class="t4-edu-dot-col"><div class="t4-edu-dot t4-edu-dot-${i % 4}"></div></div>
//           <div class="t4-edu-content">
//             <div class="t4-edu-degree">${edu.degree || ""}</div>
//             <div class="t4-edu-school">${[edu.schoolname, edu.location].filter(Boolean).join(" · ")}</div>
//             ${dateStr ? `<div class="t4-edu-date">${dateStr}</div>` : ""}
//             ${grade ? `<div class="t4-grade-badge">${grade}</div>` : ""}
//             ${edu.text ? `<div class="t4-edu-desc">${cleanQuillHTML(edu.text)}</div>` : ""}
//           </div>
//         </div>`;
//       }).join("")}
//     </div>` : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
//   <style>
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     body { background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t4-resume">
//   <div class="t4-stripe"></div>

//   <div class="t4-header">
//     ${photoHtml}
//     <div class="t4-header-main">
//       <div class="t4-name-row">
//         <div class="t4-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <span class="t4-role-tag">UI / UX Designer</span>
//       </div>
//       <div class="t4-contact-chips">${chips}</div>
//     </div>
//   </div>

//   <div class="t4-body">
//     <div class="t4-sidebar">
//       ${summary ? `<div class="t4-block">
//         <div class="t4-label"><span class="t4-label-dot"></span>Profile</div>
//         <div class="t4-summary">${cleanQuillHTML(summary)}</div>
//       </div>` : ""}

//       ${skillsHtml}

//       ${links ? `<div class="t4-block">
//         <div class="t4-label"><span class="t4-label-dot"></span>Links</div>
//         ${links}
//       </div>` : ""}

//       ${eduHtml}
//       ${customHtml}
//     </div>

//     <div class="t4-main">
//       ${expHtml}
//       ${projHtml}
//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* =============================================================
//      PDF DOWNLOAD
//   ============================================================= */
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

//   /* =============================================================
//      JSX PREVIEW
//   ============================================================= */
//   return (
//     <>
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="text-2xl md:text-base text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
//           style={{ background: "linear-gradient(90deg,#FF5C5C,#FFB800,#00C9A7,#4D7FFF)", backgroundSize: "200%", animation: "gradShift 3s ease infinite" }}
//         >
//           Download Resume
//         </motion.button>
//       </div>

//       <div
//         className={`t4-resume ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 8px 48px rgba(0,0,0,0.13)" : "", minHeight: "297mm" }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');`}</style>
//         <style>{styles}</style>
//         <style>{`@keyframes gradShift { 0%{background-position:0%} 50%{background-position:100%} 100%{background-position:0%} }`}</style>

//         {/* STRIPE */}
//         <div className="t4-stripe" />

//         {/* HEADER */}
//         <div className="t4-header">
//           {previewUrl ? (
//             <div className="t4-header-photo-wrap">
//               <img src={previewUrl} alt="Profile" className="t4-header-photo" />
//             </div>
//           ) : null}
//           <div className="t4-header-main">
//             <div className="t4-name-row">
//               <div className="t4-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
//               <span className="t4-role-tag">UI / UX Designer</span>
//             </div>
//             <div className="t4-contact-chips">
//               {[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).length > 0 && (
//                 <span className="t4-chip">{[contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean).join(", ")}</span>
//               )}
//               {contact?.email && <span className="t4-chip">{contact.email}</span>}
//               {contact?.phone && <span className="t4-chip">{contact.phone}</span>}
//               {dateOfBirth && <span className="t4-chip">{formatDateOfBirth(dateOfBirth)}</span>}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t4-body">
//           {/* SIDEBAR */}
//           <div className="t4-sidebar">
//             {summary && (
//               <div className="t4-block">
//                 <div className="t4-label"><span className="t4-label-dot" />Profile</div>
//                 <div className="t4-summary" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }} />
//               </div>
//             )}

//             {renderSkills()}

//             {/* LINKS */}
//             {(linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()) && (
//               <div className="t4-block">
//                 <div className="t4-label"><span className="t4-label-dot" />Links</div>
//                 {linkedinUrl?.trim() && (
//                   <div className="t4-link-item">
//                     <div className="t4-link-icon t4-icon-li">in</div>
//                     <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//                   </div>
//                 )}
//                 {githubUrl?.trim() && (
//                   <div className="t4-link-item">
//                     <div className="t4-link-icon t4-icon-gh">gh</div>
//                     <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a>
//                   </div>
//                 )}
//                 {portfolioUrl?.trim() && (
//                   <div className="t4-link-item">
//                     <div className="t4-link-icon t4-icon-po">↗</div>
//                     <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* EDUCATION in sidebar */}
//             {educations?.length > 0 && (
//               <div className="t4-block">
//                 <div className="t4-label"><span className="t4-label-dot" />Education</div>
//                 {educations.map((edu: any, i: number) => {
//                   const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   return (
//                     <div key={edu.id || i} className="t4-edu-entry">
//                       <div className="t4-edu-dot-col">
//                         <div className={`t4-edu-dot t4-edu-dot-${i % 4}`} />
//                       </div>
//                       <div className="t4-edu-content">
//                         <div className="t4-edu-degree">{edu.degree || ""}</div>
//                         <div className="t4-edu-school">{[edu.schoolname, edu.location].filter(Boolean).join(" · ")}</div>
//                         {[edu.startDate, edu.endDate || "Present"].filter(Boolean).length > 0 && (
//                           <div className="t4-edu-date">{[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" – ")}</div>
//                         )}
//                         {grade && <div className="t4-grade-badge">{grade}</div>}
//                         {edu.text && <div className="t4-edu-desc" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* CUSTOM SECTIONS */}
//             {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) && (
//                 <div>
//                   {finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                     .map((section: any, i: number) => (
//                       <div key={section.id || i} className="t4-block" style={{ marginBottom: "8px" }}>
//                         {section.name && <div className="t4-label"><span className="t4-label-dot" />{section.name}</div>}
//                         {section.description && <div className="t4-custom-text" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />}
//                       </div>
//                     ))}
//                 </div>
//               )}
//           </div>

//           {/* MAIN */}
//           <div className="t4-main">
//             {/* EXPERIENCE */}
//             {experiences?.length > 0 && (
//               <div className="t4-block">
//                 <div className="t4-label"><span className="t4-label-dot" />Experience</div>
//                 {experiences.map((exp: any, index: number) => {
//                   const start = formatMonthYear(exp.startDate, false);
//                   const end = exp.endDate ? formatMonthYear(exp.endDate, false) : exp.startDate ? "Present" : "";
//                   return (
//                     <div key={exp.id || index} className="t4-exp-entry">
//                       <div className="t4-exp-head">
//                         <div className="t4-exp-title">{exp.jobTitle}</div>
//                         <div className="t4-exp-date">{start}{start && end ? " – " : ""}{end}</div>
//                       </div>
//                       {(exp.employer || exp.location) && (
//                         <div className="t4-exp-sub">{[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
//                       )}
//                       {exp.text && <div className="t4-exp-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {renderProjects()}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateFour;