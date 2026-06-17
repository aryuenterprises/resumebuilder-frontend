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

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSixteen: React.FC<ResumeProps> = ({ alldata }) => {
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
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   // Helper function to render skills (using cleanQuillHTML)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

//     return (
//       <div className="t16-section-block">
//         <div className="t16-section-header">
//           <span className="t16-section-title">Skills</span>
//           <span className="t16-section-ornament">✦</span>
//           <div className="t16-section-line" />
//         </div>
//         <div
//           className="t16-skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="t16-section-block">
//         <div className="t16-section-header">
//           <span className="t16-section-title">Projects</span>
//           <span className="t16-section-ornament">✦</span>
//           <div className="t16-section-line" />
//         </div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t16-entry-block">
//             <div className="t16-entry-top-row">
//               <div className="t16-entry-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t16-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t16-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t16-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t16-project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="t16-entry-content"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | SLATE GRAY | SOFT & ELEGANT
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

//   .t16-resume-container {
//     width: 210mm;
//     min-height: 297mm;
//     box-sizing: border-box;
//     background-color: #fafafa;
//     font-family: 'Jost', sans-serif;
//     color: #2c2c2c;
//     text-align: left;
//   }

//   .t16-resume-container.is-preview {
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

//   /* Fix p tag spacing */
//   .t16-resume-container p {
//     margin: 0 0 4px 0 !important;
//     padding: 0 !important;
//     line-height: 1.6 !important;
//   }

//   .t16-resume-container p:last-child {
//     margin-bottom: 0 !important;
//   }

//   /* Rich text content styles */
//   .t16-resume-container .t16-entry-content ul,
//   .t16-resume-container .t16-entry-content ol,
//   .t16-resume-container .t16-skills-content ul,
//   .t16-resume-container .t16-skills-content ol,
//   .t16-resume-container .t16-edu-content ul,
//   .t16-resume-container .t16-edu-content ol,
//   .t16-resume-container .t16-custom-section-content ul,
//   .t16-resume-container .t16-custom-section-content ol {
//     margin: 4px 0 4px 20px !important;
//     padding-left: 20px !important;
//   }

//   .t16-resume-container .t16-entry-content li,
//   .t16-resume-container .t16-skills-content li,
//   .t16-resume-container .t16-edu-content li,
//   .t16-resume-container .t16-custom-section-content li {
//     margin-bottom: 2px !important;
//     line-height: 1.6 !important;
//   }

//   .t16-resume-container .t16-entry-content ul,
//   .t16-resume-container .t16-skills-content ul,
//   .t16-resume-container .t16-edu-content ul,
//   .t16-resume-container .t16-custom-section-content ul {
//     list-style-type: disc !important;
//   }

//   .t16-resume-container .t16-entry-content ol,
//   .t16-resume-container .t16-skills-content ol,
//   .t16-resume-container .t16-edu-content ol,
//   .t16-resume-container .t16-custom-section-content ol {
//     list-style-type: decimal !important;
//   }

//   .t16-resume-container .t16-entry-content strong,
//   .t16-resume-container .t16-skills-content strong,
//   .t16-resume-container .t16-edu-content strong,
//   .t16-resume-container .t16-custom-section-content strong {
//     font-weight: 600 !important;
//   }

//   .t16-resume-container .t16-entry-content em,
//   .t16-resume-container .t16-skills-content em,
//   .t16-resume-container .t16-edu-content em,
//   .t16-resume-container .t16-custom-section-content em {
//     font-style: italic !important;
//   }

//   .t16-resume-container .t16-entry-content u,
//   .t16-resume-container .t16-skills-content u,
//   .t16-resume-container .t16-edu-content u,
//   .t16-resume-container .t16-custom-section-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t16-resume-container .t16-entry-content p,
//   .t16-resume-container .t16-skills-content p,
//   .t16-resume-container .t16-edu-content p,
//   .t16-resume-container .t16-custom-section-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Skills content styling */
//   .t16-resume-container .t16-skills-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
//     padding: 12px 16px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//   }

//   /* Custom Section Content */
//   .t16-resume-container .t16-custom-section-content {
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
//     text-align: left;
//     padding: 12px 16px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//   }

//   /* Project links */
//   .t16-resume-container .t16-project-links {
//     display: flex;
//     gap: 15px;
//   }

//   .t16-resume-container .t16-project-link {
//     font-size: 10px;
//     font-weight: 500;
//     color: #7a8c96;
//     text-decoration: underline;
//   }

//   .t16-resume-container .t16-project-tech-stack {
//     font-size: 11px;
//     color: #888;
//     margin: 6px 0;
//   }

//   /* ── HEADER ── */
//   .t16-resume-container .t16-header-block {
//     background-color: #ffffff;
//     padding: 36px 36px 28px;
//     border-bottom: 1px solid #e2e2e2;
//     position: relative;
//     text-align: left;
//   }

//   .t16-resume-container .t16-header-accent-line {
//     width: 48px;
//     height: 3px;
//     background: #7a8c96;
//     margin-bottom: 18px;
//   }

//   .t16-resume-container .t16-header-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 52px;
//     font-weight: 300;
//     line-height: 1.0;
//     letter-spacing: 1px;
//     color: #1a1a1a;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-header-name strong {
//     font-weight: 600;
//   }

//   .t16-resume-container .t16-header-jobtitle {
//     font-family: 'Jost', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #7a8c96;
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-header-meta-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px 24px;
//     font-size: 11.5px;
//     color: #666;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t16-resume-container .t16-header-meta-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-header-meta-dot {
//     width: 3px;
//     height: 3px;
//     border-radius: 50%;
//     background: #7a8c96;
//     flex-shrink: 0;
//   }

//   .t16-resume-container .t16-header-meta-item a {
//     color: #7a8c96;
//     text-decoration: none;
//     border-bottom: 1px solid #c5d0d6;
//   }

//   /* ── BODY ── */
//   .t16-resume-container .t16-resume-body {
//     padding: 28px 36px 36px;
//     text-align: left;
//   }

//   /* ── SECTION ── */
//   .t16-resume-container .t16-section-block {
//     margin-bottom: 28px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-section-header {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin-bottom: 18px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-section-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 20px;
//     font-weight: 500;
//     color: #1a1a1a;
//     letter-spacing: 0.5px;
//     white-space: nowrap;
//     text-align: left;
//   }

//   .t16-resume-container .t16-section-ornament {
//     color: #7a8c96;
//     font-size: 14px;
//     font-weight: 300;
//     flex-shrink: 0;
//   }

//   .t16-resume-container .t16-section-line {
//     flex: 1;
//     height: 1px;
//     background: linear-gradient(to right, #c8d2d8, transparent);
//   }

//   /* ── SUMMARY ── */
//   .t16-resume-container .t16-summary-text {
//     font-size: 16px;
//     line-height: 1.85;
//     color: #444;
//     font-weight: 300;
//     padding: 16px 20px;
//     background: #ffffff;
//     border: 1px solid #e8ecee;
//     border-left: 3px solid #7a8c96;
//     border-radius: 0 4px 4px 0;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t16-resume-container .t16-entry-block {
//     margin-bottom: 20px;
//     padding: 16px 18px;
//     background: #ffffff;
//     border: 1px solid #ebebeb;
//     border-radius: 4px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t16-resume-container .t16-entry-top-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 8px;
//     flex-wrap: wrap;
//     margin-bottom: 3px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-entry-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 18px;
//     font-weight: 600;
//     color: #1a1a1a;
//     line-height: 1.2;
//     text-align: left;
//   }

//   .t16-resume-container .t16-entry-date {
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

//   .t16-resume-container .t16-entry-subtitle {
//     font-family: 'Jost', sans-serif;
//     font-size: 11.5px;
//     font-weight: 400;
//     color: #888;
//     letter-spacing: 0.5px;
//     margin-bottom: 8px;
//     text-align: left;
//   }

//   .t16-resume-container .t16-entry-content {
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
//     text-align: left;
//   }

//   /* ── EDU CONTENT ── */
//   .t16-resume-container .t16-edu-content {
//     font-family: 'Jost', sans-serif;
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #555;
//     font-weight: 300;
//     text-align: left;
//     margin-top: 8px;
//   }

//   /* Education Grade */
//   .t16-resume-container .t16-education-grade {
//     font-size: 11px;
//     color: #6b7c93;
//     margin-top: 4px;
//     font-weight: 500;
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
//     }

//     .t16-resume-container {
//       width: 100% !important;
//       box-shadow: none !important;
//       background-color: #fafafa !important;
//     }

//     .t16-entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t16-section-header {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t16-summary-text {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
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
//         return `<div class="t16-entry-content t16-entry-content-desc">${cleanQuillHTML(text)}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="t16-entry-content t16-entry-content-desc"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c ? `<li style="margin-bottom:3px;line-height:1.65;list-style-type:disc!important;">${c}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="t16-entry-content t16-entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const sectionBlock = (title: string, content: string) => `
//       <div class="t16-section-block">
//         <div class="t16-section-header">
//           <span class="t16-section-title">${title}</span>
//           <span class="t16-section-ornament">&#10022;</span>
//           <div class="t16-section-line"></div>
//         </div>
//         ${content}
//       </div>`;

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="t16-section-block">
//           <div class="t16-section-header">
//             <span class="t16-section-title">Skills</span>
//             <span class="t16-section-ornament">&#10022;</span>
//             <div class="t16-section-line"></div>
//           </div>
//           <div class="t16-skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t16-section-block">
//           <div class="t16-section-header">
//             <span class="t16-section-title">Projects</span>
//             <span class="t16-section-ornament">&#10022;</span>
//             <div class="t16-section-line"></div>
//           </div>
//           ${projects.map((project: any) => `
//             <div class="t16-entry-block">
//               <div class="t16-entry-top-row">
//                 <div class="t16-entry-title">${project.title || ""}</div>
//                 <div class="t16-project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t16-project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t16-project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="t16-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="t16-entry-content">${cleanQuillHTML(project.description)}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML for PDF
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
//           <div class="t16-section-block">
//             <div class="t16-section-header">
//               <span class="t16-section-title">${s.name || "Additional"}</span>
//               <span class="t16-section-ornament">&#10022;</span>
//               <div class="t16-section-line"></div>
//             </div>
//             ${s.description ? `<div class="t16-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//           </div>
//         `,
//         )
//         .join("");
//     };

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
//       <div class="t16-resume-container">

//         <!-- HEADER -->
//         <div class="t16-header-block">
//           <div class="t16-header-accent-line"></div>
//           <div class="t16-header-name">
//             ${contact?.firstName || ""} <strong>${contact?.lastName || ""}</strong>
//           </div>
//           <div class="t16-header-jobtitle">
//             ${contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div class="t16-header-meta-grid">
//             ${addressParts.length > 0 ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- BODY -->
//         <div class="t16-resume-body">

//           ${summary ? sectionBlock("Profile", `<div class="t16-summary-text">${cleanQuillHTML(summary)}</div>`) : ""}

//           ${experiences.length > 0 ? sectionBlock("Experience", experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, false);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//             const companyLocation = [exp.employer, exp.location].filter(Boolean).join("  ·  ");
//             return `
//             <div class="t16-entry-block">
//               <div class="t16-entry-top-row">
//                 <div class="t16-entry-title">${exp.jobTitle || ""}</div>
//                 <div class="t16-entry-date">${startFormatted} – ${endFormatted}</div>
//               </div>
//               <div class="t16-entry-subtitle">${companyLocation}</div>
//               ${exp.text ? renderEntryText(exp.text) : ""}
//             </div>`;
//           }).join("")) : ""}

//           ${generateProjectsHTML()}

//           ${educations.length > 0 ? sectionBlock("Education", educations.map((edu) => {
//             const dateStr = edu.startDate || edu.endDate
//               ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//               : "";
//             const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//             return `
//             <div class="t16-entry-block">
//               <div class="t16-entry-top-row">
//                 <div class="t16-entry-title">${edu.schoolname || ""}</div>
//                 ${dateStr ? `<div class="t16-entry-date">${dateStr}</div>` : ""}
//               </div>
//               ${edu.degree || edu.location || formattedGrade ? `<div class="t16-entry-subtitle">
//                 ${edu.degree || ""}
//                 ${edu.degree && edu.location ? "  ·  " : ""}
//                 ${edu.location || ""}
//                 ${formattedGrade ? `<div class="t16-education-grade">${formattedGrade}</div>` : ""}
//               </div>` : ""}
//               ${eduTextHtml ? `<div class="t16-edu-content">${eduTextHtml}</div>` : ""}
//             </div>`;
//           }).join("")) : ""}

//           ${generateSkillsHTML()}

//           ${generateCustomSectionsHTML()}

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
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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

//       <div
//         className={`t16-resume-container ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t16-header-block">
//           <div className="t16-header-accent-line" />
//           <div className="t16-header-name">
//             {contact?.firstName}{" "}
//             <strong>{contact?.lastName}</strong>
//           </div>
//           <div className="t16-header-jobtitle">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="t16-header-meta-grid">
//             {addressParts.length > 0 && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 {addressParts.join(", ")}
//               </span>
//             )}
//             {contact?.email && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 {contact.email}
//               </span>
//             )}
//             {contact?.phone && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 {contact.phone}
//               </span>
//             )}
//             {formattedDob && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 {formattedDob}
//               </span>
//             )}
//             {linkedinUrl && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {githubUrl && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">
//                   GitHub
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="t16-header-meta-item">
//                 <span className="t16-header-meta-dot" />
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">
//                   Portfolio
//                 </a>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t16-resume-body">

//           {/* SUMMARY */}
//           {summary && (
//             <div className="t16-section-block">
//               <div className="t16-section-header">
//                 <span className="t16-section-title">Profile</span>
//                 <span className="t16-section-ornament">✦</span>
//                 <div className="t16-section-line" />
//               </div>
//               <div
//                 className="t16-summary-text"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="t16-section-block">
//               <div className="t16-section-header">
//                 <span className="t16-section-title">Experience</span>
//                 <span className="t16-section-ornament">✦</span>
//                 <div className="t16-section-line" />
//               </div>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 const companyLocation = [exp.employer, exp.location].filter(Boolean).join("  ·  ");
//                 return (
//                   <div key={i} className="t16-entry-block">
//                     <div className="t16-entry-top-row">
//                       <div className="t16-entry-title">{exp.jobTitle}</div>
//                       <div className="t16-entry-date">{start} – {end}</div>
//                     </div>
//                     <div className="t16-entry-subtitle">{companyLocation}</div>
//                     {exp.text && (
//                       <div
//                         className="t16-entry-content t16-entry-content-desc"
//                         dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
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
//             <div className="t16-section-block">
//               <div className="t16-section-header">
//                 <span className="t16-section-title">Education</span>
//                 <span className="t16-section-ornament">✦</span>
//                 <div className="t16-section-line" />
//               </div>
//               {educations.map((edu, index) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 return (
//                   <div key={edu.id || index} className="t16-entry-block">
//                     <div className="t16-entry-top-row">
//                       <div className="t16-entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="t16-entry-date">
//                           {edu.startDate || ""}{edu.startDate && edu.endDate && " – "}{edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location || formattedGrade) && (
//                       <div className="t16-entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && "  ·  "}
//                         {edu.location || ""}
//                         {formattedGrade && <div className="t16-education-grade">{formattedGrade}</div>}
//                       </div>
//                     )}
//                     {eduTextHtml && (
//                       <div className="t16-edu-content" dangerouslySetInnerHTML={{ __html: eduTextHtml }} />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {skills && renderSkills()}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s: any) => s?.name?.trim() || s?.description?.trim()
//             ) &&
//             finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map((section: any, index: number) => (
//                 <div key={section.id || index} className="t16-section-block">
//                   <div className="t16-section-header">
//                     <span className="t16-section-title">{section.name || "Additional"}</span>
//                     <span className="t16-section-ornament">✦</span>
//                     <div className="t16-section-line" />
//                   </div>
//                   {section.description && (
//                     <div
//                       className="t16-custom-section-content"
//                       dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSixteen;

"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateSixteenProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateSixteen: React.FC<TemplateSixteenProps> = ({
  alldata,
  customization,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  const activeFontFamily = customization?.fontFamily ?? "'Jost', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
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

  // ── Font map ───────────────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const fontMap: Record<string, string> = {
      "'Jost', sans-serif":
        "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap",
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
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
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return (
      fontMap[fontFamily] ||
      "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap"
    );
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ────────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 0; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t16-resume {
      width: ${A4_W}px;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      color: #2c2c2c;
      box-sizing: border-box;
    }

    .t16-resume * { box-sizing: border-box; }

    .t16-resume p {
      margin: 0 0 4px 0 !important;
      padding: 0 !important;
      line-height: 1.6 !important;
    }
    .t16-resume p:last-child { margin-bottom: 0 !important; }

    /* Rich text */
    .t16-resume .t16-entry-content ul,
    .t16-resume .t16-entry-content ol,
    .t16-resume .t16-skills-content ul,
    .t16-resume .t16-skills-content ol,
    .t16-resume .t16-edu-content ul,
    .t16-resume .t16-edu-content ol,
    .t16-resume .t16-custom-section-content ul,
    .t16-resume .t16-custom-section-content ol {
      margin: 4px 0 4px 20px !important;
      padding-left: 20px !important;
    }
    .t16-resume .t16-entry-content li,
    .t16-resume .t16-skills-content li,
    .t16-resume .t16-edu-content li,
    .t16-resume .t16-custom-section-content li {
      margin-bottom: 2px !important;
      line-height: 1.6 !important;
    }
    .t16-resume .t16-entry-content ul,
    .t16-resume .t16-skills-content ul,
    .t16-resume .t16-edu-content ul,
    .t16-resume .t16-custom-section-content ul { list-style-type: disc !important; }
    .t16-resume .t16-entry-content ol,
    .t16-resume .t16-skills-content ol,
    .t16-resume .t16-edu-content ol,
    .t16-resume .t16-custom-section-content ol { list-style-type: decimal !important; }
    .t16-resume .t16-entry-content strong,
    .t16-resume .t16-skills-content strong,
    .t16-resume .t16-edu-content strong,
    .t16-resume .t16-custom-section-content strong { font-weight: 600 !important; }
    .t16-resume .t16-entry-content em,
    .t16-resume .t16-skills-content em,
    .t16-resume .t16-edu-content em,
    .t16-resume .t16-custom-section-content em { font-style: italic !important; }
    .t16-resume .t16-entry-content u,
    .t16-resume .t16-skills-content u,
    .t16-resume .t16-edu-content u,
    .t16-resume .t16-custom-section-content u { text-decoration: underline !important; }
    .t16-resume .t16-entry-content p,
    .t16-resume .t16-skills-content p,
    .t16-resume .t16-edu-content p,
    .t16-resume .t16-custom-section-content p { white-space: pre-wrap !important; }

    /* Skills */
    .t16-resume .t16-skills-content {
      font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
      padding: 12px 16px; background: #ffffff;
      border: 1px solid #ebebeb; border-radius: 4px;
    }

    /* Custom Section */
    .t16-resume .t16-custom-section-content {
      font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
      padding: 12px 16px; background: #ffffff;
      border: 1px solid #ebebeb; border-radius: 4px;
    }

    /* Project links */
    .t16-resume .t16-project-links { display: flex; gap: 15px; }
    .t16-resume .t16-project-link {
      font-size: 10px; font-weight: 500; color: #7a8c96; text-decoration: underline;
    }
    .t16-resume .t16-project-tech-stack { font-size: 11px; color: #888; margin: 6px 0; }

    /* HEADER */
    .t16-resume .t16-header-block {
      background-color: #ffffff;
      padding: 36px 36px 28px;
      border-bottom: 1px solid #e2e2e2;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .t16-resume .t16-header-accent-line {
      width: 48px; height: 3px; background: #7a8c96; margin-bottom: 18px;
    }
    .t16-resume .t16-header-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px; font-weight: 300; line-height: 1.0;
      letter-spacing: 1px; color: #1a1a1a; margin-bottom: 8px;
    }
    .t16-resume .t16-header-name strong { font-weight: 600; }
    .t16-resume .t16-header-jobtitle {
      font-size: 11px; font-weight: 500; letter-spacing: 3.5px;
      text-transform: uppercase; color: #7a8c96; margin-bottom: 22px;
    }
    .t16-resume .t16-header-meta-grid {
      display: flex; flex-wrap: wrap; gap: 8px 24px;
      font-size: 11.5px; color: #666; font-weight: 300;
    }
    .t16-resume .t16-header-meta-item {
      display: flex; align-items: center; gap: 6px;
    }
    .t16-resume .t16-header-meta-dot {
      width: 3px; height: 3px; border-radius: 50%;
      background: #7a8c96; flex-shrink: 0;
    }
    .t16-resume .t16-header-meta-item a {
      color: #7a8c96; text-decoration: none; border-bottom: 1px solid #c5d0d6;
    }

    /* BODY */
    .t16-resume .t16-resume-body { padding: 28px 36px 36px; }

    /* SECTION */
    .t16-resume .t16-section-block {
      margin-bottom: 28px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .t16-resume .t16-section-block:last-child { margin-bottom: 0; }
    .t16-resume .t16-section-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
      page-break-after: avoid; break-after: avoid;
    }
    .t16-resume .t16-section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px; font-weight: 500; color: #1a1a1a;
      letter-spacing: 0.5px; white-space: nowrap;
    }
    .t16-resume .t16-section-ornament {
      color: #7a8c96; font-size: 14px; font-weight: 300; flex-shrink: 0;
    }
    .t16-resume .t16-section-line {
      flex: 1; height: 1px;
      background: linear-gradient(to right, #c8d2d8, transparent);
    }

    /* SUMMARY */
    .t16-resume .t16-summary-text {
      font-size: 16px; line-height: 1.85; color: #444; font-weight: 300;
      padding: 16px 20px; background: #ffffff;
      border: 1px solid #e8ecee; border-left: 3px solid #7a8c96;
      border-radius: 0 4px 4px 0;
    }

    /* ENTRY BLOCKS */
    .t16-resume .t16-entry-block {
      margin-bottom: 20px; padding: 16px 18px;
      background: #ffffff; border: 1px solid #ebebeb; border-radius: 4px;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t16-resume .t16-entry-block:last-child { margin-bottom: 0; }
    .t16-resume .t16-entry-top-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      gap: 8px; flex-wrap: wrap; margin-bottom: 3px;
    }
    .t16-resume .t16-entry-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.2;
    }
    .t16-resume .t16-entry-date {
      font-size: 10.5px; font-weight: 400; letter-spacing: 1px;
      color: #7a8c96; white-space: nowrap;
      background: #f0f4f6; padding: 3px 10px; border-radius: 20px;
    }
    .t16-resume .t16-entry-subtitle {
      font-size: 11.5px; font-weight: 400; color: #888;
      letter-spacing: 0.5px; margin-bottom: 8px;
    }
    .t16-resume .t16-entry-content {
      font-size: 12.5px; line-height: 1.7; color: #555; font-weight: 300;
    }
    .t16-resume .t16-edu-content {
      font-size: 12.5px; line-height: 1.7; color: #555;
      font-weight: 300; margin-top: 8px;
    }
    .t16-resume .t16-education-grade {
      font-size: 11px; color: #6b7c93; margin-top: 4px; font-weight: 500;
    }

    /* Page break marker */
    .t16-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
      .t16-resume {
        width: ${A4_W}px !important;
        box-shadow: none !important;
      }
      .t16-resume .t16-header-block,
      .t16-resume .t16-skills-content,
      .t16-resume .t16-summary-text,
      .t16-resume .t16-custom-section-content {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
 // AFTER
const generateHTML = useCallback(
  (forPDF = false, pageBreakIds: string[] = [], skillsCutIndex = -1): string => {
      const CSS = buildCSS(activeFontFamily);
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;

      const sectionHeader = (title: string) => `
        <div class="t16-section-header">
          <span class="t16-section-title">${title}</span>
          <span class="t16-section-ornament">&#10022;</span>
          <div class="t16-section-line"></div>
        </div>`;

      // Header
      const headerBlock = `
        <div class="t16-header-block" data-block-id="header">
          <div class="t16-header-accent-line"></div>
          <div class="t16-header-name">
            ${contact?.firstName || ""} <strong>${contact?.lastName || ""}</strong>
          </div>
          <div class="t16-header-jobtitle">${
            contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""
          }</div>
          <div class="t16-header-meta-grid">
            ${addressParts.length > 0 ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${contact.phone}</span>` : ""}
            ${formattedDob ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span>${formattedDob}</span>` : ""}
            ${linkedinUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(linkedinUrl)}">LinkedIn</a></span>` : ""}
            ${githubUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(githubUrl)}">GitHub</a></span>` : ""}
            ${portfolioUrl ? `<span class="t16-header-meta-item"><span class="t16-header-meta-dot"></span><a href="${href(portfolioUrl)}">Portfolio</a></span>` : ""}
          </div>
        </div>`;

      // Summary
      const summaryBlock = summary?.trim()
        ? `<div class="t16-section-block" data-block-id="summary">
            ${sectionHeader("Profile")}
            <div class="t16-summary-text">${cleanQuillHTML(summary)}</div>
           </div>`
        : "";

      // Experience
      const expBlock = experiences.length
        ? `<div class="t16-section-block" data-block-id="exp-section">
            ${sectionHeader("Experience")}
            ${experiences
              .map((exp: any, i: number) => {
                const s = formatMonthYear(exp.startDate, false);
                const e = exp.endDate
                  ? formatMonthYear(exp.endDate, false)
                  : "Present";
                const companyLocation = [exp.employer, exp.location]
                  .filter(Boolean)
                  .join("  ·  ");
                return `<div class="t16-entry-block" data-block-id="exp-${i}">
                  <div class="t16-entry-top-row">
                    <div class="t16-entry-title">${exp.jobTitle || ""}</div>
                    <div class="t16-entry-date">${s} – ${e}</div>
                  </div>
                  <div class="t16-entry-subtitle">${companyLocation}</div>
                  ${exp.text ? `<div class="t16-entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
                </div>`;
              })
              .join("")}
           </div>`
        : "";

      // Projects
      const projBlock = projects.length
        ? `<div class="t16-section-block" data-block-id="proj-section">
            ${sectionHeader("Projects")}
            ${projects
              .map(
                (p: any, i: number) => `
              <div class="t16-entry-block" data-block-id="proj-${i}">
                <div class="t16-entry-top-row">
                  <div class="t16-entry-title">${p.title || ""}</div>
                  <div class="t16-project-links">
                    ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t16-project-link">Live Demo</a>` : ""}
                    ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t16-project-link">GitHub</a>` : ""}
                  </div>
                </div>
                ${p.techStack?.length ? `<div class="t16-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                ${p.description ? `<div class="t16-entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
              </div>`,
              )
              .join("")}
           </div>`
        : "";

      // Education
      const eduBlock = educations.length
        ? `<div class="t16-section-block" data-block-id="edu-section">
            ${sectionHeader("Education")}
            ${educations
              .map((edu: any, i: number) => {
                const dateStr =
                  edu.startDate || edu.endDate
                    ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                    : "";
                const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                const eduText = edu.text ? cleanQuillHTML(edu.text) : "";
                const schoolLocation = [edu.schoolname, edu.location]
                  .filter(Boolean)
                  .join("  ·  ");
                return `<div class="t16-entry-block" data-block-id="edu-${i}">
                  <div class="t16-entry-top-row">
                    <div class="t16-entry-title">${edu.schoolname || ""}</div>
                    ${dateStr ? `<div class="t16-entry-date">${dateStr}</div>` : ""}
                  </div>
                  ${
                    edu.degree || edu.location || grade
                      ? `
                    <div class="t16-entry-subtitle">
                      ${edu.degree || ""}
                      ${edu.degree && edu.location ? "  ·  " : ""}
                      ${edu.location || ""}
                      ${grade ? `<div class="t16-education-grade">${grade}</div>` : ""}
                    </div>`
                      : ""
                  }
                  ${eduText ? `<div class="t16-edu-content">${eduText}</div>` : ""}
                </div>`;
              })
              .join("")}
           </div>`
        : "";

      // Skills
     // AFTER
// Skills
const skillsClean = cleanQuillHTML(skills || "");
let skillsBlock = "";
if (skillsClean && skillsClean !== "<p><br></p>") {
  if (forPDF && skillsCutIndex >= 0) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = skillsClean;
    const allLis = Array.from(tempDiv.querySelectorAll("li"));
    if (skillsCutIndex < allLis.length) {
      const beforeLis = allLis.slice(0, skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
      const afterLis = allLis.slice(skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
      skillsBlock = `<div class="t16-section-block" data-block-id="skills-section">
          ${sectionHeader("Skills")}
          <div class="t16-skills-content"><ul>${beforeLis}</ul></div>
         </div>
         <div class="t16-page-break"></div>
         <div class="t16-section-block" data-block-id="skills-section-continued">
          ${sectionHeader("Skills (continued)")}
          <div class="t16-skills-content"><ul>${afterLis}</ul></div>
         </div>`;
    }
  }
  if (!skillsBlock) {
    skillsBlock = `<div class="t16-section-block" data-block-id="skills-section">
        ${sectionHeader("Skills")}
        <div class="t16-skills-content" data-block-id="skills-content">${skillsClean}</div>
       </div>`;
  }
}

      // Custom sections
      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
              <div class="t16-section-block" data-block-id="custom-${i}">
                ${sectionHeader(s.name || "Additional")}
                ${s.description ? `<div class="t16-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
              </div>`,
              )
              .join("")
          : "";

      // PDF style — only print-color-adjust, never changes layout
      const pdfStyle = forPDF
        ? `<style>
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      @page { size: A4; margin: ${MARGIN}px !important; }
      .t16-resume { width: ${A4_W - MARGIN * 2}px !important; }
      .t16-resume .t16-header-block,
      .t16-resume .t16-skills-content,
      .t16-resume .t16-summary-text,
      .t16-resume .t16-custom-section-content {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    </style>`
        : "";

      let bodyContent = `${headerBlock}
        <div class="t16-resume-body">
          ${summaryBlock}
          ${expBlock}
          ${projBlock}
          ${eduBlock}
          ${skillsBlock}
          ${customBlock}
        </div>`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t16-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t16-resume">
    ${bodyContent}
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
      addressParts,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      buildCSS,
    ],
  );

  // ── Page splitter ──────────────────────────────────────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t16-resume");
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
<html><head><meta charset="UTF-8"/>
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
.t16-resume {
  width: ${A4_W - MARGIN * 2}px !important;
  margin: 0 !important; box-sizing: border-box !important;
}
  </style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t16-resume");
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

          const getRelTop = (el: HTMLElement) =>
            el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          // Individual items only — NOT section containers
          const ITEM_SELECTORS = [
            ".t16-entry-block",
            ".t16-skills-content",
            ".t16-summary-text",
            ".t16-custom-section-content",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el),
              bottom = getRelBottom(el);
            if (bottom - top > 8)
              blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Section header + first item paired — prevents orphaned headings
          resume
            .querySelectorAll<HTMLElement>(".t16-section-header")
            .forEach((header) => {
              const headerTop = getRelTop(header);
              let firstItem: HTMLElement | null = null;
              let sib = header.nextElementSibling as HTMLElement | null;
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
  if (firstItem.classList.contains("t16-skills-content")) return;

  const deepChild = firstItem.querySelector<HTMLElement>(
    ".t16-entry-block, .t16-summary-text, .t16-custom-section-content",
  );
  const anchor = deepChild || firstItem;
  const anchorBottom = getRelBottom(anchor);
  if (anchorBottom - headerTop > 8) {
    const sectionId = (header.parentElement as HTMLElement)?.dataset?.blockId;
    blocks.push({
      top: headerTop,
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
            let actualCut = naiveCut,
              cutBlockId: string | undefined;
            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (
                block.top >= currentStart &&
                block.bottom > naiveCut &&
                block.top < actualCut
              ) {
                actualCut = block.top;
                cutBlockId = block.id;
              }
            }
            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          const skillsLis = Array.from(resume.querySelectorAll<HTMLElement>(".t16-skills-content li"));
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
  let actualCut = naiveCut, cutBlockId: string | undefined;
  for (const block of blocks) {
    if (block.top >= naiveCut) break;
    if (block.bottom <= currentStart) continue;
    if (block.top >= currentStart && block.bottom > naiveCut && block.top < actualCut) {
      actualCut = block.top;
      cutBlockId = block.id;
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
<html lang="en"><head><meta charset="UTF-8"/>
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
 .page-content-clip {
  position: absolute; top: ${MARGIN}px; left: ${MARGIN}px;
  width: ${A4_W - MARGIN * 2}px; height: ${clipH}px; overflow: hidden;
}
.page-shift {
  position: absolute; top: ${-contentOffsetY}px; left: 0;
  width: ${A4_W - MARGIN * 2}px;
}
.t16-resume {
  width: ${A4_W - MARGIN * 2}px !important;
  margin: 0 !important;
}
</style></head>
<body>
  <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
</body></html>`);
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
    [CSS_FOR_MEASURE],
  );

  // ── Debounced updates ──────────────────────────────────────────────────────
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

  // ── Download ───────────────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    try {
      // AFTER
const pageBreakIds: string[] = ((window as any).__resumePageBreakIds || []).filter(
  (id: string) => id !== "skills-section"
);
const skillsCutIndex: number = (window as any).__resumeSkillsCutIndex ?? -1;
const pdfHtml = generateHTML(true, pageBreakIds, skillsCutIndex);
      const res: AxiosResponse<Blob> = await api.post(
        `${API_URL}/candidates/generate-pdf`,
        { html: pdfHtml },
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
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* {lastSegment === "download-resume" && ( */}
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
      {/* )} */}

      {alldata ? (
        // THUMBNAIL mode
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
        // FULL PREVIEW mode
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
                <div
                  style={{ flex: 1, height: "1px", background: "#d1d5db" }}
                />
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
                <div
                  style={{ flex: 1, height: "1px", background: "#d1d5db" }}
                />
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

export default TemplateSixteen;
