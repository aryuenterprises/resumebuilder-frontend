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

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   console.log("alldata", alldata);
//   const context = useContext(CreateContext);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const projects = alldata?.projects ||
//     context?.projects || [
//       {
//         description: "<p>Illum, officia provi.</p>",
//         githubUrl: "https://www.kapefuliqedetu.com.au",
//         id: 1775990988500,
//         isOpen: true,
//         liveUrl: "https://www.padame.org",
//         techStack: ["Similique do libero", "sd", "sds", "dsa", "das", "dasd"],
//         title: "Facere et atque omni",
//       },
//     ];

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;

//   /* ======================================================
//      CSS — shared between preview & PDF
//      Key fix: text-align:left on body + container,
//      @page margin:0 on :first so the header flush,
//      padding on .resume-container drives all spacing
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;

//   }

// .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;

// }

//   /* Global <p> reset — PDF renderers add 1em top+bottom margin by default */
// .t1-resume   p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* ── HEADER ── */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* ── SECTIONS ── */
//   .t1-resume .section-content {
//     margin-bottom: 20px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 15px 0 10px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* ── ITEM HEADERS ── */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 16px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 14px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 13px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* ── CONTENT ── */
//   .t1-resume .item-content {
//     font-size: 14px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* Reset <p> margins inside content so PDF renderer doesn't add extra spacing */
//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .additional-content p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 14px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   /* Reset <br> spacing — PDF renderers sometimes double-space after <br> */
//   .t1-resume .item-content br,
//   .t1-resume .experience-description br,
//   .t1-resume .education-description br {
//     line-height: 1.5 !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 14px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 14px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* ── LIST STYLES ── */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 14px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume ul, .t1-resume ol {
//     margin-top: 2px !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//   }

//   .t1-resume ul {
//     list-style-type: disc !important;
//   }

//   .t1-resume ul ul { list-style-type: circle !important; }
//   .t1-resume ul ul ul { list-style-type: square !important; }

//   /* Global li reset — PDF renderer adds margin to li by default */
//   .t1-resume li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//   }

//    .t1-resume .education-content {
//     margin-top: 5px;
//     text-align: left;
//   }

//   /* ── SKILLS ── */
//    .t1-resume .skills-grid {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//     margin-top: 10px;
//   }

//   .t1-resume .skill-item {
//     margin-bottom: 12px;
//   }

//   .t1-resume .skill-info {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//   }

//   .t1-resume .skill-name {
//     font-size: 14px;
//     margin-bottom: 4px;
//     font-weight: 500;
//     text-align: left;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .skill-bar {
//     height: 4px;
//     background: #e0e0e0;
//     border-radius: 2px;
//     overflow: hidden;
//     width: 100%;
//   }

//   .t1-resume .skill-level {
//     height: 100%;
//     background: #333;
//     border-radius: 2px;
//   }

//   .t1-resume .languages-grid {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   /* ── ADDITIONAL ── */
//   .t1-resume .additional-content {
//     padding-left: 10px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume .additional-item {
//     margin-bottom: 8px;
//     line-height: 1.5;
//     font-size: 14px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .additional-item:last-child {
//     margin-bottom: 0;
//   }

//   /* ── CUSTOM SECTIONS ── */
//   .t1-resume .custom-section {
//     margin-bottom: 20px;
//   }

//   .t1-resume .custom-section-title {
//     margin-top: 20px;
//     margin-bottom: 10px;
//   }

//   .t1-resume .custom-section-content {
//     padding-left: 10px;
//     text-align: left;
//   }

//   .t1-resume .wrap-break-word {
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume  {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//      .t1-resume .experience-item,
//     .t1-resume .education-item {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t1-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t1-resume .item-date {
//       white-space: nowrap;
//     }
//   }

//   /* ── RESPONSIVE ── */
//   @media (max-width: 768px) {
//     .t1-resume  {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t1-resume .skills-grid {
//       grid-template-columns: 1fr;
//       gap: 12px;
//     }

//     .t1-resume .item-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t1-resume .item-date {
//       text-align: left;
//       margin-top: 2px;
//     }

//     .t1-resume .contact-details {
//       flex-direction: column;
//       align-items: center;
//       gap: 6px;
//     }
//   }
// `;

//   /* =====================================================
//      HTML GENERATION — mirrors JSX preview exactly
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content education-description">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume ">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//             : "";
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.schoolname || ""}</div>
//             ${edu.degree || edu.location ? `<div class="item-subtitle">${edu.degree ? `<span>${edu.degree}</span>` : ""}${edu.degree && edu.location ? " — " : ""}${edu.location ? `<span>${edu.location}</span>` : ""}</div>` : ""}
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${
//     skills.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Skills</div>
//     <div class="skills-grid">
//       ${skills
//         .map(
//           (s) => `<div class="skill-item"><div class="skill-info">
//         <div class="skill-name">${s.skill || ""}</div>
//         ${s.skill && s.level ? `<div class="skill-bar"><div class="skill-level" style="width:${(Number(s.level) / 4) * 100}%"></div></div>` : ""}
//       </div></div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- LANGUAGES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.languages) &&
//     finalize.languages.some((l) => l.name && l.name.trim() !== "")
//       ? `<div class="section-content">
//     <div class="section-title">Languages</div>
//     <div class="skills-grid languages-grid">
//       ${finalize.languages
//         .filter((l) => l.name && l.name.trim() !== "")
//         .map(
//           (l) => `<div class="skill-item">
//         <div class="skill-name">${l.name}</div>
//         ${l.level ? `<div class="skill-bar"><div class="skill-level" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.certificationsAndLicenses) &&
//     finalize.certificationsAndLicenses.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Certifications and Licenses</div>
//     <div class="item-content additional-content">
//       ${finalize.certificationsAndLicenses
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.hobbiesAndInterests) &&
//     finalize.hobbiesAndInterests.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Hobbies and Interests</div>
//     <div class="item-content additional-content">
//       ${finalize.hobbiesAndInterests
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.awardsAndHonors) &&
//     finalize.awardsAndHonors.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Awards and Honors</div>
//     <div class="item-content additional-content">
//       ${finalize.awardsAndHonors
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.websitesAndSocialMedia) &&
//     finalize.websitesAndSocialMedia.some(
//       (i) =>
//         (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//         (i.socialMedia && i.socialMedia.trim() !== ""),
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Websites and Social Media</div>
//     <div class="item-content additional-content">
//       ${finalize.websitesAndSocialMedia
//         .filter((i) => i.websiteUrl || i.socialMedia)
//         .map(
//           (i) =>
//             `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.references) &&
//     finalize.references.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">References</div>
//     <div class="item-content additional-content">
//       ${finalize.references
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `<div class="section-content">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `<div class="custom-section">
//       ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//       ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML(); // Assuming this returns a string

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);

//       // We pass the pdfBlob directly to the next function
//       await fetchOldResumeData(pdfBlob);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
//     if (!userId || !Contactid) {
//       console.error("Missing userId or Contactid");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");

//       const response: AxiosResponse = await axios.post(
//         `${API_URL}/api/users/download-resume`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("Upload success:", response.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
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
//         // className="t1-resume  bg-white"
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: exp.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l) => l.trim() !== "");
//                   if (lines.some((l) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <div className="education-content">
//                         <ul className="education-list">
//                           {lines.map((l, li) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       </div>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="item-content education-description"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.location && (
//                             <>
//                               {edu.degree && " — "}
//                               <span>{edu.location}</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " - "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
//                   {textContent}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i} className="skill-item">
//                   <div className="skill-info">
//                     <div className="skill-name">{skill.skill}</div>
//                     {skill.skill && skill.level && (
//                       <div className="skill-bar">
//                         <div
//                           className="skill-level"
//                           style={{
//                             width: `${(Number(skill.level) / 4) * 100}%`,
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
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
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid languages-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
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
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">References</div>
//               <div className="item-content additional-content">
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
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

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

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   console.log("alldata", alldata);
//   const context = useContext(CreateContext);

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
//       // Render categorized skills
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category" style={{ marginBottom: "16px" }}>
//               <div className="skill-category-title" style={{
//                 fontWeight: 600,
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#444"
//               }}>
//                 {category.title}
//               </div>
//               <div className="skills-grid" style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: "8px",
//               }}>
//                 {category?.skills?.map((skill: any) => (
//                   <div key={skill.id} className="skill-item">
//                     <div className="skill-name" style={{
//                       fontSize: "13px",
//                       color: "#555",
//                       padding: "2px 0"
//                     }}>
//                       {skill.name}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Render simple skills list
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-grid" style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)",
//             gap: "8px",
//           }}>
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-item">
//                 <div className="skill-name" style={{
//                   fontSize: "13px",
//                   color: "#555",
//                   padding: "2px 0"
//                 }}>
//                   {skill.name || skill.skill}
//                 </div>
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
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item" style={{ marginBottom: "20px" }}>
//             <div className="item-header" style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               marginBottom: "8px",
//               flexWrap: "wrap",
//               gap: "10px",
//             }}>
//               <div className="item-title-container">
//                 <div className="item-title" style={{
//                   fontWeight: 700,
//                   fontSize: "16px",
//                   marginBottom: "4px",
//                 }}>
//                   {project.title}
//                 </div>
//                 {project.techStack && project.techStack.length > 0 && (
//                   <div className="project-tech-stack" style={{
//                     fontSize: "12px",
//                     color: "#666",
//                     marginTop: "4px",
//                   }}>
//                     <strong>Tech Stack:</strong> {project.techStack.join(", ")}
//                   </div>
//                 )}
//               </div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links" style={{
//                   display: "flex",
//                   gap: "12px",
//                 }}>
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       style={{
//                         fontSize: "12px",
//                         color: "#0077b5",
//                         textDecoration: "none",
//                       }}
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       style={{
//                         fontSize: "12px",
//                         color: "#0077b5",
//                         textDecoration: "none",
//                       }}
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.description && (
//               <div
//                 className="item-content project-description"
//                 style={{
//                   fontSize: "14px",
//                   lineHeight: "1.5",
//                   color: "#444",
//                   marginTop: "8px",
//                 }}
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 20px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 15px 0 10px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 16px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 14px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 13px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* SKILLS STYLES */
//   .t1-resume .skill-category {
//     margin-bottom: 16px;
//   }

//   .t1-resume .skill-category-title {
//     font-weight: 600;
//     margin-bottom: 8px;
//     font-size: 14px;
//     color: #444;
//   }

//   .t1-resume .skills-grid {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 8px;
//   }

//   .t1-resume .skill-item {
//     margin-bottom: 4px;
//   }

//   .t1-resume .skill-name {
//     font-size: 13px;
//     color: #555;
//     padding: 2px 0;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 20px;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin-top: 4px;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-links a {
//     font-size: 12px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-description {
//     font-size: 14px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 8px;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 14px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .additional-content p,
//   .t1-resume .project-description p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 14px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 14px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 14px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 14px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume ul, .t1-resume ol {
//     margin-top: 2px !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//   }

//   /* PRINT */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t1-resume .experience-item,
//     .t1-resume .education-item,
//     .t1-resume .project-item {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t1-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   /* RESPONSIVE */
//   @media (max-width: 768px) {
//     .t1-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t1-resume .skills-grid {
//       grid-template-columns: 1fr;
//       gap: 8px;
//     }

//     .t1-resume .item-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t1-resume .item-date {
//       text-align: left;
//       margin-top: 2px;
//     }

//     .t1-resume .contact-details {
//       flex-direction: column;
//       align-items: center;
//       gap: 6px;
//     }

//     .t1-resume .project-links {
//       margin-top: 8px;
//     }
//   }
// `;

//   /* =====================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content education-description">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             ${skills.map((category: any) => `
//               <div class="skill-category" style="margin-bottom: 16px;">
//                 <div class="skill-category-title" style="font-weight: 600; margin-bottom: 8px; font-size: 14px; color: #444;">${category.title}</div>
//                 <div class="skills-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
//                   ${category.skills.map((skill: any) => `
//                     <div class="skill-item">
//                       <div class="skill-name" style="font-size: 13px; color: #555; padding: 2px 0;">${skill.name}</div>
//                     </div>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
//               ${skills.map((skill: any) => `
//                 <div class="skill-item">
//                   <div class="skill-name" style="font-size: 13px; color: #555; padding: 2px 0;">${skill.name || skill.skill}</div>
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
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects.map((project: any) => `
//             <div class="project-item" style="margin-bottom: 20px;">
//               <div class="item-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 10px;">
//                 <div class="item-title-container">
//                   <div class="item-title" style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">${project.title || ""}</div>
//                   ${project.techStack && project.techStack.length > 0 ? `
//                     <div class="project-tech-stack" style="font-size: 12px; color: #666; margin-top: 4px;">
//                       <strong>Tech Stack:</strong> ${project.techStack.join(", ")}
//                     </div>
//                   ` : ""}
//                 </div>
//                 ${(project.liveUrl || project.githubUrl) ? `
//                   <div class="project-links" style="display: flex; gap: 12px;">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" style="font-size: 12px; color: #0077b5; text-decoration: none;">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" style="font-size: 12px; color: #0077b5; text-decoration: none;">GitHub</a>` : ""}
//                   </div>
//                 ` : ""}
//               </div>
//               ${project.description ? `
//                 <div class="item-content project-description" style="font-size: 14px; line-height: 1.5; color: #444; margin-top: 8px;">${project.description}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${summary ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//   </div>` : ""}

//   <!-- EXPERIENCE -->
//   ${experiences.length > 0 ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences.map((exp) => {
//       const s = formatMonthYear(exp.startDate, true);
//       const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//       return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//     }).join("")}
//   </div>` : ""}

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${educations.length > 0 ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations.map((edu) => {
//       const dateStr = edu.startDate || edu.endDate
//         ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//         : "";
//       return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.schoolname || ""}</div>
//             ${edu.degree || edu.location ? `<div class="item-subtitle">${edu.degree ? `<span>${edu.degree}</span>` : ""}${edu.degree && edu.location ? " — " : ""}${edu.location ? `<span>${edu.location}</span>` : ""}</div>` : ""}
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//     }).join("")}
//   </div>` : ""}

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- LANGUAGES -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `<div class="section-content">
//     <div class="section-title">Languages</div>
//     <div class="skills-grid languages-grid">
//       ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `<div class="skill-item">
//         <div class="skill-name">${l.name}</div>
//         ${l.level ? `<div class="skill-bar"><div class="skill-level" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//       </div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- CERTIFICATIONS -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `<div class="section-content">
//     <div class="section-title">Certifications and Licenses</div>
//     <div class="item-content additional-content">
//       ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- HOBBIES -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `<div class="section-content">
//     <div class="section-title">Hobbies and Interests</div>
//     <div class="item-content additional-content">
//       ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- AWARDS -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `<div class="section-content">
//     <div class="section-title">Awards and Honors</div>
//     <div class="item-content additional-content">
//       ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- WEBSITES -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `<div class="section-content">
//     <div class="section-title">Websites and Social Media</div>
//     <div class="item-content additional-content">
//       ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) => `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- REFERENCES -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `<div class="section-content">
//     <div class="section-title">References</div>
//     <div class="item-content additional-content">
//       ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) => `<div class="additional-item">${i.name}</div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- CUSTOM SECTIONS -->
//   ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? `<div class="section-content">
//     ${finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `<div class="custom-section">
//       ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//       ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
//     </div>`).join("")}
//   </div>` : ""}

// </div>
// </body>
// </html>`;
//   };

//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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
//     if (!userId || !Contactid) {
//       console.error("Missing userId or Contactid");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");

//       const response: AxiosResponse = await axios.post(
//         `${API_URL}/api/users/download-resume`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("Upload success:", response.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
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
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
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
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l) => l.trim() !== "");
//                   if (lines.some((l) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <div className="education-content">
//                         <ul className="education-list">
//                           {lines.map((l, li) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       </div>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="item-content education-description"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.location && (
//                             <>
//                               {edu.degree && " — "}
//                               <span>{edu.location}</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " - "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
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
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid languages-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
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
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content additional-content">
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
//             <div className="section-content">
//               <div className="section-title">References</div>
//               <div className="item-content additional-content">
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
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

// "use client";
// import React, { useContext, useEffect, useState } from "react";
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
// import {
//   AllData,
//   ResumeProps,
//   CreateContextType,
//   Experience,
//   Education,
//   // Skill,
//   PlanDetails,
//   Contact,
//   Finalize,
//   Template,
//   FullResumeData,
//   Project,
//   SkillsType,
// } from "@/app/types";

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
//   const existingData = getLocalStorage("fullResumeData");
//   const context = useContext(CreateContext);

//   console.log("context", context);
//   console.log("existingData", existingData);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const [contact, setContact] = useState<Contact>({});
//   const [educations, setEducations] = useState<Education>([]);
//   const [experiences, setExperiences] = useState<Experience>([]);
//   const [skills, setSkills] = useState<SkillsType>([]);
//   const [projects, setProjects] = useState<Project>([]);
//   const [finalize, setFinalize] = useState<Finalize>({});
//   const [summary, setSummary] = useState<string>("");

//   useEffect(() => {
//     if (lastSegment === "download-resume") {
//       setContact(existingData?.contact);
//       setEducations(existingData.education);
//       setExperiences(existingData.experiences);
//       setSkills(existingData.skills);
//       setProjects(existingData.projects);
//       setFinalize(existingData.finalize);
//       setSummary(existingData.summary);
//     } else {
//       setContact(alldata?.contact || context?.contact || {});
//       setEducations(alldata?.educations || context?.education || []);
//       setExperiences(alldata?.experiences || context?.experiences || []);
//       setSkills(alldata?.skills || context?.skills || []);
//       setProjects(alldata?.projects || context?.projects || []);
//       setFinalize(alldata?.finalize || context?.finalize || {});
//       setSummary(alldata?.summary || context?.summary || "");
//     }
//   }, []);

//   console.log("contact", contact);

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
//       // Render categorized skills - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-container">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-list">
//                   {category?.skills?.map((skill: any) => (
//                     <span key={skill.id} className="skill-tag">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Render simple skills list - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-tag">
//                 {skill.name || skill.skill}
//               </span>
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
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
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
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 16px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 12px 0 8px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* SKILLS STYLES - COMPACT & CLEAN */
//   .t1-resume .skills-container {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//   }

//   .t1-resume .skill-category {
//     break-inside: avoid;
//   }

//   .t1-resume .skill-category-title {
//     font-weight: 600;
//     font-size: 14px;
//     color: #333;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//     display: inline-block;
//   }

//   .t1-resume .skills-list {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px;
//     margin-top: 6px;
//   }

//   .t1-resume .skill-tag {
//     display: inline-block;
//     background: #f5f5f5;
//     padding: 4px 10px;
//     font-size: 12px;
//     color: #444;
//     border-radius: 3px;
//     line-height: 1.4;
//     white-space: nowrap;
//   }

//   /* Alternative: If you prefer dots instead of tags */
//   .t1-resume .skill-dot {
//     display: inline-block;
//     padding: 2px 0;
//     font-size: 13px;
//     color: #555;
//   }

//   .t1-resume .skill-dot::before {
//     content: "•";
//     margin-right: 6px;
//     color: #999;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 16px;
//     break-inside: avoid;
//   }

//   .t1-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t1-resume .project-title {
//     font-weight: 700;
//     font-size: 15px;
//     color: #222;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-link {
//     font-size: 11px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   .t1-resume .project-description {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 6px;
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 13px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 12px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .additional-content p,
//   .t1-resume .project-description p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 13px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 13px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   /* ADDITIONAL SECTIONS */
//   .t1-resume .additional-content {
//     padding-left: 10px;
//   }

//   .t1-resume .additional-item {
//     margin-bottom: 4px;
//     font-size: 13px;
//     line-height: 1.4;
//   }

//   /* PRINT */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t1-resume .experience-item,
//     .t1-resume .education-item,
//     .t1-resume .project-item,
//     .t1-resume .skill-category {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//   }

//   /* RESPONSIVE */
//   @media (max-width: 768px) {
//     .t1-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t1-resume .skills-list {
//       gap: 4px;
//     }

//     .t1-resume .skill-tag {
//       padding: 3px 8px;
//       font-size: 11px;
//     }

//     .t1-resume .item-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t1-resume .item-date {
//       text-align: left;
//       margin-top: 2px;
//     }

//     .t1-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//   }
// `;

//   /* =====================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content education-description">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Generate skills HTML for PDF - COMPACT VERSION
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-container">
//               ${skills
//                 .map(
//                   (category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-list">
//                     ${category.skills
//                       .map(
//                         (skill: any) => `
//                       <span class="skill-tag">${skill.name}</span>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (skill: any) => `
//                 <span class="skill-tag">${skill.name || skill.skill}</span>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${project.description}</div>
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

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//             : "";
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.schoolname || ""}</div>
//             ${edu.degree || edu.location ? `<div class="item-subtitle">${edu.degree ? `<span>${edu.degree}</span>` : ""}${edu.degree && edu.location ? " — " : ""}${edu.location ? `<span>${edu.location}</span>` : ""}</div>` : ""}
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- LANGUAGES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.languages) &&
//     finalize.languages.some((l) => l.name && l.name.trim() !== "")
//       ? `<div class="section-content">
//     <div class="section-title">Languages</div>
//     <div class="skills-list">
//       ${finalize.languages
//         .filter((l) => l.name && l.name.trim() !== "")
//         .map(
//           (l) =>
//             `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.certificationsAndLicenses) &&
//     finalize.certificationsAndLicenses.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Certifications and Licenses</div>
//     <div class="additional-content">
//       ${finalize.certificationsAndLicenses
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.hobbiesAndInterests) &&
//     finalize.hobbiesAndInterests.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Hobbies and Interests</div>
//     <div class="additional-content">
//       ${finalize.hobbiesAndInterests
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.awardsAndHonors) &&
//     finalize.awardsAndHonors.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Awards and Honors</div>
//     <div class="additional-content">
//       ${finalize.awardsAndHonors
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.websitesAndSocialMedia) &&
//     finalize.websitesAndSocialMedia.some(
//       (i) =>
//         (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//         (i.socialMedia && i.socialMedia.trim() !== ""),
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Websites and Social Media</div>
//     <div class="additional-content">
//       ${finalize.websitesAndSocialMedia
//         .filter((i) => i.websiteUrl || i.socialMedia)
//         .map(
//           (i) =>
//             `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.references) &&
//     finalize.references.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">References</div>
//     <div class="additional-content">
//       ${finalize.references
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `<div class="section-content">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `<div class="custom-section">
//       ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//       ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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
//     if (!userId || !Contactid) {
//       console.error("Missing userId or Contactid");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");

//       const response: AxiosResponse = await axios.post(
//         `${API_URL}/api/users/download-resume`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("Upload success:", response.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
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
//             className="bg-[#243642] text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
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
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l) => l.trim() !== "");
//                   if (lines.some((l) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <div className="education-content">
//                         <ul className="education-list">
//                           {lines.map((l, li) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       </div>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="item-content education-description"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.location && (
//                             <>
//                               {edu.degree && " — "}
//                               <span>{edu.location}</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " - "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
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
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-list">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <span key={lang._id || index} className="skill-tag">
//                         {lang.name}
//                         {lang.level && ` (${lang.level})`}
//                       </span>
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
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
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
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
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
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
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
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
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
//             <div className="section-content">
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
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

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

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {

//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   console.log("contact", contact);

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
//       // Render categorized skills - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-container">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-list">
//                   {category?.skills?.map((skill: any) => (
//                     <span key={skill.id} className="skill-tag">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Render simple skills list - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-tag">
//                 {skill.name || skill.skill}
//               </span>
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
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
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
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 16px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 12px 0 8px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* SKILLS STYLES - COMPACT & CLEAN */
//   .t1-resume .skills-container {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//   }

//   .t1-resume .skill-category {
//     break-inside: avoid;
//   }

//   .t1-resume .skill-category-title {
//     font-weight: 600;
//     font-size: 14px;
//     color: #333;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//     display: inline-block;
//   }

//   .t1-resume .skills-list {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px;
//     margin-top: 6px;
//   }

//   .t1-resume .skill-tag {
//     display: inline-block;
//     background: #f5f5f5;
//     padding: 4px 10px;
//     font-size: 12px;
//     color: #444;
//     border-radius: 3px;
//     line-height: 1.4;
//     white-space: nowrap;
//   }

//   /* Alternative: If you prefer dots instead of tags */
//   .t1-resume .skill-dot {
//     display: inline-block;
//     padding: 2px 0;
//     font-size: 13px;
//     color: #555;
//   }

//   .t1-resume .skill-dot::before {
//     content: "•";
//     margin-right: 6px;
//     color: #999;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 16px;
//     break-inside: avoid;
//   }

//   .t1-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t1-resume .project-title {
//     font-weight: 700;
//     font-size: 15px;
//     color: #222;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-link {
//     font-size: 11px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   .t1-resume .project-description {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 6px;
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 13px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 12px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .additional-content p,
//   .t1-resume .project-description p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 13px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 13px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   /* ADDITIONAL SECTIONS */
//   .t1-resume .additional-content {
//     padding-left: 10px;
//   }

//   .t1-resume .additional-item {
//     margin-bottom: 4px;
//     font-size: 13px;
//     line-height: 1.4;
//   }

//   /* PRINT */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t1-resume .experience-item,
//     .t1-resume .education-item,
//     .t1-resume .project-item,
//     .t1-resume .skill-category {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//   }

//   /* RESPONSIVE */
//   @media (max-width: 768px) {
//     .t1-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t1-resume .skills-list {
//       gap: 4px;
//     }

//     .t1-resume .skill-tag {
//       padding: 3px 8px;
//       font-size: 11px;
//     }

//     .t1-resume .item-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t1-resume .item-date {
//       text-align: left;
//       margin-top: 2px;
//     }

//     .t1-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//   }
// `;

//   /* =====================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content education-description">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Generate skills HTML for PDF - COMPACT VERSION
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-container">
//               ${skills
//                 .map(
//                   (category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-list">
//                     ${category.skills
//                       .map(
//                         (skill: any) => `
//                       <span class="skill-tag">${skill.name}</span>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (skill: any) => `
//                 <span class="skill-tag">${skill.name || skill.skill}</span>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${project.description}</div>
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

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//             : "";
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.schoolname || ""}</div>
//             ${edu.degree || edu.location ? `<div class="item-subtitle">${edu.degree ? `<span>${edu.degree}</span>` : ""}${edu.degree && edu.location ? " — " : ""}${edu.location ? `<span>${edu.location}</span>` : ""}</div>` : ""}
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- LANGUAGES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.languages) &&
//     finalize.languages.some((l) => l.name && l.name.trim() !== "")
//       ? `<div class="section-content">
//     <div class="section-title">Languages</div>
//     <div class="skills-list">
//       ${finalize.languages
//         .filter((l) => l.name && l.name.trim() !== "")
//         .map(
//           (l) =>
//             `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.certificationsAndLicenses) &&
//     finalize.certificationsAndLicenses.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Certifications and Licenses</div>
//     <div class="additional-content">
//       ${finalize.certificationsAndLicenses
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.hobbiesAndInterests) &&
//     finalize.hobbiesAndInterests.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Hobbies and Interests</div>
//     <div class="additional-content">
//       ${finalize.hobbiesAndInterests
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.awardsAndHonors) &&
//     finalize.awardsAndHonors.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Awards and Honors</div>
//     <div class="additional-content">
//       ${finalize.awardsAndHonors
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.websitesAndSocialMedia) &&
//     finalize.websitesAndSocialMedia.some(
//       (i) =>
//         (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//         (i.socialMedia && i.socialMedia.trim() !== ""),
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Websites and Social Media</div>
//     <div class="additional-content">
//       ${finalize.websitesAndSocialMedia
//         .filter((i) => i.websiteUrl || i.socialMedia)
//         .map(
//           (i) =>
//             `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.references) &&
//     finalize.references.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">References</div>
//     <div class="additional-content">
//       ${finalize.references
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `<div class="section-content">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `<div class="custom-section">
//       ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//       ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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
//     if (!userId || !Contactid) {
//       console.error("Missing userId or Contactid");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");

//       const response: AxiosResponse = await axios.post(
//         `${API_URL}/api/users/download-resume`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("Upload success:", response.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
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
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
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
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l) => l.trim() !== "");
//                   if (lines.some((l) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <div className="education-content">
//                         <ul className="education-list">
//                           {lines.map((l, li) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       </div>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="item-content education-description"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.location && (
//                             <>
//                               {edu.degree && " — "}
//                               <span>{edu.location}</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " - "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
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
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-list">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <span key={lang._id || index} className="skill-tag">
//                         {lang.name}
//                         {lang.level && ` (${lang.level})`}
//                       </span>
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
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
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
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
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
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
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
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
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
//             <div className="section-content">
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
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

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

// const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {

//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   console.log("contact", contact);

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl =  contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl =  contact?.github;
//   const dateOfBirth =  contact?.dob;

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
//       // Render categorized skills - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-container">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-list">
//                   {category?.skills?.map((skill: any) => (
//                     <span key={skill.id} className="skill-tag">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Render simple skills list - more compact
//       return (
//         <div className="section-content">
//           <div className="section-title">Skills</div>
//           <div className="skills-list">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-tag">
//                 {skill.name || skill.skill}
//               </span>
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
//       <div className="section-content">
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
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
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — shared between preview & PDF
//   ====================================================== */
//   const styles = `
//  .t1-resume  body {
//     margin: 0;
//     padding: 0;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume  {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//   }

//   .t1-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     padding:20px;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
//   }

//   /* Global <p> reset */
//   .t1-resume p {
//     margin: 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* HEADER */
//   .t1-resume .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .t1-resume .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .t1-resume .contact-details span {
//     padding: 2px 8px;
//   }

//   .t1-resume .links {
//     margin-top: 5px;
//     text-align: center;
//   }

//   .t1-resume .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* SECTIONS */
//   .t1-resume .section-content {
//     margin-bottom: 16px;
//   }

//   .t1-resume .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 12px 0 8px;
//     font-size: 16px;
//     line-height: 1.4;
//     border-left: 3px solid #333;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* SKILLS STYLES - COMPACT & CLEAN */
//   .t1-resume .skills-container {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//   }

//   .t1-resume .skill-category {
//     break-inside: avoid;
//   }

//   .t1-resume .skill-category-title {
//     font-weight: 600;
//     font-size: 14px;
//     color: #333;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e0e0e0;
//     display: inline-block;
//   }

//   .t1-resume .skills-list {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px;
//     margin-top: 6px;
//   }

//   .t1-resume .skill-tag {
//     display: inline-block;
//     background: #f5f5f5;
//     padding: 4px 10px;
//     font-size: 12px;
//     color: #444;
//     border-radius: 3px;
//     line-height: 1.4;
//     white-space: nowrap;
//   }

//   /* Alternative: If you prefer dots instead of tags */
//   .t1-resume .skill-dot {
//     display: inline-block;
//     padding: 2px 0;
//     font-size: 13px;
//     color: #555;
//   }

//   .t1-resume .skill-dot::before {
//     content: "•";
//     margin-right: 6px;
//     color: #999;
//   }

//   /* PROJECTS STYLES */
//   .t1-resume .project-item {
//     margin-bottom: 16px;
//     break-inside: avoid;
//   }

//   .t1-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t1-resume .project-title {
//     font-weight: 700;
//     font-size: 15px;
//     color: #222;
//   }

//   .t1-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t1-resume .project-link {
//     font-size: 11px;
//     color: #0077b5;
//     text-decoration: none;
//   }

//   .t1-resume .project-tech-stack {
//     font-size: 12px;
//     color: #666;
//     margin: 4px 0 6px;
//   }

//   .t1-resume .project-description {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     margin-top: 6px;
//   }

//   /* ITEM HEADERS */
//   .t1-resume .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .t1-resume .experience-header,
//   .t1-resume .education-header {
//     align-items: baseline;
//   }

//   .t1-resume .item-title-container {
//     min-width: 200px;
//   }

//   .t1-resume .item-title {
//     font-weight: 700;
//     font-size: 15px;
//     line-height: 1.4;
//     margin-bottom: 2px;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-subtitle {
//     font-size: 13px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .t1-resume .experience-date,
//   .t1-resume .education-date {
//     font-size: 12px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//     line-height: 1.4;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* CONTENT */
//   .t1-resume .item-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #444;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .item-content p,
//   .t1-resume .experience-description p,
//   .t1-resume .education-description p,
//   .t1-resume .summary-text p,
//   .t1-resume .custom-section-content p,
//   .t1-resume .additional-content p,
//   .t1-resume .project-description p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   .t1-resume .summary-text {
//     padding: 0 5px;
//     font-size: 13px;
//     line-height: 1.5;
//     text-align: left;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   .t1-resume .experience-description,
//   .t1-resume .education-description {
//     margin-top: 5px;
//     text-align: left;
//     font-size: 13px;
//     line-height: 1.5;
//     font-family: 'Poppins', Arial, sans-serif;
//   }

//   /* LIST STYLES */
//   .t1-resume .experience-description ul,
//   .t1-resume .education-description ul,
//   .t1-resume .experience-list,
//   .t1-resume .education-list {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description ol,
//   .t1-resume .education-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .t1-resume .experience-description li,
//   .t1-resume .education-description li,
//   .t1-resume .experience-list li,
//   .t1-resume .education-list li {
//     margin-top: 0 !important;
//     margin-bottom: 2px !important;
//     padding-top: 0 !important;
//     padding-bottom: 0 !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//     font-size: 13px !important;
//     font-family: 'Poppins', Arial, sans-serif !important;
//   }

//   /* ADDITIONAL SECTIONS */
//   .t1-resume .additional-content {
//     padding-left: 10px;
//   }

//   .t1-resume .additional-item {
//     margin-bottom: 4px;
//     font-size: 13px;
//     line-height: 1.4;
//   }

//   /* PRINT */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm;
//       margin-bottom: 15mm;
//     }

//     @page :first {
//       margin-top: 0;
//     }

//     .t1-resume body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0;
//       padding: 0;
//     }

//     .t1-resume {
//       width: 210mm !important;
//       padding: 15mm !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//       box-sizing: border-box !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t1-resume .experience-item,
//     .t1-resume .education-item,
//     .t1-resume .project-item,
//     .t1-resume .skill-category {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }
//   }

//   /* RESPONSIVE */
//   @media (max-width: 768px) {
//     .t1-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t1-resume .skills-list {
//       gap: 4px;
//     }

//     .t1-resume .skill-tag {
//       padding: 3px 8px;
//       font-size: 11px;
//     }

//     .t1-resume .item-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .t1-resume .item-date {
//       text-align: left;
//       margin-top: 2px;
//     }

//     .t1-resume .project-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//   }
// `;

//   /* =====================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="item-content experience-description">
//           <ul class="experience-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="item-content education-description">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (
//         lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
//       ) {
//         return `<div class="education-content">
//           <ul class="education-list">
//             ${lines
//               .map((l) => {
//                 const t = l.trim();
//                 const c =
//                   t.startsWith("-") || t.startsWith("•")
//                     ? t.substring(1).trim()
//                     : t;
//                 return c ? `<li>${c}</li>` : "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//       }
//       return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Format date of birth for PDF
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF - COMPACT VERSION
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-container">
//               ${skills
//                 .map(
//                   (category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-list">
//                     ${category.skills
//                       .map(
//                         (skill: any) => `
//                       <span class="skill-tag">${skill.name}</span>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-content">
//             <div class="section-title">Skills</div>
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (skill: any) => `
//                 <span class="skill-tag">${skill.name || skill.skill}</span>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section-content">
//           <div class="section-title">Projects</div>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${project.description}</div>
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

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t1-resume">

//   <!-- HEADER -->
//   <div class="contact-info">
//     <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//     <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
//     <div class="address">${addressParts.join(", ")}</div>
//     <div class="contact-details">
//       ${contact?.email ? `<span>${contact.email}</span>` : ""}
//       ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//       ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//     </div>
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `<div class="section-content">
//     <div class="section-title">Summary</div>
//     <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//   </div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const s = formatMonthYear(exp.startDate, true);
//         const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//         return `<div class="experience-item" style="margin-bottom:16px">
//         <div class="item-header experience-header">
//           <div class="item-title-container">
//             <div class="item-title">${exp.jobTitle || ""}</div>
//             <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//           </div>
//           <div class="item-date experience-date">${s} - ${e}</div>
//         </div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `<div class="section-content">
//     <div class="section-title">Education</div>
//     ${educations
//       .map((edu) => {
//         const dateStr =
//           edu.startDate || edu.endDate
//             ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//             : "";
//         return `<div class="education-item" style="margin-bottom:16px">
//         <div class="item-header education-header">
//           <div class="item-title-container">
//             <div class="item-title">${edu.schoolname || ""}</div>
//             ${edu.degree || edu.location ? `<div class="item-subtitle">${edu.degree ? `<span>${edu.degree}</span>` : ""}${edu.degree && edu.location ? " — " : ""}${edu.location ? `<span>${edu.location}</span>` : ""}</div>` : ""}
//           </div>
//           ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//         </div>
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//       })
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- LANGUAGES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.languages) &&
//     finalize.languages.some((l) => l.name && l.name.trim() !== "")
//       ? `<div class="section-content">
//     <div class="section-title">Languages</div>
//     <div class="skills-list">
//       ${finalize.languages
//         .filter((l) => l.name && l.name.trim() !== "")
//         .map(
//           (l) =>
//             `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.certificationsAndLicenses) &&
//     finalize.certificationsAndLicenses.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Certifications and Licenses</div>
//     <div class="additional-content">
//       ${finalize.certificationsAndLicenses
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.hobbiesAndInterests) &&
//     finalize.hobbiesAndInterests.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Hobbies and Interests</div>
//     <div class="additional-content">
//       ${finalize.hobbiesAndInterests
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.awardsAndHonors) &&
//     finalize.awardsAndHonors.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Awards and Honors</div>
//     <div class="additional-content">
//       ${finalize.awardsAndHonors
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.websitesAndSocialMedia) &&
//     finalize.websitesAndSocialMedia.some(
//       (i) =>
//         (i.websiteUrl && i.websiteUrl.trim() !== "") ||
//         (i.socialMedia && i.socialMedia.trim() !== ""),
//     )
//       ? `<div class="section-content">
//     <div class="section-title">Websites and Social Media</div>
//     <div class="additional-content">
//       ${finalize.websitesAndSocialMedia
//         .filter((i) => i.websiteUrl || i.socialMedia)
//         .map(
//           (i) =>
//             `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.references) &&
//     finalize.references.some(
//       (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//     )
//       ? `<div class="section-content">
//     <div class="section-title">References</div>
//     <div class="additional-content">
//       ${finalize.references
//         .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//         .map((i) => `<div class="additional-item">${i.name}</div>`)
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `<div class="section-content">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `<div class="custom-section">
//       ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
//       ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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
//     if (!userId || !Contactid) {
//       console.error("Missing userId or Contactid");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");

//       const response: AxiosResponse = await axios.post(
//         `${API_URL}/api/users/download-resume`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("Upload success:", response.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) =>
//     html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
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
//         className={`t1-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//             {dateOfBirth && <span>{formatDateOfBirth(dateOfBirth)}</span>}
//           </div>
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div
//                 key={i}
//                 className="experience-item"
//                 style={{ marginBottom: "16px" }}
//               >
//                 <div className="item-header experience-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer}
//                       {exp.location && ` — ${exp.location}`}
//                     </div>
//                   </div>
//                   <div className="item-date experience-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content experience-description wrap-break-word"
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
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   );
//                 } else {
//                   const lines = edu.text
//                     .split("\n")
//                     .filter((l) => l.trim() !== "");
//                   if (lines.some((l) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <div className="education-content">
//                         <ul className="education-list">
//                           {lines.map((l, li) => {
//                             const t = l.trim();
//                             const c = t.startsWith("-")
//                               ? t.substring(1).trim()
//                               : t;
//                             return c ? <li key={li}>{c}</li> : null;
//                           })}
//                         </ul>
//                       </div>
//                     );
//                   } else {
//                     textContent = (
//                       <div
//                         className="item-content education-description"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       >
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div
//                   key={edu.id || index}
//                   className="education-item"
//                   style={{ marginBottom: "16px" }}
//                 >
//                   <div className="item-header education-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.location && (
//                             <>
//                               {edu.degree && " — "}
//                               <span>{edu.location}</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " - "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
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
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-list">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <span key={lang._id || index} className="skill-tag">
//                         {lang.name}
//                         {lang.level && ` (${lang.level})`}
//                       </span>
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
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
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
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
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
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
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
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
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
//             <div className="section-content">
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
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title custom-section-title">
//                         {section.name}
//                       </div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content custom-section-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateOne;

"use client";
import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  getLocalStorage,
  MonthYearDisplay,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { User } from "@/app/types/user.types";
import { ResumeProps } from "@/app/types";

const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
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

  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // Format date of birth for display
  const formatDateOfBirth = (dob: string) => {
    if (!dob) return "";
    try {
      const date = new Date(dob);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dob;
    }
  };

  // Helper function to format grade (CGPA/Percentage)
  const formatGrade = (grade: string) => {
    if (!grade) return "";

    // Auto-detect format if gradeType not provided
    const numGrade = parseFloat(grade);
    if (!isNaN(numGrade)) {
      if (numGrade <= 10 && grade.includes(".")) {
        return `CGPA: ${grade}`;
      } else if (numGrade > 10) {
        return `Percentage: ${grade}%`;
      }
    }

    // Return as is if can't determine
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
      // Render categorized skills - more compact
      return (
        <div className="section-content">
          <div className="section-title">Skills</div>
          <div className="skills-container">
            {skills.map((category: any) => (
              <div key={category.id} className="skill-category">
                <div className="skill-category-title">{category.title}</div>
                <div className="skills-list">
                  {category?.skills?.map((skill: any) => (
                    <span key={skill.id} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Render simple skills list - more compact
      return (
        <div className="section-content">
          <div className="section-title">Skills</div>
          <div className="skills-list">
            {skills.map((skill: any, index: number) => (
              <span key={skill.id || index} className="skill-tag">
                {skill.name || skill.skill}
              </span>
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
      <div className="section-content">
        <div className="section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="project-item">
            <div className="project-header">
              <div className="project-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl.startsWith("http")
                          ? project.githubUrl
                          : `https://${project.githubUrl}`
                      }
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
                className="project-description"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — shared between preview & PDF
  ====================================================== */
  const styles = `
 .t1-resume  body {
    margin: 0;
    padding: 0;
    background-color: white;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  .t1-resume  {
    width: 210mm;
    min-height: 297mm;
    padding: 15mm;
    box-sizing: border-box;
    background-color: white;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  .t1-resume.is-preview {
    transform: scale(0.36);
    transform-origin: top left;
    width: 210mm; 
    padding:20px;
    height: auto;
    max-height: none;
    min-height: auto;
    max-width: none;
    min-width: auto;
    overflow: hidden;
  }

  /* Global <p> reset */
  .t1-resume p {
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* HEADER */
  .t1-resume .contact-info {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .t1-resume .contact-info .name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
    line-height: 1.2;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .contact-info .job-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .contact-info .address {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .contact-details {
    font-size: 14px;
    color: #444;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .t1-resume .contact-details span {
    padding: 2px 8px;
  }

  .t1-resume .links {
    margin-top: 5px;
    text-align: center;
  }

  .t1-resume .link-item {
    color: #0077b5;
    text-decoration: none;
    font-size: 14px;
    padding: 2px 8px;
  }

  /* SECTIONS */
  .t1-resume .section-content {
    margin-bottom: 16px;
  }

  .t1-resume .section-title {
    background: #f0f0f0;
    padding: 6px 10px;
    text-align: left;
    font-weight: 700;
    margin: 12px 0 8px;
    font-size: 16px;
    line-height: 1.4;
    border-left: 3px solid #333;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* SKILLS STYLES - COMPACT & CLEAN */
  .t1-resume .skills-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .t1-resume .skill-category {
    break-inside: avoid;
  }
  
  .t1-resume .skill-category-title {
    font-weight: 600;
    font-size: 14px;
    color: #333;
    margin-bottom: 6px;
    padding-bottom: 2px;
    border-bottom: 1px solid #e0e0e0;
    display: inline-block;
  }
  
  .t1-resume .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }
  
  .t1-resume .skill-tag {
    display: inline-block;
    background: #f5f5f5;
    padding: 4px 10px;
    font-size: 12px;
    color: #444;
    border-radius: 3px;
    line-height: 1.4;
    white-space: nowrap;
  }
  
  /* PROJECTS STYLES */
  .t1-resume .project-item {
    margin-bottom: 16px;
    break-inside: avoid;
  }
  
  .t1-resume .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }
  
  .t1-resume .project-title {
    font-weight: 700;
    font-size: 15px;
    color: #222;
  }
  
  .t1-resume .project-links {
    display: flex;
    gap: 12px;
  }
  
  .t1-resume .project-link {
    font-size: 11px;
    color: #0077b5;
    text-decoration: none;
  }
  
  .t1-resume .project-tech-stack {
    font-size: 12px;
    color: #666;
    margin: 4px 0 6px;
  }
  
  .t1-resume .project-description {
    font-size: 13px;
    line-height: 1.5;
    color: #444;
    margin-top: 6px;
  }

  /* ITEM HEADERS */
  .t1-resume .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .t1-resume .experience-header,
  .t1-resume .education-header {
    align-items: baseline;
  }

  .t1-resume .item-title-container {
    min-width: 200px;
  }

  .t1-resume .item-title {
    font-weight: 700;
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 2px;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .item-subtitle {
    font-size: 13px;
    color: #555;
    margin-top: 2px;
    line-height: 1.4;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .item-date {
    white-space: nowrap;
    font-size: 12px;
    color: #777;
    min-width: fit-content;
    text-align: right;
  }

  .t1-resume .experience-date,
  .t1-resume .education-date {
    font-size: 12px;
    color: #666;
    padding: 2px 6px;
    background: #f8f8f8;
    border-radius: 3px;
    line-height: 1.4;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* Education Grade Styles */
  .t1-resume .education-grade {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
    font-weight: 500;
    display: inline-block;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 3px;
  }

  /* CONTENT */
  .t1-resume .item-content {
    font-size: 13px;
    line-height: 1.5;
    color: #444;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .item-content p,
  .t1-resume .experience-description p,
  .t1-resume .education-description p,
  .t1-resume .summary-text p,
  .t1-resume .custom-section-content p,
  .t1-resume .additional-content p,
  .t1-resume .project-description p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
    font-size: 13px !important;
    font-family: 'Poppins', Arial, sans-serif !important;
  }

  .t1-resume .summary-text {
    padding: 0 5px;
    font-size: 13px;
    line-height: 1.5;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .t1-resume .experience-description,
  .t1-resume .education-description {
    margin-top: 5px;
    text-align: left;
    font-size: 13px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* LIST STYLES */
  .t1-resume .experience-description ul,
  .t1-resume .education-description ul,
  .t1-resume .experience-list,
  .t1-resume .education-list {
    list-style-type: disc !important;
    padding-left: 20px !important;
    margin: 5px 0 !important;
  }

  .t1-resume .experience-description ol,
  .t1-resume .education-description ol {
    list-style-type: decimal !important;
    padding-left: 20px !important;
    margin: 5px 0 !important;
  }

  .t1-resume .experience-description li,
  .t1-resume .education-description li,
  .t1-resume .experience-list li,
  .t1-resume .education-list li {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    line-height: 1.5 !important;
    list-style-position: outside !important;
    font-size: 13px !important;
    font-family: 'Poppins', Arial, sans-serif !important;
  }

  /* ADDITIONAL SECTIONS */
  .t1-resume .additional-content {
    padding-left: 10px;
  }
  
  .t1-resume .additional-item {
    margin-bottom: 4px;
    font-size: 13px;
    line-height: 1.4;
  }

  /* PRINT */
  @media print {
    @page {
      size: A4;
      margin-top: 15mm;
      margin-bottom: 15mm;
    }

    @page :first {
      margin-top: 0;
    }

    .t1-resume body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      margin: 0;
      padding: 0;
    }

    .t1-resume {
      width: 210mm !important;
      padding: 15mm !important;
      margin: 0 !important;
      box-shadow: none !important;
      box-sizing: border-box !important;
    }

    .no-print {
      display: none !important;
    }

    .t1-resume .experience-item,
    .t1-resume .education-item,
    .t1-resume .project-item,
    .t1-resume .skill-category {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }

`;

  /* =====================================================
     HTML GENERATION — for PDF download
  ====================================================== */
  const generateHTML = () => {
    const stripHtmlHelper = (html: string) =>
      html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    const renderExperienceText = (text: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">")) {
        return `<div class="item-content experience-description wrap-break-word">${text}</div>`;
      }
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
      ) {
        return `<div class="item-content experience-description">
          <ul class="experience-list">
            ${lines
              .map((l) => {
                const t = l.trim();
                const c =
                  t.startsWith("-") || t.startsWith("•")
                    ? t.substring(1).trim()
                    : t;
                return c ? `<li>${c}</li>` : "";
              })
              .join("")}
          </ul>
        </div>`;
      }
      return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    const renderEducationText = (text: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">")) {
        return `<div class="item-content education-description">${text}</div>`;
      }
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
      ) {
        return `<div class="education-content">
          <ul class="education-list">
            ${lines
              .map((l) => {
                const t = l.trim();
                const c =
                  t.startsWith("-") || t.startsWith("•")
                    ? t.substring(1).trim()
                    : t;
                return c ? `<li>${c}</li>` : "";
              })
              .join("")}
          </ul>
        </div>`;
      }
      return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    // Format date of birth for PDF
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF - COMPACT VERSION
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";

      const isCategorized = isCategorizedSkills(skills);

      if (isCategorized) {
        return `
          <div class="section-content">
            <div class="section-title">Skills</div>
            <div class="skills-container">
              ${skills
                .map(
                  (category: any) => `
                <div class="skill-category">
                  <div class="skill-category-title">${category.title}</div>
                  <div class="skills-list">
                    ${category.skills
                      .map(
                        (skill: any) => `
                      <span class="skill-tag">${skill.name}</span>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
      } else {
        return `
          <div class="section-content">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${skills
                .map(
                  (skill: any) => `
                <span class="skill-tag">${skill.name || skill.skill}</span>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="section-content">
          <div class="section-title">Projects</div>
          ${projects
            .map(
              (project: any) => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-title">${project.title || ""}</div>
                ${
                  project.liveUrl || project.githubUrl
                    ? `
                  <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                    ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
                  </div>
                `
                    : ""
                }
              </div>
              ${
                project.techStack && project.techStack.length > 0
                  ? `
                <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
              `
                  : ""
              }
              ${
                project.description
                  ? `
                <div class="project-description">${project.description}</div>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t1-resume">

  <!-- HEADER -->
  <div class="contact-info">
    <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
    <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
    <div class="address">${addressParts.join(", ")}</div>
    <div class="contact-details">
      ${contact?.email ? `<span>${contact.email}</span>` : ""}
      ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
      ${formattedDob ? `<span>${formattedDob}</span>` : ""}
    </div>
    <div class="links">
      ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
      ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
      ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
    </div>
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `<div class="section-content">
    <div class="section-title">Summary</div>
    <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
  </div>`
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences.length > 0
      ? `<div class="section-content">
    <div class="section-title">Experience</div>
    ${experiences
      .map((exp) => {
        const s = formatMonthYear(exp.startDate, true);
        const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
        return `<div class="experience-item" style="margin-bottom:16px">
        <div class="item-header experience-header">
          <div class="item-title-container">
            <div class="item-title">${exp.jobTitle || ""}</div>
            <div class="item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
          </div>
          <div class="item-date experience-date">${s} - ${e}</div>
        </div>
        ${exp.text ? renderExperienceText(exp.text) : ""}
      </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations.length > 0
      ? `<div class="section-content">
    <div class="section-title">Education</div>
    ${educations
      .map((edu) => {
        const dateStr =
          edu.startDate || edu.endDate
            ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
            : "";
        const formattedGrade = formatGrade(edu?.grade || "");
        return `<div class="education-item" style="margin-bottom:16px">
        <div class="item-header education-header">
          <div class="item-title-container">
            <div class="item-title">${edu.schoolname || ""}</div>
            ${
              edu.degree || edu.location || formattedGrade
                ? `<div class="item-subtitle">
              ${edu.degree ? `<span>${edu.degree}</span>` : ""}
              ${edu.degree && edu.location ? " — " : ""}
              ${edu.location ? `<span>${edu.location}</span>` : ""}
              ${(edu.degree || edu.location) && formattedGrade ? " • " : ""}
              ${formattedGrade ? `<span class="education-grade">${formattedGrade}</span>` : ""}
            </div>`
                : ""
            }
          </div>
          ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
        </div>
        ${renderEducationText(edu.text || "")}
      </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- LANGUAGES -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.languages) &&
    finalize.languages.some((l) => l.name && l.name.trim() !== "")
      ? `<div class="section-content">
    <div class="section-title">Languages</div>
    <div class="skills-list">
      ${finalize.languages
        .filter((l) => l.name && l.name.trim() !== "")
        .map(
          (l) =>
            `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`,
        )
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- CERTIFICATIONS -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.certificationsAndLicenses) &&
    finalize.certificationsAndLicenses.some(
      (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
    )
      ? `<div class="section-content">
    <div class="section-title">Certifications and Licenses</div>
    <div class="additional-content">
      ${finalize.certificationsAndLicenses
        .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
        .map((i) => `<div class="additional-item">${i.name}</div>`)
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- HOBBIES -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.hobbiesAndInterests) &&
    finalize.hobbiesAndInterests.some(
      (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
    )
      ? `<div class="section-content">
    <div class="section-title">Hobbies and Interests</div>
    <div class="additional-content">
      ${finalize.hobbiesAndInterests
        .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
        .map((i) => `<div class="additional-item">${i.name}</div>`)
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- AWARDS -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.awardsAndHonors) &&
    finalize.awardsAndHonors.some(
      (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
    )
      ? `<div class="section-content">
    <div class="section-title">Awards and Honors</div>
    <div class="additional-content">
      ${finalize.awardsAndHonors
        .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
        .map((i) => `<div class="additional-item">${i.name}</div>`)
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- WEBSITES -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.websitesAndSocialMedia) &&
    finalize.websitesAndSocialMedia.some(
      (i) =>
        (i.websiteUrl && i.websiteUrl.trim() !== "") ||
        (i.socialMedia && i.socialMedia.trim() !== ""),
    )
      ? `<div class="section-content">
    <div class="section-title">Websites and Social Media</div>
    <div class="additional-content">
      ${finalize.websitesAndSocialMedia
        .filter((i) => i.websiteUrl || i.socialMedia)
        .map(
          (i) =>
            `<div class="additional-item">${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}</div>`,
        )
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- REFERENCES -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.references) &&
    finalize.references.some(
      (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
    )
      ? `<div class="section-content">
    <div class="section-title">References</div>
    <div class="additional-content">
      ${finalize.references
        .filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
        .map((i) => `<div class="additional-item">${i.name}</div>`)
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- CUSTOM SECTIONS -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.customSection) &&
    finalize.customSection.some(
      (s) => s?.name?.trim() || s?.description?.trim(),
    )
      ? `<div class="section-content">
    ${finalize.customSection
      .filter((s) => s?.name?.trim() || s?.description?.trim())
      .map(
        (s) => `<div class="custom-section">
      ${s.name ? `<div class="section-title custom-section-title">${s.name}</div>` : ""}
      ${s.description ? `<div class="item-content custom-section-content">${s.description}</div>` : ""}
    </div>`,
      )
      .join("")}
  </div>`
      : ""
  }

</div>
</body>
</html>`;
  };

  const UseContext = useContext(CreateContext);
  const Contactid = UseContext?.contact.contactId;
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML();

      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );

      const pdfBlob: Blob = res.data;

      const url: string = URL.createObjectURL(pdfBlob);
      const a: HTMLAnchorElement = document.createElement("a");

      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await fetchOldResumeData(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
    if (!userId || !Contactid) {
      console.error("Missing userId or Contactid");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("message", "success");
      formData.append("contactId", Contactid);
      formData.append("resume", pdfBlob, "resume.pdf");

      const response: AxiosResponse = await axios.post(
        `${API_URL}/api/users/download-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Upload success:", response.data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const stripHtml = (html: string) =>
    html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  /* ======================================================
     JSX PREVIEW
  ====================================================== */
  return (
    <>
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
        className={`t1-resume bg-white ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="contact-info">
          <div className="name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="job-title">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="address">{addressParts.join(", ")}</div>
          <div className="contact-details">
            {contact?.email && <span>{contact.email}</span>}
            {contact?.phone && <span>{contact.phone}</span>}
            {dateOfBirth && <span>{formatDateOfBirth(dateOfBirth)}</span>}
          </div>
          <div className="links">
            {linkedinUrl && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https://${linkedinUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {githubUrl && (
              <a
                href={
                  githubUrl.startsWith("http")
                    ? githubUrl
                    : `https://${githubUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {portfolioUrl && (
              <a
                href={
                  portfolioUrl.startsWith("http")
                    ? portfolioUrl
                    : `https://${portfolioUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="section-content">
            <div className="section-title">Summary</div>
            <div
              className="item-content summary-text"
              dangerouslySetInnerHTML={{
                __html: summary.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="section-content">
            <div className="section-title">Experience</div>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="experience-item"
                style={{ marginBottom: "16px" }}
              >
                <div className="item-header experience-header">
                  <div className="item-title-container">
                    <div className="item-title">{exp.jobTitle}</div>
                    <div className="item-subtitle">
                      {exp.employer}
                      {exp.location && ` — ${exp.location}`}
                    </div>
                  </div>
                  <div className="item-date experience-date">
                    <MonthYearDisplay value={exp.startDate} shortYear />
                    {" - "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear />
                    ) : (
                      "Present"
                    )}
                  </div>
                </div>
                {exp.text && (
                  <div
                    className="item-content experience-description wrap-break-word"
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
          <div className="section-content">
            <div className="section-title">Education</div>
            {educations.map((edu, index) => {
              let textContent = null;
              if (edu.text) {
                if (edu.text.includes("<") && edu.text.includes(">")) {
                  textContent = (
                    <div
                      className="item-content education-description"
                      dangerouslySetInnerHTML={{ __html: edu.text }}
                    />
                  );
                } else {
                  const lines = edu.text
                    .split("\n")
                    .filter((l) => l.trim() !== "");
                  if (lines.some((l) => l.trim().startsWith("-"))) {
                    textContent = (
                      <div className="education-content">
                        <ul className="education-list">
                          {lines.map((l, li) => {
                            const t = l.trim();
                            const c = t.startsWith("-")
                              ? t.substring(1).trim()
                              : t;
                            return c ? <li key={li}>{c}</li> : null;
                          })}
                        </ul>
                      </div>
                    );
                  } else {
                    textContent = (
                      <div
                        className="item-content education-description"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {stripHtml(edu.text)}
                      </div>
                    );
                  }
                }
              }

              const formattedGrade = formatGrade(edu.grade || "");

              return (
                <div
                  key={edu.id || index}
                  className="education-item"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="item-header education-header">
                    <div className="item-title-container">
                      <div className="item-title">{edu.schoolname || ""}</div>
                      {(edu.degree || edu.location || formattedGrade) && (
                        <div className="item-subtitle">
                          {edu.degree && <span>{edu.degree}</span>}
                          {edu.degree && edu.location && " — "}
                          {edu.location && <span>{edu.location}</span>}
                          {(edu.degree || edu.location) &&
                            formattedGrade &&
                            " • "}
                          {formattedGrade && (
                            <span className="education-grade">
                              {formattedGrade}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="item-date education-date">
                        {edu.startDate || ""}
                        {edu.startDate && edu.endDate && " - "}
                        {edu.endDate || ""}
                      </div>
                    )}
                  </div>
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
            <div className="section-content">
              <div className="section-title">Languages</div>
              <div className="skills-list">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <span key={lang._id || index} className="skill-tag">
                        {lang.name}
                        {lang.level && ` (${lang.level})`}
                      </span>
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
            <div className="section-content">
              <div className="section-title">Certifications and Licenses</div>
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
            <div className="section-content">
              <div className="section-title">Hobbies and Interests</div>
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
            <div className="section-content">
              <div className="section-title">Awards and Honors</div>
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
            <div className="section-content">
              <div className="section-title">Websites and Social Media</div>
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
            <div className="section-content">
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
          ) && (
            <div className="section-content">
              {finalize.customSection
                .filter((s) => s?.name?.trim() || s?.description?.trim())
                .map((section, index) => (
                  <div key={section.id || index} className="custom-section">
                    {section.name && (
                      <div className="section-title custom-section-title">
                        {section.name}
                      </div>
                    )}
                    {section.description && (
                      <div
                        className="item-content custom-section-content"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
      </div>
    </>
  );
};

export default TemplateOne;
