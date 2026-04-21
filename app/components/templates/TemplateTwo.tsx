
// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   MonthYearDisplay,
//   formatMonthYear,
//   getLocalStorage,
// } from "@/app/utils";
// import { IoPersonOutline } from "react-icons/io5";

// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || UseContext?.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const finalize = alldata?.finalize || UseContext?.finalize || {};
//   const summary = alldata?.summary || UseContext?.summary || "";
//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.croppedImage) {
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       } else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       } else if (
//         contact.croppedImage &&
//         typeof contact.croppedImage === "object" &&
//         "size" in contact.croppedImage
//       ) {
//         objectUrl = URL.createObjectURL(contact.croppedImage as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.croppedImage, contact.photo]);

//   const filteredSkills = skills.filter((skill) => skill.skill?.trim());

//   /* ======================================================
//      SHARED CSS
//      FIX 1: All selectors are scoped to .t2-resume 
//              to prevent leaking into the rest of the website.
//      FIX 2: Reduced padding/spacing/photo size so the resume
//              fits on a single A4 page when exported to PDF.
//   ====================================================== */
//   const styles = `
//     /* ── CONTAINER ── */
//     .t2-resume  {
//       width: 210mm;
//       padding: 5mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       text-align: left;
//     }

//       .t2-resume.is-preview {
   

//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm; 
//         padding:20px;

//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: hidden;
// }

//     /* ── SCOPED GLOBAL RESETS (FIX 1) ── */
//     /* These used to be bare "p, div, span, i, a { ... }" selectors
//        which applied to the entire page. Now they are scoped. */
//     .t2-resume  p,
//     .t2-resume  div,
//     .t2-resume  span,
//     .t2-resume  i,
//     .t2-resume  a {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  ul,
//     .t2-resume  ol {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t2-resume  li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t2-resume  ul { list-style-type: disc !important; padding-left: 16px !important; }
//     .t2-resume  ol { list-style-type: decimal !important; padding-left: 16px !important; }

//     /* ── HEADER ── */
//     .t2-resume  .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 4px 0;
//       border-radius: 24px 24px 0 0;
//       border-bottom: 1px solid #d1d5db;
//     }

//     .t2-resume  .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 22%;
//       padding: 4px;
//     }

//     /* FIX 2: Reduced photo from 128px → 100px to save vertical space */
//     .t2-resume  .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }

//     .t2-resume  .header-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f9fafb;
//     }

//     .t2-resume  .header-photo-placeholder span {
//       color: #9ca3af;
//       font-size: 12px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .t2-resume  .header-info-col {
//       width: 78%;
//       padding-left: 40px;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }

//     .t2-resume  .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .header-address {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-email {
//       font-size: 11px;
//       color: #374151;
//       font-family: serif, 'Nunito', Arial;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-phone {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .t2-resume  .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//     }

//     .t2-resume  .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* ── BODY ── */
//     .t2-resume  .body-wrap {
//       display: flex;
//       gap: 12px;
//     }

//     /* ── LEFT COLUMN ── */
//     /* FIX 2: Reduced padding-top 8px → 4px */
//     .t2-resume  .left-col {
//       width: 40%;
//       padding-top: 4px;
//       padding-left: 20px;
//     }

//     /* ── DIVIDER ── */
//     .t2-resume  .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 0 4px;
//       flex-shrink: 0;
//     }

//     /* ── RIGHT COLUMN ── */
//     /* FIX 2: Reduced padding-top 8px → 4px */
//     .t2-resume  .right-col {
//       width: 60%;
//       padding-top: 4px;
//       padding-right: 20px;
//     }

//     /* ── SECTION TITLE ── */
//     .t2-resume  .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── SUMMARY ── */
//     /* FIX 2: Reduced margin-bottom 10px → 6px */
//     .t2-resume  .summary-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .summary-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t2-resume  .summary-text p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* ── SKILLS ── */
//     /* FIX 2: Reduced margin-bottom 12px → 8px */
//     .t2-resume  .skills-block {
//       margin-bottom: 8px;
//     }

//     .t2-resume  .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       column-gap: 20px;
//       row-gap: 6px;
//     }

//     .t2-resume  .skill-name {
//       font-size: 12px;
//       color: #1f2937;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .skill-bar-wrap {
//       height: 4px;
//       width: 100%;
//       background: #d1d5db;
//       border-radius: 9999px;
//       overflow: hidden;
//     }

//     .t2-resume  .skill-bar-fill {
//       height: 100%;
//       background: #0c0c1e;
//       border-radius: 9999px;
//     }

//     /* ── LANGUAGES ── */
//     /* FIX 2: Reduced margins */
//     .t2-resume  .lang-block {
//       margin-top: 4px;
//       margin-bottom: 6px;
//     }

//     /* ── ADDITIONAL SECTIONS ── */
//     /* FIX 2: Reduced margins */
//     .t2-resume  .extra-block {
//       margin-top: 4px;
//       margin-bottom: 6px;
//     }

//     .t2-resume  .extra-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t2-resume  .extra-text p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .t2-resume  .extra-text div { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     .t2-resume  .extra-text-muted {
//       font-size: 13px;
//       color: #6b7280;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     /* FIX 2: Reduced margin-bottom 10px → 6px */
//     .t2-resume  .entry-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .entry-date {
//       display: flex;
//       align-items: center;
//       gap: 3px;
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       white-space: nowrap;
//     }

//     .t2-resume  .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t2-resume  .entry-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t2-resume  .entry-content ul {
//       list-style-type: disc !important;
//       padding-left: 16px !important;
//       margin: 0 !important;
//     }

//     .t2-resume  .entry-content ol {
//       list-style-type: decimal !important;
//       padding-left: 16px !important;
//       margin: 0 !important;
//     }

//     .t2-resume  .entry-content li {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//       margin-bottom: 1px !important;
//     }

//     /* ── WEBSITES ── */
//     .t2-resume  .website-block {
//       margin-top: 8px;
//     }

//     .t2-resume  .website-item {
//       margin-bottom: 4px;
//     }

//     .t2-resume  .website-label {
//       font-size: 13px;
//       font-weight: 700;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .website-link {
//       font-size: 13px;
//       color: #6b7280;
//       text-decoration: underline;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 5mm;
//       }

//       @page :first {
//         margin-top: 0;
//       }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .t2-resume  .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t2-resume  .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — pixel-perfect match to JSX preview
//   ====================================================== */
//   const generateHTML = () => {
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="header-photo" />`
//       : `<div class="header-photo-placeholder"><span>No Photo</span></div>`;

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const skillLevelPct = (level: number | null | undefined) =>
//       level ? `${(Number(level) / 5) * 100}%` : "0%";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     /* PDF-specific body reset — safe here because this HTML is only
//        used inside the headless PDF renderer, not injected into the site */
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       background-color: white;
//     }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t2-resume ">

//   <!-- HEADER -->
//   <div class="header-wrap">
//     <div class="header-photo-col">
//       ${photoHtml}
//     </div>
//     <div class="header-info-col">
//       <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//       ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//       <div class="header-links">
//         ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
//         ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="body-wrap">

//     <!-- LEFT COLUMN -->
//     <div class="left-col">

//       ${
//         summary
//           ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${summary.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         filteredSkills.length > 0
//           ? `
//       <div class="skills-block">
//         <div class="section-title">Skills</div>
//         <div class="skills-grid">
//           ${filteredSkills
//             .map(
//               (skill) => `
//           <div>
//             <div class="skill-name">${skill.skill || ""}</div>
//             ${skill.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillLevelPct(Number(skill.level))}"></div></div>` : ""}
//           </div>`,
//             )
//             .join("")}
//         </div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.languages) &&
//         finalize.languages.some((l) => l.name?.trim())
//           ? `
//       <div class="lang-block">
//         <div class="section-title">Languages</div>
//         <div class="skills-grid">
//           ${finalize.languages
//             .filter((l) => l.name?.trim())
//             .map(
//               (l) => `
//           <div>
//             <div class="skill-name">${l.name}</div>
//             ${l.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillLevelPct(Number(l.level))}"></div></div>` : ""}
//           </div>`,
//             )
//             .join("")}
//         </div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.certificationsAndLicenses) &&
//         finalize.certificationsAndLicenses.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         )
//           ? `
//       <div class="extra-block">
//         <div class="section-title">Certifications &amp; Licenses</div>
//         <div class="extra-text">${finalize.certificationsAndLicenses
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.hobbiesAndInterests) &&
//         finalize.hobbiesAndInterests.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         )
//           ? `
//       <div class="extra-block">
//         <div class="section-title">Hobbies &amp; Interests</div>
//         <div class="extra-text-muted">${finalize.hobbiesAndInterests
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.awardsAndHonors) &&
//         finalize.awardsAndHonors.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         )
//           ? `
//       <div class="extra-block">
//         <div class="section-title">Awards &amp; Honors</div>
//         <div class="extra-text">${finalize.awardsAndHonors
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.references) &&
//         finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           ? `
//       <div class="extra-block">
//         <div class="section-title">References</div>
//         <div class="extra-text-muted">${finalize.references
//           .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//           .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//           .join("")}</div>
//       </div>`
//           : ""
//       }

//     </div>

//     <!-- DIVIDER -->
//     <div class="col-divider"></div>

//     <!-- RIGHT COLUMN -->
//     <div class="right-col">

//       ${
//         experiences?.length > 0
//           ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences
//           .map((exp) => {
//             const start = formatMonthYear(exp.startDate, true);
//             const end = exp.endDate
//               ? formatMonthYear(exp.endDate, true)
//               : exp.startDate
//                 ? "Present"
//                 : "";
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//             <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>` : ""}
//           ${exp.text ? `<div class="entry-content">${exp.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//           })
//           .join("")}
//       </div>`
//           : ""
//       }

//       ${
//         educations?.length > 0
//           ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations
//           .map((edu) => {
//             const dateStr = [edu.startDate || "", edu.endDate || ""]
//               .filter(Boolean)
//               .join(" - ");
//             return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             <div class="entry-title">${edu.schoolname || ""}</div>
//             ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//           </div>
//           ${edu.location || edu.degree ? `<div class="entry-subtitle">${[edu.location, edu.degree].filter(Boolean).join(" - ")}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${edu.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//           })
//           .join("")}
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.websitesAndSocialMedia) &&
//         finalize.websitesAndSocialMedia.some(
//           (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//         )
//           ? `
//       <div class="website-block">
//         <div class="section-title">Websites &amp; Social Media</div>
//         ${finalize.websitesAndSocialMedia
//           .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//           .map(
//             (i) => `
//         <div class="website-item">
//           ${i.websiteUrl ? `<div class="website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a>` : ""}
//           ${i.socialMedia ? `<div class="website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a>` : ""}
//         </div>`,
//           )
//           .join("")}
//       </div>`
//           : ""
//       }

//       ${
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? `
//       <div style="margin-top:6px">
//         ${finalize.customSection
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map(
//             (s) => `
//         <div style="margin-bottom:6px">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="entry-content">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}
//         </div>`,
//           )
//           .join("")}
//       </div>`
//           : ""
//       }

//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

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

//       // --- Server Upload Logic ---
//       // We pass the pdfBlob directly to the next function
//       await fetchOldResumeData(pdfBlob);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

//   const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
//     if (!userId || !Contactid) {
//       console.error("Missing userId or Contactid");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       // Append metadata
//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);

//       // Append the actual file
//       // The third parameter provides the filename to the server
//       formData.append("resume", pdfBlob, "resume.pdf");

//       console.log("formData", formData);

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

//   /* ======================================================
//      JSX PREVIEW — uses same CSS classes as generateHTML
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
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div
//         // className="t2-resume "
//                 className={`t2-resume  ${alldata ? 'is-preview' : ''}`}

//         style={{
//           margin: "0 auto",
//           minHeight: "297mm",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
//         }}
//       >
//         {/* Font import — only applies inside this component's shadow, not globally */}
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-wrap">
//           <div className="header-photo-col">
//             {previewUrl ? (
//               <img src={previewUrl} alt="Profile" className="header-photo" />
//             ) : (
//               <div className="header-photo-placeholder">
//                 <IoPersonOutline
//                   style={{ width: 40, height: 40, color: "#9ca3af" }}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="header-info-col">
//             <div className="header-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {[
//               contact?.address,
//               contact?.city,
//               contact?.postcode,
//               contact?.country,
//             ].filter(Boolean).length > 0 && (
//               <div className="header-address">
//                 {[
//                   contact?.address,
//                   contact?.city,
//                   contact?.postcode,
//                   contact?.country,
//                 ]
//                   .filter(Boolean)
//                   .join(", ")}
//               </div>
//             )}
//             {contact?.email && (
//               <div className="header-email">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="header-phone">{contact.phone}</div>
//             )}
//             <div className="header-links">
//               {linkedinUrl && linkedinUrl.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="header-link"
//                 >
//                   LinkedIn
//                 </a>
//               )}
//               {portfolioUrl && portfolioUrl.trim() && (
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="body-wrap">
//           {/* LEFT COLUMN */}
//           <div className="left-col">
//             {summary && (
//               <div className="summary-block">
//                 <div className="section-title">Summary</div>
//                 <div
//                   className="summary-text"
//                   dangerouslySetInnerHTML={{
//                     __html: summary.replace(/<[^>]*>/g, ""),
//                   }}
//                 />
//               </div>
//             )}

//             {filteredSkills.length > 0 && (
//               <div className="skills-block">
//                 <div className="section-title">Skills</div>
//                 <div className="skills-grid">
//                   {filteredSkills.map((skill, index) => (
//                     <div key={index}>
//                       <div className="skill-name">{skill.skill || ""}</div>
//                       {skill.level && (
//                         <div className="skill-bar-wrap">
//                           <div
//                             className="skill-bar-fill"
//                             style={{
//                               width: `${(Number(skill.level) / 5) * 100}%`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.languages) &&
//               finalize.languages.some((l) => l.name?.trim()) && (
//                 <div className="lang-block">
//                   <div className="section-title">Languages</div>
//                   <div className="skills-grid">
//                     {finalize.languages
//                       .filter((l) => l.name?.trim())
//                       .map((l, i) => (
//                         <div key={l._id || i}>
//                           <div className="skill-name">{l.name}</div>
//                           {l.level && (
//                             <div className="skill-bar-wrap">
//                               <div
//                                 className="skill-bar-fill"
//                                 style={{
//                                   width: `${(Number(l.level) / 5) * 100}%`,
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">
//                     Certifications &amp; Licenses
//                   </div>
//                   <div className="extra-text">
//                     {finalize.certificationsAndLicenses
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">Hobbies &amp; Interests</div>
//                   <div className="extra-text-muted">
//                     {finalize.hobbiesAndInterests
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">Awards &amp; Honors</div>
//                   <div className="extra-text">
//                     {finalize.awardsAndHonors
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}

//             {Array.isArray(finalize?.references) &&
//               finalize.references.some((i) =>
//                 i.name?.replace(/<[^>]*>/g, "").trim(),
//               ) && (
//                 <div className="extra-block">
//                   <div className="section-title">References</div>
//                   <div className="extra-text-muted">
//                     {finalize.references
//                       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                       .map((item, i) => (
//                         <div
//                           key={item.id || i}
//                           dangerouslySetInnerHTML={{
//                             __html: item.name?.replace(/<[^>]*>/g, "") || "",
//                           }}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               )}
//           </div>

//           {/* DIVIDER */}
//           <div className="col-divider" />

//           {/* RIGHT COLUMN */}
//           <div className="right-col">
//             {experiences?.length > 0 && (
//               <div>
//                 <div className="section-title">Experience</div>
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       {exp.jobTitle ? (
//                         <div className="entry-title">{exp.jobTitle}</div>
//                       ) : (
//                         <div />
//                       )}
//                       <div className="entry-date">
//                         <MonthYearDisplay
//                           value={exp.startDate}
//                           shortYear={true}
//                         />
//                         {exp.startDate && (exp.endDate || true) && (
//                           <span> - </span>
//                         )}
//                         {exp.endDate ? (
//                           <MonthYearDisplay
//                             value={exp.endDate}
//                             shortYear={true}
//                           />
//                         ) : (
//                           exp.startDate && <span>Present</span>
//                         )}
//                       </div>
//                     </div>
//                     {(exp.location || exp.employer) && (
//                       <div className="entry-subtitle">
//                         {[exp.location, exp.employer]
//                           .filter(Boolean)
//                           .join(" - ")}
//                       </div>
//                     )}
//                     {exp.text && (
//                       <div
//                         className="entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: exp.text.replace(/<[^>]*>/g, ""),
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {educations?.length > 0 && (
//               <div style={{ marginTop: "6px" }}>
//                 <div className="section-title">Education</div>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       <div className="entry-date">
//                         {[edu.startDate, edu.endDate]
//                           .filter(Boolean)
//                           .join(" - ")}
//                       </div>
//                     </div>
//                     {(edu.location || edu.degree) && (
//                       <div className="entry-subtitle">
//                         {[edu.location, edu.degree].filter(Boolean).join(" - ")}
//                       </div>
//                     )}
//                     {edu.text && (
//                       <div
//                         className="entry-content"
//                         dangerouslySetInnerHTML={{
//                           __html: edu.text.replace(/<[^>]*>/g, ""),
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {Array.isArray(finalize?.websitesAndSocialMedia) &&
//               finalize.websitesAndSocialMedia.some(
//                 (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//               ) && (
//                 <div className="website-block">
//                   <div className="section-title">
//                     Websites &amp; Social Media
//                   </div>
//                   {finalize.websitesAndSocialMedia
//                     .filter(
//                       (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//                     )
//                     .map((item, i) => (
//                       <div key={item.id || i} className="website-item">
//                         {item.websiteUrl && (
//                           <div>
//                             <div className="website-label">Website:</div>
//                             <a
//                               href={
//                                 item.websiteUrl.startsWith("http")
//                                   ? item.websiteUrl
//                                   : `https://${item.websiteUrl}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="website-link"
//                             >
//                               {item.websiteUrl}
//                             </a>
//                           </div>
//                         )}
//                         {item.socialMedia && (
//                           <div style={{ marginTop: "4px" }}>
//                             <div className="website-label">Social Media:</div>
//                             <a
//                               href={
//                                 item.socialMedia.startsWith("http")
//                                   ? item.socialMedia
//                                   : `https://${item.socialMedia}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="website-link"
//                             >
//                               {item.socialMedia}
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}

//             {Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               ) && (
//                 <div style={{ marginTop: "6px" }}>
//                   {finalize.customSection
//                     .filter((s) => s?.name?.trim() || s?.description?.trim())
//                     .map((section, i) => (
//                       <div
//                         key={section.id || i}
//                         style={{ marginBottom: "6px" }}
//                       >
//                         {section.name && (
//                           <div className="section-title">{section.name}</div>
//                         )}
//                         {section.description && (
//                           <div
//                             className="entry-content"
//                             dangerouslySetInnerHTML={{
//                               __html: section.description.replace(
//                                 /<[^>]*>/g,
//                                 "",
//                               ),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwo;












// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   MonthYearDisplay,
//   formatMonthYear,
//   getLocalStorage,
// } from "@/app/utils";
// import { IoPersonOutline } from "react-icons/io5";

// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || UseContext?.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const projects = alldata?.projects || UseContext?.projects || [];
//   const finalize = alldata?.finalize || UseContext?.finalize || {};
//   const summary = alldata?.summary || UseContext?.summary || "";
//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.croppedImage) {
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       } else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       } else if (
//         contact.croppedImage &&
//         typeof contact.croppedImage === "object" &&
//         "size" in contact.croppedImage
//       ) {
//         objectUrl = URL.createObjectURL(contact.croppedImage as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.croppedImage, contact.photo]);

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
//       // Render categorized skills as compact tags
//       return (
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category" style={{ marginBottom: "12px" }}>
//               <div className="skill-category-title" style={{ 
//                 fontSize: "12px", 
//                 fontWeight: 600, 
//                 marginBottom: "6px",
//                 color: "#374151"
//               }}>
//                 {category.title}
//               </div>
//               <div className="skills-tags">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="skill-tag">
//                     {skill.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Render simple skills as compact tags
//       return (
//         <div className="skills-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-tags">
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
//       <div style={{ marginTop: "6px" }}>
//         <div className="section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="entry-block">
//             <div className="entry-top-row">
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
//                 dangerouslySetInnerHTML={{ __html: project.description.replace(/<[^>]*>/g, "") }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      SHARED CSS
//   ====================================================== */
//   const styles = `
//     /* ── CONTAINER ── */
//     .t2-resume  {
//       width: 210mm;
//       padding: 5mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       text-align: left;
//     }

//     .t2-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm; 
//       padding:20px;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: hidden;
//     }

//     /* ── SCOPED GLOBAL RESETS ── */
//     .t2-resume  p,
//     .t2-resume  div,
//     .t2-resume  span,
//     .t2-resume  i,
//     .t2-resume  a {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  ul,
//     .t2-resume  ol {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t2-resume  li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t2-resume  ul { list-style-type: disc !important; padding-left: 16px !important; }
//     .t2-resume  ol { list-style-type: decimal !important; padding-left: 16px !important; }

//     /* ── HEADER ── */
//     .t2-resume  .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 4px 0;
//       border-radius: 24px 24px 0 0;
//       border-bottom: 1px solid #d1d5db;
//     }

//     .t2-resume  .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 22%;
//       padding: 4px;
//     }

//     .t2-resume  .header-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }

//     .t2-resume  .header-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f9fafb;
//     }

//     .t2-resume  .header-info-col {
//       width: 78%;
//       padding-left: 40px;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }

//     .t2-resume  .header-name {
//       font-size: 26px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .header-address {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-email {
//       font-size: 11px;
//       color: #374151;
//       font-family: serif, 'Nunito', Arial;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .header-phone {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .t2-resume  .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//     }

//     .t2-resume  .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* ── BODY ── */
//     .t2-resume  .body-wrap {
//       display: flex;
//       gap: 12px;
//     }

//     /* ── LEFT COLUMN ── */
//     .t2-resume  .left-col {
//       width: 40%;
//       padding-top: 4px;
//       padding-left: 20px;
//     }

//     /* ── DIVIDER ── */
//     .t2-resume  .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 0 4px;
//       flex-shrink: 0;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t2-resume  .right-col {
//       width: 60%;
//       padding-top: 4px;
//       padding-right: 20px;
//     }

//     /* ── SECTION TITLE ── */
//     .t2-resume  .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 4px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── SUMMARY ── */
//     .t2-resume  .summary-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .summary-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── SKILLS (COMPACT TAGS) ── */
//     .t2-resume  .skills-block {
//       margin-bottom: 8px;
//     }

//     .t2-resume  .skills-tags {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 6px;
//       margin-top: 4px;
//     }

//     .t2-resume  .skill-tag {
//       display: inline-block;
//       background: #f3f4f6;
//       padding: 3px 8px;
//       font-size: 11px;
//       color: #374151;
//       border-radius: 4px;
//       line-height: 1.4;
//     }

//     .t2-resume  .skill-category-title {
//       font-size: 12px;
//       font-weight: 600;
//       margin-bottom: 6px;
//       color: #374151;
//     }

//     /* ── PROJECTS ── */
//     .t2-resume  .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t2-resume  .project-link {
//       font-size: 10px;
//       color: #6b7280;
//       text-decoration: underline;
//     }

//     .t2-resume  .project-tech-stack {
//       font-size: 11px;
//       color: #6b7280;
//       margin: 2px 0 4px;
//     }

//     /* ── LANGUAGES ── */
//     .t2-resume  .lang-block {
//       margin-top: 4px;
//       margin-bottom: 6px;
//     }

//     /* ── ADDITIONAL SECTIONS ── */
//     .t2-resume  .extra-block {
//       margin-top: 4px;
//       margin-bottom: 6px;
//     }

//     .t2-resume  .extra-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t2-resume  .extra-text-muted {
//       font-size: 13px;
//       color: #6b7280;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     .t2-resume  .entry-block {
//       margin-bottom: 6px;
//     }

//     .t2-resume  .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 1px;
//     }

//     .t2-resume  .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .entry-date {
//       display: flex;
//       align-items: center;
//       gap: 3px;
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       white-space: nowrap;
//     }

//     .t2-resume  .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .t2-resume  .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── WEBSITES ── */
//     .t2-resume  .website-block {
//       margin-top: 8px;
//     }

//     .t2-resume  .website-item {
//       margin-bottom: 4px;
//     }

//     .t2-resume  .website-label {
//       font-size: 13px;
//       font-weight: 700;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t2-resume  .website-link {
//       font-size: 13px;
//       color: #6b7280;
//       text-decoration: underline;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 5mm;
//       }

//       @page :first {
//         margin-top: 0;
//       }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .t2-resume  .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t2-resume  .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="header-photo" />`
//       : `<div class="header-photo-placeholder"><span>No Photo</span></div>`;

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";
      
//       const isCategorized = isCategorizedSkills(skills);
      
//       if (isCategorized) {
//         return `
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             ${skills.map((category: any) => `
//               <div class="skill-category" style="margin-bottom:12px">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-tags">
//                   ${category.skills.map((skill: any) => `
//                     <span class="skill-tag">${skill.name}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="skills-block">
//             <div class="section-title">Skills</div>
//             <div class="skills-tags">
//               ${skills.map((skill: any) => `
//                 <span class="skill-tag">${skill.name || skill.skill}</span>
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
//         <div style="margin-top:6px">
//           <div class="section-title">Projects</div>
//           ${projects.map((project: any) => `
//             <div class="entry-block">
//               <div class="entry-top-row">
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
//                 <div class="entry-content">${project.description.replace(/<[^>]*>/g, "")}</div>
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
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       background-color: white;
//     }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t2-resume">

//   <!-- HEADER -->
//   <div class="header-wrap">
//     <div class="header-photo-col">
//       ${photoHtml}
//     </div>
//     <div class="header-info-col">
//       <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//       ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//       <div class="header-links">
//         ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
//         ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="body-wrap">

//     <!-- LEFT COLUMN -->
//     <div class="left-col">

//       ${summary ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${summary.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>
//       </div>` : ""}

//       ${generateSkillsHTML()}

//       ${Array.isArray(finalize?.languages) && finalize.languages.some((l) => l.name?.trim()) ? `
//       <div class="lang-block">
//         <div class="section-title">Languages</div>
//         <div class="skills-tags">
//           ${finalize.languages.filter((l) => l.name?.trim()).map((l) => `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`).join("")}
//         </div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">Certifications &amp; Licenses</div>
//         <div class="extra-text">${finalize.certificationsAndLicenses.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">Hobbies &amp; Interests</div>
//         <div class="extra-text-muted">${finalize.hobbiesAndInterests.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">Awards &amp; Honors</div>
//         <div class="extra-text">${finalize.awardsAndHonors.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.references) && finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">References</div>
//         <div class="extra-text-muted">${finalize.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//     </div>

//     <!-- DIVIDER -->
//     <div class="col-divider"></div>

//     <!-- RIGHT COLUMN -->
//     <div class="right-col">

//       ${experiences?.length > 0 ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences.map((exp) => {
//           const start = formatMonthYear(exp.startDate, true);
//           const end = exp.endDate ? formatMonthYear(exp.endDate, true) : exp.startDate ? "Present" : "";
//           return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//             <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>` : ""}
//           ${exp.text ? `<div class="entry-content">${exp.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${generateProjectsHTML()}

//       ${educations?.length > 0 ? `
//       <div style="margin-top:6px">
//         <div class="section-title">Education</div>
//         ${educations.map((edu) => {
//           const dateStr = [edu.startDate || "", edu.endDate || ""].filter(Boolean).join(" - ");
//           return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             <div class="entry-title">${edu.schoolname || ""}</div>
//             ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//           </div>
//           ${edu.location || edu.degree ? `<div class="entry-subtitle">${[edu.location, edu.degree].filter(Boolean).join(" - ")}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${edu.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//       <div class="website-block">
//         <div class="section-title">Websites &amp; Social Media</div>
//         ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//         <div class="website-item">
//           ${i.websiteUrl ? `<div class="website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a>` : ""}
//           ${i.socialMedia ? `<div class="website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

//       ${Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? `
//       <div style="margin-top:6px">
//         ${finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//         <div style="margin-bottom:6px">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="entry-content">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

//     </div>
//   </div>
// </div>
// </body>
// </html>`;
//   };

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

//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

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
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div
//         className={`t2-resume ${alldata ? 'is-preview' : ''}`}
//         style={{
//           margin: "0 auto",
//           minHeight: "297mm",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-wrap">
//           <div className="header-photo-col">
//             {previewUrl ? (
//               <img src={previewUrl} alt="Profile" className="header-photo" />
//             ) : (
//               <div className="header-photo-placeholder">
//                 <IoPersonOutline style={{ width: 40, height: 40, color: "#9ca3af" }} />
//               </div>
//             )}
//           </div>
//           <div className="header-info-col">
//             <div className="header-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//               <div className="header-address">
//                 {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}
//               </div>
//             )}
//             {contact?.email && <div className="header-email">{contact.email}</div>}
//             {contact?.phone && <div className="header-phone">{contact.phone}</div>}
//             <div className="header-links">
//               {linkedinUrl && linkedinUrl.trim() && (
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="header-link">LinkedIn</a>
//               )}
//               {portfolioUrl && portfolioUrl.trim() && (
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer" className="header-link">Portfolio</a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="body-wrap">
//           {/* LEFT COLUMN */}
//           <div className="left-col">
//             {summary && (
//               <div className="summary-block">
//                 <div className="section-title">Summary</div>
//                 <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/<[^>]*>/g, "") }} />
//               </div>
//             )}

//             {renderSkills()}

//             {Array.isArray(finalize?.languages) && finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="lang-block">
//                 <div className="section-title">Languages</div>
//                 <div className="skills-tags">
//                   {finalize.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                     <span key={l._id || i} className="skill-tag">
//                       {l.name}{l.level && ` (${l.level})`}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">Certifications &amp; Licenses</div>
//                 <div className="extra-text">
//                   {finalize.certificationsAndLicenses.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">Hobbies &amp; Interests</div>
//                 <div className="extra-text-muted">
//                   {finalize.hobbiesAndInterests.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">Awards &amp; Honors</div>
//                 <div className="extra-text">
//                   {finalize.awardsAndHonors.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.references) && finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">References</div>
//                 <div className="extra-text-muted">
//                   {finalize.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* DIVIDER */}
//           <div className="col-divider" />

//           {/* RIGHT COLUMN */}
//           <div className="right-col">
//             {experiences?.length > 0 && (
//               <div>
//                 <div className="section-title">Experience</div>
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       {exp.jobTitle ? <div className="entry-title">{exp.jobTitle}</div> : <div />}
//                       <div className="entry-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                         {exp.startDate && (exp.endDate || true) && <span> - </span>}
//                         {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
//                       </div>
//                     </div>
//                     {(exp.location || exp.employer) && (
//                       <div className="entry-subtitle">
//                         {[exp.location, exp.employer].filter(Boolean).join(" - ")}
//                       </div>
//                     )}
//                     {exp.text && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: exp.text.replace(/<[^>]*>/g, "") }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {renderProjects()}

//             {educations?.length > 0 && (
//               <div style={{ marginTop: "6px" }}>
//                 <div className="section-title">Education</div>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       <div className="entry-date">
//                         {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
//                       </div>
//                     </div>
//                     {(edu.location || edu.degree) && (
//                       <div className="entry-subtitle">
//                         {[edu.location, edu.degree].filter(Boolean).join(" - ")}
//                       </div>
//                     )}
//                     {edu.text && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: edu.text.replace(/<[^>]*>/g, "") }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//               <div className="website-block">
//                 <div className="section-title">Websites &amp; Social Media</div>
//                 {finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                   <div key={item.id || i} className="website-item">
//                     {item.websiteUrl && (
//                       <div>
//                         <div className="website-label">Website:</div>
//                         <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="website-link">{item.websiteUrl}</a>
//                       </div>
//                     )}
//                     {item.socialMedia && (
//                       <div style={{ marginTop: "4px" }}>
//                         <div className="website-label">Social Media:</div>
//                         <a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="website-link">{item.socialMedia}</a>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) && (
//               <div style={{ marginTop: "6px" }}>
//                 {finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//                   <div key={section.id || i} style={{ marginBottom: "6px" }}>
//                     {section.name && <div className="section-title">{section.name}</div>}
//                     {section.description && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: section.description.replace(/<[^>]*>/g, "") }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwo;













"use client";
import React, { useContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  MonthYearDisplay,
  formatMonthYear,
  getLocalStorage,
} from "@/app/utils";
import { IoPersonOutline } from "react-icons/io5";

import { usePathname } from "next/navigation";
import { User } from "@/app/types/user.types";
import { ResumeProps } from "@/app/types";

const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
  const UseContext = useContext(CreateContext);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || UseContext?.contact || {};
  const educations = alldata?.educations || UseContext?.education || [];
  const experiences = alldata?.experiences || UseContext?.experiences || [];
  const skills = alldata?.skills || UseContext?.skills || [];
  const projects = alldata?.projects || UseContext?.projects || [];
  const finalize = alldata?.finalize || UseContext?.finalize || {};
  const summary = alldata?.summary || UseContext?.summary || "";
  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;
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
  const formatGrade = (grade: string) => {
    if (!grade) return "";
    
   
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

  useEffect(() => {
    let url: string | null = null;
    let objectUrl: string | null = null;

    if (contact.croppedImage) {
      if (
        typeof contact.croppedImage === "string" &&
        contact.croppedImage.startsWith("blob:")
      ) {
        url = contact.croppedImage;
      } else if (typeof contact.croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
      } else if (
        contact.croppedImage &&
        typeof contact.croppedImage === "object" &&
        "size" in contact.croppedImage
      ) {
        objectUrl = URL.createObjectURL(contact.croppedImage as Blob);
        url = objectUrl;
      }
      setPreviewUrl(url);
    } else if (contact.photo) {
      setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [contact.croppedImage, contact.photo]);

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
      // Render categorized skills as compact tags
      return (
        <div className="skills-block">
          <div className="section-title">Skills</div>
          {skills.map((category: any) => (
            <div key={category.id} className="skill-category" style={{ marginBottom: "12px" }}>
              <div className="skill-category-title" style={{ 
                fontSize: "12px", 
                fontWeight: 600, 
                marginBottom: "6px",
                color: "#374151"
              }}>
                {category.title}
              </div>
              <div className="skills-tags">
                {category.skills.map((skill: any) => (
                  <span key={skill.id} className="skill-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Render simple skills as compact tags
      return (
        <div className="skills-block">
          <div className="section-title">Skills</div>
          <div className="skills-tags">
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
      <div style={{ marginTop: "6px" }}>
        <div className="section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="entry-block">
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
            {project.techStack && project.techStack.length > 0 && (
              <div className="project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{ __html: project.description.replace(/<[^>]*>/g, "") }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     SHARED CSS
  ====================================================== */
  const styles = `
    /* ── CONTAINER ── */
    .t2-resume  {
      width: 210mm;
      padding: 5mm;
      box-sizing: border-box;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      text-align: left;
    }

    .t2-resume.is-preview {
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

    /* ── SCOPED GLOBAL RESETS ── */
    .t2-resume  p,
    .t2-resume  div,
    .t2-resume  span,
    .t2-resume  i,
    .t2-resume  a {
      margin: 0;
      padding: 0;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume  ul,
    .t2-resume  ol {
      margin: 0 !important;
      padding: 0 !important;
    }

    .t2-resume  li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    .t2-resume  ul { list-style-type: disc !important; padding-left: 16px !important; }
    .t2-resume  ol { list-style-type: decimal !important; padding-left: 16px !important; }

    /* ── HEADER ── */
    .t2-resume  .header-wrap {
      display: flex;
      background-color: #EADCCE;
      padding: 4px 0;
      border-radius: 24px 24px 0 0;
      border-bottom: 1px solid #d1d5db;
    }

    .t2-resume  .header-photo-col {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22%;
      padding: 4px;
    }

    .t2-resume  .header-photo {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid #e5e7eb;
    }

    .t2-resume  .header-photo-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    }

    .t2-resume  .header-info-col {
      width: 78%;
      padding-left: 40px;
      padding-right: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .t2-resume  .header-name {
      font-size: 26px;
      font-weight: 400;
      letter-spacing: 0.025em;
      color: #1f2937;
      line-height: 1.25;
      text-transform: capitalize;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 2px;
    }

    .t2-resume  .header-address {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 1px;
    }

    .t2-resume  .header-email {
      font-size: 11px;
      color: #374151;
      font-family: serif, 'Nunito', Arial;
      line-height: 1.5;
      margin-bottom: 1px;
    }

    .t2-resume  .header-phone {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 3px;
    }

    .t2-resume  .header-dob {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 1px;
    }

    .t2-resume  .header-links {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .t2-resume  .header-link {
      font-size: 12px;
      font-weight: 700;
      color: #000;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-family: 'Nunito', Arial, sans-serif;
    }

    /* ── BODY ── */
    .t2-resume  .body-wrap {
      display: flex;
      gap: 12px;
    }

    /* ── LEFT COLUMN ── */
    .t2-resume  .left-col {
      width: 40%;
      padding-top: 4px;
      padding-left: 20px;
    }

    /* ── DIVIDER ── */
    .t2-resume  .col-divider {
      width: 1px;
      border-left: 1px solid #d1d5db;
      margin: 0 4px;
      flex-shrink: 0;
    }

    /* ── RIGHT COLUMN ── */
    .t2-resume  .right-col {
      width: 60%;
      padding-top: 4px;
      padding-right: 20px;
    }

    /* ── SECTION TITLE ── */
    .t2-resume  .section-title {
      font-size: 13px;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      text-decoration-color: #1f2937;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #111827;
      margin-bottom: 4px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* ── SUMMARY ── */
    .t2-resume  .summary-block {
      margin-bottom: 6px;
    }

    .t2-resume  .summary-text {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── SKILLS (COMPACT TAGS) ── */
    .t2-resume  .skills-block {
      margin-bottom: 8px;
    }

    .t2-resume  .skills-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .t2-resume  .skill-tag {
      display: inline-block;
      background: #f3f4f6;
      padding: 3px 8px;
      font-size: 11px;
      color: #374151;
      border-radius: 4px;
      line-height: 1.4;
    }

    .t2-resume  .skill-category-title {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #374151;
    }

    /* ── PROJECTS ── */
    .t2-resume  .project-links {
      display: flex;
      gap: 12px;
    }

    .t2-resume  .project-link {
      font-size: 10px;
      color: #6b7280;
      text-decoration: underline;
    }

    .t2-resume  .project-tech-stack {
      font-size: 11px;
      color: #6b7280;
      margin: 2px 0 4px;
    }

    /* ── EDUCATION GRADE ── */
    .t2-resume  .education-grade {
      font-size: 10px;
      color: #6b7280;
      margin-top: 2px;
      font-weight: 500;
      display: inline-block;
    }

    /* ── LANGUAGES ── */
    .t2-resume  .lang-block {
      margin-top: 4px;
      margin-bottom: 6px;
    }

    /* ── ADDITIONAL SECTIONS ── */
    .t2-resume  .extra-block {
      margin-top: 4px;
      margin-bottom: 6px;
    }

    .t2-resume  .extra-text {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t2-resume  .extra-text-muted {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── EXPERIENCE / EDUCATION ENTRIES ── */
    .t2-resume  .entry-block {
      margin-bottom: 6px;
    }

    .t2-resume  .entry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }

    .t2-resume  .entry-title {
      font-size: 11.5px;
      font-weight: 700;
      font-style: italic;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume  .entry-date {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11.5px;
      font-weight: 700;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      white-space: nowrap;
    }

    .t2-resume  .entry-subtitle {
      font-size: 11px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 2px;
    }

    .t2-resume  .entry-content {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── WEBSITES ── */
    .t2-resume  .website-block {
      margin-top: 8px;
    }

    .t2-resume  .website-item {
      margin-bottom: 4px;
    }

    .t2-resume  .website-label {
      font-size: 13px;
      font-weight: 700;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume  .website-link {
      font-size: 13px;
      color: #6b7280;
      text-decoration: underline;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* ── PRINT ── */
    @media print {
      @page {
        size: A4;
        margin: 5mm;
      }

      @page :first {
        margin-top: 0;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t2-resume  {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
      }

      .t2-resume  .header-wrap {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t2-resume  .entry-block {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .t2-resume  .section-title {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  `;

  /* ======================================================
     HTML GENERATION — for PDF download
  ====================================================== */
  const generateHTML = () => {
    const photoHtml = previewUrl
      ? `<img src="${previewUrl}" alt="Profile" class="header-photo" />`
      : `<div class="header-photo-placeholder"><span>No Photo</span></div>`;

    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postcode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";
      
      const isCategorized = isCategorizedSkills(skills);
      
      if (isCategorized) {
        return `
          <div class="skills-block">
            <div class="section-title">Skills</div>
            ${skills.map((category: any) => `
              <div class="skill-category" style="margin-bottom:12px">
                <div class="skill-category-title">${category.title}</div>
                <div class="skills-tags">
                  ${category.skills.map((skill: any) => `
                    <span class="skill-tag">${skill.name}</span>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        return `
          <div class="skills-block">
            <div class="section-title">Skills</div>
            <div class="skills-tags">
              ${skills.map((skill: any) => `
                <span class="skill-tag">${skill.name || skill.skill}</span>
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
        <div style="margin-top:6px">
          <div class="section-title">Projects</div>
          ${projects.map((project: any) => `
            <div class="entry-block">
              <div class="entry-top-row">
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
                <div class="entry-content">${project.description.replace(/<[^>]*>/g, "")}</div>
              ` : ""}
            </div>
          `).join("")}
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
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      background-color: white;
    }
    ${styles}
  </style>
</head>
<body>
<div class="t2-resume">

  <!-- HEADER -->
  <div class="header-wrap">
    <div class="header-photo-col">
      ${photoHtml}
    </div>
    <div class="header-info-col">
      <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
      ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
      ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
      ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
      ${formattedDob ? `<div class="header-dob">${formattedDob}</div>` : ""}
      <div class="header-links">
        ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
        ${githubUrl && githubUrl.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="header-link">GitHub</a>` : ""}
        ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
      </div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body-wrap">

    <!-- LEFT COLUMN -->
    <div class="left-col">

      ${summary ? `
      <div class="summary-block">
        <div class="section-title">Summary</div>
        <div class="summary-text">${summary.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>
      </div>` : ""}

      ${generateSkillsHTML()}

      ${Array.isArray(finalize?.languages) && finalize.languages.some((l) => l.name?.trim()) ? `
      <div class="lang-block">
        <div class="section-title">Languages</div>
        <div class="skills-tags">
          ${finalize.languages.filter((l) => l.name?.trim()).map((l) => `<span class="skill-tag">${l.name}${l.level ? ` (${l.level})` : ""}</span>`).join("")}
        </div>
      </div>` : ""}

      ${Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
      <div class="extra-block">
        <div class="section-title">Certifications &amp; Licenses</div>
        <div class="extra-text">${finalize.certificationsAndLicenses.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
      </div>` : ""}

      ${Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
      <div class="extra-block">
        <div class="section-title">Hobbies &amp; Interests</div>
        <div class="extra-text-muted">${finalize.hobbiesAndInterests.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
      </div>` : ""}

      ${Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
      <div class="extra-block">
        <div class="section-title">Awards &amp; Honors</div>
        <div class="extra-text">${finalize.awardsAndHonors.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
      </div>` : ""}

      ${Array.isArray(finalize?.references) && finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
      <div class="extra-block">
        <div class="section-title">References</div>
        <div class="extra-text-muted">${finalize.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
      </div>` : ""}

    </div>

    <!-- DIVIDER -->
    <div class="col-divider"></div>

    <!-- RIGHT COLUMN -->
    <div class="right-col">

      ${experiences?.length > 0 ? `
      <div>
        <div class="section-title">Experience</div>
        ${experiences.map((exp) => {
          const start = formatMonthYear(exp.startDate, true);
          const end = exp.endDate ? formatMonthYear(exp.endDate, true) : exp.startDate ? "Present" : "";
          return `
        <div class="entry-block">
          <div class="entry-top-row">
            ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
            <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
          </div>
          ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>` : ""}
          ${exp.text ? `<div class="entry-content">${exp.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
        </div>`;
        }).join("")}
      </div>` : ""}

      ${generateProjectsHTML()}

      ${educations?.length > 0 ? `
      <div style="margin-top:6px">
        <div class="section-title">Education</div>
        ${educations.map((edu) => {
          const dateStr = [edu.startDate || "", edu.endDate || ""].filter(Boolean).join(" - ");
          const formattedGrade = formatGrade(edu.grade || "",);
          return `
        <div class="entry-block">
          <div class="entry-top-row">
            <div class="entry-title">${edu.schoolname || ""}</div>
            ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
          </div>
          ${edu.location || edu.degree ? `<div class="entry-subtitle">${[edu.location, edu.degree].filter(Boolean).join(" - ")}${formattedGrade ? ` • ${formattedGrade}` : ""}</div>` : ""}
          ${!edu.location && !edu.degree && formattedGrade ? `<div class="entry-subtitle">${formattedGrade}</div>` : ""}
          ${edu.text ? `<div class="entry-content">${edu.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
        </div>`;
        }).join("")}
      </div>` : ""}

      ${Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
      <div class="website-block">
        <div class="section-title">Websites &amp; Social Media</div>
        ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
        <div class="website-item">
          ${i.websiteUrl ? `<div class="website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a>` : ""}
          ${i.socialMedia ? `<div class="website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a>` : ""}
        </div>`).join("")}
      </div>` : ""}

      ${Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? `
      <div style="margin-top:6px">
        ${finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
        <div style="margin-bottom:6px">
          ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
          ${s.description ? `<div class="entry-content">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}
        </div>`).join("")}
      </div>` : ""}

    </div>
  </div>
</div>
</body>
</html>`;
  };

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

  const Contactid = UseContext?.contact.contactId;
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

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
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Resume
          </button>
        </div>
      )}

      <div
        className={`t2-resume ${alldata ? 'is-preview' : ''}`}
        style={{
          margin: "0 auto",
          minHeight: "297mm",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-wrap">
          <div className="header-photo-col">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" className="header-photo" />
            ) : (
              <div className="header-photo-placeholder">
                <IoPersonOutline style={{ width: 40, height: 40, color: "#9ca3af" }} />
              </div>
            )}
          </div>
          <div className="header-info-col">
            <div className="header-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
              <div className="header-address">
                {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}
              </div>
            )}
            {contact?.email && <div className="header-email">{contact.email}</div>}
            {contact?.phone && <div className="header-phone">{contact.phone}</div>}
            {dateOfBirth && <div className="header-dob">{formatDateOfBirth(dateOfBirth)}</div>}
            <div className="header-links">
              {linkedinUrl && linkedinUrl.trim() && (
                <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="header-link">LinkedIn</a>
              )}
              {githubUrl && githubUrl.trim() && (
                <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer" className="header-link">GitHub</a>
              )}
              {portfolioUrl && portfolioUrl.trim() && (
                <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer" className="header-link">Portfolio</a>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="body-wrap">
          {/* LEFT COLUMN */}
          <div className="left-col">
            {summary && (
              <div className="summary-block">
                <div className="section-title">Summary</div>
                <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/<[^>]*>/g, "") }} />
              </div>
            )}

            {renderSkills()}

            {Array.isArray(finalize?.languages) && finalize.languages.some((l) => l.name?.trim()) && (
              <div className="lang-block">
                <div className="section-title">Languages</div>
                <div className="skills-tags">
                  {finalize.languages.filter((l) => l.name?.trim()).map((l, i) => (
                    <span key={l._id || i} className="skill-tag">
                      {l.name}{l.level && ` (${l.level})`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
              <div className="extra-block">
                <div className="section-title">Certifications &amp; Licenses</div>
                <div className="extra-text">
                  {finalize.certificationsAndLicenses.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                    <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
              <div className="extra-block">
                <div className="section-title">Hobbies &amp; Interests</div>
                <div className="extra-text-muted">
                  {finalize.hobbiesAndInterests.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                    <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
              <div className="extra-block">
                <div className="section-title">Awards &amp; Honors</div>
                <div className="extra-text">
                  {finalize.awardsAndHonors.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                    <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(finalize?.references) && finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
              <div className="extra-block">
                <div className="section-title">References</div>
                <div className="extra-text-muted">
                  {finalize.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                    <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className="col-divider" />

          {/* RIGHT COLUMN */}
          <div className="right-col">
            {experiences?.length > 0 && (
              <div>
                <div className="section-title">Experience</div>
                {experiences.map((exp, index) => (
                  <div key={exp.id || index} className="entry-block">
                    <div className="entry-top-row">
                      {exp.jobTitle ? <div className="entry-title">{exp.jobTitle}</div> : <div />}
                      <div className="entry-date">
                        <MonthYearDisplay value={exp.startDate} shortYear={true} />
                        {exp.startDate && (exp.endDate || true) && <span> - </span>}
                        {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
                      </div>
                    </div>
                    {(exp.location || exp.employer) && (
                      <div className="entry-subtitle">
                        {[exp.location, exp.employer].filter(Boolean).join(" - ")}
                      </div>
                    )}
                    {exp.text && (
                      <div className="entry-content" dangerouslySetInnerHTML={{ __html: exp.text.replace(/<[^>]*>/g, "") }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {renderProjects()}

            {educations?.length > 0 && (
              <div style={{ marginTop: "6px" }}>
                <div className="section-title">Education</div>
                {educations.map((edu, index) => {
                  const formattedGrade = formatGrade(edu.grade || "");
                  return (
                    <div key={edu.id || index} className="entry-block">
                      <div className="entry-top-row">
                        <div className="entry-title">{edu.schoolname || ""}</div>
                        <div className="entry-date">
                          {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
                        </div>
                      </div>
                      {(edu.location || edu.degree || formattedGrade) && (
                        <div className="entry-subtitle">
                          {[edu.location, edu.degree].filter(Boolean).join(" - ")}
                          {formattedGrade && ` • ${formattedGrade}`}
                        </div>
                      )}
                      {edu.text && (
                        <div className="entry-content" dangerouslySetInnerHTML={{ __html: edu.text.replace(/<[^>]*>/g, "") }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
              <div className="website-block">
                <div className="section-title">Websites &amp; Social Media</div>
                {finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
                  <div key={item.id || i} className="website-item">
                    {item.websiteUrl && (
                      <div>
                        <div className="website-label">Website:</div>
                        <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="website-link">{item.websiteUrl}</a>
                      </div>
                    )}
                    {item.socialMedia && (
                      <div style={{ marginTop: "4px" }}>
                        <div className="website-label">Social Media:</div>
                        <a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="website-link">{item.socialMedia}</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) && (
              <div style={{ marginTop: "6px" }}>
                {finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
                  <div key={section.id || i} style={{ marginBottom: "6px" }}>
                    {section.name && <div className="section-title">{section.name}</div>}
                    {section.description && (
                      <div className="entry-content" dangerouslySetInnerHTML={{ __html: section.description.replace(/<[^>]*>/g, "") }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateTwo;