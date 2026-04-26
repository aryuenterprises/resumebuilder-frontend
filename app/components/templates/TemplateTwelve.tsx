


// // ─── Template Five ───────────────────────────────────────────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// // const TemplateTwelve: React.FC = () => {
// const TemplateTwelve: React.FC<ResumeProps> = ({ alldata }) => {

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
//      CSS — SINGLE COLUMN | B&W | MINIMAL TYPOGRAPHIC
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap');

  

//   .t12-resume  {
//    margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     padding: 20mm 22mm 20mm 22mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #111111;
//     text-align: left;
//   }

//     .t12-resume.is-preview {
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
//   .t12-resume .header-block {
//     margin-bottom: 28px;
//     text-align: left;
//   }

//   .t12-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 44px;
//     font-weight: 700;
//     line-height: 1.05;
//     letter-spacing: -1px;
//     color: #000;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t12-resume .header-jobtitle {
//     font-family: 'Source Sans 3', sans-serif;
//     font-size: 12px;
//     font-weight: 600;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #888;
//     margin-bottom: 18px;
//     text-align: left;
//   }

//  .t12-resume .header-divider {
//     width: 100%;
//     height: 1px;
//     background: #111;
//     margin-bottom: 12px;
//   }

//   .t12-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0;
//     font-size: 11.5px;
//     color: #555;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t12-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     text-align: left;
//   }

//   .t12-resume .header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 9px;
//     color: #bbb;
//   }

// .t12-resume  .header-meta-item a {
//     color: #111;
//     text-decoration: none;
//     border-bottom: 1px solid #bbb;
//   }

//   /* ── SECTION ── */
//  .t12-resume .section-block {
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t12-resume .section-title {
//     font-family: 'Source Sans 3', sans-serif;
//     font-size: 9.5px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #999;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #e5e5e5;
//     text-align: left;
//   }

//   /* ── SUMMARY ── */
//   .t12-resume .summary-text {
  
//     font-size: 14px;
//     line-height: 1.85;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t12-resume .entry-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t12-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t12-resume .entry-left {
//     text-align: left;
//     padding-top: 2px;
//   }

//   .t12-resume .entry-date {
//     font-size: 10.5px;
//     color: #999;
//     font-weight: 400;
//     line-height: 1.5;
//     text-align: left;
//     white-space: pre-line;
//   }

//   .t12-resume .entry-right {
//     text-align: left;
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//   }

//   .t12-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 700;
//     color: #000;
//     line-height: 1.2;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t12-resume .entry-subtitle {
//     font-size: 11.5px;
//     color: #777;
//     font-weight: 400;
//     margin-bottom: 7px;
//     text-align: left;
//     letter-spacing: 0.2px;
//   }

//   .t12-resume .entry-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t12-resume .entry-content ul,
//   .t12-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .entry-content ol,
//   .t12-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .entry-content li,
//   .t12-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   .t12-resume ul {
//     list-style-type: disc !important;
//   }

//   /* ── SKILLS ── */
//   .t12-resume .skills-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-left {
//     text-align: left;
//   }

//   .t12-resume .skills-right {
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 7px;
//     text-align: left;
//   }

//   .t12-resume .skill-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     text-align: left;
//   }

//   .t12-resume .skill-name-label {
//     font-size: 12.5px;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t12-resume .skill-pips {
//     display: flex;
//     gap: 3px;
//     align-items: center;
//   }

//   .t12-resume .skill-pip {
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: #ddd;
//   }

//   .t12-resume .skill-pip.on {
//     background: #111;
//   }

//   /* ── LANGUAGES ── */
//   .t12-resume .lang-list {
//     display: flex;
//     flex-direction: column;
//     gap: 7px;
//     text-align: left;
//   }

//   .t12-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     text-align: left;
//   }

//   .t12-resume .lang-name {
//     font-size: 12.5px;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t12-resume .additional-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .additional-right {
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//     text-align: left;
//   }

//   .t12-resume .additional-item {
//     font-size: 12.5px;
//     color: #444;
//     font-weight: 300;
//     line-height: 1.7;
//     margin-bottom: 4px;
//     text-align: left;
//   }

//   /* ── EDU ── */
//   .t12-resume .edu-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t12-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t12-resume .custom-section-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
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

//     .t12-resume  {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     .t12-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t12-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t12-resume  {
//       padding-top: 20px;
//     }
//   }

//   @media (max-width: 768px) {
//     .t12-resume  {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t12-resume .header-name {
//       font-size: 32px;
//     }

//     .t12-resume .entry-block,
//     .t12-resume .skills-block,
//     .t12-resume .additional-block {
//       grid-template-columns: 1fr;
//     }

//     .t12-resume .entry-right,
//     .t12-resume .skills-right,
//     .t12-resume .additional-right {
//       border-left: none;
//       padding-left: 0;
//       border-top: 1px solid #e5e5e5;
//       padding-top: 8px;
//     }

//     .t12-resume .entry-left {
//       margin-bottom: 4px;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION (for PDF download)
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderPips = (level: number | string, total = 4) =>
//       Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<span class="skill-pip${i < Number(level) ? " on" : ""}"></span>`,
//         )
//         .join("");

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:16px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
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
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t12-resume ">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">
//             ${contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div class="header-divider"></div>
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- SUMMARY -->
//         ${summary ? `
//         <div class="section-block">
//           <div class="section-title">Profile</div>
//           <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//         </div>` : ""}

//         <!-- EXPERIENCE -->
//         ${experiences.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, true);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//             return `
//             <div class="entry-block">
//               <div class="entry-left">
//                 <div class="entry-date">${startFormatted}\n–\n${endFormatted}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- EDUCATION -->
//         ${educations.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Education</div>
//           ${educations.map((edu) => {
//             const dateStr = edu.startDate || edu.endDate
//               ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? "\n–\n" : ""}${edu.endDate || ""}`
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
//               <div class="entry-left">
//                 <div class="entry-date">${dateStr}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${edu.degree || edu.location ? `<div class="entry-subtitle">${edu.degree || ""}${edu.degree && edu.location ? ", " : ""}${edu.location || ""}</div>` : ""}
//                 ${textHtml}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- SKILLS -->
//         ${skills.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Skills</div>
//           <div class="skills-block">
//             <div class="skills-left"></div>
//             <div class="skills-right">
//               <div class="skills-list">
//                 ${skills.map((s) => `
//                 <div class="skill-row">
//                   <span class="skill-name-label">${s.skill || ""}</span>
//                   ${s.level ? `<div class="skill-pips">${renderPips(s.level)}</div>` : ""}
//                 </div>`).join("")}
//               </div>
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- LANGUAGES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Languages</div>
//           <div class="skills-block">
//             <div class="skills-left"></div>
//             <div class="skills-right">
//               <div class="lang-list">
//                 ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//                 <div class="lang-row">
//                   <span class="lang-name">${l.name}</span>
//                   ${l.level ? `<div class="skill-pips">${renderPips(l.level)}</div>` : ""}
//                 </div>`).join("")}
//               </div>
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- CERTIFICATIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Certifications &amp; Licenses</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- HOBBIES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Hobbies &amp; Interests</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- AWARDS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Awards &amp; Honors</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- WEBSITES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//         <div class="section-block">
//           <div class="section-title">Websites &amp; Social Media</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) =>
//                 `<div class="additional-item">${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- REFERENCES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">References</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- CUSTOM SECTIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim())
//           ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//             ${s.description ? `
//             <div class="additional-block">
//               <div class="skills-left"></div>
//               <div class="additional-right">
//                 <div class="custom-section-content">${s.description}</div>
//               </div>
//             </div>` : ""}
//           </div>`).join("")
//           : ""}

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
//      PIPS (React)
//   ====================================================== */
//   const Pips = ({ level, total = 4 }: { level: number | string; total?: number }) => (
//     <div className="skill-pips">
//       {Array.from({ length: total }).map((_, i) => (
//         <span key={i} className={`skill-pip${i < Number(level) ? " on" : ""}`} />
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
//         className={`t12-resume ${alldata ? 'is-preview' : ''} `}
//         style={{ margin: "0 auto",           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
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
//           <div className="header-divider" />
//           <div className="header-meta-row">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">{addressParts.join(", ")}</span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">
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
//               dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i} className="entry-block">
//                 <div className="entry-left">
//                   <div className="entry-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {"\n–\n"}
//                     {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                   </div>
//                 </div>
//                 <div className="entry-right">
//                   <div className="entry-title">{exp.jobTitle}</div>
//                   <div className="entry-subtitle">
//                     {exp.employer}{exp.location && `, ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
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
//                     <div className="edu-content" dangerouslySetInnerHTML={{ __html: edu.text }} />
//                   );
//                 } else {
//                   const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <ul className="edu-list">
//                         {lines.map((l: string, li: number) => {
//                           const t = l.trim();
//                           const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                           return c ? <li key={li}>{c}</li> : null;
//                         })}
//                       </ul>
//                     );
//                   } else {
//                     textContent = (
//                       <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div key={edu.id || index} className="entry-block">
//                   <div className="entry-left">
//                     <div className="entry-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && "\n–\n"}
//                       {edu.endDate || ""}
//                     </div>
//                   </div>
//                   <div className="entry-right">
//                     <div className="entry-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && ", "}
//                         {edu.location || ""}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Skills</div>
//             <div className="skills-block">
//               <div className="skills-left" />
//               <div className="skills-right">
//                 <div className="skills-list">
//                   {skills.map((skill, i) => (
//                     <div key={i} className="skill-row">
//                       <span className="skill-name-label">{skill.skill}</span>
//                       {skill.level && <Pips level={skill.level} />}
//                     </div>
//                   ))}
//                 </div>
//               </div>
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
//               <div className="skills-block">
//                 <div className="skills-left" />
//                 <div className="skills-right">
//                   <div className="lang-list">
//                     {finalize.languages.map(
//                       (lang, index) =>
//                         lang.name && lang.name.trim() !== "" && (
//                           <div key={lang._id || index} className="lang-row">
//                             <span className="lang-name">{lang.name}</span>
//                             {lang.level && <Pips level={lang.level} />}
//                           </div>
//                         ),
//                     )}
//                   </div>
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                           {item.websiteUrl && item.socialMedia && " · "}
//                           {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                         </div>
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//                   <div className="additional-block">
//                     <div className="skills-left" />
//                     <div className="additional-right">
//                       <div
//                         className="custom-section-content"
//                         dangerouslySetInnerHTML={{ __html: section.description }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}

//       </div>
//     </div>
//   );
// };

// export default TemplateTwelve;




// ─── Template Five ───────────────────────────────────────────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// const TemplateTwelve: React.FC<ResumeProps> = ({ alldata }) => {
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
//           <div className="section-title">Skills</div>
//           <div className="skills-block">
//             <div className="skills-left" />
//             <div className="skills-right">
//               {skills.map((category: any) => (
//                 <div key={category.id} className="skill-category-block">
//                   <div className="skill-category-title">{category.title}</div>
//                   <div className="skills-list">
//                     {category.skills.map((skill: any) => (
//                       <div key={skill.id} className="skill-row">
//                         <span className="skill-name-label">{skill.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       );
//     } else {
//       // Simple Skills - Skill rows with pips
//       return (
//         <div className="section-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-block">
//             <div className="skills-left" />
//             <div className="skills-right">
//               <div className="skills-list">
//                 {skills.map((skill: any, index: number) => (
//                   <div key={skill.id || index} className="skill-row">
//                     <span className="skill-name-label">{skill.name || skill.skill}</span>
//                     {skill.level && <Pips level={skill.level} />}
//                   </div>
//                 ))}
//               </div>
//             </div>
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
//             <div className="entry-left">
//               <div className="entry-date">
//                 {project.startDate && formatMonthYear(project.startDate, true)}
//                 {project.startDate && project.endDate && "\n–\n"}
//                 {project.endDate && formatMonthYear(project.endDate, true)}
//               </div>
//             </div>
//             <div className="entry-right">
//               <div className="project-header">
//                 <div className="entry-title">{project.title}</div>
//                 {(project.liveUrl || project.githubUrl) && (
//                   <div className="project-links">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {project.techStack && project.techStack.length > 0 && (
//                 <div className="project-tech-stack">
//                   <strong>Tech:</strong> {project.techStack.join(" • ")}
//                 </div>
//               )}
//               {project.description && (
//                 <div
//                   className="entry-content"
//                   dangerouslySetInnerHTML={{ __html: project.description }}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | B&W | MINIMAL TYPOGRAPHIC
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap');

//   .t12-resume {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     padding: 20mm 22mm 20mm 22mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #111111;
//     text-align: left;
//   }

//   .t12-resume.is-preview {
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
//   .t12-resume .header-block {
//     margin-bottom: 28px;
//     text-align: left;
//   }

//   .t12-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 44px;
//     font-weight: 700;
//     line-height: 1.05;
//     letter-spacing: -1px;
//     color: #000;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t12-resume .header-jobtitle {
//     font-family: 'Source Sans 3', sans-serif;
//     font-size: 12px;
//     font-weight: 600;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #888;
//     margin-bottom: 18px;
//     text-align: left;
//   }

//   .t12-resume .header-divider {
//     width: 100%;
//     height: 1px;
//     background: #111;
//     margin-bottom: 12px;
//   }

//   .t12-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0;
//     font-size: 11.5px;
//     color: #555;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t12-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     text-align: left;
//   }

//   .t12-resume .header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 9px;
//     color: #bbb;
//   }

//   .t12-resume .header-meta-item a {
//     color: #111;
//     text-decoration: none;
//     border-bottom: 1px solid #bbb;
//   }

//   /* ── SECTION ── */
//   .t12-resume .section-block {
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t12-resume .section-title {
//     font-family: 'Source Sans 3', sans-serif;
//     font-size: 9.5px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #999;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #e5e5e5;
//     text-align: left;
//   }

//   /* ── SUMMARY ── */
//   .t12-resume .summary-text {
//     font-size: 14px;
//     line-height: 1.85;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t12-resume .entry-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t12-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t12-resume .entry-left {
//     text-align: left;
//     padding-top: 2px;
//   }

//   .t12-resume .entry-date {
//     font-size: 10.5px;
//     color: #999;
//     font-weight: 400;
//     line-height: 1.5;
//     text-align: left;
//     white-space: pre-line;
//   }

//   .t12-resume .entry-right {
//     text-align: left;
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//   }

//   .t12-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 700;
//     color: #000;
//     line-height: 1.2;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t12-resume .entry-subtitle {
//     font-size: 11.5px;
//     color: #777;
//     font-weight: 400;
//     margin-bottom: 7px;
//     text-align: left;
//     letter-spacing: 0.2px;
//   }

//   .t12-resume .entry-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t12-resume .entry-content ul,
//   .t12-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .entry-content ol,
//   .t12-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .entry-content li,
//   .t12-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t12-resume .skills-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-left {
//     text-align: left;
//   }

//   .t12-resume .skills-right {
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 7px;
//     text-align: left;
//   }

//   .t12-resume .skill-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     text-align: left;
//   }

//   .t12-resume .skill-name-label {
//     font-size: 12.5px;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t12-resume .skill-pips {
//     display: flex;
//     gap: 3px;
//     align-items: center;
//   }

//   .t12-resume .skill-pip {
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: #ddd;
//   }

//   .t12-resume .skill-pip.on {
//     background: #111;
//   }

//   /* Categorized Skills */
//   .t12-resume .skill-category-block {
//     margin-bottom: 16px;
//   }

//   .t12-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t12-resume .skill-category-title {
//     font-size: 12px;
//     font-weight: 600;
//     color: #000;
//     margin-bottom: 8px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e5e5e5;
//   }

//   /* ── PROJECTS ── */
//   .t12-resume .project-header {
//     margin-bottom: 4px;
//   }

//   .t12-resume .project-links {
//     display: flex;
//     gap: 15px;
//     margin-top: 4px;
//   }

//   .t12-resume .project-link {
//     font-size: 10px;
//     color: #888;
//     text-decoration: underline;
//   }

//   .t12-resume .project-tech-stack {
//     font-size: 10.5px;
//     color: #777;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t12-resume .lang-list {
//     display: flex;
//     flex-direction: column;
//     gap: 7px;
//     text-align: left;
//   }

//   .t12-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     text-align: left;
//   }

//   .t12-resume .lang-name {
//     font-size: 12.5px;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t12-resume .additional-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .additional-right {
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//     text-align: left;
//   }

//   .t12-resume .additional-item {
//     font-size: 12.5px;
//     color: #444;
//     font-weight: 300;
//     line-height: 1.7;
//     margin-bottom: 4px;
//     text-align: left;
//   }

//   /* ── EDU ── */
//   .t12-resume .edu-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t12-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t12-resume .custom-section-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
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

//     .t12-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t12-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t12-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t12-resume {
//       padding-top: 20px;
//     }
//   }

//   @media (max-width: 768px) {
//     .t12-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t12-resume .header-name {
//       font-size: 32px;
//     }

//     .t12-resume .entry-block,
//     .t12-resume .skills-block,
//     .t12-resume .additional-block {
//       grid-template-columns: 1fr;
//     }

//     .t12-resume .entry-right,
//     .t12-resume .skills-right,
//     .t12-resume .additional-right {
//       border-left: none;
//       padding-left: 0;
//       border-top: 1px solid #e5e5e5;
//       padding-top: 8px;
//     }

//     .t12-resume .entry-left {
//       margin-bottom: 4px;
//     }

//     .t12-resume .project-header {
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

//     const renderPips = (level: number | string, total = 4) =>
//       Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<span class="skill-pip${i < Number(level) ? " on" : ""}"></span>`,
//         )
//         .join("");

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:16px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
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
//             <div class="section-title">Skills</div>
//             <div class="skills-block">
//               <div class="skills-left"></div>
//               <div class="skills-right">
//                 ${skills.map((category: any) => `
//                   <div class="skill-category-block">
//                     <div class="skill-category-title">${category.title}</div>
//                     <div class="skills-list">
//                       ${category.skills.map((skill: any) => `
//                         <div class="skill-row">
//                           <span class="skill-name-label">${skill.name}</span>
//                         </div>
//                       `).join("")}
//                     </div>
//                   </div>
//                 `).join("")}
//               </div>
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-block">
//             <div class="section-title">Skills</div>
//             <div class="skills-block">
//               <div class="skills-left"></div>
//               <div class="skills-right">
//                 <div class="skills-list">
//                   ${skills.map((skill: any) => `
//                     <div class="skill-row">
//                       <span class="skill-name-label">${skill.name || skill.skill}</span>
//                       ${skill.level ? `<div class="skill-pips">${renderPips(skill.level)}</div>` : ""}
//                     </div>
//                   `).join("")}
//                 </div>
//               </div>
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
//               <div class="entry-left">
//                 <div class="entry-date">
//                   ${project.startDate ? formatMonthYear(project.startDate, true) : ""}
//                   ${project.startDate && project.endDate ? "\n–\n" : ""}
//                   ${project.endDate ? formatMonthYear(project.endDate, true) : ""}
//                 </div>
//               </div>
//               <div class="entry-right">
//                 <div class="project-header">
//                   <div class="entry-title">${project.title || ""}</div>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${project.techStack && project.techStack.length > 0 ? `
//                   <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//                 ` : ""}
//                 ${project.description ? `
//                   <div class="entry-content">${project.description}</div>
//                 ` : ""}
//               </div>
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
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t12-resume">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">
//             ${contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div class="header-divider"></div>
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- SUMMARY -->
//         ${summary ? `
//         <div class="section-block">
//           <div class="section-title">Profile</div>
//           <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//         </div>` : ""}

//         <!-- EXPERIENCE -->
//         ${experiences.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, true);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//             return `
//             <div class="entry-block">
//               <div class="entry-left">
//                 <div class="entry-date">${startFormatted}\n–\n${endFormatted}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- PROJECTS -->
//         ${generateProjectsHTML()}

//         <!-- EDUCATION -->
//         ${educations.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Education</div>
//           ${educations.map((edu) => {
//             const dateStr = edu.startDate || edu.endDate
//               ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? "\n–\n" : ""}${edu.endDate || ""}`
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
//               <div class="entry-left">
//                 <div class="entry-date">${dateStr}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${edu.degree || edu.location ? `<div class="entry-subtitle">${edu.degree || ""}${edu.degree && edu.location ? ", " : ""}${edu.location || ""}</div>` : ""}
//                 ${textHtml}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- SKILLS -->
//         ${generateSkillsHTML()}

//         <!-- LANGUAGES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Languages</div>
//           <div class="skills-block">
//             <div class="skills-left"></div>
//             <div class="skills-right">
//               <div class="lang-list">
//                 ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//                 <div class="lang-row">
//                   <span class="lang-name">${l.name}</span>
//                   ${l.level ? `<div class="skill-pips">${renderPips(l.level)}</div>` : ""}
//                 </div>`).join("")}
//               </div>
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- CERTIFICATIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Certifications &amp; Licenses</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- HOBBIES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Hobbies &amp; Interests</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- AWARDS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Awards &amp; Honors</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- WEBSITES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//         <div class="section-block">
//           <div class="section-title">Websites &amp; Social Media</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) =>
//                 `<div class="additional-item">${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- REFERENCES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">References</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- CUSTOM SECTIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim())
//           ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//             ${s.description ? `
//             <div class="additional-block">
//               <div class="skills-left"></div>
//               <div class="additional-right">
//                 <div class="custom-section-content">${s.description}</div>
//               </div>
//             </div>` : ""}
//           </div>`).join("")
//           : ""}

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
//      PIPS (React)
//   ====================================================== */
//   const Pips = ({ level, total = 4 }: { level: number | string; total?: number }) => (
//     <div className="skill-pips">
//       {Array.from({ length: total }).map((_, i) => (
//         <span key={i} className={`skill-pip${i < Number(level) ? " on" : ""}`} />
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
//         className={`t12-resume ${alldata ? 'is-preview' : ''}`}
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
//           <div className="header-divider" />
//           <div className="header-meta-row">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">{addressParts.join(", ")}</span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">
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
//               dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i} className="entry-block">
//                 <div className="entry-left">
//                   <div className="entry-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {"\n–\n"}
//                     {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                   </div>
//                 </div>
//                 <div className="entry-right">
//                   <div className="entry-title">{exp.jobTitle}</div>
//                   <div className="entry-subtitle">
//                     {exp.employer}{exp.location && `, ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
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
//                     <div className="edu-content" dangerouslySetInnerHTML={{ __html: edu.text }} />
//                   );
//                 } else {
//                   const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <ul className="edu-list">
//                         {lines.map((l: string, li: number) => {
//                           const t = l.trim();
//                           const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                           return c ? <li key={li}>{c}</li> : null;
//                         })}
//                       </ul>
//                     );
//                   } else {
//                     textContent = (
//                       <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div key={edu.id || index} className="entry-block">
//                   <div className="entry-left">
//                     <div className="entry-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && "\n–\n"}
//                       {edu.endDate || ""}
//                     </div>
//                   </div>
//                   <div className="entry-right">
//                     <div className="entry-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && ", "}
//                         {edu.location || ""}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
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
//               <div className="skills-block">
//                 <div className="skills-left" />
//                 <div className="skills-right">
//                   <div className="lang-list">
//                     {finalize.languages.map(
//                       (lang, index) =>
//                         lang.name && lang.name.trim() !== "" && (
//                           <div key={lang._id || index} className="lang-row">
//                             <span className="lang-name">{lang.name}</span>
//                             {lang.level && <Pips level={lang.level} />}
//                           </div>
//                         ),
//                     )}
//                   </div>
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                           {item.websiteUrl && item.socialMedia && " · "}
//                           {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                         </div>
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//                   <div className="additional-block">
//                     <div className="skills-left" />
//                     <div className="additional-right">
//                       <div
//                         className="custom-section-content"
//                         dangerouslySetInnerHTML={{ __html: section.description }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}

//       </div>
//     </div>
//   );
// };

// export default TemplateTwelve;







// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";


// const TemplateTwelve: React.FC<ResumeProps> = ({ alldata }) => {
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
//           <div className="section-title">Skills</div>
//           <div className="skills-block">
//             <div className="skills-left" />
//             <div className="skills-right">
//               {skills.map((category: any) => (
//                 <div key={category.id} className="skill-category-block">
//                   <div className="skill-category-title">{category.title}</div>
//                   <div className="skills-list">
//                     {category.skills.map((skill: any) => (
//                       <div key={skill.id} className="skill-row">
//                         <span className="skill-name-label">{skill.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       );
//     } else {
//       // Simple Skills - Skill rows with pips
//       return (
//         <div className="section-block">
//           <div className="section-title">Skills</div>
//           <div className="skills-block">
//             <div className="skills-left" />
//             <div className="skills-right">
//               <div className="skills-list">
//                 {skills.map((skill: any, index: number) => (
//                   <div key={skill.id || index} className="skill-row">
//                     <span className="skill-name-label">{skill.name || skill.skill}</span>
//                     {skill.level && <Pips level={skill.level} />}
//                   </div>
//                 ))}
//               </div>
//             </div>
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
//             <div className="entry-left">
//               <div className="entry-date">
//                 {project.startDate && formatMonthYear(project.startDate, true)}
//                 {project.startDate && project.endDate && "\n–\n"}
//                 {project.endDate && formatMonthYear(project.endDate, true)}
//               </div>
//             </div>
//             <div className="entry-right">
//               <div className="project-header">
//                 <div className="entry-title">{project.title}</div>
//                 {(project.liveUrl || project.githubUrl) && (
//                   <div className="project-links">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="project-link"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {project.techStack && project.techStack.length > 0 && (
//                 <div className="project-tech-stack">
//                   <strong>Tech:</strong> {project.techStack.join(" • ")}
//                 </div>
//               )}
//               {project.description && (
//                 <div
//                   className="entry-content"
//                   dangerouslySetInnerHTML={{ __html: project.description }}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — SINGLE COLUMN | B&W | MINIMAL TYPOGRAPHIC
//   ====================================================== */
//   const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap');

//   .t12-resume {
//     margin: 0;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     padding: 20mm 22mm 20mm 22mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #111111;
//     text-align: left;
//   }

//   .t12-resume.is-preview {
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
//   .t12-resume .header-block {
//     margin-bottom: 28px;
//     text-align: left;
//   }

//   .t12-resume .header-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 44px;
//     font-weight: 700;
//     line-height: 1.05;
//     letter-spacing: -1px;
//     color: #000;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t12-resume .header-jobtitle {
//     font-family: 'Source Sans 3', sans-serif;
//     font-size: 12px;
//     font-weight: 600;
//     letter-spacing: 3.5px;
//     text-transform: uppercase;
//     color: #888;
//     margin-bottom: 18px;
//     text-align: left;
//   }

//   .t12-resume .header-divider {
//     width: 100%;
//     height: 1px;
//     background: #111;
//     margin-bottom: 12px;
//   }

//   .t12-resume .header-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0;
//     font-size: 11.5px;
//     color: #555;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t12-resume .header-meta-item {
//     display: flex;
//     align-items: center;
//     text-align: left;
//   }

//   .t12-resume .header-meta-item:not(:last-child)::after {
//     content: '·';
//     margin: 0 9px;
//     color: #bbb;
//   }

//   .t12-resume .header-meta-item a {
//     color: #111;
//     text-decoration: none;
//     border-bottom: 1px solid #bbb;
//   }

//   /* ── EDUCATION GRADE ── */
//   .t12-resume .education-grade {
//     font-size: 10.5px;
//     color: #888;
//     margin-top: 2px;
//     font-weight: 500;
//   }

//   /* ── SECTION ── */
//   .t12-resume .section-block {
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t12-resume .section-title {
//     font-family: 'Source Sans 3', sans-serif;
//     font-size: 9.5px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: #999;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #e5e5e5;
//     text-align: left;
//   }

//   /* ── SUMMARY ── */
//   .t12-resume .summary-text {
//     font-size: 14px;
//     line-height: 1.85;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ENTRY BLOCKS ── */
//   .t12-resume .entry-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     margin-bottom: 16px;
//     text-align: left;
//   }

//   .t12-resume .entry-block:last-child {
//     margin-bottom: 0;
//   }

//   .t12-resume .entry-left {
//     text-align: left;
//     padding-top: 2px;
//   }

//   .t12-resume .entry-date {
//     font-size: 10.5px;
//     color: #999;
//     font-weight: 400;
//     line-height: 1.5;
//     text-align: left;
//     white-space: pre-line;
//   }

//   .t12-resume .entry-right {
//     text-align: left;
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//   }

//   .t12-resume .entry-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 700;
//     color: #000;
//     line-height: 1.2;
//     margin-bottom: 2px;
//     text-align: left;
//   }

//   .t12-resume .entry-subtitle {
//     font-size: 11.5px;
//     color: #777;
//     font-weight: 400;
//     margin-bottom: 7px;
//     text-align: left;
//     letter-spacing: 0.2px;
//   }

//   .t12-resume .entry-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t12-resume .entry-content ul,
//   .t12-resume .entry-content-desc ul {
//     list-style-type: disc !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .entry-content ol,
//   .t12-resume .entry-content-desc ol {
//     list-style-type: decimal !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .entry-content li,
//   .t12-resume .entry-content-desc li {
//     margin-bottom: 3px !important;
//     line-height: 1.6 !important;
//     list-style-position: outside !important;
//   }

//   /* ── SKILLS ── */
//   .t12-resume .skills-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-left {
//     text-align: left;
//   }

//   .t12-resume .skills-right {
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-list {
//     display: flex;
//     flex-direction: column;
//     gap: 7px;
//     text-align: left;
//   }

//   .t12-resume .skill-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     text-align: left;
//   }

//   .t12-resume .skill-name-label {
//     font-size: 12.5px;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   .t12-resume .skill-pips {
//     display: flex;
//     gap: 3px;
//     align-items: center;
//   }

//   .t12-resume .skill-pip {
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: #ddd;
//   }

//   .t12-resume .skill-pip.on {
//     background: #111;
//   }

//   /* Categorized Skills */
//   .t12-resume .skill-category-block {
//     margin-bottom: 16px;
//   }

//   .t12-resume .skill-category-block:last-child {
//     margin-bottom: 0;
//   }

//   .t12-resume .skill-category-title {
//     font-size: 12px;
//     font-weight: 600;
//     color: #000;
//     margin-bottom: 8px;
//     padding-bottom: 2px;
//     border-bottom: 1px solid #e5e5e5;
//   }

//   /* ── PROJECTS ── */
//   .t12-resume .project-header {
//     margin-bottom: 4px;
//   }

//   .t12-resume .project-links {
//     display: flex;
//     gap: 15px;
//     margin-top: 4px;
//   }

//   .t12-resume .project-link {
//     font-size: 10px;
//     color: #888;
//     text-decoration: underline;
//   }

//   .t12-resume .project-tech-stack {
//     font-size: 10.5px;
//     color: #777;
//     margin: 4px 0 6px;
//   }

//   /* ── LANGUAGES ── */
//   .t12-resume .lang-list {
//     display: flex;
//     flex-direction: column;
//     gap: 7px;
//     text-align: left;
//   }

//   .t12-resume .lang-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     text-align: left;
//   }

//   .t12-resume .lang-name {
//     font-size: 12.5px;
//     color: #222;
//     font-weight: 400;
//     text-align: left;
//   }

//   /* ── ADDITIONAL ── */
//   .t12-resume .additional-block {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .additional-right {
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//     text-align: left;
//   }

//   .t12-resume .additional-item {
//     font-size: 12.5px;
//     color: #444;
//     font-weight: 300;
//     line-height: 1.7;
//     margin-bottom: 4px;
//     text-align: left;
//   }

//   /* ── EDU ── */
//   .t12-resume .edu-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
//   }

//   .t12-resume .edu-list {
//     list-style-type: disc !important;
//     padding-left: 16px !important;
//     margin: 4px 0 !important;
//   }

//   .t12-resume .edu-list li {
//     margin-bottom: 3px;
//     line-height: 1.6;
//     list-style-position: outside !important;
//   }

//   /* ── CUSTOM ── */
//   .t12-resume .custom-section-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
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

//     .t12-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//     }

//     .t12-resume .entry-block {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t12-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t12-resume {
//       padding-top: 20px;
//     }
//   }

//   @media (max-width: 768px) {
//     .t12-resume {
//       width: 100%;
//       padding: 10mm;
//     }

//     .t12-resume .header-name {
//       font-size: 32px;
//     }

//     .t12-resume .entry-block,
//     .t12-resume .skills-block,
//     .t12-resume .additional-block {
//       grid-template-columns: 1fr;
//     }

//     .t12-resume .entry-right,
//     .t12-resume .skills-right,
//     .t12-resume .additional-right {
//       border-left: none;
//       padding-left: 0;
//       border-top: 1px solid #e5e5e5;
//       padding-top: 8px;
//     }

//     .t12-resume .entry-left {
//       margin-bottom: 4px;
//     }

//     .t12-resume .project-header {
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

//     const renderPips = (level: number | string, total = 4) =>
//       Array.from({ length: total })
//         .map(
//           (_, i) =>
//             `<span class="skill-pip${i < Number(level) ? " on" : ""}"></span>`,
//         )
//         .join("");

//     const renderEntryText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="entry-content entry-content-desc">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:16px;margin:4px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
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
//             <div class="section-title">Skills</div>
//             <div class="skills-block">
//               <div class="skills-left"></div>
//               <div class="skills-right">
//                 ${skills.map((category: any) => `
//                   <div class="skill-category-block">
//                     <div class="skill-category-title">${category.title}</div>
//                     <div class="skills-list">
//                       ${category.skills.map((skill: any) => `
//                         <div class="skill-row">
//                           <span class="skill-name-label">${skill.name}</span>
//                         </div>
//                       `).join("")}
//                     </div>
//                   </div>
//                 `).join("")}
//               </div>
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section-block">
//             <div class="section-title">Skills</div>
//             <div class="skills-block">
//               <div class="skills-left"></div>
//               <div class="skills-right">
//                 <div class="skills-list">
//                   ${skills.map((skill: any) => `
//                     <div class="skill-row">
//                       <span class="skill-name-label">${skill.name || skill.skill}</span>
//                       ${skill.level ? `<div class="skill-pips">${renderPips(skill.level)}</div>` : ""}
//                     </div>
//                   `).join("")}
//                 </div>
//               </div>
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
//               <div class="entry-left">
//                 <div class="entry-date">
//                   ${project.startDate ? formatMonthYear(project.startDate, true) : ""}
//                   ${project.startDate && project.endDate ? "\n–\n" : ""}
//                   ${project.endDate ? formatMonthYear(project.endDate, true) : ""}
//                 </div>
//               </div>
//               <div class="entry-right">
//                 <div class="project-header">
//                   <div class="entry-title">${project.title || ""}</div>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${project.techStack && project.techStack.length > 0 ? `
//                   <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//                 ` : ""}
//                 ${project.description ? `
//                   <div class="entry-content">${project.description}</div>
//                 ` : ""}
//               </div>
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
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>
//       <style>${styles}</style>
//     </head>
//     <body>
//       <div class="t12-resume">

//         <!-- HEADER -->
//         <div class="header-block">
//           <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           <div class="header-jobtitle">
//             ${contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div class="header-divider"></div>
//           <div class="header-meta-row">
//             ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
//             ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
//             ${formattedDob ? `<span class="header-meta-item">${formattedDob}</span>` : ""}
//             ${linkedinUrl ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//             ${githubUrl ? `<span class="header-meta-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></span>` : ""}
//             ${portfolioUrl ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>` : ""}
//           </div>
//         </div>

//         <!-- SUMMARY -->
//         ${summary ? `
//         <div class="section-block">
//           <div class="section-title">Profile</div>
//           <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//         </div>` : ""}

//         <!-- EXPERIENCE -->
//         ${experiences.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, true);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//             return `
//             <div class="entry-block">
//               <div class="entry-left">
//                 <div class="entry-date">${startFormatted}\n–\n${endFormatted}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${exp.jobTitle || ""}</div>
//                 <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                 ${exp.text ? renderEntryText(exp.text) : ""}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- PROJECTS -->
//         ${generateProjectsHTML()}

//         <!-- EDUCATION -->
//         ${educations.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Education</div>
//           ${educations.map((edu) => {
//             const dateStr = edu.startDate || edu.endDate
//               ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? "\n–\n" : ""}${edu.endDate || ""}`
//               : "";
//             const formattedGrade = formatGrade(edu.grade || "");
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
//               <div class="entry-left">
//                 <div class="entry-date">${dateStr}</div>
//               </div>
//               <div class="entry-right">
//                 <div class="entry-title">${edu.schoolname || ""}</div>
//                 ${edu.degree || edu.location || formattedGrade ? `<div class="entry-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? ", " : ""}
//                   ${edu.location || ""}
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>` : ""}
//                 ${textHtml}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- SKILLS -->
//         ${generateSkillsHTML()}

//         <!-- LANGUAGES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name && l.name.trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Languages</div>
//           <div class="skills-block">
//             <div class="skills-left"></div>
//             <div class="skills-right">
//               <div class="lang-list">
//                 ${finalize.languages.filter((l) => l.name && l.name.trim() !== "").map((l) => `
//                 <div class="lang-row">
//                   <span class="lang-name">${l.name}</span>
//                   ${l.level ? `<div class="skill-pips">${renderPips(l.level)}</div>` : ""}
//                 </div>`).join("")}
//               </div>
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- CERTIFICATIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Certifications &amp; Licenses</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.certificationsAndLicenses.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- HOBBIES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Hobbies &amp; Interests</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.hobbiesAndInterests.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- AWARDS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">Awards &amp; Honors</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.awardsAndHonors.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- WEBSITES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//         <div class="section-block">
//           <div class="section-title">Websites &amp; Social Media</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl || i.socialMedia).map((i) =>
//                 `<div class="additional-item">${i.websiteUrl ? `Website: ${i.websiteUrl}` : ""}${i.websiteUrl && i.socialMedia ? " · " : ""}${i.socialMedia ? `Social: ${i.socialMedia}` : ""}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- REFERENCES -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//         <div class="section-block">
//           <div class="section-title">References</div>
//           <div class="additional-block">
//             <div class="skills-left"></div>
//             <div class="additional-right">
//               ${finalize.references.filter((i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i) =>
//                 `<div class="additional-item">${i.name}</div>`
//               ).join("")}
//             </div>
//           </div>
//         </div>` : ""}

//         <!-- CUSTOM SECTIONS -->
//         ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim())
//           ? finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//           <div class="section-block">
//             ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//             ${s.description ? `
//             <div class="additional-block">
//               <div class="skills-left"></div>
//               <div class="additional-right">
//                 <div class="custom-section-content">${s.description}</div>
//               </div>
//             </div>` : ""}
//           </div>`).join("")
//           : ""}

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
//      PIPS (React)
//   ====================================================== */
//   const Pips = ({ level, total = 4 }: { level: number | string; total?: number }) => (
//     <div className="skill-pips">
//       {Array.from({ length: total }).map((_, i) => (
//         <span key={i} className={`skill-pip${i < Number(level) ? " on" : ""}`} />
//       ))}
//     </div>
//   );

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

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
//         className={`t12-resume ${alldata ? 'is-preview' : ''}`}
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
//           <div className="header-divider" />
//           <div className="header-meta-row">
//             {addressParts.length > 0 && (
//               <span className="header-meta-item">{addressParts.join(", ")}</span>
//             )}
//             {contact?.email && (
//               <span className="header-meta-item">{contact.email}</span>
//             )}
//             {contact?.phone && (
//               <span className="header-meta-item">{contact.phone}</span>
//             )}
//             {formattedDob && (
//               <span className="header-meta-item">{formattedDob}</span>
//             )}
//             {linkedinUrl && (
//               <span className="header-meta-item">
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">
//                   LinkedIn
//                 </a>
//               </span>
//             )}
//             {githubUrl && (
//               <span className="header-meta-item">
//                 <a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">
//                   GitHub
//                 </a>
//               </span>
//             )}
//             {portfolioUrl && (
//               <span className="header-meta-item">
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">
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
//               dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-block">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i} className="entry-block">
//                 <div className="entry-left">
//                   <div className="entry-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {"\n–\n"}
//                     {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                   </div>
//                 </div>
//                 <div className="entry-right">
//                   <div className="entry-title">{exp.jobTitle}</div>
//                   <div className="entry-subtitle">
//                     {exp.employer}{exp.location && `, ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="entry-content entry-content-desc"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
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
//               const formattedGrade = formatGrade(edu.grade || "");
              
//               if (edu.text) {
//                 if (edu.text.includes("<") && edu.text.includes(">")) {
//                   textContent = (
//                     <div className="edu-content" dangerouslySetInnerHTML={{ __html: edu.text }} />
//                   );
//                 } else {
//                   const lines = edu.text.split("\n").filter((l: string) => l.trim() !== "");
//                   if (lines.some((l: string) => l.trim().startsWith("-"))) {
//                     textContent = (
//                       <ul className="edu-list">
//                         {lines.map((l: string, li: number) => {
//                           const t = l.trim();
//                           const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                           return c ? <li key={li}>{c}</li> : null;
//                         })}
//                       </ul>
//                     );
//                   } else {
//                     textContent = (
//                       <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>
//                         {stripHtml(edu.text)}
//                       </div>
//                     );
//                   }
//                 }
//               }
//               return (
//                 <div key={edu.id || index} className="entry-block">
//                   <div className="entry-left">
//                     <div className="entry-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && "\n–\n"}
//                       {edu.endDate || ""}
//                     </div>
//                   </div>
//                   <div className="entry-right">
//                     <div className="entry-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location || formattedGrade) && (
//                       <div className="entry-subtitle">
//                         {edu.degree || ""}
//                         {edu.degree && edu.location && ", "}
//                         {edu.location || ""}
//                         {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
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
//               <div className="skills-block">
//                 <div className="skills-left" />
//                 <div className="skills-right">
//                   <div className="lang-list">
//                     {finalize.languages.map(
//                       (lang, index) =>
//                         lang.name && lang.name.trim() !== "" && (
//                           <div key={lang._id || index} className="lang-row">
//                             <span className="lang-name">{lang.name}</span>
//                             {lang.level && <Pips level={lang.level} />}
//                           </div>
//                         ),
//                     )}
//                   </div>
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       (item.websiteUrl || item.socialMedia) && (
//                         <div key={item.id || index} className="additional-item">
//                           {item.websiteUrl && <span>Website: {item.websiteUrl}</span>}
//                           {item.websiteUrl && item.socialMedia && " · "}
//                           {item.socialMedia && <span>Social: {item.socialMedia}</span>}
//                         </div>
//                       ),
//                   )}
//                 </div>
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
//               <div className="additional-block">
//                 <div className="skills-left" />
//                 <div className="additional-right">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div key={item.id || index} className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }} />
//                       ),
//                   )}
//                 </div>
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
//                   <div className="additional-block">
//                     <div className="skills-left" />
//                     <div className="additional-right">
//                       <div
//                         className="custom-section-content"
//                         dangerouslySetInnerHTML={{ __html: section.description }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}

//       </div>
//     </div>
//   );
// };

// export default TemplateTwelve;