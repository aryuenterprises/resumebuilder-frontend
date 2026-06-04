// // ─── Template Five ───────────────────────────────────────────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// // const TemplateFourteen: React.FC = () => {
// const TemplateFourteen: React.FC<ResumeProps> = ({ alldata }) => {
//   // const context = useContext(CreateContext);

//   // const pathname = usePathname();
//   // const lastSegment = pathname.split("/").pop();

//   // const contact = context.contact || {};
//   // const educations = context?.education || [];
//   // const experiences = context?.experiences || [];
//   // const skills = context?.skills || [];
//   // const finalize = context?.finalize || {};
//   // const summary = context?.summary || "";

//   const context = useContext(CreateContext);
//   console.log("context,", context);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;

//   /* ======================================================
//      CSS — SINGLE COLUMN | NAVY BLUE | SHARP CORPORATE
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

 

//    .t14-resume .resume-container {
//      margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #1a1a2e;
//     text-align: left;
//   }

//     .t14-resume.is-preview {
//       transform: scale(0.36);

//     transform-origin: top left;
//     width: 210mm; 
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
// }

//   /* ── HEADER ── */
//   .t14-resume .header-block {
//     background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
//     padding: 32px 36px 28px;
//     position: relative;
//     text-align: left;
//   }

//   .t14-resume .header-block::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
//   }

//   .t14-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 40px;
//     font-weight: 700;
//     line-height: 1.1;
//     color: #ffffff;
//     letter-spacing: 0.5px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t14-resume .header-jobtitle {
//     font-size: 12px;
//     font-weight: 500;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #c9a84c;
//     margin-bottom: 20px;
//     text-align: left;
//   }

//   .t14-resume .header-meta-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px 24px;
//     text-align: left;
//   }

//   .t14-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 12px;
//     color: #b0bcd4;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .header-meta-item .meta-icon {
//     width: 14px;
//     height: 14px;
//     opacity: 0.7;
//     flex-shrink: 0;
//   }

//   .t14-resume .header-meta-item a {
//     color: #c9a84c;
//     text-decoration: none;
//   }

//   .t14-resume .header-meta-item a:hover {
//     text-decoration: underline;
//   }

//   /* ── BODY ── */
//   .t14-resume .resume-body {
//     padding: 28px 36px 36px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t14-resume .section-block {
//     margin-bottom: 26px;
//     text-align: left;
//   }

//   .t14-resume .section-header {
//     display: flex;
//     align-items: center;
//     margin-bottom: 16px;
//     gap: 12px;
//     text-align: left;
//   }

//   .t14-resume .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t14-resume .section-accent-bar {
//     height: 2px;
//     flex: 1;
//     background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
//   }

//   /* ── SUMMARY ── */
//   .t14-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.8;
//     color: #333;
//     font-weight: 400;  
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t14-resume .entry-block {
//     margin-bottom: 18px;
//     padding-bottom: 18px;
//     border-bottom: 1px solid #eaedf5;
//     text-align: left;
//   }

//   .t14-resume .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .t14-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 10px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t14-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t14-resume .entry-date {
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//     color: #ffffff;
//     background: #2e4a7a;
//     padding: 3px 10px;
//     border-radius: 2px;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t14-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #4a6491;
//     font-weight: 500;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t14-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .entry-content ul,
//   .t14-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .entry-content ol,
//   .t14-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .entry-content li,
//   .t14-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.65 !important;
//     list-style-position: outside !important;
//   }

//   .t14-resume ul {
//     list-style-type: disc !important;
//   }

//   /* ── SKILLS ── */
//   .t14-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     text-align: left;
//   }

//   .t14-resume .skill-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     text-align: left;
//   }

//   .t14-resume .skill-name-label {
//     font-size: 13px;
//     font-weight: 500;
//     color: #1a2a4a;
//     min-width: 160px;
//     text-align: left;
//   }

//   .t14-resume .skill-track {
//     flex: 1;
//     height: 5px;
//     background: #e8edf5;
//     border-radius: 3px;
//     overflow: hidden;
//     max-width: 220px;
//   }

//   .t14-resume .skill-fill {
//     height: 100%;
//     background: linear-gradient(90deg, #1a2a4a, #4a7ab5);
//     border-radius: 3px;
//   }

//   /* ── LANGUAGES ── */
//   .t14-resume .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 10px;
//     text-align: left;
//   }

//   .t14-resume .lang-name {
//     font-size: 13px;
//     font-weight: 500;
//     color: #1a2a4a;
//     min-width: 160px;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t14-resume .additional-content {
//     font-size: 13px;
//     color: #444;
//     line-height: 1.7;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     margin-bottom: 7px;
//     text-align: left;
//   }

//   .t14-resume .additional-diamond {
//     width: 6px;
//     height: 6px;
//     background: #2e4a7a;
//     transform: rotate(45deg);
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t14-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t14-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 16mm 0;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t14-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .resume-container {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t14-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t14-resume .section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t14-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t14-resume .header-block {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .skill-fill,
//     .t14-resume .section-accent-bar {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t14-resume .resume-container { width: 100%; }
//     .t14-resume .header-block { padding: 20px; }
//     .t14-resume .resume-body { padding: 16px 20px; }
//     .t14-resume .entry-top-row { flex-direction: column; align-items: flex-start; }
//     .t14-resume .skill-name-label, .t14-resume .lang-name { min-width: 120px; }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const SectionHtml = (title: string) => `
//       <div class="section-header">
//         <div class="section-title">${title}</div>
//         <div class="section-accent-bar"></div>
//       </div>`;

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t14-resume ">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">
//             ${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }
//           </div>
//           <div class="header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           ${
//             summary
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Profile")}
//             <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//           </div>`
//               : ""
//           }

//           ${
//             experiences.length > 0
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Experience")}
//             ${experiences
//               .map((exp) => {
//                 const startFormatted = formatMonthYear(exp.startDate, true);
//                 const endFormatted = exp.endDate
//                   ? formatMonthYear(exp.endDate, true)
//                   : "Present";
//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` &nbsp;·&nbsp; ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           ${
//             educations.length > 0
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Education")}
//             ${educations
//               .map((edu) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                     : "";
//                 let textHtml = "";
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textHtml = `<div class="edu-content">${edu.text}</div>`;
//                   } else {
//                     const lines = edu.text
//                       .split("\n")
//                       .filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textHtml = `<ul class="edu-list">${lines
//                         .map((l: string) => {
//                           const t = l.trim();
//                           const c = t.startsWith("-")
//                             ? t.substring(1).trim()
//                             : t;
//                           return c ? `<li>${c}</li>` : "";
//                         })
//                         .join("")}</ul>`;
//                     } else {
//                       textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//                     }
//                   }
//                 }
//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${edu.schoolname || ""}</div>
//                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${edu.degree || edu.location ? `<div class="entry-subtitle">${edu.degree || ""}${edu.degree && edu.location ? " &nbsp;·&nbsp; " : ""}${edu.location || ""}</div>` : ""}
//                 ${textHtml}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           ${
//             skills.length > 0
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Skills")}
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (s) => `
//               <div class="skill-row">
//                 <span class="skill-name-label">${s.skill || ""}</span>
//                 ${s.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(s.level) / 4) * 100}%"></div></div>` : ""}
//               </div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "")
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Languages")}
//             <div class="skills-list">
//               ${finalize.languages
//                 .filter((l) => l.name && l.name.trim() !== "")
//                 .map(
//                   (l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//               </div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Certifications &amp; Licenses")}
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses
//                 .filter(
//                   (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                 )
//                 .map(
//                   (i) =>
//                     `<div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Hobbies &amp; Interests")}
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests
//                 .filter(
//                   (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                 )
//                 .map(
//                   (i) =>
//                     `<div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Awards &amp; Honors")}
//             <div class="additional-content">
//               ${finalize.awardsAndHonors
//                 .filter(
//                   (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                 )
//                 .map(
//                   (i) =>
//                     `<div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (i) =>
//                 (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//                 (i.socialMedia && i.socialMedia.trim() !== ""),
//             )
//               ? `
//           <div class="section-block">
//             ${SectionHtml("Websites &amp; Social Media")}
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia
//                 .filter((i) => i.websiteUrl || i.socialMedia)
//                 .map(
//                   (i) =>
//                     `<div class="additional-item"><div class="additional-diamond"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `
//           <div class="section-block">
//             ${SectionHtml("References")}
//             <div class="additional-content">
//               ${finalize.references
//                 .filter(
//                   (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                 )
//                 .map(
//                   (i) =>
//                     `<div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`,
//                 )
//                 .join("")}
//             </div>
//           </div>`
//               : ""
//           }

//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             )
//               ? finalize.customSection
//                   .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s) => `
//             <div class="section-block">
//               ${s.name ? SectionHtml(s.name) : ""}
//               ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//             </div>`,
//                   )
//                   .join("")
//               : ""
//           }

//         </div>
//       </div>
//     </body>
//     </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
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

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
//       {lastSegment === "download-resume" && (
//         <div
//           style={{
//             textAlign: "center",
//             marginTop: "20px",
//             marginBottom: "20px",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div
//         className={`t14-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="header-jobtitle">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="header-meta-grid">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">
//                 {addressParts.join(", ")}
//               </span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
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
//         <div className="resume-body">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Profile</div>
//                 <div className="section-accent-bar" />
//               </div>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: summary.replace(/\n/g, "<br>"),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Experience</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{exp.jobTitle}</div>
//                     <div className="entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear />
//                       ) : (
//                         "Present"
//                       )}
//                     </div>
//                   </div>
//                   <div className="entry-subtitle">
//                     {exp.employer}
//                     {exp.location && <> &nbsp;·&nbsp; {exp.location}</>}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Education</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = (
//                       <div
//                         className="edu-content"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     );
//                   } else {
//                     const lines = edu.text
//                       .split("\n")
//                       .filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <ul className="edu-list">
//                           {lines.map((l: string, li: number) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = (
//                         <div
//                           className="edu-content"
//                           style={{ whiteSpace: "pre-wrap" }}
//                         >
//                           {stripHtml(edu.text)}
//                         </div>
//                       );
//                     }
//                   }
//                 }
//                 return (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="entry-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " – "}
//                           {edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && <> &nbsp;·&nbsp; </>}
//                         {edu.location || ""}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {skills.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Skills</div>
//                 <div className="section-accent-bar" />
//               </div>
//               <div className="skills-list">
//                 {skills.map((skill, i) => (
//                   <div key={i} className="skill-row">
//                     <span className="skill-name-label">{skill.skill}</span>
//                     {skill.level && (
//                       <div className="skill-track">
//                         <div
//                           className="skill-fill"
//                           style={{
//                             width: `${(Number(skill.level) / 4) * 100}%`,
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Languages</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name &&
//                       lang.name.trim() !== "" && (
//                         <div key={lang._id || index} className="lang-row">
//                           <span className="lang-name">{lang.name}</span>
//                           {lang.level && (
//                             <div className="skill-track">
//                               <div
//                                 className="skill-fill"
//                                 style={{
//                                   width: `${(Number(lang.level) / 4) * 100}%`,
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">
//                     Certifications &amp; Licenses
//                   </div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* HOBBIES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Hobbies &amp; Interests</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Awards &amp; Honors</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* WEBSITES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (i) =>
//                 (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//                 (i.socialMedia && i.socialMedia.trim() !== ""),
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">
//                     Websites &amp; Social Media
//                   </div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div>
//                             {item.websiteUrl && (
//                               <span>Website: {item.websiteUrl}</span>
//                             )}
//                             {item.websiteUrl && item.socialMedia && " · "}
//                             {item.socialMedia && (
//                               <span>Social: {item.socialMedia}</span>
//                             )}
//                           </div>
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.references) &&
//             finalize.references.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">References</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <div key={section.id || index} className="section-block">
//                   {section.name && (
//                     <div className="section-header">
//                       <div className="section-title">{section.name}</div>
//                       <div className="section-accent-bar" />
//                     </div>
//                   )}
//                   {section.description && (
//                     <div
//                       className="custom-section-content"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>
//         {/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateFourteen;







// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// const TemplateFourteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   console.log("context,", context);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;

//   // Helper function to check if skills are categorized
//   const isCategorizedSkills = (skillsData: any[]) => {
//     if (!skillsData || skillsData.length === 0) return false;
//     return skillsData[0]?.title !== undefined;
//   };

//   // Helper function to render skills based on format
//   const renderSkills = () => {
//     if (!skills || skills.length === 0) return null;

//     const isCategorized = isCategorizedSkills(skills);

//     if (isCategorized) {
//       // Categorized Skills - Each category with its own section
//       return (
//         <div className="section-block">
//           <div className="section-header">
//             <div className="section-title">Skills</div>
//             <div className="section-accent-bar" />
//           </div>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category-block">
//               <div className="skill-category-title">{category.title}</div>
//               <div className="skills-list">
//                 {category.skills.map((skill: any) => (
//                   <div key={skill.id} className="skill-row">
//                     <span className="skill-name-label">{skill.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Simple Skills - Skill rows with level bars
//       return (
//         <div className="section-block">
//           <div className="section-header">
//             <div className="section-title">Skills</div>
//             <div className="section-accent-bar" />
//           </div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-row">
//                 <span className="skill-name-label">{skill.name || skill.skill}</span>
//                 {skill.level && (
//                   <div className="skill-track">
//                     <div
//                       className="skill-fill"
//                       style={{ width: `${(Number(skill.level) / 4) * 100}%` }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-block">
//         <div className="section-header">
//           <div className="section-title">Projects</div>
//           <div className="section-accent-bar" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-top-row">
//                 <div className="entry-title">{project.title}</div>
//                 {(project.liveUrl || project.githubUrl) && (
//                   <div className="project-links">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="entry-content"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | NAVY BLUE | SHARP CORPORATE
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

//   .t14-resume .resume-container {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #1a1a2e;
//     text-align: left;
//   }

//   .t14-resume.is-preview {
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

//   /* ── HEADER ── */
//   .t14-resume .header-block {
//     background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
//     padding: 32px 36px 28px;
//     position: relative;
//     text-align: left;
//   }

//   .t14-resume .header-block::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
//   }

//   .t14-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 40px;
//     font-weight: 700;
//     line-height: 1.1;
//     color: #ffffff;
//     letter-spacing: 0.5px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t14-resume .header-jobtitle {
//     font-size: 12px;
//     font-weight: 500;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #c9a84c;
//     margin-bottom: 20px;
//     text-align: left;
//   }

//   .t14-resume .header-meta-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px 24px;
//     text-align: left;
//   }

//   .t14-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 12px;
//     color: #b0bcd4;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .header-meta-item a {
//     color: #c9a84c;
//     text-decoration: none;
//   }

//   /* ── BODY ── */
//   .t14-resume .resume-body {
//     padding: 28px 36px 36px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t14-resume .section-block {
//     margin-bottom: 26px;
//     text-align: left;
//   }

//   .t14-resume .section-header {
//     display: flex;
//     align-items: center;
//     margin-bottom: 16px;
//     gap: 12px;
//     text-align: left;
//   }

//   .t14-resume .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t14-resume .section-accent-bar {
//     height: 2px;
//     flex: 1;
//     background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
//   }

//   /* ── SUMMARY ── */
//   .t14-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.8;
//     color: #333;
//     font-weight: 400;  
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t14-resume .entry-block {
//     margin-bottom: 18px;
//     padding-bottom: 18px;
//     border-bottom: 1px solid #eaedf5;
//     text-align: left;
//   }

//   .t14-resume .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .t14-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 10px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t14-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t14-resume .entry-date {
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//     color: #ffffff;
//     background: #2e4a7a;
//     padding: 3px 10px;
//     border-radius: 2px;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t14-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #4a6491;
//     font-weight: 500;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t14-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .entry-content ul,
//   .t14-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .entry-content ol,
//   .t14-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .entry-content li,
//   .t14-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.65 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t14-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     text-align: left;
//   }

//   .t14-resume .skill-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     text-align: left;
//   }

//   .t14-resume .skill-name-label {
//     font-size: 13px;
//     font-weight: 500;
//     color: #1a2a4a;
//     min-width: 160px;
//     text-align: left;
//   }

//   .t14-resume .skill-track {
//     flex: 1;
//     height: 5px;
//     background: #e8edf5;
//     border-radius: 3px;
//     overflow: hidden;
//     max-width: 220px;
//   }

//   .t14-resume .skill-fill {
//     height: 100%;
//     background: linear-gradient(90deg, #1a2a4a, #4a7ab5);
//     border-radius: 3px;
//   }

//   /* Categorized Skills */
//   .t14-resume .skill-category-block {
//     margin-bottom: 18px;
//   }

//   .t14-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t14-resume .skill-category-title {
//     font-size: 14px;
//     font-weight: 600;
//     color: #1a2a4a;
//     margin-bottom: 10px;
//     padding-bottom: 4px;
//     border-bottom: 1px solid #2e4a7a;
//     display: inline-block;
//   }

//   /* ── PROJECTS ── */
//   .t14-resume .project-header {
//     margin-bottom: 4px;
//   }

//   .t14-resume .project-links {
//     display: flex;
//     gap: 15px;
//   }

//   .t14-resume .project-link {
//     font-size: 10px;
//     font-weight: 500;
//     color: #2e4a7a;
//     text-decoration: underline;
//   }

//   .t14-resume .project-tech-stack {
//     font-size: 11px;
//     color: #4a6491;
//     margin: 6px 0;
//   }

//   /* ── LANGUAGES ── */
//   .t14-resume .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 10px;
//     text-align: left;
//   }

//   .t14-resume .lang-name {
//     font-size: 13px;
//     font-weight: 500;
//     color: #1a2a4a;
//     min-width: 160px;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t14-resume .additional-content {
//     font-size: 13px;
//     color: #444;
//     line-height: 1.7;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     margin-bottom: 7px;
//     text-align: left;
//   }

//   .t14-resume .additional-diamond {
//     width: 6px;
//     height: 6px;
//     background: #2e4a7a;
//     transform: rotate(45deg);
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t14-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t14-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 16mm 0;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t14-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .resume-container {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t14-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t14-resume .section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t14-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t14-resume .header-block {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .skill-fill,
//     .t14-resume .section-accent-bar {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t14-resume .resume-container { width: 100%; }
//     .t14-resume .header-block { padding: 20px; }
//     .t14-resume .resume-body { padding: 16px 20px; }
//     .t14-resume .entry-top-row { flex-direction: column; align-items: flex-start; }
//     .t14-resume .skill-name-label, 
//     .t14-resume .lang-name { min-width: 120px; }
//     .t14-resume .project-links { margin-top: 6px; }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const SectionHtml = (title: string) => `
//       <div class="section-header">
//         <div class="section-title">${title}</div>
//         <div class="section-accent-bar"></div>
//       </div>`;

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";
      
//       const isCategorized = isCategorizedSkills(skills);
      
//       if (isCategorized) {
//         return `
//           <div class="section-block">
//             ${SectionHtml("Skills")}
//             ${skills.map((category: any) => `
//               <div class="skill-category-block">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-list">
//                   ${category.skills.map((skill: any) => `
//                     <div class="skill-row">
//                       <span class="skill-name-label">${skill.name}</span>
//                     </div>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-block">
//             ${SectionHtml("Skills")}
//             <div class="skills-list">
//               ${skills.map((skill: any) => `
//                 <div class="skill-row">
//                   <span class="skill-name-label">${skill.name || skill.skill}</span>
//                   ${skill.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(skill.level) / 4) * 100}%"></div></div>` : ""}
//                 </div>
//               `).join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
      
//       return `
//         <div class="section-block">
//           ${SectionHtml("Projects")}
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${project.title || ""}</div>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="entry-content">${project.description}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t14-resume">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">
//             ${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }
//           </div>
//           <div class="header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           ${summary ? `
//           <div class="section-block">
//             ${SectionHtml("Profile")}
//             <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//           </div>` : ""}

//           ${experiences.length > 0 ? `
//           <div class="section-block">
//             ${SectionHtml("Experience")}
//             ${experiences.map((exp) => {
//               const startFormatted = formatMonthYear(exp.startDate, true);
//               const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` &nbsp;·&nbsp; ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           ${educations.length > 0 ? `
//           <div class="section-block">
//             ${SectionHtml("Education")}
//             ${educations.map((edu) => {
//               const dateStr = edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                 : "";
//               let textHtml = "";
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textHtml = `<div class="edu-content">${edu.text}</div>`;
//                 } else {
//                   const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textHtml = `<ul class="edu-list">${lines.map((l: string) => {
//                       const t = l.trim();
//                       const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                       return c ? `<li>${c}</li>` : "";
//                     }).join("")}</ul>`;
//                   } else {
//                     textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//                   }
//                 }
//               }
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${edu.schoolname || ""}</div>
//                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${edu.degree || edu.location ? `<div class="entry-subtitle">${edu.degree || ""}${edu.degree && edu.location ? " &nbsp;·&nbsp; " : ""}${edu.location || ""}</div>` : ""}
//                 ${textHtml}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Languages")}
//             <div class="skills-list">
//               ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Certifications &amp; Licenses")}
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Hobbies &amp; Interests")}
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Awards &amp; Honors")}
//             <div class="additional-content">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//           <div class="section-block">
//             ${SectionHtml("Websites &amp; Social Media")}
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("References")}
//             <div class="additional-content">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? SectionHtml(s.name) : ""}
//             ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//           </div>`).join("") : ""}

//         </div>
//       </div>
//     </body>
//     </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
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

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
//       {lastSegment === "download-resume" && (
//         <div
//           style={{
//             textAlign: "center",
//             marginTop: "20px",
//             marginBottom: "20px",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div
//         className={`t14-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="header-jobtitle">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="header-meta-grid">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">
//                 {addressParts.join(", ")}
//               </span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
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
//         <div className="resume-body">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Profile</div>
//                 <div className="section-accent-bar" />
//               </div>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: summary.replace(/\n/g, "<br>"),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Experience</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{exp.jobTitle}</div>
//                     <div className="entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear />
//                       ) : (
//                         "Present"
//                       )}
//                     </div>
//                   </div>
//                   <div className="entry-subtitle">
//                     {exp.employer}
//                     {exp.location && <> &nbsp;·&nbsp; {exp.location}</>}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Education</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = (
//                       <div
//                         className="edu-content"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     );
//                   } else {
//                     const lines = edu.text
//                       .split("\n")
//                       .filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <ul className="edu-list">
//                           {lines.map((l: string, li: number) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = (
//                         <div
//                           className="edu-content"
//                           style={{ whiteSpace: "pre-wrap" }}
//                         >
//                           {stripHtml(edu.text)}
//                         </div>
//                       );
//                     }
//                   }
//                 }
//                 return (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="entry-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " – "}
//                           {edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && <> &nbsp;·&nbsp; </>}
//                         {edu.location || ""}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Languages</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name &&
//                       lang.name.trim() !== "" && (
//                         <div key={lang._id || index} className="lang-row">
//                           <span className="lang-name">{lang.name}</span>
//                           {lang.level && (
//                             <div className="skill-track">
//                               <div
//                                 className="skill-fill"
//                                 style={{
//                                   width: `${(Number(lang.level) / 4) * 100}%`,
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">
//                     Certifications &amp; Licenses
//                   </div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* HOBBIES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Hobbies &amp; Interests</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Awards &amp; Honors</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* WEBSITES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (i) =>
//                 (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//                 (i.socialMedia && i.socialMedia.trim() !== ""),
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">
//                     Websites &amp; Social Media
//                   </div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div>
//                             {item.websiteUrl && (
//                               <span>Website: {item.websiteUrl}</span>
//                             )}
//                             {item.websiteUrl && item.socialMedia && " · "}
//                             {item.socialMedia && (
//                               <span>Social: {item.socialMedia}</span>
//                             )}
//                           </div>
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.references) &&
//             finalize.references.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">References</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <div key={section.id || index} className="section-block">
//                   {section.name && (
//                     <div className="section-header">
//                       <div className="section-title">{section.name}</div>
//                       <div className="section-accent-bar" />
//                     </div>
//                   )}
//                   {section.description && (
//                     <div
//                       className="custom-section-content"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>
//         {/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateFourteen;













































































// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";


// const TemplateFourteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   console.log("context,", context);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   // Format date of birth for display
//   const formatDateOfBirth = (dob: string) => {
//     if (!dob) return "";
//     try {
//       const date = new Date(dob);
//       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//     } catch {
//       return dob;
//     }
//   };

//   // Helper function to format grade (CGPA/Percentage)
//   const formatGrade = (grade: string, gradeType?: string) => {
//     if (!grade) return "";
    
//     if (gradeType === "cgpa") {
//       return `CGPA: ${grade}`;
//     } else if (gradeType === "percentage") {
//       return `Percentage: ${grade}%`;
//     }
    
//     const numGrade = parseFloat(grade);
//     if (!isNaN(numGrade)) {
//       if (numGrade <= 10 && grade.includes('.')) {
//         return `CGPA: ${grade}`;
//       } else if (numGrade > 10) {
//         return `Percentage: ${grade}%`;
//       }
//     }
    
//     return grade;
//   };

//   // Helper function to check if skills are categorized
//   const isCategorizedSkills = (skillsData: any[]) => {
//     if (!skillsData || skillsData.length === 0) return false;
//     return skillsData[0]?.title !== undefined;
//   };

//   // Helper function to render skills based on format
//   const renderSkills = () => {
//     if (!skills || skills.length === 0) return null;

//     const isCategorized = isCategorizedSkills(skills);

//     if (isCategorized) {
//       // Categorized Skills - Each category with its own section
//       return (
//         <div className="section-block">
//           <div className="section-header">
//             <div className="section-title">Skills</div>
//             <div className="section-accent-bar" />
//           </div>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category-block">
//               <div className="skill-category-title">{category.title}</div>
//               <div className="skills-list">
//                 {category.skills.map((skill: any) => (
//                   <div key={skill.id} className="skill-row">
//                     <span className="skill-name-label">{skill.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Simple Skills - Skill rows with level bars
//       return (
//         <div className="section-block">
//           <div className="section-header">
//             <div className="section-title">Skills</div>
//             <div className="section-accent-bar" />
//           </div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-row">
//                 <span className="skill-name-label">{skill.name || skill.skill}</span>
//                 {skill.level && (
//                   <div className="skill-track">
//                     <div
//                       className="skill-fill"
//                       style={{ width: `${(Number(skill.level) / 4) * 100}%` }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-block">
//         <div className="section-header">
//           <div className="section-title">Projects</div>
//           <div className="section-accent-bar" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-top-row">
//                 <div className="entry-title">{project.title}</div>
//                 {(project.liveUrl || project.githubUrl) && (
//                   <div className="project-links">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="entry-content"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | NAVY BLUE | SHARP CORPORATE
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

//   .t14-resume .resume-container {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #1a1a2e;
//     text-align: left;
//   }

//   .t14-resume.is-preview {
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

//   /* ── HEADER ── */
//   .t14-resume .header-block {
//     background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
//     padding: 32px 36px 28px;
//     position: relative;
//     text-align: left;
//   }

//   .t14-resume .header-block::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
//   }

//   .t14-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 40px;
//     font-weight: 700;
//     line-height: 1.1;
//     color: #ffffff;
//     letter-spacing: 0.5px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t14-resume .header-jobtitle {
//     font-size: 12px;
//     font-weight: 500;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #c9a84c;
//     margin-bottom: 20px;
//     text-align: left;
//   }

//   .t14-resume .header-meta-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px 24px;
//     text-align: left;
//   }

//   .t14-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 12px;
//     color: #b0bcd4;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .header-meta-item a {
//     color: #c9a84c;
//     text-decoration: none;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t14-resume .education-grade {
//     font-size: 11px;
//     color: #6b7c93;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── BODY ── */
//   .t14-resume .resume-body {
//     padding: 28px 36px 36px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t14-resume .section-block {
//     margin-bottom: 26px;
//     text-align: left;
//   }

//   .t14-resume .section-header {
//     display: flex;
//     align-items: center;
//     margin-bottom: 16px;
//     gap: 12px;
//     text-align: left;
//   }

//   .t14-resume .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t14-resume .section-accent-bar {
//     height: 2px;
//     flex: 1;
//     background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
//   }

//   /* ── SUMMARY ── */
//   .t14-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.8;
//     color: #333;
//     font-weight: 400;  
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t14-resume .entry-block {
//     margin-bottom: 18px;
//     padding-bottom: 18px;
//     border-bottom: 1px solid #eaedf5;
//     text-align: left;
//   }

//   .t14-resume .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .t14-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 10px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t14-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t14-resume .entry-date {
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//     color: #ffffff;
//     background: #2e4a7a;
//     padding: 3px 10px;
//     border-radius: 2px;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t14-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #4a6491;
//     font-weight: 500;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t14-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .entry-content ul,
//   .t14-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .entry-content ol,
//   .t14-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .entry-content li,
//   .t14-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.65 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t14-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     text-align: left;
//   }

//   .t14-resume .skill-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     text-align: left;
//   }

//   .t14-resume .skill-name-label {
//     font-size: 13px;
//     font-weight: 500;
//     color: #1a2a4a;
//     min-width: 160px;
//     text-align: left;
//   }

//   .t14-resume .skill-track {
//     flex: 1;
//     height: 5px;
//     background: #e8edf5;
//     border-radius: 3px;
//     overflow: hidden;
//     max-width: 220px;
//   }

//   .t14-resume .skill-fill {
//     height: 100%;
//     background: linear-gradient(90deg, #1a2a4a, #4a7ab5);
//     border-radius: 3px;
//   }

//   /* Categorized Skills */
//   .t14-resume .skill-category-block {
//     margin-bottom: 18px;
//   }

//   .t14-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t14-resume .skill-category-title {
//     font-size: 14px;
//     font-weight: 600;
//     color: #1a2a4a;
//     margin-bottom: 10px;
//     padding-bottom: 4px;
//     border-bottom: 1px solid #2e4a7a;
//     display: inline-block;
//   }

//   /* ── PROJECTS ── */
//   .t14-resume .project-header {
//     margin-bottom: 4px;
//   }

//   .t14-resume .project-links {
//     display: flex;
//     gap: 15px;
//   }

//   .t14-resume .project-link {
//     font-size: 10px;
//     font-weight: 500;
//     color: #2e4a7a;
//     text-decoration: underline;
//   }

//   .t14-resume .project-tech-stack {
//     font-size: 11px;
//     color: #4a6491;
//     margin: 6px 0;
//   }

//   /* ── LANGUAGES ── */
//   .t14-resume .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 10px;
//     text-align: left;
//   }

//   .t14-resume .lang-name {
//     font-size: 13px;
//     font-weight: 500;
//     color: #1a2a4a;
//     min-width: 160px;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t14-resume .additional-content {
//     font-size: 13px;
//     color: #444;
//     line-height: 1.7;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     margin-bottom: 7px;
//     text-align: left;
//   }

//   .t14-resume .additional-diamond {
//     width: 6px;
//     height: 6px;
//     background: #2e4a7a;
//     transform: rotate(45deg);
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t14-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t14-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t14-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t14-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 16mm 0;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t14-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .resume-container {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t14-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t14-resume .section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t14-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t14-resume .header-block {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .skill-fill,
//     .t14-resume .section-accent-bar {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t14-resume .resume-container { width: 100%; }
//     .t14-resume .header-block { padding: 20px; }
//     .t14-resume .resume-body { padding: 16px 20px; }
//     .t14-resume .entry-top-row { flex-direction: column; align-items: flex-start; }
//     .t14-resume .skill-name-label, 
//     .t14-resume .lang-name { min-width: 120px; }
//     .t14-resume .project-links { margin-top: 6px; }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const SectionHtml = (title: string) => `
//       <div class="section-header">
//         <div class="section-title">${title}</div>
//         <div class="section-accent-bar"></div>
//       </div>`;

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";
      
//       const isCategorized = isCategorizedSkills(skills);
      
//       if (isCategorized) {
//         return `
//           <div class="section-block">
//             ${SectionHtml("Skills")}
//             ${skills.map((category: any) => `
//               <div class="skill-category-block">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-list">
//                   ${category.skills.map((skill: any) => `
//                     <div class="skill-row">
//                       <span class="skill-name-label">${skill.name}</span>
//                     </div>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-block">
//             ${SectionHtml("Skills")}
//             <div class="skills-list">
//               ${skills.map((skill: any) => `
//                 <div class="skill-row">
//                   <span class="skill-name-label">${skill.name || skill.skill}</span>
//                   ${skill.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(skill.level) / 4) * 100}%"></div></div>` : ""}
//                 </div>
//               `).join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
      
//       return `
//         <div class="section-block">
//           ${SectionHtml("Projects")}
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${project.title || ""}</div>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="entry-content">${project.description}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t14-resume">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">
//             ${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }
//           </div>
//           <div class="header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span class="header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           ${summary ? `
//           <div class="section-block">
//             ${SectionHtml("Profile")}
//             <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//           </div>` : ""}

//           ${experiences.length > 0 ? `
//           <div class="section-block">
//             ${SectionHtml("Experience")}
//             ${experiences.map((exp) => {
//               const startFormatted = formatMonthYear(exp.startDate, true);
//               const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` &nbsp;·&nbsp; ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           ${educations.length > 0 ? `
//           <div class="section-block">
//             ${SectionHtml("Education")}
//             ${educations.map((edu) => {
//               const dateStr = edu.startDate || edu.endDate
//                 ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                 : "";
//               const formattedGrade = formatGrade(edu.grade || "");
//               let textHtml = "";
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textHtml = `<div class="edu-content">${edu.text}</div>`;
//                 } else {
//                   const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textHtml = `<ul class="edu-list">${lines.map((l: string) => {
//                       const t = l.trim();
//                       const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                       return c ? `<li>${c}</li>` : "";
//                     }).join("")}</ul>`;
//                   } else {
//                     textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//                   }
//                 }
//               }
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${edu.schoolname || ""}</div>
//                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${edu.degree || edu.location || formattedGrade ? `<div class="entry-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? " &nbsp;·&nbsp; " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>` : ""}
//                 ${textHtml}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Languages")}
//             <div class="skills-list">
//               ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Certifications &amp; Licenses")}
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Hobbies &amp; Interests")}
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("Awards &amp; Honors")}
//             <div class="additional-content">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//           <div class="section-block">
//             ${SectionHtml("Websites &amp; Social Media")}
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${SectionHtml("References")}
//             <div class="additional-content">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? SectionHtml(s.name) : ""}
//             ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//           </div>`).join("") : ""}

//         </div>
//       </div>
//     </body>
//     </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
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

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
    
//     {lastSegment === "download-resume" && (
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
//         className={`t14-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="header-jobtitle">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="header-meta-grid">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">
//                 {addressParts.join(", ")}
//               </span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {formattedDob && (
//               <span className="header-meta-item">{formattedDob}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {githubUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     githubUrl.startsWith("http")
//                       ? githubUrl
//                       : `https://${githubUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   GitHub
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
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
//         <div className="resume-body">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Profile</div>
//                 <div className="section-accent-bar" />
//               </div>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: summary.replace(/\n/g, "<br>"),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Experience</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{exp.jobTitle}</div>
//                     <div className="entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear />
//                       ) : (
//                         "Present"
//                       )}
//                     </div>
//                   </div>
//                   <div className="entry-subtitle">
//                     {exp.employer}
//                     {exp.location && <> &nbsp;·&nbsp; {exp.location}</>}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Education</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 const formattedGrade = formatGrade(edu.grade || "");
                
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = (
//                       <div
//                         className="edu-content"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     );
//                   } else {
//                     const lines = edu.text
//                       .split("\n")
//                       .filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <ul className="edu-list">
//                           {lines.map((l: string, li: number) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = (
//                         <div
//                           className="edu-content"
//                           style={{ whiteSpace: "pre-wrap" }}
//                         >
//                           {stripHtml(edu.text)}
//                         </div>
//                       );
//                     }
//                   }
//                 }
//                 return (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="entry-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " – "}
//                           {edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location || formattedGrade) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && <> &nbsp;·&nbsp; </>}
//                         {edu.location || ""}
//                         {formattedGrade && (
//                           <div className="education-grade">{formattedGrade}</div>
//                         )}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Languages</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name &&
//                       lang.name.trim() !== "" && (
//                         <div key={lang._id || index} className="lang-row">
//                           <span className="lang-name">{lang.name}</span>
//                           {lang.level && (
//                             <div className="skill-track">
//                               <div
//                                 className="skill-fill"
//                                 style={{
//                                   width: `${(Number(lang.level) / 4) * 100}%`,
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">
//                     Certifications &amp; Licenses
//                   </div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* HOBBIES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Hobbies &amp; Interests</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">Awards &amp; Honors</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* WEBSITES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (i) =>
//                 (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//                 (i.socialMedia && i.socialMedia.trim() !== ""),
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">
//                     Websites &amp; Social Media
//                   </div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div>
//                             {item.websiteUrl && (
//                               <span>Website: {item.websiteUrl}</span>
//                             )}
//                             {item.websiteUrl && item.socialMedia && " · "}
//                             {item.socialMedia && (
//                               <span>Social: {item.socialMedia}</span>
//                             )}
//                           </div>
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.references) &&
//             finalize.references.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="section-block">
//                 <div className="section-header">
//                   <div className="section-title">References</div>
//                   <div className="section-accent-bar" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-diamond" />
//                           <div
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <div key={section.id || index} className="section-block">
//                   {section.name && (
//                     <div className="section-header">
//                       <div className="section-title">{section.name}</div>
//                       <div className="section-accent-bar" />
//                     </div>
//                   )}
//                   {section.description && (
//                     <div
//                       className="custom-section-content"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>
//         {/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateFourteen;















































// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateFourteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
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
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   // Helper function to render skills (using cleanQuillHTML)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <div className="section-block">
//         <div className="section-header">
//           <div className="section-title">Skills</div>
//           <div className="section-accent-bar" />
//         </div>
//         <div className="skills-content">
//           <div
//             dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//           />
//         </div>
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-block">
//         <div className="section-header">
//           <div className="section-title">Projects</div>
//           <div className="section-accent-bar" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-top-row">
//                 <div className="entry-title">{project.title}</div>
//                 {(project.liveUrl || project.githubUrl) && (
//                   <div className="project-links">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="entry-content"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — NAVY BLUE | SHARP CORPORATE
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');



//   .t14-resume  {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #1a1a2e;
//   }

//   .t14-resume.is-preview {
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
//   .t14-resume p {
//     margin: 0 0 4px 0 !important;
//     padding: 0 !important;
//     line-height: 1.6 !important;
//   }

//   .t14-resume p:last-child {
//     margin-bottom: 0 !important;
//   }

//   /* Rich text content styles */
//   .t14-resume .entry-content ul,
//   .t14-resume .entry-content ol,
//   .t14-resume .skills-content ul,
//   .t14-resume .skills-content ol,
//   .t14-resume .edu-content ul,
//   .t14-resume .edu-content ol,
//   .t14-resume .custom-section-content ul,
//   .t14-resume .custom-section-content ol {
//     margin: 4px 0 4px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t14-resume .entry-content li,
//   .t14-resume .skills-content li,
//   .t14-resume .edu-content li,
//   .t14-resume .custom-section-content li {
//     margin-bottom: 2px !important;
//     line-height: 1.6 !important;
//   }

//   .t14-resume .entry-content ul,
//   .t14-resume .skills-content ul,
//   .t14-resume .edu-content ul,
//   .t14-resume .custom-section-content ul {
//     list-style-type: disc !important;
//   }

//   .t14-resume .entry-content ol,
//   .t14-resume .skills-content ol,
//   .t14-resume .edu-content ol,
//   .t14-resume .custom-section-content ol {
//     list-style-type: decimal !important;
//   }

//   .t14-resume .entry-content strong,
//   .t14-resume .skills-content strong,
//   .t14-resume .edu-content strong,
//   .t14-resume .custom-section-content strong {
//     font-weight: 600 !important;
//   }

//   .t14-resume .entry-content em,
//   .t14-resume .skills-content em,
//   .t14-resume .edu-content em,
//   .t14-resume .custom-section-content em {
//     font-style: italic !important;
//   }

//   .t14-resume .entry-content u,
//   .t14-resume .skills-content u,
//   .t14-resume .edu-content u,
//   .t14-resume .custom-section-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t14-resume .entry-content p,
//   .t14-resume .skills-content p,
//   .t14-resume .edu-content p,
//   .t14-resume .custom-section-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills content styling */
//   .t14-resume .skills-content {
//     font-size: 13px;
//     font-weight: 400;
//     color: #444;
//     line-height: 1.6;
//   }

//   /* Custom Section Content */
//   .t14-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//   }

//   /* ── HEADER ── */
//   .t14-resume .header-block {
//     background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
//     padding: 32px 36px 28px;
//     position: relative;
//   }

//   .t14-resume .header-block::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
//   }

//   .t14-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 40px;
//     font-weight: 700;
//     line-height: 1.1;
//     color: #ffffff;
//     letter-spacing: 0.5px;
//     margin-bottom: 6px;
//   }

//   .t14-resume .header-jobtitle {
//     font-size: 12px;
//     font-weight: 500;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #c9a84c;
//     margin-bottom: 20px;
//   }

//   .t14-resume .header-meta-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px 24px;
//   }

//   .t14-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 12px;
//     color: #b0bcd4;
//     font-weight: 400;
//   }

//   .t14-resume .header-meta-item a {
//     color: #c9a84c;
//     text-decoration: none;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t14-resume .education-grade {
//     font-size: 11px;
//     color: #6b7c93;
//     margin-top: 4px;
//     font-weight: 500;
//   }

//   /* ── BODY ── */
//   .t14-resume .resume-body {
//     padding: 28px 36px 36px;
//   }

//   /* ── SECTION ── */
//   .t14-resume .section-block {
//     margin-bottom: 26px;
//   }

//   .t14-resume .section-header {
//     display: flex;
//     align-items: center;
//     margin-bottom: 16px;
//     gap: 12px;
//   }

//   .t14-resume .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     white-space: nowrap;
//   }

//   .t14-resume .section-accent-bar {
//     height: 2px;
//     flex: 1;
//     background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
//   }

//   /* ── SUMMARY ── */
//   .t14-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.8;
//     color: #333;
//     font-weight: 400;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t14-resume .entry-block {
//     margin-bottom: 18px;
//     padding-bottom: 18px;
//     border-bottom: 1px solid #eaedf5;
//   }

//   .t14-resume .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .t14-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 10px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//   }

//   .t14-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a2a4a;
//     line-height: 1.3;
//   }

//   .t14-resume .entry-date {
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//     color: #ffffff;
//     background: #2e4a7a;
//     padding: 3px 10px;
//     border-radius: 2px;
//     white-space: nowrap;
//   }

//   .t14-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #4a6491;
//     font-weight: 500;
//     margin-bottom: 8px;
//   }

//   .t14-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 400;
//   }

//   /* ── PROJECTS ── */
//   .t14-resume .project-header {
//     margin-bottom: 4px;
//   }

//   .t14-resume .project-links {
//     display: flex;
//     gap: 15px;
//   }

//   .t14-resume .project-link {
//     font-size: 10px;
//     font-weight: 500;
//     color: #2e4a7a;
//     text-decoration: underline;
//   }

//   .t14-resume .project-tech-stack {
//     font-size: 11px;
//     color: #4a6491;
//     margin: 6px 0;
//   }

//   /* ── CUSTOM ── */
//   .t14-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444;
//     font-weight: 400;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 0;
//     }

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume  {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t14-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t14-resume .section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t14-resume .header-block {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t14-resume .section-accent-bar {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

 
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${cleanQuillHTML(text)}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const SectionHtml = (title: string) => `
//       <div class="section-header">
//         <div class="section-title">${title}</div>
//         <div class="section-accent-bar"></div>
//       </div>`;

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      
//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
//       return `
//         <div class="section-block">
//           ${SectionHtml("Skills")}
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
      
//       return `
//         <div class="section-block">
//           ${SectionHtml("Projects")}
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${project.title || ""}</div>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="entry-content">${cleanQuillHTML(project.description)}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML for PDF
//     const generateCustomSectionsHTML = () => {
//       if (
//         !finalize ||
//         Array.isArray(finalize) ||
//         !Array.isArray(finalize.customSection) ||
//         !finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//       ) {
//         return "";
//       }

//       return `
//         <div class="section-block">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div class="entry-block">
//                 ${s.name ? `<div class="entry-title">${s.name}</div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//               </div>
//             `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t14-resume">
//         <div class="resume-container">

//           <!-- HEADER -->
//           <div class="header-block">
//             <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//             <div class="header-jobtitle">
//               ${
//                 contact?.jobTitle
//                   ? typeof contact.jobTitle === "string"
//                     ? contact.jobTitle
//                     : (contact.jobTitle as any)?.name || ""
//                   : ""
//               }
//             </div>
//             <div class="header-meta-grid">
//               ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//               ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//               ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//               ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
//               ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//               ${githubUrl ? `<span class="header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//               ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//             </div>
//           </div>

//           <!-- BODY -->
//           <div class="resume-body">

//             <!-- SUMMARY -->
//             ${summary ? `
//             <div class="section-block">
//               ${SectionHtml("Profile")}
//               <div class="summary-text">${cleanQuillHTML(summary)}</div>
//             </div>` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//             <div class="section-block">
//               ${SectionHtml("Experience")}
//               ${experiences.map((exp) => {
//                 const startFormatted = formatMonthYear(exp.startDate, false);
//                 const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
//                 return `
//                 <div class="entry-block">
//                   <div class="entry-top-row">
//                     <div class="entry-title">${exp.jobTitle || ""}</div>
//                     <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                   </div>
//                   <div class="entry-subtitle">${companyLocation}</div>
//                   ${exp.text ? renderEntryText(exp.text) : ""}
//                 </div>`;
//               }).join("")}
//             </div>` : ""}

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION -->
//             ${educations.length > 0 ? `
//             <div class="section-block">
//               ${SectionHtml("Education")}
//               ${educations.map((edu) => {
//                 const dateStr = edu.startDate || edu.endDate
//                   ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                   : "";
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 return `
//                 <div class="entry-block">
//                   <div class="entry-top-row">
//                     <div class="entry-title">${edu.schoolname || ""}</div>
//                     ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                   </div>
//                   ${edu.degree || edu.location || formattedGrade ? `<div class="entry-subtitle">
//                     ${edu.degree || ""}
//                     ${edu.degree && edu.location ? " • " : ""}
//                     ${edu.location || ""}
//                     ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                   </div>` : ""}
//                   ${eduTextHtml ? `<div class="entry-content">${eduTextHtml}</div>` : ""}
//                 </div>`;
//               }).join("")}
//             </div>` : ""}

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- CUSTOM SECTIONS -->
//             ${generateCustomSectionsHTML()}

//           </div>
//         </div>
//       </div>
//     </body>
//     </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
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
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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
//         className={`t14-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="header-jobtitle">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="header-meta-grid">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">
//                 {addressParts.join(", ")}
//               </span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {formattedDob && (
//               <span className="header-meta-item">{formattedDob}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
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
//               <span className="header-meta-item">
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
//               <span className="header-meta-item">
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
//         <div className="resume-body">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Profile</div>
//                 <div className="section-accent-bar" />
//               </div>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Experience</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
//                 return (
//                   <div key={i} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{exp.jobTitle}</div>
//                       <div className="entry-date">{start} – {end}</div>
//                     </div>
//                     <div className="entry-subtitle">{companyLocation}</div>
//                     {exp.text && (
//                       <div
//                         className="entry-content entry-content-desc"
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
//             <div className="section-block">
//               <div className="section-header">
//                 <div className="section-title">Education</div>
//                 <div className="section-accent-bar" />
//               </div>
//               {educations.map((edu, index) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
                
//                 return (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="entry-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " – "}
//                           {edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location || formattedGrade) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && " • "}
//                         {edu.location || ""}
//                         {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
//                       </div>
//                     )}
//                     {eduTextHtml && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: eduTextHtml }} />
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
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim()
//             ) && (
//               <div className="section-block">
//                 {finalize.customSection
//                   .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map((section, i) => (
//                     <div key={section.id || i} className="entry-block">
//                       {section.name && <div className="entry-title">{section.name}</div>}
//                       {section.description && (
//                         <div
//                           className="custom-section-content"
//                           dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//                         />
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateFourteen;

























"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
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

const A4_W          = 794;
const A4_H          = 1123;
const MARGIN        = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

const TemplateFourteen: React.FC<ResumeProps> = ({ alldata }) => {
  const context     = useContext(CreateContext);
  const pathname    = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages,       setPages]       = useState<string[]>([]);

  const contact    = alldata?.contact    || context.contact    || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences= alldata?.experiences|| context?.experiences|| [];
  const skills     = alldata?.skills?.text || context?.skills?.text || "";
  const projects   = alldata?.projects   || context?.projects  || [];
  const finalize   = alldata?.finalize   || context?.finalize  || {};
  const summary    = alldata?.summary    || context?.summary   || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl  = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl    = contact?.github;
  const dateOfBirth  = contact?.dob;

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t14-resume {
      width: ${A4_W}px;
      background-color: #ffffff;
      font-family: 'Source Sans 3', sans-serif;
      color: #1a1a2e;
      font-size: 14px;
      line-height: 1.5;
    }

    .t14-resume p { margin: 0 0 4px 0 !important; padding: 0 !important; line-height: 1.6 !important; }
    .t14-resume p:last-child { margin-bottom: 0 !important; }

    .t14-resume .entry-content ul,
    .t14-resume .entry-content ol,
    .t14-resume .skills-content ul,
    .t14-resume .skills-content ol,
    .t14-resume .custom-section-content ul,
    .t14-resume .custom-section-content ol { margin: 4px 0 4px 20px !important; padding-left: 20px !important; }

    .t14-resume .entry-content li,
    .t14-resume .skills-content li,
    .t14-resume .custom-section-content li { margin-bottom: 2px !important; line-height: 1.6 !important; }

    .t14-resume .entry-content ul,
    .t14-resume .skills-content ul,
    .t14-resume .custom-section-content ul  { list-style-type: disc    !important; }
    .t14-resume .entry-content ol,
    .t14-resume .skills-content ol,
    .t14-resume .custom-section-content ol  { list-style-type: decimal !important; }

    .t14-resume .entry-content strong,
    .t14-resume .skills-content strong,
    .t14-resume .custom-section-content strong { font-weight: 600 !important; }
    .t14-resume .entry-content em,
    .t14-resume .skills-content em,
    .t14-resume .custom-section-content em    { font-style: italic !important; }
    .t14-resume .entry-content u,
    .t14-resume .skills-content u,
    .t14-resume .custom-section-content u     { text-decoration: underline !important; }
    .t14-resume .entry-content p,
    .t14-resume .skills-content p,
    .t14-resume .custom-section-content p     { white-space: pre-wrap !important; }

    .t14-resume .header-block {
      background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
      padding: 32px 36px 28px;
      position: relative;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t14-resume .header-block::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t14-resume .header-name {
      font-family: 'Playfair Display', serif;
      font-size: 40px; font-weight: 700; line-height: 1.1;
      color: #ffffff; letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .t14-resume .header-jobtitle {
      font-size: 12px; font-weight: 500; letter-spacing: 3px;
      text-transform: uppercase; color: #c9a84c; margin-bottom: 20px;
    }
    .t14-resume .header-meta-grid { display: flex; flex-wrap: wrap; gap: 8px 24px; }
    .t14-resume .header-meta-item {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; color: #b0bcd4; font-weight: 400;
    }
    .t14-resume .header-meta-item a { color: #c9a84c; text-decoration: none; }

    .t14-resume .resume-body { padding: 28px 36px 36px; }

    .t14-resume .section-block { margin-bottom: 26px; }
    .t14-resume .section-header {
      display: flex; align-items: center; margin-bottom: 16px; gap: 12px;
      page-break-after: avoid; break-after: avoid;
    }
    .t14-resume .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px; font-weight: 600; color: #1a2a4a; white-space: nowrap;
    }
    .t14-resume .section-accent-bar {
      height: 2px; flex: 1;
      background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }

    .t14-resume .summary-text { font-size: 13.5px; line-height: 1.8; color: #333; font-weight: 400; }

    .t14-resume .entry-block {
      margin-bottom: 18px; padding-bottom: 18px;
      border-bottom: 1px solid #eaedf5;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t14-resume .entry-block:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
    .t14-resume .entry-top-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 10px; flex-wrap: wrap; margin-bottom: 2px;
    }
    .t14-resume .entry-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px; font-weight: 600; color: #1a2a4a; line-height: 1.3;
    }
    .t14-resume .entry-date {
      font-size: 11px; font-weight: 600; letter-spacing: 1px;
      text-transform: uppercase; color: #ffffff; background: #2e4a7a;
      padding: 3px 10px; border-radius: 2px; white-space: nowrap;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .t14-resume .entry-subtitle { font-size: 12.5px; color: #4a6491; font-weight: 500; margin-bottom: 8px; }
    .t14-resume .entry-content  { font-size: 13px; line-height: 1.7; color: #444; font-weight: 400; }

    .t14-resume .education-grade { font-size: 11px; color: #6b7c93; margin-top: 4px; font-weight: 500; }

    .t14-resume .skills-content { font-size: 13px; font-weight: 400; color: #444; line-height: 1.6; }

    .t14-resume .project-header { margin-bottom: 4px; }
    .t14-resume .project-links  { display: flex; gap: 15px; }
    .t14-resume .project-link   { font-size: 10px; font-weight: 500; color: #2e4a7a; text-decoration: underline; }
    .t14-resume .project-tech-stack { font-size: 11px; color: #4a6491; margin: 6px 0; }

    .t14-resume .custom-section-content { font-size: 13px; line-height: 1.65; color: #444; font-weight: 400; }

    .t14-page-break {
      page-break-before: always !important; break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { overflow: visible; }
      .t14-resume { width: 100% !important; box-shadow: none !important; }
      .t14-resume .project-link,
      .t14-resume .header-meta-item a { color: #c9a84c !important; text-decoration: none !important; }
    }
  `;

  const sectionHeaderHTML = (title: string) =>
    `<div class="section-header">
       <div class="section-title">${title}</div>
       <div class="section-accent-bar"></div>
     </div>`;

  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");
      const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;

      const header = `
      <div class="header-block">
        <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="header-jobtitle">${contact?.jobTitle ? typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "" : ""}</div>
        <div class="header-meta-grid">
          ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
          ${contact?.email    ? `<span class="header-meta-item">${contact.email}</span>`    : ""}
          ${contact?.phone    ? `<span class="header-meta-item">${contact.phone}</span>`    : ""}
          ${formattedDob      ? `<span class="header-meta-item">${formattedDob}</span>`     : ""}
          ${linkedinUrl  ? `<span class="header-meta-item"><a href="${href(linkedinUrl)}"  target="_blank">LinkedIn</a></span>`  : ""}
          ${githubUrl    ? `<span class="header-meta-item"><a href="${href(githubUrl)}"    target="_blank">GitHub</a></span>`    : ""}
          ${portfolioUrl ? `<span class="header-meta-item"><a href="${href(portfolioUrl)}" target="_blank">Portfolio</a></span>` : ""}
        </div>
      </div>`;

      const summaryBlock = summary
        ? `<div class="section-block" data-block-id="t14-summary">
             ${sectionHeaderHTML("Profile")}
             <div class="summary-text">${cleanQuillHTML(summary)}</div>
           </div>`
        : "";

      const expBlock = experiences.length > 0
        ? `<div class="section-block" data-block-id="t14-exp-section">
             ${sectionHeaderHTML("Experience")}
             ${experiences.map((exp: any, i: number) => {
               const start = formatMonthYear(exp.startDate, false);
               const end   = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
               const loc   = [exp.employer, exp.location].filter(Boolean).join(" • ");
               return `<div class="entry-block" data-block-id="t14-exp-${i}">
                 <div class="entry-top-row">
                   <div class="entry-title">${exp.jobTitle || ""}</div>
                   <div class="entry-date">${start} – ${end}</div>
                 </div>
                 <div class="entry-subtitle">${loc}</div>
                 ${exp.text ? `<div class="entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
               </div>`;
             }).join("")}
           </div>`
        : "";

      const projBlock = projects.length > 0
        ? `<div class="section-block" data-block-id="t14-proj-section">
             ${sectionHeaderHTML("Projects")}
             ${projects.map((p: any, i: number) => `
               <div class="entry-block" data-block-id="t14-proj-${i}">
                 <div class="project-header">
                   <div class="entry-top-row">
                     <div class="entry-title">${p.title || ""}</div>
                     ${p.liveUrl || p.githubUrl ? `<div class="project-links">
                       ${p.liveUrl   ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
                       ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>`   : ""}
                     </div>` : ""}
                   </div>
                 </div>
                 ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                 ${p.description ? `<div class="entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
               </div>`).join("")}
           </div>`
        : "";

      const eduBlock = educations.length > 0
        ? `<div class="section-block" data-block-id="t14-edu-section">
             ${sectionHeaderHTML("Education")}
             ${educations.map((edu: any, i: number) => {
               const dateStr = edu.startDate || edu.endDate
                 ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                 : "";
               const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
               return `<div class="entry-block" data-block-id="t14-edu-${i}">
                 <div class="entry-top-row">
                   <div class="entry-title">${edu.schoolname || ""}</div>
                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
                 </div>
                 ${edu.degree || edu.location || grade ? `<div class="entry-subtitle">
                   ${edu.degree || ""}${edu.degree && edu.location ? " • " : ""}${edu.location || ""}
                   ${grade ? `<div class="education-grade">${grade}</div>` : ""}
                 </div>` : ""}
                 ${edu.text ? `<div class="entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
               </div>`;
             }).join("")}
           </div>`
        : "";

      const skillsClean = cleanQuillHTML(skills || "");
      const skillsBlock = skillsClean && skillsClean !== "<p><br></p>"
        ? `<div class="section-block" data-block-id="t14-skills-section">
             ${sectionHeaderHTML("Skills")}
             <div class="skills-content" data-block-id="t14-skills-content">${skillsClean}</div>
           </div>`
        : "";

      const hasCustom = !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
        finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim());

      const customBlock = hasCustom
        ? `<div class="section-block" data-block-id="t14-custom-section">
             ${(finalize as any).customSection
               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
               .map((s: any, i: number) => `
                 <div class="entry-block" data-block-id="t14-custom-${i}">
                   ${s.name ? `<div class="entry-title">${s.name}</div>` : ""}
                   ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
                 </div>`).join("")}
           </div>`
        : "";

      const pdfStyle = forPDF
        ? `<style>.t14-resume { width: 100% !important; }</style>`
        : "";

      let bodyContent = `${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t14-page-break";
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
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t14-resume">
    ${header}
    <div class="resume-body">
      ${bodyContent}
    </div>
  </div>
</body>
</html>`;
    },
    [contact, educations, experiences, skills, projects, finalize, summary,
     addressParts, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, CSS],
  );

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser   = new DOMParser();
        const parsed   = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t14-resume");
        if (!resumeEl) { resolve([fullHtml]); return; }
        const resumeSnapshot = resumeEl.outerHTML;

        const iframe = document.createElement("iframe");
        iframe.style.cssText = [
          "position:fixed","top:0","left:-9999px",
          `width:${A4_W}px`,"height:10000px","border:none",
          "opacity:0","pointer-events:none","z-index:-1",
        ].join(";");
        document.body.appendChild(iframe);

        const measureDoc = iframe.contentDocument!;
        measureDoc.open();
        measureDoc.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<style>
  ${CSS}
  html, body { margin:0!important;padding:0!important;width:${A4_W}px!important;height:auto!important;overflow:visible!important;background:white!important; }
  .t14-resume { width:${A4_W}px!important;margin:0!important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t14-resume");
          if (!resume) { document.body.removeChild(iframe); resolve([fullHtml]); return; }

          measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const totalH     = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY    = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

          const getRelTop    = (el: HTMLElement) => el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) => getRelTop(el) + el.getBoundingClientRect().height;

          interface Block { top: number; bottom: number; id?: string; }
          const blocks: Block[] = [];

          // Header is always atomic — never a cut point
          const headerEl = resume.querySelector<HTMLElement>(".header-block");
          if (headerEl) blocks.push({ top: getRelTop(headerEl), bottom: getRelBottom(headerEl) });

          // Individual entry blocks
          resume.querySelectorAll<HTMLElement>(".entry-block, .skills-content").forEach((el) => {
            const top = getRelTop(el), bottom = getRelBottom(el);
            if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Section heading + first entry paired
          resume.querySelectorAll<HTMLElement>(".section-block").forEach((section) => {
            const sectionTop = getRelTop(section);
            const firstItem  = section.querySelector<HTMLElement>(".entry-block, .skills-content");
            if (firstItem) {
              const anchorBottom = getRelBottom(firstItem);
              if (anchorBottom - sectionTop > 8)
                blocks.push({ top: sectionTop, bottom: anchorBottom, id: section.dataset.blockId });
            } else {
              const sectionBottom = getRelBottom(section);
              if (sectionBottom - sectionTop > 8)
                blocks.push({ top: sectionTop, bottom: sectionBottom, id: section.dataset.blockId });
            }
          });

          blocks.sort((a, b) => a.top - b.top);

          const pageStarts: number[] = [0];
          const pageBreakIds: string[] = [];

          while (pageStarts.length < 20) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut     = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;

            let actualCut = naiveCut, cutBlockId: string | undefined;

            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (block.top >= currentStart && block.bottom > naiveCut && block.top < actualCut) {
                actualCut = block.top; cutBlockId = block.id;
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
            const nextStart      = pageStarts[i + 1] ?? totalH;
            const clipH          = nextStart - contentOffsetY;

            pageHtmls.push(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<style>
  ${CSS}
  html,body{margin:0!important;padding:0!important;width:${A4_W}px!important;height:${A4_H}px!important;overflow:hidden!important;background:white!important;}
  .page-margin-box{position:relative;width:${A4_W}px;height:${A4_H}px;background:white;overflow:hidden;}
  .page-content-clip{position:absolute;top:${MARGIN}px;left:0;width:${A4_W}px;height:${clipH}px;overflow:hidden;}
  .page-shift{position:absolute;top:${-contentOffsetY}px;left:0;width:${A4_W}px;}
  .t14-resume{width:${A4_W}px!important;margin:0!important;}
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
          win.document.fonts.ready.then(() => setTimeout(() => requestAnimationFrame(doMeasure), 100));
        } else {
          setTimeout(doMeasure, 500);
        }
      });
    },
    [CSS],
  );

  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
  }, []);

  useEffect(() => {
    scheduleUpdate(generateHTML());
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [generateHTML, scheduleUpdate]);

  useEffect(() => {
    if (!htmlContent) return;
    splitIntoPages(htmlContent).then(setPages);
  }, [htmlContent, splitIntoPages]);

  const handleDownload = async (): Promise<void> => {
    try {
      const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      const pdfHtml = generateHTML(true, pageBreakIds);
     
      // const res: AxiosResponse<Blob> = await axios.post(
      //   `${API_URL}/api/candidates/generate-pdf`,
      //   { html: pdfHtml },
      //   { responseType: "blob" },
      // );

        const res: AxiosResponse<Blob> = await api.post(
              `${API_URL}/candidates/generate-pdf`,
              { html:pdfHtml  },
              { responseType: "blob" },
            );

      const url = URL.createObjectURL(res.data);
      const a   = document.createElement("a");
      a.href     = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      {/* {lastSegment === "download-resume" && ( */}
        <div className="text-center my-5">
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            Download Resume
          </motion.button>
        </div>
      {/* )} */}

      {alldata ? (
        <div style={{ width:`${A4_W}px`, height:`${A4_H}px`, transform:"scale(0.36)", transformOrigin:"top left", overflow:"hidden", pointerEvents:"none", flexShrink:0 }}>
          {pages[0] ? (
            <iframe title="resume-thumb" srcDoc={pages[0]}
              style={{ width:`${A4_W}px`, height:`${A4_H}px`, border:"none", display:"block", pointerEvents:"none" }}
              sandbox="allow-same-origin" />
          ) : (
            <div style={{ width:`${A4_W}px`, height:`${A4_H}px`, background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"#ccc", fontSize:14, fontFamily:"sans-serif" }}>
              Loading…
            </div>
          )}
        </div>
      ) : (
        <div style={{ width:`${A4_W}px`, margin:"0 auto" }}>
          {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
            <div key={idx} style={{ marginBottom:"28px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginBottom:"10px" }}>
                <div style={{ flex:1, height:"1px", background:"#d1d5db" }} />
                <span style={{ fontSize:"11px", fontWeight:600, color:"#6b7280", whiteSpace:"nowrap", padding:"3px 12px", background:"#f3f4f6", borderRadius:"999px", border:"1px solid #e5e7eb", letterSpacing:"0.05em", fontFamily:"system-ui, sans-serif" }}>
                  Page {idx + 1}{pages.length > 1 ? ` of ${pages.length}` : ""}
                </span>
                <div style={{ flex:1, height:"1px", background:"#d1d5db" }} />
              </div>
              <div style={{ width:`${A4_W}px`, height:`${A4_H}px`, overflow:"hidden", background:"white", boxShadow:"0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)", borderRadius:"2px", flexShrink:0 }}>
                <iframe title={`resume-page-${idx + 1}`} srcDoc={pageHtml}
                  style={{ width:`${A4_W}px`, height:`${A4_H}px`, border:"none", display:"block", pointerEvents:"none" }}
                  scrolling="no" sandbox="allow-same-origin allow-scripts" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TemplateFourteen;