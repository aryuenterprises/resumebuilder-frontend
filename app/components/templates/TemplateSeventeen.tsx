
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";

// const TemplateSeventeen: React.FC = () => {
//   const context = useContext(CreateContext);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = context.contact || {};
//   const educations = context?.education || [];
//   const experiences = context?.experiences || [];
//   const skills = context?.skills || [];
//   const finalize = context?.finalize || {};
//   const summary = context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;

//   /* ======================================================
//      CSS — SINGLE COLUMN | SLATE GRAY | SOFT & ELEGANT
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

//   body {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//   }

//   .resume-container {
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #fafafa;
//     font-family: 'Jost', sans-serif;
//     color: #2c2c2c;
//     text-align: left;
//   }

//   /* ── HEADER ── */
//   .header-block {
//     background-color: #f0f0ef;
//     padding: 36px 36px 28px;
//     border-bottom: 1px solid #d8d8d4;
//     text-align: left;
//   }

//   .header-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 52px;
//     font-weight: 300;
//     letter-spacing: 3px;
//     line-height: 1.0;
//     color: #1e1e1e;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .header-jobtitle {
//     font-family: 'Jost', sans-serif;
//     font-size: 10.5px;
//     font-weight: 500;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #7a8a8a;
//     margin-bottom: 20px;
//     text-align: left;
//   }

//   .header-divider {
//     width: 40px;
//     height: 1px;
//     background: #9aa5a5;
//     margin-bottom: 16px;
//   }

//   .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 4px 0;
//     font-size: 11.5px;
//     color: #5a6a6a;
//     font-weight: 300;
//     text-align: left;
//     font-family: 'Jost', sans-serif;
//   }

//   .header-meta-item {
//     display: flex;
//     align-items: center;
//     color: #5a6a6a;
//   }

//   .header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 10px;
//     color: #b0bcbc;
//   }

//   .header-meta-item a {
//     color: #5a7a7a;
//     text-decoration: underline;
//     text-underline-offset: 3px;
//     text-decoration-color: #b0bcbc;
//   }

//   /* ── BODY ── */
//   .resume-body {
//     padding: 28px 36px 36px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .section-block {
//     margin-bottom: 28px;
//     text-align: left;
//   }

//   .section-header {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .section-title {
//     font-family: 'Jost', sans-serif;
//     font-size: 9.5px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #7a8a8a;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .section-line {
//     flex: 1;
//     height: 1px;
//     background: #d8d8d4;
//   }

//   /* ── SUMMARY ── */
//   .summary-text {
//     font-size: 16px;
//     font-weight: 300;
//     line-height: 1.85;
//     color: #3c4c4c;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .entry-block {
//     margin-bottom: 20px;
//     padding-bottom: 20px;
//     border-bottom: 1px solid #e8e8e4;
//     text-align: left;
//   }

//   .entry-block:last-child {
//     border-bottom: none;
//     padding-bottom: 0;
//     margin-bottom: 0;
//   }

//   .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 3px;
//     text-align: left;
//   }

//   .entry-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 19px;
//     font-weight: 500;
//     color: #1e1e1e;
//     line-height: 1.2;
//     letter-spacing: 0.3px;
//     text-align: left;
//   }

//   .entry-date {
//     font-size: 10px;
//     font-weight: 400;
//     letter-spacing: 1.5px;
//     text-transform: uppercase;
//     color: #9aa5a5;
//     white-space: nowrap;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   .entry-subtitle {
//     font-size: 11.5px;
//     color: #7a8a8a;
//     font-weight: 400;
//     letter-spacing: 0.8px;
//     font-family: 'Jost', sans-serif;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .entry-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   .entry-content ul,
//   .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .entry-content ol,
//   .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .entry-content li,
//   .entry-content-desc li {
//     margin-bottom: 4px !important;
//     line-height: 1.65 !important;
//     list-style-position: outside !important;
//   }

//   ul {
//     list-style-type: disc !important;
//   }

//   /* ── SKILLS ── */
//   .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     text-align: left;
//   }

//   .skill-row {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     text-align: left;
//   }

//   .skill-name-label {
//     font-size: 11.5px;
//     font-weight: 400;
//     letter-spacing: 1px;
//     color: #2c2c2c;
//     min-width: 160px;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   .skill-dots {
//     display: flex;
//     gap: 6px;
//     align-items: center;
//   }

//   .skill-dot {
//     width: 7px;
//     height: 7px;
//     border-radius: 50%;
//     border: 1.5px solid #9aa5a5;
//     background: transparent;
//   }

//   .skill-dot.filled {
//     background: #6a8080;
//     border-color: #6a8080;
//   }

//   /* ── LANGUAGES ── */
//   .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 10px;
//     text-align: left;
//   }

//   .lang-name {
//     font-size: 11.5px;
//     font-weight: 400;
//     letter-spacing: 1px;
//     color: #2c2c2c;
//     min-width: 160px;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .additional-content {
//     font-size: 12.5px;
//     color: #4a5a5a;
//     line-height: 1.75;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .additional-dash {
//     color: #9aa5a5;
//     font-size: 12px;
//     line-height: 1.75;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .edu-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
//     text-align: left;
//   }

//   .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .edu-list li {
//     margin-bottom: 4px;
//     line-height: 1.65;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .custom-section-content {
//     font-size: 13px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     font-family: 'Jost', sans-serif;
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

//     .resume-container {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .header-block {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .resume-body {
//       padding-top: 24px;
//     }
//   }

//   @media (max-width: 768px) {
//     .resume-container { width: 100%; }
//     .header-block { padding: 24px 20px 20px; }
//     .header-name { font-size: 36px; }
//     .resume-body { padding: 20px; }
//     .entry-top-row { flex-direction: column; align-items: flex-start; }
//     .skill-name-label, .lang-name { min-width: 120px; }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderDots = (level: number | string, total = 4) =>
//       Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<span class="skill-dot${i < Number(level) ? " filled" : ""}"></span>`,
//         )
//         .join("");

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c
//               ? `<li style="margin-bottom:4px;line-height:1.65;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const sectionHeader = (title: string) => `
//       <div class="section-header">
//         <div class="section-title">${title}</div>
//         <div class="section-line"></div>
//       </div>`;

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="resume-container">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">${
//             contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""
//           }</div>
//           <div class="header-divider"></div>
//           <div class="header-meta-row">
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
//             ${sectionHeader("Profile")}
//             <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//           </div>` : ""}

//           ${experiences.length > 0 ? `
//           <div class="section-block">
//             ${sectionHeader("Experience")}
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

//           ${educations.length > 0 ? `
//           <div class="section-block">
//             ${sectionHeader("Education")}
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

//           ${skills.length > 0 ? `
//           <div class="section-block">
//             ${sectionHeader("Skills")}
//             <div class="skills-list">
//               ${skills.map((s) => `
//               <div class="skill-row">
//                 <span class="skill-name-label">${s.skill || ""}</span>
//                 ${s.level ? `<div class="skill-dots">${renderDots(s.level)}</div>` : ""}
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//           <div class="section-block">
//             ${sectionHeader("Languages")}
//             <div class="skills-list">
//               ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-dots">${renderDots(l.level)}</div>` : ""}
//               </div>`).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${sectionHeader("Certifications &amp; Licenses")}
//             <div class="additional-content">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><span class="additional-dash">—</span><div>${i.name}</div></div>`
//               ).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${sectionHeader("Hobbies &amp; Interests")}
//             <div class="additional-content">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><span class="additional-dash">—</span><div>${i.name}</div></div>`
//               ).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${sectionHeader("Awards &amp; Honors")}
//             <div class="additional-content">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><span class="additional-dash">—</span><div>${i.name}</div></div>`
//               ).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//           <div class="section-block">
//             ${sectionHeader("Websites &amp; Social Media")}
//             <div class="additional-content">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) =>
//                 `<div class="additional-item"><span class="additional-dash">—</span><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`
//               ).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//           <div class="section-block">
//             ${sectionHeader("References")}
//             <div class="additional-content">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><span class="additional-dash">—</span><div>${i.name}</div></div>`
//               ).join("")}
//             </div>
//           </div>` : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim())
//             ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//             <div class="section-block">
//               ${s.name ? sectionHeader(s.name) : ""}
//               ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//             </div>`).join("")
//             : ""}

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
//      SKILL DOTS (React)
//   ====================================================== */
//   const SkillDots = ({ level, total = 4 }: { level: number | string; total?: number }) => (
//     <div className="skill-dots">
//       {Array.from({ length: total }).map((_, i) => (
//         <span key={i} className={`skill-dot${i < Number(level) ? " filled" : ""}`} />
//       ))}
//     </div>
//   );

//   /* ======================================================
//      SECTION HEADER (React)
//   ====================================================== */
//   const SectionHeader = ({ title }: { title: string }) => (
//     <div className="section-header">
//       <div className="section-title">{title}</div>
//       <div className="section-line" />
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
//         className="resume-container"
//         style={{ margin: "0 auto", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
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
//           <div className="header-divider" />
//           <div className="header-meta-row">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">{addressParts.join(", ")}</span>
//             )}
//             {contact?.email && <span className="header-meta-item">{contact.email}</span>}
//             {contact?.phone && <span className="header-meta-item">{contact.phone}</span>}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
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
//               <SectionHeader title="Profile" />
//               <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }} />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section-block">
//               <SectionHeader title="Experience" />
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
//                     {exp.employer}{exp.location && <> &nbsp;·&nbsp; {exp.location}</>}
//                   </div>
//                   {exp.text && (
//                     <div className="entry-content entry-content-desc" dangerouslySetInnerHTML={{ __html: exp.text }} />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div className="section-block">
//               <SectionHeader title="Education" />
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
//                           {edu.startDate || ""}{edu.startDate && edu.endDate && " – "}{edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}{edu.degree && edu.location && <> &nbsp;·&nbsp; </>}{edu.location || ""}
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
//               <SectionHeader title="Skills" />
//               <div className="skills-list">
//                 {skills.map((skill, i) => (
//                   <div key={i} className="skill-row">
//                     <span className="skill-name-label">{skill.skill}</span>
//                     {skill.level && <SkillDots level={skill.level} />}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* LANGUAGES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//             <div className="section-block">
//               <SectionHeader title="Languages" />
//               <div className="skills-list">
//                 {finalize.languages.map((lang, index) =>
//                   lang.name && lang.name.trim() !== "" && (
//                     <div key={lang._id || index} className="lang-row">
//                       <span className="lang-name">{lang.name}</span>
//                       {lang.level && <SkillDots level={lang.level} />}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* CERTIFICATIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <SectionHeader title="Certifications & Licenses" />
//               <div className="additional-content">
//                 {finalize.certificationsAndLicenses.map((item, index) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div key={item.id || index} className="additional-item">
//                       <span className="additional-dash">—</span>
//                       <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* HOBBIES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <SectionHeader title="Hobbies & Interests" />
//               <div className="additional-content">
//                 {finalize.hobbiesAndInterests.map((item, index) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div key={item.id || index} className="additional-item">
//                       <span className="additional-dash">—</span>
//                       <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* AWARDS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <SectionHeader title="Awards & Honors" />
//               <div className="additional-content">
//                 {finalize.awardsAndHonors.map((item, index) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div key={item.id || index} className="additional-item">
//                       <span className="additional-dash">—</span>
//                       <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* WEBSITES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) && (
//             <div className="section-block">
//               <SectionHeader title="Websites & Social Media" />
//               <div className="additional-content">
//                 {finalize.websitesAndSocialMedia.map((item, index) =>
//                   (item.websiteUrl || item.socialMedia) && (
//                     <div key={item.id || index} className="additional-item">
//                       <span className="additional-dash">—</span>
//                       <div>
//                         {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                         {item.websiteUrl && item.socialMedia && " · "}
//                         {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* REFERENCES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.references) &&
//             finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <div className="section-block">
//               <SectionHeader title="References" />
//               <div className="additional-content">
//                 {finalize.references.map((item, index) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div key={item.id || index} className="additional-item">
//                       <span className="additional-dash">—</span>
//                       <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <div key={section.id || index} className="section-block">
//                   {section.name && <SectionHeader title={section.name} />}
//                   {section.description && (
//                     <div className="custom-section-content" dangerouslySetInnerHTML={{ __html: section.description }} />
//                   )}
//                 </div>
//               ))}

//         </div>{/* /resume-body */}
//       </div>
//     </div>
//   );
// };

// export default TemplateSeventeen;
































"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";

const TemplateSeventeen: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);

  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

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
  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  // Helper function to render skills (using cleanQuillHTML)
  const renderSkills = () => {
    if (!skills || (typeof skills === "string" && !skills.trim())) return null;

    const cleanedSkills = cleanQuillHTML(skills);

    if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

    return (
      <div className="t17-section-block">
        <div className="t17-section-header">
          <div className="t17-section-title">Skills</div>
          <div className="t17-section-line"></div>
        </div>
        <div
          className="t17-skills-content"
          dangerouslySetInnerHTML={{ __html: cleanedSkills }}
        />
      </div>
    );
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div className="t17-section-block">
        <div className="t17-section-header">
          <div className="t17-section-title">Projects</div>
          <div className="t17-section-line"></div>
        </div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="t17-entry-block">
            <div className="t17-entry-top-row">
              <div className="t17-entry-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="t17-project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="t17-project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="t17-project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="t17-project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="t17-entry-content"
                dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — SINGLE COLUMN | SLATE GRAY | SOFT & ELEGANT
  ====================================================== */
  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  

  .t17-resume-container {
    width: 210mm;
    min-height: 297mm;
    box-sizing: border-box;
    background-color: #fafafa;
    font-family: 'Jost', sans-serif;
    color: #2c2c2c;
    text-align: left;
  }

  .t17-resume-container.is-preview {
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

  /* Fix p tag spacing */
  .t17-resume-container p {
    margin: 0 0 4px 0 !important;
    padding: 0 !important;
    line-height: 1.6 !important;
  }

  .t17-resume-container p:last-child {
    margin-bottom: 0 !important;
  }

  /* Rich text content styles */
  .t17-resume-container .t17-entry-content ul,
  .t17-resume-container .t17-entry-content ol,
  .t17-resume-container .t17-skills-content ul,
  .t17-resume-container .t17-skills-content ol,
  .t17-resume-container .t17-edu-content ul,
  .t17-resume-container .t17-edu-content ol,
  .t17-resume-container .t17-custom-section-content ul,
  .t17-resume-container .t17-custom-section-content ol {
    margin: 4px 0 4px 20px !important;
    padding-left: 20px !important;
  }

  .t17-resume-container .t17-entry-content li,
  .t17-resume-container .t17-skills-content li,
  .t17-resume-container .t17-edu-content li,
  .t17-resume-container .t17-custom-section-content li {
    margin-bottom: 2px !important;
    line-height: 1.6 !important;
  }

  .t17-resume-container .t17-entry-content ul,
  .t17-resume-container .t17-skills-content ul,
  .t17-resume-container .t17-edu-content ul,
  .t17-resume-container .t17-custom-section-content ul {
    list-style-type: disc !important;
  }

  .t17-resume-container .t17-entry-content ol,
  .t17-resume-container .t17-skills-content ol,
  .t17-resume-container .t17-edu-content ol,
  .t17-resume-container .t17-custom-section-content ol {
    list-style-type: decimal !important;
  }

  .t17-resume-container .t17-entry-content strong,
  .t17-resume-container .t17-skills-content strong,
  .t17-resume-container .t17-edu-content strong,
  .t17-resume-container .t17-custom-section-content strong {
    font-weight: 600 !important;
  }

  .t17-resume-container .t17-entry-content em,
  .t17-resume-container .t17-skills-content em,
  .t17-resume-container .t17-edu-content em,
  .t17-resume-container .t17-custom-section-content em {
    font-style: italic !important;
  }

  .t17-resume-container .t17-entry-content u,
  .t17-resume-container .t17-skills-content u,
  .t17-resume-container .t17-edu-content u,
  .t17-resume-container .t17-custom-section-content u {
    text-decoration: underline !important;
  }

  /* Preserve spaces in content */
  .t17-resume-container .t17-entry-content p,
  .t17-resume-container .t17-skills-content p,
  .t17-resume-container .t17-edu-content p,
  .t17-resume-container .t17-custom-section-content p {
    white-space: pre-wrap !important;
  }

  /* Skills content styling */
  .t17-resume-container .t17-skills-content {
    font-size: 13px;
    line-height: 1.7;
    color: #444;
    font-weight: 300;
    font-family: 'Jost', sans-serif;
    text-align: left;
  }

  /* Custom Section Content */
  .t17-resume-container .t17-custom-section-content {
    font-size: 13px;
    line-height: 1.7;
    color: #444;
    font-weight: 300;
    font-family: 'Jost', sans-serif;
    text-align: left;
  }

  /* Project links */
  .t17-resume-container .t17-project-links {
    display: flex;
    gap: 15px;
  }

  .t17-resume-container .t17-project-link {
    font-size: 10px;
    font-weight: 500;
    color: #7a8c96;
    text-decoration: underline;
  }

  .t17-resume-container .t17-project-tech-stack {
    font-size: 11px;
    color: #888;
    margin: 6px 0;
  }

  /* ── HEADER ── */
  .t17-resume-container .t17-header-block {
    background-color: #f0f0ef;
    padding: 36px 36px 28px;
    border-bottom: 1px solid #d8d8d4;
    text-align: left;
  }

  .t17-resume-container .t17-header-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    letter-spacing: 3px;
    line-height: 1.0;
    color: #1e1e1e;
    margin-bottom: 6px;
    text-align: left;
  }

  .t17-resume-container .t17-header-jobtitle {
    font-family: 'Jost', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: #7a8a8a;
    margin-bottom: 20px;
    text-align: left;
  }

  .t17-resume-container .t17-header-divider {
    width: 40px;
    height: 1px;
    background: #9aa5a5;
    margin-bottom: 16px;
  }

  .t17-resume-container .t17-header-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 0;
    font-size: 11.5px;
    color: #5a6a6a;
    font-weight: 300;
    text-align: left;
    font-family: 'Jost', sans-serif;
  }

  .t17-resume-container .t17-header-meta-item {
    display: flex;
    align-items: center;
    color: #5a6a6a;
  }

  .t17-resume-container .t17-header-meta-item:not(:last-child)::after {
    content: '·';
    margin: 0 10px;
    color: #b0bcbc;
  }

  .t17-resume-container .t17-header-meta-item a {
    color: #5a7a7a;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: #b0bcbc;
  }

  /* ── BODY ── */
  .t17-resume-container .t17-resume-body {
    padding: 28px 36px 36px;
    text-align: left;
  }

  /* ── SECTION ── */
  .t17-resume-container .t17-section-block {
    margin-bottom: 28px;
    text-align: left;
  }

  .t17-resume-container .t17-section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    text-align: left;
  }

  .t17-resume-container .t17-section-title {
    font-family: 'Jost', sans-serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #7a8a8a;
    white-space: nowrap;
    text-align: left;
  }

  .t17-resume-container .t17-section-line {
    flex: 1;
    height: 1px;
    background: #d8d8d4;
  }

  /* ── SUMMARY ── */
  .t17-resume-container .t17-summary-text {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #3c4c4c;
    text-align: left;
  }

  /* ── ENTRY BLOCKS ── */
  .t17-resume-container .t17-entry-block {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e4;
    text-align: left;
  }

  .t17-resume-container .t17-entry-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .t17-resume-container .t17-entry-top-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 3px;
    text-align: left;
  }

  .t17-resume-container .t17-entry-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 500;
    color: #1e1e1e;
    line-height: 1.2;
    letter-spacing: 0.3px;
    text-align: left;
  }

  .t17-resume-container .t17-entry-date {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #9aa5a5;
    white-space: nowrap;
    font-family: 'Jost', sans-serif;
    text-align: left;
  }

  .t17-resume-container .t17-entry-subtitle {
    font-size: 11.5px;
    color: #7a8a8a;
    font-weight: 400;
    letter-spacing: 0.8px;
    font-family: 'Jost', sans-serif;
    margin-bottom: 8px;
    text-align: left;
  }

  .t17-resume-container .t17-entry-content {
    font-size: 13px;
    line-height: 1.7;
    color: #444;
    font-weight: 300;
    font-family: 'Jost', sans-serif;
    text-align: left;
  }

  /* ── EDU CONTENT ── */
  .t17-resume-container .t17-edu-content {
    font-size: 13px;
    line-height: 1.7;
    color: #444;
    font-weight: 300;
    font-family: 'Jost', sans-serif;
    text-align: left;
  }

  /* Education Grade */
  .t17-resume-container .t17-education-grade {
    font-size: 11px;
    color: #6b7c93;
    margin-top: 4px;
    font-weight: 500;
  }

  /* ── PRINT ── */
  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .t17-resume-container {
      width: 100% !important;
      box-shadow: none !important;
    }

    .t17-header-block {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .t17-entry-block {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t17-section-header {
      page-break-after: avoid;
      break-after: avoid;
    }
  }

=
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
        return `<div class="t17-entry-content t17-entry-content-desc">${cleanQuillHTML(text)}</div>`;
      }
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
        return `<div class="t17-entry-content t17-entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
          .map((l) => {
            const t = l.trim();
            const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
            return c ? `<li style="margin-bottom:4px;line-height:1.65;list-style-type:disc!important;">${c}</li>` : "";
          })
          .join("")}</ul></div>`;
      }
      return `<div class="t17-entry-content t17-entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    const sectionHeader = (title: string) => `
      <div class="t17-section-header">
        <div class="t17-section-title">${title}</div>
        <div class="t17-section-line"></div>
      </div>`;

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      
      const cleanedSkills = cleanQuillHTML(skills);
      if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
      return `
        <div class="t17-section-block">
          ${sectionHeader("Skills")}
          <div class="t17-skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";
      
      return `
        <div class="t17-section-block">
          ${sectionHeader("Projects")}
          ${projects.map((project: any) => `
            <div class="t17-entry-block">
              <div class="t17-entry-top-row">
                <div class="t17-entry-title">${project.title || ""}</div>
                <div class="t17-project-links">
                  ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t17-project-link">Live Demo</a>` : ""}
                  ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t17-project-link">GitHub</a>` : ""}
                </div>
              </div>
              ${project.techStack && project.techStack.length > 0 ? `
                <div class="t17-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
              ` : ""}
              ${project.description ? `
                <div class="t17-entry-content">${cleanQuillHTML(project.description)}</div>
              ` : ""}
            </div>
          `).join("")}
        </div>
      `;
    };

    // Generate custom sections HTML for PDF
    const generateCustomSectionsHTML = () => {
      if (
        !finalize ||
        Array.isArray(finalize) ||
        !Array.isArray(finalize.customSection) ||
        !finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
      ) {
        return "";
      }

      return finalize.customSection
        .filter((s: any) => s?.name?.trim() || s?.description?.trim())
        .map(
          (s: any) => `
          <div class="t17-section-block">
            ${s.name ? sectionHeader(s.name) : ""}
            ${s.description ? `<div class="t17-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
          </div>
        `,
        )
        .join("");
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>${styles}</style>
    </head>
    <body>
      <div class="t17-resume-container">

        <!-- HEADER -->
        <div class="t17-header-block">
          <div class="t17-header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="t17-header-jobtitle">
            ${contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div class="t17-header-divider"></div>
          <div class="t17-header-meta-row">
            ${addressParts.length > 0 ? `<span class="t17-header-meta-item">${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="t17-header-meta-item">${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="t17-header-meta-item">${contact.phone}</span>` : ""}
            ${formattedDob ? `<span class="t17-header-meta-item">${formattedDob}</span>` : ""}
            ${linkedinUrl ? `<span class="t17-header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
            ${githubUrl ? `<span class="t17-header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
            ${portfolioUrl ? `<span class="t17-header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
          </div>
        </div>

        <!-- BODY -->
        <div class="t17-resume-body">

          ${summary ? `
          <div class="t17-section-block">
            ${sectionHeader("Profile")}
            <div class="t17-summary-text">${cleanQuillHTML(summary)}</div>
          </div>` : ""}

          ${experiences.length > 0 ? `
          <div class="t17-section-block">
            ${sectionHeader("Experience")}
            ${experiences.map((exp) => {
              const startFormatted = formatMonthYear(exp.startDate, false);
              const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
              const companyLocation = [exp.employer, exp.location].filter(Boolean).join("  ·  ");
              return `
              <div class="t17-entry-block">
                <div class="t17-entry-top-row">
                  <div class="t17-entry-title">${exp.jobTitle || ""}</div>
                  <div class="t17-entry-date">${startFormatted} – ${endFormatted}</div>
                </div>
                <div class="t17-entry-subtitle">${companyLocation}</div>
                ${exp.text ? renderEntryText(exp.text) : ""}
              </div>`;
            }).join("")}
          </div>` : ""}

          ${generateProjectsHTML()}

          ${educations.length > 0 ? `
          <div class="t17-section-block">
            ${sectionHeader("Education")}
            ${educations.map((edu) => {
              const dateStr = edu.startDate || edu.endDate
                ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                : "";
              const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
              const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
              return `
              <div class="t17-entry-block">
                <div class="t17-entry-top-row">
                  <div class="t17-entry-title">${edu.schoolname || ""}</div>
                  ${dateStr ? `<div class="t17-entry-date">${dateStr}</div>` : ""}
                </div>
                ${edu.degree || edu.location || formattedGrade ? `<div class="t17-entry-subtitle">
                  ${edu.degree || ""}
                  ${edu.degree && edu.location ? "  ·  " : ""}
                  ${edu.location || ""}
                  ${formattedGrade ? `<div class="t17-education-grade">${formattedGrade}</div>` : ""}
                </div>` : ""}
                ${eduTextHtml ? `<div class="t17-edu-content">${eduTextHtml}</div>` : ""}
              </div>`;
            }).join("")}
          </div>` : ""}

          ${generateSkillsHTML()}

          ${generateCustomSectionsHTML()}

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
        className={`t17-resume-container ${alldata ? 'is-preview' : ''}`}
        style={{ margin: "0 auto", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
      >
        <style>{styles}</style>

        {/* HEADER */}
        <div className="t17-header-block">
          <div className="t17-header-name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="t17-header-jobtitle">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="t17-header-divider" />
          <div className="t17-header-meta-row">
            {addressParts.length > 0 && (
              <span className="t17-header-meta-item">{addressParts.join(", ")}</span>
            )}
            {contact?.email && <span className="t17-header-meta-item">{contact.email}</span>}
            {contact?.phone && <span className="t17-header-meta-item">{contact.phone}</span>}
            {formattedDob && <span className="t17-header-meta-item">{formattedDob}</span>}
            {linkedinUrl && (
              <span className="t17-header-meta-item">
                <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
              </span>
            )}
            {githubUrl && (
              <span className="t17-header-meta-item">
                <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a>
              </span>
            )}
            {portfolioUrl && (
              <span className="t17-header-meta-item">
                <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a>
              </span>
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="t17-resume-body">

          {/* SUMMARY */}
          {summary && (
            <div className="t17-section-block">
              <div className="t17-section-header">
                <div className="t17-section-title">Profile</div>
                <div className="t17-section-line" />
              </div>
              <div
                className="t17-summary-text"
                dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {experiences.length > 0 && (
            <div className="t17-section-block">
              <div className="t17-section-header">
                <div className="t17-section-title">Experience</div>
                <div className="t17-section-line" />
              </div>
              {experiences.map((exp, i) => {
                const start = formatMonthYear(exp.startDate, false);
                const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
                const companyLocation = [exp.employer, exp.location].filter(Boolean).join("  ·  ");
                return (
                  <div key={i} className="t17-entry-block">
                    <div className="t17-entry-top-row">
                      <div className="t17-entry-title">{exp.jobTitle}</div>
                      <div className="t17-entry-date">{start} – {end}</div>
                    </div>
                    <div className="t17-entry-subtitle">{companyLocation}</div>
                    {exp.text && (
                      <div
                        className="t17-entry-content t17-entry-content-desc"
                        dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* PROJECTS */}
          {renderProjects()}

          {/* EDUCATION */}
          {educations?.length > 0 && (
            <div className="t17-section-block">
              <div className="t17-section-header">
                <div className="t17-section-title">Education</div>
                <div className="t17-section-line" />
              </div>
              {educations.map((edu, index) => {
                const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
                const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
                return (
                  <div key={edu.id || index} className="t17-entry-block">
                    <div className="t17-entry-top-row">
                      <div className="t17-entry-title">{edu.schoolname || ""}</div>
                      {(edu.startDate || edu.endDate) && (
                        <div className="t17-entry-date">
                          {edu.startDate || ""}{edu.startDate && edu.endDate && " – "}{edu.endDate || ""}
                        </div>
                      )}
                    </div>
                    {(edu.degree || edu.location || formattedGrade) && (
                      <div className="t17-entry-subtitle">
                        {edu.degree || ""}
                        {edu.degree && edu.location && "  ·  "}
                        {edu.location || ""}
                        {formattedGrade && <div className="t17-education-grade">{formattedGrade}</div>}
                      </div>
                    )}
                    {eduTextHtml && (
                      <div className="t17-edu-content" dangerouslySetInnerHTML={{ __html: eduTextHtml }} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SKILLS */}
          {skills && renderSkills()}

          {/* CUSTOM SECTIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.customSection) &&
            finalize.customSection.some(
              (s: any) => s?.name?.trim() || s?.description?.trim()
            ) &&
            finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map((section: any, index: number) => (
                <div key={section.id || index} className="t17-section-block">
                  <div className="t17-section-header">
                    <div className="t17-section-title">{section.name || "Additional"}</div>
                    <div className="t17-section-line" />
                  </div>
                  {section.description && (
                    <div
                      className="t17-custom-section-content"
                      dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
                    />
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSeventeen;