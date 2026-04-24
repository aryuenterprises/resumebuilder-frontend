
// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear } from "@/app/utils";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
//   Skill,
// } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";

// /* ======================================================
//    SHARED CSS
//    ROOT CAUSE FIX: The unequal skill bar widths were caused
//    by scattered, inconsistent margin-left values on children:
//      .t3-section-title  → margin-left: 20px
//      .t3-entry          → margin-left: 24px  (different!)
//      .t3-summary        → margin-left: 20px
//      .t3-skills-wrap    → margin-left: 20px + margin-right: 20px
//      .t3-extra          → margin-left: 20px

//    When the grid sat inside .t3-skills-wrap with its own
//    margin-left, the 1fr columns were calculated from a
//    different origin than the section title above them,
//    causing the right column bar to appear shorter.

//    FIX: Remove ALL margin-left from every child.
//    Wrap everything in a single .t3-body { padding: 0 20px }.
//    Now every element — titles, entries, grid columns — shares
//    one identical left/right boundary. Both 1fr columns are
//    truly equal width and align perfectly with all other content.
// ====================================================== */
// const styles = `
//   .t3-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background-color: white;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;

//   }

//     .t3-resume.is-preview {
   
//           transform: scale(0.36);

//     transform-origin: top left;
//     width: 210mm; 
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
// }

//   .t3-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* Single source of truth for all horizontal indentation */
//   .t3-body {
//     padding: 0 20px;
//   }

//   /* ── HEADER ── */
//   .t3-header {
//     display: flex;
//     justify-content: space-between;
//     background-color: #878787;
//     padding: 4px;
//     border-radius: 16px;
//     color: white;
//   }

//   .t3-header-left {
//     width: 40%;
//     font-size: 27px;
//     font-weight: 500;
//     padding: 12px;
//     text-transform: uppercase;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-header-job {
//     font-size: 14px;
//     font-weight: 400;
//     text-transform: lowercase;
//     margin-top: 4px;
//   }

//   .t3-header-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     padding-bottom: 8px;
//     margin-top: 4px;
//   }

//   .t3-header-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: white;
//   }

//   .t3-header-right {
//     width: 60%;
//     padding: 12px;
//     font-size: 14px;
//   }

//   .t3-header-contact-line {
//     text-align: right;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-bottom: 2px;
//   }

//   /* ── SECTION TITLE — no margin-left (handled by .t3-body) ── */
//   .t3-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   /* ── SUMMARY — no margin-left ── */
//   .t3-summary {
//     padding-top: 6px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── ENTRY — no margin-left ── */
//   .t3-entry {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   .t3-entry-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t3-entry-date {
//     font-size: 14px;
//     color: #4b5563;
//     margin-top: 4px;
//   }

//   .t3-entry-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t3-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//   .t3-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SKILLS GRID — no margin, sits flush inside .t3-body ── */
//   .t3-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     column-gap: 24px;
//     row-gap: 10px;
//     margin-top: 8px;
//   }

//   .t3-grid > div {
//     min-width: 0;
//   }

//   .t3-skill-name {
//     font-size: 14px;
//     font-weight: 500;
//     color: #374151;
//     margin-bottom: 3px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-bar-track {
//     height: 4px;
//     width: 100%;
//     background: #d1d5db;
//     border-radius: 9999px;
//     overflow: hidden;
//   }

//   .t3-bar-fill {
//     height: 100%;
//     background: #0c0c1e;
//     border-radius: 9999px;
//   }

//   /* ── EXTRA SECTIONS — no margin-left ── */
//   .t3-extra {
//     padding-top: 4px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── WEBSITES ── */
//   .t3-website-item {
//     margin-bottom: 8px;
//   }

//   .t3-website-label {
//     font-size: 14px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-website-link {
//     font-size: 14px;
//     color: #374151;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t3-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t3-header {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t3-entry { page-break-inside: avoid; break-inside: avoid; }
//     .t3-section-title { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
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

//   /* ======================================================
//      HTML GENERATION — same styles string, preview === PDF
//   ====================================================== */
//   const generateHTML = () => {
//     const addressParts = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${contact?.linkedin?.trim() ? `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t3-header-link">LinkedIn</a>` : ""}
//         ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t3-header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">

//     ${
//       summary
//         ? `
//     <div class="t3-section-title">Summary</div>
//     <div class="t3-summary">${summary.replace(/<[^>]*>/g, "")}</div>`
//         : ""
//     }

//     ${
//       experiences.length > 0
//         ? `
//     <div class="t3-section-title">Experience</div>
//     ${experiences
//       .map((exp) => {
//         const start = fmtDate(exp.startDate);
//         const end = exp.endDate
//           ? fmtDate(exp.endDate)
//           : exp.startDate
//             ? "Present"
//             : "";
//         return `
//     <div class="t3-entry">
//       ${
//         exp.jobTitle || exp.employer || exp.location
//           ? `
//       <div class="t3-entry-title">
//         ${exp.jobTitle ? `${exp.jobTitle} ` : ""}
//         ${exp.employer ? `<span class="t3-entry-title-muted">— ${exp.employer}</span>` : ""}
//         ${exp.location ? `<span class="t3-entry-title-muted">— ${exp.location}</span>` : ""}
//       </div>`
//           : ""
//       }
//       ${start || end ? `<div class="t3-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
//       ${exp.text ? `<div class="t3-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`;
//       })
//       .join("")}`
//         : ""
//     }

//     ${
//       educations.length > 0
//         ? `
//     <div class="t3-section-title">Education</div>
//     ${educations
//       .map(
//         (edu) => `
//     <div class="t3-entry">
//       ${
//         edu.schoolname || edu.degree || edu.location
//           ? `
//       <div class="t3-entry-title">
//         ${edu.schoolname || ""}
//         ${edu.degree ? `<span class="t3-entry-title-muted"> — ${edu.degree}</span>` : ""}
//         ${edu.location ? `<span class="t3-entry-title-muted"> — ${edu.location}</span>` : ""}
//       </div>`
//           : ""
//       }
//       ${edu.startDate || edu.endDate ? `<div class="t3-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
//       ${edu.text ? `<div class="t3-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`,
//       )
//       .join("")}`
//         : ""
//     }

//     ${
//       skills.filter((s) => s.skill?.trim()).length > 0
//         ? `
//     <div class="t3-section-title">Skills</div>
//     <div class="t3-grid">
//       ${skills
//         .filter((s) => s.skill?.trim())
//         .map(
//           (skill) => `
//       <div>
//         <div class="t3-skill-name">${skill.skill}</div>
//         ${skill.level ? `<div class="t3-bar-track"><div class="t3-bar-fill" style="width:${skillPct(Number(skill.level))}"></div></div>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       languages.filter((l) => l.name?.trim()).length > 0
//         ? `
//     <div class="t3-section-title">Languages</div>
//     <div class="t3-grid">
//       ${languages
//         .filter((l) => l.name?.trim())
//         .map(
//           (lang) => `
//       <div>
//         <div class="t3-skill-name">${lang.name}</div>
//         ${lang.level ? `<div class="t3-bar-track"><div class="t3-bar-fill" style="width:${skillPct(Number(lang.level))}"></div></div>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0
//         ? `
//     <div class="t3-section-title">Certifications and Licenses</div>
//     <div class="t3-extra">
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
//     <div class="t3-section-title">Hobbies and Interests</div>
//     <div class="t3-extra">
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
//     <div class="t3-section-title">Awards and Honors</div>
//     <div class="t3-extra">
//       ${awardsAndHonors
//         .filter((i) => hasText(i.name))
//         .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       websitesAndSocialMedia.filter(
//         (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//       ).length > 0
//         ? `
//     <div class="t3-section-title">Websites and Social Media</div>
//     <div class="t3-extra">
//       ${websitesAndSocialMedia
//         .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//         .map(
//           (i) => `
//       <div class="t3-website-item">
//         ${i.websiteUrl ? `<div class="t3-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t3-website-link">${i.websiteUrl}</a>` : ""}
//         ${i.socialMedia ? `<div class="t3-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t3-website-link">${i.socialMedia}</a>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>`
//         : ""
//     }

//     ${
//       references.filter((i) => hasText(i.name)).length > 0
//         ? `
//     <div class="t3-section-title">References</div>
//     <div class="t3-extra">
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
//     ${s.name ? `<div class="t3-section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="t3-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`,
//       )
//       .join("")}

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
//      JSX PREVIEW
//   ====================================================== */
//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

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

//       <div className={`t3-resume bg-white ${alldata ? "is-preview" : ""}`} style={{          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
// }}>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t3-header">
//           <div className="t3-header-left">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//             {contact?.jobTitle && (
//               <div className="t3-header-job">
//                 {typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""}
//               </div>
//             )}
//             <div className="t3-header-links">
//               {contact?.linkedin?.trim() && (
//                 <a
//                   href={
//                     contact.linkedin.startsWith("http")
//                       ? contact.linkedin
//                       : `https://${contact.linkedin}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
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
//                   className="t3-header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="t3-header-right">
//             <div className="t3-header-contact-line">
//               {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
//             </div>
//             {addressParts && (
//               <div className="t3-header-contact-line">{addressParts}</div>
//             )}
//           </div>
//         </div>

//         {/* ALL BODY CONTENT — single .t3-body, no margin-left on any child */}
//         <div className="t3-body">
//           {summary && (
//             <>
//               <div className="t3-section-title">Summary</div>
//               <div
//                 className="t3-summary"
//                 dangerouslySetInnerHTML={{ __html: summary }}
//               />
//             </>
//           )}

//           {experiences.length > 0 && (
//             <>
//               <div className="t3-section-title">Experience</div>
//               {experiences.map((exp, i) => {
//                 const start = fmtDate(exp.startDate);
//                 const end = exp.endDate
//                   ? fmtDate(exp.endDate)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={exp.id || i} className="t3-entry">
//                     {(exp.jobTitle || exp.employer || exp.location) && (
//                       <div className="t3-entry-title">
//                         {exp.jobTitle && `${exp.jobTitle} `}
//                         {exp.employer && (
//                           <span className="t3-entry-title-muted">
//                             — {exp.employer}
//                           </span>
//                         )}
//                         {exp.location && (
//                           <span className="t3-entry-title-muted">
//                             — {exp.location}
//                           </span>
//                         )}
//                       </div>
//                     )}
//                     {(start || end) && (
//                       <div className="t3-entry-date">
//                         {start}
//                         {start && end ? " - " : ""}
//                         {end}
//                       </div>
//                     )}
//                     {exp.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{ __html: exp.text }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {educations.length > 0 && (
//             <>
//               <div className="t3-section-title">Education</div>
//               {educations.map((edu, i) => (
//                 <div key={edu.id || i} className="t3-entry">
//                   {(edu.schoolname || edu.degree || edu.location) && (
//                     <div className="t3-entry-title">
//                       {edu.schoolname || ""}
//                       {edu.degree && (
//                         <span className="t3-entry-title-muted">
//                           {" "}
//                           — {edu.degree}
//                         </span>
//                       )}
//                       {edu.location && (
//                         <span className="t3-entry-title-muted">
//                           {" "}
//                           — {edu.location}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="t3-entry-date">
//                       {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
//                     </div>
//                   )}
//                   {edu.text && (
//                     <div
//                       className="t3-entry-content"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {skills.filter((s) => s.skill?.trim()).length > 0 && (
//             <>
//               <div className="t3-section-title">Skills</div>
//               <div className="t3-grid">
//                 {skills
//                   .filter((s) => s.skill?.trim())
//                   .map((skill, i) => (
//                     <div key={skill.id || i}>
//                       <div className="t3-skill-name">{skill.skill}</div>
//                       {skill.level && (
//                         <div className="t3-bar-track">
//                           <div
//                             className="t3-bar-fill"
//                             style={{ width: skillPct(Number(skill.level)) }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}

//           {languages.filter((l) => l.name?.trim()).length > 0 && (
//             <>
//               <div className="t3-section-title">Languages</div>
//               <div className="t3-grid">
//                 {languages
//                   .filter((l) => l.name?.trim())
//                   .map((lang, i) => (
//                     <div key={(lang as any)._id || i}>
//                       <div className="t3-skill-name">{lang.name}</div>
//                       {lang.level && (
//                         <div className="t3-bar-track">
//                           <div
//                             className="t3-bar-fill"
//                             style={{ width: skillPct(Number(lang.level)) }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}

//           {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
//             0 && (
//             <>
//               <div className="t3-section-title">
//                 Certifications and Licenses
//               </div>
//               <div className="t3-extra">
//                 {certificationsAndLicenses
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Hobbies and Interests</div>
//               <div className="t3-extra">
//                 {hobbiesAndInterests
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Awards and Honors</div>
//               <div className="t3-extra">
//                 {awardsAndHonors
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {websitesAndSocialMedia.filter(
//             (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//           ).length > 0 && (
//             <>
//               <div className="t3-section-title">Websites and Social Media</div>
//               <div className="t3-extra">
//                 {websitesAndSocialMedia
//                   .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       className="t3-website-item"
//                     >
//                       {item.websiteUrl && (
//                         <div>
//                           <div className="t3-website-label">Website:</div>
//                           <a
//                             href={
//                               item.websiteUrl.startsWith("http")
//                                 ? item.websiteUrl
//                                 : `https://${item.websiteUrl}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-website-link"
//                           >
//                             {item.websiteUrl}
//                           </a>
//                         </div>
//                       )}
//                       {item.socialMedia && (
//                         <div style={{ marginTop: "4px" }}>
//                           <div className="t3-website-label">Social Media:</div>
//                           <a
//                             href={
//                               item.socialMedia.startsWith("http")
//                                 ? item.socialMedia
//                                 : `https://${item.socialMedia}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-website-link"
//                           >
//                             {item.socialMedia}
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}

//           {references.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">References</div>
//               <div className="t3-extra">
//                 {references
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, i) => (
//               <div key={(section as any).id || i}>
//                 {section.name && (
//                   <div className="t3-section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="t3-extra"
//                     dangerouslySetInnerHTML={{ __html: section.description }}
//                   />
//                 )}
//               </div>
//             ))}
//         </div>
//         {/* end .t3-body */}
//       </div>
//     </>
//   );
// };

// export default TemplateThree;









// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear } from "@/app/utils";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,

// } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";

// /* ======================================================
//    SHARED CSS
// ====================================================== */
// const styles = `
//   .t3-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background-color: white;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//   }

//   .t3-resume.is-preview {
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

//   .t3-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* Single source of truth for all horizontal indentation */
//   .t3-body {
//     padding: 0 20px;
//   }

//   /* ── HEADER ── */
//   .t3-header {
//     display: flex;
//     justify-content: space-between;
//     background-color: #878787;
//     padding: 4px;
//     border-radius: 16px;
//     color: white;
//   }

//   .t3-header-left {
//     width: 40%;
//     font-size: 27px;
//     font-weight: 500;
//     padding: 12px;
//     text-transform: uppercase;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-header-job {
//     font-size: 14px;
//     font-weight: 400;
//     text-transform: lowercase;
//     margin-top: 4px;
//   }

//   .t3-header-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     padding-bottom: 8px;
//     margin-top: 4px;
//   }

//   .t3-header-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: white;
//   }

//   .t3-header-right {
//     width: 60%;
//     padding: 12px;
//     font-size: 14px;
//   }

//   .t3-header-contact-line {
//     text-align: right;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-bottom: 2px;
//   }

//   /* ── SECTION TITLE ── */
//   .t3-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   /* ── SUMMARY ── */
//   .t3-summary {
//     padding-top: 6px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── ENTRY ── */
//   .t3-entry {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   .t3-entry-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t3-entry-date {
//     font-size: 14px;
//     color: #4b5563;
//     margin-top: 4px;
//   }

//   .t3-entry-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t3-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
//   .t3-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SKILLS (COMPACT TAGS) ── */
//   .t3-skills-block {
//     margin-top: 8px;
//     margin-bottom: 8px;
//   }

//   .t3-skills-tags {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-top: 6px;
//   }

//   .t3-skill-tag {
//     display: inline-block;
//     background: #f3f4f6;
//     padding: 4px 12px;
//     font-size: 13px;
//     color: #374151;
//     border-radius: 20px;
//     line-height: 1.4;
//   }

//   .t3-skill-category {
//     margin-bottom: 12px;
//   }

//   .t3-skill-category-title {
//     font-size: 16px;
//     font-weight: 600;
//     color: #111827;
//     margin-bottom: 8px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e5e7eb;
//   }

//   /* ── PROJECTS ── */
//   .t3-project-item {
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   .t3-project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-bottom: 4px;
//   }

//   .t3-project-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t3-project-link {
//     font-size: 12px;
//     color: #6b7280;
//     text-decoration: underline;
//   }

//   .t3-project-tech-stack {
//     font-size: 13px;
//     color: #6b7280;
//     margin: 4px 0;
//   }

//   .t3-project-description {
//     padding-top: 6px;
//     color: #374151;
//     font-size: 14px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── EXTRA SECTIONS ── */
//   .t3-extra {
//     padding-top: 4px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── WEBSITES ── */
//   .t3-website-item {
//     margin-bottom: 8px;
//   }

//   .t3-website-label {
//     font-size: 14px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-website-link {
//     font-size: 14px;
//     color: #374151;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t3-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t3-header {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t3-entry, .t3-project-item { page-break-inside: avoid; break-inside: avoid; }
//     .t3-section-title { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
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
//       return (
//         <>
//           <div className="t3-section-title">Skills</div>
//           <div className="t3-skills-block">
//             {skills.map((category: any) => (
//               <div key={category.id} className="t3-skill-category">
//                 <div className="t3-skill-category-title">{category.title}</div>
//                 <div className="t3-skills-tags">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="t3-skill-tag">
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
//       return (
//         <>
//           <div className="t3-section-title">Skills</div>
//           <div className="t3-skills-tags">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="t3-skill-tag">
//                 {skill.name || skill.skill}
//               </span>
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
//         <div className="t3-section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t3-project-item">
//             <div className="t3-project-header">
//               <div className="t3-project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t3-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t3-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t3-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t3-project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t3-project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </>
//     );
//   };

//   /* ======================================================
//      HTML GENERATION — same styles string, preview === PDF
//   ====================================================== */
//   const generateHTML = () => {
//     const addressParts = [
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
//           <div class="t3-section-title">Skills</div>
//           <div class="t3-skills-block">
//             ${skills.map((category: any) => `
//               <div class="t3-skill-category">
//                 <div class="t3-skill-category-title">${category.title}</div>
//                 <div class="t3-skills-tags">
//                   ${category.skills.map((skill: any) => `
//                     <span class="t3-skill-tag">${skill.name}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="t3-section-title">Skills</div>
//           <div class="t3-skills-tags">
//             ${skills.map((skill: any) => `
//               <span class="t3-skill-tag">${skill.name || skill.skill}</span>
//             `).join("")}
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";
      
//       return `
//         <div class="t3-section-title">Projects</div>
//         ${projects.map((project: any) => `
//           <div class="t3-project-item">
//             <div class="t3-project-header">
//               <div class="t3-project-title">${project.title || ""}</div>
//               <div class="t3-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t3-project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t3-project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${project.techStack && project.techStack.length > 0 ? `
//               <div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             ` : ""}
//             ${project.description ? `
//               <div class="t3-project-description">${project.description}</div>
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
//   <style>
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${contact?.linkedin?.trim() ? `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t3-header-link">LinkedIn</a>` : ""}
//         ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t3-header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//     </div>
//   </div>

//   <div class="t3-body">

//     ${summary ? `
//     <div class="t3-section-title">Summary</div>
//     <div class="t3-summary">${summary.replace(/<[^>]*>/g, "")}</div>` : ""}

//     ${experiences.length > 0 ? `
//     <div class="t3-section-title">Experience</div>
//     ${experiences.map((exp) => {
//       const start = fmtDate(exp.startDate);
//       const end = exp.endDate ? fmtDate(exp.endDate) : exp.startDate ? "Present" : "";
//       return `
//     <div class="t3-entry">
//       ${exp.jobTitle || exp.employer || exp.location ? `
//       <div class="t3-entry-title">
//         ${exp.jobTitle ? `${exp.jobTitle} ` : ""}
//         ${exp.employer ? `<span class="t3-entry-title-muted">— ${exp.employer}</span>` : ""}
//         ${exp.location ? `<span class="t3-entry-title-muted">— ${exp.location}</span>` : ""}
//       </div>` : ""}
//       ${start || end ? `<div class="t3-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
//       ${exp.text ? `<div class="t3-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`;
//     }).join("")}` : ""}

//     ${generateProjectsHTML()}

//     ${educations.length > 0 ? `
//     <div class="t3-section-title">Education</div>
//     ${educations.map((edu) => `
//     <div class="t3-entry">
//       ${edu.schoolname || edu.degree || edu.location ? `
//       <div class="t3-entry-title">
//         ${edu.schoolname || ""}
//         ${edu.degree ? `<span class="t3-entry-title-muted"> — ${edu.degree}</span>` : ""}
//         ${edu.location ? `<span class="t3-entry-title-muted"> — ${edu.location}</span>` : ""}
//       </div>` : ""}
//       ${edu.startDate || edu.endDate ? `<div class="t3-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
//       ${edu.text ? `<div class="t3-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//     </div>`).join("")}` : ""}

//     ${generateSkillsHTML()}

//     ${languages.filter((l) => l.name?.trim()).length > 0 ? `
//     <div class="t3-section-title">Languages</div>
//     <div class="t3-skills-tags">
//       ${languages.filter((l) => l.name?.trim()).map((lang) => `
//         <span class="t3-skill-tag">${lang.name}${lang.level ? ` (${lang.level})` : ""}</span>
//       `).join("")}
//     </div>` : ""}

//     ${certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t3-section-title">Certifications and Licenses</div>
//     <div class="t3-extra">
//       ${certificationsAndLicenses.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t3-section-title">Hobbies and Interests</div>
//     <div class="t3-extra">
//       ${hobbiesAndInterests.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${awardsAndHonors.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t3-section-title">Awards and Honors</div>
//     <div class="t3-extra">
//       ${awardsAndHonors.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).length > 0 ? `
//     <div class="t3-section-title">Websites and Social Media</div>
//     <div class="t3-extra">
//       ${websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div class="t3-website-item">
//         ${i.websiteUrl ? `<div class="t3-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t3-website-link">${i.websiteUrl}</a>` : ""}
//         ${i.socialMedia ? `<div class="t3-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t3-website-link">${i.socialMedia}</a>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     ${references.filter((i) => hasText(i.name)).length > 0 ? `
//     <div class="t3-section-title">References</div>
//     <div class="t3-extra">
//       ${references.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
//     </div>` : ""}

//     ${customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//     ${s.name ? `<div class="t3-section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="t3-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`).join("")}

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
//      JSX PREVIEW
//   ====================================================== */
//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

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

//       <div className={`t3-resume bg-white ${alldata ? "is-preview" : ""}`} style={{ boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t3-header">
//           <div className="t3-header-left">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//             {contact?.jobTitle && (
//               <div className="t3-header-job">
//                 {typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""}
//               </div>
//             )}
//             <div className="t3-header-links">
//               {contact?.linkedin?.trim() && (
//                 <a
//                   href={
//                     contact.linkedin.startsWith("http")
//                       ? contact.linkedin
//                       : `https://${contact.linkedin}`
//                   }
//                   target="_blank"
//                   rel="noreferrer"
//                   className="t3-header-link"
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
//                   className="t3-header-link"
//                 >
//                   Portfolio
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="t3-header-right">
//             <div className="t3-header-contact-line">
//               {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
//             </div>
//             {addressParts && (
//               <div className="t3-header-contact-line">{addressParts}</div>
//             )}
//           </div>
//         </div>

//         {/* ALL BODY CONTENT */}
//         <div className="t3-body">
//           {summary && (
//             <>
//               <div className="t3-section-title">Summary</div>
//               <div
//                 className="t3-summary"
//                 dangerouslySetInnerHTML={{ __html: summary }}
//               />
//             </>
//           )}

//           {experiences.length > 0 && (
//             <>
//               <div className="t3-section-title">Experience</div>
//               {experiences.map((exp, i) => {
//                 const start = fmtDate(exp.startDate);
//                 const end = exp.endDate
//                   ? fmtDate(exp.endDate)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={exp.id || i} className="t3-entry">
//                     {(exp.jobTitle || exp.employer || exp.location) && (
//                       <div className="t3-entry-title">
//                         {exp.jobTitle && `${exp.jobTitle} `}
//                         {exp.employer && (
//                           <span className="t3-entry-title-muted">
//                             — {exp.employer}
//                           </span>
//                         )}
//                         {exp.location && (
//                           <span className="t3-entry-title-muted">
//                             — {exp.location}
//                           </span>
//                         )}
//                       </div>
//                     )}
//                     {(start || end) && (
//                       <div className="t3-entry-date">
//                         {start}
//                         {start && end ? " - " : ""}
//                         {end}
//                       </div>
//                     )}
//                     {exp.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{ __html: exp.text }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* PROJECTS SECTION */}
//           {renderProjects()}

//           {educations.length > 0 && (
//             <>
//               <div className="t3-section-title">Education</div>
//               {educations.map((edu, i) => (
//                 <div key={edu.id || i} className="t3-entry">
//                   {(edu.schoolname || edu.degree || edu.location) && (
//                     <div className="t3-entry-title">
//                       {edu.schoolname || ""}
//                       {edu.degree && (
//                         <span className="t3-entry-title-muted">
//                           {" "}
//                           — {edu.degree}
//                         </span>
//                       )}
//                       {edu.location && (
//                         <span className="t3-entry-title-muted">
//                           {" "}
//                           — {edu.location}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="t3-entry-date">
//                       {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
//                     </div>
//                   )}
//                   {edu.text && (
//                     <div
//                       className="t3-entry-content"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {/* SKILLS SECTION - IMPROVED */}
//           {renderSkills()}

//           {languages.filter((l) => l.name?.trim()).length > 0 && (
//             <>
//               <div className="t3-section-title">Languages</div>
//               <div className="t3-skills-tags">
//                 {languages
//                   .filter((l) => l.name?.trim())
//                   .map((lang, i) => (
//                     <span key={(lang as any)._id || i} className="t3-skill-tag">
//                       {lang.name}
//                       {lang.level && ` (${lang.level})`}
//                     </span>
//                   ))}
//               </div>
//             </>
//           )}

//           {certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Certifications and Licenses</div>
//               <div className="t3-extra">
//                 {certificationsAndLicenses
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Hobbies and Interests</div>
//               <div className="t3-extra">
//                 {hobbiesAndInterests
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Awards and Honors</div>
//               <div className="t3-extra">
//                 {awardsAndHonors
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {websitesAndSocialMedia.filter(
//             (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//           ).length > 0 && (
//             <>
//               <div className="t3-section-title">Websites and Social Media</div>
//               <div className="t3-extra">
//                 {websitesAndSocialMedia
//                   .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//                   .map((item, i) => (
//                     <div key={(item as any).id || i} className="t3-website-item">
//                       {item.websiteUrl && (
//                         <div>
//                           <div className="t3-website-label">Website:</div>
//                           <a
//                             href={
//                               item.websiteUrl.startsWith("http")
//                                 ? item.websiteUrl
//                                 : `https://${item.websiteUrl}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-website-link"
//                           >
//                             {item.websiteUrl}
//                           </a>
//                         </div>
//                       )}
//                       {item.socialMedia && (
//                         <div style={{ marginTop: "4px" }}>
//                           <div className="t3-website-label">Social Media:</div>
//                           <a
//                             href={
//                               item.socialMedia.startsWith("http")
//                                 ? item.socialMedia
//                                 : `https://${item.socialMedia}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-website-link"
//                           >
//                             {item.socialMedia}
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}

//           {references.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">References</div>
//               <div className="t3-extra">
//                 {references
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, i) => (
//               <div key={(section as any).id || i}>
//                 {section.name && (
//                   <div className="t3-section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="t3-extra"
//                     dangerouslySetInnerHTML={{ __html: section.description }}
//                   />
//                 )}
//               </div>
//             ))}
//         </div>
//         {/* end .t3-body */}
//       </div>
//     </>
//   );
// };

// export default TemplateThree;










"use client";

import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear } from "@/app/utils";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,

} from "@/app/types/context.types";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/* ======================================================
   SHARED CSS
====================================================== */
const styles = `
  .t3-resume {
    width: 210mm;
    padding: 5mm;
    box-sizing: border-box;
    background-color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #374151;
  }

  .t3-resume.is-preview {
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

  .t3-resume * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Single source of truth for all horizontal indentation */
  .t3-body {
    padding: 0 20px;
  }

  /* ── HEADER ── */
  .t3-header {
    display: flex;
    justify-content: space-between;
    background-color: #878787;
    padding: 4px;
    border-radius: 16px;
    color: white;
  }

  .t3-header-left {
    width: 40%;
    font-size: 27px;
    font-weight: 500;
    padding: 12px;
    text-transform: uppercase;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-header-job {
    font-size: 14px;
    font-weight: 400;
    text-transform: lowercase;
    margin-top: 4px;
  }

  .t3-header-links {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 8px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  .t3-header-link {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: white;
  }

  .t3-header-right {
    width: 60%;
    padding: 12px;
    font-size: 14px;
  }

  .t3-header-contact-line {
    text-align: right;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin-bottom: 2px;
  }

  /* ── SECTION TITLE ── */
  .t3-section-title {
    font-size: 22px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 4px;
    color: #111827;
  }

  /* ── SUMMARY ── */
  .t3-summary {
    padding-top: 6px;
    padding-bottom: 10px;
    color: #374151;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── ENTRY ── */
  .t3-entry {
    margin-top: 8px;
    padding-bottom: 6px;
  }

  .t3-entry-title {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-entry-title-muted {
    font-weight: 400;
    color: #6b7280;
  }

  .t3-entry-date {
    font-size: 14px;
    color: #4b5563;
    margin-top: 4px;
  }

  .t3-entry-content {
    padding-top: 6px;
    padding-bottom: 6px;
    color: #374151;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
  .t3-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
  .t3-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
  .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

  /* ── EDUCATION GRADE ── */
  .t3-education-grade {
    font-size: 13px;
    color: #6b7280;
    margin-top: 2px;
    font-weight: 500;
  }

  /* ── SKILLS (COMPACT TAGS) ── */
  .t3-skills-block {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .t3-skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }

  .t3-skill-tag {
    display: inline-block;
    background: #f3f4f6;
    padding: 4px 12px;
    font-size: 13px;
    color: #374151;
    border-radius: 20px;
    line-height: 1.4;
  }

  .t3-skill-category {
    margin-bottom: 12px;
  }

  .t3-skill-category-title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 8px;
    padding-bottom: 2px;
    border-bottom: 1px solid #e5e7eb;
  }

  /* ── PROJECTS ── */
  .t3-project-item {
    margin-top: 8px;
    padding-bottom: 6px;
  }

  .t3-project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .t3-project-title {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .t3-project-links {
    display: flex;
    gap: 12px;
  }

  .t3-project-link {
    font-size: 12px;
    color: #6b7280;
    text-decoration: underline;
  }

  .t3-project-tech-stack {
    font-size: 13px;
    color: #6b7280;
    margin: 4px 0;
  }

  .t3-project-description {
    padding-top: 6px;
    color: #374151;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── EXTRA SECTIONS ── */
  .t3-extra {
    padding-top: 4px;
    padding-bottom: 6px;
    color: #374151;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── WEBSITES ── */
  .t3-website-item {
    margin-bottom: 8px;
  }

  .t3-website-label {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }

  .t3-website-link {
    font-size: 14px;
    color: #374151;
    text-decoration: underline;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── PRINT ── */
  @media print {
    @page { size: A4; margin: 5mm; }
    .t3-resume {
      width: 100% !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
    .t3-header {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t3-entry, .t3-project-item { page-break-inside: avoid; break-inside: avoid; }
    .t3-section-title { page-break-after: avoid; break-after: avoid; }
  }
`;

const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
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
      return (
        <>
          <div className="t3-section-title">Skills</div>
          <div className="t3-skills-block">
            {skills.map((category: any) => (
              <div key={category.id} className="t3-skill-category">
                <div className="t3-skill-category-title">{category.title}</div>
                <div className="t3-skills-tags">
                  {category.skills.map((skill: any) => (
                    <span key={skill.id} className="t3-skill-tag">
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
          <div className="t3-section-title">Skills</div>
          <div className="t3-skills-tags">
            {skills.map((skill: any, index: number) => (
              <span key={skill.id || index} className="t3-skill-tag">
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
        <div className="t3-section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="t3-project-item">
            <div className="t3-project-header">
              <div className="t3-project-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="t3-project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="t3-project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="t3-project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="t3-project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="t3-project-description"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  /* ======================================================
     HTML GENERATION — same styles string, preview === PDF
  ====================================================== */
  const generateHTML = () => {
    const addressParts = [
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
          <div class="t3-section-title">Skills</div>
          <div class="t3-skills-block">
            ${skills.map((category: any) => `
              <div class="t3-skill-category">
                <div class="t3-skill-category-title">${category.title}</div>
                <div class="t3-skills-tags">
                  ${category.skills.map((skill: any) => `
                    <span class="t3-skill-tag">${skill.name}</span>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        return `
          <div class="t3-section-title">Skills</div>
          <div class="t3-skills-tags">
            ${skills.map((skill: any) => `
              <span class="t3-skill-tag">${skill.name || skill.skill}</span>
            `).join("")}
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";
      
      return `
        <div class="t3-section-title">Projects</div>
        ${projects.map((project: any) => `
          <div class="t3-project-item">
            <div class="t3-project-header">
              <div class="t3-project-title">${project.title || ""}</div>
              <div class="t3-project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t3-project-link">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t3-project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${project.techStack && project.techStack.length > 0 ? `
              <div class="t3-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
            ` : ""}
            ${project.description ? `
              <div class="t3-project-description">${project.description}</div>
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
  <style>
    body { margin: 0; padding: 0; background: white; }
    ${styles}
  </style>
</head>
<body>
<div class="t3-resume">

  <!-- HEADER -->
  <div class="t3-header">
    <div class="t3-header-left">
      ${contact?.firstName || ""} ${contact?.lastName || ""}
      ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
      <div class="t3-header-links">
        ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t3-header-link">LinkedIn</a>` : ""}
        ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t3-header-link">GitHub</a>` : ""}
        ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t3-header-link">Portfolio</a>` : ""}
      </div>
    </div>
    <div class="t3-header-right">
      <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
      ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
      ${formattedDob ? `<div class="t3-header-contact-line">${formattedDob}</div>` : ""}
    </div>
  </div>

  <div class="t3-body">

    ${summary ? `
    <div class="t3-section-title">Summary</div>
    <div class="t3-summary">${summary.replace(/<[^>]*>/g, "")}</div>` : ""}

    ${experiences.length > 0 ? `
    <div class="t3-section-title">Experience</div>
    ${experiences.map((exp) => {
      const start = fmtDate(exp.startDate);
      const end = exp.endDate ? fmtDate(exp.endDate) : exp.startDate ? "Present" : "";
      return `
    <div class="t3-entry">
      ${exp.jobTitle || exp.employer || exp.location ? `
      <div class="t3-entry-title">
        ${exp.jobTitle ? `${exp.jobTitle} ` : ""}
        ${exp.employer ? `<span class="t3-entry-title-muted">— ${exp.employer}</span>` : ""}
        ${exp.location ? `<span class="t3-entry-title-muted">— ${exp.location}</span>` : ""}
      </div>` : ""}
      ${start || end ? `<div class="t3-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
      ${exp.text ? `<div class="t3-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
    </div>`;
    }).join("")}` : ""}

    ${generateProjectsHTML()}

    ${educations.length > 0 ? `
    <div class="t3-section-title">Education</div>
    ${educations.map((edu) => {
      const formattedGrade = formatGrade(edu.grade || "");
      return `
    <div class="t3-entry">
      ${edu.schoolname || edu.degree || edu.location ? `
      <div class="t3-entry-title">
        ${edu.schoolname || ""}
        ${edu.degree ? `<span class="t3-entry-title-muted"> — ${edu.degree}</span>` : ""}
        ${edu.location ? `<span class="t3-entry-title-muted"> — ${edu.location}</span>` : ""}
      </div>` : ""}
      ${edu.startDate || edu.endDate ? `<div class="t3-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
      ${formattedGrade ? `<div class="t3-education-grade">${formattedGrade}</div>` : ""}
      ${edu.text ? `<div class="t3-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
    </div>`;
    }).join("")}` : ""}

    ${generateSkillsHTML()}

    ${languages.filter((l) => l.name?.trim()).length > 0 ? `
    <div class="t3-section-title">Languages</div>
    <div class="t3-skills-tags">
      ${languages.filter((l) => l.name?.trim()).map((lang) => `
        <span class="t3-skill-tag">${lang.name}${lang.level ? ` (${lang.level})` : ""}</span>
      `).join("")}
    </div>` : ""}

    ${certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0 ? `
    <div class="t3-section-title">Certifications and Licenses</div>
    <div class="t3-extra">
      ${certificationsAndLicenses.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
    </div>` : ""}

    ${hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 ? `
    <div class="t3-section-title">Hobbies and Interests</div>
    <div class="t3-extra">
      ${hobbiesAndInterests.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
    </div>` : ""}

    ${awardsAndHonors.filter((i) => hasText(i.name)).length > 0 ? `
    <div class="t3-section-title">Awards and Honors</div>
    <div class="t3-extra">
      ${awardsAndHonors.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
    </div>` : ""}

    ${websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).length > 0 ? `
    <div class="t3-section-title">Websites and Social Media</div>
    <div class="t3-extra">
      ${websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
      <div class="t3-website-item">
        ${i.websiteUrl ? `<div class="t3-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t3-website-link">${i.websiteUrl}</a>` : ""}
        ${i.socialMedia ? `<div class="t3-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t3-website-link">${i.socialMedia}</a>` : ""}
      </div>`).join("")}
    </div>` : ""}

    ${references.filter((i) => hasText(i.name)).length > 0 ? `
    <div class="t3-section-title">References</div>
    <div class="t3-extra">
      ${references.filter((i) => hasText(i.name)).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}
    </div>` : ""}

    ${customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
    ${s.name ? `<div class="t3-section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="t3-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`).join("")}

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
     JSX PREVIEW
  ====================================================== */
  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ]
    .filter(Boolean)
    .join(", ");

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

      <div className={`t3-resume bg-white ${alldata ? "is-preview" : ""}`} style={{ boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="t3-header">
          <div className="t3-header-left">
            {contact?.firstName || ""} {contact?.lastName || ""}
            {contact?.jobTitle && (
              <div className="t3-header-job">
                {typeof contact.jobTitle === "string"
                  ? contact.jobTitle
                  : (contact.jobTitle as any)?.name || ""}
              </div>
            )}
            <div className="t3-header-links">
              {linkedinUrl?.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t3-header-link"
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
                  className="t3-header-link"
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
                  className="t3-header-link"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>
          <div className="t3-header-right">
            <div className="t3-header-contact-line">
              {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
            </div>
            {addressParts && (
              <div className="t3-header-contact-line">{addressParts}</div>
            )}
            {formattedDob && (
              <div className="t3-header-contact-line">{formattedDob}</div>
            )}
          </div>
        </div>

        {/* ALL BODY CONTENT */}
        <div className="t3-body">
          {summary && (
            <>
              <div className="t3-section-title">Summary</div>
              <div
                className="t3-summary"
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            </>
          )}

          {experiences.length > 0 && (
            <>
              <div className="t3-section-title">Experience</div>
              {experiences.map((exp, i) => {
                const start = fmtDate(exp.startDate);
                const end = exp.endDate
                  ? fmtDate(exp.endDate)
                  : exp.startDate
                    ? "Present"
                    : "";
                return (
                  <div key={exp._id || i} className="t3-entry">
                    {(exp.jobTitle || exp.employer || exp.location) && (
                      <div className="t3-entry-title">
                        {exp.jobTitle && `${exp.jobTitle} `}
                        {exp.employer && (
                          <span className="t3-entry-title-muted">
                            — {exp.employer}
                          </span>
                        )}
                        {exp.location && (
                          <span className="t3-entry-title-muted">
                            — {exp.location}
                          </span>
                        )}
                      </div>
                    )}
                    {(start || end) && (
                      <div className="t3-entry-date">
                        {start}
                        {start && end ? " - " : ""}
                        {end}
                      </div>
                    )}
                    {exp.text && (
                      <div
                        className="t3-entry-content"
                        dangerouslySetInnerHTML={{ __html: exp.text }}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* PROJECTS SECTION */}
          {renderProjects()}

          {educations.length > 0 && (
            <>
              <div className="t3-section-title">Education</div>
              {educations.map((edu, i) => {
                const formattedGrade = formatGrade(edu.grade || "");
                return (
                  <div key={edu._id || i} className="t3-entry">
                    {(edu.schoolname || edu.degree || edu.location) && (
                      <div className="t3-entry-title">
                        {edu.schoolname || ""}
                        {edu.degree && (
                          <span className="t3-entry-title-muted">
                            {" "}
                            — {edu.degree}
                          </span>
                        )}
                        {edu.location && (
                          <span className="t3-entry-title-muted">
                            {" "}
                            — {edu.location}
                          </span>
                        )}
                      </div>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <div className="t3-entry-date">
                        {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
                      </div>
                    )}
                    {formattedGrade && (
                      <div className="t3-education-grade">{formattedGrade}</div>
                    )}
                    {edu.text && (
                      <div
                        className="t3-entry-content"
                        dangerouslySetInnerHTML={{ __html: edu.text }}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* SKILLS SECTION - IMPROVED */}
          {renderSkills()}

          {languages.filter((l) => l.name?.trim()).length > 0 && (
            <>
              <div className="t3-section-title">Languages</div>
              <div className="t3-skills-tags">
                {languages
                  .filter((l) => l.name?.trim())
                  .map((lang, i) => (
                    <span key={(lang as any)._id || i} className="t3-skill-tag">
                      {lang.name}
                      {lang.level && ` (${lang.level})`}
                    </span>
                  ))}
              </div>
            </>
          )}

          {certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0 && (
            <>
              <div className="t3-section-title">Certifications and Licenses</div>
              <div className="t3-extra">
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

          {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
            <>
              <div className="t3-section-title">Hobbies and Interests</div>
              <div className="t3-extra">
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

          {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
            <>
              <div className="t3-section-title">Awards and Honors</div>
              <div className="t3-extra">
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

          {websitesAndSocialMedia.filter(
            (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
          ).length > 0 && (
            <>
              <div className="t3-section-title">Websites and Social Media</div>
              <div className="t3-extra">
                {websitesAndSocialMedia
                  .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
                  .map((item, i) => (
                    <div key={(item as any).id || i} className="t3-website-item">
                      {item.websiteUrl && (
                        <div>
                          <div className="t3-website-label">Website:</div>
                          <a
                            href={
                              item.websiteUrl.startsWith("http")
                                ? item.websiteUrl
                                : `https://${item.websiteUrl}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="t3-website-link"
                          >
                            {item.websiteUrl}
                          </a>
                        </div>
                      )}
                      {item.socialMedia && (
                        <div style={{ marginTop: "4px" }}>
                          <div className="t3-website-label">Social Media:</div>
                          <a
                            href={
                              item.socialMedia.startsWith("http")
                                ? item.socialMedia
                                : `https://${item.socialMedia}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="t3-website-link"
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

          {references.filter((i) => hasText(i.name)).length > 0 && (
            <>
              <div className="t3-section-title">References</div>
              <div className="t3-extra">
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

          {customSection
            .filter((s) => s?.name?.trim() || s?.description?.trim())
            .map((section, i) => (
              <div key={(section as any).id || i}>
                {section.name && (
                  <div className="t3-section-title">{section.name}</div>
                )}
                {section.description && (
                  <div
                    className="t3-extra"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                )}
              </div>
            ))}
        </div>
        {/* end .t3-body */}
      </div>
    </>
  );
};

export default TemplateThree;