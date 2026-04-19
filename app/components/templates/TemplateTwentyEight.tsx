// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   Skill,
// } from "@/app/types/context.types";

// interface AllData {
//   contact?: Contact;
//   educations?: Education[];
//   experiences?: Experience[];
//   skills?: Skill[];
//   finalize?: Finalize;
//   summary?: string;
// }

// interface ResumeProps {
//   alldata?: AllData;
// }

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedin;

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
//     const croppedImage = contact?.croppedImage;
//     if (croppedImage) {
//       if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
//         url = croppedImage;
//       } else if (typeof croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${croppedImage}`;
//       } else if ((croppedImage as any) instanceof Blob || (croppedImage as any) instanceof File) {
//         objectUrl = URL.createObjectURL(croppedImage as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact?.croppedImage, contact?.photo]);

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     languages: isFinalizeData(finalize) && Array.isArray(finalize.languages) ? finalize.languages : [],
//     certifications: isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses) ? finalize.certificationsAndLicenses : [],
//     hobbies: isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests) ? finalize.hobbiesAndInterests : [],
//     awards: isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors) ? finalize.awardsAndHonors : [],
//     websites: isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia) ? finalize.websitesAndSocialMedia : [],
//     references: isFinalizeData(finalize) && Array.isArray(finalize.references) ? finalize.references : [],
//     customSection: isFinalizeData(finalize) && Array.isArray(finalize.customSection) ? finalize.customSection : [],
//   };

//   const skillPct = (level: any) => level ? `${(Number(level) / 5) * 100}%` : "0%";
//   const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

//   /* ======================================================
//      SHARED CSS — scoped to .resume-t9
//      Midnight & Electric Purple | Single Column Bold | Photo
//      Graphic Designer aesthetic:
//      - Full-bleed dark header
//      - Bold oversized name with purple accent
//      - Geometric dividers
//      - Two-column skill grid in body
//      - Sharp typographic section markers
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

//     .resume-t9 * { box-sizing: border-box; }

//     .resume-t9 {
//       width: 210mm;
//       min-height: 297mm;
//       background-color: #0d0d1a;
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #e8e0f0;
//       text-align: left;
//     }

//     /* Scoped resets */
//     .resume-t9 p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; font-family: 'Space Grotesk', Arial, sans-serif; }
//     .resume-t9 ul { list-style-type: disc !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t9 ol { list-style-type: decimal !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t9 li { margin-top: 0 !important; margin-bottom: 2px !important; padding: 0 !important; line-height: 1.5 !important; font-size: 13px !important; font-family: 'Space Grotesk', Arial, sans-serif !important; color: #c8b8e0 !important; }

//     /* ── HEADER ── */
//     .t9-header {
//       background-color: #0d0d1a;
//       padding: 28px 32px 0;
//       position: relative;
//     }

//     /* Top accent bar — three-color stripe */
//     .t9-header-accent {
//       position: absolute;
//       top: 0; left: 0; right: 0;
//       height: 4px;
//       background: #8b2fc9;
//     }

//     /* Header inner layout: photo left, info right */
//     .t9-header-inner {
//       display: flex;
//       align-items: flex-start;
//       gap: 24px;
//       margin-bottom: 20px;
//     }

//     .t9-photo-wrap {
//       flex-shrink: 0;
//       position: relative;
//     }

//     .t9-photo {
//       width: 100px;
//       height: 100px;
//       object-fit: cover;
//       border: 2px solid #8b2fc9;
//       display: block;
//     }

//     .t9-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border: 2px solid #8b2fc9;
//       background-color: #1a0d2e;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .t9-photo-placeholder span {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 28px;
//       font-weight: 700;
//       color: #8b2fc9;
//     }

//     /* Purple corner accent on photo */
//     .t9-photo-corner {
//       position: absolute;
//       bottom: -6px;
//       right: -6px;
//       width: 24px;
//       height: 24px;
//       background-color: #8b2fc9;
//     }

//     .t9-header-text {
//       flex: 1;
//       padding-top: 4px;
//     }

//     .t9-name {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 34px;
//       font-weight: 700;
//       color: #ffffff;
//       letter-spacing: -1px;
//       line-height: 1.05;
//       margin-bottom: 6px;
//     }

//     .t9-name-accent {
//       color: #8b2fc9;
//     }

//     .t9-jobtitle {
//       font-family: 'Space Mono', monospace;
//       font-size: 10px;
//       font-weight: 400;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: #8b2fc9;
//       margin-bottom: 12px;
//       line-height: 1.4;
//     }

//     .t9-header-meta {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 4px 16px;
//       font-size: 11px;
//       color: #9a8ab0;
//       font-family: 'Space Mono', monospace;
//       font-weight: 400;
//     }

//     .t9-header-meta-item {
//       display: flex;
//       align-items: center;
//       gap: 5px;
//       color: #9a8ab0;
//     }

//     .t9-header-meta-item a { color: #b06fe8; text-decoration: underline; font-family: 'Space Mono', monospace; }

//     /* Divider strip between header and body */
//     .t9-header-divider {
//       height: 2px;
//       background: #1e1030;
//       border-top: 1px solid #8b2fc9;
//       margin: 0 -32px;
//     }

//     /* ── BODY ── */
//     .t9-body {
//       padding: 22px 32px 32px;
//     }

//     /* ── SECTION ── */
//     .t9-section {
//       margin-bottom: 22px;
//     }

//     .t9-section-label {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       margin-bottom: 14px;
//     }

//     .t9-section-marker {
//       width: 6px;
//       height: 6px;
//       background-color: #8b2fc9;
//       transform: rotate(45deg);
//       flex-shrink: 0;
//     }

//     .t9-section-title {
//       font-family: 'Space Mono', monospace;
//       font-size: 9.5px;
//       font-weight: 700;
//       letter-spacing: 3.5px;
//       text-transform: uppercase;
//       color: #8b2fc9;
//       line-height: 1.4;
//     }

//     .t9-section-line {
//       flex: 1;
//       height: 1px;
//       background-color: #2a1a40;
//     }

//     /* ── SUMMARY ── */
//     .t9-summary {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 13px;
//       font-weight: 300;
//       color: #c8b8e0;
//       line-height: 1.75;
//       word-wrap: break-word;
//       padding-left: 16px;
//       border-left: 2px solid #8b2fc9;
//     }

//     .t9-summary p { margin: 0 !important; line-height: 1.75 !important; font-size: 13px !important; color: #c8b8e0 !important; }

//     /* ── TWO-COL SKILLS GRID ── */
//     .t9-skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 10px 28px;
//     }

//     .t9-skill-row { }

//     .t9-skill-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       margin-bottom: 4px;
//     }

//     .t9-skill-name {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 12px;
//       font-weight: 500;
//       color: #e8e0f0;
//       letter-spacing: 0.3px;
//     }

//     .t9-skill-pct {
//       font-family: 'Space Mono', monospace;
//       font-size: 9px;
//       color: #8b2fc9;
//     }

//     .t9-skill-bar-bg {
//       height: 2px;
//       background-color: #2a1a40;
//       overflow: hidden;
//     }

//     .t9-skill-bar-fill {
//       height: 100%;
//       background-color: #8b2fc9;
//     }

//     /* ── ENTRY BLOCKS ── */
//     .t9-entry {
//       margin-bottom: 16px;
//       padding-bottom: 16px;
//       border-bottom: 1px solid #1e1030;
//     }

//     .t9-entry:last-child {
//       border-bottom: none;
//       padding-bottom: 0;
//       margin-bottom: 0;
//     }

//     .t9-entry-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 10px;
//       flex-wrap: wrap;
//       margin-bottom: 3px;
//     }

//     .t9-entry-title {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 15px;
//       font-weight: 600;
//       color: #ffffff;
//       line-height: 1.3;
//     }

//     .t9-entry-date {
//       font-family: 'Space Mono', monospace;
//       font-size: 9.5px;
//       font-weight: 400;
//       color: #8b2fc9;
//       white-space: nowrap;
//       letter-spacing: 0.5px;
//       background: #1a0d2e;
//       border: 1px solid #2a1a40;
//       padding: 2px 7px;
//     }

//     .t9-entry-subtitle {
//       font-family: 'Space Mono', monospace;
//       font-size: 10px;
//       font-weight: 400;
//       color: #6a4a8a;
//       margin-bottom: 6px;
//       letter-spacing: 0.5px;
//     }

//     .t9-entry-content {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 12.5px;
//       font-weight: 300;
//       color: #a898c0;
//       line-height: 1.65;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t9-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.65 !important; font-size: 12.5px !important; color: #a898c0 !important; }
//     .t9-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
//     .t9-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t9-entry-content li { margin: 0 !important; margin-bottom: 2px !important; line-height: 1.65 !important; font-size: 12.5px !important; color: #a898c0 !important; }

//     /* ── LANGUAGES ── */
//     .t9-lang-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 8px 28px;
//     }

//     .t9-lang-name {
//       font-size: 12px;
//       font-weight: 500;
//       color: #e8e0f0;
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     /* ── EXTRA TEXT ── */
//     .t9-extra {
//       font-family: 'Space Grotesk', Arial, sans-serif;
//       font-size: 12.5px;
//       font-weight: 300;
//       color: #a898c0;
//       line-height: 1.6;
//       word-wrap: break-word;
//     }

//     .t9-extra p { margin: 0 !important; line-height: 1.6 !important; font-size: 12.5px !important; color: #a898c0 !important; }
//     .t9-extra div { line-height: 1.6 !important; color: #a898c0 !important; }

//     .t9-link {
//       color: #b06fe8;
//       text-decoration: underline;
//       font-family: 'Space Mono', monospace;
//       font-size: 11px;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       @page :first { margin-top: 0; }

//       .resume-t9 { width: 100% !important; box-shadow: none !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-header-accent { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-section-marker { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-skill-bar-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-entry-date { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-photo-corner { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t9-body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

//       .t9-entry { page-break-inside: avoid; break-inside: avoid; }
//       .t9-section-label { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
//     const initials = `${contact?.firstName?.[0] || ""}${contact?.lastName?.[0] || ""}`;
//     const photoHtml = previewUrl
//       ? `<div class="t9-photo-wrap"><img src="${previewUrl}" alt="Profile" class="t9-photo"/><div class="t9-photo-corner"></div></div>`
//       : `<div class="t9-photo-wrap"><div class="t9-photo-placeholder"><span>${initials || "?"}</span></div><div class="t9-photo-corner"></div></div>`;

//     const sectionLabel = (title: string) => `
//       <div class="t9-section-label">
//         <div class="t9-section-marker"></div>
//         <div class="t9-section-title">${title}</div>
//         <div class="t9-section-line"></div>
//       </div>`;

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
//   <style>
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { margin: 0; padding: 0; background: #0d0d1a; font-family: 'Space Grotesk', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t9">

//   <!-- HEADER -->
//   <div class="t9-header">
//     <div class="t9-header-accent"></div>
//     <div class="t9-header-inner">
//       ${photoHtml}
//       <div class="t9-header-text">
//         <div class="t9-name">${contact?.firstName || ""} <span class="t9-name-accent">${contact?.lastName || ""}</span></div>
//         ${contact?.jobTitle ? `<div class="t9-jobtitle">// ${getJobTitle(contact.jobTitle)}</div>` : ""}
//         <div class="t9-header-meta">
//           ${addressStr ? `<span class="t9-header-meta-item">${addressStr}</span>` : ""}
//           ${contact?.email ? `<span class="t9-header-meta-item">${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span class="t9-header-meta-item">${contact.phone}</span>` : ""}
//           ${linkedinUrl?.trim() ? `<span class="t9-header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">linkedin</a></span>` : ""}
//           ${contact?.portfolio?.trim() ? `<span class="t9-header-meta-item"><a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}">portfolio</a></span>` : ""}
//         </div>
//       </div>
//     </div>
//     <div class="t9-header-divider"></div>
//   </div>

//   <!-- BODY -->
//   <div class="t9-body">

//     ${summary ? `
//     <div class="t9-section">
//       ${sectionLabel("About")}
//       <div class="t9-summary">${stripHtml(summary)}</div>
//     </div>` : ""}

//     ${skills.length > 0 ? `
//     <div class="t9-section">
//       ${sectionLabel("Skills")}
//       <div class="t9-skills-grid">
//         ${skills.map((s) => {
//           const pct = s.level ? Math.round((Number(s.level) / 5) * 100) : 0;
//           return `
//         <div class="t9-skill-row">
//           <div class="t9-skill-top">
//             <div class="t9-skill-name">${s.skill || ""}</div>
//             ${s.level ? `<div class="t9-skill-pct">${pct}%</div>` : ""}
//           </div>
//           ${s.level ? `<div class="t9-skill-bar-bg"><div class="t9-skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>
//     </div>` : ""}

//     ${experiences?.length > 0 ? `
//     <div class="t9-section">
//       ${sectionLabel("Experience")}
//       ${experiences.map((exp) => {
//         const start = formatMonthYear(exp.startDate, true);
//         const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//         return `
//       <div class="t9-entry">
//         <div class="t9-entry-top">
//           <div class="t9-entry-title">${exp.jobTitle || ""}</div>
//           ${start || end ? `<div class="t9-entry-date">${start}${start && end ? " → " : ""}${end}</div>` : ""}
//         </div>
//         ${exp.employer || exp.location ? `<div class="t9-entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" / ")}</div>` : ""}
//         ${exp.text ? `<div class="t9-entry-content">${stripHtml(exp.text)}</div>` : ""}
//       </div>`;
//       }).join("")}
//     </div>` : ""}

//     ${educations?.length > 0 ? `
//     <div class="t9-section">
//       ${sectionLabel("Education")}
//       ${educations.map((edu) => {
//         const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" → ");
//         return `
//       <div class="t9-entry">
//         <div class="t9-entry-top">
//           <div class="t9-entry-title">${edu.schoolname || ""}</div>
//           ${dateStr ? `<div class="t9-entry-date">${dateStr}</div>` : ""}
//         </div>
//         ${edu.degree || edu.location ? `<div class="t9-entry-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" / ")}</div>` : ""}
//         ${edu.text ? `<div class="t9-entry-content">${stripHtml(edu.text)}</div>` : ""}
//       </div>`;
//       }).join("")}
//     </div>` : ""}

//     ${fin.languages.some((l) => l.name?.trim()) ? `
//     <div class="t9-section">
//       ${sectionLabel("Languages")}
//       <div class="t9-lang-grid">
//         ${fin.languages.filter((l) => l.name?.trim()).map((l) => {
//           const pct = l.level ? Math.round((Number(l.level) / 5) * 100) : 0;
//           return `
//         <div class="t9-skill-row">
//           <div class="t9-skill-top">
//             <div class="t9-lang-name">${l.name}</div>
//             ${l.level ? `<div class="t9-skill-pct">${pct}%</div>` : ""}
//           </div>
//           ${l.level ? `<div class="t9-skill-bar-bg"><div class="t9-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>
//     </div>` : ""}

//     ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t9-section">
//       ${sectionLabel("Certifications")}
//       <div class="t9-extra">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t9-section">
//       ${sectionLabel("Awards & Honors")}
//       <div class="t9-extra">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t9-section">
//       ${sectionLabel("Interests")}
//       <div class="t9-extra">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t9-section">
//       ${sectionLabel("References")}
//       <div class="t9-extra">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//     <div class="t9-section">
//       ${sectionLabel("Websites")}
//       <div class="t9-extra">${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div style="margin-bottom:4px">
//         ${i.websiteUrl ? `<a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t9-link">${i.websiteUrl}</a>` : ""}
//         ${i.socialMedia ? `<div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t9-link">${i.socialMedia}</a></div>` : ""}
//       </div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//     <div class="t9-section">
//       ${s.name ? sectionLabel(s.name) : ""}
//       ${s.description ? `<div class="t9-extra">${stripHtml(s.description)}</div>` : ""}
//     </div>`).join("")}

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

//   const initials = `${contact?.firstName?.[0] || ""}${contact?.lastName?.[0] || ""}`;

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button onClick={handleDownload} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div className="resume-t9" style={{ margin: "0 auto", boxShadow: "0 8px 40px rgba(139,47,201,0.25)" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t9-header">
//           <div className="t9-header-accent" />
//           <div className="t9-header-inner">
//             <div className="t9-photo-wrap">
//               {previewUrl
//                 ? <img src={previewUrl} alt="Profile" className="t9-photo" />
//                 : <div className="t9-photo-placeholder"><span>{initials || "?"}</span></div>
//               }
//               <div className="t9-photo-corner" />
//             </div>
//             <div className="t9-header-text">
//               <div className="t9-name">
//                 {contact?.firstName || ""} <span className="t9-name-accent">{contact?.lastName || ""}</span>
//               </div>
//               {contact?.jobTitle && (
//                 <div className="t9-jobtitle">// {getJobTitle(contact.jobTitle)}</div>
//               )}
//               <div className="t9-header-meta">
//                 {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//                   <span className="t9-header-meta-item">{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</span>
//                 )}
//                 {contact?.email && <span className="t9-header-meta-item">{contact.email}</span>}
//                 {contact?.phone && <span className="t9-header-meta-item">{contact.phone}</span>}
//                 {linkedinUrl?.trim() && (
//                   <span className="t9-header-meta-item">
//                     <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">linkedin</a>
//                   </span>
//                 )}
//                 {contact?.portfolio?.trim() && (
//                   <span className="t9-header-meta-item">
//                     <a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer">portfolio</a>
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="t9-header-divider" />
//         </div>

//         {/* BODY */}
//         <div className="t9-body">

//           {summary && (
//             <div className="t9-section">
//               <div className="t9-section-label">
//                 <div className="t9-section-marker" />
//                 <div className="t9-section-title">About</div>
//                 <div className="t9-section-line" />
//               </div>
//               <div className="t9-summary">{stripHtml(summary)}</div>
//             </div>
//           )}

//           {skills.length > 0 && (
//             <div className="t9-section">
//               <div className="t9-section-label">
//                 <div className="t9-section-marker" />
//                 <div className="t9-section-title">Skills</div>
//                 <div className="t9-section-line" />
//               </div>
//               <div className="t9-skills-grid">
//                 {skills.map((skill, i) => {
//                   const pct = skill.level ? Math.round((Number(skill.level) / 5) * 100) : 0;
//                   return (
//                     <div key={skill.id || i} className="t9-skill-row">
//                       <div className="t9-skill-top">
//                         <div className="t9-skill-name">{skill.skill || ""}</div>
//                         {skill.level && <div className="t9-skill-pct">{pct}%</div>}
//                       </div>
//                       {skill.level && <div className="t9-skill-bar-bg"><div className="t9-skill-bar-fill" style={{ width: skillPct(skill.level) }} /></div>}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {experiences?.length > 0 && (
//             <div className="t9-section">
//               <div className="t9-section-label">
//                 <div className="t9-section-marker" />
//                 <div className="t9-section-title">Experience</div>
//                 <div className="t9-section-line" />
//               </div>
//               {experiences.map((exp, index) => (
//                 <div key={exp.id || index} className="t9-entry">
//                   <div className="t9-entry-top">
//                     <div className="t9-entry-title">{exp.jobTitle || ""}</div>
//                     <div className="t9-entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                       {exp.startDate && <span> → </span>}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
//                     </div>
//                   </div>
//                   {(exp.employer || exp.location) && (
//                     <div className="t9-entry-subtitle">{[exp.employer, exp.location].filter(Boolean).join(" / ")}</div>
//                   )}
//                   {exp.text && <div className="t9-entry-content">{stripHtml(exp.text)}</div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {educations?.length > 0 && (
//             <div className="t9-section">
//               <div className="t9-section-label">
//                 <div className="t9-section-marker" />
//                 <div className="t9-section-title">Education</div>
//                 <div className="t9-section-line" />
//               </div>
//               {educations.map((edu, index) => (
//                 <div key={edu.id || index} className="t9-entry">
//                   <div className="t9-entry-top">
//                     <div className="t9-entry-title">{edu.schoolname || ""}</div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="t9-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" → ")}</div>
//                     )}
//                   </div>
//                   {(edu.degree || edu.location) && (
//                     <div className="t9-entry-subtitle">{[edu.degree, edu.location].filter(Boolean).join(" / ")}</div>
//                   )}
//                   {edu.text && <div className="t9-entry-content">{stripHtml(edu.text)}</div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {fin.languages.some((l) => l.name?.trim()) && (
//             <div className="t9-section">
//               <div className="t9-section-label">
//                 <div className="t9-section-marker" />
//                 <div className="t9-section-title">Languages</div>
//                 <div className="t9-section-line" />
//               </div>
//               <div className="t9-lang-grid">
//                 {fin.languages.filter((l) => l.name?.trim()).map((l, i) => {
//                   const pct = l.level ? Math.round((Number(l.level) / 5) * 100) : 0;
//                   return (
//                     <div key={l._id || i} className="t9-skill-row">
//                       <div className="t9-skill-top">
//                         <div className="t9-lang-name">{l.name}</div>
//                         {l.level && <div className="t9-skill-pct">{pct}%</div>}
//                       </div>
//                       {l.level && <div className="t9-skill-bar-bg"><div className="t9-skill-bar-fill" style={{ width: skillPct(l.level) }} /></div>}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t9-section">
//               <div className="t9-section-label"><div className="t9-section-marker" /><div className="t9-section-title">Certifications</div><div className="t9-section-line" /></div>
//               <div className="t9-extra">{fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//             </div>
//           )}

//           {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t9-section">
//               <div className="t9-section-label"><div className="t9-section-marker" /><div className="t9-section-title">Awards & Honors</div><div className="t9-section-line" /></div>
//               <div className="t9-extra">{fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//             </div>
//           )}

//           {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t9-section">
//               <div className="t9-section-label"><div className="t9-section-marker" /><div className="t9-section-title">Interests</div><div className="t9-section-line" /></div>
//               <div className="t9-extra">{fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//             </div>
//           )}

//           {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t9-section">
//               <div className="t9-section-label"><div className="t9-section-marker" /><div className="t9-section-title">References</div><div className="t9-section-line" /></div>
//               <div className="t9-extra">{fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//             </div>
//           )}

//           {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//             <div className="t9-section">
//               <div className="t9-section-label"><div className="t9-section-marker" /><div className="t9-section-title">Websites</div><div className="t9-section-line" /></div>
//               <div className="t9-extra">
//                 {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                   <div key={item.id || i} style={{ marginBottom: "4px" }}>
//                     {item.websiteUrl && <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t9-link">{item.websiteUrl}</a>}
//                     {item.socialMedia && <div><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t9-link">{item.socialMedia}</a></div>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//             <div key={section.id || i} className="t9-section">
//               {section.name && (
//                 <div className="t9-section-label"><div className="t9-section-marker" /><div className="t9-section-title">{section.name}</div><div className="t9-section-line" /></div>
//               )}
//               {section.description && <div className="t9-extra">{stripHtml(section.description)}</div>}
//             </div>
//           ))}

//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateNine;