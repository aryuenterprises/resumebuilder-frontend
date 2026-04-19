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

// /* Skill fill colours cycling */
// const SKILL_COLOURS = ["#6ee7b7", "#3b82f6", "#a78bfa", "#f59e0b", "#ec4899", "#34d399", "#60a5fa"];

// /* Language level → filled dots / 5 */
// const levelToDots = (level?: string | number): number => {
//   if (!level) return 0;
//   return Math.round((Number(level) / 4) * 5);
// };

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const fin       = (!Array.isArray(finalize) && finalize) ? finalize as any : null;
//   const hasLangs  = fin && Array.isArray(fin.languages)                && fin.languages.some((l: any) => l.name?.trim());
//   const hasCerts  = fin && Array.isArray(fin.certificationsAndLicenses) && fin.certificationsAndLicenses.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim());
//   const hasHobby  = fin && Array.isArray(fin.hobbiesAndInterests)       && fin.hobbiesAndInterests.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim());
//   const hasAwards = fin && Array.isArray(fin.awardsAndHonors)           && fin.awardsAndHonors.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim());
//   const hasRefs   = fin && Array.isArray(fin.references)               && fin.references.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim());
//   const hasWeb    = fin && Array.isArray(fin.websitesAndSocialMedia)    && fin.websitesAndSocialMedia.some((i: any) => i.websiteUrl?.trim() || i.socialMedia?.trim());
//   const hasCustom = fin && Array.isArray(fin.customSection)             && fin.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim());

//   /* ══════════════════════════════════════════════════════
//      STYLES
//   ══════════════════════════════════════════════════════ */
//   const styles = `
// @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

// .t5-resume {
//   width: 210mm;
//   min-height: 297mm;
//   background: #ffffff;
//   font-family: 'Outfit', Arial, sans-serif;
//   font-size: 13px;
//   line-height: 1.5;
//   box-sizing: border-box;
// }

// .t5-resume.is-preview {
//   transform: scale(0.36);
//   transform-origin: top left;
//   width: 210mm;
//   height: auto;
//   max-height: none;
//   min-height: auto;
//   overflow: hidden;
// }

// .t5-resume p {
//   margin: 0 !important;
//   padding: 0 !important;
//   line-height: 1.5 !important;
// }

// /* ── TOP BAND ── */
// .t5-topband {
//   display: flex;
// }

// /* ── DARK ACCENT COLUMN (header + body left) ── */
// .t5-accent-col {
//   width: 72mm;
//   background: #0f0f13;
//   padding: 26px 20px 24px;
//   flex-shrink: 0;
//   box-sizing: border-box;
//   position: relative;
// }

// .t5-accent-col::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   right: -1px;
//   width: 3px;
//   height: 100%;
//   background: linear-gradient(180deg, #6ee7b7 0%, #3b82f6 50%, #a78bfa 100%);
// }

// /* ── LIGHT HEADER RIGHT ── */
// .t5-main-header {
//   flex: 1;
//   background: #f9fafb;
//   padding: 26px 22px 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 14px;
//   box-sizing: border-box;
// }

// /* ── NAME / ROLE ── */
// .t5-name {
//   font-size: 24px;
//   font-weight: 800;
//   color: #ffffff;
//   line-height: 1.1;
//   letter-spacing: -.3px;
//   margin-bottom: 4px;
// }

// .t5-role {
//   font-size: 10px;
//   font-weight: 600;
//   color: #6ee7b7;
//   text-transform: uppercase;
//   letter-spacing: .12em;
//   margin-bottom: 18px;
// }

// /* ── CONTACT ITEMS IN DARK COL ── */
// .t5-c-label {
//   font-size: 8.5px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: .1em;
//   color: #4b5563;
//   margin-bottom: 2px;
//   margin-top: 10px;
// }

// .t5-c-label:first-of-type { margin-top: 0; }

// .t5-c-val {
//   font-size: 10px;
//   color: #d1d5db;
//   line-height: 1.5;
//   word-break: break-word;
// }

// .t5-c-link {
//   color: #6ee7b7;
//   text-decoration: none;
//   font-size: 10px;
// }

// /* ── STAT BOXES ── */
// .t5-stats {
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap;
// }

// .t5-stat {
//   background: #ffffff;
//   border: 1px solid #e5e7eb;
//   border-radius: 10px;
//   padding: 9px 14px;
//   text-align: center;
//   min-width: 68px;
// }

// .t5-stat-num {
//   font-size: 22px;
//   font-weight: 800;
//   color: #0f0f13;
//   line-height: 1;
// }

// .t5-stat-label {
//   font-size: 8px;
//   color: #9ca3af;
//   text-transform: uppercase;
//   letter-spacing: .07em;
//   margin-top: 3px;
//   font-weight: 500;
// }

// /* ── SUMMARY ── */
// .t5-summary {
//   font-size: 11.5px;
//   color: #374151;
//   line-height: 1.75;
//   padding: 10px 12px;
//   background: #ffffff;
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
// }

// .t5-summary p {
//   font-size: 11.5px !important;
//   color: #374151 !important;
//   line-height: 1.75 !important;
// }

// /* ── BODY ── */
// .t5-body {
//   display: flex;
// }

// /* ── DARK BODY LEFT ── */
// .t5-bl {
//   width: 72mm;
//   background: #0f0f13;
//   padding: 20px 20px 28px;
//   flex-shrink: 0;
//   box-sizing: border-box;
//   position: relative;
// }

// .t5-bl::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   right: -1px;
//   width: 3px;
//   height: 100%;
//   background: linear-gradient(180deg, #6ee7b7 0%, #3b82f6 50%, #a78bfa 100%);
// }

// /* ── WHITE BODY RIGHT ── */
// .t5-br {
//   flex: 1;
//   padding: 20px 22px 28px;
//   background: #ffffff;
//   box-sizing: border-box;
// }

// /* ── LEFT SECTION TITLES ── */
// .t5-ls {
//   font-size: 8.5px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: .12em;
//   color: #6ee7b7;
//   margin-bottom: 10px;
//   margin-top: 20px;
// }

// .t5-ls:first-of-type { margin-top: 0; }

// /* ── SKILL BARS ── */
// .t5-sk-row {
//   margin-bottom: 9px;
// }

// .t5-sk-name {
//   font-size: 10.5px;
//   color: #e5e7eb;
//   font-weight: 500;
//   margin-bottom: 3px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .t5-sk-pct {
//   font-size: 8.5px;
//   color: #6b7280;
// }

// .t5-sk-track {
//   height: 3px;
//   background: #1f2937;
//   border-radius: 2px;
//   overflow: hidden;
// }

// .t5-sk-fill {
//   height: 100%;
//   border-radius: 2px;
// }

// /* ── LANG DOTS ── */
// .t5-lang-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 7px;
// }

// .t5-lang-name {
//   font-size: 10.5px;
//   color: #e5e7eb;
//   font-weight: 400;
// }

// .t5-lang-dots {
//   display: flex;
//   gap: 3px;
// }

// .t5-ldot {
//   width: 7px;
//   height: 7px;
//   border-radius: 50%;
// }

// .t5-ldot-on  { background: #6ee7b7; }
// .t5-ldot-off { background: #1f2937; }

// /* ── LEFT SIDEBAR ITEMS ── */
// .t5-si {
//   font-size: 10px;
//   color: #9ca3af;
//   margin-bottom: 5px;
//   padding-left: 12px;
//   position: relative;
//   line-height: 1.5;
// }

// .t5-si::before {
//   content: '';
//   position: absolute;
//   left: 0;
//   top: 6px;
//   width: 4px;
//   height: 4px;
//   border-radius: 50%;
//   background: #3b82f6;
// }

// /* ── DARK PILLS ── */
// .t5-dark-pills {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 4px;
// }

// .t5-dark-pill {
//   font-size: 9px;
//   padding: 2px 7px;
//   border-radius: 20px;
//   background: #1f2937;
//   color: #9ca3af;
//   font-weight: 500;
// }

// /* ── RIGHT SECTION TITLES ── */
// .t5-rs {
//   font-size: 9px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: .13em;
//   color: #0f0f13;
//   margin-bottom: 12px;
//   margin-top: 20px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }

// .t5-rs:first-of-type { margin-top: 0; }

// .t5-rs-line {
//   flex: 1;
//   height: 1.5px;
//   background: #f3f4f6;
// }

// .t5-rs-dot {
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background: #0f0f13;
//   flex-shrink: 0;
// }

// /* ── EXPERIENCE CARDS ── */
// .t5-exp-card {
//   background: #f9fafb;
//   border-radius: 10px;
//   padding: 12px 14px;
//   margin-bottom: 10px;
//   border: 1px solid #f3f4f6;
//   position: relative;
//   overflow: hidden;
// }

// .t5-exp-card::before {
//   content: '';
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 3px;
//   height: 100%;
//   background: linear-gradient(180deg, #6ee7b7, #3b82f6);
// }

// .t5-exp-top {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 8px;
//   margin-bottom: 3px;
//   flex-wrap: wrap;
// }

// .t5-exp-title {
//   font-size: 13px;
//   font-weight: 700;
//   color: #0f0f13;
//   line-height: 1.3;
// }

// .t5-exp-date {
//   font-size: 9px;
//   font-weight: 600;
//   color: #ffffff;
//   background: #0f0f13;
//   padding: 2px 8px;
//   border-radius: 20px;
//   white-space: nowrap;
//   line-height: 1.5;
// }

// .t5-exp-co {
//   font-size: 10.5px;
//   color: #6366f1;
//   font-weight: 600;
//   margin-bottom: 5px;
// }

// .t5-exp-content {
//   font-size: 11px;
//   color: #4b5563;
//   line-height: 1.65;
// }

// .t5-exp-content p {
//   font-size: 11px !important;
//   color: #4b5563 !important;
//   line-height: 1.65 !important;
// }

// .t5-exp-content ul,
// .t5-exp-list {
//   list-style-type: disc !important;
//   padding-left: 14px !important;
//   margin: 3px 0 !important;
// }

// .t5-exp-content ol {
//   list-style-type: decimal !important;
//   padding-left: 14px !important;
//   margin: 3px 0 !important;
// }

// .t5-exp-content li,
// .t5-exp-list li {
//   margin-bottom: 2px !important;
//   line-height: 1.55 !important;
//   font-size: 11px !important;
//   color: #4b5563 !important;
// }

// /* ── EDU CARDS ── */
// .t5-edu-card {
//   display: flex;
//   gap: 12px;
//   margin-bottom: 12px;
//   align-items: flex-start;
// }

// .t5-edu-icon {
//   width: 36px;
//   height: 36px;
//   border-radius: 8px;
//   background: #0f0f13;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
// }

// .t5-edu-school {
//   font-size: 12.5px;
//   font-weight: 700;
//   color: #0f0f13;
//   line-height: 1.3;
//   margin-bottom: 2px;
// }

// .t5-edu-deg {
//   font-size: 10.5px;
//   color: #6366f1;
//   font-weight: 500;
//   margin-bottom: 2px;
// }

// .t5-edu-date {
//   font-size: 10px;
//   color: #9ca3af;
// }

// /* ── EDU TEXT CONTENT ── */
// .t5-edu-text {
//   font-size: 11px;
//   color: #4b5563;
//   line-height: 1.6;
//   margin-top: 4px;
// }

// .t5-edu-text p {
//   font-size: 11px !important;
//   color: #4b5563 !important;
// }

// .t5-edu-text ul,
// .t5-edu-list {
//   list-style-type: disc !important;
//   padding-left: 14px !important;
//   margin: 3px 0 !important;
// }

// .t5-edu-text li,
// .t5-edu-list li {
//   margin-bottom: 2px !important;
//   line-height: 1.55 !important;
//   font-size: 11px !important;
//   color: #4b5563 !important;
// }

// /* ── ADDITIONAL / CUSTOM ── */
// .t5-custom-content {
//   font-size: 11px;
//   color: #4b5563;
//   line-height: 1.65;
// }

// .t5-custom-content p {
//   font-size: 11px !important;
//   color: #4b5563 !important;
// }

// .t5-wrap-break-word {
//   word-wrap: break-word;
//   overflow-wrap: break-word;
// }

// /* ── PRINT ── */
// @media print {
//   @page { size: A4; margin: 0; }

//   .t5-resume {
//     width: 210mm !important;
//     min-height: 297mm !important;
//     margin: 0 !important;
//     box-shadow: none !important;
//   }

//   .t5-accent-col,
//   .t5-bl {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//   }

//   .t5-accent-col::after,
//   .t5-bl::after,
//   .t5-exp-card::before,
//   .t5-sk-fill,
//   .t5-ldot-on,
//   .t5-exp-date,
//   .t5-dark-pill,
//   .t5-si::before {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//   }

//   .no-print { display: none !important; }
//   .t5-exp-card { page-break-inside: avoid; break-inside: avoid; }
//   .t5-edu-card { page-break-inside: avoid; break-inside: avoid; }
//   .t5-rs { page-break-after: avoid; break-after: avoid; }
// }

// /* ── RESPONSIVE ── */
// @media (max-width: 768px) {
//   .t5-resume   { width: 100%; }
//   .t5-topband  { flex-direction: column; }
//   .t5-body     { flex-direction: column; }
//   .t5-accent-col,
//   .t5-bl       { width: 100%; }
//   .t5-accent-col::after,
//   .t5-bl::after {
//     width: 100%;
//     height: 3px;
//     top: auto;
//     bottom: -1px;
//     right: 0;
//   }
// }
// `;

//   /* ══════════════════════════════════════════════════════
//      HTML GENERATION
//   ══════════════════════════════════════════════════════ */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExpText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">"))
//         return `<div class="t5-exp-content t5-wrap-break-word">${text}</div>`;
//       const lines = text.split("\n").filter((l) => l.trim());
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•")))
//         return `<div class="t5-exp-content"><ul class="t5-exp-list">${lines.map((l) => {
//           const t = l.trim();
//           const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//           return c ? `<li>${c}</li>` : "";
//         }).join("")}</ul></div>`;
//       return `<div class="t5-exp-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEduText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">"))
//         return `<div class="t5-edu-text">${text}</div>`;
//       const lines = text.split("\n").filter((l) => l.trim());
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•")))
//         return `<div class="t5-edu-text"><ul class="t5-edu-list">${lines.map((l) => {
//           const t = l.trim();
//           const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//           return c ? `<li>${c}</li>` : "";
//         }).join("")}</ul></div>`;
//       return `<div class="t5-edu-text" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const eduIconSvg = (stroke: string) =>
//       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;

//     const eduIconColours = ["#6ee7b7", "#a78bfa", "#f59e0b", "#ec4899", "#60a5fa"];

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t5-resume">

//   <!-- TOP BAND -->
//   <div class="t5-topband">

//     <!-- DARK LEFT HEADER -->
//     <div class="t5-accent-col">
//       <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       <div class="t5-role">${jobTitle}</div>
//       ${contact?.email    ? `<div class="t5-c-label">Email</div><div class="t5-c-val">${contact.email}</div>` : ""}
//       ${contact?.phone    ? `<div class="t5-c-label">Phone</div><div class="t5-c-val">${contact.phone}</div>` : ""}
//       ${addressParts.length ? `<div class="t5-c-label">Location</div><div class="t5-c-val">${addressParts.join(", ")}</div>` : ""}
//       ${linkedinUrl  ? `<div class="t5-c-label">LinkedIn</div><a class="t5-c-link" href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">${linkedinUrl}</a>` : ""}
//       ${portfolioUrl ? `<div class="t5-c-label">Portfolio</div><a class="t5-c-link" href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">${portfolioUrl}</a>` : ""}
//     </div>

//     <!-- LIGHT RIGHT HEADER -->
//     <div class="t5-main-header">
//       <div class="t5-stats">
//         <div class="t5-stat"><div class="t5-stat-num">${experiences.length > 0 ? experiences.length : "–"}</div><div class="t5-stat-label">Roles</div></div>
//         <div class="t5-stat"><div class="t5-stat-num">${skills.length > 0 ? skills.length : "–"}</div><div class="t5-stat-label">Skills</div></div>
//         <div class="t5-stat"><div class="t5-stat-num">${educations.length > 0 ? educations.length : "–"}</div><div class="t5-stat-label">Degrees</div></div>
//       </div>
//       ${summary ? `<div class="t5-summary">${summary.replace(/\n/g, "<br>")}</div>` : ""}
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="t5-body">

//     <!-- DARK LEFT BODY -->
//     <div class="t5-bl">

//       ${skills.length > 0 ? `
//       <div class="t5-ls">Core Skills</div>
//       ${skills.map((s, i) => `
//         <div class="t5-sk-row">
//           <div class="t5-sk-name">${s.skill || ""}<span class="t5-sk-pct">${s.level ? Math.round((Number(s.level) / 4) * 100) + "%" : ""}</span></div>
//           ${s.skill && s.level ? `<div class="t5-sk-track"><div class="t5-sk-fill" style="width:${(Number(s.level) / 4) * 100}%;background:${SKILL_COLOURS[i % SKILL_COLOURS.length]}"></div></div>` : ""}
//         </div>`).join("")}
//       ` : ""}

//       ${hasLangs ? `
//       <div class="t5-ls">Languages</div>
//       ${fin.languages.filter((l: any) => l.name?.trim()).map((l: any) => {
//         const filled = levelToDots(l.level);
//         const dots = Array.from({ length: 5 }, (_, idx) =>
//           `<div class="t5-ldot ${idx < filled ? "t5-ldot-on" : "t5-ldot-off"}"></div>`
//         ).join("");
//         return `<div class="t5-lang-row"><div class="t5-lang-name">${l.name}</div><div class="t5-lang-dots">${dots}</div></div>`;
//       }).join("")}
//       ` : ""}

//       ${hasCerts ? `
//       <div class="t5-ls">Certifications</div>
//       ${fin.certificationsAndLicenses.filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i: any) =>
//         `<div class="t5-si">${i.name.replace(/<[^>]*>/g, "").trim()}</div>`
//       ).join("")}
//       ` : ""}

//       ${hasAwards ? `
//       <div class="t5-ls">Awards</div>
//       ${fin.awardsAndHonors.filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i: any) =>
//         `<div class="t5-si">${i.name.replace(/<[^>]*>/g, "").trim()}</div>`
//       ).join("")}
//       ` : ""}

//       ${hasHobby ? `
//       <div class="t5-ls">Interests</div>
//       <div class="t5-dark-pills">
//         ${fin.hobbiesAndInterests.filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i: any) =>
//           `<span class="t5-dark-pill">${i.name.replace(/<[^>]*>/g, "").trim()}</span>`
//         ).join("")}
//       </div>
//       ` : ""}

//       ${hasRefs ? `
//       <div class="t5-ls">References</div>
//       ${fin.references.filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i: any) =>
//         `<div class="t5-si">${i.name.replace(/<[^>]*>/g, "").trim()}</div>`
//       ).join("")}
//       ` : ""}

//       ${hasWeb ? `
//       <div class="t5-ls">Online</div>
//       ${fin.websitesAndSocialMedia.filter((i: any) => i.websiteUrl || i.socialMedia).map((i: any) =>
//         `<div class="t5-si">${i.websiteUrl || i.socialMedia}</div>`
//       ).join("")}
//       ` : ""}

//     </div>

//     <!-- WHITE RIGHT BODY -->
//     <div class="t5-br">

//       ${experiences.length > 0 ? `
//       <div class="t5-rs">Experience <div class="t5-rs-line"></div><div class="t5-rs-dot"></div></div>
//       ${experiences.map((exp) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         return `<div class="t5-exp-card">
//           <div class="t5-exp-top">
//             <div class="t5-exp-title">${exp.jobTitle || ""}</div>
//             <div class="t5-exp-date">${s} – ${e}</div>
//           </div>
//           <div class="t5-exp-co">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//           ${exp.text ? renderExpText(exp.text) : ""}
//         </div>`;
//       }).join("")}
//       ` : ""}

//       ${educations.length > 0 ? `
//       <div class="t5-rs">Education <div class="t5-rs-line"></div><div class="t5-rs-dot"></div></div>
//       ${educations.map((edu, idx) => {
//         const dateStr = edu.startDate || edu.endDate
//           ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//           : "";
//         const iconColour = eduIconColours[idx % eduIconColours.length];
//         return `<div class="t5-edu-card">
//           <div class="t5-edu-icon">${eduIconSvg(iconColour)}</div>
//           <div>
//             <div class="t5-edu-school">${edu.schoolname || ""}</div>
//             <div class="t5-edu-deg">${edu.degree || ""}${edu.degree && edu.location ? " · " : ""}${edu.location || ""}</div>
//             ${dateStr ? `<div class="t5-edu-date">${dateStr}</div>` : ""}
//             ${renderEduText(edu.text || "")}
//           </div>
//         </div>`;
//       }).join("")}
//       ` : ""}

//       ${hasCustom ? fin.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
//         <div>
//           ${s.name ? `<div class="t5-rs">${s.name} <div class="t5-rs-line"></div><div class="t5-rs-dot"></div></div>` : ""}
//           ${s.description ? `<div class="t5-custom-content">${s.description}</div>` : ""}
//         </div>`).join("") : ""}

//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ══════════════════════════════════════════════════════
//      PDF DOWNLOAD + UPLOAD
//   ══════════════════════════════════════════════════════ */
//   const UseContext  = useContext(CreateContext);
//   const Contactid   = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId      = userDetails?.id;

//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html = generateHTML();
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );
//       const pdfBlob = res.data;
//       const url = URL.createObjectURL(pdfBlob);
//       const a = document.createElement("a");
//       a.href = url;
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
//   const eduIconColours = ["#6ee7b7", "#a78bfa", "#f59e0b", "#ec4899", "#60a5fa"];

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
//         className={`t5-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* ── TOP BAND ── */}
//         <div className="t5-topband">

//           {/* DARK LEFT HEADER */}
//           <div className="t5-accent-col">
//             <div className="t5-name">{contact?.firstName} {contact?.lastName}</div>
//             <div className="t5-role">{jobTitle}</div>
//             {contact?.email && <><div className="t5-c-label">Email</div><div className="t5-c-val">{contact.email}</div></>}
//             {contact?.phone && <><div className="t5-c-label">Phone</div><div className="t5-c-val">{contact.phone}</div></>}
//             {addressParts.length > 0 && <><div className="t5-c-label">Location</div><div className="t5-c-val">{addressParts.join(", ")}</div></>}
//             {linkedinUrl && <><div className="t5-c-label">LinkedIn</div><a className="t5-c-link" href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">{linkedinUrl}</a></>}
//             {portfolioUrl && <><div className="t5-c-label">Portfolio</div><a className="t5-c-link" href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">{portfolioUrl}</a></>}
//           </div>

//           {/* LIGHT RIGHT HEADER */}
//           <div className="t5-main-header">
//             <div className="t5-stats">
//               <div className="t5-stat">
//                 <div className="t5-stat-num">{experiences.length || "–"}</div>
//                 <div className="t5-stat-label">Roles</div>
//               </div>
//               <div className="t5-stat">
//                 <div className="t5-stat-num">{skills.length || "–"}</div>
//                 <div className="t5-stat-label">Skills</div>
//               </div>
//               <div className="t5-stat">
//                 <div className="t5-stat-num">{educations.length || "–"}</div>
//                 <div className="t5-stat-label">Degrees</div>
//               </div>
//             </div>
//             {summary && (
//               <div
//                 className="t5-summary"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             )}
//           </div>
//         </div>

//         {/* ── BODY ── */}
//         <div className="t5-body">

//           {/* DARK LEFT BODY */}
//           <div className="t5-bl">

//             {skills.length > 0 && (
//               <>
//                 <div className="t5-ls">Core Skills</div>
//                 {skills.map((skill, i) => (
//                   <div key={i} className="t5-sk-row">
//                     <div className="t5-sk-name">
//                       {skill.skill}
//                       {skill.level && <span className="t5-sk-pct">{Math.round((Number(skill.level) / 4) * 100)}%</span>}
//                     </div>
//                     {skill.skill && skill.level && (
//                       <div className="t5-sk-track">
//                         <div
//                           className="t5-sk-fill"
//                           style={{
//                             width: `${(Number(skill.level) / 4) * 100}%`,
//                             background: SKILL_COLOURS[i % SKILL_COLOURS.length],
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}

//             {hasLangs && (
//               <>
//                 <div className="t5-ls">Languages</div>
//                 {fin.languages.map((lang: any, index: number) =>
//                   lang.name?.trim() ? (
//                     <div key={lang._id || index} className="t5-lang-row">
//                       <div className="t5-lang-name">{lang.name}</div>
//                       <div className="t5-lang-dots">
//                         {Array.from({ length: 5 }, (_, idx) => (
//                           <div key={idx} className={`t5-ldot ${idx < levelToDots(lang.level) ? "t5-ldot-on" : "t5-ldot-off"}`} />
//                         ))}
//                       </div>
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//             {hasCerts && (
//               <>
//                 <div className="t5-ls">Certifications</div>
//                 {fin.certificationsAndLicenses.map((item: any, index: number) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                     <div key={item.id || index} className="t5-si">
//                       {item.name.replace(/<[^>]*>/g, "").trim()}
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//             {hasAwards && (
//               <>
//                 <div className="t5-ls">Awards</div>
//                 {fin.awardsAndHonors.map((item: any, index: number) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                     <div key={item.id || index} className="t5-si">
//                       {item.name.replace(/<[^>]*>/g, "").trim()}
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//             {hasHobby && (
//               <>
//                 <div className="t5-ls">Interests</div>
//                 <div className="t5-dark-pills">
//                   {fin.hobbiesAndInterests.map((item: any, index: number) =>
//                     item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                       <span key={item.id || index} className="t5-dark-pill">
//                         {item.name.replace(/<[^>]*>/g, "").trim()}
//                       </span>
//                     ) : null
//                   )}
//                 </div>
//               </>
//             )}

//             {hasRefs && (
//               <>
//                 <div className="t5-ls">References</div>
//                 {fin.references.map((item: any, index: number) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim() ? (
//                     <div key={item.id || index} className="t5-si">
//                       {item.name.replace(/<[^>]*>/g, "").trim()}
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//             {hasWeb && (
//               <>
//                 <div className="t5-ls">Online</div>
//                 {fin.websitesAndSocialMedia.map((item: any, index: number) =>
//                   (item.websiteUrl || item.socialMedia) ? (
//                     <div key={item.id || index} className="t5-si">
//                       {item.websiteUrl || item.socialMedia}
//                     </div>
//                   ) : null
//                 )}
//               </>
//             )}

//           </div>

//           {/* WHITE RIGHT BODY */}
//           <div className="t5-br">

//             {/* EXPERIENCE */}
//             {experiences.length > 0 && (
//               <>
//                 <div className="t5-rs">
//                   Experience <div className="t5-rs-line" /><div className="t5-rs-dot" />
//                 </div>
//                 {experiences.map((exp, i) => (
//                   <div key={i} className="t5-exp-card">
//                     <div className="t5-exp-top">
//                       <div className="t5-exp-title">{exp.jobTitle}</div>
//                       <div className="t5-exp-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear />
//                         {" – "}
//                         {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                       </div>
//                     </div>
//                     <div className="t5-exp-co">
//                       {exp.employer}{exp.location && ` · ${exp.location}`}
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="t5-exp-content t5-wrap-break-word"
//                         dangerouslySetInnerHTML={{ __html: exp.text }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* EDUCATION */}
//             {educations.length > 0 && (
//               <>
//                 <div className="t5-rs">
//                   Education <div className="t5-rs-line" /><div className="t5-rs-dot" />
//                 </div>
//                 {educations.map((edu, index) => {
//                   let textContent = null;
//                   if (edu.text) {
//                     if (edu.text.includes("<") && edu.text.includes(">")) {
//                       textContent = <div className="t5-edu-text" dangerouslySetInnerHTML={{ __html: edu.text }} />;
//                     } else {
//                       const lines = edu.text.split("\n").filter((l) => l.trim());
//                       if (lines.some((l) => l.trim().startsWith("-"))) {
//                         textContent = (
//                           <div className="t5-edu-text">
//                             <ul className="t5-edu-list">
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
//                           <div className="t5-edu-text" style={{ whiteSpace: "pre-wrap" }}>
//                             {stripHtml(edu.text)}
//                           </div>
//                         );
//                       }
//                     }
//                   }
//                   const iconColour = eduIconColours[index % eduIconColours.length];
//                   return (
//                     <div key={edu.id || index} className="t5-edu-card">
//                       <div className="t5-edu-icon">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColour} strokeWidth="2">
//                           <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
//                           <path d="M6 12v5c3 3 9 3 12 0v-5" />
//                         </svg>
//                       </div>
//                       <div>
//                         <div className="t5-edu-school">{edu.schoolname || ""}</div>
//                         <div className="t5-edu-deg">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.degree && edu.location && " · "}
//                           {edu.location && <span>{edu.location}</span>}
//                         </div>
//                         {(edu.startDate || edu.endDate) && (
//                           <div className="t5-edu-date">
//                             {edu.startDate || ""}
//                             {edu.startDate && edu.endDate && " – "}
//                             {edu.endDate || ""}
//                           </div>
//                         )}
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
//                       <div className="t5-rs">
//                         {section.name} <div className="t5-rs-line" /><div className="t5-rs-dot" />
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="t5-custom-content"
//                         dangerouslySetInnerHTML={{ __html: section.description }}
//                       />
//                     )}
//                   </div>
//                 ))}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateFive;