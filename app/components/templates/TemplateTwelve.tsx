


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
//     contact?.postCode,
//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedIn || contact?.linkedIn;
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























































// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateTwelve: React.FC<ResumeProps> = ({ alldata }) => {
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
//       <div className="section-block">
//         <div className="section-title">Skills</div>
//         <div className="skills-wrapper">
//           <div className="skills-left"></div>
//           <div className="skills-right">
//             <div
//               className="skills-content"
//               dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//             />
//           </div>
//         </div>
//       </div>
//     );
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
//                   dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
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
//     margin: 0 auto;
//     background-color: white;
//     text-align: left;
//     width: 210mm;
//     min-height: 297mm;
//     padding: 20mm 22mm 20mm 22mm;
//     box-sizing: border-box;
//     background-color: #ffffff;
//     font-family: 'Source Sans 3', sans-serif;
//     color: #111111;
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

  

//   /* Rich text content styles */
//   .t12-resume .entry-content ul,
//   .t12-resume .entry-content ol,
//   .t12-resume .skills-content ul,
//   .t12-resume .skills-content ol,
//   .t12-resume .edu-content ul,
//   .t12-resume .edu-content ol,
//   .t12-resume .custom-section-content ul,
//   .t12-resume .custom-section-content ol {
//     margin: 4px 0 4px 16px !important;
//     padding-left: 0 !important;
//   }

//   .t12-resume .entry-content li,
//   .t12-resume .skills-content li,
//   .t12-resume .edu-content li,
//   .t12-resume .custom-section-content li {
//     margin-bottom: 2px !important;
//     line-height: 1.6 !important;
//   }

//   .t12-resume .entry-content ul,
//   .t12-resume .skills-content ul,
//   .t12-resume .edu-content ul,
//   .t12-resume .custom-section-content ul {
//     list-style-type: disc !important;
//   }

//   .t12-resume .entry-content ol,
//   .t12-resume .skills-content ol,
//   .t12-resume .edu-content ol,
//   .t12-resume .custom-section-content ol {
//     list-style-type: decimal !important;
//   }

//   .t12-resume .entry-content ul li:first-child,
//   .t12-resume .skills-content ul li:first-child,
//   .t12-resume .edu-content ul li:first-child,
//   .t12-resume .custom-section-content ul li:first-child,
//   .t12-resume .entry-content ol li:first-child,
//   .t12-resume .skills-content ol li:first-child,
//   .t12-resume .edu-content ol li:first-child,
//   .t12-resume .custom-section-content ol li:first-child {
//     margin-top: 0 !important;
//   }

//   .t12-resume .entry-content ul,
//   .t12-resume .skills-content ul,
//   .t12-resume .edu-content ul,
//   .t12-resume .custom-section-content ul {
//     margin-top: 2px !important;
//     margin-bottom: 2px !important;
//   }

//   .t12-resume .entry-content strong,
//   .t12-resume .skills-content strong,
//   .t12-resume .edu-content strong,
//   .t12-resume .custom-section-content strong {
//     font-weight: 600 !important;
//   }

//   .t12-resume .entry-content em,
//   .t12-resume .skills-content em,
//   .t12-resume .edu-content em,
//   .t12-resume .custom-section-content em {
//     font-style: italic !important;
//   }

//   .t12-resume .entry-content u,
//   .t12-resume .skills-content u,
//   .t12-resume .edu-content u,
//   .t12-resume .custom-section-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t12-resume .entry-content p,
//   .t12-resume .skills-content p,
//   .t12-resume .edu-content p,
//   .t12-resume .custom-section-content p {
//     white-space: pre-wrap !important;
//     margin: 0 0 4px 0 !important;
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

//   /* ── SECTION TITLE (with underline) ── */
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

//   /* ── SECTION BLOCK (wraps each section) ── */
//   .t12-resume .section-block {
//     margin-bottom: 22px;
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

//   /* ── ENTRY BLOCKS (Experience, Education, Projects) ── */
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

//   /* ── SKILLS SECTION ── */
//   .t12-resume .skills-wrapper {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//   }

//   .t12-resume .skills-left {
//     text-align: left;
//   }

//   .t12-resume .skills-right {
//     text-align: left;
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//   }

//   .t12-resume .skills-content {
//     font-size: 12.5px;
//     line-height: 1.7;
//     color: #444;
//     font-weight: 300;
//     text-align: left;
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

//   /* ── CUSTOM SECTIONS (Title on left, content on right) ── */
//   .t12-resume .custom-wrapper {
//     display: grid;
//     grid-template-columns: 110px 1fr;
//     gap: 0 20px;
//     text-align: left;
//     margin-bottom: 16px;
//   }

//   .t12-resume .custom-wrapper:last-child {
//     margin-bottom: 0;
//   }

//   .t12-resume .custom-left {
//     text-align: left;
//     padding-top: 2px;
//   }

//   .t12-resume .custom-left .custom-section-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     font-weight: 700;
//     color: #000;
//     line-height: 1.2;
//     text-align: left;
//   }

//   .t12-resume .custom-right {
//     text-align: left;
//     border-left: 1px solid #e5e5e5;
//     padding-left: 20px;
//   }

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
//       margin: 0;
//     }

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .t12-resume {
//       width: 100% !important;
//       box-shadow: none !important;
//       padding: 20mm 22mm 20mm 22mm !important;
//     }

//     .t12-resume .entry-block,
//     .t12-resume .skills-wrapper,
//     .t12-resume .custom-wrapper {
//       page-break-inside: avoid;
//       break-inside: avoid;
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
//         return `<div class="entry-content entry-content-desc">${cleanQuillHTML(text)}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="entry-content entry-content-desc"><ul style="list-style-type:disc!important;padding-left:16px;margin:2px 0;">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c
//               ? `<li style="margin-bottom:2px;line-height:1.6;list-style-type:disc!important;">${c}</li>`
//               : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="entry-content entry-content-desc" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      
//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      
//       return `
//         <div class="section-block">
//           <div class="section-title">Skills</div>
//           <div class="skills-wrapper">
//             <div class="skills-left"></div>
//             <div class="skills-right">
//               <div class="skills-content">${cleanedSkills}</div>
//             </div>
//           </div>
//         </div>
//       `;
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
//                   <div class="entry-content">${cleanQuillHTML(project.description)}</div>
//                 ` : ""}
//               </div>
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML for PDF (Title on left, content on right)
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

//       const validSections = finalize.customSection.filter(
//         (s: any) => s?.name?.trim() || s?.description?.trim()
//       );

//       if (validSections.length === 0) return "";

//       return `
//         <div class="section-block">
//           ${validSections.map(
//             (s: any) => `
//             <div class="custom-wrapper">
//               <div class="custom-left">
//                 <div class="custom-section-name">${s.name || "Additional"}</div>
//               </div>
//               <div class="custom-right">
//                 ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//               </div>
//             </div>
//           `,
//           ).join("")}
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
//           <div class="summary-text">${cleanQuillHTML(summary)}</div>
//         </div>` : ""}

//         <!-- EXPERIENCE -->
//         ${experiences.length > 0 ? `
//         <div class="section-block">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp) => {
//             const startFormatted = formatMonthYear(exp.startDate, false);
//             const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
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
//             const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//             const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
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
//                 ${eduTextHtml ? `<div class="entry-content">${eduTextHtml}</div>` : ""}
//               </div>
//             </div>`;
//           }).join("")}
//         </div>` : ""}

//         <!-- SKILLS -->
//         ${generateSkillsHTML()}

//         <!-- CUSTOM SECTIONS -->
//         ${generateCustomSectionsHTML()}

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
//         className={`t12-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
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
//               dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
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
//                       dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
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
//               const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//               const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
              
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
//                     {eduTextHtml && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: eduTextHtml }} />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {renderSkills()}

//         {/* CUSTOM SECTIONS */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.customSection) &&
//           finalize.customSection.some(
//             (s) => s?.name?.trim() || s?.description?.trim()
//           ) && (
//             <div className="section-block">
//               {finalize.customSection
//                 .filter((s) => s?.name?.trim() || s?.description?.trim())
//                 .map((section, i) => (
//                   <div key={section.id || i} className="custom-wrapper">
//                     <div className="custom-left">
//                       <div className="custom-section-name">{section.name}</div>
//                     </div>
//                     <div className="custom-right">
//                       {section.description && (
//                         <div
//                           className="custom-section-content"
//                           dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default TemplateTwelve;










"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
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

// ─────────────────────────────────────────────────────────────────────────────
// PIXEL-PERFECT A4 CONSTANTS
// At 96 dpi: 210mm→794px, 297mm→1123px, 15mm→57px
// PAGE_CONTENT_H = 1123 - 57*2 = 1009px (usable content per page)
//
// T12 original used 20mm top/bottom and 22mm left/right padding.
// For the page-splitter to work we must use the same MARGIN (57px = 15mm)
// that Puppeteer applies. The extra padding is reproduced *inside* the resume
// div via INNER_PAD_X / INNER_PAD_TOP so the visual appearance is preserved.
//
// Inner horizontal padding: 22mm → 83px  (instead of the 15mm outer margin)
// Inner top padding:        20mm → 76px  (decorative only — shown on page 1)
// ─────────────────────────────────────────────────────────────────────────────
const A4_W          = 794;   // px — A4 width at 96 dpi
const A4_H          = 1123;  // px — A4 height at 96 dpi
const MARGIN        = 57;    // px — 15 mm at 96 dpi (Puppeteer outer margin)
const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// Extra inner padding to match T12's original 20mm/22mm design intent
const INNER_PAD_X   = 83;   // px ≈ 22mm — left/right inside the resume div
const INNER_PAD_TOP = 76;   // px ≈ 20mm — top inside the resume div

const TemplateTwelve: React.FC<ResumeProps> = ({ alldata }) => {
  const context      = useContext(CreateContext);
  const pathname     = usePathname();
  const lastSegment  = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages,       setPages]       = useState<string[]>([]);

  // ── Data sources ─────────────────────────────────────────────────────────
  const contact    = alldata?.contact    || context.contact    || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences= alldata?.experiences|| context?.experiences|| [];
  const skills     = alldata?.skills?.text || context?.skills?.text || "";
  const projects   = alldata?.projects   || context?.projects  || [];
  const finalize   = alldata?.finalize   || context?.finalize  || {};
  const summary    = alldata?.summary    || context?.summary   || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl  = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl    = contact?.github;
  const dateOfBirth  = contact?.dob;

  // ── CSS ──────────────────────────────────────────────────────────────────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    /* ── RESUME ROOT ── */
    /* Outer padding = 0 (Puppeteer margin handles the 15mm gutters).
       Inner padding reproduces T12's original 20mm/22mm design spacing. */
    .t12-resume {
      width: ${A4_W}px;
      padding: ${INNER_PAD_TOP}px ${INNER_PAD_X}px 0 ${INNER_PAD_X}px;
      background-color: #ffffff;
      font-family: 'Source Sans 3', sans-serif;
      color: #111111;
      font-size: 14px;
      line-height: 1.5;
      box-sizing: border-box;
    }

    /* ── RICH TEXT ── */
    .t12-resume .entry-content ul,
    .t12-resume .entry-content ol,
    .t12-resume .skills-content ul,
    .t12-resume .skills-content ol,
    .t12-resume .edu-content ul,
    .t12-resume .edu-content ol,
    .t12-resume .custom-section-content ul,
    .t12-resume .custom-section-content ol {
      margin: 4px 0 4px 16px !important;
      padding-left: 0 !important;
    }

    .t12-resume .entry-content li,
    .t12-resume .skills-content li,
    .t12-resume .edu-content li,
    .t12-resume .custom-section-content li {
      margin-bottom: 2px !important;
      line-height: 1.6 !important;
    }

    .t12-resume .entry-content ul,
    .t12-resume .skills-content ul,
    .t12-resume .edu-content ul,
    .t12-resume .custom-section-content ul  { list-style-type: disc    !important; }

    .t12-resume .entry-content ol,
    .t12-resume .skills-content ol,
    .t12-resume .edu-content ol,
    .t12-resume .custom-section-content ol  { list-style-type: decimal !important; }

    .t12-resume .entry-content strong,
    .t12-resume .skills-content strong,
    .t12-resume .edu-content strong,
    .t12-resume .custom-section-content strong { font-weight: 600 !important; }

    .t12-resume .entry-content em,
    .t12-resume .skills-content em,
    .t12-resume .edu-content em,
    .t12-resume .custom-section-content em    { font-style: italic !important; }

    .t12-resume .entry-content u,
    .t12-resume .skills-content u,
    .t12-resume .edu-content u,
    .t12-resume .custom-section-content u     { text-decoration: underline !important; }

    .t12-resume .entry-content p,
    .t12-resume .skills-content p,
    .t12-resume .edu-content p,
    .t12-resume .custom-section-content p {
      white-space: pre-wrap !important;
      margin: 0 0 4px 0 !important;
    }

    /* ── HEADER ── */
    .t12-resume .header-block {
      margin-bottom: 28px;
    }

    .t12-resume .header-name {
      font-family: 'Playfair Display', serif;
      font-size: 44px;
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -1px;
      color: #000;
      margin-bottom: 6px;
    }

    .t12-resume .header-jobtitle {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 18px;
    }

    .t12-resume .header-divider {
      width: 100%;
      height: 1px;
      background: #111;
      margin-bottom: 12px;
    }

    .t12-resume .header-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      font-size: 11.5px;
      color: #555;
      font-weight: 400;
    }

    .t12-resume .header-meta-item {
      display: flex;
      align-items: center;
    }

    .t12-resume .header-meta-item:not(:last-child)::after {
      content: '·';
      margin: 0 9px;
      color: #bbb;
    }

    .t12-resume .header-meta-item a {
      color: #111;
      text-decoration: none;
      border-bottom: 1px solid #bbb;
    }

    /* ── SECTION TITLE ── */
    .t12-resume .section-title {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 9.5px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e5e5e5;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* ── SECTION BLOCK ── */
    .t12-resume .section-block {
      margin-bottom: 22px;
    }

    /* ── SUMMARY ── */
    .t12-resume .summary-text {
      font-size: 14px;
      line-height: 1.85;
      color: #222;
      font-weight: 400;
    }

    /* ── ENTRY BLOCKS (Experience, Education, Projects) ── */
    .t12-resume .entry-block {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 0 20px;
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t12-resume .entry-block:last-child { margin-bottom: 0; }

    .t12-resume .entry-left { padding-top: 2px; }

    .t12-resume .entry-date {
      font-size: 10.5px;
      color: #999;
      font-weight: 400;
      line-height: 1.5;
      white-space: pre-line;
    }

    .t12-resume .entry-right {
      border-left: 1px solid #e5e5e5;
      padding-left: 20px;
    }

    .t12-resume .entry-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #000;
      line-height: 1.2;
      margin-bottom: 2px;
    }

    .t12-resume .entry-subtitle {
      font-size: 11.5px;
      color: #777;
      font-weight: 400;
      margin-bottom: 7px;
      letter-spacing: 0.2px;
    }

    .t12-resume .entry-content {
      font-size: 12.5px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    /* ── EDUCATION GRADE ── */
    .t12-resume .education-grade {
      font-size: 10.5px;
      color: #888;
      margin-top: 2px;
      font-weight: 500;
    }

    /* ── SKILLS ── */
    .t12-resume .skills-wrapper {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 0 20px;
    }

    .t12-resume .skills-right {
      border-left: 1px solid #e5e5e5;
      padding-left: 20px;
    }

    .t12-resume .skills-content {
      font-size: 12.5px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    /* ── PROJECTS ── */
    .t12-resume .project-header  { margin-bottom: 4px; }

    .t12-resume .project-links {
      display: flex;
      gap: 15px;
      margin-top: 4px;
    }

    .t12-resume .project-link {
      font-size: 10px;
      color: #888;
      text-decoration: underline;
    }

    .t12-resume .project-tech-stack {
      font-size: 10.5px;
      color: #777;
      margin: 4px 0 6px;
    }

    /* ── CUSTOM SECTIONS (name left, content right) ── */
    .t12-resume .custom-wrapper {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 0 20px;
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t12-resume .custom-wrapper:last-child { margin-bottom: 0; }

    .t12-resume .custom-left { padding-top: 2px; }

    .t12-resume .custom-section-name {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #000;
      line-height: 1.2;
    }

    .t12-resume .custom-right {
      border-left: 1px solid #e5e5e5;
      padding-left: 20px;
    }

    .t12-resume .custom-section-content {
      font-size: 12.5px;
      line-height: 1.7;
      color: #444;
      font-weight: 300;
    }

    /* Page-break marker injected at cut points for PDF */
    .t12-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block;
      height: 0;
      margin: 0;
      padding: 0;
    }

    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; }
      .t12-resume {
        width: 100% !important;
        padding-left: ${INNER_PAD_X}px !important;
        padding-right: ${INNER_PAD_X}px !important;
        padding-top: ${INNER_PAD_TOP}px !important;
        box-shadow: none !important;
      }
      .t12-resume .project-link,
      .t12-resume .header-meta-item a {
        color: #000 !important;
        text-decoration: underline !important;
      }
    }
  `;

  // ── HTML builder ─────────────────────────────────────────────────────────
  // pageBreakIds: array of element data-ids where page breaks should be injected.
  // Used when forPDF=true so Puppeteer breaks at the same points as the preview.
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const formattedDob = formatDateOfBirth(dateOfBirth || "");
      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;

      // ── Header ──────────────────────────────────────────────────────────
      const header = `
      <div class="header-block" data-block-id="t12-header">
        <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="header-jobtitle">${
          contact?.jobTitle
            ? typeof contact.jobTitle === "string"
              ? contact.jobTitle
              : (contact.jobTitle as any)?.name || ""
            : ""
        }</div>
        <div class="header-divider"></div>
        <div class="header-meta-row">
          ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
          ${contact?.email    ? `<span class="header-meta-item">${contact.email}</span>`    : ""}
          ${contact?.phone    ? `<span class="header-meta-item">${contact.phone}</span>`    : ""}
          ${formattedDob      ? `<span class="header-meta-item">${formattedDob}</span>`     : ""}
          ${linkedinUrl  ? `<span class="header-meta-item"><a href="${href(linkedinUrl)}"  target="_blank">LinkedIn</a></span>`  : ""}
          ${githubUrl    ? `<span class="header-meta-item"><a href="${href(githubUrl)}"    target="_blank">GitHub</a></span>`    : ""}
          ${portfolioUrl ? `<span class="header-meta-item"><a href="${href(portfolioUrl)}" target="_blank">Portfolio</a></span>` : ""}
        </div>
      </div>`;

      // ── Summary ──────────────────────────────────────────────────────────
      const summaryBlock = summary
        ? `<div class="section-block" data-block-id="t12-summary">
             <div class="section-title">Profile</div>
             <div class="summary-text">${cleanQuillHTML(summary)}</div>
           </div>`
        : "";

      // ── Experience ───────────────────────────────────────────────────────
      const expBlock =
        experiences.length > 0
          ? `<div class="section-block" data-block-id="t12-exp-section">
               <div class="section-title">Experience</div>
               ${experiences
                 .map((exp: any, i: number) => {
                   const start = formatMonthYear(exp.startDate, false);
                   const end   = exp.endDate
                     ? formatMonthYear(exp.endDate, false)
                     : "Present";
                   return `<div class="entry-block" data-block-id="t12-exp-${i}">
                     <div class="entry-left">
                       <div class="entry-date">${start}\n–\n${end}</div>
                     </div>
                     <div class="entry-right">
                       <div class="entry-title">${exp.jobTitle || ""}</div>
                       <div class="entry-subtitle">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
                       ${exp.text ? `<div class="entry-content">${cleanQuillHTML(exp.text)}</div>` : ""}
                     </div>
                   </div>`;
                 })
                 .join("")}
             </div>`
          : "";

      // ── Projects ─────────────────────────────────────────────────────────
      const projBlock =
        projects.length > 0
          ? `<div class="section-block" data-block-id="t12-proj-section">
               <div class="section-title">Projects</div>
               ${projects
                 .map(
                   (p: any, i: number) => `
                 <div class="entry-block" data-block-id="t12-proj-${i}">
                   <div class="entry-left">
                     <div class="entry-date">${p.startDate ? formatMonthYear(p.startDate, true) : ""}${p.startDate && p.endDate ? "\n–\n" : ""}${p.endDate ? formatMonthYear(p.endDate, true) : ""}</div>
                   </div>
                   <div class="entry-right">
                     <div class="project-header">
                       <div class="entry-title">${p.title || ""}</div>
                       ${p.liveUrl || p.githubUrl
                         ? `<div class="project-links">
                              ${p.liveUrl   ? `<a href="${href(p.liveUrl)}"   class="project-link" target="_blank">Live Demo</a>` : ""}
                              ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>`   : ""}
                            </div>`
                         : ""}
                     </div>
                     ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                     ${p.description ? `<div class="entry-content">${cleanQuillHTML(p.description)}</div>` : ""}
                   </div>
                 </div>`,
                 )
                 .join("")}
             </div>`
          : "";

      // ── Education ────────────────────────────────────────────────────────
      const eduBlock =
        educations.length > 0
          ? `<div class="section-block" data-block-id="t12-edu-section">
               <div class="section-title">Education</div>
               ${educations
                 .map((edu: any, i: number) => {
                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
                   const dateStr = [
                     edu.startDate || "",
                     edu.startDate ? "\n–\n" : "",
                     edu.endDate || "Present",
                   ].join("");
                   return `<div class="entry-block" data-block-id="t12-edu-${i}">
                     <div class="entry-left">
                       <div class="entry-date">${dateStr}</div>
                     </div>
                     <div class="entry-right">
                       <div class="entry-title">${edu.schoolname || ""}</div>
                       ${edu.degree || edu.location || formattedGrade
                         ? `<div class="entry-subtitle">
                              ${edu.degree || ""}${edu.degree && edu.location ? ", " : ""}${edu.location || ""}
                              ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
                            </div>`
                         : ""}
                       ${edu.text ? `<div class="entry-content">${cleanQuillHTML(edu.text)}</div>` : ""}
                     </div>
                   </div>`;
                 })
                 .join("")}
             </div>`
          : "";

      // ── Skills ───────────────────────────────────────────────────────────
      const skillsClean = cleanQuillHTML(skills || "");
      const skillsBlock =
        skillsClean && skillsClean !== "<p><br></p>"
          ? `<div class="section-block" data-block-id="t12-skills-section">
               <div class="section-title">Skills</div>
               <div class="skills-wrapper">
                 <div class="skills-left"></div>
                 <div class="skills-right">
                   <div class="skills-content" data-block-id="t12-skills-content">${skillsClean}</div>
                 </div>
               </div>
             </div>`
          : "";

      // ── Custom sections ──────────────────────────────────────────────────
      // T12 custom sections use a two-column grid (name left, content right).
      // Each .custom-wrapper gets its own data-block-id for fine-grained breaks.
      const hasCustom =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        );

      const customBlock = hasCustom
        ? `<div class="section-block" data-block-id="t12-custom-section">
             <div class="section-title">Additional</div>
             ${(finalize as any).customSection
               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
               .map(
                 (s: any, i: number) => `
               <div class="custom-wrapper" data-block-id="t12-custom-${i}">
                 <div class="custom-left">
                   <div class="custom-section-name">${s.name || ""}</div>
                 </div>
                 <div class="custom-right">
                   ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
                 </div>
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      const pdfStyle = forPDF
        ? `<style>
             .t12-resume {
               width: 100% !important;
               padding-left: ${INNER_PAD_X}px !important;
               padding-right: ${INNER_PAD_X}px !important;
               padding-top: ${INNER_PAD_TOP}px !important;
             }
           </style>`
        : "";

      let bodyContent = `
        ${header}
        ${summaryBlock}
        ${expBlock}
        ${projBlock}
        ${eduBlock}
        ${skillsBlock}
        ${customBlock}
      `;

      // For PDF: inject <div class="t12-page-break"> before each element whose
      // data-block-id matches a cut-point ID — same positions as the preview
      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t12-page-break";
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
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t12-resume">
    ${bodyContent}
  </div>
</body>
</html>`;
    },
    [
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
      CSS,
    ],
  );

  // ─────────────────────────────────────────────────────────────────────────
  // PAGE SPLITTER — identical algorithm to TemplateOne
  //
  // T12-SPECIFIC NOTES:
  //   • Content has INNER_PAD_TOP (76px) at the top of .t12-resume.
  //     The splitter measures from .t12-resume top, so that padding is included
  //     naturally in element positions — no special handling needed.
  //   • Entry blocks (.entry-block, .custom-wrapper) are the atomic avoid-break units.
  //   • Section title + first entry are paired to prevent orphaned .section-title rows.
  //   • clipH = nextStart - thisStart prevents bleed at the bottom of each page card.
  // ─────────────────────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser  = new DOMParser();
        const parsed  = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t12-resume");
        if (!resumeEl) { resolve([fullHtml]); return; }
        const resumeSnapshot = resumeEl.outerHTML;

        // Fresh hidden iframe — ensures fonts & layout always match render iframes
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
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    ${CSS}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    /* In the measurement iframe the resume fills full width;
       the inner padding constants handle the visual indentation. */
    .t12-resume {
      width: ${A4_W}px !important;
      padding-left: ${INNER_PAD_X}px !important;
      padding-right: ${INNER_PAD_X}px !important;
      padding-top: ${INNER_PAD_TOP}px !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t12-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          // Force unconstrained layout so scrollHeight is accurate
          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight; // force reflow

          const totalH    = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY   = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

          const getRelTop    = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            return r.top - resumeRect.top + scrollY;
          };
          const getRelBottom = (el: HTMLElement): number =>
            getRelTop(el) + el.getBoundingClientRect().height;

          // ── Collect avoid-break blocks ──────────────────────────────────
          interface Block { top: number; bottom: number; id?: string; }
          const blocks: Block[] = [];

          // Atomic units that must not be split across pages
          const ITEM_SELECTORS = [
            ".entry-block",
            ".custom-wrapper",
            ".header-block",
            ".skills-wrapper",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top    = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) {
              blocks.push({ top, bottom, id: el.dataset.blockId });
            }
          });

          // Section-title + first item paired — prevents orphaned .section-title
          resume.querySelectorAll<HTMLElement>(".section-block").forEach((section) => {
            const sectionTop = getRelTop(section);
            const firstItem  = section.querySelector<HTMLElement>(
              ".entry-block, .custom-wrapper, .skills-wrapper",
            );
            if (firstItem) {
              const anchorBottom = getRelBottom(firstItem);
              if (anchorBottom - sectionTop > 8) {
                blocks.push({
                  top:    sectionTop,
                  bottom: anchorBottom,
                  id:     section.dataset.blockId,
                });
              }
            } else {
              // Summary and similar text-only sections — treat whole block atomically
              const sectionBottom = getRelBottom(section);
              if (sectionBottom - sectionTop > 8) {
                blocks.push({
                  top:    sectionTop,
                  bottom: sectionBottom,
                  id:     section.dataset.blockId,
                });
              }
            }
          });

          blocks.sort((a, b) => a.top - b.top);

          // ── Calculate cut points ────────────────────────────────────────
          const pageStarts:   number[] = [0];
          const pageBreakIds: string[] = [];
          const MAX_PAGES = 20;

          while (pageStarts.length < MAX_PAGES) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut     = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;

            let actualCut  = naiveCut;
            let cutBlockId: string | undefined;

            for (const block of blocks) {
              if (block.top  >= naiveCut)       break;
              if (block.bottom <= currentStart)  continue;
              if (block.top >= currentStart && block.bottom > naiveCut) {
                if (block.top < actualCut) {
                  actualCut  = block.top;
                  cutBlockId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          document.body.removeChild(iframe);

          // Store for handleDownload
          (window as any).__resumePageBreakIds = pageBreakIds;

          // ── Build preview page HTMLs ──────────────────────────────────
          const pageHtmls: string[] = [];

          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart      = pageStarts[i + 1] ?? totalH;
            // KEY: clip at actual cut point — prevents bleed into the next page card
            const clipH          = nextStart - contentOffsetY;

            pageHtmls.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    ${CSS}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: ${A4_H}px !important;
      overflow: hidden !important; background: white !important;
    }
    .page-margin-box {
      position: relative; width: ${A4_W}px; height: ${A4_H}px;
      background: white; overflow: hidden;
    }
    .page-content-clip {
      position: absolute; top: ${MARGIN}px; left: 0;
      width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
    }
    .page-shift {
      position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
    }
    /* Outer padding stripped — MARGIN (57px) is the outer gutter,
       INNER_PAD_X/TOP reproduce T12's original spacing inside. */
    .t12-resume {
      width: ${A4_W}px !important;
      padding-left: ${INNER_PAD_X}px !important;
      padding-right: ${INNER_PAD_X}px !important;
      padding-top: ${INNER_PAD_TOP}px !important;
      margin: 0 !important;
    }
  </style>
</head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">
        ${resumeSnapshot}
      </div>
    </div>
  </div>
</body>
</html>`);
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
    [CSS],
  );

  // ── Debounced updates ────────────────────────────────────────────────────
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

  // ── PDF download ─────────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    try {
      const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      const pdfHtml = generateHTML(true, pageBreakIds);

      // const res: AxiosResponse<Blob> = await axios.post(
      //   `${API_URL}/api/candidates/generate-pdf`,
      //   { html: pdfHtml },
      //   { responseType: "blob" },
      // );


       const res: AxiosResponse<Blob> = await api.post(
              `${API_URL}/candidates/generate-pdf`,
              { html:pdfHtml  },
              { responseType: "blob" },
            );

      const url = URL.createObjectURL(res.data);
      const a   = document.createElement("a");
      a.href     = url;
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

  // ── RENDER ───────────────────────────────────────────────────────────────
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

      {alldata ? (
        // ── THUMBNAIL mode: first page only, scaled 36% ──────────────────
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
        // ── FULL PREVIEW mode: paginated A4 pages ────────────────────────
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
                <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
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
                <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
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

export default TemplateTwelve;