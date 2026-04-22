// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// // const TemplateEight: React.FC = () => {

// const TemplateEight: React.FC<ResumeProps> = ({ alldata }) => {
 

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
//      CSS — SINGLE COLUMN BLACK & WHITE PROFESSIONAL
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap');

//  .t8-resume  body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t8-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 18mm 20mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Barlow', sans-serif;
//     color: #111111;
//     text-align: left;
//   }

//     .t8-resume.is-preview {
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
//    .t8-resume  .header-block {
//     margin-bottom: 22px;
//     padding-bottom: 16px;
//     border-bottom: 2px solid #111;
//   }

//   .t8-resume  .header-name {
//     font-family: 'EB Garamond', serif;
//     font-size: 36px;
//     font-weight: 600;
//     letter-spacing: 0.5px;
//     line-height: 1.1;
//     margin-bottom: 4px;
//     color: #000;
//   }

//   .t8-resume  .header-jobtitle {
//     font-family: 'Barlow', sans-serif;
//     font-size: 13px;
//     font-weight: 500;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #444;
//     margin-bottom: 12px;
//   }

//   .t8-resume  .header-meta {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0;
//     font-size: 12.5px;
//     color: #333;
//     line-height: 1.6;
//   }

//   .t8-resume  .header-meta-item {
//     display: flex;
//     align-items: center;
//     color: #333;
//   }

//   .t8-resume  .header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 8px;
//     color: #999;
//     font-weight: 300;
//   }

//   .t8-resume  .header-meta a {
//     color: #111;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── SECTION TITLES ── */
//   .t8-resume  .section-block {
//     margin-bottom: 20px;
//   }

//   .t8-resume  .section-title {
//     font-family: 'Barlow', sans-serif;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #000;
//     margin-bottom: 10px;
//     padding-bottom: 4px;
//     border-bottom: 1px solid #000;
//   }

//   /* ── SUMMARY ── */
//   .t8-resume  .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #222;
  
//   }

//   /* ── EXPERIENCE ── */
//   .t8-resume  .entry-block {
//     margin-bottom: 16px;
//     padding-bottom: 14px;
//     border-bottom: 1px solid #e8e8e8;
//   }

//   .t8-resume  .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//   }

//   .t8-resume  .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     margin-bottom: 2px;
//     flex-wrap: wrap;
//     gap: 6px;
//   }

//   .t8-resume  .entry-title {
//     font-family: 'EB Garamond', serif;
//     font-size: 17px;
//     font-weight: 600;
//     color: #000;
//     line-height: 1.3;
//   }

//   .t8-resume  .entry-date {
//     font-size: 11.5px;
//     color: #555;
//     font-weight: 400;
//     white-space: nowrap;
//     font-family: 'Barlow', sans-serif;
//     letter-spacing: 0.3px;
//   }

//   .t8-resume  .entry-subtitle {
//     font-size: 12.5px;
//     color: #444;
//     margin-bottom: 7px;
//     font-family: 'Barlow', sans-serif;
//     font-weight: 400;
//     letter-spacing: 0.2px;
//   }

//   .t8-resume  .entry-subtitle em {
//     font-style: normal;
//     color: #777;
//   }

//   .t8-resume  .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #333;
//     font-family: 'Barlow', sans-serif;
//   }

//   .t8-resume  .entry-content ul,
//   .t8-resume  .entry-content-description ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t8-resume  .entry-content ol,
//   .t8-resume  .entry-content-description ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t8-resume  .entry-content li,
//   .t8-resume  .entry-content-description li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   .t8-resume  ul {
//     list-style-type: disc !important;
//   }

//   /* ── SKILLS ── */
//  .t8-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }

//  .t8-resume .skill-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//   }

//  .t8-resume .skill-name-label {
//     font-size: 13px;
//     color: #111;
//     min-width: 160px;
//     font-family: 'Barlow', sans-serif;
//     font-weight: 400;
//   }

//  .t8-resume .skill-dots {
//     display: flex;
//     gap: 5px;
//     align-items: center;
//   }

//  .t8-resume .skill-dot {
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     border: 1.5px solid #111;
//     background: transparent;
//   }

// .t8-resume  .skill-dot.filled {
//     background: #111;
//   }

//   /* ── LANGUAGES ── */
//   .t8-resume  .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 10px;
//   }

//  .t8-resume .lang-name {
//     font-size: 13px;
//     color: #111;
//     min-width: 160px;
//     font-family: 'Barlow', sans-serif;
//   }

//   /* ── ADDITIONAL CONTENT ── */
//   .t8-resume  .additional-content {
//     font-size: 13px;
//     color: #333;
//     line-height: 1.7;
//     font-family: 'Barlow', sans-serif;
//   }

//   .t8-resume  .additional-item {
//     margin-bottom: 5px;
//     padding-left: 12px;
//     position: relative;
//   }

//   .t8-resume  .additional-item::before {
//     content: '—';
//     position: absolute;
//     left: 0;
//     color: #999;
//     font-size: 11px;
//     top: 2px;
//   }

//   /* ── EDUCATION ── */
//   .t8-resume  .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #333;
//     font-family: 'Barlow', sans-serif;
//   }

//   .t8-resume  .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t8-resume  .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//   }

//   /* ── CUSTOM SECTIONS ── */
//   .t8-resume  .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #333;
//     font-family: 'Barlow', sans-serif;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 18mm 20mm;
//     }

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t8-resume  {
//       width: 100% !important;
//       padding: 0 !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//     }

//     .t8-resume  .no-print {
//       display: none !important;
//     }

//     .t8-resume  .entry-block,{
//       page-break-inside: avoid;
//     }

//     .t8-resume  .entry-date {
//       white-space: nowrap;
//     }
//   }

//   @media (max-width: 768px) {
//     .t8-resume  {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t8-resume  .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t8-resume  .skill-name-label,
//     .t8-resume  .lang-name {
//       min-width: 120px;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderSkillDots = (level: number | string, total = 4) => {
//       const filled = Number(level) || 0;
//       return Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<span class="skill-dot${i < filled ? " filled" : ""}"></span>`,
//         )
//         .join("");
//     };

//     const renderEntryText = (text: string, className: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content ${className}">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content ${className}"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const content =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return content
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${content}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content ${className}" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t8-resume ">

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
//           <div class="header-meta">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${
//               linkedinUrl
//                 ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>`
//                 : ""
//             }
//             ${
//               portfolioUrl
//                 ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>`
//                 : ""
//             }
//           </div>
//         </div>

//         <!-- SUMMARY -->
//         ${
//           summary
//             ? `<div class="section-block">
//                 <div class="section-title">Profile</div>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//                </div>`
//             : ""
//         }

//         <!-- EXPERIENCE -->
//         ${
//           experiences.length > 0
//             ? `<div class="section-block">
//                 <div class="section-title">Experience</div>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(exp.startDate, true);
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, true)
//                       : "Present";
//                     return `
//                       <div class="entry-block">
//                         <div class="entry-top-row">
//                           <div class="entry-title">${exp.jobTitle || ""}</div>
//                           <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//                         </div>
//                         <div class="entry-subtitle">
//                           ${exp.employer || ""}${exp.location ? `<em> · ${exp.location}</em>` : ""}
//                         </div>
//                         ${exp.text ? renderEntryText(exp.text, "entry-content-description") : ""}
//                       </div>`;
//                   })
//                   .join("")}
//                </div>`
//             : ""
//         }

//         <!-- EDUCATION -->
//         ${
//           educations.length > 0
//             ? `<div class="section-block">
//                 <div class="section-title">Education</div>
//                 ${educations
//                   .map((edu) => {
//                     const dateStr =
//                       edu.startDate || edu.endDate
//                         ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//                         : "";
//                     let textHtml = "";
//                     if (edu.text) {
//                       const lines = edu.text
//                         .split("\n")
//                         .filter((l: string) => l.trim() !== "");
//                       if (edu.text.includes("<") && edu.text.includes(">")) {
//                         textHtml = `<div class="edu-content">${edu.text}</div>`;
//                       } else if (
//                         lines.some((l: string) => l.trim().startsWith("-"))
//                       ) {
//                         textHtml = `<ul class="edu-list">${lines
//                           .map((l: string) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? `<li>${c}</li>` : "";
//                           })
//                           .join("")}</ul>`;
//                       } else {
//                         textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//                       }
//                     }
//                     return `
//                       <div class="entry-block">
//                         <div class="entry-top-row">
//                           <div class="entry-title">${edu.schoolname || ""}</div>
//                           ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//                         </div>
//                         ${
//                           edu.degree || edu.location
//                             ? `<div class="entry-subtitle">
//                                 ${edu.degree ? edu.degree : ""}
//                                 ${edu.degree && edu.location ? "<em> · </em>" : ""}
//                                 ${edu.location ? `<em>${edu.location}</em>` : ""}
//                                </div>`
//                             : ""
//                         }
//                         ${textHtml}
//                       </div>`;
//                   })
//                   .join("")}
//                </div>`
//             : ""
//         }

//         <!-- SKILLS -->
//         ${
//           skills.length > 0
//             ? `<div class="section-block">
//                 <div class="section-title">Skills</div>
//                 <div class="skills-list">
//                   ${skills
//                     .map(
//                       (s) => `
//                       <div class="skill-row">
//                         <span class="skill-name-label">${s.skill || ""}</span>
//                         ${
//                           s.level
//                             ? `<div class="skill-dots">${renderSkillDots(s.level)}</div>`
//                             : ""
//                         }
//                       </div>`,
//                     )
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- LANGUAGES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some((l) => l.name && l.name.trim() !== "")
//             ? `<div class="section-block">
//                 <div class="section-title">Languages</div>
//                 <div class="skills-list">
//                   ${finalize.languages
//                     .filter((l) => l.name && l.name.trim() !== "")
//                     .map(
//                       (l) => `
//                       <div class="lang-row">
//                         <span class="lang-name">${l.name}</span>
//                         ${
//                           l.level
//                             ? `<div class="skill-dots">${renderSkillDots(l.level)}</div>`
//                             : ""
//                         }
//                       </div>`,
//                     )
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- CERTIFICATIONS -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-block">
//                 <div class="section-title">Certifications &amp; Licenses</div>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses
//                     .filter(
//                       (i) =>
//                         i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                     )
//                     .map((i) => `<div class="additional-item">${i.name}</div>`)
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- HOBBIES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-block">
//                 <div class="section-title">Hobbies &amp; Interests</div>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests
//                     .filter(
//                       (i) =>
//                         i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                     )
//                     .map((i) => `<div class="additional-item">${i.name}</div>`)
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- AWARDS -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-block">
//                 <div class="section-title">Awards &amp; Honors</div>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors
//                     .filter(
//                       (i) =>
//                         i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                     )
//                     .map((i) => `<div class="additional-item">${i.name}</div>`)
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- WEBSITES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (i) =>
//               (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//               (i.socialMedia && i.socialMedia.trim() !== ""),
//           )
//             ? `<div class="section-block">
//                 <div class="section-title">Websites &amp; Social Media</div>
//                 <div class="additional-content">
//                   ${finalize.websitesAndSocialMedia
//                     .filter((i) => i.websiteUrl || i.socialMedia)
//                     .map(
//                       (i) => `
//                       <div class="additional-item">
//                         ${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}
//                         ${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}
//                       </div>`,
//                     )
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- REFERENCES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.references) &&
//           finalize.references.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-block">
//                 <div class="section-title">References</div>
//                 <div class="additional-content">
//                   ${finalize.references
//                     .filter(
//                       (i) =>
//                         i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//                     )
//                     .map((i) => `<div class="additional-item">${i.name}</div>`)
//                     .join("")}
//                 </div>
//                </div>`
//             : ""
//         }

//         <!-- CUSTOM SECTIONS -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           )
//             ? finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map(
//                   (s) => `
//                   <div class="section-block">
//                     ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//                   </div>`,
//                 )
//                 .join("")
//             : ""
//         }

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
//      RENDER DOTS (React)
//   ====================================================== */
//   const SkillDots = ({
//     level,
//     total = 4,
//   }: {
//     level: number | string;
//     total?: number;
//   }) => (
//     <div className="skill-dots">
//       {Array.from({ length: total }).map((_, i) => (
//         <span
//           key={i}
//           className={`skill-dot${i < Number(level) ? " filled" : ""}`}
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
//         // className="t8-resume  bg-white"
//                 className={`t8-resume ${alldata ? 'is-preview' : ''}`}

//         style={{ margin: "0 auto",          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
//  }}
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
//           <div className="header-meta">
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

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-block">
//             <div className="section-title">Profile</div>
//             <div
//               className="summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i} className="entry-block">
//                 <div className="entry-top-row">
//                   <div className="entry-title">{exp.jobTitle}</div>
//                   <div className="entry-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" – "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div className="entry-subtitle">
//                   {exp.employer}
//                   {exp.location && <em> · {exp.location}</em>}
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="entry-content entry-content-description"
//                     dangerouslySetInnerHTML={{ __html: exp.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="edu-content"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <ul className="edu-list">
//                         {lines.map((l: string, li: number) => {
//                           const t = l.trim();
//                           const c = t.startsWith("-")
//                             ? t.substring(1).trim()
//                             : t;
//                           return c ? <li key={li}>{c}</li> : null;
//                         })}
//                       </ul>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="edu-content"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }

//               return (
//                 <div key={edu.id || index} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{edu.schoolname || ""}</div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="entry-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " – "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.degree || edu.location) && (
//                     <div className="entry-subtitle">
//                       {edu.degree && <span>{edu.degree}</span>}
//                       {edu.location && (
//                         <>
//                           {edu.degree && <em> · </em>}
//                           <em>{edu.location}</em>
//                         </>
//                       )}
//                     </div>
//                   )}
//                   {textContent}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Skills</div>
//             <div className="skills-list">
//               {skills.map((skill, i) => (
//                 <div key={i} className="skill-row">
//                   <span className="skill-name-label">{skill.skill}</span>
//                   {skill.level && <SkillDots level={skill.level} />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* LANGUAGES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title">Languages</div>
//               <div className="skills-list">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="lang-row">
//                         <span className="lang-name">{lang.name}</span>
//                         {lang.level && <SkillDots level={lang.level} />}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* CERTIFICATIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Certifications &amp; Licenses</div>
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* HOBBIES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Hobbies &amp; Interests</div>
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* AWARDS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Awards &amp; Honors</div>
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* WEBSITES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (i) =>
//               (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//               (i.socialMedia && i.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Websites &amp; Social Media</div>
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div key={item.id || index} className="additional-item">
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* REFERENCES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">References</div>
//               <div className="additional-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* CUSTOM SECTIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) &&
//           finalize.customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, index) => (
//               <div key={section.id || index} className="section-block">
//                 {section.name && (
//                   <div className="section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="custom-section-content"
//                     dangerouslySetInnerHTML={{ __html: section.description }}
//                   />
//                 )}
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default TemplateEight;








// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// const TemplateEight: React.FC<ResumeProps> = ({ alldata }) => {
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
//       // Categorized Skills - Each category with its own dot-rated skills
//       return (
//         <div className="section-block">
//           <div className="section-title">Skills</div>
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
//       // Simple Skills - Dot-rated skills in rows
//       return (
//         <div className="section-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-row">
//                 <span className="skill-name-label">{skill.name || skill.skill}</span>
//                 {skill.level && <SkillDots level={skill.level} />}
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
//         <div className="section-title">Projects</div>
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
//      CSS — SINGLE COLUMN BLACK & WHITE PROFESSIONAL
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap');

//   .t8-resume body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .t8-resume {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 18mm 20mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Barlow', sans-serif;
//     color: #111111;
//     text-align: left;
//   }

//   .t8-resume.is-preview {
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
//   .t8-resume .header-block {
//     margin-bottom: 22px;
//     padding-bottom: 16px;
//     border-bottom: 2px solid #111;
//   }

//   .t8-resume .header-name {
//     font-family: 'EB Garamond', serif;
//     font-size: 36px;
//     font-weight: 600;
//     letter-spacing: 0.5px;
//     line-height: 1.1;
//     margin-bottom: 4px;
//     color: #000;
//   }

//   .t8-resume .header-jobtitle {
//     font-family: 'Barlow', sans-serif;
//     font-size: 13px;
//     font-weight: 500;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #444;
//     margin-bottom: 12px;
//   }

//   .t8-resume .header-meta {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0;
//     font-size: 12.5px;
//     color: #333;
//     line-height: 1.6;
//   }

//   .t8-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     color: #333;
//   }

//   .t8-resume .header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 8px;
//     color: #999;
//     font-weight: 300;
//   }

//   .t8-resume .header-meta a {
//     color: #111;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//   }

//   /* ── SECTION TITLES ── */
//   .t8-resume .section-block {
//     margin-bottom: 20px;
//   }

//   .t8-resume .section-title {
//     font-family: 'Barlow', sans-serif;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #000;
//     margin-bottom: 10px;
//     padding-bottom: 4px;
//     border-bottom: 1px solid #000;
//   }

//   /* ── SUMMARY ── */
//   .t8-resume .summary-text {
//     font-size: 13.5px;
//     line-height: 1.75;
//     color: #222;
//   }

//   /* ── EXPERIENCE ── */
//   .t8-resume .entry-block {
//     margin-bottom: 16px;
//     padding-bottom: 14px;
//     border-bottom: 1px solid #e8e8e8;
//   }

//   .t8-resume .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//   }

//   .t8-resume .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     margin-bottom: 2px;
//     flex-wrap: wrap;
//     gap: 6px;
//   }

//   .t8-resume .entry-title {
//     font-family: 'EB Garamond', serif;
//     font-size: 17px;
//     font-weight: 600;
//     color: #000;
//     line-height: 1.3;
//   }

//   .t8-resume .entry-date {
//     font-size: 11.5px;
//     color: #555;
//     font-weight: 400;
//     white-space: nowrap;
//     font-family: 'Barlow', sans-serif;
//     letter-spacing: 0.3px;
//   }

//   .t8-resume .entry-subtitle {
//     font-size: 12.5px;
//     color: #444;
//     margin-bottom: 7px;
//     font-family: 'Barlow', sans-serif;
//     font-weight: 400;
//     letter-spacing: 0.2px;
//   }

//   .t8-resume .entry-subtitle em {
//     font-style: normal;
//     color: #777;
//   }

//   .t8-resume .entry-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #333;
//     font-family: 'Barlow', sans-serif;
//   }

//   .t8-resume .entry-content ul,
//   .t8-resume .entry-content-description ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t8-resume .entry-content ol,
//   .t8-resume .entry-content-description ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t8-resume .entry-content li,
//   .t8-resume .entry-content-description li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t8-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }

//   .t8-resume .skill-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//   }

//   .t8-resume .skill-name-label {
//     font-size: 13px;
//     color: #111;
//     min-width: 160px;
//     font-family: 'Barlow', sans-serif;
//     font-weight: 400;
//   }

//   /* Categorized Skills */
//   .t8-resume .skill-category-block {
//     margin-bottom: 14px;
//   }

//   .t8-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t8-resume .skill-category-title {
//     font-family: 'Barlow', sans-serif;
//     font-size: 12px;
//     font-weight: 600;
//     color: #000;
//     margin-bottom: 8px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//   }

//   /* Skill Dots */
//   .t8-resume .skill-dots {
//     display: flex;
//     gap: 5px;
//     align-items: center;
//   }

//   .t8-resume .skill-dot {
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     border: 1.5px solid #111;
//     background: transparent;
//   }

//   .t8-resume .skill-dot.filled {
//     background: #111;
//   }

//   /* ── PROJECTS ── */
//   .t8-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t8-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t8-resume .project-link {
//     font-size: 11px;
//     color: #555;
//     text-decoration: underline;
//   }

//   .t8-resume .project-tech-stack {
//     font-size: 11.5px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t8-resume .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 10px;
//   }

//   .t8-resume .lang-name {
//     font-size: 13px;
//     color: #111;
//     min-width: 160px;
//     font-family: 'Barlow', sans-serif;
//   }

//   /* ── ADDITIONAL CONTENT ── */
//   .t8-resume .additional-content {
//     font-size: 13px;
//     color: #333;
//     line-height: 1.7;
//     font-family: 'Barlow', sans-serif;
//   }

//   .t8-resume .additional-item {
//     margin-bottom: 5px;
//     padding-left: 12px;
//     position: relative;
//   }

//   .t8-resume .additional-item::before {
//     content: '—';
//     position: absolute;
//     left: 0;
//     color: #999;
//     font-size: 11px;
//     top: 2px;
//   }

//   /* ── EDUCATION ── */
//   .t8-resume .edu-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #333;
//     font-family: 'Barlow', sans-serif;
//   }

//   .t8-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .t8-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//   }

//   /* ── CUSTOM SECTIONS ── */
//   .t8-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.65;
//     color: #333;
//     font-family: 'Barlow', sans-serif;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 18mm 20mm;
//     }

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t8-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//     }

//     .t8-resume .entry-block {
//       page-break-inside: avoid;
//     }

//     .t8-resume .entry-date {
//       white-space: nowrap;
//     }
//   }

//   @media (max-width: 768px) {
//     .t8-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t8-resume .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t8-resume .skill-name-label,
//     .t8-resume .lang-name {
//       min-width: 120px;
//     }

//     .t8-resume .project-header {
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

//     const renderSkillDots = (level: number | string, total = 4) => {
//       const filled = Number(level) || 0;
//       return Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<span class="skill-dot${i < filled ? " filled" : ""}"></span>`,
//         )
//         .join("");
//     };

//     const renderEntryText = (text: string, className: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content ${className}">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="entry-content ${className}"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const content =
//               t.startsWith("-") || t.startsWith("•")
//                 ? t.substring(1).trim()
//                 : t;
//             return content
//               ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${content}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content ${className}" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";
      
//       const isCategorized = isCategorizedSkills(skills);
      
//       if (isCategorized) {
//         return `
//           <div class="section-block">
//             <div class="section-title">Skills</div>
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
//             <div class="section-title">Skills</div>
//             <div class="skills-list">
//               ${skills.map((skill: any) => `
//                 <div class="skill-row">
//                   <span class="skill-name-label">${skill.name || skill.skill}</span>
//                   ${skill.level ? `<div class="skill-dots">${renderSkillDots(skill.level)}</div>` : ""}
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
//           <div class="section-title">Projects</div>
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
//       <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t8-resume">

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
//           <div class="header-meta">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- SUMMARY -->
//         ${summary ? `<div class="section-block">
//           <div class="section-title">Profile</div>
//           <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//         </div>` : ""}

//         <!-- EXPERIENCE -->
//         ${experiences.length > 0 ? `<div class="section-block">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, true);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//             return `
//             <div class="entry-block">
//               <div class="entry-top-row">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//               </div>
//               <div class="entry-subtitle">
//                 ${exp.employer || ""}${exp.location ? `<em> · ${exp.location}</em>` : ""}
//               </div>
//               ${exp.text ? renderEntryText(exp.text, "entry-content-description") : ""}
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- PROJECTS -->
//         ${generateProjectsHTML()}

//         <!-- EDUCATION -->
//         ${educations.length > 0 ? `<div class="section-block">
//           <div class="section-title">Education</div>
//           ${educations.map((edu) => {
//             const dateStr = edu.startDate || edu.endDate
//               ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//               : "";
//             let textHtml = "";
//             if (edu.text) {
//               const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//               if (edu.text.includes("<") && edu.text.includes(">")) {
//                 textHtml = `<div class="edu-content">${edu.text}</div>`;
//               } else if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                 textHtml = `<ul class="edu-list">${lines.map((l: string) => {
//                   const t = l.trim();
//                   const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                   return c ? `<li>${c}</li>` : "";
//                 }).join("")}</ul>`;
//               } else {
//                 textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//               }
//             }
//             return `
//             <div class="entry-block">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//               </div>
//               ${edu.degree || edu.location ? `<div class="entry-subtitle">
//                 ${edu.degree ? edu.degree : ""}
//                 ${edu.degree && edu.location ? "<em> · </em>" : ""}
//                 ${edu.location ? `<em>${edu.location}</em>` : ""}
//               </div>` : ""}
//               ${textHtml}
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- SKILLS -->
//         ${generateSkillsHTML()}

//         <!-- LANGUAGES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Languages</div>
//           <div class="skills-list">
//             ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//             <div class="lang-row">
//               <span class="lang-name">${l.name}</span>
//               ${l.level ? `<div class="skill-dots">${renderSkillDots(l.level)}</div>` : ""}
//             </div>`).join("")}
//           </div>
//         </div>` : ""}

//         <!-- CERTIFICATIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Certifications &amp; Licenses</div>
//           <div class="additional-content">
//             ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//           </div>
//         </div>` : ""}

//         <!-- HOBBIES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Hobbies &amp; Interests</div>
//           <div class="additional-content">
//             ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//           </div>
//         </div>` : ""}

//         <!-- AWARDS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Awards &amp; Honors</div>
//           <div class="additional-content">
//             ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//           </div>
//         </div>` : ""}

//         <!-- WEBSITES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//         <div class="section-block">
//           <div class="section-title">Websites &amp; Social Media</div>
//           <div class="additional-content">
//             ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
//             <div class="additional-item">
//               ${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}
//               ${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}
//             </div>`).join("")}
//           </div>
//         </div>` : ""}

//         <!-- REFERENCES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">References</div>
//           <div class="additional-content">
//             ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//           </div>
//         </div>` : ""}

//         <!-- CUSTOM SECTIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//         <div class="section-block">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//         </div>`).join("") : ""}

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
//      RENDER DOTS (React)
//   ====================================================== */
//   const SkillDots = ({
//     level,
//     total = 4,
//   }: {
//     level: number | string;
//     total?: number;
//   }) => (
//     <div className="skill-dots">
//       {Array.from({ length: total }).map((_, i) => (
//         <span
//           key={i}
//           className={`skill-dot${i < Number(level) ? " filled" : ""}`}
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
//         className={`t8-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
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
//           <div className="header-meta">
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

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-block">
//             <div className="section-title">Profile</div>
//             <div
//               className="summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i} className="entry-block">
//                 <div className="entry-top-row">
//                   <div className="entry-title">{exp.jobTitle}</div>
//                   <div className="entry-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" – "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div className="entry-subtitle">
//                   {exp.employer}
//                   {exp.location && <em> · {exp.location}</em>}
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="entry-content entry-content-description"
//                     dangerouslySetInnerHTML={{ __html: exp.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="edu-content"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <ul className="edu-list">
//                         {lines.map((l: string, li: number) => {
//                           const t = l.trim();
//                           const c = t.startsWith("-")
//                             ? t.substring(1).trim()
//                             : t;
//                           return c ? <li key={li}>{c}</li> : null;
//                         })}
//                       </ul>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="edu-content"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }

//               return (
//                 <div key={edu.id || index} className="entry-block">
//                   <div className="entry-top-row">
//                     <div className="entry-title">{edu.schoolname || ""}</div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="entry-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " – "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.degree || edu.location) && (
//                     <div className="entry-subtitle">
//                       {edu.degree && <span>{edu.degree}</span>}
//                       {edu.location && (
//                         <>
//                           {edu.degree && <em> · </em>}
//                           <em>{edu.location}</em>
//                         </>
//                       )}
//                     </div>
//                   )}
//                   {textContent}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {renderSkills()}

//         {/* LANGUAGES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-block">
//               <div className="section-title">Languages</div>
//               <div className="skills-list">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="lang-row">
//                         <span className="lang-name">{lang.name}</span>
//                         {lang.level && <SkillDots level={lang.level} />}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* CERTIFICATIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Certifications &amp; Licenses</div>
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* HOBBIES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Hobbies &amp; Interests</div>
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* AWARDS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Awards &amp; Honors</div>
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* WEBSITES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (i) =>
//               (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//               (i.socialMedia && i.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-block">
//               <div className="section-title">Websites &amp; Social Media</div>
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div key={item.id || index} className="additional-item">
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* REFERENCES */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-block">
//               <div className="section-title">References</div>
//               <div className="additional-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         className="additional-item"
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* CUSTOM SECTIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) &&
//           finalize.customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, index) => (
//               <div key={section.id || index} className="section-block">
//                 {section.name && (
//                   <div className="section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="custom-section-content"
//                     dangerouslySetInnerHTML={{ __html: section.description }}
//                   />
//                 )}
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default TemplateEight;












"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";

const TemplateEight: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);

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
      // Categorized Skills - Each category with its own dot-rated skills
      return (
        <div className="section-block">
          <div className="section-title">Skills</div>
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
      // Simple Skills - Dot-rated skills in rows
      return (
        <div className="section-block">
          <div className="section-title">Skills</div>
          <div className="skills-list">
            {skills.map((skill: any, index: number) => (
              <div key={skill.id || index} className="skill-row">
                <span className="skill-name-label">{skill.name || skill.skill}</span>
                {skill.level && <SkillDots level={skill.level} />}
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
        <div className="section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="entry-block">
            <div className="project-header">
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
     CSS — SINGLE COLUMN BLACK & WHITE PROFESSIONAL
  ====================================================== */
  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap');

  .t8-resume body {
    margin: 0;
    background-color: white;
    text-align: left;
  }

  .t8-resume {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 20mm;
    box-sizing: border-box;
    background-color: #ffffff;
    font-family: 'Barlow', sans-serif;
    color: #111111;
    text-align: left;
  }

  .t8-resume.is-preview {
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
  .t8-resume .header-block {
    margin-bottom: 22px;
    padding-bottom: 16px;
    border-bottom: 2px solid #111;
  }

  .t8-resume .header-name {
    font-family: 'EB Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 1.1;
    margin-bottom: 4px;
    color: #000;
  }

  .t8-resume .header-jobtitle {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 12px;
  }

  .t8-resume .header-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    font-size: 12.5px;
    color: #333;
    line-height: 1.6;
  }

  .t8-resume .header-meta-item {
    display: flex;
    align-items: center;
    color: #333;
  }

  .t8-resume .header-meta-item:not(:last-child)::after {
    content: '·';
    margin: 0 8px;
    color: #999;
    font-weight: 300;
  }

  .t8-resume .header-meta a {
    color: #111;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ── EDUCATION GRADE ── */
  .t8-resume .education-grade {
    font-size: 11.5px;
    color: #666;
    margin-top: 3px;
    font-weight: 500;
  }

  /* ── SECTION TITLES ── */
  .t8-resume .section-block {
    margin-bottom: 20px;
  }

  .t8-resume .section-title {
    font-family: 'Barlow', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #000;
  }

  /* ── SUMMARY ── */
  .t8-resume .summary-text {
    font-size: 13.5px;
    line-height: 1.75;
    color: #222;
  }

  /* ── EXPERIENCE ── */
  .t8-resume .entry-block {
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e8e8e8;
  }

  .t8-resume .entry-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .t8-resume .entry-top-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
    flex-wrap: wrap;
    gap: 6px;
  }

  .t8-resume .entry-title {
    font-family: 'EB Garamond', serif;
    font-size: 17px;
    font-weight: 600;
    color: #000;
    line-height: 1.3;
  }

  .t8-resume .entry-date {
    font-size: 11.5px;
    color: #555;
    font-weight: 400;
    white-space: nowrap;
    font-family: 'Barlow', sans-serif;
    letter-spacing: 0.3px;
  }

  .t8-resume .entry-subtitle {
    font-size: 12.5px;
    color: #444;
    margin-bottom: 7px;
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  .t8-resume .entry-subtitle em {
    font-style: normal;
    color: #777;
  }

  .t8-resume .entry-content {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    font-family: 'Barlow', sans-serif;
  }

  .t8-resume .entry-content ul,
  .t8-resume .entry-content-description ul {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .t8-resume .entry-content ol,
  .t8-resume .entry-content-description ol {
    list-style-type: decimal !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .t8-resume .entry-content li,
  .t8-resume .entry-content-description li {
    margin-bottom: 3px !important;
    line-height: 1.6 !important;
    list-style-position: outside !important;
  }

  /* ── SKILLS ── */
  .t8-resume .skills-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .t8-resume .skill-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .t8-resume .skill-name-label {
    font-size: 13px;
    color: #111;
    min-width: 160px;
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
  }

  /* Categorized Skills */
  .t8-resume .skill-category-block {
    margin-bottom: 14px;
  }

  .t8-resume .skill-category-block:last-child {
    margin-bottom: 0;
  }

  .t8-resume .skill-category-title {
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #000;
    margin-bottom: 8px;
    padding-bottom: 2px;
    border-bottom: 1px solid #e0e0e0;
  }

  /* Skill Dots */
  .t8-resume .skill-dots {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .t8-resume .skill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1.5px solid #111;
    background: transparent;
  }

  .t8-resume .skill-dot.filled {
    background: #111;
  }

  /* ── PROJECTS ── */
  .t8-resume .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t8-resume .project-links {
    display: flex;
    gap: 12px;
  }

  .t8-resume .project-link {
    font-size: 11px;
    color: #555;
    text-decoration: underline;
  }

  .t8-resume .project-tech-stack {
    font-size: 11.5px;
    color: #666;
    margin: 4px 0 6px;
  }

  /* ── LANGUAGES ── */
  .t8-resume .lang-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
  }

  .t8-resume .lang-name {
    font-size: 13px;
    color: #111;
    min-width: 160px;
    font-family: 'Barlow', sans-serif;
  }

  /* ── ADDITIONAL CONTENT ── */
  .t8-resume .additional-content {
    font-size: 13px;
    color: #333;
    line-height: 1.7;
    font-family: 'Barlow', sans-serif;
  }

  .t8-resume .additional-item {
    margin-bottom: 5px;
    padding-left: 12px;
    position: relative;
  }

  .t8-resume .additional-item::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #999;
    font-size: 11px;
    top: 2px;
  }

  /* ── EDUCATION ── */
  .t8-resume .edu-content {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    font-family: 'Barlow', sans-serif;
  }

  .t8-resume .edu-list {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .t8-resume .edu-list li {
    margin-bottom: 3px;
    line-height: 1.6;
  }

  /* ── CUSTOM SECTIONS ── */
  .t8-resume .custom-section-content {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    font-family: 'Barlow', sans-serif;
  }

  /* ── PRINT ── */
  @media print {
    @page {
      size: A4;
      margin: 18mm 20mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .t8-resume {
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
    }

    .t8-resume .entry-block {
      page-break-inside: avoid;
    }

    .t8-resume .entry-date {
      white-space: nowrap;
    }
  }

  @media (max-width: 768px) {
    .t8-resume {
      width: 100%;
      padding: 10mm;
    }

    .t8-resume .entry-top-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .t8-resume .skill-name-label,
    .t8-resume .lang-name {
      min-width: 120px;
    }

    .t8-resume .project-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

  /* ======================================================
     HTML GENERATION (for PDF download)
  ====================================================== */
  const generateHTML = () => {
    const stripHtmlHelper = (html: string) =>
      html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    const renderSkillDots = (level: number | string, total = 4) => {
      const filled = Number(level) || 0;
      return Array.from({ length: total })
        .map(
          (_, i) =>
            `<span class="skill-dot${i < filled ? " filled" : ""}"></span>`,
        )
        .join("");
    };

    const renderEntryText = (text: string, className: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">")) {
        return `<div class="entry-content ${className}">${text}</div>`;
      }
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
      ) {
        return `<div class="entry-content ${className}"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
          .map((l) => {
            const t = l.trim();
            const content =
              t.startsWith("-") || t.startsWith("•")
                ? t.substring(1).trim()
                : t;
            return content
              ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${content}</li>`
              : "";
          })
          .join("")}</ul></div>`;
      }
      return `<div class="entry-content ${className}" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";
      
      const isCategorized = isCategorizedSkills(skills);
      
      if (isCategorized) {
        return `
          <div class="section-block">
            <div class="section-title">Skills</div>
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
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${skills.map((skill: any) => `
                <div class="skill-row">
                  <span class="skill-name-label">${skill.name || skill.skill}</span>
                  ${skill.level ? `<div class="skill-dots">${renderSkillDots(skill.level)}</div>` : ""}
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
          <div class="section-title">Projects</div>
          ${projects.map((project: any) => `
            <div class="entry-block">
              <div class="project-header">
                <div class="entry-title">${project.title || ""}</div>
                <div class="project-links">
                  ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                  ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>${styles}</style>
    </head>
    <body>
      <div class="t8-resume">

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
          <div class="header-meta">
            ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
            ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
            ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
            ${githubUrl ? `<span class="header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
            ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
          </div>
        </div>

        <!-- SUMMARY -->
        ${summary ? `<div class="section-block">
          <div class="section-title">Profile</div>
          <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
        </div>` : ""}

        <!-- EXPERIENCE -->
        ${experiences.length > 0 ? `<div class="section-block">
          <div class="section-title">Experience</div>
          ${experiences.map((exp) => {
            const startFormatted = formatMonthYear(exp.startDate, true);
            const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
            return `
            <div class="entry-block">
              <div class="entry-top-row">
                <div class="entry-title">${exp.jobTitle || ""}</div>
                <div class="entry-date">${startFormatted} – ${endFormatted}</div>
              </div>
              <div class="entry-subtitle">
                ${exp.employer || ""}${exp.location ? `<em> · ${exp.location}</em>` : ""}
              </div>
              ${exp.text ? renderEntryText(exp.text, "entry-content-description") : ""}
            </div>`;
          }).join("")}
        </div>` : ""}

        <!-- PROJECTS -->
        ${generateProjectsHTML()}

        <!-- EDUCATION -->
        ${educations.length > 0 ? `<div class="section-block">
          <div class="section-title">Education</div>
          ${educations.map((edu) => {
            const dateStr = edu.startDate || edu.endDate
              ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
              : "";
            const formattedGrade = formatGrade(edu.grade || "");
            let textHtml = "";
            if (edu.text) {
              const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
              if (edu.text.includes("<") && edu.text.includes(">")) {
                textHtml = `<div class="edu-content">${edu.text}</div>`;
              } else if (lines.some((l: string) => l.trim().startsWith("-"))) {
                textHtml = `<ul class="edu-list">${lines.map((l: string) => {
                  const t = l.trim();
                  const c = t.startsWith("-") ? t.substring(1).trim() : t;
                  return c ? `<li>${c}</li>` : "";
                }).join("")}</ul>`;
              } else {
                textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
              }
            }
            return `
            <div class="entry-block">
              <div class="entry-top-row">
                <div class="entry-title">${edu.schoolname || ""}</div>
                ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
              </div>
              ${edu.degree || edu.location || formattedGrade ? `<div class="entry-subtitle">
                ${edu.degree ? edu.degree : ""}
                ${edu.degree && edu.location ? "<em> · </em>" : ""}
                ${edu.location ? `<em>${edu.location}</em>` : ""}
                ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
              </div>` : ""}
              ${textHtml}
            </div>`;
          }).join("")}
        </div>` : ""}

        <!-- SKILLS -->
        ${generateSkillsHTML()}

        <!-- LANGUAGES -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
        <div class="section-block">
          <div class="section-title">Languages</div>
          <div class="skills-list">
            ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
            <div class="lang-row">
              <span class="lang-name">${l.name}</span>
              ${l.level ? `<div class="skill-dots">${renderSkillDots(l.level)}</div>` : ""}
            </div>`).join("")}
          </div>
        </div>` : ""}

        <!-- CERTIFICATIONS -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
        <div class="section-block">
          <div class="section-title">Certifications &amp; Licenses</div>
          <div class="additional-content">
            ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
          </div>
        </div>` : ""}

        <!-- HOBBIES -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
        <div class="section-block">
          <div class="section-title">Hobbies &amp; Interests</div>
          <div class="additional-content">
            ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
          </div>
        </div>` : ""}

        <!-- AWARDS -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
        <div class="section-block">
          <div class="section-title">Awards &amp; Honors</div>
          <div class="additional-content">
            ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
          </div>
        </div>` : ""}

        <!-- WEBSITES -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
        <div class="section-block">
          <div class="section-title">Websites &amp; Social Media</div>
          <div class="additional-content">
            ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `
            <div class="additional-item">
              ${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}
              ${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}
            </div>`).join("")}
          </div>
        </div>` : ""}

        <!-- REFERENCES -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
        <div class="section-block">
          <div class="section-title">References</div>
          <div class="additional-content">
            ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
          </div>
        </div>` : ""}

        <!-- CUSTOM SECTIONS -->
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
        <div class="section-block">
          ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
          ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
        </div>`).join("") : ""}

      </div>
    </body>
    </html>
  `;
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

  /* ======================================================
     RENDER DOTS (React)
  ====================================================== */
  const SkillDots = ({
    level,
    total = 4,
  }: {
    level: number | string;
    total?: number;
  }) => (
    <div className="skill-dots">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`skill-dot${i < Number(level) ? " filled" : ""}`}
        />
      ))}
    </div>
  );

  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  /* ======================================================
     JSX PREVIEW
  ====================================================== */
  return (
    <div style={{ textAlign: "center", marginTop: 0 }}>
      {lastSegment === "download-resume" && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Download Resume
          </button>
        </div>
      )}

      <div
        className={`t8-resume ${alldata ? 'is-preview' : ''}`}
        style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
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
          <div className="header-meta">
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

        {/* SUMMARY */}
        {summary && (
          <div className="section-block">
            <div className="section-title">Profile</div>
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
            <div className="section-title">Experience</div>
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
                  {exp.location && <em> · {exp.location}</em>}
                </div>
                {exp.text && (
                  <div
                    className="entry-content entry-content-description"
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
            <div className="section-title">Education</div>
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
                      {edu.degree && <span>{edu.degree}</span>}
                      {edu.location && (
                        <>
                          {edu.degree && <em> · </em>}
                          <em>{edu.location}</em>
                        </>
                      )}
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
              <div className="section-title">Languages</div>
              <div className="skills-list">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index} className="lang-row">
                        <span className="lang-name">{lang.name}</span>
                        {lang.level && <SkillDots level={lang.level} />}
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
              <div className="section-title">Certifications &amp; Licenses</div>
              <div className="additional-content">
                {finalize.certificationsAndLicenses.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
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
              <div className="section-title">Hobbies &amp; Interests</div>
              <div className="additional-content">
                {finalize.hobbiesAndInterests.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
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
              <div className="section-title">Awards &amp; Honors</div>
              <div className="additional-content">
                {finalize.awardsAndHonors.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
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
              <div className="section-title">Websites &amp; Social Media</div>
              <div className="additional-content">
                {finalize.websitesAndSocialMedia.map(
                  (item, index) =>
                    (item.websiteUrl || item.socialMedia) && (
                      <div key={item.id || index} className="additional-item">
                        {item.websiteUrl && (
                          <div>Website: {item.websiteUrl}</div>
                        )}
                        {item.socialMedia && (
                          <div>Social Media: {item.socialMedia}</div>
                        )}
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
              <div className="section-title">References</div>
              <div className="additional-content">
                {finalize.references.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
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
                  <div className="section-title">{section.name}</div>
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
    </div>
  );
};

export default TemplateEight;