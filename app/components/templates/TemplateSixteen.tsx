
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";

// const TemplateSixteen: React.FC = () => {
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
//     background-color: #ffffff;
//     padding: 36px 36px 28px;
//     border-bottom: 1px solid #e2e2e2;
//     position: relative;
//     text-align: left;
//   }

//   .header-accent-line {
//     width: 48px;
//     height: 3px;
//     background: #7a8c96;
//     margin-bottom: 18px;
//   }

//   .header-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 52px;
//     font-weight: 300;
//     line-height: 1.0;
//     letter-spacing: 1px;
//     color: #1a1a1a;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .header-name strong {
//     font-weight: 600;
//   }

//   .header-jobtitle {
//     font-family: 'Jost', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #7a8c96;
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .header-meta-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px 24px;
//     font-size: 11.5px;
//     color: #666;
//     font-weight: 300;
//     text-align: left;
//   }

//   .header-meta-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     text-align: left;
//   }

//   .header-meta-dot {
//     width: 3px;
//     height: 3px;
//     border-radius: 50%;
//     background: #7a8c96;
//     flex-shrink: 0;
//   }

//   .header-meta-item a {
//     color: #7a8c96;
//     text-decoration: none;
//     border-bottom: 1px solid #c5d0d6;
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
//     margin-bottom: 18px;
//     text-align: left;
//   }

//   .section-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 20px;
//     font-weight: 500;
//     color: #1a1a1a;
//     letter-spacing: 0.5px;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .section-title-ornament {
//     color: #7a8c96;
//     font-size: 14px;
//     font-weight: 300;
//     flex-shrink: 0;
//   }

//   .section-title-line {
//     flex: 1;
//     height: 1px;
//     background: linear-gradient(to right, #c8d2d8, transparent);
//   }

//   /* ── SUMMARY ── */
//   .summary-text {
//     font-size: 16px;
//     line-height: 1.85;
//     color: #444;
//     font-weight: 300;
// //     font-style: italic;
//     padding: 16px 20px;
//     background: #ffffff;
//     border: 1px solid #e8ecee;
//     border-left: 3px solid #7a8c96;
//     border-radius: 0 4px 4px 0;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .entry-block {
//     margin-bottom: 20px;
//     padding: 16px 18px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//     text-align: left;
//   }

//   .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 3px;
//     text-align: left;
//   }

//   .entry-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 18px;
//     font-weight: 600;
//     color: #1a1a1a;
//     line-height: 1.2;
//     text-align: left;
//   }

//   .entry-date {
//     font-family: 'Jost', sans-serif;
//     font-size: 10.5px;
//     font-weight: 400;
//     letter-spacing: 1px;
//     color: #7a8c96;
//     white-space: nowrap;
//     background: #f0f4f6;
//     padding: 3px 10px;
//     border-radius: 20px;
//     text-align: left;
//   }

//   .entry-subtitle {
//     font-family: 'Jost', sans-serif;
//     font-size: 11.5px;
//     font-weight: 400;
//     color: #888;
//     letter-spacing: 0.5px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .entry-content {
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
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
//     margin-bottom: 3px !important;
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
//     gap: 14px;
//     padding: 9px 14px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//     text-align: left;
//   }

//   .skill-name-label {
//     font-family: 'Jost', sans-serif;
//     font-size: 12px;
//     font-weight: 400;
//     color: #2c2c2c;
//     min-width: 140px;
//     text-align: left;
//   }

//   .skill-track {
//     flex: 1;
//     height: 3px;
//     background: #e8ecee;
//     border-radius: 2px;
//     max-width: 180px;
//   }

//   .skill-fill {
//     height: 100%;
//     background: linear-gradient(to right, #7a8c96, #a8b8bf);
//     border-radius: 2px;
//   }

//   /* ── LANGUAGES ── */
//   .lang-row {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     padding: 9px 14px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//     margin-bottom: 10px;
//     text-align: left;
//   }

//   .lang-name {
//     font-family: 'Jost', sans-serif;
//     font-size: 12px;
//     font-weight: 400;
//     color: #2c2c2c;
//     min-width: 140px;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .additional-content {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     text-align: left;
//   }

//   .additional-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     padding: 10px 14px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     color: #555;
//     font-weight: 300;
//     line-height: 1.6;
//     text-align: left;
//   }

//   .additional-accent {
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: #7a8c96;
//     margin-top: 6px;
//     flex-shrink: 0;
//   }

//   /* ── EDU CONTENT ── */
//   .edu-content {
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
//     text-align: left;
//   }

//   .edu-list {
//     list-style-type: disc !important;
//     padding-left: 18px !important;
//     margin: 4px 0 !important;
//   }

//   .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.65;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .custom-section-content {
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page {
//       size: A4;
//       margin: 14mm 0;
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
//       background-color: #fafafa !important;
//     }

//     .entry-block,
//     .skill-row,
//     .lang-row,
//     .additional-item {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
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

//     .summary-text {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .skill-fill {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   }

//   @media (max-width: 768px) {
//     .resume-container {
//       width: 100%;
//     }

//     .header-block {
//       padding: 24px 20px 20px;
//     }

//     .header-name {
//       font-size: 36px;
//     }

//     .resume-body {
//       padding: 20px;
//     }

//     .entry-top-row {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .skill-name-label,
//     .lang-name {
//       min-width: 110px;
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
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const sectionBlock = (title: string, content: string) => `
//       <div class="section-block">
//         <div class="section-header">
//           <span class="section-title">${title}</span>
//           <span class="section-title-ornament">&#10022;</span>
//           <div class="section-title-line"></div>
//         </div>
//         ${content}
//       </div>`;

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//       <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="resume-container">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-accent-line"></div>
//           <div class="header-name">
//             ${contact?.firstName || ""} <strong>${contact?.lastName || ""}</strong>
//           </div>
//           <div class="header-jobtitle">
//             ${contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div class="header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="header-meta-item"><span class="header-meta-dot"></span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item"><span class="header-meta-dot"></span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item"><span class="header-meta-dot"></span>${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><span class="header-meta-dot"></span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><span class="header-meta-dot"></span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="resume-body">

//           ${summary ? sectionBlock("Profile", `<div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>`) : ""}

//           ${experiences.length > 0 ? sectionBlock("Experience", experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, true);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//             return `
//             <div class="entry-block">
//               <div class="entry-top-row">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-date">${startFormatted} – ${endFormatted}</div>
//               </div>
//               <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `  ·  ${exp.location}` : ""}</div>
//               ${exp.text ? renderEntryText(exp.text) : ""}
//             </div>`;
//           }).join("")) : ""}

//           ${educations.length > 0 ? sectionBlock("Education", educations.map((edu) => {
//             const dateStr = edu.startDate || edu.endDate
//               ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//               : "";
//             let textHtml = "";
//             if (edu.text) {
//               if (edu.text.includes("<") && edu.text.includes(">")) {
//                 textHtml = `<div class="edu-content">${edu.text}</div>`;
//               } else {
//                 const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                 if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                   textHtml = `<ul class="edu-list">${lines.map((l: string) => {
//                     const t = l.trim();
//                     const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                     return c ? `<li>${c}</li>` : "";
//                   }).join("")}</ul>`;
//                 } else {
//                   textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
//                 }
//               }
//             }
//             return `
//             <div class="entry-block">
//               <div class="entry-top-row">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
//               </div>
//               ${edu.degree || edu.location ? `<div class="entry-subtitle">${edu.degree || ""}${edu.degree && edu.location ? "  ·  " : ""}${edu.location || ""}</div>` : ""}
//               ${textHtml}
//             </div>`;
//           }).join("")) : ""}

//           ${skills.length > 0 ? sectionBlock("Skills", `<div class="skills-list">${skills.map((s) => `
//             <div class="skill-row">
//               <span class="skill-name-label">${s.skill || ""}</span>
//               ${s.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(s.level) / 4) * 100}%"></div></div>` : ""}
//             </div>`).join("")}</div>`) : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "")
//             ? sectionBlock("Languages", `<div class="skills-list">${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//               <div class="lang-row">
//                 <span class="lang-name">${l.name}</span>
//                 ${l.level ? `<div class="skill-track"><div class="skill-fill" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//               </div>`).join("")}</div>`)
//             : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//             ? sectionBlock("Certifications &amp; Licenses", `<div class="additional-content">${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><div class="additional-accent"></div><div>${i.name}</div></div>`
//               ).join("")}</div>`)
//             : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//             ? sectionBlock("Hobbies &amp; Interests", `<div class="additional-content">${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><div class="additional-accent"></div><div>${i.name}</div></div>`
//               ).join("")}</div>`)
//             : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//             ? sectionBlock("Awards &amp; Honors", `<div class="additional-content">${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><div class="additional-accent"></div><div>${i.name}</div></div>`
//               ).join("")}</div>`)
//             : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== ""))
//             ? sectionBlock("Websites &amp; Social Media", `<div class="additional-content">${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) =>
//                 `<div class="additional-item"><div class="additional-accent"></div><div>${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? "  ·  " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div></div>`
//               ).join("")}</div>`)
//             : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "")
//             ? sectionBlock("References", `<div class="additional-content">${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item"><div class="additional-accent"></div><div>${i.name}</div></div>`
//               ).join("")}</div>`)
//             : ""}

//           ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim())
//             ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) =>
//                 sectionBlock(s.name || "", s.description ? `<div class="custom-section-content">${s.description}</div>` : "")
//               ).join("")
//             : ""}

//         </div>
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
//      SECTION WRAPPER (React)
//   ====================================================== */
//   const Section = ({
//     title,
//     children,
//   }: {
//     title: string;
//     children: React.ReactNode;
//   }) => (
//     <div className="section-block">
//       <div className="section-header">
//         <span className="section-title">{title}</span>
//         <span className="section-title-ornament">✦</span>
//         <div className="section-title-line" />
//       </div>
//       {children}
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
//         className="resume-container bg-white"
//         style={{ margin: "0 auto", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-block">
//           <div className="header-accent-line" />
//           <div className="header-name">
//             {contact?.firstName}{" "}
//             <strong>{contact?.lastName}</strong>
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
//                 <span className="header-meta-dot" />
//                 {addressParts.join(", ")}
//               </span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">
//                 <span className="header-meta-dot" />
//                 {contact.email}
//               </span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">
//                 <span className="header-meta-dot" />
//                 {contact.phone}
//               </span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <span className="header-meta-dot" />
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <span className="header-meta-dot" />
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">
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
//             <Section title="Profile">
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             </Section>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <Section title="Experience">
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
//                     {exp.employer}{exp.location && `  ·  ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </Section>
//           )}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <Section title="Education">
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = (
//                       <div className="edu-content" dangerouslySetInnerHTML={{ __html: edu.text }} />
//                     );
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
//                           {edu.startDate || ""}{edu.startDate && edu.endDate && " – "}{edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}{edu.degree && edu.location && "  ·  "}{edu.location || ""}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 );
//               })}
//             </Section>
//           )}

//           {/* SKILLS */}
//           {skills.length > 0 && (
//             <Section title="Skills">
//               <div className="skills-list">
//                 {skills.map((skill, i) => (
//                   <div key={i} className="skill-row">
//                     <span className="skill-name-label">{skill.skill}</span>
//                     {skill.level && (
//                       <div className="skill-track">
//                         <div className="skill-fill" style={{ width: `${(Number(skill.level) / 4) * 100}%` }} />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Section>
//           )}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
//               <Section title="Languages">
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name && lang.name.trim() !== "" && (
//                         <div key={lang._id || index} className="lang-row">
//                           <span className="lang-name">{lang.name}</span>
//                           {lang.level && (
//                             <div className="skill-track">
//                               <div className="skill-fill" style={{ width: `${(Number(lang.level) / 4) * 100}%` }} />
//                             </div>
//                           )}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </Section>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <Section title="Certifications & Licenses">
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-accent" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </Section>
//             )}

//           {/* HOBBIES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <Section title="Hobbies & Interests">
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-accent" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </Section>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <Section title="Awards & Honors">
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-accent" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </Section>
//             )}

//           {/* WEBSITES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== ""),
//             ) && (
//               <Section title="Websites & Social Media">
//                 <div className="additional-content">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-accent" />
//                           <div>
//                             {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                             {item.websiteUrl && item.socialMedia && "  ·  "}
//                             {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                           </div>
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </Section>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.references) &&
//             finalize.references.some(
//               (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <Section title="References">
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item">
//                           <div className="additional-accent" />
//                           <div dangerouslySetInnerHTML={{ __html: item.name }} />
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </Section>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) &&
//             finalize.customSection
//               .filter((s) => s?.name?.trim() || s?.description?.trim())
//               .map((section, index) => (
//                 <Section key={section.id || index} title={section.name || ""}>
//                   {section.description && (
//                     <div
//                       className="custom-section-content"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </Section>
//               ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSixteen;