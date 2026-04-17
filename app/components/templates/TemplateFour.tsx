// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { Finalize, ResumeProps } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

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

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     languages:
//       isFinalizeData(finalize) && Array.isArray(finalize.languages)
//         ? finalize.languages
//         : [],
//     certifications:
//       isFinalizeData(finalize) &&
//       Array.isArray(finalize.certificationsAndLicenses)
//         ? finalize.certificationsAndLicenses
//         : [],
//     hobbies:
//       isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
//         ? finalize.hobbiesAndInterests
//         : [],
//     awards:
//       isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
//         ? finalize.awardsAndHonors
//         : [],
//     websites:
//       isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia)
//         ? finalize.websitesAndSocialMedia
//         : [],
//     references:
//       isFinalizeData(finalize) && Array.isArray(finalize.references)
//         ? finalize.references
//         : [],
//     customSection:
//       isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//         ? finalize.customSection
//         : [],
//   };

//   const skillPct = (level: any) =>
//     level ? `${(Number(level) / 5) * 100}%` : "0%";

//   /* ======================================================
//      SHARED CSS — used by both JSX preview + generateHTML
//      No Tailwind, no @import, explicit font-family everywhere,
//      global p/li reset to prevent PDF spacing blowout
//   ====================================================== */
//   const styles = `
//     /* All rules scoped to .t4-resume  so nothing leaks to the host website */

//     /* body styles intentionally omitted — applied in generateHTML only to avoid leaking into host website */

//     /* Scoped resets — only affect elements inside the resume */
//     .t4-resume  * {
//       box-sizing: border-box;
//     }

//     .t4-resume  p,
//     .t4-resume  div,
//     .t4-resume  span,
//     .t4-resume  h2,
//     .t4-resume  h3,
//     .t4-resume  i,
//     .t4-resume  a {
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* Reset <p> margins inside resume only */
//     .t4-resume  p {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     .t4-resume  ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume  ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume  li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     /* ── CONTAINER ── */
//     .t4-resume  {
//       width: 210mm;
//       min-height: 297mm;
//       padding: 5mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       text-align: left;
//     }


//       .t4-resume.is-preview {
//        transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm; 
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
// }

//     /* ── HEADER ── */
//      .t4-resume .header-block {
//       text-align: center;
//       margin-bottom: 6px;
//     }

//     .t4-resume .header-name {
//       font-size: 27px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 0.02em;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .t4-resume .header-jobtitle {
//       font-size: 12px;
//       font-weight: 400;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 4px;
//     }

//     .t4-resume .header-links {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 16px;
//       margin-bottom: 4px;
//     }

//     .t4-resume .header-link {
//       font-size: 13px;
//       font-weight: 600;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 2px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t4-resume .header-divider {
//       border: none;
//       border-top: 2px solid #000;
//       margin: 4px 0;
//     }

//     .t4-resume .header-contact-row {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 6px;
//       font-size: 13px;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       flex-wrap: wrap;
//       padding: 3px 0;
//     }

//     /* ── SECTION TITLE ── */
//     .t4-resume .section-title {
//       font-size: 17px;
//       font-weight: 700;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//       margin-bottom: 4px;
//       margin-top: 10px;
//     }

//     /* ── ENTRY ── */
//     .t4-resume .entry-block {
//       margin-bottom: 12px;
//     }

//     .t4-resume .entry-heading {
//       font-size: 15px;
//       font-weight: 600;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//       margin-top: 4px;
//       margin-bottom: 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .entry-heading-muted {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .t4-resume .entry-date {
//       font-size: 13px;
//       color: #4b5563;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-top: 2px;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t4-resume .entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding-top: 4px;
//       padding-left: 24px;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .entry-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .t4-resume .entry-content ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume .entry-content ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .t4-resume .entry-content li {
//       margin: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     /* ── SKILLS GRID ── */
//     .t4-resume .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       column-gap: 32px;
//       row-gap: 10px;
//       margin-top: 6px;
//     }

//     .t4-resume .skill-name {
//       font-size: 13px;
//       color: #4b5563;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//       word-wrap: break-word;
//     }

//     .t4-resume .skill-bar-wrap {
//       height: 4px;
//       width: 100%;
//       background: #d1d5db;
//       border-radius: 9999px;
//       overflow: hidden;
//     }

//     .t4-resume .skill-bar-fill {
//       height: 100%;
//       background: #0c0c1e;
//       border-radius: 9999px;
//     }

//     /* ── EXTRA CONTENT ── */
//     .t4-resume .extra-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding: 4px 0;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t4-resume .extra-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t4-resume .extra-content div {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     /* ── WEBSITES ── */
//     .t4-resume .website-label {
//       font-size: 13px;
//       font-weight: 600;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .t4-resume .website-link {
//       font-size: 13px;
//       color: #374151;
//       text-decoration: underline;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 5mm;
//       }
//       @page :first { margin-top: 0; }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t4-resume  {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .t4-resume .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .t4-resume .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — mirrors JSX exactly, no Tailwind
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t4-resume ">

//   <!-- HEADER -->
//   <div class="header-block">
//     <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${contact?.jobTitle ? `<div class="header-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
//     ${
//       linkedinUrl?.trim() || contact?.portfolio?.trim()
//         ? `
//     <div class="header-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
//       ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="header-link">Portfolio</a>` : ""}
//     </div>`
//         : ""
//     }
//   </div>

//   <hr class="header-divider"/>

//   <div class="header-contact-row">
//     ${addressStr ? `<span>${addressStr}</span>` : ""}
//     ${contact?.phone ? `<span> • ${contact.phone}</span>` : ""}
//     ${contact?.email ? `<span> • ${contact.email}</span>` : ""}
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section-title">Summary</div>
//   <div class="extra-content">${stripHtml(summary)}</div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences?.length > 0
//       ? `
//   <div class="section-title">Experience</div>
//   ${experiences
//     .map((exp) => {
//       const start = formatMonthYear(exp.startDate, true);
//       const end = exp.endDate
//         ? formatMonthYear(exp.endDate, true)
//         : exp.startDate
//           ? "Present"
//           : "";
//       return `
//   <div class="entry-block">
//     ${
//       exp.jobTitle || exp.employer || exp.location
//         ? `
//     <div class="entry-heading">
//       ${exp.jobTitle || ""}
//       ${exp.employer ? `<span class="entry-heading-muted"> — ${exp.employer}</span>` : ""}
//       ${exp.location ? `<span class="entry-heading-muted"> — ${exp.location}</span>` : ""}
//     </div>`
//         : ""
//     }
//     <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//     ${exp.text ? `<div class="entry-content">${stripHtml(exp.text)}</div>` : ""}
//   </div>`;
//     })
//     .join("")}`
//       : ""
//   }

//   <!-- EDUCATION -->
//   ${
//     educations?.length > 0
//       ? `
//   <div class="section-title">Education</div>
//   ${educations
//     .map((edu) => {
//       const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" — ");
//       return `
//   <div class="entry-block">
//     ${
//       edu.schoolname || edu.degree || edu.location
//         ? `
//     <div class="entry-heading">
//       ${edu.schoolname || ""}
//       ${edu.degree ? `<span class="entry-heading-muted"> — ${edu.degree}</span>` : ""}
//       ${edu.location ? `<span class="entry-heading-muted"> — ${edu.location}</span>` : ""}
//     </div>`
//         : ""
//     }
//     ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//     ${edu.text ? `<div class="entry-content">${stripHtml(edu.text)}</div>` : ""}
//   </div>`;
//     })
//     .join("")}`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${
//     skills.length > 0
//       ? `
//   <div class="section-title">Skills</div>
//   <div class="skills-grid">
//     ${skills
//       .map(
//         (s) => `
//     <div>
//       <div class="skill-name">${s.skill || ""}</div>
//       ${s.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- LANGUAGES -->
//   ${
//     fin.languages.some((l) => l.name?.trim())
//       ? `
//   <div class="section-title">Languages</div>
//   <div class="skills-grid">
//     ${fin.languages
//       .filter((l) => l.name?.trim())
//       .map(
//         (l) => `
//     <div>
//       <div class="skill-name">${l.name}</div>
//       ${l.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       ? `
//   <div class="section-title">Certifications and Licenses</div>
//   <div class="extra-content">
//     ${fin.certifications
//       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       ? `
//   <div class="section-title">Hobbies and Interests</div>
//   <div class="extra-content">
//     ${fin.hobbies
//       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       ? `
//   <div class="section-title">Awards and Honors</div>
//   <div class="extra-content">
//     ${fin.awards
//       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//       ? `
//   <div class="section-title">Websites and Social Media</div>
//   <div class="extra-content">
//     ${fin.websites
//       .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//       .map(
//         (i) => `
//     <div style="margin-bottom:6px">
//       ${i.websiteUrl ? `<div><span class="website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a></div>` : ""}
//       ${i.socialMedia ? `<div><span class="website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a></div>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       ? `
//   <div class="section-title">References</div>
//   <div class="extra-content">
//     ${fin.references
//       .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//       .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${fin.customSection
//     .filter((s) => s?.name?.trim() || s?.description?.trim())
//     .map(
//       (s) => `
//   <div>
//     ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="extra-content">${stripHtml(s.description)}</div>` : ""}
//   </div>`,
//     )
//     .join("")}

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
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );
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

//   const stripHtmlJSX = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

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
//         // className="t4-resume"
//         className={`t4-resume  ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto",           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
// }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-name">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//           </div>
//           {contact?.jobTitle && (
//             <div className="header-jobtitle">
//               {getJobTitle(contact.jobTitle)}
//             </div>
//           )}
//           {(linkedinUrl?.trim() || contact?.portfolio?.trim()) && (
//             <div className="header-links">
//               {linkedinUrl?.trim() && (
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
//               {contact?.portfolio?.trim() && (
//                 <a
//                   href={
//                     contact.portfolio.startsWith("http")
//                       ? contact.portfolio
//                       : `https://${contact.portfolio}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           )}
//         </div>

//         <hr className="header-divider" />

//         <div className="header-contact-row">
//           {[
//             contact?.address,
//             contact?.city,
//             contact?.postcode,
//             contact?.country,
//           ].filter(Boolean).length > 0 && (
//             <span>
//               {[
//                 contact?.address,
//                 contact?.city,
//                 contact?.postcode,
//                 contact?.country,
//               ]
//                 .filter(Boolean)
//                 .join(", ")}
//             </span>
//           )}
//           {contact?.phone && <span> • {contact.phone}</span>}
//           {contact?.email && <span> • {contact.email}</span>}
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <>
//             <div className="section-title">Summary</div>
//             <div className="extra-content">{stripHtmlJSX(summary)}</div>
//           </>
//         )}

//         {/* EXPERIENCE */}
//         {experiences?.length > 0 && (
//           <>
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, index) => (
//               <div key={exp.id || index} className="entry-block">
//                 {(exp.jobTitle || exp.employer || exp.location) && (
//                   <div className="entry-heading">
//                     {exp.jobTitle || ""}
//                     {exp.employer && (
//                       <span className="entry-heading-muted">
//                         {" "}
//                         — {exp.employer}
//                       </span>
//                     )}
//                     {exp.location && (
//                       <span className="entry-heading-muted">
//                         {" "}
//                         — {exp.location}
//                       </span>
//                     )}
//                   </div>
//                 )}
//                 <div className="entry-date">
//                   <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                   {exp.startDate && (exp.endDate || true) && <span> - </span>}
//                   {exp.endDate ? (
//                     <MonthYearDisplay value={exp.endDate} shortYear={true} />
//                   ) : (
//                     exp.startDate && <span>Present</span>
//                   )}
//                 </div>
//                 {exp.text && (
//                   <div className="entry-content">{stripHtmlJSX(exp.text)}</div>
//                 )}
//               </div>
//             ))}
//           </>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <>
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu.id || index} className="entry-block">
//                 {(edu.schoolname || edu.degree || edu.location) && (
//                   <div className="entry-heading">
//                     {edu.schoolname || ""}
//                     {edu.degree && (
//                       <span className="entry-heading-muted">
//                         {" "}
//                         — {edu.degree}
//                       </span>
//                     )}
//                     {edu.location && (
//                       <span className="entry-heading-muted">
//                         {" "}
//                         — {edu.location}
//                       </span>
//                     )}
//                   </div>
//                 )}
//                 {(edu.startDate || edu.endDate) && (
//                   <div className="entry-date">
//                     {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
//                   </div>
//                 )}
//                 {edu.text && (
//                   <div className="entry-content">{stripHtmlJSX(edu.text)}</div>
//                 )}
//               </div>
//             ))}
//           </>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <>
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, index) => (
//                 <div key={skill.id || index}>
//                   <div className="skill-name">{skill.skill || ""}</div>
//                   {skill.level && (
//                     <div className="skill-bar-wrap">
//                       <div
//                         className="skill-bar-fill"
//                         style={{ width: skillPct(skill.level) }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* LANGUAGES */}
//         {fin.languages.some((l) => l.name?.trim()) && (
//           <>
//             <div className="section-title">Languages</div>
//             <div className="skills-grid">
//               {fin.languages
//                 .filter((l) => l.name?.trim())
//                 .map((l, i) => (
//                   <div key={l._id || i}>
//                     <div className="skill-name">{l.name}</div>
//                     {l.level && (
//                       <div className="skill-bar-wrap">
//                         <div
//                           className="skill-bar-fill"
//                           style={{ width: skillPct(l.level) }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </>
//         )}

//         {/* CERTIFICATIONS */}
//         {fin.certifications.some((i) =>
//           i.name?.replace(/<[^>]*>/g, "").trim(),
//         ) && (
//           <>
//             <div className="section-title">Certifications and Licenses</div>
//             <div className="extra-content">
//               {fin.certifications
//                 .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                 .map((item, i) => (
//                   <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
//                 ))}
//             </div>
//           </>
//         )}

//         {/* HOBBIES */}
//         {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <>
//             <div className="section-title">Hobbies and Interests</div>
//             <div className="extra-content">
//               {fin.hobbies
//                 .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                 .map((item, i) => (
//                   <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
//                 ))}
//             </div>
//           </>
//         )}

//         {/* AWARDS */}
//         {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <>
//             <div className="section-title">Awards and Honors</div>
//             <div className="extra-content">
//               {fin.awards
//                 .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                 .map((item, i) => (
//                   <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
//                 ))}
//             </div>
//           </>
//         )}

//         {/* WEBSITES */}
//         {fin.websites.some(
//           (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//         ) && (
//           <>
//             <div className="section-title">Websites and Social Media</div>
//             <div className="extra-content">
//               {fin.websites
//                 .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//                 .map((item, i) => (
//                   <div key={item.id || i} style={{ marginBottom: "6px" }}>
//                     {item.websiteUrl && (
//                       <div>
//                         <span className="website-label">Website URL: </span>
//                         <a
//                           href={
//                             item.websiteUrl.startsWith("http")
//                               ? item.websiteUrl
//                               : `https://${item.websiteUrl}`
//                           }
//                           target="_blank"
//                           rel="noreferrer"
//                           className="website-link"
//                         >
//                           {item.websiteUrl}
//                         </a>
//                       </div>
//                     )}
//                     {item.socialMedia && (
//                       <div>
//                         <span className="website-label">
//                           Social Media URL:{" "}
//                         </span>
//                         <a
//                           href={
//                             item.socialMedia.startsWith("http")
//                               ? item.socialMedia
//                               : `https://${item.socialMedia}`
//                           }
//                           target="_blank"
//                           rel="noreferrer"
//                           className="website-link"
//                         >
//                           {item.socialMedia}
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </>
//         )}

//         {/* REFERENCES */}
//         {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <>
//             <div className="section-title">References</div>
//             <div className="extra-content">
//               {fin.references
//                 .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
//                 .map((item, i) => (
//                   <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
//                 ))}
//             </div>
//           </>
//         )}

//         {/* CUSTOM SECTIONS */}
//         {fin.customSection
//           .filter((s) => s?.name?.trim() || s?.description?.trim())
//           .map((section, i) => (
//             <div key={section.id || i}>
//               {section.name && (
//                 <div className="section-title">{section.name}</div>
//               )}
//               {section.description && (
//                 <div className="extra-content">
//                   {stripHtmlJSX(section.description)}
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default TemplateFour;









"use client";

import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
import { Finalize, ResumeProps } from "@/app/types/context.types";
import { usePathname } from "next/navigation";

const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
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
  const linkedinUrl = contact?.linkedin;

  const getJobTitle = (jobTitle: any): string => {
    if (!jobTitle) return "";
    if (typeof jobTitle === "string") return jobTitle;
    if (typeof jobTitle === "object" && jobTitle !== null)
      return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
    return "";
  };

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const fin = {
    languages:
      isFinalizeData(finalize) && Array.isArray(finalize.languages)
        ? finalize.languages
        : [],
    certifications:
      isFinalizeData(finalize) &&
      Array.isArray(finalize.certificationsAndLicenses)
        ? finalize.certificationsAndLicenses
        : [],
    hobbies:
      isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
        ? finalize.hobbiesAndInterests
        : [],
    awards:
      isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
        ? finalize.awardsAndHonors
        : [],
    websites:
      isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia)
        ? finalize.websitesAndSocialMedia
        : [],
    references:
      isFinalizeData(finalize) && Array.isArray(finalize.references)
        ? finalize.references
        : [],
    customSection:
      isFinalizeData(finalize) && Array.isArray(finalize.customSection)
        ? finalize.customSection
        : [],
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
      return (
        <>
          <div className="section-title">Skills</div>
          <div className="skills-container">
            {skills.map((category: any) => (
              <div key={category.id} className="skill-category">
                <div className="skill-category-title">{category.title}</div>
                <div className="skills-list">
                  {category.skills.map((skill: any) => (
                    <span key={skill.id} className="skill-item-inline">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="section-title">Skills</div>
          <div className="skills-list">
            {skills.map((skill: any, index: number) => (
              <span key={skill.id || index} className="skill-item-inline">
                {skill.name || skill.skill}
              </span>
            ))}
          </div>
        </>
      );
    }
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <>
        <div className="section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="entry-block">
            <div className="project-header">
              <div className="entry-heading">{project.title}</div>
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
              <div className="entry-content">
                {stripHtmlJSX(project.description)}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  /* ======================================================
     SHARED CSS — used by both JSX preview + generateHTML
  ====================================================== */
  const styles = `
    /* All rules scoped to .t4-resume so nothing leaks to the host website */
    .t4-resume * {
      box-sizing: border-box;
    }

    .t4-resume p,
    .t4-resume div,
    .t4-resume span,
    .t4-resume h2,
    .t4-resume h3,
    .t4-resume i,
    .t4-resume a {
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* Reset <p> margins inside resume only */
    .t4-resume p {
      margin: 0 !important;
      padding: 0 !important;
    }

    .t4-resume ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    /* ── CONTAINER ── */
    .t4-resume {
      width: 210mm;
      min-height: 297mm;
      padding: 10mm;
      box-sizing: border-box;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
    }

    .t4-resume.is-preview {
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
    .t4-resume .header-block {
      text-align: center;
      margin-bottom: 6px;
    }

    .t4-resume .header-name {
      font-size: 27px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    .t4-resume .header-jobtitle {
      font-size: 12px;
      font-weight: 400;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 4px;
    }

    .t4-resume .header-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-bottom: 4px;
    }

    .t4-resume .header-link {
      font-size: 13px;
      font-weight: 600;
      color: #000;
      text-decoration: underline;
      text-underline-offset: 2px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t4-resume .header-divider {
      border: none;
      border-top: 2px solid #000;
      margin: 4px 0;
    }

    .t4-resume .header-contact-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      flex-wrap: wrap;
      padding: 3px 0;
    }

    /* ── SECTION TITLE ── */
    .t4-resume .section-title {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-bottom: 4px;
      margin-top: 10px;
    }

    /* ── ENTRY ── */
    .t4-resume .entry-block {
      margin-bottom: 12px;
    }

    .t4-resume .entry-heading {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-top: 4px;
      margin-bottom: 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .entry-heading-muted {
      font-size: 15px;
      font-weight: 400;
      color: #6b7280;
      font-family: 'Nunito', Arial, sans-serif;
    }

    .t4-resume .entry-date {
      font-size: 13px;
      color: #4b5563;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .t4-resume .entry-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding-top: 4px;
      padding-left: 24px;
      padding-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── SKILLS (NO BACKGROUND, CLEAN STYLE) ── */
    .t4-resume .skills-container {
      margin-top: 6px;
    }

    .t4-resume .skill-category {
      margin-bottom: 12px;
    }

    .t4-resume .skill-category-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 6px;
      padding-bottom: 2px;
      border-bottom: 1px solid #e5e7eb;
    }

  .t4-resume .skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

.t4-resume .skill-item-inline {
  display: inline-block;
  font-size: 13px;
  color: #374151;
  padding: 2px 0;
}

/* Comma separator - cleaner look */
.t4-resume .skill-item-inline:not(:last-child)::after {
  content: ",";
  margin-right: 4px;
}

    /* ── PROJECTS ── */
    .t4-resume .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .t4-resume .project-links {
      display: flex;
      gap: 12px;
    }

    .t4-resume .project-link {
      font-size: 12px;
      color: #4b5563;
      text-decoration: underline;
    }

    .t4-resume .project-tech-stack {
      font-size: 12px;
      color: #6b7280;
      margin: 4px 0 4px 0;
    }

    /* ── EXTRA CONTENT ── */
    .t4-resume .extra-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding: 4px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .extra-content p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t4-resume .extra-content div {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* ── WEBSITES ── */
    .t4-resume .website-label {
      font-size: 13px;
      font-weight: 600;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t4-resume .website-link {
      font-size: 13px;
      color: #374151;
      text-decoration: underline;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      word-wrap: break-word;
    }

    /* ── PRINT ── */
    @media print {
      @page {
        size: A4;
        margin: 5mm;
      }
      @page :first { margin-top: 0; }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t4-resume {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
      }

      .t4-resume .entry-block {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .t4-resume .section-title {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  `;

  /* ======================================================
     HTML GENERATION — mirrors JSX exactly, no Tailwind
  ====================================================== */
  const generateHTML = () => {
    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postcode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";
      
      const isCategorized = isCategorizedSkills(skills);
      
      if (isCategorized) {
        return `
          <div class="section-title">Skills</div>
          <div class="skills-container">
            ${skills.map((category: any) => `
              <div class="skill-category">
                <div class="skill-category-title">${category.title}</div>
                <div class="skills-list">
                  ${category.skills.map((skill: any) => `
                    <span class="skill-item-inline">${skill.name}</span>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        return `
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${skills.map((skill: any) => `
              <span class="skill-item-inline">${skill.name || skill.skill}</span>
            `).join("")}
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";
      
      return `
        <div class="section-title">Projects</div>
        ${projects.map((project: any) => `
          <div class="entry-block">
            <div class="project-header">
              <div class="entry-heading">${project.title || ""}</div>
              <div class="project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${project.techStack && project.techStack.length > 0 ? `
              <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
            ` : ""}
            ${project.description ? `
              <div class="entry-content">${stripHtml(project.description)}</div>
            ` : ""}
          </div>
        `).join("")}
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
  <style>${styles}</style>
</head>
<body>
<div class="t4-resume">

  <!-- HEADER -->
  <div class="header-block">
    <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${contact?.jobTitle ? `<div class="header-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
    ${linkedinUrl?.trim() || contact?.portfolio?.trim() ? `
    <div class="header-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
      ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="header-link">Portfolio</a>` : ""}
    </div>` : ""}
  </div>

  <hr class="header-divider"/>

  <div class="header-contact-row">
    ${addressStr ? `<span>${addressStr}</span>` : ""}
    ${contact?.phone ? `<span> • ${contact.phone}</span>` : ""}
    ${contact?.email ? `<span> • ${contact.email}</span>` : ""}
  </div>

  <!-- SUMMARY -->
  ${summary ? `
  <div class="section-title">Summary</div>
  <div class="extra-content">${stripHtml(summary)}</div>` : ""}

  <!-- EXPERIENCE -->
  ${experiences?.length > 0 ? `
  <div class="section-title">Experience</div>
  ${experiences.map((exp) => {
    const start = formatMonthYear(exp.startDate, true);
    const end = exp.endDate ? formatMonthYear(exp.endDate, true) : exp.startDate ? "Present" : "";
    return `
  <div class="entry-block">
    ${exp.jobTitle || exp.employer || exp.location ? `
    <div class="entry-heading">
      ${exp.jobTitle || ""}
      ${exp.employer ? `<span class="entry-heading-muted"> — ${exp.employer}</span>` : ""}
      ${exp.location ? `<span class="entry-heading-muted"> — ${exp.location}</span>` : ""}
    </div>` : ""}
    <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
    ${exp.text ? `<div class="entry-content">${stripHtml(exp.text)}</div>` : ""}
  </div>`;
  }).join("")}` : ""}

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${educations?.length > 0 ? `
  <div class="section-title">Education</div>
  ${educations.map((edu) => {
    const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" — ");
    return `
  <div class="entry-block">
    ${edu.schoolname || edu.degree || edu.location ? `
    <div class="entry-heading">
      ${edu.schoolname || ""}
      ${edu.degree ? `<span class="entry-heading-muted"> — ${edu.degree}</span>` : ""}
      ${edu.location ? `<span class="entry-heading-muted"> — ${edu.location}</span>` : ""}
    </div>` : ""}
    ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
    ${edu.text ? `<div class="entry-content">${stripHtml(edu.text)}</div>` : ""}
  </div>`;
  }).join("")}` : ""}

  <!-- SKILLS (NEW STYLE - NO BACKGROUND) -->
  ${generateSkillsHTML()}

  <!-- LANGUAGES -->
  ${fin.languages.some((l) => l.name?.trim()) ? `
  <div class="section-title">Languages</div>
  <div class="skills-list">
    ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
      <span class="skill-item-inline">${l.name}${l.level ? ` (${l.level})` : ""}</span>
    `).join("")}
  </div>` : ""}

  <!-- CERTIFICATIONS -->
  ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">Certifications and Licenses</div>
  <div class="extra-content">
    ${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- HOBBIES -->
  ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">Hobbies and Interests</div>
  <div class="extra-content">
    ${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- AWARDS -->
  ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">Awards and Honors</div>
  <div class="extra-content">
    ${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- WEBSITES -->
  ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
  <div class="section-title">Websites and Social Media</div>
  <div class="extra-content">
    ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
    <div style="margin-bottom:6px">
      ${i.websiteUrl ? `<div><span class="website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a></div>` : ""}
      ${i.socialMedia ? `<div><span class="website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a></div>` : ""}
    </div>`).join("")}
  </div>` : ""}

  <!-- REFERENCES -->
  ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">References</div>
  <div class="extra-content">
    ${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- CUSTOM SECTIONS -->
  ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
  <div>
    ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="extra-content">${stripHtml(s.description)}</div>` : ""}
  </div>`).join("")}

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
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const stripHtmlJSX = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

  /* ======================================================
     JSX PREVIEW — uses same CSS classes as generateHTML
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
        className={`t4-resume ${alldata ? "is-preview" : ""}`}
        style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-block">
          <div className="header-name">
            {contact?.firstName || ""} {contact?.lastName || ""}
          </div>
          {contact?.jobTitle && (
            <div className="header-jobtitle">
              {getJobTitle(contact.jobTitle)}
            </div>
          )}
          {(linkedinUrl?.trim() || contact?.portfolio?.trim()) && (
            <div className="header-links">
              {linkedinUrl?.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  LinkedIn
                </a>
              )}
              {contact?.portfolio?.trim() && (
                <a
                  href={
                    contact.portfolio.startsWith("http")
                      ? contact.portfolio
                      : `https://${contact.portfolio}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>

        <hr className="header-divider" />

        <div className="header-contact-row">
          {[
            contact?.address,
            contact?.city,
            contact?.postcode,
            contact?.country,
          ].filter(Boolean).length > 0 && (
            <span>
              {[
                contact?.address,
                contact?.city,
                contact?.postcode,
                contact?.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}
          {contact?.phone && <span> • {contact.phone}</span>}
          {contact?.email && <span> • {contact.email}</span>}
        </div>

        {/* SUMMARY */}
        {summary && (
          <>
            <div className="section-title">Summary</div>
            <div className="extra-content">{stripHtmlJSX(summary)}</div>
          </>
        )}

        {/* EXPERIENCE */}
        {experiences?.length > 0 && (
          <>
            <div className="section-title">Experience</div>
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="entry-block">
                {(exp.jobTitle || exp.employer || exp.location) && (
                  <div className="entry-heading">
                    {exp.jobTitle || ""}
                    {exp.employer && (
                      <span className="entry-heading-muted">
                        {" "}
                        — {exp.employer}
                      </span>
                    )}
                    {exp.location && (
                      <span className="entry-heading-muted">
                        {" "}
                        — {exp.location}
                      </span>
                    )}
                  </div>
                )}
                <div className="entry-date">
                  <MonthYearDisplay value={exp.startDate} shortYear={true} />
                  {exp.startDate && (exp.endDate || true) && <span> - </span>}
                  {exp.endDate ? (
                    <MonthYearDisplay value={exp.endDate} shortYear={true} />
                  ) : (
                    exp.startDate && <span>Present</span>
                  )}
                </div>
                {exp.text && (
                  <div className="entry-content">{stripHtmlJSX(exp.text)}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* PROJECTS */}
        {renderProjects()}

        {/* EDUCATION */}
        {educations?.length > 0 && (
          <>
            <div className="section-title">Education</div>
            {educations.map((edu, index) => (
              <div key={edu.id || index} className="entry-block">
                {(edu.schoolname || edu.degree || edu.location) && (
                  <div className="entry-heading">
                    {edu.schoolname || ""}
                    {edu.degree && (
                      <span className="entry-heading-muted">
                        {" "}
                        — {edu.degree}
                      </span>
                    )}
                    {edu.location && (
                      <span className="entry-heading-muted">
                        {" "}
                        — {edu.location}
                      </span>
                    )}
                  </div>
                )}
                {(edu.startDate || edu.endDate) && (
                  <div className="entry-date">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
                  </div>
                )}
                {edu.text && (
                  <div className="entry-content">{stripHtmlJSX(edu.text)}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* SKILLS - NEW STYLE (NO BACKGROUND) */}
        {renderSkills()}

        {/* LANGUAGES */}
        {fin.languages.some((l) => l.name?.trim()) && (
          <>
            <div className="section-title">Languages</div>
            <div className="skills-list">
              {fin.languages
                .filter((l) => l.name?.trim())
                .map((l, i) => (
                  <span key={l._id || i} className="skill-item-inline">
                    {l.name}
                    {l.level && ` (${l.level})`}
                  </span>
                ))}
            </div>
          </>
        )}

        {/* CERTIFICATIONS */}
        {fin.certifications.some((i) =>
          i.name?.replace(/<[^>]*>/g, "").trim(),
        ) && (
          <>
            <div className="section-title">Certifications and Licenses</div>
            <div className="extra-content">
              {fin.certifications
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
                ))}
            </div>
          </>
        )}

        {/* HOBBIES */}
        {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">Hobbies and Interests</div>
            <div className="extra-content">
              {fin.hobbies
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
                ))}
            </div>
          </>
        )}

        {/* AWARDS */}
        {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">Awards and Honors</div>
            <div className="extra-content">
              {fin.awards
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
                ))}
            </div>
          </>
        )}

        {/* WEBSITES */}
        {fin.websites.some(
          (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
        ) && (
          <>
            <div className="section-title">Websites and Social Media</div>
            <div className="extra-content">
              {fin.websites
                .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
                .map((item, i) => (
                  <div key={item.id || i} style={{ marginBottom: "6px" }}>
                    {item.websiteUrl && (
                      <div>
                        <span className="website-label">Website URL: </span>
                        <a
                          href={
                            item.websiteUrl.startsWith("http")
                              ? item.websiteUrl
                              : `https://${item.websiteUrl}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="website-link"
                        >
                          {item.websiteUrl}
                        </a>
                      </div>
                    )}
                    {item.socialMedia && (
                      <div>
                        <span className="website-label">
                          Social Media URL:{" "}
                        </span>
                        <a
                          href={
                            item.socialMedia.startsWith("http")
                              ? item.socialMedia
                              : `https://${item.socialMedia}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="website-link"
                        >
                          {item.socialMedia}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}

        {/* REFERENCES */}
        {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">References</div>
            <div className="extra-content">
              {fin.references
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
                ))}
            </div>
          </>
        )}

        {/* CUSTOM SECTIONS */}
        {fin.customSection
          .filter((s) => s?.name?.trim() || s?.description?.trim())
          .map((section, i) => (
            <div key={section.id || i}>
              {section.name && (
                <div className="section-title">{section.name}</div>
              )}
              {section.description && (
                <div className="extra-content">
                  {stripHtmlJSX(section.description)}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default TemplateFour;