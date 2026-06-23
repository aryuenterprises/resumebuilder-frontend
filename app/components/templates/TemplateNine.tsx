// // ─── Template Three ───────────────────────────────────────────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// // const TemplateNine: React.FC = () => {
//   const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {

//   // const context = useContext(CreateContext);

//   // const pathname = usePathname();
//   // const lastSegment = pathname.split("/").pop();

//   // const contact = context.contact || {};
//   // const educations = context?.education || [];
//   // const experiences = context?.experiences || [];
//   // const skills = context?.skills || [];
//   // const finalize = context?.finalize || {};
//   // const summary = context?.summary || "";

//    const context = useContext(CreateContext);
//     console.log("context,", context);

//     const pathname = usePathname();
//     const lastSegment = pathname.split("/").pop();

//     const contact = alldata?.contact || context.contact || {};
//     const educations = alldata?.educations || context?.education || [];
//     const experiences = alldata?.experiences || context?.experiences || [];
//     const skills = alldata?.skills || context?.skills || [];
//     const finalize = alldata?.finalize || context?.finalize || {};
//     const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;

//   /* ======================================================
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

// .t9-resume  body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t9-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//     text-align: left;
//   }

//     .t9-resume.is-preview {
//         transform: scale(0.36);

//     transform-origin: top left;
//     width: 210mm;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
// }

//   /* ── TOP BANNER HEADER ── */
//   .t9-resume  .header-banner {
//     background-color: #111111;
//     padding: 28px 32px 24px;
//     color: #ffffff;
//   }

//   .t9-resume  .header-name {
//     font-size: 32px;
//     font-weight: 700;
//     letter-spacing: -0.5px;
//     line-height: 1.1;
//     color: #ffffff;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t9-resume  .header-jobtitle {
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 1.8px;
//     text-transform: uppercase;
//     color: #aaaaaa;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t9-resume  .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12px;
//     color: #cccccc;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume  .header-meta-row a {
//     color: #cccccc;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   .t9-resume  .meta-divider {
//     color: #555555;
//   }

//   /* ── MAIN BODY AREA ── */
//   .t9-resume  .resume-body {
//     padding: 24px 32px 32px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t9-resume  .section-block {
//     margin-bottom: 24px;
//     text-align: left;
//   }

//   .t9-resume  .section-title-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 14px;
//     text-align: left;
//   }

//   .t9-resume  .section-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #111111;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t9-resume  .section-title-line {
//     flex: 1;
//     height: 1px;
//     background-color: #e0e0e0;
//   }

//   /* ── SUMMARY ── */
//   .t9-resume  .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #333333;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t9-resume  .entry-block {
//     display: grid;
//     grid-template-columns: 1fr;
//     margin-bottom: 18px;
//     padding-left: 12px;
//     border-left: 2px solid #e0e0e0;
//     text-align: left;
//   }

//   .t9-resume  .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume  .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t9-resume  .entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111111;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t9-resume  .entry-date {
//     font-size: 11.5px;
//     color: #777777;
//     font-weight: 400;
//     white-space: nowrap;
//     background: #f5f5f5;
//     padding: 2px 8px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .t9-resume  .entry-subtitle {
//     font-size: 12.5px;
//     color: #555555;
//     font-weight: 400;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume  .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume  .entry-content ul,
//   .t9-resume  .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume  .entry-content ol,
//   .t9-resume  .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume  .entry-content li,
//   .t9-resume  .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   .t9-resume  ul {
//     list-style-type: disc !important;
//   }

//   /* ── SKILLS ── */
//   .t9-resume  .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     text-align: left;
//   }

//   .t9-resume  .skill-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     text-align: left;
//   }

//   .t9-resume  .skill-name-label {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t9-resume  .skill-bar-wrap {
//     display: flex;
//     gap: 4px;
//     align-items: center;
//   }

//   .t9-resume  .skill-seg {
//     width: 18px;
//     height: 4px;
//     border-radius: 2px;
//     background: #dddddd;
//   }

//   .t9-resume  .skill-seg.active {
//     background: #111111;
//   }

//   /* ── LANGUAGES ── */
//   .t9-resume  .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t9-resume  .lang-name {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t9-resume  .additional-content {
//     font-size: 13px;
//     color: #444444;
//     line-height: 1.7;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume  .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 8px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume  .additional-bullet {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #111;
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t9-resume  .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume  .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume  .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t9-resume  .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
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

//   body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t9-resume  {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t9-resume .no-print {
//       display: none !important;
//     }

//     /* Only avoid breaking inside individual entries, NOT entire sections.
//        This prevents large blank gaps when a section is pushed wholesale to page 2. */
//     .t9-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Section titles should stay with at least one entry below them */
//     .t9-resume .section-title-row {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* When content flows to page 2+, @page margin provides top spacing. */
//     .t9-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t9-resume .header-banner {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t9-resume  {
//       width: 100%;
//     }

//     .t9-resume .header-banner {
//       padding: 20px;
//     }

//     .t9-resume .resume-body {
//       padding: 16px 20px;
//     }

//     .t9-resume .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderSkillSegs = (level: number | string, total = 4) => {
//       const filled = Number(level) || 0;
//       return Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<div class="skill-seg${i < filled ? " active" : ""}"></div>`,
//         )
//         .join("");
//     };

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some(
//           (l) => l.trim().startsWith("-") || l.trim().startsWith("•"),
//         )
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t9-resume ">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${
//               linkedinUrl
//                 ? `<span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>`
//                 : ""
//             }
//             ${
//               portfolioUrl
//                 ? `<span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>`
//                 : ""
//             }
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${
//             summary
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Profile</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//                  </div>`
//               : ""
//           }

//           <!-- EXPERIENCE -->
//           ${
//             experiences.length > 0
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Experience</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   ${experiences
//                     .map((exp) => {
//                       const startFormatted = formatMonthYear(exp.startDate, true);
//                       const endFormatted = exp.endDate
//                         ? formatMonthYear(exp.endDate, true)
//                         : "Present";
//                       return `
//                         <div class="entry-block">
//                           <div class="entry-top-row">
//                             <div class="entry-title">${exp.jobTitle || ""}</div>
//                             <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                           </div>
//                           <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                           ${exp.text ? renderEntryText(exp.text) : ""}
//                         </div>`;
//                     })
//                     .join("")}
//                  </div>`
//               : ""
//           }

//           <!-- EDUCATION -->
//           ${
//             educations.length > 0
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Education</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   ${educations
//                     .map((edu) => {
//                       const dateStr =
//                         edu.startDate || edu.endDate
//                           ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                           : "";
//                       let textHtml = "";
//                       if (edu.text) {
//                         if (edu.text.includes("<") && edu.text.includes(">")) {
//                           textHtml = `<div class="edu-content">${edu.text}</div>`;
//                         } else {
//                           const lines = edu.text
//                             .split("\n")
//                             .filter((l: string) => l.trim() !== "");
//                           if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                             textHtml = `<ul class="edu-list">${lines
//                               .map((l: string) => {
//                                 const t = l.trim();
//                                 const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                                 return c ? `<li>${c}</li>` : "";
//                               })
//                               .join("")}</ul>`;
//                           } else {
//                             textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//                           }
//                         }
//                       }
//                       return `
//                         <div class="entry-block">
//                           <div class="entry-top-row">
//                             <div class="entry-title">${edu.schoolname || ""}</div>
//                             ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                           </div>
//                           ${
//                             edu.degree || edu.location
//                               ? `<div class="entry-subtitle">
//                                   ${edu.degree || ""}${edu.degree && edu.location ? " · " : ""}${edu.location || ""}
//                                  </div>`
//                               : ""
//                           }
//                           ${textHtml}
//                         </div>`;
//                     })
//                     .join("")}
//                  </div>`
//               : ""
//           }

//           <!-- SKILLS -->
//           ${
//             skills.length > 0
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Skills</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="skills-list">
//                     ${skills
//                       .map(
//                         (s) => `
//                         <div class="skill-row">
//                           <span class="skill-name-label">${s.skill || ""}</span>
//                           ${
//                             s.level
//                               ? `<div class="skill-bar-wrap">${renderSkillSegs(s.level)}</div>`
//                               : ""
//                           }
//                         </div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- LANGUAGES -->
//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "")
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Languages</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="skills-list">
//                     ${finalize.languages
//                       .filter((l) => l.name && l.name.trim() !== "")
//                       .map(
//                         (l) => `
//                         <div class="lang-row">
//                           <span class="lang-name">${l.name}</span>
//                           ${
//                             l.level
//                               ? `<div class="skill-bar-wrap">${renderSkillSegs(l.level)}</div>`
//                               : ""
//                           }
//                         </div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- CERTIFICATIONS -->
//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Certifications &amp; Licenses</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="additional-content">
//                     ${finalize.certificationsAndLicenses
//                       .filter(
//                         (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                       )
//                       .map(
//                         (i) =>
//                           `<div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- HOBBIES -->
//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Hobbies &amp; Interests</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="additional-content">
//                     ${finalize.hobbiesAndInterests
//                       .filter(
//                         (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                       )
//                       .map(
//                         (i) =>
//                           `<div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- AWARDS -->
//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Awards &amp; Honors</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="additional-content">
//                     ${finalize.awardsAndHonors
//                       .filter(
//                         (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                       )
//                       .map(
//                         (i) =>
//                           `<div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- WEBSITES -->
//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (i) =>
//                 (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//                 (i.socialMedia && i.socialMedia.trim() !== ""),
//             )
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">Websites &amp; Social Media</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="additional-content">
//                     ${finalize.websitesAndSocialMedia
//                       .filter((i) => i.websiteUrl || i.socialMedia)
//                       .map(
//                         (i) =>
//                           `<div class="additional-item"><div class="additional-bullet"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- REFERENCES -->
//           ${
//             finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             )
//               ? `<div class="section-block">
//                   <div class="section-title-row">
//                     <div class="section-title">References</div>
//                     <div class="section-title-line"></div>
//                   </div>
//                   <div class="additional-content">
//                     ${finalize.references
//                       .filter(
//                         (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                       )
//                       .map(
//                         (i) =>
//                           `<div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`,
//                       )
//                       .join("")}
//                   </div>
//                  </div>`
//               : ""
//           }

//           <!-- CUSTOM SECTIONS -->
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
//                     <div class="section-block">
//                       ${
//                         s.name
//                           ? `<div class="section-title-row">
//                                <div class="section-title">${s.name}</div>
//                                <div class="section-title-line"></div>
//                              </div>`
//                           : ""
//                       }
//                       ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//                     </div>`,
//                   )
//                   .join("")
//               : ""
//           }

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
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
//      SKILL SEGMENTS (React)
//   ====================================================== */
//   const SkillSegs = ({
//     level,
//     total = 4,
//   }: {
//     level: number | string;
//     total?: number;
//   }) => (
//     <div className="skill-bar-wrap">
//       {Array.from({ length: total }).map((_, i) => (
//         <div
//           key={i}
//           className={`skill-seg${i < Number(level) ? " active" : ""}`}
//         />
//       ))}
//     </div>
//   );

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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
//         // className="t9-resume  bg-white"
//                 className={`t9-resume ${alldata ? 'is-preview' : ''}`}

//         style={{ margin: "0 auto",           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : ""
//  }}
//       >
//         <style>{styles}</style>

//         {/* HEADER BANNER */}
//         <div className="header-banner">
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
//           <div className="header-meta-row">
//             {addressParts.length > 0 && (
//               <span>{addressParts.join(", ")}</span>
//             )}
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {linkedinUrl && (
//               <span>
//                 <a
//                   href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span>
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
//               <div className="section-title-row">
//                 <div className="section-title">Profile</div>
//                 <div className="section-title-line" />
//               </div>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Experience</div>
//                 <div className="section-title-line" />
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
//                     {exp.location && ` · ${exp.location}`}
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
//               <div className="section-title-row">
//                 <div className="section-title">Education</div>
//                 <div className="section-title-line" />
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
//                             const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = (
//                         <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>
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
//                         {edu.degree && edu.location && " · "}
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
//               <div className="section-title-row">
//                 <div className="section-title">Skills</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="skills-list">
//                 {skills.map((skill, i) => (
//                   <div key={i} className="skill-row">
//                     <span className="skill-name-label">{skill.skill}</span>
//                     {skill.level && <SkillSegs level={skill.level} />}
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
//                 <div className="section-title-row">
//                   <div className="section-title">Languages</div>
//                   <div className="section-title-line" />
//                 </div>
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name &&
//                       lang.name.trim() !== "" && (
//                         <div key={lang._id || index} className="lang-row">
//                           <span className="lang-name">{lang.name}</span>
//                           {lang.level && <SkillSegs level={lang.level} />}
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
//                 <div className="section-title-row">
//                   <div className="section-title">Certifications &amp; Licenses</div>
//                   <div className="section-title-line" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-bullet" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
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
//                 <div className="section-title-row">
//                   <div className="section-title">Hobbies &amp; Interests</div>
//                   <div className="section-title-line" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-bullet" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
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
//                 <div className="section-title-row">
//                   <div className="section-title">Awards &amp; Honors</div>
//                   <div className="section-title-line" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-bullet" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
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
//                 <div className="section-title-row">
//                   <div className="section-title">Websites &amp; Social Media</div>
//                   <div className="section-title-line" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-bullet" />
//                           <div>
//                             {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                             {item.websiteUrl && item.socialMedia && " · "}
//                             {item.socialMedia && <span>Social: {item.socialMedia}</span>}
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
//                 <div className="section-title-row">
//                   <div className="section-title">References</div>
//                   <div className="section-title-line" />
//                 </div>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-bullet" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
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
//                     <div className="section-title-row">
//                       <div className="section-title">{section.name}</div>
//                       <div className="section-title-line" />
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

//         </div>{/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateNine;

// ─── Template Three ───────────────────────────────────────────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
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
//           <div className="section-title-row">
//             <div className="section-title">Skills</div>
//             <div className="section-title-line" />
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
//           <div className="section-title-row">
//             <div className="section-title">Skills</div>
//             <div className="section-title-line" />
//           </div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-row">
//                 <span className="skill-name-label">{skill.name || skill.skill}</span>
//                 {skill.level && <SkillSegs level={skill.level} />}
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
//         <div className="section-title-row">
//           <div className="section-title">Projects</div>
//           <div className="section-title-line" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
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
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   .t9-resume body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t9-resume {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//     text-align: left;
//   }

//   .t9-resume.is-preview {
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

//   /* ── TOP BANNER HEADER ── */
//   .t9-resume .header-banner {
//     background-color: #111111;
//     padding: 28px 32px 24px;
//     color: #ffffff;
//   }

//   .t9-resume .header-name {
//     font-size: 32px;
//     font-weight: 700;
//     letter-spacing: -0.5px;
//     line-height: 1.1;
//     color: #ffffff;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t9-resume .header-jobtitle {
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 1.8px;
//     text-transform: uppercase;
//     color: #aaaaaa;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12px;
//     color: #cccccc;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row a {
//     color: #cccccc;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── MAIN BODY AREA ── */
//   .t9-resume .resume-body {
//     padding: 24px 32px 32px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t9-resume .section-block {
//     margin-bottom: 24px;
//     text-align: left;
//   }

//   .t9-resume .section-title-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 14px;
//     text-align: left;
//   }

//   .t9-resume .section-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #111111;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t9-resume .section-title-line {
//     flex: 1;
//     height: 1px;
//     background-color: #e0e0e0;
//   }

//   /* ── SUMMARY ── */
//   .t9-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #333333;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t9-resume .entry-block {
//     display: grid;
//     grid-template-columns: 1fr;
//     margin-bottom: 18px;
//     padding-left: 12px;
//     border-left: 2px solid #e0e0e0;
//     text-align: left;
//   }

//   .t9-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t9-resume .entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111111;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t9-resume .entry-date {
//     font-size: 11.5px;
//     color: #777777;
//     font-weight: 400;
//     white-space: nowrap;
//     background: #f5f5f5;
//     padding: 2px 8px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .t9-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #555555;
//     font-weight: 400;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t9-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     text-align: left;
//   }

//   .t9-resume .skill-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     text-align: left;
//   }

//   .t9-resume .skill-name-label {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t9-resume .skill-bar-wrap {
//     display: flex;
//     gap: 4px;
//     align-items: center;
//   }

//   .t9-resume .skill-seg {
//     width: 18px;
//     height: 4px;
//     border-radius: 2px;
//     background: #dddddd;
//   }

//   .t9-resume .skill-seg.active {
//     background: #111111;
//   }

//   /* Categorized Skills */
//   .t9-resume .skill-category-block {
//     margin-bottom: 16px;
//   }

//   .t9-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .skill-category-title {
//     font-size: 12px;
//     font-weight: 600;
//     color: #111111;
//     margin-bottom: 8px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//   }

//   /* ── PROJECTS ── */
//   .t9-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t9-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t9-resume .project-link {
//     font-size: 11px;
//     color: #777777;
//     text-decoration: underline;
//   }

//   .t9-resume .project-tech-stack {
//     font-size: 11.5px;
//     color: #666666;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t9-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t9-resume .lang-name {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t9-resume .additional-content {
//     font-size: 13px;
//     color: #444444;
//     line-height: 1.7;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 8px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .additional-bullet {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #111;
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t9-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t9-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
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

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t9-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t9-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .section-title-row {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t9-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t9-resume .header-banner {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t9-resume {
//       width: 100%;
//     }

//     .t9-resume .header-banner {
//       padding: 20px;
//     }

//     .t9-resume .resume-body {
//       padding: 16px 20px;
//     }

//     .t9-resume .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t9-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderSkillSegs = (level: number | string, total = 4) => {
//       const filled = Number(level) || 0;
//       return Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<div class="skill-seg${i < filled ? " active" : ""}"></div>`,
//         )
//         .join("");
//     };

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some(
//           (l) => l.trim().startsWith("-") || l.trim().startsWith("•"),
//         )
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Skills</div>
//               <div class="section-title-line"></div>
//             </div>
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
//             <div class="section-title-row">
//               <div class="section-title">Skills</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="skills-list">
//               ${skills.map((skill: any) => `
//                 <div class="skill-row">
//                   <span class="skill-name-label">${skill.name || skill.skill}</span>
//                   ${skill.level ? `<div class="skill-bar-wrap">${renderSkillSegs(skill.level)}</div>` : ""}
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
//           <div class="section-title-row">
//             <div class="section-title">Projects</div>
//             <div class="section-title-line"></div>
//           </div>
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t9-resume">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${summary ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Profile</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//           </div>` : ""}

//           <!-- EXPERIENCE -->
//           ${experiences.length > 0 ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Experience</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${experiences.map((exp) => {
//               const startFormatted = formatMonthYear(exp.startDate, true);
//               const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           <!-- EDUCATION -->
//           ${educations.length > 0 ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Education</div>
//               <div class="section-title-line"></div>
//             </div>
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
//                 ${edu.degree || edu.location ? `<div class="entry-subtitle">${edu.degree || ""}${edu.degree && edu.location ? " · " : ""}${edu.location || ""}</div>` : ""}
//                 ${textHtml}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           <!-- LANGUAGES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Languages</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="skills-list">
//               ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-bar-wrap">${renderSkillSegs(l.level)}</div>` : ""}
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- CERTIFICATIONS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Certifications &amp; Licenses</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- HOBBIES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Hobbies &amp; Interests</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- AWARDS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Awards &amp; Honors</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- WEBSITES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Websites &amp; Social Media</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- REFERENCES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">References</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- CUSTOM SECTIONS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//             ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//           </div>`).join("") : ""}

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
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
//      SKILL SEGMENTS (React)
//   ====================================================== */
//   const SkillSegs = ({
//     level,
//     total = 4,
//   }: {
//     level: number | string;
//     total?: number;
//   }) => (
//     <div className="skill-bar-wrap">
//       {Array.from({ length: total }).map((_, i) => (
//         <div
//           key={i}
//           className={`skill-seg${i < Number(level) ? " active" : ""}`}
//         />
//       ))}
//     </div>
//   );

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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
//         className={`t9-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER BANNER */}
//         <div className="header-banner">
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
//           <div className="header-meta-row">
//             {addressParts.length > 0 && <span>{addressParts.join(", ")}</span>}
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {linkedinUrl && (
//               <span>
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span>
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="resume-body">

//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Profile</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }} />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Experience</div>
//                 <div className="section-title-line" />
//               </div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{exp.jobTitle}</div>
//                     <div className="entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                     </div>
//                   </div>
//                   <div className="entry-subtitle">
//                     {exp.employer}
//                     {exp.location && ` · ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div className="entry-content entry-content-desc" dangerouslySetInnerHTML={{ __html: exp.text }} />
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
//               <div className="section-title-row">
//                 <div className="section-title">Education</div>
//                 <div className="section-title-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = <div className="edu-content" dangerouslySetInnerHTML={{ __html: edu.text }} />;
//                   } else {
//                     const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <ul className="edu-list">
//                           {lines.map((l: string, li: number) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>{stripHtml(edu.text)}</div>;
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
//                         {edu.degree && edu.location && " · "}
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
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Languages</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="skills-list">
//                 {finalize.languages.map((lang, index) => lang.name && lang.name.trim() !== "" && (
//                   <div key={lang._id || index} className="lang-row">
//                     <span className="lang-name">{lang.name}</span>
//                     {lang.level && <SkillSegs level={lang.level} />}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CERTIFICATIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Certifications &amp; Licenses</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* HOBBIES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Hobbies &amp; Interests</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* AWARDS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Awards &amp; Honors</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* WEBSITES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Websites &amp; Social Media</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map((item, index) => (item.websiteUrl || item.socialMedia) && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div>
//                       {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                       {item.websiteUrl && item.socialMedia && " · "}
//                       {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* REFERENCES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">References</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.references.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) && finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, index) => (
//             <div key={section.id || index} className="section-block">
//               {section.name && (
//                 <div className="section-title-row">
//                   <div className="section-title">{section.name}</div>
//                   <div className="section-title-line" />
//                 </div>
//               )}
//               {section.description && (
//                 <div className="custom-section-content" dangerouslySetInnerHTML={{ __html: section.description }} />
//               )}
//             </div>
//           ))}

//         </div>{/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateNine;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
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
//           <div className="section-title-row">
//             <div className="section-title">Skills</div>
//             <div className="section-title-line" />
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
//           <div className="section-title-row">
//             <div className="section-title">Skills</div>
//             <div className="section-title-line" />
//           </div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-row">
//                 <span className="skill-name-label">{skill.name || skill.skill}</span>
//                 {skill.level && <SkillSegs level={skill.level} />}
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
//         <div className="section-title-row">
//           <div className="section-title">Projects</div>
//           <div className="section-title-line" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
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
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   .t9-resume body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t9-resume {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//     text-align: left;
//   }

//   .t9-resume.is-preview {
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

//   /* ── TOP BANNER HEADER ── */
//   .t9-resume .header-banner {
//     background-color: #111111;
//     padding: 28px 32px 24px;
//     color: #ffffff;
//   }

//   .t9-resume .header-name {
//     font-size: 32px;
//     font-weight: 700;
//     letter-spacing: -0.5px;
//     line-height: 1.1;
//     color: #ffffff;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t9-resume .header-jobtitle {
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 1.8px;
//     text-transform: uppercase;
//     color: #aaaaaa;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12px;
//     color: #cccccc;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row a {
//     color: #cccccc;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t9-resume .education-grade {
//     font-size: 11px;
//     color: #666666;
//     margin-top: 3px;
//     font-weight: 500;
//   }

//   /* ── MAIN BODY AREA ── */
//   .t9-resume .resume-body {
//     padding: 24px 32px 32px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t9-resume .section-block {
//     margin-bottom: 24px;
//     text-align: left;
//   }

//   .t9-resume .section-title-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 14px;
//     text-align: left;
//   }

//   .t9-resume .section-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #111111;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t9-resume .section-title-line {
//     flex: 1;
//     height: 1px;
//     background-color: #e0e0e0;
//   }

//   /* ── SUMMARY ── */
//   .t9-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #333333;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t9-resume .entry-block {
//     display: grid;
//     grid-template-columns: 1fr;
//     margin-bottom: 18px;
//     padding-left: 12px;
//     border-left: 2px solid #e0e0e0;
//     text-align: left;
//   }

//   .t9-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t9-resume .entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111111;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t9-resume .entry-date {
//     font-size: 11.5px;
//     color: #777777;
//     font-weight: 400;
//     white-space: nowrap;
//     background: #f5f5f5;
//     padding: 2px 8px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .t9-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #555555;
//     font-weight: 400;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t9-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     text-align: left;
//   }

//   .t9-resume .skill-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     text-align: left;
//   }

//   .t9-resume .skill-name-label {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t9-resume .skill-bar-wrap {
//     display: flex;
//     gap: 4px;
//     align-items: center;
//   }

//   .t9-resume .skill-seg {
//     width: 18px;
//     height: 4px;
//     border-radius: 2px;
//     background: #dddddd;
//   }

//   .t9-resume .skill-seg.active {
//     background: #111111;
//   }

//   /* Categorized Skills */
//   .t9-resume .skill-category-block {
//     margin-bottom: 16px;
//   }

//   .t9-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .skill-category-title {
//     font-size: 12px;
//     font-weight: 600;
//     color: #111111;
//     margin-bottom: 8px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//   }

//   /* ── PROJECTS ── */
//   .t9-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t9-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t9-resume .project-link {
//     font-size: 11px;
//     color: #777777;
//     text-decoration: underline;
//   }

//   .t9-resume .project-tech-stack {
//     font-size: 11.5px;
//     color: #666666;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t9-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t9-resume .lang-name {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t9-resume .additional-content {
//     font-size: 13px;
//     color: #444444;
//     line-height: 1.7;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 8px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .additional-bullet {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #111;
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t9-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t9-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
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

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t9-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t9-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .section-title-row {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t9-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t9-resume .header-banner {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t9-resume {
//       width: 100%;
//     }

//     .t9-resume .header-banner {
//       padding: 20px;
//     }

//     .t9-resume .resume-body {
//       padding: 16px 20px;
//     }

//     .t9-resume .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t9-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderSkillSegs = (level: number | string, total = 4) => {
//       const filled = Number(level) || 0;
//       return Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<div class="skill-seg${i < filled ? " active" : ""}"></div>`,
//         )
//         .join("");
//     };

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some(
//           (l) => l.trim().startsWith("-") || l.trim().startsWith("•"),
//         )
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Skills</div>
//               <div class="section-title-line"></div>
//             </div>
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
//             <div class="section-title-row">
//               <div class="section-title">Skills</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="skills-list">
//               ${skills.map((skill: any) => `
//                 <div class="skill-row">
//                   <span class="skill-name-label">${skill.name || skill.skill}</span>
//                   ${skill.level ? `<div class="skill-bar-wrap">${renderSkillSegs(skill.level)}</div>` : ""}
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
//           <div class="section-title-row">
//             <div class="section-title">Projects</div>
//             <div class="section-title-line"></div>
//           </div>
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t9-resume">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${summary ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Profile</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//           </div>` : ""}

//           <!-- EXPERIENCE -->
//           ${experiences.length > 0 ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Experience</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${experiences.map((exp) => {
//               const startFormatted = formatMonthYear(exp.startDate, true);
//               const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           <!-- EDUCATION -->
//           ${educations.length > 0 ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Education</div>
//               <div class="section-title-line"></div>
//             </div>
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
//                   ${edu.degree && edu.location ? " · " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>` : ""}
//                 ${textHtml}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           <!-- LANGUAGES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Languages</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="skills-list">
//               ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-bar-wrap">${renderSkillSegs(l.level)}</div>` : ""}
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- CERTIFICATIONS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Certifications &amp; Licenses</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- HOBBIES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Hobbies &amp; Interests</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- AWARDS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Awards &amp; Honors</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- WEBSITES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Websites &amp; Social Media</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- REFERENCES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">References</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.name}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- CUSTOM SECTIONS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//             ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//           </div>`).join("") : ""}

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
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
//      SKILL SEGMENTS (React)
//   ====================================================== */
//   const SkillSegs = ({
//     level,
//     total = 4,
//   }: {
//     level: number | string;
//     total?: number;
//   }) => (
//     <div className="skill-bar-wrap">
//       {Array.from({ length: total }).map((_, i) => (
//         <div
//           key={i}
//           className={`skill-seg${i < Number(level) ? " active" : ""}`}
//         />
//       ))}
//     </div>
//   );

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>

//    {lastSegment === "download-resume" && (
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
//         className={`t9-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER BANNER */}
//         <div className="header-banner">
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
//           <div className="header-meta-row">
//             {addressParts.length > 0 && <span>{addressParts.join(", ")}</span>}
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {formattedDob && <span>{formattedDob}</span>}
//             {linkedinUrl && (
//               <span>
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//               </span>
//             )}
//             {githubUrl && (
//               <span>
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span>
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="resume-body">

//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Profile</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }} />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Experience</div>
//                 <div className="section-title-line" />
//               </div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{exp.jobTitle}</div>
//                     <div className="entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                     </div>
//                   </div>
//                   <div className="entry-subtitle">
//                     {exp.employer}
//                     {exp.location && ` · ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div className="entry-content entry-content-desc" dangerouslySetInnerHTML={{ __html: exp.text }} />
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
//               <div className="section-title-row">
//                 <div className="section-title">Education</div>
//                 <div className="section-title-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 const formattedGrade = formatGrade(edu.grade || "");

//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = <div className="edu-content" dangerouslySetInnerHTML={{ __html: edu.text }} />;
//                   } else {
//                     const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <ul className="edu-list">
//                           {lines.map((l: string, li: number) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>{stripHtml(edu.text)}</div>;
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
//                         {edu.degree && edu.location && " · "}
//                         {edu.location || ""}
//                         {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
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
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Languages</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="skills-list">
//                 {finalize.languages.map((lang, index) => lang.name && lang.name.trim() !== "" && (
//                   <div key={lang._id || index} className="lang-row">
//                     <span className="lang-name">{lang.name}</span>
//                     {lang.level && <SkillSegs level={lang.level} />}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CERTIFICATIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Certifications &amp; Licenses</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* HOBBIES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Hobbies &amp; Interests</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* AWARDS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Awards &amp; Honors</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* WEBSITES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Websites &amp; Social Media</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map((item, index) => (item.websiteUrl || item.socialMedia) && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div>
//                       {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                       {item.websiteUrl && item.socialMedia && " · "}
//                       {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* REFERENCES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">References</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.references.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) && finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, index) => (
//             <div key={section.id || index} className="section-block">
//               {section.name && (
//                 <div className="section-title-row">
//                   <div className="section-title">{section.name}</div>
//                   <div className="section-title-line" />
//                 </div>
//               )}
//               {section.description && (
//                 <div className="custom-section-content" dangerouslySetInnerHTML={{ __html: section.description }} />
//               )}
//             </div>
//           ))}

//         </div>{/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateNine;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const linkedinUrl = contact?.linkedIn || contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === 'string' && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <div className="section-block">
//         <div className="section-title-row">
//           <div className="section-title">Skills</div>
//           <div className="section-title-line" />
//         </div>
//         <div
//           className="skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-block">
//         <div className="section-title-row">
//           <div className="section-title">Projects</div>
//           <div className="section-title-line" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
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
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   .t9-resume body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t9-resume {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//     text-align: left;
//   }

//   .t9-resume.is-preview {
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

//   /* Rich text content styles */
//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ul,
//   .t9-resume .entry-content-desc ol,
//   .t9-resume .skills-content ul,
//   .t9-resume .skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li,
//   .t9-resume .skills-content li {
//     margin-bottom: 4px !important;
//   }

//   .t9-resume .entry-content strong,
//   .t9-resume .entry-content-desc strong,
//   .t9-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t9-resume .entry-content em,
//   .t9-resume .entry-content-desc em,
//   .t9-resume .skills-content em {
//     font-style: italic !important;
//   }

//   .t9-resume .entry-content u,
//   .t9-resume .entry-content-desc u,
//   .t9-resume .skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t9-resume .entry-content p,
//   .t9-resume .entry-content-desc p,
//   .t9-resume .skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills Content Styles */
//   .t9-resume .skills-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//   }

//   /* ── TOP BANNER HEADER ── */
//   .t9-resume .header-banner {
//     background-color: #111111;
//     padding: 28px 32px 24px;
//     color: #ffffff;
//   }

//   .t9-resume .header-name {
//     font-size: 32px;
//     font-weight: 700;
//     letter-spacing: -0.5px;
//     line-height: 1.1;
//     color: #ffffff;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t9-resume .header-jobtitle {
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 1.8px;
//     text-transform: uppercase;
//     color: #aaaaaa;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12px;
//     color: #cccccc;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row a {
//     color: #cccccc;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t9-resume .education-grade {
//     font-size: 11px;
//     color: #666666;
//     margin-top: 3px;
//     font-weight: 500;
//   }

//   /* ── MAIN BODY AREA ── */
//   .t9-resume .resume-body {
//     padding: 24px 32px 32px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t9-resume .section-block {
//     margin-bottom: 24px;
//     text-align: left;
//   }

//   .t9-resume .section-title-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 14px;
//     text-align: left;
//   }

//   .t9-resume .section-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #111111;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t9-resume .section-title-line {
//     flex: 1;
//     height: 1px;
//     background-color: #e0e0e0;
//   }

//   /* ── SUMMARY ── */
//   .t9-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #333333;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t9-resume .entry-block {
//     display: grid;
//     grid-template-columns: 1fr;
//     margin-bottom: 18px;
//     padding-left: 12px;
//     border-left: 2px solid #e0e0e0;
//     text-align: left;
//   }

//   .t9-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t9-resume .entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111111;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t9-resume .entry-date {
//     font-size: 11.5px;
//     color: #777777;
//     font-weight: 400;
//     white-space: nowrap;
//     background: #f5f5f5;
//     padding: 2px 8px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .t9-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #555555;
//     font-weight: 400;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── PROJECTS ── */
//   .t9-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t9-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t9-resume .project-link {
//     font-size: 11px;
//     color: #777777;
//     text-decoration: underline;
//   }

//   .t9-resume .project-tech-stack {
//     font-size: 11.5px;
//     color: #666666;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t9-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t9-resume .lang-name {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t9-resume .additional-content {
//     font-size: 13px;
//     color: #444444;
//     line-height: 1.7;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 8px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .additional-bullet {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #111;
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t9-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t9-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
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

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t9-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t9-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .section-title-row {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t9-resume .resume-body {
//       padding-top: 24px;
//     }

//     .t9-resume .header-banner {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .t9-resume {
//       width: 100%;
//     }

//     .t9-resume .header-banner {
//       padding: 20px;
//     }

//     .t9-resume .resume-body {
//       padding: 16px 20px;
//     }

//     .t9-resume .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t9-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
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
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some(
//           (l) => l.trim().startsWith("-") || l.trim().startsWith("•"),
//         )
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === 'string' && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Skills</div>
//             <div class="section-title-line"></div>
//           </div>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Projects</div>
//             <div class="section-title-line"></div>
//           </div>
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t9-resume">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${summary ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Profile</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="summary-text">${cleanQuillHTML(summary)}</div>
//           </div>` : ""}

//           <!-- EXPERIENCE -->
//           ${experiences.length > 0 ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Experience</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${experiences.map((exp) => {
//               const startFormatted = formatMonthYear(exp.startDate, true);
//               const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//               return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           <!-- EDUCATION -->
//           ${educations.length > 0 ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Education</div>
//               <div class="section-title-line"></div>
//             </div>
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
//                   ${edu.degree && edu.location ? " · " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>` : ""}
//                 ${textHtml}
//               </div>`;
//             }).join("")}
//           </div>` : ""}

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           <!-- LANGUAGES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Languages</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="skills-list">
//               ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- CERTIFICATIONS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Certifications &amp; Licenses</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${cleanQuillHTML(i.name)}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- HOBBIES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Hobbies &amp; Interests</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${cleanQuillHTML(i.name)}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- AWARDS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Awards &amp; Honors</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${cleanQuillHTML(i.name)}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- WEBSITES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Websites &amp; Social Media</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- REFERENCES -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">References</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="additional-content">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `
//               <div class="additional-item"><div class="additional-bullet"></div><div>${cleanQuillHTML(i.name)}</div></div>`).join("")}
//             </div>
//           </div>` : ""}

//           <!-- CUSTOM SECTIONS -->
//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//             ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`).join("") : ""}

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
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

//    {lastSegment === "download-resume" && (
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
//         className={`t9-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER BANNER */}
//         <div className="header-banner">
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
//           <div className="header-meta-row">
//             {addressParts.length > 0 && <span>{addressParts.join(", ")}</span>}
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {formattedDob && <span>{formattedDob}</span>}
//             {linkedinUrl && (
//               <span>
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//               </span>
//             )}
//             {githubUrl && (
//               <span>
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span>
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="resume-body">

//           {/* SUMMARY */}
//           {summary && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Profile</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="summary-text" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }} />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Experience</div>
//                 <div className="section-title-line" />
//               </div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{exp.jobTitle}</div>
//                     <div className="entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                     </div>
//                   </div>
//                   <div className="entry-subtitle">
//                     {exp.employer}
//                     {exp.location && ` · ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div className="entry-content entry-content-desc" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />
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
//               <div className="section-title-row">
//                 <div className="section-title">Education</div>
//                 <div className="section-title-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 const formattedGrade = formatGrade(edu.grade || "");

//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = <div className="edu-content" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />;
//                   } else {
//                     const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                     if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <ul className="edu-list">
//                           {lines.map((l: string, li: number) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       );
//                     } else {
//                       textContent = <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>{stripHtml(edu.text)}</div>;
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
//                         {edu.degree && edu.location && " · "}
//                         {edu.location || ""}
//                         {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS - Now using text editor format */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Languages</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="skills-list">
//                 {finalize.languages.map((lang, index) => lang.name && lang.name.trim() !== "" && (
//                   <div key={lang._id || index} className="lang-row">
//                     <span className="lang-name">{lang.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CERTIFICATIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Certifications &amp; Licenses</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: cleanQuillHTML(item.name) }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* HOBBIES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Hobbies &amp; Interests</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: cleanQuillHTML(item.name) }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* AWARDS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Awards &amp; Honors</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: cleanQuillHTML(item.name) }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* WEBSITES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">Websites &amp; Social Media</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map((item, index) => (item.websiteUrl || item.socialMedia) && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div>
//                       {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                       {item.websiteUrl && item.socialMedia && " · "}
//                       {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* REFERENCES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title-row">
//                 <div className="section-title">References</div>
//                 <div className="section-title-line" />
//               </div>
//               <div className="additional-content">
//                 {finalize.references.map((item, index) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                   <div key={item.id || index} className="additional-item">
//                     <div className="additional-bullet" />
//                     <div dangerouslySetInnerHTML={{ __html: cleanQuillHTML(item.name) }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) && finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, index) => (
//             <div key={section.id || index} className="section-block">
//               {section.name && (
//                 <div className="section-title-row">
//                   <div className="section-title">{section.name}</div>
//                   <div className="section-title-line" />
//                 </div>
//               )}
//               {section.description && (
//                 <div className="custom-section-content" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />
//               )}
//             </div>
//           ))}

//         </div>{/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateNine;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

//     return (
//       <div className="section-block">
//         <div className="section-title-row">
//           <div className="section-title">Skills</div>
//           <div className="section-title-line" />
//         </div>
//         <div
//           className="skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-block">
//         <div className="section-title-row">
//           <div className="section-title">Projects</div>
//           <div className="section-title-line" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(", ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="entry-content"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   .t9-resume body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t9-resume {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//     text-align: left;
//   }

//   .t9-resume * {
//     box-sizing: border-box;
//   }

//   .t9-resume.is-preview {
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

//   /* Rich text content styles */
//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ul,
//   .t9-resume .entry-content-desc ol,
//   .t9-resume .skills-content ul,
//   .t9-resume .skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li,
//   .t9-resume .skills-content li {
//     margin-bottom: 4px !important;
//   }

//   .t9-resume .entry-content strong,
//   .t9-resume .entry-content-desc strong,
//   .t9-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t9-resume .entry-content em,
//   .t9-resume .entry-content-desc em,
//   .t9-resume .skills-content em {
//     font-style: italic !important;
//   }

//   .t9-resume .entry-content u,
//   .t9-resume .entry-content-desc u,
//   .t9-resume .skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t9-resume .entry-content p,
//   .t9-resume .entry-content-desc p,
//   .t9-resume .skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills Content Styles */
//   .t9-resume .skills-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//   }

//   /* ── TOP BANNER HEADER ── */
//   .t9-resume .header-banner {
//     background-color: #111111;
//     padding: 28px 32px 24px;
//     color: #ffffff;
//   }

//   .t9-resume .header-name {
//     font-size: 32px;
//     font-weight: 700;
//     letter-spacing: -0.5px;
//     line-height: 1.1;
//     color: #ffffff;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t9-resume .header-jobtitle {
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 1.8px;
//     text-transform: uppercase;
//     color: #aaaaaa;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12px;
//     color: #cccccc;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row a {
//     color: #cccccc;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t9-resume .education-grade {
//     font-size: 11px;
//     color: #666666;
//     margin-top: 3px;
//     font-weight: 500;
//   }

//   /* ── MAIN BODY AREA ── */
//   .t9-resume .resume-body {
//     padding: 24px 32px 32px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t9-resume .section-block {
//     margin-bottom: 24px;
//     text-align: left;
//   }

//   .t9-resume .section-title-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 14px;
//     text-align: left;
//   }

//   .t9-resume .section-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #111111;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t9-resume .section-title-line {
//     flex: 1;
//     height: 1px;
//     background-color: #e0e0e0;
//   }

//   /* ── SUMMARY ── */
//   .t9-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #333333;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t9-resume .entry-block {
//     display: grid;
//     grid-template-columns: 1fr;
//     margin-bottom: 18px;
//     padding-left: 12px;
//     border-left: 2px solid #e0e0e0;
//     text-align: left;
//   }

//   .t9-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t9-resume .entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111111;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t9-resume .entry-date {
//     font-size: 11.5px;
//     color: #777777;
//     font-weight: 400;
//     white-space: nowrap;
//     background: #f5f5f5;
//     padding: 2px 8px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .t9-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #555555;
//     font-weight: 400;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── PROJECTS ── */
//   .t9-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t9-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t9-resume .project-link {
//     font-size: 11px;
//     color: #777777;
//     text-decoration: underline;
//   }

//   .t9-resume .project-tech-stack {
//     font-size: 11.5px;
//     color: #666666;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t9-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 12px;
//     background: #f8f8f8;
//     border-radius: 4px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t9-resume .lang-name {
//     font-size: 13px;
//     color: #1a1a1a;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t9-resume .additional-content {
//     font-size: 13px;
//     color: #444444;
//     line-height: 1.7;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 8px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .additional-bullet {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #111;
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .t9-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t9-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t9-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
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
//       margin: 0;
//       padding: 0;
//     }

//     .t9-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//     }

//     .t9-resume .header-banner {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       padding: 28px 32px 24px !important;
//     }

//     .t9-resume .resume-body {
//       padding: 24px 32px 32px !important;
//     }

//     .t9-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .section-title-row {
//       page-break-after: avoid;
//       break-after: avoid;
//     }
//   }

//   @media (max-width: 768px) {
//     .t9-resume {
//       width: 100%;
//     }

//     .t9-resume .header-banner {
//       padding: 20px;
//     }

//     .t9-resume .resume-body {
//       padding: 16px 20px;
//     }

//     .t9-resume .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t9-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
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
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Skills</div>
//             <div class="section-title-line"></div>
//           </div>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Projects</div>
//             <div class="section-title-line"></div>
//           </div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="entry-content">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
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
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t9-resume">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${
//             summary
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Profile</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="summary-text">${cleanQuillHTML(summary)}</div>
//           </div>`
//               : ""
//           }

//           <!-- EXPERIENCE -->
//           ${
//             experiences.length > 0
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Experience</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${experiences
//               .map((exp) => {
//                 const startFormatted = formatMonthYear(exp.startDate, false);
//                 const endFormatted = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           <!-- EDUCATION -->
//           ${
//             educations.length > 0
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Education</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${educations
//               .map((edu) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                     : "";
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );

//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${edu.degree || ""}</div>
//                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${
//                   edu.schoolname || edu.location || formattedGrade
//                     ? `<div class="entry-subtitle">
//                   ${edu.schoolname || ""}
//                   ${edu.degree && edu.location ? " · " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>`
//                     : ""
//                 }
//                 ${edu.text && `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           <!-- CUSTOM SECTIONS -->
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
//           <div class="section-block">
//             ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//             ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`,
//                   )
//                   .join("")
//               : ""
//           }

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
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
//       {/* {lastSegment === "download-resume" && ( */}
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
//       {/* )} */}

//       <div
//         className={`t9-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER BANNER */}
//         <div className="header-banner">
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
//           <div className="header-meta-row">
//             {addressParts.length > 0 && <span>{addressParts.join(", ")}</span>}
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {formattedDob && <span>{formattedDob}</span>}
//             {linkedinUrl && (
//               <span>
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
//               <span>
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
//               <span>
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
//               <div className="section-title-row">
//                 <div className="section-title">Profile</div>
//                 <div className="section-title-line" />
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
//               <div className="section-title-row">
//                 <div className="section-title">Experience</div>
//                 <div className="section-title-line" />
//               </div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 return (
//                   <div key={i} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{exp.jobTitle}</div>
//                       <div className="entry-date">
//                         {start} — {end}
//                       </div>
//                     </div>
//                     <div className="entry-subtitle">
//                       {exp.employer}
//                       {exp.location && ` · ${exp.location}`}
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="entry-content entry-content-desc"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
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
//               <div className="section-title-row">
//                 <div className="section-title">Education</div>
//                 <div className="section-title-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );

//                 return (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title"> {edu.degree || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="entry-date">
//                           {edu.startDate || ""}–{edu.endDate || "Present"}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location || formattedGrade) && (
//                       <div className="entry-subtitle">
//                         {edu.schoolname || ""}
//                         {edu.degree && edu.location && " · "}
//                         {edu.location || ""}
//                         {formattedGrade && (
//                           <div className="education-grade">
//                             {formattedGrade}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     {edu.text && (
//                       <div
//                         className="edu-content"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
//                       />
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
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <div key={section.id || index} className="section-block">
//                   {section.name && (
//                     <div className="section-title-row">
//                       <div className="section-title">{section.name}</div>
//                       <div className="section-title-line" />
//                     </div>
//                   )}
//                   {section.description && (
//                     <div
//                       className="custom-section-content"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(section.description),
//                       }}
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

// export default TemplateNine;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

//     return (
//       <div className="section-block">
//         <div className="section-title-row">
//           <div className="section-title">Skills</div>
//           <div className="section-title-line" />
//         </div>
//         <div
//           className="skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section-block">
//         <div className="section-title-row">
//           <div className="section-title">Projects</div>
//           <div className="section-title-line" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="project-header">
//               <div className="entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(", ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="entry-content"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   .t9-resume body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t9-resume {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 0;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//     text-align: left;
//   }

//   .t9-resume * {
//     box-sizing: border-box;
//   }

//   .t9-resume.is-preview {
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

//   /* Rich text content styles */
//   .t9-resume .entry-content ul,
//   .t9-resume .entry-content ol,
//   .t9-resume .entry-content-desc ul,
//   .t9-resume .entry-content-desc ol,
//   .t9-resume .skills-content ul,
//   .t9-resume .skills-content ol,
//   .t9-resume .edu-content ul,
//   .t9-resume .edu-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t9-resume .entry-content li,
//   .t9-resume .entry-content-desc li,
//   .t9-resume .skills-content li,
//   .t9-resume .edu-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//   }

//   .t9-resume .entry-content ul,
//   .t9-resume .skills-content ul,
//   .t9-resume .edu-content ul {
//     list-style-type: disc !important;
//   }

//   .t9-resume .entry-content ol,
//   .t9-resume .skills-content ol,
//   .t9-resume .edu-content ol {
//     list-style-type: decimal !important;
//   }

//   .t9-resume .entry-content strong,
//   .t9-resume .entry-content-desc strong,
//   .t9-resume .skills-content strong,
//   .t9-resume .edu-content strong {
//     font-weight: 700 !important;
//   }

//   .t9-resume .entry-content em,
//   .t9-resume .entry-content-desc em,
//   .t9-resume .skills-content em,
//   .t9-resume .edu-content em {
//     font-style: italic !important;
//   }

//   .t9-resume .entry-content u,
//   .t9-resume .entry-content-desc u,
//   .t9-resume .skills-content u,
//   .t9-resume .edu-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t9-resume .entry-content p,
//   .t9-resume .entry-content-desc p,
//   .t9-resume .skills-content p,
//   .t9-resume .edu-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills Content Styles */
//   .t9-resume .skills-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//   }

//   /* Edu Content Styles */
//   .t9-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .edu-content ul,
//   .t9-resume .edu-content ol {
//     margin: 6px 0 6px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t9-resume .edu-content li {
//     margin-bottom: 3px !important;
//   }

//   /* ── TOP BANNER HEADER ── */
//   .t9-resume .header-banner {
//     background-color: #111111;
//     padding: 28px 32px 24px;
//     color: #ffffff;
//   }

//   .t9-resume .header-name {
//     font-size: 32px;
//     font-weight: 700;
//     letter-spacing: -0.5px;
//     line-height: 1.1;
//     color: #ffffff;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t9-resume .header-jobtitle {
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 1.8px;
//     text-transform: uppercase;
//     color: #aaaaaa;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12px;
//     color: #cccccc;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .header-meta-row a {
//     color: #cccccc;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t9-resume .education-grade {
//     font-size: 11px;
//     color: #666666;
//     margin-top: 3px;
//     font-weight: 500;
//   }

//   /* ── MAIN BODY AREA ── */
//   .t9-resume .resume-body {
//     padding: 24px 32px 32px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t9-resume .section-block {
//     margin-bottom: 24px;
//     text-align: left;
//   }

//   .t9-resume .section-title-row {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 14px;
//     text-align: left;
//   }

//   .t9-resume .section-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #111111;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t9-resume .section-title-line {
//     flex: 1;
//     height: 1px;
//     background-color: #e0e0e0;
//   }

//   /* ── SUMMARY ── */
//   .t9-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #333333;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t9-resume .entry-block {
//     display: grid;
//     grid-template-columns: 1fr;
//     margin-bottom: 18px;
//     padding-left: 12px;
//     border-left: 2px solid #e0e0e0;
//     text-align: left;
//   }

//   .t9-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t9-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t9-resume .entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111111;
//     line-height: 1.3;
//     text-align: left;
//   }

//   .t9-resume .entry-date {
//     font-size: 11.5px;
//     color: #777777;
//     font-weight: 400;
//     white-space: nowrap;
//     background: #f5f5f5;
//     padding: 2px 8px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .t9-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #555555;
//     font-weight: 400;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t9-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── PROJECTS ── */
//   .t9-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t9-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t9-resume .project-link {
//     font-size: 11px;
//     color: #777777;
//     text-decoration: underline;
//   }

//   .t9-resume .project-tech-stack {
//     font-size: 11.5px;
//     color: #666666;
//     margin: 4px 0 6px;
//   }

//   /* ── CUSTOM ── */
//   .t9-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #444444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t9-resume .custom-section-content ul,
//   .t9-resume .custom-section-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t9-resume .custom-section-content li {
//     margin-bottom: 4px !important;
//   }

//   .t9-resume .custom-section-content ul {
//     list-style-type: disc !important;
//   }

//   .t9-resume .custom-section-content ol {
//     list-style-type: decimal !important;
//   }

//  /* ── PRINT ── */
// @media print {
//   @page {
//     size: A4;
//     margin: 0;
//   }

//   body {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//     margin: 0;
//     padding: 0;
//   }

//   .t9-resume {
//     width: 100% !important;
//     padding: 0 !important;
//     margin: 0 !important;
//     box-shadow: none !important;
//   }

//   .t9-resume .header-banner {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//     padding: 28px 32px 24px !important;
//   }

//   .t9-resume .resume-body {
//     padding: 24px 32px 32px !important;
//   }

//   .t9-resume .entry-block {
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t9-resume .section-title-row {
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Add top margin to elements that appear at the top of a new page */
//   .t9-resume .section-block:first-child {
//     margin-top: 0;
//   }

//   /* Force top margin on any section that starts a new page */
//   .t9-resume .section-block {
//     page-break-inside: avoid;
//   }
// }

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
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:20px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.6;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Skills</div>
//             <div class="section-title-line"></div>
//           </div>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Projects</div>
//             <div class="section-title-line"></div>
//           </div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="entry-content">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
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
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t9-resume">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${
//             summary
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Profile</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="summary-text">${cleanQuillHTML(summary)}</div>
//           </div>`
//               : ""
//           }

//           <!-- EXPERIENCE -->
//           ${
//             experiences.length > 0
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Experience</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${experiences
//               .map((exp) => {
//                 const startFormatted = formatMonthYear(exp.startDate, false);
//                 const endFormatted = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           <!-- EDUCATION -->
//           ${
//             educations.length > 0
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Education</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${educations
//               .map((edu) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                     : "";
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );

//                 // Process education text with cleanQuillHTML for proper list rendering
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";

//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${edu.degree || ""}</div>
//                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${
//                   edu.schoolname || edu.location || formattedGrade
//                     ? `<div class="entry-subtitle">
//                   ${edu.schoolname || ""}
//                   ${edu.schoolname && edu.location ? " · " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>`
//                     : ""
//                 }
//                 ${eduTextHtml ? `<div class="edu-content">${eduTextHtml}</div>` : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           <!-- CUSTOM SECTIONS -->
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
//           <div class="section-block">
//             ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//             ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`,
//                   )
//                   .join("")
//               : ""
//           }

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
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

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
//       {lastSegment === "download-resume" && (

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
//       )}
//       <div
//         className={`t9-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER BANNER */}
//         <div className="header-banner">
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
//           <div className="header-meta-row">
//             {addressParts.length > 0 && <span>{addressParts.join(", ")}</span>}
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {formattedDob && <span>{formattedDob}</span>}
//             {linkedinUrl && (
//               <span>
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
//               <span>
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
//               <span>
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
//               <div className="section-title-row">
//                 <div className="section-title">Profile</div>
//                 <div className="section-title-line" />
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
//               <div className="section-title-row">
//                 <div className="section-title">Experience</div>
//                 <div className="section-title-line" />
//               </div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 return (
//                   <div key={i} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{exp.jobTitle}</div>
//                       <div className="entry-date">
//                         {start} — {end}
//                       </div>
//                     </div>
//                     <div className="entry-subtitle">
//                       {exp.employer}
//                       {exp.location && ` · ${exp.location}`}
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="entry-content entry-content-desc"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
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
//               <div className="section-title-row">
//                 <div className="section-title">Education</div>
//                 <div className="section-title-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";

//                 return (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title"> {edu.degree || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="entry-date">
//                           {edu.startDate || ""}–{edu.endDate || "Present"}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.schoolname || edu.location || formattedGrade) && (
//                       <div className="entry-subtitle">
//                         {edu.schoolname || ""}
//                         {edu.schoolname && edu.location && " · "}
//                         {edu.location || ""}
//                         {formattedGrade && (
//                           <div className="education-grade">
//                             {formattedGrade}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     {eduTextHtml && (
//                       <div
//                         className="edu-content"
//                         dangerouslySetInnerHTML={{
//                           __html: eduTextHtml,
//                         }}
//                       />
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
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <div key={section.id || index} className="section-block">
//                   {section.name && (
//                     <div className="section-title-row">
//                       <div className="section-title">{section.name}</div>
//                       <div className="section-title-line" />
//                     </div>
//                   )}
//                   {section.description && (
//                     <div
//                       className="custom-section-content"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(section.description),
//                       }}
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

// export default TemplateNine;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// //
// // PDF renderer (Puppeteer) options:
// //   page: A4  →  210 mm × 297 mm
// //   margin: 15 mm on all sides
// //
// // At 96 dpi: 1 mm = 3.7795275591 px
// //   210 mm → 793.70 px  → A4_W        = 794
// //   297 mm → 1122.52 px → A4_H        = 1123
// //    15 mm →  56.69 px  → MARGIN       = 57
// //
// // CRITICAL — how Puppeteer pages content:
// //   Puppeteer renders with 15mm margins, so EACH PAGE has:
// //     top margin    = 57px  (white space)
// //     content area  = 1009px  ← this is where content sits
// //     bottom margin = 57px  (white space)
// //     total         = 1123px
// //
// //   Content is paginated in 1009px SLICES, not 1123px slices.
// //   Page N content starts at: N × 1009px (content offset)
// //   Displayed at:             N × 1123px + 57px (with margin offset)
// //
// // For the preview to match, we must:
// //   1. Cut content every PAGE_CONTENT_H (1009px) — same as Puppeteer
// //   2. Render each page with MARGIN (57px) top/bottom white space
// //   3. Page card height = A4_H (1123px) = MARGIN + content + MARGIN
// //
// // CRITICAL — box-sizing: border-box:
// //   .t9-resume { width: 794px; padding: 57px; box-sizing: border-box }
// //   → inner text width = 794 - 57 - 57 = 680 px
// //   → matches PDF text width = 210mm - 15mm - 15mm = 180mm = 680px ✓
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

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

//   /* ======================================================
//      CSS — SINGLE COLUMN | B&W | MODERN CLEAN
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t9-resume {
//       width: ${A4_W}px;
//       /* LEFT+RIGHT margins only — top/bottom are handled per-page by .page-content-clip */
//       padding: 0 ${MARGIN}px;
//       background-color: #ffffff;
//       font-family: 'DM Sans', sans-serif;
//       color: #1a1a1a;
//       text-align: left;
//     }

//     .t9-resume * {
//       box-sizing: border-box;
//     }

//     /* Rich text content styles */
//     .t9-resume .entry-content ul,
//     .t9-resume .entry-content ol,
//     .t9-resume .entry-content-desc ul,
//     .t9-resume .entry-content-desc ol,
//     .t9-resume .skills-content ul,
//     .t9-resume .skills-content ol,
//     .t9-resume .edu-content ul,
//     .t9-resume .edu-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t9-resume .entry-content li,
//     .t9-resume .entry-content-desc li,
//     .t9-resume .skills-content li,
//     .t9-resume .edu-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .entry-content ul,
//     .t9-resume .skills-content ul,
//     .t9-resume .edu-content ul {
//       list-style-type: disc !important;
//     }

//     .t9-resume .entry-content ol,
//     .t9-resume .skills-content ol,
//     .t9-resume .edu-content ol {
//       list-style-type: decimal !important;
//     }

//     .t9-resume .entry-content strong,
//     .t9-resume .entry-content-desc strong,
//     .t9-resume .skills-content strong,
//     .t9-resume .edu-content strong {
//       font-weight: 700 !important;
//     }

//     .t9-resume .entry-content em,
//     .t9-resume .entry-content-desc em,
//     .t9-resume .skills-content em,
//     .t9-resume .edu-content em {
//       font-style: italic !important;
//     }

//     .t9-resume .entry-content u,
//     .t9-resume .entry-content-desc u,
//     .t9-resume .skills-content u,
//     .t9-resume .edu-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t9-resume .entry-content p,
//     .t9-resume .entry-content-desc p,
//     .t9-resume .skills-content p,
//     .t9-resume .edu-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Skills Content Styles */
//     .t9-resume .skills-content {
//       font-size: 13px;
//       line-height: 1.65;
//       color: #444444;
//       font-weight: 300;
//       text-align: left;
//     }

//     .t9-resume .skills-content p {
//       margin: 0 0 6px 0 !important;
//     }

//     /* Edu Content Styles */
//     .t9-resume .edu-content {
//       font-size: 13px;
//       line-height: 1.65;
//       color: #444444;
//       font-weight: 300;
//       text-align: left;
//     }

//     .t9-resume .edu-content ul,
//     .t9-resume .edu-content ol {
//       margin: 6px 0 6px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t9-resume .edu-content li {
//       margin-bottom: 3px !important;
//     }

//     /* ── TOP BANNER HEADER ── */
//     .t9-resume .header-banner {
//       background-color: #111111;
//       padding: 28px 32px 24px;
//       color: #ffffff;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .header-name {
//       font-size: 32px;
//       font-weight: 700;
//       letter-spacing: -0.5px;
//       line-height: 1.1;
//       color: #ffffff;
//       margin-bottom: 5px;
//       text-align: left;
//     }

//     .t9-resume .header-jobtitle {
//       font-size: 13px;
//       font-weight: 400;
//       letter-spacing: 1.8px;
//       text-transform: uppercase;
//       color: #aaaaaa;
//       margin-bottom: 16px;
//       text-align: left;
//     }

//     .t9-resume .header-meta-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px 20px;
//       font-size: 12px;
//       color: #cccccc;
//       font-weight: 300;
//       text-align: left;
//     }

//     .t9-resume .header-meta-row a {
//       color: #cccccc;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//     }

//     /* ── EDUCATION GRADE ── */
//     .t9-resume .education-grade {
//       font-size: 11px;
//       color: #666666;
//       margin-top: 3px;
//       font-weight: 500;
//     }

//     /* ── MAIN BODY AREA ── */
//     .t9-resume .resume-body {
//       padding: 24px 32px 32px;
//       text-align: left;
//     }

//     /* ── SECTION ── */
//     .t9-resume .section-block {
//       margin-bottom: 24px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .section-title-row {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       margin-bottom: 14px;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t9-resume .section-title {
//       font-size: 11px;
//       font-weight: 700;
//       letter-spacing: 2.5px;
//       text-transform: uppercase;
//       color: #111111;
//       white-space: nowrap;
//       text-align: left;
//     }

//     .t9-resume .section-title-line {
//       flex: 1;
//       height: 1px;
//       background-color: #e0e0e0;
//     }

//     /* ── SUMMARY ── */
//     .t9-resume .summary-text {
//       font-size: 13.5px;
//       line-height: 1.75;
//       color: #333333;
//       font-weight: 300;
//       text-align: left;
//     }

//     /* ── ENTRY BLOCKS ── */
//     .t9-resume .entry-block {
//       display: grid;
//       grid-template-columns: 1fr;
//       margin-bottom: 18px;
//       padding-left: 12px;
//       border-left: 2px solid #e0e0e0;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t9-resume .entry-block:last-child {
//       margin-bottom: 0;
//     }

//     .t9-resume .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 8px;
//       flex-wrap: wrap;
//       margin-bottom: 2px;
//       text-align: left;
//     }

//     .t9-resume .entry-title {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111111;
//       line-height: 1.3;
//       text-align: left;
//     }

//     .t9-resume .entry-date {
//       font-size: 11.5px;
//       color: #777777;
//       font-weight: 400;
//       white-space: nowrap;
//       background: #f5f5f5;
//       padding: 2px 8px;
//       border-radius: 20px;
//       text-align: left;
//     }

//     .t9-resume .entry-subtitle {
//       font-size: 12.5px;
//       color: #555555;
//       font-weight: 400;
//       margin-bottom: 6px;
//       text-align: left;
//     }

//     .t9-resume .entry-content {
//       font-size: 13px;
//       line-height: 1.65;
//       color: #444444;
//       font-weight: 300;
//       text-align: left;
//     }

//     /* ── PROJECTS ── */
//     .t9-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .t9-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t9-resume .project-link {
//       font-size: 11px;
//       color: #777777;
//       text-decoration: underline;
//     }

//     .t9-resume .project-tech-stack {
//       font-size: 11.5px;
//       color: #666666;
//       margin: 4px 0 6px;
//     }

//     /* ── CUSTOM ── */
//     .t9-resume .custom-section-content {
//       font-size: 13px;
//       line-height: 1.65;
//       color: #444444;
//       font-weight: 300;
//       text-align: left;
//     }

//     .t9-resume .custom-section-content ul,
//     .t9-resume .custom-section-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t9-resume .custom-section-content li {
//       margin-bottom: 4px !important;
//     }

//     .t9-resume .custom-section-content ul {
//       list-style-type: disc !important;
//     }

//     .t9-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//     }

//     /* ── PRINT ── */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t9-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         margin: 0 !important;
//         box-shadow: none !important;
//       }

//       .t9-resume .header-banner {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = useCallback((forPDF = false): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${cleanQuillHTML(text)}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:20px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return c
//               ? `<li style="margin-bottom:3px;line-height:1.6;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//     const addressStr = addressParts.join(", ");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Skills</div>
//             <div class="section-title-line"></div>
//           </div>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-block">
//           <div class="section-title-row">
//             <div class="section-title">Projects</div>
//             <div class="section-title-line"></div>
//           </div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="entry-block">
//               <div class="project-header">
//                 <div class="entry-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="entry-content">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML
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

//       return finalize.customSection
//         .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//         .map(
//           (s: any) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//             ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>`,
//         )
//         .join("");
//     };

//     // PDF override: strip the fixed width/padding from .t9-resume so Puppeteer's
//     // own 15mm margins control the layout
//     const pdfOverrideStyle = forPDF
//       ? `<style>.t9-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <meta name="viewport" content="width=device-width, initial-scale=1"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//       ${pdfOverrideStyle}
//     </head>
//     <body style="margin:0;padding:0;background:white;">
//       <div class="t9-resume">

//         <!-- HEADER BANNER -->
//         <div class="header-banner">
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
//           <div class="header-meta-row">
//             ${addressStr ? `<span>${addressStr}</span>` : ""}
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           <!-- SUMMARY -->
//           ${
//             summary
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Profile</div>
//               <div class="section-title-line"></div>
//             </div>
//             <div class="summary-text">${cleanQuillHTML(summary)}</div>
//           </div>`
//               : ""
//           }

//           <!-- EXPERIENCE -->
//           ${
//             experiences.length > 0
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Experience</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${experiences
//               .map((exp) => {
//                 const startFormatted = formatMonthYear(exp.startDate, false);
//                 const endFormatted = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${exp.jobTitle || ""}</div>
//                   <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                 </div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           <!-- PROJECTS -->
//           ${generateProjectsHTML()}

//           <!-- EDUCATION -->
//           ${
//             educations.length > 0
//               ? `<div class="section-block">
//             <div class="section-title-row">
//               <div class="section-title">Education</div>
//               <div class="section-title-line"></div>
//             </div>
//             ${educations
//               .map((edu) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                     : "";
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );

//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";

//                 return `
//               <div class="entry-block">
//                 <div class="entry-top-row">
//                   <div class="entry-title">${edu.degree || ""}</div>
//                   ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                 </div>
//                 ${
//                   edu.schoolname || edu.location || formattedGrade
//                     ? `<div class="entry-subtitle">
//                   ${edu.schoolname || ""}
//                   ${edu.schoolname && edu.location ? " · " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>`
//                     : ""
//                 }
//                 ${eduTextHtml ? `<div class="edu-content">${eduTextHtml}</div>` : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//               : ""
//           }

//           <!-- SKILLS -->
//           ${generateSkillsHTML()}

//           <!-- CUSTOM SECTIONS -->
//           ${generateCustomSectionsHTML()}

//         </div><!-- /resume-body -->
//       </div>
//     </body>
//     </html>
//   `;
//   }, [contact, educations, experiences, skills, projects, finalize, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, addressParts, styles]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — mirrors Puppeteer's page-break-inside:avoid logic
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const iframe = measureRef.current;
//         if (!iframe) {
//           resolve([fullHtml]);
//           return;
//         }

//         const doc = iframe.contentDocument || iframe.contentWindow?.document;
//         if (!doc) {
//           resolve([fullHtml]);
//           return;
//         }

//         doc.open();
//         doc.write(fullHtml);
//         doc.close();

//         const doSplit = () => {
//           const resume = doc.querySelector<HTMLElement>(".t9-resume");
//           if (!resume) {
//             resolve([fullHtml]);
//             return;
//           }

//           const resumeTop =
//             resume.getBoundingClientRect().top +
//             (doc.documentElement.scrollTop || doc.body.scrollTop);
//           const totalH = resume.scrollHeight;

//           // ── Collect avoid-break elements ──────────────────────────────────
//           const AVOID_SELECTORS = [
//             ".header-banner",
//             ".section-block",
//             ".entry-block",
//           ].join(", ");

//           interface Block {
//             top: number;
//             bottom: number;
//           }
//           const blocks: Block[] = [];

//           resume
//             .querySelectorAll<HTMLElement>(AVOID_SELECTORS)
//             .forEach((el) => {
//               const rect = el.getBoundingClientRect();
//               const elTop =
//                 rect.top -
//                 resumeTop +
//                 (doc.documentElement.scrollTop || doc.body.scrollTop);
//               const elBot =
//                 rect.bottom -
//                 resumeTop +
//                 (doc.documentElement.scrollTop || doc.body.scrollTop);
//               if (elBot - elTop > 8) blocks.push({ top: elTop, bottom: elBot });
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate actual page cut points ──────────────────────────────
//           const pageStarts: number[] = [0];

//           while (true) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;

//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 actualCut = block.top;
//                 break;
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//           }

//           // ── Build one HTML doc per page ───────────────────────────────────
//           const pageHtmls = pageStarts.map(
//             (contentOffsetY) => `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative;
//       width: ${A4_W}px;
//       height: ${A4_H}px;
//       background: white;
//       overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute;
//       top: ${MARGIN}px;
//       left: 0;
//       width: ${A4_W}px;
//       height: ${PAGE_CONTENT_H}px;
//       overflow: hidden;
//     }
//     .page-shift {
//       position: absolute;
//       top: ${-contentOffsetY}px;
//       left: 0;
//       width: ${A4_W}px;
//     }
//     .t9-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important;
//       padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resume.outerHTML}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`,
//           );

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => {
//             typeof win.requestAnimationFrame === "function"
//               ? win.requestAnimationFrame(doSplit)
//               : setTimeout(doSplit, 0);
//           });
//         } else {
//           setTimeout(doSplit, 350);
//         }
//       });
//     },
//     [styles],
//   );

//   // ── Debounced updates ────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     setHtmlContent(generateHTML());
//   }, [generateHTML]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: generateHTML(true) },
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
//      RENDER
//   ====================================================== */
//   return (
//     <>
//       {/* Invisible measurement iframe */}
//       <iframe
//         ref={measureRef}
//         title="resume-measure"
//         aria-hidden="true"
//         style={{
//           position: "fixed",
//           top: "-99999px",
//           left: "-99999px",
//           width: `${A4_W}px`,
//           height: `${A4_H * 10}px`,
//           border: "none",
//           visibility: "hidden",
//           pointerEvents: "none",
//         }}
//         sandbox="allow-same-origin allow-scripts"
//       />

//       {/* Download button */}
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

//       {alldata ? (
//         // ── THUMBNAIL mode: first page only, scaled 36% ──────────────────
//         <div
//           style={{
//             width: `${A4_W}px`,
//             height: `${A4_H}px`,
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "hidden",
//             pointerEvents: "none",
//             flexShrink: 0,
//           }}
//         >
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 border: "none",
//                 display: "block",
//                 pointerEvents: "none",
//               }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 background: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#ccc",
//                 fontSize: 14,
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         // ── FULL PREVIEW mode: paginated A4 pages ────────────────────────
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               {/* Page pill */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "10px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     color: "#6b7280",
//                     whiteSpace: "nowrap",
//                     padding: "3px 12px",
//                     background: "#f3f4f6",
//                     borderRadius: "999px",
//                     border: "1px solid #e5e7eb",
//                     letterSpacing: "0.05em",
//                     fontFamily: "system-ui, sans-serif",
//                   }}
//                 >
//                   Page {idx + 1}
//                   {pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
//               </div>

//               {/* A4 card */}
//               <div
//                 style={{
//                   width: `${A4_W}px`,
//                   height: `${A4_H}px`,
//                   overflow: "hidden",
//                   background: "white",
//                   boxShadow:
//                     "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                   borderRadius: "2px",
//                   flexShrink: 0,
//                 }}
//               >
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     border: "none",
//                     display: "block",
//                     pointerEvents: "none",
//                   }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateNine;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";

// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateNine: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address, contact?.city, contact?.postCode, contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t9-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background-color: #ffffff;
//       font-family: 'DM Sans', sans-serif;
//       color: #1a1a1a;
//       text-align: left;
//     }

//     .t9-resume * { box-sizing: border-box; }

//     .t9-resume .entry-content ul, .t9-resume .entry-content ol,
//     .t9-resume .entry-content-desc ul, .t9-resume .entry-content-desc ol,
//     .t9-resume .skills-content ul, .t9-resume .skills-content ol,
//     .t9-resume .edu-content ul, .t9-resume .edu-content ol {
//       margin: 8px 0 8px 20px !important; padding-left: 20px !important;
//     }
//     .t9-resume .entry-content li, .t9-resume .entry-content-desc li,
//     .t9-resume .skills-content li, .t9-resume .edu-content li {
//       margin-bottom: 4px !important; line-height: 1.5 !important;
//     }
//     .t9-resume .entry-content ul, .t9-resume .skills-content ul,
//     .t9-resume .edu-content ul { list-style-type: disc !important; }
//     .t9-resume .entry-content ol, .t9-resume .skills-content ol,
//     .t9-resume .edu-content ol { list-style-type: decimal !important; }
//     .t9-resume .entry-content strong, .t9-resume .entry-content-desc strong,
//     .t9-resume .skills-content strong, .t9-resume .edu-content strong { font-weight: 700 !important; }
//     .t9-resume .entry-content em, .t9-resume .entry-content-desc em,
//     .t9-resume .skills-content em, .t9-resume .edu-content em { font-style: italic !important; }
//     .t9-resume .entry-content u, .t9-resume .entry-content-desc u,
//     .t9-resume .skills-content u, .t9-resume .edu-content u { text-decoration: underline !important; }
//     .t9-resume .entry-content p, .t9-resume .entry-content-desc p,
//     .t9-resume .skills-content p, .t9-resume .edu-content p { white-space: pre-wrap !important; }

//     .t9-resume .skills-content {
//       font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
//     }
//     .t9-resume .skills-content p { margin: 0 0 6px 0 !important; }

//     .t9-resume .edu-content {
//       font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
//     }
//     .t9-resume .edu-content ul, .t9-resume .edu-content ol { margin: 6px 0 6px 20px !important; padding-left: 20px !important; }
//     .t9-resume .edu-content li { margin-bottom: 3px !important; }

//     .t9-resume .header-banner {
//       background-color: #111111; padding: 28px 32px 24px; color: #ffffff;
//       -webkit-print-color-adjust: exact; print-color-adjust: exact;
//     }
//     .t9-resume .header-name {
//       font-size: 32px; font-weight: 700; letter-spacing: -0.5px;
//       line-height: 1.1; color: #ffffff; margin-bottom: 5px; text-align: left;
//     }
//     .t9-resume .header-jobtitle {
//       font-size: 13px; font-weight: 400; letter-spacing: 1.8px;
//       text-transform: uppercase; color: #aaaaaa; margin-bottom: 16px; text-align: left;
//     }
//     .t9-resume .header-meta-row {
//       display: flex; flex-wrap: wrap; gap: 6px 20px;
//       font-size: 12px; color: #cccccc; font-weight: 300; text-align: left;
//     }
//     .t9-resume .header-meta-row a { color: #cccccc; text-decoration: underline; text-underline-offset: 2px; }

//     .t9-resume .education-grade { font-size: 11px; color: #666666; margin-top: 3px; font-weight: 500; }

//     .t9-resume .resume-body { padding: 24px 32px 32px; text-align: left; }

//     .t9-resume .section-block { margin-bottom: 24px; text-align: left; }
//     .t9-resume .section-title-row {
//       display: flex; align-items: center; gap: 10px;
//       margin-bottom: 14px; text-align: left;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t9-resume .section-title {
//       font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
//       text-transform: uppercase; color: #111111; white-space: nowrap; text-align: left;
//     }
//     .t9-resume .section-title-line { flex: 1; height: 1px; background-color: #e0e0e0; }

//     .t9-resume .summary-text {
//       font-size: 13.5px; line-height: 1.75; color: #333333; font-weight: 300; text-align: left;
//     }

//     .t9-resume .entry-block {
//       display: grid; grid-template-columns: 1fr;
//       margin-bottom: 18px; padding-left: 12px;
//       border-left: 2px solid #e0e0e0; text-align: left;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t9-resume .entry-block:last-child { margin-bottom: 0; }
//     .t9-resume .entry-top-row {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       gap: 8px; flex-wrap: wrap; margin-bottom: 2px; text-align: left;
//     }
//     .t9-resume .entry-title {
//       font-size: 15px; font-weight: 600; color: #111111; line-height: 1.3; text-align: left;
//     }
//     .t9-resume .entry-date {
//       font-size: 11.5px; color: #777777; font-weight: 400; white-space: nowrap;
//       background: #f5f5f5; padding: 2px 8px; border-radius: 20px; text-align: left;
//     }
//     .t9-resume .entry-subtitle {
//       font-size: 12.5px; color: #555555; font-weight: 400; margin-bottom: 6px; text-align: left;
//     }
//     .t9-resume .entry-content {
//       font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
//     }

//     .t9-resume .project-header {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
//     }
//     .t9-resume .project-links { display: flex; gap: 12px; }
//     .t9-resume .project-link { font-size: 11px; color: #777777; text-decoration: underline; }
//     .t9-resume .project-tech-stack { font-size: 11.5px; color: #666666; margin: 4px 0 6px; }

//     .t9-resume .custom-section-content {
//       font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
//     }
//     .t9-resume .custom-section-content ul, .t9-resume .custom-section-content ol {
//       margin: 8px 0 8px 20px !important; padding-left: 20px !important;
//     }
//     .t9-resume .custom-section-content li { margin-bottom: 4px !important; }
//     .t9-resume .custom-section-content ul { list-style-type: disc !important; }
//     .t9-resume .custom-section-content ol { list-style-type: decimal !important; }

//     /* Page break marker injected for PDF */
//     .t9-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       .t9-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
//       .t9-resume .header-banner { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   // pageBreakIds: data-block-ids where page breaks injected for PDF
//   const generateHTML = useCallback((forPDF = false, pageBreakIds: string[] = []): string => {
//     const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
//     const stripHtmlHelper = (html: string) => html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
//     const addressStr = addressParts.join(", ");

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${cleanQuillHTML(text)}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:20px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c ? `<li style="margin-bottom:3px;line-height:1.6;">${c}</li>` : "";
//           }).join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const skillsClean = cleanQuillHTML(skills);
//     const skillsBlock = skillsClean && skillsClean !== "<p><br></p>"
//       ? `<div class="section-block" data-block-id="skills-section">
//            <div class="section-title-row">
//              <div class="section-title">Skills</div>
//              <div class="section-title-line"></div>
//            </div>
//            <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//          </div>`
//       : "";

//     const projectsBlock = projects.length
//       ? `<div class="section-block" data-block-id="proj-section">
//            <div class="section-title-row">
//              <div class="section-title">Projects</div>
//              <div class="section-title-line"></div>
//            </div>
//            ${projects.map((p: any, i: number) => `
//              <div class="entry-block" data-block-id="proj-${i}">
//                <div class="project-header">
//                  <div class="entry-title">${p.title || ""}</div>
//                  <div class="project-links">
//                    ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                    ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                  </div>
//                </div>
//                ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
//                ${p.description ? `<div class="entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
//              </div>`).join("")}
//          </div>`
//       : "";

//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//         ? finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map((s: any, i: number) => `
//               <div class="section-block" data-block-id="custom-${i}">
//                 ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//               </div>`).join("")
//         : "";

//     const summaryBlock = summary
//       ? `<div class="section-block" data-block-id="summary">
//            <div class="section-title-row">
//              <div class="section-title">Profile</div>
//              <div class="section-title-line"></div>
//            </div>
//            <div class="summary-text">${cleanQuillHTML(summary)}</div>
//          </div>`
//       : "";

//     const expBlock = experiences.length
//       ? `<div class="section-block" data-block-id="exp-section">
//            <div class="section-title-row">
//              <div class="section-title">Experience</div>
//              <div class="section-title-line"></div>
//            </div>
//            ${experiences.map((exp: any, i: number) => {
//              const startFormatted = formatMonthYear(exp.startDate, false);
//              const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//              return `<div class="entry-block" data-block-id="exp-${i}">
//                <div class="entry-top-row">
//                  <div class="entry-title">${exp.jobTitle || ""}</div>
//                  <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                </div>
//                <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//                ${exp.text ? renderEntryText(exp.text) : ""}
//              </div>`;
//            }).join("")}
//          </div>`
//       : "";

//     const eduBlock = educations.length
//       ? `<div class="section-block" data-block-id="edu-section">
//            <div class="section-title-row">
//              <div class="section-title">Education</div>
//              <div class="section-title-line"></div>
//            </div>
//            ${educations.map((edu: any, i: number) => {
//              const dateStr = edu.startDate || edu.endDate
//                ? `${edu.startDate || ""} - ${edu.endDate || "Present"}` : "";
//              const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//              const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//              return `<div class="entry-block" data-block-id="edu-${i}">
//                <div class="entry-top-row">
//                  <div class="entry-title">${edu.degree || ""}</div>
//                  ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                </div>
//                ${edu.schoolname || edu.location || formattedGrade ? `
//                  <div class="entry-subtitle">
//                    ${edu.schoolname || ""}${edu.schoolname && edu.location ? " · " : ""}${edu.location || ""}
//                    ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                  </div>` : ""}
//                ${eduTextHtml ? `<div class="edu-content">${eduTextHtml}</div>` : ""}
//              </div>`;
//            }).join("")}
//          </div>`
//       : "";

//     const pdfStyle = forPDF
//       ? `<style>.t9-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     let bodyContent = `
//       ${summaryBlock}
//       ${expBlock}
//       ${projectsBlock}
//       ${eduBlock}
//       ${skillsBlock}
//       ${customBlock}
//     `;

//     // Inject page-break markers before elements at cut points (PDF only)
//     if (forPDF && pageBreakIds.length > 0) {
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = bodyContent;
//       pageBreakIds.forEach((id) => {
//         const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//         if (el) {
//           const breakDiv = document.createElement("div");
//           breakDiv.className = "t9-page-break";
//           el.parentNode?.insertBefore(breakDiv, el);
//         }
//       });
//       bodyContent = tempDiv.innerHTML;
//     }

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t9-resume">
//     <div class="header-banner" data-block-id="header">
//       <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       <div class="header-jobtitle">${
//         contact?.jobTitle
//           ? typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""
//           : ""
//       }</div>
//       <div class="header-meta-row">
//         ${addressStr ? `<span>${addressStr}</span>` : ""}
//         ${contact?.email ? `<span>${contact.email}</span>` : ""}
//         ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//         ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//         ${linkedinUrl ? `<span><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
//         ${githubUrl ? `<span><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
//         ${portfolioUrl ? `<span><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
//       </div>
//     </div>
//     <div class="resume-body">
//       ${bodyContent}
//     </div>
//   </div>
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, finalize, summary, linkedinUrl, portfolioUrl, githubUrl, dateOfBirth, addressParts, styles]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — same logic as TemplateOne
//   // Hidden iframe measures true heights, calculates cut points, clips pages
//   // at actual cut (not always PAGE_CONTENT_H) to prevent bleed-through.
//   // Stores pageBreakIds so PDF download breaks at same points as preview.
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t9-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed", "top:0", "left:-9999px",
//           `width:${A4_W}px`, "height:10000px", "border:none",
//           "opacity:0", "pointer-events:none", "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t9-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t9-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           // Individual avoid-break items
//           const ITEM_SELECTORS = [
//             ".entry-block",
//             ".header-banner",
//             ".summary-text",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           // Section title-row + first item paired — prevents orphaned titles
//           resume.querySelectorAll<HTMLElement>(".section-title-row").forEach((titleRow) => {
//             const titleTop = getRelTop(titleRow);
//             let firstItem: HTMLElement | null = null;
//             let sib = titleRow.nextElementSibling as HTMLElement | null;
//             while (sib) {
//               if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
//               sib = sib.nextElementSibling as HTMLElement | null;
//             }
//             if (firstItem) {
//               const deepChild = firstItem.querySelector<HTMLElement>(".entry-block, .skills-content");
//               const anchor = deepChild || firstItem;
//               const anchorBottom = getRelBottom(anchor);
//               if (anchorBottom - titleTop > 8) {
//                 const sectionId = (titleRow.parentElement as HTMLElement)?.dataset?.blockId;
//                 blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
//               }
//             }
//           });

//           blocks.sort((a, b) => a.top - b.top);

//           // Calculate cut points — pick min(top) among all straddling blocks
//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut;
//             let cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 if (block.top < actualCut) {
//                   actualCut = block.top;
//                   cutBlockId = block.id;
//                 }
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

//           // Store pageBreakIds for PDF download
//           (window as any).__resumeT9PageBreakIds = pageBreakIds;

//           document.body.removeChild(iframe);

//           // Build page HTMLs — clip at actual cut point, not always PAGE_CONTENT_H
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative; width: ${A4_W}px; height: ${A4_H}px;
//       background: white; overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute; top: ${MARGIN}px; left: 0;
//       width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t9-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resumeSnapshot}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`);
//           }

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => {
//             setTimeout(() => requestAnimationFrame(doMeasure), 100);
//           });
//         } else {
//           setTimeout(doMeasure, 500);
//         }
//       });
//     },
//     [styles],
//   );

//   // ── Debounced updates ────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download — uses pageBreakIds from splitIntoPages ─
//   const handleDownload = async () => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumeT9PageBreakIds || [];

//       // const res: AxiosResponse<Blob> = await axios.post(
//       //   `${API_URL}/api/candidates/generate-pdf`,
//       //   { html: generateHTML(true, pageBreakIds) },
//       //   { responseType: "blob" },
//       // );

//       const res: AxiosResponse<Blob> = await api.post(
//               `${API_URL}/candidates/generate-pdf`,
//               { html:generateHTML(true, pageBreakIds)  },
//               { responseType: "blob" },
//             );

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

//   return (
//     <>
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

//       {alldata ? (
//         <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, transform: "scale(0.36)", transformOrigin: "top left", overflow: "hidden", pointerEvents: "none", flexShrink: 0 }}>
//           {pages[0] ? (
//             <iframe title="resume-thumb" srcDoc={pages[0]}
//               style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
//               sandbox="allow-same-origin" />
//           ) : (
//             <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 14, fontFamily: "sans-serif" }}>
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//                 <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", whiteSpace: "nowrap", padding: "3px 12px", background: "#f3f4f6", borderRadius: "999px", border: "1px solid #e5e7eb", letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif" }}>
//                   Page {idx + 1}{pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//               </div>
//               <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, overflow: "hidden", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)", borderRadius: "2px", flexShrink: 0 }}>
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateNine;

"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateNineProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?:boolean
}

const TemplateNine: React.FC<TemplateNineProps> = ({
  alldata,
  customization,
  viewMode=false
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'DM Sans', sans-serif";

  // ── Data sources ─────────────────────────────────────────────────────────
  const contact = alldata?.contact || context.contact || {};
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

  // ── Complete Font import map ────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "'Roboto', sans-serif":
        "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif":
        "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif":
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "'DM Serif Display', serif":
        "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif":
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif":
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'DM Sans', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder with dynamic font ─────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t9-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background-color: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      color: #1a1a1a;
      text-align: left;
    }

    .t9-resume * { box-sizing: border-box; }

    .t9-resume p, .t9-resume div, .t9-resume span, .t9-resume li, .t9-resume a {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t9-resume .entry-content ul, .t9-resume .entry-content ol,
    .t9-resume .entry-content-desc ul, .t9-resume .entry-content-desc ol,
    .t9-resume .skills-content ul, .t9-resume .skills-content ol,
    .t9-resume .edu-content ul, .t9-resume .edu-content ol {
      margin: 8px 0 8px 20px !important; padding-left: 20px !important;
    }
    .t9-resume .entry-content li, .t9-resume .entry-content-desc li,
    .t9-resume .skills-content li, .t9-resume .edu-content li {
      margin-bottom: 4px !important; line-height: 1.5 !important;
    }
    .t9-resume .entry-content ul, .t9-resume .skills-content ul,
    .t9-resume .edu-content ul { list-style-type: disc !important; }
    .t9-resume .entry-content ol, .t9-resume .skills-content ol,
    .t9-resume .edu-content ol { list-style-type: decimal !important; }
    .t9-resume .entry-content strong, .t9-resume .entry-content-desc strong,
    .t9-resume .skills-content strong, .t9-resume .edu-content strong { font-weight: 700 !important; }
    .t9-resume .entry-content em, .t9-resume .entry-content-desc em,
    .t9-resume .skills-content em, .t9-resume .edu-content em { font-style: italic !important; }
    .t9-resume .entry-content u, .t9-resume .entry-content-desc u,
    .t9-resume .skills-content u, .t9-resume .edu-content u { text-decoration: underline !important; }
    .t9-resume .entry-content p, .t9-resume .entry-content-desc p,
    .t9-resume .skills-content p, .t9-resume .edu-content p { white-space: pre-wrap !important; }

    .t9-resume .skills-content {
      font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
    }
    .t9-resume .skills-content p { margin: 0 0 6px 0 !important; }

    .t9-resume .edu-content {
      font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
    }
    .t9-resume .edu-content ul, .t9-resume .edu-content ol { margin: 6px 0 6px 20px !important; padding-left: 20px !important; }
    .t9-resume .edu-content li { margin-bottom: 3px !important; }

    .t9-resume .header-banner {
      background-color: #111111; padding: 28px 32px 24px; color: #ffffff;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .t9-resume .header-name {
      font-size: 32px; font-weight: 700; letter-spacing: -0.5px;
      line-height: 1.1; color: #ffffff; margin-bottom: 5px; text-align: left;
    }
    .t9-resume .header-jobtitle {
      font-size: 13px; font-weight: 400; letter-spacing: 1.8px;
      text-transform: uppercase; color: #aaaaaa; margin-bottom: 16px; text-align: left;
    }
    .t9-resume .header-meta-row {
      display: flex; flex-wrap: wrap; gap: 6px 20px;
      font-size: 12px; color: #cccccc; font-weight: 300; text-align: left;
    }
    .t9-resume .header-meta-row a { color: #cccccc; text-decoration: underline; text-underline-offset: 2px; }

    .t9-resume .education-grade { font-size: 11px; color: #666666; margin-top: 3px; font-weight: 500; }

    .t9-resume .resume-body { padding: 24px 32px 32px; text-align: left; }

    .t9-resume .section-block { margin-bottom: 24px; text-align: left; }
    .t9-resume .section-title-row {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 14px; text-align: left;
      page-break-after: avoid; break-after: avoid;
    }
    .t9-resume .section-title {
      font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
      text-transform: uppercase; color: #111111; white-space: nowrap; text-align: left;
    }
    .t9-resume .section-title-line { flex: 1; height: 1px; background-color: #e0e0e0; }

    .t9-resume .summary-text {
      font-size: 13.5px; line-height: 1.75; color: #333333; font-weight: 300; text-align: left;
    }

    .t9-resume .entry-block {
      display: grid; grid-template-columns: 1fr;
      margin-bottom: 18px; padding-left: 12px;
      border-left: 2px solid #e0e0e0; text-align: left;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t9-resume .entry-block:last-child { margin-bottom: 0; }
    .t9-resume .entry-top-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 8px; flex-wrap: wrap; margin-bottom: 2px; text-align: left;
    }
    .t9-resume .entry-title {
      font-size: 15px; font-weight: 600; color: #111111; line-height: 1.3; text-align: left;
    }
    .t9-resume .entry-date {
      font-size: 11.5px; color: #777777; font-weight: 400; white-space: nowrap;
      background: #f5f5f5; padding: 2px 8px; border-radius: 20px; text-align: left;
    }
    .t9-resume .entry-subtitle {
      font-size: 12.5px; color: #555555; font-weight: 400; margin-bottom: 6px; text-align: left;
    }
    .t9-resume .entry-content {
      font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
    }

    .t9-resume .project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 8px; margin-bottom: 4px;
    }
    .t9-resume .project-links { display: flex; gap: 12px; }
    .t9-resume .project-link { font-size: 11px; color: #777777; text-decoration: underline; }
    .t9-resume .project-tech-stack { font-size: 11.5px; color: #666666; margin: 4px 0 6px; }

    .t9-resume .custom-section-content {
      font-size: 13px; line-height: 1.65; color: #444444; font-weight: 300; text-align: left;
    }
    .t9-resume .custom-section-content ul, .t9-resume .custom-section-content ol {
      margin: 8px 0 8px 20px !important; padding-left: 20px !important;
    }
    .t9-resume .custom-section-content li { margin-bottom: 4px !important; }
    .t9-resume .custom-section-content ul { list-style-type: disc !important; }
    .t9-resume .custom-section-content ol { list-style-type: decimal !important; }

    /* Page break marker injected for PDF */
    .t9-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .t9-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
      .t9-resume .header-banner { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `,
    [],
  );

  const styles = buildCSS(activeFontFamily);

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) =>
    url.startsWith("http") ? url : `https://${url}`;

  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  const stripHtmlHelper = (html: string) =>
    html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  const renderEntryText = (text: string) => {
    if (!text) return "";
    if (text.includes("<") && text.includes(">")) {
      return `<div class="entry-content entry-content-desc">${rich(text)}</div>`;
    }
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    if (
      lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
    ) {
      return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:20px;margin:4px 0;">${lines
        .map((l) => {
          const t = l.trim();
          const c =
            t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
          return c
            ? `<li style="margin-bottom:3px;line-height:1.6;">${c}</li>`
            : "";
        })
        .join("")}</ul></div>`;
    }
    return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
  };

  // ── Section builders ──────────────────────────────────────────────────────

  // ── HTML builder with section ordering ───────────────────────────────────
  // AFTER
  const generateHTML = useCallback(
    (
      forPDF = false,
      pageBreakIds: string[] = [],
      skillsCutIndex = -1,
    ): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");
      const addressStr = addressParts.join(", ");

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
          : "";

      const sectionBuilders = {
        summary: () =>
          summary
            ? `
      <div class="section-block" data-block-id="summary">
        <div class="section-title-row">
          <div class="section-title">Profile</div>
          <div class="section-title-line"></div>
        </div>
        <div class="summary-text">${rich(summary)}</div>
      </div>
    `
            : "",

        experience: () =>
          experiences.length
            ? `
      <div class="section-block" data-block-id="exp-section">
        <div class="section-title-row">
          <div class="section-title">Experience</div>
          <div class="section-title-line"></div>
        </div>
        ${experiences
          .map((exp: any, i: number) => {
            const startFormatted = formatMonthYear(exp.startDate, false);
            const endFormatted = exp.endDate
              ? formatMonthYear(exp.endDate, false)
              : "Present";
            return `
            <div class="entry-block" data-block-id="exp-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${exp.jobTitle || ""}</div>
                <div class="entry-date">${startFormatted} – ${endFormatted}</div>
              </div>
              <div class="entry-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
              ${exp.text ? renderEntryText(exp.text) : ""}
            </div>
          `;
          })
          .join("")}
      </div>
    `
            : "",

        projects: () =>
          projects.length
            ? `
      <div class="section-block" data-block-id="proj-section">
        <div class="section-title-row">
          <div class="section-title">Projects</div>
          <div class="section-title-line"></div>
        </div>
        ${projects
          .map(
            (p: any, i: number) => `
          <div class="entry-block" data-block-id="proj-${i}">
            <div class="project-header">
              <div class="entry-title">${p.title || ""}</div>
              <div class="project-links">
                ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
                ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
            ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    `
            : "",

        education: () =>
          educations.length
            ? `
      <div class="section-block" data-block-id="edu-section">
        <div class="section-title-row">
          <div class="section-title">Education</div>
          <div class="section-title-line"></div>
        </div>
        ${educations
          .map((edu: any, i: number) => {
            const dateStr =
              edu.startDate || edu.endDate
                ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
                : "";
            const formattedGrade = formatGradeToCgpdAndPercentage(
              edu.grade || "",
            );
            const eduTextHtml = edu.text ? rich(edu.text) : "";
            return `
            <div class="entry-block" data-block-id="edu-${i}">
              <div class="entry-top-row">
                <div class="entry-title">${edu.degree || ""}</div>
                ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
              </div>
              ${
                edu.schoolname || edu.location || formattedGrade
                  ? `
                <div class="entry-subtitle">
                  ${edu.schoolname || ""}${edu.schoolname && edu.location ? " · " : ""}${edu.location || ""}
                  ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
                </div>`
                  : ""
              }
              ${eduTextHtml ? `<div class="edu-content">${eduTextHtml}</div>` : ""}
            </div>
          `;
          })
          .join("")}
      </div>
    `
            : "",

        skills: () => {
          const skillsClean = rich(skills);
          if (!skillsClean || skillsClean === "<p><br></p>") return "";

          if (forPDF && skillsCutIndex >= 0) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = skillsClean;
            const allLis = Array.from(tempDiv.querySelectorAll("li"));
            if (skillsCutIndex < allLis.length) {
              const beforeLis = allLis
                .slice(0, skillsCutIndex)
                .map((li) => `<li>${li.innerHTML}</li>`)
                .join("");
              const afterLis = allLis
                .slice(skillsCutIndex)
                .map((li) => `<li>${li.innerHTML}</li>`)
                .join("");
              return `<div class="section-block" data-block-id="skills-section">
        <div class="section-title-row">
          <div class="section-title">Skills</div>
          <div class="section-title-line"></div>
        </div>
        <div class="skills-content"><ul>${beforeLis}</ul></div>
      </div>
      <div class="t9-page-break"></div>
      <div class="section-block" data-block-id="skills-section-continued">
        
        <div class="skills-content"><ul>${afterLis}</ul></div>
      </div>`;
            }
          }

          return `<div class="section-block" data-block-id="skills-section">
    <div class="section-title-row">
      <div class="section-title">Skills</div>
      <div class="section-title-line"></div>
    </div>
    <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
  </div>`;
        },

        custom: () => {
          if (!Array.isArray(finalize?.customSection)) return "";
          const filteredCustom = finalize.customSection.filter(
            (s: any) => s?.name?.trim() || s?.description?.trim(),
          );
          if (filteredCustom.length === 0) return "";
          return filteredCustom
            .map(
              (s: any, i: number) => `
        <div class="section-block" data-block-id="custom-${i}">
          ${s.name ? `<div class="section-title-row"><div class="section-title">${s.name}</div><div class="section-title-line"></div></div>` : ""}
          ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
        </div>
      `,
            )
            .join("");
        },
      };

      // Build sections in the order defined by customization
      const sectionsHTML = [
        sectionBuilders.summary?.(),
        sectionBuilders.experience?.(),
        sectionBuilders.projects?.(),
        sectionBuilders.education?.(),
        sectionBuilders.skills?.(),
        sectionBuilders.custom?.(),
      ]
        .filter(Boolean)
        .join("");

      const pdfStyle = forPDF
        ? `<style>.t9-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = sectionsHTML;

      // Inject page-break markers before elements at cut points (PDF only)
      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t9-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontPreloads}
  <style>${styles}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t9-resume">
    <div class="header-banner" data-block-id="header">
      <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
      <div class="header-jobtitle">${
        contact?.jobTitle
          ? typeof contact.jobTitle === "string"
            ? contact.jobTitle
            : (contact.jobTitle as any)?.name || ""
          : ""
      }</div>
      <div class="header-meta-row">
        ${addressStr ? `<span>${addressStr}</span>` : ""}
        ${contact?.email ? `<span>${contact.email}</span>` : ""}
        ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
        ${formattedDob ? `<span>${formattedDob}</span>` : ""}
        ${linkedinUrl ? `<span><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
        ${githubUrl ? `<span><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
        ${portfolioUrl ? `<span><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
      </div>
    </div>
    <div class="resume-body">
      ${bodyContent}
    </div>
  </div>
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
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      addressParts,
      styles,
    ],
  );

  // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t9-resume");
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
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    ${styles}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    .t9-resume {
      width: ${A4_W}px !important;
      padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      margin: 0 !important; box-sizing: border-box !important;
    }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t9-resume");
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

          const getRelTop = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            return r.top - resumeRect.top + scrollY;
          };
          const getRelBottom = (el: HTMLElement): number =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          const ITEM_SELECTORS = [
            ".entry-block",
            ".header-banner",
            ".summary-text",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8)
              blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          resume
            .querySelectorAll<HTMLElement>(".section-title-row")
            .forEach((titleRow) => {
              const titleTop = getRelTop(titleRow);
              let firstItem: HTMLElement | null = null;
              let sib = titleRow.nextElementSibling as HTMLElement | null;
              while (sib) {
                if (sib.getBoundingClientRect().height > 8) {
                  firstItem = sib;
                  break;
                }
                sib = sib.nextElementSibling as HTMLElement | null;
              }
              // AFTER
              if (firstItem) {
                // Skip anchor logic for skills — allow it to split across pages
                if (firstItem.classList.contains("skills-content")) return;

                const deepChild =
                  firstItem.querySelector<HTMLElement>(".entry-block");
                const anchor = deepChild || firstItem;
                const anchorBottom = getRelBottom(anchor);
                if (anchorBottom - titleTop > 8) {
                  const sectionId = (titleRow.parentElement as HTMLElement)
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
              if (block.top >= currentStart && block.bottom > naiveCut) {
                if (block.top < actualCut) {
                  actualCut = block.top;
                  cutBlockId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          const skillsLis = Array.from(
            resume.querySelectorAll<HTMLElement>(".skills-content li"),
          );
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          blocks.sort((a, b) => a.top - b.top);
          pageStarts.length = 1;
          pageBreakIds.length = 0;

          while (pageStarts.length < MAX_PAGES) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;

            let actualCut = naiveCut;
            let cutBlockId: string | undefined;

            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (block.top >= currentStart && block.bottom > naiveCut) {
                if (block.top < actualCut) {
                  actualCut = block.top;
                  cutBlockId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          (window as any).__resumeSkillsCutIndex = -1;
          for (let p = 0; p < pageStarts.length - 1; p++) {
            const cutY = pageStarts[p + 1];
            for (let li = 0; li < skillsLis.length; li++) {
              const liTop = getRelTop(skillsLis[li]);
              const liBottom = getRelBottom(skillsLis[li]);
              if (liTop < cutY && liBottom > cutY) {
                (window as any).__resumeSkillsCutIndex = li;
                break;
              }
              if (liTop >= cutY) {
                (window as any).__resumeSkillsCutIndex = li;
                break;
              }
            }
            if ((window as any).__resumeSkillsCutIndex >= 0) break;
          }

          document.body.removeChild(iframe);
          (window as any).__resumePageBreakIds = pageBreakIds;

          const pageHtmls: string[] = [];

          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;

            pageHtmls.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    ${styles}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: ${A4_H}px !important;
      overflow: hidden !important; background: white !important;
    }
    .page-margin-box {
      position: relative; width: ${A4_W}px; height: ${A4_H}px;
      background: white; overflow: hidden;
    }
    .page-content-clip {
      position: absolute; top: ${MARGIN}px; left: 0;
      width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
    }
    .page-shift {
      position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
    }
    .t9-resume {
      width: ${A4_W}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
      margin: 0 !important;
    }
  </style>
</head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">
        ${resumeSnapshot}
      </div>
    </div>
  </div>
</body>
</html>`);
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
    [styles],
  );

  // ── Debounced updates ────────────────────────────────────
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

  // ── PDF download ─────────────────────────────────────────
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // AFTER
      const pageBreakIds: string[] = (
        (window as any).__resumePageBreakIds || []
      ).filter((id: string) => id !== "skills-section");
      const skillsCutIndex: number =
        (window as any).__resumeSkillsCutIndex ?? -1;
      const res: AxiosResponse<Blob> = await api.post(
        `${API_URL}/candidates/generate-pdf`,
        { html: generateHTML(true, pageBreakIds, skillsCutIndex) },
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
    } finally {
      setIsDownloading(false);
    }
  };

  const isThumbnail = !!alldata && !viewMode ; 
    return (
      <>
        {/* Download button — hide in thumbnail mode */}
        {!isThumbnail && lastSegment === 'download-resume' &&(
          <div className="text-center my-8">
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isDownloading ? { scale: 0.98 } : {}}
              className={`
                relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
                text-white transition-all duration-300  shadow-lg
                ${
                  isDownloading
                    ? "bg-gray-400 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
                }
              `}
            >
              {!isDownloading && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              )}
              <div className="relative flex items-center justify-center gap-3 text-lg">
                {isDownloading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    <span>Generating PDF …</span>
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
   
        {isThumbnail ? (
          // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
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
          // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
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

export default TemplateNine;
