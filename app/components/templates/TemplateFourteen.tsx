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








"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";


const TemplateFourteen: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  console.log("context,", context);

  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin || contact?.linkedin;
  const portfolioUrl = contact?.portfolio || contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // Format date of birth for display
  const formatDateOfBirth = (dob: string) => {
    if (!dob) return "";
    try {
      const date = new Date(dob);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dob;
    }
  };

  // Helper function to format grade (CGPA/Percentage)
  const formatGrade = (grade: string, gradeType?: string) => {
    if (!grade) return "";
    
    if (gradeType === "cgpa") {
      return `CGPA: ${grade}`;
    } else if (gradeType === "percentage") {
      return `Percentage: ${grade}%`;
    }
    
    const numGrade = parseFloat(grade);
    if (!isNaN(numGrade)) {
      if (numGrade <= 10 && grade.includes('.')) {
        return `CGPA: ${grade}`;
      } else if (numGrade > 10) {
        return `Percentage: ${grade}%`;
      }
    }
    
    return grade;
  };

  // Helper function to check if skills are categorized
  const isCategorizedSkills = (skillsData: any[]) => {
    if (!skillsData || skillsData.length === 0) return false;
    return skillsData[0]?.title !== undefined;
  };

  // Helper function to render skills based on format
  const renderSkills = () => {
    if (!skills || skills.length === 0) return null;

    const isCategorized = isCategorizedSkills(skills);

    if (isCategorized) {
      // Categorized Skills - Each category with its own section
      return (
        <div className="section-block">
          <div className="section-header">
            <div className="section-title">Skills</div>
            <div className="section-accent-bar" />
          </div>
          {skills.map((category: any) => (
            <div key={category.id} className="skill-category-block">
              <div className="skill-category-title">{category.title}</div>
              <div className="skills-list">
                {category.skills.map((skill: any) => (
                  <div key={skill.id} className="skill-row">
                    <span className="skill-name-label">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Simple Skills - Skill rows with level bars
      return (
        <div className="section-block">
          <div className="section-header">
            <div className="section-title">Skills</div>
            <div className="section-accent-bar" />
          </div>
          <div className="skills-list">
            {skills.map((skill: any, index: number) => (
              <div key={skill.id || index} className="skill-row">
                <span className="skill-name-label">{skill.name || skill.skill}</span>
                {skill.level && (
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: `${(Number(skill.level) / 4) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div className="section-block">
        <div className="section-header">
          <div className="section-title">Projects</div>
          <div className="section-accent-bar" />
        </div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="entry-block">
            <div className="project-header">
              <div className="entry-top-row">
                <div className="entry-title">{project.title}</div>
                {(project.liveUrl || project.githubUrl) && (
                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — SINGLE COLUMN | NAVY BLUE | SHARP CORPORATE
  ====================================================== */
  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

  .t14-resume .resume-container {
    margin: 0;
    background-color: white;
    text-align: left;
    width: 210mm;
    min-height: 297mm;
    box-sizing: border-box;
    background-color: #ffffff;
    font-family: 'Source Sans 3', sans-serif;
    color: #1a1a2e;
    text-align: left;
  }

  .t14-resume.is-preview {
    transform: scale(0.36);
    transform-origin: top left;
    width: 210mm; 
    height: auto;
    max-height: none;
    min-height: auto;
    max-width: none;
    min-width: auto;
    overflow: visible;
  }

  /* ── HEADER ── */
  .t14-resume .header-block {
    background: linear-gradient(135deg, #1a2a4a 0%, #2e4a7a 100%);
    padding: 32px 36px 28px;
    position: relative;
    text-align: left;
  }

  .t14-resume .header-block::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c);
  }

  .t14-resume .header-name {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.1;
    color: #ffffff;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    text-align: left;
  }

  .t14-resume .header-jobtitle {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 20px;
    text-align: left;
  }

  .t14-resume .header-meta-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 24px;
    text-align: left;
  }

  .t14-resume .header-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #b0bcd4;
    font-weight: 400;
    text-align: left;
  }

  .t14-resume .header-meta-item a {
    color: #c9a84c;
    text-decoration: none;
  }

  /* ── EDUCATION GRADE ── */
  .t14-resume .education-grade {
    font-size: 11px;
    color: #6b7c93;
    margin-top: 4px;
    font-weight: 500;
  }

  /* ── BODY ── */
  .t14-resume .resume-body {
    padding: 28px 36px 36px;
    text-align: left;
  }

  /* ── SECTION ── */
  .t14-resume .section-block {
    margin-bottom: 26px;
    text-align: left;
  }

  .t14-resume .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;
    text-align: left;
  }

  .t14-resume .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: #1a2a4a;
    white-space: nowrap;
    text-align: left;
  }

  .t14-resume .section-accent-bar {
    height: 2px;
    flex: 1;
    background: linear-gradient(90deg, #2e4a7a, #e8e8f0);
  }

  /* ── SUMMARY ── */
  .t14-resume .summary-text {
    font-size: 13.5px;
    line-height: 1.8;
    color: #333;
    font-weight: 400;  
    text-align: left;
  }

  /* ── ENTRY BLOCKS ── */
  .t14-resume .entry-block {
    margin-bottom: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid #eaedf5;
    text-align: left;
  }

  .t14-resume .entry-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .t14-resume .entry-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 2px;
    text-align: left;
  }

  .t14-resume .entry-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: #1a2a4a;
    line-height: 1.3;
    text-align: left;
  }

  .t14-resume .entry-date {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #ffffff;
    background: #2e4a7a;
    padding: 3px 10px;
    border-radius: 2px;
    white-space: nowrap;
    text-align: left;
  }

  .t14-resume .entry-subtitle {
    font-size: 12.5px;
    color: #4a6491;
    font-weight: 500;
    margin-bottom: 8px;
    text-align: left;
  }

  .t14-resume .entry-content {
    font-size: 13px;
    line-height: 1.7;
    color: #444;
    font-weight: 400;
    text-align: left;
  }

  .t14-resume .entry-content ul,
  .t14-resume .entry-content-desc ul {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .t14-resume .entry-content ol,
  .t14-resume .entry-content-desc ol {
    list-style-type: decimal !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .t14-resume .entry-content li,
  .t14-resume .entry-content-desc li {
    margin-bottom: 3px !important;
    line-height: 1.65 !important;
    list-style-position: outside !important;
  }

  /* ── SKILLS ── */
  .t14-resume .skills-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
  }

  .t14-resume .skill-row {
    display: flex;
    align-items: center;
    gap: 14px;
    text-align: left;
  }

  .t14-resume .skill-name-label {
    font-size: 13px;
    font-weight: 500;
    color: #1a2a4a;
    min-width: 160px;
    text-align: left;
  }

  .t14-resume .skill-track {
    flex: 1;
    height: 5px;
    background: #e8edf5;
    border-radius: 3px;
    overflow: hidden;
    max-width: 220px;
  }

  .t14-resume .skill-fill {
    height: 100%;
    background: linear-gradient(90deg, #1a2a4a, #4a7ab5);
    border-radius: 3px;
  }

  /* Categorized Skills */
  .t14-resume .skill-category-block {
    margin-bottom: 18px;
  }

  .t14-resume .skill-category-block:last-child {
    margin-bottom: 0;
  }

  .t14-resume .skill-category-title {
    font-size: 14px;
    font-weight: 600;
    color: #1a2a4a;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #2e4a7a;
    display: inline-block;
  }

  /* ── PROJECTS ── */
  .t14-resume .project-header {
    margin-bottom: 4px;
  }

  .t14-resume .project-links {
    display: flex;
    gap: 15px;
  }

  .t14-resume .project-link {
    font-size: 10px;
    font-weight: 500;
    color: #2e4a7a;
    text-decoration: underline;
  }

  .t14-resume .project-tech-stack {
    font-size: 11px;
    color: #4a6491;
    margin: 6px 0;
  }

  /* ── LANGUAGES ── */
  .t14-resume .lang-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
    text-align: left;
  }

  .t14-resume .lang-name {
    font-size: 13px;
    font-weight: 500;
    color: #1a2a4a;
    min-width: 160px;
    text-align: left;
  }

  /* ── ADDITIONAL ── */
  .t14-resume .additional-content {
    font-size: 13px;
    color: #444;
    line-height: 1.7;
    font-weight: 400;
    text-align: left;
  }

  .t14-resume .additional-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 7px;
    text-align: left;
  }

  .t14-resume .additional-diamond {
    width: 6px;
    height: 6px;
    background: #2e4a7a;
    transform: rotate(45deg);
    margin-top: 6px;
    flex-shrink: 0;
  }

  /* ── EDU CONTENT ── */
  .t14-resume .edu-content {
    font-size: 13px;
    line-height: 1.65;
    color: #444;
    font-weight: 400;
    text-align: left;
  }

  .t14-resume .edu-list {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .t14-resume .edu-list li {
    margin-bottom: 3px;
    line-height: 1.6;
    list-style-position: outside !important;
  }

  /* ── CUSTOM ── */
  .t14-resume .custom-section-content {
    font-size: 13px;
    line-height: 1.65;
    color: #444;
    font-weight: 400;
    text-align: left;
  }

  /* ── PRINT ── */
  @media print {
    @page {
      size: A4;
      margin: 16mm 0;
    }

    @page :first {
      margin-top: 0;
    }

    .t14-resume body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .t14-resume .resume-container {
      width: 100% !important;
      box-shadow: none !important;
    }

    .t14-resume .entry-block {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t14-resume .section-header {
      page-break-after: avoid;
      break-after: avoid;
    }

    .t14-resume .resume-body {
      padding-top: 24px;
    }

    .t14-resume .header-block {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .t14-resume .skill-fill,
    .t14-resume .section-accent-bar {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }

  @media (max-width: 768px) {
    .t14-resume .resume-container { width: 100%; }
    .t14-resume .header-block { padding: 20px; }
    .t14-resume .resume-body { padding: 16px 20px; }
    .t14-resume .entry-top-row { flex-direction: column; align-items: flex-start; }
    .t14-resume .skill-name-label, 
    .t14-resume .lang-name { min-width: 120px; }
    .t14-resume .project-links { margin-top: 6px; }
  }
`;

  /* ======================================================
     HTML GENERATION (for PDF download)
  ====================================================== */
  const generateHTML = () => {
    const stripHtmlHelper = (html: string) =>
      html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    const renderEntryText = (text: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">")) {
        return `<div class="entry-content entry-content-desc">${text}</div>`;
      }
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
      ) {
        return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
          .map((l) => {
            const t = l.trim();
            const c =
              t.startsWith("-") || t.startsWith("•")
                ? t.substring(1).trim()
                : t;
            return c
              ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>`
              : "";
          })
          .join("")}</ul></div>`;
      }
      return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    const SectionHtml = (title: string) => `
      <div class="section-header">
        <div class="section-title">${title}</div>
        <div class="section-accent-bar"></div>
      </div>`;

    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";
      
      const isCategorized = isCategorizedSkills(skills);
      
      if (isCategorized) {
        return `
          <div class="section-block">
            ${SectionHtml("Skills")}
            ${skills.map((category: any) => `
              <div class="skill-category-block">
                <div class="skill-category-title">${category.title}</div>
                <div class="skills-list">
                  ${category.skills.map((skill: any) => `
                    <div class="skill-row">
                      <span class="skill-name-label">${skill.name}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        return `
          <div class="section-block">
            ${SectionHtml("Skills")}
            <div class="skills-list">
              ${skills.map((skill: any) => `
                <div class="skill-row">
                  <span class="skill-name-label">${skill.name || skill.skill}</span>
                  ${skill.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(skill.level) / 4) * 100}%"></div></div>` : ""}
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";
      
      return `
        <div class="section-block">
          ${SectionHtml("Projects")}
          ${projects.map((project: any) => `
            <div class="entry-block">
              <div class="project-header">
                <div class="entry-top-row">
                  <div class="entry-title">${project.title || ""}</div>
                  <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                    ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
                  </div>
                </div>
              </div>
              ${project.techStack && project.techStack.length > 0 ? `
                <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
              ` : ""}
              ${project.description ? `
                <div class="entry-content">${project.description}</div>
              ` : ""}
            </div>
          `).join("")}
        </div>
      `;
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>${styles}</style>
    </head>
    <body>
      <div class="t14-resume">

        <!-- HEADER -->
        <div class="header-block">
          <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="header-jobtitle">
            ${
              contact?.jobTitle
                ? typeof contact.jobTitle === "string"
                  ? contact.jobTitle
                  : (contact.jobTitle as any)?.name || ""
                : ""
            }
          </div>
          <div class="header-meta-grid">
            ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
            ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
            ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
            ${githubUrl ? `<span class="header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
            ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
          </div>
        </div>

        <!-- BODY -->
        <div class="resume-body">

          ${summary ? `
          <div class="section-block">
            ${SectionHtml("Profile")}
            <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
          </div>` : ""}

          ${experiences.length > 0 ? `
          <div class="section-block">
            ${SectionHtml("Experience")}
            ${experiences.map((exp) => {
              const startFormatted = formatMonthYear(exp.startDate, true);
              const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
              return `
              <div class="entry-block">
                <div class="entry-top-row">
                  <div class="entry-title">${exp.jobTitle || ""}</div>
                  <div class="entry-date">${startFormatted} – ${endFormatted}</div>
                </div>
                <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` &nbsp;·&nbsp; ${exp.location}` : ""}</div>
                ${exp.text ? renderEntryText(exp.text) : ""}
              </div>`;
            }).join("")}
          </div>` : ""}

          <!-- PROJECTS -->
          ${generateProjectsHTML()}

          ${educations.length > 0 ? `
          <div class="section-block">
            ${SectionHtml("Education")}
            ${educations.map((edu) => {
              const dateStr = edu.startDate || edu.endDate
                ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                : "";
              const formattedGrade = formatGrade(edu.grade || "");
              let textHtml = "";
              if (edu.text) {
                if (edu.text.includes("<") && edu.text.includes(">")) {
                  textHtml = `<div class="edu-content">${edu.text}</div>`;
                } else {
                  const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
                  if (lines.some((l: string) => l.trim().startsWith("-"))) {
                    textHtml = `<ul class="edu-list">${lines.map((l: string) => {
                      const t = l.trim();
                      const c = t.startsWith("-") ? t.substring(1).trim() : t;
                      return c ? `<li>${c}</li>` : "";
                    }).join("")}</ul>`;
                  } else {
                    textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
                  }
                }
              }
              return `
              <div class="entry-block">
                <div class="entry-top-row">
                  <div class="entry-title">${edu.schoolname || ""}</div>
                  ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
                </div>
                ${edu.degree || edu.location || formattedGrade ? `<div class="entry-subtitle">
                  ${edu.degree || ""}
                  ${edu.degree && edu.location ? " &nbsp;·&nbsp; " : ""}
                  ${edu.location || ""}
                  ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
                </div>` : ""}
                ${textHtml}
              </div>`;
            }).join("")}
          </div>` : ""}

          <!-- SKILLS -->
          ${generateSkillsHTML()}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
          <div class="section-block">
            ${SectionHtml("Languages")}
            <div class="skills-list">
              ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
              <div class="lang-row">
                <span class="lang-name">${l.name}</span>
                ${l.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
              </div>`).join("")}
            </div>
          </div>` : ""}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
          <div class="section-block">
            ${SectionHtml("Certifications &amp; Licenses")}
            <div class="additional-content">
              ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
              <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
            </div>
          </div>` : ""}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
          <div class="section-block">
            ${SectionHtml("Hobbies &amp; Interests")}
            <div class="additional-content">
              ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
              <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
            </div>
          </div>` : ""}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
          <div class="section-block">
            ${SectionHtml("Awards &amp; Honors")}
            <div class="additional-content">
              ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
              <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
            </div>
          </div>` : ""}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
          <div class="section-block">
            ${SectionHtml("Websites &amp; Social Media")}
            <div class="additional-content">
              ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
              <div class="additional-item"><div class="additional-diamond"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`).join("")}
            </div>
          </div>` : ""}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
          <div class="section-block">
            ${SectionHtml("References")}
            <div class="additional-content">
              ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
              <div class="additional-item"><div class="additional-diamond"></div><div>${i.name}</div></div>`).join("")}
            </div>
          </div>` : ""}

          ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
          <div class="section-block">
            ${s.name ? SectionHtml(s.name) : ""}
            ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
          </div>`).join("") : ""}

        </div>
      </div>
    </body>
    </html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
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
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const stripHtml = (html: string) =>
    html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  /* ======================================================
     JSX PREVIEW
  ====================================================== */
  return (
    <div style={{ textAlign: "center", marginTop: 0 }}>
    
    {lastSegment === "download-resume" && (
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
      )}

      <div
        className={`t14-resume ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
        }}
      >
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-block">
          <div className="header-name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="header-jobtitle">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="header-meta-grid">
            {addressParts.length > 0 && (
              <span className="header-meta-item">
                {addressParts.join(", ")}
              </span>
            )}
            {contact?.email && (
              <span className="header-meta-item">{contact.email}</span>
            )}
            {contact?.phone && (
              <span className="header-meta-item">{contact.phone}</span>
            )}
            {formattedDob && (
              <span className="header-meta-item">{formattedDob}</span>
            )}
            {linkedinUrl && (
              <span className="header-meta-item">
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {githubUrl && (
              <span className="header-meta-item">
                <a
                  href={
                    githubUrl.startsWith("http")
                      ? githubUrl
                      : `https://${githubUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </span>
            )}
            {portfolioUrl && (
              <span className="header-meta-item">
                <a
                  href={
                    portfolioUrl.startsWith("http")
                      ? portfolioUrl
                      : `https://${portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </span>
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="resume-body">
          {/* SUMMARY */}
          {summary && (
            <div className="section-block">
              <div className="section-header">
                <div className="section-title">Profile</div>
                <div className="section-accent-bar" />
              </div>
              <div
                className="summary-text"
                dangerouslySetInnerHTML={{
                  __html: summary.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {experiences.length > 0 && (
            <div className="section-block">
              <div className="section-header">
                <div className="section-title">Experience</div>
                <div className="section-accent-bar" />
              </div>
              {experiences.map((exp, i) => (
                <div key={i} className="entry-block">
                  <div className="entry-top-row">
                    <div className="entry-title">{exp.jobTitle}</div>
                    <div className="entry-date">
                      <MonthYearDisplay value={exp.startDate} shortYear />
                      {" – "}
                      {exp.endDate ? (
                        <MonthYearDisplay value={exp.endDate} shortYear />
                      ) : (
                        "Present"
                      )}
                    </div>
                  </div>
                  <div className="entry-subtitle">
                    {exp.employer}
                    {exp.location && <> &nbsp;·&nbsp; {exp.location}</>}
                  </div>
                  {exp.text && (
                    <div
                      className="entry-content entry-content-desc"
                      dangerouslySetInnerHTML={{ __html: exp.text }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {renderProjects()}

          {/* EDUCATION */}
          {educations?.length > 0 && (
            <div className="section-block">
              <div className="section-header">
                <div className="section-title">Education</div>
                <div className="section-accent-bar" />
              </div>
              {educations.map((edu, index) => {
                let textContent = null;
                const formattedGrade = formatGrade(edu.grade || "");
                
                if (edu.text) {
                  if (edu.text.includes("<") && edu.text.includes(">")) {
                    textContent = (
                      <div
                        className="edu-content"
                        dangerouslySetInnerHTML={{ __html: edu.text }}
                      />
                    );
                  } else {
                    const lines = edu.text
                      .split("\n")
                      .filter((l: string) => l.trim() !== "");
                    if (lines.some((l: string) => l.trim().startsWith("-"))) {
                      textContent = (
                        <ul className="edu-list">
                          {lines.map((l: string, li: number) => {
                            const t = l.trim();
                            const c = t.startsWith("-")
                              ? t.substring(1).trim()
                              : t;
                            return c ? <li key={li}>{c}</li> : null;
                          })}
                        </ul>
                      );
                    } else {
                      textContent = (
                        <div
                          className="edu-content"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {stripHtml(edu.text)}
                        </div>
                      );
                    }
                  }
                }
                return (
                  <div key={edu.id || index} className="entry-block">
                    <div className="entry-top-row">
                      <div className="entry-title">{edu.schoolname || ""}</div>
                      {(edu.startDate || edu.endDate) && (
                        <div className="entry-date">
                          {edu.startDate || ""}
                          {edu.startDate && edu.endDate && " – "}
                          {edu.endDate || ""}
                        </div>
                      )}
                    </div>
                    {(edu.degree || edu.location || formattedGrade) && (
                      <div className="entry-subtitle">
                        {edu.degree || ""}
                        {edu.degree && edu.location && <> &nbsp;·&nbsp; </>}
                        {edu.location || ""}
                        {formattedGrade && (
                          <div className="education-grade">{formattedGrade}</div>
                        )}
                      </div>
                    )}
                    {textContent}
                  </div>
                );
              })}
            </div>
          )}

          {/* SKILLS */}
          {renderSkills()}

          {/* LANGUAGES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.languages) &&
            finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
              <div className="section-block">
                <div className="section-header">
                  <div className="section-title">Languages</div>
                  <div className="section-accent-bar" />
                </div>
                <div className="skills-list">
                  {finalize.languages.map(
                    (lang, index) =>
                      lang.name &&
                      lang.name.trim() !== "" && (
                        <div key={lang._id || index} className="lang-row">
                          <span className="lang-name">{lang.name}</span>
                          {lang.level && (
                            <div className="skill-track">
                              <div
                                className="skill-fill"
                                style={{
                                  width: `${(Number(lang.level) / 4) * 100}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* CERTIFICATIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize?.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="section-block">
                <div className="section-header">
                  <div className="section-title">
                    Certifications &amp; Licenses
                  </div>
                  <div className="section-accent-bar" />
                </div>
                <div className="additional-content">
                  {finalize.certificationsAndLicenses.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div key={item.id || index} className="additional-item">
                          <div className="additional-diamond" />
                          <div
                            dangerouslySetInnerHTML={{ __html: item.name }}
                          />
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* HOBBIES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize?.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="section-block">
                <div className="section-header">
                  <div className="section-title">Hobbies &amp; Interests</div>
                  <div className="section-accent-bar" />
                </div>
                <div className="additional-content">
                  {finalize.hobbiesAndInterests.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div key={item.id || index} className="additional-item">
                          <div className="additional-diamond" />
                          <div
                            dangerouslySetInnerHTML={{ __html: item.name }}
                          />
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* AWARDS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize?.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="section-block">
                <div className="section-header">
                  <div className="section-title">Awards &amp; Honors</div>
                  <div className="section-accent-bar" />
                </div>
                <div className="additional-content">
                  {finalize.awardsAndHonors.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div key={item.id || index} className="additional-item">
                          <div className="additional-diamond" />
                          <div
                            dangerouslySetInnerHTML={{ __html: item.name }}
                          />
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* WEBSITES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize?.websitesAndSocialMedia) &&
            finalize.websitesAndSocialMedia.some(
              (i) =>
                (i.websiteUrl && i.websiteUrl.trim() !== "") ||
                (i.socialMedia && i.socialMedia.trim() !== ""),
            ) && (
              <div className="section-block">
                <div className="section-header">
                  <div className="section-title">
                    Websites &amp; Social Media
                  </div>
                  <div className="section-accent-bar" />
                </div>
                <div className="additional-content">
                  {finalize.websitesAndSocialMedia.map(
                    (item, index) =>
                      (item.websiteUrl || item.socialMedia) && (
                        <div key={item.id || index} className="additional-item">
                          <div className="additional-diamond" />
                          <div>
                            {item.websiteUrl && (
                              <span>Website: {item.websiteUrl}</span>
                            )}
                            {item.websiteUrl && item.socialMedia && " · "}
                            {item.socialMedia && (
                              <span>Social: {item.socialMedia}</span>
                            )}
                          </div>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* REFERENCES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize?.references) &&
            finalize.references.some(
              (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="section-block">
                <div className="section-header">
                  <div className="section-title">References</div>
                  <div className="section-accent-bar" />
                </div>
                <div className="additional-content">
                  {finalize.references.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div key={item.id || index} className="additional-item">
                          <div className="additional-diamond" />
                          <div
                            dangerouslySetInnerHTML={{ __html: item.name }}
                          />
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* CUSTOM SECTIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize?.customSection) &&
            finalize.customSection.some(
              (s) => s?.name?.trim() || s?.description?.trim(),
            ) &&
            finalize.customSection
              .filter((s) => s?.name?.trim() || s?.description?.trim())
              .map((section, index) => (
                <div key={section.id || index} className="section-block">
                  {section.name && (
                    <div className="section-header">
                      <div className="section-title">{section.name}</div>
                      <div className="section-accent-bar" />
                    </div>
                  )}
                  {section.description && (
                    <div
                      className="custom-section-content"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  )}
                </div>
              ))}
        </div>
        {/* /resume-body */}
      </div>
    </div>
  );
};

export default TemplateFourteen;