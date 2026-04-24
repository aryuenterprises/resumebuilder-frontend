// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
//   Skill,
// } from "@/app/types/context.types";

// /* ======================================================
//    SHARED CSS — scoped to .t6-resume, no leaks.
//    No min-height so PDF never forces a second page.
//    No Tailwind CDN — all styles defined here so
//    preview and downloaded PDF are pixel-identical.
// ====================================================== */
// const styles = `
//   .t6-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//     display: flex;
//     min-height: 297mm;

//   }

//     .t6-resume.is-preview {
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

//   .t6-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* ── LEFT COLUMN ── */
//  .t6-resume .t6-left {
//     width: 40%;
//     padding: 20px;
//     background-color: #f3f4f6;
//     border-radius: 16px 0 0 0;
//     flex-shrink: 0;
//   }

//   .t6-resume .t6-name {
//     font-size: 28px;
//     text-transform: uppercase;
//     color: #4b5563;
//     margin-bottom: 4px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.2;
//   }

//   .t6-resume .t6-jobtitle {
//     font-size: 14px;
//     color: #4b5563;
//     margin-bottom: 8px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 8px;
//   }

//   .t6-resume .t6-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: #4b5563;
//   }

//   /* ── LEFT SECTION HEADING ── */
//   .t6-resume .t6-lsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 12px;
//   }

//  .t6-resume .t6-divider-sm {
//     border: none;
//     border-top: 1px solid #6b7280;
//     margin-bottom: 8px;
//   }

//   /* ── CONTACT ITEMS ── */
//  .t6-resume .t6-contact-row {
//     display: flex;
//     align-items: flex-start;
//     gap: 6px;
//     padding: 4px 0;
//   }

//   .t6-resume .t6-icon-wrap {
//     width: 20px;
//     height: 20px;
//     background: #111827;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//     font-size: 9px;
//     color: white;
//     margin-top: 1px;
//   }

//   .t6-resume .t6-contact-text {
//     font-size: 13px;
//     color: #4b5563;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.4;
//   }

//   /* ── SKILL BARS ── */
//     .t6-resume .t6-skill-name {
//     font-size: 13px;
//     color: #1f2937;
//     margin-bottom: 3px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//  .t6-resume .t6-bar-track {
//     height: 4px;
//     width: 100%;
//     background: #d1d5db;
//     border-radius: 9999px;
//     overflow: hidden;
//     margin-bottom: 8px;
//   }

//  .t6-resume .t6-bar-fill {
//     height: 100%;
//     background: #0c0c1e;
//     border-radius: 9999px;
//   }

//   /* ── LANG GRID ── */
//  .t6-resume .t6-lang-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     column-gap: 16px;
//     row-gap: 8px;
//     margin-top: 8px;
//   }

//  .t6-resume .t6-lang-grid > div {
//     min-width: 0;
//   }

//   /* ── EXTRA TEXT (certs, hobbies, awards) ── */
//   .t6-resume .t6-extra {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── RIGHT COLUMN ── */
//   .t6-resume .t6-right {
//     width: 60%;
//     padding-left: 16px;
//     padding-right: 4px;
//   }

//   /* ── RIGHT SECTION HEADING ── */
//   .t6-resume .t6-rsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 10px;
//   }

//   .t6-resume .t6-divider-md {
//     border: none;
//     border-top: 2px solid #d1d5db;
//     margin-bottom: 8px;
//   }

//   /* ── ENTRY ── */
//   .t6-resume .t6-entry {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-top: 6px;
//   }

//   .t6-resume .t6-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t6-resume .t6-entry-date {
//     font-size: 13px;
//     color: #4b5563;
//     margin-top: 3px;
//   }

//   .t6-resume .t6-entry-content {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SUMMARY ── */
//   .t6-resume .t6-summary {
//     padding-top: 8px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//   /* ── WEBSITES ── */
//   .t6-resume .t6-website-item {
//     margin-bottom: 8px;
//   }

//   .t6-resume .t6-website-label {
//     font-size: 13px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-website-link {
//     font-size: 13px;
//     color: #111827;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t6-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t6-resume .t6-left {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t6-resume .t6-entry { page-break-inside: avoid; break-inside: avoid; }
//     .t6-resume .t6-rsection { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context?.contact || ({} as Contact);
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
//   const summary = alldata?.summary || context?.summary || "";

//   const languages = Array.isArray(finalize?.languages)
//     ? finalize.languages
//     : [];
//   const certificationsAndLicenses = Array.isArray(
//     finalize?.certificationsAndLicenses,
//   )
//     ? finalize.certificationsAndLicenses
//     : [];
//   const hobbiesAndInterests = Array.isArray(finalize?.hobbiesAndInterests)
//     ? finalize.hobbiesAndInterests
//     : [];
//   const awardsAndHonors = Array.isArray(finalize?.awardsAndHonors)
//     ? finalize.awardsAndHonors
//     : [];
//   const websitesAndSocialMedia = Array.isArray(finalize?.websitesAndSocialMedia)
//     ? finalize.websitesAndSocialMedia
//     : [];
//   const references = Array.isArray(finalize?.references)
//     ? finalize.references
//     : [];
//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const skillPct = (level: number | null | undefined) =>
//     `${((Number(level) || 0) / 5) * 100}%`;

//   const hasText = (v?: string | null) => !!v?.replace(/<[^>]*>/g, "").trim();

//   const fmtDate = (val?: string | null, short = true): string => {
//     if (!val) return "";
//     try {
//       return formatMonthYear(val, short);
//     } catch {
//       return val;
//     }
//   };

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   const jobTitle = contact?.jobTitle
//     ? typeof contact.jobTitle === "string"
//       ? contact.jobTitle
//       : (contact.jobTitle as any)?.name || ""
//     : "";

//   /* ======================================================
//      HTML GENERATION — uses same `styles` string as preview
//   ====================================================== */
//   const generateHTML = () => `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t6-resume">

//   <!-- LEFT COLUMN -->
//   <div class="t6-left">

//     <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${jobTitle ? `<div class="t6-jobtitle">${jobTitle}</div>` : ""}

//     <div class="t6-links">
//       ${contact?.linkedin?.trim() ? `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t6-link">LinkedIn</a>` : ""}
//       ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t6-link">Portfolio</a>` : ""}
//     </div>

//     <div class="t6-lsection">Details</div>
//     <hr class="t6-divider-sm"/>

//     ${
//       contact?.email
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">✉</div>
//       <div class="t6-contact-text">${contact.email}</div>
//     </div>`
//         : ""
//     }

//     ${
//       contact?.phone
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">✆</div>
//       <div class="t6-contact-text">${contact.phone}</div>
//     </div>`
//         : ""
//     }

//     ${
//       addressParts
//         ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">⌖</div>
//       <div class="t6-contact-text">${addressParts}</div>
//     </div>`
//         : ""
//     }

//     ${
//       skills.filter((s) => s.skill?.trim()).length > 0
//         ? `
//     <div class="t6-lsection">Skills</div>
//     <hr class="t6-divider-sm"/>
//     ${skills
//       .filter((s) => s.skill?.trim())
//       .map(
//         (skill) => `
//     <div>
//       <div class="t6-skill-name">${skill.skill}</div>
//       ${skill.level ? `<div class="t6-bar-track"><div class="t6-bar-fill" style="width:${skillPct(Number(skill.level))}"></div></div>` : ""}
//     </div>`,
//       )
//       .join("")}`
//         : ""
//     }

//     ${
//       languages.filter((l) => l.name?.trim()).length > 0
//         ? `
//     <div class="t6-lsection">Languages</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-lang-grid">
//       ${languages
//         .filter((l) => l.name?.trim())
//         .map(
//           (lang) => `
//       <div>
//         <div class="t6-skill-name">${lang.name}</div>
//         ${lang.level ? `<div class="t6-bar-track"><div class="t6-bar-fill" style="width:${skillPct(Number(lang.level))}"></div></div>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0
//         ? `
//     <div class="t6-lsection">Certifications and Licenses</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-extra">
//       ${certificationsAndLicenses
//         .filter((i) => hasText(i.name))
//         .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0
//         ? `
//     <div class="t6-lsection">Hobbies and Interests</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-extra">
//       ${hobbiesAndInterests
//         .filter((i) => hasText(i.name))
//         .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       awardsAndHonors.filter((i) => hasText(i.name)).length > 0
//         ? `
//     <div class="t6-lsection">Awards and Honors</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-extra">
//       ${awardsAndHonors
//         .filter((i) => hasText(i.name))
//         .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//         .join("")}
//     </div>`
//         : ""
//     }

//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t6-right">

//     ${
//       summary
//         ? `
//     <div class="t6-rsection">Summary</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-summary">${summary.replace(/<[^>]*>/g, "")}</div>`
//         : ""
//     }

//     ${
//       experiences.length > 0
//         ? `
//     <div class="t6-rsection">Experience</div>
//     <hr class="t6-divider-md"/>
//     ${experiences
//       .map((exp) => {
//         const start = fmtDate(exp.startDate);
//         const end = exp.endDate
//           ? fmtDate(exp.endDate)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t6-entry">
//       ${
//         exp.jobTitle || exp.employer || exp.location
//           ? `
//       <div class="t6-entry-title">
//         ${exp.jobTitle || ""}
//         ${exp.employer ? `<span class="t6-entry-title-muted"> — ${exp.employer}</span>` : ""}
//         ${exp.location ? `<span class="t6-entry-title-muted"> — ${exp.location}</span>` : ""}
//       </div>`
//           : ""
//       }
//       ${start || end ? `<div class="t6-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
//       ${exp.text ? `<div class="t6-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${
//       educations.length > 0
//         ? `
//     <div class="t6-rsection">Education</div>
//     <hr class="t6-divider-md"/>
//     ${educations
//       .map(
//         (edu) => `
//     <div class="t6-entry">
//       ${
//         edu.schoolname || edu.degree || edu.location
//           ? `
//       <div class="t6-entry-title">
//         ${edu.schoolname || ""}
//         ${edu.degree ? `<span class="t6-entry-title-muted"> — ${edu.degree}</span>` : ""}
//         ${edu.location ? `<span class="t6-entry-title-muted"> — ${edu.location}</span>` : ""}
//       </div>`
//           : ""
//       }
//       ${edu.startDate || edu.endDate ? `<div class="t6-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
//       ${edu.text ? `<div class="t6-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`,
//       )
//       .join("")}`
//         : ""
//     }

//     ${
//       websitesAndSocialMedia.filter(
//         (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//       ).length > 0
//         ? `
//     <div class="t6-rsection">Websites and Social Media</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-extra">
//       ${websitesAndSocialMedia
//         .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//         .map(
//           (i) => `
//       <div class="t6-website-item">
//         ${i.websiteUrl ? `<div class="t6-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t6-website-link">${i.websiteUrl}</a>` : ""}
//         ${i.socialMedia ? `<div class="t6-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t6-website-link">${i.socialMedia}</a>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       references.filter((i) => hasText(i.name)).length > 0
//         ? `
//     <div class="t6-rsection">References</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-extra">
//       ${references
//         .filter((i) => hasText(i.name))
//         .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
//     ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//     ${s.description ? `<div class="t6-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`,
//       )
//       .join("")}

//   </div>
// </div>
// </body>
// </html>`;

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

//   /* ======================================================
//      JSX PREVIEW — same .t6-* classes, identical output
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

//       {/* minHeight on outer wrapper only — keeps A4 card look in browser */}
//       <div
//         style={{          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : ""
// }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         <div className={`t6-resume ${alldata ? 'is-preview' : ''}`}
// >
//           {/* LEFT COLUMN */}
//           <div className="t6-left">
//             <div className="t6-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {jobTitle && <div className="t6-jobtitle">{jobTitle}</div>}

//             <div className="t6-links">
//               {contact?.linkedin?.trim() && (
//                 <a
//                   href={
//                     contact.linkedin.startsWith("http")
//                       ? contact.linkedin
//                       : `https://${contact.linkedin}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t6-link"
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
//                   className="t6-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>

//             <div className="t6-lsection">Details</div>
//             <hr className="t6-divider-sm" />

//             {contact?.email && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <FaEnvelope />
//                 </div>
//                 <div className="t6-contact-text">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <FaPhoneAlt />
//                 </div>
//                 <div className="t6-contact-text">{contact.phone}</div>
//               </div>
//             )}
//             {addressParts && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <FaMapMarkerAlt />
//                 </div>
//                 <div className="t6-contact-text">{addressParts}</div>
//               </div>
//             )}

//             {skills.filter((s) => s.skill?.trim()).length > 0 && (
//               <>
//                 <div className="t6-lsection">Skills</div>
//                 <hr className="t6-divider-sm" />
//                 {skills
//                   .filter((s) => s.skill?.trim())
//                   .map((skill, i) => (
//                     <div key={skill.id || i}>
//                       <div className="t6-skill-name">{skill.skill}</div>
//                       {skill.level && (
//                         <div className="t6-bar-track">
//                           <div
//                             className="t6-bar-fill"
//                             style={{ width: skillPct(Number(skill.level)) }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </>
//             )}

//             {languages.filter((l) => l.name?.trim()).length > 0 && (
//               <>
//                 <div className="t6-lsection">Languages</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-lang-grid">
//                   {languages
//                     .filter((l) => l.name?.trim())
//                     .map((lang, i) => (
//                       <div key={(lang as any)._id || i}>
//                         <div className="t6-skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="t6-bar-track">
//                             <div
//                               className="t6-bar-fill"
//                               style={{ width: skillPct(Number(lang.level)) }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               </>
//             )}

//             {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
//               0 && (
//               <>
//                 <div className="t6-lsection">Certifications and Licenses</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-extra">
//                   {certificationsAndLicenses
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}

//             {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
//               <>
//                 <div className="t6-lsection">Hobbies and Interests</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-extra">
//                   {hobbiesAndInterests
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}

//             {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
//               <>
//                 <div className="t6-lsection">Awards and Honors</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-extra">
//                   {awardsAndHonors
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="t6-right">
//             {summary && (
//               <>
//                 <div className="t6-rsection">Summary</div>
//                 <hr className="t6-divider-md" />
//                 <div
//                   className="t6-summary"
//                   dangerouslySetInnerHTML={{ __html: summary }}
//                 />
//               </>
//             )}

//             {experiences.length > 0 && (
//               <>
//                 <div className="t6-rsection">Experience</div>
//                 <hr className="t6-divider-md" />
//                 {experiences.map((exp, i) => {
//                   const start = fmtDate(exp.startDate);
//                   const end = exp.endDate
//                     ? fmtDate(exp.endDate)
//                     : exp.startDate
//                       ? "Present"
//                       : "";
//                   return (
//                     <div key={exp.id || i} className="t6-entry">
//                       {(exp.jobTitle || exp.employer || exp.location) && (
//                         <div className="t6-entry-title">
//                           {exp.jobTitle || ""}
//                           {exp.employer && (
//                             <span className="t6-entry-title-muted">
//                               {" "}
//                               — {exp.employer}
//                             </span>
//                           )}
//                           {exp.location && (
//                             <span className="t6-entry-title-muted">
//                               {" "}
//                               — {exp.location}
//                             </span>
//                           )}
//                         </div>
//                       )}
//                       {(start || end) && (
//                         <div className="t6-entry-date">
//                           {start}
//                           {start && end ? " - " : ""}
//                           {end}
//                         </div>
//                       )}
//                       {exp.text && (
//                         <div
//                           className="t6-entry-content"
//                           dangerouslySetInnerHTML={{ __html: exp.text }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {educations.length > 0 && (
//               <>
//                 <div className="t6-rsection">Education</div>
//                 <hr className="t6-divider-md" />
//                 {educations.map((edu, i) => (
//                   <div key={edu.id || i} className="t6-entry">
//                     {(edu.schoolname || edu.degree || edu.location) && (
//                       <div className="t6-entry-title">
//                         {edu.schoolname || ""}
//                         {edu.degree && (
//                           <span className="t6-entry-title-muted">
//                             {" "}
//                             — {edu.degree}
//                           </span>
//                         )}
//                         {edu.location && (
//                           <span className="t6-entry-title-muted">
//                             {" "}
//                             — {edu.location}
//                           </span>
//                         )}
//                       </div>
//                     )}
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="t6-entry-date">
//                         {[edu.startDate, edu.endDate]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     )}
//                     {edu.text && (
//                       <div
//                         className="t6-entry-content"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}

//             {websitesAndSocialMedia.filter(
//               (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//             ).length > 0 && (
//               <>
//                 <div className="t6-rsection">Websites and Social Media</div>
//                 <hr className="t6-divider-md" />
//                 <div className="t6-extra">
//                   {websitesAndSocialMedia
//                     .filter(
//                       (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//                     )
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         className="t6-website-item"
//                       >
//                         {item.websiteUrl && (
//                           <div>
//                             <div className="t6-website-label">Website:</div>
//                             <a
//                               href={
//                                 item.websiteUrl.startsWith("http")
//                                   ? item.websiteUrl
//                                   : `https://${item.websiteUrl}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="t6-website-link"
//                             >
//                               {item.websiteUrl}
//                             </a>
//                           </div>
//                         )}
//                         {item.socialMedia && (
//                           <div style={{ marginTop: "4px" }}>
//                             <div className="t6-website-label">
//                               Social Media:
//                             </div>
//                             <a
//                               href={
//                                 item.socialMedia.startsWith("http")
//                                   ? item.socialMedia
//                                   : `https://${item.socialMedia}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="t6-website-link"
//                             >
//                               {item.socialMedia}
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               </>
//             )}

//             {references.filter((i) => hasText(i.name)).length > 0 && (
//               <>
//                 <div className="t6-rsection">References</div>
//                 <hr className="t6-divider-md" />
//                 <div className="t6-extra">
//                   {references
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}

//             {customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, i) => (
//                 <div key={(section as any).id || i}>
//                   {section.name && (
//                     <>
//                       <div className="t6-rsection">{section.name}</div>
//                       <hr className="t6-divider-md" />
//                     </>
//                   )}
//                   {section.description && (
//                     <div
//                       className="t6-extra"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateSix;

// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";

// /* ======================================================
//    SHARED CSS — scoped to .t6-resume, no leaks.
// ====================================================== */
// const styles = `
//   .t6-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//     display: flex;
//     min-height: 297mm;
//   }

//   .t6-resume.is-preview {
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

//   .t6-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* ── LEFT COLUMN ── */
//   .t6-resume .t6-left {
//     width: 40%;
//     padding: 20px;
//     background-color: #f3f4f6;
//     border-radius: 16px 0 0 0;
//     flex-shrink: 0;
//   }

//   .t6-resume .t6-name {
//     font-size: 28px;
//     text-transform: uppercase;
//     color: #4b5563;
//     margin-bottom: 4px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.2;
//   }

//   .t6-resume .t6-jobtitle {
//     font-size: 14px;
//     color: #4b5563;
//     margin-bottom: 8px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 8px;
//   }

//   .t6-resume .t6-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: #4b5563;
//   }

//   /* ── LEFT SECTION HEADING ── */
//   .t6-resume .t6-lsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 12px;
//   }

//   .t6-resume .t6-divider-sm {
//     border: none;
//     border-top: 1px solid #6b7280;
//     margin-bottom: 8px;
//   }

//   /* ── CONTACT ITEMS ── */
//   .t6-resume .t6-contact-row {
//     display: flex;
//     align-items: flex-start;
//     gap: 6px;
//     padding: 4px 0;
//   }

//   .t6-resume .t6-icon-wrap {
//     width: 20px;
//     height: 20px;
//     background: #111827;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//     font-size: 9px;
//     color: white;
//     margin-top: 1px;
//   }

//   .t6-resume .t6-contact-text {
//     font-size: 13px;
//     color: #4b5563;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     line-height: 1.4;
//   }

//   /* ── SIMPLE SKILLS (VERTICAL LIST - FLEX COLUMN) ── */
//   .t6-resume .t6-skills-simple {
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     margin-top: 4px;
//   }

//   .t6-resume .t6-skill-simple-item {
//     font-size: 13px;
//     color: #374151;
//     padding: 2px 0;
//   }

//   /* ── CATEGORIZED SKILLS (HORIZONTAL ROW - FLEX WRAP) ── */
//   .t6-resume .t6-skills-categorized {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//     margin-top: 4px;
//   }

//   .t6-resume .t6-skill-category {
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-skill-category-title {
//     font-size: 13px;
//     font-weight: 600;
//     color: #111827;
//     margin-bottom: 6px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #d1d5db;
//   }

//   .t6-resume .t6-skill-category-items {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//   }

//   .t6-resume .t6-skill-category-item {
//     display: inline-block;
//     font-size: 12px;
//     color: #374151;
//     background: #e5e7eb;
//     padding: 4px 10px;
//     border-radius: 20px;
//   }

//   /* ── LANGUAGES (SIMPLE GRID) ── */
//   .t6-resume .t6-lang-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     column-gap: 16px;
//     row-gap: 8px;
//     margin-top: 8px;
//   }

//   .t6-resume .t6-lang-grid > div {
//     min-width: 0;
//   }

//   .t6-resume .t6-skill-name {
//     font-size: 13px;
//     color: #1f2937;
//     margin-bottom: 3px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PROJECTS ── */
//   .t6-resume .t6-project-item {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t6-resume .t6-project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t6-resume .t6-project-link {
//     font-size: 12px;
//     color: #4b5563;
//     text-decoration: underline;
//   }

//   .t6-resume .t6-project-tech {
//     font-size: 12px;
//     color: #6b7280;
//     margin: 4px 0;
//   }

//   /* ── EXTRA TEXT (certs, hobbies, awards) ── */
//   .t6-resume .t6-extra {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── RIGHT COLUMN ── */
//   .t6-resume .t6-right {
//     width: 60%;
//     padding-left: 16px;
//     padding-right: 4px;
//   }

//   /* ── RIGHT SECTION HEADING ── */
//   .t6-resume .t6-rsection {
//     font-size: 13px;
//     font-weight: 500;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     color: #4b5563;
//     padding-bottom: 6px;
//     margin-top: 10px;
//   }

//   .t6-resume .t6-divider-md {
//     border: none;
//     border-top: 2px solid #d1d5db;
//     margin-bottom: 8px;
//   }

//   /* ── ENTRY ── */
//   .t6-resume .t6-entry {
//     margin-bottom: 14px;
//   }

//   .t6-resume .t6-entry-title {
//     font-size: 15px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-top: 6px;
//   }

//   .t6-resume .t6-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t6-resume .t6-entry-date {
//     font-size: 13px;
//     color: #4b5563;
//     margin-top: 3px;
//   }

//   .t6-resume .t6-entry-content {
//     padding-top: 6px;
//     padding-bottom: 4px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SUMMARY ── */
//   .t6-resume .t6-summary {
//     padding-top: 8px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//   /* ── WEBSITES ── */
//   .t6-resume .t6-website-item {
//     margin-bottom: 8px;
//   }

//   .t6-resume .t6-website-label {
//     font-size: 13px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t6-resume .t6-website-link {
//     font-size: 13px;
//     color: #111827;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t6-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t6-resume .t6-left {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t6-resume .t6-entry { page-break-inside: avoid; break-inside: avoid; }
//     .t6-resume .t6-rsection { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context?.contact || ({} as Contact);
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
//   const summary = alldata?.summary || context?.summary || "";

//   const languages = Array.isArray(finalize?.languages)
//     ? finalize.languages
//     : [];
//   const certificationsAndLicenses = Array.isArray(
//     finalize?.certificationsAndLicenses,
//   )
//     ? finalize.certificationsAndLicenses
//     : [];
//   const hobbiesAndInterests = Array.isArray(finalize?.hobbiesAndInterests)
//     ? finalize.hobbiesAndInterests
//     : [];
//   const awardsAndHonors = Array.isArray(finalize?.awardsAndHonors)
//     ? finalize.awardsAndHonors
//     : [];
//   const websitesAndSocialMedia = Array.isArray(finalize?.websitesAndSocialMedia)
//     ? finalize.websitesAndSocialMedia
//     : [];
//   const references = Array.isArray(finalize?.references)
//     ? finalize.references
//     : [];
//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const hasText = (v?: string | null) => !!v?.replace(/<[^>]*>/g, "").trim();

//   const fmtDate = (val?: string | null, short = true): string => {
//     if (!val) return "";
//     try {
//       return formatMonthYear(val, short);
//     } catch {
//       return val;
//     }
//   };

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   const jobTitle = contact?.jobTitle
//     ? typeof contact.jobTitle === "string"
//       ? contact.jobTitle
//       : (contact.jobTitle as any)?.name || ""
//     : "";

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
//       // CATEGORIZED SKILLS - Horizontal chips (flex row wrap)
//       return (
//         <>
//           <div className="t6-lsection">Skills</div>
//           <hr className="t6-divider-sm" />
//           <div className="t6-skills-categorized">
//             {skills.map((category: any) => (
//               <div key={category.id} className="t6-skill-category">
//                 <div className="t6-skill-category-title">{category.title}</div>
//                 <div className="t6-skill-category-items">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="t6-skill-category-item">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     } else {
//       // SIMPLE SKILLS - Vertical list (flex column)
//       return (
//         <>
//           <div className="t6-lsection">Skills</div>
//           <hr className="t6-divider-sm" />
//           <div className="t6-skills-simple">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="t6-skill-simple-item">
//                 {skill.name || skill.skill}
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     }
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <>
//         <div className="t6-rsection">Projects</div>
//         <hr className="t6-divider-md" />
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t6-project-item">
//             <div className="t6-project-header">
//               <div className="t6-entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t6-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t6-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t6-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t6-project-tech">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t6-entry-content"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   /* ======================================================
//      HTML GENERATION — uses same `styles` string as preview
//   ====================================================== */
//   const generateHTML = () => {
//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         // CATEGORIZED SKILLS - Horizontal chips
//         return `
//           <div class="t6-lsection">Skills</div>
//           <hr class="t6-divider-sm"/>
//           <div class="t6-skills-categorized">
//             ${skills.map((category: any) => `
//               <div class="t6-skill-category">
//                 <div class="t6-skill-category-title">${category.title}</div>
//                 <div class="t6-skill-category-items">
//                   ${category.skills.map((skill: any) => `
//                     <span class="t6-skill-category-item">${skill.name}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         // SIMPLE SKILLS - Vertical list
//         return `
//           <div class="t6-lsection">Skills</div>
//           <hr class="t6-divider-sm"/>
//           <div class="t6-skills-simple">
//             ${skills.map((skill: any) => `
//               <div class="t6-skill-simple-item">${skill.name || skill.skill}</div>
//             `).join("")}
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t6-rsection">Projects</div>
//         <hr class="t6-divider-md"/>
//         ${projects.map((project: any) => `
//           <div class="t6-project-item">
//             <div class="t6-project-header">
//               <div class="t6-entry-title">${project.title || ""}</div>
//               <div class="t6-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t6-project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t6-project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${project.techStack && project.techStack.length > 0 ? `
//               <div class="t6-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             ` : ""}
//             ${project.description ? `
//               <div class="t6-entry-content">${project.description.replace(/<[^>]*>/g, "")}</div>
//             ` : ""}
//           </div>
//         `).join("")}
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t6-resume">

//   <!-- LEFT COLUMN -->
//   <div class="t6-left">

//     <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     ${jobTitle ? `<div class="t6-jobtitle">${jobTitle}</div>` : ""}

//     <div class="t6-links">
//       ${contact?.linkedin?.trim() ? `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t6-link">LinkedIn</a>` : ""}
//       ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t6-link">Portfolio</a>` : ""}
//     </div>

//     <div class="t6-lsection">Details</div>
//     <hr class="t6-divider-sm"/>

//     ${contact?.email ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">✉</div>
//       <div class="t6-contact-text">${contact.email}</div>
//     </div>` : ""}

//     ${contact?.phone ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">✆</div>
//       <div class="t6-contact-text">${contact.phone}</div>
//     </div>` : ""}

//     ${addressParts ? `
//     <div class="t6-contact-row">
//       <div class="t6-icon-wrap">⌖</div>
//       <div class="t6-contact-text">${addressParts}</div>
//     </div>` : ""}

//     ${generateSkillsHTML()}

//     ${languages.filter((l) => l.name?.trim()).length > 0 ? `
//     <div class="t6-lsection">Languages</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-lang-grid">
//       ${languages.filter((l) => l.name?.trim()).map((lang) => `
//       <div>
//         <div class="t6-skill-name">${lang.name}</div>
//       </div>`).join("")}
//     </div>` : ""}

//     ${certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t6-lsection">Certifications and Licenses</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-extra">
//       ${certificationsAndLicenses.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t6-lsection">Hobbies and Interests</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-extra">
//       ${hobbiesAndInterests.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${awardsAndHonors.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t6-lsection">Awards and Honors</div>
//     <hr class="t6-divider-sm"/>
//     <div class="t6-extra">
//       ${awardsAndHonors.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t6-right">

//     ${summary ? `
//     <div class="t6-rsection">Summary</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-summary">${summary.replace(/<[^>]*>/g, "")}</div>` : ""}

//     ${experiences.length > 0 ? `
//     <div class="t6-rsection">Experience</div>
//     <hr class="t6-divider-md"/>
//     ${experiences.map((exp) => {
//       const start = fmtDate(exp.startDate);
//       const end = exp.endDate ? fmtDate(exp.endDate) : exp.startDate ? "Present" : "";
//       return `
//     <div class="t6-entry">
//       ${exp.jobTitle || exp.employer || exp.location ? `
//       <div class="t6-entry-title">
//         ${exp.jobTitle || ""}
//         ${exp.employer ? `<span class="t6-entry-title-muted"> — ${exp.employer}</span>` : ""}
//         ${exp.location ? `<span class="t6-entry-title-muted"> — ${exp.location}</span>` : ""}
//       </div>` : ""}
//       ${start || end ? `<div class="t6-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
//       ${exp.text ? `<div class="t6-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`;
//     }).join("")}` : ""}

//     ${generateProjectsHTML()}

//     ${educations.length > 0 ? `
//     <div class="t6-rsection">Education</div>
//     <hr class="t6-divider-md"/>
//     ${educations.map((edu) => `
//     <div class="t6-entry">
//       ${edu.schoolname || edu.degree || edu.location ? `
//       <div class="t6-entry-title">
//         ${edu.schoolname || ""}
//         ${edu.degree ? `<span class="t6-entry-title-muted"> — ${edu.degree}</span>` : ""}
//         ${edu.location ? `<span class="t6-entry-title-muted"> — ${edu.location}</span>` : ""}
//       </div>` : ""}
//       ${edu.startDate || edu.endDate ? `<div class="t6-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
//       ${edu.text ? `<div class="t6-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`).join("")}` : ""}

//     ${websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).length > 0 ? `
//     <div class="t6-rsection">Websites and Social Media</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-extra">
//       ${websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div class="t6-website-item">
//         ${i.websiteUrl ? `<div class="t6-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t6-website-link">${i.websiteUrl}</a>` : ""}
//         ${i.socialMedia ? `<div class="t6-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t6-website-link">${i.socialMedia}</a>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     ${references.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t6-rsection">References</div>
//     <hr class="t6-divider-md"/>
//     <div class="t6-extra">
//       ${references.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//     ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
//     ${s.description ? `<div class="t6-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`).join("")}

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

//   /* ======================================================
//      JSX PREVIEW — same .t6-* classes, identical output
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

//       <div style={{ boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         <div className={`t6-resume ${alldata ? 'is-preview' : ''}`}>
//           {/* LEFT COLUMN */}
//           <div className="t6-left">
//             <div className="t6-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {jobTitle && <div className="t6-jobtitle">{jobTitle}</div>}

//             <div className="t6-links">
//               {contact?.linkedin?.trim() && (
//                 <a
//                   href={
//                     contact.linkedin.startsWith("http")
//                       ? contact.linkedin
//                       : `https://${contact.linkedin}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t6-link"
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
//                   className="t6-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>

//             <div className="t6-lsection">Details</div>
//             <hr className="t6-divider-sm" />

//             {contact?.email && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <FaEnvelope />
//                 </div>
//                 <div className="t6-contact-text">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <FaPhoneAlt />
//                 </div>
//                 <div className="t6-contact-text">{contact.phone}</div>
//               </div>
//             )}
//             {addressParts && (
//               <div className="t6-contact-row">
//                 <div className="t6-icon-wrap">
//                   <FaMapMarkerAlt />
//                 </div>
//                 <div className="t6-contact-text">{addressParts}</div>
//               </div>
//             )}

//             {/* SKILLS - Different styles based on format */}
//             {renderSkills()}

//             {/* LANGUAGES */}
//             {languages.filter((l) => l.name?.trim()).length > 0 && (
//               <>
//                 <div className="t6-lsection">Languages</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-lang-grid">
//                   {languages
//                     .filter((l) => l.name?.trim())
//                     .map((lang, i) => (
//                       <div key={(lang as any)._id || i}>
//                         <div className="t6-skill-name">{lang.name}</div>
//                       </div>
//                     ))}
//                 </div>
//               </>
//             )}

//             {/* CERTIFICATIONS */}
//             {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
//               0 && (
//               <>
//                 <div className="t6-lsection">Certifications and Licenses</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-extra">
//                   {certificationsAndLicenses
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}

//             {/* HOBBIES */}
//             {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
//               <>
//                 <div className="t6-lsection">Hobbies and Interests</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-extra">
//                   {hobbiesAndInterests
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}

//             {/* AWARDS */}
//             {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
//               <>
//                 <div className="t6-lsection">Awards and Honors</div>
//                 <hr className="t6-divider-sm" />
//                 <div className="t6-extra">
//                   {awardsAndHonors
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="t6-right">
//             {/* SUMMARY */}
//             {summary && (
//               <>
//                 <div className="t6-rsection">Summary</div>
//                 <hr className="t6-divider-md" />
//                 <div
//                   className="t6-summary"
//                   dangerouslySetInnerHTML={{ __html: summary }}
//                 />
//               </>
//             )}

//             {/* EXPERIENCE */}
//             {experiences.length > 0 && (
//               <>
//                 <div className="t6-rsection">Experience</div>
//                 <hr className="t6-divider-md" />
//                 {experiences.map((exp, i) => {
//                   const start = fmtDate(exp.startDate);
//                   const end = exp.endDate
//                     ? fmtDate(exp.endDate)
//                     : exp.startDate
//                       ? "Present"
//                       : "";
//                   return (
//                     <div key={exp.id || i} className="t6-entry">
//                       {(exp.jobTitle || exp.employer || exp.location) && (
//                         <div className="t6-entry-title">
//                           {exp.jobTitle || ""}
//                           {exp.employer && (
//                             <span className="t6-entry-title-muted">
//                               {" "}
//                               — {exp.employer}
//                             </span>
//                           )}
//                           {exp.location && (
//                             <span className="t6-entry-title-muted">
//                               {" "}
//                               — {exp.location}
//                             </span>
//                           )}
//                         </div>
//                       )}
//                       {(start || end) && (
//                         <div className="t6-entry-date">
//                           {start}
//                           {start && end ? " - " : ""}
//                           {end}
//                         </div>
//                       )}
//                       {exp.text && (
//                         <div
//                           className="t6-entry-content"
//                           dangerouslySetInnerHTML={{ __html: exp.text }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </>
//             )}

//             {/* PROJECTS */}
//             {renderProjects()}

//             {/* EDUCATION */}
//             {educations.length > 0 && (
//               <>
//                 <div className="t6-rsection">Education</div>
//                 <hr className="t6-divider-md" />
//                 {educations.map((edu, i) => (
//                   <div key={edu.id || i} className="t6-entry">
//                     {(edu.schoolname || edu.degree || edu.location) && (
//                       <div className="t6-entry-title">
//                         {edu.schoolname || ""}
//                         {edu.degree && (
//                           <span className="t6-entry-title-muted">
//                             {" "}
//                             — {edu.degree}
//                           </span>
//                         )}
//                         {edu.location && (
//                           <span className="t6-entry-title-muted">
//                             {" "}
//                             — {edu.location}
//                           </span>
//                         )}
//                       </div>
//                     )}
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="t6-entry-date">
//                         {[edu.startDate, edu.endDate]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     )}
//                     {edu.text && (
//                       <div
//                         className="t6-entry-content"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* WEBSITES */}
//             {websitesAndSocialMedia.filter(
//               (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//             ).length > 0 && (
//               <>
//                 <div className="t6-rsection">Websites and Social Media</div>
//                 <hr className="t6-divider-md" />
//                 <div className="t6-extra">
//                   {websitesAndSocialMedia
//                     .filter(
//                       (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//                     )
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         className="t6-website-item"
//                       >
//                         {item.websiteUrl && (
//                           <div>
//                             <div className="t6-website-label">Website:</div>
//                             <a
//                               href={
//                                 item.websiteUrl.startsWith("http")
//                                   ? item.websiteUrl
//                                   : `https://${item.websiteUrl}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="t6-website-link"
//                             >
//                               {item.websiteUrl}
//                             </a>
//                           </div>
//                         )}
//                         {item.socialMedia && (
//                           <div style={{ marginTop: "4px" }}>
//                             <div className="t6-website-label">
//                               Social Media:
//                             </div>
//                             <a
//                               href={
//                                 item.socialMedia.startsWith("http")
//                                   ? item.socialMedia
//                                   : `https://${item.socialMedia}`
//                               }
//                               target="_blank"
//                               rel="noreferrer"
//                               className="t6-website-link"
//                             >
//                               {item.socialMedia}
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               </>
//             )}

//             {/* REFERENCES */}
//             {references.filter((i) => hasText(i.name)).length > 0 && (
//               <>
//                 <div className="t6-rsection">References</div>
//                 <hr className="t6-divider-md" />
//                 <div className="t6-extra">
//                   {references
//                     .filter((i) => hasText(i.name))
//                     .map((item, i) => (
//                       <div
//                         key={(item as any).id || i}
//                         dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                       />
//                     ))}
//                 </div>
//               </>
//             )}

//             {/* CUSTOM SECTIONS */}
//             {customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, i) => (
//                 <div key={(section as any).id || i}>
//                   {section.name && (
//                     <>
//                       <div className="t6-rsection">{section.name}</div>
//                       <hr className="t6-divider-md" />
//                     </>
//                   )}
//                   {section.description && (
//                     <div
//                       className="t6-extra"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateSix;

"use client";

import React, { useContext } from "react";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear } from "@/app/utils";
import { usePathname } from "next/navigation";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
import { motion } from "framer-motion";


/* ======================================================
   SHARED CSS — scoped to .t6-resume, no leaks.
====================================================== */
const styles = `
  .t6-resume {
    width: 210mm;
    padding: 5mm;
    box-sizing: border-box;
    background: white;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #374151;
    display: flex;
    min-height: 297mm;
  }

  .t6-resume.is-preview {
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

  .t6-resume * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── LEFT COLUMN ── */
  .t6-resume .t6-left {
    width: 40%;
    padding: 20px;
    background-color: #f3f4f6;
    border-radius: 16px 0 0 0;
    flex-shrink: 0;
  }

  .t6-resume .t6-name {
    font-size: 28px;
    text-transform: uppercase;
    color: #4b5563;
    margin-bottom: 4px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.2;
  }

  .t6-resume .t6-jobtitle {
    font-size: 14px;
    color: #4b5563;
    margin-bottom: 8px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t6-resume .t6-links {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .t6-resume .t6-link {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: #4b5563;
  }

  /* ── LEFT SECTION HEADING ── */
  .t6-resume .t6-lsection {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #4b5563;
    padding-bottom: 6px;
    margin-top: 12px;
  }

  .t6-resume .t6-divider-sm {
    border: none;
    border-top: 1px solid #6b7280;
    margin-bottom: 8px;
  }

  /* ── CONTACT ITEMS ── */
  .t6-resume .t6-contact-row {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    padding: 4px 0;
  }

  .t6-resume .t6-icon-wrap {
    width: 20px;
    height: 20px;
    background: #111827;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 9px;
    color: white;
    margin-top: 1px;
  }

  .t6-resume .t6-contact-text {
    font-size: 13px;
    color: #4b5563;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }

  /* ── EDUCATION GRADE ── */
  .t6-resume .t6-education-grade {
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
    font-weight: 500;
  }

  /* ── SIMPLE SKILLS (VERTICAL LIST - FLEX COLUMN) ── */
  .t6-resume .t6-skills-simple {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  .t6-resume .t6-skill-simple-item {
    font-size: 13px;
    color: #374151;
    padding: 2px 0;
  }

  /* ── CATEGORIZED SKILLS (HORIZONTAL ROW - FLEX WRAP) ── */
  .t6-resume .t6-skills-categorized {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 4px;
  }

  .t6-resume .t6-skill-category {
    margin-bottom: 4px;
  }

  .t6-resume .t6-skill-category-title {
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 6px;
    padding-bottom: 2px;
    border-bottom: 1px solid #d1d5db;
  }

  .t6-resume .t6-skill-category-items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .t6-resume .t6-skill-category-item {
    display: inline-block;
    font-size: 12px;
    color: #374151;
    background: #e5e7eb;
    padding: 4px 10px;
    border-radius: 20px;
  }

  /* ── LANGUAGES (SIMPLE GRID) ── */
  .t6-resume .t6-lang-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    row-gap: 8px;
    margin-top: 8px;
  }

  .t6-resume .t6-lang-grid > div {
    min-width: 0;
  }

  .t6-resume .t6-skill-name {
    font-size: 13px;
    color: #1f2937;
    margin-bottom: 3px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── PROJECTS ── */
  .t6-resume .t6-project-item {
    margin-bottom: 14px;
  }

  .t6-resume .t6-project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t6-resume .t6-project-links {
    display: flex;
    gap: 12px;
  }

  .t6-resume .t6-project-link {
    font-size: 12px;
    color: #4b5563;
    text-decoration: underline;
  }

  .t6-resume .t6-project-tech {
    font-size: 12px;
    color: #6b7280;
    margin: 4px 0;
  }

  /* ── EXTRA TEXT (certs, hobbies, awards) ── */
  .t6-resume .t6-extra {
    padding-top: 6px;
    padding-bottom: 4px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── RIGHT COLUMN ── */
  .t6-resume .t6-right {
    width: 60%;
    padding-left: 16px;
    padding-right: 4px;
  }

  /* ── RIGHT SECTION HEADING ── */
  .t6-resume .t6-rsection {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #4b5563;
    padding-bottom: 6px;
    margin-top: 10px;
  }

  .t6-resume .t6-divider-md {
    border: none;
    border-top: 2px solid #d1d5db;
    margin-bottom: 8px;
  }

  /* ── ENTRY ── */
  .t6-resume .t6-entry {
    margin-bottom: 14px;
  }

  .t6-resume .t6-entry-title {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin-top: 6px;
  }

  .t6-resume .t6-entry-title-muted {
    font-weight: 400;
    color: #6b7280;
  }

  .t6-resume .t6-entry-date {
    font-size: 13px;
    color: #4b5563;
    margin-top: 3px;
  }

  .t6-resume .t6-entry-content {
    padding-top: 6px;
    padding-bottom: 4px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t6-resume .t6-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
  .t6-resume .t6-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
  .t6-resume .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
  .t6-resume .t6-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

  /* ── SUMMARY ── */
  .t6-resume .t6-summary {
    padding-top: 8px;
    padding-bottom: 10px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t6-resume .t6-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

  /* ── WEBSITES ── */
  .t6-resume .t6-website-item {
    margin-bottom: 8px;
  }

  .t6-resume .t6-website-label {
    font-size: 13px;
    font-weight: 600;
    color: #111827;
  }

  .t6-resume .t6-website-link {
    font-size: 13px;
    color: #111827;
    text-decoration: underline;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── PRINT ── */
  @media print {
    @page { size: A4; margin: 5mm; }
    .t6-resume {
      width: 100% !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
    .t6-resume .t6-left {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t6-resume .t6-entry { page-break-inside: avoid; break-inside: avoid; }
    .t6-resume .t6-rsection { page-break-after: avoid; break-after: avoid; }
  }
`;

const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context?.contact || ({} as Contact);
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
  const summary = alldata?.summary || context?.summary || "";

  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  const languages = Array.isArray(finalize?.languages)
    ? finalize.languages
    : [];
  const certificationsAndLicenses = Array.isArray(
    finalize?.certificationsAndLicenses,
  )
    ? finalize.certificationsAndLicenses
    : [];
  const hobbiesAndInterests = Array.isArray(finalize?.hobbiesAndInterests)
    ? finalize.hobbiesAndInterests
    : [];
  const awardsAndHonors = Array.isArray(finalize?.awardsAndHonors)
    ? finalize.awardsAndHonors
    : [];
  const websitesAndSocialMedia = Array.isArray(finalize?.websitesAndSocialMedia)
    ? finalize.websitesAndSocialMedia
    : [];
  const references = Array.isArray(finalize?.references)
    ? finalize.references
    : [];
  const customSection = Array.isArray(finalize?.customSection)
    ? finalize.customSection
    : [];

  const hasText = (v?: string | null) => !!v?.replace(/<[^>]*>/g, "").trim();

  const fmtDate = (val?: string | null, short = true): string => {
    if (!val) return "";
    try {
      return formatMonthYear(val, short);
    } catch {
      return val;
    }
  };

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
  const formatGrade = (grade: string, gradeType?: string) => {
    if (!grade) return "";

    if (gradeType === "cgpa") {
      return `CGPA: ${grade}`;
    } else if (gradeType === "percentage") {
      return `Percentage: ${grade}%`;
    }

    const numGrade = parseFloat(grade);
    if (!isNaN(numGrade)) {
      if (numGrade <= 10 && grade.includes(".")) {
        return `CGPA: ${grade}`;
      } else if (numGrade > 10) {
        return `Percentage: ${grade}%`;
      }
    }

    return grade;
  };

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const jobTitle = contact?.jobTitle
    ? typeof contact.jobTitle === "string"
      ? contact.jobTitle
      : (contact.jobTitle as any)?.name || ""
    : "";

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
      // CATEGORIZED SKILLS - Horizontal chips (flex row wrap)
      return (
        <>
          <div className="t6-lsection">Skills</div>
          <hr className="t6-divider-sm" />
          <div className="t6-skills-categorized">
            {skills.map((category: any) => (
              <div key={category.id} className="t6-skill-category">
                <div className="t6-skill-category-title">{category.title}</div>
                <div className="t6-skill-category-items">
                  {category.skills.map((skill: any) => (
                    <span key={skill.id} className="t6-skill-category-item">
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
      // SIMPLE SKILLS - Vertical list (flex column)
      return (
        <>
          <div className="t6-lsection">Skills</div>
          <hr className="t6-divider-sm" />
          <div className="t6-skills-simple">
            {skills.map((skill: any, index: number) => (
              <div key={skill.id || index} className="t6-skill-simple-item">
                {skill.name || skill.skill}
              </div>
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
        <div className="t6-rsection">Projects</div>
        <hr className="t6-divider-md" />
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="t6-project-item">
            <div className="t6-project-header">
              <div className="t6-entry-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="t6-project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="t6-project-link"
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
                      className="t6-project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="t6-project-tech">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="t6-entry-content"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  /* ======================================================
     HTML GENERATION — uses same `styles` string as preview
  ====================================================== */
  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";

      const isCategorized = isCategorizedSkills(skills);

      if (isCategorized) {
        // CATEGORIZED SKILLS - Horizontal chips
        return `
          <div class="t6-lsection">Skills</div>
          <hr class="t6-divider-sm"/>
          <div class="t6-skills-categorized">
            ${skills
              .map(
                (category: any) => `
              <div class="t6-skill-category">
                <div class="t6-skill-category-title">${category.title}</div>
                <div class="t6-skill-category-items">
                  ${category.skills
                    .map(
                      (skill: any) => `
                    <span class="t6-skill-category-item">${skill.name}</span>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        `;
      } else {
        // SIMPLE SKILLS - Vertical list
        return `
          <div class="t6-lsection">Skills</div>
          <hr class="t6-divider-sm"/>
          <div class="t6-skills-simple">
            ${skills
              .map(
                (skill: any) => `
              <div class="t6-skill-simple-item">${skill.name || skill.skill}</div>
            `,
              )
              .join("")}
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="t6-rsection">Projects</div>
        <hr class="t6-divider-md"/>
        ${projects
          .map(
            (project: any) => `
          <div class="t6-project-item">
            <div class="t6-project-header">
              <div class="t6-entry-title">${project.title || ""}</div>
              <div class="t6-project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t6-project-link">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t6-project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${
              project.techStack && project.techStack.length > 0
                ? `
              <div class="t6-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
            `
                : ""
            }
            ${
              project.description
                ? `
              <div class="t6-entry-content">${project.description.replace(/<[^>]*>/g, "")}</div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    body { margin: 0; padding: 0; background: white; }
    ${styles}
  </style>
</head>
<body>
<div class="t6-resume">

  <!-- LEFT COLUMN -->
  <div class="t6-left">

    <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${jobTitle ? `<div class="t6-jobtitle">${jobTitle}</div>` : ""}

    <div class="t6-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t6-link">LinkedIn</a>` : ""}
      ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t6-link">GitHub</a>` : ""}
      ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t6-link">Portfolio</a>` : ""}
    </div>

    <div class="t6-lsection">Details</div>
    <hr class="t6-divider-sm"/>

    ${
      contact?.email
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">✉</div>
      <div class="t6-contact-text">${contact.email}</div>
    </div>`
        : ""
    }

    ${
      contact?.phone
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">✆</div>
      <div class="t6-contact-text">${contact.phone}</div>
    </div>`
        : ""
    }

    ${
      addressParts
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">⌖</div>
      <div class="t6-contact-text">${addressParts}</div>
    </div>`
        : ""
    }

    ${
      formattedDob
        ? `
    <div class="t6-contact-row">
      <div class="t6-icon-wrap">📅</div>
      <div class="t6-contact-text">${formattedDob}</div>
    </div>`
        : ""
    }

    ${generateSkillsHTML()}

    ${
      languages.filter((l) => l.name?.trim()).length > 0
        ? `
    <div class="t6-lsection">Languages</div>
    <hr class="t6-divider-sm"/>
    <div class="t6-lang-grid">
      ${languages
        .filter((l) => l.name?.trim())
        .map(
          (lang) => `
      <div>
        <div class="t6-skill-name">${lang.name}</div>
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    ${
      certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t6-lsection">Certifications and Licenses</div>
    <hr class="t6-divider-sm"/>
    <div class="t6-extra">
      ${certificationsAndLicenses
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${
      hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t6-lsection">Hobbies and Interests</div>
    <hr class="t6-divider-sm"/>
    <div class="t6-extra">
      ${hobbiesAndInterests
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${
      awardsAndHonors.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t6-lsection">Awards and Honors</div>
    <hr class="t6-divider-sm"/>
    <div class="t6-extra">
      ${awardsAndHonors
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

  </div>

  <!-- RIGHT COLUMN -->
  <div class="t6-right">

    ${
      summary
        ? `
    <div class="t6-rsection">Summary</div>
    <hr class="t6-divider-md"/>
    <div class="t6-summary">${summary.replace(/<[^>]*>/g, "")}</div>`
        : ""
    }

    ${
      experiences.length > 0
        ? `
    <div class="t6-rsection">Experience</div>
    <hr class="t6-divider-md"/>
    ${experiences
      .map((exp) => {
        const start = fmtDate(exp.startDate);
        const end = exp.endDate
          ? fmtDate(exp.endDate)
          : exp.startDate
            ? "Present"
            : "";
        return `
    <div class="t6-entry">
      ${
        exp.jobTitle || exp.employer || exp.location
          ? `
      <div class="t6-entry-title">
        ${exp.jobTitle || ""}
        ${exp.employer ? `<span class="t6-entry-title-muted"> — ${exp.employer}</span>` : ""}
        ${exp.location ? `<span class="t6-entry-title-muted"> — ${exp.location}</span>` : ""}
      </div>`
          : ""
      }
      ${start || end ? `<div class="t6-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
      ${exp.text ? `<div class="t6-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
    </div>`;
      })
      .join("")}`
        : ""
    }

    ${generateProjectsHTML()}

    ${
      educations.length > 0
        ? `
    <div class="t6-rsection">Education</div>
    <hr class="t6-divider-md"/>
    ${educations
      .map((edu) => {
        const formattedGrade = formatGrade(edu.grade || "");
        return `
    <div class="t6-entry">
      ${
        edu.schoolname || edu.degree || edu.location
          ? `
      <div class="t6-entry-title">
        ${edu.schoolname || ""}
        ${edu.degree ? `<span class="t6-entry-title-muted"> — ${edu.degree}</span>` : ""}
        ${edu.location ? `<span class="t6-entry-title-muted"> — ${edu.location}</span>` : ""}
      </div>`
          : ""
      }
      ${edu.startDate || edu.endDate ? `<div class="t6-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
      ${formattedGrade ? `<div class="t6-education-grade">${formattedGrade}</div>` : ""}
      ${edu.text ? `<div class="t6-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
    </div>`;
      })
      .join("")}`
        : ""
    }

    ${
      websitesAndSocialMedia.filter(
        (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
      ).length > 0
        ? `
    <div class="t6-rsection">Websites and Social Media</div>
    <hr class="t6-divider-md"/>
    <div class="t6-extra">
      ${websitesAndSocialMedia
        .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
        .map(
          (i) => `
      <div class="t6-website-item">
        ${i.websiteUrl ? `<div class="t6-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t6-website-link">${i.websiteUrl}</a>` : ""}
        ${i.socialMedia ? `<div class="t6-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t6-website-link">${i.socialMedia}</a>` : ""}
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    ${
      references.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t6-rsection">References</div>
    <hr class="t6-divider-md"/>
    <div class="t6-extra">
      ${references
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${customSection
      .filter((s) => s?.name?.trim() || s?.description?.trim())
      .map(
        (s) => `
    ${s.name ? `<div class="t6-rsection">${s.name}</div><hr class="t6-divider-md"/>` : ""}
    ${s.description ? `<div class="t6-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`,
      )
      .join("")}

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

  /* ======================================================
     JSX PREVIEW — same .t6-* classes, identical output
  ====================================================== */
  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  return (
    <>
  
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
        className="t6-resume"
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        <div className={`t6-resume ${alldata ? "is-preview" : ""}`}>
          {/* LEFT COLUMN */}
          <div className="t6-left">
            <div className="t6-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {jobTitle && <div className="t6-jobtitle">{jobTitle}</div>}

            <div className="t6-links">
              {linkedinUrl?.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t6-link"
                >
                  LinkedIn
                </a>
              )}
              {githubUrl?.trim() && (
                <a
                  href={
                    githubUrl.startsWith("http")
                      ? githubUrl
                      : `https://${githubUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t6-link"
                >
                  GitHub
                </a>
              )}
              {portfolioUrl?.trim() && (
                <a
                  href={
                    portfolioUrl.startsWith("http")
                      ? portfolioUrl
                      : `https://${portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t6-link"
                >
                  Portfolio
                </a>
              )}
            </div>

            <div className="t6-lsection">Details</div>
            <hr className="t6-divider-sm" />

            {contact?.email && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <FaEnvelope />
                </div>
                <div className="t6-contact-text">{contact.email}</div>
              </div>
            )}
            {contact?.phone && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <FaPhoneAlt />
                </div>
                <div className="t6-contact-text">{contact.phone}</div>
              </div>
            )}
            {addressParts && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">
                  <FaMapMarkerAlt />
                </div>
                <div className="t6-contact-text">{addressParts}</div>
              </div>
            )}
            {formattedDob && (
              <div className="t6-contact-row">
                <div className="t6-icon-wrap">📅</div>
                <div className="t6-contact-text">{formattedDob}</div>
              </div>
            )}

            {/* SKILLS - Different styles based on format */}
            {renderSkills()}

            {/* LANGUAGES */}
            {languages.filter((l) => l.name?.trim()).length > 0 && (
              <>
                <div className="t6-lsection">Languages</div>
                <hr className="t6-divider-sm" />
                <div className="t6-lang-grid">
                  {languages
                    .filter((l) => l.name?.trim())
                    .map((lang, i) => (
                      <div key={(lang as any)._id || i}>
                        <div className="t6-skill-name">{lang.name}</div>
                      </div>
                    ))}
                </div>
              </>
            )}

            {/* CERTIFICATIONS */}
            {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
              0 && (
              <>
                <div className="t6-lsection">Certifications and Licenses</div>
                <hr className="t6-divider-sm" />
                <div className="t6-extra">
                  {certificationsAndLicenses
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {/* HOBBIES */}
            {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
              <>
                <div className="t6-lsection">Hobbies and Interests</div>
                <hr className="t6-divider-sm" />
                <div className="t6-extra">
                  {hobbiesAndInterests
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {/* AWARDS */}
            {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
              <>
                <div className="t6-lsection">Awards and Honors</div>
                <hr className="t6-divider-sm" />
                <div className="t6-extra">
                  {awardsAndHonors
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="t6-right">
            {/* SUMMARY */}
            {summary && (
              <>
                <div className="t6-rsection">Summary</div>
                <hr className="t6-divider-md" />
                <div
                  className="t6-summary"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              </>
            )}

            {/* EXPERIENCE */}
            {experiences.length > 0 && (
              <>
                <div className="t6-rsection">Experience</div>
                <hr className="t6-divider-md" />
                {experiences.map((exp, i) => {
                  const start = fmtDate(exp.startDate);
                  const end = exp.endDate
                    ? fmtDate(exp.endDate)
                    : exp.startDate
                      ? "Present"
                      : "";
                  return (
                    <div key={exp._id || i} className="t6-entry">
                      {(exp.jobTitle || exp.employer || exp.location) && (
                        <div className="t6-entry-title">
                          {exp.jobTitle || ""}
                          {exp.employer && (
                            <span className="t6-entry-title-muted">
                              {" "}
                              — {exp.employer}
                            </span>
                          )}
                          {exp.location && (
                            <span className="t6-entry-title-muted">
                              {" "}
                              — {exp.location}
                            </span>
                          )}
                        </div>
                      )}
                      {(start || end) && (
                        <div className="t6-entry-date">
                          {start}
                          {start && end ? " - " : ""}
                          {end}
                        </div>
                      )}
                      {exp.text && (
                        <div
                          className="t6-entry-content"
                          dangerouslySetInnerHTML={{ __html: exp.text }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {/* PROJECTS */}
            {renderProjects()}

            {/* EDUCATION */}
            {educations.length > 0 && (
              <>
                <div className="t6-rsection">Education</div>
                <hr className="t6-divider-md" />
                {educations.map((edu, i) => {
                  const formattedGrade = formatGrade(edu.grade || "");
                  return (
                    <div key={edu._id || i} className="t6-entry">
                      {(edu.schoolname || edu.degree || edu.location) && (
                        <div className="t6-entry-title">
                          {edu.schoolname || ""}
                          {edu.degree && (
                            <span className="t6-entry-title-muted">
                              {" "}
                              — {edu.degree}
                            </span>
                          )}
                          {edu.location && (
                            <span className="t6-entry-title-muted">
                              {" "}
                              — {edu.location}
                            </span>
                          )}
                        </div>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <div className="t6-entry-date">
                          {[edu.startDate, edu.endDate]
                            .filter(Boolean)
                            .join(" — ")}
                        </div>
                      )}
                      {formattedGrade && (
                        <div className="t6-education-grade">
                          {formattedGrade}
                        </div>
                      )}
                      {edu.text && (
                        <div
                          className="t6-entry-content"
                          dangerouslySetInnerHTML={{ __html: edu.text }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {/* WEBSITES */}
            {websitesAndSocialMedia.filter(
              (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
            ).length > 0 && (
              <>
                <div className="t6-rsection">Websites and Social Media</div>
                <hr className="t6-divider-md" />
                <div className="t6-extra">
                  {websitesAndSocialMedia
                    .filter(
                      (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
                    )
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        className="t6-website-item"
                      >
                        {item.websiteUrl && (
                          <div>
                            <div className="t6-website-label">Website:</div>
                            <a
                              href={
                                item.websiteUrl.startsWith("http")
                                  ? item.websiteUrl
                                  : `https://${item.websiteUrl}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="t6-website-link"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}
                        {item.socialMedia && (
                          <div style={{ marginTop: "4px" }}>
                            <div className="t6-website-label">
                              Social Media:
                            </div>
                            <a
                              href={
                                item.socialMedia.startsWith("http")
                                  ? item.socialMedia
                                  : `https://${item.socialMedia}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="t6-website-link"
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
            {references.filter((i) => hasText(i.name)).length > 0 && (
              <>
                <div className="t6-rsection">References</div>
                <hr className="t6-divider-md" />
                <div className="t6-extra">
                  {references
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {/* CUSTOM SECTIONS */}
            {customSection
              .filter((s) => s?.name?.trim() || s?.description?.trim())
              .map((section, i) => (
                <div key={(section as any).id || i}>
                  {section.name && (
                    <>
                      <div className="t6-rsection">{section.name}</div>
                      <hr className="t6-divider-md" />
                    </>
                  )}
                  {section.description && (
                    <div
                      className="t6-extra"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateSix;
