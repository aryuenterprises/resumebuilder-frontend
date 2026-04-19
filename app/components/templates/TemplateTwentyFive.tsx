// "use client";
// import React, { useContext } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   getLocalStorage,
//   MonthYearDisplay,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";

// /* Skill level → filled dots out of 5 */
// const levelToDots = (level: string | number | undefined): number => {
//   if (!level) return 0;
//   return Math.round((Number(level) / 4) * 5);
// };

// /* Language level number → label */
// const langLabel = (level: string | number | undefined): string => {
//   if (!level) return "";
//   const n = Number(level);
//   if (n >= 4) return "Native";
//   if (n >= 3) return "Fluent";
//   if (n >= 2) return "Intermediate";
//   return "Beginner";
// };

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact     = alldata?.contact     || context.contact     || {};
//   const educations  = alldata?.educations  || context?.education  || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills      = alldata?.skills      || context?.skills      || [];
//   const finalize    = alldata?.finalize    || context?.finalize    || {};
//   const summary     = alldata?.summary     || context?.summary     || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl  = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

//   const jobTitle = contact?.jobTitle
//     ? typeof contact.jobTitle === "string"
//       ? contact.jobTitle
//       : (contact.jobTitle as any)?.name || ""
//     : "";

//   /* helpers for finalize sections */
//   const fin = (!Array.isArray(finalize) && finalize) ? finalize as any : null;
//   const hasLangs  = fin && Array.isArray(fin.languages)                && fin.languages.some((l: any) => l.name?.trim());
//   const hasCerts  = fin && Array.isArray(fin.certificationsAndLicenses) && fin.certificationsAndLicenses.some((i: any) => i.name?.replace(/<[^>]*>/g,"").trim());
//   const hasHobby  = fin && Array.isArray(fin.hobbiesAndInterests)       && fin.hobbiesAndInterests.some((i: any) => i.name?.replace(/<[^>]*>/g,"").trim());
//   const hasAwards = fin && Array.isArray(fin.awardsAndHonors)           && fin.awardsAndHonors.some((i: any) => i.name?.replace(/<[^>]*>/g,"").trim());
//   const hasRefs   = fin && Array.isArray(fin.references)               && fin.references.some((i: any) => i.name?.replace(/<[^>]*>/g,"").trim());
//   const hasWeb    = fin && Array.isArray(fin.websitesAndSocialMedia)    && fin.websitesAndSocialMedia.some((i: any) => i.websiteUrl?.trim() || i.socialMedia?.trim());
//   const hasCustom = fin && Array.isArray(fin.customSection)             && fin.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim());

//   /* ══════════════════════════════════════════════════════
//      STYLES — scoped under .t4-resume
//   ══════════════════════════════════════════════════════ */
//   const styles = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

// .t4-resume {
//   width: 210mm;
//   min-height: 297mm;
//   background: #ffffff;
//   font-family: 'DM Sans', Arial, sans-serif;
//   font-size: 13px;
//   line-height: 1.5;
//   box-sizing: border-box;
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

// .t4-resume p {
//   margin: 0 !important;
//   padding: 0 !important;
//   line-height: 1.5 !important;
// }

// /* ── HEADER ── */
// .t4-hdr {
//   background: #1d4ed8;
//   padding: 26px 28px 22px;
// }

// .t4-hdr-top {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   flex-wrap: wrap;
//   gap: 12px;
//   margin-bottom: 14px;
// }

// .t4-name {
//   font-size: 28px;
//   font-weight: 700;
//   color: #ffffff;
//   line-height: 1.1;
//   letter-spacing: -.3px;
// }

// .t4-title {
//   font-size: 11px;
//   color: #93c5fd;
//   font-weight: 500;
//   text-transform: uppercase;
//   letter-spacing: .1em;
//   margin-top: 4px;
// }

// .t4-chips {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 6px;
// }

// .t4-chip {
//   font-size: 10px;
//   color: #bfdbfe;
//   background: rgba(255,255,255,0.10);
//   padding: 3px 10px;
//   border-radius: 20px;
//   border: 1px solid rgba(255,255,255,0.18);
//   line-height: 1.5;
// }

// /* ── RULE ── */
// .t4-rule {
//   height: 3px;
//   background: #2563eb;
// }

// /* ── BODY ── */
// .t4-body {
//   display: flex;
// }

// /* ── LEFT / MAIN ── */
// .t4-left {
//   flex: 1;
//   padding: 20px 20px 28px;
//   box-sizing: border-box;
// }

// /* ── RIGHT SIDEBAR ── */
// .t4-right {
//   width: 68mm;
//   background: #f8faff;
//   border-left: 1px solid #e0e7ff;
//   padding: 20px 16px 28px;
//   box-sizing: border-box;
//   flex-shrink: 0;
// }

// /* ── SECTION TITLES ── */
// .t4-sec {
//   font-size: 9px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: .13em;
//   color: #1d4ed8;
//   margin-bottom: 10px;
//   margin-top: 20px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// }

// .t4-sec:first-of-type {
//   margin-top: 0;
// }

// .t4-sec-line {
//   flex: 1;
//   height: 1px;
//   background: #dbeafe;
// }

// /* ── SUMMARY ── */
// .t4-summary {
//   font-size: 11.5px;
//   color: #334155;
//   line-height: 1.75;
//   padding: 9px 11px;
//   background: #eff6ff;
//   border-left: 3px solid #1d4ed8;
//   border-radius: 0 5px 5px 0;
//   margin-bottom: 2px;
// }

// .t4-summary p {
//   font-size: 11.5px !important;
//   color: #334155 !important;
//   line-height: 1.75 !important;
// }

// /* ── TIMELINE ── */
// .t4-tl-item {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 14px;
// }

// .t4-tl-spine {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 12px;
//   flex-shrink: 0;
//   padding-top: 2px;
// }

// .t4-tl-dot {
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background: #1d4ed8;
//   border: 2px solid #ffffff;
//   box-shadow: 0 0 0 2px #1d4ed8;
//   flex-shrink: 0;
// }

// .t4-tl-dot-edu {
//   background: #0891b2;
//   box-shadow: 0 0 0 2px #0891b2;
// }

// .t4-tl-line {
//   flex: 1;
//   width: 2px;
//   background: #dbeafe;
//   margin-top: 4px;
// }

// .t4-tl-body {
//   flex: 1;
// }

// .t4-tl-title {
//   font-size: 13px;
//   font-weight: 700;
//   color: #1e3a8a;
//   line-height: 1.3;
//   margin-bottom: 2px;
// }

// .t4-tl-title-edu {
//   color: #164e63;
// }

// .t4-tl-meta {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 6px;
//   flex-wrap: wrap;
//   margin-bottom: 4px;
// }

// .t4-tl-co {
//   font-size: 10.5px;
//   color: #3b82f6;
//   font-weight: 600;
// }

// .t4-tl-co-edu {
//   color: #0891b2;
// }

// .t4-tl-date {
//   font-size: 9px;
//   background: #1d4ed8;
//   color: #ffffff;
//   padding: 2px 8px;
//   border-radius: 10px;
//   font-weight: 600;
//   white-space: nowrap;
//   line-height: 1.5;
// }

// .t4-tl-date-edu {
//   background: #0891b2;
// }

// .t4-tl-content {
//   font-size: 11px;
//   color: #475569;
//   line-height: 1.65;
// }

// .t4-tl-content p {
//   font-size: 11px !important;
//   color: #475569 !important;
//   line-height: 1.65 !important;
// }

// .t4-tl-content ul,
// .t4-exp-list,
// .t4-edu-list {
//   list-style-type: disc !important;
//   padding-left: 14px !important;
//   margin: 3px 0 !important;
// }

// .t4-tl-content ol {
//   list-style-type: decimal !important;
//   padding-left: 14px !important;
//   margin: 3px 0 !important;
// }

// .t4-tl-content li,
// .t4-exp-list li,
// .t4-edu-list li {
//   margin-bottom: 2px !important;
//   line-height: 1.55 !important;
//   font-size: 11px !important;
//   color: #475569 !important;
// }

// /* ── RIGHT: SKILL DOT RATINGS ── */
// .t4-sk-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 8px;
// }

// .t4-sk-name {
//   font-size: 11px;
//   color: #334155;
//   font-weight: 500;
// }

// .t4-sk-dots {
//   display: flex;
//   gap: 3px;
// }

// .t4-dot {
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
// }

// .t4-dot-on  { background: #1d4ed8; }
// .t4-dot-off { background: #dbeafe; }

// /* ── RIGHT: LANGUAGE ── */
// .t4-lang-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 7px;
// }

// .t4-lang-name {
//   font-size: 11px;
//   color: #334155;
//   font-weight: 500;
// }

// .t4-lang-badge {
//   font-size: 9px;
//   color: #3b82f6;
//   font-weight: 600;
//   background: #eff6ff;
//   padding: 2px 7px;
//   border-radius: 10px;
//   border: 1px solid #bfdbfe;
// }

// /* ── RIGHT: CERT / SIDEBAR ITEMS ── */
// .t4-cert {
//   font-size: 10px;
//   color: #334155;
//   padding: 5px 8px;
//   border-left: 2px solid #93c5fd;
//   background: #eff6ff;
//   margin-bottom: 5px;
//   border-radius: 0 4px 4px 0;
//   line-height: 1.4;
// }

// .t4-side-item {
//   font-size: 10.5px;
//   color: #334155;
//   margin-bottom: 5px;
//   line-height: 1.5;
// }

// /* ── RIGHT: PILL ROW ── */
// .t4-pill-row {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 4px;
// }

// .t4-pill {
//   font-size: 9.5px;
//   padding: 3px 8px;
//   border-radius: 20px;
//   background: #eff6ff;
//   color: #1e3a8a;
//   font-weight: 500;
//   border: 1px solid #bfdbfe;
// }

// /* ── CUSTOM SECTION ── */
// .t4-custom-content {
//   font-size: 11px;
//   color: #475569;
//   line-height: 1.65;
// }

// .t4-custom-content p {
//   font-size: 11px !important;
//   color: #475569 !important;
// }

// .t4-wrap-break-word {
//   word-wrap: break-word;
//   overflow-wrap: break-word;
// }

// /* ── PRINT ── */
// @media print {
//   @page { size: A4; margin: 0; }

//   .t4-resume {
//     width: 210mm !important;
//     min-height: 297mm !important;
//     margin: 0 !important;
//     box-shadow: none !important;
//   }

//   .t4-hdr {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//   }

//   .t4-rule,
//   .t4-right,
//   .t4-summary,
//   .t4-tl-date,
//   .t4-tl-date-edu,
//   .t4-cert,
//   .t4-dot-on,
//   .t4-pill,
//   .t4-lang-badge {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//   }

//   .no-print { display: none !important; }

//   .t4-tl-item {
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t4-sec {
//     page-break-after: avoid;
//     break-after: avoid;
//   }
// }

// /* ── RESPONSIVE ── */
// @media (max-width: 768px) {
//   .t4-resume { width: 100%; }
//   .t4-body   { flex-direction: column; }
//   .t4-right  { width: 100%; border-left: none; border-top: 1px solid #e0e7ff; }
//   .t4-hdr-top { flex-direction: column; align-items: flex-start; }
// }
// `;

//   /* ══════════════════════════════════════════════════════
//      HTML GENERATION — for PDF
//   ══════════════════════════════════════════════════════ */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExpText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">"))
//         return `<div class="t4-tl-content t4-wrap-break-word">${text}</div>`;
//       const lines = text.split("\n").filter((l) => l.trim());
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•")))
//         return `<div class="t4-tl-content"><ul class="t4-exp-list">${lines.map((l) => {
//           const t = l.trim();
//           const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//           return c ? `<li>${c}</li>` : "";
//         }).join("")}</ul></div>`;
//       return `<div class="t4-tl-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEduText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">"))
//         return `<div class="t4-tl-content">${text}</div>`;
//       const lines = text.split("\n").filter((l) => l.trim());
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•")))
//         return `<div class="t4-tl-content"><ul class="t4-edu-list">${lines.map((l) => {
//           const t = l.trim();
//           const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//           return c ? `<li>${c}</li>` : "";
//         }).join("")}</ul></div>`;
//       return `<div class="t4-tl-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const dotRating = (filled: number) =>
//       Array.from({ length: 5 }, (_, i) =>
//         `<div class="t4-dot ${i < filled ? "t4-dot-on" : "t4-dot-off"}"></div>`
//       ).join("");

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t4-resume">

//   <div class="t4-hdr">
//     <div class="t4-hdr-top">
//       <div>
//         <div class="t4-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="t4-title">${jobTitle}</div>
//       </div>
//       <div class="t4-chips">
//         ${contact?.email    ? `<span class="t4-chip">${contact.email}</span>`          : ""}
//         ${contact?.phone    ? `<span class="t4-chip">${contact.phone}</span>`          : ""}
//         ${addressParts.length ? `<span class="t4-chip">${addressParts.join(", ")}</span>` : ""}
//         ${linkedinUrl  ? `<span class="t4-chip">${linkedinUrl}</span>`  : ""}
//         ${portfolioUrl ? `<span class="t4-chip">${portfolioUrl}</span>` : ""}
//       </div>
//     </div>
//   </div>
//   <div class="t4-rule"></div>

//   <div class="t4-body">

//     <!-- LEFT / MAIN -->
//     <div class="t4-left">

//       ${summary ? `
//       <div class="t4-sec">Profile <div class="t4-sec-line"></div></div>
//       <div class="t4-summary">${summary.replace(/\n/g, "<br>")}</div>
//       ` : ""}

//       ${experiences.length > 0 ? `
//       <div class="t4-sec">Experience <div class="t4-sec-line"></div></div>
//       ${experiences.map((exp, idx) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         const last = idx === experiences.length - 1;
//         return `<div class="t4-tl-item">
//           <div class="t4-tl-spine">
//             <div class="t4-tl-dot"></div>
//             ${!last ? `<div class="t4-tl-line"></div>` : ""}
//           </div>
//           <div class="t4-tl-body">
//             <div class="t4-tl-title">${exp.jobTitle || ""}</div>
//             <div class="t4-tl-meta">
//               <span class="t4-tl-co">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</span>
//               <span class="t4-tl-date">${s} – ${e}</span>
//             </div>
//             ${exp.text ? renderExpText(exp.text) : ""}
//           </div>
//         </div>`;
//       }).join("")}
//       ` : ""}

//       ${educations.length > 0 ? `
//       <div class="t4-sec">Education <div class="t4-sec-line"></div></div>
//       ${educations.map((edu, idx) => {
//         const dateStr = edu.startDate || edu.endDate
//           ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//           : "";
//         const last = idx === educations.length - 1;
//         return `<div class="t4-tl-item">
//           <div class="t4-tl-spine">
//             <div class="t4-tl-dot t4-tl-dot-edu"></div>
//             ${!last ? `<div class="t4-tl-line"></div>` : ""}
//           </div>
//           <div class="t4-tl-body">
//             <div class="t4-tl-title t4-tl-title-edu">${edu.schoolname || ""}</div>
//             <div class="t4-tl-meta">
//               <span class="t4-tl-co t4-tl-co-edu">${edu.degree || ""}${edu.degree && edu.location ? " · " : ""}${edu.location || ""}</span>
//               ${dateStr ? `<span class="t4-tl-date t4-tl-date-edu">${dateStr}</span>` : ""}
//             </div>
//             ${renderEduText(edu.text || "")}
//           </div>
//         </div>`;
//       }).join("")}
//       ` : ""}

//       ${hasCustom ? fin.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
//         <div>
//           ${s.name ? `<div class="t4-sec">${s.name} <div class="t4-sec-line"></div></div>` : ""}
//           ${s.description ? `<div class="t4-custom-content">${s.description}</div>` : ""}
//         </div>`).join("") : ""}

//     </div>

//     <!-- RIGHT SIDEBAR -->
//     <div class="t4-right">

//       ${skills.length > 0 ? `
//       <div class="t4-sec" style="margin-top:0">Skills <div class="t4-sec-line"></div></div>
//       ${skills.map((s) => `
//         <div class="t4-sk-row">
//           <span class="t4-sk-name">${s.skill || ""}</span>
//           <div class="t4-sk-dots">${dotRating(levelToDots(s.level))}</div>
//         </div>`).join("")}
//       ` : ""}

//       ${hasLangs ? `
//       <div class="t4-sec">Languages <div class="t4-sec-line"></div></div>
//       ${fin.languages.filter((l: any) => l.name?.trim()).map((l: any) => `
//         <div class="t4-lang-row">
//           <span class="t4-lang-name">${l.name}</span>
//           ${l.level ? `<span class="t4-lang-badge">${langLabel(l.level)}</span>` : ""}
//         </div>`).join("")}
//       ` : ""}

//       ${hasCerts ? `
//       <div class="t4-sec">Certifications <div class="t4-sec-line"></div></div>
//       ${fin.certificationsAndLicenses.filter((i: any) => i.name?.replace(/<[^>]*>/g,"").trim()).map((i: any) =>
//         `<div class="t4-cert">${i.name}</div>`).join("")}
//       ` : ""}

//       ${hasHobby ? `
//       <div class="t4-sec">Interests <div class="t4-sec-line"></div></div>
//       <div class="t4-pill-row">
//         ${fin.hobbiesAndInterests.filter((i: any) => i.name?.replace(/<[^>]*>/g,"").trim()).map((i: any) =>
//           `<span class="t4-pill">${i.name.replace(/<[^>]*>/g,"").trim()}</span>`).join("")}
//       </div>
//       ` : ""}

//       ${hasAwards ? `
//       <div class="t4-sec">Awards <div class="t4-sec-line"></div></div>
//       ${fin.awardsAndHonors.filter((i: any) => i.name?.replace(/<[^>]*>/g,"").trim()).map((i: any) =>
//         `<div class="t4-cert">${i.name}</div>`).join("")}
//       ` : ""}

//       ${hasWeb ? `
//       <div class="t4-sec">Online <div class="t4-sec-line"></div></div>
//       ${fin.websitesAndSocialMedia.filter((i: any) => i.websiteUrl || i.socialMedia).map((i: any) =>
//         `<div class="t4-side-item">${i.websiteUrl ? `<div>${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>${i.socialMedia}</div>` : ""}</div>`
//       ).join("")}
//       ` : ""}

//       ${hasRefs ? `
//       <div class="t4-sec">References <div class="t4-sec-line"></div></div>
//       ${fin.references.filter((i: any) => i.name?.replace(/<[^>]*>/g,"").trim()).map((i: any) =>
//         `<div class="t4-side-item">${i.name}</div>`).join("")}
//       ` : ""}

//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ══════════════════════════════════════════════════════
//      PDF DOWNLOAD + UPLOAD
//   ══════════════════════════════════════════════════════ */
//   const UseContext   = useContext(CreateContext);
//   const Contactid    = UseContext?.contact.contactId;
//   const userDetails  = getLocalStorage<User>("user_details");
//   const userId       = userDetails?.id;

//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );
//       const pdfBlob = res.data;
//       const url = URL.createObjectURL(pdfBlob);
//       const a   = document.createElement("a");
//       a.href     = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       await fetchOldResumeData(pdfBlob);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
//     if (!userId || !Contactid) return;
//     try {
//       const formData = new FormData();
//       formData.append("userId",    userId);
//       formData.append("message",   "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume",    pdfBlob, "resume.pdf");
//       await axios.post(`${API_URL}/api/users/download-resume`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) => html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ══════════════════════════════════════════════════════
//      JSX PREVIEW
//   ══════════════════════════════════════════════════════ */
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button
//             onClick={handleDownload}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div
//         className={`t4-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* ── HEADER ── */}
//         <div className="t4-hdr">
//           <div className="t4-hdr-top">
//             <div>
//               <div className="t4-name">{contact?.firstName} {contact?.lastName}</div>
//               <div className="t4-title">{jobTitle}</div>
//             </div>
//             <div className="t4-chips">
//               {contact?.email    && <span className="t4-chip">{contact.email}</span>}
//               {contact?.phone    && <span className="t4-chip">{contact.phone}</span>}
//               {addressParts.length > 0 && <span className="t4-chip">{addressParts.join(", ")}</span>}
//               {linkedinUrl  && <span className="t4-chip">{linkedinUrl}</span>}
//               {portfolioUrl && <span className="t4-chip">{portfolioUrl}</span>}
//             </div>
//           </div>
//         </div>
//         <div className="t4-rule" />

//         <div className="t4-body">

//           {/* ── LEFT / MAIN ── */}
//           <div className="t4-left">

//             {summary && (
//               <>
//                 <div className="t4-sec">Profile <div className="t4-sec-line" /></div>
//                 <div
//                   className="t4-summary"
//                   dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//                 />
//               </>
//             )}

//             {/* EXPERIENCE */}
//             {experiences.length > 0 && (
//               <>
//                 <div className="t4-sec">Experience <div className="t4-sec-line" /></div>
//                 {experiences.map((exp, i) => (
//                   <div key={i} className="t4-tl-item">
//                     <div className="t4-tl-spine">
//                       <div className="t4-tl-dot" />
//                       {i < experiences.length - 1 && <div className="t4-tl-line" />}
//                     </div>
//                     <div className="t4-tl-body">
//                       <div className="t4-tl-title">{exp.jobTitle}</div>
//                       <div className="t4-tl-meta">
//                         <span className="t4-tl-co">
//                           {exp.employer}{exp.location && ` · ${exp.location}`}
//                         </span>
//                         <span className="t4-tl-date">
//                           <MonthYearDisplay value={exp.startDate} shortYear />
//                           {" – "}
//                           {exp.endDate
//                             ? <MonthYearDisplay value={exp.endDate} shortYear />
//                             : "Present"}
//                         </span>
//                       </div>
//                       {exp.text && (
//                         <div
//                           className="t4-tl-content t4-wrap-break-word"
//                           dangerouslySetInnerHTML={{ __html: exp.text }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* EDUCATION */}
//             {educations.length > 0 && (
//               <>
//                 <div className="t4-sec">Education <div className="t4-sec-line" /></div>
//                 {educations.map((edu, index) => {
//                   let textContent = null;
//                   if (edu.text) {
//                     if (edu.text.includes("<") && edu.text.includes(">")) {
//                       textContent = (
//                         <div className="t4-tl-content" dangerouslySetInnerHTML={{ __html: edu.text }} />
//                       );
//                     } else {
//                       const lines = edu.text.split("\n").filter((l) => l.trim());
//                       if (lines.some((l) => l.trim().startsWith("-"))) {
//                         textContent = (
//                           <div className="t4-tl-content">
//                             <ul className="t4-edu-list">
//                               {lines.map((l, li) => {
//                                 const t = l.trim();
//                                 const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                                 return c ? <li key={li}>{c}</li> : null;
//                               })}
//                             </ul>
//                           </div>
//                         );
//                       } else {
//                         textContent = (
//                           <div className="t4-tl-content" style={{ whiteSpace: "pre-wrap" }}>
//                             {stripHtml(edu.text)}
//                           </div>
//                         );
//                       }
//                     }
//                   }
//                   return (
//                     <div key={edu.id || index} className="t4-tl-item">
//                       <div className="t4-tl-spine">
//                         <div className="t4-tl-dot t4-tl-dot-edu" />
//                         {index < educations.length - 1 && <div className="t4-tl-line" />}
//                       </div>
//                       <div className="t4-tl-body">
//                         <div className="t4-tl-title t4-tl-title-edu">{edu.schoolname || ""}</div>
//                         <div className="t4-tl-meta">
//                           <span className="t4-tl-co t4-tl-co-edu">
//                             {edu.degree && <span>{edu.degree}</span>}
//                             {edu.degree && edu.location && " · "}
//                             {edu.location && <span>{edu.location}</span>}
//                           </span>
//                           {(edu.startDate || edu.endDate) && (
//                             <span className="t4-tl-date t4-tl-date-edu">
//                               {edu.startDate || ""}
//                               {edu.startDate && edu.endDate && " – "}
//                               {edu.endDate || ""}
//                             </span>
//                           )}
//                         </div>
//                         {textContent}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {/* CUSTOM SECTIONS */}
//             {hasCustom &&
//               fin.customSection
//                 .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                 .map((section: any, index: number) => (
//                   <div key={section.id || index}>
//                     {section.name && (
//                       <div className="t4-sec">{section.name} <div className="t4-sec-line" /></div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="t4-custom-content"
//                         dangerouslySetInnerHTML={{ __html: section.description }}
//                       />
//                     )}
//                   </div>
//                 ))}

//           </div>

//           {/* ── RIGHT SIDEBAR ── */}
//           <div className="t4-right">

//             {/* SKILLS — dot ratings */}
//             {skills.length > 0 && (
//               <>
//                 <div className="t4-sec" style={{ marginTop: 0 }}>
//                   Skills <div className="t4-sec-line" />
//                 </div>
//                 {skills.map((skill, i) => (
//                   <div key={i} className="t4-sk-row">
//                     <span className="t4-sk-name">{skill.skill}</span>
//                     <div className="t4-sk-dots">
//                       {Array.from({ length: 5 }, (_, idx) => (
//                         <div
//                           key={idx}
//                           className={`t4-dot ${idx < levelToDots(skill.level) ? "t4-dot-on" : "t4-dot-off"}`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* LANGUAGES */}
//             {hasLangs && (
//               <>
//                 <div className="t4-sec">Languages <div className="t4-sec-line" /></div>
//                 {fin.languages.map((lang: any, index: number) =>
//                   lang.name?.trim() ? (
//                     <div key={lang._id || index} className="t4-lang-row">
//                       <span className="t4-lang-name">{lang.name}</span>
//                       {lang.level && (
//                         <span className="t4-lang-badge">{langLabel(lang.level)}</span>
//                       )}
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//             {/* CERTIFICATIONS */}
//             {hasCerts && (
//               <>
//                 <div className="t4-sec">Certifications <div className="t4-sec-line" /></div>
//                 {fin.certificationsAndLicenses.map((item: any, index: number) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                     <div
//                       key={item.id || index}
//                       className="t4-cert"
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ) : null
//                 )}
//               </>
//             )}

//             {/* INTERESTS / HOBBIES */}
//             {hasHobby && (
//               <>
//                 <div className="t4-sec">Interests <div className="t4-sec-line" /></div>
//                 <div className="t4-pill-row">
//                   {fin.hobbiesAndInterests.map((item: any, index: number) =>
//                     item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                       <span key={item.id || index} className="t4-pill">
//                         {item.name.replace(/<[^>]*>/g, "").trim()}
//                       </span>
//                     ) : null
//                   )}
//                 </div>
//               </>
//             )}

//             {/* AWARDS */}
//             {hasAwards && (
//               <>
//                 <div className="t4-sec">Awards <div className="t4-sec-line" /></div>
//                 {fin.awardsAndHonors.map((item: any, index: number) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                     <div
//                       key={item.id || index}
//                       className="t4-cert"
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ) : null
//                 )}
//               </>
//             )}

//             {/* WEBSITES */}
//             {hasWeb && (
//               <>
//                 <div className="t4-sec">Online <div className="t4-sec-line" /></div>
//                 {fin.websitesAndSocialMedia.map((item: any, index: number) =>
//                   (item.websiteUrl || item.socialMedia) ? (
//                     <div key={item.id || index} className="t4-side-item">
//                       {item.websiteUrl  && <div>{item.websiteUrl}</div>}
//                       {item.socialMedia && <div>{item.socialMedia}</div>}
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//             {/* REFERENCES */}
//             {hasRefs && (
//               <>
//                 <div className="t4-sec">References <div className="t4-sec-line" /></div>
//                 {fin.references.map((item: any, index: number) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                     <div
//                       key={item.id || index}
//                       className="t4-side-item"
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ) : null
//                 )}
//               </>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateFour;